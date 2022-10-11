const api = {
    key: "818a594465d171d540a783833ba14bca",
    base: "https://api.openweathermap.org/data/2.5/"
}

const search = document.querySelector('#search')
const button = document.querySelector('#btn')
button.addEventListener('click', getInput);

function getInput(e) {
    e.preventDefault();
    if (e.type == "click") {
        getData(search.value)
    }
}

function getData() {
    fetch(`${api.base}weather?q=${search.value}&units=imperial&appid=${api.key}`)
        .then(response => {
            return response.json();
        })
        .then(displayData)
        .catch(error => {
            console.log(error)
        })
}

function displayData(response) {
    const error = document.querySelector('#error');
    if (response.cod === "404") {
        error.textContent = 'Please enter a valid city.'
        search.value = '';
    } else {
        error.textContent = ''
        const city = document.querySelector(".city")
        city.innerText = `${response.name}, ${response.sys.country}`
        const today = new Date();
        const date = document.querySelector(".date")
        date.innerText = getDate(today)
        const temp = document.querySelector("#temp")
        temp.innerHTML = `Temp: ${Math.round(response.main.temp)}<span>°F</span>`
        const weather = document.querySelector("#weather")
        weather.innerHTML = `Weather: ${response.weather[0].description}`
        const tempRange = document.querySelector("#temp-range")
        tempRange.innerHTML = `Temp Range: ${Math.round(response.main.temp_min)}<span>°F</span> / ${Math.round(response.main.temp_max)}<span>°F</span>`
        const weatherIcon = document.querySelector("#weather-icon")
        const iconUrl = `http://openweathermap.org/img/w/`
        weatherIcon.src = `${iconUrl}${response.weather[0].icon}.png`
    }
}

function getDate(d) {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getYear()
    return `${day}, ${month} ${date}, ${year}`
}

getData()