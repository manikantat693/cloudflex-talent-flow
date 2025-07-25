import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm CloudFlex AI Assistant. How can I help you today? I can answer questions about our services, job opportunities, or immigration support.",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('job') || message.includes('career') || message.includes('position')) {
      return "We have exciting opportunities in Java Development, DevOps, Data Science, Cloud Architecture, React Development, and Cybersecurity. Would you like me to show you our current openings or help you apply?";
    }
    
    if (message.includes('visa') || message.includes('immigration') || message.includes('h1b') || message.includes('green card')) {
      return "We provide comprehensive immigration support including H1B, L1, OPT, and Green Card processing. Our experienced team guides you through every step of the process. Would you like to know more about specific visa types?";
    }
    
    if (message.includes('resume') || message.includes('cv')) {
      return "Our resume optimization service helps enhance your profile to maximize interview opportunities. We review your resume and provide personalized recommendations. Would you like to submit your resume for review?";
    }
    
    if (message.includes('apply') || message.includes('application')) {
      return "You can apply for our current job openings through our careers section. Simply click on any position that interests you and submit your application. We'll review it within 24-48 hours.";
    }
    
    if (message.includes('contact') || message.includes('phone') || message.includes('email')) {
      return "You can reach us at:\n📞 Phone: 336-281-2871\n📧 Email: admin@cloudflexit.com\n📧 HR: hr@cloudflexit.com\n📍 Address: 10926 David Taylor Dr., Ste 120 PMB369, Charlotte, NC 28262";
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! Welcome to CloudFlex IT Solutions. I'm here to help you with information about our services, job opportunities, and immigration support. What would you like to know?";
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
      return "You're welcome! I'm always here to help. If you have any other questions about our services or opportunities, feel free to ask!";
    }
    
    if (message.includes('service') || message.includes('what do you do')) {
      return "CloudFlex IT Solutions specializes in:\n• Talent Acquisition & Placement\n• Resume Review & Optimization\n• Immigration Support (H1B, L1, OPT, Green Card)\n• Career Counseling\n• Interview Preparation\n\nHow can we help advance your career?";
    }
    
    return "I understand you're interested in learning more. For detailed information about our services or specific questions, I'd recommend contacting our team directly at admin@cloudflexit.com or 336-281-2871. Is there anything specific about our job opportunities or immigration services I can help with?";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          variant="gradient"
          size="lg"
          className="rounded-full w-16 h-16 shadow-lg hover:shadow-[var(--shadow-glow)] animate-pulse-slow"
        >
          <MessageCircle className="w-8 h-8" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <Card className="h-[500px] flex flex-col shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-gradient-to-r from-primary to-accent rounded-t-2xl">
          <CardTitle className="text-lg font-semibold text-primary-foreground">
            CloudFlex AI Assistant
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-primary-foreground hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.isBot ? 'justify-start' : 'justify-end'
                }`}
              >
                {message.isBot && (
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isBot
                      ? 'bg-muted text-foreground'
                      : 'bg-gradient-to-r from-primary to-accent text-primary-foreground'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </div>

                {!message.isBot && (
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="bg-muted p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                variant="gradient"
                size="icon"
                disabled={!inputText.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};