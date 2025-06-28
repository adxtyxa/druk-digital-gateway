
import React from 'react';
import { useWeb3 } from '@/contexts/Web3Context';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

const CertificateGenerator = () => {
  const { account } = useWeb3();

  const generateCertificatePDF = () => {
    if (!account) {
      toast.error("Wallet not connected");
      return;
    }

    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('druk_user_data') || '{}');
    
    // Create certificate content
    const certificateContent = `
      DRUK E-RESIDENCY CERTIFICATE
      
      This is to certify that
      
      ${userData.full_name || 'Digital Resident'}
      
      has been granted Digital Residency status in the
      Kingdom of Bhutan under the Druk e-Residency Program
      
      Certificate Details:
      - DID: ${userData.decentralized_id || 'Not available'}
      - Wallet Address: ${account}
      - Email: ${userData.email || 'Not provided'}
      - Issue Date: ${new Date().toLocaleDateString()}
      - Status: Active
      
      This certificate is valid for all digital services
      provided by the Kingdom of Bhutan's e-Residency program.
      
      Digitally signed and verified on the blockchain.
      
      Government of Bhutan
      Druk e-Residency Program
    `;

    // Create a simple text file (in a real implementation, you'd generate a proper PDF)
    const blob = new Blob([certificateContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const link = document.createElement('a');
    link.href = url;
    link.download = `druk-eresidency-certificate-${account.slice(0, 8)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    URL.revokeObjectURL(url);
    
    toast.success("Certificate downloaded successfully!");
  };

  return (
    <Button 
      onClick={generateCertificatePDF}
      variant="outline" 
      className="w-full"
    >
      <Download className="w-4 h-4 mr-2" />
      Download Certificate
    </Button>
  );
};

export default CertificateGenerator;
