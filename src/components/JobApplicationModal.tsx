import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, CheckCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Job {
  id: string;
  title: string;
  company: string;
}

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
}

export const JobApplicationModal = ({ isOpen, onClose, job }: JobApplicationModalProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    currentLocation: '',
    visaStatus: '',
    expectedSalary: '',
    availableDate: '',
    linkedinUrl: '',
    coverLetter: ''
  });
  
  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document.",
          variant: "destructive"
        });
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive"
        });
        return;
      }

      setResume(file);
    }
  };

  const removeResume = () => {
    setResume(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create application data
      const applicationData = {
        ...formData,
        jobTitle: job?.title || 'General Application',
        jobCompany: job?.company || 'Various',
        resumeFileName: resume?.name || 'No resume uploaded',
        submittedAt: new Date().toISOString()
      };

      console.log('Application submitted:', applicationData);

      toast({
        title: "Application submitted successfully!",
        description: "We'll review your application and get back to you within 24-48 hours.",
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        experience: '',
        currentLocation: '',
        visaStatus: '',
        expectedSalary: '',
        availableDate: '',
        linkedinUrl: '',
        coverLetter: ''
      });
      setResume(null);
      onClose();
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient">
            {job ? `Apply for ${job.title}` : 'Submit Your Resume'}
          </DialogTitle>
          <DialogDescription>
            {job ? `Position at ${job.company}` : 'Let us match you with the perfect opportunity'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
                className="mt-1"
              />
            </div>
          </div>

          {/* Professional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="experience">Years of Experience *</Label>
              <Select onValueChange={(value) => handleInputChange('experience', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">0-1 years</SelectItem>
                  <SelectItem value="2-3">2-3 years</SelectItem>
                  <SelectItem value="4-5">4-5 years</SelectItem>
                  <SelectItem value="6-8">6-8 years</SelectItem>
                  <SelectItem value="9-12">9-12 years</SelectItem>
                  <SelectItem value="12+">12+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="currentLocation">Current Location *</Label>
              <Input
                id="currentLocation"
                value={formData.currentLocation}
                onChange={(e) => handleInputChange('currentLocation', e.target.value)}
                required
                className="mt-1"
                placeholder="City, State"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="visaStatus">Visa Status *</Label>
              <Select onValueChange={(value) => handleInputChange('visaStatus', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select visa status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US Citizen">US Citizen</SelectItem>
                  <SelectItem value="Green Card">Green Card</SelectItem>
                  <SelectItem value="H1B">H1B</SelectItem>
                  <SelectItem value="L1">L1</SelectItem>
                  <SelectItem value="OPT">OPT</SelectItem>
                  <SelectItem value="F1">F1</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="expectedSalary">Expected Salary</Label>
              <Input
                id="expectedSalary"
                value={formData.expectedSalary}
                onChange={(e) => handleInputChange('expectedSalary', e.target.value)}
                className="mt-1"
                placeholder="e.g., $100,000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="availableDate">Available Start Date</Label>
              <Input
                id="availableDate"
                type="date"
                value={formData.availableDate}
                onChange={(e) => handleInputChange('availableDate', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
              <Input
                id="linkedinUrl"
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                className="mt-1"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
          </div>

          {/* Resume Upload */}
          <div>
            <Label>Resume Upload *</Label>
            <div className="mt-2">
              {!resume ? (
                <div 
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Click to upload your resume
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF, DOC, or DOCX (max 5MB)
                  </p>
                </div>
              ) : (
                <div className="border border-border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-primary" />
                    <div>
                      <p className="font-medium">{resume.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(resume.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={removeResume}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <Label htmlFor="coverLetter">Cover Letter / Additional Information</Label>
            <Textarea
              id="coverLetter"
              value={formData.coverLetter}
              onChange={(e) => handleInputChange('coverLetter', e.target.value)}
              className="mt-1 min-h-[100px]"
              placeholder="Tell us why you're interested in this position..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gradient"
              disabled={isSubmitting || !resume}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Submit Application
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};