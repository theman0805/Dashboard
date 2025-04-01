import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
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
  ArcElement,
  BarElement,
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const getCardStyle = (color: string, theme: any) => ({
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[8],
    },
    background: theme.palette.mode === 'dark' 
        ? `linear-gradient(45deg, ${theme.palette.background.paper} 0%, ${color} 100%)`
        : `linear-gradient(45deg, ${theme.palette.background.paper} 0%, ${color} 100%)`,
    color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255, 255, 255, 0.1)',
        opacity: 0,
        transition: 'opacity 0.3s ease-in-out',
    },
    '&:hover::after': {
        opacity: 1,
    }
});

const Dashboard: React.FC = () => {
  const theme = useTheme();

  // Sample data for the line chart - Monthly Appointments
  const appointmentsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'General Eye Exams',
        data: [120, 150, 180, 160, 190, 210],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Cataract Consultations',
        data: [45, 55, 65, 60, 70, 75],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: 'Glaucoma Screenings',
        data: [30, 35, 40, 45, 50, 55],
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
    ],
  };

  // Sample data for the doughnut chart - Procedures Distribution
  const proceduresData = {
    labels: ['Cataract Surgery', 'Glaucoma Treatment', 'Retinal Procedures', 'Refractive Surgery', 'Other'],
    datasets: [
      {
        data: [450, 280, 320, 180, 150],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
        ],
      },
    ],
  };

  // Sample data for the bar chart - Daily Patient Flow
  const patientFlowData = {
    labels: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
    datasets: [
      {
        label: 'Patients in Clinic',
        data: [15, 25, 35, 30, 20, 40, 45, 35],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const metrics = [
    { title: 'Total Patients', value: '2,450', change: '+15%', trend: 'up' },
    { title: 'Today\'s Appointments', value: '65', change: '+8%', trend: 'up' },
    { title: 'Pending Reports', value: '28', change: '-12%', trend: 'down' },
    { title: 'Revenue (MTD)', value: '$85,678', change: '+18%', trend: 'up' },
    { title: 'Surgery Success Rate', value: '98.5%', change: '+2%', trend: 'up' },
    { title: 'Patient Satisfaction', value: '4.8/5', change: '+0.2', trend: 'up' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Ophthalmology Dashboard
      </Typography>
      
      {/* Key Metrics */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(33.33% - 8px)' } }}>
          <Card sx={getCardStyle(theme.palette.primary.main, theme)}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Total Patients</Typography>
              <Typography variant="h4">2,450</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                +12% from last month
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(33.33% - 8px)' } }}>
          <Card sx={getCardStyle(theme.palette.secondary.main, theme)}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Today's Appointments</Typography>
              <Typography variant="h4">65</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                8 pending confirmations
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(33.33% - 8px)' } }}>
          <Card sx={getCardStyle(theme.palette.success.main, theme)}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Pending Reports</Typography>
              <Typography variant="h4">28</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                12 high priority
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(33.33% - 8px)' } }}>
          <Card sx={getCardStyle(theme.palette.warning.main, theme)}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Revenue (MTD)</Typography>
              <Typography variant="h4">$85,678</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                +8.5% from last month
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(33.33% - 8px)' } }}>
          <Card sx={getCardStyle(theme.palette.info.main, theme)}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Surgery Success Rate</Typography>
              <Typography variant="h4">98.5%</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                2 failed cases this month
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(33.33% - 8px)' } }}>
          <Card sx={getCardStyle(theme.palette.error.main, theme)}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Patient Satisfaction</Typography>
              <Typography variant="h4">4.8/5</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                92% positive feedback
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Charts */}
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 3 
      }}>
        <Box sx={{ 
          flex: { xs: '1 1 100%', md: '1 1 calc(66.666% - 16px)' },
          minWidth: { xs: '100%', md: 'calc(66.666% - 16px)' }
        }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Appointments by Type
            </Typography>
            <Box sx={{ height: 300 }}>
              <Line
                data={appointmentsData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                  },
                }}
              />
            </Box>
          </Paper>
        </Box>
        <Box sx={{ 
          flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 16px)' },
          minWidth: { xs: '100%', md: 'calc(33.333% - 16px)' }
        }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Procedures Distribution
            </Typography>
            <Box sx={{ height: 300 }}>
              <Doughnut
                data={proceduresData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right' as const,
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
              Daily Patient Flow
            </Typography>
            <Box sx={{ height: 300 }}>
              <Bar
                data={patientFlowData}
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
                        text: 'Number of Patients',
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

export default Dashboard; 