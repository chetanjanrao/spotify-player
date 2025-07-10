import React from "react";
import Navbar from "./Navbar";

import { useDataLayerValue } from "./DataLayer";
import { useNavigate } from "react-router-dom";

{
  /*Start */
}
export default function DisplayHome({ spotify, user }) {
  const [{ albums }, dispatch] = useDataLayerValue();
  const navigate = useNavigate();
  function openAlbumWithId(albumId) {
    dispatch({
      type: "SET_SELECTEDALBUMID",
      selectedAlbumId: albumId,
    });
  }
  return (
    <>
      <Navbar spotify={spotify} user={user} />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts </h1>
        {/* <div className="flex overflow-auto">
          {albumsData.map((item, index) => {
            return (
              <Albumitem
                key={index}
                name={item.name}
                desc={item.desc}
                id={item.id}
                image={item.image}
              />
            );
          })}
        </div> */}
        {/* <div className="flex overflow-auto scrollbar-hidden"> */}
        <div className="flex justify-center flex-wrap">
          {albums?.items?.map((item, index) => (
            <div
              onClick={() => {
                openAlbumWithId(item.id);
                navigate("/albumtracks");
              }}
              key={index}
              className="w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
            >
              <img src={item?.images[0]?.url} alt={item?.album_group} />
              <p className="font-bold mt-2 mb-1 truncate">{item?.name}</p>
              <p className="font-bold mt-1 mb-1">
                tracks : {item?.total_tracks}
              </p>
              <p className="font-bold mt-1 mb-1"> {item?.release_date}</p>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's Biggest hits </h1> */}
      {/* <div className="flex overflow-auto">
          {songsData.map((item, index) => {
            return (
              <Songitem
                key={index}
                name={item.name}
                desc={item.desc}
                id={item.id}
                image={item.image}
              />
            );
          })}
        </div> */}
      {/* {searchSongs?.tracks?.items.map((song, index) => (
          <SongItem song={song} key={index} />
        ))} */}
      {/* </div> */}
    </>
  );
}
