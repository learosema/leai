let a = []; // a[j][i]
let e = []; // e[j][i]
let jArr = []; // j$(0..19)
let sArr = []; // s$(0..19)
let pArr = []; // p$(0..19)
let o = []; // o[0..9][0..1]
let r = []; // r[0..19][0..1]
let xStr = "";
let g = 0; // gender code 0=f,1=m,2=n
let z = 0; // poem counter

// Helpers that map BASIC functions to JS
const INT = (n) => Math.floor(n);
const RND = (n) => Math.random() * n; // RND(1)*N equivalent was used in BASIC
const MID = (str, pos) => str.slice(pos - 1); // MID$(s,2) => slice from index 1
const LEFT = (str, n) => str.slice(0, n);
const CHR = (code) => String.fromCharCode(code);
const ASC = (ch) => ch.charCodeAt(0);

function initLexicon() {
  // Populate a[][] and e[][] (3 x 8)
  const pairs = [
    // j = 0 (f)
    ["Die", "e"], ["Eine", "e"], ["Jede", "e"], ["Manch'", "e"],
    ["Meine", "e"], ["Deine", "e"], ["Uns're", "e"], ["Eure", "e"],
    // j = 1 (m)
    ["Der", "e"], ["Ein", "er"], ["Jeder", "e"], ["Manch'", "er"],
    ["Mein", "er"], ["Dein", "er"], ["Unser", "e"], ["Euer", "e"],
    // j = 2 (n)
    ["Das", "e"], ["Ein", "es"], ["Jedes", "e"], ["Manch'", "es"],
    ["Mein", "es"], ["Dein", "es"], ["Unser", "es"], ["Euer", "es"]
  ];
  a = [[], [], []];
  e = [[], [], []];
  for (let row = 0; row < 3; row++) {
    for (let i = 0; i < 8; i++) {
      const idx = row * 8 + i;
      a[row][i] = pairs[idx][0];
      e[row][i] = pairs[idx][1];
    }
  }

  // j$(0..19)
  jArr = [
    "schoen","hell","licht","warm","zärtlich","golden","befreit","offen",
    "unendlich","duftend","leuchtend","beschwingt","frei","gelöst","erhaben","befreit",
    "vollendet","rund","frisch","heilig"
  ];

  // s$(0..19) -- nouns with gender prefix char f/m/n in front
  sArr = [
    "fSeele","nHerz","fFreude","fLust","fUnendlichkeit","nGlück","nJauchzen","fErfüllung",
    "mFriede","fSonne","mMond","nMeer","mWind","fBlume","fStille","fWärme",
    "fUmarmung","mHauch","mGlanz","nLeben"
  ];

  // p$(0..19) verbs
  pArr = [
    "streichelt","küßt","haucht","hofft","sehnt","träumt","schwebt","atmet",
    "lebt","pulsiert","stroemt","fliegt","glüht","hoeht","stillt","belebt",
    "verglüht","beruhigt","schmeichelt","erfragt"
  ];

  // o$(0..9,0..1) -- these are longer phrases, total 20 tokens -> fill 10x2
  const oFlat = [
    "den Horizont der Stille","den Überfluß der Fülle","das Silberlicht der Sterne","das Goettliche der Ferne",
    "das Klopfen uns'rer Herzen","das warme Licht von Kerzen","die Blüte uns'rer Jahre","das Glänzen Deiner Haare",
    "mein Herz in Deiner Hand","was früher ich nie fand","den Segen stiller Stunden","das Lindern alter Wunden",
    "das Loesen kleiner Zweiheit","in's Schweben stiller Einheit","die Tiefe Deiner Augen","den Saft von schwarzen Trauben",
    "die Weichheit Deiner Lippen","die Süße dran zu nippen","die Klarheit des Gedankens","das Ende allen Wankens"
  ];
  o = [];
  for (let i = 0; i < 10; i++) {
    o[i] = [ oFlat[i*2], oFlat[i*2 + 1] ];
  }

  // r$(0..19,0..1) -- many tokens, fill 20 x 2
  const rFlat = [
    "fHand","nBand","fLuft","mDuft","nGlück","nStück","fFigur","fNatur","nGesicht","nGedicht",
    "mTraum","mBaum","fBlüte","fSüße","fGänze","fLenze","nLachen","nErwachen","fKühle","fGefühle",
    // next line (the second DATA row)
    "fFreude","fTreue","mSaft","fKraft","fLinde","nGebinde","nKüssen","nWissen","fWeide","nGeschmeide",
    "fKrone","fWonne","nEntzücken","nEntrücken","nFinden","nBinden","nBemühen","nErblühen","nEntdecken","nWecken"
  ];
  // Note: rFlat above is 40 tokens (20 pairs). Fill r[0..19][0..1]
  r = [];
  for (let i = 0; i < 20; i++) {
    r[i] = [ rFlat[i], rFlat[i + 20] ]; // first 20 are first-column, next 20 second-column
  }
}

// GOSUB 20010: determine genus from LEFT$(x$,1)
function determineGenderFrom(x) {
  const first = LEFT(x,1);
  if (first === "f") return 0;
  if (first === "m") return 1;
  if (first === "n") return 2;
  return 0; // default
}

// Begin program
function generatePoem() {
  const result = {
    headline: '', 
    body: '',
  }
  

  // Equivalent to BASIC labels starting at 1000
  z = 0;

  while (true) {
    // --- block starting at 1000
    const s1 = INT(RND(1) * 20);
    xStr = sArr[s1];
    g = determineGenderFrom(xStr); // GOSUB 20010
    const s1Text = MID(xStr, 2);

    const aIndex = INT(RND(1) * 8);
    const a1 = a[g][aIndex];

    let s2 = INT(RND(1) * 20);
    if (s2 === s1) {
      // original uses GOTO 1030 (re-roll)
      do { s2 = INT(RND(1) * 20); } while (s2 === s1);
    }
    xStr = sArr[s2];
    g = determineGenderFrom(xStr); // note: original sets g by calling 20010 after setting x$
    const s2Text = MID(xStr, 2);

    let a2 = "des";
    if (g === 0) a2 = "der";
    let e2 = "es";
    if (g === 0) e2 = "";

    const t = `${a1} ${s1Text} ${a2} ${s2Text}${e2}`;

    // --- block starting at 2000
    let s3 = INT(RND(1) * 20);
    xStr = sArr[s3]; g = determineGenderFrom(xStr);
    const s3Text = MID(xStr, 2);

    let aIndex3 = INT(RND(1) * 8);
    const a3 = a[g][aIndex3];
    const e3 = e[g][aIndex3];

    const j3i = INT(RND(1) * 20);
    const j3 = jArr[j3i];

    const p3i = INT(RND(1) * 20);
    const p3 = pArr[p3i];

    let o3i = INT(RND(1) * 10);
    let r1 = INT(RND(1) * 2);
    const o3 = o[o3i][r1];
    const o5 = o[o3i][1 ^ r1];

    const v1 = `${a3} ${j3}${e3} ${s3Text} ${p3} ${o3}`;

    // --- block starting at 3000
    let j4i = INT(RND(1) * 20);
    if (j4i === j3i) {
      do { j4i = INT(RND(1) * 20); } while (j4i === j3i);
    }
    // uppercase first char of jArr[j4i] (original did CHR$(ASC(...) - 32)+MID$(...,2))
    const j4 = jArr[j4i].charAt(0).toUpperCase() + jArr[j4i].slice(1);

    let p4i = INT(RND(1) * 20);
    if (p4i === p3i) {
      do { p4i = INT(RND(1) * 20); } while (p4i === p3i);
    }
    const p4 = pArr[p4i];

    let r4i = INT(RND(1) * 20);
    let r2 = INT(RND(1) * 2);
    xStr = r[r4i][r2];
    g = determineGenderFrom(xStr);
    const r4Text = MID(xStr, 2);

    // a4: lowercase first letter? Original: CHR$(ASC(a$(g,a))+32)+MID$(a$(g,a),2)
    // that operation sets first char to lower-case by adding 32 to ASCII (assuming uppercase stored)
    // We'll mimic by making first letter lowercase.
    const a4Raw = a[g][INT(RND(1) * 8)]; // note: original reuses variable 'a' set INT(RND(1)*8) in 3060; but we already used aIndex3 earlier, safe to sample new:
    // BUT to be faithful we need to set 'a' before 3060. The original code does: a=INT(RND(1)*8):a4$=CHR$(ASC(a$(g,a))+32)+MID$(a$(g,a),2)
    // We'll replicate by sampling a new index here:
    const aForA4 = INT(RND(1) * 8);
    const a4 = a[g][aForA4].charAt(0).toLowerCase() + a[g][aForA4].slice(1);

    xStr = r[r4i][1 ^ r2];
    g = determineGenderFrom(xStr);
    const r6Text = MID(xStr, 2);

    let e6 = "e";
    if (g === 1) e6 = "er";
    if (g === 2) e6 = "es";

    const v2 = `${j4} ${p4} ${a4} ${r4Text}`;

    // --- block starting at 4000
    let s5 = INT(RND(1) * 20);
    if (s5 === s3) {
      do { s5 = INT(RND(1) * 20); } while (s5 === s3);
    }
    xStr = sArr[s5]; g = determineGenderFrom(xStr);
    const s5Text = MID(xStr, 2);

    const a5Index = INT(RND(1) * 8);
    const a5 = a[g][a5Index];
    const e5 = e[g][a5Index];

    let j5i = INT(RND(1) * 20);
    if (j5i === j4i || j5i === j3i) {
      do { j5i = INT(RND(1) * 20); } while (j5i === j4i || j5i === j3i);
    }
    let p5i = INT(RND(1) * 20);
    if (p5i === p4i || p5i === p3i) {
      do { p5i = INT(RND(1) * 20); } while (p5i === p4i || p5i === p3i);
    }
    const j5 = jArr[j5i];
    const p5 = pArr[p5i];

    const v3 = `${a5} ${j5}${e5} ${s5Text} ${p5} ${o5}`;

    // --- block starting at 5000
    let j6i = INT(RND(1) * 20);
    while (j6i === j3i || j6i === j4i || j6i === j5i) {
      j6i = INT(RND(1) * 20);
    }
    let j7i = INT(RND(1) * 20);
    while (j7i === j3i || j7i === j4i || j7i === j5i || j7i === j6i) {
      j7i = INT(RND(1) * 20);
    }
    const j6 = jArr[j6i].charAt(0).toUpperCase() + jArr[j6i].slice(1);
    const j7 = jArr[j7i];

    const v4 = `${j6}${e6}, ${j7}${e6} ${r6Text}`;

    // --- printing block 6000 onwards (PRINT #8 -> console.log)
    if (z === 0) {
      result.headline = t;
    }
    result.body += v1 + '\n';
    result.body += v2 + '\n';
    result.body += v3 + '\n';
    result.body += v4 + '\n';
    
    z = z + 1;
    if (z < 4) {
      // GOTO 2000 -> continue outer loop (we simply loop again)
      continue;
    } else {
      break; // END
    }

  } // end while
  
  // done
  return result
}


initLexicon(); 
const { headline, body } = generatePoem();
console.log(`${headline}\n\n\n${body}`);