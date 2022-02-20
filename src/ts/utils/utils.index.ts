import { LocalData } from "../types/weather.api";

export const getColor = (_deg:number):string => {
    
    //? Using Farhenit temp units to avoid conflict with negative values

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
},

getDayLightPhase = (_val:number):string => {

    return _val > 0 ? 'day' : 'night'

},

getCurrentHour = ():number => {

    const rightNow:Date = new Date()

    return rightNow.getHours() 

},

getCurrentDay = ():number => {
    const rightNow:Date = new Date()
    return rightNow.getDay()
},

getApiTemUnit = (_tempUnit:string):string => {

    return _tempUnit == 'celsius' ? 'c' : 'f'

},

setLocalSettings = (_key:string, _val:string):void => {

    const userData:LocalData = JSON.parse(localStorage.getItem('ow'))

    userData.settings[_key] = _val

    localStorage.setItem('ow', JSON.stringify(userData))

},

getLocalSettings = (_key:string):string | undefined => {

    const userData:LocalData = JSON.parse(localStorage.getItem('ow'))

    let _res:string | undefined

    try{
        _res = userData.settings[_key]
    }catch(e){
        //console.log(e)
    }   

    return _res

}