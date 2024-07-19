/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const {Book, addComment} = require("../models/book");

module.exports = function (app) {

  app.route('/api/books')
    .get(async function (req, res){
      const books = await Book.find({});
      const resbooks = books.map(book =>
        ({
          _id: book._id,
          title: book.title,
          commentcount: book.comments.length || 0
        })
      );
      res.json(resbooks);
    })
    
    .post(async function (req, res){
      let title = req.body.title;
      if (!title){
        res.json( 'missing required field title');
      }
      
      try{
        const book =  new Book ({title:title})
        await book.save();
        res.json({title: book.title, _id: book._id});
      }catch(err){
      }
 
 
    })
    
    .delete(async function(req, res){
      try{
        await Book.deleteMany({});
        res.json('complete delete successful');
      }
      catch(err){
        res.json('could not delete books');
      }

    });



  app.route('/api/books/:id')
    .get(async function (req, res){
      let bookid = req.params.id;

      try{
        const book = await Book.findById(bookid);
        if (!book) {
          res.json( 'no book exists');
        } else {
          res.json(book);
        }
       
      } catch(err){
        res.json( 'no book exists');
      }


      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(async function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;

      const book = await addComment(bookid, comment);
      res.json(book);

    })
    
    .delete(async function(req, res){
      let bookid = req.params.id;
      let message = '';
      try{
         await Book.findById(bookid);
      }
       catch(err){
        res.json("no book exists");
         return 
       }
      
       const count =  await Book.deleteOne({_id: bookid});
       if (count.deletedCount === 0) {
         message = "no book exists";
       } else if (count.deletedCount === 1){
        message = "delete successful";
       }

   

      res.json(message)
    });
  
};
