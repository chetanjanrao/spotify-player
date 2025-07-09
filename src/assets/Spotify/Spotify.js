export const authEndPoint = "https://accounts.spotify.com/authorize";
const redirectUri = "https://spotifstream.netlify.app/";
const clientId = "5b82a28ff387492cac57e5a9a982b84d";
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "playlist-read-private",
  "playlist-read-collaborative",
];

/**
 * Parses the access token and other parameters from the URL hash.
 * @returns {object} An object containing the URL hash parameters.
 */
export const getHashParams = () => {
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  return Object.fromEntries(hashParams.entries());
};

// Generate a random string for the state parameter for CSRF protection
const state = Math.random().toString(36).substring(2, 15);
localStorage.setItem("spotify_auth_state", state);

const authParams = new URLSearchParams({
  response_type: "token",
  client_id: clientId,
  scope: scopes.join(" "), // Use a space as a separator, URLSearchParams will encode it
  redirect_uri: redirectUri,
  state: state,
  show_dialog: "true",
});

export const loginUrl = `${authEndPoint}?${authParams.toString()}`;
