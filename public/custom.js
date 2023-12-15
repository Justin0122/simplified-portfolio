document.addEventListener('DOMContentLoaded', function () {
    let slideIndex = 0;
    carousel();

    function carousel() {
        let i;
        let x = document.getElementsByClassName("carousel-item");

        for (i = 0; i < x.length; i++) {
            x[i].style.opacity = "0"; // Initially hide all images
        }

        slideIndex++;
        if (slideIndex > x.length) {
            slideIndex = 1;
        }

        x[slideIndex - 1].style.opacity = "1"; // Show the current image

        setTimeout(carousel, 5000); // Change image every 5 seconds
    }
    function renderMarkdown(markdown) {
        return marked.parse(markdown);
    }

    async function fetchReadme(repoName) {
        try {
            const response = await fetch(`https://raw.githubusercontent.com/Justin0122/${repoName}/master/README.md`);
            const markdown = await response.text();

            return renderMarkdown(markdown);
        } catch (error) {
            console.error('Error fetching readme:', error);
        }
    }

    const repoCards = document.querySelectorAll('.repo-card');
    const modalContent = document.querySelector('.modal-content');

    repoCards.forEach(card => {
        card.addEventListener('click', async () => {

            card.classList.add('open');
            const repoName = card.dataset.repoName;
            const readmeContent = await fetchReadme(repoName);

            const modal = document.getElementById('modal');
            const readmeContainer = document.createElement('div');

            readmeContainer.innerHTML = readmeContent;

            modalContent.appendChild(readmeContainer);

            modal.style.display = 'block';

            const closeButton = document.querySelector('.close');
            closeButton.addEventListener('click', () => {
                closeModal(modal, readmeContainer);
            });

            window.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    closeModal(modal, readmeContainer);
                }
            });

            window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    closeModal(modal, readmeContainer);
                }
            });
        });
    });

    function closeModal(modal, container) {
        modal.style.display = 'none';

        repoCards.forEach(card => {
            card.classList.remove('open');
            container.innerHTML = '';
        });
    }

});
