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

document.addEventListener("DOMContentLoaded", function () {
    // 1. Quản lý chức năng Filter Projects
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });
});