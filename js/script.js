function updateClock(){

    const now = new Date();

    document.getElementById("time").innerText =
        now.toLocaleTimeString();

    document.getElementById("date").innerText =
        now.toDateString();

    let hour = now.getHours();

    let greeting = "Good Evening";

    if(hour < 12){
        greeting = "Good Morning";
    }
    else if(hour < 18){
        greeting = "Good Afternoon";
    }

    let name =
        localStorage.getItem("username") || "";

    document.getElementById("greeting").innerText =
        greeting + (name ? ", " + name : "");
}

setInterval(updateClock,1000);
updateClock();

let timeLeft = 25 * 60;
let timerInterval;

function updateTimerDisplay() {

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    document.getElementById("timer").innerText =
        `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;

}

function startTimer() {

    if(timerInterval) return;

    timerInterval = setInterval(() => {

        if(timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            alert("Focus session completed!");
        }

    },1000);

}

function stopTimer() {

    clearInterval(timerInterval);
    timerInterval = null;

}

function resetTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

    timeLeft = 25 * 60;

    updateTimerDisplay();

}

updateTimerDisplay();