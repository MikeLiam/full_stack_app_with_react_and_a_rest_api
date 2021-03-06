import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({context}) {
  // Variable to control if there is an user authenticated to show differents options of links
    const authUser = context.authenticatedUser
  return (
    <div className="header">
      <div className="bounds">
        <Link className="header--logo" to="/">Courses</Link>
        <nav>
          {
            authUser ? 
            <React.Fragment>
              <span>Welcome, {authUser.firstName} {authUser.lastName}!</span>
              <Link className="signout" to="/signout">Sign Out</Link>
            </React.Fragment>
          :
            <React.Fragment>
              <Link className="signup" to="/signup">Sign Up</Link>
              <Link className="signin" to="/signin">Sign In</Link>
            </React.Fragment>
            }
        </nav>
      </div>
    </div>
  );
};