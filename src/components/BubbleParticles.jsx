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
    const maxParticles = 40;

    class Bubble {
      constructor() {
        this.reset();
        // Stagger initial vertical position
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 20;
        this.size = Math.random() * 3 + 1; // Bubble radius 1px to 4px
        this.speed = Math.random() * 1.5 + 0.8; // Upward speed
        this.wobble = Math.random() * 0.5 - 0.25; // Left/right wobble
        this.wobbleSpeed = Math.random() * 0.05 + 0.02;
        this.wobbleAngle = Math.random() * Math.PI;
        this.opacity = Math.random() * 0.5 + 0.2; // Start semi-transparent
      }

      update() {
        this.y -= this.speed;
        this.wobbleAngle += this.wobbleSpeed;
        this.x += Math.sin(this.wobbleAngle) * 0.3;

        // Fade out as it reaches the top
        if (this.y < canvas.height * 0.3) {
          this.opacity = Math.max(0, this.y / (canvas.height * 0.3)) * 0.7;
        }

        // Reset if it goes off screen or completely fades
        if (this.y < 0 || this.opacity <= 0) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        // Golden brew bubbles
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        gradient.addColorStop(0, `rgba(233, 195, 73, ${this.opacity})`);
        gradient.addColorStop(0.7, `rgba(233, 195, 73, ${this.opacity * 0.4})`);
        gradient.addColorStop(1, 'rgba(233, 195, 73, 0)');
        
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
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
      className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-80"
    />
  );
};

export default BubbleParticles;
