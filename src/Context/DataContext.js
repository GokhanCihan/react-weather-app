import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext(); 

const DataProvider = ({children}) => {
    const [temperature, setTemperature] = useState([])
    const APIkey = '8e36716c35454e0b553f1f1650128176'
    const lat = 37.0000;
    const lon = 35.3213;
    
    useEffect(() => {
        const getWeatherData = async () => {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=metric&lang=tr&appid=${APIkey}`)
            const extractData = (nthDay) => (
                {
                    day: response.data.daily[nthDay].temp.day, 
                    night: response.data.daily[nthDay].temp.night,
                    description : response.data.daily[nthDay].weather[0].description
                }
            )

            setTemperature(() => {
                const temps = [];
                for (let i = 0; i < 7; i++) {temps.push(extractData(i))}
                return temps
            })              
        }

        getWeatherData()
    }, [APIkey, lat, lon])
    
    
    /* {gelen JSON}.data.daily[0].temp.day ===> gündüz sıcaklığı */
    /* {gelen JSON}.data.daily[0].temp.night ===> gece sıcaklığı */
    /* {gelen JSON}.data.daily[0].weather[0].description ===> hava olayı */
    
    return(
        <DataContext.Provider value={temperature}>
            {children}
        </DataContext.Provider>
    )
};

export const useData = () => useContext(DataContext);

export default DataProvider;