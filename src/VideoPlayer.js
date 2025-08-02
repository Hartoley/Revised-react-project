// src/components/VideoPlayer.js
import React from "react";

const VideoPlayer = ({
  videoUrl,
  onClose,
  onPlayPause,
  onNext,
  onPrev,
  isPaused,
  videoElementRef,
  statusText,
}) => {
  return (
    <div
      className="Mainvideos3"
      style={{
        position: "fixed",
        paddingTop: 20,
        top: 70,
        left: 90,
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div className="playvideo" style={{ width: "70%", height: "80%" }}>
        <div className="videoPlayer" style={{ width: "100%", height: "95%" }}>
          <video
            ref={videoElementRef}
            src={videoUrl}
            controls
            autoPlay
            onEnded={onNext}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="buttonPay" style={{ marginTop: "1rem" }}>
          <span onClick={onPlayPause}>{isPaused ? "▶️ Play" : "⏸️ Pause"}</span>
          <span onClick={onPrev}>⬅️ Prev</span>
          <span onClick={onNext}>➡️ Next</span>
          <span onClick={onClose}>❌ Close</span>
        </div>
        <p className="status">{statusText}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
