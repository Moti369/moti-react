import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/i18n';
import router from './router';


let app = document.createElement('div');
document.body.appendChild(app);

render(
    <I18nextProvider i18n={i18n}>
        {router}
    </I18nextProvider>, app
);