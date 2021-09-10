import { top, 
         search, 
         header,
         currentWeatherIcon,
         laterWeatherIcon,
         tomorrowWeatherIcon,
         afterTomorrowWeatherIcon 
} from "./globals/globals.dom";

import { Forecast, LocalData } from './types/weather.api';
import { Fetch } from './classes/Fetch';
import { key, weekDays } from "./globals/globals.index";

import { switchTempUnits, 
         populateSearch, 
         insertSearch, 
         setTempColors, 
         setInfo, 
         setAttributes, 
         setIcon
} from "./visual";

import { getApiTemUnit, getCurrentDay, getCurrentHour, getDayLightPhase } from "./utils/utils.index";




const fecther = new Fetch();

export const getWeather = (_name:string, _lat:string, _lon:string, _defT:string) => {

    

    fecther.apiCall(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${_lat},${_lon}&days=3&aqi=yes&alerts=yes`)
    .then((_res) => {
        
        const data:Forecast = _res as unknown as Forecast  

 
        // * SET ICONS


        setIcon(
            [
                    currentWeatherIcon,
                    laterWeatherIcon, 
                    tomorrowWeatherIcon, 
                    afterTomorrowWeatherIcon
            ], 
            [
                    `_${data.current.condition.code}_${getDayLightPhase(data.current.is_day)}`,
                    `_${data.forecast.forecastday[0].hour[getCurrentHour() + 1].condition.code}_${getDayLightPhase(data.forecast.forecastday[0].hour[getCurrentHour() + 1].is_day)}`,
                    `_${data.forecast.forecastday[1].day.condition.code}_day`,
                    `_${data.forecast.forecastday[2].day.condition.code}_day`
            ]
        )
        


        // * SET TEXT 4 MAIN ICON
        
  
        setInfo(
            [
                    header.querySelector('h3:first-of-type span'), 
                    header.querySelector('h3:last-of-type span')
                ], 
            [
                    _name.substr(0, _name.indexOf(',')), 
                    `${Math.round(data.current[`temp_${ getApiTemUnit(_defT) }`]).toString()}&deg;` 
                ]
        )

        setAttributes(
            [
                    header.querySelector('h3:last-of-type span'), 
                    header.querySelector('h3:last-of-type span') 
                ], 
            [
                    'data-celsius', 
                    'data-fahrenheit'
                ], 
            [
                    Math.round(data.current.temp_c).toString(), 
                    Math.round(data.current.temp_f).toString()
                ]
        )        

        setTempColors(
            [
                    document.body, document.querySelector('footer ul li:first-of-type div.mini_wrapper div'), 
                    document.querySelector('footer ul li:nth-child(2) div.mini_wrapper div'),
                    document.querySelector('footer ul li:last-of-type div.mini_wrapper div')
                ], 
            data.current.temp_f
        )

        // * SET TEXT 4 FOOTER ICONS

        const myFooterElements:Element[] = Array.from(document.querySelectorAll('footer ul li span.temp'))
        
        myFooterElements.forEach((_el, _i) => {

            setAttributes(
                [
                    _el,
                    _el,
                                
                ],
                [
                    'data-celsius', 
                    'data-fahrenheit'
                ],
                [
                    `${Math.round(data.forecast.forecastday[_i].day.mintemp_c).toString()}/${Math.round(data.forecast.forecastday[_i].day.maxtemp_c).toString()}`,
                    `${Math.round(data.forecast.forecastday[_i].day.mintemp_f).toString()}/${Math.round(data.forecast.forecastday[_i].day.maxtemp_f).toString()}`
                ]
            )

            setInfo(
                [
                    _el                    
                ],
                [
                    `${Math.round(data.forecast.forecastday[_i].day[`mintemp_${getApiTemUnit(_defT)}`]).toString()}/${Math.round(data.forecast.forecastday[_i].day[`maxtemp_${getApiTemUnit(_defT)}`]).toString()}&deg;`
                ]
            )

        })


        // * SET AFTER TOMORROW WEEK DAY
        
        setInfo(
            [
                document.querySelector('footer ul li:last-of-type span:first-of-type')
            ],
            [
                `${weekDays[getCurrentDay() + 2]}`
            ]
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
        
        const localData:LocalData = {
            "city":_city,
            "lat":_lat,
            "lon":_lon,
            "settings" : {
                "defaultTemp":"fahrenheit"
            }
        }

        localStorage.setItem('ow', JSON.stringify(localData))

        getWeather(_city, _lat, _lon, localData.settings.defaultTemp)
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

    

    if(localStorage.getItem('ow')){

        top.className = 'top'

        //console.log(JSON.parse(localStorage.getItem('ow')))

        const userData:LocalData = JSON.parse(localStorage.getItem('ow'))
        getWeather(userData.city, userData.lat, userData.lon, userData.settings.defaultTemp)       



    }

    search.addEventListener('keyup', onSearchKeyUp , false)
    header.querySelector('h3:last-of-type span').addEventListener('click', onHeaderTempClick, false)

        

    

}