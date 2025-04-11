"use client";

import { ABI, CONTRACT_ADDRESS } from "@/fundhog.abi";
import {ethers} from "ethers"

export async function getContract() {
  if (!window.ethereum) throw new Error("MetaMask is not installed");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
}
