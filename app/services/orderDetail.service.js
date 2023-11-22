const { ObjectId } = require("mongodb");
class OrderDetailService {
    
    constructor(client) {
        this.OrderDetail = client.db().collection("chitietdathang");
        
    }
    extractOrderDetailData(payload) {
        const orderDetail = {
            SoDonDH: payload.SoDonDH,
            HH: payload.HH
        };
        Object.keys(orderDetail).forEach(
            (key) => orderDetail[key] === undefined && delete orderDetail[key]
        );
        return orderDetail;
    }

    async create(payload) {
        const orderDetail = this.extractOrderDetailData(payload);
        const result = await this.OrderDetail.insertOne(
            orderDetail,
        );
        return result;
    }

    async find(filter) {
        const cursor = await this.OrderDetail.find(filter);
        return await cursor.toArray(); 
    }

    async findBySoDonDH(msdh) {
        console.log(msdh);
        return await this.OrderDetail.findOne({
           SoDonDH: msdh
        });
    }

    // async findByMaTheLoai(MaTheLoai) {
    //     return await this.Product.find({
    //         MaTheLoai : MaTheLoai
    //     }).toArray();
    // }


    // async findById(id) {
    //     return await this.Product.findOne({
    //         _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    //     });
    // }
    
    // async update(id, payload){
    //     const filter = {
    //         _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    //     }; 

    //     const update = this.extractProductData(payload);
    //     const result = await this.Product.findOneAndUpdate(
    //         filter,
    //         { $set: update },
    //         { returnDocument: "after" }
    //     );

    //     return result;
    // }

    // async delete(id) {
    //     const result = await this.Product.findOneAndDelete({
    //         _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    //     });

    //     return result;
    // }

    // async deleteAll() {
    //     const result = await this.Product.deleteMany({});
    //     return result.deletedCount;
    // }
}


module.exports = OrderDetailService;