import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './styles/bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import registerServiceWorker from './registerServiceWorker';

import reducer from './reducers';
import PostsList from './components/PostsList';
import CreatePosts from './components/CreatePosts';
import PostDetails from './components/PostDetails';

//Middleware
import thunk from 'redux-thunk';
const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  
<Provider store={store}>
  <BrowserRouter>
      <Switch>
      <Route exact path='/' component={PostsList} />
      <Route path='/posts/new' component={CreatePosts} />
      <Route path='/posts/:id' component={PostDetails} />
      </Switch>
  </BrowserRouter>
</Provider>

, document.getElementById('root'));
registerServiceWorker();
