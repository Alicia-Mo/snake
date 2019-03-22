import React from "react";
import '../css/Score.css'

class Score extends React.Component {
    render(){
        return(
            <React.Fragment>
            <div className={'score'}> {this.props.points} points </div>
                {localStorage.getItem('best_score') !== null && (
                    <div className={'score best-score'}>Meilleur score : {localStorage.getItem('best_score')}</div>
                )}
            </React.Fragment>
        )
    }
}
export default Score