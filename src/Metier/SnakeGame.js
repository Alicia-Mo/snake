import mSnakeEngine from "./SnakeEngine";
import mDirectionManager from "./DirectionManager"
import {observable, decorate, computed} from "mobx";

class mSnakeGame {
    @observable state = 'NEW_GAME';
    @observable score = 0;
    @observable _level = 1;
    @observable size = 32;
    @observable maxLevel = 5;
    @observable minLevel = 1;
    engine;
    directionManager;
    intervalId = null;

    constructor(){
        this.engine = new mSnakeEngine(this.size)
        this.directionManager = new mDirectionManager();
        //console.log('Creer')
    }

    start(){
        if (this.state !== 'NEW_GAME' && this.state!== 'PAUSED'){
            return;
        }
        this.intervalId = setInterval(
            ()=>{this.playATurn()},
            this.computeInterval()
        );
        this.state = 'RUNNING'
    }

    pause(){
        switch (this.state) {
            case 'RUNNING' :
                this.stopTurn()
                this.state = 'PAUSED'
                break
            case 'PAUSED' :
                this.start()
                break
            default :
                break
        }
    }

    reset(){
        if (localStorage.getItem('best_score') !== undefined && localStorage.getItem('best_score') < this.score){
            localStorage.setItem('best_score',this.score);
        }
        if (this.state === 'NEW_GAME'){
            return;
        }
        if(this.state === 'RUNNING'){
            this.stopTurn()
        }
        this.engine.reset();
        this.directionManager.reset();
        this.score = 0;
        this.state = 'NEW_GAME';
    }

    @computed get level(){
        return this._level;
    }

    set level(l){
        if (l < this.minLevel || l > this.maxLevel){
            throw 'Invalid Level'
        }
        if (this.state==='RUNNING' || this.state==='PAUSED'){
            return this._level;
        }
        this._level = l;
    }

    playATurn(){
        this.directionManager.isBlocked = false;
        if(this.state !== 'RUNNING'){
            return;
        }
        switch (this.engine.move(this.directionManager.direction)) {
            case 0: // The snake moved
                break;
            case -1:
                this.stopTurn()
                this.state = "GAME_OVER" // The snake bit itself
                break;
            case 1 : // The snake grew
                this.incrementScore()
                break;
            default:
                throw 'Illegal return of snake state'
                break;
        }
    }

    stopTurn(){
        if (this.intervalId != null){
            clearInterval(this.intervalId)
            this.intervalId = null;
        }

    }

    incrementScore(){
        this.score += 5*(this.level+1);
    }

    computeInterval(){
        //console.log('interval',-80 * this.level + 440)
        return -80 * this.level + 440;
    }
}

export default mSnakeGame