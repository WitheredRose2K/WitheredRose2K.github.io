// JavaScript
document.addEventListener("mousemove", function(event) {
  const glitchText = document.querySelector(".glitch");
  const roseText = document.querySelector(".rose");

  const rectGlitch = glitchText.getBoundingClientRect();
  const rectRose = roseText.getBoundingClientRect();

  const centerX = (rectGlitch.left + rectRose.left + rectGlitch.width + rectRose.width) / 2;
  const centerY = (rectGlitch.top + rectRose.top + rectGlitch.height + rectRose.height) / 2;

  const distanceFromCenterX = event.clientX - centerX;
  const distanceFromCenterY = event.clientY - centerY;

  glitchText.style.transform = "translate(" + (distanceFromCenterX / 50) + "px, " + (distanceFromCenterY / 50) + "px)";
  roseText.style.transform = "translate(" + (distanceFromCenterX / 50) + "px, " + (distanceFromCenterY / 50) + "px)";

  const mouseX = event.clientX / window.innerWidth; 
  const mouseY = event.clientY / window.innerHeight;
  
  const petals = document.querySelectorAll('.petal');
  petals.forEach(function(petal) {
    const windStrength = 0.05; 
    const offsetX = (mouseX - 0.5) * windStrength;
    const offsetY = (mouseY - 0.5) * windStrength;
    const rotation = Math.atan2(offsetY, offsetX); 
    
    petal.style.transform = `translate(${offsetX * 100}px, ${offsetY * 100}px) rotate(${rotation}rad)`; 
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const petalContainer = document.querySelector(".petal-container");
  const numPetals = 50; 
  const colors = ["#8A7D8C", "#EAD5F2", "#B3B6F2", "#F2F2F2"];

  for (let i = 0; i < numPetals; i++) {
    const petal = document.createElement("img");
    petal.classList.add("petal");
    petal.src = "root/petal_art.png"; 
    petal.style.width = "15px"; 
    petal.style.height = "30px"; 
    petal.style.top = Math.random() * 100 + "vh";
    petal.style.left = Math.random() * 100 + "vw";
    const animationDuration = Math.random() * 6 + 5; 
    petal.style.animation = `fall ${animationDuration}s linear infinite`;

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    petal.style.filter = `brightness(70%) saturate(100%) sepia(0%) hue-rotate(${colorToHue(randomColor)}deg)`;

    petalContainer.appendChild(petal);
  }
  
  const topBar = document.querySelector(".top-bar");
  const homeLink = document.createElement("div");
  homeLink.classList.add("home-link");
  homeLink.textContent = "Home";
  homeLink.addEventListener("click", function() {
    window.location.href = "https://witheredrose2k.github.io/";
  });
  topBar.appendChild(homeLink);
});

function colorToHue(color) {
  const hex = color.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => "#" + r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);

  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return Math.round(h * 360); 
}