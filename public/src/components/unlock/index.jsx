import React from 'react'; import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {translate} from 'react-i18next';

import {Form,Button,Input} from 'antd';

import './index.less';
import store from './index.js';

@translate()
@observer
export default class extends React.PureComponent{
    render(){
        if(!store.visible) return null;
        let {t} = this.props;
        return (
            <div className="hr1-modal hr1-unlock-wrapper">
                <Form store={store} className="hr1-unlock">
                    <div className="unlock-tips">
                        <span className="icon-exclamatory-circle"></span>
                        {t('unlock.tips')}
                    </div>
                    <div className="unlock-form">
                        <div style={{display: 'none'}}>
                            <input type="text"/>
                            <input type="password"/>
                        </div>
                        <Input field="password" type="password"
                            placeholder={t('unlock.password')}
                            onEnter={store.unlock} />
                        <Button onClick={store.unlock} type="primary">{t('unlock.btn.unlock')}</Button>
                        <Button onClick={store.logout}>{t('unlock.btn.logout')}</Button>
                    </div>
                </Form>
            </div>
        );
    }
}
