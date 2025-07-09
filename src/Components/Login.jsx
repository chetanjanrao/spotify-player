import React from "react";
import SpotifyLogo from "../assets/SpotifyLogo.png";
//import { getSpotifyAuthUrl } from "../assets/Spotify/SpotifyAuth";
import { loginUrl } from "../assets/Spotify/Spotify";
//import FooterPlayer from "./FooterPlayer";
//import CallbackHandler from "./CallbackHandler";
//import { Routes, Route } from "react-router-dom";

export default function Login() {
  return (
    <div className="h-[100%] w-full bg-black flex justify-center flex-col items-center pb-3 space-y-5">
      <img src={SpotifyLogo} alt="spotify-logo" />
      <h1 className="text-amber-100 text-2xl font-bold">Log In</h1>
      <button
        className="bg-green-600 pl-10 pr-10 pt-3 pb-3 rounded-4xl text-white font-bold hover:cursor-pointer
                "
      >
        <a href={loginUrl}>Open Spotify</a>
      </button>
      {/* <button className="bg-green-600 pl-10 pr-10 pt-3 pb-3 rounded-4xl text-white font-bold hover:cursor-pointer">
        Get Tokens
      </button> */}
    </div>
  );
}
