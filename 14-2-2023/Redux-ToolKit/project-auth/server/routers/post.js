const { Router } = require('express');
const paginate = require('../services/paginate.service');
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const { Post } = require('../models/post');
const md = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window);
const router = new Router();



const serializer = (post) => {
    return post.toObject({ versionKey: false })
}

router.get('/', async (req, res) => {
    const posts = await paginate(Post.find({}), req)
    res.send(posts.map(serializer))
})

/*   router.post('/', async (req, res) => {
    const post = await new Post(req.body.post).save()
    res.send(serializer(post))
  })
   */


// API cho bài viết
router.get("/", (req, res) => {
    Post.find()
        .populate("author")
        .then(posts => {
            res.send(posts);
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(500);
        });
});

router.get('/:slug', async (req, res) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug })
        if (!post) {
            throw new Error('Post not found')
        }

        res.json(post)
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
})





router.post('/', upload.single("image"), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const post = new Post({

            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            category: req.body.category,
            author_id: req.body.author_id,
            sanitizedHtml: req.body.content,
            // Thêm các trường dữ liệu khác tương ứng với model
        });
        post.slug = slugify(post.title || '', { lower: true, strict: true });

        post.image_url = result.secure_url;
        post.cloudinary_id = result.public_id;
        post.name_image = req.file.name_image;
        const savedPost = await post.save(); // Lưu bài viết vào database
        res.status(201).json({ success: true, message: 'Bài đăng đã được tạo thành công!', post: savedPost }); // Trả về kết quả sau khi lưu bài đăng
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Có lỗi xảy ra khi lưu bài đăng!' });
    }

});





router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author');

        if (post) {
            res.send(post);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});


/* router.put('/:id', async (req, res) => {
    try {
        const { title, description, content, category } = req.body;
        let post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found')
        }
        post.title = title;
        post.description = description;
        post.content = content;
        post.image_path = image_path;
        post.category = category;
        post.slug = slugify(title, { lower: true, strict: true });
        await post.save();
        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}); */
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { id, title, description, content, category } = req.body;
        let post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            post.cloudinary_id = result.public_id;
            post.image_url = result.secure_url;
            post.name_image = req.file.originalname; // Sửa lại tên trường name_image để phù hợp với đoạn code ở phía client
        }

        post.title = title;
        post.description = description;
        post.content = content;
        post.category = category;
        post.slug = slugify(title, { lower: true, strict: true });

        await post.save();

        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


router.delete("/:id", (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(post => {
            if (post) {
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(500);
        });
});



module.exports = router