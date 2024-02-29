const { ObjectId } = require("mongodb");
class MyBookService {

    constructor(client) {
        this.MyBook = client.db().collection("my-book");

    }
    extractMyBookData(payload) {
        const myBook = {
            idBook: payload.idBook,
            idUser: payload.idUser,
            status: payload.status,
            bookshelves: payload.bookshelves,
        };
        Object.keys(book).forEach(
            (key) => myBook[key] === undefined && delete myBook[key]
        );
        return myBook;
    }
    async find(filter) {
        const cursor = await this.MyBook.find(filter);
        return await cursor.toArray();
    }
}


module.exports = MyBookService;