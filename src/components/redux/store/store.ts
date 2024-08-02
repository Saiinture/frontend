import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configSlice } from "./config/config.slice";
import { movesSlice } from "./moves/moves.slice";
import { gameSlice } from "./game/game.slice";
import {gameDataSlice} from "./game-data/gameData.slice.ts";

const persistConfig = {
    key: 'chess-game-root',
    storage, 
    whitelist: ['config', 'game'],
}

const rootReducer = combineReducers({
    config: configSlice.reducer,
    moves: movesSlice.reducer,
    game: gameSlice.reducer,
    gameData: gameDataSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
});

export const persistor = persistStore(store);

export type TypeRootState = ReturnType<typeof rootReducer>;
