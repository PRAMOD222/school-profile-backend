const SchoolProfile = require("../models/SchoolProfile");
const multerUpload = require("../utils/multerHelper"); // Import Multer helper

const path = require("path");
const fs = require("fs");


// Upload configuration
const uploadFields = {
    logo: "single",
};


exports.createSchoolProfile = async (req, res) => {

    multerUpload(uploadFields, "schoolProfile")(req, res, async (err) => {

        if (err) {
            return res.status(400).json({ error: err.message });
        }
        try {
            const { name, address, phone, email, city, googleMapLink, vision, mission, aboutSchool, subDomain } = req.body;
            const schoolProfile = await SchoolProfile.create({
                name,
                address,
                phone,
                email,
                logo: req.files.logo ? req.files.logo[0] : null,
                accountId: req.user.id,
                subDomain,
                city,
                googleMapLink,
                vision,
                mission,
                aboutSchool
            });

            res.status(201).json(schoolProfile);
        } catch (error) {
            res.status(500).json({ message: error.message });

        }
    });
};

exports.updateSchoolProfile = async (req, res) => {
    multerUpload(uploadFields, "schoolProfile")(req, res, async (err) => {
        if (err) return res.status(400).json({ error: err.message });

        try {
            const { name, address, phone, email, city, googleMapLink, vision, mission, aboutSchool, subDomain } = req.body;
            const schoolProfile = await SchoolProfile.findById(req.params.id);

            if (!schoolProfile) {
                return res.status(404).json({ message: "School profile not found" });
            }
            schoolProfile.name = name;
            schoolProfile.address = address;
            schoolProfile.phone = phone;
            schoolProfile.email = email;
            schoolProfile.city = city;
            schoolProfile.googleMapLink = googleMapLink;
            schoolProfile.vision = vision;
            schoolProfile.mission = mission;
            schoolProfile.aboutSchool = aboutSchool;
            schoolProfile.subDomain = subDomain;

            if (req.files.logo) {
                schoolProfile.logo = req.files.logo[0];
            }

            await schoolProfile.save();

            res.status(200).json(schoolProfile);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
};

exports.deleteSchoolProfile = async (req, res) => {
    try {
        const schoolProfile = await SchoolProfile.findByIdAndDelete(req.params.id);

        if (!schoolProfile) {
            return res.status(404).json({ message: "School profile not found" });
        }

        if (schoolProfile.logo) {
            const imagePath = path.join(__dirname, "..", schoolProfile.logo);
            fs.unlink(imagePath, (err) => {
                if (err) console.error("Error deleting logo:", err);
            });
        }

        res.status(200).json({ message: "School profile deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSchoolProfilesByDomain = async (req, res) => {
    try {
        const schoolProfile = await SchoolProfile.findOne({ subDomain: req.params.subDomain });

        if (!schoolProfile) {
            return res.status(404).json({ message: "School profile not found" });
        }

        console.log("schoolProfile:", schoolProfile);
        res.status(200).json(schoolProfile); // Sending an object, not an array
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getProfileById = async (req, res) => {
    try {
        // console.log("req.user.id", req.user.id);
        
        const schoolProfile = await SchoolProfile.findOne({ accountId: req.user.id });
        if (!schoolProfile) {
            return res.status(404).json({ message: "School profile not found" });
        }
        res.status(200).json(schoolProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.checkSubdomainAvailability = async (req, res) => {
    try {
        const subDomain = req.params.subDomain.toLowerCase(); // Ensure consistency
        const userId = req.user.id; // Get user ID from auth middleware

        if (!subDomain) {
            return res.status(400).json({ success: false, message: "Subdomain is required" });
        }

        const existingProfile = await SchoolProfile.findOne({ subDomain });

        

        // If subdomain exists, check if it belongs to the same user
        if (existingProfile) {
            if (existingProfile.accountId.toString() === userId) {
                return res.json({ success: true, available: true, message: "Subdomain belongs to you" });
            } else {
                return res.json({ success: false, available: false, message: "Subdomain is already taken" });
            }
        }

        return res.json({ success: true, available: true, message: "Subdomain is available" });
    } catch (error) {
        console.error("Error checking subdomain availability:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.getAllSchoolProfiles = async (req, res) => {
    try {
        const schoolProfiles = await SchoolProfile.find({});
        res.json(schoolProfiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


