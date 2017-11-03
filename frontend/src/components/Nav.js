import React from 'react';
import { Link } from 'react-router-dom'

const Nav = () => (
  <div className="jumbotron jumbotron-fluid bg-info text-white text-center">
    <div className="container">
      <header>
      <h1 className="display-3">Welcome to Readable</h1>
      <p className="lead">Your source for news.... </p>
      </header>
      <div>
   <Link className="btn btn-light btn-lg" to="/posts/new">Add A Post </Link>
   </div>
    </div>
  </div>
) ;

export default Nav;