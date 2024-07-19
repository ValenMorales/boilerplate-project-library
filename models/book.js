const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: { type: String, required: true },
    comments: {
        type: [String],
        default: [],
    },
});

const Book = mongoose.model('Book', schema);

async function addComment(bookId, comment) {
    if(!comment){
        return 'missing required field comment';
    }
    try{ 
        const book = await Book.findById(bookId);
        book.comments.push(comment);
    await book.save();
    return book;
      }catch(err){
        console.log(err)
        return 'no book exists';
      }
    
}

module.exports = { Book , addComment};
