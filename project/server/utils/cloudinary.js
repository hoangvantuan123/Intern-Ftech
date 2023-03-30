const cloudinary = require("cloudinary").v2;

// Configuration 
cloudinary.config({
  cloud_name: "dmww1lwwp",
  api_key: "491647391241326",
  api_secret: "wBy7UO83iyZLxKrJUSOGb8sXsl4"
});
module.exports = cloudinary;
