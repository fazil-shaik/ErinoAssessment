import  { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, TablePagination, TableSortLabel, IconButton, CircularProgress, Alert,
  TextField, Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { motion, AnimatePresence } from 'framer-motion';

function ContactTable() {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [sortField, setSortField] = useState('lastName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `http://localhost:8080/api/contacts?page=${page + 1}&limit=${rowsPerPage}&sort=${sortField}&order=${sortOrder}`;
      console.log('Fetching contacts from:', url);
      
      const response = await axios.get(url);
      console.log('Response received:', response.data);
      
      setContacts(response.data.contacts);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      if (axios.isAxiosError(error)) {
        setError(`Failed to fetch contacts: ${error.message}. ${error.response?.data?.message || ''}`);
      } else {
        setError('An unexpected error occurred while fetching contacts.');
      }
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, sortField, sortOrder]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleSort = (field) => {
    const isAsc = sortField === field && sortOrder === 'asc';
    setSortField(field);
    setSortOrder(isAsc ? 'desc' : 'asc');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Failed to delete contact. Please try again.');
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (contact) => {
    setEditingId(contact._id);
    setEditFormData(contact);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/contacts/${editingId}`, editFormData);
      setEditingId(null);
      fetchContacts();
    } catch (error) {
      console.error('Error updating contact:', error);
      alert('Failed to update contact. Please try again.');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" style={{ margin: '20px 0' }}>
        {error}
        <br />
        <button onClick={fetchContacts} style={{ marginTop: '10px' }}>Retry</button>
      </Alert>
    );
  }

  return (
    <Paper elevation={3}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {['firstName', 'lastName', 'email', 'phoneNumber', 'company', 'jobTitle'].map((field) => (
                <TableCell key={field}>
                  <TableSortLabel
                    active={sortField === field}
                    direction={sortField === field ? sortOrder : 'asc'}
                    onClick={() => handleSort(field)}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <AnimatePresence>
              {contacts.map((contact) => (
                <motion.tr
                  key={contact._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {editingId === contact._id ? (
                    <>
                      <TableCell colSpan={7}>
                        <form onSubmit={handleEditFormSubmit}>
                          <TextField
                            name="firstName"
                            value={editFormData.firstName}
                            onChange={handleEditFormChange}
                            label="First Name"
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            name="lastName"
                            value={editFormData.lastName}
                            onChange={handleEditFormChange}
                            label="Last Name"
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            name="email"
                            value={editFormData.email}
                            onChange={handleEditFormChange}
                            label="Email"
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            name="phoneNumber"
                            value={editFormData.phoneNumber}
                            onChange={handleEditFormChange}
                            label="Phone Number"
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            name="company"
                            value={editFormData.company}
                            onChange={handleEditFormChange}
                            label="Company"
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            name="jobTitle"
                            value={editFormData.jobTitle}
                            onChange={handleEditFormChange}
                            label="Job Title"
                            fullWidth
                            margin="normal"
                          />
                          <Button type="submit" variant="contained" color="primary" startIcon={<SaveIcon />}>
                            Save
                          </Button>
                          <Button onClick={handleCancelEdit} variant="outlined" color="secondary" startIcon={<CancelIcon />}>
                            Cancel
                          </Button>
                        </form>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{contact.firstName}</TableCell>
                      <TableCell>{contact.lastName}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.phoneNumber}</TableCell>
                      <TableCell>{contact.company}</TableCell>
                      <TableCell>{contact.jobTitle}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEditClick(contact)} color="primary">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(contact._id)} color="secondary">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </>
                  )}
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default ContactTable;