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

exports.findByMemberId = async (req, res, next) => {
    try {
        const groupService = new GroupService(MongoDB.client);
        const documents = await groupService.findByMemberId(req.params.memberId)
        // const groups = await groupService.findAll({})
        // const documents = groups.filter(group => group.members.some(member => member.userId === req.params.memberId))
        return res.send(documents)
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacs")
        );
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const groupService = new GroupService(MongoDB.client);
        const documents = await groupService.findAll({})
        return res.send(documents)
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacs")
        );
    }
}

exports.findByGroupId = async (req, res, next) => {
    try {
        const groupService = new GroupService(MongoDB.client);
        const document = await groupService.findByGroupId(req.params.groupId)
        return res.send(document)
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacs")
        );
    }
}

exports.updateDiscussion = async (req, res, next) => {
    try {
        const groupService = new GroupService(MongoDB.client);
        const group = await groupService.findByGroupId(req.params.groupId)
        group.discussions.push(req.body)
        const document = await groupService.update(req.params.groupId, group);
        if (!document) {
            return next(new ApiError(404, "Contact not fuond"));
        }
        return res.send({ message: "Contact was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};

exports.updateTopic = async (req, res, next) => {
    try {
        const groupService = new GroupService(MongoDB.client);
        const group = await groupService.findByGroupId(req.params.groupId)
        const folder = group.discussions.find(discussion => discussion.folderId === req.params.folderId)
        folder.topics.push(req.body)
        const document = await groupService.update(req.params.groupId, group);
        if (!document) {
            return next(new ApiError(404, "Contact not fuond"));
        }
        return res.send({ message: "Contact was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};

exports.updateComment = async (req, res, next) => {
    try {
        const groupService = new GroupService(MongoDB.client);
        const group = await groupService.findByGroupId(req.params.groupId)
        const folder = group.discussions.find(discussion => discussion.folderId === req.params.folderId)
        const topic = folder.topics.find(topic => topic.topicId === req.params.topicId)
        topic.comments.push(req.body)
        const document = await groupService.update(req.params.groupId, group);
        if (!document) {
            return next(new ApiError(404, "Contact not fuond"));
        }
        return res.send({ message: "Contact was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};

exports.updateMember = async (req, res, next) => {
    try {
        const groupService = new GroupService(MongoDB.client);
        const group = await groupService.findByGroupId(req.params.groupId)
        if (group.status === 'private') {
            const data = {
                userId: req.body.userId,
                status: 'pending'
            }
            group.joinRequests.push(data);
            const document = await groupService.update(req.params.groupId, group);
            if (!document) {
                return next(new ApiError(404, "Contact not fuond"));
            }
            return res.send({ message: "sent a request to the group" });
        } else if (group.status === 'public') {
            const data = {
                userId: req.body.userId,
                role: 'member',
            }
            group.members.push(data)
            const document = await groupService.update(req.params.groupId, group);
            if (!document) {
                return next(new ApiError(404, "Contact not fuond"));
            }
            return res.send({ message: "Join group success!" });
        }


    } catch (error) {
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};




