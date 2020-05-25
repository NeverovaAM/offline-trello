import { createStore, combineReducers } from 'redux';
import { basic } from './basicReducer';
import { loadState, saveState } from '../utils';

const reducer = combineReducers({basic})

const persistedState = loadState()

export const store = createStore(reducer, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.subscribe(() => {
    saveState(store.getState())
})

type RootReducerType = typeof reducer;
export type FullStateType = ReturnType<RootReducerType>