// const { ObjectId } = require("mongodb");
// class OrderService {
    
//     constructor(client) {
//         this.Order = client.db().collection("dathang");
        
//     }
//     extractOrderData(payload) {
//         const order = {
//             SoDonDH: payload.SoDonDH,
//             MSKH: payload.MSKH,
//             MSNV: payload.MSNV,
//             NgayDH: payload.NgayDH,
//             NgayGH: payload.NgayGH,
//             TrangThaiDH: payload.TrangThaiDH
//         };
//         Object.keys(order).forEach(
//             (key) => order[key] === undefined && delete order[key]
//         );
//         return order;
//     }

//     async create(payload) {
//         const order = this.extractOrderData(payload);
//         const result = await this.Order.insertOne(
//             order,
//         );
//         return result;
//     }

//     async find(filter) {
//         const cursor = await this.Order.find(filter).limit(15);
//         return await cursor.toArray(); 
//     }

//     async findByMSKH(id) {
//         console.log(id);
//         const cursor = await this.Order.find({ MSKH: id }).limit(15);
//         return await cursor.toArray();
//     }

// //     async findByMaTheLoai(MaTheLoai) {
// //         return await this.Product.find({
// //             MaTheLoai : MaTheLoai
// //         }).toArray();
// //     }


//     async findBySoDonDH(id) {
//         return await this.Order.findOne({
//            SoDonDH: id
//         });
//     }
    
//     async update(id, payload){
//         const filter = {
//             SoDonDH: id
//         }; 

//         const update = this.extractOrderData(payload);
//         const result = await this.Order.findOneAndUpdate(
//             filter,
//             { $set: update },
//             { returnDocument: "after" }
//         );

//         return result;
//     }

//     async delete(id) {
//         const result = await this.Order.findOneAndDelete({
//             _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
//         });

//         return result;
//     }

//     async deleteAll() {
//         const result = await this.Product.deleteMany({});
//         return result.deletedCount;
//     }
// }


// module.exports = OrderService;