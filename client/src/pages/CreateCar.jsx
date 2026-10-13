import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CarForm from '../components/CarForm'
import CarsAPI from '../services/CarsAPI'
import '../App.css'

const CreateCar = ({ title }) => {
    const navigate = useNavigate()

    useEffect(() => {
        document.title = title
    }, [title])

    const handleCreate = async (car) => {
        await CarsAPI.createCar(car)
        navigate('/customcars')
    }

    return (
        <div className='page container'>
            <h2 className='page-title'>Build your ride</h2>
            <CarForm submitLabel='Create Car' onSubmit={handleCreate} />
        </div>
    )
}

export default CreateCar
