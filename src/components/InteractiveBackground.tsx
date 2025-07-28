import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  radius: number;
  clicked: boolean;
  clickEffect: number;
  points: number;
}

export const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationIdRef = useRef<number>();
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const comboTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = 40;
      
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 3 + 2;
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
          opacity: Math.random() * 0.6 + 0.4,
          radius: size,
          clicked: false,
          clickEffect: 0,
          points: Math.floor(size * 10),
        });
      }
    };

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Click handler for catching particles
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      let clicked = false;
      particlesRef.current.forEach(particle => {
        if (!particle.clicked) {
          const dx = particle.x - clickX;
          const dy = particle.y - clickY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < particle.radius + 10) {
            particle.clicked = true;
            particle.clickEffect = 1;
            
            const points = particle.points * (combo > 0 ? combo : 1);
            setScore(prev => prev + points);
            setCombo(prev => prev + 1);
            clicked = true;

            // Reset combo after 2 seconds of no clicks
            if (comboTimeoutRef.current) {
              clearTimeout(comboTimeoutRef.current);
            }
            comboTimeoutRef.current = setTimeout(() => {
              setCombo(0);
            }, 2000);
          }
        }
      });

      if (clicked) {
        // Spawn new particle to replace the clicked one
        setTimeout(() => {
          const size = Math.random() * 3 + 2;
          particlesRef.current.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1,
            opacity: Math.random() * 0.6 + 0.4,
            radius: size,
            clicked: false,
            clickEffect: 0,
            points: Math.floor(size * 10),
          });
        }, 500);
      }
    };

    canvas.addEventListener('click', handleClick);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Filter out clicked particles that have finished their effect
      particlesRef.current = particlesRef.current.filter(particle => {
        if (particle.clicked && particle.clickEffect <= 0) {
          return false;
        }
        return true;
      });

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        if (!particle.clicked) {
          // Update position for active particles
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

          // Keep particles within bounds
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        } else {
          // Animate click effect
          particle.clickEffect -= 0.02;
        }

        // Draw connections to nearby particles (only for active particles)
        if (!particle.clicked) {
          particlesRef.current.forEach((otherParticle, otherIndex) => {
            if (index !== otherIndex && !otherParticle.clicked) {
              const dx = particle.x - otherParticle.x;
              const dy = particle.y - otherParticle.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 100) {
                ctx.save();
                ctx.globalAlpha = (100 - distance) / 100 * 0.15;
                ctx.strokeStyle = 'hsl(217, 91%, 60%)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.stroke();
                ctx.restore();
              }
            }
          });
        }

        // Draw particle
        ctx.save();
        
        if (particle.clicked) {
          // Draw explosion effect
          const effectRadius = particle.radius * (1 + (1 - particle.clickEffect) * 3);
          ctx.globalAlpha = particle.clickEffect * 0.8;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, effectRadius, 0, Math.PI * 2);
          ctx.fillStyle = 'hsl(60, 100%, 70%)';
          ctx.fill();
          
          // Draw inner glow
          ctx.globalAlpha = particle.clickEffect;
          ctx.shadowBlur = 20;
          ctx.shadowColor = 'hsl(60, 100%, 70%)';
          ctx.fill();
        } else {
          // Draw normal particle with hover effect
          ctx.globalAlpha = particle.opacity;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = 'hsl(217, 91%, 60%)';
          ctx.fill();
          
          // Add subtle glow
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'hsl(217, 91%, 60%)';
          ctx.fill();
        }
        
        ctx.restore();
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('click', handleClick);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (comboTimeoutRef.current) {
        clearTimeout(comboTimeoutRef.current);
      }
    };
  }, [combo]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-auto z-0 cursor-crosshair"
        style={{ background: 'transparent' }}
      />
      
      {/* Game UI */}
      <div className="fixed top-6 left-6 z-50 space-y-2">
        <div className="bg-white/90 backdrop-blur-sm text-primary px-4 py-2 rounded-lg shadow-lg border border-primary/20">
          <div className="text-sm font-medium">Score</div>
          <div className="text-xl font-bold">{score}</div>
        </div>
        
        {combo > 1 && (
          <div className="bg-yellow-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg border border-yellow-400/20 animate-pulse">
            <div className="text-sm font-medium">Combo</div>
            <div className="text-lg font-bold">x{combo}</div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="fixed bottom-6 right-6 z-50 bg-white/80 backdrop-blur-sm text-primary px-4 py-3 rounded-lg shadow-lg border border-primary/20 max-w-xs">
        <div className="text-sm">
          <div className="font-medium mb-1">🎯 Particle Hunter</div>
          <div className="text-xs opacity-75">
            Click on moving particles to score points! 
            Bigger particles = more points. 
            Build combos for multipliers!
          </div>
        </div>
      </div>
    </>
  );
};