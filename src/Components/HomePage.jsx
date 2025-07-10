import React,{useEffect} from "react";
import Sidebar from "./Sidebar";
import Display from "./Display";
import FooterPlayer from "./FooterPlayer";
import { useDataLayerValue } from "./DataLayer";
export default function HomePage({ spotify }) {
  // All data fetching is now handled in App.jsx.
  // This component is now only responsible for rendering the layout.
    const albumId = "5mS4yO0p42yLgXzK1b1K1D";
  const [{ user, token }, dispatch] = useDataLayerValue();
  useEffect(() => {
   
    // console.log(_token);
    if (token) {
      
      spotify.setAccessToken(token);
      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });
      spotify.getUserPlaylists().then((playlists) => {
        console.log("Playlists", playlists);
        dispatch({
          type: "SET_PLAYLISTES",
          playlists: playlists,
        });
      });
      spotify.getArtistAlbums("70B80Lwx2sxti0M1Ng9e8K", function (err, data) {
        if (err) {
          console.error(err);
        } else {
          console.log("Artist albums", data);
          dispatch({
            type: "SET_ALBUMS",
            albums: data,
          });
        }
      });
      spotify
        .getArtists(["2hazSY4Ef3aB9ATXW7F5w3", "6J6yx1t3nwIDyPXk5xa7O8"])
        .then(
          function (data) {
            console.log("Artists information", data);
          },
          function (err) {
            console.error(err);
          }
        );

      spotify
        .getAlbum("4rvCQOx2G4DYIq2dnTIN5U")
        .then(function (data) {
          dispatch({
            type: "SET_TRACKS",
            albumAndAlbumTracks: data,
          });
          return data?.tracks?.items?.map(function (t) {
            return t.id;
          });
        })
        .then(function (trackIds) {
          return spotify.getTracks(trackIds);
        })
        .then(function (tracksInfo) {
          console.log("trackinfo", tracksInfo);
        })
        .catch(function (error) {
          console.error(error);
        });

      // album detail for the first 10 Elvis' albums
      spotify
        .getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE", { limit: 10 })
        .then(function (data) {
          return (
            data.length > 0 &&
            data.albums.map(function (a) {
              return a.id;
            })
          );
        })
        .then(function (albums) {
          return spotify.getAlbums(albums);
        })
        .then(function (data) {
          console.log(data);
        });

      // search artists whose name contains 'Love'
      spotify.searchArtists("Love").then(
        function (data) {
          console.log('Search artists by "Love"', data);
        },
        function (err) {
          console.error(err);
        }
      );

      // search tracks whose artist's name contains 'Love'
      spotify.searchTracks("artist:Love").then(
        function (data) {
          console.log('Search tracks by "Love" in the artist name', data);
        },
        function (err) {
          console.error(err);
        }
      );
      // spotify.searchTracks("Love").then(
      //   function (data) {
      //     console.log('Search by "Love"', data);
      //     dispatch({
      //       type: "SET_SEARCH_SONG",
      //       searchSongs: data,
      //     });
      //   },
      //   function (err) {
      //     console.error(err);
      //   }
      // );

      spotify
        .getAlbums(["2hazSY4Ef3aB9ATXW7F5w3", "6J6yx1t3nwIDyPXk5xa7O8"])
        .then((albums) => {
          console.log("albums", albums);
          dispatch({
            type: "SET_ALBUMS",
            albums: albums,
          });
        });
      //console.log(user);    working
      //console.log(token);   working
    }
  }, []);
  return (
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        <Sidebar />
        <Display spotify={spotify} />
      </div>
      <FooterPlayer />
    </div>
  );
}
