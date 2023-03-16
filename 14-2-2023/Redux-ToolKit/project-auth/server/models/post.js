const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const marked = require('marked');
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window);

const PostSchema = new Schema({
    title:
    {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 50,
        maxlength: 155,
    },
    content:
    {
        type: String,
        required: true
    },
    author_id:
    {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    image_path:
    {
        type: String,
        default: null,
    },
    created_at:
    {
        type: Date,
        default: Date.now()
    },
    category: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        require: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
});

PostSchema.pre('validate', function (next) {

    this.slug = slugify(this.title, { lower: true, strict: true });
    next();
})
const Post = mongoose.model("Post", PostSchema);
exports.Post = Post;



/* 
1. là một phương thức middleware trong mongoodb. để lmf sạch dữ liệu trước khi validating và save nó vào cơ sở dũ liệu

=> method này kiểm tra thuộc tính title xem nó đc định nghĩa hay chưa nếu có ồi
thì tạo một một biến slug từ biến title bằng cách sử dụng slugify để loại bỏ dấu vaf ký tự đặc biệt đi
    lower: true :::: để đổi sang chữ thường 
    strict: true :::: để loại bỏ những ký tự không hợp lệ.

    +> từ đó lưu và thuôcj tính slug


    Kiểm tra xem thuộc tính `content` đã được định nghĩa hay chưa, và nếu có, tạo chuỗi HTML từ `content` 
    bằng cách sử dụng `marked` để markup mã nguồn trong `content` và `dompurify` để loại bỏ bất kỳ tag HTML
     không an toàn nào khỏi chuỗi HTML. Kết quả sẽ được gán vào thuộc tính `sanitizedHtml`.
Cuối cùng, phương thức `next()` được gọi để cho phép middleware kế tiếp được thực thi.



`sanitizedHtml` trong Javascript là một hàm được sử dụng để loại bỏ 
hoặc xử lý một số phần tử nguy hiểm (như chứa mã độc, script bất hợp pháp, ...)
 trong chuỗi HTML. Việc sử dụng hàm này giúp tăng tính bảo mật cho ứng dụng web bằng
  cách loại bỏ các phần tử có thể đe dọa đến hệ thống,
 các cuộc tấn công tràn đường truyền hoặc tấn công dựa trên mã độc.
 */


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


