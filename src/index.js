import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Импортируем BrowserRouter из react-router-dom
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./store/index";
import { Provider } from 'react-redux';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <App />
            </Provider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
