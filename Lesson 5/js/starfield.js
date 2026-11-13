/**
 * COSMIC UNIVERSE - Dynamic 3D Starfield & Particle Canvas Engine
 * Renders depth layers, warp stars, nebula dust clouds, and shooting stars.
 */

class StarfieldCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.shootingStars = [];
    this.numStars = 320;
    this.speed = 0.45;
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = (e.clientX - this.width / 2) * 0.05;
      this.targetMouseY = (e.clientY - this.height / 2) * 0.05;
    });

    // Populate stars
    this.stars = [];
    for (let i = 0; i < this.numStars; i++) {
      this.stars.push({
        x: (Math.random() - 0.5) * this.width * 2,
        y: (Math.random() - 0.5) * this.height * 2,
        z: Math.random() * this.width,
        color: this.randomStarColor(),
        size: Math.random() * 1.5 + 0.5,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.02 + Math.random() * 0.03
      });
    }

    this.spawnShootingStarLoop();
    this.animate();
  }

  randomStarColor() {
    const colors = [
      'rgba(255, 255, 255, ',
      'rgba(210, 235, 255, ',
      'rgba(165, 215, 255, ',
      'rgba(255, 230, 200, ',
      'rgba(200, 180, 255, '
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  spawnShootingStarLoop() {
    const delay = 4000 + Math.random() * 6000;
    setTimeout(() => {
      this.shootingStars.push({
        x: Math.random() * this.width * 0.8,
        y: Math.random() * this.height * 0.4,
        length: 80 + Math.random() * 80,
        speed: 12 + Math.random() * 10,
        angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1),
        opacity: 1,
        life: 0
      });
      this.spawnShootingStarLoop();
    }, delay);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Soft mouse inertia
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);

    const cx = this.width / 2 + this.mouseX;
    const cy = this.height / 2 + this.mouseY;

    // Render stars
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      star.z -= this.speed;

      if (star.z <= 0) {
        star.z = this.width;
        star.x = (Math.random() - 0.5) * this.width * 2;
        star.y = (Math.random() - 0.5) * this.height * 2;
      }

      const k = 250 / star.z;
      const px = star.x * k + cx;
      const py = star.y * k + cy;

      if (px >= 0 && px <= this.width && py >= 0 && py <= this.height) {
        star.twinkle += star.twinkleSpeed;
        const alpha = Math.max(0.2, (1 - star.z / this.width) * (0.7 + 0.3 * Math.sin(star.twinkle)));
        const radius = Math.max(0.4, (1 - star.z / this.width) * star.size * 2.2);

        this.ctx.beginPath();
        this.ctx.arc(px, py, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = star.color + alpha + ')';
        this.ctx.fill();

        // Subtle glow for closer larger stars
        if (radius > 1.8) {
          this.ctx.beginPath();
          this.ctx.arc(px, py, radius * 2.5, 0, Math.PI * 2);
          this.ctx.fillStyle = star.color + (alpha * 0.2) + ')';
          this.ctx.fill();
        }
      }
    }

    // Render shooting stars
    for (let j = this.shootingStars.length - 1; j >= 0; j--) {
      const s = this.shootingStars[j];
      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.life += 1;
      s.opacity -= 0.018;

      if (s.opacity <= 0 || s.x > this.width || s.y > this.height) {
        this.shootingStars.splice(j, 1);
        continue;
      }

      const tailX = s.x - Math.cos(s.angle) * s.length;
      const tailY = s.y - Math.sin(s.angle) * s.length;

      const grad = this.ctx.createLinearGradient(s.x, s.y, tailX, tailY);
      grad.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
      grad.addColorStop(0.3, `rgba(125, 211, 252, ${s.opacity * 0.7})`);
      grad.addColorStop(1, `rgba(168, 85, 247, 0)`);

      this.ctx.beginPath();
      this.ctx.moveTo(s.x, s.y);
      this.ctx.lineTo(tailX, tailY);
      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = 1.8;
      this.ctx.stroke();
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.starfield = new StarfieldCanvas('bgStarfieldCanvas');
});

