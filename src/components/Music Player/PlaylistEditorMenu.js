import React, {useContext, useState} from 'react';
import {StoreContext} from "./index";
import "../../scss/components/PlaylistEditorMenu.scss";

const PlaylistEditorMenu = ({playlists, songId}) => {
    const [isOpen, setIsOpen] = useState(false);
    const {state, dispatch} = useContext(StoreContext);
    const handleAddSong = (playlist, songId) => {
        dispatch({type: "ADD_TO_PLAYLIST", payload: {playlist: playlist, songId: songId }});
        setIsOpen(false)
    }
    return (
        <div>
            <i className="fas fa-ellipsis-h"
           onClick={() => setIsOpen(true)}
            ></i>
                <div className={isOpen ? "playlist-editor-modal" : "playlist-editor-modal playlist-editor-modal--closed"}>
                    <span>Add to playlist:</span>
                    <i className="fa fa-times" onClick={() => setIsOpen(false)}/>
                    <br/>
                    {playlists.map((playlist, id) => {
                        return (
                            <ul>
                            <li key={id} onClick={() => handleAddSong(playlist, songId)}>{playlist}</li>
                            </ul>
                        )
                    })}
                </div>
        </div>
    )
};

export default PlaylistEditorMenu