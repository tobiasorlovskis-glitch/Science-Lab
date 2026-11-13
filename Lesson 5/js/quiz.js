/**
 * COSMIC UNIVERSE - Interactive Space Quiz & Astrophysics Terminal
 * Multi-difficulty question bank, streak multiplier, instant feedback,
 * and scientific explanation cards.
 */

class SpaceQuiz {
  constructor() {
    this.allQuestions = window.COSMIC_DATA.quiz;
    this.currentDifficulty = 'all'; // all, easy, medium, hard
    this.filteredQuestions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.answeredState = false;
    this.userAnswers = [];

    this.init();
  }

  init() {
    this.setupDifficultyTabs();
    this.setupRestartButton();
    this.resetQuiz();
  }

  setupDifficultyTabs() {
    const tabContainer = document.getElementById('quizDifficultyTabs');
    if (!tabContainer) return;

    tabContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.diff-tab-btn');
      if (!btn) return;
      tabContainer.querySelectorAll('.diff-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      this.currentDifficulty = btn.dataset.diff;
      this.resetQuiz();
      if (window.cosmicAudio) window.cosmicAudio.playClick();
    });
  }

  setupRestartButton() {
    const restartBtn = document.getElementById('quizRestartBtn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        this.resetQuiz();
        if (window.cosmicAudio) window.cosmicAudio.playClick();
      });
    }

    const nextBtn = document.getElementById('quizNextBtn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.nextQuestion();
      });
    }
  }

  resetQuiz() {
    if (this.currentDifficulty === 'all') {
      this.filteredQuestions = [...this.allQuestions];
    } else {
      this.filteredQuestions = this.allQuestions.filter(q => q.difficulty === this.currentDifficulty);
    }

    // Shuffle questions
    this.filteredQuestions.sort(() => Math.random() - 0.5);

    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.answeredState = false;
    this.userAnswers = [];

    // Hide summary, show question card
    const summaryCard = document.getElementById('quizResultsScreen');
    const questionCard = document.getElementById('quizActiveCard');
    if (summaryCard) summaryCard.classList.remove('visible');
    if (questionCard) questionCard.classList.remove('hidden');

    this.renderQuestion();
  }

  renderQuestion() {
    const q = this.filteredQuestions[this.currentIndex];
    if (!q) {
      this.showResults();
      return;
    }

    this.answeredState = false;

    // Update Progress & Score header
    const counterElem = document.getElementById('quizCounter');
    if (counterElem) counterElem.textContent = `QUESTION ${this.currentIndex + 1} OF ${this.filteredQuestions.length}`;

    const scoreElem = document.getElementById('quizScoreDisplay');
    if (scoreElem) scoreElem.textContent = `SCORE: ${this.score}`;

    const streakElem = document.getElementById('quizStreakDisplay');
    if (streakElem) streakElem.textContent = `STREAK: ${this.streak} 🔥`;

    const diffBadge = document.getElementById('quizDiffBadge');
    if (diffBadge) {
      diffBadge.textContent = q.difficulty.toUpperCase();
      diffBadge.className = `diff-badge ${q.difficulty}`;
    }

    const catElem = document.getElementById('quizCategoryTag');
    if (catElem) catElem.textContent = q.category;

    // Question text
    const textElem = document.getElementById('quizQuestionText');
    if (textElem) textElem.textContent = q.question;

    // Reset explanation card & next button
    const expBox = document.getElementById('quizExplanationBox');
    if (expBox) expBox.classList.remove('visible');

    const nextBtn = document.getElementById('quizNextBtn');
    if (nextBtn) nextBtn.style.display = 'none';

    // Options
    const optContainer = document.getElementById('quizOptionsContainer');
    if (!optContainer) return;
    optContainer.innerHTML = '';

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `<span class="opt-letter">${String.fromCharCode(65 + idx)}</span> <span class="opt-text">${opt}</span>`;

      btn.addEventListener('click', () => {
        this.selectAnswer(idx, btn);
      });

      optContainer.appendChild(btn);
    });
  }

  selectAnswer(selectedIndex, btnElem) {
    if (this.answeredState) return;
    this.answeredState = true;

    const q = this.filteredQuestions[this.currentIndex];
    const isCorrect = selectedIndex === q.answer;
    const optBtns = document.querySelectorAll('.quiz-option-btn');

    // Highlight chosen and correct
    optBtns.forEach((b, idx) => {
      b.disabled = true;
      if (idx === q.answer) {
        b.classList.add('correct');
      } else if (idx === selectedIndex) {
        b.classList.add('incorrect');
      }
    });

    if (isCorrect) {
      this.streak++;
      if (this.streak > this.maxStreak) this.maxStreak = this.streak;
      const pts = 100 + (this.streak > 1 ? (this.streak - 1) * 25 : 0);
      this.score += pts;
      if (window.cosmicAudio) window.cosmicAudio.playSuccess();
    } else {
      this.streak = 0;
      if (window.cosmicAudio) window.cosmicAudio.playAlert();
    }

    this.userAnswers.push({
      question: q.question,
      selected: selectedIndex,
      correct: q.answer,
      isCorrect: isCorrect
    });

    // Show scientific explanation
    const expBox = document.getElementById('quizExplanationBox');
    const expText = document.getElementById('quizExplanationText');
    const expTitle = document.getElementById('quizExplanationTitle');
    if (expBox && expText && expTitle) {
      expTitle.textContent = isCorrect ? "✅ CORRECT ANALYSIS" : "❌ INCORRECT TELEMETRY";
      expTitle.className = isCorrect ? "exp-title correct" : "exp-title incorrect";
      expText.textContent = q.explanation;
      expBox.classList.add('visible');
    }

    // Show Next Question button
    const nextBtn = document.getElementById('quizNextBtn');
    if (nextBtn) {
      nextBtn.style.display = 'inline-flex';
      nextBtn.textContent = this.currentIndex + 1 >= this.filteredQuestions.length ? "VIEW MISSION RESULTS ➔" : "NEXT QUESTION ➔";
    }

    const scoreElem = document.getElementById('quizScoreDisplay');
    if (scoreElem) scoreElem.textContent = `SCORE: ${this.score}`;

    const streakElem = document.getElementById('quizStreakDisplay');
    if (streakElem) streakElem.textContent = `STREAK: ${this.streak} 🔥`;
  }

  nextQuestion() {
    this.currentIndex++;
    if (this.currentIndex >= this.filteredQuestions.length) {
      this.showResults();
    } else {
      this.renderQuestion();
      if (window.cosmicAudio) window.cosmicAudio.playClick();
    }
  }

  showResults() {
    const questionCard = document.getElementById('quizActiveCard');
    const summaryCard = document.getElementById('quizResultsScreen');
    if (questionCard) questionCard.classList.add('hidden');
    if (summaryCard) summaryCard.classList.add('visible');

    const total = this.filteredQuestions.length;
    const correctCount = this.userAnswers.filter(a => a.isCorrect).length;
    const accuracy = Math.round((correctCount / total) * 100);

    // Determine Cosmos Rank
    let rank = "Space Cadet";
    let rankIcon = "🚀";
    if (accuracy >= 90) {
      rank = "Grand Astrophysicist";
      rankIcon = "🌌";
      if (window.cosmicAchievements) window.cosmicAchievements.unlock('quiz_ace');
    } else if (accuracy >= 70) {
      rank = "Flight Director";
      rankIcon = "🛰️";
    } else if (accuracy >= 50) {
      rank = "Orbital Specialist";
      rankIcon = "🪐";
    }

    if (window.cosmicAchievements) {
      window.cosmicAchievements.addXP(this.score);
      window.cosmicAchievements.unlock('space_scholar');
    }

    const rankTitleElem = document.getElementById('resultsRankTitle');
    if (rankTitleElem) rankTitleElem.innerHTML = `${rankIcon} ${rank}`;

    const accElem = document.getElementById('resultsAccuracy');
    if (accElem) accElem.textContent = `${accuracy}% (${correctCount}/${total})`;

    const scoreResultElem = document.getElementById('resultsFinalScore');
    if (scoreResultElem) scoreResultElem.textContent = `${this.score} PTS`;

    const streakResultElem = document.getElementById('resultsMaxStreak');
    if (streakResultElem) streakResultElem.textContent = `${this.maxStreak} 🔥`;

    if (window.cosmicAudio) window.cosmicAudio.playSuccess();
  }
}

window.SpaceQuiz = SpaceQuiz;

