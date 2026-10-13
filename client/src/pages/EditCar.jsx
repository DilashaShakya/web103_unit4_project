import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CarForm from '../components/CarForm'
import CarsAPI from '../services/CarsAPI'
import '../App.css'

const EditCar = ({ title }) => {
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

    const handleUpdate = async (updatedCar) => {
        await CarsAPI.updateCar(id, updatedCar)
        navigate(`/customcars/${id}`)
    }

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
        return <div className='page container'><p className='error-message'>⚠️ {error}</p></div>
    }

    if (!car) {
        return <div className='page container'><p aria-busy='true'>Loading car...</p></div>
    }

    return (
        <div className='page container'>
            <h2 className='page-title'>Edit {car.name}</h2>
            <CarForm initialCar={car} submitLabel='Save Changes' onSubmit={handleUpdate}>
                <button type='button' className='danger' onClick={handleDelete}>Delete</button>
            </CarForm>
        </div>
    )
}

export default EditCar
