import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Key, ExternalLink, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { NewsService } from '@/utils/FirecrawlService';

interface FirecrawlSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApiKeySet: () => void;
}

export const FirecrawlSetupModal = ({ isOpen, onClose, onApiKeySet }: FirecrawlSetupModalProps) => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('');
  const [isTestingKey, setIsTestingKey] = useState(false);
  const [keyStatus, setKeyStatus] = useState<'none' | 'testing' | 'valid' | 'invalid'>('none');

  const testApiKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter your Firecrawl API key",
        variant: "destructive",
      });
      return;
    }

    setIsTestingKey(true);
    setKeyStatus('testing');

    try {
      const isValid = await NewsService.testApiKey(apiKey.trim());
      
      if (isValid) {
        setKeyStatus('valid');
        NewsService.saveApiKey(apiKey.trim());
        toast({
          title: "Success",
          description: "Firecrawl API key is valid and has been saved!",
        });
        onApiKeySet();
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setKeyStatus('invalid');
        toast({
          title: "Invalid API Key",
          description: "The API key you entered is not valid. Please check and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setKeyStatus('invalid');
      toast({
        title: "Error",
        description: "Failed to test the API key. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTestingKey(false);
    }
  };

  const handleSkip = () => {
    toast({
      title: "Using Mock Data",
      description: "You can set up Firecrawl later to enable real-time USCIS news scraping.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Key className="w-6 h-6" />
            Set Up Real-Time USCIS News Scraping
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Why Set Up Firecrawl?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Real-Time USCIS News</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically scrape the latest immigration news from USCIS.gov daily
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">AI-Powered Processing</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically categorize and prioritize news items with AI analysis
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Always Up-to-Date</p>
                  <p className="text-sm text-muted-foreground">
                    Never miss important immigration policy changes or updates
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Get Your Firecrawl API Key</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <div className="text-sm">
                  <p className="font-medium">1. Visit firecrawl.dev</p>
                  <p className="text-muted-foreground">Sign up for a free account</p>
                </div>
                <Button variant="outline" size="sm" asChild className="ml-auto">
                  <a href="https://firecrawl.dev" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Open
                  </a>
                </Button>
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <div className="text-sm">
                  <p className="font-medium">2. Get your API key</p>
                  <p className="text-muted-foreground">From your dashboard, copy your API key</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <div className="text-sm">
                  <p className="font-medium">3. Paste it below</p>
                  <p className="text-muted-foreground">We'll test it and save it securely</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">Firecrawl API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setKeyStatus('none');
                }}
                placeholder="fc-..."
                className="font-mono"
              />
            </div>

            {keyStatus !== 'none' && (
              <div className="flex items-center gap-2">
                {keyStatus === 'testing' && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Testing API key...</span>
                  </>
                )}
                {keyStatus === 'valid' && (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-700">API key is valid!</span>
                  </>
                )}
                {keyStatus === 'invalid' && (
                  <>
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-700">Invalid API key</span>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={testApiKey}
              disabled={isTestingKey || !apiKey.trim()}
              className="flex-1"
            >
              {isTestingKey ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <Key className="w-4 h-4 mr-2" />
                  Test & Save API Key
                </>
              )}
            </Button>
            
            <Button variant="outline" onClick={handleSkip}>
              Skip for Now
            </Button>
          </div>

          <div className="text-center">
            <Badge variant="secondary" className="text-xs">
              Your API key is stored locally and never shared
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};