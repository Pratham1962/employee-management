import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Box
} from "@mui/material";

const EditUserDialog = ({ open, handleClose, user, onSave, loading }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: ""
  });
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: ""
  });
  const [touched, setTouched] = useState({
    first_name: false,
    last_name: false,
    email: false
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    setTouched({
      ...touched,
      [name]: true // Mark the field as touched immediately on change
    });

    // Validate the field on change
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = "";

    if (name === "first_name" && !value) {
      errorMessage = "First Name is required";
    }
    if (name === "last_name" && !value) {
      errorMessage = "Last Name is required";
    }
    if (name === "email") {
      if (!value) {
        errorMessage = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        errorMessage = "Email is invalid";
      }
    }

    setErrors({
      ...errors,
      [name]: errorMessage
    });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((name) => {
      validateField(name, formData[name]);
      if (errors[name]) {
        newErrors[name] = errors[name];
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(user.id, formData);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            autoFocus
            name="first_name"
            label="First Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.first_name}
            onChange={handleChange}
            error={touched.first_name && !!errors.first_name}
            helperText={touched.first_name && errors.first_name}
          />
          <TextField
            name="last_name"
            label="Last Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.last_name}
            onChange={handleChange}
            error={touched.last_name && !!errors.last_name}
            helperText={touched.last_name && errors.last_name}
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            error={touched.email && !!errors.email}
            helperText={touched.email && errors.email}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
