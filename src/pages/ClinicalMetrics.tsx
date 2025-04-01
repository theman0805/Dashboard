import React from 'react';
import {
  Box,
  Paper,
  Typography,
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

const ClinicalMetrics: React.FC = () => {
  // Sample data for average wait times by day
  const waitTimesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Average Wait Time (minutes)',
        data: [25, 30, 35, 28, 32, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  // Sample data for patient flow by hour
  const patientFlowData = {
    labels: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
    datasets: [
      {
        label: 'Patients in Waiting Room',
        data: [15, 25, 35, 30, 20, 40, 45, 35],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Patients in Examination',
        data: [8, 12, 18, 15, 10, 20, 25, 20],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  // Sample data for average visit duration by procedure
  const visitDurationData = {
    labels: ['General Exam', 'Cataract Consultation', 'Glaucoma Screening', 'Retinal Exam', 'Refractive Surgery'],
    datasets: [
      {
        label: 'Average Duration (minutes)',
        data: [30, 45, 40, 60, 90],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Clinical Metrics
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 3 
      }}>
        <Box sx={{ 
          flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' },
          minWidth: { xs: '100%', md: 'calc(50% - 12px)' }
        }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Average Wait Times by Day
            </Typography>
            <Box sx={{ height: 300 }}>
              <Line
                data={waitTimesData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Minutes',
                      },
                    },
                  },
                }}
              />
            </Box>
          </Paper>
        </Box>

        <Box sx={{ 
          flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' },
          minWidth: { xs: '100%', md: 'calc(50% - 12px)' }
        }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Patient Flow by Hour
            </Typography>
            <Box sx={{ height: 300 }}>
              <Bar
                data={patientFlowData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Number of Patients',
                      },
                    },
                  },
                }}
              />
            </Box>
          </Paper>
        </Box>

        <Box sx={{ 
          flex: '1 1 100%',
          minWidth: '100%'
        }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Average Visit Duration by Procedure
            </Typography>
            <Box sx={{ height: 300 }}>
              <Bar
                data={visitDurationData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Minutes',
                      },
                    },
                  },
                }}
              />
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default ClinicalMetrics; 