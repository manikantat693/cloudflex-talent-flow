import { CustomCursor } from '@/components/CustomCursor';
import { InteractiveBackground } from '@/components/InteractiveBackground';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { IndustriesSection } from '@/components/IndustriesSection';
import { JobsSection } from '@/components/JobsSection';
import { NewsroomSection } from '@/components/NewsroomSection';
import { BlogSection } from '@/components/BlogSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { ChatBot } from '@/components/ChatBot';

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-inter relative">
      <InteractiveBackground />
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <IndustriesSection />
        <JobsSection />
        <NewsroomSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
