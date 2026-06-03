/* ================================================
   APP.JS — Game logic. You shouldn't need to
   edit this file unless you want to change how
   the game behaves (not the content).
   ================================================ */


/* ── STATE ─────────────────────────────────────── */

let currentRound = [];   // the 5 posts currently shown
let guessed = false;     // has the user tapped a button yet?


/* ── HELPERS ────────────────────────────────────── */

// Format large numbers:  1200000 → "1.2M"
function formatLikes(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}


/* ── PICK A ROUND ───────────────────────────────── */

function pickRound() {
  // Pick a random round from ROUNDS (defined in data.js)
  const index = Math.floor(Math.random() * ROUNDS.length);

  // Shuffle post order so the fake isn't always in the same spot
  currentRound = [...ROUNDS[index]].sort(() => Math.random() - 0.5);
}


/* ── BUILD THE FEED ─────────────────────────────── */

function renderFeed() {
  const feed = document.getElementById("feed");

  feed.innerHTML = currentRound.map(post => `

    <article class="post">

      <!-- Header: avatar, username, location -->
      <div class="post-header">
        <div class="avatar">${post.avatar}</div>
        <div>
          <p class="username">${post.username}</p>
          ${post.location ? `<p class="location">${post.location}</p>` : ""}
        </div>
      </div>

      <!-- Image area -->
      <div class="post-img">${post.img}</div>

      <!-- Action icons (cosmetic only) -->
      <div class="post-actions">
        <button class="action-icon" tabindex="-1" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <button class="action-icon" tabindex="-1" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
        <button class="action-icon push-right" tabindex="-1" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
      </div>

      <!-- Like count, caption, timestamp -->
      <p class="likes">${formatLikes(post.likes)} likes</p>
      <p class="caption"><strong>${post.username}</strong> ${post.caption}</p>
      <p class="timestamp">${post.time}</p>

      <!-- The guess button -->
      <div class="guess-wrap">
        <button class="guess-btn" data-id="${post.id}">
          This post is fake
        </button>
      </div>

    </article>

  `).join("");
}


/* ── HANDLE A GUESS ─────────────────────────────── */

function handleGuess(postId) {
  if (guessed) return;   // ignore extra taps
  guessed = true;

  const tapped = currentRound.find(p => p.id === postId);
  const isCorrect = tapped.fake;

  // Update every button's appearance
  currentRound.forEach(post => {
    const btn = document.querySelector(`[data-id="${post.id}"]`);
    if (!btn) return;

    btn.disabled = true;

    if (post.id === postId) {
      // The button the user tapped
      btn.classList.add(isCorrect ? "correct" : "wrong");
      btn.textContent = isCorrect
        ? "✓ Correct — this is fake"
        : "✗ Wrong — this is real";

    } else if (post.fake) {
      // Reveal the actual fake post if the user was wrong
      btn.classList.add("correct");
      btn.textContent = "← This was the fake one";
      btn.disabled = false;        // keep it readable
      btn.style.opacity = "1";
      btn.style.cursor = "default";
    }
  });

  // Show the result popup after a short pause
  setTimeout(() => showResult(isCorrect), 700);
}


/* ── RESULT POPUP ───────────────────────────────── */

function showResult(isCorrect) {
  const fakePost = currentRound.find(p => p.fake);

  document.getElementById("r-icon").textContent  = isCorrect ? "🎉" : "😬";
  document.getElementById("r-title").textContent = isCorrect ? "Got it!" : "Not quite.";
  document.getElementById("r-body").textContent  = isCorrect
    ? fakePost.clue
    : "The fake post was @" + fakePost.username + ". " + fakePost.clue;

  document.getElementById("result-screen").classList.remove("hidden");
}


/* ── RESET / PLAY AGAIN ─────────────────────────── */

function resetGame() {
  guessed = false;
  document.getElementById("result-screen").classList.add("hidden");
  pickRound();
  renderFeed();
  window.scrollTo({ top: 0, behavior: "smooth" });
}


/* ── INITIALISE ─────────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {

  // Tap on a "This post is fake" button
  document.body.addEventListener("click", e => {
    const btn = e.target.closest(".guess-btn");
    if (btn && !btn.disabled) {
      handleGuess(btn.dataset.id);
    }
  });

  // "Play Again" button in the result popup
  document.getElementById("play-again").addEventListener("click", resetGame);

  // Start the game
  pickRound();
  renderFeed();

});
