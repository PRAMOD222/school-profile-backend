const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Ensure the uploads folder exists in the root directory
const ROOT_UPLOADS_FOLDER = path.join(process.cwd(), "uploads");
if (!fs.existsSync(ROOT_UPLOADS_FOLDER)) {
    fs.mkdirSync(ROOT_UPLOADS_FOLDER, { recursive: true });
    console.log("Uploads folder created at:", ROOT_UPLOADS_FOLDER);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderType = req.uploadFolder || "categories";  

        const uploadPath = path.join(ROOT_UPLOADS_FOLDER, folderType);
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
};

const upload = multer({ storage, fileFilter });

const multerUpload = (fields, folder = "categories") => {
    return (req, res, next) => {

        req.uploadFolder = folder;
        const uploadFields = Object.keys(fields).map((key) => ({
            name: key,
            maxCount: fields[key] === "single" ? 1 : fields[key]
        }));

        const uploadHandler = upload.fields(uploadFields);

        uploadHandler(req, res, (err) => {
            if (err) return res.status(400).json({ error: err.message });

            // Ensure uploaded file paths are stored correctly
            req.files = Object.keys(req.files || {}).reduce((acc, key) => {
                acc[key] = req.files[key].map((file) => 
                    `/uploads/${file.path.replace(/\\/g, "/").split("/uploads/").pop()}`
                );
                return acc;
            }, {});

            next();
        });
    };
};

module.exports = multerUpload;
