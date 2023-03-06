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

router.post('/', (req, res, next) => {
    req.post = new Post();
    /* post.save()
        .then(savedPost => {
            // Trả về kết quả sau khi lưu bài đăng
            res.json({ success: true, message: 'Bài đăng đã được tạo thành công!', posts: savedPost });
        })
        .catch(error => {
            console.log(error);
            res.json({ success: false, message: 'Có lỗi xảy ra khi lưu bài đăng!' });
        }); */
    next()
}, savepostAndRedirect('new'))




router.get("/:id", (req, res) => {
    Post.findById(req.params.id)
        .populate("author")
        .then(post => {
            if (post) {
                res.send(post);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(500);
        });
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

function savepostAndRedirect(path) {
    return async (req, res) => {
        let post = req.post
        post.title = req.body.title
        post.content = req.body.content
        try {
            post = await post.save()
        } catch (e) {
            res.render(`posts/${path}`, { post: post })
        }
    }
}

module.exports = router