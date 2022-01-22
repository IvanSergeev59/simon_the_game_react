import React, {Fragment} from "react";
import { connect } from "react-redux";


const StartButton = (props) => {
    const {statusOfButton, onStartButtonClick, buttonDisabled, lastRound} = props;
    const {finishText, successText} = props.gameParams
    
    let buttonText=''
    statusOfButton === 'ready' ? buttonText='Start' : buttonText='Restart';
    return (
        <Fragment>
            <button onClick={onStartButtonClick} disabled={buttonDisabled}>{buttonText} </button>
            <p className={finishText}>Unfortunately you made the wrong move!<br/> Your result: {lastRound} level(s)</p>
            <p className={successText}>This round is completed!<br/>Press Start to continue</p>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(StartButton)