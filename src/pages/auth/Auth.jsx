import { auth, provider } from "../../config/firebase-config";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

const Auth = () => {
  const navigate = useNavigate();
  // const { isAuth } = useGetUserInfo();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  // Sign in With Google
  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    // console.log(results);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/kharcha-tracker");
  };

  // if (isAuth) {
  //   return <Navigate to="/kharcha-tracker" />;
  // }

  //Sign in with email and password
  const handleEmailPassowordAuth = async (e) => {
    e.preventDefault();
    try {
      let results;
      if (isSignUp) {
        results = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        results = await signInWithEmailAndPassword(auth, email, password);
      }
      const authInfo = {
        userID: results.user.uid,
        name: results.user.displayName,
        profilePhoto: results.user.photoURL,
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate("/kharcha-tracker");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center bg-[#EEF3F9]">
        <div className="flex flex-col p-8 bg-[#ffffff] shadow-2xl rounded w-auto">
          <div>
            <p className="text-[#1C2127] font-bold text-xl">Login</p>
            <form
              className="mt-10 flex flex-col justify-center items-center"
              onSubmit={handleEmailPassowordAuth}
            >
              <input
                className="bg-gray-50 border border-[#A1AAB6] text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-[#A1AAB6] dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500   "
                type="email"
                value={email}
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-3 mb-3"
                type="password"
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit"
                className="bg-[#434AF5] hover:bg-[#3337d1] w-full  rounded-xl  px-5 py-3 text-sm font-medium  duration-200 text-white  "
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </form>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="mt-4 text-blue-500 underline text-center "
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </button>
          </div>
          <div className="flex items-center justify-center">
            <button
              className=" w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold border border-black duration-200  mt-10  hover:bg-[#434AF5] hover:text-white"
              onClick={signInWithGoogle}
            >
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
