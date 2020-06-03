import React from 'react'; import PropTypes from 'prop-types';
import {translate} from 'react-i18next';

import alert from './alert.js';

//let Favicon = require('favico.js');

@translate()
export default class extends React.PureComponent{
    readThisMessage = (e)=>{

    }

    readAllMessage = (e)=>{

    }

    render(){
        // var favicon = new Favicon({
        //     animation: 'slide'
        // });
        // favicon.badge(1);
        return null;
        // let {t} = this.props;
        // return (
        //     <div className="header-alert">
        //         <span className="icon-alert"></span>
        //         <If condition={alert.messages.length}>
        //             <span className="hr1-badge">{alert.messages.length}</span>
        //         </If>
        //         <div className="hr1-message">
        //         <ul>
        //             <For each="item" of={alert.messages}>
        //                 <li key={item.key} onClick={this.readThisMessage}>
        //                     <img className="detail-photo" src={item.photoUrl} />
        //                     <div className="message-detail">
        //                         <div className="detail-author">
        //                             <span className="detail-department">{item.department}</span>
        //                             <span className="detail-date">{item.date}</span>
        //                         </div>
        //                         <div className="detail-title">{item.title}</div>
        //                         <div className="detail-content">{item.content}</div>
        //                     </div>
        //                 </li>
        //             </For>
        //             <li className="message-button" onClick={this.readAllMessage}>
        //                 <a href="#">{t('message.view-all-messages')}</a>
        //             </li>
        //         </ul>
        //     </div>
        //     </div>
        // );
    }
}