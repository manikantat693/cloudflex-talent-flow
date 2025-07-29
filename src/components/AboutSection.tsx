import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Users, Shield, Globe, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AboutModal } from './AboutModal';

export const AboutSection = () => {
  const [aboutModalOpen, setAboutModalOpen] = useState(false);

  const services = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Talent Acquisition",
      description: "We identify and recruit top-tier IT professionals who match your specific requirements and company culture."
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Resume Review & Optimization",
      description: "Our experts enhance resumes to highlight key skills and achievements, maximizing interview opportunities."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Immigration Support",
      description: "Complete visa and immigration assistance including H1B, L1, OPT, and Green Card processing."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Career Placement",
      description: "Strategic placement with leading companies across various industries and technology stacks."
    }
  ];

  const features = [
    "End-to-end recruitment process",
    "Immigration and visa assistance",
    "Career counseling and guidance",
    "Resume optimization services",
    "Interview preparation support",
    "Ongoing professional development"
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-space font-bold mb-6">
            <span className="text-gradient">Empowering</span> IT Careers
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            CloudFlex IT Solutions is your trusted partner in navigating the complex world of IT recruitment 
            and immigration. We bridge the gap between talented professionals and leading companies.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-20">
          {/* Content */}
          <div>
            <h3 className="text-3xl font-bold mb-6">
              Your Success is Our <span className="text-gradient">Mission</span>
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              With years of experience in IT recruitment and immigration services, we understand the unique 
              challenges faced by international professionals. Our comprehensive approach ensures you have 
              the support needed to thrive in your career.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              variant="gradient" 
              size="lg" 
              className="group w-full sm:w-auto"
              onClick={() => setAboutModalOpen(true)}
            >
              Learn More About Us
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Stats Card */}
          <div className="glass-card p-6 sm:p-8">
            <h4 className="text-xl sm:text-2xl font-bold mb-6 text-center">Our Impact</h4>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gradient mb-2">450+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Professionals<br />Placed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gradient mb-2">98%</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Success<br />Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gradient mb-2">50+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Enterprise<br />Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gradient mb-2">5+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Years<br />Experience</div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-12">
            Comprehensive <span className="text-gradient">Services</span>
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group cursor-pointer h-full">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <div className="text-primary-foreground">
                      {service.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center leading-relaxed text-sm sm:text-base">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* About Modal */}
      <AboutModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
      />
    </section>
  );
};