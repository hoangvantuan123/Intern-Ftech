const { Router } = require('express')
const paginate = require('../services/paginate.service')
const { Post } = require('../models/post')
const md = require('marked');
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)
const multer = require('multer');
const router = new Router()



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

/* 
    Post image_path
    Đoạn code sẽ đc  định nghĩa một object storage sử dụng cho thư viện multer trong Node.js.
    Thư viện multer được sử dụng để xử lý file upload trong Node.js.
Cụ thể, object storage được định nghĩa với hai thuộc tính:
- destination: là đường dẫn đến thư mục trên server lưu trữ các file upload. Ví dụ ở đây là "./uploads".
- filename: là cách đặt tên file sau khi upload lên server. Ở đây, file sẽ được đặt tên bằng
 cách thêm thời gian hiện tại (bằng hàm Date.now()) và tên gốc của file upload (bằng thuộc tính file.originalname của object file).
Tóm lại, object storage sẽ trả về thông tin về đường dẫn đến thư mục để lưu file và tên file mới được đặt. Các thông tin này sẽ được sử dụng trong quá trình xử lý các file được upload lên server
*/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Create multer instance
const upload = multer({ storage: storage });



router.post('/', upload.single('image'), async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        category: req.body.category,
        author_id: req.body.author_id,
        slug: req.body.slug,
        sanitizedHtml: req.body.content,


        // Thêm các trường dữ liệu khác tương ứng với model
    });
    if (req.file) {
        post.image_path = `/uploads/${req.file.filename}`;
    }
    try {
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




/* router.put("/:id", (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body)
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
}); */
router.put('/:id', async (req, res) => {
    try {
        const { title, description, content, category } = req.body;
        let post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found')
        }
        post.title = title;
        post.description = description;
        post.content = content;
        post.category = category;
        post.slug = slugify(title, { lower: true, strict: true });
        await post.save();
        res.json(post);
    } catch (err) {
        console.error(err);
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