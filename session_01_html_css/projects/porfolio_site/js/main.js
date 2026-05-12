document.addEventListener("DOMContentLoaded", function () {
    const progressBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-width');

                bar.style.setProperty('--progress-width', targetWidth);
                bar.classList.add('animate');

                observer.unobserve(bar);
            }
        });
    }, {
        threshold: 0.2
    });

    progressBars.forEach(bar => {
        observer.observe(bar);
    });
});