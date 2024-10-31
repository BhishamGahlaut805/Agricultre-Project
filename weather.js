let weather = document.querySelector("#Weather_Details");

let w = document.querySelector(".weather");
function open_weather() {
    w.classList.toggle('show');
    document.querySelector(".footer").classList.add("vis-hidden");
    document.querySelector(".footer").classList.remove("vis-show");

    document.querySelector(".inf").classList.add("vis-hidden");
    document.querySelector("#sun-img").classList.remove("vis-show");
    document.querySelector("#set-img").classList.remove("vis-show");
    document.querySelector("#sun-img").classList.add("vis-hidden");
    document.querySelector("#set-img").classList.add("vis-hidden");
}
weather.addEventListener("click", open_weather);


let exit_weather = document.querySelector("#exit_weather");
exit_weather.addEventListener("click", () => {
    w.classList.remove('show');
    document.querySelector(".footer").classList.remove("vis-hidden");
    document.querySelector(".footer").classList.add("vis-show");
});

let current = document.querySelector("#curr");
document.querySelector(".weather-box").classList.add("vis-hidden");
document.querySelector(".inf").classList.add("vis-hidden");
function current_weather() {
    document.querySelector(".weather-box").classList.add("vis-show");
    document.querySelector(".weather-box").classList.remove("vis-hidden");
    document.querySelector(".inf").classList.add("vis-show");
    document.querySelector(".inf").classList.remove("vis-hidden");

    const city = document.createElement("input");
    city.placeholder = "Enter Your City";
    city.type = "text";
    city.className = "input-city";
    document.querySelector(".sub").appendChild(city);

    const exit2 = document.createElement("button");
    exit2.innerText = "Exit";
    exit2.classList.add("exit-btn");
    exit2.addEventListener("click", () => {
        document.querySelector(".sub").removeChild(exit2);
        document.querySelector(".sub").removeChild(city);
        document.querySelector(".sub").removeChild(submit);
        document.querySelector(".weather-box").classList.remove("vis-show");
        document.querySelector(".weather-box").classList.add("vis-hidden");
        document.querySelector(".inf").classList.remove("vis-show");
        document.querySelector(".inf").classList.add("vis-hidden");
        document.querySelector("#sun-img").classList.remove("vis-show");
        document.querySelector("#set-img").classList.remove("vis-show");
        document.querySelector("#sun-img").classList.add("vis-hidden");
        document.querySelector("#set-img").classList.add("vis-hidden");
    });

    document.querySelector(".sub").appendChild(exit2);

    const submit = document.createElement("button");
    submit.innerText = "Submit";
    submit.classList.add("exit-btn");
    submit.addEventListener("click", () => {
        data_weather(city.value);
    });
    document.querySelector(".sub").appendChild(submit);

}
current.addEventListener("click", current_weather);

const temperature = document.querySelector("#temp");
const weather_box = document.querySelector(".weather-box");
const city_head = document.querySelector("#city_head");
const feelslike = document.querySelector("#feelslike");
const high = document.querySelector("#high");
const low = document.querySelector("#low");
const humidity = document.querySelector("#humidity");

function datetime(unixTimestamp) {
    // Convert to milliseconds
    const date = new Date(unixTimestamp * 1000);

    // Format the date
    const formattedDate = date.toLocaleString();

    return (formattedDate); // Output: "10/1/2021, 12:00:00 AM" (example output)

}
function getCardinalDirection(deg) {
    if (deg > 337.5 || deg <= 22.5) {
        return 'N';
    } else if (deg > 22.5 && deg <= 67.5) {
        return 'NE';
    } else if (deg > 67.5 && deg <= 112.5) {
        return 'E';
    } else if (deg > 112.5 && deg <= 157.5) {
        return 'SE';
    } else if (deg > 157.5 && deg <= 202.5) {
        return 'S';
    } else if (deg > 202.5 && deg <= 247.5) {
        return 'SW';
    } else if (deg > 247.5 && deg <= 292.5) {
        return 'W';
    } else if (deg > 292.5 && deg <= 337.5) {
        return 'NW';
    }
}
async function data_weather(city) {
    const KEY = "2b0d2611a41f0127715cfef77b8c353a";
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`);
        const data = await response.json();

        city_head.innerText = `${city.toUpperCase()}`;

        city_head.innerText = `${city}`;

        temperature.innerHTML = `${parseInt(data.main.temp - 273.15)}<span>°C</span>`;
        weather_box.classList.add('visible');
        weather_box.classList.remove('hidden');

        feelslike.innerHTML = `Feels like ${Math.round(data.main.feels_like - 273.15)}<span>°C</span>`;
        high.innerHTML = `High:${Math.round(data.main.temp_max - 273.15)}<span>°C</span>`;
        low.innerHTML = `Low:${Math.round(data.main.temp_min - 273.15)}<span>°C</span>`;

        humidity.innerHTML = `<div id="h-img"></div> Humidity: ${parseInt(data.main.humidity)}<span>%</span>`;
        document.querySelector("#visibility").innerHTML = `<div id="v-img"></div> Visibility : ${(data.visibility)}<span>Meters</span>`;
        document.querySelector("#description").innerHTML = `Weather ${data['weather'][0]['description']}`;

        const srise = datetime(data['sys']['sunrise']);
        const sset = datetime(data['sys']['sunset']);

        document.querySelector("#sunrise").innerHTML = `<div id="sun-img" ></div> ${srise}`;
        document.querySelector("#sunset").innerHTML = `<div id="set-img" ></div> ${sset}`;

        switch (data.weather[0].main) {
            case 'Clear':
                document.querySelector("#des-img").classList.add("clear");
                break;
            case 'Rain':
                document.querySelector("#des-img").classList.add("rain");
                break;
            case 'Snow':
                document.querySelector("#des-img").classList.add("snow");
                break;
            case 'Clouds':
                document.querySelector("#des-img").classList.add("cloud");
                break;
            case 'Mist':
                document.querySelector("#des-img").classList.add("mist");
                break;
            case 'Haze':
                document.querySelector("#des-img").classList.add("haze");
                break;
            default:
                document.querySelector("#des-img").classList.add("clear");
                break;
        }

        document.querySelector("#wind_s").innerHTML = `<div id="w-img"></div> Wind-Speed : ${data.wind.speed}<span>m/s</span>`;
        document.querySelector("#wind_dir").innerHTML = `Wind-Direction : ${data.wind.deg}<span>° </span> ${getCardinalDirection(data.wind.deg)}`;

        const rain1 = data.rain ? `${data.rain['1h']} mm rain in last 1hour` : 'No rain in last 1hour';
        const rain3 = data.rain ? `${data.rain['3h']} mm rain in last 3hour` : 'No rain in last 3hour';
        document.querySelector("#r1").innerHTML = `${rain1}`;
        document.querySelector("#r3").innerHTML = `${rain3}`;

        const snow1 = data.snow ? `${data.snow['1h']} mm snow in last 1hour` : 'No snow in last 1hour';
        const snow3 = data.snow ? `${data.snow['3h']} mm snow in last 3hour` : 'No snow in last 3hour';
        document.querySelector("#s1").innerHTML = `${snow1}`;
        document.querySelector("#s3").innerHTML = `${snow3}`;
        document.querySelector("#cloud").innerHTML = `<div id="cloud-img"></div> Cloudiness : ${data.clouds.all}<span>%</span>`;

        chancesofrain(city);

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

async function chancesofrain(city) {
    const apiKey = '2b0d2611a41f0127715cfef77b8c353a';
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.length > 0) {
            const latitude = data[0].lat;
            const longitude = data[0].lon;
            // console.log(`Latitude: ${latitude} Longitude: ${longitude}`);

            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=precipitation`;
            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();

            // Get the precipitation data for the next hour
            const nextHourPrecipitation = weatherData.hourly.precipitation[0];
            document.querySelector("#r_chance").innerHTML = ` <div id="r-img"></div> Rain forecast for the next 1 hour : ${nextHourPrecipitation} mm`;
        }

        else {

            console.log("City not found. Please enter a valid city name.");
        }
    } catch (error) {
        console.log("An error occurred. Please try again.");
    }
}

//Future Weather forecast
//************************************************* */
let future = document.querySelector("#fut");
future.addEventListener("click", showFutureWeatherForm);

document.querySelector(".fut-box").classList.add("vis-hidden");
document.querySelector(".fut-box").classList.remove("vis-show");

document.querySelector("#f-btns").classList.remove("vis-show");
document.querySelector("#f-btns").classList.add("vis-hidden");

function showFutureWeatherForm() {
    console.log("Clicked on future weather");
    document.querySelector(".fut-box").classList.add("vis-show");
    document.querySelector(".fut-box").classList.remove("vis-hidden");

    const city1 = document.createElement("input");
    city1.placeholder = "Enter Your City";
    city1.type = "text";
    city1.className = "input-city";
    document.querySelector(".sub").appendChild(city1);

    const submit = document.createElement("button");
    submit.innerText = "Submit";
    submit.classList.add("exit-btn");
    submit.addEventListener("click", () => {
        weather_handler(city1.value);
    });
    document.querySelector(".sub").appendChild(submit);

    const exit2 = document.createElement("button");
    exit2.innerText = "Exit";
    exit2.classList.add("exit-btn");
    exit2.addEventListener("click", () => {
        document.querySelector(".sub").removeChild(exit2);
        document.querySelector(".sub").removeChild(city1);
        document.querySelector(".sub").removeChild(submit);
        document.querySelector(".fut-box").classList.remove("vis-show");
        document.querySelector(".fut-box").classList.add("vis-hidden");
        document.querySelector("#f-btns").classList.remove("vis-show");
        document.querySelector("#f-btns").classList.add("vis-hidden");
    });

    document.querySelector(".sub").appendChild(exit2);
}

function weather_handler(city1) {
    document.querySelector("#f-btns").classList.add("vis-show");
    document.querySelector("#f-btns").classList.remove("vis-hidden");
    document.querySelector("#hourly").addEventListener("click", () => fetchhourly(city1));
    document.querySelector("#daily").addEventListener("click", () => fetchdaily(city1));
    document.querySelector("#Seasonal").addEventListener("click", () => fetchSeasonal(city1));
}

function fetchhourly(city1) {
    fetchFutureWeather_hour(city1);
}
function fetchdaily(city1) {
    fetchFutureWeather_daily(city1);
}
function fetchSeasonal(city1) {
    fetchSeasonalWeather(city1);
}

async function fetchFutureWeather_hour(city1) {
    const apiKey = '2b0d2611a41f0127715cfef77b8c353a';
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city1)}&limit=1&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.length > 0) {
            const latitude = data[0].lat;
            const longitude = data[0].lon;
            console.log(`Latitude: ${latitude} Longitude: ${longitude}`);
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,wind_speed_10m,wind_direction_10m,cloudcover,rain,snowfall&timezone=Asia/Kolkata&forecast_days=7`;

            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();

            const weatherTable = document.getElementById('weather-table').getElementsByTagName('tbody')[0];
            weatherTable.innerHTML = '';  // Clear any existing data

            weatherData.hourly.time.forEach((time, index) => {
                const row = weatherTable.insertRow();
                const date = new Date(time);
                const formattedDate = date.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
                const formattedTime = date.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                });
                row.insertCell(0).innerText = `${formattedDate}, ${formattedTime}`;
                row.insertCell(1).innerText = `${weatherData.hourly.temperature_2m[index]}`;
                row.insertCell(2).innerText = "";
                row.insertCell(3).innerText = "";
                row.insertCell(4).innerText = `${weatherData.hourly.wind_direction_10m[index]}°${getCardinalDirection(weatherData.hourly.wind_direction_10m[index])}`;
                row.insertCell(5).innerText = weatherData.hourly.wind_speed_10m[index];
                row.insertCell(6).innerText = weatherData.hourly.cloudcover[index];
                row.insertCell(7).innerText = weatherData.hourly.precipitation[index];
                row.insertCell(8).innerText = weatherData.hourly.rain[index];
                row.insertCell(9).innerText = weatherData.hourly.snowfall[index];
            });
        } else {
            console.error('No location data found for the specified city.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function fetchFutureWeather_daily(city1) {
    const apiKey = '2b0d2611a41f0127715cfef77b8c353a';
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city1)}&limit=1&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.length > 0) {
            const latitude = data[0].lat;
            const longitude = data[0].lon;
            console.log(`Latitude: ${latitude} Longitude: ${longitude}`);
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant,cloudcover_mean,weathercode,sunrise,sunset,snowfall_sum,rain_sum&timezone=Asia/Kolkata&forecast_days=16`;

            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();

            const weatherTable = document.getElementById('weather-table').getElementsByTagName('tbody')[0];
            weatherTable.innerHTML = '';  // Clear any existing data

            weatherData.daily.time.forEach((time, index) => {
                const row = weatherTable.insertRow();
                const date = new Date(time);
                const formattedDate = date.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
                row.insertCell(0).innerText = formattedDate;
                row.insertCell(1).innerText = `${weatherData.daily.temperature_2m_max[index]} / ${weatherData.daily.temperature_2m_min[index]}`;
                row.insertCell(2).innerText = new Date(weatherData.daily.sunrise[index]).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                });
                row.insertCell(3).innerText = new Date(weatherData.daily.sunset[index]).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                });
                row.insertCell(4).innerText = `${weatherData.daily.wind_direction_10m_dominant[index]}°${getCardinalDirection(weatherData.daily.wind_direction_10m_dominant[index])}`;
                row.insertCell(5).innerText = weatherData.daily.wind_speed_10m_max[index];
                row.insertCell(6).innerText = weatherData.daily.cloudcover_mean[index];
                row.insertCell(7).innerText = weatherData.daily.precipitation_sum[index];
                row.insertCell(8).innerText = weatherData.daily.rain_sum[index];
                row.insertCell(9).innerText = weatherData.daily.snowfall_sum[index];
            });
        } else {
            console.error('No location data found for the specified city.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function fetchSeasonalWeather(city1) {
    const apiKey = '2b0d2611a41f0127715cfef77b8c353a';
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city1)}&limit=1&appid=${apiKey}`;

    try {
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (geoData.length > 0) {
            const latitude = geoData[0].lat;
            const longitude = geoData[0].lon;
            console.log(`Latitude: ${latitude} Longitude: ${longitude}`);

            const weatherUrl = `https://seasonal-api.open-meteo.com/v1/seasonal?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant&timezone=Asia/Kolkata&start_date=${getStartDate()}&end_date=${getEndDate()}&time_step=7`;

            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();



            const weatherTable = document.getElementById('weather-table').getElementsByTagName('tbody')[0];
            weatherTable.innerHTML = '';  // Clear any existing data

            // console.log(weatherData);
            let i = 0;
            let p_sum = 0;
            while (i < weatherData.daily.precipitation_sum_member01.length) {
                p_sum += weatherData.daily.precipitation_sum_member01[i];
                i += 1;
            }
            let ps = weatherTable.insertRow();
            ps.innerText = `Total rainfall in 6 month : ${parseFloat(p_sum).toFixed(2)}mm`;
            console.log(p_sum);


            if (weatherData.daily) {
                let time = new Date(getStartDate());
                let endDate = new Date(getEndDate());
                let index = 0;

                while (time <= endDate && index < weatherData.daily.temperature_2m_max_member01.length) {
                    let row = weatherTable.insertRow();
                    const formattedDate = time.toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    });
                    row.insertCell(0).innerText = formattedDate;

                    const maxTemp = weatherData.daily.temperature_2m_max_member01[index];
                    const minTemp = weatherData.daily.temperature_2m_min_member01[index];
                    row.insertCell(1).innerText = `${maxTemp}/${minTemp}`;
                    row.insertCell(2).innerText = "";
                    row.insertCell(3).innerText = "";
                    const wind_dir = weatherData.daily.wind_direction_10m_dominant_member01[index];
                    row.insertCell(4).innerText = `${wind_dir}°${getCardinalDirection(wind_dir)}`
                    const wind_speed = weatherData.daily.wind_speed_10m_max_member01[index];
                    row.insertCell(5).innerText = `${parseFloat(wind_speed * 0.27).toFixed(2)}`

                    row.insertCell(6).innerText = "";
                    row.insertCell(7).innerText = "";
                    const precipitation = weatherData.daily.precipitation_sum_member01[index];
                    row.insertCell(8).innerText = `${precipitation}`;
                    row.insertCell(9).innerText = "";
                    time.setDate(time.getDate() + 7); // Adding 7 days
                    index += 7;
                }




            } else {
                console.error('No seasonal weather data available.');
            }
        } else {
            console.error('No location data found for the specified city.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function getStartDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

function getEndDate() {
    const today = new Date();
    const sixMonthsLater = new Date(today);
    sixMonthsLater.setMonth(today.getMonth() + 6);
    return sixMonthsLater.toISOString().split('T')[0];
}

