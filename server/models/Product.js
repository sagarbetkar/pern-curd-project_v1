const { Sequelize, DataTypes } = require('sequelize');
const Category = require('./Category');
const sequelize = new Sequelize(process.env.DB_URL);

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},
    categoryId: {type: DataTypes.INTEGER, references: {
        model: 'Category',
        key: 'categoryId'
    }},
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
},{
    freezeTableName: true,
    tableName: "product"
});

Product.hasOne(Category, { foreignKey: 'id', sourceKey: 'categoryId' });

module.exports = Product;