import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {  Wallet } from "lucide-react";
import { toast } from "sonner";
import { ButtonConfig } from "@/app/types/ButtonConfig";

interface ButtonCustomizerProps {
  config: {
    text: string;
    color: string;
    size: string;
    borderRadius: string;
    amount: string;
    recipientAddress: string;
  };
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
  //const { toast } = toast();
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
      toast("MetaMask not detected", {
        description: "Please install MetaMask to connect your wallet",
      });
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

        toast("Wallet connected", {
          description: `Connected to ${accounts[0].substring(
            0,
            6
          )}...${accounts[0].substring(38)}`,
        });
      }
    } catch (error) {
      console.error(error);
      toast("Connection failed",{
        description: "Failed to connect to MetaMask",
       // variant: "destructive",
      });
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount("");
    setIsConnected(false);
    toast("Wallet disconnected",{
      description: "Your wallet has been disconnected",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="button-text">Button Text</Label>
        <Input
          id="button-text"
          value={config.text}
          onChange={(e) => onConfigChange({ text: e.target.value })}
          placeholder="Buy me a coffee"
          className="mt-1"
        />
      </div>

      <div>
        <Label>Button Color</Label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-1">
          {predefinedColors.map((color) => (
            <div
              key={color.value}
              className={`h-10 rounded cursor-pointer flex items-center justify-center ${
                config.color === color.value
                  ? "ring-2 ring-offset-2 ring-crypto-purple"
                  : ""
              }`}
              style={{ backgroundColor: color.value }}
              onClick={() => onConfigChange({ color: color.value })}
            >
              <span className="text-white text-xs font-medium">
                {color.name}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2">
          <Input
            type="color"
            value={config.color}
            onChange={(e) => onConfigChange({ color: e.target.value })}
            className="w-full h-10"
          />
        </div>
      </div>

      <div>
        <Label>Button Size</Label>
        <RadioGroup
          value={config.size}
          onValueChange={(value) => onConfigChange({ size: value })}
          className="flex space-x-2 mt-1"
        >
          <div className="flex items-center space-x-1">
            <RadioGroupItem value="sm" id="size-sm" />
            <Label htmlFor="size-sm">Small</Label>
          </div>
          <div className="flex items-center space-x-1">
            <RadioGroupItem value="md" id="size-md" />
            <Label htmlFor="size-md">Medium</Label>
          </div>
          <div className="flex items-center space-x-1">
            <RadioGroupItem value="lg" id="size-lg" />
            <Label htmlFor="size-lg">Large</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label>Border Radius</Label>
        <RadioGroup
          value={config.borderRadius}
          onValueChange={(value) => onConfigChange({ borderRadius: value })}
          className="flex space-x-2 mt-1"
        >
          <div className="flex items-center space-x-1">
            <RadioGroupItem value="none" id="radius-none" />
            <Label htmlFor="radius-none">None</Label>
          </div>
          <div className="flex items-center space-x-1">
            <RadioGroupItem value="sm" id="radius-sm" />
            <Label htmlFor="radius-sm">Small</Label>
          </div>
          <div className="flex items-center space-x-1">
            <RadioGroupItem value="md" id="radius-md" />
            <Label htmlFor="radius-md">Medium</Label>
          </div>
          <div className="flex items-center space-x-1">
            <RadioGroupItem value="full" id="radius-full" />
            <Label htmlFor="radius-full">Full</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Button
          type="button"
          onClick={isConnected ? disconnectWallet : connectWallet}
          disabled={connecting}
          className={`w-full ${
            isConnected
              ? "bg-red-500 hover:bg-red-600"
              : "bg-purple-500 hover:bg-purple-700"
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
              <Wallet className="mr-2 h-4 w-4 " /> Connect to MetaMask
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ButtonCustomizer;
