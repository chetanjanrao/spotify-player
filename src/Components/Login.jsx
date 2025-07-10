// In your Login.jsx component
import React, { useState, useEffect } from 'react';
import { getLoginUrl } from '../assets/Spotify/Spotify'; // Adjust path if needed
import SpotifyLogo from "../assets/SpotifyLogo.png"// Adjust path if needed
function Login() {
  const [loginUrl, setLoginUrl] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    // Only generate a new login URL if we are not in the middle of an auth callback.
    // This prevents overwriting the code_verifier in localStorage.
    if (!urlParams.has('code')) {
      getLoginUrl().then(url => setLoginUrl(url));
    }
  }, []);

  return (


    <div className="h-[100%] w-full bg-black flex justify-center flex-col items-center pb-3 space-y-5">
      <img src={SpotifyLogo} alt="spotify-logo" />
      <h1 className="text-amber-100 text-2xl font-bold">Log In</h1>
      <button
        className="bg-green-600 pl-10 pr-10 pt-3 pb-3 rounded-4xl text-white font-bold hover:cursor-pointer
               "
      >
          <a href={loginUrl}>
            Login Spotify
          </a>        
      </button>
    </div>
  );
}

export default Login;
