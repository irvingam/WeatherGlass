                // Selectors //
const api = {
    key: "dd27bad266e3ddbf9645ca1c6f57f7e5",
    base: "https://api.openweathermap.org/data/2.5/"
}
const addBtn = document.getElementById('add-btn')
const input = document.getElementById('search')

                // Events //
// add button event
addBtn.addEventListener('click', setQuery)
// press 'enter' event
input.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {getResults(input.value)}
})

// displays current date
window.onload = function displayDate() {
    let now = new Date()
    let currentDate = document.getElementById('current-date')
    currentDate.innerText = getDate(now)
}

                // Functions //
// pushes input info to API
function setQuery(event) {
    getResults(input.value)
}

// generates date for display
function getDate(date) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

    let month = months[date.getMonth()]
    let day = days[date.getDay()]
    let today = date.getDate()
    let year = date.getFullYear()

    return `${day} ${today} ${month} ${year}`
}

// fetches weather info 
function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json()
    }).then(displayWeather)
}

// adds weather module to container
function displayWeather(weather) {
    console.log(weather)

    const module = document.createElement('main')
    module.classList.add('module')

    const location = document.createElement('section')
    location.classList.add('location')
    module.appendChild(location)

    const city = document.createElement('div')
    city.innerText = `${weather.name} ${weather.sys.country}`
    city.classList.add('city')
    location.appendChild(city)

    const current = document.createElement('section')
    current.classList.add('current')
    module.appendChild(current)

    const temp = document.createElement('div')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`
    temp.classList.add('temp')
    current.appendChild(temp)

    const weatherCurrent = document.createElement('div')
    weatherCurrent.innerText = weather.weather[0].main
    weatherCurrent.classList.add('weather')
    current.appendChild(weatherCurrent)

    const hilow = document.createElement('div')
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`
    hilow.classList.add('hi-low')
    current.appendChild(hilow)

    const moduleContainer = document.querySelector('.module-container')
    moduleContainer.appendChild(module)

}