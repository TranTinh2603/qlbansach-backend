const { ObjectId } = require("mongodb");
class MessageService {

    constructor(client) {
        this.Message = client.db().collection("messages");

    }
    extractMessageData(payload) {
        const message = {
            senderId: payload.senderId,
            receiverId: payload.receiverId,
            timestampt: payload.timestamp,
            content: payload.content,
            roomId: payload.roomId
        };
        Object.keys(message).forEach(
            (key) => message[key] === undefined && delete message[key]
        );
        return message;
    }
    async create(payload) {
        const message = this.extractMessageData(payload);
        const result = await this.Message.insertOne(
            message,
        );
        return result;
    }
    async find(filter) {
        const cursor = await this.Message.find(filter);
        return await cursor.toArray();
    }

    // async findByStatus(userId, status) {
    //     const cursor = await this.MyBook.find({
    //         userId: userId,
    //         status: status
    //     })
    //     return await cursor.toArray();
    // }
    // async findByUserId(userId) {
    //     const cursor = await this.MyBook.find({
    //         userId: userId,
    //     })
    //     return await cursor.toArray();
    // }
    async findBySenderIdAndReceiverId(senderId, receiverId) {
        const cursor = await this.Message.find({
            $or: [
                { senderId: senderId, receiverId: receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        })
        return await cursor.toArray();
    }
    // async update(data, payload) {
    //     const update = this.extractMyBookData(payload);
    //     const result = await this.MyBook.findOneAndUpdate(
    //         data,
    //         { $set: update },
    //         { returnDocument: "after", upsert: true }
    //     );
    //     return result;
    // }
}


module.exports = MessageService;