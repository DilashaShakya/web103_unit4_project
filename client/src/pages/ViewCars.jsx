import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CarPreview from '../components/CarPreview'
import CarsAPI from '../services/CarsAPI'
import { FEATURES, getOption, formatPrice } from '../utilities/carOptions'
import '../App.css'

const ViewCars = ({ title }) => {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        document.title = title

        const fetchCars = async () => {
            try {
                const data = await CarsAPI.getAllCars()
                setCars(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchCars()
    }, [title])

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this car?')) return

        try {
            await CarsAPI.deleteCar(id)
            setCars(cars.filter((car) => car.id !== id))
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className='page container'>
            <h2 className='page-title'>Custom Cars</h2>

            {loading && <p aria-busy='true'>Loading cars...</p>}
            {error && <p className='error-message'>⚠️ {error}</p>}

            {!loading && !error && cars.length === 0 && (
                <article className='empty-state'>
                    <p>No cars yet. Time to build one!</p>
                    <Link to='/' role='button'>Customize</Link>
                </article>
            )}

            <div className='car-grid'>
                {cars.map((car) => (
                    <article key={car.id} className='car-card'>
                        <CarPreview car={car} />

                        <header>
                            <h3>{car.name}</h3>
                            <strong className='price'>{formatPrice(car.price)}</strong>
                        </header>

                        <ul className='specs'>
                            {FEATURES.map((feature) => (
                                <li key={feature.key}>
                                    <span>{feature.label}</span>
                                    {getOption(feature.key, car[feature.key]).label}
                                </li>
                            ))}
                        </ul>

                        <footer>
                            <Link to={`/customcars/${car.id}`} role='button' className='secondary outline'>Details</Link>
                            <Link to={`/edit/${car.id}`} role='button'>Edit</Link>
                            <button className='danger' onClick={() => handleDelete(car.id)}>Delete</button>
                        </footer>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default ViewCars
