import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

export default () => {
    const history = useHistory()
    const { id } = useParams()
    const [formData, setFormData] = useState({
        name: '',
        duration: 0
    })

    useEffect(() => {
        if(id) {
            axios.get(`http://localhost:3333/courses/${id}`)
            .then( response => {
                setFormData({
                    name: response.data.course_name,
                    duration: response.data.duration
                })
            })
            .catch( () => {
                console.error('Erro ao carregar curso a partir do parametro')
            })
        }
    }, [id])

    function handleFormChanges(event) {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    function handleFormSubmit(event) {
        event.preventDefault()

        const method = id ? 'put' : 'post'

        axios[method](`http://localhost:3333/courses${ id ? `/${id}` : '' }`, {
            course_name: formData.name,
            duration: formData.duration
        })
        .then( () => {
            history.push('/courses')
        })
    }

    return (
        <div className="row mt-5">
            <div className="form col col-12 col-sm-8 col-md-6">
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Course Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            aria-describedby="courseName"
                            value={formData.name}
                            onChange={handleFormChanges}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="duration">Course Duration (Months)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="duration"
                            name="duration"
                            aria-describedby="courseDuration"
                            min="1"
                            value={formData.duration}
                            onChange={handleFormChanges}
                        />
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