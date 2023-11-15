import React, { useReducer, useContext, createContext } from 'react';
 
const StateContext = createContext<any>({});
 
export const StateProvider = (props: { children: any; initialState: any; reducer: any}) => {
    return (
        <StateContext.Provider value={useReducer(props.reducer, props.initialState)}>
            {props.children}
        </StateContext.Provider>
    );
};

export const useStateProvider = () => useContext(StateContext)