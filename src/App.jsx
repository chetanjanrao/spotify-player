import React, { useEffect } from "react";

import Login from "./Components/Login";
import HomePage from "./Components/HomePage";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./Components/DataLayer";
import { getTokenFromCode } from "./assets/Spotify/Spotify";
import "./styles.css";

const spotify = new SpotifyWebApi();

export default function App() {
  const [{ token }, dispatch] = useDataLayerValue();

  // This effect runs once on mount to handle the authentication redirect
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const receivedState = urlParams.get("state");
    const storedState = localStorage.getItem("spotify_auth_state");

    if (code && receivedState && receivedState === storedState) {
      localStorage.removeItem("spotify_auth_state");

      // Exchange the authorization code for an access token
      getTokenFromCode(code)
        .then((accessToken) => {
          //console.log("Successfully authenticated with token:", accessToken);  working
          dispatch({
            type: "SET_TOKEN",
            token: accessToken,
          });
        })
        .catch((error) => {
          console.error("Authentication Error:", error);
          // Optionally, handle the error, e.g., show an error message
        });

      // Clean the URL
      window.history.pushState({}, null, "/");
    } else if (urlParams.get("error")) {
      console.error("Spotify login error:", urlParams.get("error"));
    }
  }, [dispatch]); // dispatch is stable, so this runs once

  // This effect runs whenever the token changes
  useEffect(() => {
    if (token) {
      spotify.setAccessToken(token);

      // Fetch user data
      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });

      spotify
        .getAlbum("4rvCQOx2G4DYIq2dnTIN5U")
        .then(function (data) {
          dispatch({
            type: "SET_TRACKS",
            albumAndAlbumTracks: data,
          });
          return data?.tracks?.items?.map(function (t) {
            return t.id; // This seems incomplete, but I'm preserving it.
          });
        });
    }
  }, [token, dispatch]); // This effect depends on the token

  return <>{token ? <HomePage spotify={spotify} /> : <Login />}</>;
}
