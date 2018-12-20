import {
    CHANGE_URL,
    SAVE_ITEM,
    LIKE_CLICK,
    SAVE_LISTCOMIC,
    GENRE_SELECT,
    LOVE_CLICK,
    SET_COMIC,
    SET_INDEX_CURRENT_COMIC,
} from './actions';

const initialState = {
    url: 'http://truyentranhtuan.com',
    itemsLocal: [],
    likeClick: false,
    listComic: [],
    isGenreSelect: false,
    isLove: false,
    comic: {},
    index: 0,
};

export default function reducer(state = initialState, action) {
   switch (action.type) {
        case CHANGE_URL:
            return {
                ...state,
                url: action.payload,
            }
        case SAVE_ITEM:
            return {
                ...state,
                itemsLocal: [...state.itemsLocal, action.payload],
            }
        case LIKE_CLICK:
            return {
                ...state,
                likeClick: action.payload,
            }
        case SAVE_LISTCOMIC:
            return {
                ...state,
                listComic: [...state.listComic, action.payload],
            }
        case GENRE_SELECT:
            return {
                ...state,
                isGenreSelect: action.payload,
            }
        case LOVE_CLICK:
            return {
                ...state,
                isLove: !state.isLove,
            }
        case SET_COMIC:
            return {
                ...state,
                comic: action.payload,
            }
        case SET_INDEX_CURRENT_COMIC:
            return {
                ...state,
                index: action.payload,
            }
        default:
            return state;
   };
}