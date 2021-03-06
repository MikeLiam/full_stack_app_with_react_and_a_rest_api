import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
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
   * On submit form to sig in user with credentials and redirect to last private route or homepage
   */
  submit = () => {
    const { context } = this.props
    const { emailAddress, password } = this.state
    // if redirected from private route or not
    const { from } = this.props.location.state || { from: { pathname: '/'} }
    context.actions.signIn(emailAddress, password)
      .then( user => {
        console.log(`SUCCESS! ${user.firstName} ${user.lastName} is now signed in!`)
        // if correct sign in redirect to private route or homepage
        this.props.history.push(from)
      })
      .catch( error => {
        if (error.status) {
          // no user, show wvalidations errors
          this.setState(() => {
            return {errors: [error.message]}
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
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
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
              </React.Fragment>
            )} />
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p>
        </div>
      </div>
    );
  }
}