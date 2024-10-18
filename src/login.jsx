import React from "react";
import { auth } from "./confige"; // Adjust the path based on your folder structure
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

function Login() {
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info:", user);
    } catch (error) {
      console.error("Error during sign-in:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error during sign-out:", error.message);
    }
  };

  return (
    <>
      <label>Email</label>
      <input type="text" />
      <label>Password</label>
      <input type="password" />
      <button onClick={loginWithGoogle}>Login with Google</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Login;
