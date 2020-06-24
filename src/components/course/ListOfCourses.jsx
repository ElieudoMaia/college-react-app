import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom';
import { FiTrash2, FiPlus, FiEye, FiEdit } from 'react-icons/fi';
import axios from 'axios'

import './css/index.css'
import Pagination from '../template/Pagination'

export default () => {
    const [courses, setCourses] = useState([])
    const [totalPages, setTotalPages] = useState(0)

    const history = useHistory()

    const handleGetCourses =  useCallback((page) => {
        axios.get(`http://localhost:3333/courses?page=${page}`)
            .then( response  => {
                setCourses(response.data)
                setTotalPages(response.headers['x-total-pages'])
            })
            .catch(() => {
                console.log('Error requesting API data')
            })
    }, [])

    const deleteCourse = (id) => {
        if(window.confirm('Delete this course?')) {
            axios.delete(`http://localhost:3333/courses/${id}`)
                .then( () => {
                    handleGetCourses(1)
                })
                .catch(() => {
                    console.log('Error')
                })
        }
    }

    const navigateToRegister = () => {
        history.push('/courses/register')
    }

    const handleNavigateToDetail = (id) => {
        history.push(`/courses/detail/${id}`)
    }

    function handleNavigateToEdit(id) {
        history.push(`/courses/edit/${id}`)
    }

    if(!courses) {
        return null
    }

    return (
        <div className="row mt-4">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Course Name</th>
                        <th scope="col">Duration (Months)</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        courses.map((course, index) => (
                            <tr key={course.id}>
                                <td>{course.course_name}</td>
                                <td>{course.duration + ' months'}</td>
                                <td>
                                    <FiTrash2
                                        size="1.3rem"
                                        className="text-danger cursor-pointer"
                                        onClick={() => deleteCourse(course.id, index)}
                                    />
                                    <FiEdit
                                        size="1.3rem"
                                        className="text-primary ml-1 cursor-pointer" 
                                        onClick={() => handleNavigateToEdit(course.id)}
                                    />
                                    <FiEye
                                        size="1.3rem"
                                        className="ml-1 cursor-pointer"
                                        onClick={() => handleNavigateToDetail(course.id) }
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
                    callback={handleGetCourses}
                />
            </div>

            <div className="btnPlus" onClick={() => navigateToRegister()}>
                <FiPlus />
            </div>

        </div>
    )
}