//Selectors

const todoButton = document.querySelector('.todo-button');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.todo-filter');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
todoFilter.addEventListener('click', filterTodo);

//Alert if blank
function addTodo(){
    if (document.forms['todoList']['todoInputField'].value == ''){
        alert("Please enter Todo.");
    } else {
        addList();
    }
}

//Functions
function addList(){
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Add Todo to LocalStorage
    localSaveTodos(todoInput.value);

    //create button
    const addCheckButton = document.createElement('button');
    addCheckButton.innerHTML = '<i class="fas fa-check"></i>';
    addCheckButton.classList.add('btn-check');
    todoDiv.appendChild(addCheckButton);

    const addTrashButton = document.createElement('button');
    addTrashButton.innerHTML = '<i class="fas fa-trash"></i>';
    addTrashButton.classList.add('btn-trash');
    todoDiv.appendChild(addTrashButton);

    //append todolist
    todoList.appendChild(todoDiv);

    //focus form
    todoInput.value = '';
    document.forms['todoList']['todoInputField'].focus();
}

//Clear and Check todo input value
function deleteTodo(e) {
    const item = e.target;
    if (item.classList[1] === 'fa-trash') {
        const todo = item.parentElement.parentElement;
        todo.classList.add('delete-animation');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();

        });
    }
    if (item.classList[1] === 'fa-check') {
        const todo = item.parentElement.parentElement;
        todo.classList.toggle('list-checked');
    }
}

//Filter Todo-List
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'checked':
                if(todo.classList.contains('list-checked')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case 'todo':
                if (todo.classList.contains('list-checked')){
                    todo.style.display = 'none';
                }else{
                    todo.style.display = 'flex';
                }
                break;
        }
    })
}

//LocalStorage
function localSaveTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }   
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));   
}

//Retrive from Localstorage
function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        const newTodo = document.createElement('li');
        newTodo.innerText = todo
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //create button
        const addCheckButton = document.createElement('button');
        addCheckButton.innerHTML = '<i class="fas fa-check"></i>';
        addCheckButton.classList.add('btn-check');
        todoDiv.appendChild(addCheckButton);

        const addTrashButton = document.createElement('button');
        addTrashButton.innerHTML = '<i class="fas fa-trash"></i>';
        addTrashButton.classList.add('btn-trash');
        todoDiv.appendChild(addTrashButton);

        //append todolist
        todoList.appendChild(todoDiv);
});
}

//Remove from LocalStorage
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoItem = Array.from(todoList.childNodes).indexOf(todo);
    console.log(todoItem);
    todos.splice(todoItem, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}