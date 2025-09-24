// the file is index.js

import { render, createElement } from './React.js';
import App from './App.js';

const root = document.getElementById('root');
render(createElement(App), root);
