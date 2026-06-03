let currentRound = [];
let guessed = false;

function esc(str) {
  const d = document.createElement("div");
  d.appendChild(document.createTextNode(String(str)));
  return d.innerHTML;
}

function fmtLikes(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toString();
}

function pickRound() {
  const idx = Math.floor(Math.random() * ROUNDS.length);
  currentRound = [...ROUNDS[idx]].sort(() => Math.random() - 0.5);
}

function renderFeed() {
  const feed = document.getElementById("feed");
  feed.innerHTML = currentRound.map(post => `
    <article class="post-card" id="post-${esc(post.id)}">
      <div class="post-header">
        <div class="post-avatar">${esc(post.avatar)}</div>
        <div>
          <p class="post-username">${esc(post.username)}</p>
          ${post.location ? `<p class="post-location">${esc(post.location)}</p>` : ""}
        </div>
      </div>
      <div class="post-image">${esc(post.imagePlaceholder)}</div>
      <div class="post-actions">
        <button class="action-btn" tabindex="-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <button class="action-btn" tabindex="-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
        <button class="action-btn spacer" tabindex="-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
      </div>
      <p class="post-likes">${fmtLikes(post.likes)} likes</p>
      <p class="post-caption"><strong>${esc(post.username)}</strong> ${esc(post.caption)}</p>
      <p class="post-time">${esc(post.timestamp)}</p>
      <div class="guess-wrap">
        <button class="guess-btn" data-post="${esc(post.id)}">This post is fake</button>
      </div>
    </article>
  `).join("");
}

function handleGuess(postId) {
  if (guessed) return;
  guessed = true;

  const post = currentRound.find(p => p.id === postId);
  const isCorrect = post.isFake;

  currentRound.forEach(p => {
    const btn = document.querySelector(`[data-post="${p.id}"]`);
    if (!btn) return;
    btn.disabled = true;
    if (p.id === postId) {
      btn.classList.add(isCorrect ? "correct" : "wrong");
      btn.textContent = isCorrect ? "✓ Correct — this is fake" : "✗ Wrong — this is real";
    } else if (p.isFake) {
      btn.classList.add("correct");
      btn.textContent = "← This was the fake one";
      btn.disabled = false;
      btn.style.opacity = "1";
      btn.style.cursor = "default";
    }
  });

  setTimeout(() => showResult(post, isCorrect), 700);
}

function showResult(guessedPost, isCorrect) {
  const fakePost = currentRound.find(p => p.isFake);
  document.getElementById("result-icon").textContent = isCorrect ? "🎉" : "😬";
  document.getElementById("result-title").textContent = isCorrect ? "Got it!" : "Not quite.";
  document.getElementById("result-body").textContent = isCorrect
    ? fakePost.fakeClue
    : "The fake post was by @" + fakePost.username + ". " + fakePost.fakeClue;
  document.getElementById("result-screen").classList.remove("hidden");
}

function resetGame() {
  guessed = false;
  document.getElementById("result-screen").classList.add("hidden");
  pickRound();
  renderFeed();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", e => {
    const btn = e.target.closest(".guess-btn");
    if (btn && !btn.disabled) handleGuess(btn.dataset.post);
  });
  document.getElementById("play-again").addEventListener("click", resetGame);
  pickRound();
  renderFeed();
});
