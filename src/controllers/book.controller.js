import HttpStatus from 'http-status-codes';
import * as BookService from '../services/book.service'


export const getAllBooks = async (req, res) => {
    try {
        const data = await BookService.getAllBooks();
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Books retrieved successfully'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: error.message
        });
    }
};

