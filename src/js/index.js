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
    viewNavigation.changeSection('loading', 'result');
    status.profil.reposCount();
    viewProfil.showProfilCard(person, status.profil.reposCount);
    status.profil.repos.forEach((repo) => {
        viewProfil.showReposCards(repo);
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
    viewNavigation.removeSectionFromHis();
});

//search
elements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    controlerSearch();
});

//profil
elements.profilsCards.addEventListener('click', (e) => {
    if(e.target.classList.contains('profil-card')) {
        const link = status.search.data[e.target.dataset.cardid].repos_url;
        const person = status.search.data[e.target.dataset.cardid];
        controlerProfil(link, person);
    }
});