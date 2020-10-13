import React, {useState, useContext} from 'react';
import {StoreContext} from "./index";
import Modal  from "./Modal";
import Notification from "./Notification";

const Sidebar = () => {
    const [sidebar, setSidebar] = useState({
        modal: false,
        playlists: {
            home: new Set(),
            favourites: new Set()
        },
        menu: false,

        notification: ""
    });
    const {state, dispatch} = useContext(StoreContext);
    const playlists = Object.keys((state.playlists));

    const [newList, setNewList] = useState("");

    const handleAddPlaylist = e => {
        e.preventDefault();

        dispatch({type: "ADD_PLAYLIST", playlist: newList});
        setSidebar({
            ...sidebar,
            modal: false,
            notification: "New playlist has been created!",
        });
        setNewList("");
    };


    const showMenu = () => setSidebar({...sidebar, menu: !sidebar.menu});

    const handleModal = () => setSidebar({...sidebar, modal: !sidebar.modal});
    return (
        <div className="Sidebar">
            <i className="hamburger fas fa-bars"
            onClick={showMenu}></i>
            <span className="logo">Playlister</span>
            <div>
                <ul className="sidebar-list">
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
        </div>
    );
};

export default Sidebar;