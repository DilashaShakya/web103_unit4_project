import { pool } from '../config/database.js'

// returns an error message if the combo can't be built, otherwise null
const getComboError = ({ roof, wheels, interior }) => {
    if (roof === 'convertible' && wheels === 'offroad') {
        return 'Off-Road wheels are not available on a Convertible.'
    }
    if (interior === 'racing' && wheels !== 'sport') {
        return 'The Racing interior requires Sport wheels.'
    }
    return null
}

const getCars = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM custom_cars ORDER BY id DESC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getCarById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM custom_cars WHERE id = $1', [id])

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Car not found' })
        }

        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const createCar = async (req, res) => {
    try {
        const { name, exterior, roof, wheels, interior, price } = req.body

        const comboError = getComboError(req.body)
        if (comboError) {
            return res.status(400).json({ error: comboError })
        }

        const results = await pool.query(
            `INSERT INTO custom_cars (name, exterior, roof, wheels, interior, price)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [name, exterior, roof, wheels, interior, price]
        )

        res.status(201).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const updateCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, exterior, roof, wheels, interior, price } = req.body

        const comboError = getComboError(req.body)
        if (comboError) {
            return res.status(400).json({ error: comboError })
        }

        const results = await pool.query(
            `UPDATE custom_cars
             SET name = $1, exterior = $2, roof = $3, wheels = $4, interior = $5, price = $6
             WHERE id = $7
             RETURNING *`,
            [name, exterior, roof, wheels, interior, price, id]
        )

        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const deleteCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM custom_cars WHERE id = $1 RETURNING *', [id])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
}
