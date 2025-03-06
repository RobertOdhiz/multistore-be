import ProductImage from "../database/models/productImages.model";

class ProductImageService {

    static async createProductImage(data) {
        return await ProductImage.create(data);
    }

    static async deleteProductImage(id) {
        try {
            const img = await this.getProductImageById(id);
            
            await img.destroy();
            return { message: "Image deleted successfully" };
        } catch (error) {
            throw new Error(`Error deleting product Image: ${error.message}`);
        }
    }

    static async getProductImageById(id) {
        try {
            const img = await ProductImage.findByPk(id);
            if (!img) {
                throw new Error("Not found");
            }
            return img;
        } catch (error) {
            throw new Error(`Error fetching product Image: ${error.message}`);
        }
    }
}

export default ProductImageService;
