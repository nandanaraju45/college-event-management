import React from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Paper,
    InputAdornment,
    IconButton,
    Snackbar,
    Alert
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: "",
        severity: "success",
    });

    const handleLogin = async () => {
        try {
            await login(email, password);

            setSnackbar({
                open: true,
                message: "Login successful",
                severity: "success",
            });

            // get user from localStorage (set by AuthContext)
            const user = JSON.parse(localStorage.getItem("user"));

            // role-based navigation
            if (user.userType === "admin") {
                navigate("/admin-home");
            } else {
                navigate("/home"); // placeholder (you'll customize later)
            }
        } catch (error) {
            setSnackbar({
                open: true,
                message:
                    error.response?.data?.message || "Login failed",
                severity: "error",
            });
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #1976d2, #42a5f5)",
                display: "flex",
                alignItems: "center",
            }}
        >
            <Container maxWidth="sm">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Paper
                        elevation={10}
                        sx={{ p: 4, borderRadius: 4, textAlign: "center" }}
                    >
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            CampusConnect
                        </Typography>

                        <Typography color="text.secondary" mb={3}>
                            Login to your account
                        </Typography>

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ mt: 3, py: 1.2 }}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>

                        <Typography mt={2}>
                            Don’t have an account?{" "}
                            <span
                                style={{
                                    color: "#1976d2",
                                    cursor: "pointer",
                                }}
                                onClick={() => navigate("/register")}
                            >
                                Register
                            </span>
                        </Typography>
                    </Paper>
                </motion.div>
            </Container>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() =>
                    setSnackbar({ ...snackbar, open: false })
                }
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    severity={snackbar.severity}
                    onClose={() =>
                        setSnackbar({ ...snackbar, open: false })
                    }
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default LoginPage;
