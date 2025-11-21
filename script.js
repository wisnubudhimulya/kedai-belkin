document.addEventListener('DOMContentLoaded', function () {

    /* LOADING SCREEN */
    const loadingScreen = document.getElementById('loading-screen');
    window.addEventListener('load', function () {
        setTimeout(function () {
            loadingScreen.style.opacity = '0';
            setTimeout(function () {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 500);
    });

    /* SMOOTH SCROLL NAVBAR (lebih halus dan lambat) */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                const offsetTop = targetElement.getBoundingClientRect().top +
                                window.pageYOffset - 80;

                smoothScrollTo(offsetTop, 900); // 900 ms = lebih smooth dan slow
            }
        });
    });
    

    /* NAVBAR CHANGE ON SCROLL */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.padding = "10px 0";
            navbar.style.boxShadow = "0 3px 15px rgba(0,0,0,0.12)";
        } else {
            navbar.style.padding = "15px 0";
            navbar.style.boxShadow = "0 2px 15px rgba(0,0,0,0.1)";
        }
    });

    /* FADE-IN ANIMATION */
    const fadeSections = document.querySelectorAll('.fade-section');
    const fadeItems = document.querySelectorAll('.fade-item');

    function checkVisibility() {
        const triggerBottom = window.innerHeight * 0.85;
        fadeSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < triggerBottom) section.classList.add('is-visible');
        });
        fadeItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < triggerBottom) item.classList.add('is-visible');
        });
    }
    window.addEventListener('scroll', checkVisibility);
    checkVisibility();

    /* MENU DESCRIPTION (only one open at a time) */
    const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', function () {
                menuItems.forEach(i => { if (i !== item) i.classList.remove('active'); });
                item.classList.toggle('active');
            });
        });
    });

    window.addEventListener('load', function () {

        // Smooth Page Fade-in
        document.body.classList.add('page-loaded');

        setTimeout(function () {
            loadingScreen.style.opacity = '0';
            setTimeout(function () {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 500);
    });

    /* SMOOTH SCROLL CUSTOM (lebih lambat) */
    function smoothScrollTo(targetY, duration = 900) {
        const startY = window.pageYOffset;
        const distanceY = targetY - startY;
        let startTime = null;

        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            // Easing (lebih lembut)
            const ease = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            window.scrollTo(0, startY + distanceY * ease);

            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        requestAnimationFrame(animation);
    }


