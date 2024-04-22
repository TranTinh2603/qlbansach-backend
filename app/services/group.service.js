const { ObjectId } = require("mongodb");
class GroupService {

    constructor(client) {
        this.Group = client.db().collection("groups");

    }
    extractGroupData(payload) {
        const group = {
            groupId: payload.groupId,
            userId: payload.userId,
            name: payload.name,
            description: payload.description,
            image: payload.image,
            rules: payload.rules,
            showRule: payload.showRule,
            groupTopics: payload.groupTopics,
            tags: payload.tags,
            createdAt: payload.createdAt,
            status: payload.status,
            country: payload.country,
            affiliatedWebsite: payload.affiliatedWebsite,
            menbers: payload.menbers,
            bookShelf: payload.bookShelf,
            discussions: payload.discussions,
            joinRequest: payload.joinRequest
        };
        Object.keys(group).forEach(
            (key) => group[key] === undefined && delete group[key]
        );
        return group;
    }

    async create(payload) {
        const group = this.extractGroupData(payload);
        const result = await this.Group.insertOne(
            group,
        );
        return result;
    }

    async findByUserId(userId) {
        const result = await this.Group.find({
            userId: userId
        })
        return await result.toArray();
    }

    // async find(filter) {
    //     const cursor = await this.Quote.find(filter);
    //     return await cursor.toArray();
    // }

    //     async findByName(name) {
    //         const cursor = await this.Product.find({
    //             TenHH: { $regex: new RegExp(name, 'i') },
    //         }).limit(5);
    //         return await cursor.toArray();
    //     }


    // async findByUserId(userId) {
    //     const result = await this.Quote.find({
    //         userId: userId
    //     })
    //     return await result.toArray();
    // }
    // async findByQuoteId(quoteId) {
    //     const result = await this.Quote.findOne({
    //         quoteId: quoteId
    //     })
    //     return result;
    // }


    //     async findById(id) {
    //         return await this.Product.findOne({
    //             _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    //         });
    //     }
    //     async findByMSHH(MSHH){
    //         return await this.Product.findOne({
    //             MSHH : MSHH
    //         });
    //     }
    // async update(quoteId, payload) {
    //     const filter = {
    //         // _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    //         quoteId: quoteId
    //     };

    //     const update = this.extractQuoteData(payload);
    //     const result = await this.Quote.findOneAndUpdate(
    //         filter,
    //         { $set: update },
    //         { returnDocument: "after" }
    //     );

    //     return result;
    // }

    // async delete(quoteId) {
    //     const result = await this.Quote.findOneAndDelete({
    //         quoteId: quoteId
    //     });

    //     return result;
    // }

    //     async deleteAll() {
    //         const result = await this.Product.deleteMany({});
    //         return result.deletedCount;
    //     }
}


module.exports = GroupService;