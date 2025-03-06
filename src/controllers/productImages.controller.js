import { retryUpload } from "../helpers/retryupload";
import ProductService from "../services/products.service";
import ProductImageService from "../services/productImages.service";
import { uploadMiddleware } from "../middlewares/uploadMiddleware";

export const createProductImage = async (req, res) => {
    uploadMiddleware(req, res, async (err) => {
        if (err) {
            return res.status(500).json({
                status: 'fail',
                message: "Unable to complete file upload",
                error: err.message
            })
        }

        const img = req.files['productImage'] ? req.files['productImage'][0] : undefined;
        const productId = req.body.productId;

        console.log("Image: ", img);
        console.log("ProductId: ", productId);

        if (!img || !productId) {
            return res.status(400).json({
                status: 'error',
                message: 'Product ID and Image are required'
            });
        }

        try {
            const imgurl = await retryUpload(img.path, 'multistorehub');
            const product = await ProductService.getProductById(productId);

            if (!imgurl) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Image URL not found'
                });
            }

            if (!product) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Product not found'
                });
            }

            const productImage = await ProductImageService.createProductImage({
                url: imgurl,
                productId: productId
            });

            return res.status(201).json({
                status: 'success',
                message: 'Product image created successfully',
                data: productImage
            });
        } catch (error) {
            return res.status(500).json({
                status: 'fail',
                message: 'Internal server error',
                error: error.message
            });
        }
    })
};

export const deleteProductImage = async (req, res) => {
    const { imageId } = req.params;

    if (!imageId) {
        return res.status(400).json({
            status: 'error',
            message: 'Image ID is required'
        });
    }

    try {
        const productImage = await ProductImageService.getProductImageById(imageId);

        if (!productImage) {
            return res.status(404).json({
                status: 'error',
                message: 'Product image not found'
            });
        }

        await ProductImageService.deleteProductImage(imageId);

        return res.status(200).json({
            status: 'success',
            message: 'Product image deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
            error: error.message
        });
    }
};