import '../scss/style.scss';

//Base
import { elements } from './views/base';

//Views
import * as viewNavigation from './views/viewNavigation';
import * as viewSearch from './views/viewSearch';
import * as viewProfil from './views/viewProfil';

//Models
import Search from  './models/Search';
import Profil from './models/Profil';

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
    viewProfil.showProfilCard(person, status.profil.reposCount);
    status.profil.repos.forEach((repo) => {
        viewProfil.saveReposCard(repo);
    });
    //Page action
    status.profil.calcNumberOfPages();
    viewProfil.showPages(status.profil.pages);
    viewProfil.showRepos();
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

//search
elements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    controlerSearch();
    elements.searchForm.reset();
});

//profil
elements.profilsCards.addEventListener('click', (e) => {
    if(e.target.classList.contains('profil-card')) {
        const link = status.search.data[e.target.dataset.cardid].repos_url;
        const person = status.search.data[e.target.dataset.cardid];
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