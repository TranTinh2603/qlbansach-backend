const ApiError = require("../api-error");
const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");

// exports.create = async (req, res, next) => {
//    if (!req.body?.UserID) {
//         return next(new ApiError(404,"Name can not empty"));
//    }

//    try {
//         const userService = new UserService(MongoDB.client);
//         const checkEmail = await userService.findByEmail(req.body.Email);
//         if (!checkEmail) {
//             const document = await userService.create(req.body);
//             return res.send(document);
//         } else {
//             return res.send({message : "Email đã tồn tại"})
//         }
        
//    } catch (error) {
//         return next(
//             new ApiError(500, "An error occurred while creating the staff")
//         );
//    }
// };

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const userService = new UserService(MongoDB.client);
        documents = await userService.find({});
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacs")
        );
    };
    return res.send(documents);

};
exports.findByUserId = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.findByUserId(req.params.userId);
        if (!document) {
            return next(new ApiError(404, "Contact not fuond"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500, `Error retrieving contact with id=${req.params.userId}`
            )
        );
    }
}
exports.findByEmail = async (req, res, next) => {
    try {
        let document = []
        const userService = new UserService(MongoDB.client);
        document = await userService.findByEmail(req.params.email);
        if (!document) {
            document = await userService.findByName(req.params.email);
            // return next(new ApiError(404, "Contact not fuond"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500, `Error retrieving contact with id=${req.params.email}`
            )
        );
    }
}


exports.findByEmailOrName = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const documents = await userService.find({});
        return res.send(documents);
    } catch (error) {
        
    }
}
// exports.findOne = async (req, res, next) => {
//     try {
//         const customerService = new CustomerService(MongoDB.client);
//         const document = await customerService.findByEmail(req.body.Email);
//         if (!document) {
//             return next(new ApiError(404, "Contact not fuond"));
//         }
//         return res.send(document);
//     } catch (error) {
//         return next(
//             new ApiError(
//                 500, `Error retrieving contact with id=${req.body.Email}`
//             )
//         );
//     }
// }
// exports.findById = async (req, res, next) => {
//     try {
//         const customerService = new CustomerService(MongoDB.client);
//         const document = await customerService.findById(req.params.id);
//         if (!document) {
//             return next(new ApiError(404, "Contact not fuond"));
//         }
//         return res.send(document);
//     } catch (error) {
//         return next(
//             new ApiError(
//                 500, `Error retrieving contact with id=${req.params.id}`
//             )
//         );
//     }
// }
exports.updateFridends = async (req, res, next) => {
   if (Object.keys(req.body).length === 0){
        return next(new ApiError(400, "Data to update can not be empty"));
   }

   try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.updateFriends(req.params.userId, req.body.Friends);
        if (!document) {
            return next(new ApiError(404, "Contact not fuond"));
        }
        return res.send(document);
   } catch (error) {
        return next(
            new ApiError(500, `Error updating contact with id=${req.params}`)
        );
   }
};

// exports.delete = async (req, res, next ) => {
//     try {
//         const customerService = new CustomerService(MongoDB.client);
//         const document = await customerService.delete(req.params.id);
//         if (!document) {
//             return next(new ApiError(404, "Contact not found"));
//         }

//         return res.send({ message: "Contact was deleted successfully" });
//     } catch (error){
//         return next(
//             new ApiError(
//                 500, `Could not delete contact with id=${req.params.id}`
//             )
//         );
//     }
// };

// exports.deleteAll = async(_req, res, next) => {
//     try {
//         const productService = new ProductService(MongoDB.client);
//         const deleteCount = await productService.deleteAll();
//         return res.send({
//             message: `${deleteCount} contacts were deleted successfully`,
//         });
//     } catch (error) {
//         return next(
//             new ApiError(500, "An error occurred while removing all contatcs")
//         );
//     }
// };

// exports.findAllFavorite = async(_req, res, next) => {
//     try {
//         const staffService = new StaffService(MongoDB.client);
//         const documents = await staffService.findFavorite();
//         return res.send(documents);
        
//     } catch (error) {

//         return next(
//             new ApiError(
//                 500, "An error occurred while retrieving favorite contacts"
//             )
//         );
        
//     }
// };