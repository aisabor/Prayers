


function updateClck() {
  const clockElement = document.getElementById('cllock');
  const currentTime = new Date();
  let hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  let amPM = 'AM';

  if (hours >= 12) {
    amPM = 'PM';
    hours = hours - 12;
  }

  if (hours === 0) {
    hours = 12;
  }

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;


  clockElement.textContent = `${hours}:${formattedMinutes}:${formattedSeconds} ${amPM}`;
}
setInterval(updateClck, 1000);

updateClck();


function generateText() {
  
  const randomTexts = [
    "Thessalonians 5:16 New Testament Rejoice always",
    "Proverbs 3:5 Old Testament Trust in the Lord with all your heart.",
    "Philippians 4:4 New Testament Rejoice in the Lord always; again I will say, rejoice.",
    "Psalm 46:10 Old Testament Be still, and know that I am God.",
    "John 11:35 New Testament Jesus wept.",
  ];

  const randomIndex = Math.floor(Math.random() * randomTexts.length);
  return randomTexts[randomIndex];
}
function updateOutput() {
  const outputDiv = document.getElementById("output");
  outputDiv.textContent = generateText();
}

updateOutput();

setInterval(updateOutput, 3000);

function setAlarm() {
  const alarmTimeInput = document.getElementById('alarmTime').value;
  const [hours, minutes, seconds] = alarmTimeInput.split(':').map(Number);

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      alert('Invalid time format. Please use hh:mm:ss');
      return;
  }

  const currentTime = new Date();
  const alarmTime = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate(),
      hours,
      minutes,
      seconds
  );

  const timeDifference = alarmTime - currentTime;

  if (timeDifference < 0) {
      alert('Invalid time. Please set a time in the future.');
      return;
  }

  setTimeout(() => {
      alert('Time\'s up! Your alarm is ringing!');
      // You can replace the alert with any action you want when the alarm goes off.
  }, timeDifference);

  alert(`Alarm set for ${alarmTimeInput}`);
}
















const hourDropdown = document.getElementById('hour');
const minuteDropdown = document.getElementById('minute');
const stopButton = document.getElementById('stopButton');
const snoozeButton = document.getElementById('snoozeButton');
const youtubeVideo = document.getElementById('youtubePlayer'); // Change the element ID to match your iframe element

// Fill the hour and minute dropdowns
for (let i = 0; i < 24; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = i < 10 ? `0${i}` : `${i}`;
    hourDropdown.appendChild(option);
}

for (let i = 0; i < 60; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = i < 10 ? `0${i}` : `${i}`;
    minuteDropdown.appendChild(option);
}

let alarmTimeMillis = 0;
let alarmInterval;

function setAlarm() {
    const selectedHour = parseInt(hourDropdown.value);
    const selectedMinute = parseInt(minuteDropdown.value);

    if (isNaN(selectedHour) || isNaN(selectedMinute)) {
        alert('Please select a valid time.');
        return;
    }

    const currentTime = new Date();
    const alarmTime = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate(),
        selectedHour,
        selectedMinute,
        0
    );

    const timeDifference = alarmTime - currentTime;

    if (timeDifference <= 0) {
        alert('Invalid time. Please set a time in the future.');
        return;
    }

    alarmTimeMillis = alarmTime.getTime();
    startClock();
    stopButton.disabled = false;
    snoozeButton.disabled = false;
    hourDropdown.disabled = true;
    minuteDropdown.disabled = true;
    alert(`Alarm set for ${selectedHour}:${selectedMinute}`);
}

function startClock() {
    alarmInterval = setInterval(updateClock, 1000);
}

function updateClock() {
    const now = new Date();
    const timeRemaining = alarmTimeMillis - now.getTime();

    if (timeRemaining <= 0) {
        document.getElementById('clock').innerText = 'Time\'s up!';
        clearInterval(alarmInterval);
        stopButton.disabled = true;
        snoozeButton.disabled = true;
        playURLAfterAlarm('https://www.youtube.com/watch?v=Fgm9UAzdzQY'); // Play the URL
    } else {
        const hours = Math.floor((timeRemaining / 3600000) % 24);
        const minutes = Math.floor((timeRemaining / 60000) % 60);
        const seconds = Math.floor((timeRemaining / 1000) % 60);
        document.getElementById('clock').innerText = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    }
}

function formatTime(value) {
    return value < 10 ? `0${value}` : value;
}

function stopAlarm() {
    clearInterval(alarmInterval);
    alarmTimeMillis = 0;
    document.getElementById('clock').innerText = '';
    stopButton.disabled = true;
    snoozeButton.disabled = true;
    hourDropdown.disabled = false;
    minuteDropdown.disabled = false;
}

function snooze() {
    const snoozeTimeMillis = new Date().getTime() + 60000; // Snooze for 1 minute
    alarmTimeMillis = snoozeTimeMillis;
    startClock();
    snoozeButton.disabled = true;
}

function playURLAfterAlarm(url) {
    setTimeout(function () {
        window.location.href = url;
    }, 0);
}


const items = document.querySelectorAll('.item');

function checkInView() {
    items.forEach((item) => {
        const itemTop = item.getBoundingClientRect().top;
        const itemBottom = item.getBoundingClientRect().bottom;

        if (itemTop < window.innerHeight && itemBottom >= 0) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        } else {
            item.style.opacity = '0';
            if (item.classList.contains('left')) {
                item.style.transform = 'translateX(-100%)';
            } else if (item.classList.contains('right')) {
                item.style.transform = 'translateX(100%)';
            } else if (item.classList.contains('top')) {
                item.style.transform = 'translateY(-100%)';
            } else if (item.classList.contains('bottom')) {
                item.style.transform = 'translateY(100%)';
            }
        }
    });
}

window.addEventListener('scroll', checkInView);
window.addEventListener('load', checkInView);
