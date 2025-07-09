import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// import DisplayHome from "./DisplayHome";
// import DisplayAlbum from "./DisplayAlbum";
// import { useLocation } from "react-router-dom";
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
  //   const location = useLocation();

  //   const isAlbum = location.pathname.includes("/album");
  //   const albumId = isAlbum ? location.pathname.slice(-1) : "";
  //   const bgColor = albumsData[Number(albumId)].bgColor;
  //console.log(bgColor);
  //   useEffect(() => {
  //     if (isAlbum) {
  //       displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
  //     } else {
  //       displayRef.current.style.background = `#121212`;
  //     }
  //   });
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
      {/* <div class="relative h-64 w-full bg-gray-100"> */}

      {/* <div class="absolute top-0 bottom-0 h-full w-[30%] bg-gradient-to-b from-purple-600 to-transparent-10"></div> */}

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
