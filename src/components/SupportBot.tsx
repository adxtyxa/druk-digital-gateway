
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const SupportBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Tashi Delek! 🙏 I'm here to help you with your e-residency journey. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const predefinedResponses: { [key: string]: string } = {
    'hello': "Tashi Delek! Welcome to Druk e-Residency. I'm here to help you navigate your digital citizenship journey.",
    'hi': "Hello! How can I help you with your e-residency application today?",
    'metamask': "To use our platform, you'll need MetaMask wallet installed. It's free and helps secure your digital identity. You can download it from metamask.io",
    'wallet': "Your crypto wallet (like MetaMask) is used to create and sign your Decentralized Identity (DID). This ensures you have complete control over your digital credentials.",
    'did': "A Decentralized Identity (DID) is your unique, self-sovereign digital identity on the blockchain. Unlike traditional IDs, you control it completely - no central authority can revoke it.",
    'cost': "The basic e-residency process is free! You'll only pay small blockchain transaction fees (usually under $5) for signing your DID and minting your NFT certificate.",
    'business': "Business e-residency allows you to establish a legal presence in Bhutan, access international banking, and participate in our digital economy. Click 'Business Residency' to start!",
    'kyc': "KYC helps us verify your identity securely. We collect basic information like your name, email, and phone number, then link it to your blockchain wallet for security.",
    'nft': "Upon successful registration, you can mint a beautiful NFT certificate featuring traditional Bhutanese art. This serves as your digital proof of e-residency!",
    'gnh': "Gross National Happiness is Bhutan's unique development philosophy. As an e-resident, you can contribute to GNH projects through our blockchain-based fund.",
    'help': "I can help you with: wallet setup, KYC process, DID creation, business registration, costs, NFT certificates, and general questions about e-residency.",
    'support': "For complex issues, you can contact our human support team at support@druk-eresidency.bt or use the live chat during business hours (9 AM - 6 PM BTT)."
  };

  const getResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (input.includes(key)) {
        return response;
      }
    }
    
    // Default response
    return "I understand you're asking about something specific. For detailed assistance, please contact our support team at support@druk-eresidency.bt or try asking about: wallet, DID, KYC, business, costs, NFT, or GNH.";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };
    
    const botResponse: Message = {
      text: getResponse(inputValue),
      isBot: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Bot Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-bhutan-pattern hover:bg-bhutan-deep-red shadow-2xl thunder-dragon-glow transition-all duration-300 hover:scale-110"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chat Interface */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-96 z-50 shadow-2xl border-bhutan-gold/30 fade-in">
          <CardHeader className="bg-bhutan-pattern text-white p-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageCircle className="w-5 h-5" />
              Druk Support Assistant
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      message.isBot
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-bhutan-pattern text-white'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-bhutan-pattern hover:bg-bhutan-deep-red"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default SupportBot;
