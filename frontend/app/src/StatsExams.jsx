import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import {
  CircularProgress,
  Alert,
  Typography,
  Grid,
  Paper,
  Container,
} from '@mui/material';

const StatsExams = () => {
  const [examData, setExamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [distributionData, setDistributionData] = useState({});

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [examRes, distributionRes] = await Promise.all([
          axios.get('http://127.0.0.1:5000/api/stats'),
          axios.get('http://127.0.0.1:5000/api/distributions')
        ]);

        setExamData(examRes.data);
        setDistributionData(distributionRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch exam or distribution data');
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Helper: Group scores into bins (e.g., 60-69, 70-79, etc.)
  const createHistogramData = (scores, binSize = 5) => {
    const min = Math.floor(Math.min(...scores) / binSize) * binSize;
    const max = Math.ceil(Math.max(...scores) / binSize) * binSize;

    const bins = {};
    for (let i = min; i <= max; i += binSize) {
      const binLabel = `${i}-${i + binSize - 1}`;
      bins[binLabel] = 0;
    }

    scores.forEach(score => {
      const lower = Math.floor(score / binSize) * binSize;
      const label = `${lower}-${lower + binSize - 1}`;
      if (bins[label] !== undefined) {
        bins[label]++;
      }
    });

    return Object.entries(bins).map(([bin, count]) => ({
      bin,
      count,
    }));
  };

  const renderHistogram = ({ exam, scores }) => {
    const histogramData = createHistogramData(scores);
    const summary = distributionData[exam] || [];
    const binLabels = histogramData.map(d => d.bin);
    const [, q1, median, q3] = summary;

    return (
      <Grid item xs={12} md={4} key={exam}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" align="center" gutterBottom>
            {exam.charAt(0).toUpperCase() + exam.slice(1)} Score Distribution
          </Typography>

          <BarChart
            xAxis={[{ scaleType: 'band', data: binLabels }]}
            series={[{ data: histogramData.map(d => d.count), label: 'Frequency', color: '#0288d1' }]}
            width={400}
            height={300}
          />

          {/* 👇 Text summary below chart */}
          {summary.length === 5 && (
            <Typography variant="body2" align="center" sx={{ mt: 1 }}>
              Lower Quantile: {q1}, Median: {median}, Upper Quantile: {q3}
            </Typography>
          )}
        </Paper>
      </Grid>
    );
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Exam Score Histograms
      </Typography>

      {loading && (
        <Grid container justifyContent="center" sx={{ mt: 4 }}>
          <CircularProgress />
        </Grid>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Grid container spacing={3}>
          {examData.map(renderHistogram)}
        </Grid>
      )}

    </Container>
  );
};

export default StatsExams;
