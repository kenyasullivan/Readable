import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './styles/bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';

import promise from 'redux-promise';
import rootReducers from './reducers';
import PostsList from './components/PostsList';
import CreatePosts from './components/CreatePosts'

const store = applyMiddleware(promise)(createStore);

ReactDOM.render(
  
<Provider store={store(rootReducers)}>
  <BrowserRouter>
      <Switch>
      <Route exact path='/' component={PostsList} />
      <Route path='/posts/new' component={CreatePosts} />
      </Switch>
  </BrowserRouter>
</Provider>

, document.getElementById('root'));
registerServiceWorker();
