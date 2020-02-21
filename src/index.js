import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx'

const rootElement = document.getElementById('entry');
var scroll = new SmoothScroll('a[href*="#"]');
console.log(`【 made with ❤ and ☕ by h3x4g0n - 2020 】`);
render(<App/>, rootElement);