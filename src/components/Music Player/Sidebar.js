import React, {useState, useRef} from 'react';
import logo from '../../img/Spotify_Logo_RGB_Black.png';
import Modal  from "./Modal";
import Notification from "./Notification";


const Sidebar = () => {
    const [sidebar, setSidebar] = useState({
        currentPlaylist: 'home',
        modal: false,
        playlists: {
            home: new Set(),
            favourites: new Set()
        },
        notification: ""
    });
    const playlistRef = useRef(null);
    const playlists = Object.keys((sidebar.playlists));


    const handleAddPlaylist = e => {
        e.preventDefault();
        const newList = playlistRef.current.value;

        setSidebar({
            ...sidebar,
            modal: false,
            playlists: { ...sidebar.playlists, [newList]: new Set()},
            notification: "New playlist has been created!",
        })
    };
    return (
        <div className="Sidebar">
            <img src={logo}/>
            <ul>
                {playlists.map(list =>
                <li key={list}
                    className={list === sidebar.currentPlaylist ? "active" : ""}
                    onClick={() => {
                        setSidebar({...sidebar, currentPlaylist: list})
                    }}
                >
                    {list}
                </li>)}

                <li className="new-playlist"
                onClick={() => setSidebar({...sidebar, modal: true})}>
                    <i className="fa fa-plus-circle"/>
                    <span>New Playlist</span>
                </li>
                <Modal open={sidebar.modal} close={() => setSidebar({...sidebar, modal: false})}>
                    <form onSubmit={handleAddPlaylist}>
                        <div className="title">New Playlist</div>
                        <div className="content-wrap">
                            <input type="text" placeholder="My Playlist" required ref={playlistRef} />
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