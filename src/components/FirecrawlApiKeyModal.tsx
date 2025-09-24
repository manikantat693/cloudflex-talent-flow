import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { FirecrawlService } from '@/utils/FirecrawlService';
import { Key, ExternalLink, CheckCircle2 } from 'lucide-react';

interface FirecrawlApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const FirecrawlApiKeyModal = ({ isOpen, onClose, onSuccess }: FirecrawlApiKeyModalProps) => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter your Firecrawl API key",
        variant: "destructive"
      });
      return;
    }

    setIsValidating(true);
    try {
      const isValid = await FirecrawlService.testApiKey(apiKey);
      
      if (isValid) {
        FirecrawlService.saveApiKey(apiKey);
        toast({
          title: "Success!",
          description: "Firecrawl API key configured successfully"
        });
        onSuccess();
        onClose();
      } else {
        toast({
          title: "Invalid API Key",
          description: "Please check your API key and try again",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to validate API key",
        variant: "destructive"
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleFetchNews = async () => {
    setIsLoading(true);
    try {
      const result = await FirecrawlService.fetchUSCISNews();
      
      if (result.success) {
        toast({
          title: "Success!",
          description: `Fetched ${result.news?.length || 0} news articles from USCIS`
        });
        
        // Trigger news update event
        window.dispatchEvent(new CustomEvent('newsUpdated', { 
          detail: { news: result.news } 
        }));
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to fetch news",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch USCIS news",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const hasApiKey = !!FirecrawlService.getApiKey();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            Configure Firecrawl API
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Alert>
            <CheckCircle2 className="w-4 h-4" />
            <AlertDescription>
              Firecrawl API enables automated news fetching from USCIS. Get your free API key from{' '}
              <a 
                href="https://firecrawl.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                firecrawl.dev <ExternalLink className="w-3 h-3" />
              </a>
            </AlertDescription>
          </Alert>

          {!hasApiKey ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">Firecrawl API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="fc-..."
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isValidating}
              >
                {isValidating ? "Validating..." : "Save API Key"}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <Alert>
                <CheckCircle2 className="w-4 h-4" />
                <AlertDescription>
                  API key is configured! You can now fetch live USCIS news.
                </AlertDescription>
              </Alert>
              
              <Button 
                onClick={handleFetchNews}
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Fetching News..." : "Fetch Latest USCIS News"}
              </Button>
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            <strong>Daily Auto-Update:</strong> News will be automatically fetched each morning when users visit the site.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};