// ─────────────────────────────────────────────────────────────
// PLACEHOLDER LIST — swap for Josh's real catches.
// img: /fish/<slug>.jpg (color plates) or /library/fish/<slug>.jpg
// ─────────────────────────────────────────────────────────────
export type Fish = { name: string; latin: string; img: string; where?: string };

const P = "/fish/";       // hand-picked color plates
const L = "/library/fish/"; // the broader archive

export const CAUGHT: Fish[] = [
  { name: "Striped Bass", latin: "Morone saxatilis", img: `${P}striped-bass.jpg`, where: "Long Island Sound" },
  { name: "Bluefish", latin: "Pomatomus saltatrix", img: `${P}bluefish.jpg`, where: "Montauk" },
  { name: "Fluke", latin: "Paralichthys dentatus", img: `${P}fluke.jpg`, where: "Long Island Sound" },
  { name: "Tautog", latin: "Tautoga onitis", img: `${P}tautog.jpg` },
  { name: "Black Sea Bass", latin: "Centropristis striata", img: `${P}black-sea-bass.jpg` },
  { name: "Scup", latin: "Stenotomus chrysops", img: `${P}scup.jpg` },
  { name: "Bonito", latin: "Sarda sarda", img: `${P}bonito.jpg` },
  { name: "False Albacore", latin: "Euthynnus alletteratus", img: `${P}false-albacore.jpg`, where: "Montauk" },
  { name: "Largemouth Bass", latin: "Micropterus salmoides", img: `${P}largemouth-bass.jpg` },
  { name: "Smallmouth Bass", latin: "Micropterus dolomieu", img: `${P}smallmouth-bass.jpg` },
  { name: "Yellowfin Tuna", latin: "Thunnus albacares", img: `${P}yellowfin-tuna.jpg`, where: "offshore" },
  { name: "Mahi Mahi", latin: "Coryphaena hippurus", img: `${P}mahi-mahi.jpg` },
  { name: "Bluegill", latin: "Lepomis macrochirus", img: `${L}bluegill.jpg` },
  { name: "Pumpkinseed", latin: "Lepomis gibbosus", img: `${L}pumpkinseed.jpg` },
  { name: "Black Crappie", latin: "Pomoxis nigromaculatus", img: `${L}black-crappie.jpg` },
  { name: "Rock Bass", latin: "Ambloplites rupestris", img: `${L}rock-bass.jpg` },
  { name: "Yellow Perch", latin: "Perca flavescens", img: `${L}yellow-perch.jpg` },
  { name: "White Perch", latin: "Morone americana", img: `${L}white-perch.jpg` },
  { name: "Carp", latin: "Cyprinus carpio", img: `${L}carp.jpg` },
  { name: "Channel Catfish", latin: "Ictalurus punctatus", img: `${L}channel-catfish.jpg` },
  { name: "Bowfin", latin: "Amia calva", img: `${L}bowfin.jpg` },
  { name: "Chain Pickerel", latin: "Esox niger", img: `${L}chain-pickerel.jpg` },
  { name: "Northern Pike", latin: "Esox lucius", img: `${L}northern-pike.jpg` },
  { name: "Walleye", latin: "Sander vitreus", img: `${L}walleye.jpg` },
  { name: "Brook Trout", latin: "Salvelinus fontinalis", img: `${L}brook-trout.jpg` },
  { name: "Brown Trout", latin: "Salmo trutta", img: `${L}brown-trout.jpg` },
  { name: "Rainbow Trout", latin: "Oncorhynchus mykiss", img: `${L}rainbow-trout.jpg` },
  { name: "Lake Trout", latin: "Salvelinus namaycush", img: `${L}lake-trout.jpg` },
  { name: "Atlantic Salmon", latin: "Salmo salar", img: `${L}atlantic-salmon.jpg` },
  { name: "American Shad", latin: "Alosa sapidissima", img: `${L}shad.jpg` },
  { name: "Weakfish", latin: "Cynoscion regalis", img: `${L}weakfish.jpg` },
  { name: "Red Drum", latin: "Sciaenops ocellatus", img: `${L}red-drum.jpg` },
  { name: "Spotted Seatrout", latin: "Cynoscion nebulosus", img: `${L}spotted-seatrout.jpg` },
  { name: "Atlantic Croaker", latin: "Micropogonias undulatus", img: `${L}atlantic-croaker.jpg` },
  { name: "Spot", latin: "Leiostomus xanthurus", img: `${L}spot.jpg` },
  { name: "Northern Kingfish", latin: "Menticirrhus saxatilis", img: `${L}northern-kingfish.jpg` },
  { name: "Sea Robin", latin: "Prionotus carolinus", img: `${L}sea-robin.jpg` },
  { name: "Atlantic Mackerel", latin: "Scomber scombrus", img: `${L}atlantic-mackerel.jpg` },
  { name: "Spanish Mackerel", latin: "Scomberomorus maculatus", img: `${L}spanish-mackerel.jpg` },
  { name: "Atlantic Cod", latin: "Gadus morhua", img: `${L}atlantic-cod.jpg` },
  { name: "Pollock", latin: "Pollachius virens", img: `${L}pollock.jpg` },
  { name: "Winter Flounder", latin: "Pseudopleuronectes americanus", img: `${L}winter-flounder.jpg` },
  { name: "American Eel", latin: "Anguilla rostrata", img: `${L}american-eel.jpg` },
  { name: "Longnose Gar", latin: "Lepisosteus osseus", img: `${L}longnose-gar.jpg` },
  { name: "Sheepshead", latin: "Archosargus probatocephalus", img: `${L}sheepshead.jpg` },
  { name: "Snook", latin: "Centropomus undecimalis", img: `${L}snook.jpg` },
];

export const WANT: Fish[] = [
  { name: "Sailfish", latin: "Istiophorus platypterus", img: `${P}sailfish.jpg`, where: "offshore" },
  { name: "Giant Trevally", latin: "Caranx ignobilis", img: `${P}giant-trevally.jpg`, where: "Indo-Pacific" },
  { name: "Tarpon", latin: "Megalops atlanticus", img: `${L}tarpon.jpg`, where: "Florida" },
  { name: "Permit", latin: "Trachinotus falcatus", img: `${L}permit.jpg`, where: "the flats" },
  { name: "Bonefish", latin: "Albula vulpes", img: `${L}bonefish.jpg`, where: "the flats" },
  { name: "Swordfish", latin: "Xiphias gladius", img: `${L}swordfish.jpg`, where: "the canyons" },
  { name: "Wahoo", latin: "Acanthocybium solandri", img: `${L}wahoo.jpg` },
  { name: "Cobia", latin: "Rachycentron canadum", img: `${L}cobia.jpg` },
  { name: "Great Barracuda", latin: "Sphyraena barracuda", img: `${L}great-barracuda.jpg` },
  { name: "Muskellunge", latin: "Esox masquinongy", img: `${L}muskellunge.jpg` },
  { name: "King Mackerel", latin: "Scomberomorus cavalla", img: `${L}king-mackerel.jpg` },
  { name: "Amberjack", latin: "Seriola dumerili", img: `${L}amberjack.jpg` },
  { name: "Arctic Char", latin: "Salvelinus alpinus", img: `${L}arctic-char.jpg`, where: "the far north" },
  { name: "Golden Mahseer", latin: "Tor putitora", img: `${L}mahseer.jpg`, where: "the Himalaya" },
  { name: "Black Drum", latin: "Pogonias cromis", img: `${L}black-drum.jpg` },
  { name: "Chinook Salmon", latin: "Oncorhynchus tshawytscha", img: `${L}chinook-salmon.jpg`, where: "the Pacific" },
];

// caption = the funny one-liner. Rewrite these in your own voice.
export type Shot = { src: string; caption: string };

export const PHOTOS: Shot[] = [
  { src: "/fishing/IMG_4294.JPG", caption: "party-boat tog, dinner secured" },
  { src: "/fishing/IMG_6591.jpg", caption: "ran it way offshore, found one" },
  { src: "/fishing/B42F2120-BDBF-4F80-9416-1C7D86DD6299.jpg", caption: "you'd scream too" },
  { src: "/fishing/3E0C9410-3FD2-4AE6-8EC4-6A89F1732C4D.jpg", caption: "reservoir donkey, real casual about it" },
  { src: "/fishing/E52F1BD8-E01B-45E5-85E4-71EAD7D9617E.jpg", caption: "doormat fluke, college era" },
  { src: "/fishing/FullSizeRender.jpg", caption: "fall-run striper on the swing" },
  { src: "/fishing/IMG_1645.jpg", caption: "3am, zero regrets" },
  { src: "/fishing/IMG_1486.jpg", caption: "double up with the boys, soaked through" },
  { src: "/fishing/704A9654-9C3D-444D-8BB1-617852E6CAA0.jpg", caption: "kept the shades on for the pike" },
  { src: "/fishing/FullSizeRender.jpeg", caption: "cold water, hot laker" },
];
