const axios = require('axios');

const baseUrl = 'https://f4hatlr72b.execute-api.us-east-1.amazonaws.com/production/';

class ClientApi {
    async post(title) {
        const response = await axios.post(baseUrl + 'books', title);

        return response;
    };
 
    async getOne(bookId) {
        const response = await axios.get(baseUrl + bookId);

        return response;
    };

    async getAll() {
        const response = await axios.get(baseUrl + 'books');

        return response;
    };

    async put(bookId, objTitleAndAuthor) {
        const response = await axios.put(baseUrl + bookId, objTitleAndAuthor);

        return response;
    };

    async delete(bookId) {
        const response = await axios.delete(baseUrl + bookId);

        return response;
    };



}
module.exports = new ClientApi();