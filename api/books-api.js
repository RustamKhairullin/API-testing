const Client = require('./api-client');
const { expect, assert } = require('chai');

class BooksApi {
    async createBook(title) {
        const newBook = await Client.post(title);
        expect(newBook.status).to.equal(201);

        return newBook.data;
    };

    async getBookById(bookId) {
        const getBook = await Client.getOne(bookId);
        expect(getBook.status).to.equal(200);

        return getBook.data;
    };

    async getAllBooks() {
        const allBooks = await Client.getAll();
        expect(allBooks.status).to.equal(200);

        return allBooks.data.body;
    };

    async getBooksByAuthor(authorName) {
        const response = await Client.getAll();
        const books = response.data.body;
        const someAuthorbooks = books.filter((elem) => elem.author === authorName);

        return someAuthorbooks;
    }

    async updateBook(bookId, updatedTitle) {
        const response = await Client.put(bookId, { title: updatedTitle, author: "Lazy boy" });
        expect(response.status).to.equal(200);

        return response.data;
    }

    async deleteBookById(bookId) {
        const response = await Client.delete(bookId);
        expect(response.status).to.equal(200);

        return response.data.message;
    }

    async getUid() {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    }
}

module.exports = new BooksApi();

