import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Upload, Brain, CheckCircle, AlertCircle, FileText } from 'lucide-react';

interface ResumeReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeReviewModal = ({ isOpen, onClose }: ResumeReviewModalProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    targetRole: '',
    experience: '',
    additionalInfo: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      toast({
        title: "Resume uploaded successfully",
        description: `${uploadedFile.name} is ready for AI analysis.`
      });
    }
  };

  const simulateAIAnalysis = () => {
    return {
      overallScore: 85,
      strengths: [
        "Strong technical skills in modern frameworks",
        "Clear career progression",
        "Quantified achievements",
        "Relevant certifications"
      ],
      improvements: [
        "Add more specific metrics to achievements",
        "Include keywords for ATS optimization",
        "Expand on leadership experiences",
        "Add relevant industry keywords"
      ],
      atsCompatibility: 92,
      recommendations: [
        "Tailor resume for specific job roles",
        "Include more action verbs",
        "Optimize for target company culture",
        "Add portfolio links for technical roles"
      ]
    };
  };

  const handleAnalyzeResume = async () => {
    if (!file) {
      toast({
        title: "No resume uploaded",
        description: "Please upload your resume first.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      const result = simulateAIAnalysis();
      setAnalysisResult(result);
      setIsAnalyzing(false);
      
      toast({
        title: "AI Analysis Complete",
        description: "Your resume has been analyzed by our AI system."
      });
    }, 3000);
  };

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.email || !file) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and upload your resume.",
        variant: "destructive"
      });
      return;
    }

    // Here you would normally send the data to your backend
    const submissionData = {
      ...formData,
      fileName: file.name,
      analysisResult,
      submittedAt: new Date().toISOString()
    };

    console.log('Resume submission:', submissionData);

    toast({
      title: "Resume submitted successfully",
      description: "Our team will review your resume and contact you within 24 hours."
    });

    onClose();
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      targetRole: '',
      experience: '',
      additionalInfo: ''
    });
    setFile(null);
    setAnalysisResult(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Brain className="w-6 h-6 mr-2 text-primary" />
            AI-Powered Resume Review
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8 mt-6">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="(123) 456-7890"
                />
              </div>

              <div>
                <Label htmlFor="targetRole">Target Role</Label>
                <Input
                  id="targetRole"
                  value={formData.targetRole}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetRole: e.target.value }))}
                  placeholder="e.g., Java Full Stack Developer"
                />
              </div>

              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                  placeholder="e.g., 5 years"
                />
              </div>

              <div>
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                  placeholder="Any specific requirements or additional information..."
                  rows={3}
                />
              </div>
            </div>

            {/* File Upload */}
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">Upload Your Resume</p>
                <p className="text-sm text-muted-foreground">
                  Drag and drop or click to browse (PDF, DOC, DOCX)
                </p>
                {file && (
                  <div className="mt-4 p-3 bg-secondary rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 mr-2 text-primary" />
                    <span className="text-sm font-medium">{file.name}</span>
                  </div>
                )}
              </label>
            </div>

            <Button 
              onClick={handleAnalyzeResume} 
              disabled={!file || isAnalyzing}
              className="w-full"
              variant="gradient"
            >
              {isAnalyzing ? (
                <>
                  <Brain className="w-4 h-4 mr-2 animate-pulse" />
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Analyze with AI
                </>
              )}
            </Button>
          </div>

          {/* Right Column - AI Analysis Results */}
          <div className="space-y-6">
            {analysisResult ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{analysisResult.overallScore}</span>
                  </div>
                  <h3 className="text-xl font-bold">Overall Score</h3>
                  <p className="text-muted-foreground">Your resume scored {analysisResult.overallScore}/100</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-600 flex items-center mb-2">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Strengths
                    </h4>
                    <ul className="space-y-1">
                      {analysisResult.strengths.map((strength: string, index: number) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-amber-600 flex items-center mb-2">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Areas for Improvement
                    </h4>
                    <ul className="space-y-1">
                      {analysisResult.improvements.map((improvement: string, index: number) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-secondary/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">ATS Compatibility</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Applicant Tracking System Score</span>
                      <span className="font-bold text-primary">{analysisResult.atsCompatibility}%</span>
                    </div>
                  </div>
                </div>

                <Button onClick={handleSubmit} className="w-full" variant="gradient">
                  Submit for Expert Review
                </Button>
              </div>
            ) : (
              <div className="text-center py-12">
                <Brain className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-bold mb-2">AI Analysis Ready</h3>
                <p className="text-muted-foreground">
                  Upload your resume and click "Analyze with AI" to get instant insights and recommendations.
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};