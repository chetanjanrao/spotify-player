import React from "react";
import { assets } from "../assets/assets";
//import { Navigate } from "react-router-dom";
import { useDataLayerValue } from "./DataLayer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
export default function Navbar({ user }) {
  const [searchParameter, setSearchParameter] = useState("");
  const [{ searchQuery }, dispatch] = useDataLayerValue();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {isSidebarOpen && (
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}
      <nav className="w-full sticky bg-[#121212] pt-5 pl-3 pr-3 pb-2 top-0 z-100 gap-2 flex justify-between items-center font-semibold">
        <div
          onClick={() => {
            setIsSidebarOpen(true);
          }}
          className="w-9 h-9  justify-center items-center bg-black flex  rounded-full cursor-pointer font-bold block lg:hidden"
        >
          &#9776;
        </div>
        <div className="flex items-center gap-2">
          <img
            onClick={() => {
              navigate(-1);
            }}
            // onClick={() => {
            //   navigate("/album");
            // }}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_left}
            alt="arrow left navigation"
          />
          <img
            onClick={() => {
              navigate(+1);
            }}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_right}
            alt="arrow right navigation"
          />
        </div>
        {/*Search bar*/}
        {/* <div class="flex justify-center items-center rounded-full  bg-gray-100">
          <div class="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search..."
              class="w-full pl-10 pr-4 py-2 text-black border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div class="absolute left-3 top-2.5 text-gray-400">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1016.65 16.65z"
                ></path>
              </svg>
            </div>
          </div>
        </div> */}
        <div className="flex  ml-3 items-center border border-gray-300 rounded-full w-[50%]  px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
          <input
            value={searchParameter}
            onChange={(e) => {
              setSearchParameter(e.target.value);
            }}
            type="text"
            placeholder="Search..."
            className="flex-grow outline-none text-white bg-transparent  placeholder-gray-500 min-w-0" // Added min-w-0 here
          />
          <button className="ml-3 p-1 text-gray-500 hover:text-gray-700 focus:outline-none flex-shrink-0">
            {" "}
            {/* Added flex-shrink-0 */}
            {/* Search Icon (SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={() => {
                dispatch({
                  type: "SET_SEARCHQUERY",
                  searchQuery: searchParameter,
                });
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-4">
          {/* <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer sm:truncate">
            Explore Premium
          </p> */}
          <p className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer border sm:truncate hidden sm:block">
            Install App
          </p>
          {/* <p className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer">
            {user?.display_name}
          </p> */}
          <div className="flex items-center h-9 bg-white rounded-2xl shadow hover:shadow-md transition hover:cursor-pointer">
            <img
              src={user?.images[0]?.url}
              //src={assets.avatar}
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500"
            />
            <div className="ml-4 hidden sm:block">
              <h4 className="text-sm pr-3 font-semibold text-gray-900">
                {user?.display_name}
              </h4>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex items-center gap-2 mt-8">
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">
          All
        </p>
        <p
          className="bg-black px-4 py-1 rounded-2xl cursor-pointer"
          onClick={() => {
            navigate("/albumtracks");
          }}
        >
          Music
        </p>
        <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer">
          Prodcast
        </p>
      </div>
    </>
  );
}
