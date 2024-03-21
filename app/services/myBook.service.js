const { ObjectId } = require("mongodb");
class MyBookService {

    constructor(client) {
        this.MyBook = client.db().collection("my-book");

    }
    extractMyBookData(payload) {
        const myBook = {
            bookId: payload.bookId,
            userId: payload.userId,
            status: payload.status,
            bookshelves: payload.bookshelves,
        };
        Object.keys(myBook).forEach(
            (key) => myBook[key] === undefined && delete myBook[key]
        );
        return myBook;
    }
    async create(payload) {
        const myBook = this.extractMyBookData(payload);
        const result = await this.MyBook.insertOne(
            myBook,
        );
        return result;
    }
    async find(filter) {
        const cursor = await this.MyBook.find(filter);
        return await cursor.toArray();
    }

    async findByStatus(userId, status) {
        const cursor = await this.MyBook.find({
            userId: userId,
            status: status
        })
        return await cursor.toArray();
    }
    async findByUserId(userId) {
        const cursor = await this.MyBook.find({
            userId: userId,
        })
        return await cursor.toArray();
    }
    async findByUserIdAndBookId(userId, bookId) {
        const cursor = await this.MyBook.findOne({
            userId: userId,
            bookId: bookId
        })
        return await cursor;
    }
    async update(data, payload) {
        const update = this.extractMyBookData(payload);
        const result = await this.MyBook.findOneAndUpdate(
            data,
            { $set: update },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }
}


module.exports = MyBookService;