import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
// Stateless components
import Header from './components/Header';
import NotFound from './components/NotFound'
import Forbidden from './components/Forbidden'
import UnhandledError from './components/UnhandleError'
import UserSignOut from './components/UserSignOut';
// Statefull components
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse'
import CreateCourse from './components/CreateCourse'
// HO Components for context and authenticated routes
import withContext from './Context';
import PrivateRoute from './PrivateRoute'
// Components consuming context
const HeaderWithContext = withContext(Header)
const UserSignInWithContext = withContext(UserSignIn)
const UserSignUpWithContext = withContext(UserSignUp)
const UserSignOutWithContext = withContext(UserSignOut)
const CoursesWithContext = withContext(Courses)
const CoursesDetailWithContext = withContext(CourseDetail)
const UpdateCourseWithContext = withContext(UpdateCourse)
const CreateCourseWithContext = withContext(CreateCourse)


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
        <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
        <Route exact path="/courses/:id" component={CoursesDetailWithContext} />
        <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
        <Route path="/forbidden" component={Forbidden} />
        <Route path="/error" component={UnhandledError} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
