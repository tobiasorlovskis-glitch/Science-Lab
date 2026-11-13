/**
 * COSMIC UNIVERSE - Core Application Orchestrator
 * Navigation, Global Search, Sound Toggles, Fact-of-the-Day, and Module Initialization.
 */

class CosmicApp {
  constructor() {
    this.currentSection = 'home';
    this.factIndex = 0;
    this.init();
  }

  init() {
    // 1. Initialize Achievements Engine
    window.cosmicAchievements = new window.CosmicAchievements();

    // 2. Setup Navigation
    this.setupNavigation();

    // 3. Setup Fact of the Day
    this.setupFactOfTheDay();

    // 4. Setup Audio Toggle
    this.setupAudioControls();

    // 5. Setup Black Hole Section Interactive Modules
    this.setupBlackHoleSection();

    // 6. Setup Global Search
    this.setupGlobalSearch();

    // 7. Setup Achievements Drawer Modal
    this.setupAchievementsModal();

    // 8. Initialize Sub-modules
    this.initSubModules();

    // 9. Track initial visit
    window.cosmicAchievements.trackSectionVisit('home');
  }

  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .nav-action-btn');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetSection = link.dataset.section;
        if (targetSection) {
          e.preventDefault();
          this.switchSection(targetSection);
          if (window.cosmicAudio) window.cosmicAudio.playClick();
        }
      });
    });

    // Mobile Hamburger
    const menuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('mainNavMenu');
    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        menuToggle.classList.toggle('active');
        if (window.cosmicAudio) window.cosmicAudio.playClick();
      });
    }

    // "Start Exploring" CTA button on home
    const ctaBtn = document.getElementById('homeStartExploringBtn');
    if (ctaBtn) {
      ctaBtn.addEventListener('click', () => {
        this.switchSection('gallery');
        if (window.cosmicAudio) window.cosmicAudio.playClick();
      });
    }
  }

  switchSection(sectionId) {
    const sections = document.querySelectorAll('.cosmic-section');
    const target = document.getElementById(`section-${sectionId}`);
    if (!target) return;

    sections.forEach(sec => sec.classList.remove('active-section'));
    target.classList.add('active-section');
    this.currentSection = sectionId;

    // Update nav active states
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.section === sectionId);
    });

    // Close mobile menu if open
    const navMenu = document.getElementById('mainNavMenu');
    const menuToggle = document.getElementById('mobileMenuToggle');
    if (navMenu) navMenu.classList.remove('open');
    if (menuToggle) menuToggle.classList.remove('active');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Achievements tracking
    if (window.cosmicAchievements) {
      window.cosmicAchievements.trackSectionVisit(sectionId);
    }

    // Trigger canvas resize for newly visible section
    if (sectionId === 'blackhole' && window.blackHoleSim) {
      setTimeout(() => window.blackHoleSim.resize(), 100);
    } else if (sectionId === 'mars' && window.marsColony) {
      window.marsColony.renderGrid();
    } else if (sectionId === 'starfinder' && window.starFinder) {
      setTimeout(() => window.starFinder.resize(), 100);
    } else if (sectionId === 'rocket' && window.rocketBuilder) {
      setTimeout(() => window.rocketBuilder.resizeLaunchCanvas(), 100);
    }
  }

  setupFactOfTheDay() {
    const factTextElem = document.getElementById('factOfTheDayText');
    const nextFactBtn = document.getElementById('nextFactBtn');
    const facts = window.COSMIC_DATA.factsOfTheDay;

    // Day of the year based seed
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    this.factIndex = dayOfYear % facts.length;

    const renderFact = () => {
      if (factTextElem) {
        factTextElem.textContent = `"${facts[this.factIndex]}"`;
      }
    };

    renderFact();

    if (nextFactBtn) {
      nextFactBtn.addEventListener('click', () => {
        this.factIndex = (this.factIndex + 1) % facts.length;
        renderFact();
        if (window.cosmicAudio) window.cosmicAudio.playClick();
      });
    }
  }

  setupAudioControls() {
    const audioBtn = document.getElementById('audioToggleBtn');
    if (!audioBtn) return;

    const updateAudioBtnUI = (isMuted) => {
      audioBtn.innerHTML = isMuted ? '🔇 AUDIO: OFF' : '🔊 AUDIO: ON';
      audioBtn.classList.toggle('muted', isMuted);
    };

    updateAudioBtnUI(window.cosmicAudio.isMuted);

    audioBtn.addEventListener('click', () => {
      const isMuted = window.cosmicAudio.toggleMute();
      updateAudioBtnUI(isMuted);
    });

    // Start audio context on first user click anywhere (browser autoplay policy)
    const unlockAudio = () => {
      if (window.cosmicAudio && !window.cosmicAudio.initialized) {
        window.cosmicAudio.init();
      }
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
    };
    document.addEventListener('click', unlockAudio);
    document.addEventListener('keydown', unlockAudio);
  }

  setupBlackHoleSection() {
    // Populate anatomy cards
    const anatomyContainer = document.getElementById('bhAnatomyList');
    if (anatomyContainer) {
      anatomyContainer.innerHTML = '';
      window.COSMIC_DATA.blackHole.anatomy.forEach(part => {
        const item = document.createElement('div');
        item.className = 'anatomy-item';
        item.innerHTML = `
          <div class="anatomy-header">
            <span class="anatomy-bullet">⚡</span>
            <strong class="anatomy-title">${part.part}</strong>
          </div>
          <p class="anatomy-desc">${part.desc}</p>
        `;
        // Hover/click to highlight on canvas
        item.addEventListener('mouseenter', () => {
          let zone = 'disk';
          const name = part.part.toLowerCase();
          if (name.includes('singularity')) zone = 'singularity';
          else if (name.includes('event horizon')) zone = 'horizon';
          else if (name.includes('photon')) zone = 'photon';
          else if (name.includes('jet')) zone = 'jets';
          if (window.blackHoleSim) window.blackHoleSim.setHighlight(zone);
        });
        item.addEventListener('mouseleave', () => {
          if (window.blackHoleSim) window.blackHoleSim.setHighlight(null);
        });
        anatomyContainer.appendChild(item);
      });
    }

    // Populate Space Mysteries
    const mysteriesContainer = document.getElementById('spaceMysteriesList');
    if (mysteriesContainer) {
      mysteriesContainer.innerHTML = '';
      window.COSMIC_DATA.blackHole.mysteries.forEach(m => {
        const card = document.createElement('div');
        card.className = `mystery-card status-${m.status}`;
        card.innerHTML = `
          <div class="mystery-top">
            <span class="mystery-badge" style="border-color:${m.color}; color:${m.color}">
              ${m.statusLabel}
            </span>
          </div>
          <h4 class="mystery-title">${m.title}</h4>
          <p class="mystery-desc">${m.description}</p>
          <div class="mystery-consensus">
            <span class="consensus-lbl">SCIENTIFIC STATUS:</span> ${m.scientificConsensus}
          </div>
        `;
        mysteriesContainer.appendChild(card);
      });
    }
  }

  setupGlobalSearch() {
    const openSearchBtn = document.getElementById('navSearchBtn');
    const searchModal = document.getElementById('globalSearchModal');
    const closeSearchBtn = document.getElementById('closeSearchModalBtn');
    const searchInput = document.getElementById('masterSearchInput');
    const searchResults = document.getElementById('masterSearchResults');

    if (!searchModal) return;

    if (openSearchBtn) {
      openSearchBtn.addEventListener('click', () => {
        searchModal.classList.add('visible');
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        if (searchResults) searchResults.innerHTML = '<div class="search-prompt">Type to search galaxies, stars, black holes, rockets, and missions...</div>';
        if (window.cosmicAudio) window.cosmicAudio.playClick();
      });
    }

    if (closeSearchBtn) {
      closeSearchBtn.addEventListener('click', () => {
        searchModal.classList.remove('visible');
      });
    }

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        searchModal.classList.remove('visible');
      }
    });

    if (searchInput && searchResults) {
      searchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        if (!q) {
          searchResults.innerHTML = '<div class="search-prompt">Type to search galaxies, stars, black holes, rockets, and missions...</div>';
          return;
        }

        const matches = [];

        // Search Gallery
        window.COSMIC_DATA.gallery.forEach(item => {
          if (item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)) {
            matches.push({
              title: item.title,
              category: "Galaxy Gallery",
              desc: item.description.slice(0, 90) + '...',
              section: "gallery",
              action: () => {
                this.switchSection('gallery');
                if (window.gallery) window.gallery.openModal(item);
              }
            });
          }
        });

        // Search Constellations & Stars
        window.COSMIC_DATA.constellations.forEach(c => {
          if (c.name.toLowerCase().includes(q) || c.title.toLowerCase().includes(q)) {
            matches.push({
              title: `${c.name} (${c.title})`,
              category: "Star Finder Constellation",
              desc: c.description,
              section: "starfinder",
              action: () => {
                this.switchSection('starfinder');
                if (window.starFinder) {
                  window.starFinder.selectedConstellation = c;
                  window.starFinder.selectedStar = null;
                  window.starFinder.renderInfoPanel();
                  window.starFinder.drawSky();
                }
              }
            });
          }

          c.stars.forEach(s => {
            if (s.name.toLowerCase().includes(q) || s.designation.toLowerCase().includes(q)) {
              matches.push({
                title: `${s.name} (${s.designation})`,
                category: `Star in ${c.name}`,
                desc: s.note,
                section: "starfinder",
                action: () => {
                  this.switchSection('starfinder');
                  if (window.starFinder) {
                    window.starFinder.selectedConstellation = c;
                    window.starFinder.selectedStar = s;
                    window.starFinder.renderInfoPanel();
                    window.starFinder.drawSky();
                  }
                }
              });
            }
          });
        });

        // Search Mysteries
        window.COSMIC_DATA.blackHole.mysteries.forEach(m => {
          if (m.title.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)) {
            matches.push({
              title: m.title,
              category: "Black Hole Mystery",
              desc: m.description.slice(0, 90) + '...',
              section: "blackhole",
              action: () => {
                this.switchSection('blackhole');
              }
            });
          }
        });

        if (matches.length === 0) {
          searchResults.innerHTML = '<div class="no-results">No celestial coordinates found matching your query.</div>';
          return;
        }

        searchResults.innerHTML = '';
        matches.slice(0, 7).forEach(res => {
          const item = document.createElement('div');
          item.className = 'search-result-item';
          item.innerHTML = `
            <div class="result-cat">${res.category}</div>
            <div class="result-title">${res.title}</div>
            <div class="result-snippet">${res.desc}</div>
          `;
          item.addEventListener('click', () => {
            searchModal.classList.remove('visible');
            res.action();
            if (window.cosmicAudio) window.cosmicAudio.playClick();
          });
          searchResults.appendChild(item);
        });
      });
    }
  }

  setupAchievementsModal() {
    const openBtn = document.getElementById('openBadgesBtn');
    const modal = document.getElementById('badgesModal');
    const closeBtn = document.getElementById('closeBadgesModalBtn');

    if (!modal) return;

    if (openBtn) {
      openBtn.addEventListener('click', () => {
        modal.classList.add('visible');
        if (window.cosmicAchievements) window.cosmicAchievements.renderBadgeDrawer();
        if (window.cosmicAudio) window.cosmicAudio.playClick();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('visible');
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('visible');
    });
  }

  initSubModules() {
    // Gallery
    window.gallery = new window.GalaxyGallery();

    // Black Hole Sim
    window.blackHoleSim = new window.BlackHoleSim('blackHoleCanvas');

    // Mars Colony
    window.marsColony = new window.MarsColonyGame();
    window.marsColony.renderGrid();

    // Rocket Builder
    window.rocketBuilder = new window.RocketBuilder();

    // Star Finder
    window.starFinder = new window.StarFinder('starFinderCanvas');

    // Quiz
    window.spaceQuiz = new window.SpaceQuiz();
  }
}

// Bootstrap on DOM Ready
window.addEventListener('DOMContentLoaded', () => {
  window.cosmicApp = new CosmicApp();
});

