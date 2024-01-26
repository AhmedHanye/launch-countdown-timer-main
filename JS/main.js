// DOM elements
const flipNumberContainers = document.querySelectorAll(
  ".flip-number-container"
);
const flipFrontElements = document.querySelectorAll(".flip-number-front");
const flipBackElements = document.querySelectorAll(".flip-number-back");
const staticUpElements = document.querySelectorAll(".static-number-top");
const staticDownElements = document.querySelectorAll(".static-number-bottom");

// Function to initiate animation on a specific element
function startAnimation(index) {
  flipNumberContainers[index].classList.add("animated");
}

function diff_date() {
  // Calculate time difference
  let currentDate = new Date();
  let timeDifference = launchDate - currentDate; // in ms
  let seconds = Math.floor((timeDifference / 1000) % 60);
  let minutes = Math.floor((timeDifference / 1000 / 60) % 60);
  let hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return [days, hours, minutes, seconds];
}
// Target launch date
const launchDate = new Date(); // change this to your desired date
launchDate.setDate(launchDate.getDate() + 30); // just for demo purposes

// Initial and next numbers for countdown
let previousNumbers = [0, 0, 0, 0];
let nextNumbers = [0, 0, 0, 0];

// Animation duration (in milliseconds)
const animationDuration = 500; // you change this based on your CSS animation duration

// Update countdown at regular intervals
const countdownInterval = setInterval(() => {
  // Update next numbers
  nextNumbers = diff_date();
}, 1000);

// Update countdown display with animations
for (let index = 0; index < 4; index++) {
  const updateInterval = setInterval(() => {
    // Numbers are different, initiate animation
    if (previousNumbers[index] !== nextNumbers[index]) {
      startAnimation(index);
      // Update flip elements
      flipBackElements[index].textContent = nextNumbers[index];

      // Synchronize static elements
      setTimeout(() => {
        staticUpElements[index].textContent = nextNumbers[index];
      }, animationDuration * 0.1);

      // Finalize the animation
      setTimeout(() => {
        staticDownElements[index].textContent = nextNumbers[index];
        flipFrontElements[index].textContent = nextNumbers[index];
        flipNumberContainers[index].classList.remove("animated"); // Remove the animation class
      }, animationDuration);

      // Update previous numbers
      previousNumbers[index] = nextNumbers[index];
    }
  }, animationDuration * 2); // Double the animation duration for the interval
}
