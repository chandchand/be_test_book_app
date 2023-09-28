const Book = require('../models/bookModel')
const catchAsyncError = require('../middlewares/catchAsyncErrors,js')
const ErrorHandler = require("../utils/errorHandlers")

exports.create = catchAsyncError(async(req, res, next) => {

    const {code, title, author, stock} = req.body

    const book = await Book.create({
        code, 
        title, 
        author, 
        stock,
        created_at: Date.now()
    })

    res.status(200).json({
        success: true,
        book
    })
})

exports.getAllBook = catchAsyncError(async(req, res, next)=>{

    try {
        const book = await Book.aggregate([
            {
                $lookup:{
                    from: 'borrows',
                    localField: '_id',
                    foreignField: 'book_id',
                    as: 'borrowedBooks'
                }
            },{
                $match:{
                    'borrowedBooks.status':{ $ne: 'borrowed' }
                }
            },{
                $project:{
                   _id: 1,
                   title: 1,
                   author: 1,
                   stock: 1,
                }
            }
        ])
        
        
        if (!book){
            return next(new ErrorHandler('Tidak Ada Buku.', 404));
        }

        const quantities = book.length

        res.status(200).json({
            success:true,
            book,
            book_quantities: quantities
        })

    } catch (err) {
        res.status(500).json({ error: err.message });
        // return next(new ErrorHandler('Kesalahan Server.', 500));
    }
})

exports.getBookById = catchAsyncError(async(req,res, next)=>{

    const id = req.params.id
    const book = await Book.findById(id)

    if (!book){
      return next(new ErrorHandler(`Buku dengan id ${id} tidak ada.`, 404));
    }

    res.status(200).json({
        success: true,
        book
    })

});

exports.update = catchAsyncError(async(req, res, next)=>{

    const id = req.params.id;
    const {code, title, author, stock} = req.body

    const book = await Book.findByIdAndUpdate(id,{
        code,title,author, stock
    }, { new: true })

    if (!book){
        return next(new ErrorHandler(`Buku dengan id ${id} tidak ada.`, 404));
    }

    console.log('Data yang akan dikirim untuk perubahan:', req.body);
    // return
    
    res.status(200).json({
        success: true,
        book
    })
})

exports.delete = catchAsyncError(async(req, res, next)=>{

    const id = req.params.id

    const book = await Book.findByIdAndDelete(id)

    if (!book){
        return next(new ErrorHandler(`Buku dengan id ${id} tidak ada.`, 404));
    }

    res.status(200).json({
        success: true,
        message: "Buku telah di hapus"
    })
})
