import { elements } from './base';

export const saveReposCard = (repo) => {
    reposArray.push(generateProfilRepos(repo));
};

export const showRepos = (start = 0, end = 8) => {
    reposArray.slice(start, end).forEach((repo) => {
        elements.repos.insertAdjacentHTML('beforeend', repo);
    });
};

export const showProfilCard = (person, repos, like) => {
    elements.cardBox.insertAdjacentHTML('afterbegin', generateProfilCard(person, repos, like));
};

export const showPages = (count) => {
    for(let i = 1; i<=count; i++) {
        elements.repoNav.insertAdjacentHTML('beforeend', generateNumbers(i));
    }
    elements.repoNav.firstChild.classList.add('repo-navigation__number--active');
};

export const reposArray = [];

const generateProfilCard = (person, repos, like) => {
    const profilCardtemplate = `
    <div class="card info" data-githubid="${person.id}">
        <figure>
            <img class="card__img" src="${person.avatar_url}" alt="">
            <figcaption class="card__name">${person.login}</figcaption>
        </figure>
        <span class="card__text">ID: ${person.id}</span>
        <span class="card__text">Punkty: ${person.score.toFixed(2)}</span>
        <span class="card__text">Liczba repozytoriów: ${repos}</span>
        <span class="card__text"><a class="card__link" href="${person.html_url}" target="blank_">Link</a></span>
        <button class="card__btn btn-like ${like === true ? "like" : ""}" type="button">
            <svg class="card__icon" xmlns="http://www.w3.org/2000/svg" viewBox="2918 1878 64.813 52.735">
                <path d="M60.9,7.34a17.177,17.177,0,0,0-22.815,0l-4.277,3.926L29.527,7.34a17.172,17.172,0,0,0-22.812,0,15.683,15.683,0,0,0,0,23.535L33.807,55.74,60.9,30.875A15.688,15.688,0,0,0,60.9,7.34Z"
                transform="translate(2916.601 1874.995)" /></svg>
        </button>
    </div>
    `;
    return profilCardtemplate;
};

const generateProfilRepos = (repo) => {
    const reposCardTemplate = `
        <div class="repo">
            <span class="repo__title">${repo.name}</span>
            <span class="repo__tech">${repo.language === null ? "Brak" : repo.language}</span>
            <p class="repo__desc">${repo.description === null ? "Brak opisu" : cutDescription(repo.description)}</p>
            <a class="repo__link" href="${repo.html_url}" target="blank_">Link</a>
        </div>
    `;
    return reposCardTemplate;
};

const generateNumbers = (number) => {
    const repoNavTemplate = `<span class="repo-navigation__number" data-number="${number}">${number}</span>`;
    return repoNavTemplate;
};

const cutDescription = (desc, limit = 100) => {
    if(desc === null || desc.length < limit) {
        return desc;
    } else {
        const shortDescription = `${desc.slice(0, limit)}...`;
        return shortDescription;
    }
};