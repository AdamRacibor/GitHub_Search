import { elements } from './base';

const lastVisitSections = [];
export const changeSection = (startPoint, endPoint = lastVisitSections[lastVisitSections.length - 1]) => {
    if(endPoint === 'header') elements.backBtn.classList.add('hidden');
    if(endPoint === "loading" || startPoint === "loading") toggleMainNav();
    document.querySelector(`.${startPoint}-section`).classList.toggle('flex');
    document.querySelector(`.${startPoint}-section`).classList.toggle('hidden');
    document.querySelector(`.${endPoint}-section`).classList.toggle('hidden');
    document.querySelector(`.${endPoint}-section`).classList.toggle('flex');
    if(endPoint !== "header") {
        elements.backBtn.classList.remove('hidden');
    }
    if(endPoint !== "header") elements.backBtn.classList.remove('hidden');
    if(startPoint !== 'loading') lastVisitSections.push(startPoint);
};

export const toggleMainNav = () => {
    elements.mainNav.classList.toggle('flex');
    elements.mainNav.classList.toggle('hidden');
};

export const removeSectionFromHist = () => {
    lastVisitSections.splice(-2,2);
};

export const returnActiveSection = () => {
    const activeSection = document.querySelector('section.flex') || document.querySelector('div.loading-section');
    const data = activeSection.dataset.name;
    return data;
};

export const removeAllChild = (node) => {
    while(node.firstChild) {
        node.removeChild(node.firstChild);
    }
};

export const changeActivePage = (current) => {
    const allPages = document.querySelectorAll('.repo-navigation__number');
    allPages.forEach((page) => {
        if(page.classList.contains('repo-navigation__number--active')) {
            page.classList.remove('repo-navigation__number--active');
        }
    });
    allPages[current].classList.add('repo-navigation__number--active');
};