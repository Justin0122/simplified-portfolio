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
let lastFetched = null;
const CACHE_DURATION = 3600000; // update repos every hour

app.get('/', async (req, res) => {
    console.log("visited root route");
    try {
        const currentTime = Date.now();

        if (!cachedRepos || !lastFetched || currentTime - lastFetched > CACHE_DURATION) {
            const octokit = new Octokit({
                auth: process.env.GITHUB_TOKEN,
            });
            cachedRepos = await githubData.getRepositories(octokit);
            lastFetched = currentTime;
        }

        res.render('index', { repos: cachedRepos, moment });
    } catch (error) {
        console.error("Error handling root route:", error);
        res.status(500).send('Internal Server Error');
    }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/marked')));

app.get('*', (req, res) => {
    console.log("visited 404 route");
    res.render('404', { moment });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
