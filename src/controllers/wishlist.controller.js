import HttpStatus from 'http-status-codes';
import * as wishlistService from '../services/wishlist.service';


export const addToWishlist = async (req, res) => {
    try {
        const bookId = req.params.id;
        const userId = req.body.userId;
        const data = await wishlistService.addToWishlist(bookId, userId);
        res.status(HttpStatus.CREATED).json(data);
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: error.message
        });
    }
}

export const getWishlist = async (req, res) => {
    try {
        const userId = req.body.userId
        const data = await wishlistService.getWishlist(userId)
        res.status(HttpStatus.OK).json(data)
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: error.message
        });
    }
}

export const removeFromWishlist = async (req, res) => {
    try {
        const bookId = req.params.id;
        const userId = req.body.userId;
        const data = await wishlistService.removeFromWishlist(bookId, userId);
        res.status(HttpStatus.OK).json(data);
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_GATEWAY,
            message: error.message
        })
    }
}