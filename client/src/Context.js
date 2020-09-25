import React, { Component } from 'react'
import Data from "./Data";
import Cookies from 'js-cookie'

const Context = React.createContext();

export class Provider extends Component {

    state= {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null // if there was authenticated user previous refresh etc
    }

    constructor() {
        super()
        this.data = new Data()
    }

    render() {
        const { authenticatedUser } = this.state
        const value = {
            authenticatedUser,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut
            }
        }
        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        )
    }

    /**
     * Check if user exist and are valid credentials
     * @param {String} emailAddress 
     * @param {String} password 
     */
    signIn = async (emailAddress, password) => {
        const user = await this.data.getUser(emailAddress, password)
        if (user !== null) {
            user.password = password // Only for develepment purpose to persist session
            Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 })
            // user.password = password // For production to not maintain password at cookies
            this.setState(() => {
                return { authenticatedUser: user}
            })
        }
        return user
    }
    
    /**
     * Delete all persisted credentials
     */
    signOut = () => {
        Cookies.remove('authenticatedUser')
        this.setState(() => {
            return {authenticatedUser: null}
        })

    }
}

export const Consumer = Context.Consumer

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

 export default function withContext(Component) {
     return function ContextComponent(props) {
         return (
             <Context.Consumer>
                 {context=> <Component {...props} context={context} />}
             </Context.Consumer>
         )
     }
 }