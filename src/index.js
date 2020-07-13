import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import './tailwind.global.css';


const rootElement = document.getElementById('gate');

console.log(`【 made with ❤ by jmhungdev 2020 】`);
render(<App/>, rootElement);