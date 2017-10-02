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
const demoState = {
  posts: [
    {
      id: "8xf0y6ziyjabvozdd253nd",
      timestamp: 1467166872634,
      title: "Udacity is the best place to learn React",
      body: "Everyone says so after all.",
      author: "thingtwo",
      category: "react",
      voteScore: 6,
      deleted: false
    },
    {
      id: "6ni6ok3ym7mf1p33lnez",
      timestamp: 1468479767190,
      title: "Learn Redux in 10 minutes!",
      body: "Just kidding. It takes more than 10 minutes to learn technology.",
      author: "thingone",
      category: "redux",
      voteScore: -5,
      deleted: false
    }
  ],
  categories: [
    { name: "react", path: "react" },
    { name: "redux", path: "redux" },
    { name: "udacity", path: "udacity" }
  ]
};

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
