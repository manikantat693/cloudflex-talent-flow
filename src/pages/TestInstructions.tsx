import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, CheckCircle, AlertCircle, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TestInstructions() {
  const navigate = useNavigate();

  const sampleResumeContent = `John Doe
Software Engineer

EXPERIENCE:
- Senior Software Engineer at TechCorp (2020-2023)
- Full-stack development using React, Node.js, and MongoDB
- Led team of 5 developers on e-commerce platform
- Implemented CI/CD pipelines and reduced deployment time by 40%

SKILLS:
- JavaScript, TypeScript, React, Node.js
- Python, Java, SQL, MongoDB
- AWS, Docker, Kubernetes
- Git, Agile methodologies

EDUCATION:
- Bachelor's in Computer Science, State University (2018)

PROJECTS:
- E-commerce Platform: Built scalable online store using MERN stack
- Real-time Chat App: Developed using WebSocket and Redis
- Machine Learning Model: Created recommendation system using Python`;

  const downloadSampleResume = () => {
    const element = document.createElement('a');
    const file = new Blob([sampleResumeContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'sample-resume.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div>
            <h1 className="text-3xl font-bold">How to Test AI Mock Interview</h1>
            <p className="text-muted-foreground">Step-by-step testing guide for the mock interview feature</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Quick Start */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Play className="w-5 h-5 mr-2 text-green-600" />
                Quick Start Testing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={downloadSampleResume} className="flex-1">
                  <FileText className="w-4 h-4 mr-2" />
                  Download Sample Resume
                </Button>
                <Button variant="outline" onClick={() => navigate('/mock-interview')} className="flex-1">
                  <Play className="w-4 h-4 mr-2" />
                  Start Mock Interview
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Download the sample resume file and upload it to the mock interview to see the AI analysis in action.
              </p>
            </CardContent>
          </Card>

          {/* Testing Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Testing Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold">Navigate to Mock Interview</h3>
                    <p className="text-muted-foreground">Go to the homepage and click "AI Mock Interview" button or visit <code>/mock-interview</code></p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold">Upload Resume</h3>
                    <p className="text-muted-foreground">Use the sample resume file or create your own text/PDF file with relevant experience and skills</p>
                    <Badge variant="secondary" className="mt-2">Accepts: PDF, TXT, DOC, DOCX</Badge>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Analysis</h3>
                    <p className="text-muted-foreground">Watch the AI analyze your resume and generate a score breakdown</p>
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                      <Badge variant="outline">Skills Score</Badge>
                      <Badge variant="outline">Experience Score</Badge>
                      <Badge variant="outline">Format Score</Badge>
                      <Badge variant="outline">Keywords Score</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold">Answer Questions</h3>
                    <p className="text-muted-foreground">Complete the 10 personalized interview questions based on your resume</p>
                    <Badge variant="secondary" className="mt-2">10 Questions Total</Badge>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold">Review Results</h3>
                    <p className="text-muted-foreground">Get your overall interview score and detailed feedback for each answer</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features to Test */}
          <Card>
            <CardHeader>
              <CardTitle>Key Features to Test</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    <span className="text-sm">Resume upload functionality</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    <span className="text-sm">AI skill extraction</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    <span className="text-sm">Experience level detection</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    <span className="text-sm">Resume scoring system</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    <span className="text-sm">Personalized question generation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    <span className="text-sm">Progress tracking</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    <span className="text-sm">Answer scoring</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    <span className="text-sm">Detailed feedback report</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expected Results */}
          <Card>
            <CardHeader>
              <CardTitle>Expected Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                    <span className="font-semibold text-green-800">Resume Analysis</span>
                  </div>
                  <p className="text-green-700 text-sm">
                    The AI should extract skills like "React", "Node.js", "JavaScript" and identify experience level as "senior" from the sample resume.
                    Resume score should be around 75-85% overall.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="font-semibold text-blue-800">Question Generation</span>
                  </div>
                  <p className="text-blue-700 text-sm">
                    Questions should be personalized based on detected skills. Expect questions about React, leadership experience, 
                    and technical challenges for the sample resume.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-5 h-5 mr-2 text-purple-600" />
                    <span className="font-semibold text-purple-800">Scoring System</span>
                  </div>
                  <p className="text-purple-700 text-sm">
                    Answer scores are based on length and content. Longer, more detailed answers typically receive higher scores (70-90%).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Troubleshooting */}
          <Card>
            <CardHeader>
              <CardTitle>Troubleshooting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <p className="font-medium">File Upload Issues</p>
                    <p className="text-sm text-muted-foreground">Ensure file is under 5MB and in supported format (PDF, TXT, DOC, DOCX)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <p className="font-medium">AI Analysis Fallback</p>
                    <p className="text-sm text-muted-foreground">If AI processing fails, the system uses fallback questions and demonstrates the scoring system</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <p className="font-medium">PDF Processing</p>
                    <p className="text-sm text-muted-foreground">PDF parsing is simulated for demo purposes. In production, integrate a PDF parser library</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}