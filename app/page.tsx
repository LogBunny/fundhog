"use client"
import ButtonCustomizer from "@/components/ButtonCustomizer";
import ButtonPreview from "@/components/ButtonPreview";
import DonationManager from "@/components/DonationManager";
import EmbedCodeGenerator from "@/components/EmbedCodeGenerator";
import PageHeader from "@/components/PageHeader";
import {Card} from "@/components/ui/card";
//import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
//import { ButtonConfig } from "./types/ButtonConfig";

export default function Home() {
  const [buttonConfig, setButtonConfig] = useState({
    text: "Buy me a coffee",
    color: "#8B5CF6",
    size: "md",
    borderRadius: "md",
    amount: "0.01",
    recipientAddress: ""
  });
  
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");

  const handleConfigChange = (config: Partial<typeof buttonConfig>) => {
    setButtonConfig({ ...buttonConfig, ...config });
  };

  return (
    <div className=" bg-[#FFFFF2]">
      <div className="container mx-auto px-4 py-12 ">
      <PageHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-12">
        <Card className="self-start p-8 col-span-1 lg:col-span-3 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative bg-white">
          <h2 className="text-3xl font-black mb-6 inline-block bg-[#8B5CF6] text-white px-4 py-1 -rotate-1 relative">
            Customize Your Button
            <div className="absolute inset-0 border-2 border-black transform rotate-1"></div>
          </h2>
          <ButtonCustomizer 
            config={buttonConfig} 
            onConfigChange={handleConfigChange}
            isConnected={isConnected}
            account={account}
            setIsConnected={setIsConnected}
            setAccount={setAccount}
          />
        </Card>
        
        <div className="col-span-1 lg:col-span-2">
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 p-1 bg-black border-4 border-black">
              <TabsTrigger 
                value="preview" 
                className="bg-white data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white font-bold text-lg border-2 border-black data-[state=active]:border-black data-[state=active]:shadow-none"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger 
                value="code" 
                className="bg-white data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white font-bold text-lg border-2 border-black data-[state=active]:border-black data-[state=active]:shadow-none"
              >
                Embed Code
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview" className="mt-0">
              <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                <h2 className="text-3xl font-black mb-6 inline-block bg-[#0EA5E9] text-white px-4 py-1 rotate-1 relative">
                  Button Preview
                  <div className="absolute inset-0 border-2 border-black transform -rotate-1"></div>
                </h2>
                <div className="flex items-center justify-center py-10 border-4 border-dashed border-black bg-gray-50">
                  <ButtonPreview config={buttonConfig} isConnected={isConnected} />
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="code" className="mt-0">
              <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                <h2 className="text-3xl font-black mb-6 inline-block bg-[#0EA5E9] text-white px-4 py-1 rotate-1 relative">
                  Embed Code
                  <div className="absolute inset-0 border-2 border-black transform -rotate-1"></div>
                </h2>
                <EmbedCodeGenerator config={buttonConfig} />
              </Card>
            </TabsContent>
          </Tabs>
          
          {isConnected && (
            <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mt-12 bg-white">
              <h2 className="text-3xl font-black mb-6 inline-block bg-[#10B981] text-white px-4 py-1 -rotate-2 relative">
                Donation Settings
                <div className="absolute inset-0 border-2 border-black transform rotate-1"></div>
              </h2>
              <DonationManager 
                config={buttonConfig} 
                onConfigChange={handleConfigChange}
                account={account}
              />
            </Card>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
