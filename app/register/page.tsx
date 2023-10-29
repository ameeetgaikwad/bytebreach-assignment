"use client";
import Image from "next/image";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/context";
import { Input } from "@chakra-ui/react";
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
    <main className="flex min-h-screen flex-col items-center p-20 pt-12 bg-[url('/assets/bg.svg')] bg-bottom bg-no-repeat bg-cover">
      <div
        className={`bg-[url('/assets/bg.png')] w-1/3 h-screen bg-no-repeat absolute right-[0] top-[0px] rounded-bl-[180px]`}
      >
        <div className="uui-img">
          <div className="uui-img-center ">
            <Image
              src={"/assets/logo.svg"}
              width={120}
              height={120}
              alt="l"
              className="mb-4"
            />
            <div className="pt-5 pb-5 text-white text-xl font-bold md:text-2xl">
              ByteBreach
            </div>
          </div>
        </div>
      </div>
      <div className="shadow-lg absolute left-36 top-6 w-2/6 border-lightGray border-[1px] rounded-[34px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setAuthenticated(true);
            router.push("/");
          }}
          className=""
        >
          <div className="m-5 mb-2 ml-10">
            <p className="font-bold">Contact Details</p>
            <p className="text-lightBlue text-sm">
              Enter your details to login
            </p>
          </div>
          <div className="mb-4 w-5/6 m-auto">
            <hr className="text-lightGray" />
          </div>
          <div className=" w-full sm:w-5/6 m-auto uui-input">
            <label className="text-labelBlue">
              Full Name <span className="text-red">*</span>
            </label>
            <Image
              src={"/assets/contact.svg"}
              width={15}
              height={15}
              alt="logo"
              className="uui-input-logo"
            />
            <Input
              type="text"
              className="flex-row bg-white w-full p-2 rounded-full border-lightGray shadow-md text-lightBlue border-2 mb-4 flex-row items-center p-2 focus:border-none placeholder "
              required
              placeholder="John Carter"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="w-full sm:w-5/6 m-auto uui-input">
            <label className="text-labelBlue">
              Github <span className="text-red">*</span>
            </label>{" "}
            <Image
              src={"/assets/githubForm.svg"}
              width={15}
              height={15}
              alt="logo"
              className="uui-input-logo"
            />
            <Input
              type="text"
              className="flex-row bg-white w-full p-2 rounded-full border-lightGray shadow-md text-lightBlue border-2 mb-4 flex-row items-center p-2 focus:border-0 placeholder"
              required
              onChange={(e) => {
                setCompany(e.target.value);
              }}
              value={company}
              placeholder="eg. bytebreach"
            />
          </div>
          <div className="w-full sm:w-5/6 m-auto">
            <label className="text-labelBlue">
              Weekly Cost <span className="text-red">*</span>
            </label>
            <Input
              type="text"
              className="flex-row bg-white w-full p-2 rounded-full border-lightGray shadow-md text-lightBlue border-2 mb-4 flex-row items-center p-2 focus:border-0 placeholder"
              onChange={(e) => {
                setWebsite(e.target.value);
              }}
              required
              value={website}
              placeholder="eg. 500$"
            />
          </div>
          <div className="w-full sm:w-5/6 m-auto uui-input">
            <label className="text-labelBlue">Twitter</label>{" "}
            <Image
              src={"/assets/twitter.svg"}
              width={15}
              height={15}
              alt="logo"
              className="uui-input-logo"
            />
            <Input
              type="text"
              className="flex-row bg-white w-full p-2 rounded-full border-lightGray shadow-md text-lightBlue border-2 mb-4 flex-row items-center p-2 focus:border-0 placeholder"
              onChange={(e) => {
                setTwitter(e.target.value);
              }}
              value={twitter}
              placeholder="eg. bytebreach"
            />
          </div>
          <div className="w-full sm:w-5/6 m-auto flex-row ">
            <div className="inline-block w-[46%] uui-input mr-4 ">
              <label className="text-labelBlue">
                Sherlock{" "}
                <img className="uui-img-css" src="/assets/i.svg" alt="" />
              </label>{" "}
              <Image
                src={"/assets/sherlock.svg"}
                width={18}
                height={18}
                alt="logo"
                className="uui-input-logo"
              />
              <Input
                type="text"
                className="flex-row bg-white w-full p-2 rounded-full border-lightGray shadow-md text-lightBlue border-2 mb-4 flex-row items-center p-2 focus:border-0 placeholder"
                onChange={(e) => {
                  setGithub(e.target.value);
                }}
                placeholder="eg. bytebreach"
                value={github}
              />
            </div>
            <div className="inline-block w-[46%] ml-4">
              <label className="text-labelBlue">
                CodeArena{" "}
                <img className="uui-img-css" src="/assets/i.svg" alt="" />
              </label>
              <Input
                type="text"
                className="flex-row bg-white w-full p-2 rounded-full border-lightGray shadow-md text-lightBlue border-2 mb-4 flex-row items-center p-2 focus:border-0 placeholder"
                onChange={(e) => {
                  setGithub(e.target.value);
                }}
                placeholder="eg. bytebreach"
                value={github}
              />
            </div>
          </div>
          <div className="mb-4 w-5/6 m-auto">
            <hr className="text-lightGray" />
          </div>
          <div className="w-full sm:w-5/6 m-auto">
            <label className="text-labelBlue">
              Invite Code <span className="text-red">*</span>
            </label>
            <Input
              type="text"
              className="flex-row bg-white w-full p-2 rounded-full border-lightGray shadow-md text-lightBlue border-2 mb-4 flex-row items-center p-2 focus:border-0 placeholder"
              onChange={(e) => {
                setTwitter(e.target.value);
              }}
              value={twitter}
              placeholder="1234"
              required
            />
          </div>
          <div className="text-center">
            <Input
              type="submit"
              className="flex-row bg-darkBlue w-3/6 p-2 rounded-full border-lightGray shadow-md text-white border-2 mb-4 flex-row items-center p-2 focus:border-none placeholder"
              onClick={() => {
                onsubmit;
              }}
              placeholder="Submit"
            />
          </div>
          {/* <div className="ml-2 p-3">Submit</div> */}
        </form>
      </div>
    </main>
  );
}
