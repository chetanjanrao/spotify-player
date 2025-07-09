import React from "react";
import Navbar from "./Navbar";
import spotify from "spotify-web-api-js";
import { useDataLayerValue } from "./DataLayer";
import { useEffect } from "react";
import msToMinutesAndSeconds from "../utils/msToDecimalMinutes";
import { assets } from "../assets/assets";
{
  /*Search Songs */
}
export default function SearchSongs({ user }) {
  const [{ searchQuery, searchTracks, selectedTrackId, token }, dispatch] =
    useDataLayerValue();
  // console.log("1223456", searchTracks);
  async function searchSpotifyTracks(searchQuery, token) {
    const endpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      searchQuery
    )}&type=track`;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "SET_SEARCHTRACKS",
          searchTracks: data,
        });
        const tracks = data.tracks.items;

        tracks.forEach((track) => {
          const artistNames = track.artists
            .map((artist) => artist.name)
            .join(", ");
          // console.log(`${track.name} by ${artistNames}`);
        });

        return tracks;
      })
      .catch((error) => {
        console.error("Search failed:", error.message);
        return [];
      });
  }

  function handlePlaySearchSong(id) {
    dispatch({
      type: "SET_SELECTEDTRACTID",
      selectedTrackId: id,
    });
  }
  useEffect(() => {
    //searchTracks(searchQuery, token);
    //searchTracks(searchQuery, token);
    //handleSearchQuery(searchQuery);
    //searchSpotifyTracks(searchQuery, token);
    searchSpotifyTracks(searchQuery, token);
  }, [searchQuery]);
  return (
    <>
      <Navbar user={user} />
      {/* <h3 className="mt-8 mr-5">Welcome to Search songs</h3>
      <h2>you are searching for :{searchQuery}</h2> */}
      
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b> {"  "}Title
        </p>
        <p>Song</p>
        <p className="hidden sm:block">Album Name</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>
      <hr/>
      {searchTracks?.tracks?.items?.map((obj, index) => (
        <div
          key={index}
          onClick={() => {
            handlePlaySearchSong(obj.id);
          }}
          className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
        >
          <p className="text-white">
            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
            <img
              className="inline-block w-10 ml-5 mr-5"
              src={obj?.album?.images[0]?.url}
              alt={obj?.name}
            />
          </p>
          <p className="text-[15px]">{obj?.name}</p>
          <p className="text-[15px]">{obj?.album?.name}</p>
          <p className="text-[15px] text-center">
            {msToMinutesAndSeconds(obj?.duration_ms)}
          </p>
        </div>
      ))}
      <hr />
    </>
  );
}
