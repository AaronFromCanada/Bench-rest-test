import axios from 'axios';

const BASE_URL = "http://resttest.bench.co",
    TRANSACTION_URL = "/transactions";

export default class TransactionServices {
    getTransactionsByPage(pageNumber) {
        if (!pageNumber || !(/^\d+$/.test(pageNumber))) {
            return Error("invalid argument!");
        }
        const dataURL = BASE_URL + TRANSACTION_URL + `/${pageNumber}.json`;
        return axios.get(dataURL);
    }
}
