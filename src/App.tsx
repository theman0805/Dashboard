import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import ClinicalMetrics from './pages/ClinicalMetrics';
import Patients from './pages/Patients';
import Billing from './pages/Billing';

const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    const theme = createTheme({
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
            primary: {
                main: isDarkMode ? '#90caf9' : '#1976d2',
            },
            secondary: {
                main: isDarkMode ? '#f48fb1' : '#dc004e',
            },
            background: {
                default: isDarkMode ? '#121212' : '#f5f5f5',
                paper: isDarkMode ? '#1e1e1e' : '#ffffff',
            },
            text: {
                primary: isDarkMode ? '#ffffff' : '#000000',
                secondary: isDarkMode ? '#b0bec5' : '#666666',
            },
        },
        typography: {
            h4: {
                fontWeight: 600,
            },
            h6: {
                fontWeight: 600,
            },
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: isDarkMode ? '#1e1e1e' : '#1976d2',
                    },
                },
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                        borderRight: `1px solid ${isDarkMode ? '#333333' : '#e0e0e0'}`,
                    },
                },
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Layout isDarkMode={isDarkMode} onThemeToggle={() => setIsDarkMode(!isDarkMode)}>
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/patients" element={<Patients />} />
                        <Route path="/appointments" element={<Appointments />} />
                        <Route path="/billing" element={<Billing />} />
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                </Layout>
            </Router>
        </ThemeProvider>
    );
};

export default App;
