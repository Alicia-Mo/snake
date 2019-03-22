import React from "react";
import '../css/Level.css';
import {observer} from "mobx-react";

@observer
class Level extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            level: this.props.level
        }
        this.setLevel = this.setLevel.bind(this)
        this.captureKeys = this.captureKeys.bind(this)
    }

    // event listener fait ici pour qu'il passe par la meme fonction setLevel
    componentDidMount() {
        window.addEventListener('keydown',this.captureKeys,true)
    }

    captureKeys(evt){
        if(evt.key === '-'){
            this.setLevel(evt,'down')
        }
        if(evt.key === '+'){
            this.setLevel(evt,'up')
        }
    }

    setLevel = (e,dir) => {
        if(this.props.isDisabled){
        console.log(dir)
        let lvl = this.state.level;
        let newLvl = 1;
        if (dir==='up') {
            newLvl = lvl+1;
        } else if (dir==='down'){
            newLvl = lvl-1;
        }

        if(newLvl <1){
            newLvl = 1;
        }

        if (newLvl > 5){
            newLvl = 5
        }
        this.setState({
            ...this.state,
            level : newLvl
        })
        console.log(newLvl)
        this.props.setLevel(newLvl)
        }
    }

    render(){
        return(
            <div className={'difficulty'}>
                <input type='number' min={this.props.minL} max={this.props.maxL} value={this.state.level} onChange={this.setLevel} disabled={this.props.isDisabled} />
                <div className={'level-buttons'}>
                    <button onClick={(e)=>this.setLevel(e,'up')}>+</button>
                    <button onClick={(e)=>this.setLevel(e,'down')}>-</button>
                </div>
            </div>
        )
    }

}
export default  Level