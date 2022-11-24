import events from './events.js';

// & handles dynamic display elements

const display = (() => {

    // cache DOM
    let main = document.querySelector('main');

    // methods
    function renderData(dataObject) {
        if (dataObject === '') {
            main.textContent = 'NO CITY QUERIED';  // ! display error message from call
        } else {
            for (let i = 0; i < (main.childElementCount); i++) {
                let child = main.children[i];
                let childItemprop = child.getAttribute('itemprop');
                switch (childItemprop) {
                    case 'currentData':
                        renderCurrentData(child, dataObject['currentData']);
                        break;
                    case 'forecastData':
                        renderForecastData(child, dataObject['forecastData']);
                }
            }
        }
    }
    function renderCurrentData(section, dataObject) {
        console.log('enter renderCurrentData()...');
        let sectionChild;
        for (let i = 0; i < 2; i++) {
            switch (i) {
                case 0:
                    sectionChild = generateTemplate('primary');
                    break;
                case 1:
                    sectionChild = generateTemplate('additional');
            }
            section.appendChild(sectionChild);
            sectionChild = section.children[i];
            for (let j = 0; j < (sectionChild.childElementCount); j++) {
                let div = sectionChild.children[j];
                let itemprop = div.getAttribute('itemprop');
                let datapoint = isolateData(dataObject, itemprop);
                div.textContent = datapoint;
            }
        }
    }
    function renderForecastData(section, dataObject) {
        console.log('enter renderForecastData()')
        console.log(section);
        console.log(dataObject);
        for (let i = 0; i < 9; i++) {
            let divGroup = generateTemplate('hourly');
            section.appendChild(divGroup);
            divGroup = section.children[i];
            for (let j = 0; j < (divGroup.childElementCount); j++) {
                let div = divGroup.children[j];
                let divItemprop = div.getAttribute('itemprop');
                let datapoint = isolateData(dataObject[`${i}`], divItemprop);
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
    function generateTemplate (type) {
        let nodeTree = document.getElementById(type).content.cloneNode(true);
        return nodeTree;
    }
    // function clearContent(element) {
    //     element.textContent = '';
    // }

    // event subscriptions
    events.subscribe('renderData', renderData)    // published by library.js (deleteCity), callHandler.js (scrubData)
})()

export default display;
