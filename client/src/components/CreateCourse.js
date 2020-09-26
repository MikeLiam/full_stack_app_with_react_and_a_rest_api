import React, { Component } from 'react';
import Data from '../Data'
import Form from './Form'

export default class CreateCourse extends Component {

  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    user: {},
    message: null,
    errors:[]
  }

  constructor() {
    super();
    this.data = new Data();
  }

  /**
   * Inputs on change handler to manage values
   * @param {Object} event 
   */
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  componentDidMount() {
      this.setState(() => {
          return {user: this.props.context.authenticatedUser}
      })
  }

  /**
   * On Submit form event to request to create new course with values
   */
  submit = () => {
    const {         
      title,
      description,
      estimatedTime,
      materialsNeeded,
      user
    } = this.state;
    // Setting course object with values from state after set from inputs adding user id
    const course = {title, description, estimatedTime, materialsNeeded, userId: user.id}
    // Get credentials to authentication request
    const {emailAddress, password} = user

    this.data.createCourse(course, emailAddress, password)
      .then( response => {
            console.log(response.message)
            // if OK redirect to course location on response header
            this.props.history.push(response.location)
      })
      .catch( error => {
        if (error.status) {
          // no OK validations errors
          this.setState(() => {
            return {errors: error.message}
          })
        } else {
          // no Ok redirect to error page of convenience
          this.props.history.push(error.message)
        }
      })
  }

  /**
   * If user cancel redirect to homepage
   */
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
        <h1>Create Course</h1>
        <div>
        <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
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
                    <p>By {this.state.user.firstName} {this.state.user.lastName}</p>
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