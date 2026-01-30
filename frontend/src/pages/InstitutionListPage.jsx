import { useEffect, useState } from "react";
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
    IconButton,
    CircularProgress,
    Button,
    Alert,
    Divider,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import BusinessIcon from "@mui/icons-material/Business";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useInstitution } from "../context/InstitutionContext";
import { useNavigate } from "react-router-dom";

const InstitutionListPage = () => {
    const { getAllInstitutions } = useInstitution();
    const navigate = useNavigate();

    const [institutions, setInstitutions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchInstitutions = async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getAllInstitutions();
            setInstitutions(data || []);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to load institutions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInstitutions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const initials = (name) => {
        if (!name) return "?";
        return name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
            {/* Header */}
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                <Box display="flex" alignItems="center" gap={2}>
                    <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }} aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                    <Box>
                        <Typography variant="h5" fontWeight={700}>
                            Institutions
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            All registered institutions in the system
                        </Typography>
                    </Box>
                </Box>

                <Box>
                    <IconButton onClick={fetchInstitutions} aria-label="refresh">
                        <RefreshIcon />
                    </IconButton>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => navigate("/add-institution")}
                        sx={{ ml: 1 }}
                    >
                        Add Institution
                    </Button>
                </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {loading ? (
                <Box display="flex" justifyContent="center" mt={6}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : institutions.length === 0 ? (
                <Box textAlign="center" mt={8}>
                    <Typography variant="h6" gutterBottom>
                        No institutions found
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={3}>
                        You can add your first institution using the button below.
                    </Typography>
                    <Button variant="contained" onClick={() => navigate("/add-institution")}>
                        Add Institution
                    </Button>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {institutions.map((inst) => (
                        <Grid item xs={12} sm={6} md={4} key={inst._id}>
                            <Card elevation={3} sx={{ borderRadius: 2, height: "100%" }}>
                                <CardContent>
                                    <Box display="flex" alignItems="center" gap={2} mb={1}>
                                        <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
                                            {initials(inst.name)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6" fontWeight={700} noWrap>
                                                {inst.name}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                Code: {inst.code} • Status: {inst.status}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box mt={2}>
                                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                                            <strong>Email:</strong> {inst.email}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                                            <strong>Phone:</strong> {inst.phone}
                                        </Typography>
                                        {inst.address && (
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                <strong>Address:</strong> {inst.address}
                                            </Typography>
                                        )}

                                        {inst.collegeAdmin && (
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                <strong>College Admin:</strong> {inst.collegeAdmin.name} ({inst.collegeAdmin.email})
                                            </Typography>
                                        )}
                                    </Box>

                                    <Box display="flex" justifyContent="flex-end" mt={2}>
                                        <Button size="small" onClick={() => navigate(`/institutions/${inst._id}`)}>
                                            View
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default InstitutionListPage;
