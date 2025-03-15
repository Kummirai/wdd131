const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

const listElement = document.createElement("li");
const deleteButton = document.createElement('button');


button.addEventListener("click", ()=>{
    if (input.value.trim() !== '') { 
        listElement.textContent = input.value;      
        deleteButton.textContent = " ❌";
        listElement.append(deleteButton);
        list.append(listElement);
        input.value = "";
    }
})

deleteButton.addEventListener("click", ()=>{
    list.removeChild(listElement);
  input.focus();
})