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
    anime({
        targets: cards,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeInOutQuad',
        delay: anime.stagger(200, {start: 500}),
    });

});