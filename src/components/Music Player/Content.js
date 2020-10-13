import React, {useContext, useState} from 'react';
import {StoreContext} from "./index";
import PlaylistEditorMenu from "./PlaylistEditorMenu";

const Content = () => {
    const {state, dispatch} = useContext(StoreContext);
    const currentPlaylist = state.currentPlaylist;

    const songIds = Array.from(state.playlists[currentPlaylist]);
    const allPlaylists = Object.keys(state.playlists);

    return (
        <div className="Content">
            <div className="playlist-title">{currentPlaylist}</div>
            {songIds.length <= 0 ? (
                <p>Add your songs!</p>
            ) : (
                <table>
                    <tr className="playlist-table-header">
                        <th className="playlist-table-label"></th>
                        <th className="playlist-table-label"></th>
                        <th className="playlist-table-label">Title</th>
                        <th className="playlist-table-label">Artist</th>
                        <th className="playlist-table-label">Length</th>
                    </tr>
                    <tbody>
                    {songIds.map(id => {
                        const {title, artist, length} = state.media[id];
                        const isFavourite = state.playlists.favourites.has(id);

                        return (
                            <tr key={id}>
                                <td>
                                    {
                                        isFavourite ? (<i className="fas fa-heart"
                                                          onClick={() => dispatch({ type: "REMOVE_FAVOURITE", songId: id})}/>) :
                                            (<i className="far fa-heart"
                                            onClick={() => dispatch({type: "ADD_FAVOURITE", songId: id})}/>)
                                    }
                                </td>
                                <td>
                                    <PlaylistEditorMenu playlists={allPlaylists} songId={id}/>
                                </td>
                                <td>{title}</td>
                                <td>{artist}</td>
                                <td>{length}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Content;
