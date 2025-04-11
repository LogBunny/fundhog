import { Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonPreviewProps {
  config: {
    text: string;
    color: string;
    size: string;
    borderRadius: string;
    amount: string;
    recipientAddress: string;
  };
  isConnected: boolean;
  onClick?: () => void;
}

const ButtonPreview = ({ config, isConnected, onClick }: ButtonPreviewProps) => {
  // Size classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // Border radius classes
  const radiusClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    full: "rounded-full",
  };

  return (
    <button
      onClick={onClick}
      disabled={!isConnected && onClick !== undefined}
      className={cn(
        "font-medium shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center",
        sizeClasses[config.size as keyof typeof sizeClasses],
        radiusClasses[config.borderRadius as keyof typeof radiusClasses],
        "text-white",
        onClick === undefined ? "cursor-default" : "cursor-pointer",
        !isConnected && onClick !== undefined ? "opacity-70" : ""
      )}
      style={{ 
        backgroundColor: config.color,
        borderColor: config.color,
        // Slightly darker color for focus ring
        "--tw-ring-color": `${config.color}`,
      } as React.CSSProperties}
    >
      <Coffee className="mr-2 h-4 w-4" />
      {config.text}
    </button>
  );
};

export default ButtonPreview;