import React, { useEffect, useRef } from 'react';

export default function AntigravityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    // Mouse coordinates relative to canvas
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 180, // Influence radius
    };

    // Handle mouse events on the container so the user can interact anywhere in the hero section
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Resize observer for accurate dimensions without layout issues
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
      }
    });
    resizeObserver.observe(container);

    // Particle definition
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      alpha: number;
      color: string;
    }

    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor((width * height) / 9000), 120);

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 1.5 + 0.5;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius,
        baseAlpha: Math.random() * 0.4 + 0.2,
        alpha: 0,
        color: Math.random() > 0.4 ? '255, 106, 0' : '99, 102, 241', // Orange or Indigo
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Slowly drift particles
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Boundaries check with wrapping
        if (p1.x < 0) p1.x = width;
        else if (p1.x > width) p1.x = 0;

        if (p1.y < 0) p1.y = height;
        else if (p1.y > height) p1.y = 0;

        // Gravity attraction/influence from mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p1.x;
          const dy = mouse.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            // Apply a gentle pull force
            const force = (mouse.radius - dist) / mouse.radius;
            p1.x += (dx / dist) * force * 0.4;
            p1.y += (dy / dist) * force * 0.4;
          }
        }

        // Pulse the base alpha subtly
        p1.alpha = p1.baseAlpha + Math.sin(Date.now() * 0.001 + i) * 0.05;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p1.color}, ${p1.alpha})`;
        ctx.fill();

        // Connect particles to nearby particles and the mouse
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            // Calculate connection opacity based on distance
            const alpha = (1 - dist / 100) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Render a gradient link if they have different colors
            if (p1.color !== p2.color) {
              const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
              grad.addColorStop(0, `rgba(${p1.color}, ${alpha})`);
              grad.addColorStop(1, `rgba(${p2.color}, ${alpha})`);
              ctx.strokeStyle = grad;
            } else {
              ctx.strokeStyle = `rgba(${p1.color}, ${alpha})`;
            }
            
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw line from particle to mouse if close enough
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${p1.color}, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-auto overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none" />
    </div>
  );
}
