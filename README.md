# Simplified Portfolio Website

This project serves as a simplified rendition of my comprehensive [portfolio website](https://justinjongstra.nl). It's constructed using the powerful combination of [EJS](https://ejs.co/) for templating and [Express](https://expressjs.com/) for server-side operations.

## Overview

The objective behind this repository is to create a streamlined version of my existing portfolio website, focusing primarily on frontend architecture and user interaction. Instead of the Laravel framework used in the original website, this version leverages Express.js to manage server functionalities and EJS for dynamic HTML content generation. 

One of the significant differences from the Laravel version is the use of the GitHub API to automatically fetch and populate my projects, enabling a more dynamic and efficient way of showcasing my work.

## Getting Started

### Prerequisites

Ensure you have Node.js installed on your system.

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Justin0122/simplified-portfolio.git portfolio
   cd portfolio
    ```
2. **Install Dependencies:**
3. ```bash
   npm install
   ```
4. **Start the Server:**
   ```bash
   node app.js
   ```

## Github integration

This simplified portfolio website utilizes the GitHub API to automatically fetch and display my projects. The server-side logic retrieves project data from my GitHub account, eliminating the need to manually add projects to the portfolio. It automatically updates hourly to ensure that the projects are up-to-date.

## Built With

* [EJS](https://ejs.co/) - Templating Engine
* [Express](https://expressjs.com/) - Web Framework
* [GitHub API](https://developer.github.com/v3/) - API for fetching GitHub projects
* [Node.js](https://nodejs.org/en/) - JavaScript Runtime Environment

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
