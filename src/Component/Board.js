import React from "react";
import Snake from './Snake'
import Brick from './Brick'
import '../css/Board.css'
import {observer,inject} from "mobx-react";

@inject('store','snake')
@observer class Board extends React.Component {
    componentDidMount(){
        this.props.snake.reset()
    }
    render(){
        //console.log('snake',this.props.snake.snake)
        //console.log('food',this.props.snake.food)
        return(

            <div className={'snake-frame'} style={{width:`${this.props.store.size*10+(this.props.store.size/2*10)}px`,height:`${this.props.store.size*10+(this.props.store.size/2*10)}px`}}>
                <div className={'snake-overlay'}></div>
                <div className={'snake-frame-bg'}></div>
                <div className={'snake-top'}><h1 id={'page-title'}>Snake</h1></div>

            <div className="snake-board" style={{width:`${this.props.store.size*10}px`,height:`${this.props.store.size*10}px`}}>
                {this.props.snake.snake !== undefined && this.props.snake.snake !== null ? (
                    <Snake snakeArray={this.props.snake.snake}/>
                ) : null}

                {this.props.snake.food !== null ? (
                    <Brick value={this.props.snake.food}/>
                ) :( null)}

                <div className={`overlay ${this.props.store.state === 'GAME_OVER' ? 'open' : 'close'}`}>
                    <span>Game over</span>
                </div>

            </div>
            </div>
        )
    }

}


export default  Board