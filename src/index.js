import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications-component/dist/theme.css'
import 'react-widgets/dist/css/react-widgets.css';

Moment.locale('mk');
momentLocalizer();

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
