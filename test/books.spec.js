const BooksApi = require("../api/books-api");
const { expect, assert } = require('chai');

const rightNow = new Date();
const newTitle = { title: rightNow.toString(), author: "Lazy boy" };



describe("Books api", async () => {
    it('should get a book', async () => {
        // Creating a new book
        const newBook = await BooksApi.createBook(newTitle);
        // Getting the created book and verifying all data
        const getNewBook = await BooksApi.getBookById(newBook.id);
        expect(getNewBook.id).to.be.a('string');
        expect(getNewBook.id).to.have.lengthOf(32);
        expect(getNewBook.title).to.be.a('string');
        expect(getNewBook.title.length > 1).to.be.true;
        expect(getNewBook.author).to.be.a('string');
        expect(getNewBook.author.length > 1).to.be.true;
    });

    it('should get all books', async () => {
        // Getting all books
        const getAllBooksResponse = await BooksApi.getAllBooks();
        // Verifying all data of all books
        getAllBooksResponse.forEach(async (book) => {
            expect(book.id).to.be.a('string');
            expect(book.id).to.have.lengthOf(32);
            expect(book.title).to.be.a('string');
            expect(book.title.length > 1).to.be.true;
            expect(book.author).to.be.a('string');
            expect(book.author.length > 1).to.be.true;
        });
    });

    it('should create a book', async () => {
        // Creating a new book and verifying all the data
        const newBook = await BooksApi.createBook(newTitle);
        expect(newBook.id).to.be.a('string');
        expect(newBook.id).to.have.lengthOf(32);
        expect(newBook.title).to.be.a('string');
        expect(newBook.title.length > 1).to.be.true;
        expect(newBook.author).to.be.a('string');
        expect(newBook.author.length > 1).to.be.true;
        // Getting the created book and verifying all data
        const getNewBook = await BooksApi.getBookById(newBook.id);
        expect(getNewBook.id).to.equal(newBook.id);
        expect(getNewBook.title).to.equal(newBook.title);
        expect(getNewBook.author).to.equal(newBook.author);
    }); 

    it('should update a book', async () => {
        // Creating a new book
        const newBook = await BooksApi.createBook(newTitle);
        // Updating title of the created book and verifying that it has been changed
        const getRandomString = BooksApi.getUid();
        const randomString = (await getRandomString).toString();
        const updatedBook = await BooksApi.updateBook(newBook.id, randomString);
        expect(newBook.title).not.to.equal(updatedBook.title);
    });

    it('should delete a book', async () => {
        // Creating a new book
        const newBook = await BooksApi.createBook(newTitle);
        // Deleting the created book and verifying that the book has been deleted
        const deletedBookResponse = await BooksApi.deleteBookById(newBook.id);
        expect(deletedBookResponse).to.equal('Book was removed successfully');
    });
}); 
