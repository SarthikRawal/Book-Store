import HttpStatus from 'http-status-codes';
import * as CartService from '../services/cart.services';

export const getAllItemFromCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const data = await CartService.getAllItemFromCart(userId);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Retrived Book from cart successfully'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: error.message
        });
    }
};

export const addToCart = async (req, res) => {
    try {
        const bookId = req.params.id;
        const userId = req.body.userId;
        console.log("-->", userId);
        const data = await CartService.addToCart(bookId, userId);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Book added To Cart successfully'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: error.message
        });
    }
};
export const removeFromCart = async (req, res) => {
    try {
        const bookId = req.params.id;
        const userId = req.body.userId;
        const data = await CartService.removeFromCart(bookId, userId);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Book Removed From Cart'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: error.message
        });
    }
};

export const updateQuantity = async (req, res) => {
    try {
        const bookId = req.params.id
        const userId = req.body.userId;

        const data = await CartService.updateQuantity(bookId, userId)

        console.log("-->updt data", data);
        res.status(HttpStatus.OK).json({ data })
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: error.message
        });
    }
}