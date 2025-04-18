import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check } from "lucide-react";

interface EmbedCodeGeneratorProps {
  config: {
    text: string;
    color: string;
    size: string;
    borderRadius: string;
    amount: string;
    recipientAddress: string;
  };
}

const EmbedCodeGenerator = ({ config }: EmbedCodeGeneratorProps) => {
  const [copied, setCopied] = useState(false);

  const generateEmbedCode = () => {
    // Create a properly formatted config object for the script
    const configString = JSON.stringify({
      text: config.text,
      color: config.color,
      size: config.size,
      borderRadius: config.borderRadius,
      amount: config.amount,
      recipientAddress: config.recipientAddress || "YOUR_ETH_ADDRESS_HERE",
    });

    return `<!-- Crypto Coffee Button -->
<div id="crypto-coffee-button"></div>
<script>window.cryptoCoffeeConfig = ${configString};</script>
<script src="https://www.fundhog.xyz/embed.js"></script>
<!-- End Crypto Coffee Button -->`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateEmbedCode());
    setCopied(true);

    window.gtag('event', "copy_clicked", {
      event_category: "engagement",
      event_label: "button_created",
      value: 1,
    });
   
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 mb-2">
        Copy this code and paste it into your website where you want the button to appear.
        {!config.recipientAddress && (
          <span className="block mt-2 text-amber-500">
            Note: You need to connect your wallet or manually set a recipient address in the code.
          </span>
        )}
      </p>
      <Textarea
        value={generateEmbedCode()}
        readOnly
        className="font-mono text-sm h-40"
      />
      <Button onClick={copyToClipboard} className="w-full">
        {copied ? (
          <>
            <Check className="mr-2 h-4 w-4" /> Copied!
          </>
        ) : (
          <>
            <Copy className="mr-2 h-4 w-4" /> Copy Code
          </>
        )}
      </Button>
    </div>
  );
};

export default EmbedCodeGenerator;