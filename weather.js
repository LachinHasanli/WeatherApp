let methods = document.getElementById("methods");
let picked = document.querySelector("#s-method");
let result = document.querySelector("#result");
let list = document.querySelectorAll("li");

//for search by city name;
let cName = document.createElement("input");
let cNameLabel = document.createElement("label");
let cNameBtn = document.createElement("button");

cNameLabel.textContent = "Enter city name: ";
picked.append(cNameLabel);
cName.setAttribute("type", "text")
picked.append(cName);
cNameBtn.textContent = "Search";
picked.append(cNameBtn);
cNameBtn.addEventListener("click", () => {
    cName.value ? getByCName(cName.value) : "";
    cName.value = ""
});


//search by latitude and longitude;
let lat = document.createElement("input");
lat.setAttribute("type", "text")
let lon = document.createElement("input");
lon.setAttribute("type", "text")
let latLabel = document.createElement("label");
latLabel.textContent = "latitude";
let lonLabel = document.createElement("label");
lonLabel.textContent = "longitude";

let coordinateBtn = document.createElement("button");
coordinateBtn.innerHTML = "Search";
coordinateBtn.addEventListener("click", () => {
    lat.value && lon.value ? getByCoordinates(lat.value, lon.value) : "";
    lat.value = "";
    lon.value = "";
});


let myLocationBtn = document.createElement("button");
myLocationBtn.textContent = "My Location";
myLocationBtn.addEventListener("click", () => {
    getLocation();
});


//got help from w3school
const getLocation = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
};

const showPosition = function (position) {
    getByCoordinates(position.coords.latitude, position.coords.longitude);
};


const interface = function () {
    picked.innerHTML = "";
    switch (true) {
        case methods.value === "cityName":
            picked.append(cNameLabel);
            picked.append(cName);
            picked.append(cNameBtn);
            break;
        case methods.value === "latLong":
            picked.append(latLabel);
            picked.append(lat);
            picked.append(lonLabel);
            picked.append(lon);
            picked.append(coordinateBtn);
            break;
        case methods.value === "location":
            picked.append(myLocationBtn);
            break;
        default:
            break;
    }
};



let resName = document.querySelector("#name");
let country = document.getElementById("country");
let condition = document.querySelector("#condition");
let description = document.querySelector("#desc");
let temp = document.querySelector("#temp");
let humidity = document.querySelector("#humidity");
let pressure = document.querySelector("#pressure");
let wind = document.querySelector("#wind");
let dateAndTime = document.querySelector("#dateAndTime");


async function displayData (data) {
    list.forEach(item => item.textContent = "")
    result.style.display = "block";
    resName.textContent += `${data.name}`
    country.textContent += `${await fullCountryName(data.sys.country)}`;
    condition.textContent += `${data.weather[0].main}`;
    description.textContent += `${data.weather[0].description}`;
    temp.textContent += `${Math.floor(data.main.temp)}℃, minimum temperature: ${data.main.temp_min}℃, maximum temperature: ${data.main.temp_max}℃, feels like: ${data.main.feels_like}℃`;;
    humidity.textContent += `${data.main.humidity}%`;
    pressure.textContent += `${data.main.pressure}`;
    wind.textContent += `${data.wind.speed}m/s, ${data.wind.deg}`;
    dateAndTime.textContent += `${Date(data.dt).toLocaleString("it-IT")}`;
}



const getByCoordinates = function (lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=b25d89164e90218d5c325aef1fc4fa79`
    )
        .then((fetching) => fetching.json())
        .then((data) => {
            displayData(data);  
        });
};

const fullCountryName = async function (code) {
    const fetching = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    const data = await fetching.json();
    return data[0].name.common;
};

const getByCName = function (city) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=b25d89164e90218d5c325aef1fc4fa79`
    )
        .then((fetching) => fetching.json())
        .then((data) => {
            console.log(data);
            displayData(data);
        });
};


