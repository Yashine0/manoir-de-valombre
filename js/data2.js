// =====================================================================
//  DOSSIER 17 - contenu complémentaire : déductions, confrontation,
//  feuille de travail, épilogues, conseils.
// =====================================================================

// ---------------------------------------------------------------------
//  TABLEAU DE DÉDUCTIONS : relier deux pièces qui se recoupent
// ---------------------------------------------------------------------
CASE.deductions = [
  { id: 'd_heure', key: true, pairs: [['G06', 'G07'], ['G06', 'F02']], titre: 'Heure du coup : 22 h 02 min 47',
    text: "Le bruit sourd de 0,4 s sur l'appel de Sofia et la pendule arrêtée sur 22 h 03 (40 s d'avance) concordent. Le coup est porté à 22 h 02 min 47, dans la fenêtre de décès du légiste." },
  { id: 'd_message', key: true, pairs: [['F01', 'G06'], ['F01', 'G07']], titre: 'Le message de 22 h 03 est un leurre',
    text: "Le message à Julien part 25 secondes après le choc. Armand était déjà mort. Son téléphone, déverrouillé à 21:58:32, ne se verrouillait qu'à 22:03:32 : le meurtrier a eu une demi-minute pour écrire « Viens seul »." },
  { id: 'd_fenetre', key: true, pairs: [['SC07', 'JA'], ['SC07', 'A02']], titre: 'Entrée par la fenêtre du jardin',
    text: "La boue au gravier calcaire blanc sur le rebord intérieur vient du chemin du jardin arrière. Quelqu'un est passé par la fenêtre basse, à l'abri de toute caméra." },
  { id: 'd_thomas_jardin', key: true, pairs: [['G02', 'SC07'], ['G02', 'JA']], titre: 'Thomas est passé sous la fenêtre',
    text: "Les semelles de Thomas portent des micro-graviers clairs. L'allée est en gravier rouge brun : seul le chemin du jardin arrière est blanc. Thomas ment quand il dit n'être jamais passé derrière." },
  { id: 'd_camera', pairs: [['G01', 'A03'], ['G01', 'A02'], ['G01', 'JA']], titre: '12 minutes hors champ',
    text: "Thomas quitte le champ côté est à 21:52:03 et ne revient qu'à 22:04:18. Une silhouette réapparaît côté est à 22:03:41. Assez pour contourner le manoir jusqu'à une fenêtre invisible depuis l'allée." },
  { id: 'd_page7', key: true, pairs: [['G03', 'SC04']], titre: 'La page manquante',
    text: "La page 7 arrachée au dossier « VENTE - VALOMBRE » posé sur le bureau finit pliée dans la poche du manteau de Thomas. Elle a quitté le bureau en même temps que le meurtrier." },
  { id: 'd_mobile', key: true, pairs: [['G03', 'G04']], titre: 'Le mobile de Thomas',
    text: "Armand avait découvert que Thomas était associé à l'acheteur : commission de 160 000 € annulée, avocat saisi. Thomas, à découvert de 46 280 €, devait aussi rembourser 80 000 € au 31 octobre." },
  { id: 'd_encre', pairs: [['F02', 'G03']], titre: "L'encre sur les doigts d'Armand",
    text: "L'encre bleu-noir fraîche sur l'index et le pouce d'Armand correspond aux annotations manuscrites de la page 7. Il venait de l'écrire : la page était sur son bureau ce soir-là." },
  { id: 'd_whisky', pairs: [['F04', 'D01']], titre: 'Le mensonge du whisky',
    text: "Au dessert, Armand buvait encore du vin : il a demandé son whisky une fois au bureau. Les empreintes de Thomas sur la bouteille ne viennent pas d'un service « devant tout le monde »." },
  { id: 'd_fibre', pairs: [['G05', 'F03']], titre: "Une fibre sous l'arme",
    text: "La base de la statuette a été essuyée, mais une fibre de laine gris anthracite est restée dessous. Parmi les vêtements saisis, seul le manteau de Thomas est compatible." },
  { id: 'd_julien', pairs: [['CT02', 'G06'], ['CT02', 'G07']], titre: 'Julien est hors de cause',
    text: "Les sauvegardes de 22:02:31 et 22:04:10 encadrent le choc : Julien était devant son ordinateur, dans le hall. Le message de 22 h 03 visait à le faire venir dans le bureau." },
  { id: 'd_claire', pairs: [['CT01', 'G06'], ['CT01', 'G07']], titre: 'Claire est hors de cause',
    text: "Pendant le choc, Claire téléphonait depuis la borne Wi-Fi de l'étage (22:01 - 22:04). Elle a menti sur le châle, pas sur le meurtre." },
  { id: 'd_sofia', pairs: [['G06', 'E03'], ['G06', 'G01']], titre: 'Sofia est hors de cause',
    text: "L'appel de Sofia est enregistré sans interruption de 21:51:08 à 22:06:22, sur la terrasse. La silhouette qu'elle décrit est confirmée par la caméra à 22:03:41." },
];

// ---------------------------------------------------------------------
//  OÙ ÉTAIT CHACUN À 22:02:47 ? (feuille de travail, évaluée au verdict)
// ---------------------------------------------------------------------
CASE.places = ['Bureau', 'Hall', 'Étage', 'Terrasse', 'Salon / salle à manger', 'Jardin / extérieur', 'Inconnu'];
CASE.positions = {
  claire: ['Étage'], julien: ['Hall'], sofia: ['Terrasse'], thomas: ['Bureau'],
  elise: ['Salon / salle à manger', 'Inconnu'], marc: ['Salon / salle à manger', 'Inconnu'],
};

// ---------------------------------------------------------------------
//  CONFRONTATION FINALE (si Thomas est accusé)
// ---------------------------------------------------------------------
CASE.confrontation = [
  { claim: "Vous perdez votre temps. J'étais devant le manoir, à fumer. Demandez donc à votre caméra.",
    ok: ['G01'], win: "La caméra vous perd à 21 h 52 côté est... et ne vous revoit qu'à 22 h 04. Douze minutes, Thomas.",
    react: "[Il croise les bras.] Bon. J'ai fait quelques pas. Ce n'est pas un crime." },
  { claim: "Quelques pas, sur l'allée. Je ne me suis jamais approché de ce bureau, ni de ce jardin.",
    ok: ['G02', 'SC07', 'JA'], win: "Gravier calcaire blanc sous vos semelles. Le même que sur le chemin sous la fenêtre, et que dans la boue du rebord intérieur.",
    react: "[Il passe la main sur sa nuque.] Il y a du gravier blanc partout dans ce fichu domaine..." },
  { claim: "Et quand bien même ! Armand était vivant à 22 h 03 : il a écrit à Julien. Moi, j'étais presque rentré.",
    ok: ['G06', 'G07'], win: "Le choc est enregistré à 22 h 02 min 47. Le message part 25 secondes plus tard, sur un téléphone pas encore verrouillé. Ce n'est pas Armand qui l'a écrit.",
    react: "[Silence. Il fixe la table.] ...Vous ne pouvez pas savoir qui l'a écrit." },
  { claim: "Pourquoi j'aurais fait ça ? Armand était mon ami d'enfance. On n'avait aucun problème.",
    ok: ['G03', 'G04'], win: "Cette page 7 était dans la poche de votre manteau. « ANNULÉ ». Votre commission de 160 000 €, l'avocat, la dette de 80 000 €...",
    react: "[Sa voix se brise.] Il allait me détruire. Pour une société, une signature..." },
  { claim: "Une fibre, du gravier, un bout de papier... Rien de tout ça ne me met l'arme en main.",
    ok: ['G05', 'F04'], win: "Sous la statuette, une fibre de laine gris anthracite. La base a été essuyée, mais pas assez. Et vous avez menti sur le whisky que vous lui avez servi, seul à seul.",
    react: "" },
];
CASE.aveux = "[Long silence.] Il m'a montré la page. « ANNULÉ ». Il a dit qu'il appelait son avocat le lendemain, que j'étais fini. J'ai pris la statuette... Je ne voulais pas... Après, j'ai vu son téléphone allumé sur le bureau. J'ai pensé à Julien. J'ai écrit le message, j'ai pris la page, et je suis ressorti par la fenêtre.";
CASE.confrontLives = 3;

CASE.wrongCulprit = {
  claire: "Claire secoue la tête : « À 22 h 02, j'étais au téléphone à l'étage. Vérifiez la borne Wi-Fi. » L'avocat de la famille obtient sa libération dans la nuit.",
  julien: "Julien pose son ordinateur sur la table : « Sauvegardes à 22:02:31 et 22:04:10. J'étais dans le hall. » Le juge d'instruction refuse la mise en examen.",
  sofia: "L'enregistrement complet de l'appel de Sofia est versé au dossier : elle n'a jamais quitté la terrasse. La procédure s'effondre.",
  elise: "Élise fond en larmes. Aucun élément matériel ne la relie au bureau. Son avocat démonte le dossier en une audience.",
  marc: "Maître Vasseur sourit à peine : « Le dossier rouge n'a jamais quitté la table du salon. » Il connaît le droit mieux que vous.",
};

CASE.epilogue = {
  win: `<p>Thomas Renaud est mis en examen pour meurtre le 18 octobre 2026 à 16 h. La vente du domaine de Valombre est suspendue ; la société-écran qui le liait à l'acheteur fait l'objet d'une enquête distincte.</p>
        <p>Julien signale lui-même l'erreur comptable de 42 000 €. Sofia rembourse l'étude de sol facturée deux fois. Claire et Élise, pour la première fois depuis des années, repartent ensemble du manoir.</p>
        <p>Le nouveau testament ne sera jamais signé. La pendule du bureau, elle, est remise à l'heure.</p>`,
  partial: `<p>Thomas est placé en garde à vue, mais sans aveux, son avocat attaque chaque pièce une à une. Le dossier part à l'instruction, fragile.</p>
            <p>Il faudra des mois, et une expertise complémentaire de la fibre, pour que la vérité tienne devant une cour d'assises.</p>`,
  lose: `<p>Thomas Renaud quitte le manoir au petit matin, son manteau sur le bras. Personne ne pense à fouiller sa poche intérieure.</p>
         <p>Le Dossier 17 rejoint la pile des affaires non élucidées.</p>`,
};

// ---------------------------------------------------------------------
//  CONSEILS (tutoriel, affichés une seule fois)
// ---------------------------------------------------------------------
CASE.tips = {
  scene: "Les marqueurs jaunes indiquent ce qui peut être examiné. Chaque pièce trouvée rejoint votre dossier (touche 3).",
  interro: "Une phrase vous paraît douteuse ? Cliquez sur « Présenter une pièce » et choisissez la preuve qui la confirme ou la contredit. Attention : chaque présentation hors sujet entame votre crédibilité.",
  board: "Sélectionnez deux pièces qui se recoupent pour en tirer une déduction. Une mauvaise association coûte un peu de crédibilité.",
};
