
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mountain, ArrowLeft, Leaf, TrendingUp, ExternalLink, TreePine, MapPin, DollarSign } from "lucide-react";
import { toast } from "sonner";

const CarbonCreditService = () => {
  const navigate = useNavigate();

  const handleBuyCredits = (projectName: string) => {
    toast.success(`Successfully purchased carbon credits from ${projectName}!`);
  };

  const handleOffsetEmissions = (projectName: string) => {
    toast.success(`Emissions offset through ${projectName} project!`);
  };

  const projects = [
    {
      id: 1,
      name: "Bhutan Forest Conservation",
      location: "Thimphu Valley",
      credits: 500,
      price: "0.0001",
      description: "Protecting old-growth forests in the Thimphu Valley"
    },
    {
      id: 2,
      name: "Renewable Energy Initiative",
      location: "Paro District",
      credits: 300,
      price: "0.00015",
      description: "Solar panel installation in rural communities"
    },
    {
      id: 3,
      name: "Sustainable Agriculture",
      location: "Punakha Region",
      credits: 200,
      price: "0.00012",
      description: "Organic farming and carbon sequestration"
    },
    {
      id: 4,
      name: "Hydroelectric Expansion",
      location: "Eastern Bhutan",
      credits: 750,
      price: "0.0002",
      description: "Clean energy infrastructure development"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-bhutan-blue via-bhutan-mountain-blue to-bhutan-deep-red">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate('/dashboard/services')}
              variant="outline"
              className="text-white border-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
            <div className="flex items-center space-x-2">
              <Mountain className="w-8 h-8 text-bhutan-gold" />
              <div>
                <h1 className="text-2xl font-bold text-white">Trade Verified Carbon Credits for a Greener Tomorrow</h1>
                <p className="text-white/80">Support Bhutan's carbon-negative goals through blockchain transparency</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <Card className="mb-8 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Leaf className="w-8 h-8 text-green-600" />
              <div>
                <h2 className="text-xl font-semibold">Carbon-Negative Leadership</h2>
                <p className="text-muted-foreground">
                  Participate in Bhutan's mission to remain carbon-negative through verified, blockchain-backed carbon credit trading with complete transparency.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <TreePine className="w-6 h-6 mx-auto text-green-600 mb-2" />
                <p className="text-sm font-medium">Environmental Impact</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-6 h-6 mx-auto text-green-600 mb-2" />
                <p className="text-sm font-medium">Transparent Trading</p>
              </div>
              <div className="text-center">
                <ExternalLink className="w-6 h-6 mx-auto text-green-600 mb-2" />
                <p className="text-sm font-medium">Blockchain Verified</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolio Section */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Your Carbon Credit Portfolio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">10.5 BCC</p>
                <p className="text-sm text-muted-foreground">Available Bhutan Carbon Credits</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Credits Earned:</span>
                  <span className="text-sm font-medium">15.2 BCC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Credits Offset:</span>
                  <span className="text-sm font-medium">4.7 BCC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total Impact:</span>
                  <span className="text-sm font-medium text-green-600">19.9 tons CO₂</span>
                </div>
              </div>

              {/* Simple chart placeholder */}
              <div className="h-32 bg-green-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 mx-auto text-green-600 mb-2" />
                  <p className="text-sm text-muted-foreground">Portfolio Growth Chart</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Marketplace */}
          <div className="lg:col-span-2">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Leaf className="w-5 h-5 mr-2 text-green-600" />
                  Marketplace Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((project) => (
                    <Card key={project.id} className="border">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-semibold">{project.name}</h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="w-3 h-3 mr-1" />
                              {project.location}
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground">
                            {project.description}
                          </p>

                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm font-medium">Available: {project.credits} credits</p>
                              <div className="flex items-center">
                                <DollarSign className="w-3 h-3 mr-1" />
                                <span className="text-sm">{project.price} BTC per credit</span>
                              </div>
                            </div>
                            <Badge className="bg-green-100 text-green-800">
                              Verified
                            </Badge>
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleBuyCredits(project.name)}
                              className="flex-1 bg-green-600 hover:bg-green-700"
                            >
                              Buy Credits
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleOffsetEmissions(project.name)}
                              className="flex-1"
                            >
                              Offset Emissions
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Transparency Section */}
        <Card className="mt-8 bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ExternalLink className="w-5 h-5 mr-2 text-green-600" />
              Transparency Ledger
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">All carbon credit transactions are publicly verifiable on the blockchain</p>
                <p className="text-sm text-muted-foreground">
                  View the complete transaction history and verify the authenticity of all carbon credits
                </p>
              </div>
              <Button
                onClick={() => window.open('https://sepolia.etherscan.io/address/0x742d35Cc3Df3c53Cb1D50aeb7c9A00b1f4bCCCCC', '_blank')}
                variant="outline"
                className="flex items-center"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Testnet Explorer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CarbonCreditService;
