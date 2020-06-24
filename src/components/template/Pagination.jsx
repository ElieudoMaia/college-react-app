import React, { useState, useEffect } from 'react'

export default ({ totalPages, callback }) => {
    const [activeIndex, setActiveIndex] = useState(1)
    const [indexes, setIndexes] = useState([])

    useEffect(() => {
        const newIndexes = []

        for (let i = 1; i <= totalPages; i++) {
            newIndexes.push(i)
        }
        setIndexes([...newIndexes])

    }, [totalPages])

    useEffect(() => {
        callback(activeIndex)
    }, [activeIndex, callback])

    function handleIndexChange(index, event) {
        event.preventDefault()
        setActiveIndex(index)
    }

    if(indexes.length <= 1) {
        return null
    }

    return (
        <nav aria-label="Backend data pagination">
            <ul className="pagination d-flex justify-content-center">

                {indexes.map(index => (
                    <li
                        key={index}
                        className={`page-item ${index === activeIndex ? 'active' : ''}`}
                        onClick={(e) => handleIndexChange(index, e)}
                    >
                        <span style={{ cursor: 'pointer' }} className="page-link">{ index }</span>
                    </li>
                ))}

            </ul>
        </nav>
    )
}