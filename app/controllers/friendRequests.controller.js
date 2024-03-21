const ApiError = require("../api-error");
const FriendRequestsService = require("../services/friendRequests.service");
const MongoDB = require("../utils/mongodb.util");

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const friendRequestsService = new FriendRequestsService(MongoDB.client);
        documents = await friendRequestsService.find({});
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacs")
        );
    };

    return res.send(documents);

};

exports.create = async (req, res, next) => {
    try {
        const friendRequestsService = new FriendRequestsService(MongoDB.client);
        const checkFriendRequests = await friendRequestsService.findBySenderIdAndReceiverId(req.body.senderId, req.body.receiverId);
        if (checkFriendRequests) {
            return res.send({ message: "Friend requests already" })
        } else {
            const document = await friendRequestsService.create(req.body);
            return res.send(document);
        }
    } catch (error) {

    }
};


exports.findBySenderIdAndReceiverId = async (req, res, next) => {
    try {
        const friendRequestsService = new FriendRequestsService(MongoDB.client);
        const document = await friendRequestsService.findBySenderIdAndReceiverId(req.params.senderId, req.params.receiverId);
        if (!document) {
            return next(new ApiError(404, "Contact not fuond"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500, `Error retrieving contact with id=${req.params}`
            )
        );
    }
}

exports.findByReceiverId = async (req, res, next) => {
    try {
        const friendRequestsService = new FriendRequestsService(MongoDB.client);
        const document = await friendRequestsService.findByReceiverId(req.params.receiverId);
        if (!document) {
            return next(new ApiError(404, "Contact not fuond"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500, `Error retrieving contact with id=${req.params}`
            )
        );
    }
}

exports.updateStatus = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const friendRequestsService = new FriendRequestsService(MongoDB.client);
        const document = await friendRequestsService.updateStatus(req.params.senderId, req.params.receiverId, req.body.status);
        if (!document) {
            return next(new ApiError(404, "Contact not fuond"));
        }
        return res.send({ message: "Contact was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating contact with id=${req.params}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const friendRequestsService = new FriendRequestsService(MongoDB.client);
        const document = await friendRequestsService.delete(req.params.senderId, req.params.receiverId);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }

        return res.send({ message: "Contact was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(
                500, `Could not delete contact with id=${req.params}`
            )
        );
    }
};
