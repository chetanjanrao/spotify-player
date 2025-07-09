import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { albumsData } from "../assets/assets";
import DisplayHome from "./DisplayHome";
import AlbumTracks from "./AlbumTracks";
import DisplayAlbum from "./DisplayAlbum";
import DisplayPlaylist from "./DisplayPlaylist";
import { useDataLayerValue } from "./DataLayer";
import SearchSongs from "./SearchSongs";

export default function Display({ spotify }) {
  const [{ user }, dispatch] = useDataLayerValue();

    const displayRef = React.useRef();

    function colorGenearator() {
        let color = (Math.floor(Math.random() * 1000000)).toString(16)
        displayRef.current.style.background = `linear-gradient(#${color},#121212)`
        // console.log(color)
    }
    useEffect(() => {
        setInterval(() => {
            colorGenearator()
        }, 150000)

    }, [])
  return (
    <div ref={displayRef} className="w-[100%] m-2 pl-6 pr-6 pb-6  pt-4 rounded-2xl bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml=0 ">
      <Routes>
        
        <Route path="/" element={<DisplayHome user={user} />} />
        <Route path="/album" element={<DisplayAlbum user={user} />} />
        <Route path="/searchsongs" element={<SearchSongs user={user} />} />
        <Route path="/playlist" element={<DisplayPlaylist user={user} />} />
        <Route path="/albumtracks" element={<AlbumTracks user={user} />} />
      </Routes>
    </div>
  );
}
