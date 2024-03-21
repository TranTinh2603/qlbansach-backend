const { ObjectId } = require("mongodb");
class BookService {

    constructor(client) {
        this.Book = client.db().collection("books");

    }
    extractBookData(payload) {
        const book = {
            idBook: payload.idBook,
            name: payload.name,
            author: payload.author,
            category: payload.category,
            page: payload.page,
            published: payload.published,
            language: payload.language,
            description: payload.description
        };
        Object.keys(book).forEach(
            (key) => book[key] === undefined && delete book[key]
        );
        return book;
    }
    async find(filter) {
        const cursor = await this.Book.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.Book.findOne({
            bookId: id
        });
    }
}


module.exports = BookService;