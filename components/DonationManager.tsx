import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ButtonConfig } from "@/app/types/ButtonConfig";

interface DonationManagerProps {
  config: {
    text: string;
    color: string;
    size: string;
    borderRadius: string;
    amount: string;
    recipientAddress: string;
  };
  onConfigChange: (config: Partial<ButtonConfig>) => void;
  account: string;
}

const DonationManager = ({
  config,
  onConfigChange,
  account,
}: DonationManagerProps) => {
  //const { toast } = toast();
  const [recipientInput, setRecipientInput] = useState(
    config.recipientAddress || account
  );

  const handleSaveRecipient = () => {
    // Basic validation for Ethereum address
    if (!/^0x[a-fA-F0-9]{40}$/.test(recipientInput)) {
      toast("Invalid address", {
        description: "Please enter a valid Ethereum address",
      });
      return;
    }

    onConfigChange({ recipientAddress: recipientInput });
    toast("Recipient updated", {
      description: "The donation recipient address has been updated",
    });
  };

  const handleUseConnectedWallet = () => {
    setRecipientInput(account);
    onConfigChange({ recipientAddress: account });
    toast("Recipient updated", {
      description: "Using your connected wallet address as recipient",
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="recipient-address">Recipient ETH Address</Label>
        <div className="flex mt-1">
          <Input
            id="recipient-address"
            value={recipientInput}
            onChange={(e) => setRecipientInput(e.target.value)}
            placeholder="0x..."
            className="flex-1"
          />
        </div>
        <div className="flex space-x-2 mt-2">
          <Button onClick={handleSaveRecipient} className="flex-1">
            Save Recipient
          </Button>
          <Button
            onClick={handleUseConnectedWallet}
            variant="outline"
            className="flex-1"
          >
            Use My Wallet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DonationManager;
