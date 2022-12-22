import React from "react";

export const DashboardNavigator = () => {
  return (
    <div>
      <button
        onClick={() => {
          window.open("./dashboard.html", "_blank");
          window.close();
        }}
      >
        go to dashboard
      </button>
    </div>
  );
};
