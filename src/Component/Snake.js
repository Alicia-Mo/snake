import React from "react";
import '../css/Snake.css'
import Brick from "./Brick"
import {observer} from "mobx-react";

@observer
class Snake extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        //console.log(this.props.snakeArray, 'snakearray')
        return(
            <div id={'snake'}>
                {this.props.snakeArray.map( (brick,index) => {
                   return <Brick key={index} value={brick}/>
                })}
            </div>
        )
    }

}

export default Snake