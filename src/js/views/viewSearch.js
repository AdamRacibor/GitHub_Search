import { elements } from './base';

const generateCard = (data) => {
    const cardTemplat = `
    <div class="profil-card info" data-githubID="${data.id}">
        <figure>
            <img class="profil-card__img" src="${data.avatar_url}" alt="">
            <figcaption class="profil-card__name">${data.login}</figcaption>
        </figure>
        <span class="profil-card__text">ID: ${data.id}</span>
        <span class="profil-card__text">Punkty: ${data.score.toFixed(2)}</span>
        <span class="profil-card__text"><a class="card__link" href="${data.html_url}" target="blank_">Link</a></span>
    </div>
    `;
    return cardTemplat;
};

export const showCard = (data) => {
    elements.profilsCards.insertAdjacentHTML('beforeend', generateCard(data));
}