// App.jsx
import React from "react";
import { CssBaseline, Box, Toolbar, Typography, AppBar, Drawer, List, ListItem, ListItemText, Container, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";

// const drawerWidth = 240;

function StudentDashboardTest() {
  // These hooks and functions must be defined inside your StudentDashboardTest component
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "score", headerName: "Score", flex: 1 },
    { field: "comment", headerName: "Comment", flex: 2 },
    {
      field: "suggestion",
      headerName: "LLM Suggestion",
      flex: 2,
      renderCell: () => (
        <Button variant="outlined" onClick={handleOpenDialog}>
          View Suggestion
        </Button>
      ),
    },
  ];

  const students = [
    {
      id: 1,
      name: "Alice",
      score: 92,
      comment: "Great improvement!",
      suggestion: "Default Suggestion",
    },
    {
      id: 2,
      name: "Bob",
      score: 75,
      comment: "Satisfactory performance.",
      suggestion: "Default Suggestion",
    },
    {
      id: 3,
      name: "Charlie",
      score: 59,
      comment: "Needs improvement.",
      suggestion: "Default Suggestion",
    },
  ];

  return (
    <React.Fragment>
    <Box sx={{ display: "flex" }}>
      

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container maxWidth="lg">

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>LLM Suggestion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                This is your suggestion for improvement.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </Dialog>

          <Typography variant="h6" gutterBottom>
            Student Scores
          </Typography>
          <Paper sx={{ height: 600, width: 700, mt: 2 }}>
            <DataGrid
              rows={students}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              sx={{ height: "100%", width: "100%" }}
            />
          </Paper>
        </Container>
      </Box>
    </Box>
    </React.Fragment>
  );
}

export default StudentDashboardTest;
