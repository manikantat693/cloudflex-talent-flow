import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface CollapsibleSectionProps {
  title: string;
  id: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const CollapsibleSection = ({ title, id, children, defaultOpen = false }: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="border-t border-border/50">
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-between py-8 px-6 text-left hover:bg-accent/50 rounded-none"
            data-section={id}
            data-state={isOpen ? 'open' : 'closed'}
          >
            <h2 className="text-2xl md:text-3xl font-space font-bold text-gradient">
              {title}
            </h2>
            {isOpen ? (
              <ChevronUp className="w-6 h-6 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-6 h-6 text-muted-foreground" />
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
          <div id={id}>
            {children}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};