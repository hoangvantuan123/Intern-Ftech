const { Router } = require('express')
const paginate = require('../services/paginate.service')
const { Post } = require('../models/post')

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

router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        // Thêm các trường dữ liệu khác tương ứng với model
    });

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

router.put("/:id", (req, res) => {
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