// Kiểm tra xem có đối tượng của mình có nhận giá trị trống không.
// Kiểm tra giá trị được truyền vào có phải là Undefined hay null hoặc độ dài đối tượng(obkect) hay độ dài bằng 0
 

const isEmpty = (value) => {
    return(
        value === undefined ||
        value === null ||
        // Object.key() luôn trả về một mảng.
        (typeof value === 'object' && Object.keys(value).length === 0 ) ||
        (typeof value === 'string' && value.trim(value).length === 0 ) 
    )
}
module.exports = isEmpty;

