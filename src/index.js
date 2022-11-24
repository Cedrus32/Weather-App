import './styles/reset.css';
import './styles/layout.css';
import './styles/typo.css';
import './styles/shaping.css';
import './styles/colors.css';

// import iconsArray from './scripts/icons.js';
import events from './scripts/events.js';
import form from './scripts/form.js';
import callHandler from './scripts/callHandler.js';
import display from './scripts/display.js';

events.publish('callAPI', 'Minneapolis')    // subscribed by callHandler.js
events.view();