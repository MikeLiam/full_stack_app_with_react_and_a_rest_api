import React from 'react';

const  CoursesError =  props => (
    <div className="grid-33">          
            <h4 >Error Code No: {props.error.statusCode}</h4>
            <h3 >{props.error.message}</h3>
    </div>
    )

export default CoursesError