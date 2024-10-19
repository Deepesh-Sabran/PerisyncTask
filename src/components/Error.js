import React, { useState, useEffect } from "react";

const Error = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  // This function will be called when an error is caught
  const handleError = (error) => {
    console.error("Error caught by Error Boundary:", error);
    setHasError(true);
  };

  useEffect(() => {
    const errorHandler = (event) => {
      handleError(event.error);
    };

    window.addEventListener("error", errorHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  // Catching errors in children components
  if (hasError) {
    return <h1>Something went wrong. Please try again.</h1>;
  }

  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { onError: handleError })
      )}
    </>
  );
};

export default Error;
