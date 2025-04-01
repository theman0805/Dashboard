import React from 'react';
import { Box, Typography, Paper, Switch, FormControlLabel } from '@mui/material';

const Settings: React.FC = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Settings
            </Typography>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    System Preferences
                </Typography>
                <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Enable Email Notifications"
                />
                <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Enable SMS Notifications"
                />
                <FormControlLabel
                    control={<Switch />}
                    label="Dark Mode"
                />
            </Paper>
        </Box>
    );
};

export default Settings; 