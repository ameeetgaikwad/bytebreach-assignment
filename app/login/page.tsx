"use client";
import Image from "next/image";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Spinner,
} from "@chakra-ui/react";
import Client from "../components/client";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES, IProvider, WALLET_ADAPTERS } from "@web3auth/base";

import {
  getWalletConnectV2Settings,
  WalletConnectV2Adapter,
} from "@web3auth/wallet-connect-v2-adapter";
import { WalletConnectModal } from "@walletconnect/modal";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import RPC from "../ethersRPC";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../context/context";
import "../globals.css";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

require("dotenv").config();
export default function Login() {
  const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean | null>(false);
  useEffect(() => {
    const init = async () => {
      try {
        const chainConfig = {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x1",
          rpcTarget: "https://rpc.ankr.com/eth",
          displayName: "Ethereum Mainnet",
          blockExplorer: "https://goerli.etherscan.io",
          ticker: "ETH",
          tickerName: "Ethereum",
        };
        const web3authInstance = new Web3AuthNoModal({
          clientId: process.env.NEXT_PUBLIC_CLIENTID as string, // Get your Client ID from the Web3Auth Dashboard
          web3AuthNetwork: "sapphire_devnet", // Web3Auth Network
          chainConfig,
        });

        setWeb3auth(web3authInstance);

        const privateKeyProvider = new EthereumPrivateKeyProvider({
          config: { chainConfig },
        });

        const openloginAdapter = new OpenloginAdapter({
          privateKeyProvider,
        });
        web3authInstance.configureAdapter(openloginAdapter);

        const metamaskAdapter = new MetamaskAdapter({
          clientId: process.env.NEXT_PUBLIC_CLIENTID,
          sessionTime: 3600, // 1 hour in seconds
          web3AuthNetwork: "sapphire_devnet",

          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });
        web3authInstance.configureAdapter(metamaskAdapter);
        metamaskAdapter.setAdapterSettings({
          sessionTime: 86400, // 1 day in seconds
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
          web3AuthNetwork: "sapphire_devnet",
        });

        await web3authInstance.init();
        setProvider(web3authInstance.provider);
        if (web3authInstance.connectedAdapterName) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  const { clientEmail, setAuthenticated, loading, setLoading } =
    useContext(GlobalContext);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_KEY as string
  );
  const router = useRouter();

  const userData = async () => {
    let { data, error } = await supabase.from("email-storage").select("email");

    return data;
  };
  const userDataAddress = async () => {
    let { data, error } = await supabase
      .from("address-storage")
      .select("address");

    return data;
  };

  const loginWithGithub = async () => {
    try {
      setLoading(true);
      if (!web3auth) {
        console.log("web3auth not initialized yet");
        return;
      }
      const web3authProvider = await web3auth.connectTo(
        WALLET_ADAPTERS.OPENLOGIN,
        {
          loginProvider: "github",
        }
      );
      setProvider(web3authProvider);
      const { email: userEmail } = await web3auth.getUserInfo();
      console.log(userEmail);
      const data = await userData();
      console.log(data);
      const alredyAUser = data?.map((x) => x.email).includes(userEmail);
      console.log(alredyAUser);
      if (alredyAUser) {
        setAuthenticated(true);
        router.push("/");
        setLoading(false);
      } else {
        const { data, error } = await supabase
          .from("email-storage")
          .insert([{ email: userEmail }])
          .select();
        console.log(data);
        router.push("/register");
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log("error", e);
    }
  };
  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      if (!web3auth) {
        console.log("web3auth not initialized yet");
        return;
      }
      const web3authProvider = await web3auth.connectTo(
        WALLET_ADAPTERS.OPENLOGIN,
        {
          loginProvider: "google",
        }
      );
      setProvider(web3authProvider);
      const { email: userEmail } = await web3auth.getUserInfo();
      console.log(userEmail);
      const data = await userData();
      console.log(data);
      const alredyAUser = data?.map((x) => x.email).includes(userEmail);
      console.log(alredyAUser);
      if (alredyAUser) {
        setAuthenticated(true);
        router.push("/");
        setLoading(false);
      } else {
        const { data, error } = await supabase
          .from("email-storage")
          .insert([{ email: userEmail }])
          .select();
        console.log(data);
        router.push("/register");
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log("error", e);
    }
  };
  const loginWithEmail = async () => {
    try {
      setLoading(true);
      if (!web3auth) {
        console.log("web3auth not initialized yet");
        return;
      }

      const web3authProvider = await web3auth.connectTo(
        WALLET_ADAPTERS.OPENLOGIN,
        {
          loginProvider: "email_passwordless",
          extraLoginOptions: {
            login_hint: clientEmail,
          },
        }
      );
      setProvider(web3authProvider);
      const { email: userEmail } = await web3auth.getUserInfo();
      console.log(userEmail);
      const data = await userData();
      console.log(data);
      const alredyAUser = data?.map((x) => x.email).includes(userEmail);
      console.log(alredyAUser);
      if (alredyAUser) {
        setAuthenticated(true);
        setLoading(false);
        router.push("/");
      } else {
        const { data, error } = await supabase
          .from("email-storage")
          .insert([{ email: userEmail }])
          .select();
        console.log(data);
        setLoading(false);
        router.push("/register");
      }
      setLoading(false);
    } catch (e) {
      console.log("error", e);
    }
  };

  const lognMetamask = async () => {
    try {
      setLoading(true);
      if (provider) {
        if (!web3auth) {
          console.log("web3auth not initialized yet");
          return;
        }
        const web3authProvider = await web3auth.connectTo(
          WALLET_ADAPTERS.METAMASK
        );
        setProvider(web3authProvider);
        // @ts-ignore
        const address = await getAccounts();
        console.log(address);
        const data = await userDataAddress();
        console.log(data);
        const alredyAUser = data?.map((x) => x.address).includes(address);
        console.log(alredyAUser);
        if (alredyAUser) {
          setAuthenticated(true);
          router.push("/");
          setLoading(false);
        } else {
          const { data, error } = await supabase
            .from("address-storage")
            .insert([{ address: address }])
            .select();
          console.log(data);
          console.log(error);
          router.push("/register");
          setLoading(false);
        }
      } else {
        setLoading(false);
        return;
      }
    } catch (e) {
      setLoading(false);
      console.log("error", e);
    }
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();

    console.log(user);
  };
  const logout = async () => {
    try {
      setLoading(true);
      if (!web3auth) {
        console.log("web3auth not initialized yet");
        return;
      }
      await web3auth.logout();
      setProvider(null);
      setLoggedIn(false);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log("error", e);
    }
  };

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    console.log(address);

    return address;
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12 md:p-20 md:w-full">
      <div className="absolute top-2 left-4">{loading ? <Spinner /> : ""}</div>

      <div className="pt-5 pb-5  text-xl font-bold md:text-2xl">ByteBreach</div>
      <Image
        src={"/assets/logo.svg"}
        width={120}
        height={120}
        alt="l"
        className="mb-4"
      />
      <button
        onClick={logout}
        className="absolute top-2 right-4 card flex-row bg-white w-1 sm:w-16 p-2 rounded-full border-black border-2 mb-4 flex-row items-center"
      >
        log out
      </button>
      <Box color={"#04151F"}>
        <Tabs
          variant="soft-rounded"
          isFitted
          borderBottom={"none"}
          colorScheme="green"
        >
          <TabList display={"flex"} justifyContent={"center"}>
            <Tab>Client</Tab>
            <Tab>Auditor</Tab>
          </TabList>

          <TabPanels>
            <TabPanel height={"25rem"} width={"30rem"}>
              <Client
                loginWithGithub={loginWithGithub}
                loginWithGoogle={loginWithGoogle}
                loginWithEmail={loginWithEmail}
                lognMetamask={lognMetamask}
                getUserInfo={getUserInfo}
                logout={logout}
                getAccounts={getAccounts}
              />
            </TabPanel>
            <TabPanel height={"25rem"} width={"30rem"}>
              <Client
                loginWithGithub={loginWithGithub}
                loginWithGoogle={loginWithGoogle}
                loginWithEmail={loginWithEmail}
                lognMetamask={lognMetamask}
                getUserInfo={getUserInfo}
                logout={logout}
                getAccounts={getAccounts}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </main>
  );
}
