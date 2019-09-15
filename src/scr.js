/* ДЗ 7.1 - BOM */

/**
 * Функция должна создавать окно с указанным именем и размерами
 *
 * @param {number} name - имя окна
 * @param {number} width - ширина окна
 * @param {number} height - высота окна
 * @return {Window}
 */
function createWindow(name, width, height) {
    return window.open(name, `width=${width}, heigth=${height}`);
}

/**
 * Функция должна закрывать указанное окно
 *
 * @param {Window} window - окно, размер которого надо изменить
 */
function closeWindow(window) {
    return window.close();
}

/**
 * Функция должна создавать cookie с указанными именем и значением
 *
 * @param name - имя
 * @param value - значение
 */
function createCookie(name, value) {
    document.cookie = `${name}=${value}`;
}

/**
 * Функция должна удалять cookie с указанным именем
 *
 * @param name - имя
 */
function deleteCookie(name) {
    var d = new Date(); // Берём текущую дату
    d.setYear(2017 - 1); // Возвращаемся в "прошлое"
    document.cookie = `${name}=; expires=` + d.toGMTString(); // Устанавливаем cookie пустое значение и срок действия до прошедшего уже времени
}

export {
    createWindow,
    closeWindow,
    createCookie,
    deleteCookie
};
/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *это я не понял
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */

let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

function getCookies() {
    return document.cookie
        .split('; ')
        .filter(Boolean)
        .map(cookie => cookie.match(/^([^=]+)=(.+)/))
        .reduce((obj, [, name, value]) => {
            obj[name] = value;

            return obj;
        }, {});
}

function isMatching(full, chunk) {
    if (full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1) {
        return true;
    } else {
        return false;
    }
}

// при первой загрузке
renderTable();

// Удаление
listTable.addEventListener('click', function (e) {
    console.log(e.target);
    if (e.target.dataset.key) {
        document.cookie = e.target.dataset.key + `=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    }
    renderTable();
});

// Поиск в объекте
filterNameInput.addEventListener('keyup', function () {
    renderTable();
});

// Добавление куки
addButton.addEventListener('click', () => {
    document.cookie = `${addNameInput.value} = ${addValueInput.value}`;
    renderTable();
});

// функция рендеринга
function renderTable() {
    const cookie_obj = getCookies();
    listTable.innerHTML = '';
    for (let key in cookie_obj) {
        if(!(isMatching(key,filterNameInput.value) || isMatching(cookie_obj[key], filterNameInput.value))) continue;
        listTable.innerHTML += `<tr><td class="first_td">${key}</td><td>${cookie_obj[key]}</td><td><button class="del" 
        data-key="${key}">Удалить</button></td></tr>`;
    }
}