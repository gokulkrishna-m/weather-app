import { DateTime } from "luxon"

const API_KEY = '54d91c303657ba8241e713bf2ed4ade1'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

const getWeatherData = (infoType,searchParam) => {
    const url = new URL(BASE_URL+"/"+infoType)

    // console.log(url)

    url.search = new URLSearchParams({
        ...searchParam,
        appid:API_KEY
    })

    // console.log(url)

    return fetch(url)
        .then((res)=>res.json())
        .then((data)=>data)
}

// export default getWeatherData 1.20.56

const formatCurrentWeather = (data) =>{

    // console.log(data)
    const {
        coord:{lon,lat},
        main:{temp,feels_like,temp_min,temp_max,humidity},
        name,
        timezone,
        dt,
        sys:{country,sunrise,sunset},
        weather,
        wind:{speed},

    } = data

    const {
        main:details,icon
    } = weather[0]

    return {
        lon,lat,temp,feels_like,temp_max,temp_min,humidity,name,timezone,dt,country,sunrise,sunset,speed,details,icon
    }
}

// const formatForecastWeather = (data) =>{

//     console.log(`gokul krishna :${data}`)

//     let {timezone,daily,hourly} = data

//     daily = daily.slice(1,6).map(
//         d => {
//             return {
//                 title:formatToLocalTime(d.dt,timezone, 'ccc'),
//                 temp: d.temp.day,
//                 icon:d.weather[0].icon
//             }
//         }
//     )

//     hourly = hourly.slice(1,6).map(
//         d => {
//             return {
//                 title:formatToLocalTime(d.dt,timezone, 'hh:mm a'),
//                 temp: d.temp.day,
//                 icon:d.weather[0].icon
//             }
//         }
//     )

//     return {timezone,hourly,daily}
// }
// const opts = { keepCalendarTime: true }
const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

// console.log(formatToLocalTime(1703857499,'3600'))

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather',searchParams).then(formatCurrentWeather)

    const {lat,lon} = formattedCurrentWeather

    // console.log(lat)
    // console.log(lon)

    // const formattedForecastWeather = await getWeatherData(
    //     'onecall',{
    //         lat,
    //         lon,
    //         exclude:'current,minutely,alerts',
    //         units:searchParams.units
    //     }
    // ).then(formatForecastWeather)

    // return {...formattedCurrentWeather,...formattedForecastWeather}
    return {...formattedCurrentWeather}
}

const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`


export default getFormattedWeatherData

export {formatToLocalTime, iconUrlFromCode}