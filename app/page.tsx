"use client"
import ButtonCustomizer from "@/components/ButtonCustomizer";
import ButtonPreview from "@/components/ButtonPreview";
import DonationManager from "@/components/DonationManager";
import EmbedCodeGenerator from "@/components/EmbedCodeGenerator";
import PageHeader from "@/components/PageHeader";
import {Card} from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { ButtonConfig } from "./types/ButtonConfig";

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

  const handleConfigChange = (config: Partial<ButtonConfig>) => {
    setButtonConfig({ ...buttonConfig, ...config });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <PageHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
        <Card className="p-6 col-span-1 lg:col-span-3 shadow-md">
          <h2 className="text-2xl font-bold mb-4">Customize Your Button</h2>
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
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Embed Code</TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview" className="mt-0">
              <Card className="p-6 shadow-md">
                <h2 className="text-2xl font-bold mb-4">Button Preview</h2>
                <div className="flex items-center justify-center py-8 bg-gray-50 rounded-md">
                  <ButtonPreview config={buttonConfig} isConnected={isConnected} />
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="code" className="mt-0">
              <Card className="p-6 shadow-md">
                <h2 className="text-2xl font-bold mb-4">Embed Code</h2>
                <EmbedCodeGenerator config={buttonConfig} />
              </Card>
            </TabsContent>
          </Tabs>
          
          {isConnected && (
            <Card className="p-6 shadow-md mt-8">
              <h2 className="text-2xl font-bold mb-4">Donation Settings</h2>
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
  );
}
