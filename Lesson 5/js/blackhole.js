/**
 * COSMIC UNIVERSE - Interactive Relativistic Black Hole Simulation
 * Real-time canvas gravitational lensing, Kerr accretion disk, and particle spaghettification.
 */

class BlackHoleSim {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mass = 4.2; // Millions of solar masses
    this.spin = 0.85; // Relativistic spin rate
    this.matterStreamActive = true;
    this.highlightZone = null;
    this.time = 0;

    this.width = this.canvas.clientWidth || 600;
    this.height = this.canvas.clientHeight || 450;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Click canvas to inject matter
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.injectMatter(x, y);
      if (window.cosmicAudio) window.cosmicAudio.playClick();
    });

    // Setup UI controls if present
    const massSlider = document.getElementById('bhMassSlider');
    const massVal = document.getElementById('bhMassVal');
    if (massSlider) {
      massSlider.addEventListener('input', (e) => {
        this.mass = parseFloat(e.target.value);
        if (massVal) massVal.textContent = `${this.mass.toFixed(1)}M M☉`;
        this.updateStats();
      });
    }

    const spinSlider = document.getElementById('bhSpinSlider');
    const spinVal = document.getElementById('bhSpinVal');
    if (spinSlider) {
      spinSlider.addEventListener('input', (e) => {
        this.spin = parseFloat(e.target.value);
        if (spinVal) spinVal.textContent = `${(this.spin * 100).toFixed(0)}% c`;
      });
    }

    const streamBtn = document.getElementById('bhToggleStream');
    if (streamBtn) {
      streamBtn.addEventListener('click', () => {
        this.matterStreamActive = !this.matterStreamActive;
        streamBtn.textContent = this.matterStreamActive ? "STREAM: ACTIVE" : "STREAM: PAUSED";
        streamBtn.classList.toggle('active', this.matterStreamActive);
        if (window.cosmicAudio) window.cosmicAudio.playClick();
      });
    }

    // Seed initial disk particles
    for (let i = 0; i < 280; i++) {
      this.spawnDiskParticle();
    }

    this.animate();
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.width = Math.max(320, rect.width);
    this.height = Math.max(350, Math.min(550, rect.width * 0.65));
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.updateStats();
  }

  updateStats() {
    // Calculate Schwarzschild radius: Rs = 2GM/c^2
    const rsKm = (this.mass * 2.95).toFixed(1);
    const rsElem = document.getElementById('bhRsValue');
    if (rsElem) rsElem.textContent = `${rsKm} Million km`;

    const tdElem = document.getElementById('bhTimeDilation');
    if (tdElem) {
      const td = (1 / Math.sqrt(1 - 0.95)).toFixed(1);
      tdElem.textContent = `~${td}x slower near Horizon`;
    }
  }

  spawnDiskParticle() {
    const cx = this.width / 2;
    const cy = this.height / 2;
    const rBase = this.mass * 12;
    const radius = rBase + 15 + Math.random() * (Math.min(this.width, this.height) * 0.42);
    const angle = Math.random() * Math.PI * 2;

    this.particles.push({
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius * 0.38,
      angle: angle,
      radius: radius,
      speed: (0.015 + (120 / radius) * 0.02) * (0.5 + this.spin * 0.8),
      size: Math.random() * 2.2 + 0.8,
      heat: Math.random(),
      life: 1,
      spaghettified: false
    });
  }

  injectMatter(x, y) {
    const cx = this.width / 2;
    const cy = this.height / 2;
    const dx = x - cx;
    const dy = (y - cy) / 0.38;
    const r = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    for (let i = 0; i < 18; i++) {
      this.particles.push({
        x: x + (Math.random() - 0.5) * 15,
        y: y + (Math.random() - 0.5) * 15,
        angle: angle + (Math.random() - 0.5) * 0.3,
        radius: r + (Math.random() - 0.5) * 20,
        speed: (0.02 + (140 / Math.max(20, r)) * 0.02) * (0.6 + this.spin),
        size: Math.random() * 3 + 1.2,
        heat: 0.9,
        life: 1,
        spaghettified: false
      });
    }
  }

  setHighlight(zone) {
    this.highlightZone = zone;
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.time += 0.02;

    this.ctx.fillStyle = 'rgba(7, 10, 22, 0.45)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    const cx = this.width / 2;
    const cy = this.height / 2;
    const horizonRadius = Math.max(24, this.mass * 8.5);
    const photonSphereRadius = horizonRadius * 1.5;

    // Draw Relativistic Jets
    this.drawJets(cx, cy, horizonRadius);

    // Draw Background Gravitational Lensing Glow Ring
    const lensGrad = this.ctx.createRadialGradient(cx, cy, horizonRadius * 0.8, cx, cy, horizonRadius * 3.4);
    lensGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
    lensGrad.addColorStop(0.3, 'rgba(234, 179, 8, 0.45)');
    lensGrad.addColorStop(0.55, 'rgba(236, 72, 153, 0.25)');
    lensGrad.addColorStop(0.85, 'rgba(99, 102, 241, 0.1)');
    lensGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    this.ctx.beginPath();
    this.ctx.arc(cx, cy, horizonRadius * 3.4, 0, Math.PI * 2);
    this.ctx.fillStyle = lensGrad;
    this.ctx.fill();

    // Stream new matter continuously if enabled
    if (this.matterStreamActive && this.particles.length < 320 && Math.random() < 0.35) {
      this.spawnDiskParticle();
    }

    // Sort particles: back half of accretion disk first, then black hole, then front half!
    const backParticles = [];
    const frontParticles = [];

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      // Keplerian + relativistic frame dragging orbit
      p.speed = (0.012 + (160 / Math.max(10, p.radius)) * 0.02) * (0.6 + this.spin);
      p.angle += p.speed;
      // Infall toward event horizon
      p.radius -= 0.18 + (horizonRadius / Math.max(10, p.radius)) * 0.35;

      p.x = cx + Math.cos(p.angle) * p.radius;
      p.y = cy + Math.sin(p.angle) * p.radius * 0.38;

      // Spaghettification near horizon
      if (p.radius < horizonRadius * 1.8) {
        p.spaghettified = true;
      }

      // Crossed event horizon!
      if (p.radius <= horizonRadius * 0.7) {
        this.particles.splice(i, 1);
        continue;
      }

      if (Math.sin(p.angle) < 0) {
        backParticles.push(p);
      } else {
        frontParticles.push(p);
      }
    }

    // Render Back of Accretion Disk
    this.renderParticleList(backParticles, cx, cy, horizonRadius);

    // Draw the Black Hole Shadow & Event Horizon
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, horizonRadius, 0, Math.PI * 2);
    this.ctx.fillStyle = '#010206';
    this.ctx.fill();

    // Shadow edge sharpness
    this.ctx.lineWidth = 2.5;
    this.ctx.strokeStyle = '#050b1a';
    this.ctx.stroke();

    // Photon Sphere Ring
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, photonSphereRadius, 0, Math.PI * 2);
    this.ctx.lineWidth = 1.8;
    this.ctx.strokeStyle = 'rgba(254, 240, 138, 0.85)';
    this.ctx.shadowColor = '#facc15';
    this.ctx.shadowBlur = 14;
    this.ctx.stroke();
    this.ctx.restore();

    // Render Front of Accretion Disk (crosses in front of horizon)
    this.renderParticleList(frontParticles, cx, cy, horizonRadius);

    // Highlight target zone if requested
    if (this.highlightZone) {
      this.drawHighlightIndicator(cx, cy, horizonRadius, photonSphereRadius);
    }
  }

  renderParticleList(list, cx, cy, horizonRadius) {
    for (let p of list) {
      // Relativistic Doppler beaming: approaching particles (left side moving toward viewer) are brighter and bluer!
      const isApproaching = Math.cos(p.angle) < 0;
      const doppler = isApproaching ? 1.4 : 0.65;
      const proximity = Math.min(1, Math.max(0, (p.radius - horizonRadius) / (horizonRadius * 2.5)));

      // Colors from intense white/cyan at core to amber/magenta further out
      let color;
      if (proximity < 0.25) {
        color = `rgba(255, 255, 255, ${Math.min(1, 0.95 * doppler)})`;
      } else if (proximity < 0.6) {
        color = `rgba(250, 204, 21, ${Math.min(1, 0.85 * doppler)})`;
      } else {
        color = `rgba(244, 63, 94, ${Math.min(1, 0.6 * doppler)})`;
      }

      this.ctx.beginPath();
      if (p.spaghettified) {
        // Draw stretched tidal noodle line
        const tx = Math.cos(p.angle + 0.12) * (p.radius + 6);
        const ty = Math.sin(p.angle + 0.12) * (p.radius + 6) * 0.38;
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(cx + tx, cy + ty);
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2.2;
        this.ctx.stroke();
      } else {
        this.ctx.arc(p.x, p.y, p.size * (isApproaching ? 1.3 : 0.9), 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
      }
    }
  }

  drawJets(cx, cy, hr) {
    const jetHeight = this.height * 0.42;
    const jetPulse = Math.sin(this.time * 4) * 0.15 + 0.85;

    // North Jet
    const nGrad = this.ctx.createLinearGradient(cx, cy, cx, cy - jetHeight);
    nGrad.addColorStop(0, `rgba(56, 189, 248, ${0.9 * jetPulse})`);
    nGrad.addColorStop(0.4, `rgba(168, 85, 247, ${0.5 * jetPulse})`);
    nGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

    this.ctx.beginPath();
    this.ctx.moveTo(cx - 3, cy);
    this.ctx.lineTo(cx - hr * 0.35, cy - jetHeight);
    this.ctx.lineTo(cx + hr * 0.35, cy - jetHeight);
    this.ctx.lineTo(cx + 3, cy);
    this.ctx.fillStyle = nGrad;
    this.ctx.fill();

    // South Jet
    const sGrad = this.ctx.createLinearGradient(cx, cy, cx, cy + jetHeight);
    sGrad.addColorStop(0, `rgba(56, 189, 248, ${0.9 * jetPulse})`);
    sGrad.addColorStop(0.4, `rgba(168, 85, 247, ${0.5 * jetPulse})`);
    sGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

    this.ctx.beginPath();
    this.ctx.moveTo(cx - 3, cy);
    this.ctx.lineTo(cx - hr * 0.35, cy + jetHeight);
    this.ctx.lineTo(cx + hr * 0.35, cy + jetHeight);
    this.ctx.lineTo(cx + 3, cy);
    this.ctx.fillStyle = sGrad;
    this.ctx.fill();
  }

  drawHighlightIndicator(cx, cy, hr, psr) {
    this.ctx.save();
    this.ctx.strokeStyle = '#38bdf8';
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([6, 6]);

    if (this.highlightZone === 'singularity') {
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      this.ctx.fillStyle = '#38bdf8';
      this.ctx.fill();
    } else if (this.highlightZone === 'horizon') {
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, hr, 0, Math.PI * 2);
      this.ctx.stroke();
    } else if (this.highlightZone === 'photon') {
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, psr, 0, Math.PI * 2);
      this.ctx.stroke();
    } else if (this.highlightZone === 'disk') {
      this.ctx.beginPath();
      this.ctx.ellipse(cx, cy, hr * 2.6, hr * 2.6 * 0.38, 0, 0, Math.PI * 2);
      this.ctx.stroke();
    } else if (this.highlightZone === 'jets') {
      this.ctx.strokeRect(cx - hr * 0.4, cy - this.height * 0.42, hr * 0.8, this.height * 0.84);
    }
    this.ctx.restore();
  }
}

window.BlackHoleSim = BlackHoleSim;

