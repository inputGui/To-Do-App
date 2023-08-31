const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if (inputBox.value === "") {
        alert("Please enter a task");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        li.id = new Date().getTime();  // Assign a unique id to each task
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span); 
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e){
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    let tasks = listContainer.innerHTML;
    localStorage.setItem("data", tasks);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

function deleteAllTasks(){
    listContainer.innerHTML = "";
    saveData();
}

function editTask(buttonElement){
    let li = buttonElement.parentNode;
    let newTask = prompt("Edit your task:", li.innerText.replace("Edit", ""));
    if (newTask) {
        li.innerText = newTask;

        // Re-append the Edit Button since innerText will remove it
        li.appendChild(buttonElement);
    }
    saveData();
}

showTask();

listContainer.addEventListener("contextmenu", function(e){
    e.preventDefault();
    let contextMenu = document.getElementById("contextMenu");
    contextMenu.style.display = "block";
    contextMenu.style.left = e.clientX + "px";
    contextMenu.style.top = e.clientY + "px";
    contextMenu.dataset.taskId = e.target.id;  // Store the id of the clicked task
});

// Hide context menu on clicking anywhere else
window.addEventListener("click", function(e){
    document.getElementById("contextMenu").style.display = "none";
});

// Edit task from context menu
document.getElementById("edit").addEventListener("click", function(){
    let taskId = this.parentNode.parentNode.dataset.taskId;
    let taskElement = document.getElementById(taskId);
    if (taskElement) {
        let newTask = prompt("Edit your task:", taskElement.innerText);
        if (newTask) {
            taskElement.innerText = newTask;
            saveData();
        }
    }
});