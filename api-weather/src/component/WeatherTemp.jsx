// const atApiUrl = `https://api.at.govt.nz/gtfs/v3/stops/${stopId}`;
      
    //   const response = await fetch(atApiUrl, {
    //     method: 'GET',
    //     headers: {
    //       'Ocp-Apim-Subscription-Key': 'YOUR PRIMARY KEY',
    //     }
    //   });

import { useState, useEffect} from 'react'

const URL = `http://api.weatherapi.com/v1
/current.json?key=47a53ef1aeff4b29ba811204220210&q=London&aqi=no`;

export const WheatherTemp = () => {

    const [temp, setTemp] = useState(0)

    useEffect (() => {
        const fetchData = async () => {
            const result = await fetch(URL)
            console.log(result)
           result.json().then(json => {
            setTemp(json.current.temp_f)
           })
        }
        fetchData()
    }, [])
    return (


        <div className='weather-container'>
            
            London Temp now: {temp}F;
            
        </div>
    )
}
