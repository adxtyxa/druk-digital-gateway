
import React, { useState } from 'react';
import { useWeb3 } from '@/contexts/Web3Context';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mountain, ArrowLeft, Shield, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const UpgradeProfile = () => {
  const { account, signMessage } = useWeb3();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    countryOfResidence: '',
    occupation: '',
    educationLevel: '',
    gnhSkills: '',
    citizenshipReason: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!account) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    try {
      // Create the message to sign
      const messageToSign = `Druk e-Residency Upgrade Application
      
Country of Residence: ${formData.countryOfResidence}
Occupation: ${formData.occupation}
Education Level: ${formData.educationLevel}
GNH Skills: ${formData.gnhSkills}
Citizenship Reason: ${formData.citizenshipReason}

Timestamp: ${new Date().toISOString()}
Wallet: ${account}`;

      // Sign the message with MetaMask
      const signature = await signMessage(messageToSign);
      
      // Save to Supabase
      const { error } = await supabase
        .from('user_upgrades')
        .insert({
          user_id: account, // Using wallet address as user_id for now
          country_of_residence: formData.countryOfResidence,
          occupation: formData.occupation,
          education_level: formData.educationLevel,
          gnh_skills: formData.gnhSkills,
          citizenship_reason: formData.citizenshipReason,
          digital_signature: signature
        });

      if (error) {
        console.error('Error saving upgrade application:', error);
        toast.error("Failed to submit application. Please try again.");
        return;
      }

      toast.success("Upgrade application submitted successfully!");
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Error during submission:', error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bhutan-blue via-bhutan-mountain-blue to-bhutan-deep-red">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate('/dashboard')}
              variant="outline"
              className="text-white border-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-2">
              <Mountain className="w-8 h-8 text-bhutan-gold" />
              <div>
                <h1 className="text-2xl font-bold text-white">Upgrade Profile</h1>
                <p className="text-white/80">Enhanced e-Residency Application</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-bhutan-red" />
                Enhanced e-Residency Application
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Provide additional information to upgrade your e-residency status. This application will be digitally signed with your MetaMask wallet.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country of Residence</Label>
                    <Input
                      id="country"
                      placeholder="Enter your country of residence"
                      value={formData.countryOfResidence}
                      onChange={(e) => handleInputChange('countryOfResidence', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation"
                      placeholder="Enter your occupation"
                      value={formData.occupation}
                      onChange={(e) => handleInputChange('occupation', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="education">Education Level</Label>
                  <Select value={formData.educationLevel} onValueChange={(value) => handleInputChange('educationLevel', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gnhSkills">Gross National Happiness Skills</Label>
                  <Textarea
                    id="gnhSkills"
                    placeholder="Describe your skills and how they contribute to Gross National Happiness..."
                    value={formData.gnhSkills}
                    onChange={(e) => handleInputChange('gnhSkills', e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="citizenshipReason">Reason for Enhanced e-Residency</Label>
                  <Textarea
                    id="citizenshipReason"
                    placeholder="Explain why you are seeking enhanced e-residency status..."
                    value={formData.citizenshipReason}
                    onChange={(e) => handleInputChange('citizenshipReason', e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Digital Signature Required</h3>
                  <p className="text-sm text-blue-700">
                    Your application will be digitally signed using your MetaMask wallet. This ensures the authenticity and integrity of your application.
                  </p>
                  {account && (
                    <p className="text-xs text-blue-600 mt-2">
                      Signing with: {account.slice(0, 6)}...{account.slice(-4)}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !account}
                  className="w-full bg-bhutan-red hover:bg-bhutan-deep-red"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    'Submit Upgrade Application'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UpgradeProfile;
