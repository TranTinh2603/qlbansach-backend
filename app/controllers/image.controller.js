



exports.uploadFile = async (req, res, next) => {
    try {
        console.log(req);
        console.log(req.file.path);
    } catch (error) {
        console.log(error);
    }
};