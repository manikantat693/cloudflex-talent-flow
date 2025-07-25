import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Linkedin, Instagram, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Contact form submitted:', {
        ...formData,
        submittedAt: new Date().toISOString(),
        recipient: 'admin@cloudflexit.com'
      });

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      content: "336-281-2871",
      action: "tel:+13362812871"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "admin@cloudflexit.com",
      action: "mailto:admin@cloudflexit.com"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Address",
      content: "10926 David Taylor Dr.\nSte 120 PMB369\nCharlotte, NC 28262",
      action: "https://maps.google.com/?q=10926+David+Taylor+Dr,+Charlotte,+NC+28262"
    }
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="w-6 h-6" />,
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/cloudflex-it-solutions"
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      name: "Instagram",
      url: "https://www.instagram.com/cloudflex_it_solutions/"
    }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-space font-bold mb-6">
            <span className="text-gradient">Get in Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to advance your career or find the perfect talent? 
            Let's discuss how CloudFlex IT can help you achieve your goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-2xl">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                    className="mt-1 min-h-[120px]"
                    placeholder="Tell us about your needs, goals, or how we can help..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.action}
                    target={info.action.startsWith('http') ? '_blank' : undefined}
                    rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <div className="text-primary-foreground">
                        {info.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{info.title}</h4>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {info.content}
                      </p>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center hover:scale-110 transition-transform group"
                    >
                      <div className="text-primary-foreground group-hover:scale-110 transition-transform">
                        {social.icon}
                      </div>
                    </a>
                  ))}
                </div>
                <p className="text-muted-foreground mt-4">
                  Stay connected for the latest opportunities and industry insights.
                </p>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Quick Contact</h3>
                <p className="text-muted-foreground mb-6">
                  Need immediate assistance? Our HR team is here to help.
                </p>
                <div className="space-y-3">
                  <a 
                    href="mailto:hr@cloudflexit.com"
                    className="flex items-center space-x-3 text-primary hover:text-accent transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>hr@cloudflexit.com</span>
                  </a>
                  <a 
                    href="tel:+13362812871"
                    className="flex items-center space-x-3 text-primary hover:text-accent transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>336-281-2871</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};