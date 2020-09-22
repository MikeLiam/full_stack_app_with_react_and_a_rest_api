import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Courses from './Courses';


export default class Home extends Component {

  render() {
    return (
      <div className="bounds">
        <Courses />
      </div>
    );
  }
}

