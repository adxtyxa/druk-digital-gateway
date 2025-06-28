
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';

interface Web3ContextType {
  account: string | null;
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  signMessage: (message: string) => Promise<string>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        const accounts = await web3Provider.listAccounts();
        const web3Signer = web3Provider.getSigner();
        
        setProvider(web3Provider);
        setSigner(web3Signer);
        setAccount(accounts[0]);
        setIsConnected(true);
        
        console.log('Wallet connected:', accounts[0]);
      } else {
        throw new Error('MetaMask is not installed');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setIsConnected(false);
  };

  const signMessage = async (message: string): Promise<string> => {
    if (!signer) {
      throw new Error('Wallet not connected');
    }
    
    try {
      const signature = await signer.signMessage(message);
      console.log('Message signed:', signature);
      return signature;
    } catch (error) {
      console.error('Error signing message:', error);
      throw error;
    }
  };

  // Check if wallet is already connected on page load
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await web3Provider.listAccounts();
          
          if (accounts.length > 0) {
            const web3Signer = web3Provider.getSigner();
            setProvider(web3Provider);
            setSigner(web3Signer);
            setAccount(accounts[0]);
            setIsConnected(true);
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error);
        }
      }
    };

    checkConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAccount(accounts[0]);
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, []);

  const value: Web3ContextType = {
    account,
    provider,
    signer,
    isConnected,
    connectWallet,
    disconnectWallet,
    signMessage,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};
