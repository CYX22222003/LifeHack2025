import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import { Typography, Paper } from '@mui/material';

export default function OverallComments() {
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchComment = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://127.0.0.1:5000/api/general");
                setComment(response.data);
            } catch (error) {
                setComment("Error fetching comment.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchComment();
    }, []);

    return (
        <Box
            component={Paper}
            elevation={3}
            sx={{
                p: 2,
                border: '1px dashed grey',
                borderRadius: 2,
                backgroundColor: '#f9f9f9',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%',
            }}
        >
            <Typography variant="h6" gutterBottom>
                Overall Comments
            </Typography>

            <Typography variant="body1">
                {loading ? "Loading..." : comment}
            </Typography>
        </Box>


    );
}