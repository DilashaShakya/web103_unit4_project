import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CarPreview from '../components/CarPreview'
import CarsAPI from '../services/CarsAPI'
import { BASE_PRICE, FEATURES, getOption, formatPrice } from '../utilities/carOptions'
import '../App.css'

const CarDetails = ({ title }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        document.title = title

        const fetchCar = async () => {
            try {
                const data = await CarsAPI.getCarById(id)
                setCar(data)
            } catch (err) {
                setError(err.message)
            }
        }

        fetchCar()
    }, [id, title])

    const handleDelete = async () => {
        if (!window.confirm('Delete this car?')) return

        try {
            await CarsAPI.deleteCar(id)
            navigate('/customcars')
        } catch (err) {
            setError(err.message)
        }
    }

    if (error) {
        return (
            <div className='page container'>
                <p className='error-message'>⚠️ {error}</p>
                <Link to='/customcars' role='button'>Back to cars</Link>
            </div>
        )
    }

    if (!car) {
        return <div className='page container'><p aria-busy='true'>Loading car...</p></div>
    }

    return (
        <div className='page container'>
            <article className='details-card'>
                <CarPreview car={car} />

                <header>
                    <h2>{car.name}</h2>
                    <strong className='price'>{formatPrice(car.price)}</strong>
                </header>

                {/* price breakdown */}
                <ul className='specs'>
                    <li>
                        <span>Base price</span>
                        {formatPrice(BASE_PRICE)}
                    </li>
                    {FEATURES.map((feature) => {
                        const option = getOption(feature.key, car[feature.key])
                        return (
                            <li key={feature.key}>
                                <span>{feature.label}: {option.label}</span>
                                {option.price ? `+${formatPrice(option.price)}` : 'Included'}
                            </li>
                        )
                    })}
                </ul>

                <footer>
                    <Link to='/customcars' role='button' className='secondary outline'>Back</Link>
                    <Link to={`/edit/${car.id}`} role='button'>Edit</Link>
                    <button className='danger' onClick={handleDelete}>Delete</button>
                </footer>
            </article>
        </div>
    )
}

export default CarDetails
