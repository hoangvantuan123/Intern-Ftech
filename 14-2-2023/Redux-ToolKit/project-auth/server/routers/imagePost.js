const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const { Image } = require("../models/imagePost");


router.post("/", upload.single("image"), async (req, res) => {
    try {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        // Create new Image
        let image = new Image({
            name_image: req.body.name_image,
            image_url: result.secure_url,
            cloudinary_id: result.public_id,
            post_id: req.body.post_id,
            /*   post_id: req.body.post_id,
              author_id: req.body.author_id, */
        });
        // Save Image
        await image.save();
        res.json(image);
    } catch (err) {
        console.log(err);
    }
});

router.get('/', (req, res) => {
    Image.find()
        .then(image => {
            res.send(image);
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(500);
        })
});

router.delete("/:id", async (req, res) => {
    try {
        // Find Image by id
        let image = await Image.findById(req.params.id);
        // Delete image from cloudinary
        await cloudinary.uploader.destroy(image.cloudinary_id);
        // Delete Image from db
        await image.remove();
        res.json(image);
    } catch (err) {
        console.log(err);
    }
});

router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        let image = await Image.findById(req.params.id);
        // Delete image from cloudinary
        await cloudinary.uploader.destroy(image.cloudinary_id);
        // Upload image to cloudinary
        let result;
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
        }
        const data = {
            name_image: req.body.name || Image.name_image,
            image_url: result?.secure_url || Image.image_url,
            cloudinary_id: result?.public_id || Image.cloudinary_id,
            /*   post_id: req.body.name || Image.post_id,
              author_id: req.body.name || Image.author_id, */
        };
        Image = await Image.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(Image);
    } catch (err) {
        console.log(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        // Find Image by id
        let image = await Image.findById(req.params.id);
        res.json(image);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
