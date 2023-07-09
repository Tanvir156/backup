import React from "react";

export default function ForTab({ text, icon }) {
  return (
    <div
      className="Tags-module_tags__n4i1K"
      style={{
        backgroundColor: "inherit",
        color: "rgb(29, 41, 57)",
        padding: "3px 6px",
        borderRadius: "4px",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        border: "0px solid rgb(102, 112, 133)",
      }}
    >
      {icon}
      <p
        className="Tags-module_tags_text__-u2Tl"
        style={{
          fontSize: "12px",
          margin: "0px",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </p>
    </div>
  );
}
