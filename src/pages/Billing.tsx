import React, { useState } from 'react';
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
    Card,
    CardContent,
    Chip,
    MenuItem,
    InputAdornment,
    Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PrintIcon from '@mui/icons-material/Print';
import SearchIcon from '@mui/icons-material/Search';
import { format } from 'date-fns';

interface Bill {
    id: string;
    billNumber: string;
    patientId: string;
    patientName: string;
    date: Date;
    items: BillItem[];
    totalAmount: number;
    status: 'Pending' | 'Paid' | 'Cancelled';
    paymentMethod?: string;
    notes?: string;
}

interface BillItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
}

const Billing: React.FC = () => {
    const [bills, setBills] = useState<Bill[]>([
        {
            id: '1',
            billNumber: 'BILL-001',
            patientId: 'P001',
            patientName: 'John Doe',
            date: new Date(),
            items: [
                {
                    id: '1',
                    description: 'Consultation Fee',
                    quantity: 1,
                    unitPrice: 100,
                    amount: 100
                },
                {
                    id: '2',
                    description: 'Medicine',
                    quantity: 2,
                    unitPrice: 50,
                    amount: 100
                }
            ],
            totalAmount: 200,
            status: 'Paid',
            paymentMethod: 'Credit Card'
        }
    ]);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
    const [formData, setFormData] = useState<Partial<Bill>>({});
    const [searchTerm, setSearchTerm] = useState('');

    const handleOpenDialog = (bill?: Bill) => {
        if (bill) {
            setSelectedBill(bill);
            setFormData(bill);
        } else {
            setSelectedBill(null);
            setFormData({
                billNumber: `BILL-${String(bills.length + 1).padStart(3, '0')}`,
                date: new Date(),
                items: [],
                totalAmount: 0,
                status: 'Pending'
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedBill(null);
        setFormData({});
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveBill = () => {
        if (selectedBill) {
            setBills(prev => prev.map(bill =>
                bill.id === selectedBill.id
                    ? { ...formData as Bill }
                    : bill
            ));
        } else {
            const newBill: Bill = {
                ...formData as Bill,
                id: String(bills.length + 1)
            };
            setBills(prev => [...prev, newBill]);
        }
        handleCloseDialog();
    };

    const handleDeleteBill = (id: string) => {
        if (window.confirm('Are you sure you want to delete this bill?')) {
            setBills(prev => prev.filter(bill => bill.id !== id));
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Paid':
                return 'success';
            case 'Pending':
                return 'warning';
            case 'Cancelled':
                return 'error';
            default:
                return 'default';
        }
    };

    const filteredBills = bills.filter(bill =>
        bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.patientId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">Billing Management</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                >
                    New Bill
                </Button>
            </Box>

            <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 3, 
                mb: 3 
            }}>
                <Box sx={{ 
                    flex: { xs: '1 1 100%', md: '1 1 calc(25% - 24px)' },
                    minWidth: { xs: '100%', md: 'calc(25% - 24px)' }
                }}>
                    <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
                        <CardContent>
                            <Typography variant="h6">Total Revenue</Typography>
                            <Typography variant="h4">
                                ${bills.reduce((acc, bill) => acc + bill.totalAmount, 0).toFixed(2)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box sx={{ 
                    flex: { xs: '1 1 100%', md: '1 1 calc(25% - 24px)' },
                    minWidth: { xs: '100%', md: 'calc(25% - 24px)' }
                }}>
                    <Card sx={{ bgcolor: 'success.main', color: 'white' }}>
                        <CardContent>
                            <Typography variant="h6">Paid Bills</Typography>
                            <Typography variant="h4">
                                {bills.filter(bill => bill.status === 'Paid').length}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box sx={{ 
                    flex: { xs: '1 1 100%', md: '1 1 calc(25% - 24px)' },
                    minWidth: { xs: '100%', md: 'calc(25% - 24px)' }
                }}>
                    <Card sx={{ bgcolor: 'warning.main', color: 'white' }}>
                        <CardContent>
                            <Typography variant="h6">Pending Bills</Typography>
                            <Typography variant="h4">
                                {bills.filter(bill => bill.status === 'Pending').length}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box sx={{ 
                    flex: { xs: '1 1 100%', md: '1 1 calc(25% - 24px)' },
                    minWidth: { xs: '100%', md: 'calc(25% - 24px)' }
                }}>
                    <Card sx={{ bgcolor: 'error.main', color: 'white' }}>
                        <CardContent>
                            <Typography variant="h6">Cancelled Bills</Typography>
                            <Typography variant="h4">
                                {bills.filter(bill => bill.status === 'Cancelled').length}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                    label="Search Bills"
                    variant="outlined"
                    size="small"
                    sx={{ flex: 1 }}
                    placeholder="Search by Bill Number, Patient Name, or ID"
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
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Bill Number</TableCell>
                            <TableCell>Patient Name</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Payment Method</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredBills.map((bill) => (
                            <TableRow key={bill.id}>
                                <TableCell>{bill.billNumber}</TableCell>
                                <TableCell>{bill.patientName}</TableCell>
                                <TableCell>{format(bill.date, 'PP')}</TableCell>
                                <TableCell align="right">${bill.totalAmount.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={bill.status}
                                        color={getStatusColor(bill.status)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{bill.paymentMethod || '-'}</TableCell>
                                <TableCell align="center">
                                    <IconButton size="small" onClick={() => handleOpenDialog(bill)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton size="small" onClick={() => handleDeleteBill(bill.id)}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                    <IconButton size="small">
                                        <PrintIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>{selectedBill ? 'Edit Bill' : 'New Bill'}</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, pt: 1 }}>
                        <TextField
                            label="Bill Number"
                            name="billNumber"
                            value={formData.billNumber || ''}
                            onChange={handleInputChange}
                            fullWidth
                            margin="dense"
                            disabled
                        />
                        <TextField
                            label="Patient ID"
                            name="patientId"
                            value={formData.patientId || ''}
                            onChange={handleInputChange}
                            fullWidth
                            margin="dense"
                            required
                        />
                        <TextField
                            label="Patient Name"
                            name="patientName"
                            value={formData.patientName || ''}
                            onChange={handleInputChange}
                            fullWidth
                            margin="dense"
                            required
                        />
                        <TextField
                            label="Date"
                            name="date"
                            type="date"
                            value={formData.date ? format(new Date(formData.date), 'yyyy-MM-dd') : ''}
                            onChange={handleInputChange}
                            fullWidth
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            select
                            label="Status"
                            name="status"
                            value={formData.status || ''}
                            onChange={handleInputChange}
                            fullWidth
                            margin="dense"
                        >
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Paid">Paid</MenuItem>
                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                        </TextField>
                        <TextField
                            select
                            label="Payment Method"
                            name="paymentMethod"
                            value={formData.paymentMethod || ''}
                            onChange={handleInputChange}
                            fullWidth
                            margin="dense"
                        >
                            <MenuItem value="Cash">Cash</MenuItem>
                            <MenuItem value="Credit Card">Credit Card</MenuItem>
                            <MenuItem value="Insurance">Insurance</MenuItem>
                            <MenuItem value="Online Payment">Online Payment</MenuItem>
                        </TextField>
                        <TextField
                            label="Notes"
                            name="notes"
                            value={formData.notes || ''}
                            onChange={handleInputChange}
                            fullWidth
                            multiline
                            rows={3}
                            margin="dense"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveBill}
                    >
                        {selectedBill ? 'Save Changes' : 'Create Bill'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Billing; 