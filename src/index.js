import './styles/reset.css';
import './styles/layout.css';
import './styles/typo.css';
import './styles/shaping.css';
import './styles/colors.css';

// import iconsArray from './scripts/icons.js';
import events from './scripts/events.js';
import storage from './scripts/storage.js';
import startup from './scripts/startup.js';
import library from './scripts/library.js';
import form from './scripts/form.js';
import callHandler from './scripts/callHandler.js';

storage.check();
events.view();