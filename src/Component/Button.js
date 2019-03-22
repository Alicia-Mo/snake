import React from "react";
import '../css/Button.css'

class Button extends React.Component {
    render(){
        return(
            <button id={this.props.id} className={'game_button'} onClick={this.props.updateState} disabled={this.props.disabled}>{this.props.text}</button>
        )
    }

}

export default Button