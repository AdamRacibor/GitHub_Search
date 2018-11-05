import { elements } from './base';

const lastVisitSections = [];
export const changeSection = (startPoint, endPoint = lastVisitSections[lastVisitSections.length - 1]) => {
    if(endPoint === 'header') {
        elements.backBtn.classList.add('hidden');
    }
    document.querySelector(`.${startPoint}-section`).classList.toggle('flex');
    document.querySelector(`.${startPoint}-section`).classList.toggle('hidden');
    document.querySelector(`.${endPoint}-section`).classList.toggle('hidden');
    document.querySelector(`.${endPoint}-section`).classList.toggle('flex');
    if(endPoint !== "header") {
        elements.backBtn.classList.remove('hidden');
    }
    if(startPoint !== 'loading') lastVisitSections.push(startPoint);
    console.log(startPoint, endPoint, lastVisitSections);
};

export const removeSectionFromHis = () => {
    lastVisitSections.splice(-2,2);
    console.log(lastVisitSections);
};

export const returnActiveSection = () => {
    const activeSection = document.querySelector('.flex').dataset.name;
    return activeSection;
};