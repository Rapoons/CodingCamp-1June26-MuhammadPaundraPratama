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

let links = JSON.parse(localStorage.getItem("links")) || [];

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

    links.forEach((link,index) => {

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

    if(name === "" || url === ""){
        alert("Please fill all fields");
        return;
    }

    links.push({
        name:name,
        url:url
    });

    saveLinks();
    renderLinks();

    document.getElementById("linkName").value="";
    document.getElementById("linkUrl").value="";

}

function deleteLink(index){

    links.splice(index,1);

    saveLinks();
    renderLinks();

}

renderLinks();

function toggleTheme(){

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark")
    );

}

if(localStorage.getItem("theme")==="true"){
    document.body.classList.add("dark");
}