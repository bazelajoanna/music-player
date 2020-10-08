import React from 'react';
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Playbar from "./Playbar";
import Content from "./Content";



const MusicPlayer = () => {
    return (
        <div className="MusicPlayer">
            <Topbar/>
            <Sidebar/>
            <Content/>
            <Playbar/>
        </div>
    );
};

export default MusicPlayer;