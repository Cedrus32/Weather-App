import './styles/reset.css';
import './styles/layout.css';
import './styles/typo.css';
import './styles/shaping.css';
import './styles/colors.css';
// import iconsArray from './scripts/icons.js';
import callHandler from './scripts/callHandler.js';

// import Img from './img.png';
// import XmlData from './data.xml';
// import CsvData from './data.csv';

// manager function here

console.log('webpack is working!');
callHandler.callAPI('Chicago');
