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

// get scroll direction
let scrollDirection;
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop){
       scrollDirection = 'down';
    } else {
       scrollDirection = 'up'
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    console.log(scrollDirection);
});

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

// Hide/Show sticky footer (for large screens)
const toggleStickyDefault = new Waypoint({
    element: elements.featuresSectionElement,
    handler: function(direction) {
        if (direction === 'down') {
            elements.navElement.classList.add('sticky');
            fadeIn(elements.navElement, 200);
        } else {
            fadeOut(elements.navElement, 200).then(() => {
                elements.navElement.classList.remove('sticky');
                elements.navElement.style.opacity = 1.0;
            });
        }

        if (direction === 'up' && document.documentElement.clientWidth <= 520) {
            elements.navElement.classList.remove('sticky');
            elements.navElement.style.opacity = 1.0;
        }
    },
    offset: 80
});

// disable the default sticky nav trigger on waypoint
console.log(document.documentElement.clientWidth);
if (document.documentElement.clientWidth <= 520) {
    toggleStickyDefault.disable();
}

// hide show sticky footer based on scroll direction, for small screens
window.addEventListener('scroll', () => {
    if (document.documentElement.clientWidth <= 520) {
        if (scrollDirection === 'down' || lastScrollTop <= 400) {
            elements.navElement.classList.remove('sticky');
            elements.navElement.style.opacity = 1.0; 
        } else {
            elements.navElement.classList.add('sticky');
        }
    }
});