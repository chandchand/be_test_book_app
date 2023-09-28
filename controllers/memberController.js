const Member = require('../models/memberModel')
const Borrow = require('../models/borrowModel')
const catchAsyncError = require('../middlewares/catchAsyncErrors,js')
const _ = require('lodash')

exports.create = catchAsyncError(async(req, res, next) => {

    const {code, name} = req.body

    const member = await Member.create({
        code, 
        name,  
        created_at: Date.now()
    })

    res.status(200).json({
        success: true,
        member
    })
})

exports.getAllMember = catchAsyncError(async(req, res, next)=>{
    try {
        const members = await Member.aggregate([
            {
              $lookup: {
                from: 'borrows',
                let: { memberId: '$_id' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ['$member_id', '$$memberId'] },
                          { $eq: ['$status', 'borrowed'] },
                        ],
                      },
                    },
                  },{
                    $project:{
                        _id: 1,
                        book_id: 1, 
                        // borrow_date: 0,
                        // return_date: 0,
                        // status: 0,
                        // bookCounts: { $size: '$book_id' }, 
                    },
                }
                ],
                as: 'borrowed_books',
              },
            },
          ]);

        _.forEach(members, (member) => {
            member.totalBorrowedBooks = _.sumBy(member.borrowed_books, (book) => book.book_id.length);
        });
      
        if (!members){
          return next(new ErrorHandler('Tidak Ada Member.', 404));
        }
    
        console.log( members );
        res.status(200).json({
            success: true,
            members: members,
          });

      } catch (err) {
        res.status(500).json({ error: err.message });
        return next(new ErrorHandler('Kesalahan Server.', err.message, 500));
      }
})

exports.getMemberById = catchAsyncError(async(req,res, next)=>{

    const id = req.params.id
    const member = await Member.findById(id)

    if (!member){
      return next(new ErrorHandler(`Member dengan id ${id} tidak ada.`, 404));
    }

    res.status(200).json({
        success: true,
        member
    })

});

exports.update = catchAsyncError(async(req, res, next)=>{

    const id = req.params.id;
    const {code, name, penalty} = req.body

    const member = await Member.findByIdAndUpdate(id,{
        code,name,penalty},{new: true})

    if (!member){
        return next(new ErrorHandler(`Buku dengan id ${id} tidak ada.`, 404));
    }

    res.status(200).json({
        success: true,
        member
    })
})

exports.delete = catchAsyncError(async(req, res, next)=>{

    const id = req.params.id

    const member = await Member.findByIdAndDelete(id)

    if (!member){
        return next(new ErrorHandler(`Buku dengan id ${id} tidak ada.`, 404));
    }

    res.status(200).json({
        success: true,
        message: "Buku telah di hapus"
    })
})
