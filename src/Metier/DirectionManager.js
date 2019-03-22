import {observable} from "mobx";

class mDirectionManager {
    @observable _direction;
    isBlocked = false;

    constructor(){
        this.reset();
        this.startListening();
    }

    startListening(){
        let captureKeyboard = this.captureKeyboard.bind(this)
        window.addEventListener('keydown',captureKeyboard,true)
    }


    captureKeyboard(evt){
        evt.preventDefault();
        if(this.isBlocked === true){
            return;
        }
        if (evt.key === 'ArrowUp' && this._direction !== 'down'){
            this._direction = 'up'
        } else if (evt.key === 'ArrowDown' && this._direction !== 'up'){
            this._direction = 'down'
        }else if (evt.key === 'ArrowLeft' && this._direction !== 'right'){
            this._direction = 'left'
        } else if (evt.key === 'ArrowRight' && this._direction !== 'left'){
            this._direction = 'right'
        }
        this.isBlocked = true;
    }

    reset(){
        this._direction = 'right'
    }

    get direction(){
        return this._direction;
    }
}

export default mDirectionManager