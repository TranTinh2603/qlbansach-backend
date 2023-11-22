const ApiError = require("../api-error");
const StaffService = require("../services/staff.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
   if (!req.body?.MSNV) {
        return next(new ApiError(404,"Name can not empty"));
   }

   try {
        const staffService = new StaffService(MongoDB.client);
        const document = await staffService.create(req.body);
        return res.send(document);
   } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the staff")
        );
   }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const staffService = new StaffService(MongoDB.client);
        const { MSNV } = req.query;
         console.log (req.query);
        if (MSNV) {
            console.log (MSNV);
            documents = await staffService.findByName(MSNV);
        } else {
            documents = await staffService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacs")
        );
    };

    return res.send(documents);

};

exports.findOne = async (req, res, next) => {
    try {
        const staffService = new StaffService(MongoDB.client);
        const document = await staffService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not fuond"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500, `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
}
exports.findByMSNV = async (req, res, next) => {
    try {
        const staffService = new StaffService(MongoDB.client);
        const document = await staffService.findByMSNV(req.params.msnv);
        console.log(document);
        if (!document) {
            return next(new ApiError(404, "Contact not fuond"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500, `Error retrieving contact with id=${req.params.msnv}`
            )
        );
    }
}
exports.update = async (req, res, next) => {
   if (Object.keys(req.body).length === 0){
        return next(new ApiError(400, "Data to update can not be empty"));
   }

   try {
        const staffService = new StaffService(MongoDB.client);
        const document = await staffService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Contact not fuond"));
        }
        return res.send({ message : "Contact was updated successfully" });
   } catch (error) {
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
   }
};

exports.delete = async (req, res, next ) => {
    try {
        const staffService = new StaffService(MongoDB.client);
        const document = await staffService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }

        return res.send({ message: "Contact was deleted successfully" });
    } catch (error){
        return next(
            new ApiError(
                500, `Could not delete contact with id=${req.params.id}`
            )
        );
    }
};

exports.deleteAll = async(_req, res, next) => {
    try {
        const staffService = new StaffService(MongoDB.client);
        const deleteCount = await staffService.deleteAll();
        return res.send({
            message: `${deleteCount} contacts were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all contatcs")
        );
    }
};

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