let timer;
let timeLeft;

function startMeditation(duration) {
  clearInterval(timer); // Clear any existing timers
  
  timeLeft = duration * 60; // Convert minutes to seconds
  updateTimerDisplay();
  
  timer = setInterval(function() {
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert('Meditation session completed!');
      return;
    }
    
    timeLeft--;
    updateTimerDisplay();
  }, 1000); // Update every second
}

function updateTimerDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  
  document.getElementById('timer').textContent = `${minutes}:${seconds}`;
}
