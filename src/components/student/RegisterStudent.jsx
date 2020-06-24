import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

export default () => {
    const history = useHistory()
    const { id } = useParams()
    const [formData, setFormData] = useState({
        name: '',
        registration: 0
    })
    const [courses, setCourses] = useState([])
    const [selectedCourse, setSelectedCourse] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:3333/coursesNoPagination`)
        .then((response) => {
            setCourses(response.data)
        })
        .catch(() => {
            console.log('Error requesting API data')
        })
    }, [])

    useEffect(() => {
        if(id) {
            axios.get(`http://localhost:3333/students/${id}`)
            .then((response) => {
                setFormData({
                    name: response.data.name,
                    registration: response.data.registration,
                })
                setSelectedCourse(response.data.course_id)
            })
            .catch(() => {
                console.log('Error requesting API data')
            })
        }
    }, [id])

    function handleFormChanges(event) {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    function handleFormSubmit(event) {
        event.preventDefault()
        
        if (!selectedCourse) {
            alert('Select a course')
            return
        }

        const method = id ? 'put' : 'post'

        axios[method](`http://localhost:3333/students${ id ? `/${id}` : '' }`, {
            name: formData.name,
            registration: formData.registration,
            course_id: selectedCourse
        })
        .then( () => {
            history.push('/students')
        })
    }

    function handleSelectedCourse(event) {
        const courseID = event.target.value
        setSelectedCourse(courseID)
    }

    return (
        <div className="row mt-5">
            <div className="form col col-12 col-sm-8 col-md-6">
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Student Name</label>
                        <input
                            value={formData.name}
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            aria-describedby="studentName"
                            onChange={handleFormChanges}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="duration">Registration number</label>
                        <input
                            value={formData.registration}
                            type="number"
                            className="form-control"
                            id="registration"
                            name="registration"
                            aria-describedby="studentRegistration"
                            min="1"
                            onChange={handleFormChanges}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="course_id">Course</label>
                        <select
                            value={selectedCourse}
                            className="form-control"
                            id="course_id"
                            name="course_id"
                            onChange={handleSelectedCourse}
                        >
                            <option value="">Select the course</option>
                            {courses.map(course => (
                                <option
                                    value={course.id}
                                    key={course.id}
                                >
                                    {course.course_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="text-right">
                        <button type="submit" className="btn btn-primary">
                            { id ? 'Update' : 'Register' }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}