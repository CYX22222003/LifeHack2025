import React from 'react';
import StudentDashboardTest from './StudentDashboardTest'
import { CssBaseline, Box, Toolbar, Typography, AppBar, Drawer, List, ListItem, ListItemText, Container, Paper } from "@mui/material";
import { ThemeContextProvider } from './theme/ThemeContext';
import ThemeControlButton from './theme/ThemeControlButton';
import StudentsTable from './StudentsTable';

const drawerWidth = 240;
export default function Mainframe() {
    return (
    <React.Fragment>
    <ThemeContextProvider>
    <Box sx={{display: "flex", alignContent: "center"}}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Student Performance Dashboard
          </Typography>
          <ThemeControlButton />
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["Dashboard", "Reports", "Settings"].map((text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <StudentsTable />
    </Box>
    </ThemeContextProvider>
    </React.Fragment>
    );
}