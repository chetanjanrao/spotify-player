import React from "react";
import { assets } from "../assets/assets";
import { useDataLayerValue } from "./DataLayer";
import { useNavigate } from "react-router-dom";
{
  /*Start component*/
}
export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const [{ playlists, selectedUserPlaylistID }, dispatch] = useDataLayerValue();
  const navigate = useNavigate();
  function handleSlectedUserPlaylistId(selectedUserPlaylistID) {
    dispatch({
      type: "SET_SELECTEDUSERPLAYLISTID",
      selectedUserPlaylistID: selectedUserPlaylistID,
    });
  }
  return (
    <>
      <div
        className={
          isSidebarOpen
            ? "absolute z-500 left-1 top-1 w-[50%] h-[90%] border-amber-50 p-2 flex-col gap-2 text-white block "
            : "w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex"
        }
      >
        <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
          <div
            className="flex items-center gap-3 pl-8 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={assets.home_icon} className="w-6" alt="Logo" />
            <p className="font-bold">Home</p>
          </div>
          {isSidebarOpen && <button
            id="closeButton"
            onClick={() => {
              setIsSidebarOpen(false);
            }}
            className="absolute top-4 right-2 mr-3 text-4xl text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:rotate-90 hover:scale-125 hover:text-red-400"
          >
            &times;
          </button>}
          <div
            className="flex items-center gap-3 pl-8 cursor-pointer"
            onClick={() => {
              navigate("/searchSongs");
            }}
          >
            <img src={assets.search_icon} className="w-6" alt="Logo" />
            <p className="font-bold">Search</p>
          </div>
        </div>
        <div className="bg-[#121212] h-[85%] rounded">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img className="w-8" src={assets.stack_icon} alt="Logo" />
              <p className="font-semibold">Your Library</p>
            </div>
            <div className="flex items-center gap-3 pl-2">
              <img src={assets.arrow_icon} className="w-5" alt="Logo" />
              <img src={assets.plus_icon} className="w-5" alt="Logo" />
            </div>
          </div>
          <h3 className="pl-10 pt-2 pb-2 font-bold truncate cursor-pointer">
            PLAYLISTS
          </h3>
          <hr />
          {/* <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
            <h1>Create your first playlist</h1>
            <p className="font-light">it's easy we will help you</p>
            <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
              Create Playlist
            </button>
          </div> */}
          {/* <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
            <h1>Let's find some podcast to follow</h1>
            <p className="font-light">we'll update on new episodes</p>
            <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
              Browse podcast
            </button>
          </div> */}
          {playlists?.items?.map((playlist) => (
            <h3
              className="pl-10 pt-2 font-bold truncate cursor-pointer hover:text-amber-200"
              key={playlist?.name}
              onClick={() => {
                navigate("/playlist");
                handleSlectedUserPlaylistId(playlist?.id);
              }}
            >
              {playlist?.name}
            </h3>
          ))}
        </div>
      </div>
    </>
  );
}
