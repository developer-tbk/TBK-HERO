import React, { useEffect, useRef } from 'react';

const BubbleParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Resize canvas
    const handleResize = () => {
      canvas.width = canvas.parentElement.clientWidth || 150;
      canvas.height = canvas.parentElement.clientHeight || 400;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Particle pool
    const particles = [];
    const maxParticles = 60; // Slightly fewer for just the froth area

    class Bubble {
      constructor() {
        this.reset();
        // Stagger initial vertical position
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        // Start from the lower half of the canvas (near the froth line)
        this.y = canvas.height * 0.5 + Math.random() * (canvas.height * 0.5);
        this.size = Math.random() * 2 + 0.5; // Smaller fizz bubbles
        this.speed = Math.random() * 2 + 1; // Faster popping motion
        this.wobble = Math.random() * 0.5 - 0.25; 
        this.wobbleSpeed = Math.random() * 0.1 + 0.05;
        this.wobbleAngle = Math.random() * Math.PI * 2;
        this.initialOpacity = Math.random() * 0.8 + 0.2; 
        this.opacity = this.initialOpacity;
        this.life = Math.random() * 25 + 10; // Frames before it pops/disappears
      }

      update() {
        this.y -= this.speed;
        this.wobbleAngle += this.wobbleSpeed;
        this.x += Math.sin(this.wobbleAngle) * 0.3;
        this.life--;

        // Fade out quickly as it reaches the end of its life (popping)
        if (this.life < 10) {
          this.opacity = Math.max(0, (this.life / 10) * this.initialOpacity);
        }

        // Reset if it completely fades or goes above the canvas
        if (this.life <= 0 || this.opacity <= 0 || this.y < -5) {
          this.reset();
        }
      }

      draw() {
        if (this.opacity <= 0) return;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Very faint golden/white fill
        ctx.fillStyle = `rgba(255, 245, 200, ${this.opacity * 0.4})`;
        ctx.fill();
        
        // Crisp brighter outline
        ctx.lineWidth = Math.max(0.5, this.size * 0.2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.stroke();
      }
    }

    // Populate particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Bubble());
    }

    // Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add a subtle ambient radial glow over the glass area
      const glowGrad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height * 0.7, 0,
        canvas.width / 2, canvas.height * 0.7, canvas.width
      );
      glowGrad.addColorStop(0, 'rgba(233, 195, 73, 0.05)');
      glowGrad.addColorStop(1, 'rgba(233, 195, 73, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-10 mix-blend-screen opacity-90"
    />
  );
};

export default BubbleParticles;
