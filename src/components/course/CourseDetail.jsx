import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

import './css/index.css'

export default () => {
    const history = useHistory()
    const { id } = useParams()
    const [course, setCourse] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:3333/courses/${id}`)
        .then(response => {
            setCourse(response.data)
        })
        .catch( () => {
            history.push('/courses')
        })
    }, [id, history])

    function handleDeleteCourse(id) {
        if(window.confirm('Delete this course?')) {
            axios.delete(`http://localhost:3333/courses/${id}`)
                .then( () => {
                    history.push('/courses')
                })
                .catch(() => {
                    console.log('Error')
                })
        }
    }

    function handleNavigateToEdit(id) {
        history.push(`/courses/edit/${id}`)
    }

    if(!course) {
        return null
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="card mt-4" style={{ width: "40rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{ course.course_name }</h5>
                    <h6 className="card-subtitle mb-2 text-muted">duration of {course.duration} months</h6>
                    <span
                        className="card-link text-primary cursor-pointer"
                        onClick={() => handleNavigateToEdit(course.id)}
                    >Edit</span>
                    <span
                        className="card-link text-danger cursor-pointer"
                        onClick={() => handleDeleteCourse(course.id)}
                    >Delete</span>
                </div>
            </div>
        </div>
    )
}