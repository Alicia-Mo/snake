import mPosition from './Position'
import {createBlackBrick,createRandomColorBrick} from "./Brick";
import {observable} from "mobx";

class mSnakeEngine {
    isBlocked = false;
    @observable snake; // tab de bricks
    @observable food = null; // brick
    gridSize;
    initialSize = 5;

    constructor(gridsize = null){
        this.gridSize = gridsize;
        //console.log(this.gridSize)
    }
    move(direction){
        if(this.isBlocked){
            return -1;
        }
        if(this.food === null){
            this.createNewFood();
        }
        let futurHead = this.computeFuturHead(direction)
        // Si le serpent mange la nourriture
        if(futurHead.equals(this.food.position)){
            this.growSnakeWithFood();
            this.createNewFood();
            return 1;
        }
        // Si le serpent se mange
        if(this.snakeIsOn(futurHead)){
            //console.log("BLOQUE");
            this.isBlocked = true;
            return -1;
        }
        // Bouger le serpent
        this.moveSnake(futurHead);
        //console.log(this.snake[this.snake.length - 1].x)
        return 0;
    }

    // Create a new food not on the snake
    // Ceil : plus petit entier supérieur
    // Floor : plus grand entier inférieur ou égal
    createNewFood(){
        // Vérifier si il y a encore de la place
        const T = this.gridSize * this.gridSize; // nb de cases totales
        //console.log(this.gridSize, 'grid in food');
        if(this.snake.length === T){
            return;
        }
        //console.log(T,'T in food')
        //Calculer au hasard un indice entre 0 et T - la taille du serpent
        let i = Math.floor( Math.random() * (T - this.snake.length))
        //console.log(Math.random())
        //console.log(i,'i in food')
        // Tableau d'incice à 1 dimension
        const T2 = this.snake.map(pos => pos.y * this.gridSize + pos.x).sort()
        for(let j = 0; j< T2.length && T2[j] <= i; j++){
            i++
        }
        //console.log('food stuff',i % this.gridSize , Math.floor(i / this.gridSize))
        const p = new mPosition(i % this.gridSize , Math.floor(i / this.gridSize));
        this.food = createRandomColorBrick(p)

    }

    // calcul de la position de la tête du snake
    computeFuturHead(direction){
        const currentHead = this.snake[this.snake.length -1].position;
        switch (direction) {
            case 'up':
                return new mPosition(currentHead.x, currentHead.y === 0 ? this.gridSize - 1 : currentHead.y - 1);
            case 'down':
                return new mPosition(currentHead.x, currentHead.y === this.gridSize - 1 ? 0 : currentHead.y + 1);
            case 'left':
                return new mPosition(currentHead.x === 0 ? this.gridSize - 1 : currentHead.x - 1, currentHead.y);
            case 'right':
                return new mPosition(currentHead.x === this.gridSize - 1 ? 0 : currentHead.x + 1, currentHead.y);
            default:
                throw  'Illegal direction'
        }
    }

    growSnakeWithFood(){
        if (this.food ===null) return;
        this.snake.push(this.food);
        //console.log(this.snake.length-1)
        //this.snake[0].color = this.food.color
        this.snake[this.snake.length-1].color = '#000';

        //console.log(this.snake);
        this.food = null;
    }

    //Retourne un booléen
    snakeIsOn(position){
        //works
        return this.snake.some((brick)=>brick.position.equals(position))
    }

    moveSnake(newHead){
        let i;
        for (i = 0; i < this.snake.length -1; i++){
           this.snake[i].position = this.snake[i+1].position
        }
        this.snake[i].position = newHead
    }

    reset(){
        // Gerer le serpent
        this.snake =  new Array(this.initialSize);
        const y = Math.ceil(this.gridSize / 2);
        //const y = 10;
        const xBase = Math.ceil((this.gridSize - this.initialSize) / 2);
        //const xBase = 0;
        //console.log('x y bas',xBase,y, this.gridSize)
        for (let i=0; i< this.initialSize; i++){
            let p = new mPosition(xBase+i,y);
            this.snake[i] = createBlackBrick(p)
        }
        this.food = null;
        this.isBlocked = false;
    }
}

export default mSnakeEngine;