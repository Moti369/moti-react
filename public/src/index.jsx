import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker,Button } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import ajax from '../src/js/ajax';

moment.locale('zh-cn');
class APP extends React.Component{

    onAdd = (e)=>{
        ajax.get('/changePassword', "1").then((()=>{
            window.$feedback(('message.save.success'), 'success');
        }))
    }

    render(){
        return(
            <div className="container">
                <h1>Antd DatePicker!</h1>
                <DatePicker defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} />
                <Button type="primary" onClick={() => this.onAdd()}>Primary</Button>
            </div>
        )
    }
}

ReactDOM.render(<APP />, document.getElementById('root'));

export default APP;
