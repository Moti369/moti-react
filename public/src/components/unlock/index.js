import {observable, action, when} from 'mobx';

import ajax from 'ajax';

class UnlockStore extends BaseStore{
    //密码
    @observable password = '';

    //是否显示解锁窗口
    @observable visible = false;
    @action
    show = (callback)=>{
        this.visible = true;
        //当解锁成功之后，调用回调函数，并且自动取消监听
        when(()=>!this.visible, callback);
    }
    @action
    hide = (result)=>{
        this.visible = false;
        this.password = '';
        window.localStorage.setItem('token', result && result.token || '');
    }

    unlock = ()=>{
        let data = {
            userName: window.localStorage.getItem('login.userName'),
            password: this.password,
            language: 'zh-CN',
        };
        ajax.post('/login/validateLogin', data).then(this.hide);
    }
    logout = ()=>{
        window.location = process.env.URL.login;
    }

    getValidationConfig(){
        return {};
    }
}

//暂时为了不让登录页面引入过多无用文件，暂时先使用全局变量
let unlock = window.unlock = new UnlockStore();
export default unlock;