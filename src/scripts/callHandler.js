// & makes API calls, scrubs resolution data for DOM

// ! add support for 12-hour times
// ! add support for celcius
// ! add support for daylight-savings (separate API)

const callHandler = (() => {
    // data
    const apiKey = '280aac734d9fdeeac311819cdc27c444';
    let units = 'imperial';
    let timezoneOffset;

    // methods
    async function callAPI(location) {
        try {
            const fetchURLs = [`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${units}`,
                               `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=${units}`
                              ];
            const promises = fetchURLs.map(url => fetch(url));
            const responses = await Promise.all(promises);
            const responseObjects = [];
            for (let i = 0; i < responses.length; i++) {
                responseObjects.push(await responses[i].json());
            }
            scrubData(responseObjects);
        } catch(error) {
            console.log(error);
        }
    }
    function scrubData(objectArray) {
        console.log(objectArray);
        let currentWeather = objectArray[0];
        let forecastWeather = objectArray[1];
        timezoneOffset = (currentWeather.timezone / 3600);
        let currentData = {location: currentWeather.name,
                           weatherType: currentWeather.weather[0].main,
                           weatherDescription: currentWeather.weather[0].description,
                           precip: Math.round(forecastWeather.list[0].pop * 100),
                           tempCurrent: Math.round(currentWeather.main.temp),
                           tempMin: Math.round(currentWeather.main.temp_min),
                           tempMax: Math.round(currentWeather.main.temp_max),
                           tempFeelsLike: Math.round(currentWeather.main.feels_like),
                           humidity: Math.round(currentWeather.main.humidity),
                           windDirection: currentWeather.wind.deg,
                           windspeed: Math.round(currentWeather.wind.speed),
                           sunrise: convertToLocalTime(currentWeather.sys.sunrise),
                           sunset: convertToLocalTime(currentWeather.sys.sunset)
                          };
        let forecastData = {};
        for (let i = 0; i <= 8; i++) {
            let hourlyData = {weatherType: forecastWeather.list[i].weather[0].main,
                              temp: Math.round(forecastWeather.list[i].main.temp),
                              precip: Math.round(forecastWeather.list[i].pop * 100),
                              dateTime: convertToLocalTime(forecastWeather.list[i].dt),
                             }
            forecastData[i] = hourlyData;
        }
        let allData = {currentData, forecastData};
        console.log(allData);
    }
    function convertToLocalTime(timeValue) {
        let utcString = getUTCTimestamp(timeValue);
        let utcSplit = utcString.split(':');
        let localString = '';
        let utcHours = Number(utcSplit[0]) + timezoneOffset;
        if (utcHours < 0) {
            utcHours += 24;
        }
        localString = `${utcHours}:${utcSplit[1]}`;

        return localString;
    }
    function getUTCTimestamp(timeValue) {
        let unixTimestamp = new Date(timeValue * 1000);
        let utcString = unixTimestamp.toUTCString();
        let utcSplit = utcString.split(' ');
        utcString = utcSplit[4].slice(0, -3);
        return utcString;
    }

    // make public
    return {
        callAPI,    // used by index.js
    }

})();

export default callHandler;
