import React from "react";

export const DashboardNavigator = () => {
  return (
    <button
      className="dashboard-navigator"
      onClick={() => {
        window.open("./dashboard.html", "_blank");
        window.close();
      }}
    >
      <img
        className="dashboard-navigator-image"
        src={require("../assets/dashboard-icon.png")}
        alt="go to dashboard"
      />
    </button>
  );
};
