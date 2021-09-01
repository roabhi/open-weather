import { temps } from "../globals/globals.dom";

export const switchTempUnits = () => {
    
    console.log('switching temps')
    
    Array.from(temps).map((_obj) => {
        
        const _o = _obj as Element
        
        if(_o.hasAttribute('data-celsius') && _o.hasAttribute('data-fahrenheit')){

            const _p:HTMLElement = _o.parentElement

            if(_p.className == 'celsius'){

                _o.innerHTML = `${_o.getAttribute('data-fahrenheit')}&deg;`
                _p.className = 'fahrenheit'


            }else if(_p.className == 'fahrenheit') {
                _o.innerHTML = `${_o.getAttribute('data-celsius')}&deg;`
                _p.className = 'celsius'
            }

             

        }
    })
},
getColor = (_deg:number):string => {
    
    let color 

    switch(true) {
        case (_deg < 23):
            color = "#abb7b7";
            break;

        case ((_deg > 23) && (_deg <= 32)):
            color = "#abb7c8";
            break;

        case ((_deg > 32) && (_deg <= 50)):
            color = "#85ccc5";
            break;

        case ((_deg > 50) && (_deg <= 59)):
            color = "#88d1b0";
            break;

        case ((_deg > 59) && (_deg <= 68)):
            color = "#b7c781";
            break;
            
        case ((_deg > 68) && (_deg <= 77)):
            color = "#d6c78b";
            break;
            
        case ((_deg > 77) && (_deg <= 86)):
            color = "#f2ba9d";
            break;
            
        case ((_deg > 86) && (_deg <= 95)):
            color = "#e39594";
            break;
            
        case (_deg > 95 ):
            color = "#f56462";
            break;
    }

    return color
}