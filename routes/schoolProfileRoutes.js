const express = require("express");
const router = express.Router();
const { createSchoolProfile, updateSchoolProfile, deleteSchoolProfile, getSchoolProfilesByDomain, getProfileById, checkSubdomainAvailability, getAllSchoolProfiles } = require("../controllers/schoolProfileController");
const authmiddleware = require("../middleware/authMiddleware");



router.post("/add", authmiddleware, createSchoolProfile);
router.put("/update/:id", authmiddleware, updateSchoolProfile);
router.delete("/delete/:id", authmiddleware, deleteSchoolProfile);
router.get('/get-by-domain/:subDomain', getSchoolProfilesByDomain);
router.get('/get-profile', authmiddleware, getProfileById);
router.get('/check-subdomain/:subDomain', authmiddleware, checkSubdomainAvailability);

router.get("/all", getAllSchoolProfiles);

module.exports = router;

