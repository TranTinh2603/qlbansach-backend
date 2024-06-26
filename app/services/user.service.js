const { ObjectId } = require("mongodb");
class UserService {

    constructor(client) {
        this.User = client.db().collection("users");

    }
    extractUserData(payload) {
        const user = {
            userId: payload.userId,
            password: payload.password,
            firstName: payload.firstName,
            lastName: payload.lastName,
            createdAt: payload.createdAt,
            gender: payload.gender,
            image: payload.image,
            address: payload.address,
            birthday: payload.birthday,
            email: payload.email,
            friends: payload.friends,
            phone: payload.phone
        };
        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );
        return user;
    }

    // async create(payload) {
    //     console.log(payload);
    //     const user = this.extractUserData(payload);
    //     console.log(user);
    //     const result = await this.User.insertOne(
    //         user,
    //     );
    //     return result;
    // }

    async find(filter) {
        const cursor = await this.User.find(filter).limit(15);
        return await cursor.toArray();
    }

    // async findByEmail(email) {
    //     return await this.User.findOne({
    //         Email: email
    //     });
    // }
    async findByName(name) {
        const result = await this.User.find({
            Name: name
        });
        return result.toArray();
    }
    // async findByMSKH(mskh) {
    //     return await this.Customer.findOne({
    //         MSKH: mskh
    //     });
    // }

    async findByUserId(userId) {
        return await this.User.findOne({
            userId: userId
        });
    }
    async findByEmail(email) {
        return await this.User.findOne({
            email: email
        });
    }

    async updateFriends(userId, friends) {
        const filter = {
            userId: userId
        };
        const result = await this.User.findOneAndUpdate(
            filter,
            { $set: { friends: friends } },
            { returnDocument: "after" }
        );

        return result;
    }
    async updateUser(userId, user) {
        const filter = {
            userId: userId
        };
        const result = await this.User.findOneAndUpdate(
            filter,
            { $set: user },
            { returnDocument: "after" }
        );
        return result;
    }

    // async delete(id) {
    //     const result = await this.Customer.findOneAndDelete({
    //         _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    //     });

    //     return result;
    // }

    // async deleteAll() {
    //     const result = await this.Staff.deleteMany({});
    //     return result.deletedCount;
    // }
}


module.exports = UserService;