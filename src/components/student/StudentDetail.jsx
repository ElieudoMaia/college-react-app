import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

export default () => {
    const history = useHistory()
    const { id } = useParams()
    const [student, setStudent] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:3333/students/${id}`)
        .then(response => {
            setStudent(response.data)
        })
        .catch( () => {
            history.push('/students')
        })
    }, [id, history])

    function handleDeleteStudent(id) {
        if(window.confirm('Delete this student?')) {
            axios.delete(`http://localhost:3333/students/${id}`)
                .then( () => {
                    history.push('/students')
                })
                .catch(() => {
                    console.log('Error')
                })
        }
    }

    function handleNavigateToEdit(id) {
        history.push(`/students/edit/${id}`)
    }

    if(!student) {
        return null
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="card mt-4" style={{ width: "40rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{ student.name }</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Registration: { student.registration }</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Course: { student.course_name }</h6>
                    <span
                        className="card-link text-primary cursor-pointer"
                        onClick={() => handleNavigateToEdit(student.id)}
                    >Edit</span>
                    <span
                        className="card-link text-danger cursor-pointer"
                        onClick={() => handleDeleteStudent(student.id)}
                    >Delete</span>
                </div>
            </div>
        </div>
    )
}