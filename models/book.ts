const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: { type: String, required: true },
    comments: [String],
});

const Book = mongoose.model('Book', schema);

async function addComment(bookId, comment) {
    const book = await Book.findById(bookId);
    if (!book) {
        throw new Error('Book not found');
    }
    book.comments.push(comment);
    await book.save();
    return book;
}

module.exports = { Book, addComment };
