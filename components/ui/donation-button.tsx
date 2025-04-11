
import { cn } from "@/lib/utils";

interface DonationAmountButtonProps {
  amount: string;
  selected: boolean;
  onClick: () => void;
}

export function DonationAmountButton({ 
  amount, 
  selected, 
  onClick 
}: DonationAmountButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "py-3 px-4 rounded-none text-sm font-bold transition-all border-2 border-black",
        selected 
          ? "bg-orange-500 text-white" 
          : "bg-white hover:bg-gray-100"
      )}
      onClick={onClick}
    >
      ${amount}
    </button>
  );
}