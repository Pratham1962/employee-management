import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditUserDialog from "../dialog/dialog";

const UserTable = ({
  users,
  page,
  rowsPerPage,
  totalUsers,
  handleChangePage,
  handleChangeRowsPerPage,
  onEdit,
  onDelete,
  editLoading
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const handleOpenDeleteDialog = (userId) => {
    setUserIdToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setUserIdToDelete(null);
  };

  const handleConfirmDelete = () => {
    onDelete(userIdToDelete);
    handleCloseDeleteDialog();
  };

  const handleOpenEditDialog = (user) => {
    setUserToEdit(user);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setUserToEdit(null);
  };

  const handleSaveUser = (userId, userData) => {
    onEdit(userId, userData);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <img
                    src={user.avatar}
                    alt="user avatar"
                    style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                  />
                </TableCell>
                <TableCell
                  style={{
                    width: "150px",
                    padding: "8px 24px 0px 0px",
                    textAlign: "center",
                  }}
                >
                  <IconButton
                    onClick={() => handleOpenEditDialog(user)}
                    color="primary"
                    aria-label="edit"
                    style={{ minWidth: "32px" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleOpenDeleteDialog(user.id)}
                    color="secondary"
                    aria-label="delete"
                    style={{ minWidth: "32px" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalUsers}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>

      <EditUserDialog 
        open={editDialogOpen}
        handleClose={handleCloseEditDialog}
        user={userToEdit}
        onSave={handleSaveUser}
        loading={editLoading}
      />
    </>
  );
};

export default UserTable;
