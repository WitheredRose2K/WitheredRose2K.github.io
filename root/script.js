document.addEventListener("mousemove", function(event) {
  const translateValue = `translate(${(event.clientX - window.innerWidth / 2) / window.innerWidth * 50}%, ${(event.clientY - window.innerHeight / 2) / window.innerHeight * 50}%)`;
  document.querySelectorAll('.glitch, .rose').forEach(element => element.style.transform = translateValue);

  const mouseX = (event.clientX / window.innerWidth - 0.5) * 0.05;
  const mouseY = (event.clientY / window.innerHeight - 0.5) * 0.05;

  document.querySelectorAll('.petal').forEach(petal => {
    const rotation = Math.atan2(mouseY, mouseX);
    petal.style.transform = `translate(${mouseX * 50}%, ${mouseY * 50}%) rotate(${rotation}rad)`;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const petalContainer = document.querySelector(".petal-container");
  const colors = ["#8A7D8C", "#EAD5F2", "#B3B6F2", "#F2F2F2"];

  const petalMinSizeX = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--petal-min-size-x'));
  const petalMinSizeY = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--petal-min-size-y'));
  const petalMaxSizeX = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--petal-max-size-x'));
  const petalMaxSizeY = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--petal-max-size-y'));

  const petalSize = getComputedStyle(document.documentElement).getPropertyValue('--petal-size').trim().split(' ');
  const petalSizeX = parseFloat(petalSize[0]);
  const petalSizeY = parseFloat(petalSize[1]);

  for (let i = 0; i < 50; i++) {
    const petal = new Image();
    petal.classList.add("petal");
    petal.src = "root/petal_art.png";

    // Random position
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;

    // Calculate rotation
    const mouseX = (randomX / window.innerWidth - 0.5) * 0.05;
    const mouseY = (randomY / window.innerHeight - 0.5) * 0.05;
    const rotation = Math.atan2(mouseY, mouseX);

    // Apply styles
    petal.style.width = `${petalSizeX}px`;
    petal.style.height = `${petalSizeY}px`;
    petal.style.top = `${randomY}vh`;
    petal.style.left = `${randomX}vw`;
    petal.style.transform = `translate(-50%, -50%) rotate(${rotation}rad)`;

    petal.style.filter = `brightness(70%) saturate(100%) sepia(0%) hue-rotate(${colorToHue(colors[Math.floor(Math.random() * colors.length)])}deg)`;
    petal.style.animation = `fall ${Math.random() * 6 + 5}s linear infinite`;

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
  let [r, g, b] = [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s = (max + min) / 2;

  if (max === min) h = s = 0;
  else {
    const d = max - min;
    s = s > 0.5 ? d / (2 - max - min) : d / (max + min);
    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h /= 6;
  }
  return Math.round(h * 360);
}
