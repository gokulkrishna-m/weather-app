import React from 'react'

const TopButtons = ({setQuery}) => {

    const cities = [
        {
            id:1,
            name:'London'
        },
        {
            id:2,
            name:'Sydney'
        },
        {
            id:3,
            name:'Tokyo'
        },
        {
            id:4,
            name:'Toronto'
        },
        {
            id:5,
            name:'Paris'
        }
    ]

  return (
    <div className='flex items-center justify-around my-6'>
        {
            cities.map((city)=>(
                <button key={city.id} className='text-white text-lg font-medium' onClick={()=>setQuery({q:city.name})}>{city.name}</button>
            ))
        }
    </div>
  )
}

export default TopButtons