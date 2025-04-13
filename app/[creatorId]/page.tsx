"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Coffee, Wallet } from "lucide-react";
import { useParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function DonatePage() {
  const { creatorId } = useParams<{ creatorId: string }>();
  const [amount, setAmount] = useState<string>("0");
  const [account, setAccount] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  //  const { toast } = useToast();

  useEffect(() => {
    // Just to satisfy the linter for the useEffect dependency array
    if (amount) {
      // This would be where we'd convert to MATIC amount
    }
  }, [amount]);

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      //toast({
      //  title: "MetaMask not detected",
      //  description: "Please install MetaMask to connect your wallet",
      //  variant: "destructive",
      //});
      return;
    }

    try {
      // Request wallet connection
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      //toast({
      //  title: "Wallet connected",
      //  description: `Connected to ${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`,
      //    });
    } catch (err) {
      console.error("User rejected connection", err);
      //   toast({
      //    title: "Connection failed",
      //   description: "Failed to connect to MetaMask",
      //   variant: "destructive",
      // });
    }
  };

  const donateToCreator = async (
    creatorAddress: string,
    donationAmount: string
  ) => {
    if (!window.ethereum) {
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const weiAmount = Number(donationAmount) * 1e18; // Convert to wei (assuming POL has 18 decimals like ETH)
      const hexWeiAmount = `0x${weiAmount.toString(16)}`;

      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: accounts[0],
            to: creatorAddress,
            value: hexWeiAmount,
            gas: "0x5208", // 21000 gas
          },
        ],
      });
      toast.success('Donation sent successfully');
    } catch (error) {
      toast.error("Failed sending donation");
      console.error("Transaction error:", error);
    }
  };

  return (
    <div className="mx-auto px-4 py-12 bg-[#FFFFF2] min-h-screen flex justify-center items-center">
      <Toaster position="top-center" reverseOrder={false} />
      <Card className="py-0 w-full max-w-md border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-[-1deg] bg-white">
        <div className="bg-[#8B5CF6] text-white pt-5 pr-5 pl-5 pb-3 border-b-4 border-black">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black">SUPPORT WITH CRYPTO</h2>
            <div className="bg-black p-2 transform rotate-[-3deg] border-2 border-white">
              <Coffee className="h-6 w-6 text-white" />
            </div>
          </div>
          <p className="text-white font-bold text-xl">BUY ME A COFFEE</p>
        </div>

        <div className="p-2 space-y-2">
          <div className="">
            <label className="text-lg font-black">Amount</label>
            <div className="flex border-4 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="bg-black text-white font-bold flex items-center justify-center px-3">
                POL
              </span>
              <Input
                type="number"
                value={amount}
                min="0.001"
                step="0.001"
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none font-bold"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-lg font-black">Message (Coming Soon!)</label>
            <Textarea
              placeholder="Will be added in the future!"
              className="resize-none h-20 border-4 border-black rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled
            />
          </div>

          <div className="bg-yellow-300 p-3 border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-[1deg]">
            Sending to{" "}
            <a
              href={`https://polygonscan.com/address/${
                creatorId || "0x0000000000000000000000000000000000000000"
              }`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bg-[#8B5CF6] underline"
            >
              {creatorId
                ? `${creatorId.slice(0, 6)}...${creatorId.slice(-4)}`
                : "Unknown Address"}
            </a>
          </div>
        </div>

        <div className="p-6 border-t-4 border-black bg-gray-100">
          {account === "" ? (
            <Button
              className="w-full bg-[#0EA5E9] hover:bg-blue-600 text-white border-4 border-black font-black py-6 text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
              onClick={connectWallet}
            >
              <Wallet className="mr-2 h-6 w-6" /> CONNECT WALLET
            </Button>
          ) : (
            <Button
              className="w-full bg-[#10B981] hover:bg-green-600 text-white border-4 border-black font-black py-6 text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
              onClick={async () => {
                if (!creatorId) {
                  return;
                }
                setSubmitting(true);
                await donateToCreator(creatorId, amount);
                setSubmitting(false);
              }}
              disabled={!amount || amount === "0" || isSubmitting || !creatorId}
            >
              {isSubmitting ? "PROCESSING..." : `DONATE ${amount} POL`}
            </Button>
          )}
          <p className="text-center pt-4">
            <Link href="/">Powered by FundHog</Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
