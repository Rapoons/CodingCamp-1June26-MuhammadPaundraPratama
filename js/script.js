// =========================
// TASKS
// =========================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.style.display = "flex";
        li.style.alignItems = "center";
        li.style.gap = "10px";
        li.style.marginTop = "10px";

        li.innerHTML = `
            <input
                type="checkbox"
                ${task.completed ? "checked" : ""}
                onchange="toggleTask(${index})"
            >

            <span
                style="
                flex:1;
                text-decoration:${task.completed ? "line-through" : "none"};
                "
            >
                ${task.text}
            </span>

            <button onclick="editTask(${index})">
                Edit
            </button>

            <button onclick="deleteTask(${index})">
                Delete
            </button>
        `;

        taskList.appendChild(li);

    });

}

function addTask() {

    const input =
        document.getElementById("taskInput");

    const text =
        input.value.trim();

    if (text === "") return;

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    renderTasks();

    input.value = "";

}

function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();
    renderTasks();

}

function toggleTask(index) {

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();
    renderTasks();

}

function editTask(index) {

    const newTask = prompt(
        "Edit Task",
        tasks[index].text
    );

    if (newTask === null) return;

    tasks[index].text =
        newTask.trim();

    saveTasks();
    renderTasks();

}

renderTasks();


// =========================
// QUICK LINKS
// =========================

let links =
    JSON.parse(localStorage.getItem("links"))
    || [];

function saveLinks() {

    localStorage.setItem(
        "links",
        JSON.stringify(links)
    );

}

function renderLinks() {

    const container =
        document.getElementById("linksContainer");

    container.innerHTML = "";

    links.forEach((link, index) => {

        const a =
            document.createElement("a");

        a.href = link.url;
        a.target = "_blank";

        a.innerText = link.name;

        a.style.display = "inline-block";
        a.style.margin = "5px";
        a.style.padding = "10px";
        a.style.background = "#6a5acd";
        a.style.color = "white";
        a.style.borderRadius = "8px";
        a.style.textDecoration = "none";

        const deleteBtn =
            document.createElement("button");

        deleteBtn.innerText = "X";

        deleteBtn.onclick = () => {
            deleteLink(index);
        };

        container.appendChild(a);
        container.appendChild(deleteBtn);

    });

}

function addLink() {

    const name =
        document.getElementById("linkName")
        .value
        .trim();

    const url =
        document.getElementById("linkUrl")
        .value
        .trim();

    if (!name || !url) {

        alert("Please fill all fields");

        return;
    }

    links.push({
        name,
        url
    });

    saveLinks();
    renderLinks();

    document.getElementById("linkName").value = "";
    document.getElementById("linkUrl").value = "";

}

function deleteLink(index) {

    links.splice(index, 1);

    saveLinks();
    renderLinks();

}

renderLinks();


// =========================
// DARK MODE
// =========================

function toggleTheme() {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark")
    );

}

if (
    localStorage.getItem("theme") === "true"
) {
    document.body.classList.add("dark");
}


// =========================
// USERNAME
// =========================

function saveName() {

    const username =
        document.getElementById("username")
        .value
        .trim();

    if (username === "") return;

    localStorage.setItem(
        "username",
        username
    );

    updateClock();

}

const savedName =
    localStorage.getItem("username");

if (savedName) {

    document.getElementById("username").value =
        savedName;

}


// =========================
// CLOCK
// =========================

function updateClock() {

    const now = new Date();

    const hours =
        String(now.getHours())
        .padStart(2, "0");

    const minutes =
        String(now.getMinutes())
        .padStart(2, "0");

    const seconds =
        String(now.getSeconds())
        .padStart(2, "0");

    document.getElementById("time")
        .textContent =
        `${hours}:${minutes}:${seconds}`;

    document.getElementById("date")
        .textContent =
        now.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

    let greeting =
        Number(hours) < 12
            ? "Good Morning"
            : Number(hours) < 18
            ? "Good Afternoon"
            : "Good Evening";

    const username =
        localStorage.getItem("username");

    if (username) {

        greeting += `, ${username}`;

    }

    document.getElementById("greeting")
        .textContent =
        greeting;

}

setInterval(updateClock, 1000);

updateClock();


// =========================
// FOCUS TIMER
// =========================

let timer;

let timeLeft = 25 * 60;

function updateTimerDisplay() {

    const minutes =
        Math.floor(timeLeft / 60);

    const seconds =
        timeLeft % 60;

    document.getElementById(
        "focusTimer"
    ).textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}

function startTimer() {

    if (timer) return;

    timer = setInterval(() => {

        if (timeLeft > 0) {

            timeLeft--;

            updateTimerDisplay();

        } else {

            clearInterval(timer);

            timer = null;

            alert(
                "Focus Session Finished!"
            );

        }

    }, 1000);

}

function stopTimer() {

    clearInterval(timer);

    timer = null;

}

function resetTimer() {

    clearInterval(timer);

    timer = null;

    timeLeft = 25 * 60;

    updateTimerDisplay();

}

updateTimerDisplay();