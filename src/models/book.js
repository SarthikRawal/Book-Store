'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Book extends Model {

        static associate(models) {
            // define association here
        }
    }
    Book.init(
        {
            bookName: DataTypes.STRING,
            description: DataTypes.TEXT,
            author: DataTypes.STRING,
            discountedPrice: DataTypes.DECIMAL(10, 2),
            bookImage: DataTypes.STRING,
            quantity: DataTypes.INTEGER,
            price: DataTypes.DECIMAL(10, 2),
            userId: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'book'
        }
    );
    return Book;
};
