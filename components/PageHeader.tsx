
import { Coffee } from "lucide-react";

const PageHeader = () => {
  return (
    <div className="text-center mb-12 relative">
      <div className="inline-block bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-[-1deg] mb-8">
        <div className="flex items-center justify-center mb-4">
          <Coffee className="h-12 w-12 text-[#8B5CF6] mr-3" />
          <h1 className="text-4xl font-black tracking-tight">
            <span className="text-[#8B5CF6]">Fund</span>
            <span className="text-[#0EA5E9]">Hog</span>
            <span className="bg-yellow-300 ml-2 px-2 py-1 border-2 border-black">Button</span>
          </h1>
        </div>
        <p className="text-xl font-bold max-w-2xl mx-auto">
          {"Create a customizable \"Buy me a coffee\" button for your website that accepts crypto donations through MetaMask."}
        </p>
      </div>
      <div className="h-3 w-40 bg-[#8B5CF6] absolute bottom-4 right-1/4 -z-10 transform rotate-[2deg]"></div>
      <div className="h-3 w-60 bg-[#0EA5E9] absolute bottom-0 left-1/4 -z-10 transform rotate-[-1deg]"></div>
    </div>
  );
};

export default PageHeader;