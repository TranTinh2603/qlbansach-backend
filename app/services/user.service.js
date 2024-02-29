const { ObjectId } = require("mongodb");
class UserService {

    constructor(client) {
        this.User = client.db().collection("users");

    }
    extractUserData(payload) {
        const user = {
            UserID: payload.userID,
            Name: payload.Name,
            Password: payload.Password,
            Email: payload.Email,
            Birthday: payload.Birthday,
            Address: payload.Address,
            Phone: payload.SoDienThoai
        };
        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );
        return user;
    }

    async create(payload) {
        console.log(payload);
        const user = this.extractUserData(payload);
        console.log(user);
        const result = await this.User.insertOne(
            user,
        );
        return result;
    }

    async find(filter) {
        const cursor = await this.User.find(filter).limit(15);
        return await cursor.toArray();
    }

    async findByEmail(email) {
        return await this.User.findOne({
            Email: email
        });
    }
    async findByName(name) {
        return await this.Customer.findOne({
            Name: name
        });
    }
    async findByMSKH(mskh) {
        return await this.Customer.findOne({
            MSKH: mskh
        });
    }

    async findById(id) {
        return await this.Customer.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };

        const update = this.extractCustomerData(payload);
        const result = await this.Customer.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );

        return result;
    }

    async delete(id) {
        const result = await this.Customer.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });

        return result;
    }

    // async deleteAll() {
    //     const result = await this.Staff.deleteMany({});
    //     return result.deletedCount;
    // }
}


module.exports = UserService;