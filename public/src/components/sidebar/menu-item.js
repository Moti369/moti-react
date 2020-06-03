import React from 'react'; import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import hashHistory from '../../../../js/hashHistory';
import { withRouter, matchPath } from 'react-router-dom';

@withRouter
export default class extends React.PureComponent{
    static propTypes = {
        menu: PropTypes.object.isRequired,
        path: PropTypes.string,
        opened: PropTypes.string,
        active: PropTypes.object,
        onMenuClicked: PropTypes.func.isRequired
    };

    hasChild = ()=>{
        let {menu} = this.props;
        return menu && menu.subMenus && menu.subMenus.length > 0;
    }
    isActive = (menu)=>{
        let {location} = this.props;
        return !!matchPath(location.pathname, {
            path: menu.path,
            exact: menu.exact === void 0? true: menu.exact,
            strict: menu.strict === void 0? false: menu.strict
        })
    }
    isOpened = ()=>{
        let {menu} = this.props;
        return this.hasChild() && this.props.opened === menu.path;
    }
    isChildActive = ()=>{
        let {menu} = this.props;
        return _.some(menu.subMenus, (subMenu)=>{
            return this.isActive(subMenu);
        });
    }

    onMenuClicked = (e)=>{
        let {menu} = this.props;
        if(this.hasChild()){
            e.preventDefault();
            this.props.onMenuClicked(menu);
        }else{
            hashHistory.push(menu.path);
            this.props.onMenuClicked(menu, menu);
        }
    }

    onSubMenuClicked = (e, subMenu)=>{
        let {location, menu} = this.props;
        var match = matchPath(location.pathname, {
            path: menu.path,
            exact: menu.exact === void 0? true: menu.exact,
            strict: menu.strict === void 0? false: menu.strict
        });
        match = match || {params: {}};
        var path = subMenu.path.replace(/\/\:([^\/]+)/g, function (t, name) {
            return '/' + (match.params[name] || '0');
        });
        hashHistory.push(path);
        this.props.onMenuClicked(menu, subMenu);
    }

    render(){
        let {menu} = this.props;
        let hasChild = this.hasChild();
        let isOpened = this.isOpened();
        let isActive = this.isActive(menu);
        let isChildActive = this.isChildActive();
        let active = false;
        if (!isChildActive && !isActive) {
            if (this.isActive(Object.assign({}, menu, {exact: false, strict: false}))) {
                active = true;
            }
        } else {
            active = isChildActive? false: isActive;
        }
        let className = classnames({
            'menu-dropdown': hasChild,
            'active': active,
            'open': isOpened,
            'child-active': isChildActive,
        });

        return (
            <li className={className}>
                <a href="javascript:void(0);" onClick={this.onMenuClicked}>
                    <i className={classnames('menu-icon', 'cloud-icon-' + menu.name)}></i>
                    <span className="menu-text"> {menu.text} </span>
                    <If condition={ hasChild }>
                        <i className="menu-expand icon-arrow-small-right"></i>
                    </If>
                </a>
                <If condition={ hasChild }>
                    <ul className="submenu">
                        <For index="index" each="subMenu" of={menu.subMenus}>
                            <li key={index}
                                name={subMenu.name}
                                className={classnames({'active': this.isActive(subMenu)})}
                                onClick={(e) => this.onSubMenuClicked(e, subMenu)}>
                                <a href="javascript:void(0);">
                                    <span className="menu-text">{subMenu.text}</span>
                                </a>
                            </li>
                        </For>
                    </ul>
                </If>
            </li>
        );
    }
}