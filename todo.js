document.addEventListener('DOMContentLoaded', function () {
    const todoInput = document.getElementById('todoInput');
    const addTodoButton = document.getElementById('addTodoButton');
    const todoList = document.getElementById('todoList');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function renderTodo() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            if (todo.completed) {
                listItem.classList.add('completed');
            }
            
            const textSpan = document.createElement('span');
            textSpan.textContent = todo.text;
            listItem.appendChild(textSpan);
            
            const buttonGroup = document.createElement('div');
            
            const editButton = document.createElement('button');
            editButton.className = 'btn btn-info btn-sm mx-2';
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => {
                editTodo(index);
            });
            
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger btn-sm';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                deleteTodo(index);
            });
            
            buttonGroup.appendChild(editButton);
            buttonGroup.appendChild(deleteButton);
            listItem.appendChild(buttonGroup);
            
            listItem.addEventListener('click', () => {
                toggleTodoComplete(index);
            });
            
            todoList.appendChild(listItem);
        });
    }

    function deleteTodo(index) {
        todos.splice(index, 1);
        saveTodo();
        renderTodo();
    }

    function toggleTodoComplete(index) {
        todos[index].completed = !todos[index].completed;
        saveTodo();
        renderTodo();
    }

    function editTodo(index) {
        const newTaskText = prompt('Edit your task:', todos[index].text);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            todos[index].text = newTaskText.trim();
            saveTodo();
            renderTodo();
        }
    }

    function addTodo() {
        const taskText = todoInput.value.trim();
        if (taskText === '') return;
        todos.push({ text: taskText, completed: false });
        todoInput.value = '';
        saveTodo();
        renderTodo();
    }

    function saveTodo() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    addTodoButton.addEventListener('click', addTodo);

    todoInput.addEventListener('keypress', (event) => {
        if (event.key == 'Enter') {
            addTodo();
        }
    });

    renderTodo();
});
