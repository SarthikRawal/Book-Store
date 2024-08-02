import sequelize, { DataTypes } from '../config/database';

const Book = require('../models/book')(sequelize, DataTypes);
const Cart = require('../models/cart')(sequelize, DataTypes);


export const getAllItemFromCart = async (userId) => {
    const cart = await Cart.findOne({
        where: { userId: userId }
    });

    if (!cart || cart.books.length === 0)
        throw new Error('No items found in the cart for this user');

    return cart;
};

export const addToCart = async (bookId, userId) => {
    try {
        const book = await Book.findOne({ where: { id: bookId } });
        if (!book) {
            throw new Error('No book found');
        }

        console.log("Book", book);
        let cart = await Cart.findOne({ where: { userId } });
        console.log("Cart", cart);

        if (!cart) {
            // Create a new cart if it doesn't exist
            cart = await Cart.create({
                userId,
                books: [
                    {
                        bookId: book.id,
                        quantity: 1,
                        bookName: book.bookName,
                        author: book.author,
                        price: parseFloat(book.price),
                        discountPrice: parseFloat(book.discountPrice)
                    }
                ],
                totalPrice: parseFloat(book.price),
                totalDiscountPrice: parseFloat(book.discountPrice),
                isOrderPlaced: false
            });
        } else {
            const bookInCart = cart.books.find(item => item.bookId === book.id);
            if (bookInCart) {
                bookInCart.quantity += 1;
                console.log("-->qty", bookInCart);
            } else {
                console.log("-->Else");
                cart.books.push({
                    bookId: book.id,
                    quantity: 1,
                    bookName: book.bookName,
                    author: book.author,
                    price: parseFloat(book.price),
                    discountPrice: parseFloat(book.discountPrice)
                });
            }

            cart.totalPrice = parseFloat(cart.totalPrice) + parseFloat(book.price);
            cart.totalDiscountPrice = parseFloat(cart.totalDiscountPrice) + parseFloat(book.discountPrice);

            // Save the updated cart
            await Cart.update(
                { books: cart.books, totalPrice: cart.totalPrice, totalDiscountPrice: cart.totalDiscountPrice },
                { where: { id: cart.id } }
            );
        }
    } catch (error) {
        throw error;
    }
};

export const removeFromCart = async (bookId, userId) => {
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) throw new Error('Cart not found');

    const existingBook = cart.books.find((item) => item.bookId == bookId);
    if (!existingBook) throw new Error('Book is not present in the cart');
    if (existingBook.quantity > 1) {
        existingBook.quantity -= 1;
    } else {
        cart.books = cart.books.filter((item) => item.bookId != bookId);
    }
    cart.totalPrice =
        parseFloat(cart.totalPrice) - parseFloat(existingBook.price);
    cart.totalDiscountPrice =
        parseFloat(cart.totalDiscountPrice) -
        parseFloat(existingBook.discountPrice);
    cart.changed('books', true);

    await cart.save();
    return cart;
};

export const updateQuantity = async (bookId,) => {

    const book = await Book.findByPk({ bookId })
    console.log('-->book', book);
}