import React, { useEffect, useState } from "react";

const OnlineStatus = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const updateOnlineStatus = () => {
    setIsOffline(!navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return (
    <>{isOffline && <div style={styles.offlineMessage}>You are offline</div>}</>
  );
};

const styles = {
  offlineMessage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f44336",
    color: "white",
    padding: "10px",
    position: "fixed",
    top: 0,
    width: "100%",
    textAlign: "center",
  },
};

export default OnlineStatus;
