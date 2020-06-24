import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { FiTrash2, FiPlus } from 'react-icons/fi'

import './css/index.css'

export default () => {
    const history = useHistory()
    const [students, setStudents] = useState([])
 
    useEffect(() => {
        axios.get('http://localhost:3333/students')
        .then( response => {
            setStudents(response.data)
        })
    }, [])

    function deleteStudent(id) {

        if(window.confirm('Do you really want delete all data of this student?')) {
            axios.delete(`http://localhost:3333/students/${id}`)
                .then(response => {
                    const filteredStudents = students.filter(student => student.id !== id)
                    setStudents(filteredStudents)
                })
        }

    }

    function navigateToRegister() {
        history.push('/students/register')
    }

    if(!students) {
        return null
    }

    return (
        <div className="row">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Registration</th>
                        <th scope="col">Name</th>
                        <th scope="col">Course name</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.registration}</td>
                                <td>{student.name}</td>
                                <td>{student.course_name}</td>
                                <td>
                                    <FiTrash2
                                        size="1.3rem"
                                        className="trashIcon"
                                        onClick={() => deleteStudent(student.id)}
                                    />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className="btnPlus" onClick={() => navigateToRegister()}>
                <FiPlus />
            </div>       

        </div>
    )
}