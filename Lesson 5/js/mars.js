/**
 * COSMIC UNIVERSE - Mars Mission: Colony Commander Simulation
 * Interactive grid-based colony building, life support management, rover expeditions,
 * and 100-Sol survival progression with localStorage persistence.
 */

class MarsColonyGame {
  constructor() {
    this.targetSols = 100;
    this.sol = 1;
    this.gameSpeed = 1; // 1x or 2x
    this.isPaused = true;
    this.timer = null;
    this.selectedBuildingId = 'habitat';

    // Colony Resources
    this.resources = {
      metal: 160,
      energy: 50,
      maxEnergy: 100,
      oxygen: 100,
      maxOxygen: 100,
      water: 100,
      maxWater: 100,
      food: 80,
      maxFood: 100,
      population: 4,
      research: 0
    };

    // 6x6 Martian Grid
    this.gridSize = 6;
    this.grid = [];

    // Active hazard / weather
    this.activeStorm = 0; // Sol counter if dust storm is active
    this.activeFlare = 0;
    this.gameWon = false;
    this.gameOver = false;
    this.expeditionActive = false;

    this.init();
  }

  init() {
    this.loadSave();
    this.renderUI();
    this.attachEventListeners();
  }

  resetDefaultGrid() {
    this.grid = [];
    for (let r = 0; r < this.gridSize; r++) {
      const row = [];
      for (let c = 0; c < this.gridSize; c++) {
        // Natural features: 0=normal regolith, 1=crater, 2=subsurface ice pocket, 3=iron outcrop
        let terrain = 0;
        const rand = Math.random();
        if (rand < 0.12) terrain = 1; // Crater
        else if (rand < 0.22) terrain = 2; // Ice Pocket
        else if (rand < 0.32) terrain = 3; // Iron Outcrop

        row.push({
          row: r,
          col: c,
          terrain: terrain,
          building: null
        });
      }
      this.grid.push(row);
    }

    // Place starting HQ habitat and solar array in center
    this.grid[2][2].building = 'habitat';
    this.grid[2][3].building = 'solar_array';
    this.grid[3][2].building = 'moxie';
    this.grid[3][3].building = 'ice_extractor';
  }

  attachEventListeners() {
    // Play / Pause
    const playBtn = document.getElementById('marsPlayBtn');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        this.isPaused = !this.isPaused;
        playBtn.innerHTML = this.isPaused ? '<span class="icon">▶</span> RESUME SOLS' : '<span class="icon">⏸</span> PAUSE SOLS';
        playBtn.classList.toggle('active', !this.isPaused);
        if (window.cosmicAudio) window.cosmicAudio.playClick();
        if (!this.isPaused) this.startLoop();
        else this.stopLoop();
      });
    }

    // Reset Colony
    const resetBtn = document.getElementById('marsResetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm("Commander, do you want to abandon current colony and start a new Sol 1 mission?")) {
          localStorage.removeItem('cosmic_mars_save');
          this.sol = 1;
          this.gameWon = false;
          this.gameOver = false;
          this.resources = {
            metal: 160,
            energy: 50,
            maxEnergy: 100,
            oxygen: 100,
            maxOxygen: 100,
            water: 100,
            maxWater: 100,
            food: 80,
            maxFood: 100,
            population: 4,
            research: 0
          };
          this.resetDefaultGrid();
          this.renderUI();
          this.renderGrid();
          this.logMessage("Mission initialized. Welcome to Mars Base Alpha, Commander.", "info");
          if (window.cosmicAudio) window.cosmicAudio.playSuccess();
        }
      });
    }

    // Rover Expedition button
    const roverBtn = document.getElementById('marsRoverExpeditionBtn');
    if (roverBtn) {
      roverBtn.addEventListener('click', () => {
        this.launchRoverExpedition();
      });
    }

    // Building selector cards
    const selectorContainer = document.getElementById('marsBuildingSelectors');
    if (selectorContainer) {
      selectorContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.building-card');
        if (!card) return;
        const bId = card.dataset.building;
        if (bId) {
          this.selectedBuildingId = bId;
          document.querySelectorAll('.building-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          if (window.cosmicAudio) window.cosmicAudio.playClick();
        }
      });
    }
  }

  startLoop() {
    this.stopLoop();
    this.timer = setInterval(() => {
      this.tickSol();
    }, 3200 / this.gameSpeed);
  }

  stopLoop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  tickSol() {
    if (this.isPaused || this.gameOver || this.gameWon) return;

    this.sol++;
    const data = window.COSMIC_DATA.mars;

    // Calculate production and consumption based on placed structures
    let netEnergy = 0;
    let netOxygen = 0;
    let netWater = 0;
    let netFood = 0;
    let netMetal = 0;
    let netResearch = 0;

    let totalCaps = 0;

    for (let r = 0; r < this.gridSize; r++) {
      for (let c = 0; c < this.gridSize; c++) {
        const bId = this.grid[r][c].building;
        if (!bId) continue;
        const bInfo = data.buildings.find(b => b.id === bId);
        if (!bInfo) continue;

        // Energy effects
        if (bInfo.produces.energy) {
          let prod = bInfo.produces.energy;
          if (this.activeStorm > 0 && bId === 'solar_array') {
            prod *= 0.3; // Dust blocks solar panels
          }
          netEnergy += prod;
        }
        if (bInfo.consumes.energy) netEnergy -= bInfo.consumes.energy;

        // Oxygen
        if (bInfo.produces.oxygen) netOxygen += bInfo.produces.oxygen;
        if (bInfo.consumes.oxygen) netOxygen -= bInfo.consumes.oxygen;

        // Water
        if (bInfo.produces.water) {
          // Boost if on ice pocket!
          const mult = this.grid[r][c].terrain === 2 ? 1.5 : 1.0;
          netWater += bInfo.produces.water * mult;
        }
        if (bInfo.consumes.water) netWater -= bInfo.consumes.water;

        // Food
        if (bInfo.produces.food) netFood += bInfo.produces.food;
        if (bInfo.consumes.food) netFood -= bInfo.consumes.food;

        // Metal
        if (bInfo.produces.metal) {
          const mult = this.grid[r][c].terrain === 3 ? 1.5 : 1.0;
          netMetal += bInfo.produces.metal * mult;
        }

        // Research
        if (bInfo.produces.research) netResearch += bInfo.produces.research;

        // Population capacity
        if (bInfo.produces.populationCapacity) {
          totalCaps += bInfo.produces.populationCapacity;
        }
      }
    }

    // Colonists consume resources
    const colonistCount = this.resources.population;
    netOxygen -= colonistCount * 0.8;
    netWater -= colonistCount * 0.7;
    netFood -= colonistCount * 0.6;

    // Apply values
    this.resources.energy = Math.max(0, Math.min(this.resources.maxEnergy, this.resources.energy + netEnergy));
    this.resources.oxygen = Math.max(0, Math.min(this.resources.maxOxygen, this.resources.oxygen + netOxygen));
    this.resources.water = Math.max(0, Math.min(this.resources.maxWater, this.resources.water + netWater));
    this.resources.food = Math.max(0, Math.min(this.resources.maxFood, this.resources.food + netFood));
    this.resources.metal = Math.min(999, this.resources.metal + netMetal);
    this.resources.research = Math.min(999, this.resources.research + netResearch);

    // Population growth if life support is abundant and capacity exists
    if (this.resources.oxygen > 40 && this.resources.water > 40 && this.resources.food > 40) {
      if (colonistCount < totalCaps && Math.random() < 0.25) {
        this.resources.population++;
        this.logMessage(`New colonist arrived! Population is now ${this.resources.population}.`, "success");
      }
    }

    // Weather / storm counters
    if (this.activeStorm > 0) {
      this.activeStorm--;
      if (this.activeStorm === 0) {
        this.logMessage("The dust storm has dissipated. Solar efficiency restored to 100%.", "info");
      }
    }
    if (this.activeFlare > 0) {
      this.activeFlare--;
    }

    // Random Event Check (every 6-10 sols)
    if (Math.random() < 0.18) {
      this.triggerRandomEvent();
    }

    // Check Fail condition (O2 or Water depleted)
    if (this.resources.oxygen <= 0 || this.resources.water <= 0) {
      this.triggerGameOver("Life support failure! The colony ran out of essential atmospheric supplies.");
      return;
    }

    // Check Victory (100 Sols)
    if (this.sol >= this.targetSols) {
      this.triggerVictory();
      return;
    }

    this.saveGame();
    this.renderUI();
  }

  triggerRandomEvent() {
    const events = window.COSMIC_DATA.mars.events;
    const ev = events[Math.floor(Math.random() * events.length)];

    if (ev.effect === 'solar_drop') {
      this.activeStorm = ev.duration;
      this.logMessage(`⚠️ ${ev.title}: ${ev.description}`, "warning");
      if (window.cosmicAudio) window.cosmicAudio.playAlert();
    } else if (ev.effect === 'water_boost') {
      this.resources.water = Math.min(this.resources.maxWater, this.resources.water + ev.amount);
      this.logMessage(`✨ ${ev.title}: ${ev.description}`, "success");
      if (window.cosmicAudio) window.cosmicAudio.playSuccess();
    } else if (ev.effect === 'metal_loss') {
      this.resources.metal = Math.max(0, this.resources.metal - ev.amount);
      this.logMessage(`🚨 ${ev.title}: ${ev.description}`, "danger");
      if (window.cosmicAudio) window.cosmicAudio.playAlert();
    } else if (ev.effect === 'resupply') {
      this.resources.metal += ev.amount;
      this.resources.food = Math.min(this.resources.maxFood, this.resources.food + 30);
      this.logMessage(`🚀 ${ev.title}: ${ev.description}`, "success");
      if (window.cosmicAudio) window.cosmicAudio.playSuccess();
    }
  }

  launchRoverExpedition() {
    if (this.expeditionActive) return;
    if (this.resources.energy < 15) {
      this.logMessage("Insufficient electrical power (requires 15 kW) to launch rover expedition.", "warning");
      if (window.cosmicAudio) window.cosmicAudio.playAlert();
      return;
    }

    this.resources.energy -= 15;
    this.expeditionActive = true;
    const btn = document.getElementById('marsRoverExpeditionBtn');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span class="spinner"></span> ROVER EXPLORING MARS...`;
    }
    if (window.cosmicAudio) window.cosmicAudio.playClick();
    this.logMessage("Rover Perseverance-II deployed to explore Jezero Crater basin...", "info");

    setTimeout(() => {
      this.expeditionActive = false;
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `🚜 DEPLOY ROVER EXPEDITION (-15 kW)`;
      }

      const outcomes = [
        { msg: "Rover discovered a rich hematite deposit! +45 Metal.", type: "metal", val: 45 },
        { msg: "Rover drilled into a frozen subsurface aquifer! +35 Water.", type: "water", val: 35 },
        { msg: "Rover found ancient sedimentary rock layers with biosignature hints! +20 Research.", type: "research", val: 20 },
        { msg: "Rover navigated hazardous sand dunes and returned safely with +20 Metal.", type: "metal", val: 20 }
      ];

      const res = outcomes[Math.floor(Math.random() * outcomes.length)];
      if (res.type === 'metal') this.resources.metal += res.val;
      if (res.type === 'water') this.resources.water = Math.min(this.resources.maxWater, this.resources.water + res.val);
      if (res.type === 'research') this.resources.research += res.val;

      this.logMessage(`🛰️ EXPEDITION REPORT: ${res.msg}`, "success");
      if (window.cosmicAudio) window.cosmicAudio.playSuccess();
      this.renderUI();
    }, 2800);
  }

  buildOnCell(row, col) {
    if (this.gameOver || this.gameWon) return;

    const cell = this.grid[row][col];
    if (cell.terrain === 1) {
      this.logMessage("Cannot build on deep crater impact basin! Terrain too unstable.", "warning");
      if (window.cosmicAudio) window.cosmicAudio.playAlert();
      return;
    }

    if (cell.building) {
      // Demolish / Replace option
      if (confirm(`Cell contains ${cell.building.toUpperCase()}. Demolish and reclaim partial materials (+15 Metal)?`)) {
        cell.building = null;
        this.resources.metal += 15;
        this.renderGrid();
        this.renderUI();
        if (window.cosmicAudio) window.cosmicAudio.playClick();
      }
      return;
    }

    const bInfo = window.COSMIC_DATA.mars.buildings.find(b => b.id === this.selectedBuildingId);
    if (!bInfo) return;

    // Check resource requirements
    if (this.resources.metal < bInfo.cost.metal) {
      this.logMessage(`Need ${bInfo.cost.metal} Metal to construct ${bInfo.name}. Current: ${this.resources.metal}`, "warning");
      if (window.cosmicAudio) window.cosmicAudio.playAlert();
      return;
    }

    // Build!
    this.resources.metal -= bInfo.cost.metal;
    cell.building = bInfo.id;
    this.renderGrid();
    this.renderUI();
    this.logMessage(`Constructed ${bInfo.name} on Sector [${row + 1}, ${col + 1}].`, "success");
    if (window.cosmicAudio) window.cosmicAudio.playSuccess();

    // Unlock achievement check
    if (window.cosmicAchievements) {
      window.cosmicAchievements.unlock('mars_builder');
    }
  }

  triggerVictory() {
    this.gameWon = true;
    this.stopLoop();
    this.renderUI();
    if (window.cosmicAudio) window.cosmicAudio.playSuccess();
    if (window.cosmicAchievements) {
      window.cosmicAchievements.unlock('mars_100_sols');
    }

    const modal = document.getElementById('marsOutcomeModal');
    const title = document.getElementById('marsOutcomeTitle');
    const desc = document.getElementById('marsOutcomeDesc');
    if (modal && title && desc) {
      title.textContent = "🏆 MISSION SUCCESS: 100 SOLS SURVIVED!";
      title.style.color = "#38bdf8";
      desc.textContent = `Salute, Commander! You have successfully established a self-sustaining human civilization on Mars for 100 Sol days. Population: ${this.resources.population} pioneers. Mars Colony Alpha is officially permanent!`;
      modal.classList.add('visible');
    }
  }

  triggerGameOver(reason) {
    this.gameOver = true;
    this.stopLoop();
    this.renderUI();
    if (window.cosmicAudio) window.cosmicAudio.playAlert();

    const modal = document.getElementById('marsOutcomeModal');
    const title = document.getElementById('marsOutcomeTitle');
    const desc = document.getElementById('marsOutcomeDesc');
    if (modal && title && desc) {
      title.textContent = "🚨 MISSION TERMINATED: COLONY LOST";
      title.style.color = "#ef4444";
      desc.textContent = `${reason} (Reached Sol ${this.sol}). Review your life support balance and try again!`;
      modal.classList.add('visible');
    }
  }

  logMessage(text, type = "info") {
    const logBox = document.getElementById('marsEventLog');
    if (!logBox) return;
    const entry = document.createElement('div');
    entry.className = `mars-log-entry ${type}`;
    const time = `[SOL ${String(this.sol).padStart(3, '0')}]`;
    entry.innerHTML = `<span class="log-time">${time}</span> ${text}`;
    logBox.insertBefore(entry, logBox.firstChild);

    // Limit to 20 entries
    while (logBox.children.length > 20) {
      logBox.removeChild(logBox.lastChild);
    }
  }

  saveGame() {
    try {
      const state = {
        sol: this.sol,
        resources: this.resources,
        grid: this.grid,
        activeStorm: this.activeStorm
      };
      localStorage.setItem('cosmic_mars_save', JSON.stringify(state));
    } catch (e) {}
  }

  loadSave() {
    try {
      const saved = localStorage.getItem('cosmic_mars_save');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.sol = parsed.sol || 1;
        this.resources = Object.assign(this.resources, parsed.resources);
        this.grid = parsed.grid;
        this.activeStorm = parsed.activeStorm || 0;
        return;
      }
    } catch (e) {}
    this.resetDefaultGrid();
  }

  renderUI() {
    // Sols display & progress bar
    const solDisplay = document.getElementById('marsSolDisplay');
    if (solDisplay) solDisplay.textContent = `SOL ${this.sol} / ${this.targetSols}`;

    const progressBar = document.getElementById('marsMissionProgressBar');
    if (progressBar) {
      const pct = Math.min(100, (this.sol / this.targetSols) * 100);
      progressBar.style.width = `${pct}%`;
    }

    // Resource counters
    const resMap = {
      'res-oxygen': `${Math.round(this.resources.oxygen)}%`,
      'res-water': `${Math.round(this.resources.water)}%`,
      'res-food': `${Math.round(this.resources.food)}%`,
      'res-energy': `${Math.round(this.resources.energy)} kW`,
      'res-metal': `${Math.round(this.resources.metal)}`,
      'res-pop': `${this.resources.population}`,
      'res-research': `${Math.round(this.resources.research)}`
    };

    for (let key in resMap) {
      const elem = document.getElementById(key);
      if (elem) elem.textContent = resMap[key];
    }

    // Status warning badge
    const statusBadge = document.getElementById('marsStatusBadge');
    if (statusBadge) {
      if (this.activeStorm > 0) {
        statusBadge.textContent = "🌪️ DUST STORM ACTIVE";
        statusBadge.className = "status-badge danger";
      } else if (this.resources.oxygen < 25 || this.resources.water < 25) {
        statusBadge.textContent = "⚠️ LIFE SUPPORT CRITICAL";
        statusBadge.className = "status-badge danger";
      } else {
        statusBadge.textContent = "🟢 SYSTEMS NOMINAL";
        statusBadge.className = "status-badge nominal";
      }
    }
  }

  renderGrid() {
    const gridContainer = document.getElementById('marsGridContainer');
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    const bMap = {};
    window.COSMIC_DATA.mars.buildings.forEach(b => bMap[b.id] = b);

    for (let r = 0; r < this.gridSize; r++) {
      for (let c = 0; c < this.gridSize; c++) {
        const cell = this.grid[r][c];
        const cellElem = document.createElement('div');
        cellElem.className = 'mars-cell';

        // Terrain styling
        if (cell.terrain === 1) cellElem.classList.add('crater');
        if (cell.terrain === 2) cellElem.classList.add('ice');
        if (cell.terrain === 3) cellElem.classList.add('metal-ore');

        if (cell.building) {
          const bInfo = bMap[cell.building];
          cellElem.classList.add('has-building');
          cellElem.innerHTML = `
            <div class="building-icon">${bInfo ? bInfo.icon : '🏢'}</div>
            <div class="building-name">${bInfo ? bInfo.name.split(' ')[0] : 'Structure'}</div>
          `;
        } else {
          if (cell.terrain === 1) cellElem.innerHTML = `<span class="terrain-label">Crater</span>`;
          else if (cell.terrain === 2) cellElem.innerHTML = `<span class="terrain-label">Ice Layer</span>`;
          else if (cell.terrain === 3) cellElem.innerHTML = `<span class="terrain-label">Iron Ore</span>`;
          else cellElem.innerHTML = `<span class="terrain-label">Regolith</span>`;
        }

        cellElem.addEventListener('click', () => {
          this.buildOnCell(r, c);
        });

        gridContainer.appendChild(cellElem);
      }
    }
  }
}

window.MarsColonyGame = MarsColonyGame;

