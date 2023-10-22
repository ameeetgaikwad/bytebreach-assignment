import Image from "next/image";
import { useState, useContext } from "react";
import { GlobalContext } from "../context/context";
export default function Client({
  loginWithGithub,
  loginWithGoogle,
  loginWithEmail,
  getUserInfo,
  logout,
}: {
  loginWithGithub: any;
  loginWithGoogle: any;
  loginWithEmail: any;
  getUserInfo: any;
  logout: any;
}) {
  const { setUserEmail } = useContext(GlobalContext);
  return (
    <main className="">
      <button
        onClick={loginWithGoogle}
        className="card flex-row bg-white w-full p-2 rounded-full border-black border-2 mb-4 flex-row items-center"
      >
        <Image
          className="ml-2"
          src={"/google.svg"}
          width={38}
          height={37}
          alt="github"
        />
        <div className="ml-2 ">Login using your Google Account</div>
      </button>
      <button
        onClick={loginWithGithub}
        className="card flex-row bg-white w-full p-2 rounded-full border-black border-2 mb-4 flex-row items-center"
      >
        <Image
          className="ml-2"
          src={"/github.svg"}
          width={38}
          height={37}
          alt="github"
        />
        <div className="ml-2">Login using your GitHub Account</div>
      </button>
      <button
        onClick={loginWithGithub}
        className="card flex-row bg-white w-full p-2 rounded-full border-black border-2 mb-4 flex-row items-center"
      >
        <Image
          className="ml-2"
          src={"/wallet.svg"}
          width={38}
          height={37}
          alt="github"
        />
        <div className="ml-2">Login using your Wallet</div>
      </button>
      <div className="mb-4">
        <hr className="bg-black " />
      </div>

      <input
        type="email"
        placeholder="Enter your Email"
        className="card flex-row bg-white w-full p-2 rounded-full border-black border-2 mb-4 flex-row items-center p-3"
        onChange={(e) => {
          console.log(e.target.value);
          setUserEmail(e.target.value);
        }}
      />
      <div className="flex-row justify-center">
        <button
          onClick={(e) => {
            e.preventDefault();
            loginWithEmail();
          }}
          className="card flex-row justify-center bg-white w-3/5 p-2 rounded-full border-black border-2 mb-4 flex-row items-center p-3 m-auto"
        >
          <div className="ml-2">Submit</div>
        </button>
      </div>
      <div className="flex-col justify-center">
        <button
          className="card flex-row bg-white w-full p-2 rounded-full border-black border-2 mb-4 flex-row items-center"
          onClick={getUserInfo}
        >
          user info
        </button>
        <button
          className="card flex-row bg-white w-full p-2 rounded-full border-black border-2 mb-4 flex-row items-center"
          onClick={logout}
        >
          log out
        </button>
      </div>
    </main>
  );
}
