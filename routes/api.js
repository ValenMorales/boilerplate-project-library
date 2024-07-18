/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const Book = require("../models/book.ts");

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //get all books from db
      console.log(req.body);
      Book.find({}, (err, books) => {
        res.json(books.map(
          (book) => ({
            _id: book._id,
            title: book.title,
            commentcount: book.comments.length
          })
        ));
      });
    })
    
    .post(async function (req, res){
      let title = req.body.title;
     await Book.create({title:title}).then((err, res)=>{
      console.log(res)
      res.json({title:title, _id:res._id});
     });
    })
    
    .delete(function(req, res){
      Book.deleteMany({}, (err, books) => {
        console.log(books)
        res.json('complete delete successful');
      });
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;

      Book.findById(bookid, (err, book) => {
        console.log(book)
        res.json(book);
      });
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(async function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;

      const book = await Book.addComment(bookid, comment);
      res.json(book);
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      Book.findByIdAndDelete(bookid, (err, book) => {
        console.log(book)
        res.json('delete successful');
      });

      //if successful response will be 'delete successful'
    });
  
};
