import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { assets } from "../assets/assets";
const spotify = new SpotifyWebApi();
import { useDataLayerValue } from "./DataLayer";
// start
export default function Player() {
  const [playStatus, setPlayStatus] = useState(true);
  const [{ selectedTrackId }, dispatch] = useDataLayerValue();

  // function handlePlayStatus() {
  //   if (playStatus) {
  //     spotify.play().catch(console.error);
  //     setPlayStatus(!playStatus);
  //   } else {
  //     spotify.pause().catch(console.error);
  //     setPlayStatus(!playStatus);
  //   }
  // }
  // function handleNextSong() {
  //   spotify.skipToNext().then(
  //     () => console.log("Skipped to next track"),
  //     (err) => console.error("Error skipping next:", err)
  //   );
  // }
  // function handlePrevSong() {
  //   spotify.skipToPrevious().then(
  //     () => console.log("Skipped to previous track"),
  //     (err) => console.error("Error skipping previous:", err)
  //   );
  // }
  function handlePlay(selectedTrackId) {
    spotify
      .play({
        uris: [`spotify:track:${selectedTrackId}`],
      })
      .then(() => console.log("Playing track:", selectedTrackId))
      .catch((err) => console.error("Play error:", err));
  }
  function handlePause(selectedTrackId) {
    spotify
      .pause({
        uris: [`spotify:track:${selectedTrackId}`],
      })
      .then(() => console.log("pause Track : "))
      .catch((error) => console.log(error));
  }
  function Play() {
    setPlayStatus(true);

    handlePlay(selectedTrackId);
  }
  function Pause() {
    setPlayStatus(false);
    handlePause(selectedTrackId);
  }
  useEffect(() => {
    Play();
  }, [selectedTrackId]);
  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      <div className="hidden lg:flex  items-center gap-4">
         <img className="w-12" src={assets.music_player_ring} alt="logo" />
        {/*<div>
          <p>{12}</p>
          <p>{45}</p>
        </div> */}
      </div>
      <div className="flex flex-col  items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img
            className="w-4 cursor-pointer "
            src={assets.shuffle_icon}
            alt="shuffle"
          />
          <img
            className="w-4 cursor-pointer "
            src={assets.prev_icon}
            alt="prev-icon"
          />
          {playStatus ? (
            <img
              className="w-4 cursor-pointer "
              src={assets.pause_icon}
              alt="play-icon"
              onClick={Pause}
            />
          ) : (
            <img
              className="w-4 cursor-pointer "
              src={assets.play_icon}
              alt="pause_icon"
              onClick={Play}
            />
          )}
          <img
            className="w-4 cursor-pointer "
            src={assets.next_icon}
            alt="next-icon"
          />
          <img
            className="w-4 cursor-pointer "
            src={assets.loop_icon}
            alt="loop-icon"
          />
        </div>
        {/*Song Progress bar */}
        {/* <div className="flex items-center gap-2">
          <p>
            {0}:{0}{" "}
          </p>
          <div className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
            <hr className="h-1 border-none w-10 bg-green-800 rounded-full" />
          </div>
          <p>
            {3}:{25}
          </p>
        </div> */}
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img
          className="w-4 cursor-pointer"
          src={assets.plays_icon}
          alt="plays_icon"
        />
        <img
          className="w-4 cursor-pointer"
          src={assets.mic_icon}
          alt="mic_icon"
        />
        <img
          className="w-4 cursor-pointer"
          src={assets.queue_icon}
          alt="queue_icon"
        />
        <img
          className="w-4 cursor-pointer"
          src={assets.speaker_icon}
          alt="speaker_icon"
        />
        <img
          className="w-4 cursor-pointer"
          src={assets.volume_icon}
          alt="volume_icon"
        />
        <div className="w-20 bg-slate-50 h-1 rounded cursor-pointer"></div>
        <img
          className="w-4 cursor-pointer"
          src={assets.mini_player_icon}
          alt="mini_player_icon"
        />
        <img
          className="w-4 cursor-pointer"
          src={assets.zoom_icon}
          alt="zoom_icon"
        />
      </div>
    </div>
  );
}
