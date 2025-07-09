import React, { useEffect } from "react";
import Navbar from "./Navbar";
import spotify from "spotify-web-api-js";
import { useDataLayerValue } from "./DataLayer";
import axios from "axios";
import { assets } from "../assets/assets";
import msToMinutesAndSeconds from "../utils/msToDecimalMinutes";
import extractDate from "../utils/extractDate";
{
  /*Start Frunction */
}
export default function DisplayPlaylist({ user }) {
  const [{ token, selectedUserPlaylistID, playlistTracks }, dispatch] =
    useDataLayerValue();

  function playTrackWithId(id) {
    dispatch({
      type: "SET_SELECTEDTRACTID",
      selectedTrackId: id,
    });
  }

  useEffect(() => {
    axios
      .get(`https://api.spotify.com/v1/playlists/${selectedUserPlaylistID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const playlist = res.data;
        console.log("chetan Playlist", playlist);
        console.log("Playlist Name:", playlist.name);
        console.log("Total Tracks:", playlist.tracks.total);
        dispatch({
          type: "SET_PLAYLISTTRACKS",
          playlistTracks: playlist,
        });
        playlist.tracks.items.forEach((item, index) => {
          const track = item.track;

          console.log(
            `${index + 1}. ${track.name} by ${track.artists
              .map((a) => a.name)
              .join(", ")}`
          );
        });
      })
      .catch((err) => console.error("Error getting playlist:", err));
  }, [selectedUserPlaylistID]);

  return (
    <div>
      <Navbar user={user} />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        {/* <img
          src="/path/to/image.jpg"
          alt="Background"
          class="h-full w-full object-cover"
        /> */}

        {/* <img
          className="w-48 rounded"
          src={playlistTracks?.images[0]}
          alt={playlistTracks?.type}
        /> */}
        {playlistTracks?.images && playlistTracks.images.length > 0 && (
          <img
            className="w-48 rounded"
            src={playlistTracks.images[0]?.url}
            alt={playlistTracks?.type}
          />
        )}

        <div className="flex flex-col">
          <p>{playlistTracks?.type}</p>
          <h2 className="text-5x1 font-bold mb-4 md:text-7xl">
            {playlistTracks?.name}
          </h2>
          <h4>{playlistTracks?.description}</h4>
          <p className="mt-1">
            <img
              className="inline-block w-5"
              src={assets.spotify_logo}
              alt="#"
            />
            <b>Spotify </b>. 1,23,154 likes
            <b>{playlistTracks?.tracks?.total} Songs</b>. about 2 hr 30 min
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b> Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>
      <hr />
      {playlistTracks?.tracks?.items?.map((obj, index) => (
        <div
          key={index}
          onClick={() => {
            playTrackWithId(obj?.track?.id);
          }}
          className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
        >
          <p className="text-white">
            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
            <img
              className="inline-block w-10 ml-5 mr-5"
              src={obj?.track?.album?.images[2]?.url}
              alt=""
            />
            {obj.name}
          </p>
          <p className="text-[15px]">{obj?.track?.name}</p>
          <p className="text-[15px] hidden sm:block">
            {extractDate(obj?.added_at)}
          </p>
          <p className="text-[15px] text-center">
            {msToMinutesAndSeconds(obj?.track?.duration_ms)}
          </p>
        </div>
      ))}

      {/* <div>
        {playlistTracks?.tracks?.items?.map((obj) => (
          <h1>{obj.added_at}</h1>
        ))}
      </div> */}
    </div>
  );
}
