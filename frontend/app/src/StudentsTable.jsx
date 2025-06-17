import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const drawerWidth = 240;

function StudentsTable() {
  const [students, setStudents] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/students").then((res) => {
      const raw = res.data;

      // Flatten data and generate rows
      const rows = raw.map((student, index) => {
        const examsFlat = {};
        Object.entries(student.exams).forEach(([examName, data]) => {
          examsFlat[`${examName}_score`] = data.score;
          examsFlat[`${examName}_feedback`] = data.feedback;
        });

        return {
          id: index, // required by DataGrid
          name: student.name,
          gender: student.gender,
          ...examsFlat,
        };
      });

      setStudents(rows);

      // Dynamically build columns
      const staticCols = [
        { field: "name", headerName: "Name", width: 130 },
        { field: "gender", headerName: "Gender", width: 100 },
      ];

      const examKeys = Object.keys(raw[0].exams);
      const examCols = examKeys.flatMap((exam) => [
        { field: `${exam}_score`, headerName: `${exam} Score`, width: 130 },
        { field: `${exam}_feedback`, headerName: `${exam} Feedback`, width: 180 },
      ]);

      setColumns([...staticCols, ...examCols]);
    });
  }, []);

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
          <Paper sx={{ height: 500, p: 2 }}>
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

export default StudentsTable;
