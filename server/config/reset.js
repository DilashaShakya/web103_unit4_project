import { pool } from './database.js'

const createCarsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS custom_cars;

        CREATE TABLE IF NOT EXISTS custom_cars (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            exterior VARCHAR(50) NOT NULL,
            roof VARCHAR(50) NOT NULL,
            wheels VARCHAR(50) NOT NULL,
            interior VARCHAR(50) NOT NULL,
            price INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        )
    `

    try {
        await pool.query(createTableQuery)
        console.log('🎉 custom_cars table created successfully')
    } catch (err) {
        console.error('⚠️ error creating custom_cars table', err)
    }
}

const seedCarsTable = async () => {
    await createCarsTable()

    const sampleCars = [
        { name: 'Weekend Cruiser', exterior: 'blue', roof: 'convertible', wheels: 'sport', interior: 'leather', price: 32500 },
        { name: 'Trail Buddy', exterior: 'lime', roof: 'hardtop', wheels: 'offroad', interior: 'cloth', price: 27800 },
        { name: 'Track Day', exterior: 'red', roof: 'sunroof', wheels: 'sport', interior: 'racing', price: 31200 }
    ]

    for (const car of sampleCars) {
        const insertQuery = {
            text: 'INSERT INTO custom_cars (name, exterior, roof, wheels, interior, price) VALUES ($1, $2, $3, $4, $5, $6)',
            values: [car.name, car.exterior, car.roof, car.wheels, car.interior, car.price]
        }

        try {
            await pool.query(insertQuery)
            console.log(`✅ ${car.name} added successfully`)
        } catch (err) {
            console.error('⚠️ error inserting car', err)
        }
    }

    await pool.end()
}

seedCarsTable()
