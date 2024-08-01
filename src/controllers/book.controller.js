import HttpStatus from 'http-status-codes';
import * as BookService from '../services/book.service'



export const addBook = async (req, res) => {
    try {
        const data = await BookService.addBook(req.body);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Book added successfully'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: error.message
        });
    }
};

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

export const updateBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const data = await BookService.updateBook(bookId, req.body);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Book updated successfully'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: error.message
        });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const { userId } = req.body;
        const data = await BookService.deleteBook(bookId, userId);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Book Deleted successfully'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: error.message
        });
    }
};