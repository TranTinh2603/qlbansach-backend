const { ObjectId } = require("mongodb");
class OrderService {

    constructor(client) {
        this.Order = client.db().collection("orders");

    }
    extractOrderData(payload) {
        const order = {
            orderId: payload.orderId,
            userId: payload.userId,
            orderDate: payload.orderDate,
            status: payload.status,
            deliveryDate: payload.deliveryDate,
            infoDelivery: payload.infoDelivery,
            methodDelivery: payload.methodDelivery,
            methodPayment: payload.methodPayment,
            note: payload.note,
            products: payload.products,
            promotionalCode: payload.promotionalCode,
            totalPrice: payload.totalPrice,
            transportFee: payload.transportFee,
            totalAmount: payload.totalAmount
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

    async findAll(filter) {
        const cursor = await this.Order.find(filter);
        return await cursor.toArray();
    }

    //     async findByMSKH(id) {
    //         console.log(id);
    //         const cursor = await this.Order.find({ MSKH: id }).limit(15);
    //         return await cursor.toArray();
    //     }

    async findByOrderId(orderId) {
        return await this.Order.findOne({
            orderId: orderId
        });
    }


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
}


module.exports = OrderService;