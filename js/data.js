// =====================================================================
//  DOSSIER 17 - LE MANOIR DE VALOMBRE
//  Toutes les données de l'enquête (adaptées du dossier joueur PDF).
// =====================================================================

const CASE = {};

// ---------------------------------------------------------------------
//  PIECES DU DOSSIER
//  tl : événements ajoutés à la chronologie (s:1 = certain, s:0 = déclaré)
// ---------------------------------------------------------------------
CASE.pieces = {
  A01: {
    code: 'A-01', cat: 'Contexte', titre: 'Appel initial',
    html: `
      <div class="doc-box mono">
        <div class="doc-box-head"><span>TRANSCRIPTION - CENTRE DE TRAITEMENT DES APPELS</span><span>REF. A-01</span></div>
        <h3>23:09:32 - APPEL D'URGENCE</h3>
        <p><b>VOIX FÉMININE :</b> « Mon frère... il est dans son bureau. Il y a du sang. Il ne répond plus. »</p>
        <p><b>OPÉRATEUR :</b> « Personne ne touche à rien. Qui est présent ? »</p>
        <p><b>VOIX FÉMININE :</b> « Nous sommes six... enfin, six avec moi. »</p>
      </div>
      <p>À 23 h 18, les premiers enquêteurs arrivent. Les accès sont verrouillés, les téléphones sont placés sous scellés et les six personnes présentes sont séparées.</p>`,
    tl: [
      { t: '23:06', e: 'Claire découvre le corps.', s: 1 },
      { t: '23:09:32', e: "Appel d'urgence passé par Claire.", s: 1 },
      { t: '23:18', e: 'Arrivée des premiers enquêteurs.', s: 1 },
    ],
  },
  A02: {
    img: "img/facade.jpg", cap: "A-02 - façade / jardin arrière",
    code: 'A-02', cat: 'Contexte', titre: 'Le manoir',
    html: `
      <p class="photo-cap">PHOTO - façade / jardin arrière</p>
      <p>Le domaine comporte une <b>entrée principale sous caméra</b> et un <b>jardin arrière sans surveillance vidéo</b>.</p>
      <p>Le bureau d'Armand donne sur ce jardin par une <b>fenêtre basse</b>, accessible depuis un <b>chemin de gravier blanc</b>.</p>`,
  },
  A03: {
    code: 'A-03', cat: 'Contexte', titre: 'Plan du rez-de-chaussée',
    html: `
      <p>Bureau · Bibliothèque · Hall · Salon<br>Salle à manger · Cuisine · Escalier</p>
      <p><b>Seule la bibliothèque donne accès au bureau depuis l'intérieur.</b></p>
      <p>La fenêtre du bureau donne sur le jardin arrière (gravier blanc). Elle <b>n'est pas visible depuis l'allée principale</b>.</p>`,
  },
  C01: {
    code: 'C-01', cat: 'Victime & soirée', titre: 'Victime : Armand Delcourt',
    html: `
      <table class="doc-table">
        <tr><th>Âge</th><td>58 ans</td></tr>
        <tr><th>Fonction</th><td>Président de Delcourt Patrimoine</td></tr>
        <tr><th>Fortune estimée</th><td>7,4 M EUR</td></tr>
        <tr><th>Situation</th><td>Veuf, une fille : Élise</td></tr>
        <tr><th>Projet en cours</th><td>Vente du Manoir de Valombre</td></tr>
        <tr><th>Dernière décision</th><td>Réviser testament et accords financiers</td></tr>
      </table>
      <p>Armand est décrit comme méthodique, méfiant et peu enclin à revenir sur une décision. Le soir du dîner, plusieurs invités avaient une raison de vouloir le faire changer d'avis.</p>`,
  },
  D01: {
    code: 'D-01', cat: 'Victime & soirée', titre: 'Plan de table du dîner',
    html: `
      <div class="table-plan">
        <div class="tp-head">ARMAND</div>
        <div class="tp-row"><span>CLAIRE</span><i></i><span>JULIEN</span></div>
        <div class="tp-row"><span>SOFIA</span><i></i><span>THOMAS</span></div>
        <div class="tp-row"><span>ÉLISE</span><i></i><span>MARC</span></div>
      </div>
      <p>Thomas était assis à proximité directe d'Armand. Marc avait apporté une <b>chemise rouge</b> contenant les documents de vente.</p>
      <p><b>Au dessert, Armand buvait encore du vin</b> selon trois témoins.</p>`,
  },
  D02: {
    code: 'D-02', cat: 'Victime & soirée', titre: 'Chronologie certaine',
    html: `
      <ul class="tl-doc">
        <li><b>20:30</b> Début du dîner.</li>
        <li><b>21:34</b> Fin du dessert, passage au salon.</li>
        <li><b>21:42</b> Armand reçoit un appel et part vers son bureau.</li>
        <li><b>21:49</b> Thomas sort par la porte principale.</li>
        <li><b>21:51</b> Sofia débute son appel sur la terrasse.</li>
        <li><b>21:58</b> Armand envoie un message à Marc.</li>
        <li><b>22:02:47</b> Un choc sourd est enregistré sur l'appel de Sofia.</li>
        <li><b>22:03:12</b> Message envoyé depuis le téléphone d'Armand à Julien.</li>
        <li><b>22:04</b> Thomas rentre par la porte principale.</li>
        <li><b>22:06</b> Fin de l'appel de Sofia.</li>
        <li><b>23:06</b> Claire découvre le corps.</li>
      </ul>`,
    tl: [
      { t: '20:30', e: 'Début du dîner.', s: 1 },
      { t: '21:34', e: 'Fin du dessert, passage au salon.', s: 1 },
      { t: '21:42', e: 'Armand reçoit un appel et part vers son bureau.', s: 1 },
      { t: '21:49', e: 'Thomas sort par la porte principale.', s: 1 },
      { t: '21:51', e: 'Sofia débute son appel sur la terrasse.', s: 1 },
      { t: '21:58', e: 'Armand envoie un message à Marc.', s: 1 },
      { t: '22:02:47', e: "Choc sourd enregistré sur l'appel de Sofia.", s: 1 },
      { t: '22:03:12', e: "Message envoyé depuis le téléphone d'Armand à Julien.", s: 1 },
      { t: '22:04', e: 'Thomas rentre par la porte principale.', s: 1 },
      { t: '22:06', e: "Fin de l'appel de Sofia.", s: 1 },
    ],
  },
  B01: {
    img: "img/scene.jpg", cap: "B-01 - bureau, arrivée des enquêteurs",
    code: 'B-01', cat: 'Scène de crime', titre: 'Scène de crime',
    html: `
      <p class="photo-cap">PHOTO - bureau d'Armand Delcourt à l'arrivée des enquêteurs</p>
      <table class="doc-table">
        <tr><th>1</th><td>Corps</td></tr>
        <tr><th>2</th><td>Statuette</td></tr>
        <tr><th>3</th><td>Fenêtre</td></tr>
        <tr><th>4</th><td>Verre / dossier</td></tr>
      </table>`,
  },
  SC04: {
    code: 'Scellé 04', cat: 'Scène de crime', titre: 'Dossier « VENTE - VALOMBRE »',
    html: `
      <p><b>SCELLÉ 04</b> - Dossier « VENTE - VALOMBRE » posé sur le bureau.</p>
      <p class="warn">La <b>page 7 est manquante</b>.</p>`,
  },
  SC07: {
    code: 'Scellé 07', cat: 'Scène de crime', titre: 'Boue sur le rebord de la fenêtre',
    html: `
      <p><b>SCELLÉ 07</b> - Prélèvement de boue sur le <b>rebord intérieur</b> de la fenêtre du bureau.</p>
      <p>La goutte de boue contient du <b>gravier calcaire blanc</b>.</p>`,
  },
  F01: {
    code: 'F-01', cat: 'Expertises', titre: 'Extraction du téléphone',
    html: `
      <div class="phone">
        <div class="phone-head">Messages - Armand</div>
        <div class="msg-meta">21:58 → MARC</div>
        <div class="msg">Apporte-moi le dossier rouge dans 20 min.</div>
        <div class="msg-meta">22:03 → JULIEN</div>
        <div class="msg">Il faut qu'on règle ça ce soir. Viens seul.</div>
      </div>
      <p class="mono small">RAPPORT D'EXTRACTION - SCELLÉ 05</p>
      <p>Le message adressé à Julien est envoyé à <b>22 h 03 min 12</b>.</p>
      <p>Le dernier déverrouillage confirmé du téléphone date de <b>21 h 58 min 32</b>, lors du message à Marc.</p>
      <p>Réglage du téléphone : <b>verrouillage automatique après 5 minutes</b> d'inactivité.</p>
      <p>Conclusion technique : à 22 h 03 min 12, le téléphone pouvait encore être utilisé sans ressaisir le code.</p>
      <div class="postit"><b>QUESTION</b><br>Si Armand est déjà mort à 22 h 03, qui a envoyé ce message - et pourquoi ?</div>`,
    tl: [
      { t: '21:58:32', e: "Dernier déverrouillage du téléphone d'Armand (message à Marc).", s: 1 },
      { t: '22:03:12', e: '« Il faut qu\'on règle ça ce soir. Viens seul. » → Julien.', s: 1 },
      { t: '22:03:32', e: "Verrouillage automatique du téléphone (21:58:32 + 5 min).", s: 1 },
    ],
  },
  F02: {
    code: 'F-02', cat: 'Expertises', titre: 'Rapport médico-légal',
    html: `
      <table class="doc-table">
        <tr><th>Cause du décès</th><td>Traumatisme crânien unique provoqué par un objet contondant lourd.</td></tr>
        <tr><th>Compatibilité</th><td>Blessure compatible avec la base de la statuette en bronze.</td></tr>
        <tr><th>Fenêtre de décès</th><td>Entre <b>21 h 58 et 22 h 08</b>. Précision limitée par les méthodes classiques.</td></tr>
        <tr><th>Toxicologie</th><td>Aucun sédatif ni toxique détecté. Faible quantité de whisky dans l'estomac.</td></tr>
        <tr><th>Main droite</th><td>Trace d'<b>encre bleu-noir récente</b> sur l'index et le pouce.</td></tr>
        <tr><th>Remarque</th><td>Mort très rapide après le coup ; aucun déplacement volontaire possible ensuite.</td></tr>
      </table>`,
    tl: [{ t: '21:58', e: 'Début de la fenêtre de décès (légiste) - jusqu\'à 22:08.', s: 1 }],
  },
  F03: {
    img: "img/statuette.jpg", cap: "Statuette en bronze - scellé 01",
    code: 'F-03', cat: 'Expertises', titre: 'Arme présumée : statuette',
    html: `
      <p class="photo-cap">PHOTO - Statuette en bronze - scellé 01</p>
      <table class="doc-table">
        <tr><th>Masse</th><td>2,4 kg</td></tr>
        <tr><th>Base</th><td>Traces de <b>nettoyage récent</b> sur une zone d'environ 7 cm.</td></tr>
        <tr><th>Sous la base</th><td>Une fibre de laine gris anthracite.</td></tr>
        <tr><th>Empreintes</th><td>Aucune empreinte complète exploitable.</td></tr>
        <tr><th>Microtrace</th><td>Dépôt brun compatible avec le sang de la victime.</td></tr>
      </table>`,
  },
  F04: {
    img: "img/whisky.jpg", cap: "Bouteille et verre - scellés 02/03",
    code: 'F-04', cat: 'Expertises', titre: 'Le whisky',
    html: `
      <p class="photo-cap">PHOTO - Bouteille et verre - scellés 02/03</p>
      <p><b>Scellé 02</b> : verre de whisky à moitié plein, posé sur le bureau.<br><b>Scellé 03</b> : bouteille de whisky au bar. Plusieurs empreintes exploitables.</p>
      <p>Empreintes sur la bouteille : <b>Armand, Marc, Thomas</b>.</p>
      <p>Thomas affirme avoir servi Armand <b>avant</b> que celui-ci quitte la salle à manger.</p>
      <p>Claire, Élise et Sofia disent toutes qu'Armand buvait encore du vin au dessert et qu'il a demandé son whisky <b>après être parti au bureau</b>.</p>
      <div class="contra"><b>CONTRADICTION À EXPLIQUER</b><br>Quand Thomas a-t-il réellement manipulé la bouteille ?</div>`,
  },
  G01: {
    img: "img/cctv.jpg", cap: "CAM 01 - allée principale - 21:49:12",
    code: 'G-01', cat: 'Preuves', titre: "Caméra de l'allée",
    html: `
      <div class="cctv">
        <div class="cctv-head"><span>CAM 01 - ALLÉE PRINCIPALE</span><span class="rec">● REC</span></div>
        <div class="cctv-row"><b>21:49:12</b> Thomas sort.</div>
        <div class="cctv-row"><b>21:52:03</b> Il quitte le champ côté est.</div>
        <div class="cctv-row"><b>22:03:41</b> Silhouette partielle côté est.</div>
        <div class="cctv-row"><b>22:04:18</b> Thomas rentre.</div>
      </div>`,
    tl: [
      { t: '21:49:12', e: 'CAM 01 : Thomas sort.', s: 1 },
      { t: '21:52:03', e: 'CAM 01 : Thomas quitte le champ côté est.', s: 1 },
      { t: '22:03:41', e: 'CAM 01 : silhouette partielle côté est.', s: 1 },
      { t: '22:04:18', e: 'CAM 01 : Thomas rentre.', s: 1 },
    ],
  },
  JA: {
    code: 'Relevé', cat: 'Preuves', titre: 'Chemin du jardin arrière',
    html: `
      <p>Sous la fenêtre du bureau, le chemin du jardin arrière est recouvert de <b>gravier calcaire blanc</b>. Le sol est humide.</p>
      <p>C'est le seul chemin qui mène à la fenêtre basse. Aucune caméra ne couvre cette zone.</p>`,
  },
  G02: {
    img: "img/boue.jpg", cap: "Empreinte schématique - chaussure saisie",
    code: 'G-02', cat: 'Preuves', titre: 'Trace de boue / gravier',
    html: `
      <p class="photo-cap">PHOTO - Empreinte schématique - chaussure saisie</p>
      <p>Chaussures de Thomas : <b>boue humide et micro-graviers clairs</b>.</p>
      <p>Allée principale : gravier <b>rouge brun</b>.</p>
      <p>Chemin du jardin arrière sous la fenêtre du bureau : gravier <b>calcaire blanc</b>.</p>
      <p>Sur le rebord intérieur de la fenêtre : une goutte de boue contenant le même type de gravier blanc.</p>
      <blockquote>Thomas : « Je ne suis jamais passé derrière le manoir. »</blockquote>`,
  },
  G03: {
    code: 'G-03', cat: 'Preuves', titre: 'Page 7 du dossier de vente',
    html: `
      <div class="paper-page">
        <h4>PROJET DE CESSION - DOMAINE DE VALOMBRE</h4>
        <p><b>Article 6</b> - Prix de cession : 3 200 000 EUR.</p>
        <p><b>Article 7</b> - Commission d'intermédiation : 160 000 EUR au bénéfice de Thomas Renaud, sous réserve de l'absence de conflit d'intérêts.</p>
        <p><b>Article 8</b> - Signature définitive prévue le 19 octobre 2026.</p>
        <div class="annule">ANNULÉ</div>
        <p class="hand">- Thomas m'a caché qu'il est associé à l'acheteur.<br>Je transmets demain à mon avocat. - A.D.</p>
        <div class="pageno">- 7 -</div>
      </div>
      <p class="warn">La page 7 de ce dossier est retrouvée <b>pliée dans la poche intérieure du manteau de Thomas</b>.</p>`,
  },
  G04: {
    code: 'G-04', cat: 'Preuves', titre: 'Contexte financier',
    html: `
      <table class="doc-table">
        <tr><th colspan="2">RELEVÉ BANCAIRE - THOMAS RENAUD (compte professionnel)</th></tr>
        <tr><th>Découvert professionnel</th><td class="red">-46 280 EUR</td></tr>
        <tr><th>Échéance fiscale</th><td>31 000 EUR sous 12 jours</td></tr>
      </table>
      <div class="paper-page small">
        <h4>RECONNAISSANCE DE DETTE</h4>
        <p>Thomas Renaud reconnaît devoir <b>80 000 EUR</b> à Armand Delcourt. Remboursement exigible au 31/10/2026.</p>
      </div>
      <div class="postit"><b>NOTE D'ARMAND</b><br><span class="hand">« S'il persiste à nier le conflit d'intérêts, je bloque la commission et je saisis mon avocat. »</span></div>`,
  },
  G05: {
    img: "img/fibre.jpg", cap: "Vue microscopique x120 - fibre de laine",
    code: 'G-05', cat: 'Preuves', titre: 'Microtrace textile',
    html: `
      <p><b>Fibre retrouvée (scellé 06)</b> : laine, gris anthracite, diamètre moyen 24 µm. Retrouvée sous la statuette.</p>
      <table class="doc-table">
        <tr><th colspan="2">VÊTEMENTS SAISIS</th></tr>
        <tr><th>Claire</th><td>robe noire synthétique</td></tr>
        <tr><th>Julien</th><td>costume bleu marine</td></tr>
        <tr><th>Sofia</th><td>veste crème</td></tr>
        <tr><th>Thomas</th><td><b>manteau laine gris anthracite</b></td></tr>
        <tr><th>Élise</th><td>pull bordeaux</td></tr>
        <tr><th>Marc</th><td>costume brun</td></tr>
      </table>
      <blockquote>La comparaison est compatible avec le manteau de Thomas, mais ne constitue pas une identification unique.</blockquote>`,
  },
  G06: {
    code: 'G-06', cat: 'Preuves', titre: "Enregistrement de l'appel de Sofia",
    html: `
      <div class="cctv">
        <div class="cctv-head"><span>Enregistrement d'appel - cabinet - 17/10/2026</span><span>21:51:08 → 22:06:22</span></div>
        <div class="wave"></div>
        <div class="cctv-row"><b>22:02:41</b> ASSOCIÉ : « ...je t'envoie les plans demain matin. »</div>
        <div class="cctv-row red"><b>22:02:47</b> [BRUIT SOURD - durée 0,4 s]</div>
        <div class="cctv-row"><b>22:03:05</b> SOFIA : « Attends... j'ai entendu un truc. »</div>
        <div class="cctv-row"><b>22:03:19</b> ASSOCIÉ : « Quoi ? »</div>
        <div class="cctv-row"><b>22:03:24</b> SOFIA : « Je sais pas. Continue. »</div>
      </div>
      <p>La terrasse est à environ <b>14 m de la fenêtre du bureau</b>. Le bruit est compatible avec un impact lourd ou une chute de mobilier.</p>`,
    tl: [
      { t: '21:51:08', e: "Début de l'appel de Sofia (enregistré par son cabinet).", s: 1 },
      { t: '22:02:47', e: 'Bruit sourd de 0,4 s sur la ligne de Sofia.', s: 1 },
      { t: '22:06:22', e: "Fin de l'appel de Sofia.", s: 1 },
    ],
  },
  G07: {
    code: 'G-07', cat: 'Preuves', titre: 'Horloge du bureau',
    html: `
      <p class="big-time">22 h 03</p>
      <p>Heure affichée à la découverte : 22 h 03.</p>
      <p>L'horloge mécanique s'arrête si son balancier est brutalement décroché. Le mécanisme n'est pas endommagé.</p>
      <p>La pendule était réglée environ <b>40 secondes en avance</b> par rapport à l'heure réseau.</p>
      <blockquote>Cet élément soutient une heure du choc proche de 22 h 02 - 22 h 03, sans suffire seul à conclure.</blockquote>`,
    tl: [{ t: '22:02:20', e: 'Pendule arrêtée sur 22:03 (40 s d\'avance → ~22:02:20 réel au plus tôt).', s: 1 }],
  },

  // ---- Éléments de contrôle (vérification des alibis) ----
  CT01: {
    code: 'Contrôle E-01', cat: 'Contrôles', titre: "Borne Wi-Fi de l'étage",
    html: `<p><b>Donnée indépendante :</b> appel sortant du téléphone de Claire de <b>22 h 01 à 22 h 04</b> depuis la borne Wi-Fi de l'étage.</p>`,
    tl: [{ t: '22:01', e: "Claire passe un appel depuis l'étage (jusqu'à 22:04).", s: 1 }],
  },
  CT02: {
    code: 'Contrôle E-02', cat: 'Contrôles', titre: "Ordinateur de Julien",
    html: `<p><b>Donnée indépendante :</b> sauvegarde automatique d'un document sur l'ordinateur de Julien, dans le hall, à <b>22 h 02 min 31</b> et <b>22 h 04 min 10</b>.</p>`,
    tl: [
      { t: '22:02:31', e: 'Sauvegarde auto sur l\'ordinateur de Julien (hall).', s: 1 },
      { t: '22:04:10', e: 'Sauvegarde auto sur l\'ordinateur de Julien (hall).', s: 1 },
    ],
  },
  CT05: {
    code: 'Contrôle E-05', cat: 'Contrôles', titre: 'Témoignage de Marc sur Élise',
    html: `<p><b>Donnée indépendante :</b> Marc confirme la présence d'Élise au salon à partir d'environ <b>22 h 09</b>.</p>`,
    tl: [{ t: '22:09', e: 'Marc et Élise ensemble au salon (selon Marc).', s: 0 }],
  },
  CT06: {
    code: 'Contrôle E-06', cat: 'Contrôles', titre: 'Le dossier rouge',
    html: `<p><b>Donnée indépendante :</b> le dossier rouge est resté <b>fermé sur une table du salon</b> jusqu'à l'arrivée de la police.</p>`,
  },

  // ---- Auditions ----
  E01: {
    code: 'E-01', cat: 'Auditions', titre: 'Audition - Claire Delcourt',
    html: `<div class="pv">« Après le dîner, je suis restée au salon. Vers 21 h 55, je suis montée chercher un châle. Je suis redescendue vers 22 h 10. J'ai croisé Julien près de l'escalier. Ensuite je suis restée avec Élise et Marc. Vers 23 h, je me suis inquiétée et je suis allée dans le bureau. »</div>`,
    tl: [
      { t: '21:55', e: 'Claire dit monter chercher un châle.', s: 0 },
      { t: '22:10', e: "Claire dit redescendre et croiser Julien près de l'escalier.", s: 0 },
    ],
  },
  E02: {
    code: 'E-02', cat: 'Auditions', titre: 'Audition - Julien Morel',
    html: `<div class="pv">« Armand m'avait demandé d'apporter les comptes. Après son départ, je suis allé aux toilettes puis j'ai travaillé dans le hall. Je n'ai pas mis les pieds dans son bureau. Le message de 22 h 03 m'a surpris : je pensais qu'il me convoquait pour parler de la restructuration. »</div>`,
    tl: [{ t: '21:45', e: 'Julien dit aller aux toilettes puis travailler dans le hall.', s: 0 }],
  },
  E03: {
    code: 'E-03', cat: 'Auditions', titre: 'Audition - Sofia Benali',
    html: `<div class="pv">« Je suis sortie sur la terrasse pour appeler mon associé. Vers la fin, j'ai entendu un choc. J'ai aussi aperçu quelqu'un près du côté est du manoir, mais seulement une silhouette. »</div>`,
    tl: [{ t: '22:03', e: 'Sofia dit apercevoir une silhouette côté est.', s: 0 }],
  },
  E04: {
    code: 'E-04', cat: 'Auditions', titre: 'Audition - Thomas Renaud',
    html: `<div class="pv">« J'ai fumé devant le manoir, près de l'allée. Je ne suis jamais passé derrière. Je suis rentré à 22 h 04, puis j'ai bu un verre au bar. J'avais servi un whisky à Armand avant qu'il quitte la salle à manger. »</div>`,
    tl: [{ t: '21:50', e: "Thomas dit fumer devant le manoir, près de l'allée, sans passer derrière.", s: 0 }],
  },
  E05: {
    code: 'E-05', cat: 'Auditions', titre: 'Audition - Élise Delcourt',
    html: `<div class="pv">« J'étais au salon presque tout le temps. Je suis juste passée en salle à manger chercher mon chargeur. J'ai entendu mon père parler assez fort depuis son bureau, vers 22 h, mais je n'ai pas distingué les mots. »</div>`,
    tl: [{ t: '22:00', e: 'Élise dit entendre son père parler fort dans son bureau.', s: 0 }],
  },
  E06: {
    code: 'E-06', cat: 'Auditions', titre: 'Audition - Marc Vasseur',
    html: `<div class="pv">« À 21 h 58, Armand m'a demandé d'apporter le dossier rouge vingt minutes plus tard. Je ne l'ai pas fait : Élise m'a retenu dans une conversation. Je n'ai découvert sa mort qu'avec les autres. »</div>`,
  },

  // ---- Ce que chacun cachait (H-01) ----
  H_CLAIRE: { code: 'H-01', cat: 'Secrets', titre: 'Secret de Claire', html: `<p>Claire a contacté un <b>agent immobilier</b> pour faire estimer sa part du manoir.</p>` },
  H_JULIEN: { code: 'H-01', cat: 'Secrets', titre: 'Secret de Julien', html: `<p>Julien a <b>masqué une erreur comptable de 42 000 EUR</b> pour protéger son poste.</p>` },
  H_SOFIA:  { code: 'H-01', cat: 'Secrets', titre: 'Secret de Sofia',  html: `<p>Sofia a <b>facturé deux fois une étude de sol</b> par erreur et craignait un litige.</p>` },
  H_THOMAS: { code: 'H-01', cat: 'Secrets', titre: 'Secret de Thomas', html: `<p>Thomas est <b>associé, via une société tierce, à l'acheteur du domaine</b>.</p>` },
  H_ELISE:  { code: 'H-01', cat: 'Secrets', titre: "Secret d'Élise",   html: `<p>Élise a demandé au notaire si elle pouvait <b>contester la vente après le décès</b> de son père.</p>` },
  H_MARC:   { code: 'H-01', cat: 'Secrets', titre: 'Secret de Marc',   html: `<p>Marc préparait un <b>testament réduisant la part de Claire</b> au profit d'Élise.</p>` },
};

CASE.startPieces = ['A01', 'A02', 'A03', 'C01', 'D02'];

CASE.catOrder = ['Contexte', 'Victime & soirée', 'Scène de crime', 'Auditions', 'Contrôles', 'Expertises', 'Preuves', 'Secrets'];

// ---------------------------------------------------------------------
//  LIEUX
//  hotspots : x/y en % de la scène. piece = pièce obtenue.
//  requires = id d'un autre hotspot à examiner avant. go = changer de lieu.
// ---------------------------------------------------------------------
CASE.locations = {
  bureau: {
    nom: 'Bureau', zone: 'Rez-de-chaussée', photo: 'img/scene.jpg', ratio: 1536 / 1024,
    desc: "Lambris sombres, odeur de whisky et de cire. Le corps d'Armand Delcourt gît près du bureau. La fenêtre basse donne sur le jardin arrière.",
    onEnter: 'B01',
    exits: ['bibliotheque'],
    hotspots: [
      { id: 'corps', label: 'Corps', x: 84, y: 74, piece: 'F02',
        text: "Armand Delcourt, face contre le parquet. Un seul coup à la tête. Vous notez une trace d'encre bleu-noir sur son index et son pouce droits. Le légiste vous transmet son rapport." },
      { id: 'statuette', label: 'Statuette', x: 57, y: 66, piece: 'F03',
        text: "Une statuette en bronze, renversée au sol. Sa base semble avoir été essuyée à la hâte." },
      { id: 'fibre', label: 'Sous la statuette', x: 64, y: 70, piece: 'G05', requires: 'statuette',
        text: "En soulevant la statuette, le technicien prélève une fibre de laine gris anthracite (scellé 06). Le labo la compare aux vêtements saisis." },
      { id: 'verre', label: 'Verre de whisky', x: 17, y: 41,
        text: "Scellé 02 : un verre de whisky à moitié plein, posé sur le bureau. Armand a à peine eu le temps d'y toucher. La bouteille, elle, est restée au bar du salon." },
      { id: 'dossier', label: 'Dossier de vente', x: 21, y: 29, piece: 'SC04',
        text: "Le dossier « VENTE - VALOMBRE » est ouvert. Il manque une page." },
      { id: 'telephone', label: 'Téléphone (scellé)', x: 6, y: 47, piece: 'F01',
        text: "Le téléphone d'Armand (scellé 05). L'équipe technique en extrait les derniers messages." },
      { id: 'tiroir', label: 'Tiroir', x: 13, y: 64, piece: 'G04',
        text: "Dans le tiroir : une reconnaissance de dette signée par Thomas Renaud et une note manuscrite d'Armand. La cellule financière vous transmet aussi le relevé bancaire de Thomas." },
      { id: 'fenetre', label: 'Fenêtre basse', x: 69, y: 18, piece: 'SC07',
        text: "La fenêtre basse n'est pas verrouillée. Sur le rebord intérieur, une goutte de boue séchée, piquée de petits graviers blancs (scellé 07)." },
      { id: 'horloge', label: 'Pendule murale', x: 51, y: 7, piece: 'G07',
        text: "La pendule murale est arrêtée. Son balancier pend, décroché." },
    ],
  },
  bibliotheque: {
    nom: 'Bibliothèque', zone: 'Rez-de-chaussée',
    desc: "Des rayonnages jusqu'au plafond. Une porte communicante mène au bureau : c'est le seul accès intérieur.",
    exits: ['bureau', 'hall'],
    hotspots: [
      { id: 'porte_bureau', label: 'Porte du bureau', x: 5, y: 49, go: 'bureau',
        text: "La porte communicante avec le bureau. Le seul passage intérieur." },
      { id: 'rayons', label: 'Rayonnages', x: 48, y: 13,
        text: "Des reliures anciennes, quelques ouvrages de droit notarial. Rien n'a été déplacé." },
      { id: 'fauteuil', label: 'Fauteuil', x: 75, y: 75,
        text: "Un fauteuil de lecture, un plaid plié. Personne ne s'y est assis ce soir, à en juger par le coussin intact." },
    ],
  },
  hall: {
    nom: 'Hall', zone: 'Rez-de-chaussée',
    desc: "Grand hall d'entrée dallé. Une console sert de bureau improvisé. Un vestiaire près de la porte principale.",
    exits: ['bibliotheque', 'salon', 'allee', 'escalier'],
    hotspots: [
      { id: 'ordi', label: 'Ordinateur de Julien', x: 21, y: 55, piece: 'CT02',
        text: "L'ordinateur portable de Julien est resté ouvert sur un tableur. L'historique du document affiche des sauvegardes automatiques." },
      { id: 'manteau', label: 'Manteau de Thomas', x: 79, y: 41, piece: 'G03',
        text: "Un manteau en laine gris anthracite, au vestiaire. Dans la poche intérieure : une feuille pliée en quatre." },
      { id: 'chaussures', label: 'Chaussures de Thomas', x: 78, y: 79, piece: 'G02',
        text: "Les chaussures de Thomas, saisies à son retour. Les semelles sont humides et incrustées de micro-graviers clairs. Le labo compare avec les sols du domaine." },
      { id: 'porte', label: 'Porte principale', x: 50, y: 90, go: 'allee',
        text: "La porte principale, filmée par la caméra de l'allée." },
    ],
  },
  salon: {
    nom: 'Salon', zone: 'Rez-de-chaussée',
    desc: "Le salon où les invités sont passés après le dessert, à 21 h 34. Un bar en acajou dans un angle.",
    exits: ['hall'],
    hotspots: [
      { id: 'dossier_rouge', label: 'Dossier rouge', x: 52, y: 71, piece: 'CT06',
        text: "La chemise rouge de Marc, avec les documents de vente. Elle est fermée, sur la table basse." },
      { id: 'bar', label: 'Bar', x: 85, y: 48, piece: 'F04',
        text: "Le bar du salon. La bouteille de whisky (scellé 03) porte plusieurs empreintes exploitables. Vos collègues ont recueilli les témoignages sur le service du whisky." },
      { id: 'canape', label: 'Canapé', x: 21, y: 61,
        text: "Claire, Élise et Marc disent avoir passé la fin de soirée ici, ensemble." },
    ],
  },
  salle: {
    nom: 'Salle à manger', zone: 'Rez-de-chaussée',
    desc: "La table n'a pas été entièrement débarrassée. Sept couverts.",
    exits: ['cuisine'],
    hotspots: [
      { id: 'table', label: 'Table du dîner', x: 49, y: 50, piece: 'D01',
        text: "Les cartons de placement sont encore sur la table." },
      { id: 'vin', label: "Verre d'Armand", x: 31, y: 48,
        text: "Au bout de la table, le verre à vin d'Armand, encore un fond de rouge. Pas de verre à whisky à sa place." },
      { id: 'chargeur', label: 'Chargeur', x: 86, y: 84,
        text: "Un câble de chargeur branché près du buffet. Élise dit être venue le chercher." },
    ],
  },
  cuisine: {
    nom: 'Cuisine', zone: 'Rez-de-chaussée',
    desc: "Vaisselle du dîner empilée. Rien ne semble avoir bougé.",
    exits: ['salle', 'escalier'],
    hotspots: [
      { id: 'evier', label: 'Évier', x: 41, y: 13,
        text: "Des assiettes à dessert, des verres à vin. Aucun verre à whisky." },
      { id: 'porte_cuisine', label: 'Porte de service', x: 92, y: 46,
        text: "La porte de service est verrouillée de l'intérieur. La clé est sur la serrure." },
    ],
  },
  escalier: {
    nom: 'Escalier', zone: 'Rez-de-chaussée',
    desc: "L'escalier principal mène aux chambres.",
    exits: ['hall', 'cuisine', 'etage'],
    hotspots: [
      { id: 'monter', label: "Monter à l'étage", x: 66, y: 32, go: 'etage', text: "Vous montez à l'étage." },
      { id: 'palier', label: 'Bas des marches', x: 27, y: 71,
        text: "Claire dit avoir croisé Julien ici en redescendant, vers 22 h 10." },
    ],
  },
  etage: {
    nom: 'Étage', zone: 'Premier étage',
    desc: "Un long couloir et les chambres d'amis. Silencieux.",
    exits: ['escalier'],
    hotspots: [
      { id: 'borne', label: 'Borne Wi-Fi', x: 70, y: 38, piece: 'CT01',
        text: "La borne Wi-Fi de l'étage garde un journal des connexions. L'opérateur fournit le détail des appels passés à travers elle." },
      { id: 'chambre_claire', label: 'Chambre de Claire', x: 24, y: 61,
        text: "Un châle est posé sur le lit. Le placard est entrouvert." },
    ],
  },
  terrasse: {
    nom: 'Terrasse', zone: 'Extérieur',
    desc: "Une terrasse dallée à l'arrière, à environ 14 m de la fenêtre du bureau. On y devine l'angle est du manoir.",
    exits: ['jardin'],
    hotspots: [
      { id: 'appel', label: "Appel de Sofia", x: 40, y: 65, piece: 'G06',
        text: "Le cabinet de Sofia enregistre automatiquement les appels professionnels. Il vous transmet l'enregistrement complet." },
      { id: 'vue_est', label: 'Côté est', x: 94, y: 54,
        text: "Depuis la terrasse, on voit l'angle est du manoir, là où une silhouette aurait été aperçue." },
    ],
  },
  jardin: {
    nom: 'Jardin arrière', zone: 'Extérieur', photo: 'img/facade.jpg', ratio: 1536 / 1024, torch: true, rain: true,
    desc: "Pelouse détrempée et chemin de gravier blanc. Aucune caméra ici. La fenêtre éclairée du bureau est à hauteur de genou.",
    exits: ['terrasse', 'allee'],
    hotspots: [
      { id: 'gravier_blanc', label: 'Chemin de gravier', x: 58, y: 60, piece: 'JA',
        text: "Un chemin de gravier calcaire blanc longe la façade jusqu'à la fenêtre du bureau." },
      { id: 'fenetre_ext', label: 'Fenêtre du bureau', x: 47, y: 45,
        text: "La fenêtre basse du bureau. Un adulte peut l'enjamber sans difficulté. On ne la voit pas depuis l'allée principale." },
    ],
  },
  allee: {
    nom: 'Allée principale', zone: 'Extérieur', photo: 'img/cctv.jpg', ratio: 2059 / 1162, cctv: true,
    desc: "L'allée de gravier rouge brun devant l'entrée. Une caméra surveille la porte principale.",
    exits: ['hall', 'jardin'],
    hotspots: [
      { id: 'camera', label: 'Caméra CAM 01', x: 6, y: 20, piece: 'G01',
        text: "La caméra de l'allée. Vous récupérez l'export des événements de la soirée." },
      { id: 'gravier_rouge', label: 'Gravier', x: 55, y: 62,
        text: "Ici, le gravier est rouge brun. Rien à voir avec celui du jardin arrière." },
      { id: 'mégots', label: 'Cendrier', x: 31, y: 74,
        text: "Un cendrier sur pied près de l'entrée. Un seul mégot récent." },
      { id: 'champ_est', label: 'Limite du champ côté est', x: 92, y: 38,
        text: "C'est par là que Thomas sort du champ de la caméra à 21 h 52 min 03. Au-delà, plus aucune image jusqu'à la silhouette de 22 h 03 min 41." },
      { id: 'porte_allee', label: 'Porte principale', x: 16, y: 44, go: 'hall', text: "Vous rentrez dans le hall." },
    ],
  },
};

// Plan cliquable (coordonnées dans un viewBox 1000 x 640)
CASE.mapRooms = [
  { id: 'jardin', x: 70, y: 20, w: 400, h: 70, ext: true, label: 'JARDIN ARRIÈRE · gravier blanc' },
  { id: 'terrasse', x: 560, y: 20, w: 300, h: 70, ext: true, label: 'TERRASSE' },
  { id: 'bureau', x: 70, y: 120, w: 180, h: 190, label: 'BUREAU' },
  { id: 'bibliotheque', x: 250, y: 120, w: 200, h: 190, label: 'BIBLIOTHÈQUE' },
  { id: 'hall', x: 450, y: 120, w: 200, h: 190, label: 'HALL' },
  { id: 'salon', x: 650, y: 120, w: 210, h: 190, label: 'SALON' },
  { id: 'salle', x: 70, y: 310, w: 280, h: 170, label: 'SALLE À MANGER' },
  { id: 'cuisine', x: 350, y: 310, w: 270, h: 170, label: 'CUISINE' },
  { id: 'escalier', x: 620, y: 310, w: 240, h: 170, label: 'ESCALIER / ÉTAGE' },
  { id: 'allee', x: 260, y: 520, w: 600, h: 90, ext: true, label: 'ALLÉE PRINCIPALE · gravier rouge brun · CAM 01' },
];

// ---------------------------------------------------------------------
//  SUSPECTS
//  lines : déposition. contra : pièces qui réagissent sur cette ligne.
//  kind : 'mensonge' (mensonge démasqué) | 'verif' (alibi vérifié) | 'info'
// ---------------------------------------------------------------------
CASE.suspects = {
  claire: {
    code: 'S-01', nom: 'Claire Delcourt', prenom: 'Claire', age: 54, role: 'Sœur de la victime',
    mobile: "Opposée à la vente du manoir. Une dispute violente a eu lieu l'après-midi.",
    alibi: "Affirme être montée à l'étage de 21 h 55 à 22 h 10.",
    audition: 'E01', photo: 'img/claire.jpg',
    look: { skin: '#e2c2a6', hair: '#6d6a68', style: 'short', cloth: '#141414' },
    topics: {
      relation: "C'était mon frère. Oui, nous nous sommes disputés cet après-midi. Il voulait vendre la maison où nous avons grandi, comme on vend un immeuble de bureaux. Je ne l'ai pas tué pour autant.",
      vu: "Pas grand-chose. En redescendant, j'ai croisé Julien près de l'escalier. Ensuite je suis restée avec Élise et Marc, jusqu'à ce que je m'inquiète.",
    },
    lines: [
      { t: "Après le dîner, je suis restée au salon." },
      { t: "Vers 21 h 55, je suis montée chercher un châle. Je suis redescendue vers 22 h 10.",
        contra: [{ id: 'claire_etage', pieces: ['CT01'], kind: 'verif',
          resp: "...Oui, j'étais bien là-haut. J'ai passé un appel, c'est vrai. Je n'en ai pas parlé parce que ce n'était pas... très élégant. [Son alibi est confirmé par une donnée indépendante entre 22 h 01 et 22 h 04.]" }] },
      { t: "J'ai croisé Julien près de l'escalier." },
      { t: "Ensuite je suis restée avec Élise et Marc." },
      { t: "Vers 23 h, je me suis inquiétée et je suis allée dans le bureau." },
    ],
    secret: { requires: 'CT01', piece: 'H_CLAIRE',
      text: "Bon. L'appel depuis l'étage... c'était un agent immobilier. Je voulais faire estimer ma part du manoir. Si la vente devait se faire, autant savoir ce qui me revenait. Je n'en suis pas fière." },
    wrong: ["Je ne vois pas le rapport.", "Qu'est-ce que vous voulez que je vous dise ?", "Ça ne me concerne pas."],
  },
  julien: {
    code: 'S-02', nom: 'Julien Morel', prenom: 'Julien', age: 42, role: 'Directeur financier',
    mobile: "Armand devait annoncer une restructuration. Julien craignait d'être écarté.",
    alibi: "Déclare avoir travaillé sur son ordinateur dans le hall.",
    audition: 'E02', photo: 'img/julien.jpg',
    look: { skin: '#e6c5a8', hair: '#3b2a20', style: 'short', cloth: '#1a2238', glasses: true },
    topics: {
      relation: "Armand était mon patron depuis des années. Il préparait une restructuration et, oui, je craignais d'être écarté. Ce n'est pas un secret.",
      vu: "J'avais le nez dans mes tableaux. J'ai vu Thomas rentrer de sa cigarette, juste après le message. Il est allé droit vers le bar du salon.",
    },
    lines: [
      { t: "Armand m'avait demandé d'apporter les comptes." },
      { t: "Après son départ, je suis allé aux toilettes puis j'ai travaillé dans le hall.",
        contra: [{ id: 'julien_hall', pieces: ['CT02'], kind: 'verif',
          resp: "Voilà ! Vous voyez ? Je travaillais. Je n'ai pas quitté cet écran. [Les sauvegardes de 22:02:31 et 22:04:10 le placent dans le hall autour du choc.]" }] },
      { t: "Je n'ai pas mis les pieds dans son bureau." },
      { t: "Le message de 22 h 03 m'a surpris : je pensais qu'il me convoquait pour parler de la restructuration.",
        contra: [{ id: 'julien_message', pieces: ['F01'], kind: 'info',
          resp: "« Viens seul »... Armand n'écrivait jamais comme ça. Il signait toujours ses messages, même les plus courts. Quelqu'un voulait que je me rende dans ce bureau." }] },
    ],
    secret: { requires: 'CT02', piece: 'H_JULIEN',
      text: "Puisque vous avez mon ordinateur... Il y a une erreur de 42 000 euros dans les comptes. Je l'ai masquée. Si Armand l'avait vue, j'étais fini. Mais je ne suis pas entré dans ce bureau." },
    wrong: ["Je ne vois pas où vous voulez en venir.", "Ça n'a aucun rapport avec moi.", "Vous perdez votre temps."],
  },
  sofia: {
    code: 'S-03', nom: 'Sofia Benali', prenom: 'Sofia', age: 36, role: 'Architecte',
    mobile: "Plusieurs factures de rénovation étaient contestées par Armand.",
    alibi: "Appel professionnel sur la terrasse de 21 h 51 à 22 h 06.",
    audition: 'E03', photo: 'img/sofia.jpg',
    look: { skin: '#cfa27f', hair: '#1c1714', style: 'bun', cloth: '#ece4d2' },
    topics: {
      relation: "Je dirigeais la rénovation du manoir. Armand contestait plusieurs factures. Rien d'inhabituel avec un client exigeant.",
      vu: "Un bruit sourd, vers la fin de mon appel. Et juste après, une silhouette près de l'angle est du manoir. Pas de visage. Quelqu'un qui marchait vite.",
    },
    lines: [
      { t: "Je suis sortie sur la terrasse pour appeler mon associé.",
        contra: [{ id: 'sofia_appel', pieces: ['G06'], kind: 'verif',
          resp: "Mon cabinet enregistre tout, oui. Vous avez la preuve que j'étais au téléphone pendant tout ce temps. [Appel continu de 21:51:08 à 22:06:22.]" }] },
      { t: "Vers la fin, j'ai entendu un choc.",
        contra: [{ id: 'sofia_choc', pieces: ['G06', 'G07'], kind: 'info',
          resp: "22 h 02 min 47... c'est donc ça. Un bruit lourd, très court. Sur le moment, j'ai cru à un meuble qui tombait." }] },
      { t: "J'ai aussi aperçu quelqu'un près du côté est du manoir, mais seulement une silhouette.",
        contra: [{ id: 'sofia_silhouette', pieces: ['G01'], kind: 'verif',
          resp: "La caméra l'a captée aussi, à 22 h 03 min 41 ? Alors je n'ai pas rêvé. Quelqu'un revenait de l'arrière du manoir." }] },
    ],
    secret: { requires: 'G06', piece: 'H_SOFIA',
      text: "Une des factures contestées... j'ai facturé deux fois une étude de sol. Une erreur, je vous jure. J'avais peur qu'il en fasse un litige." },
    wrong: ["Je ne comprends pas la question.", "Ça ne prouve rien me concernant.", "Je ne vois pas le lien."],
  },
  thomas: {
    code: 'S-04', nom: 'Thomas Renaud', prenom: 'Thomas', age: 39, role: "Entrepreneur / ami d'enfance",
    mobile: "Doit 80 000 EUR à Armand. Une commission liée à la vente est également en jeu.",
    alibi: "Sort fumer à 21 h 49. Réapparaît à l'entrée à 22 h 04.",
    audition: 'E04', photo: 'img/thomas.jpg',
    look: { skin: '#dcb592', hair: '#151210', style: 'short', cloth: '#3a3b3d' },
    topics: {
      relation: "Armand, c'est mon ami d'enfance. Je lui dois de l'argent, d'accord, mais entre amis ça s'arrange. Et la vente, je ne faisais qu'y donner un coup de main.",
      vu: "Rien du tout. J'ai fumé, j'ai regardé les étoiles, je suis rentré. Fin de l'histoire.",
    },
    lines: [
      { t: "J'ai fumé devant le manoir, près de l'allée.",
        contra: [{ id: 'thomas_camera', pieces: ['G01'], kind: 'mensonge',
          resp: "La caméra me perd à 21 h 52 ? ...J'ai fait quelques pas, voilà. Il faisait froid, je bougeais pour me réchauffer. Ce n'est pas un crime." }] },
      { t: "Je ne suis jamais passé derrière.",
        contra: [{ id: 'thomas_gravier', pieces: ['G02', 'JA', 'SC07'], kind: 'mensonge',
          resp: "Du gravier blanc... il y en a sûrement ailleurs dans ce domaine. [Il évite votre regard.] Les allées, les massifs... je ne sais pas, moi." }] },
      { t: "Je suis rentré à 22 h 04, puis j'ai bu un verre au bar." },
      { t: "J'avais servi un whisky à Armand avant qu'il quitte la salle à manger.",
        contra: [{ id: 'thomas_whisky', pieces: ['F04', 'D01'], kind: 'mensonge',
          resp: "Elles se trompent. Elles avaient bu, toutes les trois... [Trois témoins disent qu'Armand buvait du vin au dessert et a demandé son whisky une fois au bureau. Thomas a donc servi ce whisky ailleurs que devant tout le monde.]" }] },
      { t: "Je ne suis pas entré dans ce bureau de la soirée.",
        contra: [{ id: 'thomas_fibre', pieces: ['G05', 'SC07'], kind: 'mensonge',
          resp: "Une fibre de laine ? Tout le monde a un manteau en laine en octobre ! [Le seul vêtement saisi compatible est le sien.]" }] },
      { t: "Entre Armand et moi, il n'y avait aucun problème.",
        contra: [{ id: 'thomas_mobile', pieces: ['G03', 'G04'], kind: 'mensonge',
          resp: "[Il pâlit en voyant le document.] Il... il allait tout annuler. La commission, l'avocat... Vous ne comprenez pas, j'étais à découvert, le fisc dans douze jours..." }] },
    ],
    secret: { requires: 'G03', piece: 'H_THOMAS',
      text: "D'accord. D'accord ! Je suis associé à l'acheteur, via une autre société. Armand l'a découvert ce soir. Mais ça ne fait pas de moi un assassin !" },
    wrong: ["Et alors ?", "Vous croyez m'impressionner avec ça ?", "Ça ne prouve absolument rien.", "Je n'ai rien à voir avec ça."],
  },
  elise: {
    code: 'S-05', nom: 'Élise Delcourt', prenom: 'Élise', age: 29, role: "Fille d'Armand",
    mobile: "Refuse que le manoir de sa mère soit vendu.",
    alibi: "Dit être restée au salon, sauf quelques minutes en salle à manger.",
    audition: 'E05', photo: 'img/elise.jpg',
    look: { skin: '#ecd0b8', hair: '#5a3a24', style: 'long', cloth: '#5a1a22' },
    topics: {
      relation: "C'est la maison de ma mère. Il voulait la vendre comme il aurait vendu une entreprise. Je lui en voulais... mais c'était mon père.",
      vu: "J'ai entendu mon père parler fort, depuis son bureau, vers 22 h. Comme s'il se disputait avec quelqu'un.",
    },
    lines: [
      { t: "J'étais au salon presque tout le temps." },
      { t: "Je suis juste passée en salle à manger chercher mon chargeur." },
      { t: "J'ai entendu mon père parler assez fort depuis son bureau, vers 22 h, mais je n'ai pas distingué les mots.",
        contra: [{ id: 'elise_voix', pieces: ['F01'], kind: 'info',
          resp: "Aucun appel sur son téléphone à ce moment-là ? Alors... il ne parlait pas au téléphone. Il y avait quelqu'un avec lui, dans le bureau." }] },
    ],
    secret: { requires: 'CT05', piece: 'H_ELISE',
      text: "J'ai demandé à Maître Vasseur si je pourrais contester la vente... si mon père venait à disparaître. C'était hypothétique. Je sais comment ça sonne maintenant." },
    wrong: ["Je ne sais pas quoi vous dire.", "Je ne vois pas le rapport avec moi.", "Vous me soupçonnez vraiment ?"],
  },
  marc: {
    code: 'S-06', nom: 'Marc Vasseur', prenom: 'Marc', age: 61, role: 'Notaire de la famille',
    mobile: "Détient le projet de vente et un nouveau testament.",
    alibi: "Affirme être resté au salon après le dîner.",
    audition: 'E06', photo: 'img/marc.jpg',
    look: { skin: '#e4c4ab', hair: '#e8e8e6', style: 'bald', cloth: '#3a2a1e' },
    topics: {
      relation: "Je suis le notaire de la famille depuis trente ans. J'ai apporté le projet de vente... et d'autres documents qu'Armand m'avait demandés.",
      vu: "Élise m'a retenu au salon. Le dossier rouge n'a pas quitté la table basse.",
    },
    lines: [
      { t: "À 21 h 58, Armand m'a demandé d'apporter le dossier rouge vingt minutes plus tard.",
        contra: [{ id: 'marc_message', pieces: ['F01'], kind: 'verif',
          resp: "Exactement. « Apporte-moi le dossier rouge dans 20 min. » C'est son style : sec et précis." }] },
      { t: "Je ne l'ai pas fait : Élise m'a retenu dans une conversation.",
        contra: [{ id: 'marc_dossier', pieces: ['CT06'], kind: 'verif', unlock: ['CT05'],
          resp: "Vous voyez, il n'a pas bougé. Élise et moi étions au salon, elle m'a parlé de la vente... à partir de 22 h 09 environ, je peux en témoigner. [Nouvelle pièce : témoignage de Marc sur Élise.]" }] },
      { t: "Je n'ai découvert sa mort qu'avec les autres." },
    ],
    secret: { requires: 'CT06', piece: 'H_MARC',
      text: "Le secret professionnel... soit. Armand m'avait demandé un nouveau testament. Il réduisait la part de Claire au profit d'Élise. Il n'était pas encore signé." },
    wrong: ["Je ne vois pas la pertinence.", "Cela n'appelle aucun commentaire de ma part.", "Soyez précis, je vous prie."],
  },
};

CASE.suspectOrder = ['claire', 'julien', 'sofia', 'thomas', 'elise', 'marc'];

// ---------------------------------------------------------------------
//  INDICES (cartes d'aide)
// ---------------------------------------------------------------------
CASE.hints = [
  "Ne vous fiez pas à tous les mensonges. Fixez d'abord l'heure la plus probable du coup.",
  "Comparez le message de 22 h 03 avec le verrouillage automatique du téléphone.",
  "Croisez trois choses : gravier blanc, whisky, page 7.",
];

// ---------------------------------------------------------------------
//  ACTE D'ACCUSATION
// ---------------------------------------------------------------------
CASE.accusation = [
  { id: 'coupable', q: 'Nous accusons :', opts: [
      ['claire', 'Claire Delcourt'], ['julien', 'Julien Morel'], ['sofia', 'Sofia Benali'],
      ['thomas', 'Thomas Renaud'], ['elise', 'Élise Delcourt'], ['marc', 'Marc Vasseur']],
    ok: ['thomas'] },
  { id: 'heure', q: 'Heure approximative du meurtre :', opts: [
      ['a', 'Vers 21 h 45, juste après son arrivée au bureau'],
      ['b', 'Vers 21 h 58, au moment du message à Marc'],
      ['c', 'À 22 h 02 min 47, le choc enregistré sur l\'appel de Sofia'],
      ['d', 'À 22 h 03 min 12, au moment du message à Julien'],
      ['e', 'Après 22 h 10']],
    ok: ['c'] },
  { id: 'acces', q: 'Comment le meurtrier a-t-il rejoint / quitté le bureau ?', opts: [
      ['a', 'Par la bibliothèque, depuis l\'intérieur du manoir'],
      ['b', 'Par la fenêtre basse, depuis le jardin arrière (aller et retour), hors du champ de la caméra'],
      ['c', 'Par la porte de service de la cuisine'],
      ['d', 'Il n\'a pas eu à entrer : le coup a été porté depuis la fenêtre']],
    ok: ['b'] },
  { id: 'arme', q: 'Arme / méthode :', opts: [
      ['a', 'Un sédatif versé dans le whisky'],
      ['b', 'Un coup unique à la tête avec la statuette en bronze, base essuyée ensuite'],
      ['c', 'Une chute accidentelle maquillée'],
      ['d', 'Un coup porté avec la bouteille de whisky']],
    ok: ['b'] },
  { id: 'mobile', q: 'Mobile :', opts: [
      ['a', 'Empêcher la vente du manoir familial'],
      ['b', 'Éviter d\'être écarté par la restructuration'],
      ['c', 'Étouffer un litige sur des factures de rénovation'],
      ['d', 'Armand avait découvert son conflit d\'intérêts : commission de 160 000 € annulée, avocat saisi, dette de 80 000 € exigible'],
      ['e', 'Empêcher la signature d\'un nouveau testament']],
    ok: ['d'] },
  { id: 'preuve1', q: 'Preuve décisive n°1 :', type: 'piece' },
  { id: 'preuve2', q: 'Preuve décisive n°2 :', type: 'piece' },
  { id: 'message', q: 'Comment expliquez-vous le message de 22 h 03 ?', opts: [
      ['a', 'Armand l\'a envoyé lui-même : il était encore vivant'],
      ['b', 'Julien se l\'est envoyé pour se fabriquer un alibi'],
      ['c', 'Le meurtrier l\'a envoyé avec le téléphone encore déverrouillé, pour faire croire qu\'Armand vivait encore et attirer Julien dans le bureau'],
      ['d', 'Un envoi différé programmé à l\'avance']],
    ok: ['c'] },
  { id: 'mensonge', q: 'Quel mensonge vous a paru le plus révélateur ?', opts: [
      ['a', 'Claire : « Je suis montée chercher un châle »'],
      ['b', 'Julien : « Je n\'ai pas mis les pieds dans son bureau »'],
      ['c', 'Thomas : « Je ne suis jamais passé derrière le manoir »'],
      ['d', 'Thomas : « J\'avais servi un whisky à Armand avant qu\'il quitte la salle à manger »'],
      ['e', 'Marc : « Élise m\'a retenu dans une conversation »']],
    ok: ['c', 'd'] },
];

// Preuves acceptées contre le coupable, regroupées par « famille »
// (deux preuves de la même famille ne se recoupent pas).
CASE.proofFamilies = {
  G02: 'gravier', JA: 'gravier', SC07: 'gravier',
  G03: 'page7', SC04: 'page7',
  F04: 'whisky',
  G05: 'fibre',
  G01: 'camera',
  G04: 'mobile',
};

CASE.solution = `
<h3>Reconstitution</h3>
<ol class="reco">
  <li><b>21 h 42</b> - Armand reçoit un appel et s'enferme dans son bureau. Il demande son whisky une fois là-bas : au dessert, il buvait encore du vin.</li>
  <li>Armand a découvert que Thomas est secrètement associé à l'acheteur. Il annote la page 7 du projet de vente à l'encre (« ANNULÉ - Thomas m'a caché... ») : d'où l'encre bleu-noir fraîche sur ses doigts. Avec la commission bloquée, le découvert de 46 280 €, le fisc dans 12 jours et une dette de 80 000 € exigible au 31 octobre, Thomas est acculé.</li>
  <li><b>21 h 49</b> - Thomas sort « fumer » par la porte principale, devant la caméra. <b>21 h 52</b> : il quitte le champ côté est, contourne le manoir et longe le chemin de <b>gravier blanc</b> du jardin arrière, sans caméra, jusqu'à la fenêtre basse du bureau, invisible depuis l'allée.</li>
  <li>Il entre par la fenêtre : la boue au gravier blanc reste sur le rebord intérieur. Thomas a manipulé le whisky d'Armand ; pour l'expliquer, il ment en disant l'avoir servi devant tout le monde. Le ton monte : vers 22 h, Élise entend son père parler fort, sans aucun appel sur son téléphone.</li>
  <li><b>22 h 02 min 47</b> - Thomas frappe Armand d'un seul coup avec la statuette en bronze. Le choc est enregistré sur l'appel de Sofia, à 14 m. La pendule, décrochée, s'arrête sur 22 h 03, avec 40 s d'avance. Il essuie la base, mais une fibre de son manteau en laine anthracite reste dessous.</li>
  <li><b>22 h 03 min 12</b> - Le téléphone d'Armand est encore déverrouillé : dernier déverrouillage à 21:58:32, verrouillage automatique à 22:03:32. Thomas écrit à Julien : « Il faut qu'on règle ça ce soir. Viens seul. » Armand semble ainsi en vie après le choc, et la personne qui viendrait au bureau deviendrait le suspect idéal. Il emporte la page 7 compromettante.</li>
  <li><b>22 h 03 min 41</b> - Il ressort par la fenêtre et revient par l'angle est : c'est la silhouette vue par Sofia et la caméra. <b>22 h 04 min 18</b> : il rentre par la porte principale et va se servir un verre au bar, ce qui explique d'avance ses empreintes sur la bouteille. La page 7 dort dans la poche intérieure de son manteau.</li>
</ol>
<h3>Les fausses pistes</h3>
<ul class="reco">
  <li><b>Claire</b> ment sur le châle. Elle appelait en fait un agent immobilier depuis l'étage, de 22 h 01 à 22 h 04, pendant le choc.</li>
  <li><b>Julien</b> cache une erreur comptable de 42 000 €, mais son ordinateur sauvegarde dans le hall à 22:02:31 et 22:04:10. Le message de 22 h 03 devait le désigner.</li>
  <li><b>Sofia</b> était en ligne, enregistrée sans interruption de 21:51:08 à 22:06:22. Son secret, une facture d'étude de sol en double, n'a rien à voir avec le meurtre.</li>
  <li><b>Élise</b> et <b>Marc</b> ont chacun une question gênante sur la succession, mais aucun élément matériel ne les relie au bureau, et le dossier rouge n'a jamais quitté le salon.</li>
</ul>`;
