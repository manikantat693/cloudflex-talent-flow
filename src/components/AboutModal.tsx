import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Users, Award, Globe, Target, Heart, Zap, 
  TrendingUp, Shield, Code, Building2, Linkedin, Twitter, Mail
} from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal = ({ isOpen, onClose }: AboutModalProps) => {
  const teamMembers = [
    {
      name: 'Rajesh Kumar',
      role: 'CEO & Founder',
      experience: '15+ years',
      specialties: ['Strategic Leadership', 'Business Development', 'Client Relations'],
      bio: 'Former VP at Tech Giants, led multiple successful digital transformations.',
      image: '👨‍💼'
    },
    {
      name: 'Priya Sharma',
      role: 'CTO',
      experience: '12+ years',
      specialties: ['Cloud Architecture', 'AI/ML', 'DevOps'],
      bio: 'Ex-Principal Engineer at leading cloud companies, AI research background.',
      image: '👩‍💻'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Recruitment',
      experience: '10+ years',
      specialties: ['Technical Recruiting', 'Talent Strategy', 'Immigration Law'],
      bio: 'Specialized in placing 500+ tech professionals across Fortune 500 companies.',
      image: '👨‍🎓'
    },
    {
      name: 'Sarah Johnson',
      role: 'Immigration Director',
      experience: '8+ years',
      specialties: ['Immigration Law', 'H1B Processing', 'Green Card Applications'],
      bio: 'Licensed immigration attorney with 95% success rate in visa applications.',
      image: '👩‍⚖️'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'People First',
      description: 'We believe in putting people at the center of everything we do, creating meaningful connections between talent and opportunities.'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Transparency, honesty, and ethical practices guide every decision we make and every relationship we build.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We continuously evolve our methods and technologies to stay ahead in the rapidly changing tech landscape.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We are committed to delivering exceptional results and exceeding expectations in every project we undertake.'
    }
  ];

  const achievements = [
    { year: '2019', milestone: 'Company Founded', description: 'Started with a vision to transform IT recruitment' },
    { year: '2020', milestone: '100+ Placements', description: 'Reached our first major milestone during challenging times' },
    { year: '2021', milestone: 'AI Integration', description: 'Launched AI-powered talent matching platform' },
    { year: '2022', milestone: 'Series A Funding', description: 'Secured $5M to expand operations and technology' },
    { year: '2023', milestone: 'Global Expansion', description: 'Opened offices in 3 countries, 500+ placements' },
    { year: '2024', milestone: 'Industry Recognition', description: 'Named "Best IT Recruitment Firm" by Tech Awards' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <Building2 className="w-6 h-6 text-primary" />
            About CloudFlex IT Solutions
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="story" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="story">Our Story</TabsTrigger>
            <TabsTrigger value="values">Values</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="story" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">
                Transforming IT Careers <span className="text-gradient">Since 2019</span>
              </h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                CloudFlex IT Solutions was born from a simple yet powerful vision: to bridge the gap between exceptional IT talent and innovative companies worldwide.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-500" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To empower IT professionals and organizations by creating meaningful connections that drive innovation, growth, and success. We believe that the right talent in the right place can change the world.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-500" />
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To become the world's most trusted partner for IT talent solutions, leveraging cutting-edge technology and human expertise to create a future where every professional finds their perfect role.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold mb-4 text-center">What Sets Us Apart</h4>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">95%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-2">18 Days</div>
                    <div className="text-sm text-muted-foreground">Average Placement Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500 mb-2">500+</div>
                    <div className="text-sm text-muted-foreground">Successful Placements</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>


          <TabsContent value="values" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Our Core <span className="text-gradient">Values</span></h3>
              <p className="text-lg text-muted-foreground">
                These principles guide everything we do and shape how we serve our clients and candidates.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="group hover:scale-105 transition-all">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{value.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Our <span className="text-gradient">Journey</span></h3>
              <p className="text-lg text-muted-foreground">
                Key milestones that have shaped our growth and success over the years.
              </p>
            </div>

            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary to-accent"></div>
                  <CardContent className="p-6 pl-8">
                    <div className="flex items-center gap-4 mb-2">
                      <Badge variant="outline" className="text-primary border-primary">
                        {achievement.year}
                      </Badge>
                      <h4 className="text-xl font-semibold">{achievement.milestone}</h4>
                    </div>
                    <p className="text-muted-foreground">{achievement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
              <CardContent className="p-8 text-center">
                <Award className="w-12 h-12 text-accent mx-auto mb-4" />
                <h4 className="text-2xl font-bold mb-4">Industry Recognition</h4>
                <p className="text-muted-foreground mb-6">
                  Our commitment to excellence has been recognized by industry leaders and clients worldwide.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">50+</div>
                    <div className="text-sm text-muted-foreground">Industry Awards</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">4.9/5</div>
                    <div className="text-sm text-muted-foreground">Client Rating</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-500">98%</div>
                    <div className="text-sm text-muted-foreground">Client Retention</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
          <Button variant="gradient" size="lg" className="flex-1">
            <Users className="w-4 h-4 mr-2" />
            Join Our Team
          </Button>
          <Button variant="outline" size="lg" className="flex-1">
            <Mail className="w-4 h-4 mr-2" />
            Contact Leadership
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};