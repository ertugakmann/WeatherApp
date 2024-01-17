const searchInput = document.querySelector("#search-input");
const infoSection = document.querySelector(".weather-infos");
const searchButton = document.querySelector("#search-button");
const key = "072d5a52f50ad98cb40686ce11dd3d50";
const url = "https://api.openweathermap.org/data/2.5/";

runEventListeners();

function runEventListeners() {
    searchButton.addEventListener("click", search);
}

async function search(e) {
    const searchValue = searchInput.value.trim(); // Trim ile boşlukları kaldır

    if (searchValue === "") {
        alert("Boş bırakmayın");
    } else {
        console.log('hello')
        try {
            // Mevcut içeriği temizle
            clearInfoSection();

            const response = await fetch(`${url}weather?q=${searchValue}&appid=${key}&units=metric&lang=tr`);
            const data = await response.json();

            takeTemp(data.main.temp);
            Array.from(data.weather).forEach((weather) => {
                takeWeather(weather.main);
            });
        } catch (error) {
            console.error(error);
        }
    }

    e.preventDefault();
}

function clearInfoSection() {
    
    const titles = infoSection.querySelectorAll(".weather-title");
    const temps = infoSection.querySelectorAll(".temp");
    const mainWrappers = infoSection.querySelectorAll(".main-wrapper");

    titles.forEach((title) => {
        title.remove();
    });

    temps.forEach((temp) => {
        temp.remove();
    });

    mainWrappers.forEach((mainWrapper) => {
        mainWrapper.remove();
    });
}

function takeTemp(temp) {
    const weatherTitle = document.createElement("div");
    weatherTitle.className = "weather-title";
    weatherTitle.innerHTML = `<h2>${searchInput.value}</h2>`;

    const tempClass = document.createElement("div");
    tempClass.className = "temp";
    tempClass.innerHTML = `<span>${temp}</span>`;

    // Append the elements to the infoSection
    infoSection.appendChild(weatherTitle);
    infoSection.appendChild(tempClass);

    tempClass.style.position = "relative";
    tempClass.style.top = "-300px"

    weatherTitle.style.position = "relative";
    weatherTitle.style.top = "-285px"
}

function takeWeather(weather) {
    const mainWrapper = document.createElement("div");
    mainWrapper.className = "main-wrapper";

    const weatherClass = document.createElement("div");
    weatherClass.className = "weather";
    weatherClass.innerHTML = `<span>${weather}</span>`;

    infoSection.appendChild(mainWrapper);
    mainWrapper.appendChild(weatherClass);

    weatherClass.style.position = "relative";
    weatherClass.style.top = "-300px"
}
