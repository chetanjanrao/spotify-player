import React from "react";
export default function SongItem({ song }) {
  return (
    <>
      <div className="min-w-[108px] p-2 rounded cursor-pointer hover:bg-[#ffffff26]">
        <img className="rounded" src={song?.items?.artists[0]?.href} />
        <p className="font-bold mt-2 mb-1 truncate">{}</p>
        <p className="text-slate-200 text-sm">{}</p>
      </div>
    </>
  );
}
