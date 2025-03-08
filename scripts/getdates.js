const currentYear =  document.querySelector("#currentyear");
const lastModified =  document.querySelector("#lastModified");

const currentDate = new Date();
const year = currentDate.getFullYear();

currentYear.innerHTML = year;
lastModified.innerHTML = document.lastModified;


