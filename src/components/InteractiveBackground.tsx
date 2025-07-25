import { useEffect, useRef, useState } from 'react';

interface Dot {
  x: number;
  y: number;
  filled: boolean;
  filling: boolean;
  fillProgress: number;
}

export const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const animationIdRef = useRef<number>();
  const [totalFilled, setTotalFilled] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize dots in a grid pattern
    const initDots = () => {
      dotsRef.current = [];
      const spacing = 50;
      const offsetX = spacing / 2;
      const offsetY = spacing / 2;
      
      for (let x = offsetX; x < canvas.width; x += spacing) {
        for (let y = offsetY; y < canvas.height; y += spacing) {
          // Add some randomness to make it look more organic
          const randomX = x + (Math.random() - 0.5) * 10;
          const randomY = y + (Math.random() - 0.5) * 10;
          
          dotsRef.current.push({
            x: randomX,
            y: randomY,
            filled: false,
            filling: false,
            fillProgress: 0,
          });
        }
      }
    };

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Click handler for filling dots
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Find the closest dot within range
      let closestDot: Dot | null = null;
      let minDistance = Infinity;

      dotsRef.current.forEach(dot => {
        if (!dot.filled && !dot.filling) {
          const dx = dot.x - clickX;
          const dy = dot.y - clickY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 25 && distance < minDistance) {
            minDistance = distance;
            closestDot = dot;
          }
        }
      });

      if (closestDot) {
        closestDot.filling = true;
        setTotalFilled(prev => prev + 1);
      }
    };

    document.addEventListener('click', handleClick);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw dots
      dotsRef.current.forEach(dot => {
        // Update filling animation
        if (dot.filling) {
          dot.fillProgress += 0.05;
          if (dot.fillProgress >= 1) {
            dot.fillProgress = 1;
            dot.filling = false;
            dot.filled = true;
          }
        }

        // Draw dot
        ctx.save();
        
        if (dot.filled || dot.filling) {
          // Filled or filling dot
          const progress = dot.fillProgress;
          const radius = 4 * progress;
          
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `hsl(217, 91%, ${60 + progress * 20}%)`;
          ctx.fill();
          
          // Add glow effect
          ctx.shadowBlur = 15 * progress;
          ctx.shadowColor = `hsl(217, 91%, 60%)`;
          ctx.fill();
          
          // Add outer ring for filling animation
          if (dot.filling) {
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, 6, 0, Math.PI * 2);
            ctx.strokeStyle = `hsl(217, 91%, 70%)`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        } else {
          // Empty dot
          ctx.globalAlpha = 0.3;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsl(217, 91%, 80%)`;
          ctx.fill();
        }
        
        ctx.restore();
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
      {totalFilled > 0 && (
        <div className="fixed top-6 left-6 z-50 bg-white/80 backdrop-blur-sm text-primary px-4 py-2 rounded-lg shadow-lg border border-primary/20">
          <div className="text-sm font-medium">✨ Dots Filled</div>
          <div className="text-lg font-bold">{totalFilled}</div>
        </div>
      )}
    </>
  );
};