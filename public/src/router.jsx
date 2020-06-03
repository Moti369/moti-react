/* eslint-disable react/jsx-no-undef */
import React from 'react'; 
import PropTypes from 'prop-types';
import { Route, Router, Switch, Redirect, withRouter } from 'react-router-dom';
import _ from 'lodash';
//import DevTools from 'mobx-react-devtools';

// import hashHistory from '../../js/hashHistory';

// import { Loadable, AlertWrapper, ConfirmWrapper } from 'hrone-react';

// import Header from './components/header/index.jsx';
// import Sidebar from './components/sidebar/index.jsx';
// import ModuleWrapper from './components/module-wrapper.jsx';
// import Unlock from './components/unlock/index.jsx';

import Home from './modules/home/index.jsx';


// let components = {
//     "home": Home,
// };



// InitData.menus.forEach(function(menu){
//     menu.path = '/' + menu.name;
//     if(!menu.subMenus) return;
//     menu.subMenus.forEach(function(subMenu){
//         subMenu.path = menu.path + '/' + subMenu.name;
//         subMenu.name = menu.name + '.' + subMenu.name;
//     });
// });

// let menus = _.chain(InitData.menus)
//     .map(function(menu){
//         if(menu.subMenus && menu.subMenus.length > 0){
//             return menu.subMenus
//         }
//         return menu;
//     })
//     .flatten()
//     .value();

let MainWithRouter = withRouter(class Main extends React.PureComponent {

    static childContextTypes = {
        //获取当前页面的地址
        location: PropTypes.object,
    }

    getChildContext() {
        return {
            //获取当前页面的地址
            location: this.props.location,
        }
    }   
    render() {
        let props = this.props;
        let module = 'module' + props.location.pathname.replace(/\//g, '-');
        return (
            <div className="layout-responsive-left-fixed page-container">
                <div className="page-content">  
                    <Switch>
                        <For each="menu" of={menus}>
                            <Route {...menu}
                                    key={menu.name}
                                    exact={true}
                                    component={_.get(components, menu.name)} />
                        </For>
                    </Switch>
                        
                    
                </div>
            </div>
            
        );
    }
});

export default (
    <Router history={hashHistory}>
        <MainWithRouter />
    </Router>
);
