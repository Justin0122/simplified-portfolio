document.addEventListener('DOMContentLoaded', function () {
    $(function () {
        var includes = $('[data-include]')
        $.each(includes, function () {
            var file = 'components/' + $(this).data('include') + '.html'
            $(this).load(file)
        })
    })

    const lightColors = ['#FF6347', '#4682B4', '#7700bd', '#FFA500',
        '#9370DB', '#00FFFF', '#FFD700',
        '#FF69B4'];
    const darkColors = lightColors.map(color => {
        return darkenColor(color, 50);
    });

    function darkenColor(color, percent) {
        let num = parseInt(color.slice(1), 16);
        let amt = Math.round(2.55 * percent);
        let R = (num >> 16) - amt;
        let G = (num >> 8 & 0x00FF) - amt;
        let B = (num & 0x0000FF) - amt;
        return "#" + ((1 << 24) + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1);
    }

    const body = document.getElementById('randomGradientBody');

    function setRandomGradient(colors) {
        const randomIndex1 = Math.floor(Math.random() * colors.length);
        let randomIndex2 = Math.floor(Math.random() * colors.length);
        while (randomIndex2 === randomIndex1) {
            randomIndex2 = Math.floor(Math.random() * colors.length);
        }

        const randomColor1 = colors[randomIndex1];
        const randomColor2 = colors[randomIndex2];

        body.style.background = `linear-gradient(to right, ${randomColor1}, ${randomColor2})`;
    }

    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (isDarkMode) {
        setRandomGradient(darkColors);
    } else {
        setRandomGradient(lightColors);
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            setRandomGradient(darkColors);
        } else {
            setRandomGradient(lightColors);
        }
    });

});