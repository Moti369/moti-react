import React from 'react'; import PropTypes from 'prop-types';
import classnames from 'classnames';
import {observer} from 'mobx-react';

import './index.less';

import Alert from './alert.jsx';
import Setting from './setting.jsx';

import sidebar from '../sidebar/index.js';

@observer
export default class extends React.PureComponent{
    render(){
        let sidebarClass = classnames({
            'sidebar-collapse': true,
            'active': sidebar.isFolded,
        });
        return (
            <div className={`hr1-header ${sidebar.status}`}>
                <div className="header-middle" onClick={sidebar.toggleStatus}>
                    <div className="sidebar-collapse">
                        <span className="collapse-icon icon-three"></span>
                    </div>
                </div>
                <div className="header-right">
                    <Alert />
                    <Setting />
                </div>
            </div>
        );
    }
};