const express = require('express');
const path = require('path');
const { Octokit } = require("@octokit/rest");
const githubData = require("./app/githubData.js");
const moment = require('moment');
require('dotenv').config();

const app = express();
const port = 3001;

// Set EJS as the view engine
app.set('view engine', 'ejs');

let cachedRepos = null;
let lastReposFetched = null;
const REPOS_CACHE_DURATION = 3600000; // update repos every hour

let cachedReadme = null;
let lastReadmeFetched = null;
const README_CACHE_DURATION = 3600000;

app.get('/', async (req, res) => {
    try {
        const currentTime = Date.now();
        let readmeContent = null;
        const images = [];

        if (!cachedReadme || !lastReadmeFetched || currentTime - lastReadmeFetched > README_CACHE_DURATION) {
            const octokit = new Octokit({
                auth: process.env.GITHUB_TOKEN,
            });
            readmeContent = await githubData.fetchReadme(process.env.GITHUB_USERNAME);
            cachedReadme = readmeContent;
            lastReadmeFetched = currentTime;
        } else {
            readmeContent = cachedReadme;
        }

        if (!cachedRepos || !lastReposFetched || currentTime - lastReposFetched > REPOS_CACHE_DURATION) {
            const octokit = new Octokit({
                auth: process.env.GITHUB_TOKEN,
            });
            cachedRepos = await githubData.getRepositories(octokit);
            lastReposFetched = currentTime;
        }

        const fs = require('fs');
        fs.readdirSync('./public/img').forEach(file => {
            images.push(file);
        });
        images.sort(() => Math.random() - 0.5);


        const dataToSend = {
            repos: cachedRepos,
            moment,
            images,
            name: process.env.FULL_NAME,
            avatar_url: process.env.PROFILE_PIC_URL,
            links: [
                {url: process.env.GITHUB_URL, icon: 'svg/github.svg', alt: 'GitHub'},
                {url: process.env.LINKEDIN_URL, icon: 'svg/linkedin.svg', alt: 'LinkedIn'},
                {url: process.env.PACKAGIST_URL, icon: 'svg/packagist.svg', alt: 'Packagist'},
                {url: `mailto:${process.env.EMAIL}`, icon: 'svg/mailto.svg', alt: 'Mailto'},
            ],
            readmeContent,
        };
        res.render('index', dataToSend);

    } catch (error) {
        console.error("Error handling root route:", error);
        res.status(500).send('Internal Server Error');
    }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/marked')));

app.get('*', (req, res) => {
    console.log("visited 404 route: " + req.url);
    res.render('404', { moment });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
