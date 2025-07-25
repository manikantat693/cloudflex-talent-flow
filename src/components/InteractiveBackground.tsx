import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

export const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationIdRef = useRef<number>();

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
      for (let i = 0; i < 50; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          color: `hsl(217, 91%, ${60 + Math.random() * 20}%)`,
          life: 1,
          maxLife: 1,
        });
      }
    };

    initBackgroundParticles();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Create particles around mouse
      for (let i = 0; i < 3; i++) {
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 50,
          y: e.clientY + (Math.random() - 0.5) * 50,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          size: Math.random() * 8 + 2,
          color: `hsl(${142 + Math.random() * 50}, 86%, ${60 + Math.random() * 20}%)`,
          life: 100,
          maxLife: 100,
        });
      }
    };

    // Click handler for burst effect
    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 15; i++) {
        const angle = (Math.PI * 2 * i) / 15;
        const speed = Math.random() * 6 + 2;
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 12 + 3,
          color: `hsl(${217 + Math.random() * 75}, 91%, ${50 + Math.random() * 30}%)`,
          life: 150,
          maxLife: 150,
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Update life for interactive particles
        if (particle.maxLife > 1) {
          particle.life--;
        }

        // Apply gravity and friction for interactive particles
        if (particle.maxLife > 1) {
          particle.vy += 0.02;
          particle.vx *= 0.995;
          particle.vy *= 0.995;
        }

        // Wrap around screen for background particles
        if (particle.maxLife === 1) {
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;
        }

        // Calculate alpha based on life
        const alpha = particle.maxLife === 1 ? 0.3 : particle.life / particle.maxLife;
        
        // Draw particle
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = particle.color;
        ctx.fill();
        ctx.restore();

        // Connect nearby particles with lines
        if (particle.maxLife === 1) {
          particlesRef.current.forEach(otherParticle => {
            if (otherParticle.maxLife === 1 && otherParticle !== particle) {
              const dx = particle.x - otherParticle.x;
              const dy = particle.y - otherParticle.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 100) {
                ctx.save();
                ctx.globalAlpha = (100 - distance) / 100 * 0.1;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.strokeStyle = particle.color;
                ctx.stroke();
                ctx.restore();
              }
            }
          });
        }

        return particle.life > 0;
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};