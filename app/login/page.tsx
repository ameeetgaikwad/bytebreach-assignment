"use client";
import Image from "next/image";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
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

        // keep
        const privateKeyProvider = new EthereumPrivateKeyProvider({
          config: { chainConfig },
        });
        // keep
        const openloginAdapter = new OpenloginAdapter({
          privateKeyProvider,
        });
        web3authInstance.configureAdapter(openloginAdapter);

        // adding wallet connect v2 adapter
        // const defaultWcSettings = await getWalletConnectV2Settings(
        //   "eip155",
        //   [1, 137, 5],
        //   "04309ed1007e77d1f119b85205bb779d"
        // );
        // const walletConnectModal = new WalletConnectModal({
        //   projectId: "04309ed1007e77d1f119b85205bb779d",
        // });
        // const walletConnectV2Adapter = new WalletConnectV2Adapter({
        //   adapterSettings: {
        //     qrcodeModal: walletConnectModal,
        //     ...defaultWcSettings.adapterSettings,
        //   },
        //   loginSettings: { ...defaultWcSettings.loginSettings },
        // });

        // web3authInstance.configureAdapter(walletConnectV2Adapter);

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

  const { clientEmail } = useContext(GlobalContext);

  const loginWithGithub = async () => {
    try {
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
    } catch (e) {
      console.log("error", e);
    }
  };
  const loginWithGoogle = async () => {
    try {
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
    } catch (e) {
      console.log("error", e);
    }
  };
  const loginWithEmail = async () => {
    try {
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
    } catch (e) {
      console.log("error", e);
    }
  };

  const loginWCModal = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.METAMASK);
    setProvider(web3authProvider);
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
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
  };

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    console.log(address);
  };

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <Image src={"/assets/logo.svg"} width={120} height={120} alt="l" />
      <div className="pt-5 pb-5 text-xl font-bold">ByteBreach</div>

      <Box color={"#04151F"}>
        <Tabs variant="soft-rounded" isFitted borderBottom={"none"}>
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
                loginWCModal={loginWCModal}
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
                loginWCModal={loginWCModal}
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
