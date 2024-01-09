const express = require('express');
const path = require('path');
const moment = require('moment');
require('dotenv').config();

const app = express();
const port = 3001;

// Set EJS as the view engine
app.set('view engine', 'ejs');

let repos = null;

const baseUrl = 'http://localhost:3002/api';

app.get('/', async (req, res) => {
    console.log("visited root route");
    try {
        const currentTime = Date.now();
        const images = [];

        const url = `${baseUrl}/repositories`;
        const response = await fetch(url);
        repos = await response.json();

        const readmeUrl = `${baseUrl}/readme`;
        const readmeResponse = await fetch(readmeUrl);

        const readmeContent = await readmeResponse.text();

        const fs = require('fs');
        fs.readdirSync('./public/img').forEach(file => {
            images.push(file);
        });
        images.sort(() => Math.random() - 0.5);


        const dataToSend = {
            repos: repos,
            moment,
            images,
            name: process.env.FULL_NAME,
            avatar_url: process.env.PROFILE_PIC_URL,
            website: process.env.WEBSITE_URL,
            links: [
                { url: process.env.GITHUB_URL, icon: 'svg/github.svg', alt: 'GitHub' },
                { url: process.env.LINKEDIN_URL, icon: 'svg/linkedin.svg', alt: 'LinkedIn' },
                { url: process.env.PACKAGIST_URL, icon: 'svg/packagist.svg', alt: 'Packagist' },
                { url: `mailto:${process.env.EMAIL}`, icon: 'svg/mailto.svg', alt: 'Mailto' },
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
