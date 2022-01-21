const updateGameParams = (state, action) => {
    if(state === undefined) {
        return {
            listClicks: [],
            difficultyCheckbox: ['defaultChecked', false, false],
            difficulty: 1500,      
            finishText: 'game-block__lose',
            successText: 'game-block__success'
        }
    }

    switch (action.type) {
        case 'WRITE_LIST_CLICKS': 
            return {
                ...state.gameParams,
                listClicks: action.payload,
            }
        case 'CLEAR_WRONG_MOVE_TEXT':
            return {
                ...state.gameParams,
                finishText: 'game-block__lose'
            }
        case 'CLEAR_SUCCESS_TEXT':
            return {
                ...state.gameParams,
                successText: 'game-block__success'
            }
        case 'SHOW_SUCCESS_TEXT':
            return {
                ...state.gameParams,
                successText: 'game-block__success-show'
            }
        case 'CHANGE_DIFFICULTY':
            let opo  = [];
            let difficulty = ''
            switch(action.payload){
                case 'difficultyChoice-1':
                    opo = ['defaultchecked', false, false];
                    difficulty = 1500
                    break;
                case 'difficultyChoice-2':
                    opo = [false, 'defaultchecked', false];
                    difficulty = 1000
                    break;
                case 'difficultyChoice-3':
                    opo = [false, false, 'defaultchecked'];
                    difficulty = 500
                    break;
                default: return null
            }
            return {
                ...state.gameParams,
                difficulty,
                difficultyCheckbox: opo
            }
        case 'FINISH_GAME':
            return {
                ...state.gameParams,
                finishText: 'game-block__lost-show',
                clicksAvailable: ''
            }
        default: return state.gameParams
    }
}

export default updateGameParams