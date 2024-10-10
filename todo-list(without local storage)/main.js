const TODO_INPUT = document.querySelector('#todo-input');
const TODO_BUTTON = document.querySelector('#todo-button');
const TODO_LIST = document.querySelector('#todo-list');
const TODO_ITEM_TEMPLATE = document.querySelector('#todo-item-template')
let editMode = false;
let editItem = '';

TODO_BUTTON.addEventListener('click', (event) => {
    const todoInputText = TODO_INPUT.value;
    if(todoInputText === '') {
        alert('Please enter a valid todo task')
    } else if(editMode){
        editItem.firstChild.textContent = TODO_INPUT.value;
        TODO_BUTTON.innerText = "Add To List";
        editMode = false; 
        editItem = '';
        TODO_INPUT.value = '';
    } else{
        // append to the list
        addToList()
    }
})

function addToList() {
    const todoInputText = TODO_INPUT.value;
    const todoItem = TODO_ITEM_TEMPLATE.content.cloneNode(true);
        
    todoItem.querySelector('.todo-value').innerText = todoInputText;
    TODO_LIST.appendChild(todoItem);

    // clear the input field
    TODO_INPUT.value = '';
}

// event delegation

document.querySelector('#todo-list').addEventListener('click', (event) => {
    const itemOperation = event.target.innerText;
    const item = event.target.parentNode;

    console.log('itemOperation', itemOperation);
    console.log('item', item);

    if(itemOperation === 'Edit') {
        //perform edit operation
        /**
         * Edit: bring the value of the element
         * in the text box.
         * Update the value, click ok and then 
         * update the value in the list
         * 
         */

        const currentItemValue = item.querySelector('.todo-value').innerText;
        console.log('currentItemValue', currentItemValue)
        
        TODO_INPUT.value = currentItemValue;
        TODO_BUTTON.innerText = 'Update Value';
        editMode = true;
        editItem = item;

    }
    if(itemOperation === 'Remove') {
        item.remove();
    }

})








/**
 * 
 * Functionality: Add Element, Edit Element, Remove Element
 * Error Handling
 * Design: 
 *   - Simple input and a button to add to the todo list.
 *   - List below: Append the todo element with edit and 
 *     remove button.
 * 
 */