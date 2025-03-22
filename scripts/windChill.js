const windChill = document.querySelector(".windchill");

const calculateWindChill = (temp, speed, unit) => {
    if ((unit === 'C' && temp <= 10 && speed > 4.8) || (unit === 'F' && temp <= 50 && speed > 3)) {
        const windChill = unit === 'C' 
            ? 13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16)
            : 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
        return windChill.toFixed(1);
    }
    return "N/A";
};

windChill.innerHTML = calculateWindChill(10, 5, "C");
 