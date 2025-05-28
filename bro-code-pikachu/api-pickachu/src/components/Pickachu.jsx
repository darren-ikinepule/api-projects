

import React from "react"

export const Pickachu = () => {

    try{
      const resolve =  await fetch('http://pokeapi.co/api/v2/pokemon/pickachu')
      if(!Response.ok) {
        throw new error('Darrens the best')
      }

      const data = await Response.json()
    }
    catch {
      
    }

  return (

    <div className="pickachu-container">

       
    

    </div>  

  )
}
