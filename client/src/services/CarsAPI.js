const API_URL = '/api/cars'

// throws the server's error message so pages can show it
const handleResponse = async (response) => {
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
    }
    return data
}

const getAllCars = async () => {
    const response = await fetch(API_URL)
    return handleResponse(response)
}

const getCarById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`)
    return handleResponse(response)
}

const createCar = async (car) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car)
    })
    return handleResponse(response)
}

const updateCar = async (id, car) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car)
    })
    return handleResponse(response)
}

const deleteCar = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    return handleResponse(response)
}

export default {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
}
