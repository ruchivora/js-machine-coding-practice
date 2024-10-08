const ITEMS_CONTAINER = document.getElementById('items');
const ITEM_TEMPLATE = document.getElementById('itemTemplate');
const ADD_BUTTON = document.getElementById('add');


let items = getItems()

function setItems() {
    let itemList = items?.length ? JSON.stringify(items) : '[]';
    localStorage.setItem('todoList', itemList);
}

function getItems() {
    let itemsJson = localStorage.getItem('todoList') ? localStorage.getItem('todoList') : '[]';
    return JSON.parse(itemsJson)
}

// two thing happens: 1. Add in the item list 2. Show the element 

ADD_BUTTON.addEventListener('click', () => {
    items.unshift({
        description: '',
        checked: false,
        id: generateUniqueId(),
    })

    setItems();
    refreshList();
})

function updateItem(item, key, value) {
    item[key] = value;
    console.log('items', items)
    setItems();
}

function refreshList() {

    ITEMS_CONTAINER.innerHTML = '';

    for(let item of items) {
        let itemElement = ITEM_TEMPLATE.content.cloneNode(true);

        let itemEle = itemElement.querySelector('.item')
        let itemDescription = itemElement.querySelector('.itemDescription');
        let itemChecked = itemElement.querySelector('.itemCompleted');

        itemDescription.value = item.description;
        itemDescription.id = item.id + '-desc';

        itemChecked.checked = item.checked;
        itemChecked.id = item.id + '-checked';

        ITEMS_CONTAINER.append(itemElement);
    }
}

ITEMS_CONTAINER.addEventListener('input', (event) => {
    let updateId = event.target.id.split('-')[0];
    let attribute = event.target.id.split('-')[1];

    for(let item of items) {
        if(item.id == updateId) {
            
            if(attribute === 'desc') {
                updateItem(item, 'description', event.target.value)
            }

            if(attribute === 'checked')
                updateItem(item, 'checked', event.target.checked)
        }
    }
})

function generateUniqueId() {
    return Date.now(); 
}

refreshList()

console.log(items);