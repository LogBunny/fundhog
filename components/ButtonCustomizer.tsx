import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
//import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Wallet } from "lucide-react";
//import { Toaster } from "sonner";

interface ButtonConfig {
  text: string;
  color: string;
  size: string;
  borderRadius: string;
  amount: string;
  recipientAddress: string;
}

interface ButtonCustomizerProps {
  config: ButtonConfig;
  onConfigChange: (config: Partial<ButtonConfig>) => void;
  isConnected: boolean;
  account: string;
  setIsConnected: (connected: boolean) => void;
  setAccount: (account: string) => void;
}

const ButtonCustomizer = ({
  config,
  onConfigChange,
  isConnected,
  account,
  setIsConnected,
  setAccount,
}: ButtonCustomizerProps) => {
  //const { toast } = useToast();
  const [connecting, setConnecting] = useState(false);

  const predefinedColors = [
    { name: "Purple", value: "#8B5CF6" },
    { name: "Blue", value: "#0EA5E9" },
    { name: "Green", value: "#10B981" },
    { name: "Red", value: "#EF4444" },
    { name: "Yellow", value: "#F59E0B" },
    { name: "Pink", value: "#EC4899" },
  ];

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      return;
    }

    try {
      setConnecting(true);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);

        // Set the connected account as recipient by default if none is set
        if (!config.recipientAddress) {
          onConfigChange({ recipientAddress: accounts[0] });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount("");
    setIsConnected(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="button-text" className="text-lg font-black">
          Button Text
        </Label>
        <Input
          id="button-text"
          value={config.text}
          onChange={(e) => onConfigChange({ text: e.target.value })}
          placeholder="Buy me a coffee"
          className="mt-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      <div>
        <Label className="text-lg font-black">Button Color</Label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-2">
          {predefinedColors.map((color) => (
            <div
              key={color.value}
              className={`h-12 border-4 border-black cursor-pointer flex items-center justify-center transform transition-transform ${
                config.color === color.value
                  ? "translate-x-1 translate-y-1 shadow-none"
                  : "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              }`}
              style={{ backgroundColor: color.value }}
              onClick={() => onConfigChange({ color: color.value })}
            >
              <span className="text-white text-xs font-black">
                {color.name}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <Input
            type="color"
            value={config.color}
            onChange={(e) => onConfigChange({ color: e.target.value })}
            className="w-full h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          />
        </div>
      </div>

      <div>
        <Label className="text-lg font-black">Button Size</Label>
        <RadioGroup
          value={config.size}
          onValueChange={(value) => onConfigChange({ size: value })}
          className="flex space-x-4 mt-2"
        >
          <div className="flex items-center space-x-2 bg-white border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <RadioGroupItem
              value="sm"
              id="size-sm"
              className="border-2 border-black"
            />
            <Label htmlFor="size-sm" className="font-bold">
              Small
            </Label>
          </div>
          <div className="flex items-center space-x-2 bg-white border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <RadioGroupItem
              value="md"
              id="size-md"
              className="border-2 border-black"
            />
            <Label htmlFor="size-md" className="font-bold">
              Medium
            </Label>
          </div>
          <div className="flex items-center space-x-2 bg-white border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <RadioGroupItem
              value="lg"
              id="size-lg"
              className="border-2 border-black"
            />
            <Label htmlFor="size-lg" className="font-bold">
              Large
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="text-lg font-black">Border Radius</Label>
        <RadioGroup
          value={config.borderRadius}
          onValueChange={(value) => onConfigChange({ borderRadius: value })}
          className="flex flex-wrap gap-4 mt-2"
        >
          <div className="flex items-center space-x-2 bg-white border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <RadioGroupItem
              value="none"
              id="radius-none"
              className="border-2 border-black"
            />
            <Label htmlFor="radius-none" className="font-bold">
              None
            </Label>
          </div>
          <div className="flex items-center space-x-2 bg-white border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <RadioGroupItem
              value="sm"
              id="radius-sm"
              className="border-2 border-black"
            />
            <Label htmlFor="radius-sm" className="font-bold">
              Small
            </Label>
          </div>
          <div className="flex items-center space-x-2 bg-white border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <RadioGroupItem
              value="md"
              id="radius-md"
              className="border-2 border-black"
            />
            <Label htmlFor="radius-md" className="font-bold">
              Medium
            </Label>
          </div>
          <div className="flex items-center space-x-2 bg-white border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <RadioGroupItem
              value="full"
              id="radius-full"
              className="border-2 border-black"
            />
            <Label htmlFor="radius-full" className="font-bold">
              Full
            </Label>
          </div>
        </RadioGroup>
      </div>

     

      {/*<div>
        <Label htmlFor="donation-amount" className="text-lg font-black">Default Donation Amount (ETH)</Label>
        <Input
          id="donation-amount"
          type="number"
          value={config.amount}
          onChange={(e) => onConfigChange({ amount: e.target.value })}
          step="0.001"
          min="0.001"
          className="mt-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>*/}

      <div>
        <Button
          type="button"
          onClick={isConnected ? disconnectWallet : connectWallet}
          disabled={connecting}
          className={`w-full text-lg font-black py-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ${
            isConnected
              ? "bg-red-500 hover:bg-red-600"
              : "bg-[#8B5CF6] hover:bg-purple-700"
          }`}
        >
          {connecting ? (
            "Connecting..."
          ) : isConnected ? (
            <>
              Disconnect Wallet ({account.substring(0, 6)}...
              {account.substring(38)})
            </>
          ) : (
            <>
              <Wallet className="mr-2 h-6 w-6" /> Connect to MetaMask
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ButtonCustomizer;
