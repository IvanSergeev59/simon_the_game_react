import React from "react";
import Header from "../header";
import CreatedBy from "../created-by";
import { Provider } from "react-redux";
import store from "../../store";
import  GameBlockContainer from "../game-block/game-block";
const App = () => {
    
    return (
        <Provider store={store}>
            <Header />
            <GameBlockContainer />
            <CreatedBy />
        </Provider>
    )
}

export default App