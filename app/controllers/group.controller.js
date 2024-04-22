const ApiError = require("../api-error");
const GroupService = require("../services/group.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body?.groupId) {
        return next(new ApiError(404, "Name can not empty"));
    }

    try {
        const groupService = new GroupService(MongoDB.client);
        const document = await groupService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the group")
        );
    }
};

exports.findByUserId = async (req, res, next) => {
    try {
        const groupService = new GroupService(MongoDB.client);
        const documents = await groupService.findByUserId(req.params.userId)
        return res.send(documents)
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacs")
        );
    }
}