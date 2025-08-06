class AdvancedAnimationEngine {
    constructor() {
        this.currentAnimation = null;
        this.animationQueue = [];
        this.isPlaying = false;
        this.effectsCache = new Map();
        this.timelines = new Map();
    }

    async playQuoteAnimation(quoteData, category = 'all') {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        this.currentAnimation = quoteData;
        
        // Clear previous animations
        this.clearAllAnimations();
        
        // Set dynamic background based on category
        await this.setDynamicBackground(category, quoteData.series);
        
        // Create category-specific animation sequence
        await this.executeAnimationSequence(quoteData, category);
        
        this.isPlaying = false;
        this.addAmbientEffects(category);
    }

    clearAllAnimations() {
        const stage = document.getElementById('quoteStage');
        const animatedElements = stage.querySelectorAll('[class*="animate-"]');
        
        animatedElements.forEach(el => {
            el.className = el.className.replace(/animate-\S+/g, '');
            el.style.opacity = '0';
            el.style.transform = '';
        });

        // Clear background layers
        const bgLayers = stage.querySelectorAll('.bg-layer');
        bgLayers.forEach(layer => {
            layer.style.opacity = '0';
            layer.className = layer.className.replace(/animate-\S+/g, '');
        });

        // Clear special effects
        const effects = stage.querySelectorAll('.advanced-effects > *');
        effects.forEach(effect => {
            effect.style.opacity = '0';
            effect.style.transform = 'scale(0)';
            effect.className = effect.className.replace(/animate-\S+/g, '');
        });
    }

    async setDynamicBackground(category, series) {
        const stage = document.getElementById('quoteStage');
        const backgrounds = this.getCategoryBackgrounds(category);
        
        const primaryBg = stage.querySelector('.primary-bg');
        const secondaryBg = stage.querySelector('.secondary-bg');
        const tertiaryBg = stage.querySelector('.tertiary-bg');

        // Set backgrounds with smooth transitions
        primaryBg.style.background = backgrounds.primary;
        secondaryBg.style.background = backgrounds.secondary;
        tertiaryBg.style.background = backgrounds.tertiary;

        // Animate background layers
        await this.animateElement(primaryBg, 'fadeInScale', 1000);
        await this.delay(300);
        await this.animateElement(secondaryBg, 'fadeInRotate', 800);
        await this.delay(200);
        await this.animateElement(tertiaryBg, 'fadeInPulse', 600);
    }

    getCategoryBackgrounds(category) {
        const backgrounds = {
            determination: {
                primary: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFD700 100%)',
                secondary: 'radial-gradient(circle, rgba(255,107,53,0.3), rgba(220,20,60,0.3))',
                tertiary: 'conic-gradient(from 0deg, rgba(255,215,0,0.2), rgba(255,69,0,0.2), rgba(255,215,0,0.2))'
            },
            courage: {
                primary: 'linear-gradient(135deg, #DC143C 0%, #B22222 50%, #FF1744 100%)',
                secondary: 'radial-gradient(circle, rgba(220,20,60,0.4), rgba(139,0,0,0.3))',
                tertiary: 'conic-gradient(from 45deg, rgba(255,23,68,0.3), rgba(178,34,34,0.2), rgba(255,23,68,0.3))'
            },
            friendship: {
                primary: 'linear-gradient(135deg, #32CD32 0%, #00FF7F 50%, #00FF80 100%)',
                secondary: 'radial-gradient(circle, rgba(50,205,50,0.3), rgba(0,255,127,0.3))',
                tertiary: 'conic-gradient(from 120deg, rgba(0,255,128,0.2), rgba(50,205,50,0.2), rgba(0,255,128,0.2))'
            },
            dreams: {
                primary: 'linear-gradient(135deg, #9370DB 0%, #8A2BE2 50%, #9400D3 100%)',
                secondary: 'radial-gradient(circle, rgba(147,112,219,0.3), rgba(138,43,226,0.3))',
                tertiary: 'conic-gradient(from 270deg, rgba(148,0,211,0.2), rgba(147,112,219,0.2), rgba(148,0,211,0.2))'
            },
            wisdom: {
                primary: 'linear-gradient(135deg, #4169E1 0%, #0000FF 50%, #00BFFF 100%)',
                secondary: 'radial-gradient(circle, rgba(65,105,225,0.3), rgba(0,191,255,0.3))',
                tertiary: 'conic-gradient(from 180deg, rgba(0,191,255,0.2), rgba(65,105,225,0.2), rgba(0,191,255,0.2))'
            },
            hope: {
                primary: 'linear-gradient(135deg, #FFB347 0%, #FFA500 50%, #FF8C00 100%)',
                secondary: 'radial-gradient(circle, rgba(255,179,71,0.3), rgba(255,140,0,0.3))',
                tertiary: 'conic-gradient(from 60deg, rgba(255,140,0,0.2), rgba(255,179,71,0.2), rgba(255,140,0,0.2))'
            },
            strength: {
                primary: 'linear-gradient(135deg, #FFFF00 0%, #FFD700 50%, #FFA500 100%)',
                secondary: 'radial-gradient(circle, rgba(255,255,0,0.3), rgba(255,165,0,0.3))',
                tertiary: 'conic-gradient(from 30deg, rgba(255,165,0,0.2), rgba(255,215,0,0.2), rgba(255,165,0,0.2))'
            },
            all: {
                primary: 'linear-gradient(135deg, #FF6B35 0%, #00FFFF 50%, #FFD700 100%)',
                secondary: 'radial-gradient(circle, rgba(0,255,255,0.3), rgba(255,215,0,0.3))',
                tertiary: 'conic-gradient(from 0deg, rgba(255,107,53,0.2), rgba(0,255,255,0.2), rgba(255,215,0,0.2))'
            }
        };
        return backgrounds[category] || backgrounds.all;
    }

    async executeAnimationSequence(quoteData, category) {
        const stage = document.getElementById('quoteStage');
        
        // Set content
        stage.querySelector('.anime-series-name').textContent = quoteData.series;
        stage.querySelector('.character-name').textContent = quoteData.character;
        stage.querySelector('.quote-text').textContent = `"${quoteData.quote}"`;
        stage.querySelector('.quote-category-tag').textContent = `#${category}`;

        // Create category-specific effects
        await this.createCategoryEffects(category, stage);
        
        await this.delay(500);

        // Series name reveal
        await this.animateElement(stage.querySelector('.anime-series-name'), 'slideInTop', 800);
        
        await this.delay(600);

        // Character name with power effects
        await Promise.all([
            this.animateElement(stage.querySelector('.character-name'), 'powerReveal', 1200),
            this.createPowerAura(stage, category)
        ]);
        
        await this.delay(800);

        // Quote text with typewriter effect
        await this.typewriterEffect(stage.querySelector('.quote-text'), quoteData.quote, category);
        
        await this.delay(1000);

        // Energy rings and final effects
        await Promise.all([
            this.createEnergyRings(stage, category),
            this.animateElement(stage.querySelector('.quote-category-tag'), 'slideInBottom', 600)
        ]);

        // Final flourish
        await this.createFinalFlourish(stage, category);
    }

    async createCategoryEffects(category, stage) {
        const effects = {
            determination: () => this.createDeterminationEffects(stage),
            courage: () => this.createCourageEffects(stage),
            friendship: () => this.createFriendshipEffects(stage),
            dreams: () => this.createDreamEffects(stage),
            wisdom: () => this.createWisdomEffects(stage),
            strength: () => this.createStrengthEffects(stage),
            hope: () => this.createHopeEffects(stage)
        };

        if (effects[category]) {
            await effects[category]();
        }
    }

    async createDeterminationEffects(stage) {
        // Screen shake and flame particles
        this.screenShake(800, 8);
        this.createFlameParticles(stage, 15);
    }

    async createCourageEffects(stage) {
        // Sword slashes and warrior energy
        this.createSwordSlashes(stage);
        this.createWarriorAura(stage);
    }

    async createFriendshipEffects(stage) {
        // Heart particles and connecting lines
        this.createHeartParticles(stage, 12);
        this.createConnectionLines(stage);
    }

    async createDreamEffects(stage) {
        // Stardust and cosmic swirls
        this.createStardust(stage, 20);
        this.createCosmicSwirls(stage);
    }

    async createWisdomEffects(stage) {
        // Ancient runes and knowledge symbols
        this.createAncientRunes(stage);
        this.createKnowledgeSymbols(stage);
    }

    async createStrengthEffects(stage) {
        // Lightning bolts and power surges
        this.createLightningBolts(stage, 8);
        this.createPowerSurges(stage);
    }

    async createHopeEffects(stage) {
        // Sunrise rays and gentle light
        this.createSunriseRays(stage);
        this.createGentleLight(stage);
    }

    async typewriterEffect(element, text, category) {
        element.style.opacity = '1';
        element.textContent = '';
        
        const fullText = `"${text}"`;
        const colors = this.getCategoryColors(category);
        
        for (let i = 0; i < fullText.length; i++) {
            element.textContent += fullText.charAt(i);
            
            // Add character-specific effects
            if (Math.random() > 0.8) {
                this.createCharacterSparkle(element, colors.primary);
            }
            
            await this.delay(30 + Math.random() * 40);
        }

        // Final text animation
        element.style.animation = 'textGlow 2s ease-in-out infinite alternate';
    }

    createCharacterSparkle(element, color) {
        const sparkle = document.createElement('div');
        sparkle.className = 'character-sparkle';
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 20;
            box-shadow: 0 0 10px ${color};
        `;
        
        const rect = element.getBoundingClientRect();
        const stageRect = document.getElementById('quoteStage').getBoundingClientRect();
        
        sparkle.style.left = (rect.left - stageRect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top - stageRect.top + Math.random() * rect.height) + 'px';
        
        document.getElementById('quoteStage').appendChild(sparkle);
        
        sparkle.animate([
            { opacity: 0, transform: 'scale(0) rotate(0deg)' },
            { opacity: 1, transform: 'scale(1.5) rotate(180deg)' },
            { opacity: 0, transform: 'scale(0) rotate(360deg)' }
        ], {
            duration: 1500,
            easing: 'ease-out'
        }).onfinish = () => sparkle.remove();
    }

    async createPowerAura(stage, category) {
        const aura = stage.querySelector('.power-aura');
        const colors = this.getCategoryColors(category);
        
        aura.style.background = `radial-gradient(circle, ${colors.primary}40, ${colors.secondary}20, transparent)`;
        
        return this.animateElement(aura, 'auraExpand', 2000);
    }

    async createEnergyRings(stage, category) {
        const rings = stage.querySelector('.energy-rings');
        const colors = this.getCategoryColors(category);
        
        rings.style.borderColor = colors.primary;
        
        return this.animateElement(rings, 'ringsExpand', 1500);
    }

    createFlameParticles(stage, count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const flame = document.createElement('div');
                flame.className = 'flame-particle';
                flame.style.cssText = `
                    position: absolute;
                    width: 8px;
                    height: 20px;
                    background: linear-gradient(to top, #FF6B35, #FFD700);
                    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                    left: ${Math.random() * 100}%;
                    bottom: 0;
                    pointer-events: none;
                    z-index: 12;
                `;
                
                stage.appendChild(flame);
                
                flame.animate([
                    { transform: 'translateY(0) scale(1)', opacity: 1 },
                    { transform: 'translateY(-200px) scale(0.5)', opacity: 0 }
                ], {
                    duration: 2000 + Math.random() * 1000,
                    easing: 'ease-out'
                }).onfinish = () => flame.remove();
            }, i * 150);
        }
    }

    createLightningBolts(stage, count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const bolt = document.createElement('div');
                bolt.className = 'lightning-bolt';
                bolt.style.cssText = `
                    position: absolute;
                    width: 2px;
                    height: 100px;
                    background: linear-gradient(to bottom, #FFFF00, #00FFFF, transparent);
                    left: ${Math.random() * 100}%;
                    top: 0;
                    pointer-events: none;
                    z-index: 14;
                    box-shadow: 0 0 20px #FFFF00;
                    transform: rotate(${Math.random() * 30 - 15}deg);
                `;
                
                stage.appendChild(bolt);
                
                bolt.animate([
                    { opacity: 0, transform: 'scaleY(0) rotate(' + (Math.random() * 30 - 15) + 'deg)' },
                    { opacity: 1, transform: 'scaleY(1) rotate(' + (Math.random() * 30 - 15) + 'deg)' },
                    { opacity: 0, transform: 'scaleY(1) rotate(' + (Math.random() * 30 - 15) + 'deg)' }
                ], {
                    duration: 300,
                    easing: 'ease-out'
                }).onfinish = () => bolt.remove();
            }, i * 200);
        }
    }

    createStardust(stage, count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const star = document.createElement('div');
                star.className = 'star-particle';
                star.style.cssText = `
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    background: #FFD700;
                    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    pointer-events: none;
                    z-index: 13;
                    box-shadow: 0 0 15px #FFD700;
                `;
                
                stage.appendChild(star);
                
                star.animate([
                    { opacity: 0, transform: 'scale(0) rotate(0deg)' },
                    { opacity: 1, transform: 'scale(1) rotate(180deg)' },
                    { opacity: 0, transform: 'scale(0) rotate(360deg)' }
                ], {
                    duration: 3000 + Math.random() * 2000,
                    easing: 'ease-out'
                }).onfinish = () => star.remove();
            }, i * 100);
        }
    }

    getCategoryColors(category) {
        const colors = {
            determination: { primary: '#FF6B35', secondary: '#FFD700' },
            courage: { primary: '#DC143C', secondary: '#FF1744' },
            friendship: { primary: '#32CD32', secondary: '#00FF80' },
            dreams: { primary: '#9370DB', secondary: '#FFD700' },
            wisdom: { primary: '#4169E1', secondary: '#00BFFF' },
            strength: { primary: '#FFFF00', secondary: '#FFA500' },
            hope: { primary: '#FFB347', secondary: '#FF8C00' },
            all: { primary: '#00FFFF', secondary: '#FFD700' }
        };
        return colors[category] || colors.all;
    }

    async animateElement(element, animationType, duration) {
        return new Promise(resolve => {
            element.style.opacity = '1';
            element.classList.add(`animate-${animationType}`);
            
            setTimeout(() => {
                element.classList.remove(`animate-${animationType}`);
                resolve();
            }, duration);
        });
    }

    screenShake(duration, intensity) {
        const stage = document.getElementById('quoteStage');
        
        stage.animate([
            { transform: 'translate(0, 0)' },
            { transform: `translate(${intensity}px, ${intensity}px)` },
            { transform: `translate(-${intensity}px, -${intensity}px)` },
            { transform: `translate(${intensity}px, -${intensity}px)` },
            { transform: `translate(-${intensity}px, ${intensity}px)` },
            { transform: 'translate(0, 0)' }
        ], {
            duration: duration,
            iterations: 3,
            easing: 'ease-in-out'
        });
    }

    addAmbientEffects(category) {
        const stage = document.getElementById('quoteStage');
        
        // Continuous floating particles
        this.ambientParticleInterval = setInterval(() => {
            if (!this.isPlaying) {
                this.createAmbientParticle(stage, category);
            }
        }, 2000);

        // Random energy pulses
        this.ambientPulseInterval = setInterval(() => {
            if (!this.isPlaying) {
                this.createAmbientPulse(stage, category);
            }
        }, 4000);
    }

    createAmbientParticle(stage, category) {
        const colors = this.getCategoryColors(category);
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: ${colors.primary};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: 100%;
            pointer-events: none;
            z-index: 11;
            box-shadow: 0 0 10px ${colors.primary};
        `;
        
        stage.appendChild(particle);
        
        particle.animate([
            { transform: 'translateY(0) scale(0)', opacity: 0 },
            { transform: 'translateY(-300px) scale(1)', opacity: 1 },
            { transform: 'translateY(-500px) scale(0)', opacity: 0 }
        ], {
            duration: 5000,
            easing: 'ease-out'
        }).onfinish = () => particle.remove();
    }

    createAmbientPulse(stage, category) {
        const colors = this.getCategoryColors(category);
        const pulse = document.createElement('div');
        pulse.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            border: 2px solid ${colors.secondary};
            border-radius: 50%;
            pointer-events: none;
            z-index: 11;
            transform: translate(-50%, -50%);
        `;
        
        stage.appendChild(pulse);
        
        pulse.animate([
            { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
            { opacity: 0, transform: 'translate(-50%, -50%) scale(8)' }
        ], {
            duration: 2000,
            easing: 'ease-out'
        }).onfinish = () => pulse.remove();
    }

    async createFinalFlourish(stage, category) {
        const colors = this.getCategoryColors(category);
        
        // Create expanding ring of energy
        const flourish = document.createElement('div');
        flourish.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 50px;
            height: 50px;
            border: 3px solid ${colors.primary};
            border-radius: 50%;
            pointer-events: none;
            z-index: 16;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 30px ${colors.primary};
        `;
        
        stage.appendChild(flourish);
        
        return flourish.animate([
            { opacity: 1, transform: 'translate(-50%, -50%) scale(1) rotate(0deg)' },
            { opacity: 0.5, transform: 'translate(-50%, -50%) scale(10) rotate(360deg)' },
            { opacity: 0, transform: 'translate(-50%, -50%) scale(15) rotate(720deg)' }
        ], {
            duration: 2500,
            easing: 'ease-out'
        }).finished.then(() => flourish.remove());
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    destroy() {
        if (this.ambientParticleInterval) clearInterval(this.ambientParticleInterval);
        if (this.ambientPulseInterval) clearInterval(this.ambientPulseInterval);
        this.effectsCache.clear();
        this.timelines.clear();
    }
}

// CSS animations for the animation engine
const animationCSS = `
@keyframes slideInTop {
    0% { opacity: 0; transform: translateY(-50px); }
    100% { opacity: 1; transform: translateY(0); }
}

@keyframes slideInBottom {
    0% { opacity: 0; transform: translateY(50px); }
    100% { opacity: 1; transform: translateY(0); }
}

@keyframes powerReveal {
    0% { opacity: 0; transform: translateY(-30px) rotateX(-15deg) scale(0.8); }
    50% { opacity: 0.8; transform: translateY(0) rotateX(0) scale(1.1); }
    100% { opacity: 1; transform: translateY(0) rotateX(0) scale(1); }
}

@keyframes fadeInScale {
    0% { opacity: 0; transform: scale(0.8); }
    100% { opacity: 0.7; transform: scale(1); }
}

@keyframes fadeInRotate {
    0% { opacity: 0; transform: scale(0.9) rotate(-10deg); }
    100% { opacity: 0.5; transform: scale(1) rotate(0deg); }
}

@keyframes fadeInPulse {
    0% { opacity: 0; transform: scale(0.95); }
    100% { opacity: 0.3; transform: scale(1); }
}

@keyframes auraExpand {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
    50% { opacity: 0.8; transform: translate(-50%, -50%) scale(2); }
    100% { opacity: 0.4; transform: translate(-50%, -50%) scale(3); }
}

@keyframes ringsExpand {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0) rotate(0deg); }
    50% { opacity: 1; transform: translate(-50%, -50%) scale(3) rotate(180deg); }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(6) rotate(360deg); }
}

@keyframes textGlow {
    0% { 
        text-shadow: 
            0 0 15px rgba(255, 255, 255, 0.3),
            0 0 30px rgba(0, 255, 255, 0.2);
    }
    100% { 
        text-shadow: 
            0 0 25px rgba(255, 255, 255, 0.6),
            0 0 50px rgba(0, 255, 255, 0.4),
            0 0 75px rgba(255, 215, 0, 0.3);
    }
}
`;

// Inject animation CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = animationCSS;
document.head.appendChild(styleSheet);

// Export for use in other files
if (typeof module !== 'undefined') {
    module.exports = AdvancedAnimationEngine;
}
