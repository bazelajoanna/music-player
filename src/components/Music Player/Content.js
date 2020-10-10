import React, {useContext} from 'react';
import {StoreContext} from "./index";


const Content = () => {
    const {state, dispatch} = useContext(StoreContext);
    const currentPlaylist = state.currentPlaylist;
    const songIds = Array.from(state.playlists[currentPlaylist])
    return (
        <div className="Content">
            <div className="playlist-title">{currentPlaylist}</div>

            {songIds.length <= 0 ? (
                <p>You need to add your favourite songs!</p>
            ) : (
                <table>

                    <tr>
                        <td></td>
                        <td>Title</td>
                        <td>Artist</td>
                        <td>Length</td>
                    </tr>

                    <tbody>
                    {songIds.map(id => {
                        const {title, artist, length} = state.media[id];
                        const isFavourite = state.playlists.favourites.has(id)

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