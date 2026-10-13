import React, { useState } from 'react'
import CarPreview from './CarPreview'
import { FEATURES, DEFAULT_CAR, calcPrice, getComboError, formatPrice } from '../utilities/carOptions'
import '../css/CarForm.css'

// shared by the Create and Edit pages
const CarForm = ({ initialCar = DEFAULT_CAR, submitLabel, onSubmit, children }) => {
    const [car, setCar] = useState(initialCar)
    const [error, setError] = useState('')
    const [saving, setSaving] = useState(false)

    const price = calcPrice(car)

    const handleSelect = (key, value) => {
        setCar({ ...car, [key]: value })
        setError('')
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!car.name.trim()) {
            setError('Please give your car a name.')
            return
        }

        const comboError = getComboError(car)
        if (comboError) {
            setError(comboError)
            return
        }

        try {
            setSaving(true)
            await onSubmit({ ...car, name: car.name.trim(), price })
        } catch (err) {
            setError(err.message)
            setSaving(false)
        }
    }

    return (
        <form className='car-form' onSubmit={handleSubmit}>
            <article className='preview-card'>
                <CarPreview car={car} />

                <div className='price-row'>
                    <span>Total price</span>
                    <strong>{formatPrice(price)}</strong>
                </div>

                <input
                    type='text'
                    placeholder='Name your car'
                    value={car.name}
                    onChange={(e) => handleSelect('name', e.target.value)}
                    maxLength={100}
                />

                {error && <p className='error-message' role='alert'>⚠️ {error}</p>}

                <div className='form-actions'>
                    <button type='submit' disabled={saving}>{saving ? 'Saving...' : submitLabel}</button>
                    {children}
                </div>
            </article>

            <article className='options-card'>
                {FEATURES.map((feature) => (
                    <fieldset key={feature.key} className='feature'>
                        <legend>{feature.label}</legend>

                        <div className='chips'>
                            {feature.options.map((option) => (
                                <button
                                    type='button'
                                    key={option.value}
                                    className={`chip ${car[feature.key] === option.value ? 'selected' : ''}`}
                                    onClick={() => handleSelect(feature.key, option.value)}
                                >
                                    {option.color && <span className='swatch' style={{ background: option.color }} />}
                                    {option.label}
                                    <small>{option.price ? `+${formatPrice(option.price)}` : 'Included'}</small>
                                </button>
                            ))}
                        </div>
                    </fieldset>
                ))}
            </article>
        </form>
    )
}

export default CarForm
