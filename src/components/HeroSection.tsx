import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Award, Building } from 'lucide-react';

export const HeroSection = () => {
  const scrollToJobs = () => {
    document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-card">
      {/* Floating Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-glow/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-space font-bold mb-6 leading-tight">
              <span className="text-gradient">Transform</span> Your
              <br className="hidden sm:block" />
              <span className="sm:block">Tech Career with</span>
              <br className="hidden sm:block" />
              <span className="text-glow">CloudFlex IT</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              We specialize in placing top-tier IT professionals with leading companies while handling 
              all immigration and career development needs. Your success is our mission.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={scrollToJobs}
              className="group"
            >
              Explore Opportunities
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              onClick={scrollToContact}
            >
              Partner With Us
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto px-4">
            <div className="glass-card p-4 sm:p-8 text-center hover-glow">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 animate-glow">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
              </div>
              <div className="text-2xl sm:text-4xl font-bold text-gradient mb-2">450+</div>
              <div className="text-sm sm:text-base text-muted-foreground">Professionals Placed</div>
            </div>

            <div className="glass-card p-4 sm:p-8 text-center hover-glow">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-accent to-primary-glow rounded-2xl flex items-center justify-center mx-auto mb-4 animate-glow" style={{ animationDelay: '1s' }}>
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
              </div>
              <div className="text-2xl sm:text-4xl font-bold text-gradient mb-2">98%</div>
              <div className="text-sm sm:text-base text-muted-foreground">Success Rate</div>
            </div>

            <div className="glass-card p-4 sm:p-8 text-center hover-glow">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-primary-glow to-primary rounded-2xl flex items-center justify-center mx-auto mb-4 animate-glow" style={{ animationDelay: '2s' }}>
                <Building className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
              </div>
              <div className="text-2xl sm:text-4xl font-bold text-gradient mb-2">50+</div>
              <div className="text-sm sm:text-base text-muted-foreground">Enterprise Clients</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};