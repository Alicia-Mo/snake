import {inject} from "mobx-react";
import Gameboard from "./Gameboard";
import React from "react";

const App = inject('store')(({store}) => (
    <Gameboard game={store}/>
))

export default App
