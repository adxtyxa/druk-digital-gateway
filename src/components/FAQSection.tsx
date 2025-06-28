
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "What is Druk e-Residency?",
      answer: "Druk e-Residency is Bhutan's digital residency program that provides you with a secure, blockchain-based digital identity. It allows you to access government services, establish business presence, and participate in Bhutan's digital economy from anywhere in the world."
    },
    {
      question: "How does Web3 technology secure my identity?",
      answer: "Your digital identity is created as a Decentralized Identifier (DID) on the blockchain and signed with your MetaMask wallet. This ensures that only you control your identity - no central authority can revoke or manipulate your credentials. All interactions are cryptographically verified."
    },
    {
      question: "What are the benefits of e-residency for businesses?",
      answer: "Business e-residency allows you to establish a legal business presence in Bhutan, access international banking, participate in digital trade agreements, and contribute to Bhutan's Gross National Happiness initiative while maintaining global operational flexibility."
    },
    {
      question: "Do I need to visit Bhutan physically?",
      answer: "No physical visit is required for e-residency. The entire process is completed online through our secure Web3 platform. However, e-residents are welcome to visit Bhutan and enjoy special benefits and cultural programs."
    },
    {
      question: "How does the GNH Fund contribution work?",
      answer: "The Gross National Happiness Fund is a blockchain-based initiative where e-residents can contribute to Bhutan's sustainable development projects. Contributions are made through cryptocurrency transactions and are transparently tracked on the blockchain."
    },
    {
      question: "What is a Decentralized Identity (DID)?",
      answer: "A DID is a unique identifier that you control completely. Unlike traditional IDs issued by governments, your DID is stored on the blockchain and verified by your crypto wallet signature. It enables you to prove your identity and credentials without relying on centralized authorities."
    },
    {
      question: "Can I get an NFT certificate?",
      answer: "Yes! Upon successful e-residency registration, you can mint a unique NFT badge featuring traditional Bhutanese art that serves as a digital certificate of your e-residency status. This NFT is stored in your MetaMask wallet."
    },
    {
      question: "What costs are involved?",
      answer: "The basic e-residency process is free, with only minimal blockchain transaction fees (gas fees) for signing your DID and minting NFTs. Premium services and business registrations may have additional fees to support Bhutan's digital infrastructure."
    }
  ];

  return (
    <section className="py-20 px-6 bg-muted/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about Druk e-Residency
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card border border-bhutan-gold/20 rounded-lg px-6 slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <AccordionTrigger className="text-left text-lg font-medium hover:text-bhutan-red transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
