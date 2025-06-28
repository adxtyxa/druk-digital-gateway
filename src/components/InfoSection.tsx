
import { Shield, Globe, Heart, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}

const InfoCard = ({ icon, title, description, delay }: InfoCardProps) => (
  <Card className={`bg-card/80 backdrop-blur-sm border-bhutan-gold/20 hover:border-bhutan-gold/40 transition-all duration-300 hover:shadow-xl slide-up`} style={{ animationDelay: delay }}>
    <CardContent className="p-8 text-center">
      <div className="mb-6 flex justify-center">
        <div className="p-4 bg-bhutan-pattern rounded-full">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-4 text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </CardContent>
  </Card>
);

const InfoSection = () => {
  const infoCards = [
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: "Secure Digital Identity",
      description: "Your decentralized identity (DID) is cryptographically secured and owned by you. No central authority can revoke or manipulate your digital credentials.",
      delay: "0.2s"
    },
    {
      icon: <Globe className="w-8 h-8 text-white" />,
      title: "Global Business Opportunities",
      description: "Access international markets, establish business presence in Bhutan, and participate in the global digital economy with full legal recognition.",
      delay: "0.4s"
    },
    {
      icon: <Heart className="w-8 h-8 text-white" />,
      title: "Contribute to GNH",
      description: "Align your digital presence with Bhutan's philosophy of Gross National Happiness. Every interaction contributes to sustainable, mindful development.",
      delay: "0.6s"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-white" />,
      title: "Web3 Innovation",
      description: "Experience the future of digital citizenship with blockchain technology, smart contracts, and decentralized governance systems.",
      delay: "0.8s"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Why Choose <span className="text-bhutan-red">Druk e-Residency</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join thousands of global citizens who have chosen Bhutan as their digital home. 
            Experience the perfect blend of ancient wisdom and cutting-edge technology.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {infoCards.map((card, index) => (
            <InfoCard key={index} {...card} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-bhutan-pattern rounded-full text-white font-medium">
            <Sparkles className="w-5 h-5" />
            <span>Over 10,000 Digital Citizens Worldwide</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
