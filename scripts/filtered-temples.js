const temples = [
    {
      templeName: "Aba Nigeria",
      location: "Aba, Nigeria",
      dedicated: "2005, August, 7",
      area: 11500,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
      templeName: "Manti Utah",
      location: "Manti, Utah, United States",
      dedicated: "1888, May, 21",
      area: 74792,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
      templeName: "Payson Utah",
      location: "Payson, Utah, United States",
      dedicated: "2015, June, 7",
      area: 96630,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
      templeName: "Yigo Guam",
      location: "Yigo, Guam",
      dedicated: "2020, May, 2",
      area: 6861,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
      templeName: "Washington D.C.",
      location: "Kensington, Maryland, United States",
      dedicated: "1974, November, 19",
      area: 156558,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
      templeName: "Lima Perú",
      location: "Lima, Perú",
      dedicated: "1986, January, 10",
      area: 9600,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
      templeName: "Mexico City Mexico",
      location: "Mexico City, Mexico",
      dedicated: "1983, December, 2",
      area: 116642,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "San Diego California",
        location: "San Diego, California, United States",
        dedicated: "1993, April, 25",
        area: 72000,
        imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/san-diego-california-temple/san-diego-california-temple-9060-main.jpg"
        },
        {
        templeName: "Salt Lake City Utah",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 382207,
        imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg"
    },
    {
        templeName: "Los Angeles California",
        location: "Los Angeles, California, United States",
        dedicated: "1956, March, 11",
        area: 190614,
        imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/los-angeles-california-temple/los-angeles-california-temple-38945-main.jpg"
    }

    // Add more temple objects here...
  ];


  const cardContainer = document.querySelector(".grid");
  let cards = "";
  temples.map((temple)=>{
    cards += `
            <div class="card">
                    <h3>${temple.templeName}</h3>
                    <p><span>LOCATION: </span>${temple.templeName}</p>
                    <p><span>DEDICATION: </span>${temple.dedicated}</p>
                    <p><span>SIZE: </span>${temple.area}sq ft</p>
                    <figure>
                        <img loading="lazy" src=${temple.imageUrl} alt=${temple.templeName}>
                    </figure>
                </div>
    `;
    cardContainer.innerHTML = cards;
  })


const menu = document.querySelector("#menu");
const nav = document.querySelector("nav");

menu.addEventListener("click", ()=>{
    nav.classList.toggle("show");
    menu.classList.toggle("close");
});


const navList = document.querySelectorAll("nav ul li a");
navList.forEach((item) => {
    item.addEventListener("click", () => {
        if(item.textContent == "Small"){
            const smallTemples = temples.filter(temple => temple.area < 10000);
            cards = "";
            smallTemples.map((temple)=>{
                cards += `
                    <div class="card">
                            <h3>${temple.templeName}</h3>
                            <p><span>LOCATION: </span>${temple.templeName}</p>
                            <p><span>DEDICATION: </span>${temple.dedicated}</p>
                            <p><span>SIZE: </span>${temple.area}sq ft</p>
                            <figure>
                                <img loading="lazy" src=${temple.imageUrl} alt=${temple.templeName}>
                            </figure>
                        </div>
                `;
                cardContainer.innerHTML = cards;
            });
            
        } else if (item.textContent == "Old"){
            const oldTemples = temples.filter(temple => temple.dedicated.split(",")[0] < 1900);
            cards = "";
            oldTemples.map((temple)=>{
                cards += `
                    <div class="card">
                            <h3>${temple.templeName}</h3>
                            <p><span>LOCATION: </span>${temple.templeName}</p>
                            <p><span>DEDICATION: </span>${temple.dedicated}</p>
                            <p><span>SIZE: </span>${temple.area}sq ft</p>
                            <figure>
                                <img loading="lazy" src=${temple.imageUrl} alt=${temple.templeName}>
                            </figure>
                        </div>
                `;
                cardContainer.innerHTML = cards;
            });  
        } else if (item.textContent == "New"){
            const newTemples = temples.filter(temple => temple.dedicated.split(",")[0] > 2000);
            cards = "";
            newTemples.map((temple)=>{
                cards += `
                    <div class="card">
                            <h3>${temple.templeName}</h3>
                            <p><span>LOCATION: </span>${temple.templeName}</p>
                            <p><span>DEDICATION: </span>${temple.dedicated}</p>
                            <p><span>SIZE: </span>${temple.area}sq ft</p>
                            <figure>
                                <img loading="lazy" src=${temple.imageUrl} alt=${temple.templeName}>
                            </figure>
                        </div>
                `;
                cardContainer.innerHTML = cards;
            });   
        } else if (item.textContent == "Large"){
            const largeTemples = temples.filter(temple => temple.area > 10000);
            cards = "";
            largeTemples.map((temple)=>{
                cards += `
                    <div class="card">
                            <h3>${temple.templeName}</h3>
                            <p><span>LOCATION: </span>${temple.templeName}</p>
                            <p><span>DEDICATION: </span>${temple.dedicated}</p>
                            <p><span>SIZE: </span>${temple.area}sq ft</p>
                            <figure>
                                <img loading="lazy" src=${temple.imageUrl} alt=${temple.templeName}>
                            </figure>
                        </div>
                `;
                cardContainer.innerHTML = cards;
            }); 
        } else if(item.textContent === "Home" ){
            console.log("All Temples");  
            cards = "";
            temples.map((temple)=>{
                cards += `
                    <div class="card">
                            <h3>${temple.templeName}</h3>
                            <p><span>LOCATION: </span>${temple.templeName}</p>
                            <p><span>DEDICATION: </span>${temple.dedicated}</p>
                            <p><span>SIZE: </span>${temple.area}sq ft</p>
                            <figure>
                                <img loading="lazy" src=${temple.imageUrl} alt=${temple.templeName}>
                            </figure>
                        </div>
                `;
                cardContainer.innerHTML = cards;
            });
        }
        
    });
});

