import { elements } from './base';

let lastVisitSection;
export const changeSection = (startPoint, endPoint = lastVisitSection) => {
    if(endPoint === 'header') {
        elements.backBtn.classList.add('hidden');
    }
    document.querySelector(`.${startPoint}-section`).classList.toggle('show');
    document.querySelector(`.${startPoint}-section`).classList.toggle('hidden');
    document.querySelector(`.${endPoint}-section`).classList.toggle('hidden');
    document.querySelector(`.${endPoint}-section`).classList.toggle('show');
    if(endPoint !== "header") {
        elements.backBtn.classList.remove('hidden');
    }
    lastVisitSection =  startPoint;
};

export const returnActiveSection = () => {
    const activeSection = document.querySelector('section.show').dataset.name;
    return activeSection;
}