import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route} from 'react-router-dom';
import './styles/bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';

import promise from 'redux-promise';
import reducers from './reducers';
import PostsList from './components/PostsList';

const store = applyMiddleware(promise)(createStore);

ReactDOM.render(
  
<Provider store={store(reducers)}>
  <BrowserRouter>
      <Route path='/' component={PostsList} />
  </BrowserRouter>
</Provider>

, document.getElementById('root'));
registerServiceWorker();
