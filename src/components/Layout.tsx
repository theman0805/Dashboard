import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Tooltip,
  Divider
} from '@mui/material';
import Menu from '@mui/icons-material/Menu';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DarkModeIcon from '@mui/icons-material/Brightness4';
import LightModeIcon from '@mui/icons-material/Brightness7';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsIcon from '@mui/icons-material/Settings';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create a theme context
export const ThemeContext = React.createContext({
  isDarkMode: true,
  toggleTheme: () => {},
});

const drawerWidth = 240;

interface LayoutProps {
  children: React.ReactNode;
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, isDarkMode, onThemeToggle }) => {
  const [open, setOpen] = useState(true);
  const [isDarkModeState, setIsDarkModeState] = useState(isDarkMode);
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleThemeToggle = () => {
    setIsDarkModeState(!isDarkModeState);
  };

  // Create theme based on dark mode state
  const currentTheme = createTheme({
    palette: {
      mode: isDarkModeState ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: isDarkModeState ? '#121212' : '#f5f5f5',
        paper: isDarkModeState ? '#1e1e1e' : '#ffffff',
      },
    },
  });

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Patients', icon: <PeopleIcon />, path: '/patients' },
    { text: 'Appointments', icon: <EventIcon />, path: '/appointments' },
    { text: 'Billing', icon: <ReceiptIcon />, path: '/billing' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  return (
    <ThemeContext.Provider value={{ isDarkMode: isDarkModeState, toggleTheme: handleThemeToggle }}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
              zIndex: theme.zIndex.drawer + 1
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <Menu />
              </IconButton>
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                EyeCare EHR
              </Typography>
              <Tooltip title={isDarkModeState ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                <IconButton color="inherit" onClick={handleThemeToggle}>
                  {isDarkModeState ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          >
            {isMobile ? (
              <Drawer
                variant="temporary"
                open={open}
                onClose={handleDrawerClose}
                ModalProps={{
                  keepMounted: true,
                }}
                sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
              >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                  <IconButton onClick={handleDrawerClose}>
                    <ChevronLeft />
                  </IconButton>
                  <Divider />
                  <List>
                    {menuItems.map((item) => (
                      <ListItem key={item.text} disablePadding>
                        <ListItemButton
                          selected={location.pathname === item.path}
                          onClick={() => {
                            navigate(item.path);
                            if (isMobile) {
                              handleDrawerClose();
                            }
                          }}
                        >
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            ) : (
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open={open}
              >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                  <IconButton onClick={handleDrawerClose}>
                    <ChevronLeft />
                  </IconButton>
                  <Divider />
                  <List>
                    {menuItems.map((item) => (
                      <ListItem key={item.text} disablePadding>
                        <ListItemButton
                          selected={location.pathname === item.path}
                          onClick={() => {
                            navigate(item.path);
                            if (isMobile) {
                              handleDrawerClose();
                            }
                          }}
                        >
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            )}
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              mt: '64px',
            }}
          >
            <Toolbar />
            {children}
          </Box>
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default Layout; 