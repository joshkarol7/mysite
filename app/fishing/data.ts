// ─────────────────────────────────────────────────────────────
// SPECIES LOG — the one source of truth. Edit freely.
//   caught: false  → renders as a target / wishlist
//   tier: S|A|B|C   → trophy ranking (caught fish only)
// ─────────────────────────────────────────────────────────────
export type Water = "salt" | "fresh";
export type Tier = "S" | "A" | "B" | "C";

export type Species = {
  name: string;
  latin: string;
  water: Water;
  where?: string;
  caught: boolean;
  tier?: Tier;
  note?: string;
};

export const SPECIES: Species[] = [
  { name: "Striped Bass", latin: "Morone saxatilis", water: "salt", where: "Long Island Sound", caught: true, tier: "S", note: "the home team" },
  { name: "Yellowfin Tuna", latin: "Thunnus albacares", water: "salt", where: "offshore", caught: true, tier: "S", note: "arms gone" },
  { name: "Mahi Mahi", latin: "Coryphaena hippurus", water: "salt", caught: true, tier: "S", note: "neon" },
  { name: "False Albacore", latin: "Euthynnus alletteratus", water: "salt", where: "Montauk", caught: true, tier: "A", note: "drag screamer" },
  { name: "Bluefish", latin: "Pomatomus saltatrix", water: "salt", where: "Montauk", caught: true, tier: "A", note: "teeth" },
  { name: "Bonito", latin: "Sarda sarda", water: "salt", caught: true, tier: "A" },
  { name: "Fluke", latin: "Paralichthys dentatus", water: "salt", where: "Long Island Sound", caught: true, tier: "B", note: "doormat hunt" },
  { name: "Tautog", latin: "Tautoga onitis", water: "salt", caught: true, tier: "B", note: "structure goblin" },
  { name: "Black Sea Bass", latin: "Centropristis striata", water: "salt", caught: true, tier: "B" },
  { name: "Largemouth Bass", latin: "Micropterus salmoides", water: "fresh", caught: true, tier: "B" },
  { name: "Smallmouth Bass", latin: "Micropterus dolomieu", water: "fresh", caught: true, tier: "B", note: "punches up" },
  { name: "Scup", latin: "Stenotomus chrysops", water: "salt", caught: true, tier: "C", note: "the gateway fish" },
  { name: "Sailfish", latin: "Istiophorus platypterus", water: "salt", where: "offshore", caught: false, note: "the dream" },
  { name: "Giant Trevally", latin: "Caranx ignobilis", water: "salt", where: "Indo-Pacific", caught: false, note: "someday, a flats trip" },
];

export const PHOTOS: string[] = [
  "/fishing/IMG_4294.JPG",
  "/fishing/FullSizeRender.jpeg",
  "/fishing/IMG_6591.jpg",
  "/fishing/B42F2120-BDBF-4F80-9416-1C7D86DD6299.jpg",
  "/fishing/3E0C9410-3FD2-4AE6-8EC4-6A89F1732C4D.jpg",
  "/fishing/E52F1BD8-E01B-45E5-85E4-71EAD7D9617E.jpg",
  "/fishing/FullSizeRender.jpg",
  "/fishing/IMG_1645.jpg",
  "/fishing/IMG_1486.jpg",
];

export const TIERS: { key: Tier; label: string; color: string; glow: string }[] = [
  { key: "S", label: "trophy", color: "#e5b567", glow: "rgba(229,181,103,0.35)" },
  { key: "A", label: "hard fighters", color: "#5cc49a", glow: "rgba(92,196,154,0.30)" },
  { key: "B", label: "bread & butter", color: "#5b8fb0", glow: "rgba(91,143,176,0.28)" },
  { key: "C", label: "still counts", color: "#8a7ca8", glow: "rgba(138,124,168,0.26)" },
];
