import cloudflexLogo from '@/assets/cloudflex-logo.png';

interface CloudFlexLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CloudFlexLogo = ({ className = '', size = 'md' }: CloudFlexLogoProps) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-16'
  };

  return (
    <img 
      src={cloudflexLogo} 
      alt="CloudFlex IT Solutions" 
      className={`${sizeClasses[size]} w-auto ${className}`}
    />
  );
};