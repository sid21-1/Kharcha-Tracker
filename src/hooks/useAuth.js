import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../config/firebase-config";
import { signInWithPopup } from "firebase/auth";

export const useAuth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  // const { isAuth } = useGetUserInfo();

  const handleMySqlEmailPassword = async (e) => {
    e.preventDefault();
    const apiUrl = isSignUp
      ? "http://localhost:5000/authorize/signup"
      : "http://localhost:5000/authorize/signin";

    const requestBody = {
      email,
      password,
    };
    if (isSignUp) {
      requestBody.name = userName;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const responseData = await response.json();
      if (response.status === 200 || response.status === 201) {
        const authInfo = {
          userId: responseData.userId,
          name: responseData.userName,
          profilePhoto: "",
          isAuth: true,
        };
        localStorage.setItem("auth", JSON.stringify(authInfo));
        navigate("/kharcha-tracker");
      } else {
        alert("Error: " + responseData.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error posting data", error);
    }
  };

  // Sign in With Google
  // It is an asynchronous call
  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    // console.log(results);

    //turning the object as the string and again turning it back as an object whenever needed
    //this is the most common way to do it
    const authInfo = {
      userId: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };

    // localStorage cannot store objects so we use the function stringify to convert the object to string. This is a function that is introduced by JSON
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/kharcha-tracker");
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    userId,
    setUserId,
    userName,
    setUserName,
    isSignUp,
    setIsSignUp,
    handleMySqlEmailPassword,
    signInWithGoogle,
  };
};
