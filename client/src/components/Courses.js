import React, { Component } from 'react';
import Data from '../Data'
import Course from './Course'
import NewCourse from './NewCourse'

export default class Courses extends Component {

  state = {
    courses: []
  }

  constructor() {
    super();
    this.data = new Data();
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
  async getCourses() {
    let components
    await this.data.getCourses().then(courses => {
      components = courses.map( course => <Course course={course} key={course.id}/>)
      components.push(<NewCourse key="newcourse"/>)
      this.setState(() => {
        return {courses: components}
      })
    })
  }
}
