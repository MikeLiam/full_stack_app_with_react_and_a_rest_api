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

import withContext from './Context';
import PrivateRoute from './PrivateRoute'

const HeaderWithContext = withContext(Header)
const UserSignInWithContext = withContext(UserSignIn)
const UserSignUpWithContext = withContext(UserSignUp)
const UserSignOutWithContext = withContext(UserSignOut)
const CoursesWithContext = withContext(Courses)
const CoursesDetailWithContext = withContext(CourseDetail)
const UpdateCourseWithContext = withContext(UpdateCourse)


function App() {
  return (
    <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route exact path="/courses/:id" component={CoursesDetailWithContext} />
        <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </div>
  </Router>
  );
}

export default App;
