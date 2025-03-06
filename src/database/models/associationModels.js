import Product from './products.model';
import Order from './orders.model';
import ProductImage from './productImages.model';

export default function associateModels() {
  Product.hasMany(Order, {
    foreignKey: 'item',   
    as: 'orders',
  });

  Order.belongsTo(Product, {
    foreignKey: 'item',
    as: 'product',
  });

  ProductImage.belongsTo(Product, {
    foreignKey: 'productId',
    as: 'product'
  });

  Product.hasMany(ProductImage, {
    foreignKey: 'productId',
    as: 'productImages'
  });
}
