import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useDataLayerValue } from "./DataLayer";
import msToMinutesAndSeconds from "../utils/msToDecimalMinutes";
import { assets } from "../assets/assets";

import axios from "axios";
export default function AlbumTracks({ user }) {
  const [{ selectedAlbumId, token, albumTracks }, dispatch] =
    useDataLayerValue();

  function playTrackWithId(id) {
    dispatch({
      type: "SET_SELECTEDTRACTID",
      selectedTrackId: id,
    });
  }
  async function getAlbumTracks(selectedAlbumId, token) {
    const url = `https://api.spotify.com/v1/albums/${selectedAlbumId}/tracks`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({
      type: "SET_ALBUMTRACKS",
      albumTracks: response?.data?.items,
    });
    return response.data.items;
  }
  useEffect(() => {
    getAlbumTracks(selectedAlbumId, token);
  }, [selectedAlbumId, token]);
  return (
    <>
      <Navbar user={user} />
      {/* <div>
        {albumTracks.map((track) => (
          <span>{track.name}</span>
        ))}
      </div> */}
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] ">
        <p>
          <b className="mr-4">#</b>
        </p>
        <p>Album</p>
        {/* <p className="hidden sm:block">Date Added</p> */}
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>
      <hr />
      {albumTracks?.map((obj, index) => (
        <div
          onClick={() => {
            playTrackWithId(obj?.id);
          }}
          key={index}
          className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
        >
          <p className="text-white">
            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
            <img className="inline-block w-10 ml-5 mr-5" src={"#"} alt="" />
          </p>
          <p className="text-[15px]">{obj?.name}</p>
          {/* <p className="text-[15px] hidden sm:block">
            {extractDate(obj?.added_at)}
          </p> */}
          <p className="text-[15px] text-center">
            {msToMinutesAndSeconds(obj?.duration_ms)}
          </p>
        </div>
      ))}
    </>
  );
}
