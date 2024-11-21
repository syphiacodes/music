// Carousel Functionality
function moveSlide(section, direction) {
    const carouselItems = document.querySelector(`#${section} .carousel-items`);
    const itemWidth = carouselItems.querySelector('.carousel-item').offsetWidth;
    const maxScroll = carouselItems.scrollWidth - carouselItems.offsetWidth;

    let currentScroll = carouselItems.scrollLeft;

    if (direction === 1) {
        currentScroll = Math.min(currentScroll + itemWidth, maxScroll);
    } else {
        currentScroll = Math.max(currentScroll - itemWidth, 0);
    }

    carouselItems.scrollLeft = currentScroll;
}

// Fade in
const fadeElements = document.querySelectorAll('.fade');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, {
    threshold: 0.1
});


fadeElements.forEach(el => observer.observe(el));

// Smooth scrolling
const sections = Array.from(document.querySelectorAll(".section"));
let isScrolling = false;

window.addEventListener("wheel", (event) => {
    if (isScrolling) return;

    isScrolling = true;
    setTimeout(() => (isScrolling = false), 800);

    const direction = event.deltaY > 0 ? 1 : -1;
    const currentSectionIndex = sections.findIndex((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight;
    });

    if (currentSectionIndex !== -1) {
        let nextSectionIndex = currentSectionIndex + direction;

        if (nextSectionIndex >= 0 && nextSectionIndex < sections.length) {
            sections[nextSectionIndex].scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }
});

// Arrow key navigation
document.addEventListener("keydown", (event) => {
    const sections = document.querySelectorAll(".section");
    const currentScroll = window.scrollY;
    const viewportHeight = window.innerHeight;

    let currentSectionIndex = 0;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
            currentSectionIndex = index;
        }
    });

    if (event.key === "ArrowDown" && currentSectionIndex < sections.length - 1) {
        event.preventDefault();
        const nextSection = sections[currentSectionIndex + 1];
        nextSection.scrollIntoView({ behavior: "smooth" });
    } else if (event.key === "ArrowUp" && currentSectionIndex > 0) {

        event.preventDefault();
        const previousSection = sections[currentSectionIndex - 1];
        previousSection.scrollIntoView({ behavior: "smooth" });
    }
});
