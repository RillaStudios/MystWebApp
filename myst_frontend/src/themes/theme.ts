import { createTheme } from "@mantine/core";

export const appTheme = createTheme({

    //! APP COLORS

    // Primary color
    primaryColor: 'primary',

    // Color scheme
    colors: {
        primary: [
            "#fff0e4",
            "#ffe0cf",
            "#fac0a1",
            "#f69e6e",
            "#f28043",
            "#f06e27",
            "#f06418",
            "#d6530c",
            "#bf4906",
            "#a73c00"
        ],
        secondary: [
            "#fff4ef",
            "#ffe5db",
            "#ffd0bf",
            "#ffb49c",
            "#ff9476",
            "#f87f5c",
            "#e86b45",
            "#cc5738",
            "#a9452e",
            "#8a3626"
        ],
        tertiary: [
            "#f2f5f0",
            "#e2e7df",
            "#c8d1c3",
            "#a9b4a2",
            "#8c9886",
            "#788570",
            "#697764",
            "#566253",
            "#485346",
            "#3a443a"
        ]
    },

    // Default black color
    black: '#0B1215',

    // Default white color
    white: '#FAF9F6',

    //! COLOR SETTINGS

    // The primary color shade to use
    primaryShade: 5,

    // Disable auto contrast for all components
    autoContrast: false,

    // The threshold to use for luminance-based color scheme switching
    // will switch text color to black if the luminance of the background 
    // color is above this value
    luminanceThreshold: 0.5,

    //! APP BREKPOINTS

    // App breakpoints
    breakpoints: {
        xs: '36em',
        sm: '48em',
        md: '62em',
        lg: '75em',
        xl: '88em',
    },

    //! APP LOOK AND FEEL

    // Shows a focus ring on elements when they are focused
    focusRing: 'auto',

    // Default radius for components
    defaultRadius: 'sm',

    // Radius sizes
    radius: {
        xs: '0.125rem',
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        xxl: '1rem',
    },

    // Cursor style for all components
    cursorType: 'pointer',

    // Shadow style for all components
    shadows: {
        xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
        md: '0 1px 5px rgba(0, 0, 0, 0.15)',
        lg: '0 1px 10px rgba(0, 0, 0, 0.2)',
        xl: '0 1px 20px rgba(0, 0, 0, 0.25)',
    },

    // Scale factor for all components
    scale: 1,

    //! FONT SETTINGS

    // Enable font smoothing
    fontSmoothing: true,

    // Font family for all components
    fontFamily: 'Open Sans, sans-serif',


});