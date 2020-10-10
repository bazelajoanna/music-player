import React, {useState, useContext} from 'react';
import logo from '../../img/Spotify_Logo_RGB_Black.png';
import {StoreContext} from "./index";
import Modal  from "./Modal";
import Notification from "./Notification";



const Sidebar = () => {
    const [sidebar, setSidebar] = useState({
        modal: false,
        notification: ""
    });

    const {state, dispatch} = useContext(StoreContext)


    const playlists = Object.keys((state.playlists));

    const [newList, setNewList] = useState("");

    const handleAddPlaylist = e => {
        e.preventDefault();

        dispatch({type: "ADD_PLAYLIST", playlist: newList})

        setSidebar({
            ...sidebar,
            modal: false,
            notification: "New playlist has been created!",
        })

        setNewList("");
    };

    const handleModal = () => setSidebar({...sidebar, modal: !sidebar.modal})
    return (
        <div className="Sidebar">
            <img src={logo}/>
            <ul>
                {playlists.map(list =>
                <li key={list}
                    className={list === state.currentPlaylist ? "active" : ""}
                    onClick={() => {
                        dispatch({type: "SET_PLAYLIST", playlist: list})
                    }}
                >
                    {list}
                </li>)}

                <li className="new-playlist"
                onClick={handleModal}>
                    <i className="fa fa-plus-circle"/>
                    <span>New Playlist</span>
                </li>
                <Modal open={sidebar.modal} close={() => setSidebar({...sidebar, modal: false})}>
                    <form onSubmit={handleAddPlaylist}>
                        <div className="title">New Playlist</div>
                        <div className="content-wrap">
                            <input type="text" placeholder="My Playlist" required value={newList} onChange={(e) => setNewList(e.target.value)} />
                            <br/>
                            <button type="sumbit">Create</button>

                        </div>
                    </form>
                </Modal>
                <Notification notification={sidebar.notification}
                              close={() => setSidebar({...sidebar, notification:""})}>
                </Notification>
            </ul>
        </div>
    );
};

export default Sidebar;