// src/utils/spotifyAuth.js
import pkceChallenge from "pkce-challenge";

const clientId = "5b82a28ff387492cac57e5a9a982b84d";
const redirectUri = "https://tmzn3p-5173.csb.app/callback";
const scope = "user-read-private user-read-email";

const { code_challenge, code_verifier } = pkceChallenge();
localStorage.setItem("pkce_verifier", code_verifier);

export const getSpotifyAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: "5b82a28ff387492cac57e5a9a982b84d",
    response_type: "code",
    redirect_uri: "https://tmzn3p-5173.csb.app/callback",
    code_challenge_method: "S256",
    code_challenge,
    scope,
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};
