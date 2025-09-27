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
  IMMIGRATION_INFO,
  TECHNICAL_CAPABILITIES,
  PRICING_TIERS,
  DELIVERY_PROCESS
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
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Company and About queries
    if (message.includes('what is cloudflex') || message.includes('about cloudflex') || message.includes('company info')) {
      return `${COMPANY_INFO.name} is ${COMPANY_INFO.tagline.toLowerCase()}.\n\nWe're an IT consulting and software development company that builds AI-powered apps, automates workflows, and provides skilled IT staffing.\n\n🏢 Industries: ${COMPANY_INFO.industries.join(', ')}\n📍 Based in the ${COMPANY_INFO.location}, serving clients worldwide\n🎯 Founded: ${COMPANY_INFO.founded}\n\n👉 Want to see our full list of services? Just ask about our services!`;
    }

    // Location and contact queries
    if (message.includes('where are you based') || message.includes('location') || message.includes('based')) {
      return `CloudFlex is based in the ${COMPANY_INFO.location}, serving clients worldwide.\n\nWe work with both U.S. and global teams for delivery.\n\n📧 ${CONTACT_INFO.email}\n📞 ${CONTACT_INFO.phone}\n🌐 ${CONTACT_INFO.website}\n\n👉 Would you like to book a call to discuss your location needs?`;
    }

    // Services overview
    if (message.includes('what services') || message.includes('services you provide') || message.includes('what do you do')) {
      return `We provide comprehensive IT solutions:\n\n${SERVICES.map(s => `🔹 ${s.name}\n   ${s.description}`).join('\n\n')}\n\n👉 Which service interests you most? I can provide detailed information!`;
    }

    // Custom App Development
    if (message.includes('app development') || message.includes('custom app') || message.includes('java') || message.includes('spring boot') || message.includes('react') || message.includes('vue')) {
      const appService = SERVICES.find(s => s.name.includes('Custom App'));
      return `🚀 Custom App Development:\n\n${appService?.description}\n\nTechnologies we use:\n${appService?.features.map(f => `• ${f}`).join('\n')}\n\nBenefits:\n${appService?.benefits.map(b => `• ${b}`).join('\n')}\n\n👉 Ready to discuss your project? Let's connect!`;
    }

    // AI & Automation
    if (message.includes('ai') || message.includes('chatbot') || message.includes('automation') || message.includes('artificial intelligence')) {
      const aiService = SERVICES.find(s => s.name.includes('AI &'));
      return `🤖 AI & Automation Solutions:\n\n${aiService?.description}\n\nWhat we offer:\n${aiService?.features.map(f => `• ${f}`).join('\n')}\n\nBusiness impact:\n${aiService?.benefits.map(b => `• ${b}`).join('\n')}\n\n👉 Want a free demo of our AI chatbot capabilities?`;
    }

    // Cloud & DevOps
    if (message.includes('cloud') || message.includes('devops') || message.includes('kubernetes') || message.includes('ci/cd')) {
      const cloudService = SERVICES.find(s => s.name.includes('Cloud &'));
      return `☁️ Cloud & DevOps Services:\n\n${cloudService?.description}\n\nOur capabilities:\n${cloudService?.features.map(f => `• ${f}`).join('\n')}\n\nResults you get:\n${cloudService?.benefits.map(b => `• ${b}`).join('\n')}\n\n👉 Want to discuss your cloud migration strategy?`;
    }

    // Data & Analytics
    if (message.includes('data') || message.includes('analytics') || message.includes('dashboard') || message.includes('business intelligence')) {
      const dataService = SERVICES.find(s => s.name.includes('Data &'));
      return `📊 Data & Analytics Solutions:\n\n${dataService?.description}\n\nWe provide:\n${dataService?.features.map(f => `• ${f}`).join('\n')}\n\nBusiness value:\n${dataService?.benefits.map(b => `• ${b}`).join('\n')}\n\n👉 Ready to turn your data into insights?`;
    }

    // Staffing Services
    if (message.includes('staffing') || message.includes('engineers') || message.includes('hiring') || message.includes('talent')) {
      const staffingService = SERVICES.find(s => s.name.includes('Staffing'));
      return `👥 IT Talent Staffing:\n\n${staffingService?.description}\n\nOur process:\n${staffingService?.features.map(f => `• ${f}`).join('\n')}\n\nWhy choose us:\n${staffingService?.benefits.map(b => `• ${b}`).join('\n')}\n\n💡 ${staffingService?.pricing}\n\n👉 Want staffing profiles today?`;
    }

    // Technical capabilities - scalability
    if (message.includes('scalability') || message.includes('uptime') || message.includes('performance')) {
      const scalability = TECHNICAL_CAPABILITIES.find(t => t.area.includes('Scalability'));
      return `🚀 Scalability & Uptime Excellence:\n\n${scalability?.description}\n\nTechnologies:\n${scalability?.technologies.map(t => `• ${t}`).join('\n')}\n\nOutcomes:\n${scalability?.outcomes.map(o => `• ${o}`).join('\n')}\n\n👉 Want a sample architecture diagram?`;
    }

    // Legacy migration
    if (message.includes('legacy') || message.includes('migration') || message.includes('modernization')) {
      const migration = TECHNICAL_CAPABILITIES.find(t => t.area.includes('Legacy'));
      return `🔄 Legacy App Migration:\n\n${migration?.description}\n\nWe work with:\n${migration?.technologies.map(t => `• ${t}`).join('\n')}\n\nResults:\n${migration?.outcomes.map(o => `• ${o}`).join('\n')}\n\n👉 Need a migration checklist for your project?`;
    }

    // Security & Compliance
    if (message.includes('security') || message.includes('compliance') || message.includes('hipaa') || message.includes('gdpr') || message.includes('soc2')) {
      const security = TECHNICAL_CAPABILITIES.find(t => t.area.includes('Security'));
      return `🔒 Security & Compliance:\n\n${security?.description}\n\nCompliance frameworks:\n${security?.technologies.map(t => `• ${t}`).join('\n')}\n\nBenefits:\n${security?.outcomes.map(o => `• ${o}`).join('\n')}\n\n👉 Want a compliance overview for your industry?`;
    }

    // AI Integration deep dive
    if (message.includes('ai integration') || message.includes('enterprise ai') || message.includes('rag')) {
      const aiIntegration = TECHNICAL_CAPABILITIES.find(t => t.area.includes('AI Integration'));
      return `🧠 Enterprise AI Integration:\n\n${aiIntegration?.description}\n\nTechnologies:\n${aiIntegration?.technologies.map(t => `• ${t}`).join('\n')}\n\nBusiness outcomes:\n${aiIntegration?.outcomes.map(o => `• ${o}`).join('\n')}\n\n👉 Want to see a fintech AI case study?`;
    }

    // Pricing queries
    if (message.includes('pricing') || message.includes('cost') || message.includes('price') || message.includes('tier')) {
      return `💰 Our Pricing Tiers:\n\n🟢 ${PRICING_TIERS.starter.name}: ${PRICING_TIERS.starter.description}\n   ${PRICING_TIERS.starter.features.join(' • ')}\n\n🟡 ${PRICING_TIERS.growth.name}: ${PRICING_TIERS.growth.description}\n   ${PRICING_TIERS.growth.features.join(' • ')}\n\n🔵 ${PRICING_TIERS.enterprise.name}: ${PRICING_TIERS.enterprise.description}\n   ${PRICING_TIERS.enterprise.features.join(' • ')}\n\n👉 For exact quotes based on your needs, let's connect!`;
    }

    // Outcome-based pricing
    if (message.includes('outcome') || message.includes('outcome-based pricing')) {
      return `📈 Outcome-Based Pricing:\n\nYes! For certain projects we tie pricing to outcomes like:\n• Cost savings achieved\n• Performance targets met\n• Delivery milestones reached\n\nThis ensures our success is directly tied to your business results.\n\n👉 Interested in an outcome-based pilot project?`;
    }

    // Delivery process
    if (message.includes('process') || message.includes('delivery') || message.includes('timeline') || message.includes('methodology')) {
      return `⚡ Our Delivery Process:\n\n${DELIVERY_PROCESS.map((phase, index) => `${index + 1}. **${phase.phase}**\n   ${phase.description}\n   Deliverables: ${phase.deliverables.join(', ')}`).join('\n\n')}\n\n👉 Want a sample project timeline for your specific needs?`;
    }

    // Free consultation
    if (message.includes('consultation') || message.includes('free') || message.includes('demo')) {
      return `🆓 Free Consultation:\n\nYes! Initial consultations are completely free. We use them to:\n• Map your goals and requirements\n• Identify pain points and opportunities\n• Propose quick wins and solutions\n• Provide expert recommendations\n\n⏰ No commitment required - just valuable insights!\n\n👉 Ready to book your free session?`;
    }

    // Zero downtime CI/CD
    if (message.includes('zero downtime') || message.includes('deployment') || (message.includes('ci') && message.includes('cd'))) {
      return `🚀 Zero Downtime CI/CD:\n\nOur deployment strategy includes:\n• Blue/green deployments for seamless switching\n• Canary deployments for gradual rollouts\n• Automated rollback if issues are detected\n• Full observability with real-time alerts\n• Infrastructure as Code for consistency\n\n✅ Result: Zero-downtime deployments with confidence\n\n👉 Want to discuss your current CI/CD pipeline?`;
    }

    // Engineer qualification
    if (message.includes('qualify engineers') || message.includes('screening') || message.includes('how do you qualify')) {
      return `🎯 Engineer Qualification Process:\n\n1. **Multi-round technical screening**\n   - Code challenges and system design\n   - Technology-specific assessments\n\n2. **Communication & cultural fit evaluation**\n   - English proficiency testing\n   - Team collaboration scenarios\n\n3. **Experience verification**\n   - Previous U.S. client experience preferred\n   - Reference checks and portfolio review\n\n4. **Ongoing support**\n   - Quick replacements if needed\n   - Performance monitoring\n\n👉 Want sample engineer resumes today?`;
    }

    // Job-related queries with specific roles
    if (message.includes('job') || message.includes('career') || message.includes('position') || message.includes('opening')) {
      if (message.includes('java')) {
        const javaJob = CURRENT_JOBS.find(job => job.title.toLowerCase().includes('java'));
        return `☕ ${javaJob?.title} Position (${javaJob?.level})!\n\nWhat we're looking for:\n${javaJob?.requirements.map(r => `• ${r}`).join('\n')}\n\nTech stack: ${javaJob?.skills.join(', ')}\n\n💡 This role offers competitive compensation and career growth opportunities.\n\n👉 Ready to apply? I can help you get started!`;
      }
      if (message.includes('devops')) {
        const devopsJob = CURRENT_JOBS.find(job => job.title.toLowerCase().includes('devops'));
        return `⚙️ ${devopsJob?.title} Role (${devopsJob?.level})\n\nRequirements:\n${devopsJob?.requirements.map(r => `• ${r}`).join('\n')}\n\nKey skills: ${devopsJob?.skills.join(', ')}\n\n🚀 Join teams building cutting-edge cloud infrastructure!\n\n👉 Shall I connect you with our recruitment team?`;
      }
      
      return `💼 Current Opportunities:\n\n${CURRENT_JOBS.map(job => `🔹 ${job.title} (${job.level})\n   Skills: ${job.skills.slice(0, 3).join(', ')}...`).join('\n\n')}\n\n✨ All positions offer competitive compensation, remote work options, and career growth.\n\n👉 Which role interests you most?`;
    }

    // Immigration and visa queries
    if (message.includes('visa') || message.includes('immigration') || message.includes('h1b') || message.includes('green card') || message.includes('opt')) {
      if (message.includes('h1b')) {
        const h1bInfo = IMMIGRATION_INFO.visaTypes.find(v => v.type === 'H1B');
        return `🇺🇸 H1B Visa Support:\n\n${h1bInfo?.description}\nDuration: ${h1bInfo?.duration}\n\nOur H1B services:\n• Petition preparation and filing\n• RFE response assistance\n• Status monitoring and updates\n• Renewal support\n• Legal consultation\n\n📊 We maintain a high success rate!\n\n👉 Ready to start your H1B process?`;
      }
      if (message.includes('green card')) {
        const gcInfo = IMMIGRATION_INFO.visaTypes.find(v => v.type === 'Green Card');
        return `🟢 Green Card Services:\n\n${gcInfo?.description}\nStatus: ${gcInfo?.duration}\n\nOur comprehensive process:\n${IMMIGRATION_INFO.process.map(p => `• ${p}`).join('\n')}\n\n⏱️ Processing times vary by country (1-3 years typically)\n\n👉 Want to discuss your specific situation?`;
      }
      
      return `🛂 Immigration Support Services:\n\n${IMMIGRATION_INFO.visaTypes.map(v => `🔹 ${v.type}: ${v.description}`).join('\n\n')}\n\n✅ Expert guidance through every step\n📈 High success rate with fast processing\n\n👉 Which visa type are you interested in?`;
    }

    // Application process
    if (message.includes('apply') || message.includes('application') || message.includes('how to apply')) {
      return `📝 How to Apply:\n\n1. **Browse Opportunities**\n   Check our current job openings section\n\n2. **Submit Application**\n   Click on positions matching your skills\n   Upload resume and cover letter\n\n3. **Quick Review**\n   We review applications within 24-48 hours\n\n4. **Interview Process**\n   Qualified candidates get interview scheduling\n   Technical and cultural fit assessment\n\n💡 Pro tip: Our job placement is FREE for candidates!\n\n👉 Need help finding the right position?`;
    }

    // Contact information
    if (message.includes('contact') || message.includes('phone') || message.includes('email') || message.includes('address') || message.includes('how to reach')) {
      return `📞 Contact CloudFlex IT Solutions:\n\n📧 General: ${CONTACT_INFO.email}\n📧 HR: ${CONTACT_INFO.hrEmail}\n📞 Phone: ${CONTACT_INFO.phone}\n🌐 Website: ${CONTACT_INFO.website}\n📍 Address: ${CONTACT_INFO.address}\n⏰ Hours: ${CONTACT_INFO.hours}\n\n👉 Want me to connect you now for a free consultation?`;
    }

    // Remote work
    if (message.includes('remote') || message.includes('work from home') || message.includes('hybrid')) {
      return `🏠 Remote Work Opportunities:\n\nYes! We offer flexible work arrangements:\n• Fully remote positions\n• Hybrid work models\n• Traditional office-based roles\n• Flexible hours and time zones\n\nMany of our clients embrace remote-first culture with excellent collaboration tools.\n\n🌍 Work from anywhere while advancing your career!\n\n👉 Want to see remote-specific job openings?`;
    }

    // Industries
    if (message.includes('industry') || message.includes('industries') || message.includes('finserv') || message.includes('healthcare')) {
      return `🏢 Industries We Serve:\n\n${COMPANY_INFO.industries.map(industry => `🔹 ${industry}`).join('\n')}\n\nEach industry has unique IT challenges:\n• FinServ: Regulatory compliance, real-time processing\n• Healthcare: HIPAA compliance, patient data security\n• SaaS: Scalability, performance optimization\n• Manufacturing: IoT integration, process automation\n\n👉 Which industry are you most interested in?`;
    }

    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('good morning') || message.includes('good afternoon')) {
      return `👋 Hello! Welcome to ${COMPANY_INFO.name}!\n\nI'm your AI assistant, ready to help with:\n\n💼 Job opportunities and career guidance\n🛂 Immigration and visa support\n🚀 Custom software development\n🤖 AI & automation solutions\n☁️ Cloud & DevOps services\n📊 Data analytics solutions\n\nWhat would you like to explore today?`;
    }

    // Thanks
    if (message.includes('thank') || message.includes('thanks') || message.includes('appreciate')) {
      return `😊 You're very welcome!\n\nI'm always here to help you advance your career and achieve your technology goals. Feel free to ask about:\n\n• Our comprehensive services\n• Current job opportunities\n• Immigration support\n• Technical solutions\n• Free consultations\n\nWhat else can I help you with today?`;
    }

    // Default response with comprehensive options
    return `🤔 I'd be happy to help! Here are some things I can assist with:\n\n💼 **Career & Jobs**\n• Current openings and application process\n• Resume optimization and career guidance\n\n🛂 **Immigration Services**\n• H1B, L1, OPT, and Green Card support\n\n🚀 **Technical Services**\n• Custom app development (Java, React, Vue)\n• AI & automation solutions\n• Cloud & DevOps services\n• Data analytics and dashboards\n\n💬 **Company Information**\n• Our services and pricing\n• Free consultations\n• Contact details\n\n👉 What interests you most? Or contact us at ${CONTACT_INFO.email} for personalized assistance!`;
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
      <Card className="h-[500px] flex flex-col shadow-2xl overflow-hidden">
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

        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth" style={{ maxHeight: '400px' }}>
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
            
            <div ref={messagesEndRef} className="h-1" />
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