import React, { Fragment } from "react";
import { connect } from "react-redux";
import { useState } from "react";
import { writeListClicks,changeDifficulty, finishGame, clearWrongMoveText, clearSuccessText, showSuccessText } from "../../actions";
import useSound from 'use-sound';
import {sound1, sound2, sound3, sound4} from '../sounds';
import RoundCount from "../round-count";
import DifficultyLevel from "../difficulty-level";
console.log('render')

const GameBlockContainer =(props) => {
    console.log('render mainBlock')
    const [basedRed, onClickRed] = useState('');
    const [basedGreen, onClickGreen] = useState('');
    const [basedBlue, onClickBlue] = useState('');
    const [basedYellow, onClickYellow] = useState('');
    const [round, setNextRound] = useState(1)
    const [listId, updateListId] = useState([]);
    const [currentMoveNumber, nextMoveNumber] = useState(0);
    const [clicksAvailable, setClicksAvailable] = useState('');
    const [statusOfButton, changeStatusOfButton] = useState('ready');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [duringGame, setDuringGame] = useState(false);
    const [lastRound, setLastRound] = useState(0);
    const [playSound1] = useSound(sound1);
    const [playSound2] = useSound(sound2);
    const [playSound3] = useSound(sound3);
    const [playSound4] = useSound(sound4);


   const {difficulty, difficultyCheckbox, listClicks, finishText, successText} = props.gameParams;
   const {writingListClicks, onChangeDifficulty,  clearWrongMoveText, showSuccessText,  clearSuccessText, wrongMove} = props;
  

    // user press start, creating random list of clicks 
    function onButtonClick() {
        let currentRound = round;
        if(duringGame) { setNextRound(1);currentRound=1 }

        changeStatusOfButton('in process');
        //hide text of success prev round
        clearSuccessText();
        // 
        updateListId([]);
        //do button inactive during writing random clicks
        setButtonDisabled(true);
        // update number of current move
        nextMoveNumber(0);
        let i = 0;
        // hide text of wrong move
        clearWrongMoveText()
        //a little pause after click on the button
        function outClicked(fu){
            setTimeout(() => fu(''), difficulty-200)
        }
        let newListId = [];

        //create function with interval between random clicks
        let createClicksList =  setInterval( () => {
            let randomNumber = Math.floor(Math.random() * (4)) + 1;

            switch(randomNumber) {
                // firstly - add additional class, then add id to arr, then remove additional class
                case(2):
                    onClickRed('red-clicked');
                    newListId.push(...'2');
                    outClicked(onClickRed);
                    playSound1()
                    break;
                case(1):
                    onClickBlue('blue-clicked');
                    newListId.push(...'1');
                    playSound2()
                    outClicked(onClickBlue)
                    break;
                case(3):
                    onClickYellow('yellow-clicked');
                    newListId.push(...'3');
                    playSound3()
                    outClicked(onClickYellow)
                    break;
                case(4):
                    onClickGreen('green-clicked');
                    newListId.push(...'4');
                    playSound4()
                    outClicked(onClickGreen)
                    break;
                
                default: return null
           }
           i++;
           //checking count of clicks
            if(i===currentRound) {
                // write list of random clicks
                writingListClicks(newListId);
                // user can clicks at carousel
                setClicksAvailable('available');
                // clear interval of do clicks
                clearInterval(createClicksList);
                // change button text to Restart
                changeStatusOfButton('in process');
                //do button active
                setButtonDisabled(false);                
                console.log('Заданная комбинация', newListId);
                setDuringGame(true);
            }
        }, difficulty)
    }

    // user click on the buttons
    function onClickButton(event) {
        console.log('Текущая комбинация', listId)
        function outClicked(fu){
            setTimeout(() => fu(''), 500)
        }
        switch(event.target.id) {
            case('2'):
                playSound1()
                onClickRed('red-clicked');
                listId.push(...event.target.id);
                outClicked(onClickRed);
                break;
            case('1'):
                playSound2()
                onClickBlue('blue-clicked');
                listId.push(...event.target.id);
                outClicked(onClickBlue)
                break;
            case('3'):
                playSound3()
                onClickYellow('yellow-clicked');
                listId.push(...event.target.id);
                outClicked(onClickYellow)
                break;
            case('4'):
                playSound4()
                onClickGreen('green-clicked');
                listId.push(...event.target.id);
                outClicked(onClickGreen)
                break;            
            default: return null
       }
       // user click at the right carousel button
       if (event.target.id === listClicks[currentMoveNumber]) {           
           nextMoveNumber(currentMoveNumber + 1);
           if (currentMoveNumber + 1 === round) { 
               setNextRound(round + 1);
               setClicksAvailable('')
               changeStatusOfButton('ready');
               showSuccessText();
               setDuringGame(false)
            } 
       }

       else {setClicksAvailable(''); wrongMove(); setDuringGame(false); setLastRound(round); setNextRound(1)}
    }   

    const StartButton = () => {
        let buttonText=''
        statusOfButton === 'ready' ? buttonText='Start' : buttonText='Restart';
        return (
            <Fragment>
                <button onClick={onButtonClick} disabled={buttonDisabled}>{buttonText} </button>
                <p className={finishText}>Unfortunately you made the wrong move!<br/> Your result: {lastRound} level(s)</p>
                <p className={successText}>This round is completed!<br/>Press Start to continue</p>
            </Fragment>
        )
    }

 
    return (
        <div className="game-block">            
                <ul onClick={onClickButton}>
                <div className={`game-block__window ${clicksAvailable}`}></div>
                    <li className={`game-block__blue ${basedBlue}`} id="1"></li>
                    <li className={`game-block__red ${basedRed}`} id="2"></li>
                    <li className={`game-block__yellow ${basedYellow}`} id="3"></li>
                    <li className={`game-block__green ${basedGreen}`} id="4"></li>                    
                </ul>            
            <div className="game-block__right-side">
                <RoundCount round={round}/>
                <StartButton />
                <DifficultyLevel onChangeDifficulty={onChangeDifficulty} difficultyCheckbox={difficultyCheckbox}/>
            </div>
            
        </div>
        )    
    }   

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps =(dispatch) => {      
    return {
      writingListClicks: (data) => dispatch(writeListClicks(data)),
      onChangeDifficulty: (item) => dispatch(changeDifficulty(item)),
      clearSuccessText: () => dispatch(clearSuccessText()),
      wrongMove: () => dispatch(finishGame()),
      clearWrongMoveText: () => dispatch(clearWrongMoveText()),
      showSuccessText: () => dispatch(showSuccessText())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(GameBlockContainer)