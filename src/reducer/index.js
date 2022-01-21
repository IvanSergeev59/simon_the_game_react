import updateGameParams from "./update-game-params";

const reducer = (state, action) => {
    return {
        gameParams: updateGameParams(state, action)
    }
}

export default reducer