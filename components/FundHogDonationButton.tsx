"use client"
import { useEffect } from 'react';

const FundhogButton = () => {
  useEffect(() => {
    window.cryptoCoffeeConfig = {
      text: 'Buy me a coffee',
      color: '#8B5CF6',
      size: 'md',
      borderRadius: 'md',
      amount: '0.01',
      recipientAddress: '0x144d216d505de96a4d60336a5cab0b22772b0102',
    };

    const script = document.createElement('script');
    script.src = 'https://www.fundhog.xyz/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="crypto-coffee-button" className='border-4 border-black rounded-lg fixed top-4 right-4'></div>;
};

export default FundhogButton;