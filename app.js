(() => {
  const DB_STORAGE_KEY = 'krav_notes_database_v1';
  const THEME_STORAGE_KEY = 'krav_notes_theme_v1';
  const LANGUAGE_STORAGE_KEY = 'krav_notes_language_v1';
  const HOVER_COMMENTS_STORAGE_KEY = 'krav_notes_hover_comments_v1';
  const MANUAL_ACTIONS_STORAGE_KEY = 'krav_manual_actions';
  const EXPERT_MODE_STORAGE_KEY = 'krav_expert_mode_v1';
  const DEFAULT_DB_FILENAME = 'krav-notes-db.json';
  const HANDLE_DB_NAME = 'self_defense_fs_db';
  const HANDLE_STORE_NAME = 'handles';
  const DB_HANDLE_KEY = 'krav_notes_db_file_handle';

  const defaultMembers = [
    { id: 'tete', label: 'Tête' },
    { id: 'menton', label: 'Menton' },
    { id: 'coude_droit', label: 'Coude droit' },
    { id: 'coude_gauche', label: 'Coude gauche' },
    { id: 'main_droite', label: 'Main droite' },
    { id: 'main_gauche', label: 'Main gauche' },
    { id: 'hanche_droite', label: 'Hanche droite' },
    { id: 'hanche_gauche', label: 'Hanche gauche' },
    { id: 'genou_droit', label: 'Genou droit' },
    { id: 'genou_gauche', label: 'Genou gauche' },
    { id: 'pied_droit', label: 'Pied droit' },
    { id: 'pied_gauche', label: 'Pied gauche' }
  ];

  const defaultActionSets = {
    tete:['Neutre','Regarder l\'adversaire','Rentrer la tête','Tourner à droite','Tourner à gauche','Esquive droite','Esquive gauche','Pencher en avant','Pencher en arrière','Casser l\'axe','Protection haute'],
    menton:['Neutre','Rentré','Descendu','Protégé derrière l\'épaule','Aligné pour frappe','Collé à la poitrine','Relevé brièvement','Masqué'],
    coude_droit:['Neutre','Collé au corps','Levé garde haute','Coude vers l\'avant','Coude vers l\'extérieur','Coude circulaire','Coup de coude avant','Coup de coude descendant','Coup de coude arrière','Blocage intérieur','Blocage extérieur','Contrôle bras adverse'],
    coude_gauche:['Neutre','Collé au corps','Levé garde haute','Coude vers l\'avant','Coude vers l\'extérieur','Coude circulaire','Coup de coude avant','Coup de coude descendant','Coup de coude arrière','Blocage intérieur','Blocage extérieur','Contrôle bras adverse'],
    main_droite:['Neutre','Garde visage','Paume ouverte','Poing fermé','Saisie poignet adverse','Saisie vêtement','Poussée paume','Parade intérieure','Parade extérieure','Dégagement','Frappe directe','Frappe marteau','Uppercut','Contrôle tête adverse','Contrôle cou','Protection bassin'],
    main_gauche:['Neutre','Garde visage','Paume ouverte','Poing fermé','Saisie poignet adverse','Saisie vêtement','Poussée paume','Parade intérieure','Parade extérieure','Dégagement','Frappe directe','Frappe marteau','Uppercut','Contrôle tête adverse','Contrôle cou','Protection bassin'],
    hanche_droite:['Neutre','Engagement vers l\'avant','Rotation interne','Rotation externe','Pivot droite','Pivot gauche','Abaissement centre de gravité','Projection du poids','Retrait','Ouverture d\'angle'],
    hanche_gauche:['Neutre','Engagement vers l\'avant','Rotation interne','Rotation externe','Pivot droite','Pivot gauche','Abaissement centre de gravité','Projection du poids','Retrait','Ouverture d\'angle'],
    genou_droit:['Neutre','Fléchi','Ancré','Montée de genou','Genou défensif','Genou vers cible','Appui avant','Appui arrière','Préparation balayage','Déplacement latéral'],
    genou_gauche:['Neutre','Fléchi','Ancré','Montée de genou','Genou défensif','Genou vers cible','Appui avant','Appui arrière','Préparation balayage','Déplacement latéral'],
    pied_droit:['Neutre','Ancré au sol','Pas avant','Pas arrière','Pas latéral droit','Pas diagonal','Pivot sur place','Recul de sécurité','Balayage','Coup de pied bas','Appui pointe','Ouverture d\'angle'],
    pied_gauche:['Neutre','Ancré au sol','Pas avant','Pas arrière','Pas latéral gauche','Pas diagonal','Pivot sur place','Recul de sécurité','Balayage','Coup de pied bas','Appui pointe','Ouverture d\'angle']
  };

  let members = JSON.parse(JSON.stringify(defaultMembers));
  let actionSets = JSON.parse(JSON.stringify(defaultActionSets));
  let dbFileHandle = null;
  let currentDbName = '';
  let techniquesByName = {};
  let currentLanguage = 'fr';
  let isFileDirty = false;
  let hoverCommentsEnabled = true;
  let manualActionsEnabled = true;
  let expertModeEnabled = false;
  let belts = ['Blanche', 'Jaune', 'Orange', 'Verte', 'Bleue', 'Marron', 'Noire'];
  let beltFilterValue = '';
  let pendingMerge = null;

  const TRANSLATIONS = {
    fr: {
      startup_title: 'Choisir une base JSON',
      startup_hint: 'Sélectionne le fichier JSON à utiliser pour charger et sauvegarder tes techniques, membres et actions.',
      startup_open: 'Ouvrir la base JSON',
      startup_continue: 'Continuer sans fichier',
      app_title: 'Krav Notes',
      app_subtitle: 'Notation de techniques de self-défense avec base JSON unique.',
      btn_open_db: 'Ouvrir la base JSON',
      btn_load_db_url: 'Charger depuis GitHub',
      btn_merge_db: 'Fusionner une base JSON',
      expert_mode: 'Mode expert',
      btn_save: 'Sauvegarder',
      btn_save_as: 'Sauvegarder sous',
      nav_techniques: 'Techniques',
      nav_actions: 'Gestion des actions',
      nav_members: 'Gestion des membres',
      nav_merge: 'Fusion JSON',
      nav_documentation: 'Documentation',
      nav_settings: 'Réglages',
      current_file: 'Fichier courant :',
      status: 'État :',
      merge_title: 'Fusion de base JSON',
      merge_hint: 'Importe une base JSON, vérifie les différences puis choisis quoi fusionner.',
      merge_warnings: 'Avertissements',
      merge_force_deps: "Autoriser l'ajout automatique des dépendances manquantes (membres/actions) lors de la fusion.",
      merge_members: 'Membres',
      merge_actions: 'Actions',
      merge_techniques: 'Techniques',
      btn_apply_merge: 'Appliquer la fusion',
      btn_cancel_merge: 'Annuler',
      technique: 'Technique',
      technique_procedure: 'Procédure technique',
      btn_new: 'Nouvelle',
      btn_save_browser: 'Sauvegarder (navigateur)',
      btn_delete: 'Supprimer',
      btn_export_json: 'Exporter JSON',
      btn_import_json: 'Importer JSON',
      general_info: 'Informations générales',
      title: 'Titre',
      initial_state: 'État initial',
      final_state: 'État final',
      attention_points: "Points d'attention",
      steps: 'Étapes',
      btn_add_step: 'Ajouter une étape',
      btn_duplicate_last: 'Dupliquer la dernière',
      btn_table_view: 'Vue Modification',
      btn_gantt_view: 'Vue Lecture',
      btn_mobile_steps: 'Vue mobile étapes',
      btn_mobile_gantt: 'Vue mobile gantt',
      hint_right_click: 'Clic droit sur une case pour afficher ou masquer le commentaire libre.',
      hover_comments_toggle: 'Commentaires au survol',
      manual_actions_toggle: 'Ajout action',
      belt: 'Ceinture',
      belt_filter: 'Filtre ceinture',
      belts_management: 'Gestion des ceintures',
      ph_new_belt: 'Ex: Jaune',
      actions_management: 'Gestion des actions',
      member_concerned: 'Membre concerné',
      new_action: 'Nouvelle action',
      btn_add: 'Ajouter',
      btn_rename: 'Renommer',
      member_actions: 'Actions du membre',
      btn_export_config: 'Exporter config JSON',
      btn_import_config: 'Importer config JSON',
      action_library: "Bibliothèque d’actions",
      members_management: 'Gestion des membres',
      member: 'Membre',
      new_member: 'Nouveau membre',
      members_list: 'Liste des membres',
      settings: 'Réglages',
      language: 'Langue',
      theme: 'Thème',
      theme_light: 'Clair',
      theme_dark: 'Sombre',
      settings_hint: 'Le fichier JSON unique contient les techniques, les membres, les actions et la configuration.',
      full_database: 'Base JSON complète',
      documentation: 'Documentation',
      documentation_body:
        '<h3>Principe général</h3>' +
        '<p>L\'application fonctionne avec une base JSON unique (fichier) et un mode local navigateur.</p>' +
        '<h3>Utilisation sur smartphone hors-ligne (sans réseau)</h3>' +
        '<p>Sur Android, ouvrir <em>index.html</em> depuis Google Drive (aperçu) ne charge souvent pas <em>styles.css</em> / <em>app.js</em> et les boutons ne fonctionnent pas.</p>' +
        '<p>Pour un usage hors-ligne fiable, ouvre le dossier via un <strong>serveur HTTP local sur le téléphone</strong> (ex: une appli "Simple HTTP Server" / "Web Server") ou un éditeur (ex: Acode/Spck) qui fournit une URL <code>http://localhost</code>. Ensuite, ouvre cette URL dans Chrome.</p>' +
        '<h3>Ouverture / sauvegarde de la base</h3>' +
        '<p><strong>Ouvrir la base JSON</strong> : sélectionne un fichier .json (File System Access API si dispo). La base devient le fichier courant.</p>' +
        '<p><strong>Sauvegarder</strong> : écrit toutes les données (techniques, membres, actions, réglages) dans le fichier courant. Le bouton devient rouge lorsqu\'il existe des modifications non enregistrées.</p>' +
        '<p><strong>Sauvegarder sous</strong> : enregistre dans un nouveau fichier (ou télécharge si l\'API n\'est pas dispo).</p>' +
        '<h3>Page Techniques</h3>' +
        '<p><strong>Nouvelle</strong> : démarre une technique vide (ne remplace pas une technique existante).</p>' +
        '<p><strong>Sauvegarder (navigateur)</strong> : enregistre uniquement la technique courante dans le stockage navigateur (utile pour travailler sans toucher au fichier complet).</p>' +
        '<p><strong>Supprimer</strong> : supprime la technique sélectionnée du stockage navigateur.</p>' +
        '<p><strong>Exporter JSON</strong> : exporte la technique courante en fichier .json.</p>' +
        '<p><strong>Importer JSON</strong> : importe une technique depuis un fichier .json dans l\'éditeur.</p>' +
        '<h3>Étapes / tableau</h3>' +
        '<p><strong>Ajouter une étape</strong> : ajoute une ligne.</p>' +
        '<p><strong>Dupliquer la dernière</strong> : duplique la dernière ligne.</p>' +
        '<p><strong>Vue Modification / Vue Lecture</strong> : change l\'affichage. En mobile, utilise les boutons dédiés.</p>' +
        '<p><strong>Commentaires au survol</strong> : active/désactive l\'affichage automatique des commentaires libres au survol.</p>' +
        '<p><strong>Clic droit</strong> sur une case : affiche/masque le commentaire inline.</p>' +
        '<h3>Gestion des actions</h3>' +
        '<p>Permet d\'ajouter / renommer des actions disponibles pour chaque membre (membres = parties du corps).</p>' +
        '<h3>Gestion des membres</h3>' +
        '<p>Permet de créer / renommer / supprimer des membres. Les actions sont organisées par membre.</p>' +
        '<h3>Réglages</h3>' +
        '<p><strong>Langue</strong> : change l\'interface (FR/EN/DE).</p>' +
        '<p><strong>Thème</strong> : clair / sombre.</p>' +
        '<p><em>Note :</em> pense à sauvegarder la base (bouton en haut) pour enregistrer tes changements dans le fichier JSON.</p>',
      show: 'Afficher',
      collapse: 'Replier',
      ph_title: 'Défense sur saisie poignet + contre',
      ph_initial_state: 'Position de départ, distance, saisie...',
      ph_final_state: 'Position finale, contrôle, fuite...',
      ph_attention_points: 'Sécurité, angle, respiration...',
      ph_new_action: 'Contrôle poignet bas',
      ph_new_member: 'Avant-bras droit'
    },
    en: {
      startup_title: 'Choose a JSON database',
      startup_hint: 'Select the JSON file to load and save your techniques, members and actions.',
      startup_open: 'Open JSON database',
      startup_continue: 'Continue without file',
      app_title: 'Krav Notes',
      app_subtitle: 'Self-defense technique notes with a single JSON database.',
      btn_open_db: 'Open JSON database',
      btn_load_db_url: 'Load from URL',
      btn_merge_db: 'Merge JSON database',
      expert_mode: 'Expert mode',
      btn_save: 'Save',
      btn_save_as: 'Save as',
      nav_techniques: 'Techniques',
      nav_actions: 'Action management',
      nav_members: 'Member management',
      nav_merge: 'JSON merge',
      nav_documentation: 'Documentation',
      nav_settings: 'Settings',
      current_file: 'Current file:',
      status: 'Status:',
      merge_title: 'JSON database merge',
      merge_hint: 'Import a JSON database, review differences, then choose what to merge.',
      merge_warnings: 'Warnings',
      merge_force_deps: 'Allow automatic addition of missing dependencies (members/actions) during merge.',
      merge_members: 'Members',
      merge_actions: 'Actions',
      merge_techniques: 'Techniques',
      btn_apply_merge: 'Apply merge',
      btn_cancel_merge: 'Cancel',
      technique: 'Technique',
      technique_procedure: 'Technique procedure',
      btn_new: 'New',
      btn_save_browser: 'Save (browser)',
      btn_delete: 'Delete',
      btn_export_json: 'Export JSON',
      btn_import_json: 'Import JSON',
      general_info: 'General information',
      title: 'Title',
      initial_state: 'Initial state',
      final_state: 'Final state',
      attention_points: 'Attention points',
      steps: 'Steps',
      btn_add_step: 'Add a step',
      btn_duplicate_last: 'Duplicate last',
      btn_table_view: 'Edit view',
      btn_gantt_view: 'Read view',
      btn_mobile_steps: 'Mobile steps view',
      btn_mobile_gantt: 'Mobile gantt view',
      hint_right_click: 'Right click a cell to show/hide the inline comment.',
      hover_comments_toggle: 'Comments on hover',
      manual_actions_toggle: 'Add action',
      belt: 'Belt',
      belt_filter: 'Belt filter',
      belts_management: 'Belts management',
      ph_new_belt: 'Ex: Yellow',
      actions_management: 'Action management',
      member_concerned: 'Target member',
      new_action: 'New action',
      btn_add: 'Add',
      btn_rename: 'Rename',
      member_actions: 'Member actions',
      btn_export_config: 'Export config JSON',
      btn_import_config: 'Import config JSON',
      action_library: 'Action library',
      members_management: 'Member management',
      member: 'Member',
      new_member: 'New member',
      members_list: 'Members list',
      settings: 'Settings',
      language: 'Language',
      theme: 'Theme',
      theme_light: 'Light',
      theme_dark: 'Dark',
      settings_hint: 'The single JSON file contains techniques, members, actions and configuration.',
      full_database: 'Full JSON database',
      documentation: 'Documentation',
      documentation_body:
        '<h3>General idea</h3>' +
        '<p>The app works with a single JSON database file and a local browser mode.</p>' +
        '<h3>Offline use on a phone (no network)</h3>' +
        '<p>On Android, opening <em>index.html</em> from Google Drive preview often fails to load <em>styles.css</em> / <em>app.js</em>, so buttons do not work.</p>' +
        '<p>For reliable offline usage, open the folder through a <strong>local HTTP server on the phone</strong> (e.g. a "Simple HTTP Server" / "Web Server" app) or an editor (e.g. Acode/Spck) that provides a <code>http://localhost</code> URL. Then open that URL in Chrome.</p>' +
        '<h3>Open / save the database</h3>' +
        '<p><strong>Open JSON database</strong>: pick a .json file (File System Access API when available). It becomes the current file.</p>' +
        '<p><strong>Save</strong>: writes all data (techniques, members, actions, settings) to the current file. The button turns red when there are unsaved changes.</p>' +
        '<p><strong>Save as</strong>: saves to a new file (or downloads if the API is not available).</p>' +
        '<h3>Techniques page</h3>' +
        '<p><strong>New</strong>: starts an empty technique (does not overwrite an existing one).</p>' +
        '<p><strong>Save (browser)</strong>: saves only the current technique to browser storage (useful to work without rewriting the full file).</p>' +
        '<p><strong>Delete</strong>: deletes the selected technique from browser storage.</p>' +
        '<p><strong>Export JSON</strong>: exports the current technique to a .json file.</p>' +
        '<p><strong>Import JSON</strong>: imports a technique from a .json file into the editor.</p>' +
        '<h3>Steps / table</h3>' +
        '<p><strong>Add a step</strong>: adds a row.</p>' +
        '<p><strong>Duplicate last</strong>: duplicates the last row.</p>' +
        '<p><strong>Edit view / Read view</strong>: switches the display. On mobile, use the dedicated buttons.</p>' +
        '<p><strong>Comments on hover</strong>: enables/disables automatic display of free comments on hover.</p>' +
        '<p><strong>Right click</strong> on a cell: shows/hides the inline comment.</p>' +
        '<h3>Action management</h3>' +
        '<p>Add / rename actions available for each member (members = body parts).</p>' +
        '<h3>Member management</h3>' +
        '<p>Create / rename / delete members. Actions are organized per member.</p>' +
        '<h3>Settings</h3>' +
        '<p><strong>Language</strong>: switches UI language (FR/EN/DE).</p>' +
        '<p><strong>Theme</strong>: light / dark.</p>' +
        '<p><em>Note:</em> remember to save the database (top button) to persist changes to the JSON file.</p>',
      show: 'Show',
      collapse: 'Collapse',
      ph_title: 'Defense against wrist grab + counter',
      ph_initial_state: 'Starting position, distance, grab...',
      ph_final_state: 'Final position, control, escape...',
      ph_attention_points: 'Safety, angle, breathing...',
      ph_new_action: 'Low wrist control',
      ph_new_member: 'Right forearm'
    },
    de: {
      startup_title: 'JSON-Datenbank auswählen',
      startup_hint: 'Wähle die JSON-Datei, um Techniken, Mitglieder und Aktionen zu laden und zu speichern.',
      startup_open: 'JSON-Datenbank öffnen',
      startup_continue: 'Ohne Datei fortfahren',
      app_title: 'Krav Notes',
      app_subtitle: 'Notizen zu Selbstverteidigungstechniken mit einer einzigen JSON-Datenbank.',
      btn_open_db: 'JSON-Datenbank öffnen',
      btn_load_db_url: 'Von URL laden',
      btn_merge_db: 'JSON-Datenbank zusammenführen',
      expert_mode: 'Expertenmodus',
      btn_save: 'Speichern',
      btn_save_as: 'Speichern unter',
      nav_techniques: 'Techniken',
      nav_actions: 'Aktionsverwaltung',
      nav_members: 'Mitgliederverwaltung',
      nav_merge: 'JSON-Zusammenführung',
      nav_documentation: 'Dokumentation',
      nav_settings: 'Einstellungen',
      current_file: 'Aktuelle Datei:',
      status: 'Status:',
      merge_title: 'JSON-Datenbank zusammenführen',
      merge_hint: 'Importiere eine JSON-Datenbank, prüfe die Unterschiede und wähle aus, was zusammengeführt werden soll.',
      merge_warnings: 'Warnungen',
      merge_force_deps: 'Automatisches Hinzufügen fehlender Abhängigkeiten (Mitglieder/Aktionen) bei der Zusammenführung erlauben.',
      merge_members: 'Mitglieder',
      merge_actions: 'Aktionen',
      merge_techniques: 'Techniken',
      btn_apply_merge: 'Zusammenführung anwenden',
      btn_cancel_merge: 'Abbrechen',
      technique: 'Technik',
      technique_procedure: 'Technikablauf',
      btn_new: 'Neu',
      btn_save_browser: 'Speichern (Browser)',
      btn_delete: 'Löschen',
      btn_export_json: 'JSON exportieren',
      btn_import_json: 'JSON importieren',
      general_info: 'Allgemeine Informationen',
      title: 'Titel',
      initial_state: 'Ausgangslage',
      final_state: 'Endlage',
      attention_points: 'Wichtige Hinweise',
      steps: 'Schritte',
      btn_add_step: 'Schritt hinzufügen',
      btn_duplicate_last: 'Letzten duplizieren',
      btn_table_view: 'Bearbeitungsansicht',
      btn_gantt_view: 'Leseansicht',
      btn_mobile_steps: 'Mobile Schrittansicht',
      btn_mobile_gantt: 'Mobile Gantt-Ansicht',
      hint_right_click: 'Rechtsklick auf eine Zelle, um den Kommentar ein-/auszublenden.',
      hover_comments_toggle: 'Kommentare beim Überfahren',
      manual_actions_toggle: 'Aktion hinzufügen',
      belt: 'Gürtel',
      belt_filter: 'Gürtel-Filter',
      belts_management: 'Gürtelverwaltung',
      ph_new_belt: 'Bsp: Gelb',
      actions_management: 'Aktionsverwaltung',
      member_concerned: 'Betroffenes Mitglied',
      new_action: 'Neue Aktion',
      btn_add: 'Hinzufügen',
      btn_rename: 'Umbenennen',
      member_actions: 'Aktionen des Mitglieds',
      btn_export_config: 'Konfig-JSON exportieren',
      btn_import_config: 'Konfig-JSON importieren',
      action_library: 'Aktionsbibliothek',
      members_management: 'Mitgliederverwaltung',
      member: 'Mitglied',
      new_member: 'Neues Mitglied',
      members_list: 'Mitgliederliste',
      settings: 'Einstellungen',
      language: 'Sprache',
      theme: 'Design',
      theme_light: 'Hell',
      theme_dark: 'Dunkel',
      settings_hint: 'Die einzelne JSON-Datei enthält Techniken, Mitglieder, Aktionen und Konfiguration.',
      full_database: 'Vollständige JSON-Datenbank',
      documentation: 'Dokumentation',
      documentation_body:
        '<h3>Grundprinzip</h3>' +
        '<p>Die App arbeitet mit einer einzigen JSON-Datenbankdatei sowie einem lokalen Browser-Modus.</p>' +
        '<h3>Offline-Nutzung am Smartphone (ohne Netzwerk)</h3>' +
        '<p>Auf Android lädt das Öffnen von <em>index.html</em> in der Google-Drive-Vorschau oft <em>styles.css</em> / <em>app.js</em> nicht, dadurch funktionieren Buttons nicht.</p>' +
        '<p>Für eine zuverlässige Offline-Nutzung öffne den Ordner über einen <strong>lokalen HTTP-Server auf dem Smartphone</strong> (z.B. App "Simple HTTP Server" / "Web Server") oder über einen Editor (z.B. Acode/Spck), der eine <code>http://localhost</code>-URL bereitstellt. Öffne danach diese URL in Chrome.</p>' +
        '<h3>Datenbank öffnen / speichern</h3>' +
        '<p><strong>JSON-Datenbank öffnen</strong>: wähle eine .json-Datei (File System Access API, falls verfügbar). Sie wird zur aktuellen Datei.</p>' +
        '<p><strong>Speichern</strong>: schreibt alle Daten (Techniken, Mitglieder, Aktionen, Einstellungen) in die aktuelle Datei. Der Button wird rot, wenn Änderungen noch nicht gespeichert sind.</p>' +
        '<p><strong>Speichern unter</strong>: speichert in eine neue Datei (oder lädt herunter, falls die API nicht verfügbar ist).</p>' +
        '<h3>Seite Techniken</h3>' +
        '<p><strong>Neu</strong>: startet eine leere Technik (überschreibt keine bestehende).</p>' +
        '<p><strong>Speichern (Browser)</strong>: speichert nur die aktuelle Technik im Browser-Speicher (praktisch ohne die ganze Datei zu schreiben).</p>' +
        '<p><strong>Löschen</strong>: löscht die ausgewählte Technik aus dem Browser-Speicher.</p>' +
        '<p><strong>JSON exportieren</strong>: exportiert die aktuelle Technik als .json.</p>' +
        '<p><strong>JSON importieren</strong>: importiert eine Technik aus einer .json-Datei in den Editor.</p>' +
        '<h3>Schritte / Tabelle</h3>' +
        '<p><strong>Schritt hinzufügen</strong>: fügt eine Zeile hinzu.</p>' +
        '<p><strong>Letzten duplizieren</strong>: dupliziert die letzte Zeile.</p>' +
        '<p><strong>Bearbeitungsansicht / Leseansicht</strong>: wechselt die Darstellung. Auf Mobilgeräten die eigenen Buttons nutzen.</p>' +
        '<p><strong>Kommentare beim Überfahren</strong>: aktiviert/deaktiviert die automatische Anzeige der freien Kommentare beim Überfahren.</p>' +
        '<p><strong>Rechtsklick</strong> auf eine Zelle: zeigt/versteckt den Inline-Kommentar.</p>' +
        '<h3>Aktionsverwaltung</h3>' +
        '<p>Aktionen pro Mitglied (Mitglieder = Körperteile) hinzufügen / umbenennen.</p>' +
        '<h3>Mitgliederverwaltung</h3>' +
        '<p>Mitglieder erstellen / umbenennen / löschen. Aktionen sind pro Mitglied organisiert.</p>' +
        '<h3>Einstellungen</h3>' +
        '<p><strong>Sprache</strong>: UI-Sprache wechseln (FR/EN/DE).</p>' +
        '<p><strong>Design</strong>: hell / dunkel.</p>' +
        '<p><em>Hinweis:</em> Denk daran, die Datenbank (oben) zu speichern, um Änderungen in der JSON-Datei zu sichern.</p>',
      show: 'Anzeigen',
      collapse: 'Einklappen',
      ph_title: 'Verteidigung gegen Handgelenkgriff + Konter',
      ph_initial_state: 'Startposition, Distanz, Griff...',
      ph_final_state: 'Endposition, Kontrolle, Flucht...',
      ph_attention_points: 'Sicherheit, Winkel, Atmung...',
      ph_new_action: 'Handgelenk-Kontrolle unten',
      ph_new_member: 'Rechter Unterarm'
    }
  };

  const ID_MAP = {
    techniquePage: 'techniquesPage',
    stepsBody: 'stepsTableBody',
    mainTableHeaderRow: 'techniqueTableHeader',
    storageInfo: 'statusLabel',
    actionsInfo: 'statusLabel',
    membersInfo: 'statusLabel',
    importJsonFile: 'importTechniqueFile',
    importActionsFile: 'importConfigFile',
    title: 'titleInput',
    initialState: 'initialStateInput',
    finalState: 'finalStateInput',
    attentionPoints: 'attentionPointsInput',
    techniqueName: 'techniqueSelect',
    actionPartSelect: 'actionMemberSelect',
    existingActionSelect: 'actionSelect',
    mergeDatabaseFile: 'mergeDatabaseFile'
  };

  const $ = id => document.getElementById(ID_MAP[id] || id);
  const techniquePage = $('techniquePage');
  const actionsPage = $('actionsPage');
  const stepsBody = $('stepsBody');
  const mainTableHeaderRow = $('mainTableHeaderRow');
  const printSheet = $('printSheet');
  const storageInfo = $('storageInfo');
  const actionsInfo = $('actionsInfo');
  const membersInfo = $('membersInfo');
  const importJsonFile = $('importJsonFile');
  const importActionsFile = $('importActionsFile');
  const tableWrap = $('tableWrap');
  const ganttWrap = $('ganttWrap');
  const ganttGrid = $('ganttGrid');
  const mobileStepsWrap = $('mobileStepsWrap');
  const mobileGanttWrap = $('mobileGanttWrap');
  const actionListBody = $('actionListBody') || $('actionLibraryContainer');
  const memberListBody = $('memberListBody');
  const memberListCard = $('memberListCard');
  const memberListHeader = $('memberListHeader');
  const memberListIndicator = $('memberListIndicator');

  const orderedParts = () => members.map(m => m.id);
  const safeJsonParse = (text, fallback) => { try { return JSON.parse(text); } catch { return fallback; } };
  const slugify = text => String(text || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'');
  const memberLabelById = id => (members.find(x => x.id === id) || { label: id }).label;
  const setStorageInfo = (msg, err) => {
    if (!storageInfo) return;
    storageInfo.textContent = msg;
    storageInfo.style.color = err ? '#dc2626' : '#6b7280';
  };
  const setActionsInfo = (msg, err) => {
    if (!actionsInfo) return;
    actionsInfo.textContent = msg;
    actionsInfo.style.color = err ? '#dc2626' : '#6b7280';
  };
  const setMembersInfo = (msg, err) => {
    if (!membersInfo) return;
    membersInfo.textContent = msg;
    membersInfo.style.color = err ? '#dc2626' : '#6b7280';
  };
  const createEmptyComments = () => Object.fromEntries(orderedParts().map(part => [part, '']));
  const escapeHtml = value => String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;').replace(/\n/g,'<br>');

  function openHandleDb() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(HANDLE_DB_NAME, 1);
      request.onupgradeneeded = function () {
        const db = request.result;
        if (!db.objectStoreNames.contains(HANDLE_STORE_NAME)) db.createObjectStore(HANDLE_STORE_NAME);
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function saveDbFileHandle(handle) {
    try {
      const db = await openHandleDb();
      await new Promise((resolve, reject) => {
        const tx = db.transaction(HANDLE_STORE_NAME, 'readwrite');
        tx.objectStore(HANDLE_STORE_NAME).put(handle, DB_HANDLE_KEY);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
      db.close();
    } catch (error) {
      console.error(error);
    }
  }

  async function loadDbFileHandle() {
    try {
      const db = await openHandleDb();
      const handle = await new Promise((resolve, reject) => {
        const tx = db.transaction(HANDLE_STORE_NAME, 'readonly');
        const request = tx.objectStore(HANDLE_STORE_NAME).get(DB_HANDLE_KEY);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      });
      db.close();
      return handle;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  function buildDatabaseObject() {
    return {
      version: 1,
      exportedAt: new Date().toISOString(),
      members,
      actionSets,
      techniques: techniquesByName,
      settings: {
        theme: document.documentElement.getAttribute('data-theme') || 'light',
        language: currentLanguage,
        hoverComments: hoverCommentsEnabled,
        manualActions: manualActionsEnabled,
        expertMode: expertModeEnabled,
        belts
      }
    };
  }

  function applyDatabaseObject(db) {
    const safe = db && typeof db === 'object' ? db : {};

    if (Array.isArray(safe.members) && safe.members.length) {
      members = safe.members.map(m => ({ id: m.id, label: m.label }));
    } else {
      members = JSON.parse(JSON.stringify(defaultMembers));
    }

    const incomingActionSets = safe.actionSets && typeof safe.actionSets === 'object' ? safe.actionSets : null;
    actionSets = {};
    members.forEach(m => { actionSets[m.id] = Array.isArray(defaultActionSets[m.id]) ? [...defaultActionSets[m.id]] : ['Neutre']; });
    if (incomingActionSets) {
      Object.keys(incomingActionSets).forEach(part => {
        if (!actionSets[part]) actionSets[part] = ['Neutre'];
        const items = Array.isArray(incomingActionSets[part]) ? incomingActionSets[part] : [];
        items.forEach(item => {
          const normalized = String(item || '').trim();
          if (normalized && !actionSets[part].includes(normalized)) actionSets[part].push(normalized);
        });
        if (!actionSets[part].includes('Neutre')) actionSets[part].unshift('Neutre');
      });
    }

    techniquesByName = safe.techniques && typeof safe.techniques === 'object' ? safe.techniques : {};

    if (safe.settings && safe.settings.theme) applyTheme(safe.settings.theme);
    if (safe.settings && safe.settings.language) applyLanguage(safe.settings.language);
    if (safe.settings && typeof safe.settings.hoverComments === 'boolean') applyHoverComments(safe.settings.hoverComments);
    if (safe.settings && typeof safe.settings.manualActions === 'boolean') applyManualActions(safe.settings.manualActions);
    if (safe.settings && typeof safe.settings.expertMode === 'boolean') applyExpertMode(safe.settings.expertMode);
    if (safe.settings && Array.isArray(safe.settings.belts)) applyBelts(safe.settings.belts);

    try {
      localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(buildDatabaseObject()));
    } catch {
      /* ignore */
    }

    setFileDirty(false);
  }

  async function persistMembers() {
    persistDatabaseLocalFallback();
    if (dbFileHandle) {
      try { await writeDatabaseToHandle(dbFileHandle); } catch (error) { console.error(error); }
    }
  }

  async function persistCustomActionSets() {
    persistDatabaseLocalFallback();
    if (dbFileHandle) {
      try { await writeDatabaseToHandle(dbFileHandle); } catch (error) { console.error(error); }
    }
  }

  function getCurrentFileLabelEl() { return document.getElementById('currentFileLabel'); }
  function setCurrentFileLabel(text) {
    const el = getCurrentFileLabelEl();
    if (el) el.textContent = text || 'Aucun fichier sélectionné';
  }

  function updateDatabasePreview() {
    const pre = document.getElementById('databasePreview');
    if (!pre) return;
    try {
      pre.textContent = JSON.stringify(buildDatabaseObject(), null, 2);
    } catch {
      pre.textContent = '';
    }
  }

  function persistDatabaseLocalFallback() {
    try { localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(buildDatabaseObject())); } catch { /* ignore */ }
  }

  function applyHoverComments(enabled) {
    hoverCommentsEnabled = !!enabled;
    const toggle = document.getElementById('hoverCommentsToggle');
    if (toggle) toggle.checked = hoverCommentsEnabled;
    document.body.classList.toggle('no-hover-comments', !hoverCommentsEnabled);
    try { localStorage.setItem(HOVER_COMMENTS_STORAGE_KEY, hoverCommentsEnabled ? '1' : '0'); } catch { /* ignore */ }
    updateDatabasePreview();
  }

  function applyManualActions(enabled) {
    manualActionsEnabled = !!enabled;
    const toggle = document.getElementById('manualActionsToggle');
    if (toggle) toggle.checked = manualActionsEnabled;
    document.body.classList.toggle('no-manual-actions', !manualActionsEnabled);
    try { localStorage.setItem(MANUAL_ACTIONS_STORAGE_KEY, manualActionsEnabled ? '1' : '0'); } catch { /* ignore */ }
    updateDatabasePreview();
  }

  function applyExpertMode(enabled) {
    expertModeEnabled = !!enabled;
    const toggle = document.getElementById('expertModeToggle');
    if (toggle) toggle.checked = expertModeEnabled;
    document.body.classList.toggle('expert-mode', expertModeEnabled);
    try { localStorage.setItem(EXPERT_MODE_STORAGE_KEY, expertModeEnabled ? '1' : '0'); } catch { /* ignore */ }
    updateDatabasePreview();
  }

  function normalizeBeltsList(next) {
    const raw = Array.isArray(next) ? next : [];
    const out = [];
    raw.forEach(item => {
      const label = String(item || '').trim();
      if (!label) return;
      if (out.some(x => x.toLowerCase() === label.toLowerCase())) return;
      out.push(label);
    });
    return out.length ? out : ['Blanche'];
  }

  function applyBelts(nextBelts) {
    belts = normalizeBeltsList(nextBelts);
    renderBeltsList();
    renderBeltSelects();
    updateDatabasePreview();
  }

  function renderBeltsList() {
    const list = document.getElementById('beltsList');
    if (!list) return;
    list.innerHTML = belts.map((b, idx) => {
      return `<div class="simple-item"><span>${escapeHtml(b)}</span><div class="toolbar-row compact-gap"><button class="compact-btn secondary" type="button" data-belt-up="${idx}">Monter</button><button class="compact-btn secondary" type="button" data-belt-down="${idx}">Descendre</button><button class="compact-btn danger" type="button" data-belt-delete="${idx}">Supprimer</button></div></div>`;
    }).join('');

    const persist = async () => {
      persistDatabaseLocalFallback();
      if (dbFileHandle) {
        try { await writeDatabaseToHandle(dbFileHandle); } catch (error) { console.error(error); }
      }
      markFileDirty();
    };

    Array.from(list.querySelectorAll('[data-belt-up]')).forEach(btn => btn.addEventListener('click', async () => {
      const i = Number(btn.getAttribute('data-belt-up'));
      if (!Number.isFinite(i) || i <= 0) return;
      const next = [...belts];
      const tmp = next[i - 1];
      next[i - 1] = next[i];
      next[i] = tmp;
      applyBelts(next);
      await persist();
    }));

    Array.from(list.querySelectorAll('[data-belt-down]')).forEach(btn => btn.addEventListener('click', async () => {
      const i = Number(btn.getAttribute('data-belt-down'));
      if (!Number.isFinite(i) || i >= belts.length - 1) return;
      const next = [...belts];
      const tmp = next[i + 1];
      next[i + 1] = next[i];
      next[i] = tmp;
      applyBelts(next);
      await persist();
    }));

    Array.from(list.querySelectorAll('[data-belt-delete]')).forEach(btn => btn.addEventListener('click', async () => {
      const i = Number(btn.getAttribute('data-belt-delete'));
      const next = belts.filter((_, index) => index !== i);
      applyBelts(next);
      await persist();
    }));
  }

  function renderBeltSelects() {
    const beltSelect = document.getElementById('beltSelect');
    if (beltSelect) {
      const current = beltSelect.value;
      beltSelect.innerHTML = '<option value="">--</option>' + belts.map(b => `<option value="${escapeHtml(b)}">${escapeHtml(b)}</option>`).join('');
      beltSelect.value = current;
    }
    const filterSelect = document.getElementById('beltFilterSelect');
    if (filterSelect) {
      const current = filterSelect.value;
      filterSelect.innerHTML = '<option value="">Tous</option>' + belts.map(b => `<option value="${escapeHtml(b)}">${escapeHtml(b)}</option>`).join('');
      filterSelect.value = current;
    }
  }

  function loadHoverComments() {
    const stored = (() => {
      try { return localStorage.getItem(HOVER_COMMENTS_STORAGE_KEY); } catch { return null; }
    })();
    if (stored === null) {
      applyHoverComments(true);
      return;
    }
    applyHoverComments(stored === '1');
  }

  function loadManualActions() {
    const stored = (() => {
      try { return localStorage.getItem(MANUAL_ACTIONS_STORAGE_KEY); } catch { return null; }
    })();
    if (stored === null) {
      applyManualActions(true);
      return;
    }
    applyManualActions(stored === '1');
  }

  function loadExpertMode() {
    const stored = (() => {
      try { return localStorage.getItem(EXPERT_MODE_STORAGE_KEY); } catch { return null; }
    })();
    if (stored === null) {
      applyExpertMode(false);
      return;
    }
    applyExpertMode(stored === '1');
  }

  function setFileDirty(next) {
    isFileDirty = !!next;
    const btn = $('saveDatabaseBtn');
    if (!btn) return;
    btn.classList.toggle('is-dirty', isFileDirty);
  }

  function markFileDirty() {
    if (!isFileDirty) setFileDirty(true);
  }

  function translate(key) {
    const dict = TRANSLATIONS[currentLanguage] || TRANSLATIONS.fr;
    return dict[key] || (TRANSLATIONS.fr[key] || key);
  }

  function applyTranslationsToDom() {
    Array.from(document.querySelectorAll('[data-i18n]')).forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      el.textContent = translate(key);
    });

    Array.from(document.querySelectorAll('[data-i18n-html]')).forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (!key) return;
      el.innerHTML = translate(key);
    });

    Array.from(document.querySelectorAll('[data-i18n-placeholder]')).forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (!key) return;
      el.setAttribute('placeholder', translate(key));
    });
  }

  function refreshCollapseIndicators() {
    Array.from(document.querySelectorAll('.collapse-indicator')).forEach(indicator => {
      const parent = indicator.closest('.collapsible-card, .action-list-card');
      const collapsed = parent ? parent.classList.contains('collapsed') : false;
      indicator.textContent = collapsed ? translate('show') : translate('collapse');
    });
  }

  function applyLanguage(lang) {
    const normalized = (lang === 'en' || lang === 'de') ? lang : 'fr';
    currentLanguage = normalized;
    const select = document.getElementById('languageSelect');
    if (select) select.value = normalized;
    try { localStorage.setItem(LANGUAGE_STORAGE_KEY, normalized); } catch { /* ignore */ }
    applyTranslationsToDom();
    refreshCollapseIndicators();
    updateDatabasePreview();
  }

  function loadLanguage() {
    const stored = (() => {
      try { return localStorage.getItem(LANGUAGE_STORAGE_KEY); } catch { return null; }
    })();
    applyLanguage(stored || 'fr');
  }

  function readDatabaseLocalFallback() {
    return safeJsonParse(localStorage.getItem(DB_STORAGE_KEY) || '', null);
  }

  async function readDatabaseFromHandle(handle) {
    const file = await handle.getFile();
    const parsed = safeJsonParse(await file.text(), null);
    if (!parsed) throw new Error('invalid_json');
    return parsed;
  }

  async function writeDatabaseToHandle(handle) {
    const writable = await handle.createWritable();
    await writable.write(JSON.stringify(buildDatabaseObject(), null, 2));
    await writable.close();
  }

  async function openDatabaseFromFileInput(file) {
    const text = await file.text();
    const parsed = safeJsonParse(text, null);
    if (!parsed) throw new Error('invalid_json');
    applyDatabaseObject(parsed);
    currentDbName = file.name || '';
    setCurrentFileLabel(currentDbName || 'Base chargée (fichier)');
    setStorageInfo('Base JSON chargée depuis le fichier sélectionné.', false);
    updateDatabasePreview();
    hideStartupModal();
    await initializeData(true);
  }

  async function loadDatabaseFromUrl() {
    try {
      const suggested = (() => {
        try { return localStorage.getItem('krav_notes_db_url') || ''; } catch { return ''; }
      })();
      const next = window.prompt('URL du fichier JSON (GitHub Pages) :', suggested);
      if (!next || !next.trim()) return;
      const url = next.trim();
      try { localStorage.setItem('krav_notes_db_url', url); } catch { /* ignore */ }

      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) throw new Error(`http_${response.status}`);
      const text = await response.text();
      const parsed = safeJsonParse(text, null);
      if (!parsed) throw new Error('invalid_json');

      applyDatabaseObject(parsed);
      dbFileHandle = null;
      currentDbName = url;
      setCurrentFileLabel(url);
      setStorageInfo('Base JSON chargée depuis l\'URL.', false);
      updateDatabasePreview();
      hideStartupModal();
      await initializeData(true);
      setFileDirty(false);
    } catch (error) {
      console.error(error);
      setStorageInfo('Chargement depuis URL impossible.', true);
    }
  }

  async function tryLoadDatabaseFromUrlOnStartup() {
    const candidates = [];
    try {
      const stored = localStorage.getItem('krav_notes_db_url');
      if (stored && stored.trim()) candidates.push(stored.trim());
    } catch { /* ignore */ }

    candidates.push('krav-notes-db.json');
    candidates.push('krav-note-de.json');

    for (const url of candidates) {
      try {
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) continue;
        const text = await response.text();
        const parsed = safeJsonParse(text, null);
        if (!parsed) continue;
        applyDatabaseObject(parsed);
        dbFileHandle = null;
        currentDbName = url;
        setCurrentFileLabel(url);
        setStorageInfo('Base JSON chargée automatiquement.', false);
        updateDatabasePreview();
        hideStartupModal();
        await initializeData(true);
        setFileDirty(false);
        return true;
      } catch {
        // ignore and try next
      }
    }

    return false;
  }

  function deepSortObject(value) {
    if (Array.isArray(value)) return value.map(deepSortObject);
    if (!value || typeof value !== 'object') return value;
    const out = {};
    Object.keys(value).sort().forEach(key => {
      out[key] = deepSortObject(value[key]);
    });
    return out;
  }

  function stableStringify(value) {
    return JSON.stringify(deepSortObject(value));
  }

  function ensureActionSet(partId) {
    if (!actionSets[partId]) {
      actionSets[partId] = Array.isArray(defaultActionSets[partId]) ? [...defaultActionSets[partId]] : ['Neutre'];
    }
    if (!actionSets[partId].includes('Neutre')) actionSets[partId].unshift('Neutre');
  }

  async function addActionAndPropagate(partId, actionRaw) {
    const part = partId;
    const newAction = (actionRaw || '').trim();
    if (!part || !newAction) return { added: false, value: '' };
    if (newAction.toLowerCase() === 'neutre') {
      window.alert("Le mot Neutre est réservé.");
      return { added: false, value: '' };
    }

    ensureActionSet(part);
    const exists = (actionSets[part] || []).some(item => (item || '').toLowerCase() === newAction.toLowerCase());
    if (!exists) {
      actionSets[part].push(newAction);
      await persistCustomActionSets();
    }

    Array.from(stepsBody.querySelectorAll(`select[data-part="${part}"]`)).forEach(select => {
      const hasOption = Array.from(select.options).some(o => (o.value || '').toLowerCase() === newAction.toLowerCase());
      if (!hasOption) {
        const opt = document.createElement('option');
        opt.value = newAction;
        opt.textContent = newAction;
        select.appendChild(opt);
      }
    });

    const actionPartSelect = $('actionPartSelect');
    const existingActionSelect = $('existingActionSelect');
    if (actionPartSelect && existingActionSelect && actionPartSelect.value === part) {
      const has = Array.from(existingActionSelect.options).some(o => (o.value || '').toLowerCase() === newAction.toLowerCase());
      if (!has) {
        const opt = document.createElement('option');
        opt.value = newAction;
        opt.textContent = newAction;
        existingActionSelect.appendChild(opt);
      }
    }

    renderActionLibrary();
    markFileDirty();
    return { added: !exists, value: newAction };
  }

  function mergeUniqueActions(baseList, incomingList) {
    const base = Array.isArray(baseList) ? baseList : [];
    const incoming = Array.isArray(incomingList) ? incomingList : [];
    const result = [...base];
    incoming.forEach(action => {
      if (!result.includes(action)) result.push(action);
    });
    if (!result.includes('Neutre')) result.unshift('Neutre');
    if (result[0] !== 'Neutre') {
      result.splice(result.indexOf('Neutre'), 1);
      result.unshift('Neutre');
    }
    return result;
  }

  function mergeDatabaseObject(incomingDb) {
    const safe = incomingDb && typeof incomingDb === 'object' ? incomingDb : {};

    const incomingMembers = Array.isArray(safe.members) ? safe.members.filter(m => m && m.id) : [];
    const incomingActionSets = safe.actionSets && typeof safe.actionSets === 'object' ? safe.actionSets : {};
    const incomingTechniques = safe.techniques && typeof safe.techniques === 'object' ? safe.techniques : {};

    incomingMembers.forEach(m => {
      const existing = members.find(x => x.id === m.id);
      if (!existing) members.push({ id: m.id, label: m.label || m.id });
      else if ((!existing.label || existing.label === existing.id) && m.label) existing.label = m.label;
      ensureActionSet(m.id);
      actionSets[m.id] = mergeUniqueActions(actionSets[m.id], incomingActionSets[m.id]);
    });

    Object.keys(incomingActionSets).forEach(partId => {
      if (!partId) return;
      if (!members.some(m => m.id === partId)) members.push({ id: partId, label: partId });
      ensureActionSet(partId);
      actionSets[partId] = mergeUniqueActions(actionSets[partId], incomingActionSets[partId]);
    });

    Object.keys(incomingTechniques).forEach(name => {
      const technique = incomingTechniques[name];
      if (!technique || typeof technique !== 'object') return;

      if (Array.isArray(technique.members)) {
        technique.members.forEach(m => {
          if (!m || !m.id) return;
          if (!members.some(existing => existing.id === m.id)) members.push({ id: m.id, label: m.label || m.id });
          ensureActionSet(m.id);
          actionSets[m.id] = mergeUniqueActions(actionSets[m.id], incomingActionSets[m.id]);
        });
      }

      const existing = techniquesByName[name];
      if (!existing) {
        techniquesByName[name] = technique;
        return;
      }

      if (stableStringify(existing) === stableStringify(technique)) return;

      let i = 2;
      let candidate = `${name} (import)`;
      if (techniquesByName[candidate]) {
        candidate = `${name} (import ${i})`;
        while (techniquesByName[candidate]) { i += 1; candidate = `${name} (import ${i})`; }
      }
      techniquesByName[candidate] = technique;
    });
  }

  async function mergeDatabaseFromFileInput(file) {
    const text = await file.text();
    const parsed = safeJsonParse(text, null);
    if (!parsed) throw new Error('invalid_json');
    const diff = computeMergeDiff(parsed);
    pendingMerge = {
      sourceLabel: file.name || 'Import JSON',
      incomingDb: parsed,
      diff,
      selection: initMergeSelection(diff)
    };
    showPage('mergePage');
    setStorageInfo('Import effectué. Vérifiez les différences avant fusion.', false);
  }

  async function mergeDatabase() {
    try {
      if (window.showOpenFilePicker) {
        const [handle] = await window.showOpenFilePicker({
          multiple: false,
          types: [{ description: 'JSON', accept: { 'application/json': ['.json'] } }]
        });
        if (!handle) return;
        const parsed = await readDatabaseFromHandle(handle);
        const diff = computeMergeDiff(parsed);
        pendingMerge = {
          sourceLabel: handle.name || 'Import JSON',
          incomingDb: parsed,
          diff,
          selection: initMergeSelection(diff)
        };
        showPage('mergePage');
        setStorageInfo('Import effectué. Vérifiez les différences avant fusion.', false);
        return;
      }

      const input = $('mergeDatabaseFile');
      if (input) input.click();
    } catch (error) {
      console.error(error);
      setStorageInfo('Fusion annulée ou impossible.', true);
    }
  }

  function showStartupModal() {
    const modal = document.getElementById('startupModal');
    if (!modal) return;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
  }

  function hideStartupModal() {
    const modal = document.getElementById('startupModal');
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }

  async function pickDatabaseFileHandle() {
    if (!window.showOpenFilePicker) return null;
    const [handle] = await window.showOpenFilePicker({
      multiple: false,
      types: [{ description: 'JSON', accept: { 'application/json': ['.json'] } }]
    });
    return handle || null;
  }

  async function pickSaveDatabaseFileHandle(suggestedName) {
    if (!window.showSaveFilePicker) return null;
    const handle = await window.showSaveFilePicker({
      suggestedName: suggestedName || DEFAULT_DB_FILENAME,
      types: [{ description: 'JSON', accept: { 'application/json': ['.json'] } }]
    });
    return handle || null;
  }

  async function openDatabase() {
    try {
      if (window.showOpenFilePicker) {
        const handle = await pickDatabaseFileHandle();
        if (!handle) return;
        dbFileHandle = handle;
        await saveDbFileHandle(dbFileHandle);
        const parsed = await readDatabaseFromHandle(dbFileHandle);
        applyDatabaseObject(parsed);
        currentDbName = dbFileHandle.name || '';
        setCurrentFileLabel(currentDbName || 'Base chargée');
        setStorageInfo('Base JSON ouverte.', false);
        updateDatabasePreview();
        hideStartupModal();
        await initializeData(true);
        return;
      }

      const input = document.getElementById('openDatabaseFile');
      if (input) input.click();
    } catch (error) {
      console.error(error);
      setStorageInfo('Ouverture de la base annulée ou impossible.', true);
    }
  }

  async function saveDatabase() {
    try {
      syncCurrentTechniqueIntoDatabase(false);
      if (dbFileHandle) {
        await writeDatabaseToHandle(dbFileHandle);
        persistDatabaseLocalFallback();
        setCurrentFileLabel(currentDbName || dbFileHandle.name || 'Base sauvegardée');
        setStorageInfo('Base sauvegardée.', false);
        updateDatabasePreview();
        setFileDirty(false);
        return;
      }
      await saveDatabaseAs(true);
    } catch (error) {
      console.error(error);
      setStorageInfo('Sauvegarde impossible.', true);
    }
  }

  async function saveDatabaseAs(skipTechniqueSync = false) {
    try {
      if (!skipTechniqueSync) syncCurrentTechniqueIntoDatabase(true);
      if (window.showSaveFilePicker) {
        const handle = await pickSaveDatabaseFileHandle(currentDbName || DEFAULT_DB_FILENAME);
        if (!handle) return;
        dbFileHandle = handle;
        await saveDbFileHandle(dbFileHandle);
        currentDbName = dbFileHandle.name || currentDbName;
        await writeDatabaseToHandle(dbFileHandle);
        persistDatabaseLocalFallback();
        setCurrentFileLabel(currentDbName || 'Base sauvegardée');
        setStorageInfo('Base sauvegardée sous.', false);
        updateDatabasePreview();
        setFileDirty(false);
        return;
      }

      const payload = JSON.stringify(buildDatabaseObject(), null, 2);
      const blob = new Blob([payload], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const filename = window.prompt('Nom du fichier base JSON :', currentDbName || DEFAULT_DB_FILENAME);
      if (!filename) return;
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      persistDatabaseLocalFallback();
      currentDbName = filename;
      setCurrentFileLabel(currentDbName);
      setStorageInfo('Base exportée (téléchargement).', false);
      updateDatabasePreview();
      setFileDirty(false);
    } catch (error) {
      console.error(error);
      setStorageInfo('Sauvegarde sous impossible.', true);
    }
  }

  function syncCurrentTechniqueIntoDatabase(promptForName) {
    const titleEl = $('title');
    const initialEl = $('initialState');
    const finalEl = $('finalState');
    const attentionEl = $('attentionPoints');

    if (!stepsBody || !titleEl || !initialEl || !finalEl || !attentionEl) return;

    const hasAnyContent =
      !!titleEl.value.trim() ||
      !!initialEl.value.trim() ||
      !!finalEl.value.trim() ||
      !!attentionEl.value.trim() ||
      !!stepsBody.querySelectorAll('tr').length;

    if (!hasAnyContent) return;

    const select = $('techniqueName');
    const selectedName = select ? select.value.trim() : '';
    let name = selectedName;

    if (!name) {
      const proposed = titleEl.value.trim() || 'nouvelle-technique';
      if (promptForName) {
        const next = window.prompt('Nom de la technique à inclure dans la base :', proposed);
        if (!next || !next.trim()) return;
        name = next.trim();
      } else {
        return;
      }
    }

    if (techniquesByName[name] && !selectedName) {
      let i = 2;
      while (techniquesByName[`${name} (${i})`]) i += 1;
      name = `${name} (${i})`;
    }

    techniquesByName[name] = buildTechniqueObject();
    if (select) {
      select.value = name;
      select.title = name;
    }
  }

  function applyTheme(theme) {
    const normalized = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', normalized);
    const themeSelect = $('themeSelect');
    if (themeSelect) themeSelect.value = normalized;
    try { localStorage.setItem(THEME_STORAGE_KEY, normalized); } catch { /* ignore */ }
  }

  function loadTheme() {
    const stored = (() => {
      try { return localStorage.getItem(THEME_STORAGE_KEY); } catch { return null; }
    })();
    applyTheme(stored || 'light');
  }

  async function readStoredTechniques() {
    return techniquesByName;
  }
  async function writeStoredTechniques(data) {
    techniquesByName = data && typeof data === 'object' ? data : {};
    persistDatabaseLocalFallback();
    if (dbFileHandle) {
      try { await writeDatabaseToHandle(dbFileHandle); } catch (error) { console.error(error); }
    }
    await refreshTechniqueList();
    updateDatabasePreview();
  }

  function fillSelect(select, options, selectedValue) {
    select.innerHTML = '';
    options.forEach(label => {
      const option = document.createElement('option');
      option.value = label;
      option.textContent = label;
      if (label === selectedValue) option.selected = true;
      select.appendChild(option);
    });
    select.title = select.value;
  }

  function updateMemberLabelEverywhere(memberId, newLabel) {
    if (!memberId) return;
    Object.keys(techniquesByName || {}).forEach(name => {
      const tech = techniquesByName[name];
      if (!tech || typeof tech !== 'object') return;
      if (!Array.isArray(tech.members)) return;
      tech.members.forEach(m => {
        if (!m || m.id !== memberId) return;
        m.label = newLabel;
      });
    });
  }

  function replaceActionInAllTechniques(partId, oldAction, newAction) {
    if (!partId || !oldAction || !newAction) return;
    Object.keys(techniquesByName || {}).forEach(name => {
      const tech = techniquesByName[name];
      if (!tech || typeof tech !== 'object') return;
      if (!Array.isArray(tech.steps)) return;
      tech.steps.forEach(step => {
        if (!step || typeof step !== 'object') return;
        if (step[partId] === oldAction) step[partId] = newAction;
      });
    });
  }

  function renderTableHeader() {
    mainTableHeaderRow.innerHTML = '<th>Step</th>' + orderedParts().map(id => `<th>${escapeHtml(memberLabelById(id))}</th>`).join('') + '<th>Commentaire étape</th><th>Actions</th>';
  }

  function updateSingleCellState(cell, select, textarea) {
    const active = (select.value || 'Neutre') !== 'Neutre';
    const hasComment = !!textarea.value.trim();
    cell.classList.toggle('is-active', active);
    cell.classList.toggle('has-comment', hasComment);
  }

  function updateCellStates() {
    Array.from(stepsBody.querySelectorAll('tr')).forEach(row => {
      orderedParts().forEach(part => {
        const select = row.querySelector(`select[data-part="${part}"]`);
        const textarea = row.querySelector(`textarea[data-comment="${part}"]`);
        if (select && textarea) updateSingleCellState(select.closest('.case-cell'), select, textarea);
      });
    });
  }

  function getRowsData() {
    return Array.from(stepsBody.querySelectorAll('tr')).map(row => {
      const item = { comments: {} };
      orderedParts().forEach(part => {
        const select = row.querySelector(`select[data-part="${part}"]`);
        const textarea = row.querySelector(`textarea[data-comment="${part}"]`);
        item[part] = select ? select.value : 'Neutre';
        item.comments[part] = textarea ? textarea.value.trim() : '';
      });
      item.commentaire = row.querySelector('input[data-part="commentaire"]').value.trim();
      return item;
    });
  }

  function createRowElement(stepData) {
    const data = stepData || { comments: createEmptyComments() };
    const tr = document.createElement('tr');
    tr.innerHTML = '<td class="step-number"></td>' + orderedParts().map(part => `<td class="case-cell"><div class="cell-editor"><select data-part="${part}"></select><input class="inline-action-input" type="text" data-action-input="${part}" placeholder="Action (saisie)" /><textarea class="inline-comment" data-comment="${part}" placeholder="Commentaire libre"></textarea></div></td>`).join('') + '<td class="input-cell"><input type="text" data-part="commentaire" placeholder="Commentaire global de l\'étape" /></td><td class="actions-cell"><div class="row-actions"><button class="compact-btn secondary move-up" type="button">Monter</button><button class="compact-btn secondary move-down" type="button">Descendre</button><button class="compact-btn danger delete-row" type="button">Supprimer</button></div></td>';

    orderedParts().forEach(part => {
      const select = tr.querySelector(`select[data-part="${part}"]`);
      const manualInput = tr.querySelector(`input[data-action-input="${part}"]`);
      const textarea = tr.querySelector(`textarea[data-comment="${part}"]`);
      const cell = select.closest('.case-cell');
      fillSelect(select, actionSets[part] || ['Neutre'], data[part] || 'Neutre');
      textarea.value = data.comments && data.comments[part] ? data.comments[part] : '';
      select.addEventListener('change', () => { select.title = select.value; updateSingleCellState(cell, select, textarea); refreshVisuals(); markFileDirty(); });
      textarea.addEventListener('input', () => { updateSingleCellState(cell, select, textarea); refreshVisuals(); markFileDirty(); });
      cell.addEventListener('contextmenu', event => { event.preventDefault(); cell.classList.toggle('comment-visible'); if (cell.classList.contains('comment-visible')) textarea.focus(); });

      if (manualInput) {
        const commit = async () => {
          const raw = manualInput.value;
          if (!raw || !raw.trim()) return;
          const res = await addActionAndPropagate(part, raw);
          if (res && res.value) {
            select.value = res.value;
            select.title = select.value;
            manualInput.value = '';
            updateSingleCellState(cell, select, textarea);
            refreshVisuals();
          }
        };
        manualInput.addEventListener('keydown', event => {
          if (event.key === 'Enter') {
            event.preventDefault();
            commit();
          }
        });
        manualInput.addEventListener('blur', () => { commit(); });
      }
      updateSingleCellState(cell, select, textarea);
    });

    const stepComment = tr.querySelector('input[data-part="commentaire"]');
    stepComment.value = data.commentaire || '';
    stepComment.addEventListener('input', () => { refreshVisuals(); markFileDirty(); });
    tr.querySelector('.delete-row').addEventListener('click', () => { tr.remove(); if (!stepsBody.children.length) addStep(); updateStepNumbers(); markFileDirty(); });
    tr.querySelector('.move-up').addEventListener('click', () => { const prev = tr.previousElementSibling; if (prev) { stepsBody.insertBefore(tr, prev); updateStepNumbers(); markFileDirty(); } });
    tr.querySelector('.move-down').addEventListener('click', () => { const next = tr.nextElementSibling; if (next) { stepsBody.insertBefore(next, tr); updateStepNumbers(); markFileDirty(); } });
    return tr;
  }

  function addStep(stepData, markDirty = true) {
    stepsBody.appendChild(createRowElement(stepData));
    updateStepNumbers();
    if (markDirty) markFileDirty();
  }

  function renderGanttView() {
    const rows = getRowsData();
    const displayedParts = orderedParts().filter(part => rows.some(row => (row[part] || 'Neutre') !== 'Neutre'));
    const count = Math.max(rows.length, 1);
    ganttGrid.style.setProperty('--steps-count', count);
    if (!displayedParts.length) { ganttGrid.innerHTML = '<div style="padding:16px;color:#6b7280;">Aucune action non neutre à afficher.</div>'; return; }
    let html = '<div class="gantt-header"><div class="gantt-label">Membre / Step</div>';
    for (let i = 0; i < count; i += 1) html += `<div>Step ${i + 1}</div>`;
    html += '</div>';
    displayedParts.forEach(part => {
      html += `<div class="gantt-row"><div class="gantt-label">${escapeHtml(memberLabelById(part))}</div>`;
      rows.forEach(row => {
        const action = row[part] || 'Neutre';
        const comment = row.comments && row.comments[part] ? row.comments[part] : '';
        html += action === 'Neutre' ? '<div class="gantt-cell"></div>' : `<div class="gantt-cell"><div class="gantt-item"><strong>${escapeHtml(action)}</strong>${comment ? `<div>${escapeHtml(comment)}</div>` : ''}</div></div>`;
      });
      html += '</div>';
    });
    ganttGrid.innerHTML = html;
  }

  function renderMobileGanttView() {
    const rows = getRowsData();
    if (!rows.length) { mobileGanttWrap.innerHTML = '<div style="color:#6b7280;">Aucune étape.</div>'; return; }
    let html = '<div class="mobile-gantt-column">';
    rows.forEach((row, index) => {
      const activeParts = orderedParts().filter(part => (row[part] || 'Neutre') !== 'Neutre');
      html += `<div class="mobile-gantt-step"><div class="mobile-gantt-step-title">Step ${index + 1}</div>`;
      if (activeParts.length) {
        activeParts.forEach(part => {
          const comment = row.comments && row.comments[part] ? row.comments[part] : '';
          html += `<div class="mobile-gantt-item"><strong>${escapeHtml(memberLabelById(part))}</strong> : ${escapeHtml(row[part])}${comment ? `<div>${escapeHtml(comment)}</div>` : ''}</div>`;
        });
      } else {
        html += '<div style="color:#6b7280;">Aucune action non neutre</div>';
      }
      html += '</div>';
    });
    mobileGanttWrap.innerHTML = html + '</div>';
  }

  function renderMobileView() {
    const rows = getRowsData();
    if (!rows.length) { mobileStepsWrap.innerHTML = '<div style="color:#6b7280;">Aucune étape.</div>'; return; }
    const selectedIndex = Number(mobileStepsWrap.dataset.selectedIndex || 0);
    const safeSelectedIndex = Math.min(Math.max(selectedIndex, 0), rows.length - 1);
    mobileStepsWrap.dataset.selectedIndex = String(safeSelectedIndex);
    let html = '';
    rows.forEach((row, index) => {
      const isSelected = index === safeSelectedIndex;
      const activeParts = orderedParts().filter(part => (row[part] || 'Neutre') !== 'Neutre');
      html += `<div class="mobile-step-card ${isSelected ? 'selected' : 'condensed'}" data-step-index="${index}">`;
      html += `<div class="mobile-step-header"><div class="mobile-step-title">Step ${index + 1}</div>${!isSelected ? `<button class="compact-btn secondary" type="button" data-mobile-open="${index}">Ouvrir</button>` : ''}</div>`;
      if (isSelected) {
        html += '<div class="mobile-grid">';
        orderedParts().forEach(part => {
          const action = row[part] || 'Neutre';
          const comment = row.comments && row.comments[part] ? row.comments[part] : '';
          const classes = ['mobile-part'];
          if (action !== 'Neutre') classes.push('is-active');
          if (comment) classes.push('has-comment');
          html += `<div class="${classes.join(' ')}" data-mobile-part="${part}" data-step-index="${index}"><div class="mobile-part-label">${escapeHtml(memberLabelById(part))}</div><select data-mobile-select="${part}">`;
          (actionSets[part] || ['Neutre']).forEach(opt => { html += `<option value="${escapeHtml(opt)}"${opt === action ? ' selected' : ''}>${escapeHtml(opt)}</option>`; });
          html += `</select><input class="mobile-action-input" type="text" data-mobile-action-input="${part}" placeholder="Action (saisie)" /><textarea data-mobile-comment="${part}" placeholder="Commentaire libre">${escapeHtml(comment)}</textarea></div>`;
        });
        html += `</div><div class="mobile-step-comment"><input type="text" data-mobile-step-comment value="${escapeHtml(row.commentaire || '')}" placeholder="Commentaire global de l'étape" /></div>`;
        html += `<div class="mobile-step-actions"><button class="compact-btn secondary" type="button" data-mobile-up="${index}">Monter</button><button class="compact-btn secondary" type="button" data-mobile-down="${index}">Descendre</button><button class="compact-btn danger" type="button" data-mobile-delete="${index}">Supprimer</button></div>`;
      } else {
        html += '<div class="mobile-condensed-list">';
        if (activeParts.length) activeParts.forEach(part => { html += `<div class="mobile-condensed-item"><strong>${escapeHtml(memberLabelById(part))}</strong> : ${escapeHtml(row[part])}</div>`; });
        else html += '<div class="mobile-condensed-item">Aucune action non neutre</div>';
        html += '</div>';
      }
      html += '</div>';
    });
    mobileStepsWrap.innerHTML = html;
    bindMobileEvents();
  }

  function bindMobileEvents() {
    Array.from(mobileStepsWrap.querySelectorAll('[data-mobile-open]')).forEach(btn => btn.addEventListener('click', () => { mobileStepsWrap.dataset.selectedIndex = btn.getAttribute('data-mobile-open'); renderMobileView(); }));
    Array.from(mobileStepsWrap.querySelectorAll('[data-mobile-part]')).forEach(partEl => partEl.addEventListener('contextmenu', event => { event.preventDefault(); partEl.classList.toggle('comment-visible'); const textarea = partEl.querySelector('textarea'); if (partEl.classList.contains('comment-visible')) textarea.focus(); }));
    Array.from(mobileStepsWrap.querySelectorAll('[data-mobile-select]')).forEach(selectEl => selectEl.addEventListener('change', () => { const stepIndex = Number(selectEl.closest('.mobile-step-card').dataset.stepIndex); const part = selectEl.getAttribute('data-mobile-select'); const row = stepsBody.querySelectorAll('tr')[stepIndex]; const sourceSelect = row.querySelector(`select[data-part="${part}"]`); sourceSelect.value = selectEl.value; sourceSelect.dispatchEvent(new Event('change')); }));
    Array.from(mobileStepsWrap.querySelectorAll('[data-mobile-action-input]')).forEach(inputEl => {
      const commit = async () => {
        const raw = inputEl.value;
        if (!raw || !raw.trim()) return;
        const stepIndex = Number(inputEl.closest('.mobile-step-card').dataset.stepIndex);
        const part = inputEl.getAttribute('data-mobile-action-input');
        const res = await addActionAndPropagate(part, raw);
        if (res && res.value) {
          const row = stepsBody.querySelectorAll('tr')[stepIndex];
          const sourceSelect = row.querySelector(`select[data-part="${part}"]`);
          sourceSelect.value = res.value;
          sourceSelect.dispatchEvent(new Event('change'));
        }
      };
      inputEl.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          event.preventDefault();
          commit();
        }
      });
      inputEl.addEventListener('blur', () => { commit(); });
    });
    Array.from(mobileStepsWrap.querySelectorAll('[data-mobile-comment]')).forEach(textareaEl => textareaEl.addEventListener('input', () => { const stepIndex = Number(textareaEl.closest('.mobile-step-card').dataset.stepIndex); const part = textareaEl.getAttribute('data-mobile-comment'); const row = stepsBody.querySelectorAll('tr')[stepIndex]; const sourceTextarea = row.querySelector(`textarea[data-comment="${part}"]`); sourceTextarea.value = textareaEl.value; sourceTextarea.dispatchEvent(new Event('input')); }));
    Array.from(mobileStepsWrap.querySelectorAll('[data-mobile-step-comment]')).forEach(inputEl => inputEl.addEventListener('input', () => { const stepIndex = Number(inputEl.closest('.mobile-step-card').dataset.stepIndex); const row = stepsBody.querySelectorAll('tr')[stepIndex]; const sourceInput = row.querySelector('input[data-part="commentaire"]'); sourceInput.value = inputEl.value; sourceInput.dispatchEvent(new Event('input')); }));
    Array.from(mobileStepsWrap.querySelectorAll('[data-mobile-up]')).forEach(btn => btn.addEventListener('click', () => { const stepIndex = Number(btn.getAttribute('data-mobile-up')); const row = stepsBody.querySelectorAll('tr')[stepIndex]; const previous = row && row.previousElementSibling; if (previous) { stepsBody.insertBefore(row, previous); updateStepNumbers(); } }));
    Array.from(mobileStepsWrap.querySelectorAll('[data-mobile-down]')).forEach(btn => btn.addEventListener('click', () => { const stepIndex = Number(btn.getAttribute('data-mobile-down')); const row = stepsBody.querySelectorAll('tr')[stepIndex]; const next = row && row.nextElementSibling; if (next) { stepsBody.insertBefore(next, row); updateStepNumbers(); } }));
    Array.from(mobileStepsWrap.querySelectorAll('[data-mobile-delete]')).forEach(btn => btn.addEventListener('click', () => { const stepIndex = Number(btn.getAttribute('data-mobile-delete')); const row = stepsBody.querySelectorAll('tr')[stepIndex]; if (row) { row.remove(); if (!stepsBody.children.length) addStep(); updateStepNumbers(); } }));
  }

  function refreshVisuals() { updateCellStates(); renderGanttView(); renderMobileView(); renderMobileGanttView(); }
  function updateStepNumbers() { Array.from(stepsBody.querySelectorAll('tr')).forEach((row, index) => { row.querySelector('.step-number').textContent = index + 1; }); refreshVisuals(); }

  function renderMemberLibrary() {
    if (!memberListCard || !memberListBody) return;
    const collapsed = sessionStorage.getItem('memberListCollapsed') === '1';
    memberListCard.classList.toggle('collapsed', collapsed);
    if (memberListIndicator) memberListIndicator.textContent = collapsed ? 'Afficher' : 'Replier';
    memberListBody.innerHTML = members.map(m => `<div class="member-item"><span>${escapeHtml(m.label)}</span><button class="compact-btn secondary" type="button" data-member-edit="${m.id}">Modifier</button><button class="compact-btn danger" type="button" data-member-delete="${m.id}">Supprimer</button></div>`).join('');
    Array.from(memberListBody.querySelectorAll('[data-member-edit]')).forEach(btn => btn.addEventListener('click', () => renameMember(btn.getAttribute('data-member-edit'))));
    Array.from(memberListBody.querySelectorAll('[data-member-delete]')).forEach(btn => btn.addEventListener('click', () => deleteMember(btn.getAttribute('data-member-delete'))));
  }

  function populateMemberSelects() {
    const memberSelect = $('memberSelect');
    const actionPartSelect = $('actionPartSelect');
    if (!memberSelect || !actionPartSelect) return;
    memberSelect.innerHTML = '';
    actionPartSelect.innerHTML = '';
    members.forEach(m => {
      const o1 = document.createElement('option'); o1.value = m.id; o1.textContent = m.label; memberSelect.appendChild(o1);
      const o2 = document.createElement('option'); o2.value = m.id; o2.textContent = m.label; actionPartSelect.appendChild(o2);
    });
    refreshExistingActions();
  }

  async function addMember() {
    const newMemberInput = $('newMemberInput');
    if (!newMemberInput) return;
    const name = newMemberInput.value.trim();
    if (!name) return setMembersInfo('Indiquez un nom de membre.', true);
    const idBase = slugify(name) || 'membre';
    let id = idBase; let i = 2;
    while (members.some(m => m.id === id)) { id = `${idBase}_${i}`; i += 1; }
    if (members.some(m => m.label.toLowerCase() === name.toLowerCase())) return setMembersInfo('Ce membre existe déjà.', true);
    members.push({ id, label: name });
    actionSets[id] = ['Neutre'];
    await persistMembers();
    await persistCustomActionSets();
    newMemberInput.value = '';
    rebuildAllSelects();
    setMembersInfo(`Membre ajouté : ${name}`, false);
  }

  async function renameMember(memberId) {
    const targetId = memberId || $('memberSelect').value;
    const member = members.find(m => m.id === targetId);
    if (!member) return setMembersInfo('Membre introuvable.', true);
    const next = window.prompt('Nouveau nom du membre :', member.label);
    if (!next || !next.trim()) return;
    const newLabel = next.trim();
    if (members.some(m => m.id !== targetId && m.label.toLowerCase() === newLabel.toLowerCase())) return setMembersInfo('Un membre avec ce nom existe déjà.', true);
    member.label = newLabel;
    updateMemberLabelEverywhere(targetId, newLabel);
    await persistMembers();
    rebuildAllSelects();
    $('memberSelect').value = targetId;
    $('actionPartSelect').value = targetId;
    setMembersInfo(`Membre renommé : ${newLabel}`, false);
  }

  async function deleteMember(memberId) {
    const targetId = memberId || $('memberSelect').value;
    const member = members.find(m => m.id === targetId);
    if (!member) return setMembersInfo('Membre introuvable.', true);
    if (members.length <= 1) return setMembersInfo('Impossible de supprimer le dernier membre.', true);
    if (!window.confirm(`Supprimer le membre « ${member.label} » ?`)) return;
    members = members.filter(m => m.id !== targetId);
    delete actionSets[targetId];
    await persistMembers();
    await persistCustomActionSets();
    rebuildAllSelects();
    setMembersInfo(`Membre supprimé : ${member.label}`, false);
  }

  function refreshExistingActions() {
    const part = $('actionPartSelect').value || orderedParts()[0];
    const select = $('existingActionSelect');
    if (!select) return;
    select.innerHTML = '';
    (actionSets[part] || ['Neutre']).forEach(action => {
      const option = document.createElement('option'); option.value = action; option.textContent = action; select.appendChild(option);
    });
    renderActionLibrary();
  }

  function renderActionLibrary() {
    if (!actionListBody) return;
    const collapsedState = safeJsonParse(sessionStorage.getItem('actionLibraryCollapsed') || '', {});
    let html = '';
    orderedParts().forEach(part => {
      const collapsed = !!collapsedState[part];
      html += `<div class="action-list-card${collapsed ? ' collapsed' : ''}"><div class="action-list-header" data-toggle-card="${part}"><span>${escapeHtml(memberLabelById(part))}</span><span class="collapse-indicator">${collapsed ? 'Afficher' : 'Replier'}</span></div><div class="action-list-body">`;
      (actionSets[part] || ['Neutre']).forEach(action => {
        html += `<div class="action-item"><span>${escapeHtml(action)}</span><button class="compact-btn secondary" type="button" data-edit-action="${part}||${action.replace(/\|\|/g,'')}">Modifier</button><button class="compact-btn danger" type="button" data-delete-action="${part}||${action.replace(/\|\|/g,'')}">Supprimer</button></div>`;
      });
      html += '</div></div>';
    });
    actionListBody.innerHTML = html;
    Array.from(actionListBody.querySelectorAll('[data-toggle-card]')).forEach(header => header.addEventListener('click', () => {
      const part = header.getAttribute('data-toggle-card');
      const state = safeJsonParse(sessionStorage.getItem('actionLibraryCollapsed') || '', {});
      state[part] = !state[part];
      sessionStorage.setItem('actionLibraryCollapsed', JSON.stringify(state));
      renderActionLibrary();
    }));
    Array.from(actionListBody.querySelectorAll('[data-edit-action]')).forEach(btn => btn.addEventListener('click', event => { event.stopPropagation(); const parts = btn.getAttribute('data-edit-action').split('||'); renameAction(parts[0], parts.slice(1).join('||')); }));
    Array.from(actionListBody.querySelectorAll('[data-delete-action]')).forEach(btn => btn.addEventListener('click', event => { event.stopPropagation(); const parts = btn.getAttribute('data-delete-action').split('||'); deleteAction(parts[0], parts.slice(1).join('||')); }));
  }

  async function addCustomAction() {
    const actionPartSelect = $('actionPartSelect');
    const newActionInput = $('newActionInput');
    if (!actionPartSelect || !newActionInput) return;
    const part = actionPartSelect.value;
    const newAction = newActionInput.value.trim();
    if (!newAction) return setActionsInfo('Indiquez une action à ajouter.', true);
    if (newAction.toLowerCase() === 'neutre') return setActionsInfo('Le mot Neutre est réservé.', true);
    if ((actionSets[part] || []).some(item => item.toLowerCase() === newAction.toLowerCase())) return setActionsInfo('Cette action existe déjà pour ce membre.', true);
    actionSets[part].push(newAction);
    await persistCustomActionSets();
    rebuildAllSelects();
    newActionInput.value = '';
    setActionsInfo(`Nouvelle action ajoutée : ${newAction}`, false);
  }

  async function renameAction(partArg, actionArg) {
    const part = partArg || $('actionPartSelect').value;
    const action = actionArg || $('existingActionSelect').value;
    if (!action || action === 'Neutre') return setActionsInfo('Action non modifiable.', true);
    const next = window.prompt('Nouveau nom de l\'action :', action);
    if (!next || !next.trim()) return;
    const newName = next.trim();
    if (newName.toLowerCase() === 'neutre') return setActionsInfo('Le mot Neutre est réservé.', true);
    if ((actionSets[part] || []).some(item => item.toLowerCase() === newName.toLowerCase() && item !== action)) return setActionsInfo('Une action avec ce nom existe déjà.', true);
    actionSets[part] = actionSets[part].map(item => item === action ? newName : item);
    Array.from(stepsBody.querySelectorAll('tr')).forEach(row => { const select = row.querySelector(`select[data-part="${part}"]`); if (select && select.value === action) select.value = newName; });
    replaceActionInAllTechniques(part, action, newName);
    await persistCustomActionSets();
    rebuildAllSelects();
    $('actionPartSelect').value = part;
    setActionsInfo(`Action renommée : ${action} → ${newName}`, false);
  }

  async function deleteAction(partArg, actionArg) {
    const part = partArg || $('actionPartSelect').value;
    const action = actionArg || $('existingActionSelect').value;
    if (!action || action === 'Neutre') return setActionsInfo('Action non supprimable.', true);
    if (!window.confirm(`Supprimer l'action « ${action} » ?`)) return;
    actionSets[part] = actionSets[part].filter(item => item !== action);
    Array.from(stepsBody.querySelectorAll('tr')).forEach(row => { const select = row.querySelector(`select[data-part="${part}"]`); if (select && select.value === action) select.value = 'Neutre'; });
    replaceActionInAllTechniques(part, action, 'Neutre');
    await persistCustomActionSets();
    rebuildAllSelects();
    updateStepNumbers();
    setActionsInfo(`Action supprimée : ${action}`, false);
  }

  async function resetActionLibrary() {
    if (!window.confirm('Réinitialiser toute la bibliothèque d’actions ?')) return;
    actionSets = {};
    members.forEach(m => { actionSets[m.id] = Array.isArray(defaultActionSets[m.id]) ? [...defaultActionSets[m.id]] : ['Neutre']; });
    await persistCustomActionSets();
    rebuildAllSelects();
    setActionsInfo('Bibliothèque réinitialisée.', false);
  }

  function exportActionsJson() {
    const payload = { version: 1, exportedAt: new Date().toISOString(), members, actionSets };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bibliotheque-actions-self-defense.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setActionsInfo('Bibliothèque exportée en JSON.', false);
  }

  async function importActionsJsonFromFile(file) {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (Array.isArray(parsed.members)) members = parsed.members.map(m => ({ id: m.id, label: m.label }));
        const incoming = parsed.actionSets || parsed;
        actionSets = {};
        members.forEach(m => {
          actionSets[m.id] = [];
          const list = Array.isArray(incoming[m.id]) ? incoming[m.id] : (Array.isArray(defaultActionSets[m.id]) ? [...defaultActionSets[m.id]] : ['Neutre']);
          list.forEach(action => {
            const normalized = String(action || '').trim();
            if (normalized && !actionSets[m.id].includes(normalized)) actionSets[m.id].push(normalized);
          });
          if (!actionSets[m.id].includes('Neutre')) actionSets[m.id].unshift('Neutre');
        });
        persistDatabaseLocalFallback();
        if (dbFileHandle) {
          try { await writeDatabaseToHandle(dbFileHandle); } catch (error) { console.error(error); }
        }
        rebuildAllSelects();
        setActionsInfo('Bibliothèque importée.', false);
        setMembersInfo('Membres importés.', false);
      } catch (error) {
        console.error(error);
        setActionsInfo('Fichier JSON des actions invalide.', true);
      }
    };
    reader.readAsText(file, 'utf-8');
  }

  function buildTechniqueObject() {
    return {
      version: 8,
      members,
      title: $('title').value.trim(),
      belt: (document.getElementById('beltSelect') ? document.getElementById('beltSelect').value : '') || '',
      initialState: $('initialState').value.trim(),
      finalState: $('finalState').value.trim(),
      attentionPoints: $('attentionPoints').value.trim(),
      steps: getRowsData(),
      exportedAt: new Date().toISOString()
    };
  }

  function applyTechniqueData(data) {
    const safe = data || {};
    if (Array.isArray(safe.members) && safe.members.length) {
      safe.members.forEach(m => {
        if (!m || !m.id) return;
        if (!members.some(existing => existing.id === m.id)) members.push({ id: m.id, label: m.label || m.id });
        if (!actionSets[m.id]) actionSets[m.id] = Array.isArray(defaultActionSets[m.id]) ? [...defaultActionSets[m.id]] : ['Neutre'];
      });
      renderTableHeader();
      populateMemberSelects();
    }
    $('title').value = safe.title || '';
    const beltSelect = document.getElementById('beltSelect');
    if (beltSelect) beltSelect.value = safe.belt || '';
    $('initialState').value = safe.initialState || '';
    $('finalState').value = safe.finalState || '';
    $('attentionPoints').value = safe.attentionPoints || '';
    stepsBody.innerHTML = '';
    if (Array.isArray(safe.steps) && safe.steps.length) safe.steps.forEach(step => { if (!step.comments) step.comments = createEmptyComments(); addStep(step, false); });
    else addStep(undefined, false);

    setFileDirty(false);
  }

  function buildPrintSheet() {
    const data = buildTechniqueObject();
    const head = orderedParts().map(part => `<th>${escapeHtml(memberLabelById(part))}</th>`).join('');
    const rows = data.steps.map((row, index) => {
      const cells = orderedParts().map(part => {
        const action = escapeHtml(row[part] || '');
        const note = row.comments && row.comments[part] ? `<div><em>${escapeHtml(row.comments[part])}</em></div>` : '';
        return `<td><strong>${action}</strong>${note}</td>`;
      }).join('');
      return `<tr><td>${index + 1}</td>${cells}<td>${escapeHtml(row.commentaire || '')}</td></tr>`;
    }).join('');
    printSheet.innerHTML = `<div class="print-block"><h1>${escapeHtml(data.title || 'Technique sans titre')}</h1></div><div class="print-block"><h2>Description générale</h2><p><span class="print-label">État initial :</span> ${escapeHtml(data.initialState || 'Non renseigné')}</p><p><span class="print-label">État final :</span> ${escapeHtml(data.finalState || 'Non renseigné')}</p><p><span class="print-label">Points d'attention :</span> ${escapeHtml(data.attentionPoints || 'Non renseigné')}</p></div><div class="print-block"><h2>Détail des étapes</h2><table class="print-steps"><thead><tr><th>Step</th>${head}<th>Commentaire étape</th></tr></thead><tbody>${rows || '<tr><td colspan="14">Aucune étape renseignée</td></tr>'}</tbody></table></div>`;
  }

  async function refreshTechniqueList(selectedValue) {
    const select = $('techniqueName');
    const all = await readStoredTechniques();
    const names = Object.keys(all).sort();
    const current = selectedValue !== undefined ? selectedValue : select.value;
    const filtered = beltFilterValue ? names.filter(n => (all[n] && String(all[n].belt || '') === beltFilterValue)) : names;
    select.innerHTML = '<option value="">-- sélectionner une sauvegarde --</option>';
    filtered.forEach(name => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      if (name === current) option.selected = true;
      select.appendChild(option);
    });
  }

  function getTechniqueName() { return $('techniqueName').value.trim(); }
  function askTechniqueSaveName() { const proposed = getTechniqueName() || $('title').value.trim() || 'nouvelle-technique'; const name = window.prompt('Nom de la sauvegarde :', proposed); return name ? name.trim() : ''; }
  async function saveTechnique() { const name = askTechniqueSaveName(); if (!name) return setStorageInfo('Sauvegarde annulée ou nom vide.', true); const all = await readStoredTechniques(); all[name] = buildTechniqueObject(); await writeStoredTechniques(all); await refreshTechniqueList(name); setStorageInfo(`Technique sauvegardée (navigateur) : ${name}`, false); }
  async function loadTechnique() { const name = getTechniqueName(); const all = await readStoredTechniques(); if (!name || !all[name]) return setStorageInfo('Technique introuvable.', true); applyTechniqueData(all[name]); setStorageInfo(`Technique rechargée : ${name}`, false); }
  async function listTechniques() { const names = Object.keys(await readStoredTechniques()).sort(); await refreshTechniqueList(getTechniqueName()); setStorageInfo(names.length ? `Liste actualisée : ${names.join(' | ')}` : 'Aucune technique sauvegardée.', false); }
  function exportJson() { const data = buildTechniqueObject(); const base = (getTechniqueName() || data.title || 'technique-self-defense').toLowerCase().replace(/[^a-z0-9àâçéèêëîïôûùüÿñæœ_-]+/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''); const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `${base || 'technique'}.json`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); setStorageInfo('Export JSON effectué.', false); }
  function importJsonFromFile(file) { const reader = new FileReader(); reader.onload = () => { try { applyTechniqueData(JSON.parse(reader.result)); setStorageInfo('Import JSON réussi.', false); } catch (error) { console.error(error); setStorageInfo('Le fichier JSON est invalide.', true); } }; reader.readAsText(file, 'utf-8'); }
  function clearAll() { if (!window.confirm('Supprimer toutes les étapes du tableau ?')) return; stepsBody.innerHTML = ''; addStep(); setStorageInfo('Tableau vidé.', false); }
  function duplicateLastStep() { const rows = getRowsData(); addStep(rows.length ? JSON.parse(JSON.stringify(rows[rows.length - 1])) : undefined); setStorageInfo('Dernière étape dupliquée.', false); }
  function loadDemo() { applyTechniqueData({ title:'Défense sur saisie poignet + contre', initialState:'L\'adversaire saisit le poignet droit. Distance courte. Garde relâchée mais posture stable.', finalState:'Le poignet est dégagé, l\'angle est repris et l\'adversaire est contrôlé à distance de sécurité.', attentionPoints:'Ne pas tirer en force. Tourner dans l\'axe faible de la saisie. Garder le menton rentré et reprendre la distance après le contre.', steps:[{ tete:'Regarder l\'adversaire', menton:'Rentré', coude_droit:'Collé au corps', coude_gauche:'Levé garde haute', main_droite:'Saisie poignet adverse', main_gauche:'Garde visage', hanche_droite:'Rotation externe', hanche_gauche:'Abaissement centre de gravité', genou_droit:'Fléchi', genou_gauche:'Ancré', pied_droit:'Pivot sur place', pied_gauche:'Ancré au sol', commentaire:'Créer de la structure avant le dégagement.', comments:{ tete:'Vision périphérique active', menton:'Protégé', coude_droit:'Compact', coude_gauche:'Garde haute', main_droite:'Serrer sans crispation', main_gauche:'Couvre', hanche_droite:'Préparer rotation', hanche_gauche:'Base stable', genou_droit:'Souple', genou_gauche:'Porteur', pied_droit:'Pivot court', pied_gauche:'Ancrage' } }] }); setStorageInfo('Exemple chargé.', false); }

  function applyResponsiveMode() {
    const isMobile = window.innerWidth <= 700;
    if (isMobile) {
      if (tableWrap) tableWrap.classList.remove('active');
      if (ganttWrap) ganttWrap.classList.remove('active');
      if (mobileStepsWrap && mobileGanttWrap && !mobileStepsWrap.classList.contains('active') && !mobileGanttWrap.classList.contains('active')) mobileStepsWrap.classList.add('active');
    } else {
      if (mobileStepsWrap) mobileStepsWrap.classList.remove('active');
      if (mobileGanttWrap) mobileGanttWrap.classList.remove('active');
      if (tableWrap && ganttWrap && !tableWrap.classList.contains('active') && !ganttWrap.classList.contains('active')) tableWrap.classList.add('active');
    }
  }

  function showPage(pageId) {
    Array.from(document.querySelectorAll('.page')).forEach(page => page.classList.remove('active'));
    const page = document.getElementById(pageId);
    if (page) page.classList.add('active');
    Array.from(document.querySelectorAll('.nav-btn')).forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-page') === pageId));
    if (pageId === 'actionsPage') refreshExistingActions();
    if (pageId === 'membersPage') renderMemberLibrary();
    if (pageId === 'mergePage') renderMergePage();
  }

  function getMergeEls() {
    return {
      status: document.getElementById('mergeStatus'),
      warnings: document.getElementById('mergeWarnings'),
      members: document.getElementById('mergeMembersDiff'),
      actions: document.getElementById('mergeActionsDiff'),
      techniques: document.getElementById('mergeTechniquesDiff'),
      applyBtn: document.getElementById('applyMergeBtn'),
      cancelBtn: document.getElementById('cancelMergeBtn'),
      forceDeps: document.getElementById('mergeForceDeps')
    };
  }

  function computeTechniqueFingerprint(tech) {
    const safe = tech && typeof tech === 'object' ? tech : {};
    return stableStringify({
      title: safe.title || '',
      initialState: safe.initialState || '',
      finalState: safe.finalState || '',
      attentionPoints: safe.attentionPoints || '',
      members: Array.isArray(safe.members) ? safe.members.map(m => ({ id: m && m.id ? m.id : '', label: m && m.label ? m.label : '' })) : [],
      steps: Array.isArray(safe.steps) ? safe.steps : []
    });
  }

  function suggestTechniqueImportName(baseName) {
    let candidate = `${baseName} (import)`;
    if (!techniquesByName[candidate]) return candidate;
    let i = 2;
    candidate = `${baseName} (import ${i})`;
    while (techniquesByName[candidate]) { i += 1; candidate = `${baseName} (import ${i})`; }
    return candidate;
  }

  function computeMergeDiff(incomingDb) {
    const safe = incomingDb && typeof incomingDb === 'object' ? incomingDb : {};
    const incomingMembers = Array.isArray(safe.members) ? safe.members.filter(m => m && m.id) : [];
    const incomingActionSets = safe.actionSets && typeof safe.actionSets === 'object' ? safe.actionSets : {};
    const incomingTechniques = safe.techniques && typeof safe.techniques === 'object' ? safe.techniques : {};

    const memberAdds = [];
    const memberLabelUpdates = [];
    incomingMembers.forEach(m => {
      const existing = members.find(x => x.id === m.id);
      if (!existing) memberAdds.push({ id: m.id, label: m.label || m.id });
      else if ((m.label || '') !== (existing.label || '')) memberLabelUpdates.push({ id: m.id, from: existing.label || '', to: m.label || m.id });
    });

    const actionAdds = [];
    Object.keys(incomingActionSets).forEach(partId => {
      const incoming = Array.isArray(incomingActionSets[partId]) ? incomingActionSets[partId] : [];
      const current = Array.isArray(actionSets[partId]) ? actionSets[partId] : (Array.isArray(defaultActionSets[partId]) ? [...defaultActionSets[partId]] : ['Neutre']);
      incoming.forEach(action => {
        if (!action) return;
        if (!current.includes(action)) actionAdds.push({ partId, action });
      });
    });

    const techniqueAdds = [];
    const techniqueConflicts = [];
    const techniqueSame = [];

    Object.keys(incomingTechniques).forEach(name => {
      const incomingTech = incomingTechniques[name];
      if (!incomingTech || typeof incomingTech !== 'object') return;
      const existing = techniquesByName[name];
      if (!existing) {
        techniqueAdds.push({ name });
        return;
      }
      const same = computeTechniqueFingerprint(existing) === computeTechniqueFingerprint(incomingTech);
      if (same) techniqueSame.push({ name });
      else techniqueConflicts.push({ name, targetName: suggestTechniqueImportName(name) });
    });

    return {
      incomingMembers,
      incomingActionSets,
      incomingTechniques,
      memberAdds,
      memberLabelUpdates,
      actionAdds,
      techniqueAdds,
      techniqueConflicts,
      techniqueSame
    };
  }

  function initMergeSelection(diff) {
    const memberById = new Map(diff.incomingMembers.map(m => [m.id, m]));
    const membersSelected = {};
    diff.memberAdds.forEach(m => { membersSelected[m.id] = true; });
    diff.memberLabelUpdates.forEach(m => { membersSelected[m.id] = true; });

    const actionsSelected = {};
    diff.actionAdds.forEach(item => { actionsSelected[`${item.partId}||${item.action}`] = true; });

    const techniquesSelected = {};
    diff.techniqueAdds.forEach(t => { techniquesSelected[t.name] = true; });
    diff.techniqueConflicts.forEach(t => { techniquesSelected[t.name] = true; });

    return { memberById, membersSelected, actionsSelected, techniquesSelected, forceDeps: false };
  }

  function computeMergeWarnings(diff, selection) {
    const selectedMemberIds = new Set();
    Object.keys(selection.membersSelected).forEach(id => { if (selection.membersSelected[id]) selectedMemberIds.add(id); });
    members.forEach(m => selectedMemberIds.add(m.id));

    const selectedActionKeys = new Set();
    Object.keys(selection.actionsSelected).forEach(k => { if (selection.actionsSelected[k]) selectedActionKeys.add(k); });

    const warnings = [];
    const selectedTechniques = Object.keys(selection.techniquesSelected).filter(name => selection.techniquesSelected[name]);
    selectedTechniques.forEach(name => {
      const tech = diff.incomingTechniques[name];
      if (!tech || typeof tech !== 'object') return;

      const missingMembers = [];
      if (Array.isArray(tech.members)) {
        tech.members.forEach(m => {
          if (!m || !m.id) return;
          if (!selectedMemberIds.has(m.id)) missingMembers.push(m.id);
        });
      }

      const missingActions = [];
      if (Array.isArray(tech.steps)) {
        tech.steps.forEach(step => {
          if (!step || typeof step !== 'object') return;
          Object.keys(step).forEach(partId => {
            if (partId === 'comments' || partId === 'commentaire') return;
            const val = step[partId];
            if (!val || val === 'Neutre') return;
            const hasInCurrent = (actionSets[partId] || []).includes(val);
            const hasSelected = selectedActionKeys.has(`${partId}||${val}`);
            if (!hasInCurrent && !hasSelected) missingActions.push(`${partId}:${val}`);
            if (!selectedMemberIds.has(partId)) missingMembers.push(partId);
          });
        });
      }

      if (missingMembers.length || missingActions.length) {
        warnings.push({
          technique: name,
          missingMembers: Array.from(new Set(missingMembers)),
          missingActions: Array.from(new Set(missingActions))
        });
      }
    });

    return warnings;
  }

  function renderMergeList(container, itemsHtml) {
    if (!container) return;
    container.innerHTML = `<div class="diff-list">${itemsHtml || ''}</div>`;
  }

  function renderMergePage() {
    const els = getMergeEls();
    if (!els.status || !els.members || !els.actions || !els.techniques || !els.warnings) return;

    if (!pendingMerge) {
      els.status.textContent = translate('merge_hint');
      renderMergeList(els.members, '');
      renderMergeList(els.actions, '');
      renderMergeList(els.techniques, '');
      els.warnings.innerHTML = '';
      return;
    }

    const diff = pendingMerge.diff;
    const selection = pendingMerge.selection;

    els.status.textContent = pendingMerge.sourceLabel || '';
    if (els.forceDeps) els.forceDeps.checked = !!selection.forceDeps;

    const memberRows = [];
    diff.memberAdds.forEach(m => {
      const checked = selection.membersSelected[m.id] ? 'checked' : '';
      memberRows.push(`<div class="diff-item"><input type="checkbox" data-merge-member="${escapeHtml(m.id)}" ${checked} /><div><div class="diff-title">+ ${escapeHtml(m.label)}</div><div class="diff-meta">id: ${escapeHtml(m.id)}</div></div></div>`);
    });
    diff.memberLabelUpdates.forEach(m => {
      const checked = selection.membersSelected[m.id] ? 'checked' : '';
      memberRows.push(`<div class="diff-item"><input type="checkbox" data-merge-member="${escapeHtml(m.id)}" ${checked} /><div><div class="diff-title">~ ${escapeHtml(m.id)}</div><div class="diff-meta">${escapeHtml(m.from)} → ${escapeHtml(m.to)}</div></div></div>`);
    });
    if (!memberRows.length) memberRows.push(`<div class="hint">${escapeHtml('Aucun changement membre.')}</div>`);
    renderMergeList(els.members, memberRows.join(''));

    const actionRows = [];
    diff.actionAdds.forEach(item => {
      const key = `${item.partId}||${item.action}`;
      const checked = selection.actionsSelected[key] ? 'checked' : '';
      actionRows.push(`<div class="diff-item"><input type="checkbox" data-merge-action="${escapeHtml(key)}" ${checked} /><div><div class="diff-title">+ ${escapeHtml(item.action)}</div><div class="diff-meta">${escapeHtml(memberLabelById(item.partId))} (${escapeHtml(item.partId)})</div></div></div>`);
    });
    if (!actionRows.length) actionRows.push(`<div class="hint">${escapeHtml('Aucun ajout d\'action.')}</div>`);
    renderMergeList(els.actions, actionRows.join(''));

    const techRows = [];
    diff.techniqueAdds.forEach(t => {
      const checked = selection.techniquesSelected[t.name] ? 'checked' : '';
      techRows.push(`<div class="diff-item"><input type="checkbox" data-merge-technique="${escapeHtml(t.name)}" ${checked} /><div><div class="diff-title">+ ${escapeHtml(t.name)}</div><div class="diff-meta"></div></div></div>`);
    });
    diff.techniqueConflicts.forEach(t => {
      const checked = selection.techniquesSelected[t.name] ? 'checked' : '';
      techRows.push(`<div class="diff-item"><input type="checkbox" data-merge-technique="${escapeHtml(t.name)}" ${checked} /><div><div class="diff-title">! ${escapeHtml(t.name)}</div><div class="diff-meta">conflit → ${escapeHtml(t.targetName)}</div></div></div>`);
    });
    if (!techRows.length) techRows.push(`<div class="hint">${escapeHtml('Aucune technique à ajouter.')}</div>`);
    renderMergeList(els.techniques, techRows.join(''));

    const warnings = computeMergeWarnings(diff, selection);
    if (!warnings.length) {
      els.warnings.innerHTML = '<div class="hint">OK.</div>';
    } else {
      els.warnings.innerHTML = `<div class="warnings-list">${warnings.map(w => {
        const membersText = w.missingMembers && w.missingMembers.length ? `Membres manquants: ${w.missingMembers.map(escapeHtml).join(', ')}` : '';
        const actionsText = w.missingActions && w.missingActions.length ? `Actions manquantes: ${w.missingActions.map(escapeHtml).join(', ')}` : '';
        const parts = [membersText, actionsText].filter(Boolean).join(' | ');
        return `<div class="warning-item"><strong>${escapeHtml(w.technique)}</strong><div>${parts}</div></div>`;
      }).join('')}</div>`;
    }

    Array.from(document.querySelectorAll('[data-merge-member]')).forEach(cb => cb.addEventListener('change', () => {
      const id = cb.getAttribute('data-merge-member');
      selection.membersSelected[id] = cb.checked;
      renderMergePage();
    }));
    Array.from(document.querySelectorAll('[data-merge-action]')).forEach(cb => cb.addEventListener('change', () => {
      const key = cb.getAttribute('data-merge-action');
      selection.actionsSelected[key] = cb.checked;
      renderMergePage();
    }));
    Array.from(document.querySelectorAll('[data-merge-technique]')).forEach(cb => cb.addEventListener('change', () => {
      const key = cb.getAttribute('data-merge-technique');
      selection.techniquesSelected[key] = cb.checked;
      renderMergePage();
    }));
    if (els.forceDeps) els.forceDeps.addEventListener('change', () => {
      selection.forceDeps = !!els.forceDeps.checked;
      renderMergePage();
    });
  }

  function cancelPendingMerge() {
    pendingMerge = null;
    renderMergePage();
    showPage('techniquesPage');
    setStorageInfo('Fusion annulée.', false);
  }

  function ensureMemberExists(memberObj) {
    if (!memberObj || !memberObj.id) return;
    if (!members.some(m => m.id === memberObj.id)) members.push({ id: memberObj.id, label: memberObj.label || memberObj.id });
    if (!actionSets[memberObj.id]) actionSets[memberObj.id] = Array.isArray(defaultActionSets[memberObj.id]) ? [...defaultActionSets[memberObj.id]] : ['Neutre'];
    if (!actionSets[memberObj.id].includes('Neutre')) actionSets[memberObj.id].unshift('Neutre');
  }

  function ensureActionExists(partId, action) {
    if (!partId || !action || action === 'Neutre') return;
    if (!actionSets[partId]) actionSets[partId] = Array.isArray(defaultActionSets[partId]) ? [...defaultActionSets[partId]] : ['Neutre'];
    if (!actionSets[partId].includes(action)) actionSets[partId].push(action);
    if (!actionSets[partId].includes('Neutre')) actionSets[partId].unshift('Neutre');
    if (actionSets[partId][0] !== 'Neutre') {
      actionSets[partId] = actionSets[partId].filter(x => x !== 'Neutre');
      actionSets[partId].unshift('Neutre');
    }
  }

  async function applyPendingMerge() {
    const els = getMergeEls();
    if (!pendingMerge) return;
    const diff = pendingMerge.diff;
    const selection = pendingMerge.selection;

    const selectedMemberIds = Object.keys(selection.membersSelected).filter(id => selection.membersSelected[id]);
    selectedMemberIds.forEach(id => {
      const incoming = diff.incomingMembers.find(m => m && m.id === id);
      if (!incoming) return;
      const existing = members.find(m => m.id === id);
      if (!existing) members.push({ id, label: incoming.label || id });
      else existing.label = incoming.label || id;
      if (!actionSets[id]) actionSets[id] = Array.isArray(defaultActionSets[id]) ? [...defaultActionSets[id]] : ['Neutre'];
      actionSets[id] = mergeUniqueActions(actionSets[id], diff.incomingActionSets[id]);
    });

    Object.keys(selection.actionsSelected).forEach(key => {
      if (!selection.actionsSelected[key]) return;
      const [partId, action] = key.split('||');
      ensureMemberExists({ id: partId, label: memberLabelById(partId) });
      ensureActionExists(partId, action);
    });

    const selectedTechniques = Object.keys(selection.techniquesSelected).filter(name => selection.techniquesSelected[name]);
    selectedTechniques.forEach(name => {
      const tech = diff.incomingTechniques[name];
      if (!tech || typeof tech !== 'object') return;

      if (selection.forceDeps) {
        if (Array.isArray(tech.members)) tech.members.forEach(ensureMemberExists);
        if (Array.isArray(tech.steps)) {
          tech.steps.forEach(step => {
            if (!step || typeof step !== 'object') return;
            Object.keys(step).forEach(key => {
              if (key === 'comments' || key === 'commentaire') return;
              ensureMemberExists({ id: key, label: key });
              ensureActionExists(key, step[key]);
            });
          });
        }
      }

      if (!techniquesByName[name]) {
        techniquesByName[name] = tech;
        return;
      }
      const currentFingerprint = computeTechniqueFingerprint(techniquesByName[name]);
      const incomingFingerprint = computeTechniqueFingerprint(tech);
      if (currentFingerprint === incomingFingerprint) return;
      const target = suggestTechniqueImportName(name);
      techniquesByName[target] = tech;
    });

    pendingMerge = null;
    persistDatabaseLocalFallback();
    await initializeData(true);
    setFileDirty(true);
    if (els.status) els.status.textContent = '';
    setStorageInfo('Fusion effectuée. Pensez à sauvegarder la base JSON.', false);
    showPage('techniquesPage');
  }

  async function initializeData(rebuildTechniqueList = false) {
    const localDb = readDatabaseLocalFallback();
    if (localDb) applyDatabaseObject(localDb);
    renderBeltsList();
    renderBeltSelects();
    renderTableHeader();
    populateMemberSelects();
    renderMemberLibrary();
    if (!stepsBody.children.length) addStep(); else rebuildAllSelects();
    if (rebuildTechniqueList) await refreshTechniqueList(getTechniqueName());
    refreshVisuals();
    applyResponsiveMode();
    updateDatabasePreview();
  }

  function rebuildAllSelects() {
    const snapshot = getRowsData();
    renderTableHeader();
    populateMemberSelects();
    renderMemberLibrary();
    stepsBody.innerHTML = '';
    if (snapshot.length) snapshot.forEach(step => addStep(step)); else addStep();
  }

  function bindCollapsibleCard(cardId, storageKey) {
    const card = document.getElementById(cardId);
    if (!card) return;
    const header = card.querySelector('.collapsible-header');
    if (!header) return;
    const indicator = header.querySelector('.collapse-indicator');

    const applyState = collapsed => {
      card.classList.toggle('collapsed', collapsed);
      if (indicator) indicator.textContent = collapsed ? 'Afficher' : 'Replier';
    };

    const collapsed = sessionStorage.getItem(storageKey) === '1';
    applyState(collapsed);

    header.addEventListener('click', () => {
      const isCollapsed = sessionStorage.getItem(storageKey) === '1';
      sessionStorage.setItem(storageKey, isCollapsed ? '0' : '1');
      applyState(!isCollapsed);
    });
  }

  Array.from(document.querySelectorAll('.nav-btn')).forEach(btn => btn.addEventListener('click', () => {
    const pageId = btn.getAttribute('data-page');
    if (pageId) showPage(pageId);
  }));

  const openDatabaseBtn = $('openDatabaseBtn');
  if (openDatabaseBtn) openDatabaseBtn.addEventListener('click', openDatabase);

  const loadDatabaseUrlBtn = $('loadDatabaseUrlBtn');
  if (loadDatabaseUrlBtn) loadDatabaseUrlBtn.addEventListener('click', loadDatabaseFromUrl);

  const mergeDatabaseBtn = $('mergeDatabaseBtn');
  if (mergeDatabaseBtn) mergeDatabaseBtn.addEventListener('click', mergeDatabase);

  const applyMergeBtn = document.getElementById('applyMergeBtn');
  if (applyMergeBtn) applyMergeBtn.addEventListener('click', applyPendingMerge);

  const cancelMergeBtn = document.getElementById('cancelMergeBtn');
  if (cancelMergeBtn) cancelMergeBtn.addEventListener('click', cancelPendingMerge);

  const openDatabaseFile = document.getElementById('openDatabaseFile');
  if (openDatabaseFile) openDatabaseFile.addEventListener('change', async event => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    try { await openDatabaseFromFileInput(file); }
    catch (error) { console.error(error); setStorageInfo('Le fichier JSON est invalide.', true); }
    event.target.value = '';
  });

  const mergeDatabaseFile = document.getElementById('mergeDatabaseFile');
  if (mergeDatabaseFile) mergeDatabaseFile.addEventListener('change', async event => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    try { await mergeDatabaseFromFileInput(file); }
    catch (error) { console.error(error); setStorageInfo('Le fichier JSON est invalide.', true); }
    event.target.value = '';
  });

  const startupOpenDbBtn = document.getElementById('startupOpenDbBtn');
  if (startupOpenDbBtn) startupOpenDbBtn.addEventListener('click', openDatabase);

  const startupContinueLocalBtn = document.getElementById('startupContinueLocalBtn');
  if (startupContinueLocalBtn) startupContinueLocalBtn.addEventListener('click', () => {
    hideStartupModal();
    setStorageInfo('Mode local navigateur. Vous pourrez ouvrir un fichier JSON plus tard.', false);
  });

  const newTechniqueBtn = $('newTechniqueBtn');
  if (newTechniqueBtn) newTechniqueBtn.addEventListener('click', () => {
    const techniqueSelect = $('techniqueName');
    if (techniqueSelect) {
      techniqueSelect.value = '';
      techniqueSelect.title = '';
    }
    applyTechniqueData({});
    setStorageInfo('Nouvelle technique.', false);
  });

  const deleteTechniqueBtn = $('deleteTechniqueBtn');
  if (deleteTechniqueBtn) deleteTechniqueBtn.addEventListener('click', async () => {
    const name = getTechniqueName();
    if (!name) return setStorageInfo('Sélectionnez une technique à supprimer.', true);
    if (!window.confirm(`Supprimer la technique « ${name} » ?`)) return;
    const all = await readStoredTechniques();
    delete all[name];
    await writeStoredTechniques(all);
    await refreshTechniqueList('');
    applyTechniqueData({});
    setStorageInfo(`Technique supprimée : ${name}`, false);
  });

  const saveTechniqueBtn = $('saveTechniqueBtn');
  if (saveTechniqueBtn) saveTechniqueBtn.addEventListener('click', saveTechnique);

  const saveDatabaseBtn = $('saveDatabaseBtn');
  if (saveDatabaseBtn) saveDatabaseBtn.addEventListener('click', saveDatabase);

  const saveAsDatabaseBtn = $('saveAsDatabaseBtn');
  if (saveAsDatabaseBtn) saveAsDatabaseBtn.addEventListener('click', saveDatabaseAs);

  const techniqueSelect = $('techniqueName');
  if (techniqueSelect) techniqueSelect.addEventListener('change', loadTechnique);

  const titleInput = $('title');
  if (titleInput) titleInput.addEventListener('input', markFileDirty);
  const initialStateInput = $('initialState');
  if (initialStateInput) initialStateInput.addEventListener('input', markFileDirty);
  const finalStateInput = $('finalState');
  if (finalStateInput) finalStateInput.addEventListener('input', markFileDirty);
  const attentionPointsInput = $('attentionPoints');
  if (attentionPointsInput) attentionPointsInput.addEventListener('input', markFileDirty);

  const addStepBtn = $('addStepBtn');
  if (addStepBtn) addStepBtn.addEventListener('click', () => addStep());

  const tableViewBtn = $('tableViewBtn');
  if (tableViewBtn && tableWrap && ganttWrap) tableViewBtn.addEventListener('click', () => { tableWrap.classList.add('active'); ganttWrap.classList.remove('active'); });

  const ganttViewBtn = $('ganttViewBtn');
  if (ganttViewBtn && tableWrap && ganttWrap) ganttViewBtn.addEventListener('click', () => { renderGanttView(); ganttWrap.classList.add('active'); tableWrap.classList.remove('active'); });

  const mobileStepsViewBtn = $('mobileStepsViewBtn');
  if (mobileStepsViewBtn && mobileStepsWrap && mobileGanttWrap) mobileStepsViewBtn.addEventListener('click', () => { renderMobileView(); mobileStepsWrap.classList.add('active'); mobileGanttWrap.classList.remove('active'); });

  const mobileGanttViewBtn = $('mobileGanttViewBtn');
  if (mobileGanttViewBtn && mobileStepsWrap && mobileGanttWrap) mobileGanttViewBtn.addEventListener('click', () => { renderMobileGanttView(); mobileGanttWrap.classList.add('active'); mobileStepsWrap.classList.remove('active'); });

  const memberSelect = $('memberSelect');
  if (memberSelect) memberSelect.addEventListener('change', () => { const id = memberSelect.value; const actionPartSelect = $('actionPartSelect'); if (actionPartSelect) actionPartSelect.value = id; refreshExistingActions(); });

  const addMemberBtn = $('addMemberBtn');
  if (addMemberBtn) addMemberBtn.addEventListener('click', addMember);

  const renameMemberBtn = $('renameMemberBtn');
  if (renameMemberBtn) renameMemberBtn.addEventListener('click', () => renameMember());

  const deleteMemberBtn = $('deleteMemberBtn');
  if (deleteMemberBtn) deleteMemberBtn.addEventListener('click', () => deleteMember());

  const actionPartSelect = $('actionPartSelect');
  if (actionPartSelect) actionPartSelect.addEventListener('change', refreshExistingActions);

  const addActionBtn = $('addActionBtn');
  if (addActionBtn) addActionBtn.addEventListener('click', addCustomAction);

  const newActionInput = $('newActionInput');
  if (newActionInput) newActionInput.addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); addCustomAction(); } });

  const renameActionBtn = $('renameActionBtn');
  if (renameActionBtn) renameActionBtn.addEventListener('click', () => renameAction());

  const deleteActionBtn = $('deleteActionBtn');
  if (deleteActionBtn) deleteActionBtn.addEventListener('click', () => deleteAction());

  const exportConfigBtn = $('exportConfigBtn');
  if (exportConfigBtn) exportConfigBtn.addEventListener('click', exportActionsJson);

  const importConfigBtn = $('importConfigBtn');
  if (importConfigBtn && importActionsFile) importConfigBtn.addEventListener('click', () => importActionsFile.click());
  if (importActionsFile) importActionsFile.addEventListener('change', event => { const file = event.target.files && event.target.files[0]; if (file) importActionsJsonFromFile(file); event.target.value = ''; });

  bindCollapsibleCard('memberListCard', 'memberListCollapsed');
  bindCollapsibleCard('generalInfoCard', 'generalInfoCollapsed');

  window.addEventListener('resize', applyResponsiveMode);
  const themeSelect = $('themeSelect');
  if (themeSelect) themeSelect.addEventListener('change', () => applyTheme(themeSelect.value));

  const languageSelect = document.getElementById('languageSelect');
  if (languageSelect) languageSelect.addEventListener('change', () => applyLanguage(languageSelect.value));

  const hoverCommentsToggle = document.getElementById('hoverCommentsToggle');
  if (hoverCommentsToggle) hoverCommentsToggle.addEventListener('change', () => applyHoverComments(hoverCommentsToggle.checked));

  const manualActionsToggle = document.getElementById('manualActionsToggle');
  if (manualActionsToggle) manualActionsToggle.addEventListener('change', () => applyManualActions(manualActionsToggle.checked));

  const expertModeToggle = document.getElementById('expertModeToggle');
  if (expertModeToggle) expertModeToggle.addEventListener('change', () => applyExpertMode(expertModeToggle.checked));

  const addBeltBtn = document.getElementById('addBeltBtn');
  if (addBeltBtn) addBeltBtn.addEventListener('click', async () => {
    const input = document.getElementById('newBeltInput');
    const raw = input ? input.value : '';
    const label = String(raw || '').trim();
    if (!label) return;
    const next = normalizeBeltsList([...(belts || []), label]);
    applyBelts(next);
    if (input) input.value = '';
    persistDatabaseLocalFallback();
    if (dbFileHandle) {
      try { await writeDatabaseToHandle(dbFileHandle); } catch (error) { console.error(error); }
    }
    markFileDirty();
  });

  const beltSelect = document.getElementById('beltSelect');
  if (beltSelect) beltSelect.addEventListener('change', () => { markFileDirty(); });

  const beltFilterSelect = document.getElementById('beltFilterSelect');
  if (beltFilterSelect) beltFilterSelect.addEventListener('change', async () => {
    beltFilterValue = beltFilterSelect.value || '';
    await refreshTechniqueList(getTechniqueName());
  });

  (async function init() {
    loadTheme();
    loadLanguage();
    loadHoverComments();
    loadManualActions();
    loadExpertMode();
    dbFileHandle = await loadDbFileHandle();
    if (dbFileHandle && dbFileHandle.queryPermission) {
      try {
        const permission = await dbFileHandle.queryPermission({ mode: 'readwrite' });
        if (permission !== 'granted') dbFileHandle = null;
      } catch {
        dbFileHandle = null;
      }
    }
    if (dbFileHandle) {
      try {
        const parsed = await readDatabaseFromHandle(dbFileHandle);
        applyDatabaseObject(parsed);
        currentDbName = dbFileHandle.name || '';
        setCurrentFileLabel(currentDbName || 'Base liée');
      } catch (error) {
        console.error(error);
        dbFileHandle = null;
      }
    }

    let wasAutoLoaded = false;

    if (!dbFileHandle) {
      const loaded = await tryLoadDatabaseFromUrlOnStartup();
      if (loaded) wasAutoLoaded = true;
    }

    if (!wasAutoLoaded) await initializeData(true);
    showPage('techniquesPage');
    if (dbFileHandle) {
      setStorageInfo('Application prête. Base JSON fichier liée.', false);
    } else if (!wasAutoLoaded) {
      setStorageInfo('Application prête. Aucun fichier JSON lié, utilisation des données du navigateur.', false);
    }
    if (!dbFileHandle && !wasAutoLoaded) showStartupModal();
    setActionsInfo('Bibliothèque d’actions prête.', false);
    setMembersInfo('Gestion des membres prête.', false);
  })();
})();
