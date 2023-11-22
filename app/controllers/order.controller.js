const ApiError = require("../api-error");
const OrderService = require("../services/order.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
   if (!req.body?.MSKH) {
        return next(new ApiError(404,"Name can not empty"));
   }

   try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.create(req.body);
        return res.send(document);
   } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the staff")
        );
   }
};
exports.findByMSKH = async (req, res, next) => {
    let documents = [];
    try {
          const orderService = new OrderService(MongoDB.client);
          console.log(req.body);
          documents = await orderService.findByMSKH(req.body.MSKH);
          console.log(documents);
        if (documents) {
            return res.send(documents);
        } else {
          return next(new ApiError(404, "Contact not fuond"));
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacs")
        );
    };
};