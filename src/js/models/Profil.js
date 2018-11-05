import axios from 'axios';

export default class Profil {
    constructor(link, person) {
        this.link = link;
        this.person = person;
    }

    async getRepo() {
        try {
            const result = await axios(this.link);
            this.repos = result.data;
        } catch(err) {
            console.log(err);
        }
    }

    reposCount() {
        this.reposCount = this.repos.length;
    }
}