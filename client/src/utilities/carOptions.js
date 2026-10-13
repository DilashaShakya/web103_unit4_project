export const BASE_PRICE = 25000

// every customizable feature and the options you can pick for it
export const FEATURES = [
    {
        key: 'exterior',
        label: 'Exterior',
        options: [
            { value: 'black', label: 'Midnight Black', price: 0, color: '#1f2128' },
            { value: 'red', label: 'Racing Red', price: 500, color: '#c62f2f' },
            { value: 'blue', label: 'Ocean Blue', price: 500, color: '#2f6fd6' },
            { value: 'silver', label: 'Silver', price: 300, color: '#b9bfc7' },
            { value: 'lime', label: 'Lime', price: 800, color: '#7cc242' }
        ]
    },
    {
        key: 'roof',
        label: 'Roof',
        options: [
            { value: 'hardtop', label: 'Hardtop', price: 0 },
            { value: 'sunroof', label: 'Sunroof', price: 1200 },
            { value: 'convertible', label: 'Convertible', price: 3500 }
        ]
    },
    {
        key: 'wheels',
        label: 'Wheels',
        options: [
            { value: 'standard', label: 'Standard', price: 0 },
            { value: 'sport', label: 'Sport', price: 1500 },
            { value: 'offroad', label: 'Off-Road', price: 2000 }
        ]
    },
    {
        key: 'interior',
        label: 'Interior',
        options: [
            { value: 'cloth', label: 'Cloth', price: 0, color: '#6b6f78' },
            { value: 'leather', label: 'Leather', price: 2000, color: '#8b5a2b' },
            { value: 'racing', label: 'Racing', price: 3000, color: '#d62828' }
        ]
    }
]

export const DEFAULT_CAR = {
    name: '',
    exterior: 'black',
    roof: 'hardtop',
    wheels: 'standard',
    interior: 'cloth'
}

// look up the full option object, e.g. getOption('exterior', 'red')
export const getOption = (featureKey, value) => {
    const feature = FEATURES.find((f) => f.key === featureKey)
    return feature.options.find((o) => o.value === value) || feature.options[0]
}

export const calcPrice = (car) => {
    return FEATURES.reduce((total, feature) => total + getOption(feature.key, car[feature.key]).price, BASE_PRICE)
}

// returns an error message if the combo can't be built, otherwise null
export const getComboError = ({ roof, wheels, interior }) => {
    if (roof === 'convertible' && wheels === 'offroad') {
        return 'Off-Road wheels are not available on a Convertible.'
    }
    if (interior === 'racing' && wheels !== 'sport') {
        return 'The Racing interior requires Sport wheels.'
    }
    return null
}

export const formatPrice = (price) => `$${price.toLocaleString()}`
