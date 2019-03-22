import Position from './Position'
import {computed, observable} from "mobx";

//export const COLORS = ['#999999', '#777777', '#888888', '#666666', '#555555']
export const COLORS = ['#003200']

class mBrick  extends Position{
    @observable color;
    constructor(x,y,color){
        super(x,y)
        this.color = color
    }

    set position(p){
        this.x = p.x;
        this.y = p.y;
    }

    @computed get position(){
        return this;
    }

}

export function createBlackBrick(position){
    return new mBrick(position.x,position.y, '#000')
}

export function createRandomColorBrick(position){
    const i = Math.floor(Math.random() * COLORS.length)
    return new mBrick(position.x,position.y, COLORS[i])
}
