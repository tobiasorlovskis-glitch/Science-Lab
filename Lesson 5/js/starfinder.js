/**
 * COSMIC UNIVERSE - Interactive Celestial Star Finder & Constellation Map
 * High-precision celestial canvas, interactive star picker, constellation lines,
 * spectral classifications, and astronomical dossiers.
 */

class StarFinder {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.selectedConstellation = window.COSMIC_DATA.constellations[0];
    this.selectedStar = null;
    this.showLines = true;
    this.showLabels = true;
    this.zoom = 1.0;
    this.hoverStar = null;

    this.width = 600;
    this.height = 480;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.setupConstellationTabs();
    this.setupInteractivity();
    this.renderInfoPanel();
    this.drawSky();
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.width = rect.width;
    this.height = Math.max(380, Math.min(540, rect.width * 0.7));
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.drawSky();
  }

  setupConstellationTabs() {
    const tabContainer = document.getElementById('constellationTabs');
    if (!tabContainer) return;
    tabContainer.innerHTML = '';

    window.COSMIC_DATA.constellations.forEach((c, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `constellation-tab-btn ${idx === 0 ? 'active' : ''}`;
      btn.textContent = c.name;
      btn.addEventListener('click', () => {
        tabContainer.querySelectorAll('.constellation-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedConstellation = c;
        this.selectedStar = null;
        this.renderInfoPanel();
        this.drawSky();
        if (window.cosmicAudio) window.cosmicAudio.playClick();
      });
      tabContainer.appendChild(btn);
    });

    // Toggle lines button
    const toggleLinesBtn = document.getElementById('toggleConstellationLines');
    if (toggleLinesBtn) {
      toggleLinesBtn.addEventListener('click', () => {
        this.showLines = !this.showLines;
        toggleLinesBtn.classList.toggle('active', this.showLines);
        this.drawSky();
        if (window.cosmicAudio) window.cosmicAudio.playClick();
      });
    }

    // Toggle labels button
    const toggleLabelsBtn = document.getElementById('toggleConstellationLabels');
    if (toggleLabelsBtn) {
      toggleLabelsBtn.addEventListener('click', () => {
        this.showLabels = !this.showLabels;
        toggleLabelsBtn.classList.toggle('active', this.showLabels);
        this.drawSky();
        if (window.cosmicAudio) window.cosmicAudio.playClick();
      });
    }

    // Star search input
    const searchInput = document.getElementById('starSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (!query) return;

        // Search through constellations and stars
        for (let c of window.COSMIC_DATA.constellations) {
          const starMatch = c.stars.find(s => s.name.toLowerCase().includes(query) || s.designation.toLowerCase().includes(query));
          if (starMatch) {
            this.selectedConstellation = c;
            this.selectedStar = starMatch;
            // update tabs
            const tabs = tabContainer.querySelectorAll('.constellation-tab-btn');
            tabs.forEach(t => t.classList.toggle('active', t.textContent === c.name));
            this.renderInfoPanel();
            this.drawSky();
            return;
          }
        }
      });
    }
  }

  setupInteractivity() {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      let found = null;
      for (let star of this.selectedConstellation.stars) {
        const sx = (star.x / 100) * this.width;
        const sy = (star.y / 100) * this.height;
        const dist = Math.hypot(x - sx, y - sy);
        if (dist < 14) {
          found = star;
          break;
        }
      }

      if (found !== this.hoverStar) {
        this.hoverStar = found;
        this.canvas.style.cursor = found ? 'pointer' : 'crosshair';
        this.drawSky();
        if (found && window.cosmicAudio) window.cosmicAudio.playHover();
      }
    });

    this.canvas.addEventListener('click', () => {
      if (this.hoverStar) {
        this.selectedStar = this.hoverStar;
        this.renderInfoPanel();
        this.drawSky();
        if (window.cosmicAudio) window.cosmicAudio.playSuccess();
        if (window.cosmicAchievements) {
          window.cosmicAchievements.unlock('star_gazer');
        }
      }
    });
  }

  drawSky() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // Dark night sky gradient with subtle celestial grid
    const skyGrad = ctx.createRadialGradient(this.width / 2, this.height / 2, 50, this.width / 2, this.height / 2, this.width * 0.7);
    skyGrad.addColorStop(0, '#0c102b');
    skyGrad.addColorStop(0.7, '#050716');
    skyGrad.addColorStop(1, '#02030a');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, this.width, this.height);

    // Draw faint background stars
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    for (let i = 0; i < 90; i++) {
      const bx = ((i * 137.5) % this.width);
      const by = ((i * 241.1) % this.height);
      ctx.fillRect(bx, by, 1, 1);
    }

    const c = this.selectedConstellation;
    if (!c) return;

    // Draw constellation connecting lines
    if (this.showLines && c.lines) {
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
      ctx.lineWidth = 1.6;
      ctx.setLineDash([4, 4]);

      for (let line of c.lines) {
        const s1 = c.stars[line[0]];
        const s2 = c.stars[line[1]];
        if (s1 && s2) {
          const x1 = (s1.x / 100) * this.width;
          const y1 = (s1.y / 100) * this.height;
          const x2 = (s2.x / 100) * this.width;
          const y2 = (s2.y / 100) * this.height;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }
      ctx.setLineDash([]);
    }

    // Draw Stars
    c.stars.forEach((star) => {
      const sx = (star.x / 100) * this.width;
      const sy = (star.y / 100) * this.height;
      const isSelected = this.selectedStar && this.selectedStar.name === star.name;
      const isHovered = this.hoverStar && this.hoverStar.name === star.name;

      // Outer Glow
      const glowRadius = isSelected || isHovered ? 16 : 8;
      const glowGrad = ctx.createRadialGradient(sx, sy, 2, sx, sy, glowRadius);
      glowGrad.addColorStop(0, star.color || '#fff');
      glowGrad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.beginPath();
      ctx.arc(sx, sy, glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();

      // Star Core
      ctx.beginPath();
      const coreSize = isSelected || isHovered ? 4.5 : 3.0;
      ctx.arc(sx, sy, coreSize, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // Selected Reticle
      if (isSelected) {
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(sx, sy, 12, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(sx - 16, sy); ctx.lineTo(sx - 8, sy);
        ctx.moveTo(sx + 8, sy); ctx.lineTo(sx + 16, sy);
        ctx.moveTo(sx, sy - 16); ctx.lineTo(sx, sy - 8);
        ctx.moveTo(sx, sy + 8); ctx.lineTo(sx, sy + 16);
        ctx.stroke();
      }

      // Labels
      if (this.showLabels || isSelected || isHovered) {
        ctx.font = '11px "Space Grotesk", sans-serif';
        ctx.fillStyle = isSelected ? '#38bdf8' : (isHovered ? '#facc15' : '#e2e8f0');
        ctx.fillText(star.name, sx + 8, sy - 6);
      }
    });
  }

  renderInfoPanel() {
    const card = document.getElementById('starDetailCard');
    if (!card) return;

    const c = this.selectedConstellation;
    const s = this.selectedStar || (c && c.stars[0]);

    if (!c || !s) return;

    card.innerHTML = `
      <div class="star-badge-row">
        <span class="constellation-tag">${c.name.toUpperCase()}</span>
        <span class="star-type-tag" style="border-color:${s.color}">${s.type}</span>
      </div>
      <h3 class="star-name-title">${s.name}</h3>
      <div class="star-designation">${s.designation}</div>

      <div class="star-metrics-grid">
        <div class="metric-box">
          <div class="metric-lbl">DISTANCE</div>
          <div class="metric-val">${s.dist}</div>
        </div>
        <div class="metric-box">
          <div class="metric-lbl">MAGNITUDE</div>
          <div class="metric-val">${s.mag}</div>
        </div>
        <div class="metric-box">
          <div class="metric-lbl">SEASON</div>
          <div class="metric-val">${c.season.split('(')[0]}</div>
        </div>
      </div>

      <div class="star-fact-box">
        <div class="fact-title">ASTROPHYSICAL PROFILE</div>
        <p class="fact-text">${s.note}</p>
      </div>

      <div class="constellation-mythology">
        <div class="myth-title">CONSTELLATION LORE & GUIDE</div>
        <p class="myth-text">${c.mythology}</p>
      </div>
    `;
  }
}

window.StarFinder = StarFinder;

