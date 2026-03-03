let timerInterval;
let timeLeft = 25 * 60; // Defaults to 25 minutes
let isWorkMode = true;
let isRunning = false;

// Grab all the necessary elements from the HTML
const timerDisplay = document.getElementById('timer-display');
const modeText = document.getElementById('mode-text');
const workInput = document.getElementById('work-input');
const breakInput = document.getElementById('break-input');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const gameContainer = document.getElementById('game-container');
const settingsContainer = document.getElementById('settings');

// Format time to MM:SS and update the HTML
function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    
    // Add a leading zero if the number is less than 10 (e.g., "05" instead of "5")
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

// Start the countdown
function startTimer() {
    if (isRunning) return; 
    isRunning = true;

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            // Timer hit 0
            clearInterval(timerInterval);
            isRunning = false;
            switchMode(); // Move to break or work
        }
    }, 1000); // Run this every 1000 milliseconds (1 second)
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    
    // Reset back to whatever the user has typed in the input box for the current mode
    if (isWorkMode) {
        timeLeft = workInput.value * 60;
    } else {
        timeLeft = breakInput.value * 60;
    }
    updateDisplay();
}

function switchMode() {
    isWorkMode = !isWorkMode; // Toggle the true/false flag
    
    if (isWorkMode) {
        // --- SWITCHING TO WORK ---
        modeText.textContent = "Work Time";
        timeLeft = workInput.value * 60;
        document.body.classList.remove('break-mode');
        
        // Hide game, show settings
        gameContainer.classList.add('hidden');
        settingsContainer.classList.remove('hidden');
        
        alert("Break is over! Time to get back to work.");
    } else {
        // --- SWITCHING TO BREAK ---
        modeText.textContent = "Break Time!";
        timeLeft = breakInput.value * 60;
        document.body.classList.add('break-mode');
        
        // Show game, hide settings
        gameContainer.classList.remove('hidden');
        settingsContainer.classList.add('hidden');
        
        alert("Time for a break! Enjoy some Tetris.");
    }
    
    updateDisplay();
    startTimer(); // Auto-start the next phase
}

// Attach the functions to the button clicks
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Update the timer instantly if the user changes the number in the box while paused
workInput.addEventListener('change', () => {
    if (isWorkMode && !isRunning) {
        timeLeft = workInput.value * 60;
        updateDisplay();
    }
});

breakInput.addEventListener('change', () => {
    if (!isWorkMode && !isRunning) {
        timeLeft = breakInput.value * 60;
        updateDisplay();
    }
});

// Initialize the display when the page first loads
updateDisplay();
const rainSound = document.getElementById('rain-sound');
const rainBtn = document.getElementById('rain-btn');

rainBtn.addEventListener('click', () => {
  if (rainSound.paused) {
    rainSound.play();
    rainBtn.textContent = '⏸ Pause Rain';
  } else {
    rainSound.pause();
    rainBtn.textContent = '🎵 Play Rain Sounds';
  }
});
