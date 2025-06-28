
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mountain, ArrowLeft, Upload, Shield, FileCheck, Lock } from "lucide-react";
import { toast } from "sonner";

const NotarizationService = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileHash, setFileHash] = useState<string>('');
  const [verifyFile, setVerifyFile] = useState<File | null>(null);
  const [verifyHash, setVerifyHash] = useState<string>('');
  const [isNotarizing, setIsNotarizing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const calculateHash = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'notarize' | 'verify') => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const hash = await calculateHash(file);
      
      if (type === 'notarize') {
        setUploadedFile(file);
        setFileHash(hash);
      } else {
        setVerifyFile(file);
        setVerifyHash(hash);
      }
    } catch (error) {
      toast.error('Error calculating file hash');
    }
  };

  const handleNotarization = async () => {
    if (!uploadedFile || !fileHash) {
      toast.error('Please upload a file first');
      return;
    }

    setIsNotarizing(true);

    try {
      // Simulate Metamask signature request
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        
        // Create signature message
        const message = `Notarize document hash: ${fileHash}`;
        
        // Request signature
        const signature = await window.ethereum.request({
          method: 'personal_sign',
          params: [message, account],
        });

        // Simulate backend call
        setTimeout(() => {
          const simulatedTxHash = `0x${Math.random().toString(16).substr(2, 40)}`;
          toast.success(`Document notarized! Transaction hash: ${simulatedTxHash.substring(0, 10)}...`);
          setIsNotarizing(false);
        }, 2000);
        
      } else {
        toast.error('Metamask not detected. Please install Metamask to continue.');
        setIsNotarizing(false);
      }
    } catch (error) {
      toast.error('Notarization failed. Please try again.');
      setIsNotarizing(false);
    }
  };

  const handleVerification = async () => {
    if (!verifyFile || !verifyHash) {
      toast.error('Please upload a file to verify');
      return;
    }

    setIsVerifying(true);

    // Simulate verification check
    setTimeout(() => {
      // Simulate random verification result for demo
      const isVerified = Math.random() > 0.3; // 70% chance of verification
      
      if (isVerified) {
        toast.success('Document verified! This document was previously notarized.');
      } else {
        toast.error('Verification failed: Document not found in notarization records.');
      }
      setIsVerifying(false);
    }, 1500);
  };

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
                <h1 className="text-2xl font-bold text-white">Secure Your Documents On-Chain</h1>
                <p className="text-white/80">Blockchain-powered document notarization and verification</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <Card className="mb-8 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Lock className="w-8 h-8 text-bhutan-red" />
              <div>
                <h2 className="text-xl font-semibold">Immutable Document Security</h2>
                <p className="text-muted-foreground">
                  Leverage blockchain technology for tamper-proof document notarization with global verification capabilities.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto text-bhutan-red mb-2" />
                <p className="text-sm font-medium">Immutable Records</p>
              </div>
              <div className="text-center">
                <FileCheck className="w-6 h-6 mx-auto text-bhutan-red mb-2" />
                <p className="text-sm font-medium">Tamper-Proof</p>
              </div>
              <div className="text-center">
                <Lock className="w-6 h-6 mx-auto text-bhutan-red mb-2" />
                <p className="text-sm font-medium">Global Verification</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Notarize Document Section */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="w-5 h-5 mr-2 text-bhutan-red" />
                Upload & Notarize Document
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop your document here, or click to browse
                </p>
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={(e) => handleFileUpload(e, 'notarize')}
                  className="hidden"
                  id="notarize-upload"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('notarize-upload')?.click()}
                >
                  Choose File
                </Button>
              </div>

              {uploadedFile && (
                <Alert>
                  <FileCheck className="h-4 w-4" />
                  <AlertDescription>
                    <strong>File:</strong> {uploadedFile.name}<br />
                    <strong>SHA-256 Hash:</strong> <code className="text-xs">{fileHash}</code>
                  </AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleNotarization}
                disabled={!uploadedFile || isNotarizing}
                className="w-full bg-bhutan-red hover:bg-bhutan-deep-red"
              >
                {isNotarizing ? 'Notarizing...' : 'Notarize Document with Metamask'}
              </Button>
            </CardContent>
          </Card>

          {/* Verify Document Section */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileCheck className="w-5 h-5 mr-2 text-bhutan-red" />
                Verify Document Authenticity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <FileCheck className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload document to verify its authenticity
                </p>
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={(e) => handleFileUpload(e, 'verify')}
                  className="hidden"
                  id="verify-upload"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('verify-upload')?.click()}
                >
                  Choose File
                </Button>
              </div>

              {verifyFile && (
                <Alert>
                  <FileCheck className="h-4 w-4" />
                  <AlertDescription>
                    <strong>File:</strong> {verifyFile.name}<br />
                    <strong>SHA-256 Hash:</strong> <code className="text-xs">{verifyHash}</code>
                  </AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleVerification}
                disabled={!verifyFile || isVerifying}
                variant="outline"
                className="w-full"
              >
                {isVerifying ? 'Verifying...' : 'Verify Document Authenticity'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotarizationService;
