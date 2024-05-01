const { ObjectId } = require("mongodb");

class LoginService {
    constructor(client) {
        this.Account = client.db().collection("users");
        // this.AccountAdmin = client.db().collection("nhanvien");
    }
    extractAccountData(payload) {
        const account = {
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
            friends: payload.friends
        };
        Object.keys(account).forEach(
            (key) => account[key] === undefined && delete account[key]
        );
        return account;
    }
    async findByEmail(email) {
        const result = await this.Account.findOne(
            { email: email }
        );
        return result;
    }

    async create(payload) {
        const account = this.extractAccountData(payload);
        const result = await this.Account.insertOne(
            account,
        );
        return result;
    }
    // async findByMSNV(msnv){
    //     console.log(msnv);
    //     console.log(this.AccountAdmin);
    //     const result = await this.AccountAdmin.findOne({ MSNV: msnv });
    //     console.log(result);
    //     return result;
    // }

}




module.exports = LoginService;