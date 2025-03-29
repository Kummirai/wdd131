const menu = document.querySelector("#menu");
const nav = document.querySelector("nav");

menu.addEventListener("click", ()=>{
    nav.classList.toggle("show");
    menu.classList.toggle("close");
});