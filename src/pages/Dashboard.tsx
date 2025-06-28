
import React from 'react';
import { useWeb3 } from '@/contexts/Web3Context';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mountain, LogOut, User, Shield, ArrowUpCircle, Zap } from "lucide-react";
import CertificateGenerator from '@/components/CertificateGenerator';

const Dashboard = () => {
  const { account, disconnectWallet } = useWeb3();
  const navigate = useNavigate();

  const handleLogout = () => {
    disconnectWallet();
    navigate('/');
  };

  // Get user data from localStorage (in real app, this would come from Supabase)
  const userData = JSON.parse(localStorage.getItem('druk_user_data') || '{}');

  return (
    <div className="min-h-screen bg-gradient-to-br from-bhutan-blue via-bhutan-mountain-blue to-bhutan-deep-red">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Mountain className="w-8 h-8 text-bhutan-gold" />
            <div>
              <h1 className="text-2xl font-bold text-white">Druk e-Residency Dashboard</h1>
              <p className="text-white/80">Welcome to your digital residency</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline" className="text-white border-white hover:bg-white/10">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-bhutan-red" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <p className="font-medium">{userData.full_name || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="font-medium">{userData.email || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                <p className="font-medium">{userData.phone_number || 'Not provided'}</p>
              </div>
            </CardContent>
          </Card>

          {/* DID Card */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-bhutan-red" />
                Decentralized Identity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">DID</label>
                <p className="font-mono text-sm break-all">{userData.decentralized_id || 'Not created'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Wallet Address</label>
                <p className="font-mono text-sm">{account?.slice(0, 6)}...{account?.slice(-4)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={() => navigate('/dashboard/upgrade-profile')}
                className="w-full bg-bhutan-red hover:bg-bhutan-deep-red"
              >
                <ArrowUpCircle className="w-4 h-4 mr-2" />
                Upgrade Profile
              </Button>
              <CertificateGenerator />
              <Button 
                onClick={() => navigate('/dashboard/services')}
                variant="outline" 
                className="w-full"
              >
                <Zap className="w-4 h-4 mr-2" />
                View Services
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
