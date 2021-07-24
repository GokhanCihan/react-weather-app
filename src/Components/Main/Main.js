import React from 'react';
import { useData } from '../../Context/DataContext';

function Main() {
    const temperature = useData();
    console.log(temperature);
    return (
        <div>
          {temperature.map(item => 
          <p>Gündüz: {(Math.round(item.day*10)/10).toFixed(1)} C, Gece: {(Math.round(item.night*10)/10).toFixed(1)}, durum: {item.description}</p>)
          }
        </div>
    )
}

export default Main;
