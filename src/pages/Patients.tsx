import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    MenuItem,
    Card,
    CardContent,
    Chip,
    Alert,
    InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SearchIcon from '@mui/icons-material/Search';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

interface Patient {
    id: string;
    patientId: string;
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    age: number;
    email: string;
    mobilePhone: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    occupation: string;
    assignedDoctor: string;
    referredBy: string;
    oldMrdId: string;
    remarks: string;
    lastEditedDate: Date;
}

interface Analytics {
    totalPatients: number;
    malePatients: number;
    femalePatients: number;
    averageAge: number;
    newPatientsThisMonth: number;
    patientsWithAppointments: number;
    patientsByAgeGroup: {
        '0-18': number;
        '19-30': number;
        '31-50': number;
        '51-70': number;
        '70+': number;
    };
    patientsByCity: { [key: string]: number };
}

const genderOptions = ['M', 'F', 'O'];

const Patients: React.FC = () => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState<Patient[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [formData, setFormData] = useState<Partial<Patient>>({});
    const [duplicateError, setDuplicateError] = useState<string | null>(null);
    const theme = useTheme();

    // Sample data with duplicates
    const samplePatients: Patient[] = [
        {
            id: '1',
            patientId: 'P001',
            firstName: 'John',
            lastName: 'Doe',
            gender: 'M',
            dateOfBirth: '1990-05-15',
            age: 33,
            email: 'john.doe@example.com',
            mobilePhone: '+1234567890',
            address1: '123 Main St',
            address2: 'Apt 4B',
            city: 'New York',
            state: 'NY',
            pincode: '10001',
            country: 'USA',
            occupation: 'Software Engineer',
            assignedDoctor: 'Dr. Smith',
            referredBy: 'Dr. Johnson',
            oldMrdId: 'MRD001',
            remarks: 'Regular checkup required',
            lastEditedDate: new Date('2024-02-20')
        },
        {
            id: '2',
            patientId: 'P002',
            firstName: 'Muthu',
            lastName: 'Kumar',
            gender: 'M',
            dateOfBirth: '1995-08-22',
            age: 28,
            email: 'mutew.m@gmail.com',
            mobilePhone: '+919500198197',
            address1: '456 Park Avenue',
            address2: 'Flat 3C',
            city: 'Chennai',
            state: 'Tamil Nadu',
            pincode: '600001',
            country: 'India',
            occupation: 'IT Professional',
            assignedDoctor: 'Dr. Rajesh',
            referredBy: 'Dr. Priya',
            oldMrdId: 'MRD002',
            remarks: 'Follow-up required in 3 months',
            lastEditedDate: new Date('2024-02-21')
        },
        {
            id: '3',
            patientId: 'P003',
            firstName: 'Sarah',
            lastName: 'Wilson',
            gender: 'F',
            dateOfBirth: '1985-03-10',
            age: 38,
            email: 'sarah.w@example.com',
            mobilePhone: '+1987654321',
            address1: '789 Oak Street',
            address2: '',
            city: 'Los Angeles',
            state: 'CA',
            pincode: '90001',
            country: 'USA',
            occupation: 'Teacher',
            assignedDoctor: 'Dr. Brown',
            referredBy: 'Dr. Davis',
            oldMrdId: 'MRD003',
            remarks: 'Annual checkup completed',
            lastEditedDate: new Date('2024-02-19')
        },
        {
            id: '4',
            patientId: 'P004',
            firstName: 'Michael',
            lastName: 'Chen',
            gender: 'M',
            dateOfBirth: '1992-11-25',
            age: 31,
            email: 'michael.c@example.com',
            mobilePhone: '+1122334455',
            address1: '321 Pine Road',
            address2: 'Unit 7',
            city: 'San Francisco',
            state: 'CA',
            pincode: '94101',
            country: 'USA',
            occupation: 'Data Scientist',
            assignedDoctor: 'Dr. Lee',
            referredBy: 'Dr. Wang',
            oldMrdId: 'MRD004',
            remarks: 'Follow-up scheduled',
            lastEditedDate: new Date('2024-02-18')
        },
        {
            id: '5',
            patientId: 'P005',
            firstName: 'Emma',
            lastName: 'Thompson',
            gender: 'F',
            dateOfBirth: '1998-07-30',
            age: 25,
            email: 'emma.t@example.com',
            mobilePhone: '+1445566778',
            address1: '654 Maple Drive',
            address2: '',
            city: 'Chicago',
            state: 'IL',
            pincode: '60601',
            country: 'USA',
            occupation: 'Marketing Manager',
            assignedDoctor: 'Dr. Anderson',
            referredBy: 'Dr. Taylor',
            oldMrdId: 'MRD005',
            remarks: 'Initial consultation completed',
            lastEditedDate: new Date('2024-02-17')
        },
        {
            id: '6',
            patientId: 'P006',
            firstName: 'David',
            lastName: 'Kim',
            gender: 'M',
            dateOfBirth: '1988-04-12',
            age: 35,
            email: 'david.k@example.com',
            mobilePhone: '+1990011223',
            address1: '987 Cedar Lane',
            address2: 'Apt 12D',
            city: 'Seattle',
            state: 'WA',
            pincode: '98101',
            country: 'USA',
            occupation: 'Product Manager',
            assignedDoctor: 'Dr. Park',
            referredBy: 'Dr. Choi',
            oldMrdId: 'MRD006',
            remarks: 'Regular checkup required',
            lastEditedDate: new Date('2024-02-16')
        },
        {
            id: '7',
            patientId: 'P007',
            firstName: 'Lisa',
            lastName: 'Garcia',
            gender: 'F',
            dateOfBirth: '1993-09-18',
            age: 30,
            email: 'lisa.g@example.com',
            mobilePhone: '+1556677889',
            address1: '147 Birch Street',
            address2: '',
            city: 'Miami',
            state: 'FL',
            pincode: '33101',
            country: 'USA',
            occupation: 'Nurse',
            assignedDoctor: 'Dr. Rodriguez',
            referredBy: 'Dr. Martinez',
            oldMrdId: 'MRD007',
            remarks: 'Follow-up in 2 weeks',
            lastEditedDate: new Date('2024-02-15')
        },
        {
            id: '8',
            patientId: 'P008',
            firstName: 'James',
            lastName: 'Wilson',
            gender: 'M',
            dateOfBirth: '1965-12-05',
            age: 58,
            email: 'james.w@example.com',
            mobilePhone: '+1667788990',
            address1: '258 Elm Avenue',
            address2: 'Suite 5',
            city: 'Boston',
            state: 'MA',
            pincode: '02101',
            country: 'USA',
            occupation: 'Retired',
            assignedDoctor: 'Dr. Thompson',
            referredBy: 'Dr. Brown',
            oldMrdId: 'MRD008',
            remarks: 'Annual checkup completed',
            lastEditedDate: new Date('2024-02-14')
        },
        {
            id: '9',
            patientId: 'P009',
            firstName: 'Sophia',
            lastName: 'Lee',
            gender: 'F',
            dateOfBirth: '1997-02-28',
            age: 26,
            email: 'sophia.l@example.com',
            mobilePhone: '+1778899001',
            address1: '369 Willow Road',
            address2: '',
            city: 'Houston',
            state: 'TX',
            pincode: '77001',
            country: 'USA',
            occupation: 'Graphic Designer',
            assignedDoctor: 'Dr. Chen',
            referredBy: 'Dr. Wang',
            oldMrdId: 'MRD009',
            remarks: 'Initial consultation scheduled',
            lastEditedDate: new Date('2024-02-13')
        },
        {
            id: '10',
            patientId: 'P010',
            firstName: 'Robert',
            lastName: 'Taylor',
            gender: 'M',
            dateOfBirth: '1991-06-15',
            age: 32,
            email: 'robert.t@example.com',
            mobilePhone: '+1889900112',
            address1: '741 Ash Street',
            address2: 'Apt 8E',
            city: 'Denver',
            state: 'CO',
            pincode: '80201',
            country: 'USA',
            occupation: 'Architect',
            assignedDoctor: 'Dr. Anderson',
            referredBy: 'Dr. Smith',
            oldMrdId: 'MRD010',
            remarks: 'Follow-up required',
            lastEditedDate: new Date('2024-02-12')
        }
    ];

    useEffect(() => {
        setPatients(samplePatients);
    }, []);

    const handleOpenDialog = (patient?: Patient) => {
        if (patient) {
            setSelectedPatient(patient);
            setFormData(patient);
        } else {
            setSelectedPatient(null);
            setFormData({
                patientId: `P${String(patients.length + 1).padStart(3, '0')}`,
                lastEditedDate: new Date()
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedPatient(null);
        setFormData({});
        setDuplicateError(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'dateOfBirth' && value) {
            const birthDate = new Date(value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            setFormData(prev => ({
                ...prev,
                age
            }));
        }
    };

    const handleSavePatient = () => {
        const isDuplicate = patients.some(patient => 
            patient.id !== selectedPatient?.id && 
            (patient.email === formData.email || patient.mobilePhone === formData.mobilePhone)
        );

        if (isDuplicate) {
            setDuplicateError('A patient with this email or phone number already exists');
            return;
        }

        if (selectedPatient) {
            setPatients(prev => prev.map(patient =>
                patient.id === selectedPatient.id
                    ? { ...formData as Patient, lastEditedDate: new Date() }
                    : patient
            ));
        } else {
            const newPatient: Patient = {
                ...formData as Patient,
                id: String(patients.length + 1),
                lastEditedDate: new Date()
            };
            setPatients(prev => [...prev, newPatient]);
        }
        handleCloseDialog();
    };

    const handleDeletePatient = (id: string) => {
        if (window.confirm('Are you sure you want to delete this patient?')) {
            setPatients(prev => prev.filter(patient => patient.id !== id));
        }
    };

    const calculateAnalytics = () => {
        const totalPatients = patients.length;
        const malePatients = patients.filter(p => p.gender === 'M').length;
        const femalePatients = patients.filter(p => p.gender === 'F').length;
        const newPatientsThisMonth = patients.filter(p => {
            const lastEdited = new Date(p.lastEditedDate);
            const now = new Date();
            return lastEdited.getMonth() === now.getMonth() && 
                   lastEdited.getFullYear() === now.getFullYear();
        }).length;
        const patientsWithAppointments = patients.filter(p => p.assignedDoctor).length;
        const averageAge = Math.round(
            patients.reduce((acc, p) => acc + p.age, 0) / totalPatients
        );
        const patientsByAgeGroup = {
            '0-30': patients.filter(p => p.age <= 30).length,
            '31-50': patients.filter(p => p.age > 30 && p.age <= 50).length,
            '51+': patients.filter(p => p.age > 50).length
        };
        
        // Calculate patients by city with proper type safety
        const patientsByCity = patients.reduce((acc, p) => {
            if (p.city) {
                acc[p.city] = (acc[p.city] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);

        // Find most common city with fallback
        const mostCommonCity = Object.entries(patientsByCity).length > 0
            ? Object.entries(patientsByCity)
                .sort(([, a], [, b]) => b - a)[0][0]
            : 'No Data';

        return {
            totalPatients,
            malePatients,
            femalePatients,
            newPatientsThisMonth,
            patientsWithAppointments,
            averageAge,
            patientsByAgeGroup,
            mostCommonCity,
            patientsByCity
        };
    };

    const analytics = calculateAnalytics();

    const getCardStyle = (color: string) => ({
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

    // Add search functionality
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAnalytics, setSelectedAnalytics] = useState<string | null>(null);

    const handleAnalyticsClick = (type: string) => {
        setSelectedAnalytics(type);
        let filtered: Patient[] = [];
        
        switch (type) {
            case 'newPatients':
                filtered = patients.filter(p => {
                    const lastEdited = new Date(p.lastEditedDate);
                    const now = new Date();
                    return lastEdited.getMonth() === now.getMonth() && 
                           lastEdited.getFullYear() === now.getFullYear();
                });
                break;
            case 'withAppointments':
                filtered = patients.filter(p => p.assignedDoctor);
                break;
            case 'malePatients':
                filtered = patients.filter(p => p.gender === 'M');
                break;
            case 'femalePatients':
                filtered = patients.filter(p => p.gender === 'F');
                break;
            case 'ageGroup':
                filtered = patients.filter(p => p.age > 30 && p.age <= 50);
                break;
            case 'doctor':
                filtered = patients.filter(p => p.assignedDoctor === 'Dr. Sarah Wilson');
                break;
            case 'city':
                filtered = patients.filter(p => p.city === analytics.mostCommonCity);
                break;
            default:
                filtered = patients;
        }
        
        setPatients(filtered);
    };

    const filteredPatients = patients.filter(patient =>
        patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.mobilePhone.includes(searchTerm)
    );

    return (
        <Box component="div">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">Patient Management</Typography>
                <Box>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<EventAvailableIcon />}
                        onClick={() => navigate('/appointments')}
                        sx={{ mr: 1 }}
                    >
                        Book Appointment
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpenDialog()}
                    >
                        Add New Patient
                    </Button>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 8px)' } }}>
                    <Card 
                        sx={getCardStyle(theme.palette.primary.main)}
                        onClick={() => handleAnalyticsClick('newPatients')}
                    >
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Total Patients</Typography>
                            <Typography variant="h4">{analytics.totalPatients}</Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                {analytics.newPatientsThisMonth} new this month
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 8px)' } }}>
                    <Card 
                        sx={getCardStyle(theme.palette.secondary.main)}
                        onClick={() => handleAnalyticsClick('withAppointments')}
                    >
                        <CardContent>
                            <Typography variant="h6" gutterBottom>With Appointments</Typography>
                            <Typography variant="h4">{analytics.patientsWithAppointments}</Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                {((analytics.patientsWithAppointments / analytics.totalPatients) * 100).toFixed(1)}% of total
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 8px)' } }}>
                    <Card 
                        sx={getCardStyle(theme.palette.success.main)}
                        onClick={() => handleAnalyticsClick('malePatients')}
                    >
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Male Patients</Typography>
                            <Typography variant="h4">{analytics.malePatients}</Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                {((analytics.malePatients / analytics.totalPatients) * 100).toFixed(1)}% of total
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 8px)' } }}>
                    <Card 
                        sx={getCardStyle(theme.palette.error.main)}
                        onClick={() => handleAnalyticsClick('femalePatients')}
                    >
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Female Patients</Typography>
                            <Typography variant="h4">{analytics.femalePatients}</Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                {((analytics.femalePatients / analytics.totalPatients) * 100).toFixed(1)}% of total
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 8px)' } }}>
                    <Card 
                        sx={getCardStyle(theme.palette.info.main)}
                        onClick={() => handleAnalyticsClick('doctor')}
                    >
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Dr. Wilson's Patients</Typography>
                            <Typography variant="h4">
                                {patients.filter(p => p.assignedDoctor === 'Dr. Sarah Wilson').length}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                Most assigned doctor
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 8px)' } }}>
                    <Card 
                        sx={getCardStyle(theme.palette.warning.main)}
                        onClick={() => handleAnalyticsClick('ageGroup')}
                    >
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Average Age</Typography>
                            <Typography variant="h4">{analytics.averageAge}</Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                {analytics.patientsByAgeGroup['31-50']} patients aged 31-50
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 8px)' } }}>
                    <Card 
                        sx={getCardStyle(theme.palette.primary.main)}
                        onClick={() => handleAnalyticsClick('city')}
                    >
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Most Common City</Typography>
                            <Typography variant="h4">{analytics.mostCommonCity}</Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                {analytics.patientsByCity[analytics.mostCommonCity]} patients
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                    label="Search Patients"
                    variant="outlined"
                    size="small"
                    sx={{ flex: 1 }}
                    placeholder="Search by ID, Name, Email, or Phone"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="patient table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Patient ID</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell align="right">Age</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Mobile Phone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Assigned Doctor</TableCell>
                            <TableCell>Last Edited</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPatients.map((patient) => (
                            <TableRow hover key={patient.id}>
                                <TableCell>{patient.patientId}</TableCell>
                                <TableCell>{patient.firstName}</TableCell>
                                <TableCell>{patient.lastName}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={patient.gender}
                                        size="small"
                                        color={patient.gender === 'M' ? 'primary' : patient.gender === 'F' ? 'secondary' : 'default'}
                                    />
                                </TableCell>
                                <TableCell align="right">{patient.age}</TableCell>
                                <TableCell>{patient.city}</TableCell>
                                <TableCell>{patient.mobilePhone}</TableCell>
                                <TableCell>{patient.email}</TableCell>
                                <TableCell>{patient.assignedDoctor}</TableCell>
                                <TableCell>{format(patient.lastEditedDate, 'PPpp')}</TableCell>
                                <TableCell align="center">
                                    <IconButton size="small" onClick={() => handleOpenDialog(patient)}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" onClick={() => handleDeletePatient(patient.id)}>
                                        <DeleteIcon fontSize="small" color="error" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>{selectedPatient ? 'Edit Patient' : 'Add New Patient'}</DialogTitle>
                <DialogContent>
                    {duplicateError && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {duplicateError}
                        </Alert>
                    )}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, pt: 1 }}>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(33.33% - 8px)' } }}>
                            <TextField
                                label="Patient ID"
                                name="patientId"
                                value={formData.patientId || ''}
                                onChange={handleInputChange}
                                fullWidth
                                margin="dense"
                                disabled
                            />
                        </Box>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(33.33% - 8px)' } }}>
                            <TextField
                                label="First Name"
                                name="firstName"
                                value={formData.firstName || ''}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                margin="dense"
                            />
                        </Box>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(33.33% - 8px)' } }}>
                            <TextField
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName || ''}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                margin="dense"
                            />
                        </Box>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(33.33% - 8px)' } }}>
                            <TextField
                                select
                                label="Gender"
                                name="gender"
                                value={formData.gender || ''}
                                onChange={handleInputChange}
                                fullWidth
                                margin="dense"
                            >
                                {genderOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(33.33% - 8px)' } }}>
                            <TextField
                                label="Date of Birth"
                                name="dateOfBirth"
                                type="date"
                                value={formData.dateOfBirth ? format(new Date(formData.dateOfBirth), 'yyyy-MM-dd') : ''}
                                onChange={handleInputChange}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                margin="dense"
                            />
                        </Box>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(33.33% - 8px)' } }}>
                            <TextField
                                label="Age"
                                name="age"
                                type="number"
                                value={formData.age || ''}
                                fullWidth
                                disabled
                                margin="dense"
                            />
                        </Box>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(33.33% - 8px)' } }}>
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email || ''}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                margin="dense"
                                error={!!duplicateError && !!formData.email}
                            />
                        </Box>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(33.33% - 8px)' } }}>
                            <TextField
                                label="Mobile Phone"
                                name="mobilePhone"
                                value={formData.mobilePhone || ''}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                margin="dense"
                                error={!!duplicateError && !!formData.mobilePhone}
                            />
                        </Box>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)' } }}>
                            <TextField
                                label="Address Line 1"
                                name="address1"
                                value={formData.address1 || ''}
                                onChange={handleInputChange}
                                fullWidth
                                margin="dense"
                            />
                        </Box>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)' } }}>
                            <TextField
                                label="Address Line 2"
                                name="address2"
                                value={formData.address2 || ''}
                                onChange={handleInputChange}
                                fullWidth
                                margin="dense"
                            />
                        </Box>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 8px)' } }}>
                            <TextField
                                label="City"
                                name="city"
                                value={formData.city || ''}
                                onChange={handleInputChange}
                                fullWidth
                                margin="dense"
                            />
                        </Box>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 8px)' } }}>
                            <TextField
                                label="State"
                                name="state"
                                value={formData.state || ''}
                                onChange={handleInputChange}
                                fullWidth
                                margin="dense"
                            />
                        </Box>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 8px)' } }}>
                            <TextField
                                label="Pincode"
                                name="pincode"
                                value={formData.pincode || ''}
                                onChange={handleInputChange}
                                fullWidth
                                margin="dense"
                            />
                        </Box>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 8px)' } }}>
                            <TextField
                                label="Country"
                                name="country"
                                value={formData.country || ''}
                                onChange={handleInputChange}
                                fullWidth
                                margin="dense"
                            />
                        </Box>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(33.33% - 8px)' } }}>
                            <TextField
                                label="Occupation"
                                name="occupation"
                                value={formData.occupation || ''}
                                onChange={handleInputChange}
                                fullWidth
                                margin="dense"
                            />
                        </Box>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(33.33% - 8px)' } }}>
                            <TextField
                                label="Assigned Doctor"
                                name="assignedDoctor"
                                value={formData.assignedDoctor || ''}
                                onChange={handleInputChange}
                                fullWidth
                                margin="dense"
                            />
                        </Box>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(33.33% - 8px)' } }}>
                            <TextField
                                label="Referred By"
                                name="referredBy"
                                value={formData.referredBy || ''}
                                onChange={handleInputChange}
                                fullWidth
                                margin="dense"
                            />
                        </Box>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)' } }}>
                            <TextField
                                label="Old MRDid"
                                name="oldMrdId"
                                value={formData.oldMrdId || ''}
                                onChange={handleInputChange}
                                fullWidth
                                margin="dense"
                            />
                        </Box>
                        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)' } }}>
                            <TextField
                                label="Remarks"
                                name="remarks"
                                value={formData.remarks || ''}
                                onChange={handleInputChange}
                                fullWidth
                                multiline
                                rows={3}
                                margin="dense"
                            />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSavePatient}
                        disabled={!!duplicateError && !selectedPatient}
                    >
                        {selectedPatient ? 'Save Changes' : 'Create Patient'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Patients; 