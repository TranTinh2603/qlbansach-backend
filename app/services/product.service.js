// const { ObjectId } = require("mongodb");
// class ProductService {
    
//     constructor(client) {
//         this.Product = client.db().collection("hanghoa");
        
//     }
//     extractProductData(payload) {
//         const product = {
//             MSHH: payload.MSHH,
//             TenHH: payload.TenHH,
//             MoTaHH: payload.MoTaHH,
//             Gia: payload.Gia,
//             SoLuongHang: payload.SoLuongHang,
//             MaTheLoai: payload.MaTheLoai,
//             GhiChu: payload.GhiChu,
//             HinhHH: payload.HinhHH
//         };
//         Object.keys(product).forEach(
//             (key) => product[key] === undefined && delete product[key]
//         );
//         return product;
//     }

//     async create(payload) {
//         const product = this.extractProductData(payload);
//         const result = await this.Product.insertOne(
//             product,
//         );
//         return result;
//     }

//     async find(filter) {
//         const cursor = await this.Product.find(filter).limit(15);
//         return await cursor.toArray(); 
//     }

//     async findByName(name) {
//         const cursor = await this.Product.find({
//             TenHH: { $regex: new RegExp(name, 'i') },
//         }).limit(5);
//         return await cursor.toArray();
//     }

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
//     async findByMSHH(MSHH){
//         return await this.Product.findOne({
//             MSHH : MSHH
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
// }


// module.exports = ProductService;