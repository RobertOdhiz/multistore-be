import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.config";
import Product from "./products.model";

const ProductImage = sequelize.define("ProductImages", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
        model: Product,
        key: 'uuid'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
}, {
  timestamps: true,
  paranoid: true,
  tableName: "productImages",
});

export default ProductImage;
