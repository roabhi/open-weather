/* *
* =============================
* IMPORT NEEDED RUNTIME
* ============================
* */

import 'regenerator-runtime/runtime'


/* 
* =============================
* IMPORT STYLES
* ============================
* */

import '../scss/layout.scss'


/* 
* =============================
* MODULE IMPORTS
* ============================
* */


import { Fetch } from './classes/Fetch';
import { Location, ExtendedLocation, Forecast } from './types/weather.api';
import { top, search, header } from './globals/globals.dom';
import { key } from './globals/globals.index';
import { getColor, switchTempUnits } from './utils/utils.index';


/* 
* =============================
* GLOBAL CONSTS
* ============================
* */

const fecther = new Fetch();



const displayWeather = (_name:string, _lat:string, _lon:string) => {

    fecther.apiCall(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${_lat},${_lon}&days=3&aqi=yes&alerts=yes`)
    .then((_res) => {
        
        const data:Forecast = _res as unknown as Forecast

        console.log(`Current condition for ${_name.substr(0, _name.indexOf(','))} is ${data.current.condition.text} and it feels like ${data.current.feelslike_c} and its code for CSS icons is ${data.current.condition.code}`)

        // for(let _f in data.forecast.forecastday) {
        //     console.log(data.forecast.forecastday[_f])

        //     for(let _h in data.forecast.forecastday[_f].hour) {
        //         console.log(data.forecast.forecastday[_f].hour[_h])
        //     }
        // }



        header.querySelector('h3:first-of-type span').textContent = _name.substr(0, _name.indexOf(','))
        header.querySelector('h3:last-of-type span').innerHTML = `${Math.round(data.current.feelslike_c).toString()}&deg;`

        header.querySelector('h3:last-of-type span').setAttribute('data-celsius', Math.round(data.current.feelslike_c).toString())
        header.querySelector('h3:last-of-type span').setAttribute('data-fahrenheit', Math.round(data.current.feelslike_f).toString())

        document.body.style.background = getColor(data.current.feelslike_f)

    })


},
onLocationClick = (e:Event) => {

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

        displayWeather(_city, _lat, _lon)
    }

    

},
searchLocation = (_val:string) =>  {

    const search = fecther.apiCall(`http://api.weatherapi.com/v1/search.json?key=${key}&q=${_val}`).then( (_res:JSON) => {
        
        //console.info(_res)
    
        const data = _res as { [key: string]: any } // ? Work around to get the returned JSON iterable by a string value as index

        for(let i in data ) {
            const location = data[i] as Location
            //console.log(`Location returned is ${location.name}, and the country is ${location.country}`)

            let newLi:HTMLLIElement = document.createElement('li'),
                newSpan:HTMLSpanElement = document.createElement('span'),
                newLink:HTMLAnchorElement = document.createElement('a')

            newLink.setAttribute('href', '#')
            newLink.innerHTML = '+'
            newLink.setAttribute('title', 'add to locations')

            newLi.setAttribute('data-city', location.name)
            newLi.setAttribute('data-region', location.region)
            newLi.setAttribute('data-country', location.country)
            newLi.setAttribute('data-lat', location.lat.toString())
            newLi.setAttribute('data-lon', location.lon.toString())

            newLi.setAttribute('title', 'use this location')
            newSpan.innerHTML = `${location.name}, ${location.region}, ${location.country}`

            newLi.addEventListener('click', onLocationClick, false)

            newLi.append(newSpan, newLink)

            top.querySelector('ul').appendChild(newLi)

        }

    

    })

    

},
addIntercation = () => {

    search.addEventListener('keyup', e => {
        const _s = e.target as HTMLInputElement

        if(_s.value.length > 2) {


            while ( top.querySelector('ul').lastChild ) top.querySelector('ul').removeChild( top.querySelector('ul').lastChild )

            //setTimeout( () => { 	}, 500)

            searchLocation( _s.value )

        }
    })

    header.querySelector('h3:last-of-type span').addEventListener('click', e => {
        switchTempUnits()
    })

},

init = (e:Event) => {
    document.removeEventListener('DOMContentLoaded', init, false)

    addIntercation()

    

    

}


document.addEventListener('DOMContentLoaded', init, false)