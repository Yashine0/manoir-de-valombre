// =====================================================================
//  DOSSIER 17 - moteur du jeu
// =====================================================================
(() => {
  const SLOT_KEY = (n) => `valombre_slot_${n}`;
  const SETTINGS_KEY = 'valombre_settings';
  const SLOTS = [1, 2, 3];
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const P = CASE.pieces, SUS = CASE.suspects, LOC = CASE.locations;
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const escapeHtml = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  let S = null;     // partie en cours
  let slot = 1;     // emplacement de sauvegarde actif

  // ------------------------------------------------------------------
  //  Stockage
  // ------------------------------------------------------------------
  const store = {
    get(k) { try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : null; } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* stockage indisponible */ } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { /* rien */ } },
  };
  const settings = Object.assign({ vol: 0.6, sound: false, text: 'm' }, store.get(SETTINGS_KEY) || {});
  const saveSettings = () => store.set(SETTINGS_KEY, settings);

  const newState = (mode) => ({
    mode, created: Date.now(), saved: Date.now(),
    pieces: [...CASE.startPieces], unread: [], examined: [], visited: [],
    contra: [], talked: [], secrets: [], hints: 0, wrong: 0, cred: 100,
    links: [], boardSel: [], pos: {}, tips: [],
    notes: {}, view: 'map', loc: null, suspect: null, tab: 'depo', dialog: null,
    answers: {}, confront: null, verdict: null,
  });
  const save = () => { if (!S) return; S.saved = Date.now(); store.set(SLOT_KEY(slot), S); };
  const hard = () => S && S.mode === 'difficile';

  const has = (id) => S.pieces.includes(id);
  const give = (id) => {
    if (!id || has(id)) return false;
    S.pieces.push(id);
    S.unread.push(id);
    toast(`Nouvelle pièce : <b>${P[id].code}</b> - ${P[id].titre}`);
    SFX.paper();
    return true;
  };
  const loseCred = (n) => { S.cred = Math.max(0, S.cred - n); };

  // ------------------------------------------------------------------
  //  Audio (entièrement généré, aucun fichier)
  // ------------------------------------------------------------------
  const SFX = (() => {
    let ctx = null, master = null, tickTimer = null, noiseBuf = null;
    const init = () => {
      if (ctx) return;
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
      // bruit brun (pluie)
      const len = ctx.sampleRate * 4;
      noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = noiseBuf.getChannelData(0);
      let last = 0;
      for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
      const src = ctx.createBufferSource(); src.buffer = noiseBuf; src.loop = true;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900;
      const g = ctx.createGain(); g.gain.value = 0.3;
      src.connect(lp).connect(g).connect(master); src.start();
      // nappe musicale : accord mineur lent, filtre qui respire
      const pad = ctx.createGain(); pad.gain.value = 0.035;
      const pf = ctx.createBiquadFilter(); pf.type = 'lowpass'; pf.frequency.value = 500; pf.Q.value = 4;
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.05;
      const lfoG = ctx.createGain(); lfoG.gain.value = 260; lfo.connect(lfoG).connect(pf.frequency); lfo.start();
      [110, 130.81, 164.81, 220.6, 109.4].forEach((f, i) => {
        const o = ctx.createOscillator(); o.type = i % 2 ? 'triangle' : 'sawtooth'; o.frequency.value = f;
        o.connect(pf); o.start();
      });
      pf.connect(pad).connect(master);
      // cloche grave toutes les ~20 s
      setInterval(() => { if (settings.sound) bell(); }, 21000);
    };
    const env = (node, vol, dur) => {
      const g = ctx.createGain();
      g.gain.setValueAtTime(vol, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      node.connect(g).connect(master);
      return g;
    };
    const tone = (f, dur = 0.03, vol = 0.12, type = 'square') => {
      if (!ctx || !settings.sound) return;
      const o = ctx.createOscillator(); o.frequency.value = f; o.type = type;
      env(o, vol, dur); o.start(); o.stop(ctx.currentTime + dur + 0.02);
    };
    const noise = (dur, vol, freq, type = 'bandpass') => {
      if (!ctx || !settings.sound) return;
      const s = ctx.createBufferSource(); s.buffer = noiseBuf;
      const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq;
      s.connect(f); env(f, vol, dur);
      s.start(0, Math.random() * 3); s.stop(ctx.currentTime + dur + 0.02);
    };
    const bell = () => { tone(98, 3.5, 0.05, 'sine'); tone(196.5, 2.5, 0.025, 'sine'); };
    const apply = () => {
      if (!ctx) return;
      master.gain.setTargetAtTime(settings.sound ? settings.vol : 0, ctx.currentTime, 0.3);
      clearInterval(tickTimer);
      if (settings.sound) { let alt = false; tickTimer = setInterval(() => { tone(alt ? 1500 : 1800, 0.02, 0.04); alt = !alt; }, 1000); }
    };
    return {
      setOn(on) { if (on) init(); settings.sound = on; saveSettings(); if (ctx && ctx.state === 'suspended') ctx.resume(); apply(); },
      setVol(v) { settings.vol = v; saveSettings(); apply(); },
      resume() { if (settings.sound) { init(); if (ctx.state === 'suspended') ctx.resume(); apply(); } },
      paper: () => noise(0.12, 0.25, 3000, 'highpass'),
      steps: () => { [0, 330, 660].forEach(t => setTimeout(() => noise(0.09, 0.5, 400), t)); },
      thud: () => {
        if (!ctx || !settings.sound) return;
        const o = ctx.createOscillator(); o.frequency.setValueAtTime(120, ctx.currentTime); o.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + .3);
        env(o, .6, .4); o.start(); o.stop(ctx.currentTime + .45);
      },
      stamp: () => { noise(0.18, 0.9, 200, 'lowpass'); tone(70, 0.25, 0.4, 'sine'); },
      ok: () => { tone(880, 0.12, 0.08); setTimeout(() => tone(1320, 0.15, 0.08), 110); },
      bad: () => { tone(160, 0.25, 0.12, 'sawtooth'); setTimeout(() => tone(120, 0.3, 0.12, 'sawtooth'), 160); },
    };
  })();

  // ------------------------------------------------------------------
  //  UI génériques
  // ------------------------------------------------------------------
  let toastTimer = null;
  function toast(html) {
    const t = $('#toast');
    t.innerHTML = html; t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
  }

  function modal(html, opts = {}) {
    $('#modal-body').innerHTML = html;
    $('#modal').className = 'modal-back show ' + (opts.cls || '');
    $('#modal-close').hidden = !!opts.noClose;
    $('#modal-close').focus();
  }
  const closeModal = () => { $('#modal').className = 'modal-back'; };
  const modalOpen = () => $('#modal').classList.contains('show');

  function tip(key) {
    if (!S || S.tips.includes(key)) return;
    S.tips.push(key); save();
    setTimeout(() => {
      if (modalOpen()) return;
      modal(`<div class="exam tip"><div class="crumb">Conseil</div><p>${CASE.tips[key]}</p><button class="btn" id="tip-ok">Compris</button></div>`, { cls: 'note' });
      $('#tip-ok').onclick = closeModal;
    }, 450);
  }

  const portrait = (s, cls = '') => s.photo
    ? `<img class="portrait-img ${cls}" src="${s.photo}" alt="${s.nom}">`
    : ART.portrait(s);

  function pieceDoc(id) {
    const p = P[id];
    return `<article class="doc">
      <header class="doc-head"><span>DOSSIER 17 / MANOIR DE VALOMBRE</span><span>CELLULE CRIMINELLE - 18.10.2026</span></header>
      <h2>${p.titre}</h2><div class="doc-tag">PIÈCE ${p.code}</div>
      ${p.img ? `<figure class="polaroid"><img src="${p.img}" alt=""><figcaption>${p.cap || ''}</figcaption></figure>` : ''}
      <div class="doc-body">${p.html}</div>
    </article>`;
  }

  function openPiece(id) {
    S.unread = S.unread.filter(x => x !== id);
    save(); updateHeader();
    SFX.paper();
    modal(pieceDoc(id), { cls: 'paper' });
  }

  function groupPieces(ids) {
    const g = new Map(CASE.catOrder.map(c => [c, []]));
    for (const id of ids) g.get(P[id].cat).push(id);
    return [...g].filter(([, v]) => v.length);
  }

  // Sélecteur de pièce (présenter / confrontation)
  function pickPiece(title, cb) {
    let h = `<h2 class="pick-title">${title}</h2><input class="pick-filter" id="pick-filter" placeholder="Filtrer les pièces..."><div class="pick-list">`;
    for (const [cat, ids] of groupPieces(S.pieces)) {
      h += `<div class="pick-cat">${cat}</div>`;
      for (const id of ids) h += `<button class="pick-item" data-id="${id}" data-q="${(P[id].code + ' ' + P[id].titre).toLowerCase()}">
        ${P[id].img ? `<img src="${P[id].img}" alt="">` : '<span class="pick-noimg"></span>'}<span class="code">${P[id].code}</span>${P[id].titre}</button>`;
    }
    h += `</div>`;
    modal(h, { cls: 'picker' });
    const f = $('#pick-filter');
    f.focus();
    f.oninput = () => { const q = f.value.toLowerCase(); $$('.pick-item', $('#modal')).forEach(b => { b.hidden = !b.dataset.q.includes(q); }); };
    $$('.pick-item', $('#modal')).forEach(b => b.onclick = () => { closeModal(); cb(b.dataset.id); });
  }

  // ------------------------------------------------------------------
  //  Écran titre / emplacements / intro
  // ------------------------------------------------------------------
  function showScreen(id) {
    $$('.screen').forEach(s => s.classList.toggle('active', s.id === id));
  }

  const fmtDate = (t) => new Date(t).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });

  function titleScreen() {
    showScreen('title');
    const any = SLOTS.some(n => store.get(SLOT_KEY(n)));
    $('#btn-continue').hidden = !any;
    $('#btn-sound-title').textContent = settings.sound ? '🔊 Son activé' : '🔈 Activer le son';
  }

  function slotsModal(purpose) {
    const rows = SLOTS.map(n => {
      const d = store.get(SLOT_KEY(n));
      const info = d
        ? `<b>${d.verdict ? 'Affaire close' : 'En cours'}</b> · ${d.mode === 'difficile' ? 'Difficile' : 'Normal'} · ${d.pieces.length}/${Object.keys(P).length} pièces · ${fmtDate(d.saved)}`
        : '<i>Vide</i>';
      const can = purpose === 'new' || d;
      return `<div class="slot-row"><span class="slot-n">${n}</span><span class="slot-info">${info}</span>
        <button class="btn small" data-slot="${n}" ${can ? '' : 'disabled'}>${purpose === 'new' ? (d ? 'Écraser' : 'Choisir') : 'Charger'}</button>
        ${d ? `<button class="btn small ghost" data-del="${n}" title="Supprimer">✕</button>` : ''}</div>`;
    }).join('');
    modal(`<div class="exam"><div class="crumb">Sauvegardes</div><h2>${purpose === 'new' ? 'Nouvelle enquête' : 'Reprendre une enquête'}</h2><div class="slots">${rows}</div></div>`, { cls: 'note' });
    // Confirmation en deux clics (les boîtes confirm() ne sont pas fiables partout)
    const armed = (b, label) => {
      if (b.dataset.armed) return true;
      b.dataset.armed = '1'; b.textContent = label; b.classList.add('danger');
      return false;
    };
    $$('[data-slot]', $('#modal')).forEach(b => b.onclick = () => {
      const n = +b.dataset.slot;
      if (purpose === 'new') {
        if (store.get(SLOT_KEY(n)) && !armed(b, 'Confirmer ?')) return;
        slot = n; difficultyModal();
      } else { slot = n; S = store.get(SLOT_KEY(n)); closeModal(); startGame(false); }
    });
    $$('[data-del]', $('#modal')).forEach(b => b.onclick = () => {
      if (!armed(b, 'Supprimer ?')) return;
      store.del(SLOT_KEY(+b.dataset.del)); slotsModal(purpose); titleScreen();
    });
  }

  function difficultyModal() {
    modal(`<div class="exam"><div class="crumb">Difficulté</div><h2>Choisissez votre approche</h2>
      <div class="diff">
        <button class="diff-card" data-mode="normal"><b>Normal</b><span>Chronologie remplie automatiquement, compteurs de progression visibles, retours explicites quand une pièce ne sert à rien.</span></button>
        <button class="diff-card" data-mode="difficile"><b>Difficile</b><span>Aucun compteur, chronologie réduite aux faits de départ, pas de retour explicite, erreurs plus coûteuses en crédibilité.</span></button>
      </div></div>`, { cls: 'note' });
    $$('[data-mode]', $('#modal')).forEach(b => b.onclick = () => {
      closeModal();
      S = newState(b.dataset.mode);
      intro();
    });
  }

  async function intro() {
    showScreen('intro');
    SFX.resume();
    const lines = [
      ['time', '17 OCTOBRE 2026 - 23:09:32'],
      ['label', "APPEL D'URGENCE"],
      ['v', "VOIX FÉMININE : « Mon frère... il est dans son bureau. Il y a du sang. Il ne répond plus. »"],
      ['o', "OPÉRATEUR : « Personne ne touche à rien. Qui est présent ? »"],
      ['v', "VOIX FÉMININE : « Nous sommes six... enfin, six avec moi. »"],
      ['n', "23 h 18. Vous arrivez au Manoir de Valombre. Les accès sont verrouillés, les téléphones placés sous scellés, les six personnes présentes séparées."],
      ['n', "Le propriétaire, Armand Delcourt, est mort dans son bureau. Personne n'est officiellement entré dans la propriété depuis le début du dîner."],
    ];
    const box = $('#intro-text');
    box.innerHTML = '';
    $('#intro-next').hidden = true;
    let skip = false;
    $('#intro').onclick = () => { skip = true; };
    for (const [k, txt] of lines) {
      const p = document.createElement('p'); p.className = 'il-' + k; box.appendChild(p);
      for (let i = 0; i <= txt.length; i++) {
        if (skip) { p.textContent = txt; break; }
        p.textContent = txt.slice(0, i);
        await wait(k === 'n' ? 14 : 22);
      }
      if (!skip) await wait(380);
    }
    $('#intro').onclick = null;
    $('#intro-next').hidden = false;
    $('#intro-next').focus();
  }

  function mission() {
    modal(`
      <article class="doc">
        <header class="doc-head"><span>DOSSIER 17 / MANOIR DE VALOMBRE</span><span>CELLULE CRIMINELLE - 18.10.2026</span></header>
        <h2>Ordre de mission</h2><div class="doc-tag">MISE EN PLACE</div>
        <table class="doc-table">
          <tr><th>Mission</th><td>Identifier le meurtrier, l'heure du meurtre, le mobile, la méthode et au moins deux preuves qui se recoupent.</td></tr>
          <tr><th>Méthode</th><td>Fouillez le manoir, interrogez les six suspects et <b>présentez-leur des pièces</b> pour révéler leurs contradictions. Reliez les pièces sur le <b>tableau</b> pour en tirer des déductions. Une personne peut mentir sans être le meurtrier.</td></tr>
          <tr><th>Crédibilité</th><td>Chaque pièce présentée à tort, chaque mauvaise association entame votre crédibilité, et donc la solidité de votre dossier.</td></tr>
          <tr><th>Indices</th><td>Trois cartes d'aide sont disponibles. N'en ouvrez une que si vous êtes bloqué.</td></tr>
          <tr><th>Accusation</th><td>Remplissez l'acte d'accusation, puis confrontez le suspect. Une seule tentative.</td></tr>
        </table>
        <p class="muted small">Raccourcis : 1 Manoir · 2 Suspects · 3 Dossier · 4 Tableau · 5 Chronologie · 6 Notes · 7 Indices · 8 Accuser · Échap fermer</p>
      </article>`, { cls: 'paper' });
  }

  function optionsModal() {
    modal(`<div class="exam"><div class="crumb">Options</div><h2>Réglages</h2>
      <div class="opt-row"><label>Son</label><button class="btn small" id="opt-sound">${settings.sound ? 'Activé' : 'Désactivé'}</button></div>
      <div class="opt-row"><label for="opt-vol">Volume</label><input type="range" id="opt-vol" min="0" max="1" step="0.05" value="${settings.vol}"></div>
      <div class="opt-row"><label>Taille du texte</label>
        <div class="seg">${[['s', 'Petit'], ['m', 'Normal'], ['l', 'Grand'], ['xl', 'Très grand']].map(([v, l]) => `<button class="seg-b ${settings.text === v ? 'on' : ''}" data-text="${v}">${l}</button>`).join('')}</div></div>
      <div class="opt-row"><label>Plein écran</label><button class="btn small" id="opt-fs">Basculer (F11)</button></div>
      ${S ? `<div class="opt-row"><label>Partie</label><span class="muted">Emplacement ${slot} · ${S.mode === 'difficile' ? 'Difficile' : 'Normal'}</span></div>` : ''}
    </div>`, { cls: 'note' });
    $('#opt-sound').onclick = () => { SFX.setOn(!settings.sound); optionsModal(); updateHeader(); };
    $('#opt-vol').oninput = (e) => SFX.setVol(+e.target.value);
    $$('[data-text]', $('#modal')).forEach(b => b.onclick = () => { settings.text = b.dataset.text; saveSettings(); applyText(); optionsModal(); });
    $('#opt-fs').onclick = toggleFullscreen;
  }
  const applyText = () => { document.documentElement.dataset.text = settings.text; };
  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => { /* refusé */ });
  };

  function startGame(fresh) {
    if (fresh) save();
    showScreen('game');
    SFX.resume();
    render();
    if (fresh) mission();
  }

  // ------------------------------------------------------------------
  //  Rendu principal
  // ------------------------------------------------------------------
  function countContras() {
    let n = 0;
    for (const s of Object.values(SUS)) for (const l of s.lines) if (l.contra) n += l.contra.length;
    return n;
  }

  function updateHeader() {
    $('#stat-pieces').textContent = S.pieces.length;
    $('#stat-total').textContent = hard() ? '?' : Object.keys(P).length;
    $('#stat-contra').textContent = S.contra.length;
    $('#stat-contra-total').textContent = hard() ? '?' : countContras();
    $('#stat-links').textContent = S.links.length;
    $('#stat-links-total').textContent = hard() ? '?' : CASE.deductions.length;
    const c = $('#stat-cred');
    c.textContent = S.cred + '%';
    c.parentElement.className = 'cred ' + (S.cred >= 70 ? 'hi' : S.cred >= 40 ? 'mid' : 'lo');
    const active = { scene: 'map', interro: 'suspects', confront: 'accuse', verdict: 'accuse' }[S.view] || S.view;
    $$('#nav button').forEach(b => b.classList.toggle('active', b.dataset.view === active));
    const badge = $('#badge-dossier');
    badge.textContent = S.unread.length; badge.hidden = !S.unread.length;
    $('#btn-sound').textContent = settings.sound ? '🔊' : '🔈';
  }

  function go(view, extra = {}) {
    Object.assign(S, { view }, extra);
    save();
    render();
    $('#main').scrollTop = 0;
  }

  function render() {
    updateHeader();
    const m = $('#main');
    const views = { map: renderMap, scene: renderScene, suspects: renderSuspects, interro: renderInterro, dossier: renderDossier, board: renderBoard, chrono: renderChrono, notes: renderNotes, indices: renderHints, accuse: renderAccuse, confront: renderConfront, verdict: renderVerdict };
    stopFx();
    m.innerHTML = '';
    m.classList.remove('fade'); void m.offsetWidth; m.classList.add('fade');
    (views[S.view] || renderMap)(m);
  }

  // ---------- Plan ----------
  function renderMap(m) {
    m.innerHTML = `
      <div class="view-head"><h1>Le manoir</h1><p>Choisissez un lieu à fouiller. Les zones en pointillés sont à l'extérieur.</p></div>
      <div class="map-wrap">${ART.map(S.visited, S.loc)}</div>
      <div class="map-legend">
        ${CASE.mapRooms.map(r => {
          const loc = LOC[r.id], total = loc.hotspots.filter(h => !h.go).length, done = loc.hotspots.filter(h => !h.go && S.examined.includes(r.id + ':' + h.id)).length;
          return `<button class="loc-chip ${S.visited.includes(r.id) ? 'visited' : ''}" data-loc="${r.id}">${loc.nom}${hard() ? '' : `<span>${done}/${total}</span>`}</button>`;
        }).join('')}
      </div>`;
    $$('[data-loc]', m).forEach(el => {
      el.onclick = () => enterLoc(el.dataset.loc);
      el.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); enterLoc(el.dataset.loc); } };
    });
  }

  function enterLoc(id) {
    if (!S.visited.includes(id)) {
      S.visited.push(id);
      if (LOC[id].onEnter) give(LOC[id].onEnter);
    }
    SFX.steps();
    go('scene', { loc: id });
    tip('scene');
  }

  // ---------- Scène ----------
  let fxStop = [];
  const stopFx = () => { fxStop.forEach(f => f()); fxStop = []; };

  function renderScene(m) {
    const loc = LOC[S.loc];
    let n = 0;
    const hs = loc.hotspots.map(h => {
      if (h.requires && !S.examined.includes(S.loc + ':' + h.requires)) return '';
      const done = S.examined.includes(S.loc + ':' + h.id);
      const label = h.go ? '➜' : loc.photo ? '' : (++n);
      return `<button class="hotspot ${done ? 'done' : ''} ${h.go ? 'exit' : ''}" style="left:${h.x}%;top:${h.y}%" data-h="${h.id}" aria-label="${h.label}">
        <span class="marker">${done && !h.go ? '✓' : label}</span><span class="hs-label">${h.label}</span></button>`;
    }).join('');
    const ratio = loc.ratio || 1000 / 560;
    const bg = loc.photo ? `<img class="scene-photo" src="${loc.photo}" alt="">` : ART.scene(S.loc);
    m.innerHTML = `
      <div class="view-head">
        <div><div class="crumb">${loc.zone}</div><h1>${loc.nom}</h1></div>
        <button class="btn ghost" id="back-map">⟵ Plan du manoir</button>
      </div>
      <div class="scene ${loc.photo ? 'has-photo' : ''} ${loc.cctv ? 'cctv-view' : ''}" id="scene" style="aspect-ratio:${ratio};max-width:min(1100px, calc((100vh - 230px) * ${ratio}))">
        ${bg}
        ${loc.rain ? '<canvas class="rain" id="rain"></canvas>' : ''}
        ${loc.torch ? '<div class="torch" id="torch"></div>' : ''}
        ${loc.cctv ? `<div class="cctv-ui"><span>CAM 01 - ALLÉE PRINCIPALE</span><span class="rec">● REC</span><span class="ts">17-10-2026</span><span class="ts2" id="cctv-clock">21:49:12</span></div><div class="scanlines"></div>` : ''}
        ${hs}<div class="scene-vignette"></div>
      </div>
      <div class="hs-list">${loc.hotspots.filter(h => !h.requires || S.examined.includes(S.loc + ':' + h.requires)).map(h => {
        const done = S.examined.includes(S.loc + ':' + h.id);
        return `<button class="hs-item ${done ? 'done' : ''} ${h.go ? 'exit' : ''}" data-h="${h.id}">${h.go ? '➜ ' : done ? '✓ ' : '🔍 '}${h.label}</button>`;
      }).join('')}</div>
      <div class="scene-foot">
        <p class="scene-desc">${loc.desc}</p>
        <div class="exits">${loc.exits.map(e => `<button class="btn small" data-exit="${e}">→ ${LOC[e].nom}</button>`).join('')}</div>
      </div>`;
    $('#back-map').onclick = () => go('map');
    $$('[data-exit]', m).forEach(b => b.onclick = () => enterLoc(b.dataset.exit));
    $$('.hotspot, .hs-item', m).forEach(b => b.onclick = () => examine(b.dataset.h));
    if (loc.rain) startRain($('#rain'));
    if (loc.torch) startTorch($('#scene'), $('#torch'));
    if (loc.cctv) startCctvClock();
  }

  function startRain(cv) {
    const ctx = cv.getContext('2d');
    let w, h, drops, raf;
    const resize = () => {
      w = cv.width = cv.clientWidth; h = cv.height = cv.clientHeight;
      drops = Array.from({ length: Math.round(w * h / 2500) }, () => ({ x: Math.random() * w, y: Math.random() * h, l: 8 + Math.random() * 14, v: 7 + Math.random() * 7 }));
    };
    resize();
    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(200,210,230,.28)'; ctx.lineWidth = 1;
      ctx.beginPath();
      for (const d of drops) {
        ctx.moveTo(d.x, d.y); ctx.lineTo(d.x - 2, d.y + d.l);
        d.y += d.v; d.x -= 0.6;
        if (d.y > h) { d.y = -d.l; d.x = Math.random() * w; }
      }
      ctx.stroke();
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener('resize', resize);
    fxStop.push(() => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); });
  }

  function startTorch(scene, torch) {
    const move = (e) => {
      const r = scene.getBoundingClientRect();
      torch.style.setProperty('--x', ((e.clientX - r.left) / r.width * 100) + '%');
      torch.style.setProperty('--y', ((e.clientY - r.top) / r.height * 100) + '%');
    };
    scene.addEventListener('mousemove', move);
    fxStop.push(() => scene.removeEventListener('mousemove', move));
  }

  function startCctvClock() {
    let t = 21 * 3600 + 49 * 60 + 12;
    const el = $('#cctv-clock');
    const iv = setInterval(() => {
      t++;
      const hh = String(Math.floor(t / 3600)).padStart(2, '0'), mm = String(Math.floor(t / 60) % 60).padStart(2, '0'), ss = String(t % 60).padStart(2, '0');
      if (el) el.textContent = `${hh}:${mm}:${ss}`;
    }, 1000);
    fxStop.push(() => clearInterval(iv));
  }

  function examine(hid) {
    const loc = LOC[S.loc], h = loc.hotspots.find(x => x.id === hid), key = S.loc + ':' + hid;
    if (!S.examined.includes(key)) S.examined.push(key);
    if (h.go) { save(); enterLoc(h.go); return; }
    const got = h.piece ? give(h.piece) : false;
    save();
    const btn = h.piece ? `<button class="btn" id="see-piece">Consulter la pièce ${P[h.piece].code}</button>` : '';
    render();
    modal(`<div class="exam"><div class="crumb">${loc.nom}</div><h2>${h.label}</h2><p>${h.text}</p>${got ? `<p class="got">+ Pièce ajoutée au dossier : <b>${P[h.piece].code}</b> - ${P[h.piece].titre}</p>` : ''}${btn}</div>`, { cls: 'note' });
    if (h.piece) $('#see-piece').onclick = () => openPiece(h.piece);
  }

  // ---------- Suspects ----------
  function renderSuspects(m) {
    m.innerHTML = `
      <div class="view-head"><h1>Suspects</h1><p>Six personnes présentes. Toutes avaient une raison d'en vouloir à Armand.</p></div>
      <div class="sus-grid">
        ${CASE.suspectOrder.map(id => {
          const s = SUS[id];
          const nC = s.lines.reduce((a, l) => a + (l.contra ? l.contra.length : 0), 0);
          const found = s.lines.reduce((a, l) => a + (l.contra ? l.contra.filter(c => S.contra.includes(c.id)).length : 0), 0);
          const meta = !S.talked.includes(id) ? 'Pas encore interrogé'
            : `Interrogé${hard() ? ` · ${found} point(s) relevé(s)` : ` · ${found}/${nC} points relevés`}${S.secrets.includes(id) ? ' · secret révélé' : ''}`;
          return `<button class="sus-card" data-s="${id}">
            <div class="sus-photo">${portrait(s)}</div>
            <div class="sus-info"><span class="code">${s.code}</span><h3>${s.nom}</h3><p>${s.age} ans · ${s.role}</p>
            <p class="sus-meta">${meta}</p></div>
          </button>`;
        }).join('')}
      </div>`;
    $$('.sus-card', m).forEach(b => b.onclick = () => openSuspect(b.dataset.s));
  }

  function openSuspect(id) {
    const s = SUS[id];
    if (!S.talked.includes(id)) { S.talked.push(id); give(s.audition); }
    go('interro', { suspect: id, dialog: null, tab: 'depo' });
    tip('interro');
  }

  function renderInterro(m) {
    const id = S.suspect, s = SUS[id];
    const secretOpen = has(s.secret.requires);
    const tab = S.tab || 'depo';
    m.innerHTML = `
      <div class="view-head">
        <div><div class="crumb">Salle d'audition · ${s.code}</div><h1>${s.nom}</h1></div>
        <button class="btn ghost" id="back-sus">⟵ Tous les suspects</button>
      </div>
      <div class="interro">
        <aside class="id-card">
          <div class="id-photo">${portrait(s)}</div>
          <table class="id-table">
            <tr><th>Âge</th><td>${s.age} ans</td></tr>
            <tr><th>Rôle</th><td>${s.role}</td></tr>
            <tr><th>Mobile apparent</th><td>${s.mobile}</td></tr>
            <tr><th>Alibi déclaré</th><td>${s.alibi}</td></tr>
          </table>
          <button class="btn small ghost" id="see-pv">Procès-verbal ${P[s.audition].code}</button>
        </aside>
        <section class="talk">
          <div class="dialog" id="dialog">${S.dialog ? S.dialog : `<span class="who">${s.prenom}</span> Je vous écoute. Je n'ai rien à cacher.`}</div>
          <div class="tabs">
            <button class="tab ${tab === 'depo' ? 'on' : ''}" data-tab="depo">Déposition</button>
            <button class="tab ${tab === 'q' ? 'on' : ''}" data-tab="q">Questions</button>
          </div>
          <div class="tab-body">
            ${tab === 'depo' ? `
              <p class="help">Repérez une affirmation douteuse et <b>présentez une pièce</b> qui la confirme ou la contredit.</p>
              <ol class="depo">
                ${s.lines.map((l, i) => {
                  const c = l.contra && l.contra.find(c => S.contra.includes(c.id));
                  const kind = c ? c.kind : '';
                  return `<li class="${c ? 'hit ' + kind : ''}"><span class="line">« ${l.t} »</span>
                    ${c ? `<span class="tag ${kind}">${kind === 'mensonge' ? 'MENSONGE' : kind === 'verif' ? 'VÉRIFIÉ' : 'NOTÉ'}</span>` : ''}
                    <button class="btn small present" data-line="${i}">Présenter une pièce</button></li>`;
                }).join('')}
              </ol>` : `
              <div class="questions">
                <button class="btn q" data-q="relation">Quelle était votre relation avec Armand ?</button>
                <button class="btn q" data-q="vu">Qu'avez-vous vu ou entendu ce soir ?</button>
                <button class="btn q ${secretOpen ? 'pressure' : 'locked'}" data-q="secret" ${secretOpen ? '' : 'disabled'}>
                  ${secretOpen ? 'Qu\'est-ce que vous nous cachez ?' : '🔒 Qu\'est-ce que vous nous cachez ? (il vous faut un élément concret)'}</button>
              </div>`}
          </div>
        </section>
      </div>`;
    $('#back-sus').onclick = () => go('suspects', { dialog: null });
    $('#see-pv').onclick = () => openPiece(s.audition);
    $$('.tab', m).forEach(b => b.onclick = () => go('interro', { tab: b.dataset.tab }));
    $$('.present', m).forEach(b => b.onclick = () => {
      const li = +b.dataset.line;
      pickPiece(`Présenter une pièce à ${s.prenom}<small>« ${s.lines[li].t} »</small>`, (pid) => present(id, li, pid));
    });
    $$('.q', m).forEach(b => b.onclick = () => ask(id, b.dataset.q));
  }

  const say = (id, text, cls = '') => { S.dialog = `<span class="who">${SUS[id].prenom}</span><span class="${cls}">${text}</span>`; };

  function present(sid, li, pid) {
    const s = SUS[sid], line = s.lines[li];
    const c = line.contra && line.contra.find(c => c.pieces.includes(pid));
    if (c) {
      const isNew = !S.contra.includes(c.id);
      if (isNew) S.contra.push(c.id);
      say(sid, c.resp, 'react-' + c.kind);
      if (c.unlock) c.unlock.forEach(give);
      if (isNew) {
        if (c.kind === 'mensonge') { SFX.thud(); toast('<b>Contradiction !</b> Un mensonge est démasqué.'); }
        else if (c.kind === 'verif') { SFX.ok(); toast('<b>Alibi vérifié</b> par une donnée indépendante.'); }
        else { SFX.ok(); toast('<b>Information notée.</b>'); }
      }
    } else {
      S.wrong++;
      loseCred(hard() ? 8 : 5);
      SFX.bad();
      const w = s.wrong[Math.floor(Math.random() * s.wrong.length)];
      say(sid, hard() ? w : `${w} <em class="aside">[La pièce ${P[pid].code} n'apporte rien sur ce point. Crédibilité -5 %]</em>`);
    }
    save(); render();
  }

  function ask(sid, q) {
    const s = SUS[sid];
    if (q === 'secret') {
      if (!has(s.secret.requires)) return;
      say(sid, s.secret.text, 'react-secret');
      if (!S.secrets.includes(sid)) { S.secrets.push(sid); give(s.secret.piece); }
    } else {
      say(sid, s.topics[q]);
    }
    save(); render();
  }

  // ---------- Dossier ----------
  function renderDossier(m) {
    m.innerHTML = `
      <div class="view-head"><h1>Dossier</h1><p>${S.pieces.length} pièce(s)${hard() ? '' : ` sur ${Object.keys(P).length}`}. Cliquez pour consulter.</p></div>
      ${groupPieces(S.pieces).map(([cat, ids]) => `
        <h2 class="cat">${cat}</h2>
        <div class="piece-grid">${ids.map(id => `
          <button class="piece-card ${S.unread.includes(id) ? 'new' : ''} ${P[id].img ? 'with-img' : ''}" data-id="${id}">
            ${P[id].img ? `<img src="${P[id].img}" alt="">` : ''}
            <span class="code">${P[id].code}</span><span class="pt">${P[id].titre}</span>
            ${S.unread.includes(id) ? '<span class="new-tag">NOUVEAU</span>' : ''}
          </button>`).join('')}</div>`).join('')}`;
    $$('.piece-card', m).forEach(b => b.onclick = () => { openPiece(b.dataset.id); b.classList.remove('new'); });
  }

  // ---------- Tableau de déductions ----------
  function renderBoard(m) {
    const usable = S.pieces.filter(id => P[id].cat !== 'Secrets');
    const found = CASE.deductions.filter(d => S.links.includes(d.id));
    m.innerHTML = `
      <div class="view-head"><h1>Tableau de l'enquête</h1><p>Sélectionnez deux pièces qui se recoupent, puis reliez-les. ${hard() ? '' : `Déductions : ${found.length}/${CASE.deductions.length}.`}</p></div>
      <div class="board-wrap">
        <div class="cork" id="cork">
          <svg class="strings" id="strings"></svg>
          ${usable.map(id => `<button class="pin-card ${S.boardSel.includes(id) ? 'sel' : ''} ${P[id].img ? 'with-img' : ''}" data-id="${id}">
            <i class="pin"></i>${P[id].img ? `<img src="${P[id].img}" alt="">` : ''}<span class="code">${P[id].code}</span><span class="pt">${P[id].titre}</span></button>`).join('')}
        </div>
        <aside class="deductions">
          <div class="link-bar">
            <div class="sel-slot">${S.boardSel[0] ? `${P[S.boardSel[0]].code}` : '-'}</div><span class="plus">+</span>
            <div class="sel-slot">${S.boardSel[1] ? `${P[S.boardSel[1]].code}` : '-'}</div>
            <button class="btn" id="btn-link" ${S.boardSel.length === 2 ? '' : 'disabled'}>Relier</button>
          </div>
          ${found.length ? found.map(d => `<div class="ded ${d.key ? 'key' : ''}"><b>${d.titre}</b><p>${d.text}</p></div>`).join('') : '<p class="muted">Aucune déduction pour le moment.</p>'}
        </aside>
      </div>`;
    $$('.pin-card', m).forEach(b => b.onclick = (e) => {
      if (e.detail === 2) return;
      const id = b.dataset.id;
      if (S.boardSel.includes(id)) S.boardSel = S.boardSel.filter(x => x !== id);
      else S.boardSel = [...S.boardSel.slice(-1), id];
      save(); renderBoardKeepScroll();
    });
    $$('.pin-card', m).forEach(b => b.ondblclick = () => openPiece(b.dataset.id));
    $('#btn-link').onclick = link;
    requestAnimationFrame(drawStrings);
    const onR = () => drawStrings();
    window.addEventListener('resize', onR);
    fxStop.push(() => window.removeEventListener('resize', onR));
    tip('board');
  }

  function renderBoardKeepScroll() {
    const st = $('#main').scrollTop;
    render();
    $('#main').scrollTop = st;
  }

  function drawStrings() {
    const cork = $('#cork'), svg = $('#strings');
    if (!cork || !svg) return;
    const r = cork.getBoundingClientRect();
    svg.setAttribute('width', cork.scrollWidth); svg.setAttribute('height', cork.scrollHeight);
    const pos = (id) => {
      const el = cork.querySelector(`.pin-card[data-id="${id}"] .pin`);
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return [b.left - r.left + b.width / 2, b.top - r.top + b.height / 2];
    };
    let lines = '';
    for (const d of CASE.deductions) {
      if (!S.links.includes(d.id)) continue;
      const pair = (S.linkPairs && S.linkPairs[d.id]) || d.pairs[0];
      const a = pos(pair[0]), b = pos(pair[1]);
      if (!a || !b) continue;
      const mx = (a[0] + b[0]) / 2, my = Math.max(a[1], b[1]) + 30;
      lines += `<path d="M${a[0]} ${a[1]} Q${mx} ${my} ${b[0]} ${b[1]}" />`;
    }
    svg.innerHTML = lines;
  }

  function link() {
    const [a, b] = S.boardSel;
    const d = CASE.deductions.find(d => d.pairs.some(p => (p[0] === a && p[1] === b) || (p[0] === b && p[1] === a)));
    if (d && !S.links.includes(d.id)) {
      S.links.push(d.id);
      S.linkPairs = Object.assign(S.linkPairs || {}, { [d.id]: [a, b] });
      SFX.ok();
      modal(`<div class="exam ded-modal"><div class="crumb">Déduction</div><h2>${d.titre}</h2><p>${d.text}</p></div>`, { cls: 'note' });
    } else if (d) {
      toast('Vous avez déjà tiré cette conclusion.');
    } else {
      loseCred(hard() ? 4 : 2);
      SFX.bad();
      toast(hard() ? 'Aucune conclusion solide.' : 'Ces deux pièces ne se recoupent pas. <b>Crédibilité -2 %</b>');
    }
    S.boardSel = [];
    save(); renderBoardKeepScroll();
  }

  // ---------- Chronologie + feuille 22:02:47 ----------
  function renderChrono(m) {
    const ev = [];
    const src = hard() ? ['D02'] : S.pieces;
    for (const id of src) for (const e of (P[id].tl || [])) ev.push({ ...e, src: P[id].code });
    const norm = (t) => (t.length === 5 ? t + ':00' : t);
    ev.sort((a, b) => norm(a.t).localeCompare(norm(b.t)) || b.s - a.s);
    const seen = new Set();
    const list = ev.filter(e => { const k = e.t + e.e; if (seen.has(k)) return false; seen.add(k); return true; });
    m.innerHTML = `
      <div class="view-head"><h1>Chronologie</h1><p>${hard() ? 'Mode difficile : seuls les faits de départ sont listés. À vous de reconstituer le reste.' : 'Se remplit avec les pièces découvertes.'} <span class="tl-key certain">● certain</span> <span class="tl-key declare">○ déclaré par un suspect</span></p></div>
      <section class="worksheet">
        <h2>Où était chacun à 22 h 02 min 47 ?</h2>
        <p class="muted">Cette feuille de travail sera comparée à la vérité lors du verdict.</p>
        <div class="ws-grid">
          ${CASE.suspectOrder.map(id => `<label class="ws-row"><span class="ws-face">${portrait(SUS[id])}</span><span class="ws-name">${SUS[id].prenom}</span>
            <select data-pos="${id}"><option value="">- ? -</option>${CASE.places.map(p => `<option ${S.pos[id] === p ? 'selected' : ''}>${p}</option>`).join('')}</select></label>`).join('')}
        </div>
      </section>
      <div class="tl-filter">
        <label><input type="checkbox" id="only-sure"> Uniquement les faits certains</label>
        <label><input type="checkbox" id="zoom"> Zoom 21:40 - 22:15</label>
      </div>
      <ol class="timeline" id="tl">
        ${list.map(e => `<li class="${e.s ? 'certain' : 'declare'}" data-t="${norm(e.t)}">
          <span class="t">${e.t}</span><span class="dot"></span><span class="e">${e.e}</span><span class="src">${e.src}</span></li>`).join('')}
      </ol>`;
    $$('[data-pos]', m).forEach(s => s.onchange = () => { S.pos[s.dataset.pos] = s.value; save(); });
    const apply = () => {
      const sure = $('#only-sure').checked, zoom = $('#zoom').checked;
      $$('#tl li').forEach(li => {
        const t = li.dataset.t;
        li.hidden = (sure && li.classList.contains('declare')) || (zoom && (t < '21:40:00' || t > '22:15:00'));
      });
    };
    $('#only-sure').onchange = apply; $('#zoom').onchange = apply;
  }

  // ---------- Notes ----------
  function renderNotes(m) {
    m.innerHTML = `
      <div class="view-head"><h1>Feuille de travail</h1><p>Vos notes sont enregistrées automatiquement.</p></div>
      <div class="notes-grid">
        ${CASE.suspectOrder.map(id => `
          <div class="note-card">
            <div class="note-head">${portrait(SUS[id])}<div><b>${SUS[id].nom}</b><small>${SUS[id].role}</small></div></div>
            <textarea data-n="${id}" placeholder="Mobile, alibi, preuves +, preuves -...">${escapeHtml(S.notes[id] || '')}</textarea>
          </div>`).join('')}
        <div class="note-card wide">
          <div class="note-head"><div><b>Notes générales</b><small>Hypothèses, chronologie...</small></div></div>
          <textarea data-n="_gen" placeholder="Vos hypothèses...">${escapeHtml(S.notes._gen || '')}</textarea>
        </div>
      </div>`;
    $$('textarea', m).forEach(t => t.oninput = () => { S.notes[t.dataset.n] = t.value; save(); });
  }

  // ---------- Indices ----------
  function renderHints(m) {
    m.innerHTML = `
      <div class="view-head"><h1>Cartes d'indice</h1><p>N'en ouvrez une que si vous êtes bloqué. Chaque carte ouverte est prise en compte dans votre note finale.</p></div>
      <div class="hints">
        ${CASE.hints.map((h, i) => `
          <div class="hint ${i < S.hints ? 'open' : ''}">
            <h3>INDICE ${i + 1}</h3>
            ${i < S.hints ? `<p>${h}</p>` : i === S.hints ? `<button class="btn" id="open-hint">✂ Découper la carte</button>` : `<p class="muted">Ouvrez d'abord l'indice ${i}.</p>`}
          </div>`).join('')}
      </div>`;
    const b = $('#open-hint');
    if (b) b.onclick = () => { S.hints++; save(); SFX.paper(); render(); };
  }

  // ---------- Accusation ----------
  function renderAccuse(m) {
    if (S.verdict) { go('verdict'); return; }
    if (S.confront) { go('confront'); return; }
    const opts = (q) => q.type === 'piece'
      ? `<select data-q="${q.id}"><option value="">- choisir une pièce du dossier -</option>${groupPieces(S.pieces).map(([cat, ids]) => `<optgroup label="${cat}">${ids.map(id => `<option value="${id}" ${S.answers[q.id] === id ? 'selected' : ''}>${P[id].code} - ${P[id].titre}</option>`).join('')}</optgroup>`).join('')}</select>`
      : `<div class="radios">${q.opts.map(([v, l]) => `<label><input type="radio" name="${q.id}" value="${v}" ${S.answers[q.id] === v ? 'checked' : ''}><span>${l}</span></label>`).join('')}</div>`;
    m.innerHTML = `
      <div class="view-head"><h1>Acte d'accusation</h1><p>Une seule tentative. Vous pouvez revenir à l'enquête, vos réponses sont conservées. Après le dépôt, vous confronterez l'accusé.</p></div>
      <form class="accuse doc" id="accuse-form">
        ${CASE.accusation.map(q => `<fieldset><legend>${q.q}</legend>${opts(q)}</fieldset>`).join('')}
        <div class="accuse-foot">
          <p class="muted">Pièces : ${S.pieces.length} · Points relevés : ${S.contra.length} · Déductions : ${S.links.length} · Crédibilité : ${S.cred} % · Indices : ${S.hints}/3</p>
          <button class="btn danger" type="submit">Déposer l'accusation</button>
        </div>
      </form>`;
    const f = $('#accuse-form');
    f.onchange = (e) => { const t = e.target; S.answers[t.name || t.dataset.q] = t.value; save(); };
    f.onsubmit = (e) => {
      e.preventDefault();
      const missing = CASE.accusation.filter(q => !S.answers[q.id]);
      if (missing.length) { toast(`Il manque ${missing.length} réponse(s) : « ${missing[0].q} »`); return; }
      if (S.answers.preuve1 === S.answers.preuve2) { toast('Choisissez deux preuves <b>différentes</b>.'); return; }
      modal(`<div class="exam"><h2>Confirmer l'accusation ?</h2><p>Vous accusez <b>${SUS[S.answers.coupable].nom}</b>. Cette décision est définitive.</p>
        <div class="row"><button class="btn danger" id="confirm-acc">Accuser</button><button class="btn ghost" id="cancel-acc">Revenir à l'enquête</button></div></div>`, { cls: 'note' });
      $('#confirm-acc').onclick = () => {
        closeModal(); SFX.stamp();
        if (S.answers.coupable === 'thomas') go('confront', { confront: { round: 0, lives: CASE.confrontLives, log: [], state: 'claim' } });
        else judge(false);
      };
      $('#cancel-acc').onclick = closeModal;
    };
  }

  // ---------- Confrontation finale ----------
  function renderConfront(m) {
    const C = S.confront, s = SUS.thomas, R = CASE.confrontation[C.round];
    const done = C.state === 'aveux' || C.state === 'silence';
    m.innerHTML = `
      <div class="confront">
        <div class="cf-head">
          <div class="crumb">Salle d'audition · Confrontation finale</div>
          <div class="lives">${Array.from({ length: CASE.confrontLives }, (_, i) => `<span class="${i < C.lives ? 'on' : ''}">⚖</span>`).join('')}</div>
        </div>
        <div class="cf-stage">
          <div class="cf-portrait ${C.state === 'hit' ? 'shake' : ''} ${C.state === 'aveux' ? 'broken' : ''}">${portrait(s)}</div>
          <div class="cf-talk">
            <div class="cf-progress">${CASE.confrontation.map((_, i) => `<i class="${i < C.round || C.state === 'aveux' ? 'ok' : i === C.round && !done ? 'cur' : ''}"></i>`).join('')}</div>
            <div class="cf-log">${C.log.map(l => `<p class="${l.who}">${l.who === 'you' ? '<b>Vous</b> ' : '<b>Thomas</b> '}${l.t}</p>`).join('')}</div>
            ${done ? '' : `<div class="cf-claim"><b>Thomas</b> « ${R.claim} »</div>`}
            <div class="row">
              ${C.state === 'claim' ? `<button class="btn danger" id="cf-present">Objection ! Présenter une pièce</button>` : ''}
              ${C.state === 'aveux' ? `<div class="aveux"><b>Thomas</b> ${CASE.aveux}</div><button class="btn" id="cf-end">Clore l'affaire</button>` : ''}
              ${C.state === 'silence' ? `<div class="aveux"><b>Thomas</b> « Je ne dirai plus rien sans mon avocat. »</div><button class="btn" id="cf-end">Clore l'affaire</button>` : ''}
            </div>
          </div>
        </div>
      </div>`;
    const p = $('#cf-present');
    if (p) p.onclick = () => pickPiece(`Contredire Thomas<small>« ${R.claim} »</small>`, confrontPresent);
    const e = $('#cf-end');
    if (e) e.onclick = () => judge(C.state === 'aveux');
    const log = $('.cf-log'); if (log) log.scrollTop = log.scrollHeight;
  }

  function confrontPresent(pid) {
    const C = S.confront, R = CASE.confrontation[C.round];
    if (R.ok.includes(pid)) {
      SFX.thud();
      C.log.push({ who: 'you', t: `[${P[pid].code}] ${R.win}` });
      if (R.react) C.log.push({ who: 'th', t: R.react });
      C.round++;
      C.state = C.round >= CASE.confrontation.length ? 'aveux' : 'hit';
      save(); render();
      if (C.state === 'hit') setTimeout(() => { if (S.view === 'confront' && C.state === 'hit') { C.state = 'claim'; save(); render(); } }, 700);
    } else {
      SFX.bad();
      C.lives--;
      loseCred(5);
      C.log.push({ who: 'you', t: `[${P[pid].code}] ...` });
      C.log.push({ who: 'th', t: 'Et alors ? Ça ne prouve rien. [Son avocat prend note.]' });
      if (C.lives <= 0) C.state = 'silence';
      save(); render();
    }
  }

  // ---------- Verdict ----------
  function judge(aveux) {
    const A = S.answers, res = [];
    let score = 0;
    for (const q of CASE.accusation) {
      if (q.type === 'piece') continue;
      const ok = q.ok.includes(A[q.id]);
      if (ok) score++;
      res.push({ q: q.q, a: q.opts.find(o => o[0] === A[q.id])[1], ok });
    }
    const f1 = CASE.proofFamilies[A.preuve1], f2 = CASE.proofFamilies[A.preuve2];
    const proofOk = !!(f1 && f2 && f1 !== f2);
    if (proofOk) score++;
    res.splice(5, 0, { q: 'Deux preuves qui se recoupent', a: `${P[A.preuve1].code} - ${P[A.preuve1].titre}<br>${P[A.preuve2].code} - ${P[A.preuve2].titre}`, ok: proofOk,
      note: proofOk ? '' : (f1 && f2 ? 'Ces deux pièces disent la même chose : elles ne se recoupent pas.' : 'Au moins une de ces pièces ne relie pas le coupable au crime.') });
    const culprit = A.coupable === 'thomas';
    if (culprit) {
      res.push({ q: 'Confrontation', a: aveux ? 'Aveux obtenus' : 'Thomas s\'est muré dans le silence', ok: aveux });
      if (aveux) score++;
    }
    const posOk = CASE.suspectOrder.filter(id => CASE.positions[id].includes(S.pos[id])).length;
    const max = CASE.accusation.filter(q => q.type !== 'piece').length + 2;
    S.verdict = { score, max, res, culprit, aveux, hints: S.hints, cred: S.cred, posOk, keyLinks: CASE.deductions.filter(d => d.key && S.links.includes(d.id)).length };
    save();
    go('verdict');
  }

  function renderVerdict(m) {
    const V = S.verdict;
    const pct = V.score / V.max;
    const ranks = ['ENQUÊTEUR STAGIAIRE', 'INSPECTEUR', 'INSPECTEUR PRINCIPAL', 'COMMISSAIRE'];
    const leads = ["Le bon nom, mais un dossier trop fragile pour tenir devant un juge.", 'Le bon coupable, mais la défense trouvera des failles.', 'Dossier bouclé, chaque élément à sa place.', 'Une démonstration implacable, sans la moindre aide.'];
    let rank, lead;
    if (!V.culprit) { rank = 'ERREUR JUDICIAIRE'; lead = CASE.wrongCulprit[S.answers.coupable]; }
    else {
      let r = pct === 1 && V.hints === 0 ? 3 : pct === 1 ? 2 : pct >= .7 ? 1 : 0;
      if (V.cred < 40 && r > 0) r--;
      rank = ranks[r]; lead = leads[r] + (V.cred < 40 ? ' Votre crédibilité entamée a pesé sur la décision.' : '');
    }
    const keyTotal = CASE.deductions.filter(d => d.key).length;
    const epi = !V.culprit ? CASE.epilogue.lose : V.aveux ? CASE.epilogue.win : CASE.epilogue.partial;
    m.innerHTML = `
      <div class="verdict">
        <div class="stamp-big ${V.culprit ? 'ok' : 'ko'}">${V.culprit ? (V.aveux ? 'AFFAIRE RÉSOLUE' : 'MISE EN EXAMEN') : 'ÉCHEC'}</div>
        <h1>${rank}</h1><p class="lead">${lead}</p>
        <p class="score">${V.score} / ${V.max} <small>· crédibilité ${V.cred} % · indices ${V.hints}/3</small></p>
        <div class="verdict-stats">
          <span>Feuille 22:02:47 : <b>${V.posOk}/6</b></span>
          <span>Déductions clés : <b>${V.keyLinks}/${keyTotal}</b></span>
          <span>Points relevés : <b>${S.contra.length}/${countContras()}</b></span>
        </div>
        <ul class="res">${V.res.map(r => `<li class="${r.ok ? 'ok' : 'ko'}"><span class="mark">${r.ok ? '✓' : '✗'}</span><div><b>${r.q}</b><br>${r.a}${r.note ? `<br><em>${r.note}</em>` : ''}</div></li>`).join('')}</ul>
        <section class="epilogue doc"><h3>Épilogue</h3>${epi}</section>
        <div class="row center">
          <button class="btn" id="show-sol">Ouvrir la solution</button>
          <button class="btn ghost" id="replay">Nouvelle partie</button>
        </div>
        <div id="sol" class="solution doc" hidden>${CASE.solution}</div>
        <p class="credits">Dossier 17 - Le Manoir de Valombre · un jeu <b>by yac</b></p>
      </div>`;
    $('#show-sol').onclick = () => { $('#sol').hidden = false; $('#sol').scrollIntoView({ behavior: 'smooth' }); };
    $('#replay').onclick = () => { titleScreen(); slotsModal('new'); };
  }

  // ------------------------------------------------------------------
  //  Démarrage
  // ------------------------------------------------------------------
  const VIEW_KEYS = { '1': 'map', '2': 'suspects', '3': 'dossier', '4': 'board', '5': 'chrono', '6': 'notes', '7': 'indices', '8': 'accuse' };

  function bind() {
    $('#btn-new').onclick = () => slotsModal('new');
    $('#btn-continue').onclick = () => slotsModal('load');
    $('#btn-options-title').onclick = optionsModal;
    $('#intro-next').onclick = (e) => { e.stopPropagation(); startGame(true); };
    $$('#nav button').forEach(b => b.onclick = () => go(b.dataset.view));
    $('#modal-close').onclick = closeModal;
    $('#modal').onclick = (e) => { if (e.target.id === 'modal' && !$('#modal-close').hidden) closeModal(); };
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !$('#modal-close').hidden) closeModal();
      if (e.key === 'F11') { e.preventDefault(); toggleFullscreen(); }
      if (!$('#game').classList.contains('active') || e.target.matches('textarea, input, select')) return;
      if (VIEW_KEYS[e.key] && !modalOpen()) go(VIEW_KEYS[e.key]);
    });
    $('#btn-sound').onclick = () => { SFX.setOn(!settings.sound); updateHeader(); };
    $('#btn-sound-title').onclick = () => { SFX.setOn(!settings.sound); titleScreen(); };
    $('#btn-options').onclick = optionsModal;
    $('#btn-menu').onclick = () => { save(); titleScreen(); };
    $('#btn-mission').onclick = mission;
  }

  applyText();
  bind();
  titleScreen();
})();
