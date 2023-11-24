import { reducerCases } from "./Constant"

const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
})
const date = dateTimeFormat.formatToParts(new Date)

export const initialState = {
    token: sessionStorage.getItem("token") ? sessionStorage.getItem("token") : null,
    row: null,
    country: '',

    // For card feature
    cardType: null,

    // EVENT
    eventReloadCalendar: true,
    popupEventAdd: false,
    popupEventEdit: false,
    popupEventHover: false,
    eventID: null,
    eventDate: null,
    eventTitle: null,
    eventNote: null,
    eventPrio: null,

    eventFilterMonth: date.filter((split, index) => {
        if (split.type === 'month') {
            return split.value
        }
    })[0].value,
    eventFilterYear: Number(date.filter((split, index) => {
        if (split.type === 'year') {
            return split.value
        }
    })[0].value),


    // Task 3
    machineAsset: [],
    machineTimeline: [],
    machineFilterSide: 0,
    machineFilterPlant: 0,
    machineFilterDepartment: 0,
    machineFilterCenter: 0,
    machineFilterWorkstation: 0,
    machineFilterDate: typeof Date,
}

export const initialStateType = typeof initialState

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case reducerCases.SET_TOKEN:
            return {
                ...state, token: action.token
            }

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
        case reducerCases.SET_EVENT_RELOAD_CALENDAR:
            return {
                ...state,
                eventReloadCalendar: action.eventReloadCalendar,
            }
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

        // Task 2 Date filter
        case reducerCases.SET_EVENT_FILTER_MONTH:
            return {
                ...state,
                eventFilterMonth: action.eventFilterMonth,
            }
        case reducerCases.SET_EVENT_FILTER_YEAR:
            return {
                ...state,
                eventFilterYear: action.eventFilterYear,
            }

        // Task 3
        case reducerCases.SET_ASSET_DATA:
            return {
                ...state,
                machineAsset: action.machineAsset,
            }
        case reducerCases.SET_TIMELINE_DATA:
            return {
                ...state,
                machineTimeline: action.machineTimeline,
            }
        case reducerCases.SET_TIMELINE_DATE:
            return {
                ...state,
                machineFilterDate: action.machineFilterDate,
            }
        default:
            console.log("Error reducerCases type")
            break;
    }
}

export default reducer