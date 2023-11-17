import { Octokit } from "https://esm.sh/@octokit/rest";
import { GITHUB_TOKEN } from './config.js';

const octokit = new Octokit({
    auth: GITHUB_TOKEN,
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

async function getUser() {
    try {
        const response = await octokit.request('GET /user', {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
            },
        });

        const profilePicture = document.getElementById('profilePicture');
        profilePicture.src = response.data.avatar_url;
        profilePicture.alt = response.data.login;
    } catch (error) {
        console.error("Error fetching user:", error);
    }
}

async function getLanguagesForRepo(owner, repo) {
    try {
        const languagesResponse = await octokit.request('GET /repos/{owner}/{repo}/languages', {
            owner,
            repo,
        });
        return { [repo]: Object.keys(languagesResponse.data) };
    } catch (error) {
        console.error(`Error fetching languages for ${owner}/${repo}:`, error);
        return { [repo]: [] };
    }
}

async function getRepositories() {
    try {
        const response = await octokit.request('GET /user/repos', {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
            },
        });
        const languageColors = {};

        const repositories = response.data;

        const myRepositories = repositories.filter(repo =>
            repo.owner.login === 'Justin0122' && !repo.fork && !repo.archived && !repo.disabled && !repo.private
        );

        const repoListElement = document.getElementById('repoList');

        const languagePromises = myRepositories.map(repo => getLanguagesForRepo('Justin0122', repo.name));
        const languagesForRepos = await Promise.all(languagePromises);

        for (let i = 0; i < myRepositories.length; i++) {
            const repo = myRepositories[i];
            const languages = languagesForRepos[i][repo.name];

            const repoCard = document.createElement('div');
            repoCard.classList.add('border', 'p-4', 'rounded-md', 'mb-4', 'shadow-md', 'hover:shadow-lg', 'transition-all', 'duration-300', 'ease-in-out', 'dark:hover:bg-purple-800', 'bg-opacity-20', 'bg-gray-900', 'hover:bg-opacity-100', 'dark:hover:text-white', 'cursor-default', 'flex', 'flex-col', 'h-full', 'hover:scale-105', 'hover:shadow-xl', 'hover:bg-gray-200', 'dark:hover:bg-purple-800');

            const repoName = document.createElement('h3');
            repoName.classList.add('text-xl', 'font-semibold', 'mb-2');
            repoName.textContent = repo.name;

            const repoDescription = document.createElement('p');
            repoDescription.textContent = repo.description || '';

            const languagesUsed = document.createElement('p');
            languagesUsed.classList.add('flex', 'flex-wrap', 'overflow-hidden');


            languages.forEach(language => {
                if (!languageColors[language]) {
                    languageColors[language] = getRandomColor();
                }

                const languageTag = document.createElement('span');
                languageTag.textContent = language;
                languageTag.classList.add('px-2', 'py-1', 'text-white', 'rounded-md', 'mr-2', 'mb-2');
                languageTag.style.backgroundColor = languageColors[language]; // Assign stored color for each language
                languagesUsed.appendChild(languageTag);
            });

            const repoLink = document.createElement('a');
            repoLink.href = repo.html_url;
            repoLink.textContent = 'View on GitHub';
            repoLink.classList.add('text-blue-500', 'hover:underline' ,'block', 'mt-auto');

            repoCard.appendChild(repoName);
            repoCard.appendChild(repoDescription);
            repoCard.appendChild(languagesUsed);
            repoCard.appendChild(repoLink);

            repoListElement.appendChild(repoCard);

            const footer = document.getElementById('pageFooter');
            footer.classList.remove('hidden');
        }
    } catch (error) {
        console.error("Error fetching repositories:", error);
    }
}

getRepositories();
getUser();
