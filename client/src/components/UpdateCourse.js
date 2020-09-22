import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Data from '../Data'
import Form from './Form'

export default class UpdateCourse extends Component {

  state = {
    course: {},
    materials: [],
    description: [],
    message: null,
    errors:[]
  }

  constructor() {
    super();
    this.data = new Data();
  }
  componentDidMount() {
    this.getCourse(this.props.match.params.id)
  }

  async getCourse(id) {
    await this.data.getCourse(id).then(course => {
        this.setState(() => {
            return {course, createdBy: course.createdBy}
          })
          console.log(this.state.createdBy.id)
    })
  }

  render() {
    const {
        errors,
      } = this.state;
    return (
    <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
        <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Update Course"
            elements={() => (
              <React.Fragment>
                <input 
                  id="title" 
                  name="title" 
                  type="text"
                  value={this.state.course.title} 
                  onChange={this.change} 
                  placeholder="Course title..." />
                  <p>{this.state.course.title}</p>
                <input 
                  id="description" 
                  name="description" 
                  type="text"
                  value={this.state.course.description} 
                  onChange={this.change} 
                  placeholder="Course description..." />
              </React.Fragment>
            )} />
        </div>
    </div>
    );
  }


}