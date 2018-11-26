import '../scss/style.scss';

//Base
import {elements} from './views/base';

//Views
import * as viewNavigation from './views/viewNavigation';
import * as viewSearch from './views/viewSearch';
import * as viewProfil from './views/viewProfil';
import * as viewLikes from './views/viewLikes';

//Models
import Search from './models/Search';
import Profil from './models/Profil';
import Like from './models/Likes';

const status = {};

//NAVIGATION CONTROLER
elements.headerBtn.addEventListener('click', () => {
    viewNavigation.changeSection('header', 'search');
});

elements.backBtn.addEventListener('click', () => {
    const activeSectionName = viewNavigation.returnActiveSection();
    viewNavigation.changeSection(activeSectionName, );
    viewNavigation.removeSectionFromHist();
});

//SEARCH CONTROLER
const controlerSearch = async () => {
    const profilName = elements.query.value;
    if (profilName) {
        status.search = new Search(profilName);
        viewNavigation.changeSection('search', 'loading');
        try {
            await status.search.getProfil();
        } catch {
            return viewNavigation.changeSection('loading', 'error');
        }
        viewNavigation.removeAllChild(elements.profilsCards);
        viewNavigation.changeSection('loading', 'profils');

        const profils = status.search.data;
        if (profils.length === 0) {
            viewSearch.showMsg();
        } else {
            profils.forEach((profil) => {
                viewSearch.showCard(profil);
            });
        }
    }
};

elements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    controlerSearch();
    elements.searchForm.reset();
});

//PROFIL CONTROLER
const controlerProfil = async (link, person) => {
    status.profil = new Profil(link, person);
    viewNavigation.changeSection(viewNavigation.returnActiveSection(), 'loading');
    try {
        await status.profil.getRepo();
    } catch {
        return viewNavigation.changeSection('loading', 'error');
    }

    viewNavigation.removeAllChild(elements.cardBox);
    viewNavigation.removeAllChild(elements.repos);
    viewNavigation.removeAllChild(elements.repoNav);
    viewProfil.reposArray.splice(0, viewProfil.reposArray.length);

    viewNavigation.changeSection('loading', 'result');


    status.profil.reposCount();
    viewProfil.showProfilCard(person, status.profil.reposCount, status.like.checkList(person.id));
    status.profil.repos.forEach((repo) => {
        viewProfil.saveReposCard(repo);
    });

    status.profil.calcNumberOfPages();
    viewProfil.showPages(status.profil.pages);
    viewProfil.showRepos();
};

elements.profilsCards.addEventListener('click', (e) => {
    if (e.target.classList.contains('profil-card')) {
        const link = status.search.returnData(e.target.dataset.githubid).repos_url;
        const person = status.search.returnData(e.target.dataset.githubid);

        controlerProfil(link, person);
    }
});

elements.repoNav.addEventListener('click', (e, limit = 8) => {
    if (e.target.classList.contains('repo-navigation__number')) {
        const pageNumber = e.target.dataset.number;

        viewNavigation.removeAllChild(elements.repos);
        viewNavigation.changeActivePage(e.target.dataset.number - 1);
        viewProfil.showRepos((pageNumber * limit) - limit, (pageNumber * limit));
    }
});

//LIKE CONTROLER
const controlerLike = async (personID, btn) => {
    let person;
    if (!status.like) status.like = new Like();
    viewNavigation.removeAllChild(elements.likeList);

    if (status.like.checkList(personID)) {
        status.like.addToLikesHis(status.like.getPerson(personID));

        status.like.removeLike(personID);
        viewLikes.toggleLikeClass(btn);
        viewNavigation.removeAllChild(elements.likeCards);

        const likes = status.like.likes;
        likes.forEach((like) => {
            viewLikes.showLikeCards(like);
        });

        btn.disabled = true;
        viewLikes.setLikeStatus('remove');
        await setTimeout(() => {
            btn.disabled = false;
        }, 1500);
    } else {
        if (!status.search || !status.search.returnData(personID)) {
            person = status.like.likesHis.splice(status.like.getIndex(personID), 1)[0];
        } else {
            person = status.search.returnData(personID);
        }
        status.like.addLike(person.id, person.login, person.avatar_url, person.score, person.repos_url, person.html_url);
        viewLikes.toggleLikeClass(btn);

        btn.disabled = true;
        viewLikes.setLikeStatus('add');
        await setTimeout(() => {
            btn.disabled = false;
        }, 1500);
    }

    status.like.getLastLikes().forEach((like) => {
        viewLikes.showLikes(like.id, like.avatar_url, like.login);
    });

    if (status.like.likes.length >= 4) {
        viewLikes.showMoreBtn();
    } else {
        viewLikes.hiddenMoreBtn();
    }
};

window.addEventListener('load', () => {
    status.like = new Like();
    status.like.readLoacalStorage();

    if (status.like.likes.length === 0) {
        viewLikes.showMsg();
    } else {
        status.like.getLastLikes().forEach((like) => {
            viewLikes.showLikes(like.id, like.avatar_url, like.login);
        });
    }

    if (status.like.likes.length >= 4) viewLikes.showMoreBtn();
});

elements.likesNavButton.addEventListener('click', () => {
    viewLikes.toggleLikesTile();
});

elements.closeLikesBtn.addEventListener('click', () => {
    viewLikes.toggleLikesTile();
});

elements.cardBox.addEventListener('click', (e) => {
    const el = e.target.closest('button');
    if (el == null || !el.disabled) {
        if (el !== null) {
            if (el.classList.contains('btn-like')) {
                const personID = e.target.closest('.info').dataset.githubid;
                controlerLike(personID, el);
            }
        }
    }
});

elements.likeList.addEventListener('click', (e) => {
    const el = e.target;
    if (el.nodeName === "LI") {
        const person = status.like.getPerson(el.dataset.githubid);
        viewLikes.toggleLikesTile();
        controlerProfil(person.repos_url, person);
    }
});

elements.moreBtn.addEventListener('click', () => {
    viewNavigation.changeSection(viewNavigation.returnActiveSection(), 'loading');
    viewNavigation.removeAllChild(elements.likeCards);
    viewNavigation.changeSection('loading', 'likes');
    viewLikes.toggleLikesTile();

    const likes = status.like.likes;
    likes.forEach((like) => {
        viewLikes.showLikeCards(like);
    });
});

elements.likeCards.addEventListener('click', (e) => {
    if (e.target.classList.contains('like')) {
        const person = status.like.getPerson(e.target.dataset.githubid);
        controlerProfil(person.repos_url, person);
    }
});