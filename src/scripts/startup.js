import events from '../events.js'

// & initiates startup state

const startup = (() => {
    // data
    let sampleData = ['Minneapolis', 'Duluth', 'Rochester']; // ! add state/zip support

    // methods
    function startup(loadLocalData, loadDefaultData) {
        events.publish('setCountersOnPageLoad', '');  // subscribed by library.js,
        if (loadLocalData === true) {   // ! IN PROGRESS
            console.log('loading localStorage ...');
            events.publish('loadSavedState', '');    // subscribed by library.js
        } else if (loadDefaultData === true) {
            console.log('loading default data ...');
            events.publish('createDefaultState', sampleData); // subscribed by library.js
        }
        // if localStorage NOT available, page loads blank
    }

    // event subscriptions
    events.subscribe('storageCheckComplete', startup); // published by storage.js (check)
    // events.subscribe('closeGetStartupDataQuery', loadLocalData); // published by library.js (...)

})();

export default startup;