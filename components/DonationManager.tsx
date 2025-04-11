
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ButtonConfig {
  text: string;
  color: string;
  size: string;
  borderRadius: string;
  amount: string;
  recipientAddress: string;
}

interface DonationManagerProps {
  config: ButtonConfig;
  onConfigChange: (config: Partial<ButtonConfig>) => void;
  account: string;
}

const DonationManager = ({ config, onConfigChange, account }: DonationManagerProps) => {
 // const { toast } = useToast();
  const [recipientInput, setRecipientInput] = useState(config.recipientAddress || account);

  const handleSaveRecipient = () => {
    // Basic validation for Ethereum address
    if (!/^0x[a-fA-F0-9]{40}$/.test(recipientInput)) {
      
      return;
    }

    onConfigChange({ recipientAddress: recipientInput });
   
  };

  const handleUseConnectedWallet = () => {
    setRecipientInput(account);
    onConfigChange({ recipientAddress: account });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="recipient-address" className="text-lg font-black">Recipient ETH Address</Label>
        <div className="flex mt-2">
          <Input
            id="recipient-address"
            value={recipientInput}
            onChange={(e) => setRecipientInput(e.target.value)}
            placeholder="0x..."
            className="flex-1 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="flex space-x-4 mt-4">
          <Button 
            onClick={handleSaveRecipient} 
            className="flex-1 border-4 border-black bg-[#10B981] text-white font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
          >
            Save Recipient
          </Button>
          <Button 
            onClick={handleUseConnectedWallet}
            className="flex-1 border-4 border-black bg-white text-black font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
          >
            Use My Wallet
          </Button>
        </div>
      </div>

      <div className="pt-4 border-t-4 border-black mt-4">
        <p className="text-md font-bold bg-yellow-200 p-3 border-2 border-black inline-block">
          {"When users click your button, they'll be prompted to donate"}
        </p>
      </div>
    </div>
  );
};

export default DonationManager;