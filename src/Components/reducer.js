export const initialState = {
  user: null,
  playlists: [],
  //token:
  //  / "BQBrKHTv_zYJN_kboQ1OVMvvUZiLPR4VqYvGNzHd8Nz24gD8Z_LKvwo3pnoCJawnfQ_v67JcyB-ZFa6nUN6uIg1pRByCMwTagqlYeD2y7ntvCLXc4UOqtDtLezY1PoHA9brAG9DRG-7guW7WTTH3TOGjNfvroH9yxNvXdEn5FNvIllr6enl3lXSMoAjo7CYiAp9DVlRqOmmTs3FYhb9przat5fsDoiwW7UIqULwDP7WYodlJHZVP0C55NjK2",
  playing: false,
  token: null,
  albums: [],
  items: null,
  albumAndAlbumTracks: [],
  playlistTracks: [],
  selectedTrackId: null,
  selectedUserPlaylistID: null,
  selectedAlbumId: null,
  albumTracks: [],
  searchQuery: null,
  searchTracks: [],
  // albumTracks: [],
  // searchSongs: [],
};

export default function reducer(state = initialState, action) {
  switch (action?.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };

    case "SET_PLAYLISTES":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_ALBUMS":
      return {
        ...state,
        albums: action.albums,
      };
    // case "SET_SEARCH_SONG":
    //   return {
    //     ...state,
    //     searchSongs: action.searchSongs,
    //   };
    case "SET_TRACKS":
      return {
        ...state,
        albumAndAlbumTracks: action.albumAndAlbumTracks,
      };
    case "SET_SELECTEDTRACTID":
      return {
        ...state,
        selectedTrackId: action.selectedTrackId,
      };
    case "SET_SELECTEDUSERPLAYLISTID":
      return {
        ...state,
        selectedUserPlaylistID: action.selectedUserPlaylistID,
      };
    case "SET_PLAYLISTTRACKS":
      return {
        ...state,
        playlistTracks: action.playlistTracks,
      };
    case "SET_SELECTEDALBUMID":
      return {
        ...state,
        selectedAlbumId: action.selectedAlbumId,
      };
    case "SET_ALBUMTRACKS":
      return {
        ...state,
        albumTracks: action.albumTracks,
      };
    case "SET_SEARCHQUERY":
      return {
        ...state,
        searchQuery: action.searchQuery,
      };
    case "SET_SEARCHTRACKS":
      return {
        ...state,
        searchTracks: action.searchTracks,
      };
    default:
      return state;
  }
}
