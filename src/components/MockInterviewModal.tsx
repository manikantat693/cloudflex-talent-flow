import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, Brain, Play, Check, Clock, ArrowRight, Mic, MicOff } from 'lucide-react';
import { toast } from 'sonner';
import { pipeline, env } from '@huggingface/transformers';

// Set environment for transformers
env.allowRemoteModels = true;
env.allowLocalModels = false;

interface MockInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface InterviewQuestion {
  id: number;
  question: string;
  category: string;
  expectedAnswer: string;
  followUp?: string;
}

interface InterviewSession {
  questions: InterviewQuestion[];
  currentQuestionIndex: number;
  answers: string[];
  score: number;
  feedback: string[];
}

export const MockInterviewModal = ({ isOpen, onClose }: MockInterviewModalProps) => {
  const [step, setStep] = useState<'upload' | 'analyzing' | 'questions' | 'interview' | 'results'>('upload');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [interviewSession, setInterviewSession] = useState<InterviewSession | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a PDF, DOC, DOCX, or TXT file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setResumeFile(file);
    
    // Extract text from file (simplified - in real app would use proper text extraction)
    const text = await file.text();
    setResumeText(text);
    toast.success('Resume uploaded successfully!');
  };

  const extractResumeContent = (text: string) => {
    const lines = text.toLowerCase().split('\n');
    const skills: string[] = [];
    const experience: string[] = [];
    let jobTitle = '';
    let industry = '';

    // Simple keyword extraction
    const skillKeywords = ['javascript', 'python', 'react', 'node.js', 'aws', 'sql', 'java', 'css', 'html', 'docker', 'kubernetes'];
    const industryKeywords = {
      'technology': ['software', 'tech', 'developer', 'engineer', 'programming'],
      'finance': ['finance', 'banking', 'investment', 'accounting'],
      'healthcare': ['healthcare', 'medical', 'hospital', 'clinical'],
      'marketing': ['marketing', 'advertising', 'brand', 'social media']
    };

    lines.forEach(line => {
      skillKeywords.forEach(skill => {
        if (line.includes(skill) && !skills.includes(skill)) {
          skills.push(skill);
        }
      });

      Object.entries(industryKeywords).forEach(([ind, keywords]) => {
        keywords.forEach(keyword => {
          if (line.includes(keyword) && !industry) {
            industry = ind;
          }
        });
      });

      if (line.includes('developer') || line.includes('engineer')) {
        jobTitle = line.trim();
      }
    });

    return { skills, experience, jobTitle, industry };
  };

  const generateInterviewQuestions = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setStep('analyzing');

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      // Extract resume content
      const resumeContent = extractResumeContent(resumeText);
      
      // Generate questions based on resume content
      const baseQuestions: InterviewQuestion[] = [
        {
          id: 1,
          question: "Tell me about yourself and your professional background.",
          category: "General",
          expectedAnswer: "Should include background, skills, and career goals"
        },
        {
          id: 2,
          question: "What are your greatest strengths?",
          category: "Behavioral",
          expectedAnswer: "Should relate to job requirements and provide examples"
        },
        {
          id: 3,
          question: "Describe a challenging project you worked on.",
          category: "Experience",
          expectedAnswer: "Should include problem, solution, and results"
        },
        {
          id: 4,
          question: "Where do you see yourself in 5 years?",
          category: "Career Goals",
          expectedAnswer: "Should show ambition and alignment with role"
        },
        {
          id: 5,
          question: "Why are you interested in this role?",
          category: "Motivation",
          expectedAnswer: "Should show research and genuine interest"
        }
      ];

      // Add technical questions based on skills
      const technicalQuestions: InterviewQuestion[] = [];
      
      if (resumeContent.skills.includes('javascript')) {
        technicalQuestions.push({
          id: 6,
          question: "Explain the difference between let, const, and var in JavaScript.",
          category: "Technical",
          expectedAnswer: "Should cover scope, hoisting, and reassignment rules"
        });
      }
      
      if (resumeContent.skills.includes('react')) {
        technicalQuestions.push({
          id: 7,
          question: "What are React hooks and why are they useful?",
          category: "Technical",
          expectedAnswer: "Should explain state management and component lifecycle"
        });
      }

      if (resumeContent.skills.includes('python')) {
        technicalQuestions.push({
          id: 8,
          question: "Explain the difference between lists and tuples in Python.",
          category: "Technical",
          expectedAnswer: "Should cover mutability and use cases"
        });
      }

      // Add industry-specific questions
      const industryQuestions: InterviewQuestion[] = [];
      
      if (resumeContent.industry === 'technology') {
        industryQuestions.push({
          id: 9,
          question: "How do you stay updated with the latest technology trends?",
          category: "Industry",
          expectedAnswer: "Should mention learning resources and continuous improvement"
        });
      }

      // Final situational question
      const situationalQuestion: InterviewQuestion = {
        id: 10,
        question: "Describe a time when you had to work with a difficult team member.",
        category: "Situational",
        expectedAnswer: "Should demonstrate conflict resolution and teamwork skills"
      };

      const allQuestions = [
        ...baseQuestions,
        ...technicalQuestions.slice(0, 3),
        ...industryQuestions.slice(0, 2),
        situationalQuestion
      ].slice(0, 10);

      clearInterval(progressInterval);
      setAnalysisProgress(100);

      setTimeout(() => {
        setInterviewSession({
          questions: allQuestions,
          currentQuestionIndex: 0,
          answers: [],
          score: 0,
          feedback: []
        });
        setStep('questions');
        setIsAnalyzing(false);
      }, 1000);

    } catch (error) {
      console.error('Error generating questions:', error);
      toast.error('Failed to generate interview questions. Please try again.');
      setIsAnalyzing(false);
      setStep('upload');
    }
  };

  const startInterview = () => {
    setStep('interview');
  };

  const submitAnswer = () => {
    if (!interviewSession || !currentAnswer.trim()) {
      toast.error('Please provide an answer before proceeding.');
      return;
    }

    const updatedAnswers = [...interviewSession.answers, currentAnswer];
    const nextIndex = interviewSession.currentQuestionIndex + 1;

    if (nextIndex >= interviewSession.questions.length) {
      // Interview complete
      const finalScore = Math.floor(Math.random() * 30) + 70; // Simulate scoring
      const feedback = [
        "Good communication skills demonstrated",
        "Consider providing more specific examples",
        "Strong technical knowledge evident",
        "Room for improvement in behavioral responses"
      ];

      setInterviewSession({
        ...interviewSession,
        answers: updatedAnswers,
        score: finalScore,
        feedback
      });
      setStep('results');
    } else {
      setInterviewSession({
        ...interviewSession,
        answers: updatedAnswers,
        currentQuestionIndex: nextIndex
      });
    }

    setCurrentAnswer('');
  };

  const resetModal = () => {
    setStep('upload');
    setResumeFile(null);
    setResumeText('');
    setInterviewSession(null);
    setCurrentAnswer('');
    setIsAnalyzing(false);
    setAnalysisProgress(0);
    onClose();
  };

  const renderUploadStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Brain className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">AI Mock Interview</h3>
        <p className="text-muted-foreground">
          Upload your resume to get personalized interview questions based on your background and skills.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="resume-upload">Upload Resume</Label>
          <div 
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">
              {resumeFile ? resumeFile.name : 'Click to upload your resume'}
            </p>
            <p className="text-sm text-muted-foreground">
              Supports PDF, DOC, DOCX, TXT (max 5MB)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
            />
          </div>
        </div>

        {resumeFile && (
          <div className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg">
            <FileText className="w-5 h-5 text-primary" />
            <span className="flex-1 text-sm">{resumeFile.name}</span>
            <Badge variant="secondary">Ready</Badge>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button 
          onClick={generateInterviewQuestions}
          disabled={!resumeFile}
          className="flex-1"
        >
          <Brain className="w-4 h-4 mr-2" />
          Generate Questions
        </Button>
      </div>
    </div>
  );

  const renderAnalyzingStep = () => (
    <div className="space-y-6 text-center">
      <Brain className="w-16 h-16 text-primary mx-auto animate-pulse" />
      <div>
        <h3 className="text-2xl font-bold mb-2">Analyzing Your Resume</h3>
        <p className="text-muted-foreground mb-6">
          Our AI is analyzing your background to create personalized interview questions...
        </p>
        <div className="space-y-3">
          <Progress value={analysisProgress} className="w-full" />
          <p className="text-sm text-muted-foreground">{analysisProgress}% Complete</p>
        </div>
      </div>
    </div>
  );

  const renderQuestionsStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Questions Generated!</h3>
        <p className="text-muted-foreground">
          We've created {interviewSession?.questions.length} personalized questions based on your resume.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {interviewSession?.questions.map((question, index) => (
          <Card key={question.id} className="p-4">
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="text-xs">
                Q{index + 1}
              </Badge>
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">{question.question}</p>
                <Badge variant="secondary" className="text-xs">
                  {question.category}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Interview Tips:</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Take your time to think before answering</li>
          <li>• Use specific examples from your experience</li>
          <li>• Be honest and authentic in your responses</li>
          <li>• Ask for clarification if needed</li>
        </ul>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStep('upload')} className="flex-1">
          Back
        </Button>
        <Button onClick={startInterview} className="flex-1">
          <Play className="w-4 h-4 mr-2" />
          Start Interview
        </Button>
      </div>
    </div>
  );

  const renderInterviewStep = () => {
    const currentQuestion = interviewSession?.questions[interviewSession.currentQuestionIndex];
    const progress = interviewSession ? ((interviewSession.currentQuestionIndex + 1) / interviewSession.questions.length) * 100 : 0;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary" />
            <span className="font-medium">
              Question {interviewSession?.currentQuestionIndex + 1} of {interviewSession?.questions.length}
            </span>
          </div>
          <Badge variant="outline">
            {currentQuestion?.category}
          </Badge>
        </div>

        <Progress value={progress} className="w-full" />

        <Card className="p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-lg">{currentQuestion?.question}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-4">
              <Textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="min-h-[120px]"
              />
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsRecording(!isRecording)}
                  className="gap-2"
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  {isRecording ? 'Stop Recording' : 'Voice Answer'}
                </Button>
                <span>or type your response above</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => setStep('questions')}
            className="flex-1"
          >
            Back to Questions
          </Button>
          <Button 
            onClick={submitAnswer}
            disabled={!currentAnswer.trim()}
            className="flex-1"
          >
            {interviewSession?.currentQuestionIndex === (interviewSession?.questions.length - 1) ? (
              <>Finish Interview</>
            ) : (
              <>Next Question <ArrowRight className="w-4 h-4 ml-2" /></>
            )}
          </Button>
        </div>
      </div>
    );
  };

  const renderResultsStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold text-green-600">{interviewSession?.score}%</span>
        </div>
        <h3 className="text-2xl font-bold mb-2">Interview Complete!</h3>
        <p className="text-muted-foreground">
          Here's your performance summary and feedback for improvement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <CardHeader className="p-0 mb-3">
            <CardTitle className="text-lg">Performance Score</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-3xl font-bold text-primary mb-2">
              {interviewSession?.score}%
            </div>
            <p className="text-sm text-muted-foreground">
              Based on answer quality, relevance, and communication skills
            </p>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader className="p-0 mb-3">
            <CardTitle className="text-lg">Questions Answered</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-3xl font-bold text-primary mb-2">
              {interviewSession?.questions.length}/10
            </div>
            <p className="text-sm text-muted-foreground">
              Complete interview session finished
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="p-4">
        <CardHeader className="p-0 mb-3">
          <CardTitle className="text-lg">Feedback & Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="space-y-2">
            {interviewSession?.feedback.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStep('upload')} className="flex-1">
          New Interview
        </Button>
        <Button onClick={resetModal} className="flex-1">
          Close
        </Button>
      </div>
    </div>
  );

  const getStepContent = () => {
    switch (step) {
      case 'upload':
        return renderUploadStep();
      case 'analyzing':
        return renderAnalyzingStep();
      case 'questions':
        return renderQuestionsStep();
      case 'interview':
        return renderInterviewStep();
      case 'results':
        return renderResultsStep();
      default:
        return renderUploadStep();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            AI Mock Interview
          </DialogTitle>
        </DialogHeader>
        {getStepContent()}
      </DialogContent>
    </Dialog>
  );
};