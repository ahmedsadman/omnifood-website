/* --------------- Elements selection ----------------- */
const elements = {
    featuresSectionElement: document.getElementsByClassName(
        'section-features'
    )[0],
    navElement: document.getElementsByTagName('nav')[0]
};

/* ---------------- Animation functions ------------------- */
const fadeIn = (el, duration) => {
    el.style.opacity = 0;

    var last = +new Date();
    var tick = function() {
        el.style.opacity = +el.style.opacity + (new Date() - last) / duration;
        last = +new Date();

        if (+el.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
                setTimeout(tick, 10);
        }
    };

    tick();
};

const fadeOut = (el, duration) => {
    return new Promise((resolve, reject) => {
        el.style.opacity = 1;
        var last = +new Date();
        var tick = function() {
            el.style.opacity =
                +el.style.opacity - (new Date() - last) / duration;
            last = +new Date();

            if (+el.style.opacity > 0) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
                    setTimeout(tick, 10);
            } else resolve();
        };
        tick();
    });
};

// Hide/Show sticky footer
const waypoint = new Waypoint({
    element: elements.featuresSectionElement,
    handler: function(direction) {
        if (direction === 'down') {
            elements.navElement.classList.add('sticky');
            fadeIn(elements.navElement, 200);
        } else {
            fadeOut(elements.navElement, 200).then(() =>
                elements.navElement.classList.remove('sticky')
            );
        }
    },
    offset: 80
});
