function updateTime() {
    const timeElement = document.getElementById('current-time');
    const now = new Date();
    
    // Format: YYYY-MM-DD HH:MM:SS
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    timeElement.textContent = formattedTime;
}

// Generate binary background for profile
function generateBinaryBackground() {
    const binaryBg = document.querySelector('.binary-bg');
    if (!binaryBg) return;
    
    let binaryText = '';
    for (let i = 0; i < 500; i++) {
        binaryText += Math.random() > 0.5 ? '1' : '0';
        if (i % 50 === 0) binaryText += '<br>';
    }
    binaryBg.innerHTML = binaryText;
}

// Initialize neon lines
function initNeonLines() {
    const neonLines = document.querySelector('.neon-lines');
    if (!neonLines) return;
    
    for (let i = 0; i < 3; i++) {
        const line = document.createElement('div');
        line.style.position = 'absolute';
        line.style.inset = '0';
        line.style.borderRadius = '50%';
        line.style.border = `1px solid rgba(0, 255, 242, ${0.2 + i * 0.1})`;
        line.style.transform = `scale(${1 + i * 0.1})`;
        line.style.animation = `rotateLines ${10 - i * 2}s linear infinite ${i * 0.5}s`;
        neonLines.appendChild(line);
    }
}

// Animate skill progress bars
function animateSkills() {
    document.querySelectorAll('.skill-item').forEach((skill, index) => {
        const progress = skill.querySelector('.progress');
        const originalWidth = progress.style.width;
        progress.style.width = '0';
        
        setTimeout(() => {
            progress.style.width = originalWidth;
            
            // Activate passed milestones
            const percentage = parseInt(originalWidth);
            skill.querySelectorAll('.milestone').forEach(milestone => {
                const position = parseInt(milestone.style.left);
                if (position <= percentage) {
                    milestone.classList.add('active');
                }
            });
        }, 300 * (index + 1));
    });
}

// Add random glitch effects
function addGlitchEffects() {
    setInterval(() => {
        const elements = document.querySelectorAll('.skill-name, .skill-percentage, .card-title');
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        randomElement.style.animation = 'glitch 0.2s ease';
        setTimeout(() => {
            randomElement.style.animation = '';
        }, 200);
    }, 3000);
}

// Handle blog section controls
function initBlogControls() {
    const controlBtns = document.querySelectorAll('.control-btn');
    controlBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            controlBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Here you would typically filter blog posts based on the selected category
            const category = btn.textContent.trim();
            filterBlogPosts(category);
        });
    });
}

// Filter blog posts based on category
function filterBlogPosts(category) {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        if (category === 'LATEST') {
            card.style.display = 'flex';
        } else if (category === 'TRENDING') {
            // Show only cards with high view counts
            const viewsElement = card.querySelector('.metric-value');
            if (viewsElement && viewsElement.textContent.includes('M')) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        } else if (category === 'CLASSIFIED') {
            // Show only classified cards
            if (card.classList.contains('classified')) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// Add hover effects to blog cards
function addCardHoverEffects() {
    document.querySelectorAll('.blog-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const glow = document.createElement('div');
            glow.classList.add('card-glow');
            glow.style.position = 'absolute';
            glow.style.inset = '0';
            glow.style.boxShadow = '0 0 15px var(--primary)';
            glow.style.opacity = '0';
            glow.style.transition = 'opacity 0.3s ease';
            glow.style.pointerEvents = 'none';
            
            card.style.position = 'relative';
            card.appendChild(glow);
            
            setTimeout(() => {
                glow.style.opacity = '0.5';
            }, 10);
        });
        
        card.addEventListener('mouseleave', () => {
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.opacity = '0';
                setTimeout(() => {
                    glow.remove();
                }, 300);
            }
        });
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Update time immediately and then every second
    updateTime();
    setInterval(updateTime, 1000);
    
    // Initialize profile elements
    generateBinaryBackground();
    initNeonLines();
    
    // Initialize skills and blog sections
    animateSkills();
    addGlitchEffects();
    initBlogControls();
    addCardHoverEffects();
    
    // Add event listeners to buttons
    document.querySelectorAll('.quantum-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
    
    // Initialize footer status indicators
    document.querySelectorAll('.indicator-dot').forEach(dot => {
        setInterval(() => {
            dot.style.opacity = (Math.random() > 0.3) ? '1' : '0.5';
        }, 1000 + Math.random() * 1000);
    });
});
