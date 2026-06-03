/* ================================================
   DATA.JS — All post content lives here.

   To add a new round:
     1. Copy an existing [...] block below
     2. Paste it as a new entry in ROUNDS
     3. Set  fake: true  on exactly ONE post
     4. Write a clear fakeClue explaining why

   Post fields:
     id       — unique string, no spaces
     username — shown in the post header
     avatar   — emoji shown as the profile picture
     location — small text under the username (optional)
     img      — emoji shown as the post image
               (swap for an image path once you have photos)
     likes    — number shown as the like count
     caption  — the post body text
     time     — e.g. "3 hours ago"
     fake     — true = this is the fake post
     clue     — explanation shown after the user guesses
   ================================================ */


const ROUNDS = [


  /* ── ROUND 1 ─────────────────────────────────── */
  [
    {
      id:       "r1p1",
      username: "nasa",
      avatar:   "🚀",
      location: "Kennedy Space Center",
      img:      "🌌",
      likes:    2481392,
      caption:  "Earth from 400 miles up. Our astronauts aboard the ISS captured this view of the Pacific Ocean.",
      time:     "3 hours ago",
      fake:     false,
      clue:     ""
    },
    {
      id:       "r1p2",
      username: "natgeo",
      avatar:   "🦁",
      location: "Serengeti, Tanzania",
      img:      "🦁",
      likes:    1204830,
      caption:  "A lion family at dusk. The Serengeti remains one of the last places this scene plays out daily.",
      time:     "5 hours ago",
      fake:     false,
      clue:     ""
    },
    {
      id:       "r1p3",
      username: "n4sa_official",        /* <-- '4' instead of 'a' */
      avatar:   "🚀",
      location: "Washington D.C.",
      img:      "🌍",
      likes:    847,
      caption:  "NASA has announced FREE tickets to watch a rocket launch!! Click the link in our bio before they run out!!!",
      time:     "1 hour ago",
      fake:     true,                   /* <-- THIS IS THE FAKE */
      clue:     "The username uses '4' instead of 'a' — a classic impersonation trick. NASA never gives away free launch tickets on Instagram. Only 847 likes for a supposed NASA account is a huge red flag."
    },
    {
      id:       "r1p4",
      username: "whitehouse",
      avatar:   "🏛️",
      location: "Washington, D.C.",
      img:      "🏛️",
      likes:    487291,
      caption:  "The President today signed the new infrastructure bill — the largest investment in American roads and bridges in decades.",
      time:     "6 hours ago",
      fake:     false,
      clue:     ""
    },
    {
      id:       "r1p5",
      username: "nike",
      avatar:   "👟",
      location: "Beaverton, Oregon",
      img:      "✔️",
      likes:    892041,
      caption:  "Just do it. New Air Max — dropping this Friday. Link in bio.",
      time:     "4 hours ago",
      fake:     false,
      clue:     ""
    }
  ],


  /* ── ROUND 2 ─────────────────────────────────── */
  [
    {
      id:       "r2p1",
      username: "who",
      avatar:   "🏥",
      location: "Geneva, Switzerland",
      img:      "🩺",
      likes:    391042,
      caption:  "Hand hygiene remains one of the most effective ways to prevent infection. Wash hands for at least 20 seconds.",
      time:     "2 hours ago",
      fake:     false,
      clue:     ""
    },
    {
      id:       "r2p2",
      username: "worldhealthorg",       /* <-- not the real WHO handle */
      avatar:   "🏥",
      location: "Geneva",
      img:      "💊",
      likes:    3201,
      caption:  "BREAKING: WHO confirms drinking hot lemon water every morning CURES all viral infections. Share before they delete this!!",
      time:     "45 minutes ago",
      fake:     true,                   /* <-- THIS IS THE FAKE */
      clue:     "WHO would never make an unscientific cure claim. 'Share before they delete this' is conspiracy-bait language. Real WHO posts cite sources and have millions of likes — not 3,201."
    },
    {
      id:       "r2p3",
      username: "nytimes",
      avatar:   "📰",
      location: "New York, NY",
      img:      "🗞️",
      likes:    214830,
      caption:  "The Federal Reserve held interest rates steady today, citing ongoing uncertainty in global markets.",
      time:     "1 hour ago",
      fake:     false,
      clue:     ""
    },
    {
      id:       "r2p4",
      username: "apple",
      avatar:   "🍎",
      location: "Cupertino, CA",
      img:      "📱",
      likes:    1032840,
      caption:  "Shot on iPhone. Every detail, every moment. #ShotOniPhone",
      time:     "8 hours ago",
      fake:     false,
      clue:     ""
    },
    {
      id:       "r2p5",
      username: "natgeo",
      avatar:   "🌿",
      location: "Amazon Basin, Brazil",
      img:      "🌿",
      likes:    988320,
      caption:  "The Amazon rainforest is home to 10% of all species on Earth. Protecting it matters.",
      time:     "3 hours ago",
      fake:     false,
      clue:     ""
    }
  ],


  /* ── ROUND 3 ─────────────────────────────────── */
  [
    {
      id:       "r3p1",
      username: "espn",
      avatar:   "🏀",
      location: "Bristol, CT",
      img:      "🏀",
      likes:    703912,
      caption:  "What a finish. Buzzer beater to send it to overtime. Full highlights on ESPN+ now.",
      time:     "2 hours ago",
      fake:     false,
      clue:     ""
    },
    {
      id:       "r3p2",
      username: "tesla",
      avatar:   "⚡",
      location: "Austin, TX",
      img:      "🚗",
      likes:    1120400,
      caption:  "Model 3. Designed for the road ahead. Order yours today.",
      time:     "5 hours ago",
      fake:     false,
      clue:     ""
    },
    {
      id:       "r3p3",
      username: "google",
      avatar:   "🔍",
      location: "Mountain View, CA",
      img:      "🔍",
      likes:    882041,
      caption:  "Search smarter. Try the new AI-powered search features available now.",
      time:     "4 hours ago",
      fake:     false,
      clue:     ""
    },
    {
      id:       "r3p4",
      username: "n1ke_giveaway_official",  /* <-- '1' instead of 'i' */
      avatar:   "👟",
      location: "Nike HQ",
      img:      "🎁",
      likes:    214,
      caption:  "HUGE GIVEAWAY! Nike is giving away 500 pairs of shoes! Follow us, like this post, and tag 3 friends. Winners announced tomorrow!",
      time:     "30 minutes ago",
      fake:     true,                      /* <-- THIS IS THE FAKE */
      clue:     "The username swaps 'i' for '1'. Real Nike would have millions of likes on a giveaway, not 214. Follow + like + tag is the most common fake giveaway formula on social media."
    },
    {
      id:       "r3p5",
      username: "nps_gov",
      avatar:   "🏕️",
      location: "Yellowstone National Park",
      img:      "🏔️",
      likes:    329810,
      caption:  "Old Faithful erupted 17 times today. Plan your visit at nps.gov. #Yellowstone",
      time:     "6 hours ago",
      fake:     false,
      clue:     ""
    }
  ]


]; /* end ROUNDS */
