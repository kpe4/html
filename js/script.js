// document - объект, который предоставляет всю нашу HTML страницу
// getElementBwyId - найти эл по ИД
const buttonTheme = document.getElementById('themeToggle');

function toggleTheme(){
    document.body.classList.toggle('dark-theme');

    if(document.body.classList.contains('dark-theme')){
        // исп переменную в которой хранится кнопка
        // textContent - изм сод текста тэга
        buttonTheme.textContent = '🌞 Светлая тема';
    }else{
        buttonTheme.textContent = '🌙Темная тема';
    }
}

// добавление обработчика события (нажатие на кнопку)
// addEventListener() - "слушает" события на элементе
buttonTheme.addEventListener('click', toggleTheme);