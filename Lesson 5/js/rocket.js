/**
 * COSMIC UNIVERSE - Interactive Rocket Builder & Liftoff Physics Simulation
 * Modular rocket assembly, real-time TWR/Delta-V avionics, 10-second countdown,
 * and high-energy particle exhaust launch sequence.
 */

class RocketBuilder {
  constructor() {
    this.name = "Astraea-1";
    this.capsule = window.COSMIC_DATA.rocket.capsules[0];
    this.tank = window.COSMIC_DATA.rocket.tanks[1];
    this.engine = window.COSMIC_DATA.rocket.engines[0];
    this.booster = window.COSMIC_DATA.rocket.boosters[1];
    this.color = window.COSMIC_DATA.rocket.colors[0];

    this.isLaunching = false;
    this.countdownTimer = null;
    this.launchCanvas = null;
    this.launchCtx = null;
    this.particles = [];
    this.smokeParticles = [];
    this.rocketY = 0;
    this.altitude = 0;
    this.velocity = 0;
    this.launchState = 'idle'; // idle, countdown, ascending, staging, orbit

    this.init();
  }

  init() {
    this.setupControls();
    this.updateAvionics();
    this.renderRocketPreview();
    this.setupLaunchCanvas();
  }

  setupControls() {
    // Name input
    const nameInput = document.getElementById('rocketNameInput');
    if (nameInput) {
      nameInput.value = this.name;
      nameInput.addEventListener('input', (e) => {
        this.name = e.target.value.trim() || "Cosmic Pioneer";
        const previewName = document.getElementById('previewRocketName');
        if (previewName) previewName.textContent = this.name.toUpperCase();
      });
    }

    // Quick name randomize
    const randNameBtn = document.getElementById('randomNameBtn');
    if (randNameBtn) {
      randNameBtn.addEventListener('click', () => {
        const names = ["Astraea-1", "Vanguard-X", "Chronos Prime", "Solaris-VII", "Orion Dawn", "Nebula Stride", "Hyperion-4", "Titan Apex"];
        this.name = names[Math.floor(Math.random() * names.length)];
        if (nameInput) nameInput.value = this.name;
        const previewName = document.getElementById('previewRocketName');
        if (previewName) previewName.textContent = this.name.toUpperCase();
        if (window.cosmicAudio) window.cosmicAudio.playClick();
      });
    }

    // Selectors
    this.bindOptionList('capsuleOptions', window.COSMIC_DATA.rocket.capsules, (item) => {
      this.capsule = item;
      this.onComponentChange();
    });

    this.bindOptionList('tankOptions', window.COSMIC_DATA.rocket.tanks, (item) => {
      this.tank = item;
      this.onComponentChange();
    });

    this.bindOptionList('engineOptions', window.COSMIC_DATA.rocket.engines, (item) => {
      this.engine = item;
      this.onComponentChange();
    });

    this.bindOptionList('boosterOptions', window.COSMIC_DATA.rocket.boosters, (item) => {
      this.booster = item;
      this.onComponentChange();
    });

    this.bindColorPalette();

    // Launch Button
    const launchBtn = document.getElementById('initiateLaunchBtn');
    if (launchBtn) {
      launchBtn.addEventListener('click', () => {
        this.startCountdown();
      });
    }

    // Abort / Reset Launch Button
    const resetLaunchBtn = document.getElementById('resetLaunchBtn');
    if (resetLaunchBtn) {
      resetLaunchBtn.addEventListener('click', () => {
        this.resetLaunch();
      });
    }
  }

  bindOptionList(containerId, list, onSelect) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    list.forEach((item, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `rocket-part-btn ${idx === 0 ? 'active' : ''}`;
      btn.innerHTML = `
        <div class="part-title">${item.name}</div>
        <div class="part-meta">${item.desc || ''}</div>
      `;
      btn.addEventListener('click', () => {
        container.querySelectorAll('.rocket-part-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        onSelect(item);
        if (window.cosmicAudio) window.cosmicAudio.playClick();
      });
      container.appendChild(btn);
    });
  }

  bindColorPalette() {
    const palette = document.getElementById('rocketColorPalette');
    if (!palette) return;
    palette.innerHTML = '';

    window.COSMIC_DATA.rocket.colors.forEach((col, idx) => {
      const swatch = document.createElement('div');
      swatch.className = `color-swatch ${idx === 0 ? 'selected' : ''}`;
      swatch.style.background = col.hex;
      swatch.style.borderColor = col.accent;
      swatch.title = col.name;
      swatch.addEventListener('click', () => {
        palette.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
        swatch.classList.add('selected');
        this.color = col;
        this.renderRocketPreview();
        if (window.cosmicAudio) window.cosmicAudio.playClick();
      });
      palette.appendChild(swatch);
    });
  }

  onComponentChange() {
    this.updateAvionics();
    this.renderRocketPreview();
  }

  updateAvionics() {
    // Physics calculations
    // Total wet mass = Capsule mass + Tank Dry Mass + Tank Fuel Mass + Booster Mass + Booster Fuel + Engine Mass
    const totalMass = this.capsule.mass + this.tank.massDry + this.tank.fuelMass + this.booster.mass + this.booster.fuel + this.engine.mass;
    const dryMass = this.capsule.mass + this.tank.massDry + this.booster.mass + this.engine.mass;
    const totalThrust = this.engine.thrust + this.booster.thrust;

    // TWR = Total Thrust / (Mass * 9.807 m/s^2)
    // Note: thrust in kN, mass in metric tonnes (1000 kg). Weight = mass * 9.807 kN.
    const weightKn = totalMass * 9.807;
    const twr = weightKn > 0 ? (totalThrust / weightKn).toFixed(2) : "0.00";

    // Tsiolkovsky Rocket Equation: Delta-V = g0 * Isp * ln(m0 / mf)
    const g0 = 9.807;
    const effectiveIsp = this.engine.isp;
    const deltaV = Math.round(g0 * effectiveIsp * Math.log(totalMass / dryMass));

    // Update UI
    const massElem = document.getElementById('rocketAvionicsMass');
    if (massElem) massElem.textContent = `${totalMass.toFixed(1)} t`;

    const thrustElem = document.getElementById('rocketAvionicsThrust');
    if (thrustElem) thrustElem.textContent = `${totalThrust} kN`;

    const twrElem = document.getElementById('rocketAvionicsTWR');
    if (twrElem) {
      twrElem.textContent = twr;
      twrElem.className = parseFloat(twr) >= 1.2 ? "avionics-val status-good" : "avionics-val status-bad";
    }

    const dvElem = document.getElementById('rocketAvionicsDeltaV');
    if (dvElem) dvElem.textContent = `${deltaV} m/s`;

    const statusElem = document.getElementById('rocketLaunchReadiness');
    const launchBtn = document.getElementById('initiateLaunchBtn');
    if (statusElem && launchBtn) {
      if (parseFloat(twr) < 1.15) {
        statusElem.textContent = "INSUFFICIENT THRUST (TWR < 1.15)";
        statusElem.className = "readiness-badge bad";
        launchBtn.disabled = true;
      } else {
        statusElem.textContent = "FLIGHT VEHICLE READY FOR ORBIT";
        statusElem.className = "readiness-badge good";
        launchBtn.disabled = false;
      }
    }
  }

  renderRocketPreview() {
    const container = document.getElementById('rocketVisualModel');
    if (!container) return;

    const cHex = this.color.hex;
    const aHex = this.color.accent;
    const hasBoosters = this.booster.id !== 'none';

    // SVG Schematic of assembled rocket
    container.innerHTML = `
      <svg viewBox="0 0 240 380" class="rocket-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hullGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="${cHex}" stop-opacity="0.8"/>
            <stop offset="50%" stop-color="${cHex}" stop-opacity="1.0"/>
            <stop offset="100%" stop-color="${cHex}" stop-opacity="0.6"/>
          </linearGradient>
          <linearGradient id="accentGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${aHex}"/>
            <stop offset="100%" stop-color="#1e1b4b"/>
          </linearGradient>
          <radialGradient id="nozzleGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#38bdf8" stop-opacity="1"/>
            <stop offset="100%" stop-color="#0284c7" stop-opacity="0"/>
          </radialGradient>
        </defs>

        <!-- Command Capsule -->
        <path d="M 120 20 L 140 70 L 100 70 Z" fill="url(#hullGrad)" stroke="${aHex}" stroke-width="2"/>
        <circle cx="120" cy="50" r="5" fill="#0284c7" stroke="#ffffff" stroke-width="1.5"/>

        <!-- Main Fuel Tank -->
        <rect x="95" y="70" width="50" height="170" rx="3" fill="url(#hullGrad)" stroke="${aHex}" stroke-width="2"/>
        <!-- Tank stripes / avionics lines -->
        <line x1="95" y1="110" x2="145" y2="110" stroke="${aHex}" stroke-width="2"/>
        <line x1="95" y1="180" x2="145" y2="180" stroke="${aHex}" stroke-width="2"/>
        <text x="120" y="148" font-family="sans-serif" font-size="8" fill="${aHex}" font-weight="bold" text-anchor="middle" letter-spacing="1">
          ${this.name.slice(0, 8).toUpperCase()}
        </text>

        <!-- Boosters (if equipped) -->
        ${hasBoosters ? `
          <!-- Left Booster -->
          <path d="M 70 120 L 85 105 L 85 240 L 70 240 Z" fill="url(#hullGrad)" stroke="${aHex}" stroke-width="1.5"/>
          <path d="M 70 120 L 85 105 L 85 120 Z" fill="${aHex}"/>
          <polygon points="72,240 83,240 85,255 70,255" fill="#334155"/>

          <!-- Right Booster -->
          <path d="M 170 120 L 155 105 L 155 240 L 170 240 Z" fill="url(#hullGrad)" stroke="${aHex}" stroke-width="1.5"/>
          <path d="M 170 120 L 155 105 L 155 120 Z" fill="${aHex}"/>
          <polygon points="157,240 168,240 170,255 155,255" fill="#334155"/>

          <!-- Struts -->
          <line x1="85" y1="140" x2="95" y2="140" stroke="#94a3b8" stroke-width="2"/>
          <line x1="145" y1="140" x2="155" y2="140" stroke="#94a3b8" stroke-width="2"/>
          <line x1="85" y1="210" x2="95" y2="210" stroke="#94a3b8" stroke-width="2"/>
          <line x1="145" y1="210" x2="155" y2="210" stroke="#94a3b8" stroke-width="2"/>
        ` : ''}

        <!-- Aerodynamic Fins -->
        <polygon points="95,210 75,245 95,240" fill="${aHex}"/>
        <polygon points="145,210 165,245 145,240" fill="${aHex}"/>

        <!-- Main Engine Bells -->
        <polygon points="105,240 135,240 140,265 100,265" fill="#1e293b" stroke="${aHex}" stroke-width="1.5"/>
        <ellipse cx="120" cy="265" rx="20" ry="4" fill="url(#nozzleGlow)"/>
      </svg>
    `;
  }

  setupLaunchCanvas() {
    this.launchCanvas = document.getElementById('rocketLaunchCanvas');
    if (!this.launchCanvas) return;
    this.launchCtx = this.launchCanvas.getContext('2d');
    this.resizeLaunchCanvas();
    window.addEventListener('resize', () => this.resizeLaunchCanvas());
  }

  resizeLaunchCanvas() {
    if (!this.launchCanvas) return;
    const rect = this.launchCanvas.parentElement.getBoundingClientRect();
    this.launchCanvas.width = rect.width;
    this.launchCanvas.height = Math.max(380, rect.height || 420);
  }

  startCountdown() {
    if (this.isLaunching) return;
    this.isLaunching = true;
    this.launchState = 'countdown';

    // Show launch modal / overlay
    const modal = document.getElementById('rocketLaunchModal');
    if (modal) modal.classList.add('visible');

    const cdDisplay = document.getElementById('launchCountdownNumber');
    const cdLabel = document.getElementById('launchCountdownLabel');

    let count = 10;
    if (cdDisplay) cdDisplay.textContent = count;
    if (cdLabel) cdLabel.textContent = "T-MINUS COUNTDOWN INITIATED";
    if (window.cosmicAudio) window.cosmicAudio.playCountdownTick(450);

    this.countdownTimer = setInterval(() => {
      count--;
      if (count > 0) {
        if (cdDisplay) cdDisplay.textContent = count;
        if (window.cosmicAudio) window.cosmicAudio.playCountdownTick(520 + (10 - count) * 40);
        if (count === 3 && cdLabel) cdLabel.textContent = "IGNITION SEQUENCE START...";
      } else {
        clearInterval(this.countdownTimer);
        this.countdownTimer = null;
        if (cdDisplay) cdDisplay.textContent = "LIFTOFF!";
        if (cdLabel) cdLabel.textContent = "ALL ENGINES FIRING AT MAXIMUM THRUST";
        if (window.cosmicAudio) {
          window.cosmicAudio.playRocketRumble(8.0);
          window.cosmicAudio.playSuccess();
        }
        this.executeLaunch();
      }
    }, 1000);
  }

  executeLaunch() {
    this.launchState = 'ascending';
    this.altitude = 0;
    this.velocity = 0;
    this.particles = [];
    this.smokeParticles = [];

    const cw = this.launchCanvas.width;
    const ch = this.launchCanvas.height;
    this.rocketY = ch - 80;

    let stagingDone = false;
    let orbitAchieved = false;

    const animateLaunch = () => {
      if (this.launchState === 'idle') return;

      this.altitude += this.velocity * 0.05 + 0.2;
      this.velocity += 1.4;
      this.rocketY -= this.velocity * 0.035;

      // Telemetry update
      const altElem = document.getElementById('telemetryAltitude');
      const velElem = document.getElementById('telemetryVelocity');
      const stageElem = document.getElementById('telemetryStage');

      if (altElem) altElem.textContent = `${(this.altitude).toFixed(1)} km`;
      if (velElem) velElem.textContent = `${Math.round(this.velocity * 120)} km/h`;

      if (this.altitude > 45 && !stagingDone) {
        stagingDone = true;
        this.launchState = 'staging';
        if (stageElem) stageElem.textContent = "STAGE 1 SEPARATION COMPLETE";
        if (window.cosmicAudio) window.cosmicAudio.playSuccess();
      }

      if (this.altitude >= 120 && !orbitAchieved) {
        orbitAchieved = true;
        this.launchState = 'orbit';
        if (stageElem) stageElem.textContent = "ORBIT INSERTION SUCCESSFUL (400 km)";
        if (window.cosmicAudio) window.cosmicAudio.playSuccess();
        if (window.cosmicAchievements) {
          window.cosmicAchievements.unlock('first_launch');
        }

        const cdLabel = document.getElementById('launchCountdownLabel');
        if (cdLabel) cdLabel.textContent = `SUCCESS: ${this.name.toUpperCase()} HAS ACHIEVED STABLE ORBIT!`;
      }

      // Render Launch Scene
      this.renderLaunchFrame(cw, ch);

      if (this.altitude < 160) {
        requestAnimationFrame(animateLaunch);
      }
    };

    requestAnimationFrame(animateLaunch);
  }

  renderLaunchFrame(cw, ch) {
    if (!this.launchCtx) return;
    const ctx = this.launchCtx;

    // Atmospheric sky color transition: as altitude increases, sky transitions from twilight blue to deep black space!
    const atmoProgress = Math.min(1, this.altitude / 90);
    const topColor = `rgb(${Math.round(10 * (1 - atmoProgress))}, ${Math.round(15 * (1 - atmoProgress))}, ${Math.round(40 * (1 - atmoProgress))})`;
    const bottomColor = `rgb(${Math.round(20 * (1 - atmoProgress))}, ${Math.round(40 * (1 - atmoProgress))}, ${Math.round(80 * (1 - atmoProgress))})`;

    const skyGrad = ctx.createLinearGradient(0, 0, 0, ch);
    skyGrad.addColorStop(0, topColor);
    skyGrad.addColorStop(1, bottomColor);
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, cw, ch);

    // Stars reveal as atmosphere thins
    if (atmoProgress > 0.2) {
      ctx.fillStyle = `rgba(255, 255, 255, ${atmoProgress * 0.8})`;
      for (let i = 0; i < 40; i++) {
        const sx = ((i * 123) % cw);
        const sy = ((i * 77) % (ch * 0.7));
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }
    }

    // Launch pad on ground if near bottom
    const groundY = ch - 20 + this.altitude * 2.5;
    if (groundY < ch + 100) {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, groundY, cw, ch - groundY);
      // Launch tower
      ctx.fillStyle = '#64748b';
      ctx.fillRect(cw / 2 + 35, groundY - 120, 15, 120);
    }

    const rx = cw / 2;
    const ry = Math.max(80, this.rocketY);

    // Spawn exhaust flames & smoke particles
    if (this.altitude < 130) {
      for (let p = 0; p < 7; p++) {
        this.particles.push({
          x: rx + (Math.random() - 0.5) * 14,
          y: ry + 35,
          vx: (Math.random() - 0.5) * 3,
          vy: Math.random() * 8 + 6,
          size: Math.random() * 8 + 4,
          life: 1,
          color: Math.random() > 0.4 ? '#f97316' : '#facc15'
        });
      }

      // Billowing smoke near launchpad
      if (this.altitude < 35) {
        for (let s = 0; s < 4; s++) {
          this.smokeParticles.push({
            x: rx + (Math.random() - 0.5) * 30,
            y: ry + 40,
            vx: (Math.random() - 0.5) * 7,
            vy: (Math.random() - 0.5) * 2 + 1,
            size: Math.random() * 14 + 10,
            life: 1
          });
        }
      }
    }

    // Draw and update smoke
    for (let s = this.smokeParticles.length - 1; s >= 0; s--) {
      const sm = this.smokeParticles[s];
      sm.x += sm.vx;
      sm.y += sm.vy;
      sm.size += 0.8;
      sm.life -= 0.025;

      if (sm.life <= 0) {
        this.smokeParticles.splice(s, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(sm.x, sm.y, sm.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(203, 213, 225, ${sm.life * 0.35})`;
      ctx.fill();
    }

    // Draw and update exhaust flames
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.size = Math.max(0.1, p.size - 0.25);
      p.life -= 0.04;

      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }

    // Draw Ascending Rocket Body
    ctx.save();
    ctx.translate(rx, ry);

    // Rocket Hull
    ctx.fillStyle = this.color.hex;
    ctx.fillRect(-10, -20, 20, 50);

    // Nose Cone
    ctx.beginPath();
    ctx.moveTo(-10, -20);
    ctx.lineTo(0, -40);
    ctx.lineTo(10, -20);
    ctx.fillStyle = this.color.accent;
    ctx.fill();

    // Rocket Fins
    ctx.beginPath();
    ctx.moveTo(-10, 15);
    ctx.lineTo(-20, 32);
    ctx.lineTo(-10, 30);
    ctx.fillStyle = this.color.accent;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(10, 15);
    ctx.lineTo(20, 32);
    ctx.lineTo(10, 30);
    ctx.fillStyle = this.color.accent;
    ctx.fill();

    ctx.restore();
  }

  resetLaunch() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }
    this.isLaunching = false;
    this.launchState = 'idle';
    this.altitude = 0;
    this.velocity = 0;

    const modal = document.getElementById('rocketLaunchModal');
    if (modal) modal.classList.remove('visible');

    const cdDisplay = document.getElementById('launchCountdownNumber');
    if (cdDisplay) cdDisplay.textContent = "10";

    const cdLabel = document.getElementById('launchCountdownLabel');
    if (cdLabel) cdLabel.textContent = "READY FOR SEQUENCE";
  }
}

window.RocketBuilder = RocketBuilder;

