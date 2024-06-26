document.addEventListener('DOMContentLoaded', () => {
    const buttonNext = document.querySelector('#next');
    const buttonPrev = document.querySelector('#prev');    
    const cards = document.querySelectorAll('.card');
    const section = document.querySelector('section');
    const slider = document.querySelector('.slider');

    const cardWidth = cards[0].offsetWidth;
    const gap = parseFloat(window.getComputedStyle(cards[0]).marginRight);
    const widthToScroll = cardWidth + gap;

    let index = 0;

    const updateVisibleCards = () => {
        const sectionWidth = section.offsetWidth;
        const visibleCards = Math.floor(sectionWidth / widthToScroll);
        return visibleCards;
    };

    buttonNext.addEventListener('click', () => {
        const visibleCards = updateVisibleCards();
        if (index < cards.length - visibleCards) {
            index++;
            gsap.to(slider, {
                x: -widthToScroll * index,
                duration: 0.5
            });
        }
    });

    buttonPrev.addEventListener('click', () => {
        if (index > 0) {
            index--;
            gsap.to(slider, {
                x: -widthToScroll * index,
                duration: 0.5
            });
        }
    });

    window.addEventListener('resize', () => {
        const visibleCards = updateVisibleCards();
        if (index >= cards.length - visibleCards) {
            index = cards.length - visibleCards;
            if (index < 0) index = 0;
            gsap.to(slider, {
                x: -widthToScroll * index,
                duration: 0.5
            });
        }
    });

    // Draggable configuration
    Draggable.create(slider, {
        type: "x",
        bounds: section,
        edgeResistance: 0.65,
        inertia: true,
        onDragEnd: function() {
            const visibleCards = updateVisibleCards();
            index = Math.round(this.x / -widthToScroll);
            if (index < 0) index = 0;
            if (index > cards.length - visibleCards) index = cards.length - visibleCards;
            gsap.to(slider, {
                x: -widthToScroll * index,
                duration: 0.5
            });
        }
    });
});