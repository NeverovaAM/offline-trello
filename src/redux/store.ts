import { createStore, combineReducers } from 'redux';
import { basic } from './basicReducer'

const reducer = combineReducers({basic})

export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

type RootReducerType = typeof reducer;
export type FullStateType = ReturnType<RootReducerType>