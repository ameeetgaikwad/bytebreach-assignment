"use client";
import Image from "next/image";
import "./globals.css";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES, IProvider, WALLET_ADAPTERS } from "@web3auth/base";
import {
  getWalletConnectV2Settings,
  WalletConnectV2Adapter,
} from "@web3auth/wallet-connect-v2-adapter";
import { WalletConnectModal } from "@walletconnect/modal";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "./context/context";
import { useRouter } from "next/navigation";

export default function Home() {
  const { authenticated } = useContext(GlobalContext);
  const router = useRouter();
  useEffect(() => {
    if (!authenticated) {
      router.push("/login");
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {authenticated ? "Welcome to ByteBreach..." : ""}
    </main>
  );
}
