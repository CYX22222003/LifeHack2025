// App.jsx
import React from "react";
import { CssBaseline, Box, Toolbar, Typography, AppBar, Drawer, List, ListItem, ListItemText, Container, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const drawerWidth = 240;

const students = [
  { id: 1, name: "Alice", score: 92, comment: "Great improvement!", suggestion: "Keep practicing problem sets." },
  { id: 2, name: "Bob", score: 75, comment: "Satisfactory performance.", suggestion: "Revise last week's topics." },
  { id: 3, name: "Charlie", score: 59, comment: "Needs improvement.", suggestion: "Attend office hours regularly." },
];

const columns = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "score", headerName: "Score", flex: 1 },
  { field: "comment", headerName: "Comment", flex: 2 },
  { field: "suggestion", headerName: "LLM Suggestion", flex: 2 },
];

function StudentDashboardTest() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Student Performance Dashboard
          </Typography>
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

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container maxWidth="lg">
          <Paper sx={{ height: 400, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Student Scores
            </Typography>
            <DataGrid
              rows={students}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              sx={{ mt: 2 }}
            />
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default StudentDashboardTest;
