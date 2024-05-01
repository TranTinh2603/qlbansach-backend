const { ObjectId } = require("mongodb");

class CategoryService {
    constructor(client) {
        this.Category = client.db().collection("categorys");
    };
    extractCategoryData(payload) {
        const category = {
            categoryId: payload.categoryId,
            name: payload.name
        };
        Object.keys(category).forEach(
            (key) => category[key] === undefined && delete category[key]
        );
        return category;
    }

    async findAll(all) {
        const result = await this.Category.find(all)
        return await result.toArray();
    }
    //     async findOne(MaTheLoai){
    //         console.log(MaTheLoai);
    //         return await this.Category.findOne({
    //             MaTheLoai: MaTheLoai
    //         });
    //     }
}

module.exports = CategoryService;