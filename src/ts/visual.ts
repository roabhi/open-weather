import { temps, 
         top 
} from "./globals/globals.dom"

import { Location } from "./types/weather.api"
import { getColor } from "./utils/utils.index";


export const setWeather = ():void => {



},

setTempColors = (_els:Node[], _deg:number):void => {

    _els.map((_obj) => {

        const _o:HTMLElement = _obj as HTMLElement   
        
        if(_o.tagName == 'BODY') {
            _o.style.background = getColor(_deg)
        } else {
            _o.style.color = getColor(_deg)
        }

        
    })


    


},

setInfo = (_els:Node[], _vals:string[]):void => {

    _els.forEach((_el,_i, never) => {

        const _e:Element = _els[_i] as Element

        _e.innerHTML = _vals[_i]

    })

},

setAttributes = (_els:Node[], _labels:string[], _vals:string[]):void => {

    _els.forEach((_el, _i, never) => {

        const _e:Element = _els[_i] as Element

        _e.setAttribute(_labels[_i], _vals[_i])

    })

},

insertSearch = (_fragUl:DocumentFragment):void => {

    top.querySelector('ul').appendChild(_fragUl)

},

populateSearch = (_data:JSON):DocumentFragment => {

    const fragment:DocumentFragment = document.createDocumentFragment(),
          data = _data as { [key: string]: any } // ? Work around to get the returned JSON iterable by a string value as index

        for(let i in data ) {
            const location = data[i] as Location

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

            fragment.append(newLi)            

        }

    return fragment

},

switchTempUnits = ():void => {
    
    //console.log('switching temps')
    
    Array.from(temps).map((_obj) => {
        
        const _o = _obj as Element
        
        if(_o.hasAttribute('data-celsius') && _o.hasAttribute('data-fahrenheit')){

            const _p:HTMLElement = _o.parentElement

            if(_p.className == 'celsius'){

                // _o.innerHTML = `${_o.getAttribute('data-fahrenheit')}&deg;`
                // _p.className = 'fahrenheit'

                setInfo(
                    [_o], 
                    [`${_o.getAttribute('data-fahrenheit')}&deg;`]
                )

                _p.className = 'fahrenheit'


            }else if(_p.className == 'fahrenheit') {
                // _o.innerHTML = `${_o.getAttribute('data-celsius')}&deg;`

                setInfo(
                    [_o], 
                    [`${_o.getAttribute('data-celsius')}&deg;`]
                )
                
                _p.className = 'celsius'
            }

             

        }
    })
}