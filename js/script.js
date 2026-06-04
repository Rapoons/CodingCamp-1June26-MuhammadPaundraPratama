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

            <span style="
                flex:1;
                text-decoration:${task.completed ? "line-through" : "none"};
            ">
                ${task.text}
            </span>

            <button type="button" onclick="editTask(${index})">
                Edit
            </button>

            <button type="button" onclick="deleteTask(${index})">
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });
}

function addTask() {

    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if(text === ""){
        return;
    }

    if(tasks.some(task => task.text.toLowerCase() === text.toLowerCase())){
        alert("Task already exists!");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    renderTasks();

    input.value = "";
}

function deleteTask(index){

    tasks.splice(index, 1);

    saveTasks();
    renderTasks();
}

function toggleTask(index){

    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    renderTasks();
}

function editTask(index){

    const newTask = prompt(
        "Edit Task:",
        tasks[index].text
    );

    if(newTask === null){
        return;
    }

    const trimmedTask = newTask.trim();

    if(trimmedTask === ""){
        alert("Task cannot be empty!");
        return;
    }

    tasks[index].text = trimmedTask;

    saveTasks();
    renderTasks();
}

renderTasks();