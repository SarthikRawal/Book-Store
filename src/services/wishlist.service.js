import HttpStatus from 'http-status-codes';
import sequelize, { DataTypes } from '../config/database';

const Wishlist = require('../models/wishlist')(sequelize, DataTypes)
const Book = require('../models/book')(sequelize, DataTypes);

export const addToWishlist = async (bookId, userId) => {
    const book = await Book.findOne({ where: { id: bookId } })
    console.log("book:", book.bookName);
    if (!book) {
        return {
            code: HttpStatus.BAD_GATEWAY,
            message: `No book found for the ID ${bookId}`
        }
    }
    const wishlist = await Wishlist.findOne({ where: { userId } });
    if (wishlist) {
        if (wishlist.bookIds.includes(book.bookName)) {
            return {
                code: HttpStatus.CONFLICT,
                data: wishlist,
                message: 'Book is already in the wishlist'
            };
        }
        wishlist.bookIds.push(book.bookName);
        wishlist.changed('bookIds', true);
        await wishlist.save();
        return {
            code: HttpStatus.OK,
            data: wishlist,
            message: `Book with ID ${bookId} added to wishlist successfully`
        };
    } else {
        const newWishlist = await Wishlist.create({ userId, bookIds: [book.bookName] });
        return {
            code: HttpStatus.CREATED,
            data: newWishlist,
            message: 'New wishlist created and book added successfully'
        };
    }
}

export const removeFromWishlist = async (bookId, userId) => {
    const wishlist = await Wishlist.findOne({ where: { userId } });
    console.log("-->WL", wishlist);
    if (!wishlist) {
        return {
            code: HttpStatus.NOT_FOUND,
            data: null,
            message: 'No wishlist found for this user'
        };
    }
    const book = await Book.findOne({ where: { id: bookId } })
    console.log("-->book", book);
    if (!book) {
        return {
            code: HttpStatus.NOT_FOUND,
            data: wishlist,
            message: 'Book not found in the wishlist'
        };
    }

    let bookToRemove = book.bookName;
    const index = wishlist.bookIds.indexOf(bookToRemove);

    if (index !== -1) {
        wishlist.bookIds.splice(index, 1);
    }
    wishlist.changed('bookIds', true);

    await wishlist.save();

    return {
        code: HttpStatus.OK,
        data: wishlist,
        message: 'Book removed from wishlist successfully'
    };
}

export const getWishlist = async (userId) => {
    const wishlist = await Wishlist.findAll({ where: { userId } })
    if (!wishlist) {
        return {
            code: HttpStatus.BAD_GATEWAY,
            message: 'No wishlist found for this user'
        }
    }
    return {
        code: HttpStatus.OK,
        data: wishlist,
        message: "Here is wishlist for the user"
    }
}