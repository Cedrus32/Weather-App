import events from './events.js';

// & handles form functionality

const form = (() => {
    // data
    let unitsCF = '°F';
    let unitsTime = '12 hr';

    // cache DOM
    const searchBox = document.querySelector('input');
    const searchButton = document.getElementById('search');
    const switchCF = document.getElementById('cf-switch');
    // const switchTime = document.getElementById('time-switch');

    // bind eventListeners
    searchButton.addEventListener('click', getSearchValue);
    switchCF.addEventListener('click', toggleCF);
    

    // methods
    function getSearchValue() {
        // console.log('enter getSearchValue()...');
        const searchValue = searchBox.value;
        events.publish('callAPI', searchValue); // subscribed by callHandler.js
    }
    function toggleCF() {
        // console.log('enter toggleCF()...');
        events.publish('setTempUnits', ''); // subscribed by callHandler.js
        switch (unitsCF) {
            case '°F':
                unitsCF = '°C';
                break;
            case '°C':
                unitsCF = '°F';
        }
        switchCF.textContent = unitsCF;
    }
})();

export default form;
