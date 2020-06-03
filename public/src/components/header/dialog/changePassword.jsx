import React from 'react'; 
import {Dialog, FieldSet, FormGroup, Input} from 'hrone-react';
import store from './changePassword.js';
import { observer } from 'mobx-react';
import V from 'Validator';

@observer
export default class extends React.PureComponent{
    render(){
        return(
            <Dialog
                title="修改密码"
                visible={store.visible}
                className="modal-medium"
                onHidden={store.onHidden}
                onSubmit={store.onSubmit}
                ref="dialogCustom">
                <V.Form store={store}>
                    <FormGroup title="用户名" layout="horizontal">
                        <Input value={InitData.user.id} readOnly={true} />
                    </FormGroup>
                    <FormGroup title="旧密码" layout="horizontal" required={true}>
                        <V.Input field="oldPassword" type="password" />
                    </FormGroup>
                    <FormGroup title="新密码" layout="horizontal" required={true}>
                        <V.Input field="newPassword" type="password" onChange={store.newPasswordChange}/>
                    </FormGroup>
                    <FormGroup title="确认密码" layout="horizontal" required={true}>
                        <V.Input field="confirmPassword" type="password" onChange={store.confirmPasswordChange}/>
                    </FormGroup>
                </V.Form>
              
            </Dialog>
        )
        
    }
}