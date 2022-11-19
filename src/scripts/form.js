import events from '../events.js';

// & handles form functionality

const form = (() => {
    // cache DOM
    const searchBox = document.querySelector('input');
    const searchButton = document.querySelector('button');

    // bind eventListeners
    searchButton.addEventListener('click', getSearchValue);
    // * 'callAPI' pub event in getSearchValue()

    // methods
    function getSearchValue() {
        const searchValue = searchBox.value;
        events.publish('callAPI', searchValue); // subscribed by callHandler.js
    }
})();

export default form;
