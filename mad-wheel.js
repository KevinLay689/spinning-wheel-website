class SimpleSpinner {
    constructor() {
        this.canvas = document.getElementById('wheel');
        this.ctx = this.canvas.getContext('2d');
        this.spinButton = document.getElementById('spinButton');
        
        // Modal elements
        this.modal = document.getElementById('winnerModal');
        this.closeModalBtn = document.getElementById('closeModal');
        this.spinAgainBtn = document.getElementById('spinAgainBtn');
        this.modalResult = document.getElementById('modalResult');
        this.modalMessage = document.getElementById('modalMessage');
        this.modalLogo = document.getElementById('modalLogo');
        
        this.segments = ['YES 😠', 'NO 😊'];
        this.colors = ['#ff6b6b', '#4CAF50'];
        this.currentRotation = 0;
        this.isSpinning = false;
        
        this.init();
    }
    
    init() {
        this.drawWheel();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.spinButton.addEventListener('click', () => this.spin());
        this.closeModalBtn.addEventListener('click', () => this.closeModal());
        this.spinAgainBtn.addEventListener('click', () => {
            this.closeModal();
            this.spin();
        });
        
        // Close modal on background click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }
    
    drawWheel() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = 180;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const anglePerSegment = (2 * Math.PI) / this.segments.length;
        
        this.segments.forEach((segment, index) => {
            const startAngle = index * anglePerSegment + this.currentRotation;
            const endAngle = startAngle + anglePerSegment;
            
            // Draw segment
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            this.ctx.closePath();
            this.ctx.fillStyle = this.colors[index];
            this.ctx.fill();
            
            // Draw border
            this.ctx.strokeStyle = '#fff';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            
            // Draw text
            this.ctx.save();
            this.ctx.translate(centerX, centerY);
            this.ctx.rotate(startAngle + anglePerSegment / 2);
            this.ctx.textAlign = 'center';
            this.ctx.fillStyle = '#fff';
            this.ctx.font = 'bold 24px Arial';
            this.ctx.fillText(segment, radius / 2, 10);
            this.ctx.restore();
        });
        
        // Draw center circle
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
        this.ctx.fillStyle = '#fff';
        this.ctx.fill();
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Draw center text
        this.ctx.fillStyle = '#333';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('SPIN', centerX, centerY);
    }
    
    spin() {
        if (this.isSpinning) return;
        
        this.isSpinning = true;
        this.spinButton.disabled = true;
        
        const spinDuration = 6000;
        const spinRotations = 3 + Math.random() * 3;
        const totalRotation = spinRotations * 2 * Math.PI;
        const finalRotation = this.currentRotation + totalRotation;
        
        const startTime = Date.now();
        
        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / spinDuration, 1);
            
            // Slower easing function for more gradual deceleration
            const easeOut = 1 - Math.pow(1 - progress, 4);
            
            this.currentRotation = this.currentRotation + (finalRotation - this.currentRotation) * easeOut;
            this.drawWheel();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.isSpinning = false;
                this.spinButton.disabled = false;
                this.showWinner();
            }
        };
        
        animate();
    }
    
    showWinner() {
        const normalizedRotation = this.currentRotation % (2 * Math.PI);
        const adjustedRotation = (2 * Math.PI - normalizedRotation + Math.PI / 2) % (2 * Math.PI);
        const anglePerSegment = (2 * Math.PI) / this.segments.length;
        const winningIndex = Math.floor(adjustedRotation / anglePerSegment) % this.segments.length;
        const winner = this.segments[winningIndex];
        
        // Show modal
        this.showModal(winner);
    }
    
    showModal(result) {
        this.modalResult.textContent = result;
        
        // Set appropriate emoji and message based on result
        if (result.includes('YES')) {
            this.modalLogo.innerHTML = '😠';
            this.modalLogo.style.fontSize = '60px';
            this.modalMessage.textContent = 'You\'re in trouble! Start apologizing! 🙏';
        } else {
            this.modalLogo.innerHTML = '😊';
            this.modalLogo.style.fontSize = '60px';
            this.modalMessage.textContent = 'You\'re safe! For now... 😌';
        }
        
        this.modal.classList.remove('hidden');
    }
    
    closeModal() {
        this.modal.classList.add('hidden');
    }
}

// Initialize the spinner when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SimpleSpinner();
});
