/* --------------- Elements selection ----------------- */
const elements = {
    featuresSectionElement: document.getElementsByClassName(
        'section-features'
    )[0],
    navElement: document.getElementsByTagName('nav')[0],
    mainNav: document.getElementsByClassName('main-nav')[0]
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
    },
    offset: 80
});

let open = false;

const toggleDrawer = () => {
    icon.classList.remove('ion-md-menu');
    icon.classList.remove('ion-md-close');

    if (open) {
        // close it
        elements.mainNav.style.display = 'none';
        icon.classList.add('ion-md-menu');
        open = false;
    } else {
        // open it
        elements.mainNav.style.display = 'block';
        icon.classList.add('ion-md-close');
        open = true;
    }
}

// open close drawer based on icon click
const icon = document.querySelector('.nav-icon i');
document.querySelector('.nav-icon').onclick = toggleDrawer;

// close drawer when an item is clicked
document.querySelectorAll('.main-nav li a').forEach((element) => {
    if (document.documentElement.clientWidth <= 480) {
        element.onclick = () => {
            open = true; // when toggleDrawer recevies open is true, it will close it
            toggleDrawer();
        }
    }
});