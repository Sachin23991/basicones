class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        this.isRunning = false;
        
        this.resize();
        this.bindEvents();
        this.init();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
    }

    init() {
        // Create initial particles
        for (let i = 0; i < 100; i++) {
            this.particles.push(this.createParticle());
        }
        this.start();
    }

    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.8 + 0.2,
            hue: Math.random() * 360,
            life: 1.0,
            decay: Math.random() * 0.005 + 0.001
        };
    }

    updateParticle(particle) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= particle.decay;

        // Wrap around screen edges
        if (particle.x < 0) particle.x = this.canvas.width;
        if (particle.x > this.canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = this.canvas.height;
        if (particle.y > this.canvas.height) particle.y = 0;

        // Reset particle when life ends
        if (particle.life <= 0) {
            particle.x = Math.random() * this.canvas.width;
            particle.y = Math.random() * this.canvas.height;
            particle.life = 1.0;
            particle.hue = Math.random() * 360;
        }
    }

    drawParticle(particle) {
        const alpha = particle.opacity * particle.life;
        this.ctx.save();
        
        this.ctx.globalAlpha = alpha;
        this.ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, 1)`;
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = `hsla(${particle.hue}, 70%, 60%, 0.8)`;
        
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.restore();
    }

    drawConnections() {
        this.ctx.save();
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
        this.ctx.lineWidth = 0.5;

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                const distance = Math.sqrt(
                    Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
                );

                if (distance < 100) {
                    const alpha = 1 - (distance / 100);
                    this.ctx.globalAlpha = alpha * 0.2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
        this.ctx.restore();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach(particle => {
            this.updateParticle(particle);
            this.drawParticle(particle);
        });

        // Draw connections between nearby particles
        this.drawConnections();

        if (this.isRunning) {
            this.animationId = requestAnimationFrame(() => this.animate());
        }
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.animate();
        }
    }

    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    addBurst(x, y, count = 20) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = Math.random() * 3 + 2;
            const particle = {
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * 4 + 2,
                opacity: 1,
                hue: Math.random() * 60 + 30, // Gold/orange range
                life: 1.0,
                decay: Math.random() * 0.01 + 0.02
            };
            this.particles.push(particle);
        }

        // Remove excess particles
        if (this.particles.length > 300) {
            this.particles.splice(0, this.particles.length - 300);
        }
    }

    setTheme(category) {
        const themes = {
            determination: { hueRange: [0, 60] },      // Red to orange
            courage: { hueRange: [340, 20] },          // Red
            friendship: { hueRange: [90, 150] },       // Green
            dreams: { hueRange: [240, 300] },          // Purple
            wisdom: { hueRange: [200, 260] },          // Blue
            strength: { hueRange: [45, 75] },          // Yellow
            hope: { hueRange: [25, 65] },              // Orange/yellow
            all: { hueRange: [0, 360] }                // Full spectrum
        };

        const theme = themes[category] || themes.all;
        
        this.particles.forEach(particle => {
            const [minHue, maxHue] = theme.hueRange;
            particle.hue = Math.random() * (maxHue - minHue) + minHue;
        });
    }

    createSpecialEffect(type, x, y) {
        switch(type) {
            case 'explosion':
                this.addBurst(x, y, 30);
                break;
            case 'sparkle':
                this.addSparkle(x, y);
                break;
            case 'wave':
                this.addWave(x, y);
                break;
        }
    }

    addSparkle(x, y) {
        for (let i = 0; i < 10; i++) {
            const particle = {
                x: x + (Math.random() - 0.5) * 50,
                y: y + (Math.random() - 0.5) * 50,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                opacity: 1,
                hue: Math.random() * 60 + 45, // Gold range
                life: 1.0,
                decay: 0.02
            };
            this.particles.push(particle);
        }
    }

    addWave(x, y) {
        for (let i = 0; i < 360; i += 10) {
            const angle = (i * Math.PI) / 180;
            const particle = {
                x: x,
                y: y,
                vx: Math.cos(angle) * 1.5,
                vy: Math.sin(angle) * 1.5,
                size: 2,
                opacity: 0.8,
                hue: i, // Rainbow effect
                life: 1.0,
                decay: 0.015
            };
            this.particles.push(particle);
        }
    }

    destroy() {
        this.stop();
        this.particles = [];
    }
}

// Export for use in other files
if (typeof module !== 'undefined') {
    module.exports = ParticleSystem;
}
