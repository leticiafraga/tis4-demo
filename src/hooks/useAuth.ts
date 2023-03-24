import { LoginRequest } from "../requests/LoginRequest";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase.js";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const navigate = useNavigate();

  async function login(data: LoginRequest) {
    let success = await setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        return await signInWithEmailAndPassword(auth, data.email, data.password)
          .then((response) => {
            //@ts-ignore
            const accessToken = response.user.accessToken;
            const email = data.email.split("@")[0];
            setLocalStorage(email, accessToken);
            return true;
          })
          .catch((err) => console.log(err.message));
      })
      .catch((err) => console.log(err.message));

    return success;
  }

  function logout() {
    signOut(auth)
      .then((response) => {
        navigate("login");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function setLocalStorage(username: string, accessToken: string) {
    localStorage.setItem("USERNAME", username);
    localStorage.setItem("ACCESS_TOKEN", accessToken);
  }

  return { login, logout };
}
