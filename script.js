const taskInput = document.getElementById('add-bar');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('list');

// Load tasks from local storage when the page loads
window.onload = loadTasks;

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value;
    if (taskText === "") {
        alert('Enter a task');
        return;
    }

    const listItem = createTaskElement(taskText);
    taskList.appendChild(listItem);
    saveTasks(); // Save tasks to local storage
    taskInput.value = '';  // Clear the input field
}

// Function to create a task element
function createTaskElement(taskText) {
    const listItem = document.createElement("li");
    const taskTextSpan = document.createElement("span");
    taskTextSpan.textContent = taskText;
    listItem.appendChild(taskTextSpan);

    const listItemCheckbox = document.createElement('input');
    listItemCheckbox.type = 'checkbox';
    listItem.appendChild(listItemCheckbox);

    listItemCheckbox.addEventListener('change', function() {
        taskTextSpan.style.textDecoration = this.checked ? "line-through" : "none";
    });

    // Create the edit button
    const editBtn = document.createElement("button");
    editBtn.className = 'edit-button';
    editBtn.textContent = 'Edit';
    listItem.appendChild(editBtn);
    
    // Edit task functionality
    editBtn.addEventListener('click', function() {
        const newTaskText = prompt("Edit your task:", taskTextSpan.textContent);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            taskTextSpan.textContent = newTaskText;
            saveTasks(); // Save tasks after editing
        }
    });

    // Create the delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = 'delete-button';
    deleteBtn.textContent = 'Delete';
    listItem.appendChild(deleteBtn);
    
    // Delete task functionality
    deleteBtn.addEventListener('click', function() {
        listItem.remove();
        saveTasks(); // Save tasks after deletion
    });

    return listItem;
}

// Function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    const listItems = taskList.getElementsByTagName('li');

    for (let i = 0; i < listItems.length; i++) {
        const taskSpan = listItems[i].querySelector('span');
        const checkbox = listItems[i].querySelector('input[type="checkbox"]');
        tasks.push({ text: taskSpan.textContent, completed: checkbox.checked });
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    savedTasks.forEach(task => {
        const listItem = createTaskElement(task.text);
        const checkbox = listItem.querySelector('input[type="checkbox"]');
        checkbox.checked = task.completed; // Set checkbox state based on saved data
        if (task.completed) {
            listItem.querySelector('span').style.textDecoration = "line-through"; // Cross out completed tasks
        }
        taskList.appendChild(listItem);
    });
}
