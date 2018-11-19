import '../scss/style.scss';

//Base
import { elements } from './views/base';

//Views
import * as viewNavigation from './views/viewNavigation';
import * as viewSearch from './views/viewSearch';
import * as viewProfil from './views/viewProfil';
import * as viewLikes from './views/viewLikes';

//Models
import Search from  './models/Search';
import Profil from './models/Profil';
import Like from './models/Likes';

const status = {};

const controlerSearch = async () => {
    const profilName = elements.query.value;

    if(profilName) {
        status.search = new Search(profilName);
        viewNavigation.changeSection('search', 'loading');
        try {
            await status.search.getProfil();
        } catch {
            console.log("Error");
        }
        viewNavigation.removeAllChild(elements.profilsCards);
        viewNavigation.changeSection('loading', 'profils');
        const profils = status.search.data;
        profils.forEach((profil, index) => {
            viewSearch.showCard(profil, index);
        });
    }
};

const controlerProfil = async (link, person) => {
    status.profil = new Profil(link, person);
    viewNavigation.changeSection('profils', 'loading');

    try {
        await status.profil.getRepo();
    } catch {
        console.log("Error");
    }
    //Clear profil
    viewNavigation.removeAllChild(elements.cardBox);
    viewNavigation.removeAllChild(elements.repos);
    viewNavigation.removeAllChild(elements.repoNav);
    viewProfil.reposArray.splice(0, viewProfil.reposArray.length);

    viewNavigation.changeSection('loading', 'result');

    //Repos action
    status.profil.reposCount();
    viewProfil.showProfilCard(person, status.profil.reposCount, status.like.checkList(person.id));
    status.profil.repos.forEach((repo) => {
        viewProfil.saveReposCard(repo);
    });
    //Page action
    status.profil.calcNumberOfPages();
    viewProfil.showPages(status.profil.pages);
    viewProfil.showRepos();
};

const controlerLike = (person, btn) => {
    if(!status.like) status.like = new Like();
    viewNavigation.removeAllChild(elements.likeList);
    if(status.like.checkList(person.id)) {
        status.like.removeLike(person.id);
        viewLikes.toggleLikeClass(btn);
    } else {
        status.like.addLike(person.id, person.login, person.avatar_url, person.score, person.repos_url, person.html_url);
        viewLikes.toggleLikeClass(btn);
    }
    status.like.getLastLikes().forEach((like) => {
        viewLikes.showLikes(like.id, like.img, like.name);
    });
};

//Events
//navigation
elements.headerBtn.addEventListener('click', () => {
    viewNavigation.changeSection('header', 'search');
});

elements.backBtn.addEventListener('click', () => {
    const activeSectionName = viewNavigation.returnActiveSection();
    viewNavigation.changeSection(activeSectionName,);
    viewNavigation.removeSectionFromHist();
});

//likes
window.addEventListener('load', () => {
    status.like = new Like();
    status.like.readLoacalStorage();
    status.like.getLastLikes().forEach((like) => {
        viewLikes.showLikes(like.id, like.img, like.name);
    });
});

elements.likesNavButton.addEventListener('click', () => {
    viewLikes.toggleLikesTile();
});

elements.closeLikesBtn.addEventListener('click', () => {
    viewLikes.toggleLikesTile();
});

elements.cardBox.addEventListener('click', (e) => {
    const el = e.target.closest('button');
    if(el !== null) {
        if(el.classList.contains('btn-like')) {
            const person = status.search.returnData(e.target.closest('.info').dataset.githubid);
            controlerLike(person, el);
        }
    }
});

//search
elements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    controlerSearch();
    elements.searchForm.reset();
});

//profil
elements.profilsCards.addEventListener('click', (e) => {
    if(e.target.classList.contains('profil-card')) {
        const link = status.search.returnData(e.target.dataset.githubid).repos_url;
        const person = status.search.returnData(e.target.dataset.githubid);
        controlerProfil(link, person);
    }
});

elements.repoNav.addEventListener('click', (e, limit = 8) => {
    if(e.target.classList.contains('repo-navigation__number')) {
        const pageNumber = e.target.dataset.number;
        viewNavigation.removeAllChild(elements.repos);
        viewNavigation.changeActivePage(e.target.dataset.number-1);
        viewProfil.showRepos((pageNumber*limit)-limit, (pageNumber*limit));
    }
});