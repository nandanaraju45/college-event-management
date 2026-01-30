const express = require("express");
const router = express.Router();

const {
    createInstitution,
    deleteInstitution,
    getAllInstitutions,
} = require("../controllers/institutionController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

/*
  @route   POST /api/institutions
  @desc    Create institution
  @access  Admin only
*/
router.post(
    "/",
    protect,
    authorize("admin"),
    createInstitution
);

/*
  @route   DELETE /api/institutions/:id
  @desc    Delete institution
  @access  Admin only
*/
router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteInstitution
);

/*
  @route   GET /api/institutions
  @desc    View all institutions
  @access  Admin only
*/
router.get(
    "/",
    protect,
    authorize("admin"),
    getAllInstitutions
);

module.exports = router;
