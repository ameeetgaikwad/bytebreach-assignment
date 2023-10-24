import Image from "next/image";
import { useState, useContext } from "react";
import { GlobalContext } from "../context/context";
export default function Client({
  loginWithGithub,
  loginWithGoogle,
  loginWithEmail,
  getUserInfo,
  logout,
  lognMetamask,
  getAccounts,
}: {
  loginWithGithub: any;
  loginWithGoogle: any;
  loginWithEmail: any;
  getUserInfo: any;
  logout: any;
  lognMetamask: any;
  getAccounts: any;
}) {
  const { setClientEmail } = useContext(GlobalContext);
  return (
    <main className="flex-col justify-center items-center ml-14 sm:ml-0">
      <button
        onClick={loginWithGoogle}
        className="boreder-none bg-white card flex-row w-4/5 sm:w-full p-2 rounded-full mb-4 flex-row items-center"
      >
        <Image
          className="ml-2"
          src={"/assets/google.svg"}
          width={38}
          height={37}
          alt="github"
        />
        <div className="ml-2 ">Login using your Google Account</div>
      </button>
      <button
        onClick={loginWithGithub}
        className="border-none bg-white card flex-row bg-white w-4/5 sm:w-full p-2 rounded-full border-black border-2 mb-4 flex-row items-center"
      >
        <Image
          className="ml-2"
          src={"/assets/github.svg"}
          width={38}
          height={37}
          alt="github"
        />
        <div className="ml-2">Login using your GitHub Account</div>
      </button>
      <button
        onClick={lognMetamask}
        className="border-none card flex-row bg-white w-4/5 sm:w-full p-2 rounded-full  border-2 mb-4 flex-row items-center"
      >
        <Image
          className="ml-2"
          src={"/assets/wallet.svg"}
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
        className="card flex-row border-none bg-white w-4/5 sm:w-full p-2 rounded-full border-black border-2 mb-4 flex-row items-center p-3"
        onChange={(e) => {
          console.log(e.target.value);
          setClientEmail(e.target.value);
        }}
      />
      <div className="flex-row justify-center ">
        <button
          onClick={(e) => {
            e.preventDefault();
            loginWithEmail();
          }}
          className=" bg-brandBlue card flex-row justify-center w-2/5 rounded-full border-black border-2 mb-4 flex-row items-center p-3 m-auto border-none"
        >
          <div className="ml-2 ">Submit</div>
        </button>
      </div>
      {/* <div className="flex-col justify-center">
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
        <button
          className="card flex-row bg-white w-full p-2 rounded-full border-black border-2 mb-4 flex-row items-center"
          onClick={getAccounts}
        >
          getAccounts
        </button>
      </div> */}
    </main>
  );
}
