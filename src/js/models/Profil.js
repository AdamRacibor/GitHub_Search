import axios from 'axios';

export default class Profil {
    constructor(link, person) {
        this.link = link;
        this.person = person;
    }

    async getRepo() {
        try {
            const result = await axios(`${this.link}?per_page=100`);
            this.repos = result.data;
        } catch (err) {
            console.log(err);
        }
    }

    reposCount() {
        this.reposCount = this.repos.length;
    }

    calcNumberOfPages(limit = 8) {
        let arrLength = this.reposCount;
        if (arrLength < limit) {
            this.pages = 1;
        } else {
            if (arrLength % 8 > 0) {
                arrLength -= (arrLength % 8);
                this.pages = (arrLength / 8) + 1;
            } else {
                this.pages = arrLength / 8;
            }
        }
    }
}