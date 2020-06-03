import React from 'react'; import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import user from './profile.js';

@observer
export default class extends React.PureComponent{
    render(){
        return (
            <div className="header-user">
                <div className="user-avatar">
                    <img src={user.avatar || require('../../../../assets/img/user.png')} />
                </div>
                <div className="user-info">
                    <div>{user.name}</div>
                    <div>{user.employeeNo}</div>
                    <div className="header-user-down icon-arrow-small-down" ></div>
                </div>
            </div>
        );
    }
}