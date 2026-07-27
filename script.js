const sectionLinks = [...document.querySelectorAll('.nav-links a')];
const observedSections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

const setActiveLink = (sectionId) => {
    sectionLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${sectionId}`;
        link.classList.toggle('is-active', isActive);

        if (isActive) {
            link.setAttribute('aria-current', 'location');
        } else {
            link.removeAttribute('aria-current');
        }
    });
};

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (visible[0]) {
                setActiveLink(visible[0].target.id);
            }
        },
        {
            rootMargin: '-18% 0px -66% 0px',
            threshold: [0.05, 0.2, 0.45],
        }
    );

    observedSections.forEach((section) => observer.observe(section));
}

const year = document.querySelector('#year');
if (year) {
    year.textContent = new Date().getFullYear();
}
