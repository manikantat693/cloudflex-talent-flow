import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  clickable: boolean;
  pulsing: boolean;
}

export const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationIdRef = useRef<number>();
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize background particles
    const initBackgroundParticles = () => {
      for (let i = 0; i < 30; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
          size: Math.random() * 8 + 5,
          color: `hsl(${200 + Math.random() * 60}, 70%, ${50 + Math.random() * 30}%)`,
          life: 1,
          maxLife: 1,
          clickable: true,
          pulsing: Math.random() > 0.5,
        });
      }
    };

    initBackgroundParticles();

    // Click handler for collecting particles
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Check if any particle was clicked
      particlesRef.current = particlesRef.current.filter(particle => {
        if (!particle.clickable) return true;
        
        const dx = particle.x - clickX;
        const dy = particle.y - clickY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < particle.size + 10) {
          // Particle clicked! Remove it and add to score
          setScore(prev => prev + 10);
          setShowScore(true);
          setTimeout(() => setShowScore(false), 1000);
          
          // Create explosion effect
          for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 * i) / 8;
            const speed = Math.random() * 3 + 1;
            particlesRef.current.push({
              x: particle.x,
              y: particle.y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: Math.random() * 4 + 2,
              color: particle.color,
              life: 60,
              maxLife: 60,
              clickable: false,
              pulsing: false,
            });
          }
          
          // Spawn new particle to replace it
          setTimeout(() => {
            particlesRef.current.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              vx: (Math.random() - 0.5) * 1,
              vy: (Math.random() - 0.5) * 1,
              size: Math.random() * 8 + 5,
              color: `hsl(${200 + Math.random() * 60}, 70%, ${50 + Math.random() * 30}%)`,
              life: 1,
              maxLife: 1,
              clickable: true,
              pulsing: Math.random() > 0.5,
            });
          }, 2000);
          
          return false; // Remove the clicked particle
        }
        return true;
      });
    };

    document.addEventListener('click', handleClick);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Update life for explosion particles
        if (!particle.clickable) {
          particle.life--;
        }

        // Wrap around screen for clickable particles
        if (particle.clickable) {
          if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
          if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
          if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
          if (particle.y > canvas.height + particle.size) particle.y = -particle.size;
        }

        // Calculate size with pulsing effect
        let currentSize = particle.size;
        if (particle.pulsing && particle.clickable) {
          currentSize += Math.sin(Date.now() * 0.005) * 2;
        }

        // Draw particle
        ctx.save();
        
        // Set opacity
        if (particle.clickable) {
          ctx.globalAlpha = 0.7;
        } else {
          ctx.globalAlpha = particle.life / particle.maxLife * 0.8;
        }
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Add glow effect for clickable particles
        if (particle.clickable) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = particle.color;
          ctx.fill();
          
          // Add ring effect for clickable particles
          ctx.globalAlpha = 0.3;
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        
        ctx.restore();

        return particle.clickable || particle.life > 0;
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('click', handleClick);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-auto z-0 cursor-crosshair"
        style={{ background: 'transparent' }}
      />
      {showScore && (
        <div className="fixed top-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg animate-bounce">
          <div className="text-lg font-bold">+10 Points!</div>
          <div className="text-sm">Score: {score}</div>
        </div>
      )}
      <div className="fixed top-6 left-6 z-50 bg-white/80 backdrop-blur-sm text-primary px-4 py-2 rounded-lg shadow-lg border border-primary/20">
        <div className="text-sm font-medium">🎮 Bubble Game</div>
        <div className="text-lg font-bold">Score: {score}</div>
      </div>
    </>
  );
};