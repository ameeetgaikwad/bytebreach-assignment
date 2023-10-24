"use client";
import Image from "next/image";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/context";

import { useRouter } from "next/navigation";
export default function Register() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");
  const { setAuthenticated } = useContext(GlobalContext);
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center p-20 pt-12">
      <Image
        src={"/assets/logo.svg"}
        width={120}
        height={120}
        alt="l"
        className="pb-5"
      />
      <div className="text-xl font-bold">Enter your details to login</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setAuthenticated(true);
          router.push("/");
        }}
        className="w-full"
      >
        <div className=" w-full sm:w-2/6 m-auto">
          <label>Full Name*</label>
          <input
            type="text"
            className="card flex-row bg-white w-full p-2 rounded-full border-black border-2 mb-4 flex-row items-center p-2"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="w-full sm:w-2/6 m-auto">
          <label>Company Name*</label>
          <input
            type="text"
            className="card flex-row bg-white w-full p-2 rounded-full border-black border-2 mb-4 flex-row items-center p-2"
            required
            onChange={(e) => {
              setCompany(e.target.value);
            }}
            value={company}
          />
        </div>
        <div className="w-full sm:w-2/6 m-auto">
          <label>Website</label>
          <input
            type="text"
            className="card flex-row bg-white w-full p-2 rounded-full border-black border-2 mb-4 flex-row items-center p-2"
            onChange={(e) => {
              setWebsite(e.target.value);
            }}
            value={website}
          />
        </div>
        <div className="w-full sm:w-2/6 m-auto">
          <label>Twitter</label>
          <input
            type="text"
            className="card flex-row bg-white w-full p-2 rounded-full border-black border-2 mb-4 flex-row items-center p-2"
            onChange={(e) => {
              setTwitter(e.target.value);
            }}
            value={twitter}
          />
        </div>
        <div className="w-full sm:w-2/6 m-auto">
          <label>Github</label>
          <input
            type="text"
            className="card flex-row bg-white w-full p-2 rounded-full border-black border-2 mb-4 flex-row items-center p-2"
            onChange={(e) => {
              setGithub(e.target.value);
            }}
            value={github}
          />
        </div>

        <input
          type="submit"
          className="card flex-row justify-center bg-white  w-full sm:w-1/5 p-2 rounded-full border-black border-2 mb-4 flex-row items-center m-auto"
          onClick={() => {
            onsubmit;
          }}
          placeholder="Submit"
        />
        {/* <div className="ml-2 p-3">Submit</div> */}
      </form>
    </main>
  );
}
