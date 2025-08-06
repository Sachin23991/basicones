class UltimateAnimeQuoteApp {
    constructor() {
        this.animationEngine = new AdvancedAnimationEngine();
        this.particleSystem = null;
        this.currentCategory = 'all';
        this.currentQuote = null;
        this.filteredQuotes = [];
        this.currentQuoteIndex = 0;
        this.favorites = this.loadFavorites();
        this.isAutoPlay = false;
        this.autoPlayInterval = null;
        this.currentSeries = null;
        
        this.init();
    }

    async init() {
        await this.showLoadingScreen();
        this.setupParticleSystem();
        this.setupEventListeners();
        this.renderSeriesGrid();
        this.renderCategoryButtons();
        this.loadQuotesByCategory('all');
        this.startCounterAnimations();
        this.hideLoadingScreen();
        
        // Load initial random quote
        setTimeout(() => {
            this.loadRandomQuote();
        }, 1000);
    }

    async showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const progressBar = loadingScreen.querySelector('.progress-bar');
        
        loadingScreen.style.display = 'flex';
        
        // Animate progress bar
        return new Promise(resolve => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15 + 5;
                progressBar.style.width = Math.min(progress, 100) + '%';
                
                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(resolve, 500);
                }
            }, 150);
        });
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }

    setupParticleSystem() {
        this.particleSystem = new ParticleSystem('particleCanvas');
    }

    setupEventListeners() {
        // Category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectCategory(e.target.closest('.category-btn').dataset.category);
            });
        });

        // Control buttons
        document.getElementById('playAnimation')?.addEventListener('click', () => {
            this.playCurrentQuote();
        });

        document.getElementById('randomQuote')?.addEventListener('click', () => {
            this.loadRandomQuote();
        });

        document.getElementById('favoriteQuote')?.addEventListener('click', () => {
            this.toggleFavorite();
        });

        document.getElementById('shareQuote')?.addEventListener('click', () => {
            this.shareQuote();
        });

        document.getElementById('fullscreenMode')?.addEventListener('click', () => {
            this.toggleFullscreen();
        });

        // Navigation
        document.getElementById('prevQuote')?.addEventListener('click', () => {
            this.previousQuote();
        });

        document.getElementById('nextQuote')?.addEventListener('click', () => {
            this.nextQuote();
        });

        // Series search
        document.getElementById('seriesSearch')?.addEventListener('input', (e) => {
            this.filterSeries(e.target.value);
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });

        // Double click for auto-play
        document.getElementById('quoteStage')?.addEventListener('dblclick', () => {
            this.toggleAutoPlay();
        });

        // Mouse events for particle effects
        document.getElementById('quoteStage')?.addEventListener('click', (e) => {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.particleSystem?.createSpecialEffect('sparkle', e.clientX, e.clientY);
        });
    }

    renderCategoryButtons() {
        const container = document.querySelector('.motivation-categories');
        if (!container) return;

        container.innerHTML = Object.entries(MOTIVATION_CATEGORIES).map(([key, category]) => {
            const count = this.getQuoteCount(key);
            return `
                <button class="category-btn ${key === 'all' ? 'active' : ''}" data-category="${key}">
                    <div class="category-icon">${category.icon}</div>
                    <span>${category.name}</span>
                    <div class="category-count">${count}+</div>
                </button>
            `;
        }).join('');
    }

    renderSeriesGrid() {
        const container = document.getElementById('seriesGrid');
        if (!container) return;

        const series = Object.keys(MEGA_ANIME_QUOTES);
        container.innerHTML = series.map(seriesName => {
            const quotes = MEGA_ANIME_QUOTES[seriesName];
            const meta = ANIME_SERIES_META[seriesName] || {};
            
            return `
                <div class="series-card" data-series="${seriesName}">
                    <div class="quote-count">${quotes.length}</div>
                    <div class="series-title">${seriesName}</div>
                    <div class="series-meta">${meta.year || 'Classic'} • ${meta.studio || 'Various'}</div>
                    <div class="series-description">${meta.description || 'Epic anime series'}</div>
                </div>
            `;
        }).join('');

        // Add click listeners
        container.querySelectorAll('.series-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const series = e.target.closest('.series-card').dataset.series;
                this.selectSeries(series);
            });
        });
    }

    selectCategory(category) {
        // Update active button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`)?.classList.add('active');
        
        this.currentCategory = category;
        this.loadQuotesByCategory(category);
        this.particleSystem?.setTheme(category);
        
        // Update background theme
        this.updateBackgroundTheme(category);
    }

    selectSeries(series) {
        this.currentSeries = series;
        const quotes = getQuotesBySeries(series);
        
        if (quotes.length > 0) {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            this.currentQuote = { ...randomQuote, series };
            this.playCurrentQuote();
            this.showNotification(`Loaded quotes from ${series}!`);
        }
    }

    loadQuotesByCategory(category) {
        this.filteredQuotes = getQuotesByCategory(category);
        this.currentQuoteIndex = 0;
        this.updateQuoteIndicator();
    }

    loadRandomQuote() {
        const randomQuote = getRandomQuote(this.currentCategory);
        if (randomQuote) {
            this.currentQuote = randomQuote;
            this.currentQuoteIndex = this.filteredQuotes.findIndex(q => 
                q.character === randomQuote.character && q.quote === randomQuote.quote
            );
            this.playCurrentQuote();
            this.updateQuoteIndicator();
        }
    }

    async playCurrentQuote() {
        if (!this.currentQuote) return;

        // Update UI
        this.updatePlayButton(true);
        
        // Create particle burst effect
        this.particleSystem?.createSpecialEffect('explosion', 
            window.innerWidth / 2, 
            window.innerHeight / 2
        );

        // Play animation
        await this.animationEngine.playQuoteAnimation(this.currentQuote, this.currentCategory);
        
        // Update UI
        this.updatePlayButton(false);
        this.updateFavoriteButton();
    }

    previousQuote() {
        if (this.filteredQuotes.length === 0) return;
        
        this.currentQuoteIndex = this.currentQuoteIndex > 0 ? 
            this.currentQuoteIndex - 1 : 
            this.filteredQuotes.length - 1;
        
        this.currentQuote = this.filteredQuotes[this.currentQuoteIndex];
        this.playCurrentQuote();
        this.updateQuoteIndicator();
    }

    nextQuote() {
        if (this.filteredQuotes.length === 0) return;
        
        this.currentQuoteIndex = this.currentQuoteIndex < this.filteredQuotes.length - 1 ? 
            this.currentQuoteIndex + 1 : 
            0;
        
        this.currentQuote = this.filteredQuotes[this.currentQuoteIndex];
        this.playCurrentQuote();
        this.updateQuoteIndicator();
    }

    updateQuoteIndicator() {
        const currentSpan = document.querySelector('.current-quote');
        const totalSpan = document.querySelector('.total-quotes');
        
        if (currentSpan) currentSpan.textContent = this.currentQuoteIndex + 1;
        if (totalSpan) totalSpan.textContent = this.filteredQuotes.length;
    }

    toggleFavorite() {
        if (!this.currentQuote) return;

        const quoteKey = `${this.currentQuote.character}-${this.currentQuote.quote}`;
        
        if (this.favorites.has(quoteKey)) {
            this.favorites.delete(quoteKey);
            this.showNotification('Removed from favorites');
        } else {
            this.favorites.add(quoteKey);
            this.showNotification('Added to favorites!');
        }
        
        this.saveFavorites();
        this.updateFavoriteButton();
        this.renderFavorites();
    }

    updateFavoriteButton() {
        const btn = document.getElementById('favoriteQuote');
        if (!btn || !this.currentQuote) return;

        const quoteKey = `${this.currentQuote.character}-${this.currentQuote.quote}`;
        const isFavorite = this.favorites.has(quoteKey);
        
        btn.classList.toggle('active', isFavorite);
        btn.querySelector('.btn-icon').textContent = isFavorite ? '💖' : '❤️';
    }

    async shareQuote() {
        if (!this.currentQuote) return;

        const shareText = `"${this.currentQuote.quote}" - ${this.currentQuote.character} (${this.currentQuote.series})`;
        
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Epic Anime Quote',
                    text: shareText,
                    url: window.location.href
                });
            } catch (err) {
                this.copyToClipboard(shareText);
            }
        } else {
            this.copyToClipboard(shareText);
        }
    }

    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showNotification('Quote copied to clipboard!');
        } catch (err) {
            this.showNotification('Could not copy to clipboard');
        }
    }

    toggleFullscreen() {
        const stage = document.getElementById('quoteStage');
        
        if (!document.fullscreenElement) {
            stage.requestFullscreen().catch(err => {
                this.showNotification('Fullscreen not supported');
            });
        } else {
            document.exitFullscreen();
        }
    }

    toggleAutoPlay() {
        this.isAutoPlay = !this.isAutoPlay;
        
        if (this.isAutoPlay) {
            this.showNotification('Auto-play enabled! (Double-click to disable)');
            this.autoPlayInterval = setInterval(() => {
                this.nextQuote();
            }, 8000);
        } else {
            this.showNotification('Auto-play disabled');
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }
        }
    }

    handleKeyboard(e) {
        switch(e.key) {
            case ' ':
                e.preventDefault();
                this.playCurrentQuote();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.previousQuote();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextQuote();
                break;
            case 'r':
            case 'R':
                this.loadRandomQuote();
                break;
            case 'f':
            case 'F':
                this.toggleFavorite();
                break;
            case 's':
            case 'S':
                this.shareQuote();
                break;
            case 'Escape':
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
                break;
        }
    }

    filterSeries(searchTerm) {
        const cards = document.querySelectorAll('.series-card');
        cards.forEach(card => {
            const seriesName = card.querySelector('.series-title').textContent.toLowerCase();
            const isMatch = seriesName.includes(searchTerm.toLowerCase());
            card.style.display = isMatch ? 'block' : 'none';
        });
    }

    updateBackgroundTheme(category) {
        const root = document.documentElement;
        const themes = {
            determination: { primary: '#FF6B35', secondary: '#FFD700' },
            courage: { primary: '#DC143C', secondary: '#FF1744' },
            friendship: { primary: '#32CD32', secondary: '#00FF80' },
            dreams: { primary: '#9370DB', secondary: '#FFD700' },
            wisdom: { primary: '#4169E1', secondary: '#00BFFF' },
            strength: { primary: '#FFFF00', secondary: '#FFA500' },
            hope: { primary: '#FFB347', secondary: '#FF8C00' }
        };

        const theme = themes[category];
        if (theme) {
            root.style.setProperty('--theme-primary', theme.primary);
            root.style.setProperty('--theme-secondary', theme.secondary);
        }
    }

    updatePlayButton(isPlaying) {
        const btn = document.getElementById('playAnimation');
        if (!btn) return;

        const text = btn.querySelector('.btn-text');
        const icon = btn.querySelector('.btn-icon');
        
        if (isPlaying) {
            text.textContent = 'UNLEASHING...';
            icon.textContent = '⚡';
            btn.classList.add('playing');
        } else {
            text.textContent = 'UNLEASH POWER';
            icon.textContent = '▶';
            btn.classList.remove('playing');
        }
    }

    startCounterAnimations() {
        document.querySelectorAll('.stat-number').forEach(counter => {
            const target = parseInt(counter.dataset.target);
            let current = 0;
            const increment = target / 100;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 50);
        });
    }

    getQuoteCount(category) {
        return getQuotesByCategory(category).length;
    }

    showNotification(message) {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--solar-orange), var(--stellar-gold));
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            z-index: 10000;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            font-family: inherit;
            font-weight: 600;
            animation: slideInRight 0.3s ease-out;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    loadFavorites() {
        try {
            const saved = localStorage.getItem('anime-quote-favorites');
            return saved ? new Set(JSON.parse(saved)) : new Set();
        } catch {
            return new Set();
        }
    }

    saveFavorites() {
        try {
            localStorage.setItem('anime-quote-favorites', JSON.stringify([...this.favorites]));
        } catch {
            // Ignore storage errors
        }
    }

    renderFavorites() {
        const container = document.getElementById('favoritesList');
        if (!container) return;

        if (this.favorites.size === 0) {
            container.innerHTML = '<p>No favorites yet. Click the heart to add quotes!</p>';
            return;
        }

        container.innerHTML = [...this.favorites].map(quoteKey => {
            const [character] = quoteKey.split('-');
            return `
                <div class="favorite-item">
                    <div class="favorite-character">${character}</div>
                    <button class="remove-favorite" data-quote="${quoteKey}">×</button>
                </div>
            `;
        }).join('');

        // Add remove listeners
        container.querySelectorAll('.remove-favorite').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const quoteKey = e.target.dataset.quote;
                this.favorites.delete(quoteKey);
                this.saveFavorites();
                this.renderFavorites();
                this.updateFavoriteButton();
            });
        });
    }

    destroy() {
        if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
        this.animationEngine?.destroy();
        this.particleSystem?.destroy();
    }
}

// Additional CSS for new features
const additionalCSS = `
@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}

.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--cosmic-black);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100000;
    opacity: 1;
    transition: opacity 0.5s ease;
}

.loading-animation {
    text-align: center;
    color: var(--ethereal-white);
}

.loading-circle {
    width: 60px;
    height: 60px;
    border: 3px solid rgba(0, 255, 255, 0.3);
    border-top: 3px solid var(--electric-blue);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 2rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loading-text {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: var(--electric-blue);
}

.loading-progress {
    width: 300px;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    overflow: hidden;
    margin: 0 auto;
}

.progress-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--electric-blue), var(--stellar-gold));
    width: 0%;
    transition: width 0.3s ease;
}

.control-btn.playing {
    animation: buttonGlow 1s ease-in-out infinite alternate;
}

@keyframes buttonGlow {
    0% { box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3); }
    100% { box-shadow: 0 4px 30px rgba(255, 107, 53, 0.8), 0 0 50px rgba(0, 255, 255, 0.4); }
}

.favorite-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.8rem;
    margin-bottom: 0.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.favorite-character {
    font-weight: 600;
    color: var(--stellar-gold);
}

.remove-favorite {
    background: var(--void-red);
    border: none;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
}

.quote-navigation {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 1rem;
    background: rgba(0, 0, 0, 0.5);
    padding: 0.5rem 1rem;
    border-radius: 25px;
    backdrop-filter: blur(10px);
}

.nav-btn {
    background: transparent;
    border: 2px solid var(--electric-blue);
    color: var(--electric-blue);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    transition: all 0.3s ease;
}

.nav-btn:hover {
    background: var(--electric-blue);
    color: white;
    transform: scale(1.1);
}

.quote-indicator {
    color: var(--ethereal-white);
    font-size: 0.9rem;
    min-width: 60px;
    text-align: center;
}
`;

// Inject additional CSS
const additionalStyleSheet = document.createElement('style');
additionalStyleSheet.textContent = additionalCSS;
document.head.appendChild(additionalStyleSheet);

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.ultimateAnimeQuoteApp = new UltimateAnimeQuoteApp();
});

// Export for use in other files
if (typeof module !== 'undefined') {
    module.exports = UltimateAnimeQuoteApp;
}
