const multer = require("multer");

// Create utility function for multer configuration
const configureMulter = (destination) => {
  return multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, destination);
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "_" + file.originalname);
      },
      fileFilter: function (req, file, cb) {
        // Accept only images
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new Error("Only image files are allowed!"), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
      },
    }),
  });
};

// Create separate upload instances for different purposes
const postUpload = configureMulter("uploads/posts");
const avatarUpload = configureMulter("uploads/avatars");

// Export the route and multer configurations
module.exports = {
  postUpload,
  avatarUpload,
};
