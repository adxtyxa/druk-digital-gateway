
import React, { useState } from 'react';
import { useWeb3 } from '@/contexts/Web3Context';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mountain, ArrowLeft, Building2 } from "lucide-react";
import { toast } from "sonner";

const BusinessKYC = () => {
  const { account, isConnected, connectWallet } = useWeb3();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: '',
    registrationNumber: '',
    businessType: '',
    contactEmail: '',
    contactPhone: '+975',
    address: ''
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!isConnected) {
        await connectWallet();
      }

      // Validate form
      if (!formData.companyName || !formData.registrationNumber || !formData.businessType) {
        toast.error("Please fill in all required fields.");
        return;
      }

      toast.success("🎉 Business KYC completed successfully!");
      
      setTimeout(() => {
        navigate('/business-dashboard');
      }, 2000);
      
    } catch (error) {
      toast.error("Failed to complete business KYC. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bhutan-blue via-bhutan-mountain-blue to-bhutan-deep-red flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
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
          <p className="text-white/80">Business KYC Process</p>
        </div>

        {/* Main Card */}
        <Card className="shadow-2xl bg-white/95 backdrop-blur-sm border-bhutan-gold/30">
          <CardHeader>
            <CardTitle className="flex items-center text-center justify-center">
              <Building2 className="w-6 h-6 mr-2 text-bhutan-red" />
              Business Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    placeholder="Enter company name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number *</Label>
                  <Input
                    id="registrationNumber"
                    type="text"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({...formData, registrationNumber: e.target.value})}
                    placeholder="Enter registration number"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type *</Label>
                <Select onValueChange={(value) => setFormData({...formData, businessType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology Services</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="trading">Trading</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                    placeholder="business@example.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone *</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                    placeholder="+975 XXXXXXXX"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Input
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Enter business address"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-bhutan-red hover:bg-bhutan-deep-red py-3"
              >
                {isLoading ? "Processing..." : "Complete Business KYC"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-white/70 text-sm">
          Secured by blockchain technology • Your business, your control
        </div>
      </div>
    </div>
  );
};

export default BusinessKYC;
