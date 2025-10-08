// --- Welcome message ---
window.addEventListener("load", () => {
  console.log("Website loaded successfully!");
  alert("👋 Hi Varun! Welcome to my portfolio website.");
});

// --- Change background color when hovering over your name ---
const nameTitle = document.querySelector(".name h1");
nameTitle.addEventListener("mouseover", () => {
  nameTitle.style.color = "#00bcd4"; // cyan
});
nameTitle.addEventListener("mouseout", () => {
  nameTitle.style.color = "white";
});

// --- Animate the background gradient slowly ---
let hue = 0;
function animateBackground() {
  hue = (hue + 1) % 360;
  document.querySelector(".bg-gradient").style.background = 
    `linear-gradient(135deg, hsl(${hue}, 70%, 50%), hsl(${(hue + 90) % 360}, 70%, 50%))`;
  requestAnimationFrame(animateBackground);
}
animateBackground();
