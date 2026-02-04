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
    InputAdornment,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NumbersIcon from "@mui/icons-material/Numbers";

import { useNavigate } from "react-router-dom";
import { useInstitution } from "../context/InstitutionContext";

/* 🌈 COMMON TEXTFIELD STYLE */
const commonTextFieldProps = {
    fullWidth: true,
    size: "small",
    variant: "outlined",
    sx: {
        "& .MuiOutlinedInput-root": {
            height: 48,
            borderRadius: 3,
            backgroundColor: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(6px)",
            transition: "all 0.25s ease",
            "&:hover": {
                boxShadow: "0 4px 12px rgba(102,126,234,0.2)",
            },
            "&.Mui-focused": {
                boxShadow: "0 0 0 3px rgba(102,126,234,0.25)",
            },
        },
        "& .MuiInputAdornment-root": {
            height: "100%",
            alignItems: "center",
        },
        "& svg": {
            color: "#667eea",
            fontSize: 22,
        },
    },
};

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
                message: "Institution created successfully 🎉",
                severity: "success",
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
        <Box
            maxWidth="md"
            mx="auto"
            mt={4}
            mb={6}
            sx={{
                background:
                    "linear-gradient(180deg, #eef2ff 0%, #fdfbff 100%)",
                p: 3,
                borderRadius: 5,
            }}
        >
            {/* 🌟 HEADER */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    p: 2.5,
                    mb: 4,
                    borderRadius: 4,
                    background:
                        "linear-gradient(135deg, #667eea, #764ba2)",
                    color: "#fff",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
                }}
            >
                <IconButton onClick={() => navigate(-1)} sx={{ color: "#fff" }}>
                    <ArrowBackIcon />
                </IconButton>
                <Box>
                    <Typography variant="h5" fontWeight="bold">
                        Add Institution
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.85 }}>
                        Create institution and admin account
                    </Typography>
                </Box>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
                {/* 🏫 INSTITUTION DETAILS */}
                <Card
                    sx={{
                        mb: 4,
                        borderRadius: 4,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                        background: "rgba(255,255,255,0.85)",
                        backdropFilter: "blur(8px)",
                    }}
                >
                    <CardContent>
                        <Typography fontWeight="bold" mb={0.5}>
                            🏫 Institution Details
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                            Basic information about the institution
                        </Typography>

                        <Divider sx={{ mb: 3 }} />

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Institution Name"
                                    name="name"
                                    required
                                    onChange={handleChange}
                                    {...commonTextFieldProps}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SchoolIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Institution Code"
                                    name="code"
                                    required
                                    onChange={handleChange}
                                    {...commonTextFieldProps}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <NumbersIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    required
                                    onChange={handleChange}
                                    {...commonTextFieldProps}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Phone"
                                    name="phone"
                                    required
                                    onChange={handleChange}
                                    {...commonTextFieldProps}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PhoneIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Address"
                                    name="address"
                                    required
                                    onChange={handleChange}
                                    {...commonTextFieldProps}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LocationOnIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                {/* 👤 ADMIN DETAILS */}
                <Card
                    sx={{
                        borderRadius: 4,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                        background: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(8px)",
                    }}
                >
                    <CardContent>
                        <Typography fontWeight="bold" mb={0.5}>
                            👤 College Admin Details
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                            Login credentials for admin access
                        </Typography>

                        <Divider sx={{ mb: 3 }} />

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Admin Name"
                                    name="adminName"
                                    required
                                    onChange={handleChange}
                                    {...commonTextFieldProps}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Admin Email"
                                    name="adminEmail"
                                    required
                                    onChange={handleChange}
                                    {...commonTextFieldProps}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Admin Phone"
                                    name="adminPhone"
                                    required
                                    onChange={handleChange}
                                    {...commonTextFieldProps}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PhoneIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    name="adminPassword"
                                    required
                                    onChange={handleChange}
                                    {...commonTextFieldProps}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Confirm Password"
                                    type="password"
                                    name="confirmPassword"
                                    required
                                    onChange={handleChange}
                                    {...commonTextFieldProps}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            sx={{
                                mt: 4,
                                py: 1.6,
                                borderRadius: 4,
                                fontWeight: "bold",
                                fontSize: "1rem",
                                color: "#fff",
                                background:
                                    "linear-gradient(135deg,#667eea,#764ba2)",
                                boxShadow: "0 8px 24px rgba(102,126,234,0.4)",
                                transition: "0.3s",
                                ":hover": {
                                    transform: "translateY(-3px)",
                                    boxShadow:
                                        "0 12px 32px rgba(102,126,234,0.6)",
                                },
                            }}
                        >
                            Create Institution
                        </Button>
                    </CardContent>
                </Card>
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddInstitutionPage;
