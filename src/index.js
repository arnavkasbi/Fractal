import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from "react-redux";
import reducers from './Store/configureStore';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import Tasks from './Container/Tasks';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <div>
                    <Route exact path="/" component={App} />
                    <Route path="/Tasks/:bucket" component={Tasks} />
                </div>
            </Router>
        </Provider>,
        document.getElementById('root')
    );

    serviceWorker.unregister();
}

render();