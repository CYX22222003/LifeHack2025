import React, { useState, useEffect } from 'react'; // Added missing imports
import { LineChart } from '@mui/x-charts/LineChart';
import axios from "axios";
import { CircularProgress, Alert } from '@mui/material'; // Added for loading/error states

export default function StatsVisualizations() {
  const [chartData, setChartData] = useState(null); // Initialize state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/distributions');
        const data = response.data;
        
        const medians = {
          final: data.final[2],
          midterm: data.midterm[2],
          practical: data.practical[2]
        };

        setChartData({
          examTypes: Object.keys(medians),
          medianScores: Object.values(medians)
        });
      } catch (err) {
        console.error("API Error:", err); // Better error logging
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle loading state
  if (loading) {
    return <CircularProgress />;
  }

  // Handle error state
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  // Handle case where data is still null
  if (!chartData) {
    return <Alert severity="warning">No data available</Alert>;
  }

  return (
    <LineChart
      xAxis={[{
        data: chartData.examTypes,
        label: 'Exam Type',
        scaleType: 'band',
      }]}
      series={[{
        data: chartData.medianScores,
        label: 'Median Score',
        color: '#1976d2',
      }]}
      yAxis={[{
        label: 'Score',
        min: Math.min(...chartData.medianScores) - 5,
        max: Math.max(...chartData.medianScores) + 5,
      }]}
      width={500}
      height={400}
    />
  );
}