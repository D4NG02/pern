import { reducerCases } from "./Constant"

export const initialState = {
    row: null,
    country: '',

    // For card feature
    cardType: null,
    
    // EVENT
    popupEventAdd: false,
    popupEventEdit: false,
    popupEventHover: false,
    eventID: null,
    eventDate: null,
    eventTitle: null,
    eventNote: null,
    eventPrio: null,
}

export const initialStateType = typeof initialState

const reducer = (state: any, action: any) => {
    switch (action.type) {
        // Menu feature ???
        case reducerCases.SET_CARD:
            return {
                ...state, cardType: action.cardType
            }
            
        // Task 1 set row number
        case reducerCases.SET_ROW:
            return {
                ...state, row: action.row
            }
        // Task 1 set country
        case reducerCases.SET_COUNTRY:
            return {
                ...state, country: action.country
            }

        // Task 2 popup
        case reducerCases.SET_IS_EVENT_ADD:
            return {
                ...state, 
                popupEventAdd: action.popupEventAdd,
            }
        case reducerCases.SET_IS_EVENT_EDIT:
            return {
                ...state, 
                popupEventEdit: action.popupEventEdit,
            }
        case reducerCases.SET_IS_EVENT_HOVER:
            return {
                ...state, 
                popupEventHover: action.popupEventHover,
            }

        // Task 2 current event data
        case reducerCases.SET_EVENT_ID:
            return {
                ...state, 
                eventID: action.eventID,
            }
        case reducerCases.SET_EVENT_DATE:
            return {
                ...state, 
                eventDate: action.eventDate,
            }
        case reducerCases.SET_EVENT_TITLE:
            return {
                ...state, 
                eventTitle: action.eventTitle,
            }
        case reducerCases.SET_EVENT_NOTE:
            return {
                ...state, 
                eventNote: action.eventNote,
            }
        case reducerCases.SET_EVENT_PRIO:
            return {
                ...state, 
                eventPrio: action.eventPrio,
            }
        default:
            console.log("Error reducerCases type")
            break;
    }
}

export default reducer