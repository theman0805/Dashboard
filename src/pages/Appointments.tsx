import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { format } from 'date-fns';

interface Patient {
  id: string;
  patientId: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date;
  age: number;
  address1: string;
  address2: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  mobilePhone: string;
  landlinePhone: string;
  remarks: string;
  occupation: string;
  email: string;
  assignedDoctor: string;
  referredBy: string;
  oldMrdId: string;
  entryDate: Date;
  lastEditedDate: Date;
}

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: Date;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

// Sample patients data
const samplePatients: Patient[] = [
  {
    id: '1',
    patientId: 'P001',
    firstName: 'John',
    lastName: 'Smith',
    gender: 'M',
    dateOfBirth: new Date('1990-05-15'),
    age: 34,
    address1: '123 Main St',
    address2: 'Apt 4B',
    city: 'New York',
    pincode: '10001',
    state: 'NY',
    country: 'USA',
    mobilePhone: '+1-555-0123',
    landlinePhone: '+1-555-0124',
    remarks: 'Regular checkup required',
    occupation: 'Software Engineer',
    email: 'john.smith@email.com',
    assignedDoctor: 'Dr. Sarah Johnson',
    referredBy: 'Dr. Michael Brown',
    oldMrdId: 'MRD001',
    entryDate: new Date('2024-01-15'),
    lastEditedDate: new Date('2024-03-20'),
  },
  {
    id: '2',
    patientId: 'P002',
    firstName: 'Emma',
    lastName: 'Wilson',
    gender: 'F',
    dateOfBirth: new Date('1985-08-20'),
    age: 39,
    address1: '456 Oak Ave',
    address2: '',
    city: 'Los Angeles',
    pincode: '90001',
    state: 'CA',
    country: 'USA',
    mobilePhone: '+1-555-0125',
    landlinePhone: '+1-555-0126',
    remarks: 'Follow-up required',
    occupation: 'Teacher',
    email: 'emma.wilson@email.com',
    assignedDoctor: 'Dr. Robert Wilson',
    referredBy: 'Dr. Emily Davis',
    oldMrdId: 'MRD002',
    entryDate: new Date('2024-02-01'),
    lastEditedDate: new Date('2024-03-21'),
  },
  // ... Add more patients as needed
];

const appointmentTypes = [
  'General Eye Exam',
  'Cataract Consultation',
  'Glaucoma Screening',
  'Retinal Examination',
  'Refractive Surgery Consultation',
  'Contact Lens Fitting',
  'Emergency Visit',
  'Follow-up Visit',
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
];

const Appointments: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const [allPatients, setAllPatients] = useState<Patient[]>([]);
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({
    patientId: '',
    patientName: '',
    date: new Date(),
    time: '',
    type: '',
    status: 'scheduled',
  });
  const [appointmentError, setAppointmentError] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patientId: 'P001',
      patientName: 'John Smith',
      date: new Date(2024, 2, 28),
      time: '10:00',
      type: 'Cataract Consultation',
      status: 'scheduled',
    },
    {
      id: '2',
      patientId: 'P002',
      patientName: 'Emma Wilson',
      date: new Date(2024, 2, 28),
      time: '14:30',
      type: 'Glaucoma Screening',
      status: 'scheduled',
    },
  ]);

  useEffect(() => {
    setAllPatients(samplePatients);
  }, []);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setNewAppointment(prev => ({ ...prev, date: date || new Date() }));
  };

  const handleOpenDialog = () => {
    setAppointmentError(null);
    setNewAppointment(prev => ({ ...prev, date: selectedDate || new Date() }));
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setAppointmentError(null);
    setNewAppointment({
      patientId: '',
      patientName: '',
      date: new Date(),
      time: '',
      type: '',
      status: 'scheduled',
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewAppointment((prev) => ({ ...prev, [name]: value }));

    if (name === 'patientId') {
      setAppointmentError(null);
    }
  };

  const handleSaveAppointment = () => {
    setAppointmentError(null);

    const enteredPatientId = newAppointment.patientId?.trim();

    if (!enteredPatientId || !newAppointment.type || !newAppointment.time) {
      setAppointmentError('Patient ID, Appointment Type, and Time are required.');
      return;
    }

    const selectedPatient = allPatients.find(p => p.patientId === enteredPatientId);

    if (!selectedPatient) {
      setAppointmentError(`Patient with ID '${enteredPatientId}' not found.`);
      return;
    }

    const newId = (appointments.length + 1).toString();
    const appointment: Appointment = {
      id: newId,
      patientId: selectedPatient.patientId,
      patientName: `${selectedPatient.firstName} ${selectedPatient.lastName}`,
      date: newAppointment.date || new Date(),
      time: newAppointment.time,
      type: newAppointment.type,
      status: 'scheduled',
    };
    setAppointments([...appointments, appointment]);

    console.log(`Appointment booked for ${appointment.patientName} (ID: ${appointment.patientId})`);
    console.log(`TODO: Send email confirmation to: ${selectedPatient.email}`);
    console.log(`TODO: Send WhatsApp confirmation to: ${selectedPatient.mobilePhone}`);

    handleCloseDialog();
  };

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(
      (appointment) =>
        format(appointment.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Appointments</Typography>
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          Add New Appointment
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 66.666%' } }}>
          <Paper sx={{ p: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateCalendar
                value={selectedDate}
                onChange={handleDateChange}
                sx={{ width: '100%' }}
              />
            </LocalizationProvider>
          </Paper>
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 33.333%' } }}>
          <Paper sx={{ p: 2, minHeight: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Appointments for {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'selected date'}
            </Typography>
            {selectedDate && getAppointmentsForDate(selectedDate).length > 0 ? (
              getAppointmentsForDate(selectedDate).map((appointment) => (
                <Box
                  key={appointment.id}
                  sx={{
                    p: 1.5,
                    mb: 1.5,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    borderRadius: 1,
                    bgcolor: 'background.paper',
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="medium">
                    {appointment.patientName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Patient ID: {appointment.patientId}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {appointment.time} - {appointment.type}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="medium"
                    color={
                      appointment.status === 'scheduled'
                        ? 'primary.main'
                        : appointment.status === 'completed'
                        ? 'success.main'
                        : 'error.main'
                    }
                  >
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                No appointments scheduled for this date.
              </Typography>
            )}
          </Paper>
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Add New Appointment</DialogTitle>
        <DialogContent>
          {appointmentError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {appointmentError}
            </Alert>
          )}
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Patient ID"
              name="patientId"
              variant="outlined"
              value={newAppointment.patientId}
              onChange={handleInputChange}
              margin="normal"
              required
              placeholder="Enter unique Patient ID (e.g., P001)"
              error={!!appointmentError && !allPatients.find(p => p.patientId === newAppointment.patientId?.trim())}
            />
            <TextField
              fullWidth
              select
              label="Appointment Type"
              name="type"
              margin="normal"
              variant="outlined"
              value={newAppointment.type}
              onChange={handleInputChange}
              required
            >
              {appointmentTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="Time"
              name="time"
              margin="normal"
              variant="outlined"
              value={newAppointment.time}
              onChange={handleInputChange}
              required
            >
              {timeSlots.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              disabled
              label="Appointment Date"
              margin="normal"
              variant="outlined"
              value={selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSaveAppointment}
            disabled={!newAppointment.patientId || !newAppointment.type || !newAppointment.time}
          >
            Save Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Appointments; 