import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Data from '../Data'
import ItemMaterial from './ItemMaterial'
import ItemDescription from './ItemDescription'
import CoursesError from './CoursesError';

export default class CourseDetail extends Component {

  state = {
    course: {},
    materials: [],
    description: [],
    createdBy:{},
    message: null,
    error: null
  }

  constructor() {
    super();
    this.data = new Data();
  }

  componentDidMount() {
    let materials
    let itemsMaterial
    let description
    let itemsDescription
    this.getCourse(this.props.match.params.id)
        .then((course) => {
            if (course.materialsNeeded) {
                materials = course.materialsNeeded.split('* ').slice(1)
                itemsMaterial = materials.map((item,index) => <ItemMaterial material={item} key={index}/>)
            } else {
                itemsMaterial = ["No materials Needed"]
            }
            description = course.description.split("\n\n")
            itemsDescription = description.map((item, index) => <ItemDescription text={item} key={index} />)
    
            this.setState(() => {
                return {course, materials: itemsMaterial, description: itemsDescription, createdBy: course.createdBy}
              })
        })
  }

  async getCourse(id) {
    return await this.data.getCourse(id).then(course => course).catch(error=> console.log(error))
  }

   deleteCourse = async () => {
       if (this.props.context.authenticatedUser) {
            const {emailAddress, password} = this.props.context.authenticatedUser
            await this.data.deleteCourse(this.state.course.id, emailAddress, password)
            .then(message => {
                this.setState(() => {
                    return {message}
                })
                this.props.history.push("/")
            })
            .catch(error => {
                this.setState(() => {
                    return {error}
                })
            })
       } else {
           this.props.history.push('/signin')
       }
  }

  render() {
      const {error} = this.state
    return (
        <div>
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                        {
                            this.props.context.authenticatedUser
                            ? (                        
                            <span>
                                <Link className="button" to={"/courses/" + this.state.course.id + "/update"}>Update Course</Link>
                                <Link className="button" to="#" onClick={this.deleteCourse}>Delete Course</Link>
                            </span>
                            )
                            : null
                       }
                        <Link className="button button-secondary" to="/">Return to List</Link>
                    </div>
                </div>
                {
                    this.state.error
                    ? <CoursesError error={error} />
                    : null
                }
            </div>
            <div className="bounds course--detail">
                <div className="grid-66">
                    <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{this.state.course.title}</h3>
                    <p>By {this.state.createdBy.firstName} {this.state.createdBy.lastName}</p>
                </div>
                <div className="course--description">
                    {this.state.description}
                </div>
            </div>
            <div className="grid-25 grid-right">
                <div className="course--stats">
                    <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <h3>{this.state.course.estimatedTime}</h3>
                        </li>
                        <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <ul>
                            {this.state.materials}
                        </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </div>
    );
  }

}