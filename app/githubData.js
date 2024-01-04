async function fetchReadme(GITHUB_USERNAME) {
    try {
        const response = await fetch(`https://raw.githubusercontent.com/Justin0122/${GITHUB_USERNAME}/master/README.md`);
        const markdown = await response.text();

        return markdown;
    } catch (error) {
        console.error('Error fetching readme:', error);
    }

}

const { Octokit } = require('@octokit/rest');


async function getLanguagesForRepo(octokit, owner, repo) {
    try {
        const languagesResponse = await octokit.request('GET /repos/{owner}/{repo}/languages', {
            owner,
            repo,
        });
        return { [repo]: languagesResponse.data };
    } catch (error) {
        console.error(`Error fetching languages for ${owner}/${repo}:`, error);
        return { [repo]: {} };
    }
}

async function getRepositories(octokit) {
    try {
        const response = await octokit.request('GET /user/repos', {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
            },
        });

        const repositories = response.data.map(repo => ({
            name: repo.name,
            description: repo.description,
            owner: repo.owner.login,
            stargazers_count: repo.stargazers_count,
            repo_url: repo.html_url,
            updated_at: repo.updated_at,
            created_at: repo.created_at,
        }));

        const myRepositories = repositories
            .filter(repo =>
                repo.owner === 'Justin0122' && !repo.fork && !repo.archived && !repo.disabled && !repo.private
            )
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        const languagePromises = myRepositories.map(repo => getLanguagesForRepo(octokit, 'Justin0122', repo.name));

        const languages = await Promise.all(languagePromises);

        const repoLanguages = languages.reduce((acc, cur) => ({ ...acc, ...cur }), {});

        return myRepositories.map(repo => ({
            ...repo,
            languages: repoLanguages[repo.name]
        }));

    } catch (error) {
        console.error("Error fetching repositories:", error);
        return [];
    }
}

module.exports = {
    getRepositories,
    fetchReadme,
};
