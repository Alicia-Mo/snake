import React from "react";
import {observer} from "mobx-react";
import '../css/Brick.css';

@observer
class Brick extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        //console.log(this.props.value);
        //console.log(this.props.value.xPix);
        return(
            <div className="point" style={{left:`${this.props.value.xPix}px`,top:`${this.props.value.yPix}px`, backgroundColor:`${this.props.value.color}`}}></div>
        )
    }

}

export default Brick

//className={`point ${this.props.c}`}