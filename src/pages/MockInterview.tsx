import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, Brain, MessageSquare, CheckCircle, ArrowLeft, Clock } from 'lucide-react';
import { pipeline } from '@huggingface/transformers';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type InterviewStage = 'upload' | 'analyzing' | 'interview' | 'completed';

interface Question {
  id: number;
  question: string;
  answer: string;
  score?: number;
  category?: string;
  caseStudy?: string;
  followUp?: string;
}

interface ResumeScore {
  overall: number;
  skills: number;
  experience: number;
  formatting: number;
  keywords: number;
}

export default function MockInterview() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stage, setStage] = useState<InterviewStage>('upload');
  const [resumeText, setResumeText] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [resumeScore, setResumeScore] = useState<ResumeScore | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.type.includes('text')) {
      toast.error('Please upload a PDF or text file');
      return;
    }

    setIsProcessing(true);
    setStage('analyzing');

    try {
      let text = '';
      if (file.type.includes('text')) {
        text = await file.text();
      } else {
        // For PDF files, we'll simulate extraction
        text = 'Sample resume content with skills in React, JavaScript, Node.js, and software development experience.';
        toast.info('PDF parsing simulated - in production, use a PDF parser');
      }

      setResumeText(text);
      await analyzeResumeAndGenerateQuestions(text);
    } catch (error) {
      console.error('Error processing file:', error);
      toast.error('Failed to process resume. Please try again.');
      setStage('upload');
    } finally {
      setIsProcessing(false);
    }
  };

  const analyzeResumeAndGenerateQuestions = async (resumeText: string) => {
    try {
      // Enhanced resume analysis
      const detailedAnalysis = performDetailedResumeAnalysis(resumeText);
      const skills = detailedAnalysis.technicalSkills;
      const experience = detailedAnalysis.experienceLevel;
      const projects = detailedAnalysis.projects;
      const certifications = detailedAnalysis.certifications;
      const score = calculateEnhancedResumeScore(resumeText, detailedAnalysis);
      
      setAnalysisResults({ 
        skills, 
        experience, 
        projects, 
        certifications,
        feedback: detailedAnalysis.feedback,
        strengths: detailedAnalysis.strengths,
        improvements: detailedAnalysis.improvements
      });
      setResumeScore(score);

      // Generate intelligent questions based on technical skills and experience
      const generatedQuestions = generateIntelligentQuestions(detailedAnalysis);
      
      setQuestions(generatedQuestions.map((q, index) => ({
        id: index + 1,
        question: q.question,
        answer: '',
        category: q.category,
        caseStudy: q.caseStudy,
        followUp: q.followUp
      })));

      setStage('interview');
      toast.success('Resume analyzed! Your personalized technical interview is ready.');
    } catch (error) {
      console.error('Error analyzing resume:', error);
      toast.error('Failed to analyze resume. Using fallback questions.');
      
      // Enhanced fallback with better analysis
      const basicAnalysis = performBasicAnalysis(resumeText);
      setResumeScore(basicAnalysis.score);
      setAnalysisResults(basicAnalysis.analysis);
      
      const fallbackQuestions = generateFallbackQuestions();
      setQuestions(fallbackQuestions.map((q, index) => ({
        id: index + 1,
        question: q.question,
        answer: '',
        category: q.category,
        caseStudy: q.caseStudy
      })));

      setStage('interview');
    }
  };

  const calculateEnhancedResumeScore = (text: string, analysis: any): ResumeScore => {
    const { skillCategories, experienceLevel, projects, certifications } = analysis;
    
    // Enhanced skills scoring
    const skillDiversity = Object.keys(skillCategories).length;
    const totalSkills = Object.values(skillCategories).flat().length;
    const skillsScore = Math.min(100, (skillDiversity * 15) + (totalSkills * 5) + 30);
    
    // Enhanced experience scoring
    const experienceScore = experienceLevel === 'senior' ? 95 : 
                           experienceLevel === 'lead' ? 90 : 
                           experienceLevel === 'mid-level' ? 75 : 
                           experienceLevel === 'junior' ? 65 : 50;
    
    // Enhanced formatting and structure scoring
    const wordCount = text.split(' ').length;
    const hasStructure = text.includes('experience') || text.includes('education') || text.includes('skills');
    const hasQuantifiableResults = /\d+%|\d+\+|\d+ years|\$\d+/.test(text);
    const formattingScore = Math.min(100, 
      (wordCount > 100 ? 40 : 20) + 
      (hasStructure ? 30 : 0) + 
      (hasQuantifiableResults ? 30 : 0)
    );
    
    // Enhanced keywords scoring with technical focus
    const technicalKeywords = ['developed', 'implemented', 'optimized', 'scaled', 'automated', 'architected', 'deployed', 'managed'];
    const industryKeywords = ['agile', 'scrum', 'ci/cd', 'api', 'microservices', 'database', 'testing'];
    const leadershipKeywords = ['led', 'mentored', 'collaborated', 'presented', 'coordinated'];
    
    const allKeywords = [...technicalKeywords, ...industryKeywords, ...leadershipKeywords];
    const foundKeywords = allKeywords.filter(keyword => text.toLowerCase().includes(keyword));
    const keywordsScore = Math.min(100, foundKeywords.length * 8 + (certifications.length * 10) + 20);
    
    // Project impact scoring
    const projectScore = Math.min(100, projects * 10 + 40);
    
    // Overall score with weighted categories
    const overall = Math.round(
      (skillsScore * 0.25) + 
      (experienceScore * 0.20) + 
      (formattingScore * 0.20) + 
      (keywordsScore * 0.20) + 
      (projectScore * 0.15)
    );
    
    return {
      overall,
      skills: skillsScore,
      experience: experienceScore,
      formatting: formattingScore,
      keywords: keywordsScore
    };
  };

  const performDetailedResumeAnalysis = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Enhanced technical skills extraction
    const skillCategories = {
      frontend: ['react', 'vue', 'angular', 'javascript', 'typescript', 'html', 'css', 'sass', 'tailwind', 'bootstrap', 'next.js', 'nuxt.js'],
      backend: ['node.js', 'express', 'django', 'flask', 'spring', 'laravel', 'ruby on rails', 'asp.net', 'fastapi'],
      databases: ['mongodb', 'postgresql', 'mysql', 'redis', 'elasticsearch', 'dynamodb', 'firebase', 'sql'],
      cloud: ['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform', 'jenkins', 'ci/cd'],
      languages: ['python', 'java', 'c++', 'c#', 'go', 'rust', 'php', 'ruby', 'swift', 'kotlin'],
      mobile: ['react native', 'flutter', 'ios', 'android', 'swift', 'kotlin', 'xamarin'],
      tools: ['git', 'github', 'gitlab', 'jira', 'slack', 'figma', 'photoshop', 'postman']
    };

    const foundSkills: any = {};
    let allSkills: string[] = [];
    
    Object.entries(skillCategories).forEach(([category, skills]) => {
      const categorySkills = skills.filter(skill => lowerText.includes(skill.toLowerCase()));
      if (categorySkills.length > 0) {
        foundSkills[category] = categorySkills;
        allSkills = [...allSkills, ...categorySkills];
      }
    });

    // Extract experience level with more nuance
    let experienceLevel = 'entry-level';
    let yearsOfExperience = 0;
    
    if (lowerText.includes('senior') || lowerText.includes('lead') || lowerText.includes('principal')) {
      experienceLevel = 'senior';
      yearsOfExperience = 5;
    } else if (lowerText.includes('mid-level') || lowerText.includes('intermediate')) {
      experienceLevel = 'mid-level';
      yearsOfExperience = 3;
    } else if (lowerText.includes('junior')) {
      experienceLevel = 'junior';
      yearsOfExperience = 1;
    }

    // Extract project information
    const projectKeywords = ['project', 'developed', 'built', 'created', 'implemented', 'designed'];
    const projectCount = projectKeywords.reduce((count, keyword) => {
      const matches = (lowerText.match(new RegExp(keyword, 'g')) || []).length;
      return count + matches;
    }, 0);

    // Extract certifications
    const certKeywords = ['certified', 'certification', 'aws certified', 'microsoft certified', 'google cloud', 'oracle certified'];
    const certifications = certKeywords.filter(cert => lowerText.includes(cert));

    // Generate detailed feedback
    const feedback = generateDetailedFeedback(text, foundSkills, experienceLevel, projectCount);
    const strengths = identifyStrengths(foundSkills, experienceLevel, projectCount);
    const improvements = suggestImprovements(text, foundSkills, experienceLevel);

    return {
      technicalSkills: allSkills,
      skillCategories: foundSkills,
      experienceLevel,
      yearsOfExperience,
      projects: projectCount,
      certifications,
      feedback,
      strengths,
      improvements
    };
  };

  const generateDetailedFeedback = (text: string, skills: any, experience: string, projects: number) => {
    const feedback: string[] = [];
    
    if (Object.keys(skills).length > 3) {
      feedback.push("Strong technical skill diversity across multiple domains.");
    }
    
    if (skills.cloud && skills.cloud.length > 0) {
      feedback.push("Cloud expertise is highly valuable in today's market.");
    }
    
    if (projects > 5) {
      feedback.push("Extensive project experience demonstrates hands-on capabilities.");
    }
    
    if (experience === 'senior') {
      feedback.push("Senior-level experience indicates leadership and mentoring capabilities.");
    }

    if (feedback.length === 0) {
      feedback.push("Resume shows potential with room for technical skill enhancement.");
    }

    return feedback;
  };

  const identifyStrengths = (skills: any, experience: string, projects: number) => {
    const strengths: string[] = [];
    
    if (skills.frontend && skills.backend) {
      strengths.push("Full-stack development capabilities");
    }
    
    if (skills.cloud) {
      strengths.push("Cloud infrastructure knowledge");
    }
    
    if (projects > 3) {
      strengths.push("Strong project delivery experience");
    }
    
    if (experience === 'senior' || experience === 'lead') {
      strengths.push("Leadership and mentoring experience");
    }

    return strengths.length > 0 ? strengths : ["Technical foundation", "Problem-solving abilities"];
  };

  const suggestImprovements = (text: string, skills: any, experience: string) => {
    const improvements: string[] = [];
    
    if (!skills.cloud || skills.cloud.length === 0) {
      improvements.push("Consider adding cloud platform experience (AWS, Azure, GCP)");
    }
    
    if (!text.toLowerCase().includes('agile') && !text.toLowerCase().includes('scrum')) {
      improvements.push("Include agile/scrum methodology experience");
    }
    
    if (!skills.tools || skills.tools.length < 2) {
      improvements.push("Highlight more development tools and workflow experience");
    }
    
    if (experience === 'entry-level') {
      improvements.push("Consider adding personal projects or open-source contributions");
    }

    return improvements;
  };

  const generateIntelligentQuestions = (analysis: any) => {
    const questions: any[] = [];
    const { skillCategories, experienceLevel, projects } = analysis;

    // Technical skill-based questions with case studies
    if (skillCategories.frontend) {
      questions.push({
        question: `I see you have experience with ${skillCategories.frontend.join(', ')}. Can you walk me through how you would optimize the performance of a React application that's loading slowly?`,
        category: 'Frontend Development',
        caseStudy: "A React app with 50+ components is taking 8-10 seconds to load initially. Users are complaining about slow performance.",
        followUp: "What tools would you use to identify performance bottlenecks?"
      });
    }

    if (skillCategories.backend) {
      questions.push({
        question: `Given your ${skillCategories.backend.join(', ')} experience, how would you design a scalable API that needs to handle 10,000 concurrent users?`,
        category: 'Backend Architecture',
        caseStudy: "An e-commerce platform needs to handle flash sales where traffic spikes 100x normal levels within minutes.",
        followUp: "How would you implement rate limiting and caching strategies?"
      });
    }

    if (skillCategories.databases) {
      questions.push({
        question: `With your database experience in ${skillCategories.databases.join(', ')}, how would you handle a database migration with zero downtime?`,
        category: 'Database Management',
        caseStudy: "A production database with 100M+ records needs schema changes while maintaining 24/7 availability.",
        followUp: "What backup and rollback strategies would you implement?"
      });
    }

    if (skillCategories.cloud) {
      questions.push({
        question: `Tell me about your cloud experience with ${skillCategories.cloud.join(', ')}. How would you set up a CI/CD pipeline for a microservices architecture?`,
        category: 'DevOps & Cloud',
        caseStudy: "A company wants to deploy 15 microservices with automated testing, staging, and production deployment.",
        followUp: "How would you handle service dependencies and deployment ordering?"
      });
    }

    // Experience-level specific questions
    if (experienceLevel === 'senior') {
      questions.push({
        question: "As a senior developer, how do you approach code reviews and mentoring junior team members?",
        category: 'Leadership',
        caseStudy: "A junior developer consistently writes code that works but isn't following best practices or is hard to maintain.",
        followUp: "How do you balance providing guidance while encouraging independent problem-solving?"
      });
    }

    // Problem-solving scenarios
    questions.push({
      question: "Describe a time when you had to debug a critical production issue. What was your approach?",
      category: 'Problem Solving',
      caseStudy: "Your application suddenly starts throwing 500 errors for 30% of users, affecting revenue. You have 2 hours to fix it.",
      followUp: "How do you prevent similar issues in the future?"
    });

    // Project management
    if (projects > 3) {
      questions.push({
        question: "How do you handle competing priorities when managing multiple projects with tight deadlines?",
        category: 'Project Management',
        caseStudy: "You have 3 critical features due the same week, but each requires your full attention for successful delivery.",
        followUp: "How do you communicate delays or resource needs to stakeholders?"
      });
    }

    // Add behavioral questions
    questions.push(
      {
        question: "Tell me about a time you had to learn a new technology quickly to solve a problem.",
        category: 'Adaptability',
        caseStudy: "Your team needs to integrate with a third-party API using a technology stack you've never used before, and it's needed in 2 weeks.",
        followUp: "What resources do you typically use for rapid learning?"
      },
      {
        question: "How do you stay current with technology trends and decide which ones to adopt?",
        category: 'Continuous Learning',
        caseStudy: "Your company is considering migrating from REST APIs to GraphQL, and you need to make a recommendation.",
        followUp: "How do you evaluate the ROI of adopting new technologies?"
      }
    );

    return questions.slice(0, 10);
  };

  const generateFallbackQuestions = () => {
    return [
      {
        question: "Tell me about yourself and your technical background.",
        category: 'Introduction',
        caseStudy: "Imagine you're introducing yourself to a new team of developers."
      },
      {
        question: "Describe a challenging technical problem you've solved recently.",
        category: 'Problem Solving',
        caseStudy: "A feature you developed is causing performance issues in production."
      },
      {
        question: "How do you approach debugging when you encounter an error you've never seen before?",
        category: 'Debugging',
        caseStudy: "Your application crashes with a cryptic error message and no clear stack trace."
      },
      {
        question: "What's your experience with version control and collaborative development?",
        category: 'Collaboration',
        caseStudy: "You need to merge a feature branch that conflicts with recent changes from 3 other developers."
      },
      {
        question: "How do you ensure code quality and maintainability in your projects?",
        category: 'Best Practices',
        caseStudy: "You're joining a project with legacy code that has no tests and poor documentation."
      }
    ];
  };

  const performBasicAnalysis = (text: string) => {
    const basicSkills = ['javascript', 'python', 'java', 'react', 'node.js'];
    const foundSkills = basicSkills.filter(skill => text.toLowerCase().includes(skill));
    
    return {
      score: {
        overall: 70,
        skills: 65,
        experience: 70,
        formatting: 75,
        keywords: 65
      },
      analysis: {
        skills: foundSkills.length > 0 ? foundSkills : ['programming'],
        experience: 'mid-level',
        feedback: ["Resume shows basic technical competency with room for enhancement."],
        strengths: ["Technical foundation"],
        improvements: ["Add more specific project examples", "Include measurable achievements"]
      }
    };
  };

  const handleAnswerSubmit = () => {
    if (!currentAnswer.trim()) {
      toast.error('Please provide an answer before proceeding.');
      return;
    }

    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].answer = currentAnswer;
    
    // Simple scoring based on answer length and keywords
    const score = Math.min(100, Math.max(20, currentAnswer.length * 2 + (currentAnswer.split(' ').length * 5)));
    updatedQuestions[currentQuestionIndex].score = score;
    
    setQuestions(updatedQuestions);
    setCurrentAnswer('');

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      toast.success('Answer recorded! Next question loaded.');
    } else {
      setStage('completed');
      toast.success('Interview completed! Check your results.');
    }
  };

  const calculateOverallScore = () => {
    const scores = questions.filter(q => q.score).map(q => q.score!);
    return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  };

  const renderUploadStage = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Brain className="w-8 h-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl">AI Mock Interview</CardTitle>
        <p className="text-muted-foreground">
          Upload your resume to get personalized interview questions generated by AI
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div 
          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium mb-2">Upload Your Resume</p>
          <p className="text-muted-foreground">
            Click here or drag your resume file (PDF or TXT)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.txt,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold">Upload Resume</h3>
            <p className="text-sm text-muted-foreground">PDF or text format</p>
        </div>
        
        {/* Resume Score Display */}
        {resumeScore && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Badge className="mr-2 text-lg px-3 py-1">{resumeScore.overall}%</Badge>
                Resume Analysis Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{resumeScore.skills}%</div>
                  <p className="text-sm text-muted-foreground">Skills</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{resumeScore.experience}%</div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{resumeScore.formatting}%</div>
                  <p className="text-sm text-muted-foreground">Format</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{resumeScore.keywords}%</div>
                  <p className="text-sm text-muted-foreground">Keywords</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-sm">
                  <strong>AI Analysis:</strong> 
                  {resumeScore.overall >= 80 ? " Excellent resume! Strong technical skills and experience evident." :
                   resumeScore.overall >= 60 ? " Good resume with room for improvement. Consider adding more technical keywords and quantifiable achievements." :
                   " Resume needs enhancement. Focus on highlighting technical skills, measurable accomplishments, and relevant experience."}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
          <div className="text-center p-4">
            <Brain className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold">AI Analysis</h3>
            <p className="text-sm text-muted-foreground">Skills & experience review</p>
          </div>
          <div className="text-center p-4">
            <MessageSquare className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold">10 Questions</h3>
            <p className="text-sm text-muted-foreground">Personalized interview</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderAnalyzingStage = () => (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-12 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-6"></div>
        <h3 className="text-xl font-semibold mb-4">Analyzing Your Resume</h3>
        <p className="text-muted-foreground mb-6">
          Our AI is reviewing your experience and skills to create personalized interview questions...
        </p>
        <div className="space-y-2">
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
            Resume uploaded successfully
          </div>
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <div className="w-4 h-4 mr-2 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            Extracting skills and experience
          </div>
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" />
            Generating personalized questions
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderInterviewStage = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">
                Question {currentQuestionIndex + 1} of {questions.length}
              </CardTitle>
              <p className="text-muted-foreground">Take your time to provide a thoughtful answer</p>
            </div>
            <Badge variant="secondary">
              {Math.round(((currentQuestionIndex) / questions.length) * 100)}% Complete
            </Badge>
          </div>
          <Progress value={((currentQuestionIndex) / questions.length) * 100} className="mt-4" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 bg-muted/50 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Interview Question:</h3>
              <Badge variant="outline">{questions[currentQuestionIndex]?.category}</Badge>
            </div>
            <p className="text-lg">{questions[currentQuestionIndex]?.question}</p>
            
            {questions[currentQuestionIndex]?.caseStudy && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">📋 Case Study Context:</h4>
                <p className="text-blue-800 dark:text-blue-200 text-sm">{questions[currentQuestionIndex]?.caseStudy}</p>
              </div>
            )}
            
            {questions[currentQuestionIndex]?.followUp && (
              <div className="mt-2 p-3 bg-amber-50 dark:bg-amber-950/30 rounded border border-amber-200 dark:border-amber-800">
                <p className="text-amber-800 dark:text-amber-200 text-sm">
                  <span className="font-medium">💡 Follow-up to consider:</span> {questions[currentQuestionIndex]?.followUp}
                </p>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Your Answer:</label>
            <Textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Provide your answer here..."
              className="min-h-32"
            />
          </div>
          
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => currentQuestionIndex > 0 && setCurrentQuestionIndex(currentQuestionIndex - 1)}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button onClick={handleAnswerSubmit}>
              {currentQuestionIndex === questions.length - 1 ? 'Finish Interview' : 'Next Question'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {analysisResults && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resume Analysis Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Technical Skills Found:</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResults.skills.map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Experience Level:</h4>
                  <Badge variant="outline" className="text-sm">{analysisResults.experience}</Badge>
                  {analysisResults.projects && (
                    <p className="text-sm text-muted-foreground mt-2">
                      ~{analysisResults.projects} project references found
                    </p>
                  )}
                </div>
              </div>

              {analysisResults.strengths && (
                <div>
                  <h4 className="font-medium mb-2 text-green-700 dark:text-green-400">💪 Key Strengths:</h4>
                  <ul className="space-y-1">
                    {analysisResults.strengths.map((strength: string, index: number) => (
                      <li key={index} className="text-sm bg-green-50 dark:bg-green-950/30 p-2 rounded border-l-2 border-green-500">
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {analysisResults.improvements && (
                <div>
                  <h4 className="font-medium mb-2 text-amber-700 dark:text-amber-400">🚀 Improvement Suggestions:</h4>
                  <ul className="space-y-1">
                    {analysisResults.improvements.map((improvement: string, index: number) => (
                      <li key={index} className="text-sm bg-amber-50 dark:bg-amber-950/30 p-2 rounded border-l-2 border-amber-500">
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {analysisResults.feedback && (
                <div>
                  <h4 className="font-medium mb-2 text-blue-700 dark:text-blue-400">🤖 AI Detailed Analysis:</h4>
                  <div className="space-y-2">
                    {analysisResults.feedback.map((feedback: string, index: number) => (
                      <p key={index} className="text-sm bg-blue-50 dark:bg-blue-950/30 p-3 rounded border border-blue-200 dark:border-blue-800">
                        {feedback}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderCompletedStage = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">Interview Completed!</CardTitle>
          <p className="text-muted-foreground">
            Great job! Here's your performance summary and detailed feedback.
          </p>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-primary mb-2">
              {calculateOverallScore()}%
            </div>
            <p className="text-muted-foreground">Overall Score</p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Question Review:</h3>
            {questions.map((question, index) => (
              <Card key={question.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">Q{index + 1}:</h4>
                          {question.category && <Badge variant="outline" className="text-xs">{question.category}</Badge>}
                        </div>
                        <p className="text-sm">{question.question}</p>
                      </div>
                      <Badge variant={question.score! >= 70 ? 'default' : question.score! >= 50 ? 'secondary' : 'destructive'}>
                        {question.score}%
                      </Badge>
                    </div>
                    
                    {question.caseStudy && (
                      <div className="text-xs bg-blue-50 dark:bg-blue-950/30 p-2 rounded border border-blue-200 dark:border-blue-800">
                        <span className="font-medium text-blue-900 dark:text-blue-100">Case Study:</span>
                        <span className="text-blue-800 dark:text-blue-200 ml-1">{question.caseStudy}</span>
                      </div>
                    )}
                    
                    <div className="bg-muted/50 p-3 rounded">
                      <p className="text-sm">
                        <strong>Your Answer:</strong> {question.answer}
                      </p>
                    </div>
                    
                    <div className="text-xs text-muted-foreground bg-green-50 dark:bg-green-950/30 p-2 rounded">
                      <strong>💡 Feedback:</strong> 
                      {question.score! >= 80 ? " Excellent answer with good detail and technical depth." :
                       question.score! >= 60 ? " Good answer, could benefit from more specific examples or technical details." :
                       " Consider providing more concrete examples and demonstrating deeper technical understanding."}
                    </div>
                  </div>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center gap-4 mt-8">
            <Button onClick={() => window.location.reload()}>
              Start New Interview
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div>
            <h1 className="text-3xl font-bold">AI Mock Interview</h1>
            <p className="text-muted-foreground">Personalized interview practice powered by AI</p>
          </div>
        </div>

        {stage === 'upload' && renderUploadStage()}
        {stage === 'analyzing' && renderAnalyzingStage()}
        {stage === 'interview' && renderInterviewStage()}
        {stage === 'completed' && renderCompletedStage()}
      </div>
    </div>
  );
}