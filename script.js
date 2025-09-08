// script.js

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*";
let interval = null;

function scrambleEffect(element, newText) {
  let iteration = 0;
  clearInterval(interval);
  interval = setInterval(() => {
    element.innerText = element.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return newText[index];
        }
        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join("");

    if (iteration >= newText.length) {
      clearInterval(interval);
    }

    iteration += 1 / 10;
  }, 30);
}

// Auto-run scramble if element exists
window.onload = () => {
  const scrambleText = document.getElementById("scrambleText");
  if (scrambleText) {
    scrambleEffect(scrambleText, scrambleText.innerText);
  }
};
