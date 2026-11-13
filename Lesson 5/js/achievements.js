/**
 * COSMIC UNIVERSE - Commander Progression & Achievement Badge Engine
 * Persistent XP, level rank titles, and real-time sci-fi toast notifications.
 */

class CosmicAchievements {
  constructor() {
    this.xp = 0;
    this.unlocked = {};
    this.visitedSections = new Set();
    this.badges = [
      { id: 'cosmic_explorer', title: 'Cosmic Explorer', icon: '🌌', desc: 'Visit and explore all main sections of the platform.' },
      { id: 'first_favorite', title: 'Deep Space Curator', icon: '⭐', desc: 'Bookmark your first celestial discovery into favorites.' },
      { id: 'mars_builder', title: 'Colony Pioneer', icon: '🔴', desc: 'Construct your first habitat or facility on Mars.' },
      { id: 'mars_100_sols', title: 'Martian Veteran', icon: '🏆', desc: 'Survive 100 Sols as Commander of Mars Base Alpha.' },
      { id: 'first_launch', title: 'Orbital Pioneer', icon: '🚀', desc: 'Successfully design and launch a rocket into Earth orbit.' },
      { id: 'star_gazer', title: 'Celestial Stargazer', icon: '🔭', desc: 'Inspect a star and review its astrophysical profile.' },
      { id: 'space_scholar', title: 'Astro Scholar', icon: '🧠', desc: 'Complete a space quiz session.' },
      { id: 'quiz_ace', title: 'Cosmos Mastermind', icon: '✨', desc: 'Score 90% or higher on the space quiz.' },
      { id: 'black_hole_physicist', title: 'Singularity Explorer', icon: '🕳️', desc: 'Interact with the black hole physics simulation.' }
    ];

    this.init();
  }

  init() {
    this.loadState();
    this.renderBadgeDrawer();
    this.updateHUD();
  }

  loadState() {
    try {
      this.xp = parseInt(localStorage.getItem('cosmic_xp') || '0', 10);
      const savedBadges = localStorage.getItem('cosmic_badges');
      this.unlocked = savedBadges ? JSON.parse(savedBadges) : {};
    } catch (e) {
      this.xp = 0;
      this.unlocked = {};
    }
  }

  saveState() {
    try {
      localStorage.setItem('cosmic_xp', this.xp.toString());
      localStorage.setItem('cosmic_badges', JSON.stringify(this.unlocked));
    } catch (e) {}
  }

  addXP(amount) {
    this.xp += amount;
    this.saveState();
    this.updateHUD();
  }

  unlock(badgeId) {
    if (this.unlocked[badgeId]) return; // already unlocked
    const badge = this.badges.find(b => b.id === badgeId);
    if (!badge) return;

    this.unlocked[badgeId] = {
      unlockedAt: new Date().toISOString()
    };
    this.addXP(250);
    this.saveState();
    this.renderBadgeDrawer();
    this.showToast(badge);

    if (window.cosmicAudio) window.cosmicAudio.playSuccess();
  }

  trackSectionVisit(sectionId) {
    this.visitedSections.add(sectionId);
    if (this.visitedSections.size >= 6) {
      this.unlock('cosmic_explorer');
    }
  }

  getLevelInfo() {
    // Level brackets: 0 -> Level 1 (Cadet), 500 -> Level 2 (Explorer), 1200 -> Level 3 (Commander), 2500 -> Level 4 (Grand Admiral)
    if (this.xp >= 3000) {
      return { level: 5, title: "Grand Admiral of Cosmos", rankBadge: "👑", nextXp: 5000 };
    } else if (this.xp >= 1800) {
      return { level: 4, title: "Fleet Commander", rankBadge: "🪐", nextXp: 3000 };
    } else if (this.xp >= 800) {
      return { level: 3, title: "Orbital Navigator", rankBadge: "🚀", nextXp: 1800 };
    } else if (this.xp >= 300) {
      return { level: 2, title: "Mission Specialist", rankBadge: "🛰️", nextXp: 800 };
    } else {
      return { level: 1, title: "Space Cadet", rankBadge: "🌟", nextXp: 300 };
    }
  }

  updateHUD() {
    const info = this.getLevelInfo();
    const rankTitleElem = document.getElementById('hudRankTitle');
    const rankLvlElem = document.getElementById('hudRankLevel');
    const xpElem = document.getElementById('hudXpDisplay');

    if (rankTitleElem) rankTitleElem.textContent = info.title;
    if (rankLvlElem) rankLvlElem.textContent = `LVL ${info.level}`;
    if (xpElem) xpElem.textContent = `${this.xp} XP`;
  }

  showToast(badge) {
    const toast = document.getElementById('achievementToast');
    if (!toast) return;

    const iconElem = toast.querySelector('.toast-icon');
    const titleElem = toast.querySelector('.toast-title');
    const descElem = toast.querySelector('.toast-desc');

    if (iconElem) iconElem.textContent = badge.icon;
    if (titleElem) titleElem.textContent = `ACHIEVEMENT UNLOCKED: ${badge.title}`;
    if (descElem) descElem.textContent = badge.desc;

    toast.classList.add('visible');
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 4500);
  }

  renderBadgeDrawer() {
    const container = document.getElementById('badgesGridContainer');
    if (!container) return;
    container.innerHTML = '';

    this.badges.forEach(badge => {
      const isUnlocked = !!this.unlocked[badge.id];
      const card = document.createElement('div');
      card.className = `badge-item ${isUnlocked ? 'unlocked' : 'locked'}`;
      card.innerHTML = `
        <div class="badge-icon">${badge.icon}</div>
        <div class="badge-info">
          <div class="badge-title">${badge.title}</div>
          <div class="badge-desc">${badge.desc}</div>
          <div class="badge-status">${isUnlocked ? '✓ UNLOCKED' : '🔒 LOCKED'}</div>
        </div>
      `;
      container.appendChild(card);
    });
  }
}

window.CosmicAchievements = CosmicAchievements;

