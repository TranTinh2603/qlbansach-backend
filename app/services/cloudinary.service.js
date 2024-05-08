const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: 'dekxyxc1s',
    api_key: '939637168721787',
    api_secret: 'D9lfWdTQ6UMAkCXl6XY4zw3HV7Y'
});

// const storage = new CloudinaryStorage({
//     cloudinary,
//     allowedFormats: ['jpg', 'png'],
//     params: {
//         folder: 'user'
//     }
// });
const uploadCloud = (folder) => {
    const storage = new CloudinaryStorage({
        cloudinary,
        allowedFormats: ['jpg', 'png'],
        params: {
            folder: folder // Sử dụng giá trị của thư mục được truyền vào từ bên ngoài
        }
    });

    return multer({ storage });
};
// const uploadCloud = multer({ storage });

module.exports = uploadCloud;
