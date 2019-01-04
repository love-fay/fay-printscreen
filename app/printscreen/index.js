/**
 * Create by fay on 2019-01-03 17:22
 */
import React from 'react';

const ps = {};

const options = {

};

ps.bind = (dom, options=options) => {
    dom.onclick = () => {
        console.log(123);
        console.log(document.getElementById('fay-printscreen-run'));
        document.getElementById('fay-printscreen-run').click();
    }
};

window.printscreen = ps;