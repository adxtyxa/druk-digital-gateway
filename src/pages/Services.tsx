
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mountain, ArrowLeft, Shield, Coins, FileText, Globe, Zap, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const Services = () => {
  const navigate = useNavigate();

  const handleServiceAction = (serviceId: number) => {
    switch (serviceId) {
      case 1: // Digital Identity Verification
        navigate('/dashboard');
        break;
      case 2: // Smart Contract Notarization
        navigate('/dashboard/services/notarization');
        break;
      case 3: // Druk Token Payments
        toast.success("Thank you! We'll notify you when Druk Token Payments are available.");
        break;
      case 4: // Decentralized Governance
        toast.success("Decentralized Governance is coming soon! Stay tuned.");
        break;
      case 5: // Lightning Network Integration
        navigate('/dashboard/services/lightning');
        break;
      case 6: // Carbon Credit Trading
        navigate('/dashboard/services/carbon-credits');
        break;
      default:
        break;
    }
  };

  const services = [
    {
      id: 1,
      title: "Digital Identity Verification",
      description: "Secure blockchain-based identity verification using decentralized identifiers (DIDs)",
      icon: Shield,
      status: "active",
      features: ["Immutable identity records", "Privacy-preserving verification", "Cross-border recognition"],
      color: "bg-green-100 text-green-800"
    },
    {
      id: 2,
      title: "Smart Contract Notarization",
      description: "Automated notarization of documents using smart contracts on the blockchain",
      icon: FileText,
      status: "active",
      features: ["Tamper-proof documents", "Automated verification", "Legal compliance"],
      color: "bg-blue-100 text-blue-800"
    },
    {
      id: 3,
      title: "Druk Token Payments",
      description: "Make payments using Druk tokens for government services and fees",
      icon: Coins,
      status: "coming-soon",
      features: ["Low transaction fees", "Instant settlements", "Transparent pricing"],
      color: "bg-yellow-100 text-yellow-800"
    },
    {
      id: 4,
      title: "Decentralized Governance",
      description: "Participate in decision-making processes through blockchain-based voting",
      icon: Globe,
      status: "coming-soon",
      features: ["Transparent voting", "Immutable records", "Community participation"],
      color: "bg-purple-100 text-purple-800"
    },
    {
      id: 5,
      title: "Lightning Network Integration",
      description: "Fast and cheap Bitcoin transactions for international payments",
      icon: Zap,
      status: "beta",
      features: ["Instant transactions", "Minimal fees", "Global accessibility"],
      color: "bg-orange-100 text-orange-800"
    },
    {
      id: 6,
      title: "Carbon Credit Trading",
      description: "Trade verified carbon credits through blockchain-based marketplace",
      icon: CheckCircle,
      status: "active",
      features: ["Verified carbon credits", "Transparent trading", "Environmental impact"],
      color: "bg-green-100 text-green-800"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'beta':
        return <Badge className="bg-blue-100 text-blue-800">Beta</Badge>;
      case 'coming-soon':
        return <Badge className="bg-gray-100 text-gray-800">Coming Soon</Badge>;
      default:
        return <Badge>Unknown</Badge>;
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
                <h1 className="text-2xl font-bold text-white">Web3 Services</h1>
                <p className="text-white/80">Blockchain-powered services for digital residents</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card key={service.id} className="bg-white/95 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-bhutan-red/10 rounded-lg">
                        <IconComponent className="w-6 h-6 text-bhutan-red" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                      </div>
                    </div>
                    {getStatusBadge(service.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Key Features:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center">
                          <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    onClick={() => handleServiceAction(service.id)}
                    variant={service.status === 'active' ? 'default' : 'outline'}
                    className={service.status === 'active' ? 'bg-bhutan-red hover:bg-bhutan-deep-red w-full' : 'w-full'}
                  >
                    {service.status === 'active' ? 'Access Service' : 
                     service.status === 'beta' ? 'Try Beta' : 'Notify Me'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Information Section */}
        <div className="mt-12">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>About Web3 Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Druk e-Residency leverages cutting-edge blockchain technology to provide secure, transparent, and efficient services to our digital residents. Our Web3 services are built on decentralized principles, ensuring privacy, security, and user control.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <Shield className="w-8 h-8 mx-auto text-bhutan-red mb-2" />
                  <h3 className="font-medium">Secure</h3>
                  <p className="text-sm text-muted-foreground">All services are secured by blockchain technology</p>
                </div>
                <div className="text-center">
                  <Globe className="w-8 h-8 mx-auto text-bhutan-red mb-2" />
                  <h3 className="font-medium">Global</h3>
                  <p className="text-sm text-muted-foreground">Accessible from anywhere in the world</p>
                </div>
                <div className="text-center">
                  <Zap className="w-8 h-8 mx-auto text-bhutan-red mb-2" />
                  <h3 className="font-medium">Fast</h3>
                  <p className="text-sm text-muted-foreground">Lightning-fast transactions and services</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Services;
