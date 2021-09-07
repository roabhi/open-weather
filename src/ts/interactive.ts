import { top, 
         search, 
         header 
} from "./globals/globals.dom";

import { Forecast } from './types/weather.api';
import { Fetch } from './classes/Fetch';
import { key } from "./globals/globals.index";

import { switchTempUnits, 
         populateSearch, 
         insertSearch, 
         setBgColor, 
         setInfo, 
         setAttributes 
} from "./visual";



const fecther = new Fetch();

export const getWeather = (_name:string, _lat:string, _lon:string) => {

    fecther.apiCall(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${_lat},${_lon}&days=3&aqi=yes&alerts=yes`)
    .then((_res) => {
        
        const data:Forecast = _res as unknown as Forecast

        console.log(`Current condition for ${_name.substr(0, _name.indexOf(','))} is ${data.current.condition.text} and it feels like ${data.current.feelslike_c} and its code for CSS icons is ${data.current.condition.code}`)

        console.info(data.current.condition.code)

        // 

        // for(let _f in data.forecast.forecastday) {
        //     console.log(data.forecast.forecastday[_f])

        //     for(let _h in data.forecast.forecastday[_f].hour) {
        //         console.log(data.forecast.forecastday[_f].hour[_h])
        //     }
        // }

        // TODO Create Class Object based on returned data from API


  
        setInfo(
            [header.querySelector('h3:first-of-type span'), header.querySelector('h3:last-of-type span')], 
            [_name.substr(0, _name.indexOf(',')), `${Math.round(data.current.temp_c).toString()}&deg;` ]
        )

        setAttributes(
            [header.querySelector('h3:last-of-type span'), header.querySelector('h3:last-of-type span') ], 
            ['data-celsius', 'data-fahrenheit'], 
            [Math.round(data.current.feelslike_c).toString(), Math.round(data.current.temp_f).toString()]
        )        

        setBgColor(
            [document.body], 
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
        // TODO LOCALSTORAGE CALL HERE

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