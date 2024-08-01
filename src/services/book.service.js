import sequelize, { DataTypes } from '../config/database';

const Book = require('../models/book')(sequelize, DataTypes);
const User = require('../models/user')(sequelize, DataTypes);


export const addBook = async (body) => {
    const user = await User.findByPk(body.userId);
    if (!user) throw new Error('User not found');
    if (user.role !== 'admin') {
        throw new Error('Only admin users can add books');
    }
    const data = await Book.create(body);
    return data;
};

export const getAllBooks = async () => {
    const books = await Book.findAll();

    return books;
};

export const updateBook = async (bookId, body) => {
    const user = await User.findByPk(body.userId);
    if (!user) throw new Error('User not found');

    if (user.role !== 'admin')
        throw new Error('Only admin users can update books');

    const updatedBook = await Book.update(body, {
        where: { id: bookId },
        returning: true
    });
    if (updatedBook[0] === 0) throw new Error('Book not found');
    return updatedBook[1][0];
};

export const deleteBook = async (bookId, userId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    if (user.role !== 'admin')
        throw new Error('Unauthorized: Only admin users can delete books');

    const book = await Book.findByPk(bookId);
    if (!book) throw new Error('Book not found');
    await book.destroy();
    return book;
};