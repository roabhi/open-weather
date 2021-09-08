import { top, 
         search, 
         header,
         currentWeatherIcon,
         laterWeatherIcon,
         tomorrowWeatherIcon,
         afterTomorrowWeatherIcon 
} from "./globals/globals.dom";

import { Forecast } from './types/weather.api';
import { Fetch } from './classes/Fetch';
import { key, weekDays } from "./globals/globals.index";

import { switchTempUnits, 
         populateSearch, 
         insertSearch, 
         setTempColors, 
         setInfo, 
         setAttributes 
} from "./visual";

import { getCurrentDay, getCurrentHour, getDayLightPhase } from "./utils/utils.index";




const fecther = new Fetch();

export const getWeather = (_name:string, _lat:string, _lon:string) => {

    fecther.apiCall(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${_lat},${_lon}&days=3&aqi=yes&alerts=yes`)
    .then((_res) => {
        
        const data:Forecast = _res as unknown as Forecast

        console.log(`Current condition for ${_name.substr(0, _name.indexOf(','))} is ${data.current.condition.text} and it feels like ${data.current.feelslike_c} and its code for CSS icons is ${data.current.condition.code}`)

        

        // 

        // for(let _f in data.forecast.forecastday) {
        //     console.log(data.forecast.forecastday[_f])

        //     for(let _h in data.forecast.forecastday[_f].hour) {
        //         console.log(data.forecast.forecastday[_f].hour[_h])
        //     }
        // }

        // TODO Create Class Object based on returned data from API - OPTIONAL, let's see if we can do it without

        // TODO VALIDATE HERE CURRENT TIME STAMP

        console.log(data)

        console.info(`current condition code is ${data.current.condition.code}, and is_day equals to ${data.current.is_day}`)

        console.log(`later hour condition code is , ${data.forecast.forecastday[0].hour[getCurrentHour() + 1].condition.code}, woudl be ${getDayLightPhase(data.forecast.forecastday[0].hour[getCurrentHour() + 1].is_day)}, the min temp for later would be ${data.forecast.forecastday[0].day.avgtemp_c}, the max temp for later would be ${data.forecast.forecastday[0].hour[getCurrentHour() + 1].temp_c}`)

        console.log(`tomorrow forecast code would be ${data.forecast.forecastday[1].day.condition.code}, the min temp would be ${data.forecast.forecastday[1].day.mintemp_c}, the max temp woudl be ${data.forecast.forecastday[1].day.maxtemp_c}`)

        console.log(`the day after tomorrow is ${weekDays[getCurrentDay() + 2]}, the forecast code is ${data.forecast.forecastday[2].day.condition.code}, the min temp would be ${data.forecast.forecastday[2].day.mintemp_c}, the max temp woudl be ${data.forecast.forecastday[2].day.maxtemp_c}`)

        // * TEMP TEST FOR setWeather
        // * ===========================
        // * For current Weather :

        // * data.current.condition.code, --> icon code
        // * data.current.is_day --> if day or night

        currentWeatherIcon.className = `_${data.current.condition.code}_${getDayLightPhase(data.current.is_day)}`

        // * For later
        // * data.forecast.forecastday[0].hour[getCurrentHour() + 1].condition.code --> icon code
        // * data.forecast.forecastday[0].hour[getCurrentHour() + 1].is_day --> if day or night
        // * data.forecast.forecastday[0].day.mintemp_c --> min av temp for the day
        // * data.forecast.forecastday[0].day.maxtemp_c --> max temp for the current day

        laterWeatherIcon.className = `_${data.forecast.forecastday[0].hour[getCurrentHour() + 1].condition.code}_${getDayLightPhase(data.forecast.forecastday[0].hour[getCurrentHour() + 1].is_day)}`
        
        // * For Tomorrow
        // * data.forecast.forecastday[1].day.condition.code --> icon code
        // * data.forecast.forecastday[1].day.mintemp_c --> min avg temp for the day
        // * data.forecast.forecastday[1].day.maxtemp_c --> max avg temp for the day

        tomorrowWeatherIcon.className = `_${data.forecast.forecastday[1].day.condition.code}_day`
        
        
        // * For day after tomorrow
        // * weekDays[getCurrentDay() + 2] --> which day of week 
        // * data.forecast.forecastday[2].day.condition.code --> icon code
        // * data.forecast.forecastday[2].day.mintemp_c --> min avg temp for the day
        // * data.forecast.forecastday[2].day.maxtemp_c --> max avg temp for the day

        afterTomorrowWeatherIcon.className = `_${data.forecast.forecastday[2].day.condition.code}_day`


        // * SET TEMP TEXT



        // setWeather(

            //data, data.current.condition.code, data.current.is_day, data.forecast.forecastday[0].hour[getCurrentHour() + 1]
        // )

        laterWeatherIcon.parentNode.parentNode.querySelector('span.temp').innerHTML = `${Math.round(data.forecast.forecastday[0].day.mintemp_c)}&deg/${Math.round(data.forecast.forecastday[0].day.maxtemp_c)}&deg;`

        tomorrowWeatherIcon.parentNode.parentNode.querySelector('span.temp').innerHTML = `${Math.round(data.forecast.forecastday[1].day.mintemp_c)}&deg;/${Math.round(data.forecast.forecastday[1].day.maxtemp_c)}&deg;`

        afterTomorrowWeatherIcon.parentNode.parentNode.querySelector('span:first-of-type').innerHTML = `${weekDays[getCurrentDay() + 2]}`
        afterTomorrowWeatherIcon.parentNode.parentNode.querySelector('span.temp').innerHTML = `${Math.round(data.forecast.forecastday[2].day.mintemp_c)}&deg;/${Math.round(data.forecast.forecastday[2].day.maxtemp_c)}&deg;`


  
        setInfo(
            [header.querySelector('h3:first-of-type span'), header.querySelector('h3:last-of-type span')], 
            [_name.substr(0, _name.indexOf(',')), `${Math.round(data.current.temp_c).toString()}&deg;` ]
        )

        setAttributes(
            [header.querySelector('h3:last-of-type span'), header.querySelector('h3:last-of-type span') ], 
            ['data-celsius', 'data-fahrenheit'], 
            [Math.round(data.current.feelslike_c).toString(), Math.round(data.current.temp_f).toString()]
        )        

        setTempColors(
            [document.body, document.querySelector('footer ul li:first-of-type div.mini_wrapper div'), document.querySelector('footer ul li:nth-child(2) div.mini_wrapper div'), document.querySelector('footer ul li:last-of-type div.mini_wrapper div')], 
            data.current.temp_f
        )

        

    })

},

onLocationClick = (e:Event):void => {
    const _el = e.currentTarget as Element,
          _city = _el.getAttribute('data-city'),
          _lat = _el.getAttribute('data-lat'),
          _lon = _el.getAttribute('data-lon'),
          answer:boolean = confirm(`Use ${_el.querySelector('span').innerHTML} as your location?`)

    if(answer) {
        
        Array.from(top.querySelectorAll('ul li')).map((_obj) => {
            _obj.removeEventListener('click', onLocationClick, false)
        })


        while (top.querySelector('ul').lastChild) top.querySelector('ul').removeChild(top.querySelector('ul').lastChild)

        top.className = 'top'


        // ! USERS ACCEPT DATA
        // TODO LOCALSTORAGE CALL HERE - STORE

        getWeather(_city, _lat, _lon)
    }

    


},

searchLocation = (_val:string):void => {
    const search = fecther.apiCall(`http://api.weatherapi.com/v1/search.json?key=${key}&q=${_val}`).then( (_res:JSON) => {
        
        const _fragUl:DocumentFragment = populateSearch(_res)
    
        Array.from(_fragUl.querySelectorAll('li')).map((_obj) => {
            _obj.addEventListener('click', onLocationClick, false)
        })

        insertSearch(_fragUl)

    

    })
},


onSearchKeyUp = (e:Event):void => {

    const _s = e.target as HTMLInputElement

    while ( top.querySelector('ul').lastChild ) {

        top.querySelector('ul').lastChild.removeEventListener('click', onLocationClick, false)
        
        top.querySelector('ul').removeChild( top.querySelector('ul').lastChild )

    }

    if(_s.value.length > 2) {       

        searchLocation( _s.value )

    }

},

onHeaderTempClick = (e:Event):void => {
    switchTempUnits()
},

init = ():void => {

    

    search.addEventListener('keyup', onSearchKeyUp , false)

    header.querySelector('h3:last-of-type span').addEventListener('click', onHeaderTempClick, false)    

    

}