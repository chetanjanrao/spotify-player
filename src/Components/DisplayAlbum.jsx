import React from "react";
import Navbar from "./Navbar";
import { assets } from "../assets/assets";
import { useDataLayerValue } from "./DataLayer";
import msToMinutesAndSeconds from "../utils/msToDecimalMinutes";

export default function DisplayAlbum({ user }) {

  function playTrackWithId(id) {
    dispatch({
      type: "SET_SELECTEDTRACTID",
      selectedTrackId: id,
    });
  }

  const [{ albumAndAlbumTracks }, dispatch] = useDataLayerValue();

  return (
    <>
      <Navbar user={user} />
      <div className="mt-10 flex flex-flex-wrap gap-8 flex-col md:flex-row md:items-end">
        <img
          className="w-48 rounded"
          src={
            albumAndAlbumTracks?.images && albumAndAlbumTracks.images[0]?.url
          }
          //src="#"
          alt="album"
        />
        <div className="flex flex-col">
          <p>{albumAndAlbumTracks?.album_type}</p>
          <h2 className="text-5x1 font-bold mb-4 md:text-7xl">
            {albumAndAlbumTracks?.name}
            {/* {albumData.name} */}
          </h2>
          {/* <h4>{albumData.desc}</h4> */}
          <p className="mt-1">
            <img
              className="inline-block w-5 mr-1"
              src={assets.spotify_logo}
              alt="#"
            />
            <b>Spotify</b>. 1,23,154 likes
            <b>{albumAndAlbumTracks?.total_tracks} Songs</b>. about 2 hr 30 min
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>
        </p>
        <p>Song</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>
      <hr />
      {albumAndAlbumTracks?.tracks?.items.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            playTrackWithId(item?.id);
          }}
          className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
        >
          <p className="text-white">
            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
            <img
              className="inline-block w-10 mr-5"
              src={item?.artists?.external_urls?.spotify}
              alt=""
            />
          </p>
          <p className="text-[15px]">{item?.name}</p>
          <p className="text-[15px] hidden sm:block"></p>
          <p className="text-[15px] text-center">
            {msToMinutesAndSeconds(item?.duration_ms)}
          </p>
        </div>
      ))}
    </>
  );
}
