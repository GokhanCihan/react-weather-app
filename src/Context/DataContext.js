import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext(); 

const DataProvider = ({children}) => {
    const [temperature, setTemperature] = useState([])
    const [geoCode, setGeoCode] = useState({name: "ANKARA", lat: 39.92077, long: 32.85411})
    const [citiesArr, setCitiesArr] = useState([])
    const APIkey = '8e36716c35454e0b553f1f1650128176'
    
    /* list of city locations from local .json file */
    useEffect(() => {
        axios.get('data.json').then(res => setCitiesArr(res.data))
    }, [])

    /* wheather data from API */
    const getWeatherData = async () => {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${geoCode.lat}&lon=${geoCode.long}&exclude=hourly,minutely,alerts&units=metric&lang=tr&appid=${APIkey}`)
        const extractData = (nthDay) => (
            {
                max: response.data.daily[nthDay].temp.max, 
                min: response.data.daily[nthDay].temp.min,
                description : response.data.daily[nthDay].weather[0].description
            }
        )
            setTemperature(() => {
                const temps = [];
                for (let i = 0; i < 7; i++) {temps.push(extractData(i))}
                return temps
            })
    }

    useEffect(() => {
        getWeatherData()
    }, [geoCode])

    const values = {
        temperature,
        citiesArr,
        setGeoCode,
    }

    return(
        <DataContext.Provider value={values}>
            {children}
        </DataContext.Provider>
    )
};

export const useData = () => useContext(DataContext);
export default DataProvider;