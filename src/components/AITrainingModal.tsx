import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, Play, Download, ExternalLink, Star, Clock, Users, 
  CheckCircle, Book, Video, Code, Award, Zap
} from 'lucide-react';

interface AITrainingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  students: number;
  topics: string[];
  videoUrl?: string;
  documentUrl?: string;
  price: string;
}

interface LearningPath {
  name: string;
  description: string;
  courses: string[];
  estimatedTime: string;
  certification: boolean;
}

export const AITrainingModal = ({ isOpen, onClose }: AITrainingModalProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const courses: Course[] = [
    {
      id: 'langchain-basics',
      title: 'LangChain Fundamentals',
      description: 'Master the basics of LangChain for building LLM applications',
      duration: '8 hours',
      level: 'Beginner',
      rating: 4.8,
      students: 1250,
      topics: ['LangChain Basics', 'Chains & Agents', 'Memory Systems', 'Document Loaders'],
      videoUrl: 'https://youtube.com/watch?v=langchain-basics',
      documentUrl: '/docs/langchain-guide.pdf',
      price: 'Free'
    },
    {
      id: 'openai-api',
      title: 'OpenAI API Mastery',
      description: 'Complete guide to integrating OpenAI APIs in your applications',
      duration: '12 hours',
      level: 'Intermediate',
      rating: 4.9,
      students: 980,
      topics: ['API Authentication', 'GPT Models', 'Function Calling', 'Fine-tuning'],
      videoUrl: 'https://youtube.com/watch?v=openai-api-course',
      documentUrl: '/docs/openai-api-guide.pdf',
      price: '$99'
    },
    {
      id: 'rag-systems',
      title: 'RAG Systems Development',
      description: 'Build Retrieval-Augmented Generation systems from scratch',
      duration: '15 hours',
      level: 'Advanced',
      rating: 4.7,
      students: 650,
      topics: ['Vector Databases', 'Embedding Models', 'Retrieval Strategies', 'System Architecture'],
      videoUrl: 'https://youtube.com/watch?v=rag-systems',
      documentUrl: '/docs/rag-systems-guide.pdf',
      price: '$149'
    },
    {
      id: 'prompt-engineering',
      title: 'Advanced Prompt Engineering',
      description: 'Master the art and science of prompt engineering for better AI outputs',
      duration: '6 hours',
      level: 'Intermediate',
      rating: 4.6,
      students: 1100,
      topics: ['Prompt Design', 'Chain-of-Thought', 'Few-shot Learning', 'Prompt Optimization'],
      videoUrl: 'https://youtube.com/watch?v=prompt-engineering',
      documentUrl: '/docs/prompt-engineering-guide.pdf',
      price: '$79'
    },
    {
      id: 'mlops-ai',
      title: 'MLOps for AI Applications',
      description: 'Deploy and manage AI models in production environments',
      duration: '20 hours',
      level: 'Advanced',
      rating: 4.8,
      students: 420,
      topics: ['Model Deployment', 'Monitoring', 'CI/CD for ML', 'Model Versioning'],
      videoUrl: 'https://youtube.com/watch?v=mlops-ai',
      documentUrl: '/docs/mlops-guide.pdf',
      price: '$199'
    },
    {
      id: 'ai-ethics',
      title: 'AI Ethics & Responsible AI',
      description: 'Understanding ethical considerations in AI development',
      duration: '4 hours',
      level: 'Beginner',
      rating: 4.5,
      students: 890,
      topics: ['Bias Detection', 'Fairness Metrics', 'Privacy Concerns', 'Regulatory Compliance'],
      videoUrl: 'https://youtube.com/watch?v=ai-ethics',
      documentUrl: '/docs/ai-ethics-guide.pdf',
      price: 'Free'
    }
  ];

  const learningPaths: LearningPath[] = [
    {
      name: 'AI Developer Bootcamp',
      description: 'Complete pathway from beginner to advanced AI developer',
      courses: ['langchain-basics', 'openai-api', 'prompt-engineering', 'rag-systems'],
      estimatedTime: '6-8 weeks',
      certification: true
    },
    {
      name: 'Production AI Engineer',
      description: 'Focus on deploying and scaling AI applications',
      courses: ['mlops-ai', 'rag-systems', 'ai-ethics'],
      estimatedTime: '4-6 weeks',
      certification: true
    },
    {
      name: 'AI Fundamentals',
      description: 'Perfect for beginners starting their AI journey',
      courses: ['langchain-basics', 'ai-ethics', 'prompt-engineering'],
      estimatedTime: '3-4 weeks',
      certification: false
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-700 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleEnrollNow = (courseId: string) => {
    // In real implementation, this would handle course enrollment
    console.log('Enrolling in course:', courseId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            AI Training & Certification Program
          </DialogTitle>
          <p className="text-muted-foreground">
            Master the latest AI technologies with our comprehensive training programs
          </p>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="paths">Learning Paths</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Book className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold mb-2">6 Comprehensive Courses</h4>
                  <p className="text-muted-foreground">From basics to advanced AI development</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold mb-2">5000+ Students</h4>
                  <p className="text-muted-foreground">Join our growing community</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold mb-2">Industry Certification</h4>
                  <p className="text-muted-foreground">Recognized by leading tech companies</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Why Choose Our AI Training?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Hands-on projects with real-world datasets</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Industry-expert instructors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Latest AI technologies and frameworks</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Flexible self-paced learning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Job placement assistance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Lifetime access to course materials</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-4">
            <div className="grid gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getLevelColor(course.level)}>
                            {course.level}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm">{course.rating}</span>
                            <span className="text-sm text-muted-foreground">({course.students} students)</span>
                          </div>
                        </div>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <p className="text-muted-foreground mt-2">{course.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-primary">{course.price}</div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 mr-1" />
                          {course.duration}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h5 className="font-semibold mb-2">Topics Covered:</h5>
                      <div className="flex flex-wrap gap-2">
                        {course.topics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="gradient" size="sm" onClick={() => handleEnrollNow(course.id)}>
                        <Zap className="w-4 h-4 mr-2" />
                        Enroll Now
                      </Button>
                      {course.videoUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={course.videoUrl} target="_blank" rel="noopener noreferrer">
                            <Video className="w-4 h-4 mr-2" />
                            Preview
                          </a>
                        </Button>
                      )}
                      {course.documentUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={course.documentUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="w-4 h-4 mr-2" />
                            Materials
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="paths" className="space-y-4">
            <div className="grid gap-6">
              {learningPaths.map((path, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl">{path.name}</CardTitle>
                        <p className="text-muted-foreground mt-2">{path.description}</p>
                      </div>
                      {path.certification && (
                        <Badge variant="secondary" className="ml-4">
                          <Award className="w-4 h-4 mr-1" />
                          Certification
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Estimated Time:</span>
                        <span className="font-medium">{path.estimatedTime}</span>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-semibold">Included Courses:</h5>
                        <div className="space-y-1">
                          {path.courses.map((courseId) => {
                            const course = courses.find(c => c.id === courseId);
                            return course ? (
                              <div key={courseId} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>{course.title}</span>
                                <Badge variant="outline" className="text-xs">
                                  {course.duration}
                                </Badge>
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                      <Button variant="gradient" className="w-full">
                        Start Learning Path
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-red-500" />
                    YouTube Playlists
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a href="https://youtube.com/playlist?list=langchain-complete" 
                     target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted transition-colors">
                    <Play className="w-4 h-4 text-red-500" />
                    <div>
                      <div className="font-medium">LangChain Complete Course</div>
                      <div className="text-sm text-muted-foreground">25 videos • 8 hours</div>
                    </div>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  <a href="https://youtube.com/playlist?list=openai-api-mastery" 
                     target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted transition-colors">
                    <Play className="w-4 h-4 text-red-500" />
                    <div>
                      <div className="font-medium">OpenAI API Mastery</div>
                      <div className="text-sm text-muted-foreground">30 videos • 12 hours</div>
                    </div>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-blue-500" />
                    Documentation & Guides
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a href="/docs/ai-developer-handbook.pdf" 
                     target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted transition-colors">
                    <Book className="w-4 h-4 text-blue-500" />
                    <div>
                      <div className="font-medium">AI Developer Handbook</div>
                      <div className="text-sm text-muted-foreground">Complete reference guide</div>
                    </div>
                    <Download className="w-4 h-4 ml-auto" />
                  </a>
                  <a href="/docs/best-practices-guide.pdf" 
                     target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted transition-colors">
                    <Code className="w-4 h-4 text-green-500" />
                    <div>
                      <div className="font-medium">AI Best Practices</div>
                      <div className="text-sm text-muted-foreground">Industry standards & tips</div>
                    </div>
                    <Download className="w-4 h-4 ml-auto" />
                  </a>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center pt-6 border-t">
          <div className="text-sm text-muted-foreground">
            Need help choosing? Contact our training advisors
          </div>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};