const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const output = document.getElementById("output");
const animContainer = document.getElementById("animation-container");

// ----- SHRINKING NO BUTTON -----
let clicks = 0;
const maxClicks = 5;
let width = 150;
let height = 60;
let fontSize = 20;
const shrinkFactor = 0.8;

const texts = [
    "Still no?",
    "But why?😭",
    "Come on! 😩",
    "Please! 💔",
    "I'm sad now... 😭"
];

// Initial size
noBtn.style.width = width + "px";
noBtn.style.height = height + "px";
noBtn.style.fontSize = fontSize + "px";

noBtn.addEventListener("click", () => {
    if (clicks >= maxClicks) return;

    // Shrink button and font
    width *= shrinkFactor;
    height *= shrinkFactor;
    fontSize *= shrinkFactor;

    noBtn.style.width = width + "px";
    noBtn.style.height = height + "px";
    noBtn.style.fontSize = fontSize + "px";

    noBtn.textContent = texts[clicks];
    clicks++;

    // After 5 clicks, replace with jumping final button
    if (clicks === maxClicks) {
        noBtn.style.display = "none";
        addFinalButton();
    }
});

// ----- FINAL JUMPING NO BUTTON -----
function addFinalButton() {
    const finalBtn = document.createElement("button");
    finalBtn.textContent = "can't sit still anymore ;)";
    finalBtn.className = "btn-red";
    finalBtn.style.width = "120px";
    finalBtn.style.height = "50px";
    finalBtn.style.fontSize = "16px";
    finalBtn.style.position = "absolute";

    document.body.appendChild(finalBtn);

    function moveButton() {
        const maxX = window.innerWidth - finalBtn.offsetWidth - 20;
        const maxY = window.innerHeight - finalBtn.offsetHeight - 20;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        finalBtn.style.left = randomX + "px";
        finalBtn.style.top = randomY + "px";
    }

    finalBtn.addEventListener("mouseenter", moveButton);
    moveButton();
}

// ----- YES BUTTON FIREWORK / HEART / CONFETTI -----
yesBtn.addEventListener("click", () => {
    output.textContent = "Yay! 💖 You said yes!";
    noBtn.style.display = "none"; // hide no button immediately

    const rect = yesBtn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Sparks
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement("div");
        particle.className = "firework";
        particle.style.backgroundColor = `hsl(${Math.random()*360}, 100%, 50%)`;

        const angle = Math.random() * 2 * Math.PI;
        const distance = 100 + Math.random() * 100;
        const dx = Math.cos(angle) * distance + "px";
        const dy = Math.sin(angle) * distance + "px";

        particle.style.left = x + "px";
        particle.style.top = y + "px";
        particle.style.setProperty("--dx", dx);
        particle.style.setProperty("--dy", dy);

        animContainer.appendChild(particle);
        particle.addEventListener("animationend", () => particle.remove());
    }

    // Heart image
    const heart = document.createElement("img");
    heart.src = "images/GettyImages-2191580383.jpg.webp"; // example heart
    heart.className = "heart";
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    heart.style.width = "270px";   // make it bigger
    heart.style.height = "180px";  // make it bigger
    animContainer.appendChild(heart);

    // Confetti
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement("div");
        confetti.className = "firework";
        confetti.style.backgroundColor = `hsl(${Math.random()*360}, 80%, 60%)`;
        confetti.style.width = confetti.style.height = Math.random() * 10 + 5 + "px";

        const dx = (Math.random() - 0.5) * 300 + "px";
        const dy = (Math.random() - 0.5) * 300 + "px";

        confetti.style.left = x + "px";
        confetti.style.top = y + "px";
        confetti.style.setProperty("--dx", dx);
        confetti.style.setProperty("--dy", dy);

        animContainer.appendChild(confetti);
        confetti.addEventListener("animationend", () => confetti.remove());
    }
});
