class CustomSpinningWheel {
    constructor() {
        this.canvas = document.getElementById('wheel');
        this.ctx = this.canvas.getContext('2d');
        this.spinButton = document.getElementById('spinButton');
        this.modal = document.getElementById('winnerModal');
        this.modalLogo = document.getElementById('modalLogo');
        this.modalWinnerName = document.getElementById('modalWinnerName');
        this.closeModalBtn = document.getElementById('closeModal');
        this.spinAgainBtn = document.getElementById('spinAgainBtn');
        
        this.isSpinning = false;
        this.currentRotation = 0;
        this.segmentAngle = 0;
        this.wheelData = null;
        
        this.init();
    }
    
    init() {
        this.loadWheelData();
        if (this.wheelData) {
            this.setupEventListeners();
            this.drawWheel();
        } else {
            this.showError();
        }
    }
    
    loadWheelData() {
        try {
            const storedData = localStorage.getItem('customWheelData');
            if (storedData) {
                this.wheelData = JSON.parse(storedData);
                this.segmentAngle = 360 / this.wheelData.items.length;
                
                // Update page title
                document.getElementById('wheelTitle').textContent = this.wheelData.name;
                document.getElementById('pageTitle').textContent = `${this.wheelData.name} - Feed My GF`;
            }
        } catch (error) {
            console.error('Error loading wheel data:', error);
            this.wheelData = null;
        }
    }
    
    showError() {
        document.getElementById('wheelContent').style.display = 'none';
        document.getElementById('errorMessage').style.display = 'block';
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
        if (!this.wheelData || this.wheelData.items.length === 0) return;
        
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
        this.wheelData.items.forEach((item, index) => {
            const startAngle = (index * this.segmentAngle * Math.PI) / 180;
            const endAngle = ((index + 1) * this.segmentAngle * Math.PI) / 180;
            
            // Draw segment
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            this.ctx.closePath();
            this.ctx.fillStyle = item.color;
            this.ctx.fill();
            
            // Draw border
            this.ctx.strokeStyle = '#fff';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            
            // Draw text
            this.ctx.save();
            this.ctx.translate(centerX, centerY);
            this.ctx.rotate(startAngle + (this.segmentAngle * Math.PI) / 360);
            this.ctx.translate(radius * 0.65, 0);
            
            this.ctx.fillStyle = '#fff';
            this.ctx.font = 'bold 16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            // Truncate text if too long
            let text = item.name;
            if (text.length > 12) {
                text = text.substring(0, 11) + '...';
            }
            
            this.ctx.fillText(text, 0, 0);
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
        if (this.isSpinning || !this.wheelData || this.wheelData.items.length === 0) return;
        
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
            const rotationInRadians = (this.currentRotation * Math.PI) / 180;
            
            // For each segment, check if its center is at the top position
            let winningSegment = 0;
            let minDistance = Infinity;
            
            for (let i = 0; i < this.wheelData.items.length; i++) {
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
        const winner = this.wheelData.items[segmentIndex];
        
        // Update modal content with colored box
        this.modalLogo.innerHTML = `<div style="width: 100px; height: 100px; background: ${winner.color}; color: white; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: bold; border-radius: 15px; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">${winner.name.substring(0, 2).toUpperCase()}</div>`;
        this.modalWinnerName.textContent = winner.name;
        
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

// Navigation functions
function goBack() {
    window.location.href = 'create-wheel.html';
}

function goToCreator() {
    window.location.href = 'create-wheel.html';
}

// Initialize the custom wheel when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CustomSpinningWheel();
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', () => {
    const wheel = document.getElementById('wheel');
    
    if (wheel) {
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
    }
});
