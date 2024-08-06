'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Wishlist extends Model {
        static associate(models) { }
    }

    Wishlist.init(
        {
            userId: DataTypes.INTEGER,
            bookIds: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false,
                defaultValue: []
            }
        },
        {
            sequelize,
            modelName: 'Wishlist'
        }
    );

    return Wishlist;
};