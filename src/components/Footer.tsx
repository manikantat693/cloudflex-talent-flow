import { Phone, Mail, MapPin, Linkedin, Instagram } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-card/50 border-t border-border/20 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">CF</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gradient">CloudFlex IT</h3>
                <p className="text-xs text-muted-foreground">Solutions, Inc.</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering IT professionals with comprehensive recruitment and immigration services. 
              Your success is our mission.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.linkedin.com/company/cloudflex-it-solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-primary" />
              </a>
              <a
                href="https://www.instagram.com/cloudflex_it_solutions/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Instagram className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <button 
                onClick={() => scrollToSection('home')}
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('jobs')}
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Careers
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Our Services</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Talent Acquisition</p>
              <p>Resume Optimization</p>
              <p>Immigration Support</p>
              <p>Career Placement</p>
              <p>Interview Preparation</p>
              <p>Visa Processing</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p>CloudFlex IT Solutions, Inc.</p>
                  <p>Manikanta Thalapaneni</p>
                  <p>10926 David Taylor Dr.</p>
                  <p>Ste 120 PMB369</p>
                  <p>Charlotte, NC 28262</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a 
                  href="tel:+13362812871"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  336-281-2871
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a 
                  href="mailto:admin@cloudflexit.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  admin@cloudflexit.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/20 mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} CloudFlex IT Solutions, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};