import React, { Component } from 'react';
import { NavLink, Route, Link, Switch } from 'react-router-dom';
import '../styles/App.css';
import Categories from './Categories';
import PostList from './PostList';
import Post from './Post';
import CreatePost from './CreatePost';


const Header = ()=> (
  <header>
    <h1>Readable</h1>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/categories">Categories</NavLink>
    <NavLink to="/createpost">Create Post</NavLink>
  </header>
)
const NotFoundPage = () => (
  <div>404!-Page Not Found - <Link to="/">Go Home</Link></div>
)


class App extends Component {


  render() {
    return (
      <div>
        <Header />
        This is my main app wrapper
        <Switch>
        <Route exact path="/" component={PostList} />
        <Route exact path="/post/:id" component={Post} />
        <Route exact path="/categories:id" component={Categories} />
        <Route exact path="/createpost" component={CreatePost} />
        <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
