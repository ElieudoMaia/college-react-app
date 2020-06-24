import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { FiTrash2, FiPlus, FiEdit, FiEye } from 'react-icons/fi'

import Pagination from '../template/Pagination'

import './css/index.css'

export default () => {
    const history = useHistory()
    const [students, setStudents] = useState([])
    const [totalPages, setTotalPages] = useState(0)
 
    const handleGetStudents =  useCallback((page) => {
        axios.get(`http://localhost:3333/students?page=${page}`)
            .then((response) => {
                setStudents(response.data)
                setTotalPages(response.headers['x-total-pages'])
            })
            .catch(() => {
                console.log('Error requesting API data')
            })
    }, [])

    function deleteStudent(id) {

        if(window.confirm('Do you really want delete all data of this student?')) {
            axios.delete(`http://localhost:3333/students/${id}`)
                .then( () => {
                    handleGetStudents(1)
                })
        }

    }

    function navigateToRegister() {
        history.push('/students/register')
    }

    function handleNavigateToDetail(id) {
        history.push(`/students/detail/${id}`)
    }

    function handleNavigateToEdit(id) {
        history.push(`/students/edit/${id}`)
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
                                    <FiEdit
                                        size="1.3rem"
                                        className="text-primary ml-1 cursor-pointer" 
                                        onClick={() => handleNavigateToEdit(student.id)}
                                    />
                                    <FiEye
                                        size="1.3rem"
                                        className="ml-1 cursor-pointer"
                                        onClick={() => handleNavigateToDetail(student.id) }
                                    />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className="col col-12">
                <Pagination
                    totalPages={totalPages}
                    callback={handleGetStudents}
                />
            </div>

            <div className="btnPlus" onClick={() => navigateToRegister()}>
                <FiPlus />
            </div>       

        </div>
    )
}