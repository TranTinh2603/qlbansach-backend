// const { ObjectId } = require("mongodb");
// class StaffService {
    
//     constructor(client) {
//         this.Staff = client.db().collection("nhanvien");
        
//     }
//     extractStaffData(payload) {
//         const staff = {
//             MSNV: payload.MSNV,
//             HoTenNV: payload.HoTenNV,
//             Password: payload.Password,
//             ChucVu: payload.ChucVu,
//             DiaChi: payload.DiaChi,
//             SoDienThoai: payload.SoDienThoai
//         };
//         Object.keys(staff).forEach(
//             (key) => staff[key] === undefined && delete staff[key]
//         );
//         return staff;
//     }

//     async create(payload) {
//         const staff = this.extractStaffData(payload);
//         const result = await this.Staff.insertOne(
//             staff,
//         );
//         return result;
//     }

//     async find(filter) {
//         const cursor = await this.Staff.find(filter);
//         return await cursor.toArray(); 
//     }

//     async findByMSNV(MSNV) {
//         console.log(MSNV);
//         return await this.Staff.findOne({
//             MSNV: MSNV,
//         });

//     }

//     async findById(id) {
//         return await this.Staff.findOne({
//             _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
//         });
//     }
    
//     async update(id, payload){
//         const filter = {
//             _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
//         }; 

//         const update = this.extractStaffData(payload);
//         const result = await this.Staff.findOneAndUpdate(
//             filter,
//             { $set: update },
//             { returnDocument: "after" }
//         );

//         return result;
//     }

//     async delete(id) {
//         const result = await this.Staff.findOneAndDelete({
//             _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
//         });

//         return result;
//     }

//     async deleteAll() {
//         const result = await this.Staff.deleteMany({});
//         return result.deletedCount;
//     }
// }


// module.exports = StaffService;