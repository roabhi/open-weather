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
import { Location } from './types/weather.api';
import { top, search } from './globals/dom';


/* 
* =============================
* GLOBAL CONSTS
* ============================
* */

const key = '2b58103c08b641a6a78164906212308',
      fecther = new Fetch();



const searchLocation = (_val:string) =>  {

    const search = fecther.apiCall(`http://api.weatherapi.com/v1/search.json?key=2b58103c08b641a6a78164906212308&q=${_val}`).then( (_res:JSON) => {
        
        const data = _res as { [key: string]: any } // ? Work around to get the returned JSON iterable by a string value as index

            for(let i in data ) {
                const location = data[i] as Location
                console.log(`Location returned is ${location.name}, and the country is ${location.country}`)

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
                newSpan.innerHTML = `${location.name}`

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

            setTimeout( () => { searchLocation( _s.value )	}, 500)

        }
    })

},

init = (e:Event) => {
    document.removeEventListener('DOMContentLoaded', init, false)

    addIntercation()

    

    

}


document.addEventListener('DOMContentLoaded', init, false)