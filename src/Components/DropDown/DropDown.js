import React from 'react'
import { useState } from 'react';
import { useData } from '../../Context/DataContext'

function DropDown() {
    const [selectValue, setSelectValue] = useState("ANKARA")
    const values = useData();
    
    /* matches selected city's name with names from local .json to get coordinates */
    const onChange = (e) => {
        setSelectValue(e.target.value)
        values.citiesArr.forEach(element => {
            if (element.name === e.target.value) {
                values.setGeoCode(
                    {
                        name: element.name, 
                        lat: element.lat, 
                        long: element.long
                    }
                )
            }
        })
    }

    return (
        <div>
            <select value={selectValue} onChange= {onChange} >
                {values.citiesArr.map((city, index) => {
                    return <option key={index} value={city.name}>{city.name}</option>
                })}  
            </select>
        </div>
    )
}

export default DropDown;
