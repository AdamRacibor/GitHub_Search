import '../scss/style.scss';

//Base
import { elements } from './views/base';

//Views
import * as viewNavigation from './views/viewNavigation';

//Models
import Search from  './models/Search';

const status = {};

const controlerSearch = async () => {
    const profilName = elements.query.value;
    if(profilName) {
        status.search = new Search(profilName);
        await status.search.getProfil();
        console.log(status.search.data);
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