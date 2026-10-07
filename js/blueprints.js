// =====================================================================
//  Pièces sans photo : relevés d'architecte (vue de dessus), dans le
//  même langage graphique que le plan A-03. viewBox 1000 x 560.
// =====================================================================
(() => {
  const W = '#f2f2f2';
  const grid = () => `
    <defs>
      <pattern id="bp-g" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="rgba(255,255,255,.07)"/></pattern>
      <pattern id="bp-G" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M100 0H0V100" fill="none" stroke="rgba(255,255,255,.12)"/></pattern>
      <pattern id="bp-h" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V8" stroke="rgba(255,255,255,.35)" stroke-width="2"/></pattern>
      <radialGradient id="bp-v" cx="50%" cy="45%" r="75%"><stop offset="55%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".45"/></radialGradient>
    </defs>
    <rect width="1000" height="560" fill="#1b3c69"/><rect width="1000" height="560" fill="url(#bp-g)"/><rect width="1000" height="560" fill="url(#bp-G)"/>`;

  // murs (hachurés) avec ouvertures : doors = [{side:'l'|'r'|'t'|'b', at, len, swing}]
  const walls = (doors = [], x = 60, y = 40, w = 880, h = 470, t = 16) => {
    let s = `<g>
      <rect x="${x - t}" y="${y - t}" width="${w + 2 * t}" height="${h + 2 * t}" fill="url(#bp-h)" stroke="${W}" stroke-width="2"/>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#1b3c69" stroke="${W}" stroke-width="2"/>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#bp-g)"/></g>`;
    for (const d of doors) {
      const L = d.len || 70;
      if (d.side === 'l' || d.side === 'r') {
        const wx = d.side === 'l' ? x - t : x + w, cx = d.side === 'l' ? x : x + w, dir = d.side === 'l' ? 1 : -1;
        s += `<rect x="${wx}" y="${d.at}" width="${t}" height="${L}" fill="#1b3c69"/>`;
        if (d.swing !== false) s += `<path d="M${cx} ${d.at} L${cx + dir * L} ${d.at} M${cx} ${d.at + L} A${L} ${L} 0 0 ${dir > 0 ? 0 : 1} ${cx + dir * L} ${d.at}" fill="none" stroke="${W}" stroke-width="1.5"/>`;
      } else {
        const wy = d.side === 't' ? y - t : y + h, cy = d.side === 't' ? y : y + h, dir = d.side === 't' ? 1 : -1;
        s += `<rect x="${d.at}" y="${wy}" width="${L}" height="${t}" fill="#1b3c69"/>`;
        if (d.swing !== false) s += `<path d="M${d.at} ${cy} L${d.at} ${cy + dir * L} M${d.at + L} ${cy} A${L} ${L} 0 0 ${dir > 0 ? 1 : 0} ${d.at} ${cy + dir * L}" fill="none" stroke="${W}" stroke-width="1.5"/>`;
      }
    }
    return s;
  };

  const win = (x1, y1, x2, y2) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${W}" stroke-width="6"/><path d="M${x1} ${y1} L${x2} ${y2}" stroke="#1b3c69" stroke-width="2"/>`;
  const box = (x, y, w, h, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="rgba(255,255,255,.05)" stroke="${W}" stroke-width="2.2" ${extra}/>`;
  const lbl = (x, y, t, anchor = 'middle', size = 13) => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="IBM Plex Mono, monospace" font-size="${size}" letter-spacing="1.5" fill="rgba(255,255,255,.78)">${t}</text>`;
  const cart = (piece, scale = '1:50') => `
    <g font-family="IBM Plex Mono, monospace" fill="rgba(255,255,255,.85)">
      <rect x="700" y="526" width="296" height="30" fill="#1b3c69" stroke="${W}" stroke-width="1.5"/>
      <text x="712" y="546" font-size="12" letter-spacing="1.5">RELEVÉ · ${piece}</text>
      <text x="984" y="546" font-size="12" text-anchor="end">éch. ${scale}</text>
    </g>
    <g stroke="${W}" stroke-width="1.5"><path d="M30 540 H190 M30 534 V546 M110 536 V544 M190 534 V546"/></g>
    ${lbl(110, 530, '0      2 m', 'middle', 10)}
    <g transform="translate(960 70)"><circle r="18" fill="none" stroke="${W}" stroke-width="1.5"/><path d="M0 -14 L6 6 L0 2 L-6 6 Z" fill="${W}"/>${lbl(0, -24, 'N', 'middle', 11)}</g>`;
  const chair = (x, y, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-16" y="-14" width="32" height="28" rx="3" fill="rgba(255,255,255,.05)" stroke="${W}" stroke-width="1.8"/><path d="M-16 -14 H16" stroke="${W}" stroke-width="5"/></g>`;
  const end = `<rect width="1000" height="560" fill="url(#bp-v)" pointer-events="none"/>`;

  const BP = {
    bibliotheque: () => {
      let s = grid() + walls([{ side: 'l', at: 230, len: 90 }, { side: 'r', at: 380, len: 80 }]);
      // rayonnages le long du mur nord et est
      for (let i = 0; i < 11; i++) s += box(80 + i * 72, 52, 70, 46);
      for (let i = 0; i < 3; i++) s += box(880, 120 + i * 72, 46, 70);
      s += lbl(480, 120, 'RAYONNAGES');
      // tapis + fauteuil + guéridon
      s += `<rect x="560" y="300" width="300" height="180" fill="none" stroke="rgba(255,255,255,.35)" stroke-dasharray="6 6"/>`;
      s += `<g transform="translate(750 420)"><rect x="-44" y="-38" width="88" height="76" rx="12" fill="rgba(255,255,255,.05)" stroke="${W}" stroke-width="2.2"/><rect x="-30" y="-26" width="60" height="50" rx="6" fill="none" stroke="${W}" stroke-width="1.5"/></g>`;
      s += `<circle cx="650" cy="420" r="24" fill="rgba(255,255,255,.05)" stroke="${W}" stroke-width="2"/>`;
      s += lbl(750, 485, 'FAUTEUIL DE LECTURE');
      s += lbl(140, 215, '← BUREAU', 'start');
      s += lbl(905, 372, 'HALL →', 'end');
      return s + cart('BIBLIOTHÈQUE') + end;
    },
    hall: () => {
      let s = grid() + walls([{ side: 'b', at: 455, len: 90 }, { side: 'l', at: 200, len: 80 }, { side: 'r', at: 200, len: 80 }]);
      for (let i = 0; i < 8; i++) for (let j = 0; j < 4; j++) if ((i + j) % 2) s += `<rect x="${260 + i * 60}" y="${150 + j * 60}" width="60" height="60" fill="rgba(255,255,255,.05)"/>`;
      // console + ordinateur
      s += box(110, 280, 200, 60);
      s += `<rect x="175" y="290" width="70" height="40" fill="#1b3c69" stroke="${W}" stroke-width="2"/><path d="M180 296 h60 v22 h-60z" fill="rgba(110,170,255,.35)"/>`;
      s += lbl(210, 368, 'CONSOLE · ORDI');
      // vestiaire
      s += `<circle cx="790" cy="230" r="34" fill="rgba(255,255,255,.05)" stroke="${W}" stroke-width="2.2"/><circle cx="790" cy="230" r="6" fill="${W}"/>`;
      for (let a = 0; a < 6; a++) s += `<line x1="${790 + Math.cos(a) * 34}" y1="${230 + Math.sin(a) * 34}" x2="${790 + Math.cos(a) * 46}" y2="${230 + Math.sin(a) * 46}" stroke="${W}" stroke-width="2"/>`;
      s += lbl(790, 300, 'VESTIAIRE');
      // paillasson + chaussures saisies
      s += box(700, 400, 180, 80);
      s += `<ellipse cx="760" cy="440" rx="14" ry="26" fill="none" stroke="${W}" stroke-width="2"/><ellipse cx="796" cy="442" rx="14" ry="26" fill="none" stroke="${W}" stroke-width="2"/>`;
      s += lbl(790, 500, 'SCELLÉ : CHAUSSURES', 'middle', 11);
      s += lbl(500, 548, 'PORTE PRINCIPALE ↓ ALLÉE', 'middle', 11);
      return s + cart('HALL') + end;
    },
    salon: () => {
      let s = grid() + walls([{ side: 'l', at: 200, len: 80 }], 60, 40, 880, 470);
      // cheminée
      s += `<rect x="420" y="40" width="160" height="40" fill="url(#bp-h)" stroke="${W}" stroke-width="2"/>`; s += lbl(500, 104, 'CHEMINÉE');
      // canapé en L
      s += `<path d="M110 300 H360 V360 H170 V470 H110 Z" fill="rgba(255,255,255,.05)" stroke="${W}" stroke-width="2.2"/>`;
      s += lbl(230, 395, 'CANAPÉ');
      // table basse + dossier rouge
      s += box(420, 350, 200, 90);
      s += `<rect x="470" y="372" width="96" height="46" fill="#a3291f" stroke="${W}" stroke-width="1.5" transform="rotate(-6 518 395)"/>`;
      s += lbl(520, 465, 'TABLE BASSE');
      // bar
      s += `<path d="M800 120 H900 V420 H800 Z" fill="rgba(255,255,255,.05)" stroke="${W}" stroke-width="2.2"/>`;
      for (let i = 0; i < 4; i++) s += `<circle cx="${830 + (i % 2) * 40}" cy="${170 + Math.floor(i / 2) * 60}" r="10" fill="none" stroke="${W}" stroke-width="2"/>`;
      s += lbl(850, 450, 'BAR');
      s += lbl(130, 190, '← HALL', 'start');
      return s + cart('SALON') + end;
    },
    salle: () => {
      let s = grid() + walls([{ side: 'r', at: 210, len: 80 }]);
      // table : Armand en bout (à gauche), 3 convives de chaque côté
      s += `<rect x="270" y="220" width="440" height="120" rx="8" fill="rgba(255,255,255,.06)" stroke="${W}" stroke-width="2.4"/>`;
      s += chair(230, 280, -90) + chair(750, 280, 90);
      [340, 490, 640].forEach(x => { s += chair(x, 192, 0) + chair(x, 368, 180); });
      [340, 490, 640].forEach(x => { s += `<circle cx="${x}" cy="245" r="13" fill="none" stroke="${W}" stroke-width="1.5"/><circle cx="${x}" cy="315" r="13" fill="none" stroke="${W}" stroke-width="1.5"/>`; });
      s += `<circle cx="296" cy="280" r="13" fill="none" stroke="${W}" stroke-width="1.5"/><path d="M314 266 l6 0 l-2 10 h-2z" fill="#a3291f" stroke="${W}" stroke-width="1"/>`;
      s += lbl(190, 285, 'ARMAND', 'end', 12);
      ['CLAIRE', 'SOFIA', 'ÉLISE'].forEach((n, i) => { s += lbl(340 + i * 150, 160, n, 'middle', 11); });
      ['JULIEN', 'THOMAS', 'MARC'].forEach((n, i) => { s += lbl(340 + i * 150, 412, n, 'middle', 11); });
      // buffet + chargeur
      s += box(760, 440, 160, 56);
      s += `<path d="M820 468 q30 -40 60 -10 t40 0" fill="none" stroke="${W}" stroke-width="1.5" stroke-dasharray="4 3"/>`;
      s += lbl(840, 430, 'BUFFET');
      return s + cart('SALLE À MANGER') + end;
    },
    cuisine: () => {
      let s = grid() + walls([{ side: 'r', at: 220, len: 80 }, { side: 'l', at: 380, len: 80, swing: false }]);
      s += `<path d="M60 40 H800 V110 H130 V340 H60 Z" fill="rgba(255,255,255,.05)" stroke="${W}" stroke-width="2.2"/>`;
      s += `<rect x="340" y="52" width="70" height="46" rx="6" fill="none" stroke="${W}" stroke-width="2"/><rect x="420" y="52" width="70" height="46" rx="6" fill="none" stroke="${W}" stroke-width="2"/>`;
      s += lbl(415, 136, 'ÉVIER');
      [0, 1, 2, 3].forEach(i => { s += `<circle cx="${600 + (i % 2) * 50}" cy="${62 + Math.floor(i / 2) * 26}" r="10" fill="none" stroke="${W}" stroke-width="1.8"/>`; });
      s += lbl(625, 136, 'FOURNEAU');
      s += box(360, 230, 300, 120); s += lbl(510, 296, 'ÎLOT');
      s += lbl(905, 205, 'SERVICE →', 'end');
      s += `<rect x="905" y="250" width="10" height="20" fill="${W}"/>`;
      return s + cart('CUISINE') + end;
    },
    escalier: () => {
      let s = grid() + walls([{ side: 'l', at: 120, len: 80 }, { side: 'b', at: 150, len: 80 }]);
      s += `<rect x="440" y="80" width="440" height="200" fill="rgba(255,255,255,.04)" stroke="${W}" stroke-width="2.2"/>`;
      for (let i = 1; i < 12; i++) s += `<line x1="${440 + i * 36.6}" y1="80" x2="${440 + i * 36.6}" y2="280" stroke="${W}" stroke-width="1.6"/>`;
      s += `<path d="M470 180 H850" stroke="${W}" stroke-width="2"/><path d="M850 180 l-16 -9 v18 z" fill="${W}"/>`;
      s += lbl(660, 312, 'MONTÉE VERS L\'ÉTAGE');
      s += `<rect x="440" y="280" width="440" height="22" fill="url(#bp-h)"/>`;
      s += `<rect x="150" y="320" width="250" height="160" fill="none" stroke="rgba(255,255,255,.35)" stroke-dasharray="6 6"/>`;
      s += lbl(275, 505, 'PALIER · BAS DES MARCHES');
      return s + cart('ESCALIER') + end;
    },
    etage: () => {
      let s = grid();
      s += walls([], 60, 40, 880, 470);
      s += `<path d="M60 220 H940 M60 340 H940" stroke="${W}" stroke-width="10"/><path d="M60 220 H940 M60 340 H940" stroke="url(#bp-h)" stroke-width="8"/>`;
      // portes des chambres
      [[160, 220, 'CHAMBRE D\'AMIS'], [500, 220, 'CHAMBRE D\'AMIS'], [200, 340, 'CHAMBRE DE CLAIRE'], [600, 340, 'SALLE DE BAINS']].forEach(([x, y, n]) => {
        s += `<rect x="${x}" y="${y - 6}" width="70" height="12" fill="#1b3c69"/>`;
        s += lbl(x + 35, y < 300 ? y - 40 : y + 60, n, 'middle', 12);
      });
      s += lbl(500, 286, 'COULOIR');
      // borne wifi
      s += `<rect x="686" y="206" width="30" height="16" rx="3" fill="${W}"/>`;
      [26, 42, 58].forEach(r => { s += `<path d="M${701 - r * .7} ${214 + r * .7} A${r} ${r} 0 0 1 ${701 + r * .7} ${214 + r * .7}" fill="none" stroke="#6fe08f" stroke-width="2" opacity=".8" transform="rotate(180 701 214)"/>`; });
      s += lbl(805, 205, 'BORNE WI-FI', 'start', 11);
      return s + cart('ÉTAGE') + end;
    },
    terrasse: () => {
      let s = grid();
      // façade arrière (mur du manoir) en haut
      s += `<rect x="0" y="30" width="1000" height="34" fill="url(#bp-h)" stroke="${W}" stroke-width="2"/>`;
      s += win(90, 64, 170, 64); s += lbl(130, 90, 'FENÊTRE DU BUREAU', 'middle', 11);
      s += win(720, 64, 800, 64);
      // dalles
      s += `<rect x="260" y="150" width="680" height="330" fill="rgba(255,255,255,.04)" stroke="${W}" stroke-width="2.2"/>`;
      for (let i = 1; i < 8; i++) s += `<line x1="${260 + i * 85}" y1="150" x2="${260 + i * 85}" y2="480" stroke="rgba(255,255,255,.18)"/>`;
      for (let j = 1; j < 4; j++) s += `<line x1="260" y1="${150 + j * 82.5}" x2="940" y2="${150 + j * 82.5}" stroke="rgba(255,255,255,.18)"/>`;
      // balustrade
      s += `<path d="M260 480 H940" stroke="${W}" stroke-width="6" stroke-dasharray="2 10"/>`;
      // position de Sofia + cote 14 m
      s += `<g transform="translate(400 364)"><circle r="14" fill="#e0a43a"/><circle r="26" fill="none" stroke="#e0a43a" stroke-width="2" stroke-dasharray="4 4"/></g>`;
      s += lbl(400, 410, 'SOFIA · 21:51 → 22:06', 'middle', 11);
      s += `<path d="M386 352 L140 70" stroke="#e0a43a" stroke-width="2" stroke-dasharray="10 6"/>`;
      s += `<g transform="translate(250 200) rotate(49)"><rect x="-34" y="-12" width="68" height="22" fill="#1b3c69"/><text x="0" y="5" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="14" fill="#e0a43a">≈ 14 m</text></g>`;
      // côté est
      s += `<path d="M940 300 H990" stroke="${W}" stroke-width="2"/><path d="M990 300 l-14 -8 v16 z" fill="${W}"/>`;
      s += lbl(960, 280, 'CÔTÉ EST', 'middle', 11);
      s += lbl(130, 300, 'PELOUSE', 'middle', 11) + lbl(130, 320, '↙ JARDIN ARRIÈRE', 'middle', 11);
      return s + cart('TERRASSE', '1:100') + end;
    },
  };

  Object.assign(ART.scenes, BP);
})();
