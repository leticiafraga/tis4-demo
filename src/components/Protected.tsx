import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../firebase";

export default function Protected() {
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  if (!loggedIn) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
}
