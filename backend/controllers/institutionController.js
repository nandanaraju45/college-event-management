const Institution = require("../models/Institution");

// CREATE institution
const createInstitution = async (req, res) => {
    try {
        const { name, code, email, phone, address } = req.body;

        const existingInstitution = await Institution.findOne({ code });
        if (existingInstitution) {
            return res
                .status(400)
                .json({ message: "Institution already exists" });
        }

        const institution = await Institution.create({
            name,
            code,
            email,
            phone,
            address,
            createdBy: req.user._id, // admin id
        });

        res.status(201).json(institution);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE institution
const deleteInstitution = async (req, res) => {
    try {
        const institution = await Institution.findById(req.params.id);

        if (!institution) {
            return res.status(404).json({ message: "Institution not found" });
        }

        await institution.deleteOne();

        res.json({ message: "Institution deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// VIEW all institutions
const getAllInstitutions = async (req, res) => {
    try {
        const institutions = await Institution.find().populate(
            "collegeAdmin",
            "name email"
        );

        res.json(institutions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createInstitution,
    deleteInstitution,
    getAllInstitutions,
};
