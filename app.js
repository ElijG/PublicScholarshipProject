let currentRound = [];
let guessed = false;

function fmtLikes(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + "K";
  return n.toString();
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
        <button class="action-btn" aria-hidden="true" tabindex="-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <button class="action-btn" aria-hidden="true" tabindex="-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
        <button class="action-btn spacer" aria-hidden="true" tabindex="-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
      </div>
 
      <p class="post-likes">${fmtLikes(post.likes)} likes</p>
      <p class="post-caption">${esc(post.caption)}</p>
      <p class="post-time">${esc(post.timestamp)}</p>
 
      <div class="guess-wrap">
        <button
          class="guess-btn"
          data-post="${esc(post.id)}"
          aria-label="Flag this post as fake"
        >This post is fake</button>
      </div>
 
    </article>
  `).join("");
}
 
