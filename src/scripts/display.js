import events from './events.js';
import { default as div, span, p, h2, h4, ul, li, input, select, option, label, legend, img } from './elements.js';

// & handles dynamic display elements

const display = (() => {

    // cache DOM
    let currentCityContainer = document.getElementById('current-city');

    // methods
    function renderData(dataObject) {
        if (dataObject === '') {
            currentCityContainer.textContent = 'NO CITY QUERIED';  // ! display error message from call
        } else {
            for (let i = 0; i < (currentCityContainer.childElementCount); i++) {
                let sectionOuter = currentCityContainer.children[i];
                let itempropOuter = sectionOuter.getAttribute('itemprop');
                switch (itempropOuter) {
                    case 'currentData':
                        renderCurrentData(sectionOuter, dataObject['currentData']);
                        break;
                    case 'forecastData':
                        // renderForecastData(sectionOuter, dataObject['forecastData']);
                }
            }
        }
    }
    function renderCurrentData(section, dataObject) {
        for (let i = 0; i < (section.childElementCount); i++) {
            let sectionInner = section.children[i];
            for (let j = 0; j < (sectionInner.childElementCount); j++) {
                let div = sectionInner.children[j];
                let divItemprop = div.getAttribute('itemprop');
                let datapoint = isolateData(dataObject, divItemprop);
                div.textContent = datapoint;
            }
        }
    }
    function isolateData(dataObject, keyword) {
        let keys = Object.keys(dataObject);
        for (let i = 0; i < (keys.length); i++) {
            let dataKey = keys[i];
            if (dataKey === keyword) {
                return dataObject[dataKey];
            }
        }
    }
    // function clearContent(element) {
    //     element.textContent = '';
    // }

    // event subscriptions
    events.subscribe('renderData', renderData)    // published by library.js (deleteCity), callHandler.js (scrubData)
})()

export default display;
