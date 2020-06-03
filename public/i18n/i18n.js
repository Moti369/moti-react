import i18next from 'i18next';
import _ from 'lodash';

import loginCN from './zh-CN/loginCN.json';

i18next.init({
    debug:true,
    lng:'zh-CN',
    returnObjects:true,
    resources:{
        'en-US': {
            //translation: _.merge(loginCN)
        },
        'zh-CN': {
            translation: loginCN
        }
    }
}, (err, t)=>{
    console.log('i18n inted.');
});

export default i18next;