

const BigBoss = document.querySelector('.container')


const TextInput = document.querySelector('#input');

const sun = document.querySelector('#sun');
const root_container = document.querySelector('.list');


const list_count = document.querySelector('#list-count');


const background = document.querySelector('.background')
TextInput.addEventListener('keydown', AddList);
sun.addEventListener('click', ChangeColor)

function ChangeColor() {
    document.body.classList.toggle('dark-theme');

    let x = root_container.children;

    if (document.body.classList.contains('dark-theme')) {
        background.style.backgroundImage = 'url(../todo-app-main/images/bg-desktop-light.jpg)';
        sun.className = 'fa-solid fa-moon'
    }
    else {
        sun.className = 'fa-regular fa-sun'
        background.style.backgroundImage = 'url(../todo-app-main/images/bg-desktop-dark.jpg)'
    }
}




let arr = [];



if (localStorage.getItem('local')) {
    arr = JSON.parse(localStorage.getItem('local'))
}

GetLocalStorage()

function AddList(e) {


    if (e.defaultPrevented) {
        return;
    }


    var key = e.key || e.keyCode;

    if (key === 'Enter') {
        const data = {
            id: Date.now(),
            title: e.target.value,
            state: false
        };
        arr.push(data);
        create(arr)
        AddLocalStorage(arr)
    }



}

function create(e) {

    root_container.innerHTML = '';


    e.forEach(element => {


        const list_content = document.createElement('div');

        const circle_icon = document.createElement('i');
        const circle_icon_complate = document.createElement('i');

        const to_do_list_list = document.createElement('ul');
        const exit_icon = document.createElement('i');

        // Edit Element 
        list_content.setAttribute('class', 'list-content');
        circle_icon.setAttribute('id', 'circle');
        circle_icon.setAttribute('class', 'fa-solid fa-circle');
        circle_icon_complate.setAttribute('id', 'complate-circle');
        circle_icon_complate.setAttribute('class', 'fa-solid fa-circle-check');
        to_do_list_list.setAttribute('class', 'to-do-list');
        exit_icon.setAttribute('class', 'fa-solid fa-xmark');
        list_content.setAttribute('data', element.id)

        to_do_list_list.innerText = element.title


        list_content.appendChild(circle_icon)
        list_content.appendChild(circle_icon_complate)
        list_content.appendChild(to_do_list_list)
        list_content.appendChild(exit_icon);

        root_container.appendChild(list_content)
        BigBoss.appendChild(root_container);

        list_content.addEventListener('click', compalte)
        function compalte(e) {
            circle_icon.classList.toggle('display');
            circle_icon_complate.classList.toggle('complated');
            circle_icon_complate.classList.add('complate')
            to_do_list_list.classList.toggle('complated-list')


        }
        exit_icon.addEventListener('click', (e) => {
            list_content.remove();
            RemoveLocalStorage(e.target.parentElement.getAttribute('data'));


        })


    });


}


function AddLocalStorage(ele) {
    localStorage.setItem('local', JSON.stringify(ele))
}


function GetLocalStorage() {
    let data = localStorage.getItem('local');

    if (data) {
        let task = JSON.parse(data);
        create(task);
    }
}

function RemoveLocalStorage(element) {
    arr = arr.filter((e) => e.id != element)
    AddLocalStorage(arr);
}
list_count.innerText = arr.length;
