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




import { init } from './interactive';




const ready = (e:Event) => {

    document.removeEventListener('DOMContentLoaded', init, false)

    //! CHECK CURRENT LOCALSTORAGE STATE

    init()    

}


document.addEventListener('DOMContentLoaded', ready, false)