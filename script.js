const taskInput = document.getElementById('add-bar');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('list');

addBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value;
    if (taskText === "") {
        alert('Enter a task');
        return;
    }

    const listItem = document.createElement("li");
    listItem.append(taskText);
    taskList.appendChild(listItem);
    
    //this should return an empty input upon adding new task to the list
    taskInput.value = '';  


    const listItemCheckbox = document.createElement('input');
    listItemCheckbox.type = 'checkbox';
    listItem.append(listItemCheckbox);
    console.log(listItemCheckbox);

    listItemCheckbox.addEventListener('change', function() {
        if(this.checked) {
            listItem.style.textDecoration = "line-through";
        }
        else {
            listItem.style.textDecoration = "none";
        }
    });
    

    const deleteBtn = document.createElement("button")
    deleteBtn.className = 'delete-button';
    console.log('button created')
    deleteBtn.textContent = 'Delete';
    listItem.append(deleteBtn);
    console.log (listItem)
    deleteBtn.addEventListener('click', deleteTask);
    function deleteTask () {
        listItem.remove();
        console.log('task deleted');
        
    };
    
}

