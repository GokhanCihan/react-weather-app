import React from 'react';
import { useData } from '../../Context/DataContext';

const roundOneDecimal = (number) => (Math.round(number*10)/10).toFixed(1)

function Main() {
  const values = useData();
  return (
      <div>
        {values.temperature.map((item, index) => 
        <p key={index}>
          En Yüksek Sıcaklık: {roundOneDecimal(item.max)} C, 
          En Düşük Sıcaklık: {roundOneDecimal(item.min)}, 
          durum: {item.description}
        </p>
        )}
      </div>
  )
}

export default Main;