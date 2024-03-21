const { ObjectId } = require("mongodb");
class BookshelvesService {

    constructor(client) {
        this.Bookshelves = client.db().collection("bookshelves");

    }
    extractBookshelvesData(payload) {
        const bookshelves = {
            bookshelvesId: payload.bookshelvesId,
            name: payload.name,
            userId: payload.userId
        };
        Object.keys(bookshelves).forEach(
            (key) => bookshelves[key] === undefined && delete bookshelves[key]
        );
        return bookshelves;
    }
    async create(payload) {
        const bookshelves = this.extractBookshelvesData(payload);
        const result = await this.Bookshelves.insertOne(
            bookshelves,
        );
        return result;
    }

    async find(filter) {
        const cursor = await this.Bookshelves.find(filter);
        return await cursor.toArray();
    }

    async findByUserId(userId) {
        const result = await this.Bookshelves.find({
            userId: userId
        });
        return await result.toArray();
    }
}


module.exports = BookshelvesService;