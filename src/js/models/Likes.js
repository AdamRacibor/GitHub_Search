export default class Like {
    constructor() {
        this.likes = [];
        this.likesHis = [];
    }

    getPerson(id) {
        const person = this.likes.find((el) => {
            return el.id == id;
        });
        return person;
    }

    addLike(id, login, avatar_url, score, repos_url, html_url) {
        const likePersonData = { id, login, avatar_url, score, repos_url, html_url };
        this.likes.push(likePersonData);
        this.setLocalStorage();
    }

    removeLike(id) {
        const index = this.likes.findIndex(el => el.id == id);
        this.likes.splice(index, 1);
        this.setLocalStorage();
    }

    checkList(id) {
        return this.likes.some((el) => {
            return el.id == id;
        });
    }

    addToLikesHis(like) {
        this.likesHis.push(like);
    }

    getIndex(id) {
        return this.likesHis.findIndex((el) => {
            el.id == id;
        });
    }

    getLastLikes() {
        return this.likes.slice(-5).reverse();
    }

    setLocalStorage() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readLoacalStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));

        if(storage) this.likes = storage;
    }
}