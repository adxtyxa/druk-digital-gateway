
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Mountain, Sparkles } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Bhutanese-inspired gradient */}
      <div className="absolute inset-0 mountain-gradient opacity-90" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bhutan-pattern rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-bhutan-gold rounded-full opacity-30 animate-glow" />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-bhutan-ochre rounded-full opacity-25" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto fade-in">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Mountain className="w-20 h-20 text-bhutan-gold animate-glow" />
            <Sparkles className="w-8 h-8 text-bhutan-white absolute -top-2 -right-2" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-bhutan-white mb-6 leading-tight">
          Your Digital Gateway to the
          <span className="block text-bhutan-gold">Thunder Dragon Kingdom</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-bhutan-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Embrace Bhutan's digital future through secure, decentralized e-residency. 
          Join the revolution of Web3 identity and contribute to Gross National Happiness.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-bhutan-red hover:bg-bhutan-deep-red text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl thunder-dragon-glow transition-all duration-300 hover:scale-105"
            onClick={() => navigate('/kyc')}
          >
            Begin Your e-Residency Journey
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-bhutan-white text-bhutan-white hover:bg-bhutan-white hover:text-bhutan-mountain-blue px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300"
            onClick={() => navigate('/business-kyc')}
          >
            Business Residency
          </Button>
        </div>
        
        <div className="mt-12 text-bhutan-white/70 text-sm">
          Powered by Web3 • Secured by Blockchain • Inspired by GNH
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-bhutan-gold rounded-full animate-ping" />
        <div className="absolute top-3/4 left-3/4 w-1 h-1 bg-bhutan-white rounded-full animate-pulse" />
        <div className="absolute top-2/3 left-1/6 w-1.5 h-1.5 bg-bhutan-ochre rounded-full animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
