const { ObjectId } = require("mongodb");
class TagService {

    constructor(client) {
        this.Tag = client.db().collection("tags");

    }
    extractTagData(payload) {
        const tag = {
            tagId: payload.tagId,
            name: payload.name
        };
        Object.keys(tag).forEach(
            (key) => tag[key] === undefined && delete tag[key]
        );
        return tag;
    }

    async create(payload) {
        console.log(1);
        console.log(payload);
        const tag = this.extractTagData(payload);
        const result = await this.Tag.insertOne(
            tag,
        );
        return result;
    }

    async findByName(name) {
        const result = await this.Tag.findOne({
            name: name
        })
        return await result;
    }

    async find(filter) {
        const cursor = await this.Tag.find(filter);
        return await cursor.toArray();
    }

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
}


module.exports = TagService;