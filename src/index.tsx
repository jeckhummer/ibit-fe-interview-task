import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { buildServices, ServiceProvider } from './services';

import './normalize.css';
import './index.css';

const services = buildServices();

ReactDOM.render(
    <ServiceProvider services={services}>
        <App />
    </ServiceProvider>,
    document.getElementById("app"),
);