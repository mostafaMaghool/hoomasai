const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const resultModal = document.getElementById('resultModal');
const prizeResult = document.getElementById('prizeResult');
const wheelLights = document.getElementById('wheelLights');

// Create wheel lights
for (let i = 0; i < 24; i++) {
    const light = document.createElement('div');
    light.className = 'light';
    const angle = (i / 24) * 360;
    const radius = 210;
    const x = radius * Math.cos(angle * Math.PI / 180);
    const y = radius * Math.sin(angle * Math.PI / 180);
    light.style.left = `calc(50% + ${x}px)`;
    light.style.top = `calc(50% + ${y}px)`;
    light.style.animationDelay = `${i * 0.1}s`;
    wheelLights.appendChild(light);
}

const prizes = [
    { text: "کد تخفیف 50%", color: "#ff6b35", code: "AI50OFF", canWin: true },
    { text: "ابزار AI رایگان", color: "#4c2a85", code: "FREEAI2024", canWin: true },
    { text: "دوره آموزشی", color: "#ffd700", code: "LEARN2024", canWin: true },
    { text: "مشاوره رایگان", color: "#10b981", code: "CONSULT24", canWin: true },
    { text: "5 میلیون تخفیف هومص", color: "#ef4444", code: "HOMESS5M", canWin: false },
    { text: "قالب اختصاصی", color: "#3b82f6", code: "TEMPLATE24", canWin: true },
    { text: "اشتراک ChatGPT", color: "#8b5cf6", code: "CHATGPT24", canWin: false },
    { text: "اکانت پرو", color: "#f59e0b", code: "PROUSER24", canWin: true }
];

let currentAngle = 0;
let isSpinning = false;
const segmentCount = prizes.length;
const segmentAngle = (2 * Math.PI) / segmentCount;

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 10;

    for (let i = 0; i < segmentCount; i++) {
        const startAngle = currentAngle + i * segmentAngle;
        const endAngle = currentAngle + (i + 1) * segmentAngle;

        // Draw segment
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = prizes[i].color;
        ctx.fill();
        
        // Add border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw text
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + segmentAngle / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 16px Arial';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 3;
        ctx.fillText(prizes[i].text, radius - 20, 5);
        ctx.restore();
    }
}

function createConfetti() {
    const colors = ['#ff6b35', '#ffd700', '#4c2a85', '#10b981', '#3b82f6', '#8b5cf6'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 10 + 5}px`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

function spinWheel() {
    if (isSpinning) return;
    
    isSpinning = true;
    spinBtn.disabled = true;
    spinBtn.textContent = '🎲 در حال چرخش...';

    // Get only the prizes that can be won
    const winablePrizes = prizes.filter(prize => prize.canWin);
    const randomPrizeIndex = Math.floor(Math.random() * winablePrizes.length);
    const selectedPrize = winablePrizes[randomPrizeIndex];
    const segmentIndex = prizes.findIndex(prize => prize.text === selectedPrize.text);

    // Calculate spin
    const spinAmount = Math.random() * 10 + 10; // 10-20 rotations
    const finalAngle = (segmentIndex * segmentAngle) + (segmentAngle / 2);
    const totalRotation = (Math.PI * 2 * spinAmount) + finalAngle;

    let startTime = null;
    const duration = 4000; // 4 seconds

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth deceleration
        const easeOut = 1 - Math.pow(1 - progress, 3);
        currentAngle = totalRotation * easeOut;
        
        drawWheel();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Spin complete
            isSpinning = false;
            spinBtn.disabled = false;
            spinBtn.textContent = '🎲 چرخاندن گردونه';
            showResult(selectedPrize);
            createConfetti();
        }
    }

    // Flash the lights during spin
    const lights = document.querySelectorAll('.light');
    let flashInterval = setInterval(() => {
        lights.forEach(light => {
            light.style.opacity = Math.random() > 0.5 ? '1' : '0.3';
        });
    }, 100);

    setTimeout(() => {
        clearInterval(flashInterval);
        lights.forEach(light => {
            light.style.opacity = '1';
        });
    }, duration);

    requestAnimationFrame(animate);
}

function showResult(prize) {
    let resultHTML = `<h4>🎁 ${prize.text}</h4>`;
    
    if (prize.code) {
        resultHTML += `<div class="prize-code">${prize.code}</div>`;
        resultHTML += `<p>کد تخفیف شما را کپی کنید و در خرید استفاده کنید!</p>`;
    } else {
        resultHTML += `<p>برای دریافت جایزه با پشتیبانی تماس بگیرید!</p>`;
    }

    prizeResult.innerHTML = resultHTML;
    resultModal.style.display = 'flex';
}

function closeModal() {
    resultModal.style.display = 'none';
}

spinBtn.addEventListener('click', spinWheel);

// Close modal when clicking outside
resultModal.addEventListener('click', function(e) {
    if (e.target === resultModal) {
        closeModal();
    }
});

// Add sparkle effects to lights
setInterval(() => {
    const lights = document.querySelectorAll('.light');
    lights.forEach(light => {
        light.style.opacity = Math.random() > 0.8 ? '0.3' : '1';
        light.style.boxShadow = `0 0 ${Math.random() * 15 + 5}px rgba(255, 255, 255, 0.8)`;
    });
}, 500);

// Initial draw
drawWheel();
