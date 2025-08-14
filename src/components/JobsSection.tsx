import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign, Users } from 'lucide-react';
import { JobApplicationModal } from './JobApplicationModal';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  skills: string[];
  description: string;
  requirements: string[];
}

export const JobsSection = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const jobs: Job[] = [
    {
      id: '1',
      title: 'Java Full Stack Developer',
      company: 'Tech Innovation Corp',
      location: 'Charlotte, NC / Remote',
      type: 'Full-time',
      salary: '$90K - $130K',
      experience: '3-5 years',
      skills: ['Java', 'Spring Boot', 'React', 'Angular', 'PostgreSQL', 'AWS'],
      description: 'Join our dynamic team to build scalable web applications using modern Java technologies and cloud platforms.',
      requirements: [
        '3+ years of Java development experience',
        'Strong knowledge of Spring Framework',
        'Experience with React or Angular',
        'Database design and optimization skills',
        'Cloud platform experience (AWS/Azure)',
        'Excellent problem-solving abilities'
      ]
    },
    {
      id: '2',
      title: 'DevOps Engineer',
      company: 'CloudScale Solutions',
      location: 'Remote',
      type: 'Full-time',
      salary: '$100K - $150K',
      experience: '4-7 years',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Python'],
      description: 'Lead infrastructure automation and deployment pipelines for enterprise-scale applications.',
      requirements: [
        '4+ years of DevOps experience',
        'Strong experience with AWS/Azure',
        'Container orchestration with Kubernetes',
        'CI/CD pipeline implementation',
        'Infrastructure as Code (Terraform/CloudFormation)',
        'Monitoring and logging solutions'
      ]
    },
    {
      id: '3',
      title: 'Data Scientist',
      company: 'Analytics Plus Inc',
      location: 'New York, NY / Hybrid',
      type: 'Full-time',
      salary: '$110K - $160K',
      experience: '3-6 years',
      skills: ['Python', 'R', 'Machine Learning', 'TensorFlow', 'SQL', 'Tableau'],
      description: 'Drive data-driven insights and build predictive models to solve complex business problems.',
      requirements: [
        '3+ years in data science or analytics',
        'Strong programming skills in Python/R',
        'Machine learning algorithms and frameworks',
        'Statistical analysis and modeling',
        'Data visualization tools',
        'Business acumen and communication skills'
      ]
    },
    {
      id: '4',
      title: 'AI/ML Engineer',
      company: 'AI Innovation Labs',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      salary: '$150K - $220K',
      experience: '4-8 years',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'MLOps', 'LangChain', 'OpenAI API'],
      description: 'Build and deploy cutting-edge AI models and systems for enterprise applications.',
      requirements: [
        '4+ years of ML/AI engineering experience',
        'Strong Python and ML framework knowledge',
        'Experience with LLMs and prompt engineering',
        'MLOps and model deployment expertise',
        'Cloud ML platforms (AWS SageMaker, GCP AI)',
        'Strong problem-solving and research skills'
      ]
    },
    {
      id: '5',
      title: 'React Frontend Developer',
      company: 'Digital Innovations LLC',
      location: 'Austin, TX / Remote',
      type: 'Full-time',
      salary: '$80K - $120K',
      experience: '2-4 years',
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux', 'GraphQL'],
      description: 'Create exceptional user experiences with modern React applications.',
      requirements: [
        '2+ years of React development',
        'Strong TypeScript knowledge',
        'Modern CSS frameworks',
        'State management (Redux/Context)',
        'API integration experience',
        'Performance optimization'
      ]
    },
    {
      id: '6',
      title: 'Cybersecurity Analyst',
      company: 'SecureNet Systems',
      location: 'Washington, DC',
      type: 'Full-time',
      salary: '$95K - $135K',
      experience: '3-5 years',
      skills: ['SIEM', 'Penetration Testing', 'Risk Assessment', 'Compliance', 'Incident Response'],
      description: 'Protect organizational assets through comprehensive security monitoring and analysis.',
      requirements: [
        '3+ years in cybersecurity',
        'Security certifications (CISSP, CEH, etc.)',
        'Incident response experience',
        'Risk assessment methodologies',
        'Compliance frameworks knowledge',
        'Analytical and communication skills'
      ]
    }
  ];

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  return (
    <section id="jobs" className="py-24 bg-gradient-to-b from-background to-card/50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-space font-bold mb-6">
            <span className="text-gradient">Latest</span> Opportunities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover exciting career opportunities with leading companies. 
            We handle everything from application to placement.
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {jobs.map((job) => (
            <Card key={job.id} className="group hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                      {job.title}
                    </CardTitle>
                    <p className="text-muted-foreground font-medium">{job.company}</p>
                  </div>
                  <Badge variant="secondary">{job.type}</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <DollarSign className="w-4 h-4 mr-2" />
                    {job.salary}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    {job.experience}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {job.description}
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Key Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="gradient" 
                  className="w-full group"
                  onClick={() => handleApply(job)}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Don't see the perfect role?
            </h3>
            <p className="text-muted-foreground mb-6">
              Submit your resume and we'll match you with opportunities that align with your skills and career goals.
            </p>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setIsModalOpen(true)}
            >
              Submit Resume
            </Button>
          </div>
        </div>
      </div>

      {/* Job Application Modal */}
      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedJob(null);
        }}
        job={selectedJob}
      />
    </section>
  );
};