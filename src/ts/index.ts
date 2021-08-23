/*
=============================
IMPORT NEEDED RUNTIME
============================
*/

import 'regenerator-runtime/runtime';


/*
=============================
IMPORT STYLES
============================
*/

import '../scss/globals.scss';


const init = (e:Event) => {
    document.removeEventListener('DOMContentLoaded', init, false);

    const message = document.getElementById('test') as Element;

    message.innerHTML += "           this is a test".trimStart();

    console.log('ready');
}


document.addEventListener('DOMContentLoaded', init, false);