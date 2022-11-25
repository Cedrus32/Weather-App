import events from './events.js';

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
                               `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=${units}`,
                              ];
            const promises = fetchURLs.map(url => fetch(url));
            const responses = await Promise.all(promises);
            const responseObjects = [];
            for (let i = 0; i < (responses.length); i++) {
                responseObjects.push(await responses[i].json());
            }
            scrubData(responseObjects);
        } catch(error) {
            console.log(error);
        }
    }
    function scrubData(objectArray) {
        // console.log(objectArray);
        let currentWeather = objectArray[0];
        let forecastWeather = objectArray[1];
        timezoneOffset = (currentWeather.timezone / 3600);
        let currentData = {primaryData: {tempCurrent: `${Math.round(currentWeather.main.temp)}°F`,
                                         tempFeelsLike: `feels like ${Math.round(currentWeather.main.feels_like)}°F`,
                                         tempMin: `lo: ${Math.round(currentWeather.main.temp_min)}°F`,
                                         tempMax: `hi: ${Math.round(currentWeather.main.temp_max)}°F`,
                                         location: currentWeather.name,
                                         weatherType: currentWeather.weather[0].main,
                                        },
                           additionalData: {precip: `${Math.round(forecastWeather.list[0].pop * 100)}% chance of precipitation`,
                                            humidity: `${Math.round(currentWeather.main.humidity)}% humidity`,
                                            wind: `wind from ${convertToCompassDirection(currentWeather.wind.deg)} at ${Math.round(currentWeather.wind.speed)} mph`
                                           }
                          };
        let forecastData = {};
        for (let i = 0; i <= 8; i++) {
            let hourlyData = {dateTime: convertToLocalTime(forecastWeather.list[i].dt),
                              weatherType: forecastWeather.list[i].weather[0].main,
                              precip: `${Math.round(forecastWeather.list[i].pop * 100)} chance of precipitation`,
                              temp: `${Math.round(forecastWeather.list[i].main.temp)}°F`,
                             }
            forecastData[i] = hourlyData;
        }
        let allData = {currentData, forecastData};
        // console.log(allData);
        events.publish('renderData', allData);  // subscribed by display.js
    }

    // helper methods
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
    function convertToCompassDirection(deg) {
        let dir;
        switch (true) {
            case (0 <= deg < 11):
                dir = 'N';
                break;
            case (11 <= deg < 34):
                dir = 'NNE';
                break;
            case (34 <= deg < 56):
                dir = 'NE';
                break;
            case (56 <= deg < 79):
                dir = 'ENE';
                break;
            case (79 <= deg < 101):
                dir = 'E';
                break;
            case (101 <= deg < 124):
                dir = 'ESE';
                break;
            case (124 <= deg < 146):
                dir = 'SE';
                break;
            case (146 <= deg < 169):
                dir = 'SSE';
                break;
            case (169 <= deg < 191):
                dir = 'S';
                break;
            case (191 <= deg < 214):
                dir = 'SSW';
                break;
            case (214 <= deg < 236):
                dir = 'SW';
                break;
            case (236 <= deg < 259):
                dir = 'WSW';
                break;
            case (259 <= deg < 281):
                dir = 'W';
                break;
            case (281 <= deg < 304):
                dir = 'WNW';
                break;
            case (304 <= deg < 326):
                dir = 'NW';
                break;
            case (326 <= deg < 349):
                dir = 'NNW';
                break;
            case (349 <= deg <= 360):
                dir = 'N';
        }
        return dir;
    }

    // event subscriptions
    events.subscribe('callAPI', callAPI);   // published by index.js, forms.js (getSearchValue)

    // make public
    return {
        callAPI,    // used by index.js, forms.js
    }
})();

export default callHandler;
