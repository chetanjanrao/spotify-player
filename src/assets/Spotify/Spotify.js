export const authEndPoint = "https://accounts.spotify.com/authorize";
const redirectUri = "https://spotifstream.netlify.app";
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

// PKCE Helper functions
const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
};

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

export const getLoginUrl = async () => {
  const codeVerifier = generateRandomString(64);
  window.localStorage.setItem('spotify_code_verifier', codeVerifier);

  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const state = Math.random().toString(36).substring(2, 15);
  localStorage.setItem("spotify_auth_state", state);

  const authParams = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: scopes.join(" "),
    redirect_uri: redirectUri,
    state: state,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    show_dialog: "true",
  });
  return `${authEndPoint}?${authParams.toString()}`;
};

export const getTokenFromCode = async (code) => {
  const codeVerifier = window.localStorage.getItem('spotify_code_verifier');
  if (!codeVerifier) {
    throw new Error("Code verifier not found in localStorage.");
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error fetching token: ${errorData.error_description || response.statusText}`);
  }

  const tokenData = await response.json();
  window.localStorage.removeItem('spotify_code_verifier');
  return tokenData.access_token;
};
