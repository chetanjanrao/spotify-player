import React from "react";
import Sidebar from "./Sidebar";
import Display from "./Display";
import FooterPlayer from "./FooterPlayer";

export default function HomePage({ spotify }) {
  // All data fetching is now handled in App.jsx.
  // This component is now only responsible for rendering the layout.
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
