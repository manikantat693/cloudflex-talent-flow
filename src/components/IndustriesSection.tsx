import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  CreditCard, 
  ShoppingCart, 
  GraduationCap, 
  Factory, 
  Laptop 
} from 'lucide-react';

const industries = [
  {
    icon: Heart,
    title: "Healthcare",
    description: "HIPAA-compliant solutions, EHR systems, and healthcare technology consulting.",
    color: "text-red-500"
  },
  {
    icon: CreditCard,
    title: "Financial Services", 
    description: "Secure banking solutions, fintech development, and regulatory compliance systems.",
    color: "text-green-500"
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Scalable e-commerce platforms, payment integration, and digital marketing solutions.",
    color: "text-blue-500"
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Learning management systems, educational technology, and digital classroom solutions.",
    color: "text-purple-500"
  },
  {
    icon: Factory,
    title: "Manufacturing",
    description: "Industrial IoT, automation systems, and supply chain management solutions.",
    color: "text-orange-500"
  },
  {
    icon: Laptop,
    title: "Technology",
    description: "Software development, mobile applications, and emerging technology solutions.",
    color: "text-cyan-500"
  }
];

export const IndustriesSection = () => {
  return (
    <section id="industries" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Our Expertise
          </Badge>
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Industries We Serve
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expertise Across Multiple Sectors
          </p>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto mt-4">
            Our deep industry knowledge and technical expertise enable us to deliver tailored solutions across various business sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <Card 
              key={index} 
              className="glass-card hover-glow group cursor-pointer transition-all duration-300"
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 w-fit">
                  <industry.icon className={`w-8 h-8 ${industry.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold group-hover:text-gradient transition-all duration-300">
                  {industry.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground leading-relaxed">
                  {industry.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Card className="glass-card max-w-2xl mx-auto p-8">
            <h3 className="text-2xl font-bold mb-4 text-gradient">
              Ready to Transform Your Industry?
            </h3>
            <p className="text-muted-foreground mb-6">
              Let us help you leverage cutting-edge technology to drive innovation and growth in your sector.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-medium hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                Schedule Consultation
              </button>
              <button className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                View Case Studies
              </button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};