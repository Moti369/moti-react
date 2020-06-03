import React from 'react'; import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {translate} from 'react-i18next';
import classnames from 'classnames';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

import MenuItem from './menu-item.js';
import store from './index.js';

@translate()
@observer
export default withRouter(class extends React.PureComponent{
    onMenuClicked = (menu, submenu)=>{
        if(submenu){
            store.selectMenu(menu, submenu);
        }else{
            store.toggleOpened(menu);
        }
    }

    render(){
        let {t} = this.props;
        let clazz = classnames({
            'page-sidebar': true,
            'no-scrollbar': true,
            'menu-compact': store.isFolded,
        });
        return (
            <div className={clazz}>
                <div className="sidebar-menu-wrapper">
                    <div className="header-icon-left"></div>
                    <ul className="nav sidebar-menu" ref="sidebarMenu">
                        <For index="index" each="menu" of={store.menus}>
                            <MenuItem
                                menu={menu}
                                key={index}
                                active={store.active}
                                opened={store.opened}
                                onMenuClicked={this.onMenuClicked} />
                        </For>
                    </ul>
                </div>
            </div>
        );
    }
});