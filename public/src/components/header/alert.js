import {observable} from 'mobx';

class AlertStore {
    @observable messages = [];

    constructor(alert){
        this.messages = alert.messages;
    }
}

let messages = [{
    key: 'message0001',
    department: '奥特曼队',
    date: '2016/07/20',
    title: '关于国庆节放假的通知',
    content: '今年过节不放假，统一去打小怪兽。',
    photoUrl: 'http://img5.imgtn.bdimg.com/it/u=4230438925,985959782&fm=21&gp=0.jpg'
},{
    key: 'message0002',
    department: '小怪兽队',
    date: '2016/07/20',
    title: '关于国庆节放假的通知',
    content: '今年过节放假10天，急死奥特曼。',
    photoUrl: 'http://img5.imgtn.bdimg.com/it/u=4230438925,985959782&fm=21&gp=0.jpg'
},{
    key: 'message0003',
    department: '啦啦队',
    date: '2016/07/20',
    title: '关于国庆节放假的通知',
    content: '今年过节坐看奥特曼打小怪兽，奥特曼打小怪兽，奥特曼打小怪兽，重要的事情说三遍。',
    photoUrl: 'http://img5.imgtn.bdimg.com/it/u=4230438925,985959782&fm=21&gp=0.jpg'
}];

export default new AlertStore({
    messages: messages
});