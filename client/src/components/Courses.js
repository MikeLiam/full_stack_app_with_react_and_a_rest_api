import React, { Component } from 'react';
import Course from './Course'
import NewCourse from './NewCourse'

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
        console.error(error.message)
        this.props.history.push('/error')
      })
  }
}
