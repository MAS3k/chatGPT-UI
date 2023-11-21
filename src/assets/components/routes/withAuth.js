import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  const ProtectedComponent = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const expirationTime = localStorage.getItem("expirationTime");
      const loggedIn = localStorage.getItem("token");

      if (
        !loggedIn ||
        (expirationTime && new Date().getTime() >= +expirationTime)
      ) {
        navigate("/login");
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
};

export default withAuth;
