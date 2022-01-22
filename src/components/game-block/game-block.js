import React from "react";
import { connect } from "react-redux";
import { useState } from "react";
import { writeListClicks,changeDifficulty, finishGame, clearWrongMoveText, clearSuccessText, showSuccessText } from "../../actions";
import useSound from 'use-sound';
import {sound1, sound2, sound3, sound4} from '../sounds';
import RoundCount from "../round-count";
import DifficultyLevel from "../difficulty-level";
import StartButton from '../start-button';

const GameBlockContainer = (props) => {
    //const of clicks colours
    const [basedRed, onClickRed] = useState('');
    const [basedGreen, onClickGreen] = useState('');
    const [basedBlue, onClickBlue] = useState('');
    const [basedYellow, onClickYellow] = useState('');

    // number of current round
    const [round, setNextRound] = useState(1)

    //number of current move
    const [currentMoveNumber, nextMoveNumber] = useState(0);

    const [clicksAvailable, setClicksAvailable] = useState('');
    const [statusOfButton, changeStatusOfButton] = useState('ready');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    //the game in in progress
    const [duringGame, setDuringGame] = useState(false);

    const [lastRound, setLastRound] = useState(0);
    const [playSound1] = useSound(sound1);
    const [playSound2] = useSound(sound2);
    const [playSound3] = useSound(sound3);
    const [playSound4] = useSound(sound4);

    const {difficulty, difficultyCheckbox, listClicks } = props.gameParams;
    const {writingListClicks, onChangeDifficulty,  clearWrongMoveText, showSuccessText,  clearSuccessText, wrongMove} = props;
    let listOfClicks = [];

    // user press start, creating random list of clicks 
    const onStartButtonClick = () => {
        
        let currentRound = round;
        //list of clicks to null
        let newListofClicks = [];
        listOfClicks = [];      
        if(duringGame) { setNextRound(1); currentRound=1 }

        //change button text
        changeStatusOfButton('in process');
        //hide text of success prev round
        clearSuccessText();
        
        //do button inactive during writing random clicks
        setButtonDisabled(true);
        // update number of current move
        nextMoveNumber(0);
        
        // hide text of wrong move
        clearWrongMoveText()        

        //create function with interval between random clicks
        let createClicksList =  setInterval( () => {
            let randomNumber = String(Math.floor(Math.random() * (4)) + 1);

            findNumberOfClick(randomNumber, newListofClicks, difficulty-200);          
           //checking count of clicks
            if(newListofClicks.length === currentRound) {
                // write list of random clicks
                writingListClicks(newListofClicks);
                // user can clicks at carousel
                setClicksAvailable('available');
                // clear interval of do clicks
                clearInterval(createClicksList);
                // change button text to Restart
                changeStatusOfButton('in process');
                //do button active
                setButtonDisabled(false);                
                setDuringGame(true);
            }
        }, difficulty)
    }

    // user click on the buttons
    function onClickButton(event) {
        findNumberOfClick(event.target.id, listOfClicks, 500)
       // user click at the right carousel button
       if (event.target.id === listClicks[currentMoveNumber]) {           
           nextMoveNumber(currentMoveNumber + 1);

           //finish this round of the game
           if (currentMoveNumber + 1 === round) { 
               setNextRound(round + 1);
               setClicksAvailable('')
               changeStatusOfButton('ready');
               showSuccessText();
               setDuringGame(false)
            } 
       }

       //used did wrong move, the game is over
       else {setClicksAvailable(''); wrongMove(); setDuringGame(false); setLastRound(round); setNextRound(1)}
    } 

    // uni function to find number of click and do effect of click
    function findNumberOfClick(target, list, ms) {

        //little pause after click effect
        function outClicked(fu){
            setTimeout(() => fu(''), ms)
        }    

        switch(target) {
            case('2'):
                playSound1()
                onClickRed('red-clicked');
                list.push(...target);
                outClicked(onClickRed);
                break;
            case('1'):
                playSound2()
                onClickBlue('blue-clicked');
                list.push(...target);
                outClicked(onClickBlue)
                break;
            case('3'):
                playSound3()
                onClickYellow('yellow-clicked');
                list.push(...target);
                outClicked(onClickYellow)
                break;
            case('4'):
                playSound4()
                onClickGreen('green-clicked');
                list.push(...target);
                outClicked(onClickGreen)
                break;            
            default: return null
       }
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
                <StartButton statusOfButton={statusOfButton} onStartButtonClick={onStartButtonClick} buttonDisabled={buttonDisabled} lastRound={lastRound}/>
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


export default React.memo(connect(mapStateToProps, mapDispatchToProps)(GameBlockContainer))