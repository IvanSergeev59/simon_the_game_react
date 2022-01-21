const writeListClicks = (data) => {
    return {
        type: 'WRITE_LIST_CLICKS',
        payload: data
    }
}

const changeDifficulty = (item) => {
    return {
        type: 'CHANGE_DIFFICULTY',
        payload: item
    }
}

const finishGame = (item) => {
    return {
        type: 'FINISH_GAME',
        payload: item
    }
}

const clearWrongMoveText = () => {
    return {
        type: 'CLEAR_WRONG_MOVE_TEXT'
    }
}
const clearSuccessText = () => {
    return {
        type: 'CLEAR_SUCCESS_TEXT'
    }
}
const showSuccessText = () => {
    return {
        type: 'SHOW_SUCCESS_TEXT'
    }
}
export {writeListClicks, changeDifficulty, finishGame, clearWrongMoveText, clearSuccessText, showSuccessText}