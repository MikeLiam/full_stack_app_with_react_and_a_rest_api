import React, { Component } from 'react';
import Course from './Course'
import NewCourse from './NewCourse'

export default class Courses extends Component {

  state = {
    courses: []
  }

  componentDidMount() {
    // Get courses from api
    this.getCourses()
  }

  render() {
    return (
      <div className="bounds">
        {this.state.courses}
      </div>
    );
  }

  /**
   * Async function call and manage response or error on fetching
   */
  getCourses = async () => {
    const { context } = this.props
    let components =[]

    await context.data.getCourses()
      .then(courses => {
        // Array with Course component of every course
        components = courses.map( course => <Course course={course} key={course.id}/>)
        // Last, push for create course, NewCourse component
        components.push(<NewCourse key="newcourse"/>)
        this.setState(() => {
          return {courses: components}
        })
      })
      .catch(error => {
        console.error(error.message)
        // Redirect to error page of convenience 
        this.props.history.push(error.message)
      })
  }
}
