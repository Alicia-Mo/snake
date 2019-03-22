import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Component/App'
import {Provider} from "mobx-react";
import mSnakeGame from "./Metier/SnakeGame";

// ========================================
const SNAKE_GAME = new mSnakeGame()
ReactDOM.render(
    <Provider store={SNAKE_GAME} snake={SNAKE_GAME.engine}>
        <App />
    </Provider>,
    document.getElementById('root')
);