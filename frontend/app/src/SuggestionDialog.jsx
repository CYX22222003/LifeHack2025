import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material';

const SuggestionDialog = ({ open, onClose, name }) => {
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open && name) {
      fetchSuggestion();
    }
  }, [open, name]);

  const fetchSuggestion = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/student/${name}`)
      setSuggestion(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load suggestion.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>LLM Suggestion</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <DialogContentText color="error">{error}</DialogContentText>
        ) : (
          <DialogContentText>{suggestion}</DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {error && <Button onClick={fetchSuggestion}>Retry</Button>}
      </DialogActions>
    </Dialog>
  );
};

export default SuggestionDialog;