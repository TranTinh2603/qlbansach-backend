const { ObjectId } = require("mongodb");
class CustomerService {
    
    constructor(client) {
        this.Customer = client.db().collection("khachhang");
        
    }
    extractCustomerData(payload) {
        const customer = {
            MSKH: payload.MSKH,
            HoTenKH: payload.HoTenKH,
            Password: payload.Password,
            Email: payload.Email,
            DiaChi: payload.DiaChi,
            SoDienThoai: payload.SoDienThoai
        };
        Object.keys(customer).forEach(
            (key) => customer[key] === undefined && delete customer[key]
        );
        return customer;
    }

    async create(payload) {
        console.log(payload);
        const customer = this.extractCustomerData(payload);
        console.log(customer);
        const result = await this.Customer.insertOne(
            customer,
        );
        return result;
    }

    // async find(filter) {
    //     const cursor = await this.Staff.find(filter);
    //     return await cursor.toArray(); 
    // }

    async findByEmail(email) {
        return await this.Customer.findOne({
           Email: email
        });
    }

    async findById(id) {
        return await this.Customer.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    
    async update(id, payload){
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

    // async delete(id) {
    //     const result = await this.Staff.findOneAndDelete({
    //         _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    //     });

    //     return result;
    // }

    // async deleteAll() {
    //     const result = await this.Staff.deleteMany({});
    //     return result.deletedCount;
    // }
}


module.exports = CustomerService;