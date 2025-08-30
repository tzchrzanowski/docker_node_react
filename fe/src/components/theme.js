import { createTheme } from "@mui/material";

// mode: 'light' | 'dark'
export const getTheme = (mode) => 
    createTheme({
        palette: {
            mode,
            ...(mode === 'light'
                ? {
                    background: { default: '#fafafa'},
                } : {
                    background: { default: '#121212'},
                }),
        },
    });
