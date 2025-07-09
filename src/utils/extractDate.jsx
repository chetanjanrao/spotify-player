import React from "react";
export default function extractDate(isoString) {
  return isoString.split("T")[0];
}
