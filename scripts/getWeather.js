const getWeather = async () =>{
    try{
        const response = await fetch("https://api.openweathermap.org/data/3.0/onecall?lat=30.5595°&lon=22.9375°&appid=9EzdJ3lhcAeVxFKP");
        const data = await response.json;
        console.log(data);
    } catch (error){
        console.log("Error fetching data", error);
        
    }
}


getWeather();