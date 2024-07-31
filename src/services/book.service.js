import sequelize, { DataTypes } from '../config/database';

const Book = require('../models/book')(sequelize, DataTypes);


export const getAllBooks = async () => {
    const books = await Book.findAll();
    await cacheAllBooks();
    return books;
};