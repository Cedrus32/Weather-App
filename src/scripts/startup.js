import events from '../events.js'

// & initiates startup state

const startup = (() => {
    // data
    let _sampleProjectValues = [['project', '', 'Errands', '', '08'],
                               ];
    let _sampleTaskValues = [['task', '', 'singleton', 'return jeans', '!! remember receipt', '', 1, 0],
                             ['task', '', 'singleton', 'pick up package @ post office', '', '', 2, 0],
                             ['task', '', 'checklist', 'groceries', '', '', 0, 0, ['milk', 'coffee', 'pasta', 'spaghetti sauce', 'lettuce', 'salad dressing']],
                            ];

    // methods
    function startup(loadLocalData, loadDefaultData) {
        events.publish('setCountersOnPageLoad', '');  // subscribed by library.js, 
        
        if (loadLocalData === true) {
            console.log('loading localStorage ...')
            events.publish('openGetLocalDataQuery', '');
        } else if (loadDefaultData === true) {
            _createDefaultProject(_sampleProjectValues[0]);
            for (let t = 0; t < (_sampleTaskValues.length); t++) {
                _createDefaultTask(_sampleTaskValues[t]);
            };
        };

        // if localStorage NOT available, page loads blank

        events.publish('initializeDefaultLayout', window.innerWidth);   // subscribed by sidebar.js, display.js
    }
    function _loadLocalData(array) {
        for (let i = 0; i < (array.length); i++) {
            let item = array[i];
            console.log(item);
            events.publish('projectCreated', item); // subscribed by sidebar.js, display.js
            // * tasks rendered via 'setStartupView' event vvv
        };

        events.publish('setStartupView', '');  // subscribed by sidebar.js
    }
    function _createDefaultProject(projectValues) {
        events.publish('confirmInput', projectValues); // subscribed by library.js
    }
    function _createDefaultTask(taskValues) {
        events.publish('confirmInput', taskValues); // subscribed by library.js
    }


    // event subscriptions

    events.subscribe('storageCheckComplete', startup); // published by local.js (check())
    events.subscribe('closeGetStartupDataQuery', _loadLocalData); // published by library.js (...)

})();

export default startup;