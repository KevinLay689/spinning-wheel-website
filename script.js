// Fast food chain data with colors and logo URLs from 1000logos.net
const fastFoodChains = [
    { name: "McDonald's", color: "#DA291C", logo: "https://1000logos.net/wp-content/uploads/2017/03/McDonalds-logo-1024x576.png" },
    { name: "Starbucks", color: "#00704A", logo: "https://1000logos.net/wp-content/uploads/2023/04/Starbucks-logo.png" },
    { name: "Chipotle", color: "#00543F", logo: "https://1000logos.net/wp-content/uploads/2017/11/Chipotle-Logo.png" },
    { name: "Burger King", color: "#D62300", logo: "https://1000logos.net/wp-content/uploads/2016/10/Burger-King_Logo.png" },
    { name: "Wendy's", color: "#E3242B", logo: "https://1000logos.net/wp-content/uploads/2017/08/Wendys-Logo.png" },
    { name: "Taco Bell", color: "#00255F", logo: "https://1000logos.net/wp-content/uploads/2017/06/Taco-Bell-Logo.png" },
    { name: "KFC", color: "#F40000", logo: "https://1000logos.net/wp-content/uploads/2017/03/Kfc_logo.png" },
    { name: "Pizza Hut", color: "#EE3124", logo: "https://1000logos.net/wp-content/uploads/2017/05/Pizza-Hut-Logo.png" },
    { name: "Dunkin'", color: "#FF6600", logo: "https://1000logos.net/wp-content/uploads/2023/04/Dunkin-Donuts-logo.png" },
    { name: "Chick-fil-A", color: "#E31837", logo: "https://1000logos.net/wp-content/uploads/2021/04/Chick-fil-A-logo.png" }
];

class SpinningWheel {
    constructor() {
        this.canvas = document.getElementById('wheel');
        this.ctx = this.canvas.getContext('2d');
        this.spinButton = document.getElementById('spinButton');
        this.modal = document.getElementById('winnerModal');
        this.modalLogo = document.getElementById('modalLogo');
        this.modalRestaurantName = document.getElementById('modalRestaurantName');
        this.closeModalBtn = document.getElementById('closeModal');
        this.spinAgainBtn = document.getElementById('spinAgainBtn');
        
        this.isSpinning = false;
        this.currentRotation = 0;
        this.segmentAngle = 360 / fastFoodChains.length;
        this.logosLoaded = false;
        this.logoImages = [];
        
        this.init();
    }
    
    init() {
        this.preloadLogos();
        this.setupEventListeners();
    }
    
    preloadLogos() {
        let loadedCount = 0;
        
        fastFoodChains.forEach((chain, index) => {
            const img = new Image();
            // Remove crossOrigin for external images that don't support CORS
            img.onload = () => {
                loadedCount++;
                this.logoImages[index] = img;
                if (loadedCount === fastFoodChains.length) {
                    this.logosLoaded = true;
                    this.drawWheel();
                }
            };
            img.onerror = () => {
                // Fallback to text if logo fails to load
                loadedCount++;
                this.logoImages[index] = null;
                if (loadedCount === fastFoodChains.length) {
                    this.logosLoaded = true;
                    this.drawWheel();
                }
            };
            // Try to load the image
            img.src = chain.logo;
        });

// Handle scroll indicator for mobile
document.addEventListener('DOMContentLoaded', () => {
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
        let hasScrolled = false;
        
        // Hide scroll indicator when user scrolls
        window.addEventListener('scroll', () => {
            if (!hasScrolled) {
                hasScrolled = true;
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
                scrollIndicator.style.transition = 'all 0.3s ease';
                
                // Completely hide after transition
                setTimeout(() => {
                    scrollIndicator.style.display = 'none';
                }, 300);
            }
        });
        
        // Show scroll indicator after a delay on mobile
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                if (!hasScrolled) {
                    scrollIndicator.style.opacity = '1';
                    scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
                    scrollIndicator.style.transition = 'all 0.5s ease';
                }
            }, 2000);
        }
    }
});
    }
    
    setupEventListeners() {
        this.spinButton.addEventListener('click', () => this.spin());
        this.closeModalBtn.addEventListener('click', () => this.closeModal());
        this.spinAgainBtn.addEventListener('click', () => this.spinAgain());
        
        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }
    
    drawWheel() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Save the current context state
        this.ctx.save();
        
        // Apply rotation
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate((this.currentRotation * Math.PI) / 180);
        this.ctx.translate(-centerX, -centerY);
        
        // Draw segments
        fastFoodChains.forEach((chain, index) => {
            const startAngle = (index * this.segmentAngle * Math.PI) / 180;
            const endAngle = ((index + 1) * this.segmentAngle * Math.PI) / 180;
            
            // Draw segment
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            this.ctx.closePath();
            this.ctx.fillStyle = chain.color;
            this.ctx.fill();
            
            // Draw border
            this.ctx.strokeStyle = '#fff';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            
            // Draw logo
            this.ctx.save();
            this.ctx.translate(centerX, centerY);
            this.ctx.rotate(startAngle + (this.segmentAngle * Math.PI) / 360);
            
            // Draw preloaded logo image or fallback text
            if (this.logosLoaded && this.logoImages[index]) {
                this.ctx.save();
                this.ctx.translate(radius * 0.65, 0);
                
                // Draw white background circle for better visibility
                this.ctx.beginPath();
                this.ctx.arc(0, 0, 20, 0, 2 * Math.PI);
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                this.ctx.fill();
                this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
                
                // Calculate aspect ratio to fit image properly
                const img = this.logoImages[index];
                const maxSize = 30; // Reduced size to fit within background
                let drawWidth = maxSize;
                let drawHeight = maxSize;
                
                // Maintain aspect ratio
                if (img.width > img.height) {
                    drawHeight = (img.height / img.width) * maxSize;
                } else {
                    drawWidth = (img.width / img.height) * maxSize;
                }
                
                this.ctx.drawImage(img, -drawWidth/2, -drawHeight/2, drawWidth, drawHeight);
                this.ctx.restore();
            } else {
                // Fallback to brand initials if logo not loaded
                this.ctx.save();
                this.ctx.translate(radius * 0.65, 0);
                this.ctx.fillStyle = '#fff';
                this.ctx.font = 'bold 16px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                const initials = chain.name.replace(/[^A-Z]/g, '').substring(0, 3);
                this.ctx.fillText(initials, 0, 0);
                this.ctx.restore();
            }
            
            this.ctx.restore();
        });
        
        // Draw center circle
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
        this.ctx.fillStyle = '#fff';
        this.ctx.fill();
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        
        // Draw center text
        this.ctx.fillStyle = '#333';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('SPIN', centerX, centerY);
        
        // Restore the context state
        this.ctx.restore();
        
    }
    
    spin() {
        if (this.isSpinning) return;
        
        this.isSpinning = true;
        this.spinButton.disabled = true;
        
        // Calculate random spin amount (3-5 full rotations)
        const minSpins = 3;
        const maxSpins = 5;
        const spins = minSpins + Math.random() * (maxSpins - minSpins);
        
        // Calculate target angle (just random rotation, we'll determine winner from final position)
        const randomAngle = Math.random() * 360;
        const targetAngle = spins * 360 + randomAngle;
        
        // Apply rotation animation
        this.animateRotation(targetAngle, () => {
            this.isSpinning = false;
            this.spinButton.disabled = false;
            
            // Calculate which segment is at the top (pointer position)
            // The wheel rotates clockwise, so we need to account for this
            // The pointer points to the top, so we need to find which segment's center is closest to 270 degrees (top position in canvas coordinates)
            const rotationInRadians = (this.currentRotation * Math.PI) / 180;
            
            // For each segment, check if its center is at the top position
            let winningSegment = 0;
            let minDistance = Infinity;
            
            for (let i = 0; i < fastFoodChains.length; i++) {
                // Calculate the center angle of this segment after rotation
                const segmentCenterAngle = (i * this.segmentAngle + this.segmentAngle / 2) * Math.PI / 180;
                const rotatedAngle = segmentCenterAngle + rotationInRadians;
                
                // Normalize to 0-2π range
                const normalizedAngle = ((rotatedAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
                
                // The top position in canvas coordinates is at 3π/2 (270 degrees)
                const topPosition = 3 * Math.PI / 2;
                
                // Calculate distance from top position
                let distance = Math.abs(normalizedAngle - topPosition);
                if (distance > Math.PI) {
                    distance = 2 * Math.PI - distance;
                }
                
                if (distance < minDistance) {
                    minDistance = distance;
                    winningSegment = i;
                }
            }
            
            this.showWinner(winningSegment);
        });
    }
    
    
    animateRotation(targetAngle, callback) {
        const duration = 4000; // 4 seconds
        const startTime = Date.now();
        const startRotation = this.currentRotation;
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for realistic deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            this.currentRotation = startRotation + targetAngle * easeOut;
            this.drawWheel();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Normalize rotation to 0-360 range
                this.currentRotation = this.currentRotation % 360;
                callback();
            }
        };
        
        animate();
    }
    
    showWinner(segmentIndex) {
        const winner = fastFoodChains[segmentIndex];
        
        // Update modal content
        if (this.logosLoaded && this.logoImages[segmentIndex]) {
            this.modalLogo.innerHTML = `<img src="${winner.logo}" style="width: 100px; height: 100px; object-fit: contain;">`;
        } else {
            // Fallback to colored box with initials
            this.modalLogo.innerHTML = `<div style="width: 100px; height: 100px; background: ${winner.color}; color: white; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: bold; border-radius: 15px;">${winner.name.replace(/[^A-Z]/g, '').substring(0, 3)}</div>`;
        }
        
        this.modalRestaurantName.textContent = winner.name;
        
        // Show modal
        this.modal.classList.remove('hidden');
        
        // Add celebration effect
        this.celebrate();
    }
    
    closeModal() {
        this.modal.classList.add('hidden');
    }
    
    spinAgain() {
        this.closeModal();
        this.spin();
    }
    
    addPopupEffect() {
        // Create a temporary overlay for emphasis
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle, transparent 0%, rgba(0,0,0,0.3) 100%);
            pointer-events: none;
            z-index: 999;
            animation: fadeInOut 0.5s ease;
        `;
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.remove();
        }, 500);
    }
    
    celebrate() {
        // Create confetti effect
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd700', '#ff8e53'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    width: 10px;
                    height: 10px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    left: ${Math.random() * 100}%;
                    top: -10px;
                    opacity: 1;
                    transform: rotate(${Math.random() * 360}deg);
                    transition: all 2s ease-out;
                    pointer-events: none;
                    z-index: 1000;
                `;
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.style.top = '100%';
                    confetti.style.opacity = '0';
                    confetti.style.transform = `rotate(${Math.random() * 720}deg)`;
                }, 10);
                
                setTimeout(() => {
                    confetti.remove();
                }, 2000);
            }, i * 30);
        }
    }
}

// Initialize the wheel when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SpinningWheel();
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', () => {
    const wheel = document.getElementById('wheel');
    
    wheel.addEventListener('mouseenter', () => {
        if (!wheel.style.transform || wheel.style.transform === 'none') {
            wheel.style.transform = 'scale(1.05)';
            wheel.style.transition = 'transform 0.3s ease';
        }
    });
    
    wheel.addEventListener('mouseleave', () => {
        if (!wheel.style.transform.includes('rotate')) {
            wheel.style.transform = 'scale(1)';
        }
    });
});
