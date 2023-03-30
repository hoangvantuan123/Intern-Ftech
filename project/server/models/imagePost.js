const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const imageSchema = new Schema({
    name_image: {
        type: String,
    },
    image_url: {
        type: String,
    },
    cloudinary_id: {
        type: String,
    },
    post_id: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
   /*  post_id: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    author_id:
    {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "User"
    }, */
});

const Image = mongoose.model('Image', imageSchema);
exports.Image = Image;  