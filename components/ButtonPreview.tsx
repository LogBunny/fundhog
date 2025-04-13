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
  // Size classes with neobrutalistic styling
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-8 py-4 text-lg",
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
        "font-black border-4 border-black transition-all duration-200 hover:translate-x-1 hover:translate-y-1 focus:outline-none focus:ring-0 inline-flex items-center justify-center",
        sizeClasses[config.size as keyof typeof sizeClasses],
        radiusClasses[config.borderRadius as keyof typeof radiusClasses],
        "text-white",
        onClick === undefined ? "cursor-default" : "cursor-pointer",
        !isConnected && onClick !== undefined ? "opacity-70" : ""
      )}
      style={{ 
        backgroundColor: config.color,
      }}
    >
      {config.text}
    </button>
  );
};

export default ButtonPreview;