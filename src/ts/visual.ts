import { temps, 
         top 
} from "./globals/globals.dom"

import { Location } from "./types/weather.api"
import { getColor, setLocalSettings } from "./utils/utils.index";
import { LocalData } from "./types/weather.api";


export const setIcon = (_els:Node[], _codes:string[]):void => {

    _els.forEach((_el, _i) => {

        const _o:HTMLElement = _el as HTMLElement

        _o.className = _codes[_i]

    })

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

setTempUnits = (_units?:string) => {

    _units.length < 1 ? _units == 'celsius' : _units == _units

    Array.from(temps).map((_obj) => {

        const _o = _obj as Element
        
        if(_o.hasAttribute('data-celsius') && _o.hasAttribute('data-fahrenheit')){

            setInfo(
                [_o], 
                [`${_o.getAttribute(_units)}&deg;`]
            )

            

        }

    })

},

switchTempUnits = ():void => {   
    
    
    
    Array.from(temps).map((_obj) => {
        
        const _o = _obj as Element
        
        if(_o.hasAttribute('data-celsius') && _o.hasAttribute('data-fahrenheit')){

            

            if(_o.classList.contains('celsius')) {

                setInfo(
                    [_o], 
                    [`${_o.getAttribute('data-fahrenheit')}&deg;`]
                )

                _o.classList.remove('celsius')
                _o.classList.add('fahrenheit')

                const userData:LocalData = JSON.parse(localStorage.getItem('ow'))
                userData.settings.defaultTemp = 'fahrenheit'
                localStorage.setItem('ow', JSON.stringify(userData))

                setLocalSettings('defaultTemp', 'fahrenheit')


            }else if(_o.classList.contains('fahrenheit')) {

                setInfo(
                    [_o], 
                    [`${_o.getAttribute('data-celsius')}&deg;`]
                )
                
                _o.classList.remove('fahrenheit')
                _o.classList.add('celsius')

                setLocalSettings('defaultTemp', 'celsius')

            }

             

        }
    })
}