import { useState } from 'react';
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
import { CollapsibleSection } from '@/components/CollapsibleSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-inter relative">
      <InteractiveBackground />
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        
        <CollapsibleSection title="Our Services" id="services">
          <ServicesSection />
        </CollapsibleSection>
        
        <CollapsibleSection title="Industries We Serve" id="industries">
          <IndustriesSection />
        </CollapsibleSection>
        
        <CollapsibleSection title="Current Opportunities" id="jobs">
          <JobsSection />
        </CollapsibleSection>
        
        <CollapsibleSection title="Latest News" id="newsroom">
          <NewsroomSection />
        </CollapsibleSection>
        
        <CollapsibleSection title="Blog & Insights" id="blog">
          <BlogSection />
        </CollapsibleSection>
        
        <CollapsibleSection title="Get In Touch" id="contact">
          <ContactSection />
        </CollapsibleSection>
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
