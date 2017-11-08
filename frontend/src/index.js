import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import reducer from "./reducers";

import PostsList from "./components/PostsList";
import PostDetails from "./components/PostDetails";
import EditPostPage from "./components/EditPostPage";
import AddPostPage from "./components/AddPostPage";
import AppHeader from "./components/AppHeader";
import NotFound from "./components/NotFound";

import thunk from "redux-thunk";
const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AppHeader />
        <Switch>
          <Route exact path="/" component={PostsList} />
          <Route exact path="/posts/new" component={AddPostPage} />
          <Route exact path="/posts/edit/:id" component={EditPostPage} />
          <Route exact path="/:category" component={PostsList} />
          <Route exact path="/:category/:id" component={PostDetails} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
registerServiceWorker();
