// const { ObjectId } = require("mongodb");

// class LoginService {
//     constructor(client) {
//         this.Account = client.db().collection("khachhang");
//         this.AccountAdmin = client.db().collection("nhanvien");
//     }
//     extractAccountData(payload) {
//         const account = {
//             MSKH: payload.mskh,
//             Email: payload.email,
//             Password: payload.password
//         };
//         Object.keys(account).forEach(
//             (key) => account[key] === undefined && delete account[key]
//         );
//         return account;
//     }
//     async findByEmail(email) {
//         const result = await this.Account.findOne({ Email: email });
//         return result;
//     }

//     async create(payload){
//         const account = this.extractAccountData(payload);
//         const result = await this.Account.insertOne(
//             account,
//         );
//         return result;
//     }
//     async findByMSNV(msnv){
//         console.log(msnv);
//         console.log(this.AccountAdmin);
//         const result = await this.AccountAdmin.findOne({ MSNV: msnv });
//         console.log(result);
//         return result;
//     }

// }




// module.exports = LoginService;