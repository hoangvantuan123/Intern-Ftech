const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostSchema = new Schema({

    title:
    {
        type: String,
        required: true
    },
    content:
    {
        type: String,
        required: true
    },
    author_id:
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    image_path:
    {
        type: String,
        default: null
    },
    created_at:
    {
        type: Date,
        default: Date.now()
    },
    category: {
        type: String,
        require: true
    }
});


const Post = mongoose.model("Post", PostSchema);
exports.Post = Post;

/* const post = new Post({
    id: '123abc',
    title: 'Cách nấu bò kho ngon',
    content: 'Hướng dẫn chi tiết cách nấu bò kho ngon và cách chọn thịt ngon',
    image_url: 'https://example.com/bokho.jpg',
    author_id: '64045939a3b2cbac5d9ac1f4',
    created_at: '2022-02-22',
    category: 'Ẩm thực',
});
post.save();
console.log(post); */



/* id: Một số duy nhất để định danh bài đăng.
title: Tiêu đề của bài đăng.
content: Nội dung chi tiết của bài đăng.
image_url: Đường dẫn đến hình ảnh (nếu có) được đính kèm với bài đăng.
author_id: id của người đăng bài, thông thường là một tài khoản người dùng khác trong hệ thống.
created_at: Thời gian tạo bài đăng, phục vụ cho việc sắp xếp, lọc và tag bài đăng.
category: Nhóm chủ đề của bài đăng, thông thường trong danh mục hoặc từ khóa tag.



 */