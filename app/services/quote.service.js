const { ObjectId } = require("mongodb");
class QuoteService {

    constructor(client) {
        this.Quote = client.db().collection("quotes");

    }
    extractQuoteData(payload) {
        const quote = {
            userId: payload.userId,
            quoteId: payload.quoteId,
            content: payload.content,
            author: payload.author,
            tags: payload.tags,
            book: payload.book,
            likes: payload.likes,
            createdAt: payload.createdAt
        };
        Object.keys(quote).forEach(
            (key) => quote[key] === undefined && delete quote[key]
        );
        return quote;
    }

    async create(payload) {
        const quote = this.extractQuoteData(payload);
        const result = await this.Quote.insertOne(
            quote,
        );
        return result;
    }

    async findByContent(content) {
        const result = await this.Quote.findOne({
            content: content
        })
        return await result;
    }

    async find(filter) {
        const cursor = await this.Quote.find(filter);
        return await cursor.toArray();
    }

    //     async findByName(name) {
    //         const cursor = await this.Product.find({
    //             TenHH: { $regex: new RegExp(name, 'i') },
    //         }).limit(5);
    //         return await cursor.toArray();
    //     }


    async findByUserId(userId) {
        const result = await this.Quote.find({
            userId: userId
        })
        return await result.toArray();
    }
    async findByQuoteId(quoteId) {
        const result = await this.Quote.findOne({
            quoteId: quoteId
        })
        return result;
    }


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
    async update(quoteId, payload) {
        const filter = {
            // _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            quoteId: quoteId
        };

        const update = this.extractQuoteData(payload);
        const result = await this.Quote.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );

        return result;
    }

    async delete(quoteId) {
        const result = await this.Quote.findOneAndDelete({
            quoteId: quoteId
        });

        return result;
    }

    //     async deleteAll() {
    //         const result = await this.Product.deleteMany({});
    //         return result.deletedCount;
    //     }
}


module.exports = QuoteService;