const API = 'https://api.openweathermap.org/data/2.5/weather?q='
const apiKey = '&appid=0355f9bb3c322330ad89001ccd5d5aaa'

const form = document.querySelector('form')
const input = document.querySelector('#inp')
const output = document.querySelector('.output')
const text_content = document.querySelector('#text_content')

const getWeather = async () => {
    const url = API + input.value + apiKey
    const req = await fetch(url)
    const res = await req.json()
    renderWeather(res)
    getMap(res.coord)
    input.value = ''
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    getWeather()


})

const renderWeather = (data) => {
    text_content.innerHTML = ''
    output.innerHTML = ''
    const cityName = document.createElement('h2')
    cityName.textContent = `City of your choice:   ` + data.name

    const wind = document.createElement('h2')
    wind.textContent = ` Wind information:  speed:  ${data.wind.speed}   gust:  ${data.wind.gust} `

    const countryWeather = document.createElement('h2')
    countryWeather.textContent = ` Country:   ${data.sys.country}`

    const coordWeather = document.createElement('h2')
    coordWeather.textContent = ` Coordinates:  latitude:  ${data.coord.lat} ,  longitude:  ${data.coord.lon}`

    const tempC = document.createElement('h2')
    tempC.textContent = `Celsius temperature:   ${Math.floor(data.main.temp - 273.15)}`

    const tempF = document.createElement('h2')
    tempF.textContent = `Fahrenheit temperature:   ${Math.floor(((data.main.temp - 273.15) * 1.8) + 32)}`

    const Weather = document.createElement('h2')
    Weather.textContent = ` Weather:  ${data.weather[0].main}`
    text_content.append(cityName, wind, tempC, tempF, countryWeather, coordWeather, Weather)
    output.append(text_content)
}
const getMap = ({ lat, lon }) => {
    let map = document.createElement('div')
    map.id = 'map'


    DG.then(() => {
        map = DG.map('map', {
            center: [lat, lon],
            zoom: 13
        });

        DG.marker([lat, lon]).addTo(map).bindPopup('Hello!');
    });
    output.append(map)
}






