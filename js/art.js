// =====================================================================
//  Illustrations vectorielles : scènes, plan, portraits.
// =====================================================================

const ART = {};

// ---------- Portraits (style photo d'identité) ----------
ART.portrait = (s) => {
  const L = s.look;
  let hair = '';
  if (L.style === 'short') {
    hair = `<path d="M56 108 C 50 50, 150 50, 144 108 C 142 80, 124 66, 100 66 C 76 66, 58 80, 56 108 Z" fill="${L.hair}"/>`;
  } else if (L.style === 'bun') {
    hair = `<circle cx="100" cy="50" r="17" fill="${L.hair}"/>
            <path d="M57 104 C 52 54, 148 54, 143 104 C 140 78, 122 64, 100 64 C 78 64, 60 78, 57 104 Z" fill="${L.hair}"/>`;
  } else if (L.style === 'long') {
    hair = `<path d="M54 110 C 46 46, 154 46, 146 110 L 150 178 C 140 186, 132 182, 134 150 C 136 96, 120 70, 100 68 C 80 70, 64 96, 66 150 C 68 182, 60 186, 50 178 Z" fill="${L.hair}"/>`;
  } else if (L.style === 'bald') {
    hair = `<path d="M58 112 C 56 86, 64 76, 70 74 L 68 112 Z" fill="${L.hair}"/>
            <path d="M142 112 C 144 86, 136 76, 130 74 L 132 112 Z" fill="${L.hair}"/>`;
  }
  const glasses = L.glasses
    ? `<g fill="none" stroke="#2a2a2a" stroke-width="2"><circle cx="84" cy="108" r="11"/><circle cx="116" cy="108" r="11"/><path d="M95 108 h10"/></g>`
    : '';
  return `
  <svg viewBox="0 0 200 240" class="portrait-svg" aria-hidden="true">
    <rect width="200" height="240" fill="#cdced0"/>
    <path d="M14 240 C 22 182, 66 168, 100 168 C 134 168, 178 182, 186 240 Z" fill="${L.cloth}"/>
    <rect x="86" y="140" width="28" height="34" fill="${L.skin}"/>
    <path d="M86 168 L100 186 L114 168 Z" fill="${L.skin}" opacity=".85"/>
    <ellipse cx="100" cy="108" rx="42" ry="52" fill="${L.skin}"/>
    ${hair}
    <circle cx="84" cy="108" r="3.2" fill="#221d1a"/><circle cx="116" cy="108" r="3.2" fill="#221d1a"/>
    <path d="M78 98 q6 -4 12 0 M110 98 q6 -4 12 0" stroke="#4a3a30" stroke-width="2" fill="none"/>
    <path d="M100 112 q-3 12 0 16" stroke="#b08a70" stroke-width="2" fill="none"/>
    <path d="M90 138 q10 4 20 0" stroke="#8a5a4a" stroke-width="2.4" fill="none"/>
    ${glasses}
  </svg>`;
};

// ---------- Scènes ----------
const wallFloor = (wall, floor, horizon = 380) => `
  <rect width="1000" height="${horizon}" fill="${wall}"/>
  <rect y="${horizon}" width="1000" height="${560 - horizon}" fill="${floor}"/>
  <rect y="${horizon - 6}" width="1000" height="10" fill="rgba(0,0,0,.35)"/>`;

const panels = (color) => {
  let s = '';
  for (let i = 0; i < 10; i++) s += `<rect x="${18 + i * 100}" y="170" width="76" height="190" fill="none" stroke="${color}" stroke-width="3"/>`;
  return s;
};

const parquet = (color) => {
  let s = '';
  for (let i = -6; i < 22; i++) s += `<path d="M${i * 60} 560 L${i * 60 + 180} 380" stroke="${color}" stroke-width="2"/>`;
  return s;
};

const nightSky = () => {
  let s = `<rect width="1000" height="560" fill="#05070d"/>`;
  const rnd = mulberry(7);
  for (let i = 0; i < 70; i++) s += `<circle cx="${rnd() * 1000}" cy="${rnd() * 200}" r="${rnd() * 1.4 + .3}" fill="#cfd6e6" opacity="${rnd() * .7 + .2}"/>`;
  return s;
};

function mulberry(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

const manorWall = (y = 110, h = 300) => {
  let s = `<rect x="0" y="${y}" width="1000" height="${h}" fill="#3d3a33"/>`;
  for (let r = 0; r < h / 22; r++)
    s += `<path d="M0 ${y + r * 22} H1000" stroke="#2e2b26" stroke-width="1.5"/>`;
  return s;
};

const gravel = (y, color, dots, seed) => {
  const rnd = mulberry(seed);
  let s = `<path d="M0 ${y} C 300 ${y - 20}, 700 ${y + 20}, 1000 ${y - 10} L1000 ${y + 70} C 700 ${y + 90}, 300 ${y + 50}, 0 ${y + 70} Z" fill="${color}"/>`;
  for (let i = 0; i < 180; i++) s += `<circle cx="${rnd() * 1000}" cy="${y + 8 + rnd() * 55}" r="${rnd() * 2.5 + .8}" fill="${dots}" opacity=".8"/>`;
  return s;
};

const clock = (cx, cy, r) => {
  // 22:03 -> aiguille des heures ~301.5°, minutes 18°
  const hand = (deg, len, w, c) => {
    const a = (deg - 90) * Math.PI / 180;
    return `<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(a) * len}" y2="${cy + Math.sin(a) * len}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
  };
  let ticks = '';
  for (let i = 0; i < 12; i++) {
    const a = i * 30 * Math.PI / 180;
    ticks += `<line x1="${cx + Math.sin(a) * (r - 6)}" y1="${cy - Math.cos(a) * (r - 6)}" x2="${cx + Math.sin(a) * (r - 13)}" y2="${cy - Math.cos(a) * (r - 13)}" stroke="#2a1d10" stroke-width="2.5"/>`;
  }
  return `<circle cx="${cx}" cy="${cy}" r="${r + 9}" fill="#8a6326"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#efe3c4"/>${ticks}
    ${hand(301.5, r * .5, 5, '#1a1410')}${hand(18, r * .78, 3.5, '#1a1410')}
    <circle cx="${cx}" cy="${cy}" r="4" fill="#a0782c"/>
    <line x1="${cx}" y1="${cy + r + 9}" x2="${cx + 18}" y2="${cy + r + 60}" stroke="#a0782c" stroke-width="3"/>
    <circle cx="${cx + 18}" cy="${cy + r + 64}" r="8" fill="#a0782c"/>`;
};

ART.scenes = {
  bureau: () => `
    ${wallFloor('#2b1a10', '#1f130b')}${panels('#45291a')}${parquet('#2c1b10')}
    <rect x="580" y="40" width="70" height="300" fill="#56708f" opacity=".8"/>
    <path d="M590 40 q10 150 -4 300 M610 40 q8 150 -2 300 M632 40 q6 150 0 300" stroke="#3c536d" stroke-width="3" fill="none"/>
    <rect x="660" y="50" width="290" height="230" fill="#070b16" stroke="#cfc6b2" stroke-width="9"/>
    <path d="M805 50 V280 M660 165 H950" stroke="#cfc6b2" stroke-width="6"/>
    <rect x="655" y="280" width="300" height="18" fill="#5b3a22"/>
    <circle cx="790" cy="291" r="5" fill="#d9d2c0" opacity=".7"/>
    ${clock(480, 108, 42)}
    <rect x="28" y="236" width="380" height="24" fill="#6e4329"/>
    <rect x="40" y="258" width="356" height="210" fill="#5b3620" stroke="#3a2213" stroke-width="4"/>
    <rect x="70" y="290" width="130" height="50" fill="none" stroke="#3a2213" stroke-width="3"/>
    <circle cx="135" cy="315" r="5" fill="#b08a4a"/>
    <rect x="80" y="214" width="130" height="24" fill="#1b1b24" transform="rotate(-3 145 226)"/>
    <rect x="240" y="220" width="46" height="18" rx="4" fill="#0d0d10"/>
    <rect x="330" y="196" width="30" height="40" rx="3" fill="rgba(210,150,60,.55)" stroke="#e8e2d0" stroke-width="2"/>
    <ellipse cx="490" cy="474" rx="76" ry="14" fill="#5c4a2c"/>
    <ellipse cx="420" cy="474" rx="14" ry="24" fill="#6b5733" stroke="#3a2e1a" stroke-width="2"/>
    <path d="M760 470 L1000 450 L1000 540 L790 530 Z" fill="#0d0d12"/>
    <ellipse cx="770" cy="505" rx="42" ry="20" fill="#050506"/>
    <ellipse cx="900" cy="508" rx="120" ry="18" fill="#2a0a08" opacity=".45"/>`,

  bibliotheque: () => {
    let s = wallFloor('#24180f', '#1a110a') + parquet('#251810');
    const rnd = mulberry(3);
    const cols = ['#5a1e1a', '#1e3a2a', '#2a2a4a', '#6a5020', '#3a2010', '#4a4a3a'];
    for (let sh = 0; sh < 4; sh++) {
      const y = 50 + sh * 80;
      s += `<rect x="240" y="${y + 66}" width="660" height="10" fill="#3e2716"/>`;
      let x = 245;
      while (x < 890) {
        const w = 10 + rnd() * 14, h = 40 + rnd() * 24;
        s += `<rect x="${x}" y="${y + 66 - h}" width="${w}" height="${h}" fill="${cols[Math.floor(rnd() * cols.length)]}"/>`;
        x += w + 2;
      }
    }
    s += `<rect x="40" y="100" width="150" height="280" fill="#3a2414" stroke="#1a0f08" stroke-width="5"/>
      <circle cx="170" cy="250" r="6" fill="#b08a4a"/>
      <path d="M640 400 h170 v90 h-170 z" fill="#5a2a1e"/><path d="M640 360 h170 v50 h-170 z" fill="#6a3424"/>`;
    return s;
  },

  hall: () => `
    ${wallFloor('#2e2a24', '#cfc8b8', 390)}
    ${(() => { let s = ''; for (let i = 0; i < 12; i++) for (let j = 0; j < 3; j++) if ((i + j) % 2) s += `<rect x="${i * 90}" y="${390 + j * 60}" width="90" height="60" fill="#1d1b18"/>`; return s; })()}
    <path d="M420 390 V150 Q500 70 580 150 V390 Z" fill="#3a2414" stroke="#1a0f08" stroke-width="6"/>
    <circle cx="560" cy="280" r="7" fill="#c9a24a"/>
    <rect x="120" y="300" width="260" height="16" fill="#4a2e1a"/><rect x="140" y="316" width="12" height="74" fill="#4a2e1a"/><rect x="348" y="316" width="12" height="74" fill="#4a2e1a"/>
    <path d="M230 300 l10 -50 h90 l-10 50 z" fill="#202024"/><rect x="236" y="256" width="82" height="40" fill="#3a6aa0" opacity=".7"/>
    <rect x="735" y="120" width="8" height="300" fill="#2a1a10"/><rect x="700" y="120" width="80" height="8" fill="#2a1a10"/>
    <path d="M705 132 h70 l12 170 h-94 z" fill="#3b3c3e"/>
    <ellipse cx="700" cy="485" rx="22" ry="10" fill="#151515"/><ellipse cx="745" cy="488" rx="22" ry="10" fill="#151515"/>`,

  salon: () => `
    ${wallFloor('#2c2018', '#3a2a1c')}${parquet('#2f2216')}
    <rect x="60" y="300" width="300" height="110" rx="20" fill="#5a1e1e"/><rect x="60" y="260" width="300" height="60" rx="20" fill="#6a2626"/>
    <rect x="330" y="380" width="260" height="20" fill="#4a2e1a"/><rect x="350" y="400" width="10" height="60" fill="#4a2e1a"/><rect x="560" y="400" width="10" height="60" fill="#4a2e1a"/>
    <rect x="400" y="358" width="110" height="24" fill="#a3221c" transform="rotate(-4 455 370)"/>
    <rect x="720" y="200" width="200" height="200" fill="#4a2414" stroke="#2a140a" stroke-width="5"/>
    <rect x="720" y="190" width="200" height="16" fill="#5e321c"/>
    <path d="M790 120 h20 v20 l8 12 v38 h-36 v-38 l8 -12 z" fill="#c08a3a" opacity=".85"/>
    <path d="M840 140 h16 v12 l6 10 v28 h-28 v-28 l6 -10 z" fill="#3a6a3a" opacity=".85"/>
    <rect x="100" y="80" width="200" height="140" fill="#1a140e" stroke="#8a6326" stroke-width="8"/>`,

  salle: () => `
    ${wallFloor('#2a1f16', '#24180f')}${parquet('#2a1c12')}
    <rect x="150" y="300" width="700" height="40" fill="#5b3620"/>
    <path d="M150 340 L110 470 H890 L850 340 Z" fill="#6e4329"/>
    ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${200 + i * 110}" y="230" width="50" height="80" rx="6" fill="#3a2414"/>`).join('')}
    ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${215 + i * 110} 290 h14 l-3 18 h-8 z" fill="rgba(140,20,30,.6)" stroke="#ddd" stroke-width="1"/>`).join('')}
    <rect x="470" y="200" width="60" height="90" rx="6" fill="#4a2a18"/>
    <rect x="800" y="240" width="160" height="140" fill="#3a2414"/><path d="M880 330 q20 30 -10 60" stroke="#111" stroke-width="3" fill="none"/>
    <path d="M400 60 h200 l-30 60 h-140 z" fill="#c9a24a" opacity=".5"/>`,

  cuisine: () => `
    ${wallFloor('#3a3a36', '#5a564e')}
    ${(() => { let s = ''; for (let i = 0; i < 20; i++) for (let j = 0; j < 4; j++) s += `<rect x="${i * 50}" y="${380 + j * 45}" width="49" height="44" fill="${(i + j) % 2 ? '#4a463e' : '#56524a'}"/>`; return s; })()}
    <rect x="40" y="250" width="660" height="130" fill="#d8d2c4"/><rect x="40" y="240" width="660" height="14" fill="#8a8478"/>
    <rect x="300" y="250" width="160" height="40" fill="#9aa4aa"/>
    ${[0, 1, 2, 3].map(i => `<ellipse cx="${330 + i * 30}" cy="${236 - i * 6}" rx="26" ry="5" fill="#f2efe6" stroke="#bbb"/>`).join('')}
    <rect x="780" y="120" width="140" height="260" fill="#4a3424" stroke="#2a1a10" stroke-width="5"/><circle cx="800" cy="260" r="6" fill="#aaa"/>
    ${[0, 1, 2].map(i => `<circle cx="${120 + i * 70}" cy="120" r="24" fill="none" stroke="#7a6a5a" stroke-width="6"/>`).join('')}`,

  escalier: () => {
    let s = wallFloor('#2a241e', '#1e1914');
    for (let i = 0; i < 12; i++) s += `<rect x="${300 + i * 45}" y="${440 - i * 32}" width="${700 - i * 45}" height="34" fill="${i % 2 ? '#4a2e1a' : '#55351e'}"/>`;
    s += `<path d="M300 440 L840 60" stroke="#2a1a10" stroke-width="10"/>`;
    for (let i = 0; i < 12; i++) s += `<line x1="${310 + i * 45}" y1="${430 - i * 32}" x2="${310 + i * 45}" y2="${380 - i * 32}" stroke="#2a1a10" stroke-width="4"/>`;
    return s;
  },

  etage: () => `
    ${wallFloor('#2a2622', '#3a1e1e', 400)}
    <path d="M0 400 L380 260 H620 L1000 400 Z" fill="#4a2424"/>
    <rect x="380" y="60" width="240" height="200" fill="#1a1612"/>
    <rect x="120" y="140" width="140" height="240" fill="#3a2414" stroke="#1a0f08" stroke-width="5"/><circle cx="240" cy="270" r="6" fill="#b08a4a"/>
    <rect x="740" y="140" width="140" height="240" fill="#3a2414" stroke="#1a0f08" stroke-width="5"/>
    <rect x="660" y="140" width="70" height="26" rx="4" fill="#e8e6e0"/><circle cx="675" cy="153" r="4" fill="#3cd96a"/><circle cx="690" cy="153" r="4" fill="#3cd96a" opacity=".5"/>`,

  terrasse: () => `
    ${nightSky()}${manorWall(90, 260)}
    <rect x="80" y="160" width="90" height="120" fill="#e9b65a" opacity=".85"/><rect x="560" y="160" width="90" height="120" fill="#1a1a22"/>
    <rect x="0" y="350" width="1000" height="210" fill="#5a5650"/>
    ${(() => { let s = ''; for (let i = 0; i < 10; i++) s += `<path d="M${i * 110} 350 L${i * 140 - 100} 560" stroke="#4a4640" stroke-width="2"/>`; return s; })()}
    <rect x="0" y="330" width="1000" height="14" fill="#8a8478"/>
    ${(() => { let s = ''; for (let i = 0; i < 25; i++) s += `<rect x="${i * 40 + 10}" y="344" width="10" height="50" fill="#8a8478"/>`; return s; })()}
    <rect x="0" y="392" width="1000" height="10" fill="#8a8478"/>
    <rect x="380" y="380" width="22" height="38" rx="4" fill="#0a0a0a"/><rect x="383" y="384" width="16" height="26" fill="#6ab0ff" opacity=".8"/>
    <path d="M860 80 L900 350" stroke="#1d1b18" stroke-width="40"/>`,

  jardin: () => `
    ${nightSky()}${manorWall(80, 300)}
    <rect x="410" y="250" width="130" height="110" fill="#e9b65a" stroke="#cfc6b2" stroke-width="6"/>
    <path d="M475 250 V360 M410 305 H540" stroke="#cfc6b2" stroke-width="4"/>
    <rect x="0" y="380" width="1000" height="180" fill="#1d2a16"/>
    ${gravel(395, '#8e8a7e', '#f4f1e8', 11)}
    <path d="M60 380 C 70 250, 40 180, 90 100" stroke="#2a221a" stroke-width="16" fill="none"/>`,

  allee: () => `
    ${nightSky()}${manorWall(90, 280)}
    <path d="M430 370 V180 Q500 120 570 180 V370 Z" fill="#2a1a10" stroke="#1a0f08" stroke-width="6"/>
    <rect x="450" y="170" width="16" height="12" fill="#ffd27a"/><circle cx="458" cy="200" r="40" fill="#ffd27a" opacity=".12"/>
    <rect x="140" y="100" width="70" height="34" rx="6" fill="#d8d8d8"/><rect x="200" y="108" width="24" height="18" fill="#222"/><circle cx="150" cy="110" r="4" fill="#ff3b30"/>
    <rect x="0" y="370" width="1000" height="190" fill="#1a1a14"/>
    ${gravel(420, '#6a3426', '#a0563e', 21)}
    <rect x="840" y="300" width="10" height="80" fill="#333"/><ellipse cx="845" cy="300" rx="22" ry="8" fill="#444"/>`,
};

ART.scene = (id) => `<svg viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid slice" class="scene-svg" aria-hidden="true">${(ART.scenes[id] || (() => wallFloor('#222', '#111')))()}</svg>`;

// ---------- Plan du manoir ----------
ART.map = (visited, current) => {
  let s = `<svg viewBox="0 0 1000 640" class="map-svg">
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="rgba(255,255,255,.06)"/></pattern>
      <pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="1.2" fill="rgba(255,255,255,.35)"/></pattern>
    </defs>
    <rect width="1000" height="640" fill="#1d3f6e"/><rect width="1000" height="640" fill="url(#grid)"/>`;
  for (const r of CASE.mapRooms) {
    const cls = ['room', r.ext ? 'ext' : '', visited.includes(r.id) ? 'visited' : '', current === r.id ? 'current' : ''].join(' ');
    s += `<g class="${cls}" data-loc="${r.id}" tabindex="0" role="button" aria-label="${r.label}">
      <rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" ${r.ext ? 'stroke-dasharray="8 6"' : ''}/>
      ${r.ext ? `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="url(#dots)" pointer-events="none" opacity=".4"/>` : ''}
      <text x="${r.x + r.w / 2}" y="${r.y + r.h / 2 + 5}" text-anchor="middle">${r.label}</text>
    </g>`;
  }
  // murs, fenêtre et porte du bureau
  s += `<rect x="70" y="120" width="790" height="360" fill="none" stroke="#f2f2f2" stroke-width="7" pointer-events="none"/>
    <path d="M70 310 H860 M250 120 V310 M450 120 V310 M650 120 V310 M350 310 V480 M620 310 V480" stroke="#f2f2f2" stroke-width="5" pointer-events="none"/>
    <rect x="100" y="114" width="70" height="12" fill="#1d3f6e" stroke="#f2f2f2" stroke-width="3" pointer-events="none"/>
    <path d="M135 112 V92" stroke="#f2f2f2" stroke-width="2" marker-end="" pointer-events="none"/>
    <rect x="245" y="240" width="12" height="44" fill="#1d3f6e" pointer-events="none"/>
    <path d="M250 240 q 36 0 36 36" stroke="#f2f2f2" stroke-width="2" fill="none" pointer-events="none"/>
    <text x="135" y="140" text-anchor="middle" class="map-note">fenêtre</text>
    ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path d="M${660 + i * 22} 425 V470" stroke="#f2f2f2" stroke-width="2" pointer-events="none"/>`).join('')}
    <text x="985" y="630" text-anchor="end" class="map-note">DOSSIER 17 - PLAN DU REZ-DE-CHAUSSÉE - PIÈCE A-03</text>
  </svg>`;
  return s;
};
