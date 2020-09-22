import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Data from '../Data'
import ItemMaterial from './ItemMaterial'
import ItemDescription from './ItemDescription'

export default class CourseDetail extends Component {

  state = {
    course: {},
    materials: [],
    description: [],
    createdBy:{},
    message: null
  }

  constructor() {
    super();
    this.data = new Data();
  }

  componentDidMount() {
    this.getCourse(this.props.match.params.id)
  }

  async getCourse(id) {
    let materials
    let itemsMaterial
    let description
    let itemsDescription
    await this.data.getCourse(id).then(course => {
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
          console.log(this.state.createdBy.id)
    })
  }

  async deleteCourse() {
    // await this.data.deleteCourse(this.state.course.id).then(message => {
    //     this.setState(() => {
    //         return {message}
    //     })
    // })
  }

  render() {
    return (
        <div>
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                        <span>
                            <Link className="button" to={"/courses/" + this.state.course.id + "/update"}>Update Course</Link>
                            <Link className="button" to="#" >Delete Course</Link>
                        </span>
                        <Link className="button button-secondary" to="/">Return to List</Link>
                    </div>
                    {
                        this.state.message
                        ? <p>{this.state.message}</p>
                        : null
                    }
                </div>
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