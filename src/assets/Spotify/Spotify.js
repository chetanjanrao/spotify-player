export const authEndPoint = "https://accounts.spotify.com/authorize";
// export const redirectUri = "http://localhost:3000/";
// const redirectUri = "https://tmzn3p-5173.csb.app/";
const redirectUri = "https://spotifstream.netlify.app/"
const clientId = "5b82a28ff387492cac57e5a9a982b84d";
const response_type = "code";
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "playlist-read-private",
  "playlist-read-collaborative",
];

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};
export const loginUrl = `${authEndPoint}?&scope=${scopes.join(
	"%20"
)}&response_type=token&show_dialog=true&client_id=${clientId}&redirect_uri=${redirectUri}`
