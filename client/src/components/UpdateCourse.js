import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Data from '../Data'
import Form from './Form'

export default class UpdateCourse extends Component {

  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    userId: null,
    createdBy: {},
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
            return {
              title: course.title, 
              description: course.description, 
              estimatedTime: course.estimatedTime, 
              materialsNeeded: course.materialsNeeded, 
              userId: course.userId,
              createdBy: course.createdBy}
          })
          console.log(this.state.createdBy.id)
    })
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }


  submit = () => {
    const {         
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    } = this.state;
    const course = {title, description, estimatedTime, materialsNeeded, userId}
    this.data.updateCourse(this.props.match.params.id, course)
      .then( response => {
            console.log(response.message)
      })
  }

  cancel = () => {
    this.props.history.push('/')
  }

  render() {
    const {
        errors,
        title,
        description,
        estimatedTime,
        materialsNeeded,
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
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div>
                      <input 
                      id="title" 
                      name="title" 
                      type="text" 
                      className="input-title course--title--input" 
                      placeholder="Course title..."
                      value={title}
                      onChange={this.change}  />
                    </div>
                    <p>By {this.state.createdBy.firstName} {this.state.createdBy.lastName}</p>
                  </div>
                  <div className="course--description">
                    <div>
                      <textarea 
                        id="description" 
                        name="description" 
                        className="" 
                        placeholder="Course description..."
                        value={description}
                        onChange={this.change} >
                      </textarea>
                    </div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div>
                          <input 
                            id="estimatedTime" 
                            name="estimatedTime" 
                            type="text" 
                            className="course--time--input"
                            placeholder="Hours" 
                            value={estimatedTime} 
                            onChange={this.change} />
                          </div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div>
                          <textarea 
                            id="materialsNeeded" 
                            name="materialsNeeded" 
                            className="" 
                            placeholder="List materials..."
                            value={materialsNeeded}
                            onChange={this.change} >
                              
                          </textarea>
                          </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            )} />
        </div>
    </div>
    );
  }


}