const elements = {
    featuresSectionElement: document.getElementsByClassName(
        'section-features'
    )[0],
    navElement: document.getElementsByTagName('nav')[0]
};

const fadeIn = el => {
    el.style.opacity = 0;

    var last = +new Date();
    var tick = function() {
        el.style.opacity = +el.style.opacity + (new Date() - last) / 300;
        last = +new Date();

        if (+el.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
                setTimeout(tick, 16);
        }
    };

    tick();
};

const fadeOut = el => {
    el.style.opacity = 1;

    var last = +new Date();
    var tick = function() {
        el.style.opacity = +el.style.opacity - (new Date() - last) / 300;
        last = +new Date();

        if (+el.style.opacity > 0) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
                setTimeout(tick, 16);
        }
    };

    tick();
};

const waypoint = new Waypoint({
    element: elements.featuresSectionElement,
    handler: function(direction) {
        if (direction === 'down') {
            elements.navElement.classList.add('sticky');
            fadeIn(elements.navElement);
        } else {
            fadeOut(elements.navElement);
            setTimeout(() => elements.navElement.classList.remove('sticky'), 310);
        }
    },
    offset: 80
});
