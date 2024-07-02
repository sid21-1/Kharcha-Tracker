import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    console.log(results);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/kharcha-tracker");
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col ">
          <p className="my-2 font-bold text-4xl">
            Sign In with Google to Continue
          </p>
          <button
            className="bg-blue-500 w-1/2 m-auto rounded-xl  px-5 py-3 text-2xl font-medium hover:bg-blue-400 duration-200 "
            onClick={signInWithGoogle}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Auth;
