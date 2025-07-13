document.addEventListener('DOMContentLoaded' ,() =>{

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header background on scroll
    // window.addEventListener('scroll', () => {
    //     const header = document.querySelector('header');
    //     if (window.scrollY > 50) {
    //         header.style.background = 'rgba(255, 255, 255, 0.98)';
    //         header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    //     } else {
    //         header.style.background = 'rgba(255, 255, 255, 0.95)';
    //         header.style.boxShadow = 'none';
    //     }
    // });

    // Newsletter form submission
    document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing with email: ${email}`);
        e.target.reset();
    });
})