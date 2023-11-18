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

        anime({
            targets: leftCards,
            translateX: ['-100%', 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeInOutQuad',
            delay: anime.stagger(20, { start: 500, direction: 'reverse' }),
        });

        anime({
            targets: rightCards,
            translateX: ['100%', 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeInOutQuad',
            delay: anime.stagger(20, { start: 500 }),
        });
    }
});
