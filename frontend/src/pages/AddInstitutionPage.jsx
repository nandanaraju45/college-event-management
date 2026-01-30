import { useState } from "react";
import {
    TextField,
    Button,
    Box,
    Typography,
    Snackbar,
    Alert,
    Card,
    CardContent,
    Grid,
    Divider,
    IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useInstitution } from "../context/InstitutionContext";

const AddInstitutionPage = () => {
    const { registerCollegeAdmin, createInstitution } = useInstitution();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        code: "",
        email: "",
        phone: "",
        address: "",
        adminName: "",
        adminEmail: "",
        adminPhone: "",
        adminPassword: "",
        confirmPassword: "",
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.adminPassword !== formData.confirmPassword) {
            setSnackbar({
                open: true,
                message: "Passwords do not match",
                severity: "error",
            });
            return;
        }

        try {
            const adminRes = await registerCollegeAdmin({
                name: formData.adminName,
                email: formData.adminEmail,
                phone: formData.adminPhone,
                password: formData.adminPassword,
                userType: "college_admin",
            });

            await createInstitution({
                name: formData.name,
                code: formData.code,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                collegeAdmin: adminRes._id,
            });

            setSnackbar({
                open: true,
                message: "Institution created successfully",
                severity: "success",
            });

            setFormData({
                name: "",
                code: "",
                email: "",
                phone: "",
                address: "",
                adminName: "",
                adminEmail: "",
                adminPhone: "",
                adminPassword: "",
                confirmPassword: "",
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.response?.data?.message || "Something went wrong",
                severity: "error",
            });
        }
    };

    return (
        <Box maxWidth="md" mx="auto" mt={4}>
            {/* Header */}
            <Box display="flex" alignItems="center" mb={2}>
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5" fontWeight="bold">
                    Add Institution
                </Typography>
            </Box>

            <Card elevation={4} sx={{ borderRadius: 3 }}>
                <CardContent>
                    <Box component="form" onSubmit={handleSubmit}>
                        {/* Institution Section */}
                        <Typography variant="h6" gutterBottom>
                            Institution Details
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Institution Name" name="name" fullWidth required onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Institution Code" name="code" fullWidth required onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Institution Email" name="email" fullWidth required onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Phone" name="phone" fullWidth required onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Address" name="address" fullWidth multiline rows={2} onChange={handleChange} />
                            </Grid>
                        </Grid>

                        {/* Admin Section */}
                        <Typography variant="h6" mt={4} gutterBottom>
                            College Admin Details
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Admin Name" name="adminName" fullWidth required onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Admin Email" name="adminEmail" fullWidth required onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Admin Phone" name="adminPhone" fullWidth required onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Password" name="adminPassword" type="password" fullWidth required onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Confirm Password" name="confirmPassword" type="password" fullWidth required onChange={handleChange} />
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{ mt: 4, borderRadius: 2 }}
                        >
                            Create Institution
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleClose}>
                <Alert severity={snackbar.severity} onClose={handleClose}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddInstitutionPage;
