# Simplified Portfolio Website

This project serves as a simplified rendition of my comprehensive [portfolio website](https://justinjongstra.nl). It's constructed using the powerful combination of [EJS](https://ejs.co/) for templating and [Express](https://expressjs.com/) for server-side operations.

## Overview

The objective behind this repository is to create a streamlined version of my existing portfolio website, focusing primarily on frontend architecture and user interaction. Instead of the Laravel framework used in the original website, this version leverages Express.js to manage server functionalities and EJS for dynamic HTML content generation. 

One of the significant differences from the Laravel version is the use of the GitHub API to automatically fetch and populate my projects, enabling a more dynamic and efficient way of showcasing my work.

### Template-Friendly Design

Moreover, this project is structured to serve as a versatile template for individuals aiming to establish their own portfolio websites. The clear separation between frontend and backend functionalities, coupled with the modularity of the codebase, ensures ease of adaptation. Developers can leverage this repository as a starting point to design and customize their frontend, tailor server functionalities, and effortlessly integrate their own content.

### Key Features:
- **Frontend Customization:** Simple and adaptable HTML structure, allowing easy customization and styling for personal portfolios.
- **Efficient Backend Integration:** Express.js backend for managing server functionalities, enabling easy modification and extension.
- **GitHub API Integration:** Automatic project population through the GitHub API, providing a dynamic display of work.

This project is designed to be accessible and modifiable for developers of various skill levels, offering a structured foundation to craft personalized portfolio websites.



## Getting Started

### Prerequisites

Ensure you have Node.js installed on your system. If not, you can download it [here](https://nodejs.org/en/download/).

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

This portfolio website utilizes the GitHub API to automatically fetch and display my projects. The server-side logic retrieves project data from my GitHub account, eliminating the need to manually add projects to the portfolio. It automatically updates hourly to ensure that the projects are up-to-date and to minimize the number of API calls.

## Built With

* [EJS](https://ejs.co/) - Templating Engine
* [Express](https://expressjs.com/) - Web Framework
* [GitHub API](https://developer.github.com/v3/) - API for fetching GitHub projects
* [Node.js](https://nodejs.org/en/) - JavaScript Runtime Environment

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
