let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

taskForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const dueDate = document.getElementById("due-date").value;
    const description = document.getElementById("description").value;

    const task = {
        id: Date.now(),
        title,
        dueDate,
        description,
        completed: false,
    };

    tasks.push(task);
    saveAndRenderTasks();
    taskForm.reset();
});

function saveAndRenderTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(tasks);
}

function renderTasks(taskArray) {
    taskList.innerHTML = "";

    taskArray.forEach((task) => {
        const li = document.createElement("li");
        li.className = "task" + (task.completed ? " completed" : "");

        li.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <small>Due: ${task.dueDate}</small><br/>
      <button onclick="deleteTask(${task.id})">Delete</button>
      <input type="checkbox" onchange="toggleTask(${task.id})" ${task.completed ? "checked" : ""} />
    `;

        taskList.appendChild(li);
    });
}

function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    saveAndRenderTasks();
}

function toggleTask(id) {
    tasks = tasks.map((task) => {
        if (task.id === id) task.completed = !task.completed;
        return task;
    });
    saveAndRenderTasks();
}

function filterTasks(status) {
    if (status === "all") {
        renderTasks(tasks);
    } else if (status === "completed") {
        renderTasks(tasks.filter((task) => task.completed));
    } else {
        renderTasks(tasks.filter((task) => !task.completed));
    }
}

// Initial load4
saveAndRenderTasks();