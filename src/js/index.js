import '../scss/style.scss';

//Base
import { elements } from './views/base';
//Views
import * as viewNavigation from './views/viewNavigation';
import * as viewSearch from './views/viewSearch';
//Models
import Search from  './models/Search';

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
        console.log(status.search.data);
        const profils = status.search.data;
        profils.forEach((profil, index) => {
            viewSearch.showCard(profil, index);
        });
    }
};

elements.headerBtn.addEventListener('click', () => {
    viewNavigation.changeSection('header', 'search');
});

elements.backBtn.addEventListener('click', () => {
    const activeSectionName = viewNavigation.returnActiveSection();
    viewNavigation.changeSection(activeSectionName,);
});

elements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    controlerSearch();
});

elements.profilsCards.addEventListener('click', (e) => {
    if(e.target.classList.contains('profil-card')) {
        console.log("Hello");
    }
});