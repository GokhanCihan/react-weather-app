import React from 'react'
import { useData } from '../../Context/DataContext';

function Card() {
    const values = useData();
    return (
        <div className="row justify-content-center" >
            <div className="col-6 col-md d-md-flex justify-content-center ">
            {values.temperature.map((item, index) =>
                <div key={index} className="card border-0">
                    <div className="card-header d-flex justify-content-center p-2">
                        <span className="header-day fs-md-1"><strong>{values.weekDays[index]}</strong></span>
                        <span className="header-date">{values.dayOfMonth[index]}</span>
                    </div>
                    <div className="card-body text-center pb-0">
                        <img className="card-img" src={`https://openweathermap.org/img/wn/${values.iconType[index]}.png`} alt={`${values.iconType[index]}`}/>
                        <div className="d-flex justify-content-between">
                            <span><strong>{Math.round(item.max)}</strong></span> 
                            <span>|</span>
                            <span><strong>{Math.round(item.min)}</strong></span> 
                        </div>
                    </div>

                </div>)}
            </div>
        </div>
    )
}

export default Card;
