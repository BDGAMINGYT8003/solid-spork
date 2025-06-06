// --- Birthday Feature Global Functions ---
function getBSTDate() {
    const now = new Date();
    // Convert current time to UTC milliseconds
    const utcMillis = now.getTime() + (now.getTimezoneOffset() * 60000);
    // BST is UTC+6, so add 6 hours in milliseconds. Note: This does not account for BST daylight saving changes if precision is needed to that level.
    // For "is it this day", this level of precision is usually fine.
    const bstMillis = utcMillis + (6 * 60 * 60000);
    const bstDate = new Date(bstMillis);
    return bstDate;
}

function isMarziasBirthday() {
    const bstDate = getBSTDate();
    const month = bstDate.getMonth() + 1; // getMonth() is 0-indexed
    const day = bstDate.getDate();
    return month === 3 && day === 3; // March 3rd
    // For testing: return true;
}

document.addEventListener('DOMContentLoaded', function() {

    // Hamburger Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('nav'); // The <nav> element will get the .nav-open class

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('nav-open');
        });
    }

    // 1. Active Navigation Link Styling (selector updated)
    const navLinks = document.querySelectorAll('nav .nav-links a');
    const currentPath = window.location.pathname.split('/').pop(); // Gets the current HTML file name

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        // Special handling for birthday link if it needs to be active when on birthday.html
        // and also if currentPath is empty (root) and link is index.html
        let isBirthdayPageLink = link.classList.contains('nav-birthday-link') && (currentPath === 'birthday.html' || (currentPath === 'index.html' && isMarziasBirthday()));

        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html') || isBirthdayPageLink) {
            link.classList.add('active');
        }
        // Removed JS hover scale effect as it's better handled by CSS :hover if desired,
        // and can interfere with menu slide-in/out or other transitions.
        // Original JS hover code:
        // link.addEventListener('mouseenter', () => {
        //     link.style.transform = 'scale(1.05)';
        //     link.style.transition = 'transform 0.2s ease-out';
        // });
        // link.addEventListener('mouseleave', () => {
        //     link.style.transform = 'scale(1)';
        // });
    });

    // 2. Soft fade-in animation for main content sections on page load
    const animatedElements = document.querySelectorAll(
        '.home-main .hero, .home-main .core-sentiment, .home-main .placeholder-content, .content-page h1, .content-page p, .content-page section'
    );

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`;

        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100);
    });

    // 3. Add a cute, subtle animation to the main sentiment text on the Home page
    const sentimentText = document.querySelector('.home-main .core-sentiment p');
    if (sentimentText) {
        sentimentText.addEventListener('mouseenter', () => {
            sentimentText.style.transform = 'scale(1.03)';
            sentimentText.style.textShadow = '0 0 10px rgba(183, 110, 121, 0.5)';
            sentimentText.style.transition = 'transform 0.3s ease, text-shadow 0.3s ease';
        });
        sentimentText.addEventListener('mouseleave', () => {
            sentimentText.style.transform = 'scale(1)';
            sentimentText.style.textShadow = 'none';
        });
    }

    // --- Birthday Feature Logic (Integrated) ---
    const birthdayPopupOverlay = document.getElementById('birthdayPopupOverlay'); // This ID is in index.html
    const closeBirthdayPopupButton = document.getElementById('closeBirthdayPopup'); // This ID is in index.html
    // currentPath is already defined above for nav links

    if (isMarziasBirthday()) {
        // Handle redirect to birthday.html first
        // This should only happen if the popup HTML is NOT on the current page.
        // If popup HTML is on index.html, and we are on index.html, we show popup, then allow nav to birthday.html
        // If we are NOT on index.html (e.g. about.html), and it's the birthday, redirect.

        // If the popup is meant to be on index.html and seen first:
        if (currentPage !== 'index.html' && currentPage !== 'birthday.html' && sessionStorage.getItem('birthdayRedirectDone') !== 'true') {
            // If not on index or birthday page, and redirect not done, go to index to see popup.
            // This assumes popup is on index.html.
            // sessionStorage.setItem('birthdayRedirectDone', 'true');
            // window.location.href = 'index.html'; // Or birthday.html directly
            // return; // Stop further execution
        }
        // The prompt's logic was to redirect to birthday.html immediately if not on it.
        // Let's stick to the prompt's original redirect logic for now.
        if (currentPage !== 'birthday.html' && sessionStorage.getItem('birthdayRedirectDone') !== 'true') {
            sessionStorage.setItem('birthdayRedirectDone', 'true');
            window.location.href = 'birthday.html';
            return;
        }

        // Show popup logic:
        // The popup HTML is currently in index.html.
        // If user lands on index.html on birthday: show popup.
        // If user lands on another page: redirect to birthday.html. Then birthday.html needs popup HTML or this won't work.
        // For this step, we assume the critical part is that IF the popup elements are found, the logic to show/hide them runs.
        // The prompt implies that the popup HTML is on index.html, so this code will only show a popup if the current page is index.html
        // (or if birthday.html also had the popup HTML).
        if (birthdayPopupOverlay) { // Check if the popup HTML is on the current page
            if (sessionStorage.getItem('birthdayPopupClosed') !== 'true') {
                birthdayPopupOverlay.classList.add('show');
            }
        }

        if (closeBirthdayPopupButton) { // Check if the close button is on the current page
            closeBirthdayPopupButton.addEventListener('click', function() {
                if (birthdayPopupOverlay) {
                    birthdayPopupOverlay.classList.remove('show');
                    sessionStorage.setItem('birthdayPopupClosed', 'true');
                }
            });
        }

    } else {
        // Clear flags if it's not the birthday
        sessionStorage.removeItem('birthdayRedirectDone');
        sessionStorage.removeItem('birthdayPopupClosed');
        // sessionStorage.removeItem('birthdayPopupShownOnBirthdayPage'); // This was in prompt's JS, but not used in my merged logic yet.
                                                                    // The prompt's logic for 'birthdayPopupShownOnBirthdayPage'
                                                                    // was tied to showing popup on birthday.html specifically.
                                                                    // My current merged logic shows popup if on index.html and elements are found.
    }
    // End of Integrated Birthday Logic
});

// --- Particle Animation for Hero Section (existing code) ---
// This existing code for particle animation is fine as it is.
// It has its own check for particleCanvas and its own DOMContentLoaded handling for setupParticleAnimation.
const particleCanvas = document.getElementById('particleCanvas');
if (particleCanvas) { // This check ensures it only runs if canvas is on the page (i.e. index.html)
    const ctx = particleCanvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            particleCanvas.width = heroSection.offsetWidth;
            particleCanvas.height = heroSection.offsetHeight;
        }
    }

    class Particle {
        constructor(x, y, size, color, speedX, speedY) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.speedX = speedX;
            this.speedY = speedY;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x + this.size > particleCanvas.width || this.x - this.size < 0) {
                this.speedX *= -1;
            }
            if (this.y + this.size > particleCanvas.height || this.y - this.size < 0) {
                this.speedY *= -1;
            }
            if (this.size > 0.2) this.size -= 0.01;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const particleColors = [
            'rgba(255, 221, 244, 0.7)',
            'rgba(255, 196, 214, 0.7)',
            'rgba(183, 110, 121, 0.5)'
        ];
        const numberOfParticles = 50;

        for (let i = 0; i < numberOfParticles; i++) {
            const size = Math.random() * 3 + 1;
            const x = Math.random() * (particleCanvas.width - size * 2) + size;
            const y = Math.random() * (particleCanvas.height - size * 2) + size;
            const speedX = (Math.random() * 0.5 - 0.25);
            const speedY = (Math.random() * 0.5 - 0.25);
            const color = particleColors[Math.floor(Math.random() * particleColors.length)];
            particles.push(new Particle(x, y, size, color, speedX, speedY));
        }
    }

    function animateParticles() {
        if (!ctx) return;
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].size <= 0.2) {
                particles.splice(i, 1);
                i--;
            }
        }
        if (particles.length < 40 && Math.random() < 0.02) {
             const size = Math.random() * 3 + 1;
             const x = Math.random() * (particleCanvas.width - size * 2) + size;
             const y = Math.random() * (particleCanvas.height - size * 2) + size;
             const speedX = (Math.random() * 0.5 - 0.25);
             const speedY = (Math.random() * 0.5 - 0.25);
             const particleColors = [
                'rgba(255, 221, 244, 0.7)',
                'rgba(255, 196, 214, 0.7)',
                'rgba(183, 110, 121, 0.5)'
             ];
             const color = particleColors[Math.floor(Math.random() * particleColors.length)];
             particles.push(new Particle(x, y, size, color, speedX, speedY));
        }
        requestAnimationFrame(animateParticles);
    }

    function setupParticleAnimation() {
        // This function is defined within the `if (particleCanvas)` block, so it's fine.
        // It's called by the DOMContentLoaded listener below if particleCanvas exists.
        resizeCanvas();
        initParticles();
        animateParticles();
        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
    }

    // Call setup function after DOM content is loaded if canvas exists
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupParticleAnimation);
    } else {
        setupParticleAnimation(); // DOM already loaded
    }
}
