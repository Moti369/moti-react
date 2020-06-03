import React from 'react'; import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {observer} from 'mobx-react';
import {observable, action} from 'mobx';

import {translate} from 'react-i18next';

import setting from './setting.js';
import Profile from './profile.jsx';

import changePasswordStore from './dialog/changePassword.js';
import './changePassword.less'

@translate()
@observer
export default class extends React.PureComponent{
    changeLanguage = (e) =>{
        let lang = e.target.getAttribute('lang');
        setting.changeLanguage(lang);
    }

    render() {
        let {t} = this.props;
        return (
            <div className="header-setting">
                <Profile/>
                <div className="hr1-dropdown fat no-gap">
                    <ul>
                        {/*<li>
                            <span className="icon-earth">
                                {t('setting.language')}
                            </span>
                            <ul className="left" style={{width:'110px'}}>
                                <li lang="zh-CN" onClick={this.changeLanguage}>简体中文</li>
                                <li lang="en-US" onClick={this.changeLanguage}>English</li>
                            </ul>
                        </li>*/}
                        <li>
                            <span className="cloud-icon-change-password" onClick={changePasswordStore.onShow}>
                                修改密码
                            </span>
                        </li>
                        <li>
                            <span className="icon-logout" onClick={setting.logout}>
                                {t('setting.sign-out')}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}