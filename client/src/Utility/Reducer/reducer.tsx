import { reducerCases } from "./Constant"

export const initialState = {
    row: null,
    country: '',
}

export const initialStateType = typeof initialState

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case reducerCases.SET_ROW:
            return {
                ...state, row: action.row
            }
        case reducerCases.SET_COUNTRY:
            return {
                ...state, country: action.country
            }
        default:
            console.log("Error reducerCases type")
            break;
    }
}

export default reducer