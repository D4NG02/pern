import { reducerCases } from "./Constant"

const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
})
const date = dateTimeFormat.formatToParts(new Date)

export const initialState = {
    wrong_user_id: false,
    user_id: null,
    user_name: null,
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
    machineTimeline: [],
    machineFilterSearch: false,
    machineFilterSide: 1,
    machineFilterPlant: 1,
    machineFilterDepartment: 1,
    machineFilterWorkcenter: 1,
    machineFilterWorkstation: 1,
    machineFilterDate: {
                        "from": new Date(new Date().toDateString()),
                        "to": new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)
                    },
    machineFilterAsset: [],
    machineFilterTimeline: [],
}

export const initialStateType = typeof initialState

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case reducerCases.SET_TOKEN:
            return {
                ...state, token: action.token
            }
        case reducerCases.SET_IS_USER_ID:
            return {
                ...state, wrong_user_id: action.wrong_user_id
            }
        case reducerCases.SET_USER_ID:
            return {
                ...state, user_id: action.user_id
            }
        case reducerCases.SET_USER_NAME:
            return {
                ...state, user_name: action.user_name
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
        case reducerCases.SET_MACHINE_FILTER_SEARCH:
            return {
                ...state,
                machineFilterSearch: action.machineFilterSearch,
            }
        case reducerCases.SET_MACHINE_FILTER_SITES:
            return {
                ...state,
                machineFilterSide: action.machineFilterSide,
            }
        case reducerCases.SET_MACHINE_FILTER_PLANTS:
            return {
                ...state,
                machineFilterPlant: action.machineFilterPlant,
            }
        case reducerCases.SET_MACHINE_FILTER_DEPARTMENTS:
            return {
                ...state,
                machineFilterDepartment: action.machineFilterDepartment,
            }
        case reducerCases.SET_MACHINE_FILTER_WORKCENTERS:
            return {
                ...state,
                machineFilterWorkcenter: action.machineFilterWorkcenter,
            }
        case reducerCases.SET_MACHINE_FILTER_WORKSTATIONS:
            return {
                ...state,
                machineFilterWorkstation: action.machineFilterWorkstation,
            }
        case reducerCases.SET_MACHINE_FILTER_ASSETS:
            return {
                ...state,
                machineFilterAsset: action.machineFilterAsset,
            }
        case reducerCases.SET_MACHINE_FILTER_DATE:
            return {
                ...state,
                machineFilterDate: action.machineFilterDate,
            }


            
        case reducerCases.SET_TIMELINE_DATA:
            return {
                ...state,
                machineTimeline: action.machineTimeline,
            }
        default:
            console.log("Error reducerCases type")
            break;
    }
}

export default reducer