const ApiError = require("../api-error");
const MessageService = require("../services/message.service");
const MongoDB = require("../utils/mongodb.util");

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const messageService = new MessageService(MongoDB.client);
        // const { MSHH } = req.query;
        // if (MSHH) {
        //     documents = await productService.findByMSHH(MSHH);
        // } else {
        documents = await messageService.find({});
        // }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacs")
        );
    };

    return documents;

}

exports.create = async (data) => {
    if (!data?.senderId) {
        return "Name can not empty";
    }

    try {
        const messageService = new MessageService(MongoDB.client);
        const document = await messageService.create(data);
        return document;
    } catch (error) {
        console.log(error);
    }
};


// exports.findBySenderIdAndReceiverId = async (req, res, next) => {
//     let documents = [];
//     try {
//         const messageService = new MessageService(MongoDB.client);
//         // const { MSHH } = req.query;
//         // if (MSHH) {
//         //     documents = await productService.findByMSHH(MSHH);
//         // } else {
//         documents = await messageService.findBySenderIdAndReceiverId(senderId, receiverId);
//         // }
//     } catch (error) {
//         return next(
//             new ApiError(500, "An error occurred while retrieving contacs")
//         );
//     };

//     return documents;

// }

exports.findBySenderIdAndReceiverId = async (senderId, receiverId) => {
    let documents = [];
    try {
        const messageService = new MessageService(MongoDB.client);
        // const { MSHH } = req.query;
        // if (MSHH) {
        //     documents = await productService.findByMSHH(MSHH);
        // } else {
        documents = await messageService.findBySenderIdAndReceiverId(senderId, receiverId);
        // }
    } catch (error) {
        console.log(error);
    };

    return documents;

}