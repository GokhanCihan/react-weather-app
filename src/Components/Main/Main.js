import React from 'react';
import { useData } from '../../Context/DataContext';

function Main() {
  const values = useData();
  return (
      <div>
        {values.temperature.map((item, index) => 
        <p key={index}> <strong>{values.weekDays[index]}</strong> {values.dayOfMonth[index]}<br></br>
          En Yüksek Sıcaklık: <strong>{Math.round(item.max)} C</strong>,<br></br> 
          En Düşük Sıcaklık: <strong>{Math.round(item.min)} C</strong>, 
          durum: {item.description}
        </p>
        )}
      </div>
  )
}

export default Main;