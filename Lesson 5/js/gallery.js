/**
 * COSMIC UNIVERSE - Interactive Galaxy Gallery
 * Filterable discovery grid, favorites persistence, search indexing, and deep-space lightbox.
 */

class GalaxyGallery {
  constructor() {
    this.items = window.COSMIC_DATA.gallery;
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.showFavoritesOnly = false;
    this.favorites = this.loadFavorites();
    this.activeModalItem = null;

    this.init();
  }

  init() {
    this.setupFilters();
    this.setupSearch();
    this.setupModal();
    this.renderGallery();
  }

  loadFavorites() {
    try {
      const saved = localStorage.getItem('cosmic_gallery_favs');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveFavorites() {
    try {
      localStorage.setItem('cosmic_gallery_favs', JSON.stringify(this.favorites));
    } catch (e) {}
  }

  toggleFavorite(id, e) {
    if (e) e.stopPropagation();
    const idx = this.favorites.indexOf(id);
    if (idx >= 0) {
      this.favorites.splice(idx, 1);
    } else {
      this.favorites.push(id);
      if (window.cosmicAudio) window.cosmicAudio.playSuccess();
      if (window.cosmicAchievements) {
        window.cosmicAchievements.unlock('first_favorite');
      }
    }
    this.saveFavorites();
    this.renderGallery();
    if (this.activeModalItem && this.activeModalItem.id === id) {
      this.updateModalFavBtn();
    }
  }

  setupFilters() {
    const filterContainer = document.getElementById('galleryFilterButtons');
    if (!filterContainer) return;

    filterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      if (filter === 'favorites') {
        this.showFavoritesOnly = true;
        this.currentCategory = 'all';
      } else {
        this.showFavoritesOnly = false;
        this.currentCategory = filter;
      }

      this.renderGallery();
      if (window.cosmicAudio) window.cosmicAudio.playClick();
    });
  }

  setupSearch() {
    const searchInput = document.getElementById('gallerySearchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.renderGallery();
    });
  }

  setupModal() {
    const modal = document.getElementById('galleryDetailModal');
    const closeBtn = document.getElementById('closeGalleryModalBtn');
    if (!modal) return;

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('visible');
        this.activeModalItem = null;
        if (window.cosmicAudio) window.cosmicAudio.playClick();
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('visible');
        this.activeModalItem = null;
      }
    });

    const favModalBtn = document.getElementById('galleryModalFavBtn');
    if (favModalBtn) {
      favModalBtn.addEventListener('click', () => {
        if (this.activeModalItem) {
          this.toggleFavorite(this.activeModalItem.id);
        }
      });
    }
  }

  openModal(item) {
    this.activeModalItem = item;
    const modal = document.getElementById('galleryDetailModal');
    if (!modal) return;

    const imgElem = document.getElementById('modalImage');
    const titleElem = document.getElementById('modalTitle');
    const telElem = document.getElementById('modalTelescope');
    const distElem = document.getElementById('modalDistance');
    const constElem = document.getElementById('modalConstellation');
    const descElem = document.getElementById('modalDesc');
    const factElem = document.getElementById('modalFunFact');
    const statsContainer = document.getElementById('modalKeyStats');

    if (imgElem) {
      imgElem.src = item.image;
      imgElem.alt = item.title;
      // Handle fallback if network image fails
      imgElem.onerror = () => {
        imgElem.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%230b0f24'/><circle cx='400' cy='300' r='180' fill='%2338bdf8' opacity='0.3'/><text x='400' y='305' fill='%23ffffff' font-size='24' font-family='sans-serif' text-anchor='middle'>COSMIC DISCOVERY IMAGE</text></svg>";
      };
    }

    if (titleElem) titleElem.textContent = item.title;
    if (telElem) telElem.textContent = item.telescope;
    if (distElem) distElem.textContent = item.distance;
    if (constElem) constElem.textContent = item.constellation;
    if (descElem) descElem.textContent = item.description;
    if (factElem) factElem.textContent = item.funFact;

    if (statsContainer && item.keyStats) {
      statsContainer.innerHTML = '';
      for (let k in item.keyStats) {
        const row = document.createElement('div');
        row.className = 'modal-stat-row';
        row.innerHTML = `<span class="stat-name">${k}:</span> <span class="stat-val">${item.keyStats[k]}</span>`;
        statsContainer.appendChild(row);
      }
    }

    this.updateModalFavBtn();
    modal.classList.add('visible');
    if (window.cosmicAudio) window.cosmicAudio.playClick();
  }

  updateModalFavBtn() {
    const favBtn = document.getElementById('galleryModalFavBtn');
    if (!favBtn || !this.activeModalItem) return;
    const isFav = this.favorites.includes(this.activeModalItem.id);
    favBtn.innerHTML = isFav ? '❤️ SAVED TO FAVORITES' : '🤍 ADD TO FAVORITES';
    favBtn.classList.toggle('active', isFav);
  }

  renderGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const filtered = this.items.filter(item => {
      // Category check
      if (this.showFavoritesOnly) {
        if (!this.favorites.includes(item.id)) return false;
      } else if (this.currentCategory !== 'all' && item.category !== this.currentCategory) {
        return false;
      }

      // Search query check
      if (this.searchQuery) {
        const text = `${item.title} ${item.categoryName} ${item.telescope} ${item.constellation} ${item.description}`.toLowerCase();
        if (!text.includes(this.searchQuery)) return false;
      }

      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="gallery-empty-state">
          <div class="empty-icon">🔭</div>
          <h3>No Celestial Objects Found</h3>
          <p>No astronomical entries matched your current category or search query.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const isFav = this.favorites.includes(item.id);
      const card = document.createElement('div');
      card.className = 'gallery-card';
      card.innerHTML = `
        <div class="card-image-wrap">
          <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'300\\'><rect width=\\'400\\' height=\\'300\\' fill=\\'%230c102b\\'/><text x=\\'200\\' y=\\'150\\' fill=\\'%2338bdf8\\' text-anchor=\\'middle\\' font-family=\\'sans-serif\\'>Deep Space Discovery</text></svg>'">
          <button class="fav-heart-btn ${isFav ? 'active' : ''}" title="Favorite" aria-label="Favorite">
            ${isFav ? '❤️' : '🤍'}
          </button>
          <span class="card-badge">${item.categoryName}</span>
        </div>
        <div class="card-content">
          <h4 class="card-title">${item.title}</h4>
          <div class="card-distance">📍 ${item.distance}</div>
          <p class="card-snippet">${item.description.slice(0, 105)}...</p>
          <div class="card-footer">
            <span class="telescope-tag">${item.telescope.split(' ')[0]}</span>
            <span class="explore-link">INSPECT ➔</span>
          </div>
        </div>
      `;

      // Favorite toggle
      const favBtn = card.querySelector('.fav-heart-btn');
      favBtn.addEventListener('click', (e) => {
        this.toggleFavorite(item.id, e);
      });

      // Card click opens modal
      card.addEventListener('click', () => {
        this.openModal(item);
      });

      grid.appendChild(card);
    });
  }
}

window.GalaxyGallery = GalaxyGallery;

