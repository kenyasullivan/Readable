import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route} from 'react-router-dom';
import './styles/bootstrap/dist/css/bootstrap.min.css';
import PostsList from './components/PostsList';
import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(<BrowserRouter>
<div>
    <Route path='/' component={PostsList} />
    </div>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
