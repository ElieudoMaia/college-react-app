import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default () => {
    const history = useHistory()
    const [formData, setFormData] = useState({
        name: '',
        registration: 0
    })
    const [courses, setCourses] = useState([])
    const [selectedCourse, setSelectedCourse] = useState(0)

    useEffect(() => {
        axios.get(`http://localhost:3333/courses`)
            .then((response) => {
                setCourses(response.data)
            })
            .catch(() => {
                console.log('Error requesting API data')
            })
    }, [])

    function handleFormChanges(event) {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    function handleFormSubmit(event) {
        event.preventDefault()

        if (selectedCourse === 0) return

        axios.post('http://localhost:3333/students', {
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
                        <label htmlFor="course_id">Example select</label>
                        <select
                            className="form-control"
                            id="course_id"
                            name="course_id"
                            onChange={handleSelectedCourse}
                        >
                            <option value="0">Selecione um curso</option>
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
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}