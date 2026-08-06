/* ============================================================
 * TRAVEL — single source of truth
 * Every /travel-lab variant reads from this file.
 * Edit here once; all variants update.
 *
 * The whole page is built on TOP THREES — ranked, opinionated,
 * exactly three per category. Add a category, reorder picks,
 * swap notes freely. The constraint (only 3) is the point.
 * ============================================================ */

/* ---- TOP THREES ----------------------------------------------
 * Each category has exactly 3 picks, ranked 1 → 3.
 * `where` = context (country / state / region).
 * `note`  = the one-liner that earns the ranking.
 * `photo` = optional /travel image to pair with the pick.
 *
 * NOTE: picks + photo pairings below are placeholders seeded to
 * roughly match your photos — swap them for your real answers.
 * -------------------------------------------------------------- */
export type Pick = {
  name: string;
  where: string;
  note: string;
  photo?: string;
};

export type TopThree = {
  category: string;
  picks: [Pick, Pick, Pick];
};

export const TOP_THREES: TopThree[] = [
  {
    category: "Countries",
    picks: [
      { name: "China", where: "", note: "vast, ancient, and unlike anywhere else" },
      { name: "Vietnam", where: "", note: "the best food I've eaten, full stop" },
      { name: "Scotland", where: "", note: "highlands, whisky, and weather with a mood" },
    ],
  },
  {
    category: "Cities",
    picks: [
      { name: "Prague", where: "Czechia", note: "fairytale skyline, unreal beer" },
      { name: "Chongqing", where: "China", note: "cyberpunk hills and numbing hotpot" },
      { name: "Valencia", where: "Spain", note: "beach, paella, and Calatrava", photo: "/travel/IMG_6782.jpg" },
    ],
  },
  {
    category: "National Parks",
    picks: [
      { name: "Grand Teton", where: "Wyoming", note: "the most dramatic skyline in the Rockies" },
      { name: "Glacier", where: "Montana", note: "Going-to-the-Sun Road is unreal" },
      { name: "Canyonlands", where: "Utah", note: "Mars, but you can hike it" },
    ],
  },
  {
    category: "Ski Mountains",
    picks: [
      { name: "Alta", where: "Utah", note: "the best snow in North America — skiers only" },
      { name: "Tahoe", where: "California", note: "big terrain and bluebird days" },
      { name: "Jackson Hole", where: "Wyoming", note: "steep, deep, and no joke" },
    ],
  },
  {
    category: "Regional Fast Food",
    picks: [
      { name: "Cookout", where: "the Carolinas", note: "trays, shakes, and hush puppies" },
      { name: "Zippy's", where: "Hawaii", note: "chili, saimin, and plate lunch" },
      { name: "Greggs", where: "the UK", note: "the sausage roll is elite" },
    ],
  },
];

/* ---- PHOTOS ---------------------------------------------------
 * `o`       = orientation ("l" landscape / "p" portrait) for grid sizing.
 * `caption` = shown in the lightbox. These are my best guesses from
 *             the images — VERIFY / edit them.
 * -------------------------------------------------------------- */
export type Photo = {
  src: string;
  o: "l" | "p";
  caption: string;
};

export const PHOTOS: Photo[] = [
  { src: "/travel/IMG_9149.jpg", o: "l", caption: "Cope" },
  { src: "/travel/IMG_6830.jpg", o: "p", caption: "Hong Kong" },
  { src: "/travel/IMG_7263.jpg", o: "l", caption: "Cambodia" },
  { src: "/travel/IMG_1866.jpg", o: "l", caption: "Sicily" },
  { src: "/travel/IMG_6782.jpg", o: "l", caption: "Victoria Peak" },
  { src: "/travel/IMG_6747.jpg", o: "p", caption: "White Sands" },
  { src: "/travel/IMG_0807_Original.jpg", o: "l", caption: "Arches" },
  { src: "/travel/IMG_5776.jpg", o: "p", caption: "Valencia" },
  { src: "/travel/DSC00012_Original.jpg", o: "l", caption: "Baja California" },
  { src: "/travel/IMG_0945.jpg", o: "p", caption: "Jackson Hole" },
  { src: "/travel/IMG_5621.jpg", o: "p", caption: "Gaudi" },
  { src: "/travel/G0091040.JPG", o: "l", caption: "Alaska" },
];
