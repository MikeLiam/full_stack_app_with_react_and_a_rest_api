import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: "",
    password: '',
    confirmPassword: "",
    errors: [],
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

  /**
   * On submit form to create and sign in user
   */
  submit = async () => {
    const { context } = this.props
    // Get user info
    const { firstName, lastName, emailAddress, password } = this.state;
    // if passwords match
    if (this.confirmedPassword()) {
      // Assign user object
      const user = { firstName, lastName, emailAddress, password }
      // request to create new user to api
      await context.data.createUser(user)
        .then( () => {
            // sign in user and redirect to homepage
            console.log(`${user.firstName} ${user.lastName} is successfully signed up and authenticated`)
            context.actions.signIn(emailAddress, password)
              .then(() => {
                this.props.history.push('/')
              })
          }
        )
        .catch( error => {
          // Show validation errors if there are
          if (error.statusCode) {
            this.setState({errors: error.errors})
          } else {
          // Redirect to error page of convenience 
          this.props.history.push(error.message)
          }
        })
      }
  }

  /**
   * If user cancel redirect to homepage
   */
  cancel = () => {
    this.props.history.push('/')
  }

  /**
   * Passwords match or show validation error
   */
  confirmedPassword() {
    const { password, confirmPassword } = this.state;
    let message = ""
    // if not empty
    if (password !== '' && confirmPassword !== '') {
      // if match
      if (password === confirmPassword){
        return true
      } else {
        message = "Passwords don't match"
      }
    } else {
      message = "Passwords can't be empty"
    }
    this.setState({errors: [message]})
    return false
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  value={firstName} 
                  onChange={this.change} 
                  placeholder="First Name" />
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text"
                  value={lastName} 
                  onChange={this.change} 
                  placeholder="Last Name" />
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="Email Address" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />  
                <input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword} 
                  onChange={this.change} 
                  placeholder="Confirm Password" />  
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }
}