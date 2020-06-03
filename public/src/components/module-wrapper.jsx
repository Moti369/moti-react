import React from 'react'; 


export default class ModuleWrapper extends React.PureComponent{
    render(){
        return(
            <div className="module-wrapper">
                {this.props.children}
            </div>
        )
    }
}