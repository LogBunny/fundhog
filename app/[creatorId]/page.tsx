"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { donateToCreator } from "../server/donate";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
//import { DonationAmountButton } from "@/components/ui/donation-button";
import { Coffee } from "lucide-react";
//import axios from "axios";

//const COINGECKO_URL ="https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd";

export default function CreatorPage() {
  const { creatorId } = useParams<{ creatorId: string }>();
  const [amount, setAmount] = useState<string>("0");
  const [account, setAccount] = useState<string>("");
  const [maticAmount, setMaticAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    handleAmountChange(amount);
  }, [amount]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request wallet connection
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (err) {
        console.error("User rejected connection", err);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const handleAmountChange = async (value: string) => {
    //const response = await axios.get<{ "matic-network": { usd: number } }>(
    //  COINGECKO_URL
    //);
    //const matic = parseFloat(value) / response.data["matic-network"].usd;
    setMaticAmount(parseFloat(value));
  };

  //  const predefinedAmounts = ["5", "10", "20"];

  return (
    <div className="min-h-screen bg-white flex justify-center items-center p-4">
      <Card className="h-full py-0 w-full max-w-md border-4 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="bg-orange-500 text-white pt-4 pr-4 pl-4 pb-0 rounded-none">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-black">
              SUPPORT WITH CRYPTO
            </CardTitle>
            <div className="bg-black p-2">
              <Coffee className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardDescription className="text-white font-bold mt-1 pb-4">
            BUY ME A COFFEE
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4 space-y-2 p-4">
          {/*<div className="grid grid-cols-3 gap-2">
            {predefinedAmounts.map((presetAmount) => (
              <DonationAmountButton
                key={presetAmount}
                amount={presetAmount}
                selected={amount === presetAmount}
                onClick={() => setAmount(presetAmount)}
              />
            ))}
          </div>*/}
          <div className="flex border-2 border-black rounded-none overflow-hidden">
            <span className="bg-black text-white font-bold flex items-center justify-center px-3">
              POL
            </span>
            <Input
              type="number"
              value={amount}
              min="1"
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <Textarea
            placeholder="Will be added in the future!"
            className="resize-none h-20 border-2 border-black rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled
          />
          <p>
            Sending to <a href={`https://polygonscan.com/address/${creatorId}`} target="_blank" className="text-blue-700">{`${creatorId.slice(0, 6)}...${creatorId.slice(-4)}`}</a>
          </p>
        </CardContent>

        <CardFooter className="flex-col gap-2 bg-gray-100 p-4 border-t-2 border-black">
          {account === "" ? (
            <Button
              className="w-full bg-black text-white hover:bg-gray-800 rounded-none font-bold h-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              onClick={connectWallet}
            >
              CONNECT WALLET
            </Button>
          ) : (
            <Button
              className="w-full bg-black text-white hover:bg-gray-800 rounded-none font-bold h-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              onClick={async () => {
                setSubmitting(true);
                await donateToCreator(creatorId, amount);
                setSubmitting(false);
              }}
              disabled={!amount || amount === "0" || isSubmitting}
            >
              {isSubmitting ? "PROCESSING..." : `DONATE ${amount} POL`}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
