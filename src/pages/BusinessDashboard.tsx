
import React from 'react';
import { useWeb3 } from '@/contexts/Web3Context';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mountain, LogOut, Building2, Shield } from "lucide-react";

const BusinessDashboard = () => {
  const { account, disconnectWallet } = useWeb3();
  const navigate = useNavigate();

  const handleLogout = () => {
    disconnectWallet();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bhutan-blue via-bhutan-mountain-blue to-bhutan-deep-red">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Mountain className="w-8 h-8 text-bhutan-gold" />
            <div>
              <h1 className="text-2xl font-bold text-white">Business e-Residency Dashboard</h1>
              <p className="text-white/80">Manage your business operations</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline" className="text-white border-white hover:bg-white/10">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Business Profile Card */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-bhutan-red" />
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Company Name</label>
                <p className="font-medium">Sample Business Ltd.</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Registration Number</label>
                <p className="font-medium">BT-2024-001</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Business Type</label>
                <p className="font-medium">Technology Services</p>
              </div>
            </CardContent>
          </Card>

          {/* Business DID Card */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-bhutan-red" />
                Business Identity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Business DID</label>
                <p className="font-mono text-sm break-all">did:bhutan:business:{account?.slice(2, 12)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Wallet Address</label>
                <p className="font-mono text-sm">{account?.slice(0, 6)}...{account?.slice(-4)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Verified
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Business Actions */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Business Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-bhutan-red hover:bg-bhutan-deep-red">
                Update Business Info
              </Button>
              <Button variant="outline" className="w-full">
                Generate Reports
              </Button>
              <Button variant="outline" className="w-full">
                Compliance Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
