import {elements} from './base';

const generateLike = (data) => {
    const cardTemplat = `
    <div class="like info" data-githubID="${data.id}">
        <figure>
            <img class="like__img" src="${data.avatar_url}" alt="">
            <figcaption class="like__name">${data.login}</figcaption>
        </figure>
        <span class="like__text">ID: ${data.id}</span>
        <span class="like__text">Punkty: ${data.score.toFixed(2)}</span>
        <span class="like__text"><a class="like__link" href="${data.html_url}" target="blank_">Link</a></span>
    </div>
    `;
    return cardTemplat;
};

export const showLikeCards = (data) => {
    elements.likeCards.insertAdjacentHTML('beforeend', generateLike(data));
}

const generateListItem = (id, img_src, login) => {
    const listItemtemplate = `
        <li class="small-account" data-githubid="${id}">
            <figure class="small-account__info">
                <img class="small-account__avatar" src="${img_src}" alt="">
                <figcaption class="small-account__name">${login}</figcaption>
            </figure>
        </li>
    `;
    return listItemtemplate;
};

export const toggleLikesTile = () => {
    elements.likesTile.classList.toggle('hidden');
    elements.likesTile.classList.toggle('flex');
};

export const toggleLikeClass = (el) => {
    el.classList.toggle('like');
};

export const showMoreBtn = () => {
    elements.moreBtn.classList.remove('hidden');
};

export const hiddenMoreBtn = () => {
    elements.moreBtn.classList.add('hidden');
};

export const showLikes = (id, img_src, name) => {
    elements.likeList.insertAdjacentHTML('beforeend', generateListItem(id, img_src, name));
};

export const showMsg = () => {
    const msg = '<span class="likes__msg">Nie masz żadnych polubień</span>';
    elements.likeList.insertAdjacentHTML('beforeend', msg);
};

const addStatusText = (status) => {
    elements.likeStatus.firstChild.textContent = status === 'add' ? 'Dodano do polubionych' : 'Usunięto z polubionych';
};

const removeStatusText = (status) => {
    elements.likeStatus.firstChild.textContent = '';
};

export const setLikeStatus = async (status) => {
    addStatusText(status);
    elements.likeStatus.classList.remove('hidden');
    elements.likeStatus.classList.add('flex');
    elements.likeStatus.classList.add(`like-status--${status}`);

    await setTimeout(() => {
        elements.likeStatus.classList.remove('flex');
        elements.likeStatus.classList.remove(`like-status--${status}`);
        elements.likeStatus.classList.add('hidden');
        removeStatusText(status);
    }, 1500);
}