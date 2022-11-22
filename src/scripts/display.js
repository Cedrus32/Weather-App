import events from './events.js';
import { default as div, span, p, h2, h4, ul, li, input, select, option, label, legend, img } from './elements.js';

// & handles dynamic display elements

const display = (() => {

    // cache DOM
    let mainCityContainer = document.getElementById('main-city');

    // methods
    function renderData(dataObject) {
        if (dataObject === '') {
            mainCityContainer.textContent = 'NO CITY QUERIED';  // ! display error message from call
        } else {
            renderCurrentData(dataObject['currentData']);
            // renderForecastData(dataObject['forecastData']);
        }
    }
    function renderCurrentData(dataObject) {
        console.log(mainCityContainer[0].childElementCount);
        for (let i = 0; i < mainCityContainer[0].childElementCount; i++) {
            clearContent(mainCityContainer[0][i]);
        }
        
    }
    function clearContent(element) {
        element.textContent = '';
    }

    // event subscriptions
    events.subscribe('renderData', renderData)    // published by library.js (deleteCity), callHandler.js (scrubData)
})()

export default display;
