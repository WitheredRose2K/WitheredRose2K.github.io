// Canvas setup
const canvas = document.getElementById('canvas-background');
const ctx = canvas.getContext('2d');
let particles = [];
let particleCount;
let connectionDistance;

const baseWidth = 1920;
const baseHeight = 1080;

const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    connectionDistance = Math.min(canvas.width, canvas.height) / 10;
    particleCount = Math.floor((canvas.width * canvas.height) / (baseWidth * baseHeight) * 100);
};

resizeCanvas();

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = (Math.random() * 1.5 + 0.5) * (canvas.width / baseWidth); // Adjusted size for smaller circles
        this.speedX = ((Math.random() - 0.5) * 50) * (canvas.width / baseWidth); // Adjust speed for smoother movement
        this.speedY = ((Math.random() - 0.5) * 50) * (canvas.height / baseHeight); // Adjust speed for smoother movement
    }

    update(deltaTime) {
        this.x += this.speedX * deltaTime;
        this.y += this.speedY * deltaTime;

        if (this.x < 0 || this.x > canvas.width) {
            this.speedX = -this.speedX;
        }

        if (this.y < 0 || this.y > canvas.height) {
            this.speedY = -this.speedY;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(120, 81, 169, 0.6)'; // Adjusted particle color and opacity
        ctx.shadowColor = '#7b4dff'; // Shadow color
        ctx.shadowBlur = 10; // Shadow blur effect
        ctx.fill();
    }
}

// Function to create particles
const createParticles = () => {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
};

// Function to connect particles with lines
const connectParticles = () => {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                const gradient = ctx.createLinearGradient(particles[a].x, particles[a].y, particles[b].x, particles[b].y);
                gradient.addColorStop(0, 'rgba(120, 81, 169, 1)');
                gradient.addColorStop(1, 'rgba(120, 81, 169, 0)');
                
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
};

// Function to animate particles
let lastTime = 0;
const animateParticles = (timestamp) => {
    const deltaTime = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update(deltaTime);
        particle.draw();
    });

    connectParticles();
    requestAnimationFrame(animateParticles);
};

// Initialize canvas and particles on page load
const init = () => {
    createParticles();
    lastTime = performance.now(); // Initialize lastTime properly
    requestAnimationFrame(animateParticles);
};

// Event listeners
window.addEventListener('load', init);
window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
});

// Hover animation for social panels
document.querySelectorAll('.social-panel').forEach(panel => {
    panel.addEventListener('mouseenter', () => {
        panel.style.transform = 'scale(1.05) translateY(-10px)';
        panel.style.transition = 'transform 0.3s ease';
    });

    panel.addEventListener('mouseleave', () => {
        panel.style.transform = 'scale(1) translateY(0)';
    });
});

const createGlowingCircle = (x, y) => {
    const glowingCircle = document.createElement('div');
    glowingCircle.className = 'glowing-circle';
    glowingCircle.style.left = `${x}px`;
    glowingCircle.style.top = `${y}px`;
    document.body.appendChild(glowingCircle);

    // Remove the element after animation completes
    glowingCircle.addEventListener('animationend', () => {
        glowingCircle.remove();
    });
};

document.addEventListener('click', (e) => {
    createGlowingCircle(e.clientX, e.clientY);
});
