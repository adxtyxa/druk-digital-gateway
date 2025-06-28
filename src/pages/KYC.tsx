
import React, { useState, useEffect } from 'react';
import { useWeb3 } from '@/contexts/Web3Context';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Mountain, Wallet, UserCheck, Shield, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const KYC = () => {
  const { account, isConnected, connectWallet, signMessage } = useWeb3();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '+975',
    email: ''
  });

  useEffect(() => {
    if (isConnected && account) {
      setCurrentStep(2);
    }
  }, [isConnected, account]);

  const handleConnectWallet = async () => {
    setIsLoading(true);
    try {
      await connectWallet();
      toast.success("Wallet connected successfully!");
    } catch (error) {
      toast.error("Failed to connect wallet. Please make sure MetaMask is installed.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate form
      if (!formData.fullName || !formData.email || !formData.phoneNumber) {
        toast.error("Please fill in all required fields.");
        return;
      }

      // Move to DID creation step
      setCurrentStep(3);
      
      // Generate DID
      const didString = `did:bhutan:${account?.slice(2, 12)}`;
      const message = `Create Decentralized Identity for Druk e-Residency\n\nDID: ${didString}\nWallet: ${account}\nTimestamp: ${Date.now()}`;
      
      toast.info("Please sign the message in MetaMask to create your DID...");
      
      const signature = await signMessage(message);
      
      // Store user data (in real app, this would go to Supabase)
      const userData = {
        wallet_address: account,
        full_name: formData.fullName,
        phone_number: formData.phoneNumber,
        email: formData.email,
        decentralized_id: didString,
        did_signature: signature,
        created_at: new Date().toISOString()
      };
      
      localStorage.setItem('druk_user_data', JSON.stringify(userData));
      
      toast.success("🎉 Your Decentralized ID has been created successfully!");
      
      // Navigate to dashboard after brief delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      toast.error("Failed to create DID. Please try again.");
      console.error(error);
      setCurrentStep(2);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="p-6 bg-bhutan-pattern rounded-full">
          <Wallet className="w-12 h-12 text-white" />
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
        <p className="text-muted-foreground mb-6">
          Connect your MetaMask wallet to begin your e-residency journey. 
          Your wallet will be used to create and sign your Decentralized Identity.
        </p>
      </div>
      
      <Button 
        onClick={handleConnectWallet}
        disabled={isLoading}
        size="lg"
        className="bg-bhutan-red hover:bg-bhutan-deep-red px-8 py-4"
      >
        {isLoading ? "Connecting..." : "Connect MetaMask Wallet"}
      </Button>
      
      <p className="text-sm text-muted-foreground">
        Don't have MetaMask? 
        <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="text-bhutan-red hover:underline ml-1">
          Download it here
        </a>
      </p>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-bhutan-pattern rounded-full">
            <UserCheck className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
        <p className="text-muted-foreground">
          Please provide your details to complete the KYC process
        </p>
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Connected Wallet: <span className="font-mono text-bhutan-red">{account?.slice(0, 6)}...{account?.slice(-4)}</span>
          </p>
        </div>
      </div>
      
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="your.email@example.com"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number *</Label>
          <Input
            id="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
            placeholder="+975 XXXXXXXX"
            required
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-bhutan-red hover:bg-bhutan-deep-red py-3"
        >
          {isLoading ? "Processing..." : "Create Decentralized Identity"}
        </Button>
      </form>
    </div>
  );

  const renderStep3 = () => (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="p-6 bg-bhutan-pattern rounded-full animate-glow">
          <Shield className="w-12 h-12 text-white" />
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Creating Your DID</h2>
        <p className="text-muted-foreground mb-6">
          Please sign the message in MetaMask to create your Decentralized Identity. 
          This will cryptographically link your DID to your wallet.
        </p>
      </div>
      
      <div className="animate-pulse">
        <div className="text-bhutan-red font-medium">
          Waiting for signature...
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-bhutan-blue via-bhutan-mountain-blue to-bhutan-deep-red flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="absolute top-6 left-6 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex justify-center mb-4">
            <Mountain className="w-12 h-12 text-bhutan-gold" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Druk e-Residency</h1>
          <p className="text-white/80">Individual KYC Process</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step
                    ? 'bg-bhutan-gold text-white'
                    : 'bg-white/20 text-white/60'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* Main Card */}
        <Card className="shadow-2xl bg-white/95 backdrop-blur-sm border-bhutan-gold/30">
          <CardContent className="p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-white/70 text-sm">
          Secured by blockchain technology • Your data, your control
        </div>
      </div>
    </div>
  );
};

export default KYC;
