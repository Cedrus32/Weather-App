import events from './events';

// & backend localStorage manager

const storage = (() => {
    function storageAvailable(type) {
        let storage;
        try {
            storage = window[type];
            const x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch (e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }
    function check() {
        let loadLocal;
        let loadDefault;
        // localStorage.clear();
        if (storageAvailable('localStorage')) {
            // console.log(`previousLoad: ${localStorage.getItem('previousLoad')}`);
            if (localStorage.getItem('previousLoad') === null) {
                localStorage.setItem('previousLoad', 'true'); // set 'previousLoad' === true for future loads
                loadLocal = false;
                loadDefault = true;
            } else {
                console.log(`localStorage.length: ${localStorage.length}`);
                loadLocal = true;
                loadDefault = false;
            }
        } else {
            // throws error per storageAvailable()
        }
        events.publish('storageCheckComplete', loadLocal, loadDefault);    // subscribed by startup.js
    }
    function view() {
        console.log('enter storage.view() ...');
        for (let i = 0; i < localStorage.length; i++) {
            let lsKey = localStorage.key(i);
            console.log(`- ${lsKey}: ${JSON.parse(localStorage.getItem(lsKey))}`);
        }
    }

    return {
        check,   // used by index.js
        view,   // used by library.js
    }

})();

export default storage;