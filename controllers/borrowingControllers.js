const Borrow = require('../models/borrowModel')
const Member = require('../models/memberModel')
const Book = require('../models/bookModel')

const catchAsyncError = require('../middlewares/catchAsyncErrors,js')
const ErrorHandler = require("../utils/errorHandlers")

exports.borrowCreate = catchAsyncError(async (req, res, next) => {
    try {
        const { book_id, member_id } = req.body;
        const borrowDate = new Date();
        const bookDetails = []; // Inisialisasi array untuk menyimpan detail buku
      
        const borrowed = await Borrow.countDocuments({ member_id, status: 'borrowed' });
  
      if (borrowed + book_id.length > 2) {
        return next(new ErrorHandler('Maaf, Anda tidak dapat meminjam lebih dari dua buku.', 400));
      }

      const member = await Member.findById(member_id);
  
      
      const lateReturns = await Borrow.find({
          member_id,
          return_date: {$lt: new Date()}
        })
        
        
        if (lateReturns.length > 0) {
            
        const today = new Date()
        const lateReturn = lateReturns[0]
        
        const diffDay = Math.floor((today - lateReturn.return_date)/(1000*3600*24))
        
        console.log(diffDay > 3);
        
        if (diffDay > 3){
            member.penalty = false
        }
        
        await member.save()
    }

    if (!member) {
      return next(new ErrorHandler('Member tidak ditemukan.', 404));
    }

    if (member.penalty === true) {
      return next(new ErrorHandler('Member memiliki penalty, tidak dapat meminjam buku.', 400));
    }
    
    for (const id of book_id) {
        const book = await Book.findById(id);
        if (!book) {
            return next(new ErrorHandler(`Buku dengan ID ${id} tidak ditemukan.`, 404));
        }
        if (book.stock <= 0){
            return next(new ErrorHandler(`Stock Buku Habis.`, 404));
        }
        bookDetails.push(book);
        
        book.stock -= 1
        await book.save();
      }

      const borrowExist = await Borrow.find({
        member_id: { $ne: member_id }, // Saring catatan peminjaman yang bukan milik anggota ini
        book_id: { $in: book_id } // Saring catatan peminjaman yang memiliki salah satu buku_id yang ingin dipinjam
      });
  
      if (borrowExist.length > 0) {
        return next(new ErrorHandler(`Maaf salah satu atau lebih buku sudah di pinjam`, 400));
      }

      const returnDate = new Date(borrowDate);
      returnDate.setDate(returnDate.getDate() + 7);

      const borrow = await Borrow.create({
        book_id,
        member_id,
        borrow_date: borrowDate,
        return_date: returnDate,
      })

      res.status(200).json({
        success: true,
        message: "Berhasil meminjam buku",
        borrow,
        bookDetails
      })

    } catch (err) {
        res.status(500).json({ error: err.message });
        return next(new ErrorHandler('Kesalahan Server.', 500));
    }
  });
  

exports.createReturn = catchAsyncError(async(req, res, next)=>{

    const {borrow_id, book_id}= req.body

    try {
        const borrow =  await Borrow.findById(borrow_id)
    
        if (!borrow){
          return next(new ErrorHandler(`Tidak Ada Data Peminjaman dengan id ${id} .`, 404));
        }
        
        const bookMatch = book_id.every(id => borrow.book_id.includes(id))

        if(!bookMatch){
          return next(new ErrorHandler(`Buku yang ingin di kembalikan tidak sesuai dengan buku yang dipinjam .`, 400));
        }

        const returnDate = new Date()
        const lateDate = Math.floor((returnDate - borrow.return_date)/(1000 * 3600 *24))

        if(lateDate > 0){
            const member = await Member.findById(borrow.member_id)
            member.penalty = true
            // console.log(member);
            await member.save();
        }

        for (const id of book_id) {
            const book = await Book.findById(id);
            if (!book) {
              return next(new ErrorHandler(`Buku dengan ID ${id} tidak ditemukan.`, 404));
            }
            book.stock += 1; // Increment stock
            await book.save();
          }

        borrow.status = 'returned'
        await borrow.save()

        res.status(200).json({
            success: true,
            message: "Anda telah mengembalikan buku",
            borrow
        })
        
    } catch (err) {
        res.status(500).json({ error: err.message });
        return next(new ErrorHandler('Kesalahan Server.', 500));
    }
})

exports.delete = catchAsyncError(async(req, res, next)=>{
  try {   
    const id = req.params.id
  
    const borrow = await Borrow.findByIdAndDelete(id)
  
    if (!borrow){
        return next(new ErrorHandler(`Peminjaman dengan id ${id} tidak ada.`, 404));
    }
  
    res.status(200).json({
        success: true,
        message: "Peminjaman telah di hapus"
    })
    
  } catch (err) {
    // res.status(500).json({ error:  });
    return next(new ErrorHandler('Kesalahan Server.', 500));
  }
})
