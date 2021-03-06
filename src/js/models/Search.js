import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getProfil() {
        const result = await axios(`https://api.github.com/search/users?q=${this.query}&per_page=100`);
        this.data = result.data.items;
    }

    returnData(githubID) {
        const index = this.data.findIndex(el => el.id == githubID);
        return this.data[index];
    }
}