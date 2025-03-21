const countryDataCard = document.querySelector(".country-data");
let countryData = "";

const getCountry = () => {
    fetch("https://restcountries.com/v3.1/name/south%20africa")
        .then(response => response.json())
        .then(data => {
            console.log(data[0])
            const countryInfo = data[0];
            countryData = `
                        <p><span>Area: </span>${countryInfo.area}</p>
                        <p><span>Population: </span>${countryInfo.population}</p>
                        <p><span>Capital: </span>${countryInfo.capital}</p>
                        <p><span>Languages: </span>${Object.values(countryInfo.languages)}</p>
                        <p><span>Currency: </span>$</p>
                        <p><span>Timezone: </span>${countryInfo.timezones}</p>
                        <p><span>Calling Code: </span>+27</p>
                        <p><span>Internet: </span>.mg</p>
        `;
        console.log(countryData);
        
        countryDataCard.innerHTML = countryData;
}) 
        .catch(error => console.error("Error fetching data:", error));
};

getCountry();
