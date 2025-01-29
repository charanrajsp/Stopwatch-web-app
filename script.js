let milliseconds = 0, seconds = 0, minutes = 0, hours = 0;
let timer;
let running = false;
let savedCount = 0; // Counter for numbering saved times

const playPauseBtn = document.getElementById("play-pause");
const resetBtn = document.getElementById("reset");
const addTimerBtn = document.getElementById("add-timer");
const timersList = document.getElementById("timers-list");

function updateDisplay() {
  document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
  document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
  document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
  document.getElementById("milliseconds").textContent = milliseconds.toString().padStart(2, "0");
}

function startTimer() {
  timer = setInterval(() => {
    milliseconds += 10;
    if (milliseconds >= 1000) {
      milliseconds = 0;
      seconds++;
    }
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
    updateDisplay();
  }, 10);
}

function stopTimer() {
  clearInterval(timer);
}

playPauseBtn.addEventListener("click", () => {
  if (running) {
    stopTimer();
    playPauseBtn.innerHTML = `<i class="fas fa-play"></i>`;
  } else {
    startTimer();
    playPauseBtn.innerHTML = `<i class="fas fa-pause"></i>`;
  }
  running = !running;
});

resetBtn.addEventListener("click", () => {
  stopTimer();
  milliseconds = seconds = minutes = hours = 0;
  updateDisplay();
  playPauseBtn.innerHTML = `<i class="fas fa-play"></i>`;
  running = false;
  savedCount = 0; // Reset numbering when resetting stopwatch
  //timersList.innerHTML = ""; // Clear saved times
});

addTimerBtn.addEventListener("click", () => {
  savedCount++; // Increment counter for numbering

  const timeStamp = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(3, "0")}`;
  
  const listItem = document.createElement("div");
  listItem.textContent = `${savedCount}) - Time: ${timeStamp}`;
  listItem.style.margin = "5px 0";
  timersList.appendChild(listItem);
});

// Initialize display
updateDisplay();
