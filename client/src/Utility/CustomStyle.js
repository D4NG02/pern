import { createTheme } from "@mui/material"

const constantStyle = {
    color_base_50: '#fff',
    color_base_100: '#f4f5f9',
    color_base_200: '#e9eaed',
    color_base_300: '#e0e1e4',
    color_base_400: '#c9cacd',
    color_base_500: '#afafb2',
    color_base_600: '#8d8e90',
    color_base_700: '#707072',
    color_base_800: '#4f4f50',
    color_base_900: '#262526',
    color_primary: '#00718f',
    color_primary_light: '#2988a1',
    color_primary_lighter: 'rgba(0,113,143,.16)',
    color_primary_dark: '#005f78',
    color_primary_darker: '#00566d',
    color_secondary: '#5aa2ae',
    color_secondary_light: '#74b1bb',
    color_secondary_lighter: 'rgba(90,162,174,.16)',
    color_secondary_dark: '#4c8892',
    color_secondary_darker: '#447b84',
    color_info: '#12a4f5',
    color_info_light: '#38b3f7',
    color_info_lighter: 'rgba(18,164,245,.16)',
    color_info_dark: '#0f8ace',
    color_info_darker: '#0e7dba',
    color_success: '#009b51',
    color_success_light: '#29ab6d',
    color_success_lighter: 'rgba(0,155,81,.16)',
    color_success_dark: '#008244',
    color_success_darker: '#00763e',
    color_warning: '#ffae11',
    color_warning_light: '#ffbb37',
    color_warning_lighter: 'rgba(255,174,17,.16)',
    color_warning_dark: '#d6920e',
    color_warning_darker: '#c2840d',
    color_danger: '#f31155',
    color_danger_light: '#f53770',
    color_danger_lighter: 'rgba(243,17,85,.16)',
    color_danger_dark: '#cc0e47',
    color_danger_darker: '#b90d41',
    color_on_primary: '#fff',
    color_on_primary_light: '#fff',
    color_on_primary_lighter: '#00718f',
    color_on_primary_dark: '#fff',
    color_on_primary_darker: '#fff',
    color_on_secondary: '#fff',
    color_on_secondary_light: '#fff',
    color_on_secondary_lighter: '#5aa2ae',
    color_on_secondary_dark: '#fff',
    color_on_secondary_darker: '#fff',
    color_on_info: '#fff',
    color_on_info_light: '#fff',
    color_on_info_lighter: '#12a4f5',
    color_on_info_dark: '#fff',
    color_on_info_darker: '#fff',
    color_on_success: '#fff',
    color_on_success_light: '#fff',
    color_on_success_lighter: '#009b51',
    color_on_success_dark: '#fff',
    color_on_success_darker: '#fff',
    color_on_warning: '#fff',
    color_on_warning_light: '#fff',
    color_on_warning_lighter: '#ffae11',
    color_on_warning_dark: '#fff',
    color_on_warning_darker: '#fff',
    color_on_danger: '#fff',
    color_on_danger_light: '#fff',
    color_on_danger_lighter: '#f31155',
    color_on_danger_dark: '#fff',
    color_on_danger_darker: '#fff',
    

    OpenSans: "Open Sans",
    Arial: "Arial",
    font_family: window.docLanguage === "ar_SA" ? 'Arial' : 'Open Sans',
}

const CustomComponent = createTheme({
    components: {
        // Card Style
        MuiCard: {
            styleOverrides: {
                root: {
                    // minWidth: '240px',
                    color: constantStyle.color_primary,

                    '&.outlined': {
                        border: '2px solid' +constantStyle.color_primary
                    }
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    '&:last-child': {
                        padding: '16px'
                    }
                },
            },
        },

        // Typogrphy Style
        MuiTypography: {
            styleOverrides: {
                body1: {
                    fontFamily: constantStyle.font_family,
                },
            },
        },

        // MuiChip Style
        MuiChip: {
            styleOverrides: {
                root: {
                    display: 'block',
                    fontFamily: 'inherit',
                    height: 'unset',
                    fontSize: '12px'
                },
                label: {
                    display: 'block',
                    padding: '4px 8px',
                    width: '100%'
                }
            },
        },

        // Button Style
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: 'inherit',

                    '&.buttonEvent': {
                        fontStyle: 'italic',
                        fontSize: '10px',
                        padding: 'unset',
                        minWidth: 'unset',
                        width: '100%',
                        border: 'unset'
                    },
                },

                textPrimary: {
                    color: constantStyle.color_on_primary,
                    backgroundColor: constantStyle.color_primary,
                    
                    '&:hover': {
                        color: constantStyle.color_on_primary,
                        backgroundColor: constantStyle.color_primary,
                    },
                },

                // outlinedSecondary: {  
                //     color: constantStyle.color_secondary,
                //     borderColor: constantStyle.color_secondary,
                //     ':hover': {
                //         borderColor: constantStyle.color_secondary,
                //         backgroundColor: constantStyle.color_on_secondary_lighter,
                //     }
                // },

                containedPrimary : {
                    color: constantStyle.color_on_primary,
                    backgroundColor: constantStyle.color_primary,
                    
                    '&:hover': {
                        color: constantStyle.color_on_primary,
                        backgroundColor: constantStyle.color_primary_light,
                    },
                },

                containedWarning : {
                    color: constantStyle.color_on_primary,
                    backgroundColor: constantStyle.color_warning,
                    
                    '&:hover': {
                        color: constantStyle.color_on_primary,
                        backgroundColor: constantStyle.color_warning_light,
                    },
                }
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    fontFamily: 'inherit',
                },

                outlined: {  
                    // color: constantStyle.color_secondary,
                    // borderColor: constantStyle.color_secondary,
                    // ':hover': {
                    //     borderColor: constantStyle.color_secondary,
                    //     backgroundColor: constantStyle.color_on_secondary_lighter,
                    // }
                },
            },
        },

        // Table Style
        MuiTableRow: {
            styleOverrides: {
                root: {
                    
                    '& th': {
                        fontFamily: 'inherit',
                        color: constantStyle.color_on_primary,
                        backgroundColor: constantStyle.color_primary,
                        border: '2px solid ' +constantStyle.color_on_primary,
                    },
                    '& td': {
                        fontFamily: 'inherit',
                        color: constantStyle.color_on_secondary,
                        backgroundColor: constantStyle.color_base_500,
                        border: '2px solid ' +constantStyle.color_on_secondary,
                    },
                    '&.Mui-selected': {
                        '& td': {
                            color: constantStyle.color_on_info,
                            backgroundColor: constantStyle.color_info,
                        },
                    }
                },
            },
        },

        // Pagination Style
        MuiTablePagination: {
            styleOverrides: {
                displayedRows:{
                    margin: 'unset',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    color: constantStyle.color_primary,
                    border: '1px solid '+constantStyle.color_primary,
                },
                actions: {
                    gap: '8px',
                    display: 'flex',
                    alignItems: 'stretch',
                    'p': {
                        padding: '10px 14px',
                    },
                    'button': {
                        borderRadius: '4px',
                        color: constantStyle.color_primary,
                        border: '1px solid '+constantStyle.color_primary,
                    },
                    '.Mui-disabled': {
                        backgroundColor: constantStyle.color_base_200,
                    }
                }
            },
        },

        // list Style
        MuiListItemButton: {
            styleOverrides: {
                root: {

                    '&.Mui-selected': {
                        color: 'white',
                        backgroundColor: constantStyle.color_primary,
                        '&:hover': {
                            cursor: 'default',
                            color: 'white',
                            backgroundColor: constantStyle.color_primary,
                        },
                        '& p': {
                            color: 'rgba(0, 0, 0, 0.4)'
                        }
                    }
                }
            },
        },
    },
})


export { constantStyle, CustomComponent }