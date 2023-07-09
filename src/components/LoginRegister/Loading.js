import React from "react";
import { CircularProgress } from "@mui/material";

function Loading({ size = 50 }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <CircularProgress
        style={{
          width: size,
          height: size,
          color: "black",
        }}
      />
    </div>
  );
}

export default Loading;
