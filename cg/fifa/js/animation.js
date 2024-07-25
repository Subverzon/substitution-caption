
const animation = {
    // Animation for the header and player cards
    animateIn: () => {
        document.querySelector('.caption-container').style.display = "flex";
        document.querySelector('.header-card').classList.remove('slideOutTop');
        document.querySelector('.header-card').classList.add('slideInTop');
        document.querySelector('.header-card').style.visibility = "visible";
        setTimeout(() => {
            document.querySelectorAll('.player-card')[0].classList.remove('slideOutLeft');
            document.querySelectorAll('.player-card')[0].classList.add('slideInLeft');
            document.querySelectorAll('.player-card')[0].style.visibility = "visible";
            document.querySelectorAll('.player-card')[1].classList.remove('slideOutRight');
            document.querySelectorAll('.player-card')[1].classList.add('slideInRight');
            document.querySelectorAll('.player-card')[1].style.visibility = "visible";
        }, 700);

    },
    // Animation to remove the header and player cards
    animateOut: () => {
        document.querySelector('.header-card').classList.remove('slideInTop');
        document.querySelector('.header-card').classList.add('slideOutTop');
        document.querySelectorAll('.player-card')[0].classList.remove('slideInLeft');
        document.querySelectorAll('.player-card')[0].classList.add('slideOutLeft');
        document.querySelectorAll('.player-card')[1].classList.remove('slideInRight');
        document.querySelectorAll('.player-card')[1].classList.add('slideOutRight');
        setTimeout(() => {
            document.querySelector('.caption-container').style.display = "none";
            document.querySelector('.header-card').style.visibility = "hidden";
            document.querySelectorAll('.player-card')[0].style.visibility = "hidden";
            document.querySelectorAll('.player-card')[1].style.visibility = "hidden";
        }, 700);
    }
}

// CasparCG play and stop functions

function play() {
    loadAndAnimate();
}

function stop() {
    animation.animateOut();
}