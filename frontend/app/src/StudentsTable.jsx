import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
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
import SuggestionDialog from './SuggestionDialog';

function StudentsTable() {
  const [students, setStudents] = useState([]);
  const [columns, setColumns] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const handleOpenDialog = (name) => {
    setCurrentStudent(name);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => setOpenDialog(false);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/students").then((res) => {
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

      const buttonCols = [{
        field: "suggestion",
        headerName: "LLM Suggestion",
        width: 200,
        renderCell: (params) => (
          <Button variant="outlined" onClick={() => handleOpenDialog(params.row.name)}>
            View Suggestion
          </Button>
        ),
      }]
      setColumns([...staticCols, ...examCols, ...buttonCols]);
    });
  }, []);

  return (
    <React.Fragment>
      <Toolbar />
      <SuggestionDialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        name={currentStudent}  // Pass the selected student
      />
      <Container sx={{p: 2 }}>
        <Typography variant="h6">
          Student Scores
        </Typography>
        <DataGrid
          rows={students}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          sx={{ mt: 2}}
        />
      </Container>
    </React.Fragment>
  );
}

export default StudentsTable;
