import React from 'react'
import { getOption } from '../utilities/carOptions'

const GLASS = '#a9d4f5'

const Wheel = ({ cx, type }) => {
    const r = type === 'offroad' ? 32 : 27
    const cy = 178 - r

    return (
        <g>
            {/* tire */}
            <circle cx={cx} cy={cy} r={r} fill='#141414' />
            {type === 'offroad' && (
                <circle cx={cx} cy={cy} r={r - 3} fill='none' stroke='#3a3a3a' strokeWidth='5' strokeDasharray='6 5' />
            )}

            {/* rim */}
            {type === 'standard' && <circle cx={cx} cy={cy} r={r * 0.55} fill='#9aa0a6' />}

            {type === 'sport' && (
                <g>
                    <circle cx={cx} cy={cy} r={r * 0.65} fill='#e5e7eb' stroke='#d62828' strokeWidth='3' />
                    {[0, 72, 144, 216, 288].map((angle) => (
                        <line
                            key={angle}
                            x1={cx}
                            y1={cy}
                            x2={cx + Math.cos((angle * Math.PI) / 180) * r * 0.6}
                            y2={cy + Math.sin((angle * Math.PI) / 180) * r * 0.6}
                            stroke='#555'
                            strokeWidth='3'
                        />
                    ))}
                </g>
            )}

            {type === 'offroad' && <circle cx={cx} cy={cy} r={r * 0.45} fill='#5a5a5a' />}

            <circle cx={cx} cy={cy} r='4' fill='#222' />
        </g>
    )
}

const CarPreview = ({ car }) => {
    const paint = getOption('exterior', car.exterior).color
    const seat = getOption('interior', car.interior).color

    return (
        <svg className='car-preview' viewBox='0 0 400 190' role='img' aria-label='Preview of your custom car'>
            {/* ground shadow */}
            <ellipse cx='200' cy='180' rx='170' ry='8' fill='rgba(0,0,0,0.35)' />

            {/* seat headrest, shows through the windows or the open top */}
            <rect x='212' y='70' width='16' height='30' rx='5' fill={seat} />

            {/* roof + windows */}
            {car.roof !== 'convertible' ? (
                <g>
                    <path d='M110,98 L150,54 L265,54 L312,98 Z' fill={paint} />
                    <path d='M126,94 L156,62 L204,62 L204,94 Z' fill={GLASS} opacity='0.8' />
                    <path d='M212,94 L212,62 L260,62 L292,94 Z' fill={GLASS} opacity='0.6' />
                    {car.roof === 'sunroof' && <rect x='170' y='50' width='80' height='6' rx='3' fill={GLASS} />}
                </g>
            ) : (
                // just a windshield when the top is down
                <path d='M138,98 L160,66 L167,68 L150,98 Z' fill={GLASS} opacity='0.9' />
            )}

            {/* body */}
            <path d='M30,145 Q30,102 72,98 L328,98 Q372,102 372,145 L372,155 L30,155 Z' fill={paint} />
            <line x1='40' y1='120' x2='362' y2='120' stroke='rgba(255,255,255,0.18)' strokeWidth='2' />

            {/* racing stripe */}
            {car.interior === 'racing' && <rect x='40' y='126' width='322' height='6' fill='#ffffff' opacity='0.85' />}

            {/* lights */}
            <ellipse cx='362' cy='114' rx='8' ry='6' fill='#ffe58a' />
            <rect x='30' y='108' width='8' height='14' rx='2' fill='#ff3b3b' />

            <Wheel cx={100} type={car.wheels} />
            <Wheel cx={300} type={car.wheels} />
        </svg>
    )
}

export default CarPreview
