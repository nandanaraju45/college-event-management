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
    Chip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
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
            setError(err.response?.data?.message || "Failed to load institutions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInstitutions();
        // eslint-disable-next-line
    }, []);

    const initials = (name) =>
        name
            ? name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()
            : "?";

    return (
        <>
            {/* Gradient Header */}
            <Box
                sx={{
                    background: "linear-gradient(135deg, #1976d2, #42a5f5)",
                    color: "white",
                    py: 4,
                }}
            >
                <Container maxWidth="lg">
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center" gap={2}>
                            <IconButton onClick={() => navigate(-1)} sx={{ color: "white" }}>
                                <ArrowBackIcon />
                            </IconButton>
                            <Box>
                                <Typography variant="h5" fontWeight={700}>
                                    Institutions
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                    Manage all registered institutions
                                </Typography>
                            </Box>
                        </Box>

                        <Box>
                            <IconButton onClick={fetchInstitutions} sx={{ color: "white" }}>
                                <RefreshIcon />
                            </IconButton>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                sx={{
                                    ml: 1,
                                    bgcolor: "#fff",
                                    color: "#1976d2",
                                    fontWeight: 600,
                                    "&:hover": { bgcolor: "#f5f5f5" },
                                }}
                                onClick={() => navigate("/add-institution")}
                            >
                                Add Institution
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ mt: 5, mb: 6 }}>
                {loading ? (
                    <Box textAlign="center" mt={6}>
                        <CircularProgress />
                        <Typography mt={2} color="text.secondary">
                            Loading institutions...
                        </Typography>
                    </Box>
                ) : error ? (
                    <Alert severity="error">{error}</Alert>
                ) : institutions.length === 0 ? (
                    <Box textAlign="center" mt={8}>
                        <BusinessIcon sx={{ fontSize: 60, color: "text.secondary" }} />
                        <Typography variant="h6" mt={2}>
                            No Institutions Found
                        </Typography>
                        <Typography color="text.secondary" mb={3}>
                            Start by adding your first institution
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigate("/add-institution")}
                        >
                            Add Institution
                        </Button>
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {institutions.map((inst) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                key={inst._id}
                                sx={{ display: "flex" }} // Make grid item flex
                            >
                                <Card
                                    sx={{
                                        flex: 1, // Fill width
                                        height: 280, // Reduced height
                                        borderRadius: 3,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        transition: "0.3s",
                                        "&:hover": {
                                            transform: "translateY(-5px)",
                                            boxShadow: 6,
                                        },
                                    }}
                                >
                                    <CardContent>
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Avatar
                                                sx={{
                                                    bgcolor: "primary.main",
                                                    width: 56,
                                                    height: 56,
                                                    fontSize: 20,
                                                }}
                                            >
                                                {initials(inst.name)}
                                            </Avatar>

                                            <Box flexGrow={1} sx={{ overflow: "hidden" }}>
                                                <Typography
                                                    fontWeight={700}
                                                    noWrap
                                                    title={inst.name}
                                                >
                                                    {inst.name}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    noWrap
                                                    title={`Code: ${inst.code}`}
                                                >
                                                    Code: {inst.code}
                                                </Typography>
                                            </Box>

                                            <Chip
                                                size="small"
                                                label={inst.status || "ACTIVE"}
                                                color={inst.status === "PENDING" ? "warning" : "success"}
                                            />
                                        </Box>

                                        <Divider sx={{ my: 2 }} />

                                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                                            <EmailIcon fontSize="small" color="action" />
                                            <Typography
                                                variant="body2"
                                                noWrap
                                                title={inst.email}
                                            >
                                                {inst.email}
                                            </Typography>
                                        </Box>

                                        <Box display="flex" alignItems="center" gap={1}>
                                            <PhoneIcon fontSize="small" color="action" />
                                            <Typography
                                                variant="body2"
                                                noWrap
                                                title={inst.phone}
                                            >
                                                {inst.phone}
                                            </Typography>
                                        </Box>

                                        {inst.collegeAdmin && (
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                display="block"
                                                mt={1}
                                                noWrap
                                                title={`Admin: ${inst.collegeAdmin.name}`}
                                            >
                                                Admin: {inst.collegeAdmin.name}
                                            </Typography>
                                        )}
                                    </CardContent>

                                    <Box textAlign="center" p={1}>
                                        <Button
                                            size="small"
                                            onClick={() => navigate(`/institutions/${inst._id}`)}
                                        >
                                            View Details →
                                        </Button>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </>
    );
};

export default InstitutionListPage;
