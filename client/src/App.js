import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse'

function App() {
  return (
    <Router>
    <div>
      <Header />

      <Switch>
        <Route exact path="/" component={Courses} />
        <Route path="/signin" component={UserSignIn} />
        <Route path="/signup" component={UserSignUp} />
        <Route path="/signout" component={UserSignOut} />
        <Route path="/courses/:id" component={CourseDetail} />
        {/* <Route path="/courses/:id/update" component={UpdateCourse} /> */}
        {/* <Route component={NotFound} /> */}
      </Switch>
    </div>
  </Router>
  );
}

export default App;
