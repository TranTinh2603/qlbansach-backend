const { ObjectId } = require("mongodb");
class AuthorService {

    constructor(client) {
        this.AuthorService = client.db().collection("authors");
    }

    async findByName(name) {
        const cursor = await this.AuthorService.findOne({
            name: name
        });
        return await cursor;
    }

}


module.exports = AuthorService;