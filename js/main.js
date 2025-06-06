document.addEventListener('DOMContentLoaded', function() {

    // 1. Active Navigation Link Styling
    const navLinks = document.querySelectorAll('nav a');
    const currentPath = window.location.pathname.split('/').pop(); // Gets the current HTML file name

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }

        // Enhanced hover visual for nav links (example: subtle scale)
        // The CSS already handles background/color changes, this is for extra flair
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'scale(1.05)';
            link.style.transition = 'transform 0.2s ease-out';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'scale(1)';
        });
    });

    // 2. Soft fade-in animation for main content sections on page load
    // This targets .hero, .core-sentiment on home, and .content-page h1/p on others
    const animatedElements = document.querySelectorAll(
        '.home-main .hero, .home-main .core-sentiment, .home-main .placeholder-content, .content-page h1, .content-page p, .content-page section'
    );

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`;

        // Trigger animation shortly after DOM content is loaded
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100); // Small delay to ensure styles are applied
    });

    // 3. Add a cute, subtle animation to the main sentiment text on the Home page
    const sentimentText = document.querySelector('.home-main .core-sentiment p');
    if (sentimentText) {
        sentimentText.addEventListener('mouseenter', () => {
            sentimentText.style.transform = 'scale(1.03)';
            sentimentText.style.textShadow = '0 0 10px rgba(183, 110, 121, 0.5)'; /* Rose gold glow */
            sentimentText.style.transition = 'transform 0.3s ease, text-shadow 0.3s ease';
        });
        sentimentText.addEventListener('mouseleave', () => {
            sentimentText.style.transform = 'scale(1)';
            sentimentText.style.textShadow = 'none';
        });
    }

});

// --- Particle Animation for Hero Section ---
const particleCanvas = document.getElementById('particleCanvas');
if (particleCanvas) {
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

            // Bounce off edges
            if (this.x + this.size > particleCanvas.width || this.x - this.size < 0) {
                this.speedX *= -1;
            }
            if (this.y + this.size > particleCanvas.height || this.y - this.size < 0) {
                this.speedY *= -1;
            }

            // Optional: Shrink particles over time or add other effects
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
            'rgba(255, 221, 244, 0.7)', // Soft Pink
            'rgba(255, 196, 214, 0.7)', // Blush
            'rgba(183, 110, 121, 0.5)'  // Rose Gold (more transparent)
        ];
        const numberOfParticles = 50; // Adjust for density

        for (let i = 0; i < numberOfParticles; i++) {
            const size = Math.random() * 3 + 1; // Size between 1 and 4
            const x = Math.random() * (particleCanvas.width - size * 2) + size;
            const y = Math.random() * (particleCanvas.height - size * 2) + size;
            const speedX = (Math.random() * 0.5 - 0.25); // Slow horizontal speed
            const speedY = (Math.random() * 0.5 - 0.25); // Slow vertical speed
            const color = particleColors[Math.floor(Math.random() * particleColors.length)];
            particles.push(new Particle(x, y, size, color, speedX, speedY));
        }
    }

    function animateParticles() {
        if (!ctx) return; // Ensure context is available
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            // Remove small particles
            if (particles[i].size <= 0.2) {
                particles.splice(i, 1);
                i--;
            }
        }
        // Optional: Add new particles periodically if old ones are removed
        if (particles.length < 40 && Math.random() < 0.02) { // Add a new particle if count is low
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

    // Initialize and start animation
    // Ensure this runs after DOM is ready and canvas is sized
    function setupParticleAnimation() {
        if (document.getElementById('particleCanvas')) {
            resizeCanvas();
            initParticles();
            animateParticles();
            window.addEventListener('resize', () => {
                resizeCanvas();
                initParticles(); // Re-initialize particles on resize for new density
            });
        }
    }

    // Call setup function after DOM content is loaded
    // If the main DOMContentLoaded listener already exists, integrate this call there.
    // For simplicity here, assuming it can be called if the canvas element is found.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupParticleAnimation);
    } else {
        setupParticleAnimation(); // DOM already loaded
    }
}
