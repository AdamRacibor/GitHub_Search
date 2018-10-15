import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getProfil() {
        try {
            const result = await axios(`https://api.github.com/search/users?q=${this.query}`);
            this.data = result.data.items;
        } catch(err) {
            console.log(err);
        }
    }
}