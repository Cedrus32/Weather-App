import events from './events';
import storage from './storage';

// & backend manager module containing library/item classes & methods

const library = (() => {
    // dynamic data
    let itemCount;
    let cityArray;
    let mainCityIndex = 0;

    // state methods
    function setCounters() {
        storage.view();
        // console.log(`itemCount (for state check): ${localStorage.getItem('itemCount')}`)
        if ((localStorage.getItem('itemCount') === null)) {
            itemCount = 0;
            cityArray = [];
            localStorage.setItem('itemCount', itemCount);
            localStorage.setItem('cityArray', cityArray);
        } else {
            itemCount = JSON.parse(localStorage.getItem('itemCount'));
            cityArray = JSON.parse(localStorage.getItem('cityArray'));
        }
        // console.log(`cityArray: ${itemCount}`);
        // console.log(`cityArray: ${cityArray}`);
    }
    function upItemCount() {
        itemCount++;
        localStorage.setItem('itemCount', itemCount);
    }
    function downItemCount() {
        itemCount--;
        localStorage.setItem('itemCount', itemCount);
    }
    function createDefaultState(array) {
        for (let i = 0; i < (array.length); i++) {
            saveCity(array[i]);
        }
        loadSavedState();
    }
    function loadSavedState() {
        let mainCity = getMainCity();
        callAPI(mainCity);  // subscribed by callHandler.js
    }
    function callAPI(city) {
        events.publish('callAPI', city)  // subscribed by callHandler.js
    }

    // library methods
    function saveCity(location) {
        console.log('enter saveCity()');
        cityArray.push(location);
        upItemCount();
        localStorage.setItem('cityArray', JSON.stringify(cityArray));
        localStorage.setItem('itemCount', JSON.stringify(itemCount));
        // console.log(cityArray);
        // console.log(JSON.parse(localStorage.getItem('cityArray')));
        // console.log(itemCount);
        // console.log(JSON.parse(localStorage.getItem('itemCount')));
        storage.view();
    }
    function saveCityAsMain(location) { // ! adust direction locations are saved and loaded -- front-loaded or back-loaded?
        saveCity(location);
        changeMainCityIndex();
        loadSavedState();
    }
    function deleteCity(location) {
        console.log('enter deleteCity()');
        let i;
        for (i = 0; i < (cityArray.length); i++) {
            if (cityArray[i] === location) {
                cityArray.splice(i, 1);
                downItemCount();

                localStorage.setItem('cityArray', JSON.stringify(cityArray));
                localStorage.setItem('itemCount', JSON.stringify(itemCount));
            }
        }
        console.log(cityArray);
        downMainCityIndex();
        if (mainCityIndex < 0) {
            events.publish('renderData', '');   // subscribed by display.js
        } else {
            callAPI(cityArray[mainCityIndex]);  // subscribed by callHandler.js
        }
    }

    // indexing methods
    function getMainCity() {
        // console.log(cityArray[mainCityIndex]);
        return cityArray[mainCityIndex];
    }
    function upMainCityIndex() {
        mainCityIndex++;
    }
    function downMainCityIndex() {
        mainCityIndex--;
    }
    function changeMainCityIndex() {
        if (mainCityIndex === (cityArray.length - 1)) {
            mainCityIndex = 0;
        } else {
            mainCityIndex++;
        }
    }

    // event subscriptions
    events.subscribe('setCountersOnPageLoad', setCounters); // published from startup.js (startup)
    events.subscribe('createDefaultState', createDefaultState);   // published by startup.js (startup - 2nd conditional)
    events.subscribe('loadSavedState', loadSavedState);    // published by startup.js (startup - 1st conditional)
})();

export default library;
