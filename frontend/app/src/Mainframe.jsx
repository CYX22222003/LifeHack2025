import React from 'react';
import StudentDashboardTest from './StudentDashboardTest'
import { CssBaseline, Box, Toolbar, Typography, AppBar, Drawer, List, ListItem, ListItemText, Container, Paper } from "@mui/material";
import { ThemeContextProvider } from './theme/ThemeContext';
import ThemeControlButton from './theme/ThemeControlButton';
import StudentsTable from './StudentsTable';
import StatsVisualizations from './StatsVisualizations';
import StatsExams from './StatsExams.jsx';
import { LanguageContextProvider } from './language/LanguageContext';
import LanguageControlButton from './language/LanguageControlButton';
import OverallComments from './OverallComments.jsx';

export default function Mainframe() {
    return (
        <React.Fragment>
            <ThemeContextProvider>
                <Box sx={{ display: "flex", alignContent: "center" }}>
                    <CssBaseline />
                    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                        <Toolbar sx={{ justifyContent: "flex-start" }}>
                            <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
                                Student Performance Dashboard
                            </Typography>
                            <ThemeControlButton />
                            {/* <LanguageControlButton /> */}
                        </Toolbar>
                    </AppBar>

                    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 5 }}>
                        <StudentsTable />
                        <StatsExams />
                        <OverallComments />
                    </Box>
                </Box>
            </ThemeContextProvider>
        </React.Fragment>
    );
}