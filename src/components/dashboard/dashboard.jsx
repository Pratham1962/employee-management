import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import UserTable from '../user_table/user_table';
import { fetchUserDetails, updateUserDetails, deleteUser } from '../../services/userService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);
  const [editLoading, setEditLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const fetchUsers = () => {
    const token = localStorage.getItem('token');
    
    if (token) {
      fetchUserDetails(token, page, rowsPerPage)
        .then(response => {
          setUsers(response.data);
          setTotalUsers(response.total);
        })
        .catch(error => {
          console.error('Failed to fetch user details', error);
          setSnackbar({
            open: true,
            message: 'Failed to fetch users',
            severity: 'error'
          });
        });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleEdit = (userId, userData) => {
    setEditLoading(true);
    updateUserDetails(userId, userData)
      .then(response => {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, ...userData } : user
        ));
        
        setSnackbar({
          open: true,
          message: 'User updated successfully',
          severity: 'success'
        });
      })
      .catch(error => {
        console.error('Error updating user:', error);
        setSnackbar({
          open: true,
          message: 'Failed to update user',
          severity: 'error'
        });
      })
      .finally(() => {
        setEditLoading(false);
      });
  };

  const handleDelete = (userId) => {
    deleteUser(userId)
      .then(() => {
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);
        
        setTotalUsers(prevTotal => prevTotal - 1);
        
        if (updatedUsers.length === 0 && page > 1) {
          setPage(page - 1);
        }

        setSnackbar({
          open: true,
          message: 'User deleted successfully',
          severity: 'success'
        });
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        setSnackbar({
          open: true,
          message: 'Failed to delete user',
          severity: 'error'
        });
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="dashboard-container">
      <AppBar position="static" sx={{ backgroundColor: '#5c5b5b' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            EmployWise Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <div className="dashboard-content">
        <UserTable
          users={users}
          rowsPerPage={rowsPerPage}
          totalUsers={totalUsers}
          page={page - 1}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          onEdit={handleEdit}
          onDelete={handleDelete}
          editLoading={editLoading}
        />
      </div>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Dashboard;
