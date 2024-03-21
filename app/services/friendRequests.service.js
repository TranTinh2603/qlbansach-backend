const { ObjectId } = require("mongodb");
class FriendRequestsService {

    constructor(client) {
        this.FriendRequests = client.db().collection("friend-requests");

    }
    extractFriendRequestsData(payload) {
        const friendRequests = {
            senderId: payload.senderId,
            receiverId: payload.receiverId,
            status: payload.status,
            createdAt: payload.createdAt
        };
        Object.keys(friendRequests).forEach(
            (key) => friendRequests[key] === undefined && delete friendRequests[key]
        );
        return friendRequests;
    }
    async find(filter) {
        const cursor = await this.FriendRequests.find(filter);
        return await cursor.toArray();
    }

    async findBySenderIdAndReceiverId(senderId, receiverId) {
        return await this.FriendRequests.findOne({
            senderId: senderId,
            receiverId: receiverId
        });
    }
    async create(payload) {
        const friendRequests = this.extractFriendRequestsData(payload);
        const result = await this.FriendRequests.insertOne(
            friendRequests,
        );
        return result;
    }
    async findByReceiverId(receiverId) {
        const result = await this.FriendRequests.find({
            receiverId: receiverId,
        });
        return result.toArray();
    }
    async updateStatus(senderId, receiverId, status) {
        const filter = {
            senderId: senderId,
            receiverId: receiverId,
        };
        const result = await this.FriendRequests.findOneAndUpdate(
            filter,
            { $set: { status: status } },
            { returnDocument: "after" }
        );

        return result;
    }
    async delete(senderId, receiverId) {
        const result = await this.FriendRequests.findOneAndDelete({
            senderId: senderId,
            receiverId: receiverId
        });

        return result;
    }
}


module.exports = FriendRequestsService;