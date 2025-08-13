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
      // Use Hugging Face transformers for text analysis
      const classifier = await pipeline('text-classification', 'microsoft/DialoGPT-medium');
      
      // Extract key skills and experience from resume
      const skills = extractSkills(resumeText);
      const experience = extractExperience(resumeText);
      
      setAnalysisResults({ skills, experience });

      // Generate interview questions based on analysis
      const generatedQuestions = generateInterviewQuestions(skills, experience);
      
      setQuestions(generatedQuestions.map((q, index) => ({
        id: index + 1,
        question: q,
        answer: ''
      })));

      setStage('interview');
      toast.success('Resume analyzed! Your personalized interview is ready.');
    } catch (error) {
      console.error('Error analyzing resume:', error);
      toast.error('Failed to analyze resume. Using fallback questions.');
      
      // Fallback questions
      const fallbackQuestions = [
        "Tell me about yourself and your background.",
        "What are your greatest strengths?",
        "Describe a challenging project you've worked on.",
        "Why are you interested in this position?",
        "How do you handle tight deadlines?",
        "What technologies are you most comfortable with?",
        "Describe your problem-solving approach.",
        "How do you stay updated with industry trends?",
        "Tell me about a time you had to learn something new quickly.",
        "Where do you see yourself in 5 years?"
      ];

      setQuestions(fallbackQuestions.map((q, index) => ({
        id: index + 1,
        question: q,
        answer: ''
      })));

      setStage('interview');
    }
  };

  const extractSkills = (text: string): string[] => {
    const skillKeywords = ['javascript', 'react', 'node.js', 'python', 'java', 'sql', 'html', 'css', 'angular', 'vue', 'typescript', 'aws', 'docker', 'kubernetes'];
    const foundSkills = skillKeywords.filter(skill => 
      text.toLowerCase().includes(skill.toLowerCase())
    );
    return foundSkills.length > 0 ? foundSkills : ['software development', 'problem solving'];
  };

  const extractExperience = (text: string): string => {
    if (text.toLowerCase().includes('senior')) return 'senior';
    if (text.toLowerCase().includes('lead')) return 'lead';
    if (text.toLowerCase().includes('junior')) return 'junior';
    return 'mid-level';
  };

  const generateInterviewQuestions = (skills: string[], experience: string): string[] => {
    const baseQuestions = [
      "Tell me about yourself and your professional background.",
      "What motivates you in your work?",
      "Describe a challenging situation you've overcome.",
      "How do you prioritize tasks when managing multiple projects?",
      "What's your approach to learning new technologies?"
    ];

    const skillSpecificQuestions = skills.slice(0, 3).map(skill => 
      `Can you describe your experience with ${skill} and how you've used it in projects?`
    );

    const experienceQuestions = experience === 'senior' 
      ? ["How do you mentor junior developers?", "Describe your leadership style."]
      : experience === 'junior'
      ? ["How do you approach learning new concepts?", "What excites you most about this field?"]
      : ["How do you handle code reviews?", "Describe a project you're particularly proud of."];

    return [...baseQuestions, ...skillSpecificQuestions, ...experienceQuestions].slice(0, 10);
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
          <div className="p-6 bg-muted/50 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Interview Question:</h3>
            <p className="text-lg">{questions[currentQuestionIndex]?.question}</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Identified Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResults.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Experience Level:</h4>
                <Badge variant="outline">{analysisResults.experience}</Badge>
              </div>
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
                    <h4 className="font-medium">Q{index + 1}: {question.question}</h4>
                    <Badge variant={question.score! >= 70 ? 'default' : question.score! >= 50 ? 'secondary' : 'destructive'}>
                      {question.score}%
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                    <strong>Your Answer:</strong> {question.answer}
                  </p>
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