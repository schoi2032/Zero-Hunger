document.addEventListener('DOMContentLoaded', () => {
    // Reveal on Scroll
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    // Pledge Logic
    const pledgeForm = document.getElementById('pledgeForm');
    const pledgeCountDisplay = document.getElementById('pledgeCount');
    
    // Initialize Count (Fake base + LocalStorage)
    let baseCount = 12450;
    let localPledges = parseInt(localStorage.getItem('userPledges')) || 0;
    let totalPledges = baseCount + localPledges;

    if (pledgeCountDisplay) {
        animateValue(pledgeCountDisplay, baseCount, totalPledges, 2000);
    }

    if (pledgeForm) {
        pledgeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('pledgeName').value;
            
            if (name) {
                // Update Local Storage
                localPledges++;
                localStorage.setItem('userPledges', localPledges);
                
                // Update UI
                totalPledges++;
                pledgeCountDisplay.textContent = totalPledges.toLocaleString();
                
                // Show Success Message
                alert(`Thank you, ${name}! You have joined the global movement.`);
                pledgeForm.reset();
            }
        });
    }
});

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
