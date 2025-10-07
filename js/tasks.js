// === ПЕРЕМЕННЫЕ === 
// находим все необходимые элементы на странице и сохраняем в переменные
const buttonTheme = document.getElementById('themeToggle');
const tasksInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const totalTasksSpan = document.getElementById('totalTasks')
const completedTasksSpan = document.getElementById('completedTasks');

// Массив для хран данных (задач)
let tasks = [];

function toggleTheme(){
    document.body.classList.toggle('dark-theme');

    if(document.body.classList.contains('dark-theme')){
        buttonTheme.textContent = 'Светлая тема';
        localStorage.setItem('darkTheme', 'enabled');
    } 
    else{
        buttonTheme.textContent = 'Темная тема';
        localStorage.setItem('darkTheme', 'disabled');
    }
}


// === ФУНКЦИИ ДЛЯ РАБОТЫ С ЗАДАЧАМИ ===

// Функция добавления новой задачи
function addTask(){
    const taskText = tasksInput.value.trim();

    // проверка на пустое поле ввода
    if (taskText == ''){
        alert('Пожалуйста введите задачу!')
        return; // выход из функции
    }

    // создание объекта задачи
    // объекты - структура которая хранит данные в виде пар - ключ, значение
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    }

    // добавление нашей задачи в список (массив) задач
    // push() - добавление элемента в конец списка (append в пайтон)
    tasks.push(newTask);

    // очищаем поля ввода после внесения данных 
    tasksInput.value = '';

    saveTasks();

    // обновляем список задач (отображение списка)
    renderTasks();

    // обновляем счетчики задач
    updateCounters();
}

// aунк для выполнения задач
function toggleTaskCompletion(taskId){
    // будем искать задачу в массиве по id
    // find() - метод поиска элемента в массиве
    const task = tasks.find(task => task.id)

    // если задача найдена
    if(task){
        task.completed = !task.completed; // преобразовть в потивоположное значение
        saveTasks();
        renderTasks();
        updateCounters();
    
    }
}

// функция удаления задачи
function deleteTask(taskId){
    // filter() - метод создания нового массива с элементами которые прошли фильтрацию
    //оставляем только те задачи кторые прошли проверк (их ид не равен удаляеммоу)
    tasks = tasks.filter(task => task.id !== taskId);

    renderTasks();
    updateCounters();
}

// обновление счетчика задач при изменении задач (удалении добавлении и тд)
function updateCounters(){
    // length - св-во которое возвращает число лементов в массиве
    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(task => task.completed).length;

    // обновим текст счетчиков в html
    totalTasksSpan.textContent = totalTasks;
    completedTasksSpan.textContent = completedTasks;
}

// функция отображения (обновления) всего списка задач
function renderTasks(){
    // очищение текущего списка
    taskList.innerHTML = '';

    // перебираем все элементы в массиве
    // forEach() - метод пребора каждого элемента массива
    tasks.forEach(task => {
        // Создание элемента списка 
        // CreateElement() - метод создания нового HTML-элемента
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        // Добавление класа если задача выполнена
        if(task.completed){
            taskItem.classList.add('completed');
        }

        // создание HTML структуры для новой задачи
        taskItem.innerHTML = `
            <span class="task-text">${task.text}</span>
            <input type="checkbox" class="task-checkbox" ${task.completed ?'checked' : ''}>\
            <button class="delete-btn">X</button>
        `;

        // обработчики событий для чекбокса и крестика
        const checkbox = taskItem.querySelector('.task-checkbox');
        const deleteBtn = taskItem.querySelector('.delete-btn');

        // обработка нажатия на чекбокс
        checkbox.addEventListener('click', () =>{
            toggleTaskCompletion(taskList.id);
        });

        deleteBtn.addEventListener('click', () =>{
            deleteTask(task.id);
        });

        //обработка нажатия по кнопке
        // добавляем задачу в список HTML
        // appendChild() - метод добавления элемента в конец другого элемента
        taskList.appendChild(taskItem);
    });
}


// === ОБРАБОТЧИКИ СОБЫТИЙ ===
buttonTheme.addEventListener('click', toggleTheme);
addTaskBtn.addEventListener('click', addTask);

// ===  ИНИЦИАЛИЗАЦИЯ ===
// Проверка сохраненной темы
if(localStorage.getItem('darkTheme') === 'enabled'){
    document.body.classList.add('dark-theme');
    buttonTheme.textContent = 'Светлая тема';
}


// Загружаем задачи из localstorage  при загрузке страницы
function loadTasks(){
    const savedTasks = localStorage.getItem('tasks');
        if(savedTasks){
            tasks = JSON.parse(savedTasks); // Преобразование строк обратно в массив

            renderTasks();
            updateCounters();
        }
}

// сохраняем задачи в localStorage 
function saveTasks(){
    // JSON.stringify - преобразуем массив задач в строку 
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// // Обновляем функ доб задачи чтобы она сохраняла задачу в локал хранилище
// const originalAddTasks =  addTask;
// addtask = function(){
//     originalAddTasks();
//     saveTasks();
// };

// загружаем 
