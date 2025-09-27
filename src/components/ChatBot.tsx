import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { 
  COMPANY_INFO, 
  SERVICES, 
  CURRENT_JOBS, 
  CONTACT_INFO, 
  FAQ_DATA, 
  IMMIGRATION_INFO 
} from '@/utils/ChatBotKnowledge';

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
    
    // Company and About queries
    if (message.includes('about') || message.includes('company') || message.includes('who are you')) {
      return `${COMPANY_INFO.name} is ${COMPANY_INFO.tagline.toLowerCase()}. Founded in ${COMPANY_INFO.founded}, our mission is to ${COMPANY_INFO.mission.toLowerCase()}\n\nWe specialize in:\n${COMPANY_INFO.specialties.map(s => `• ${s}`).join('\n')}\n\nWould you like to know more about any specific service?`;
    }

    // Job-related queries
    if (message.includes('job') || message.includes('career') || message.includes('position') || message.includes('opening')) {
      if (message.includes('java')) {
        const javaJob = CURRENT_JOBS.find(job => job.title.toLowerCase().includes('java'));
        return `We have a ${javaJob?.title} position (${javaJob?.level})!\n\nKey requirements:\n${javaJob?.requirements.map(r => `• ${r}`).join('\n')}\n\nRequired skills: ${javaJob?.skills.join(', ')}\n\nInterested? I can help you apply!`;
      }
      if (message.includes('devops')) {
        const devopsJob = CURRENT_JOBS.find(job => job.title.toLowerCase().includes('devops'));
        return `Great! We have a ${devopsJob?.title} role (${devopsJob?.level}).\n\nRequirements:\n${devopsJob?.requirements.map(r => `• ${r}`).join('\n')}\n\nSkills needed: ${devopsJob?.skills.join(', ')}\n\nShall I connect you with our recruitment team?`;
      }
      if (message.includes('react') || message.includes('frontend')) {
        const reactJob = CURRENT_JOBS.find(job => job.title.toLowerCase().includes('react'));
        return `Perfect! We have a ${reactJob?.title} position (${reactJob?.level}).\n\nWhat we're looking for:\n${reactJob?.requirements.map(r => `• ${r}`).join('\n')}\n\nTech stack: ${reactJob?.skills.join(', ')}\n\nReady to apply?`;
      }
      
      return `We have exciting opportunities across multiple roles:\n\n${CURRENT_JOBS.map(job => `🔹 ${job.title} (${job.level})`).join('\n')}\n\nWhich position interests you most? I can provide detailed information about requirements and application process.`;
    }

    // Immigration and visa queries
    if (message.includes('visa') || message.includes('immigration') || message.includes('h1b') || message.includes('green card') || message.includes('opt')) {
      if (message.includes('h1b')) {
        const h1bInfo = IMMIGRATION_INFO.visaTypes.find(v => v.type === 'H1B');
        return `H1B Visa Information:\n${h1bInfo?.description}\nDuration: ${h1bInfo?.duration}\n\nOur H1B services include:\n• Petition preparation and filing\n• Documentation support\n• Status updates throughout process\n• Renewal assistance\n\nWe have a high success rate! Would you like to schedule a consultation?`;
      }
      if (message.includes('green card')) {
        const gcInfo = IMMIGRATION_INFO.visaTypes.find(v => v.type === 'Green Card');
        return `Green Card Process:\n${gcInfo?.description}\nStatus: ${gcInfo?.duration}\n\nOur process:\n${IMMIGRATION_INFO.process.map(p => `• ${p}`).join('\n')}\n\nProcessing times vary by country and category. Want to discuss your specific situation?`;
      }
      
      return `We provide comprehensive immigration support:\n\n${IMMIGRATION_INFO.visaTypes.map(v => `🔹 ${v.type}: ${v.description}`).join('\n')}\n\nOur expert team guides you through every step. Which visa type interests you?`;
    }

    // Resume and career services
    if (message.includes('resume') || message.includes('cv')) {
      const resumeService = SERVICES.find(s => s.name.toLowerCase().includes('resume'));
      return `Our Resume Optimization Service includes:\n\n${resumeService?.features.map(f => `• ${f}`).join('\n')}\n\nBenefits you'll get:\n${resumeService?.benefits.map(b => `• ${b}`).join('\n')}\n\nReady to optimize your resume for better opportunities?`;
    }

    // Application process
    if (message.includes('apply') || message.includes('application') || message.includes('how to apply')) {
      return `Here's how to apply:\n\n1. Browse our current opportunities in the jobs section\n2. Click on positions that match your skills\n3. Submit your resume and cover letter\n4. We review applications within 24-48 hours\n5. Qualified candidates receive interview scheduling\n\n💡 Tip: Our job placement services are completely FREE for candidates!\n\nNeed help finding the right position?`;
    }

    // Contact information
    if (message.includes('contact') || message.includes('phone') || message.includes('email') || message.includes('address')) {
      return `Contact CloudFlex IT Solutions:\n\n📞 Phone: ${CONTACT_INFO.phone}\n📧 General: ${CONTACT_INFO.email}\n📧 HR: ${CONTACT_INFO.hrEmail}\n📍 Address: ${CONTACT_INFO.address}\n🌐 Website: ${CONTACT_INFO.website}\n⏰ Hours: ${CONTACT_INFO.hours}`;
    }

    // Services overview
    if (message.includes('service') || message.includes('what do you do') || message.includes('help')) {
      return `${COMPANY_INFO.name} offers comprehensive IT solutions:\n\n${SERVICES.map(s => `🔹 ${s.name}\n   ${s.description}`).join('\n\n')}\n\nWhich service interests you most?`;
    }

    // Pricing and fees
    if (message.includes('cost') || message.includes('price') || message.includes('fee') || message.includes('charge')) {
      return `Great news! Our job placement services are completely FREE for candidates. We're paid by our client companies when we successfully place qualified professionals.\n\nOur other services have competitive rates:\n• Resume optimization: Contact for pricing\n• Immigration services: Varies by case complexity\n• Career counseling: Contact for details\n\nWant to discuss specific pricing for your needs?`;
    }

    // FAQ responses
    if (message.includes('remote') || message.includes('work from home')) {
      const faq = FAQ_DATA.find(f => f.question.toLowerCase().includes('remote'));
      return faq?.answer || "Yes, we offer both remote and on-site positions with flexible work arrangements!";
    }

    // Industries
    if (message.includes('industry') || message.includes('industries')) {
      return `We serve diverse industries needing IT talent:\n\n🔹 Technology & Software\n🔹 Healthcare & Life Sciences\n🔹 Financial Services\n🔹 Retail & E-commerce\n🔹 Manufacturing\n🔹 Government & Public Sector\n🔹 Consulting\n🔹 Startups & Scale-ups\n\nWhich industry interests you most?`;
    }

    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return `Hello! Welcome to ${COMPANY_INFO.name}. I'm your AI assistant, here to help with:\n\n• Job opportunities and applications\n• Immigration and visa support\n• Resume optimization\n• Career guidance\n• Company information\n\nWhat would you like to know?`;
    }

    // Thanks
    if (message.includes('thank') || message.includes('thanks')) {
      return "You're very welcome! I'm always here to help you advance your career. Feel free to ask about our services, job opportunities, or immigration support anytime! 😊";
    }

    // Default response with helpful suggestions
    return `I'd be happy to help! Here are some things I can assist with:\n\n• 💼 Current job openings and application process\n• 🛂 Immigration and visa information\n• 📄 Resume optimization services\n• 🏢 Company information and services\n• 📞 Contact details and consultation scheduling\n\nWhat would you like to know more about? Or contact us directly at ${CONTACT_INFO.email} for personalized assistance.`;
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
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
        <div className="bg-white text-primary px-4 py-2 rounded-lg shadow-lg mb-2 text-sm font-medium border border-primary/20">
          Ask me anything!
        </div>
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 shadow-lg hover:shadow-[var(--shadow-glow)] animate-pulse-slow bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0"
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