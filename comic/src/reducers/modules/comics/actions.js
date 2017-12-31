export const CHANGE_URL = 'comics/changeUrl';
export const SAVE_ITEM = 'comics/saveItem';
export const LIKE_CLICK = 'comics/likeClick';
export const SAVE_LISTCOMIC = 'comics/saveListcomic';
export const GENRE_SELECT = 'comics/genreSelect';
export const LOVE_CLICK = 'comics/loveClick';
export const SET_COMIC = 'comics/setComic';
export const SET_INDEX_CURRENT_COMIC = 'comics/indexCurrentComic';

export function changeUrl(link) {
    return {
        type: CHANGE_URL,
        payload: link,
    };
}

export function saveItem(item) {
    return {
        type: SAVE_ITEM,
        payload: item,
    };
}

export function likeClick(isLike) {
    return {
        type: LIKE_CLICK,
        payload: isLike,
    }
}

export function saveListcomic(list) {
    return {
        type: SAVE_LISTCOMIC,
        payload: list,
    }
}

export function genreSelect(isSelect) {
    return {
        type: GENRE_SELECT,
        payload: isSelect,
    }
}

export function loveClick() {
    return {
        type: LOVE_CLICK,
    }
}

export function setComic(comic) {
    return {
        type: SET_COMIC,
        payload: comic,
    }
}

export function setIndexCurrentComic(index) {
    return {
        type: SET_INDEX_CURRENT_COMIC,
        payload: index,
    }
}

