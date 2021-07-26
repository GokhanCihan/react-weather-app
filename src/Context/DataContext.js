import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext(); 

/* date calculations */
const d = new Date();
const today = d.getDay();
const currentMsec = d.getTime() 
const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
function dayAndMonth(milliseconds) {
    let thisDate = new Date(milliseconds)
    let thisDay =  (thisDate.getDate() >= 10) ? `${thisDate.getDate()}` : `0${thisDate.getDate()}`
    let thisMonth = (thisDate.getMonth() >= 10) ? `${thisDate.getMonth()}` : `0${thisDate.getMonth()}`
    return `${thisDay}/${thisMonth}`
}
function findDaysFrom(today)  {
    let weekDays = [];
    let dayOfMonth = [];
    for(let i=0; i < 7; i++){ 
        ((today + i) <= 6) 
        ? (weekDays.push(days[today+i])) 
        : (weekDays.push(days[today+i-7]));
        dayOfMonth.push(dayAndMonth(currentMsec + i*24*3600*1000));
    };
    return [weekDays, dayOfMonth];
}
const [weekDays, dayOfMonth] = findDaysFrom(today)

/* ------------------------ Provider function -------------------- */
const DataProvider = ({children}) => {
    const [geoCode, setGeoCode] = useState({name: 'ANKARA', lat: 39.92077, long:32.85411})
    const [temperature, setTemperature] = useState([])
    const [citiesArr, setCitiesArr] = useState([])
    const APIkey = 'eaafda8a2ec0aad68e0bdfe907387d'

    /* Geolocation API returns user's location */
    const getLocation = async () => new Promise ((resolve,reject) => {
        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const userLocation = {name: 'Konumunuz', lat: latitude, long: longitude}
            alert('Konumunuz bulundu')
            resolve(values.setGeoCode(userLocation))
        }
        function error() {
            reject('Konumunuz bulunamadı')    
        }
        if(!navigator.geolocation) {
            reject('Tarayıcınız konum bulmayı desteklemiyor.')
        }else {
              navigator.geolocation.getCurrentPosition(success, error)
            }         
    })

    /* list of city locations from local .json file */
    const getCitiesArr = async () => {
        const fetchArr = await axios.get('data.json')
        setCitiesArr(fetchArr.data)
    }
    
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
        getLocation()
    }, [])
        
    useEffect(() => {
        getWeatherData()
        getCitiesArr()
    },[geoCode])

    const values = {
        temperature,
        citiesArr,
        geoCode,
        setGeoCode,
        weekDays,
        dayOfMonth
    }

    return(
        <DataContext.Provider value={values}>
            {children}
        </DataContext.Provider>
    )
};

export const useData = () => useContext(DataContext);
export default DataProvider;