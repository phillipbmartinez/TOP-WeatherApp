const cityInput = document.getElementById("cityInput");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const weatherDataContainer = document.getElementById("weatherDataContainer");
// Add your API key when/where applicable
const apiKey = "";


async function getWeatherData() {
    const city = cityInput.value.trim();

    if (!city || city === null) {
        alert("Please Enter A City Name.");
        console.error("City name is required.");
        return null;
    }

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`
    try {
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const weatherData = await response.json();
        console.log("User Entered:", city);
        console.log(weatherData);
        console.log("Full Address:", weatherData.resolvedAddress);
        console.log("Temp:", weatherData.currentConditions.temp);
        console.log("Feels Like:", weatherData.currentConditions.feelslike);
        console.log("Conditions:", weatherData.currentConditions.conditions);
        return weatherData;
    } catch (error) {
        console.error(error.message);
        alert("Failed to retrieve weather data. Please try again.");
        return null;
    }
};

async function displayWeatherData() {
    weatherDataContainer.innerText = "";

    const weatherData = await getWeatherData();
    if (!weatherData) return;

    const fullAddress = document.createElement("h1");
    const conditions = document.createElement("h3");
    const temp = document.createElement("h3");
    const feelsLike = document.createElement("h3");

    weatherDataContainer.appendChild(fullAddress);
    weatherDataContainer.appendChild(conditions);
    weatherDataContainer.appendChild(temp);
    weatherDataContainer.appendChild(feelsLike);

    fullAddress.innerText = `City: ${weatherData.resolvedAddress}`;
    conditions.innerText = `Conditions: ${weatherData.currentConditions.conditions}`;
    temp.innerText = `Temp: ${weatherData.currentConditions.temp}`;
    feelsLike.innerText = `Feels Like: ${weatherData.currentConditions.feelslike}`;
}

function clearCityInput() {
    cityInput.value = "";
    weatherDataContainer.innerText = "";
};

submitBtn.addEventListener("click", displayWeatherData);
resetBtn.addEventListener("click", clearCityInput);

