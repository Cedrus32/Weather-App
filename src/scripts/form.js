import events from './events.js';

// & handles form functionality

const form = (() => {
    // data
    let unitsCF = 'F';
    let unitsTime = 12;

    // cache DOM
    const searchBox = document.querySelector('input');
    const searchButton = document.getElementById('search');
    const switchCF = document.getElementById('cf-switch');
    const switchTime = document.getElementById('time-switch');

    // bind eventListeners
    searchButton.addEventListener('click', getSearchValue);
    switchCF.addEventListener('click', toggleCF);
    switchTime.addEventListener('click', toggleTime);
    

    // methods
    function getSearchValue() {
        // console.log('enter getSearchValue()...');
        const searchValue = searchBox.value;
        events.publish('callAPI', searchValue); // subscribed by callHandler.js
    }
    function toggleCF() {
        // console.log('enter toggleCF()...');
        switch (unitsCF) {
            case '°F':
                unitsCF = 'C';
                break;
            case '°C':
                unitsCF = 'F';
        }
        switchCF.textContent = `°${unitsCF}`;
        events.publish('setTempUnits', ''); // subscribed by callHandler.js
    }
    function toggleTime() {
        // coonsole.log('enter toggleTime()...');
        switch (unitsTime) {
            case 24:
                unitsTime = 12;
                break;
            case 12:
                unitsTime = 24;
        }
        switchTime.textContent = `${unitsTime} hour`;
        events.publish('setTimeUnits', ''); // subscribed by callHandler.js
    }
})();

export default form;
