import {action, observable, computed, transaction} from 'mobx';
import _ from 'lodash';
import utils from 'utils';
import Storage from 'Storage';

let STORAGE_KEY = 'sidebar.status';

class SidebarStore {
    //左侧菜单项的状态，折叠与否
    @observable status = Storage.getItem(STORAGE_KEY) || 'normal';
    //当前打开的菜单项
    @observable active;
    //左侧菜单栏打开的父菜单项
    @observable opened;

    menus = InitData.menus;

    @computed get isFolded(){
        return this.status === 'mini'; //默认给normal状态
    }

    @action
    toggleOpened = (menu)=>{
        this.opened = this.opened === menu.path ? '' : menu.path;
    }

    @action
    toggleStatus = ()=>{
        this.status = this.isFolded ? 'normal' : 'mini';
        //左侧菜单折叠和展开时触发resize事件让右侧表格等刷新一下
        utils.resize();
        Storage.setItem(STORAGE_KEY, this.status);
    }

    @action
    selectMenu = (menu, active)=>{
        transaction(()=>{
            this.opened = menu.path;
            this.active = active;
        });
    }
}

export default new SidebarStore();