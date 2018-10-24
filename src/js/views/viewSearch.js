import { elements } from './base';

const generateProfilCard = (data, cardID) => {
    const profilCardTeamplat = `
    <div class="profil-card" data-cardID="${cardID}">
        <figure>
            <img class="profil-card__img" src="${data.avatar_url}" alt="">
            <figcaption class="profil-card__name">${data.login}</figcaption>
        </figure>
        <span class="profil-card__text">ID: ${data.id}</span>
        <span class="profil-card__text">Punkty: ${data.score.toFixed(2)}</span>
        <span class="profil-card__text"><a class="card__link" href="${data.html_url}" target="blank_">Link</a></span>
        <svg class="profil-card__icon" xmlns="http://www.w3.org/2000/svg" viewBox="2918 1878 64.813 52.735">
            <path d="M60.9,7.34a17.177,17.177,0,0,0-22.815,0l-4.277,3.926L29.527,7.34a17.172,17.172,0,0,0-22.812,0,15.683,15.683,0,0,0,0,23.535L33.807,55.74,60.9,30.875A15.688,15.688,0,0,0,60.9,7.34Z"
                transform="translate(2916.601 1874.995)" /></svg>
    </div>
    `;
    return profilCardTeamplat;
};

export const showCard = (data, cardID) => {
    elements.profilsCards.insertAdjacentHTML('beforeend', generateProfilCard(data, cardID));
}