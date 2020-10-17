import React, {useState, useContext} from 'react';
import {StoreContext} from "./index";
import Modal  from "./Modal";
import Notification from "./Notification";
import "../../scss/components/Sidebar.scss";

const Sidebar = () => {
    const [sidebar, setSidebar] = useState({
        modal: false,
        playlists: {
            home: new Set(),
            favourites: new Set()
        },
        hamburger: false,

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


    const isHambugerExpanded = () => setSidebar({...sidebar, hamburger: !sidebar.hamburger});

    const handleModal = () => setSidebar({...sidebar, modal: !sidebar.modal});
    return (
        <div className="sidebar">
            <i className="hamburger fas fa-bars"
            onClick={isHambugerExpanded}></i>
            <div className={`sidebar__menu ${sidebar.hamburger === false ? "" : "sidebar__menu--open"}`}>
                <span className="sidebar__logo">Playlister</span>
                <div>
                    <ul className="sidebar__list">
                        {playlists.map(list =>
                            <li key={list}
                                className={`sidebar__list-playlist ${list === state.currentPlaylist ? "sidebar__list-playlist--active" : ""}`}
                                onClick={() => {
                                    dispatch({type: "SET_PLAYLIST", playlist: list})
                                }}
                            >
                                {list}
                            </li>)}
                        <li className="sidebar__new-playlist"
                            onClick={handleModal}>
                            <i className="fa fa-plus-circle"/>
                            <span>New Playlist</span>
                        </li>
                        <Modal open={sidebar.modal} close={() => setSidebar({...sidebar, modal: false})}>
                            <form onSubmit={handleAddPlaylist}>
                                <div className="modal__title">New Playlist</div>
                                <div className="modal__wrap">
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
        </div>
    );
};

export default Sidebar;