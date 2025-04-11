"use client";
import { ethers } from "ethers";
//import { getContract } from "./contract";

export async function donateToCreator(
  creatorAddress: string,
  amountInEth: string,
  description: string
) {
  //const contract = await getContract();
  //const tx = await contract.processDonation(creatorId, {
  //  value: ethers.parseEther(amountInEth)
  //});
  //await tx.wait();
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  //const address = accounts[0];

  const signer = await provider.getSigner();
  if (!ethers.isAddress(creatorAddress)) {
    throw new Error("Invalid creator address");
  }

  // Convert amount to Wei
  const amountInWei = ethers.parseEther(amountInEth);
 // const messageBytes = ethers.toUtf8Bytes(description);
  // Construct transaction
  const tx = {
    to: creatorAddress,
    value: amountInWei,
    gasLimit: 21000, // Standard for ETH transfers
    //data: ethers.hexlify(messageBytes),
  };

  // Send transaction via MetaMask
  await signer.sendTransaction(tx);
  //setStatus(`Transaction sent: ${signedTx.hash}`);

  // Wait for confirmation
  //const receipt = await signedTx.wait();

  console.log("Donation sent");
}
