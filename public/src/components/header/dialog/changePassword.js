import {observable, action} from 'mobx';
import V from 'Validator';
import {ajax} from 'hrone-react';
import i18next from 'i18next';

class AlertStore extends V.BaseStore {
    @observable oldPassword = '';
    @observable newPassword = '';
    @observable confirmPassword = '';

    @action
    clear = () => {
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
    }

    @observable visible = false;

    @action
    onHidden = () => {
        this.visible = false;
       
        this.clearValidationResult();

    }
    @action
    onShow = () => {
        this.visible = true;
        this.clear();
    }
    @action
    newPasswordChange = (value) => {
        this.newPassword = value.trim();
    }
    @action
    confirmPasswordChange = (value) => {
        this.confirmPassword = value.trim();
    }
    
    onSubmit = () => {
        if(this.validate()){
            let data = {
                userId:InitData.user.id,
                oldPassword:this.oldPassword,
                newPassword: this.newPassword, 
            }
            ajax.post('/changePassword', data).then(action(()=>{
                this.visible = false;
                window.$feedback(i18next.t('message.save.success'), 'success');
            }))
        }
    }

    getValidationConfig() {
        return {
            oldPassword: {
                required: true,
            },
            newPassword: {
                required: true,
            },
            confirmPassword: {
                assert: (value) => {
                    return value === this.newPassword
                },
                messages: {
                    assert: '再次输入的密码不一致'
                },
            },
           
        }
    }

   
}

export default  new AlertStore();