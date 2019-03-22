import React from "react";
import Board from './Board';
import Score from './Score';
import Button from './Button';
import Level from  './Level';
import '../css/Gameboard.css'
import {inject, observer} from "mobx-react";

@inject('store','snake')
@observer class Gameboard extends React.Component {
    constructor(props){
        super(props)

    }

    /*
    componentDidMount() {
        window.addEventListener('keydown',this.captureKeys,true)
    }

    captureKeys(evt){
        if(evt.code === 'Space'){
            if(this.props.store.state === 'NEW_GAME'){
                this.startGame()
            } else {
                this.stopGame()
            }
        }
        if(evt.key === 'Alt'){
            this.resetGame()
        }
    }
    */

    setLevel = (level) => {
            this.props.store.level = level
        console.log('store lvl', this.props.store.level)
    }

    startGame = () => {
        this.props.store.start()
        this.props.snake.createNewFood()
    }

    stopGame = () => {
        this.props.store.pause()
    }

    resetGame =() => {
        this.props.store.reset()
    }

    render() {
        const onGoing = this.props.store.state === 'NEW_GAME' ? false : true
        //console.log('state', this.props.store.state)
        return (
            <div className="game">
                <Board />
                <div id={'buttons'} style={{width:`${this.props.store.size*10+(this.props.store.size/2*10)}px`}}>
                    <div className={'snake-buttons-bg'}></div>
                    <div className={'snake-buttons-side left'}></div>
                    <div className={'snake-buttons-side right'}></div>
                    {onGoing ? (
                        <Button id={'stop'} text={`${this.props.store.state === 'PAUSED' ? 'Play' : 'Pause'}`} updateState={this.stopGame}/>
                    ) : (<Button id={'start'} text={'Start'} updateState={this.startGame} disabled={onGoing}/>)}
                    <Button id={'reset'} text={`Reset`} updateState={this.resetGame}/>
                    <Level level={this.props.store.level} minL={this.props.store.minLevel} maxL={this.props.store.maxLevel} setLevel={this.setLevel} isDisabled={this.props.store.state === 'NEW_GAME'}/>
                    <div className={'snake-bottom'}></div>
                    <div className={'snake-bottom-side left'}></div>
                    <div className={'snake-bottom-side right'}></div>
                </div>
                <Score points={this.props.store.score} />

            </div>
        );
    }
}

export default Gameboard;