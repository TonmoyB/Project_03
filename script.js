let existing_id = null;

function showData() {
    let tasks_data = JSON.parse(localStorage.getItem('tasks')) || [];

    let all_data = "";
    tasks_data.forEach(task => {
        all_data +=
            `<div class="data" id="contactInfo">
                <div class = "checkBox">
                    <label class="complete-check">
                        <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} />
                        <span class="checkmark" style="background-color: ${task.completed ? 'limegreen' : 'transparent'};"></span>
                    </label>
                </div>
                <div class="title_style">    
                    <span class="task-data">${task.task_data}</span>
                </div>
                <div class="dueDate_style">
                    <span style="margin-right: 10px;">Due Date:</span> ${task.due_date}
                </div>
                <div class="Buttons">
                    <button class="editButton" id="${task.id}">Edit</button>
                    <button class="deleteButton" id="${task.id}">Delete</button>
                </div>
            </div>`
    });
    document.getElementById('showData').innerHTML = all_data;

    document.querySelectorAll('.editButton').forEach(editButton => {
        editButton.addEventListener('click', () => {
            edit(editButton.getAttribute('id'));
        });
    });

    document.querySelectorAll('.deleteButton').forEach(dltButton => {
        dltButton.addEventListener('click', () => {
            dlt(dltButton.getAttribute('id'));
        });
    });

    document.querySelectorAll('.complete-check input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('click', (event) => {
            const taskId = event.target.getAttribute('id');
            toggleComplete(taskId);

            const checkmark = event.target.nextElementSibling;
            checkmark.style.backgroundColor = event.target.checked ? 'limegreen' : 'transparent';
        });
    });
};

const taskForm = document.getElementById('taskForm');
taskForm.addEventListener('submit', (event) => {
    let tasks_data = JSON.parse(localStorage.getItem('tasks')) || [];
    event.preventDefault();

    const task_data = document.getElementById('task_data').value;
    const due_date = document.getElementById('due_date').value;
    const completed = false;
    if (existing_id) {
        const index = tasks_data.findIndex(task => task.id == existing_id);
        if (index !== -1) {
            tasks_data[index] = { id: existing_id, task_data, due_date, completed };
        }
    }
    else {
        const new_id = tasks_data.length + 1;
        tasks_data.push({ id: new_id, task_data, due_date, completed });
    }
    localStorage.setItem('tasks', JSON.stringify(tasks_data));
    taskForm.reset();
    existing_id = null;
    showData();
});

function edit(task_id) {
    let tasks_data = JSON.parse(localStorage.getItem('tasks'));
    let task = tasks_data.find(task => task.id == task_id);
    if (task) {
        existing_id = task_id;
        document.getElementById('task_data').value = task.task_data;
        document.getElementById('due_date').value = task.due_date;
    }
}

function dlt(task_id) {
    let tasks_data = JSON.parse(localStorage.getItem('tasks'));
    tasks_data = tasks_data.filter(task => task.id != task_id);
    localStorage.setItem('tasks', JSON.stringify(tasks_data));
    showData();
}

function toggleComplete(task_id) {
    let tasks_data = JSON.parse(localStorage.getItem('tasks'));

    const index = tasks_data.findIndex(task => task.id == task_id);
    tasks_data[index].completed = !tasks_data[index].completed;

    localStorage.setItem('tasks', JSON.stringify(tasks_data));
}
showData();