import { elements } from './base';

const generateListItem = (id, img_src, name) => {
    const listItemtemplate = `
        <li class="small-account" data-githubid="${id}">
            <figure class="small-account__info">
                <img class="small-account__avatar" src="${img_src}" alt="">
                <figcaption class="small-account__name">${name}</figcaption>
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

export const showLikes = (id, img_src, name) => {
    elements.likeList.insertAdjacentHTML('beforeend', generateListItem(id, img_src, name));
};