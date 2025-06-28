
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mountain, ArrowLeft, Zap, QrCode, Clock, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const LightningService = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [invoice, setInvoice] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateInvoice = async () => {
    if (!amount || !description) {
      toast.error('Please fill in both amount and description');
      return;
    }

    setIsGenerating(true);

    // Simulate invoice generation
    setTimeout(() => {
      const simulatedInvoice = `lnbc${amount.replace('.', '')}u1p${Math.random().toString(36).substr(2, 40)}`;
      setInvoice(simulatedInvoice);
      setShowQR(true);
      setIsGenerating(false);
      toast.success('Lightning invoice generated successfully!');
    }, 1500);
  };

  const transactions = [
    {
      id: 1,
      description: 'E-Residency Application Fee',
      amount: '0.0005',
      status: 'Completed',
      timestamp: '2024-01-15 14:30:22',
      hash: '0xabc...def'
    },
    {
      id: 2,
      description: 'Business License Payment',
      amount: '0.0012',
      status: 'Completed',
      timestamp: '2024-01-14 09:15:11',
      hash: '0x123...789'
    },
    {
      id: 3,
      description: 'Carbon Credit Purchase',
      amount: '0.0008',
      status: 'Completed',
      timestamp: '2024-01-13 16:45:33',
      hash: '0xdef...abc'
    },
    {
      id: 4,
      description: 'Document Notarization',
      amount: '0.0002',
      status: 'Pending',
      timestamp: '2024-01-12 11:20:05',
      hash: '0x456...123'
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
                <h1 className="text-2xl font-bold text-white">Fast & Efficient Payments via Lightning Network</h1>
                <p className="text-white/80">Instant, low-cost Bitcoin transactions for global payments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <Card className="mb-8 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Zap className="w-8 h-8 text-yellow-500" />
              <div>
                <h2 className="text-xl font-semibold">Lightning-Fast Bitcoin Payments</h2>
                <p className="text-muted-foreground">
                  Experience instant, low-cost Bitcoin transactions for Bhutanese services and international trade.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <Zap className="w-6 h-6 mx-auto text-yellow-500 mb-2" />
                <p className="text-sm font-medium">Instant Transactions</p>
              </div>
              <div className="text-center">
                <Clock className="w-6 h-6 mx-auto text-yellow-500 mb-2" />
                <p className="text-sm font-medium">Minimal Fees</p>
              </div>
              <div className="text-center">
                <CheckCircle className="w-6 h-6 mx-auto text-yellow-500 mb-2" />
                <p className="text-sm font-medium">Global Accessibility</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Generate Invoice Section */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <QrCode className="w-5 h-5 mr-2 text-yellow-500" />
                Generate Lightning Invoice
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (BTC)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.0001"
                  placeholder="0.0001"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="E-Residency Fee"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <Button
                onClick={generateInvoice}
                disabled={isGenerating}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                {isGenerating ? 'Generating...' : 'Generate Invoice'}
              </Button>

              {showQR && invoice && (
                <Alert>
                  <QrCode className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-2">
                      <p><strong>Lightning Invoice Generated:</strong></p>
                      <code className="text-xs break-all bg-gray-100 p-2 rounded block">
                        {invoice}
                      </code>
                      <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center mx-auto">
                        <QrCode className="w-16 h-16 text-gray-400" />
                      </div>
                      <p className="text-sm text-center text-muted-foreground">
                        Scan this with your Lightning wallet to pay
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-yellow-500" />
                Recent Lightning Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className="border-b pb-3 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{tx.description}</p>
                        <p className="text-xs text-muted-foreground">{tx.timestamp}</p>
                        <p className="text-xs font-mono text-muted-foreground">
                          Hash: {tx.hash}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{tx.amount} BTC</p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          tx.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LightningService;
