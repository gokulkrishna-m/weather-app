import React, { useState } from 'react'
import { UilSearch,UilLocationPoint  } from '@iconscout/react-unicons'
import { toast } from 'react-toastify'

const Inputs = ({setUnits,setQuery,units}) => {

  const [city,setCity] = useState('')

  const handleSearch = () =>{
    if(city !== '') setQuery({q:city})
  }
  
  const handlelocation = () => {
    if(navigator.geolocation){
      toast.info('Fetching users location.')
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success('Location fetched.')
        let lat = position.coords.latitude
        let lon = position.coords.longitude

        setQuery({
          lat,
          lon
        })
      })
    }
  }

  const handleUnitChange = (e) => {
    const selectedUnit = e.currentTarget.name

    console.log(selectedUnit)

    if(units !== selectedUnit) setUnits(selectedUnit)
  }

  return (
    <div className='flex items-center justify-around my-6'>
        <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
            <input type='text' value={city} onChange={(e)=>setCity(e.currentTarget.value)} placeholder='Search for city...' className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase' />
            <UilSearch size={25} className='text-white cursor-pointer transition ease-out hover:scale-125' onClick={handleSearch}/>
            <UilLocationPoint size={25} className='text-white cursor-pointer transition ease-out hover:scale-125' onClick={handlelocation}/>
        </div>

        <div className='flex flex-row items-center justify-center w-1/4'>
            <button name="metric" className='text-xl font-light text-white hover:scale-125 transition ease-out' onClick={handleUnitChange}>°C</button>
            <p className='text-xl text-white mx-1'>|</p>
            <button name="imperial" className='text-xl font-light text-white hover:scale-125 transition ease-out' onClick={handleUnitChange}>°F</button>
        </div>
    </div>
  )
}

export default Inputs