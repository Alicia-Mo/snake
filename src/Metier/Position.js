import {computed, observable} from "mobx";

export const PIXEL_UNIT = 10

class mPosition {
@observable x = 0;
@observable y = 0;
    constructor(x,y){
        this.x = x
        this.y = y
    }

    @computed get xPix(){
        return this.x * PIXEL_UNIT;
    }
    @computed get yPix(){
        return this.y * PIXEL_UNIT;
    }

    equals(position) {
        //console.log(position,'position');
        return position && position instanceof mPosition
        && this.x === position.x && this.y === position.y
    }
}

export default mPosition