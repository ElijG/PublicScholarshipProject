

let currentRound = [];  
let guessed = false;     
let roundIndex = 0;    
let score = 0;


function formatLikes(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}



function pickRound() {
  currentRound = [...ROUNDS[roundIndex]].sort(() => Math.random() - 0.5);
}




function renderFeed() {
  const feed = document.getElementById("feed");

  feed.innerHTML = currentRound.map(post => `

    <article class="post">
 
      <div class="post-header">
        <div class="avatar">
          ${post.avatar.startsWith("assets/")
            ? `<img src="${post.avatar}" alt="avatar"/>`
            : post.avatar
          }
        </div>
        <div>
          <p class="username">${post.username}</p>
          ${post.location ? `<p class="location">${post.location}</p>` : ""}
        </div>
      </div>
 
      <div class="post-img">
        ${post.img.startsWith("assets/") && post.img.match(/\.(mp4|mov|webm)$/i)
          ? `<video src="${post.img}" autoplay loop muted playsinline style="width:100%;height:100%;object-fit:cover;"></video>`
          : post.img.startsWith("assets/")
          ? `<img src="${post.img}" alt="post image"/>`
          : post.img
        }
      </div>
 
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
 
      <p class="likes">${formatLikes(post.likes)} likes</p>
      <p class="caption"><strong>${post.username}</strong> ${post.caption}</p>
      <p class="timestamp">${post.time}</p>
 
      <div class="guess-wrap">
        <button class="guess-btn" data-id="${post.id}">
          This post is fake
        </button>
      </div>
 
    </article>
  `).join("");
}




function handleGuess(postId) {
  if (guessed) return;
  guessed = true;
 
  const tapped = currentRound.find(p => p.id === postId);
  const isCorrect = tapped.fake;
 
  if (isCorrect) score++;
 
  currentRound.forEach(post => {
    const btn = document.querySelector(`[data-id="${post.id}"]`);
    if (!btn) return;
    btn.disabled = true;
 
    if (post.id === postId) {
      btn.classList.add(isCorrect ? "correct" : "wrong");
      btn.textContent = isCorrect
        ? "Correct Guess"
        : "Incorrect";
    } else if (post.fake) {
      btn.classList.add("correct");
      btn.textContent = "← This was the fake one";
      btn.disabled = false;
      btn.style.opacity = "1";
      btn.style.cursor = "default";
    }
  });


  setTimeout(() => showResult(isCorrect), 700);
}




function showResult(isCorrect) {
  const fakePost = currentRound.find(p => p.fake);

  document.getElementById("r-icon").textContent  = isCorrect ? "Example other text" : "Example other text";
  document.getElementById("r-title").textContent = isCorrect ? "Correct" : "Incorrect";
  document.getElementById("r-body").textContent  = isCorrect
    ? fakePost.clue
    : "The fake post was @" + fakePost.username + ". " + fakePost.clue;
  document.getElementById("r-round").textContent = `Round ${roundIndex + 1} of ${ROUNDS.length}`;
  const isLastRound = roundIndex === ROUNDS.length - 1;
document.getElementById("next-btn").textContent = isLastRound ? "See Results" : "Next Round →";
  document.getElementById("feed").classList.add("hidden");
  document.querySelector(".banner").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}


function resetGame() {
  guessed = false;
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("feed").classList.remove("hidden");
  document.querySelector(".banner").classList.remove("hidden");
  pickRound();
  renderFeed();
  window.scrollTo({ top: 0, behavior: "smooth" });
}


document.addEventListener("DOMContentLoaded", () => {

 
  document.body.addEventListener("click", e => {
    const btn = e.target.closest(".guess-btn");
    if (btn && !btn.disabled) {
      handleGuess(btn.dataset.id);
    }
  });

 
  document.getElementById("play-again").addEventListener("click", resetGame);

 
  pickRound();
  renderFeed();

});
function showConclusion() {
  document.getElementById("result-screen").classList.add("hidden");
 

  const msgs = [
    "exampople",
    "example123",
    "example123",
    "example123"
  ];
 
  document.getElementById("c-score").textContent  = `${score} / ${ROUNDS.length}`;
  document.getElementById("c-message").textContent = msgs[score];
 
  document.getElementById("conclusion-screen").classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function handleNext() {
  const isLastRound = roundIndex === ROUNDS.length - 1;
 
  if (isLastRound) {
    showConclusion();
  } else {
    roundIndex++;
    guessed = false;
    document.getElementById("result-screen").classList.add("hidden");
    document.getElementById("feed").classList.remove("hidden");
    document.querySelector(".banner").classList.remove("hidden");
    pickRound();
    renderFeed();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
