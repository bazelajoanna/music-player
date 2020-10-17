import React, {useReducer, createContext} from 'react';
import Sidebar from "./Sidebar";
import Content from "./Content";
import media from "../../media";

export const StoreContext = createContext(null);

const initialState = {
    currentPlaylist: "home",
    media,
    playlists: {
        home: new Set(media.ids),
        favourites: new Set()
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_PLAYLIST":
            return {
                ...state,
                playlists: {...state.playlists, [action.playlist]: new Set()}
            };
        case "SET_PLAYLIST":
            return {...state, currentPlaylist: action.playlist};
        case "ADD_FAVOURITE":
            state.playlists.favourites.add(action.songId);
            return {...state};
        case "REMOVE_FAVOURITE":
            state.playlists.favourites.delete(action.songId);
            return {...state};
        case "ADD_TO_PLAYLIST":
            state.playlists[action.payload.playlist].add(action.payload.songId);
            return {...state}
    }
    return state
};

const MusicPlayer = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StoreContext.Provider value={{state, dispatch}}>
            <div className="music-player">
                <Sidebar/>
                <Content/>
            </div>
        </StoreContext.Provider>
    );
};

export default MusicPlayer;