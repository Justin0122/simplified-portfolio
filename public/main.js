document.addEventListener('DOMContentLoaded', function () {
    $(function () {
        var includes = $('[data-include]')
        $.each(includes, function () {
            var file = 'components/' + $(this).data('include') + '.html'
            $(this).load(file)
        })
    })

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
        delay: anime.stagger(200, { start: 500 }),
    });

    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', e => {
        cursor.setAttribute("style", "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px; transform: scale(1.05);")
    });

});