const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL);

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
},{
    freezeTableName: true,
    tableName: "category"
});

module.exports = Category;