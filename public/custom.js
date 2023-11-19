document.addEventListener('DOMContentLoaded', function () {
    anime({
        targets: '#profilePicture',
        opacity: [0, 1],
        duration: 500,
        easing: 'easeInOutQuad',
        delay: 500
    });

    anime({
        targets: '#aboutText',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        easing: 'easeInOutQuad',
        delay: 1000
    });

    anime({
        targets: '#certificates',
        translateY: [80, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeInOutQuad',
        delay: 500
    });

    anime({
        targets: '#aspirations',
        translateY: [100, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeInOutQuad',
        delay: 1000
    });

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const cards = document.querySelectorAll('[id^="repoCard"]');
    const numRows = 2;

    for (let row = 0; row < numRows; row++) {
        const leftCards = [];
        const rightCards = [];
        cards.forEach((card, index) => {
            if (index % numRows === row) {
                if (index % 2 === 0) {
                    leftCards.push(card);
                } else {
                    rightCards.push(card);
                }
            }
        });

        if (!isMobile) {
            anime({
                targets: leftCards,
                translateX: ['-100%', 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeInOutQuad',
                delay: anime.stagger(20, {start: 500, direction: 'reverse'}),
            });

            anime({
                targets: rightCards,
                translateX: ['100%', 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeInOutQuad',
                delay: anime.stagger(20, {start: 500}),
            });
        } else{
            anime({
                targets: leftCards,
                translateY: ['100%', 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeInOutQuad',
                delay: anime.stagger(20, {start: 500}),
            });

            anime({
                targets: rightCards,
                translateY: ['100%', 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeInOutQuad',
                delay: anime.stagger(20, {start: 500, direction: 'reverse'}),
            });
        }
    }

    const carouselItems = document.querySelectorAll('.carousel-item');
    let index = 0;

    function animateCarousel() {
        carouselItems.forEach((item, i) => {
            if (i !== index) {
                item.style.opacity = '0';
            }
        });

        anime({
            targets: carouselItems[index],
            opacity: 1,
            easing: 'easeInOutQuad',
            duration: 1000,
            complete: () => {
                setTimeout(() => {
                    anime({
                        targets: carouselItems[index],
                        opacity: 0,
                        easing: 'easeInOutQuad',
                        duration: 2000,
                        complete: () => {
                            index++;
                            if (index >= carouselItems.length) {
                                index = 0;
                            }
                            animateCarousel();
                        }
                    });
                }, 3000);
            }

        });
    }
    animateCarousel();
});
