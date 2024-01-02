import React from 'react'
import { formatToLocalTime } from '../service/WeatherService'

const TimeAndLocation = ({weather:{dt,timezone,name,country},weather}) => {
    // console.log(dt)
    // console.log(timezone)
    // console.log(weather)
  return (
    <div>
        <div className='flex my-6 items-center justify-center'>
            <p className='text-white text-xl font-extralight'>
                {formatToLocalTime(dt,timezone)}
            </p>
        </div>

        <div className='flex my-6 items-center justify-center'>
            <p className='text-white text-3xl font-medium'>
                {`${name}, ${country}`}
            </p>
        </div>
    </div>
  )
}

export default TimeAndLocation