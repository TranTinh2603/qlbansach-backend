const { ObjectId } = require("mongodb");
class OrderService {
    
    constructor(client) {
        this.Order = client.db().collection("dathang");
        
    }
    extractOrderData(payload) {
        const order = {
            SoDonDH: payload.SoDonDH,
            MSKH: payload.MSKH,
            MSNV: payload.MSNV,
            NgayDH: payload.NgayDH,
            NgayGH: payload.NgayGH,
            TrangThaiDH: payload.TrangThaiDH
        };
        Object.keys(order).forEach(
            (key) => order[key] === undefined && delete order[key]
        );
        return order;
    }

    async create(payload) {
        const order = this.extractOrderData(payload);
        const result = await this.Order.insertOne(
            order,
        );
        return result;
    }

//     async find(filter) {
//         const cursor = await this.Product.find(filter);
//         return await cursor.toArray(); 
//     }

    async findByMSKH(id) {
        console.log(id);
        const cursor = await this.Order.find({ MSKH: id });
        return await cursor.toArray();
    }

//     async findByMaTheLoai(MaTheLoai) {
//         return await this.Product.find({
//             MaTheLoai : MaTheLoai
//         }).toArray();
//     }


//     async findById(id) {
//         return await this.Product.findOne({
//             _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
//         });
//     }
    
//     async update(id, payload){
//         const filter = {
//             _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
//         }; 

//         const update = this.extractProductData(payload);
//         const result = await this.Product.findOneAndUpdate(
//             filter,
//             { $set: update },
//             { returnDocument: "after" }
//         );

//         return result;
//     }

//     async delete(id) {
//         const result = await this.Product.findOneAndDelete({
//             _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
//         });

//         return result;
//     }

//     async deleteAll() {
//         const result = await this.Product.deleteMany({});
//         return result.deletedCount;
//     }
}


module.exports = OrderService;