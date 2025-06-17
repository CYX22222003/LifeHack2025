import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from '@mui/material/Box';

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
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }} display="flex" gap={2000}>
            {loading ? "Loading..." : comment}
        </Box>


    );
}