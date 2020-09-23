import React, { Component } from 'react';
import Course from './Course'
import NewCourse from './NewCourse'
import CoursesError from './CoursesError'

export default class Courses extends Component {

  state = {
    courses: []
  }

  componentDidMount() {
    this.getCourses()
  }

  render() {
    return (
      <div className="bounds">
        {this.state.courses}
      </div>
    );
  }
  getCourses = async () => {
    const { context } = this.props
    let components =[]
    await context.data.getCourses()
      .then(courses => {
        components = courses.map( course => <Course course={course} key={course.id}/>)
        components.push(<NewCourse key="newcourse"/>)
        this.setState(() => {
          return {courses: components}
        })
      })
      .catch(error => {
        if (error.statusCode !== 404) {
          error.statusCode = 500
          error.message = `Server error: ${error.message}`
        }
        components.push(<CoursesError error={error} key="error"/>)
        this.setState(() => {
          return {courses: components}
        })
      })
  }
}
