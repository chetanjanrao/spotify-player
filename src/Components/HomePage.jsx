import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Display from "./Display";
import FooterPlayer from "./FooterPlayer";
export default function HomePage({ spotify }) {
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
