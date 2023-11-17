const express = require('express');
const path = require('path');
const { Octokit } = require("@octokit/rest");
const githubData = require("./app/githubData.js");
const moment = require('moment');
require('dotenv').config();

const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
        const octokit = new Octokit({
            auth: process.env.GITHUB_TOKEN,
        });

        const repos = await githubData.getRepositories(octokit);

        res.render('index', { repos, moment });
    } catch (error) {
        console.error("Error handling root route:", error);
        res.status(500).send('Internal Server Error');
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
