const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const todoappContainer = document.getElementById("todoapp");

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

function createCategory(name) {
    let category = document.createElement("div");
    category.className = "category";
    category.innerHTML = name;
    category.id = "category-" + new Date().getTime(); // Unique ID
    document.getElementById("categories-container").appendChild(category);

    category.addEventListener("contextmenu", function(e) {
        e.preventDefault();
        // Show category-specific context menu
        let contextMenu = document.getElementById("categoryContextMenu");
        contextMenu.style.display = "block";
        contextMenu.style.left = e.clientX + "px";
        contextMenu.style.top = e.clientY + "px";
        contextMenu.dataset.categoryId = category.id;
    });
}

createCategory("Default");
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

// Add new task when user presses Enter
window.addEventListener("keydown", function(e){
    if (e.key === "Enter") {
        addTask();
    }
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

document.getElementById("edit-category").addEventListener("click", function() {
    let categoryId = this.parentNode.parentNode.dataset.categoryId;
    let categoryElement = document.getElementById(categoryId);
    if (categoryElement) {
        let newName = prompt("Edit your category:", categoryElement.innerText);
        if (newName) {
            categoryElement.innerText = newName;
        }
    }
});