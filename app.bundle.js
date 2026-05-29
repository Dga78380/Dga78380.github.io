(() => {
  // src/constants.js
  var DB_STORAGE_KEY = "krav_notes_database_v1";
  var THEME_STORAGE_KEY = "krav_notes_theme_v1";
  var LANGUAGE_STORAGE_KEY = "krav_notes_language_v1";
  var HOVER_COMMENTS_STORAGE_KEY = "krav_notes_hover_comments_v1";
  var MANUAL_ACTIONS_STORAGE_KEY = "krav_manual_actions";
  var EXPERT_MODE_STORAGE_KEY = "krav_expert_mode_v1";
  var STORAGE_MODE_KEY = "krav_storage_mode_v1";
  var LOCAL_FILE_MISSING_ACK_KEY = "krav_local_file_missing_ack_v1";
  var DEFAULT_DB_FILENAME = "krav-notes-db.json";
  var HANDLE_DB_NAME = "self_defense_fs_db";
  var HANDLE_STORE_NAME = "handles";
  var DB_HANDLE_KEY = "krav_notes_db_file_handle";

  // src/defaults.js
  var defaultMembers = [
    { id: "tete", label: "T\xEAte" },
    { id: "menton", label: "Menton" },
    { id: "coude_droit", label: "Coude droit" },
    { id: "coude_gauche", label: "Coude gauche" },
    { id: "main_droite", label: "Main droite" },
    { id: "main_gauche", label: "Main gauche" },
    { id: "hanche_droite", label: "Hanche droite" },
    { id: "hanche_gauche", label: "Hanche gauche" },
    { id: "genou_droit", label: "Genou droit" },
    { id: "genou_gauche", label: "Genou gauche" },
    { id: "pied_droit", label: "Pied droit" },
    { id: "pied_gauche", label: "Pied gauche" }
  ];
  var defaultActionSets = {
    tete: ["Neutre", "Regarder l'adversaire", "Rentrer la t\xEAte", "Tourner \xE0 droite", "Tourner \xE0 gauche", "Esquive droite", "Esquive gauche", "Pencher en avant", "Pencher en arri\xE8re", "Casser l'axe", "Protection haute"],
    menton: ["Neutre", "Rentr\xE9", "Descendu", "Prot\xE9g\xE9 derri\xE8re l'\xE9paule", "Align\xE9 pour frappe", "Coll\xE9 \xE0 la poitrine", "Relev\xE9 bri\xE8vement", "Masqu\xE9"],
    coude_droit: ["Neutre", "Coll\xE9 au corps", "Lev\xE9 garde haute", "Coude vers l'avant", "Coude vers l'ext\xE9rieur", "Coude circulaire", "Coup de coude avant", "Coup de coude descendant", "Coup de coude arri\xE8re", "Blocage int\xE9rieur", "Blocage ext\xE9rieur", "Contr\xF4le bras adverse"],
    coude_gauche: ["Neutre", "Coll\xE9 au corps", "Lev\xE9 garde haute", "Coude vers l'avant", "Coude vers l'ext\xE9rieur", "Coude circulaire", "Coup de coude avant", "Coup de coude descendant", "Coup de coude arri\xE8re", "Blocage int\xE9rieur", "Blocage ext\xE9rieur", "Contr\xF4le bras adverse"],
    main_droite: ["Neutre", "Garde visage", "Paume ouverte", "Poing ferm\xE9", "Saisie poignet adverse", "Saisie v\xEAtement", "Pouss\xE9e paume", "Parade int\xE9rieure", "Parade ext\xE9rieure", "D\xE9gagement", "Frappe directe", "Frappe marteau", "Uppercut", "Contr\xF4le t\xEAte adverse", "Contr\xF4le cou", "Protection bassin"],
    main_gauche: ["Neutre", "Garde visage", "Paume ouverte", "Poing ferm\xE9", "Saisie poignet adverse", "Saisie v\xEAtement", "Pouss\xE9e paume", "Parade int\xE9rieure", "Parade ext\xE9rieure", "D\xE9gagement", "Frappe directe", "Frappe marteau", "Uppercut", "Contr\xF4le t\xEAte adverse", "Contr\xF4le cou", "Protection bassin"],
    hanche_droite: ["Neutre", "Engagement vers l'avant", "Rotation interne", "Rotation externe", "Pivot droite", "Pivot gauche", "Abaissement centre de gravit\xE9", "Projection du poids", "Retrait", "Ouverture d'angle"],
    hanche_gauche: ["Neutre", "Engagement vers l'avant", "Rotation interne", "Rotation externe", "Pivot droite", "Pivot gauche", "Abaissement centre de gravit\xE9", "Projection du poids", "Retrait", "Ouverture d'angle"],
    genou_droit: ["Neutre", "Fl\xE9chi", "Ancr\xE9", "Mont\xE9e de genou", "Genou d\xE9fensif", "Genou vers cible", "Appui avant", "Appui arri\xE8re", "Pr\xE9paration balayage", "D\xE9placement lat\xE9ral"],
    genou_gauche: ["Neutre", "Fl\xE9chi", "Ancr\xE9", "Mont\xE9e de genou", "Genou d\xE9fensif", "Genou vers cible", "Appui avant", "Appui arri\xE8re", "Pr\xE9paration balayage", "D\xE9placement lat\xE9ral"],
    pied_droit: ["Neutre", "Ancr\xE9 au sol", "Pas avant", "Pas arri\xE8re", "Pas lat\xE9ral droit", "Pas diagonal", "Pivot sur place", "Recul de s\xE9curit\xE9", "Balayage", "Coup de pied bas", "Appui pointe", "Ouverture d'angle"],
    pied_gauche: ["Neutre", "Ancr\xE9 au sol", "Pas avant", "Pas arri\xE8re", "Pas lat\xE9ral gauche", "Pas diagonal", "Pivot sur place", "Recul de s\xE9curit\xE9", "Balayage", "Coup de pied bas", "Appui pointe", "Ouverture d'angle"]
  };

  // src/i18n.js
  var TRANSLATIONS = {
    fr: {
      startup_title: "Choisir une base JSON",
      startup_hint: "S\xE9lectionne le fichier JSON \xE0 utiliser pour charger et sauvegarder tes techniques, membres et actions.",
      startup_open: "Ouvrir la base JSON",
      startup_continue: "Continuer sans fichier",
      app_title: "Krav Notes",
      app_subtitle: "Notation de techniques de self-d\xE9fense avec base JSON unique.",
      btn_open_db: "Ouvrir la base JSON",
      btn_load_db_url: "Charger depuis GitHub",
      btn_merge_db: "Fusionner une base JSON",
      expert_mode: "Mode expert",
      storage_local: "Local",
      storage_cloud: "Cloud",
      btn_save: "Sauvegarder",
      btn_save_as: "Sauvegarder sous",
      nav_techniques: "Techniques",
      nav_actions: "Gestion des actions",
      nav_members: "Gestion des membres",
      nav_merge: "Fusion JSON",
      nav_documentation: "Documentation",
      nav_settings: "R\xE9glages",
      current_file: "Fichier courant :",
      status: "\xC9tat :",
      merge_title: "Fusion de base JSON",
      merge_hint: "Importe une base JSON, v\xE9rifie les diff\xE9rences puis choisis quoi fusionner.",
      merge_warnings: "Avertissements",
      merge_force_deps: "Autoriser l'ajout automatique des d\xE9pendances manquantes (membres/actions) lors de la fusion.",
      merge_members: "Membres",
      merge_actions: "Actions",
      merge_techniques: "Techniques",
      btn_apply_merge: "Appliquer la fusion",
      btn_cancel_merge: "Annuler",
      technique: "Technique",
      technique_procedure: "Proc\xE9dure technique",
      btn_new: "Nouvelle",
      btn_save_browser: "Sauvegarder (navigateur)",
      btn_delete: "Supprimer",
      btn_export_json: "Exporter JSON",
      btn_import_json: "Importer JSON",
      general_info: "Informations g\xE9n\xE9rales",
      title: "Titre",
      initial_state: "\xC9tat initial",
      final_state: "\xC9tat final",
      attention_points: "Points d'attention",
      steps: "\xC9tapes",
      btn_add_step: "Ajouter une \xE9tape",
      btn_duplicate_last: "Dupliquer la derni\xE8re",
      btn_table_view: "Vue Modification",
      btn_gantt_view: "Vue Lecture",
      hint_right_click: "Clic droit sur une case pour afficher ou masquer le commentaire libre.",
      hover_comments_toggle: "Commentaires au survol",
      manual_actions_toggle: "Ajout action",
      belt: "Ceinture",
      belt_filter: "Filtre ceinture",
      belts_management: "Gestion des ceintures",
      ph_new_belt: "Ex: Jaune",
      actions_management: "Gestion des actions",
      member_concerned: "Membre concern\xE9",
      new_action: "Nouvelle action",
      btn_add: "Ajouter",
      btn_rename: "Renommer",
      member_actions: "Actions du membre",
      btn_export_config: "Exporter config JSON",
      btn_import_config: "Importer config JSON",
      action_library: "Biblioth\xE8que d\u2019actions",
      members_management: "Gestion des membres",
      member: "Membre",
      new_member: "Nouveau membre",
      members_list: "Liste des membres",
      settings: "R\xE9glages",
      language: "Langue",
      theme: "Th\xE8me",
      theme_light: "Clair",
      theme_dark: "Sombre",
      settings_hint: "Le fichier JSON unique contient les techniques, les membres, les actions et la configuration.",
      full_database: "Base JSON compl\xE8te",
      btn_restore_backup: "Restaurer la derni\xE8re sauvegarde",
      backup_hint: "Des sauvegardes automatiques de la base sont conserv\xE9es dans le navigateur (IndexedDB).",
      voice_dictate: "Dicter",
      voice_command: "Dict\xE9e mouvement",
      voice_read: "Lire",
      voice_listening: "\xC9coute en cours\u2026",
      voice_stop: "Arr\xEAter",
      voice_help: "Dites \xAB membre puis action \xBB, ou \xAB nouvelle \xE9tape \xBB.",
      voice_step: "\xC9tape",
      voice_new_step: "Nouvelle \xE9tape",
      voice_no_member: "Membre non reconnu.",
      voice_no_action: "action non reconnue.",
      voice_nothing: "Rien \xE0 lire pour le moment.",
      voice_denied: "Acc\xE8s au micro refus\xE9.",
      documentation: "Documentation",
      documentation_body: `<h3>Principe g\xE9n\xE9ral</h3><p>L'application fonctionne avec une base JSON unique (fichier) et un mode local navigateur.</p><h3>Utilisation sur smartphone hors-ligne (sans r\xE9seau)</h3><p>Sur Android, ouvrir <em>index.html</em> depuis Google Drive (aper\xE7u) ne charge souvent pas <em>styles.css</em> / <em>app.js</em> et les boutons ne fonctionnent pas.</p><p>Pour un usage hors-ligne fiable, ouvre le dossier via un <strong>serveur HTTP local sur le t\xE9l\xE9phone</strong> (ex: une appli "Simple HTTP Server" / "Web Server") ou un \xE9diteur (ex: Acode/Spck) qui fournit une URL <code>http://localhost</code>. Ensuite, ouvre cette URL dans Chrome.</p><h3>Ouverture / sauvegarde de la base</h3><p><strong>Ouvrir la base JSON</strong> : s\xE9lectionne un fichier .json (File System Access API si dispo). La base devient le fichier courant.</p><p><strong>Sauvegarder</strong> : \xE9crit toutes les donn\xE9es (techniques, membres, actions, r\xE9glages) dans le fichier courant. Le bouton devient rouge lorsqu'il existe des modifications non enregistr\xE9es.</p><p><strong>Sauvegarder sous</strong> : enregistre dans un nouveau fichier (ou t\xE9l\xE9charge si l'API n'est pas dispo).</p><h3>Page Techniques</h3><p><strong>Nouvelle</strong> : d\xE9marre une technique vide (ne remplace pas une technique existante).</p><p><strong>Sauvegarder (navigateur)</strong> : enregistre uniquement la technique courante dans le stockage navigateur (utile pour travailler sans toucher au fichier complet).</p><p><strong>Supprimer</strong> : supprime la technique s\xE9lectionn\xE9e du stockage navigateur.</p><p><strong>Exporter JSON</strong> : exporte la technique courante en fichier .json.</p><p><strong>Importer JSON</strong> : importe une technique depuis un fichier .json dans l'\xE9diteur.</p><h3>\xC9tapes / tableau</h3><p><strong>Ajouter une \xE9tape</strong> : ajoute une ligne.</p><p><strong>Dupliquer la derni\xE8re</strong> : duplique la derni\xE8re ligne.</p><p><strong>Vue Modification / Vue Lecture</strong> : change l'affichage. En mobile, utilise les boutons d\xE9di\xE9s.</p><p><strong>Commentaires au survol</strong> : active/d\xE9sactive l'affichage automatique des commentaires libres au survol.</p><p><strong>Clic droit</strong> sur une case : affiche/masque le commentaire inline.</p><h3>Gestion des actions</h3><p>Permet d'ajouter / renommer des actions disponibles pour chaque membre (membres = parties du corps).</p><h3>Gestion des membres</h3><p>Permet de cr\xE9er / renommer / supprimer des membres. Les actions sont organis\xE9es par membre.</p><h3>R\xE9glages</h3><p><strong>Langue</strong> : change l'interface (FR/EN/DE).</p><p><strong>Th\xE8me</strong> : clair / sombre.</p><p><em>Note :</em> pense \xE0 sauvegarder la base (bouton en haut) pour enregistrer tes changements dans le fichier JSON.</p>`,
      show: "Afficher",
      collapse: "Replier",
      ph_title: "D\xE9fense sur saisie poignet + contre",
      ph_initial_state: "Position de d\xE9part, distance, saisie...",
      ph_final_state: "Position finale, contr\xF4le, fuite...",
      ph_attention_points: "S\xE9curit\xE9, angle, respiration...",
      ph_new_action: "Contr\xF4le poignet bas",
      ph_new_member: "Avant-bras droit"
    },
    en: {
      startup_title: "Choose a JSON database",
      startup_hint: "Select the JSON file to load and save your techniques, members and actions.",
      startup_open: "Open JSON database",
      startup_continue: "Continue without file",
      app_title: "Krav Notes",
      app_subtitle: "Self-defense technique notes with a single JSON database.",
      btn_open_db: "Open JSON database",
      btn_load_db_url: "Load from URL",
      btn_merge_db: "Merge JSON database",
      expert_mode: "Expert mode",
      storage_local: "Local",
      storage_cloud: "Cloud",
      btn_save: "Save",
      btn_save_as: "Save as",
      nav_techniques: "Techniques",
      nav_actions: "Action management",
      nav_members: "Member management",
      nav_merge: "JSON merge",
      nav_documentation: "Documentation",
      nav_settings: "Settings",
      current_file: "Current file:",
      status: "Status:",
      merge_title: "JSON database merge",
      merge_hint: "Import a JSON database, review differences, then choose what to merge.",
      merge_warnings: "Warnings",
      merge_force_deps: "Allow automatic addition of missing dependencies (members/actions) during merge.",
      merge_members: "Members",
      merge_actions: "Actions",
      merge_techniques: "Techniques",
      btn_apply_merge: "Apply merge",
      btn_cancel_merge: "Cancel",
      technique: "Technique",
      technique_procedure: "Technique procedure",
      btn_new: "New",
      btn_save_browser: "Save (browser)",
      btn_delete: "Delete",
      btn_export_json: "Export JSON",
      btn_import_json: "Import JSON",
      general_info: "General information",
      title: "Title",
      initial_state: "Initial state",
      final_state: "Final state",
      attention_points: "Attention points",
      steps: "Steps",
      btn_add_step: "Add a step",
      btn_duplicate_last: "Duplicate last",
      btn_table_view: "Edit view",
      btn_gantt_view: "Read view",
      hint_right_click: "Right click a cell to show/hide the inline comment.",
      hover_comments_toggle: "Comments on hover",
      manual_actions_toggle: "Add action",
      belt: "Belt",
      belt_filter: "Belt filter",
      belts_management: "Belts management",
      ph_new_belt: "Ex: Yellow",
      actions_management: "Action management",
      member_concerned: "Target member",
      new_action: "New action",
      btn_add: "Add",
      btn_rename: "Rename",
      member_actions: "Member actions",
      btn_export_config: "Export config JSON",
      btn_import_config: "Import config JSON",
      action_library: "Action library",
      members_management: "Member management",
      member: "Member",
      new_member: "New member",
      members_list: "Members list",
      settings: "Settings",
      language: "Language",
      theme: "Theme",
      theme_light: "Light",
      theme_dark: "Dark",
      settings_hint: "The single JSON file contains techniques, members, actions and configuration.",
      full_database: "Full JSON database",
      btn_restore_backup: "Restore latest backup",
      backup_hint: "Automatic backups of the database are kept in the browser (IndexedDB).",
      voice_dictate: "Dictate",
      voice_command: "Voice input",
      voice_read: "Read aloud",
      voice_listening: "Listening\u2026",
      voice_stop: "Stop",
      voice_help: 'Say "member then action", or "new step".',
      voice_step: "Step",
      voice_new_step: "New step",
      voice_no_member: "Member not recognized.",
      voice_no_action: "action not recognized.",
      voice_nothing: "Nothing to read yet.",
      voice_denied: "Microphone access denied.",
      documentation: "Documentation",
      documentation_body: '<h3>General idea</h3><p>The app works with a single JSON database file and a local browser mode.</p><h3>Offline use on a phone (no network)</h3><p>On Android, opening <em>index.html</em> from Google Drive preview often fails to load <em>styles.css</em> / <em>app.js</em>, so buttons do not work.</p><p>For reliable offline usage, open the folder through a <strong>local HTTP server on the phone</strong> (e.g. a "Simple HTTP Server" / "Web Server" app) or an editor (e.g. Acode/Spck) that provides a <code>http://localhost</code> URL. Then open that URL in Chrome.</p><h3>Open / save the database</h3><p><strong>Open JSON database</strong>: pick a .json file (File System Access API when available). It becomes the current file.</p><p><strong>Save</strong>: writes all data (techniques, members, actions, settings) to the current file. The button turns red when there are unsaved changes.</p><p><strong>Save as</strong>: saves to a new file (or downloads if the API is not available).</p><h3>Techniques page</h3><p><strong>New</strong>: starts an empty technique (does not overwrite an existing one).</p><p><strong>Save (browser)</strong>: saves only the current technique to browser storage (useful to work without rewriting the full file).</p><p><strong>Delete</strong>: deletes the selected technique from browser storage.</p><p><strong>Export JSON</strong>: exports the current technique to a .json file.</p><p><strong>Import JSON</strong>: imports a technique from a .json file into the editor.</p><h3>Steps / table</h3><p><strong>Add a step</strong>: adds a row.</p><p><strong>Duplicate last</strong>: duplicates the last row.</p><p><strong>Edit view / Read view</strong>: switches the display. On mobile, use the dedicated buttons.</p><p><strong>Comments on hover</strong>: enables/disables automatic display of free comments on hover.</p><p><strong>Right click</strong> on a cell: shows/hides the inline comment.</p><h3>Action management</h3><p>Add / rename actions available for each member (members = body parts).</p><h3>Member management</h3><p>Create / rename / delete members. Actions are organized per member.</p><h3>Settings</h3><p><strong>Language</strong>: switches UI language (FR/EN/DE).</p><p><strong>Theme</strong>: light / dark.</p><p><em>Note:</em> remember to save the database (top button) to persist changes to the JSON file.</p>',
      show: "Show",
      collapse: "Collapse",
      ph_title: "Defense against wrist grab + counter",
      ph_initial_state: "Starting position, distance, grab...",
      ph_final_state: "Final position, control, escape...",
      ph_attention_points: "Safety, angle, breathing...",
      ph_new_action: "Low wrist control",
      ph_new_member: "Right forearm"
    },
    de: {
      startup_title: "JSON-Datenbank ausw\xE4hlen",
      startup_hint: "W\xE4hle die JSON-Datei, um Techniken, Mitglieder und Aktionen zu laden und zu speichern.",
      startup_open: "JSON-Datenbank \xF6ffnen",
      startup_continue: "Ohne Datei fortfahren",
      app_title: "Krav Notes",
      app_subtitle: "Notizen zu Selbstverteidigungstechniken mit einer einzigen JSON-Datenbank.",
      btn_open_db: "JSON-Datenbank \xF6ffnen",
      btn_load_db_url: "Von URL laden",
      btn_merge_db: "JSON-Datenbank zusammenf\xFChren",
      expert_mode: "Expertenmodus",
      storage_local: "Lokal",
      storage_cloud: "Cloud",
      btn_save: "Speichern",
      btn_save_as: "Speichern unter",
      nav_techniques: "Techniken",
      nav_actions: "Aktionsverwaltung",
      nav_members: "Mitgliederverwaltung",
      nav_merge: "JSON-Zusammenf\xFChrung",
      nav_documentation: "Dokumentation",
      nav_settings: "Einstellungen",
      current_file: "Aktuelle Datei:",
      status: "Status:",
      merge_title: "JSON-Datenbank zusammenf\xFChren",
      merge_hint: "Importiere eine JSON-Datenbank, pr\xFCfe die Unterschiede und w\xE4hle aus, was zusammengef\xFChrt werden soll.",
      merge_warnings: "Warnungen",
      merge_force_deps: "Automatisches Hinzuf\xFCgen fehlender Abh\xE4ngigkeiten (Mitglieder/Aktionen) bei der Zusammenf\xFChrung erlauben.",
      merge_members: "Mitglieder",
      merge_actions: "Aktionen",
      merge_techniques: "Techniken",
      btn_apply_merge: "Zusammenf\xFChrung anwenden",
      btn_cancel_merge: "Abbrechen",
      technique: "Technik",
      technique_procedure: "Technikablauf",
      btn_new: "Neu",
      btn_save_browser: "Speichern (Browser)",
      btn_delete: "L\xF6schen",
      btn_export_json: "JSON exportieren",
      btn_import_json: "JSON importieren",
      general_info: "Allgemeine Informationen",
      title: "Titel",
      initial_state: "Ausgangslage",
      final_state: "Endlage",
      attention_points: "Wichtige Hinweise",
      steps: "Schritte",
      btn_add_step: "Schritt hinzuf\xFCgen",
      btn_duplicate_last: "Letzten duplizieren",
      btn_table_view: "Bearbeitungsansicht",
      btn_gantt_view: "Leseansicht",
      hint_right_click: "Rechtsklick auf eine Zelle, um den Kommentar ein-/auszublenden.",
      hover_comments_toggle: "Kommentare beim \xDCberfahren",
      manual_actions_toggle: "Aktion hinzuf\xFCgen",
      belt: "G\xFCrtel",
      belt_filter: "G\xFCrtel-Filter",
      belts_management: "G\xFCrtelverwaltung",
      ph_new_belt: "Bsp: Gelb",
      actions_management: "Aktionsverwaltung",
      member_concerned: "Betroffenes Mitglied",
      new_action: "Neue Aktion",
      btn_add: "Hinzuf\xFCgen",
      btn_rename: "Umbenennen",
      member_actions: "Aktionen des Mitglieds",
      btn_export_config: "Konfig-JSON exportieren",
      btn_import_config: "Konfig-JSON importieren",
      action_library: "Aktionsbibliothek",
      members_management: "Mitgliederverwaltung",
      member: "Mitglied",
      new_member: "Neues Mitglied",
      members_list: "Mitgliederliste",
      settings: "Einstellungen",
      language: "Sprache",
      theme: "Design",
      theme_light: "Hell",
      theme_dark: "Dunkel",
      settings_hint: "Die einzelne JSON-Datei enth\xE4lt Techniken, Mitglieder, Aktionen und Konfiguration.",
      full_database: "Vollst\xE4ndige JSON-Datenbank",
      btn_restore_backup: "Letzte Sicherung wiederherstellen",
      backup_hint: "Automatische Sicherungen der Datenbank werden im Browser gespeichert (IndexedDB).",
      voice_dictate: "Diktieren",
      voice_command: "Sprachbefehl",
      voice_read: "Vorlesen",
      voice_listening: "H\xF6re zu\u2026",
      voice_stop: "Stopp",
      voice_help: 'Sage "Glied dann Aktion" oder "neue Etappe".',
      voice_step: "Schritt",
      voice_new_step: "Neuer Schritt",
      voice_no_member: "Glied nicht erkannt.",
      voice_no_action: "Aktion nicht erkannt.",
      voice_nothing: "Nichts zum Vorlesen.",
      voice_denied: "Mikrofonzugriff verweigert.",
      documentation: "Dokumentation",
      documentation_body: '<h3>Grundprinzip</h3><p>Die App arbeitet mit einer einzigen JSON-Datenbankdatei sowie einem lokalen Browser-Modus.</p><h3>Offline-Nutzung am Smartphone (ohne Netzwerk)</h3><p>Auf Android l\xE4dt das \xD6ffnen von <em>index.html</em> in der Google-Drive-Vorschau oft <em>styles.css</em> / <em>app.js</em> nicht, dadurch funktionieren Buttons nicht.</p><p>F\xFCr eine zuverl\xE4ssige Offline-Nutzung \xF6ffne den Ordner \xFCber einen <strong>lokalen HTTP-Server auf dem Smartphone</strong> (z.B. App "Simple HTTP Server" / "Web Server") oder \xFCber einen Editor (z.B. Acode/Spck), der eine <code>http://localhost</code>-URL bereitstellt. \xD6ffne danach diese URL in Chrome.</p><h3>Datenbank \xF6ffnen / speichern</h3><p><strong>JSON-Datenbank \xF6ffnen</strong>: w\xE4hle eine .json-Datei (File System Access API, falls verf\xFCgbar). Sie wird zur aktuellen Datei.</p><p><strong>Speichern</strong>: schreibt alle Daten (Techniken, Mitglieder, Aktionen, Einstellungen) in die aktuelle Datei. Der Button wird rot, wenn \xC4nderungen noch nicht gespeichert sind.</p><p><strong>Speichern unter</strong>: speichert in eine neue Datei (oder l\xE4dt herunter, falls die API nicht verf\xFCgbar ist).</p><h3>Seite Techniken</h3><p><strong>Neu</strong>: startet eine leere Technik (\xFCberschreibt keine bestehende).</p><p><strong>Speichern (Browser)</strong>: speichert nur die aktuelle Technik im Browser-Speicher (praktisch ohne die ganze Datei zu schreiben).</p><p><strong>L\xF6schen</strong>: l\xF6scht die ausgew\xE4hlte Technik aus dem Browser-Speicher.</p><p><strong>JSON exportieren</strong>: exportiert die aktuelle Technik als .json.</p><p><strong>JSON importieren</strong>: importiert eine Technik aus einer .json-Datei in den Editor.</p><h3>Schritte / Tabelle</h3><p><strong>Schritt hinzuf\xFCgen</strong>: f\xFCgt eine Zeile hinzu.</p><p><strong>Letzten duplizieren</strong>: dupliziert die letzte Zeile.</p><p><strong>Bearbeitungsansicht / Leseansicht</strong>: wechselt die Darstellung. Auf Mobilger\xE4ten die eigenen Buttons nutzen.</p><p><strong>Kommentare beim \xDCberfahren</strong>: aktiviert/deaktiviert die automatische Anzeige der freien Kommentare beim \xDCberfahren.</p><p><strong>Rechtsklick</strong> auf eine Zelle: zeigt/versteckt den Inline-Kommentar.</p><h3>Aktionsverwaltung</h3><p>Aktionen pro Mitglied (Mitglieder = K\xF6rperteile) hinzuf\xFCgen / umbenennen.</p><h3>Mitgliederverwaltung</h3><p>Mitglieder erstellen / umbenennen / l\xF6schen. Aktionen sind pro Mitglied organisiert.</p><h3>Einstellungen</h3><p><strong>Sprache</strong>: UI-Sprache wechseln (FR/EN/DE).</p><p><strong>Design</strong>: hell / dunkel.</p><p><em>Hinweis:</em> Denk daran, die Datenbank (oben) zu speichern, um \xC4nderungen in der JSON-Datei zu sichern.</p>',
      show: "Anzeigen",
      collapse: "Einklappen",
      ph_title: "Verteidigung gegen Handgelenkgriff + Konter",
      ph_initial_state: "Startposition, Distanz, Griff...",
      ph_final_state: "Endposition, Kontrolle, Flucht...",
      ph_attention_points: "Sicherheit, Winkel, Atmung...",
      ph_new_action: "Handgelenk-Kontrolle unten",
      ph_new_member: "Rechter Unterarm"
    }
  };

  // src/idb.js
  var IDB_NAME = "krav_notes_store";
  var IDB_VERSION = 1;
  var KV_STORE = "kv";
  var BACKUP_STORE = "backups";
  var SNAPSHOT_KEY = "database";
  var MAX_BACKUPS = 20;
  function openStore() {
    return new Promise((resolve, reject) => {
      if (!("indexedDB" in window)) {
        reject(new Error("indexeddb_unavailable"));
        return;
      }
      const request = indexedDB.open(IDB_NAME, IDB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(KV_STORE)) db.createObjectStore(KV_STORE);
        if (!db.objectStoreNames.contains(BACKUP_STORE)) {
          db.createObjectStore(BACKUP_STORE, { keyPath: "id", autoIncrement: true });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  function txComplete(tx) {
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
  }
  async function saveDatabaseSnapshot(dbObject) {
    const db = await openStore();
    try {
      const tx = db.transaction(KV_STORE, "readwrite");
      tx.objectStore(KV_STORE).put(dbObject, SNAPSHOT_KEY);
      await txComplete(tx);
    } finally {
      db.close();
    }
  }
  async function loadDatabaseSnapshot() {
    const db = await openStore();
    try {
      const value = await new Promise((resolve, reject) => {
        const tx = db.transaction(KV_STORE, "readonly");
        const request = tx.objectStore(KV_STORE).get(SNAPSHOT_KEY);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      });
      return value;
    } finally {
      db.close();
    }
  }
  async function pushBackup(dbObject) {
    const db = await openStore();
    try {
      const tx = db.transaction(BACKUP_STORE, "readwrite");
      const store = tx.objectStore(BACKUP_STORE);
      store.add({ ts: (/* @__PURE__ */ new Date()).toISOString(), data: dbObject });
      await txComplete(tx);
      const keys = await new Promise((resolve, reject) => {
        const t = db.transaction(BACKUP_STORE, "readonly");
        const req = t.objectStore(BACKUP_STORE).getAllKeys();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error);
      });
      if (keys.length > MAX_BACKUPS) {
        const excess = keys.slice(0, keys.length - MAX_BACKUPS);
        const delTx = db.transaction(BACKUP_STORE, "readwrite");
        const delStore = delTx.objectStore(BACKUP_STORE);
        excess.forEach((k) => delStore.delete(k));
        await txComplete(delTx);
      }
    } finally {
      db.close();
    }
  }
  async function listBackups() {
    const db = await openStore();
    try {
      const all = await new Promise((resolve, reject) => {
        const tx = db.transaction(BACKUP_STORE, "readonly");
        const req = tx.objectStore(BACKUP_STORE).getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error);
      });
      return all.sort((a, b) => String(b.ts).localeCompare(String(a.ts)));
    } finally {
      db.close();
    }
  }

  // src/schema.js
  var DB_SCHEMA_VERSION = 2;
  var TECHNIQUE_SCHEMA_VERSION = 8;
  function migrateDatabaseObject(input) {
    const db = input && typeof input === "object" ? { ...input } : {};
    const version = Number.isFinite(db.version) ? db.version : 1;
    if (version < 2) {
      if (!db.members || !Array.isArray(db.members)) db.members = db.members || void 0;
      if (db.actionSets && typeof db.actionSets !== "object") db.actionSets = void 0;
      if (db.techniques && typeof db.techniques !== "object") db.techniques = {};
      if (db.settings && typeof db.settings !== "object") db.settings = void 0;
    }
    db.version = DB_SCHEMA_VERSION;
    return db;
  }
  function validateDatabaseObject(input) {
    const errors = [];
    if (!input || typeof input !== "object") {
      return { valid: false, errors: ["La base doit \xEAtre un objet JSON."] };
    }
    if ("members" in input && !Array.isArray(input.members)) {
      errors.push('Le champ "members" doit \xEAtre une liste.');
    }
    if ("actionSets" in input && (typeof input.actionSets !== "object" || Array.isArray(input.actionSets))) {
      errors.push('Le champ "actionSets" doit \xEAtre un objet.');
    }
    if ("techniques" in input && (typeof input.techniques !== "object" || Array.isArray(input.techniques))) {
      errors.push('Le champ "techniques" doit \xEAtre un objet.');
    }
    if ("settings" in input && (typeof input.settings !== "object" || Array.isArray(input.settings))) {
      errors.push('Le champ "settings" doit \xEAtre un objet.');
    }
    return { valid: errors.length === 0, errors };
  }

  // src/voice.js
  var SpeechRecognitionImpl = typeof window !== "undefined" ? window.SpeechRecognition || window.webkitSpeechRecognition : void 0;
  function isRecognitionSupported() {
    return !!SpeechRecognitionImpl;
  }
  function isSynthesisSupported() {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }
  function speechLangFor(code) {
    switch (code) {
      case "en":
        return "en-US";
      case "de":
        return "de-DE";
      default:
        return "fr-FR";
    }
  }
  function createRecognizer(options = {}) {
    if (!SpeechRecognitionImpl) return null;
    const recognition = new SpeechRecognitionImpl();
    recognition.lang = options.lang || "fr-FR";
    recognition.continuous = !!options.continuous;
    recognition.interimResults = !!options.interimResults;
    recognition.maxAlternatives = 1;
    let stopped = false;
    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i];
        const transcript = result[0] ? result[0].transcript : "";
        if (typeof options.onResult === "function") {
          options.onResult({ transcript, isFinal: result.isFinal });
        }
      }
    };
    recognition.onerror = (event) => {
      if (typeof options.onError === "function") options.onError(event.error || "error");
    };
    recognition.onend = () => {
      if (options.continuous && !stopped) {
        try {
          recognition.start();
          return;
        } catch {
        }
      }
      if (typeof options.onEnd === "function") options.onEnd();
    };
    return {
      start() {
        stopped = false;
        try {
          recognition.start();
        } catch {
        }
      },
      stop() {
        stopped = true;
        try {
          recognition.stop();
        } catch {
        }
      }
    };
  }
  function speak(text, code = "fr") {
    if (!isSynthesisSupported() || !text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = speechLangFor(code);
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }
  function cancelSpeech() {
    if (isSynthesisSupported()) window.speechSynthesis.cancel();
  }
  function normalize(text) {
    return String(text || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  }
  function similarity(a, b) {
    if (!a || !b) return 0;
    if (a === b) return 1;
    if (a.includes(b) || b.includes(a)) return 0.85;
    const tokensA = new Set(a.split(" "));
    const tokensB = new Set(b.split(" "));
    let common = 0;
    tokensA.forEach((t) => {
      if (tokensB.has(t)) common += 1;
    });
    const union = (/* @__PURE__ */ new Set([...tokensA, ...tokensB])).size;
    return union ? common / union : 0;
  }
  function bestMatch(query, candidates, threshold = 0.34) {
    const q = normalize(query);
    if (!q || !Array.isArray(candidates)) return null;
    let best = null;
    candidates.forEach((candidate) => {
      const score = similarity(q, normalize(candidate));
      if (!best || score > best.score) best = { value: candidate, score };
    });
    return best && best.score >= threshold ? best : null;
  }

  // app.js
  (() => {
    let members = JSON.parse(JSON.stringify(defaultMembers));
    let actionSets = JSON.parse(JSON.stringify(defaultActionSets));
    let dbFileHandle = null;
    let currentDbName = "";
    let techniquesByName = {};
    let currentLanguage = "fr";
    let isFileDirty = false;
    let hoverCommentsEnabled = true;
    let manualActionsEnabled = true;
    let expertModeEnabled = false;
    let storageMode = "local";
    let belts = ["Blanche", "Jaune", "Orange", "Verte", "Bleue", "Marron", "Noire"];
    let beltFilterValue = "";
    let pendingMerge = null;
    const ID_MAP = {
      techniquePage: "techniquesPage",
      stepsBody: "stepsTableBody",
      mainTableHeaderRow: "techniqueTableHeader",
      storageInfo: "statusLabel",
      actionsInfo: "statusLabel",
      membersInfo: "statusLabel",
      importJsonFile: "importTechniqueFile",
      importActionsFile: "importConfigFile",
      title: "titleInput",
      initialState: "initialStateInput",
      finalState: "finalStateInput",
      attentionPoints: "attentionPointsInput",
      techniqueName: "techniqueSelect",
      actionPartSelect: "actionMemberSelect",
      existingActionSelect: "actionSelect",
      mergeDatabaseFile: "mergeDatabaseFile"
    };
    const $ = (id) => document.getElementById(ID_MAP[id] || id);
    const techniquePage = $("techniquePage");
    const actionsPage = $("actionsPage");
    const stepsBody = $("stepsBody");
    const mainTableHeaderRow = $("mainTableHeaderRow");
    const printSheet = $("printSheet");
    const storageInfo = $("storageInfo");
    const actionsInfo = $("actionsInfo");
    const membersInfo = $("membersInfo");
    const importJsonFile = $("importJsonFile");
    const importActionsFile = $("importActionsFile");
    const tableWrap = $("tableWrap");
    const ganttWrap = $("ganttWrap");
    const ganttGrid = $("ganttGrid");
    const mobileStepsWrap = $("mobileStepsWrap");
    const mobileGanttWrap = $("mobileGanttWrap");
    const actionListBody = $("actionListBody") || $("actionLibraryContainer");
    const memberListBody = $("memberListBody");
    const memberListCard = $("memberListCard");
    const memberListHeader = $("memberListHeader");
    const memberListIndicator = $("memberListIndicator");
    const orderedParts = () => members.map((m) => m.id);
    const safeJsonParse = (text, fallback) => {
      try {
        return JSON.parse(text);
      } catch {
        return fallback;
      }
    };
    const slugify = (text) => String(text || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
    const memberLabelById = (id) => (members.find((x) => x.id === id) || { label: id }).label;
    const setStorageInfo = (msg, err) => {
      if (!storageInfo) return;
      storageInfo.textContent = msg;
      storageInfo.style.color = err ? "#dc2626" : "#6b7280";
    };
    const setActionsInfo = (msg, err) => {
      if (!actionsInfo) return;
      actionsInfo.textContent = msg;
      actionsInfo.style.color = err ? "#dc2626" : "#6b7280";
    };
    const setMembersInfo = (msg, err) => {
      if (!membersInfo) return;
      membersInfo.textContent = msg;
      membersInfo.style.color = err ? "#dc2626" : "#6b7280";
    };
    const createEmptyComments = () => Object.fromEntries(orderedParts().map((part) => [part, ""]));
    const escapeHtml = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/\n/g, "<br>");
    function openHandleDb() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(HANDLE_DB_NAME, 1);
        request.onupgradeneeded = function() {
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
          const tx = db.transaction(HANDLE_STORE_NAME, "readwrite");
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
          const tx = db.transaction(HANDLE_STORE_NAME, "readonly");
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
    async function ensureFileHandlePermission(handle, mode = "readwrite") {
      if (!handle) return false;
      try {
        if (handle.queryPermission) {
          const permission = await handle.queryPermission({ mode });
          if (permission === "granted") return true;
          if (handle.requestPermission) {
            const requested = await handle.requestPermission({ mode });
            return requested === "granted";
          }
          return false;
        }
        return true;
      } catch {
        return false;
      }
    }
    function buildDatabaseObject() {
      return {
        version: DB_SCHEMA_VERSION,
        exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
        members,
        actionSets,
        techniques: techniquesByName,
        settings: {
          theme: document.documentElement.getAttribute("data-theme") || "light",
          language: currentLanguage,
          hoverComments: hoverCommentsEnabled,
          manualActions: manualActionsEnabled,
          expertMode: expertModeEnabled,
          belts
        }
      };
    }
    function applyDatabaseObject(db) {
      const safe = migrateDatabaseObject(db && typeof db === "object" ? db : {});
      if (Array.isArray(safe.members) && safe.members.length) {
        members = safe.members.map((m) => ({ id: m.id, label: m.label }));
      } else {
        members = JSON.parse(JSON.stringify(defaultMembers));
      }
      const incomingActionSets = safe.actionSets && typeof safe.actionSets === "object" ? safe.actionSets : null;
      actionSets = {};
      members.forEach((m) => {
        actionSets[m.id] = Array.isArray(defaultActionSets[m.id]) ? [...defaultActionSets[m.id]] : ["Neutre"];
      });
      if (incomingActionSets) {
        Object.keys(incomingActionSets).forEach((part) => {
          if (!actionSets[part]) actionSets[part] = ["Neutre"];
          const items = Array.isArray(incomingActionSets[part]) ? incomingActionSets[part] : [];
          items.forEach((item) => {
            const normalized = String(item || "").trim();
            if (normalized && !actionSets[part].includes(normalized)) actionSets[part].push(normalized);
          });
          if (!actionSets[part].includes("Neutre")) actionSets[part].unshift("Neutre");
        });
      }
      techniquesByName = safe.techniques && typeof safe.techniques === "object" ? safe.techniques : {};
      if (safe.settings && safe.settings.theme) applyTheme(safe.settings.theme);
      if (safe.settings && safe.settings.language) applyLanguage(safe.settings.language);
      if (safe.settings && typeof safe.settings.hoverComments === "boolean") applyHoverComments(safe.settings.hoverComments);
      if (safe.settings && typeof safe.settings.manualActions === "boolean") applyManualActions(safe.settings.manualActions);
      if (safe.settings && typeof safe.settings.expertMode === "boolean") applyExpertMode(safe.settings.expertMode);
      if (safe.settings && Array.isArray(safe.settings.belts)) applyBelts(safe.settings.belts);
      try {
        localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(buildDatabaseObject()));
      } catch {
      }
      setFileDirty(false);
    }
    async function persistMembers() {
      persistDatabaseLocalFallback();
      if (dbFileHandle) {
        try {
          await writeDatabaseToHandle(dbFileHandle);
        } catch (error) {
          console.error(error);
        }
      }
    }
    async function persistCustomActionSets() {
      persistDatabaseLocalFallback();
      if (dbFileHandle) {
        try {
          await writeDatabaseToHandle(dbFileHandle);
        } catch (error) {
          console.error(error);
        }
      }
    }
    function getCurrentFileLabelEl() {
      return document.getElementById("currentFileLabel");
    }
    function setCurrentFileLabel(text) {
      const el = getCurrentFileLabelEl();
      if (el) el.textContent = text || "Aucun fichier s\xE9lectionn\xE9";
    }
    function updateDatabasePreview() {
      const pre = document.getElementById("databasePreview");
      if (!pre) return;
      try {
        pre.textContent = JSON.stringify(buildDatabaseObject(), null, 2);
      } catch {
        pre.textContent = "";
      }
    }
    let durableMirrorTimer = null;
    let lastBackupAt = 0;
    function mirrorDatabaseToDurableStore() {
      const snapshot = buildDatabaseObject();
      if (durableMirrorTimer) clearTimeout(durableMirrorTimer);
      durableMirrorTimer = setTimeout(() => {
        saveDatabaseSnapshot(snapshot).catch(() => {
        });
        const now = Date.now();
        if (now - lastBackupAt > 6e4) {
          lastBackupAt = now;
          pushBackup(snapshot).catch(() => {
          });
        }
      }, 400);
    }
    function persistDatabaseLocalFallback() {
      try {
        localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(buildDatabaseObject()));
      } catch {
      }
      mirrorDatabaseToDurableStore();
    }
    async function recoverSnapshotIfLocalEmpty() {
      try {
        if (localStorage.getItem(DB_STORAGE_KEY)) return;
        const snapshot = await loadDatabaseSnapshot();
        if (snapshot) localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(snapshot));
      } catch {
      }
    }
    async function restoreLatestBackup() {
      try {
        const backups = await listBackups();
        if (!backups.length) {
          setStorageInfo("Aucune sauvegarde automatique disponible.", true);
          return false;
        }
        applyDatabaseObject(backups[0].data);
        persistDatabaseLocalFallback();
        await initializeData(true);
        setStorageInfo(`Sauvegarde restaur\xE9e (${backups[0].ts}).`, false);
        return true;
      } catch (error) {
        console.error(error);
        setStorageInfo("Restauration de la sauvegarde impossible.", true);
        return false;
      }
    }
    function applyHoverComments(enabled) {
      hoverCommentsEnabled = !!enabled;
      const toggle = document.getElementById("hoverCommentsToggle");
      if (toggle) toggle.checked = hoverCommentsEnabled;
      document.body.classList.toggle("no-hover-comments", !hoverCommentsEnabled);
      try {
        localStorage.setItem(HOVER_COMMENTS_STORAGE_KEY, hoverCommentsEnabled ? "1" : "0");
      } catch {
      }
      updateDatabasePreview();
    }
    function applyManualActions(enabled) {
      manualActionsEnabled = !!enabled;
      const toggle = document.getElementById("manualActionsToggle");
      if (toggle) toggle.checked = manualActionsEnabled;
      document.body.classList.toggle("no-manual-actions", !manualActionsEnabled);
      try {
        localStorage.setItem(MANUAL_ACTIONS_STORAGE_KEY, manualActionsEnabled ? "1" : "0");
      } catch {
      }
      updateDatabasePreview();
    }
    function applyExpertMode(enabled) {
      expertModeEnabled = !!enabled;
      const toggle = document.getElementById("expertModeToggle");
      if (toggle) toggle.checked = expertModeEnabled;
      document.body.classList.toggle("expert-mode", expertModeEnabled);
      try {
        localStorage.setItem(EXPERT_MODE_STORAGE_KEY, expertModeEnabled ? "1" : "0");
      } catch {
      }
      updateDatabasePreview();
    }
    function normalizeBeltsList(next) {
      const raw = Array.isArray(next) ? next : [];
      const out = [];
      raw.forEach((item) => {
        const label = String(item || "").trim();
        if (!label) return;
        if (out.some((x) => x.toLowerCase() === label.toLowerCase())) return;
        out.push(label);
      });
      return out.length ? out : ["Blanche"];
    }
    function applyBelts(nextBelts) {
      belts = normalizeBeltsList(nextBelts);
      renderBeltsList();
      renderBeltSelects();
      updateDatabasePreview();
    }
    function renderBeltsList() {
      const list = document.getElementById("beltsList");
      if (!list) return;
      list.innerHTML = belts.map((b, idx) => {
        return `<div class="simple-item"><span>${escapeHtml(b)}</span><div class="toolbar-row compact-gap"><button class="compact-btn secondary" type="button" data-belt-up="${idx}">Monter</button><button class="compact-btn secondary" type="button" data-belt-down="${idx}">Descendre</button><button class="compact-btn danger" type="button" data-belt-delete="${idx}">Supprimer</button></div></div>`;
      }).join("");
      const persist = async () => {
        persistDatabaseLocalFallback();
        if (dbFileHandle) {
          try {
            await writeDatabaseToHandle(dbFileHandle);
          } catch (error) {
            console.error(error);
          }
        }
        markFileDirty();
      };
      Array.from(list.querySelectorAll("[data-belt-up]")).forEach((btn) => btn.addEventListener("click", async () => {
        const i = Number(btn.getAttribute("data-belt-up"));
        if (!Number.isFinite(i) || i <= 0) return;
        const next = [...belts];
        const tmp = next[i - 1];
        next[i - 1] = next[i];
        next[i] = tmp;
        applyBelts(next);
        await persist();
      }));
      Array.from(list.querySelectorAll("[data-belt-down]")).forEach((btn) => btn.addEventListener("click", async () => {
        const i = Number(btn.getAttribute("data-belt-down"));
        if (!Number.isFinite(i) || i >= belts.length - 1) return;
        const next = [...belts];
        const tmp = next[i + 1];
        next[i + 1] = next[i];
        next[i] = tmp;
        applyBelts(next);
        await persist();
      }));
      Array.from(list.querySelectorAll("[data-belt-delete]")).forEach((btn) => btn.addEventListener("click", async () => {
        const i = Number(btn.getAttribute("data-belt-delete"));
        const next = belts.filter((_, index) => index !== i);
        applyBelts(next);
        await persist();
      }));
    }
    function renderBeltSelects() {
      const beltSelect2 = document.getElementById("beltSelect");
      if (beltSelect2) {
        const current = beltSelect2.value;
        beltSelect2.innerHTML = '<option value="">--</option>' + belts.map((b) => `<option value="${escapeHtml(b)}">${escapeHtml(b)}</option>`).join("");
        beltSelect2.value = current;
      }
      const filterSelect = document.getElementById("beltFilterSelect");
      if (filterSelect) {
        const current = filterSelect.value;
        filterSelect.innerHTML = '<option value="">Tous</option>' + belts.map((b) => `<option value="${escapeHtml(b)}">${escapeHtml(b)}</option>`).join("");
        filterSelect.value = current;
      }
    }
    function loadHoverComments() {
      const stored = (() => {
        try {
          return localStorage.getItem(HOVER_COMMENTS_STORAGE_KEY);
        } catch {
          return null;
        }
      })();
      if (stored === null) {
        applyHoverComments(true);
        return;
      }
      applyHoverComments(stored === "1");
    }
    function loadManualActions() {
      const stored = (() => {
        try {
          return localStorage.getItem(MANUAL_ACTIONS_STORAGE_KEY);
        } catch {
          return null;
        }
      })();
      if (stored === null) {
        applyManualActions(true);
        return;
      }
      applyManualActions(stored === "1");
    }
    function loadExpertMode() {
      const stored = (() => {
        try {
          return localStorage.getItem(EXPERT_MODE_STORAGE_KEY);
        } catch {
          return null;
        }
      })();
      if (stored === null) {
        applyExpertMode(false);
        return;
      }
      applyExpertMode(stored === "1");
    }
    function setFileDirty(next) {
      isFileDirty = !!next;
      const btn = $("saveDatabaseBtn");
      if (!btn) return;
      btn.classList.toggle("is-dirty", isFileDirty);
    }
    function markFileDirty() {
      if (!isFileDirty) setFileDirty(true);
    }
    function translate(key) {
      const dict = TRANSLATIONS[currentLanguage] || TRANSLATIONS.fr;
      return dict[key] || (TRANSLATIONS.fr[key] || key);
    }
    function applyTranslationsToDom() {
      Array.from(document.querySelectorAll("[data-i18n]")).forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (!key) return;
        el.textContent = translate(key);
      });
      Array.from(document.querySelectorAll("[data-i18n-html]")).forEach((el) => {
        const key = el.getAttribute("data-i18n-html");
        if (!key) return;
        el.innerHTML = translate(key);
      });
      Array.from(document.querySelectorAll("[data-i18n-placeholder]")).forEach((el) => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (!key) return;
        el.setAttribute("placeholder", translate(key));
      });
      Array.from(document.querySelectorAll("[data-i18n-title]")).forEach((el) => {
        const key = el.getAttribute("data-i18n-title");
        if (!key) return;
        el.setAttribute("title", translate(key));
        el.setAttribute("aria-label", translate(key));
      });
    }
    function refreshCollapseIndicators() {
      Array.from(document.querySelectorAll(".collapse-indicator")).forEach((indicator) => {
        const parent = indicator.closest(".collapsible-card, .action-list-card");
        const collapsed = parent ? parent.classList.contains("collapsed") : false;
        indicator.textContent = collapsed ? translate("show") : translate("collapse");
      });
    }
    function applyLanguage(lang) {
      currentLanguage = TRANSLATIONS[lang] ? lang : "fr";
      document.documentElement.lang = currentLanguage;
      const select = document.getElementById("languageSelect");
      if (select) select.value = currentLanguage;
      applyTranslationsToDom();
      refreshCollapseIndicators();
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
      } catch {
      }
      updateDatabasePreview();
      syncMobileViewSwitch();
    }
    function syncMobileViewSwitch() {
      const toggle = $("mobileViewSwitchToggle");
      if (!toggle || !mobileGanttWrap) return;
      toggle.checked = mobileGanttWrap.classList.contains("active");
    }
    function showMobileEditView() {
      if (!mobileStepsWrap || !mobileGanttWrap) return;
      renderMobileView();
      mobileStepsWrap.classList.add("active");
      mobileGanttWrap.classList.remove("active");
      syncMobileViewSwitch();
    }
    function showMobileReadView() {
      if (!mobileStepsWrap || !mobileGanttWrap) return;
      renderMobileGanttView();
      mobileGanttWrap.classList.add("active");
      mobileStepsWrap.classList.remove("active");
      syncMobileViewSwitch();
    }
    function showDesktopEditView() {
      if (!tableWrap || !ganttWrap) return;
      tableWrap.classList.add("active");
      ganttWrap.classList.remove("active");
    }
    function showDesktopReadView() {
      if (!tableWrap || !ganttWrap) return;
      renderGanttView();
      ganttWrap.classList.add("active");
      tableWrap.classList.remove("active");
    }
    function showEditView() {
      showDesktopEditView();
      showMobileEditView();
    }
    function showReadView() {
      showDesktopReadView();
      showMobileReadView();
    }
    function switchMobileView() {
      const toggle = $("mobileViewSwitchToggle");
      if (toggle && toggle.checked) {
        showMobileReadView();
        return;
      }
      showMobileEditView();
    }
    function openGeneralInfoAndFocusTitle() {
      const card = document.getElementById("generalInfoCard");
      if (card) card.classList.remove("collapsed");
      try {
        sessionStorage.setItem("generalInfoCollapsed", "0");
      } catch {
      }
      refreshCollapseIndicators();
      const titleInput2 = $("title");
      if (titleInput2) titleInput2.focus();
    }
    function loadLanguage() {
      const stored = (() => {
        try {
          return localStorage.getItem(LANGUAGE_STORAGE_KEY);
        } catch {
          return null;
        }
      })();
      applyLanguage(stored || "fr");
    }
    function readDatabaseLocalFallback() {
      return safeJsonParse(localStorage.getItem(DB_STORAGE_KEY) || "", null);
    }
    function getStoredCloudUrl() {
      try {
        return localStorage.getItem("krav_notes_db_url") || "";
      } catch {
        return "";
      }
    }
    function getDefaultCloudUrl() {
      return DEFAULT_DB_FILENAME;
    }
    function setStorageMode(mode) {
      storageMode = mode === "cloud" ? "cloud" : "local";
      const toggle = document.getElementById("cloudLocalSwitchToggle");
      if (toggle) {
        toggle.checked = storageMode === "cloud";
        const wrapper = toggle.closest(".cloud-local-switch");
        if (wrapper) {
          wrapper.classList.toggle("mode-local", storageMode === "local");
          wrapper.classList.toggle("mode-cloud", storageMode === "cloud");
          wrapper.setAttribute("aria-pressed", storageMode === "cloud" ? "true" : "false");
        }
      }
      try {
        localStorage.setItem(STORAGE_MODE_KEY, storageMode);
      } catch {
      }
    }
    function loadStorageMode() {
      const stored = (() => {
        try {
          return localStorage.getItem(STORAGE_MODE_KEY);
        } catch {
          return null;
        }
      })();
      setStorageMode(stored === "cloud" ? "cloud" : "local");
    }
    async function fetchDatabaseFromCloudUrl(askIfMissing) {
      let url = askIfMissing ? getStoredCloudUrl() : getDefaultCloudUrl();
      if (askIfMissing || !url.trim()) {
        const next = window.prompt("URL du fichier JSON GitHub / Cloud :", url || "krav-notes-db.json");
        if (!next || !next.trim()) return null;
        url = next.trim();
        try {
          localStorage.setItem("krav_notes_db_url", url);
        } catch {
        }
      }
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) throw new Error(`http_${response.status}`);
      const text = await response.text();
      const parsed = safeJsonParse(text, null);
      if (!parsed) throw new Error("invalid_json");
      return { parsed, url };
    }
    async function writeDatabaseObjectToHandle(handle, dbObject) {
      const writable = await handle.createWritable();
      await writable.write(JSON.stringify(dbObject, null, 2));
      await writable.close();
    }
    async function askLocalDatabaseLocationFromCloud(cloudDb) {
      if (!window.showSaveFilePicker) {
        applyDatabaseObject(cloudDb);
        persistDatabaseLocalFallback();
        setStorageInfo("API fichier indisponible : copie locale conserv\xE9e dans le navigateur.", false);
        return false;
      }
      const handle = await pickSaveDatabaseFileHandle(DEFAULT_DB_FILENAME);
      if (!handle) return false;
      await writeDatabaseObjectToHandle(handle, cloudDb);
      dbFileHandle = handle;
      await saveDbFileHandle(dbFileHandle);
      currentDbName = dbFileHandle.name || DEFAULT_DB_FILENAME;
      setCurrentFileLabel(currentDbName);
      try {
        localStorage.removeItem(LOCAL_FILE_MISSING_ACK_KEY);
      } catch {
      }
      return true;
    }
    async function ensureLocalDatabaseHandleForSave() {
      if (dbFileHandle && await ensureFileHandlePermission(dbFileHandle, "readwrite")) return true;
      dbFileHandle = null;
      const storedHandle = await loadDbFileHandle();
      if (storedHandle && await ensureFileHandlePermission(storedHandle, "readwrite")) {
        dbFileHandle = storedHandle;
        return true;
      }
      let handle = null;
      if (window.showOpenFilePicker) {
        handle = await pickDatabaseFileHandle();
      } else if (window.showSaveFilePicker) {
        handle = await pickSaveDatabaseFileHandle(DEFAULT_DB_FILENAME);
      }
      if (!handle) return false;
      dbFileHandle = handle;
      await saveDbFileHandle(dbFileHandle);
      currentDbName = dbFileHandle.name || DEFAULT_DB_FILENAME;
      setCurrentFileLabel(currentDbName);
      setStorageMode("local");
      try {
        localStorage.removeItem(LOCAL_FILE_MISSING_ACK_KEY);
      } catch {
      }
      return true;
    }
    async function loadLocalDatabaseOrAsk() {
      let handle = dbFileHandle || await loadDbFileHandle();
      if (handle && !await ensureFileHandlePermission(handle, "readwrite")) handle = null;
      if (handle) {
        dbFileHandle = handle;
        const parsed = await readDatabaseFromHandle(dbFileHandle);
        applyDatabaseObject(parsed);
        currentDbName = dbFileHandle.name || "";
        setCurrentFileLabel(currentDbName || "Base locale li\xE9e");
        setStorageMode("local");
        setStorageInfo("Base locale charg\xE9e.", false);
        hideStartupModal();
        await initializeData(true);
        setFileDirty(false);
        return true;
      }
      const alreadyNotified = (() => {
        try {
          return localStorage.getItem(LOCAL_FILE_MISSING_ACK_KEY) === "1";
        } catch {
          return false;
        }
      })();
      if (alreadyNotified) return false;
      try {
        localStorage.setItem(LOCAL_FILE_MISSING_ACK_KEY, "1");
      } catch {
      }
      if (window.showOpenFilePicker && window.confirm("L'emplacement du fichier local est introuvable. Voulez-vous s\xE9lectionner un fichier JSON local existant ?")) {
        const selectedHandle = await pickDatabaseFileHandle();
        if (selectedHandle) {
          dbFileHandle = selectedHandle;
          await saveDbFileHandle(dbFileHandle);
          const parsed = await readDatabaseFromHandle(dbFileHandle);
          applyDatabaseObject(parsed);
          currentDbName = dbFileHandle.name || "";
          setCurrentFileLabel(currentDbName || "Base locale li\xE9e");
          setStorageMode("local");
          try {
            localStorage.removeItem(LOCAL_FILE_MISSING_ACK_KEY);
          } catch {
          }
          setStorageInfo("Base locale s\xE9lectionn\xE9e.", false);
          hideStartupModal();
          await initializeData(true);
          setFileDirty(false);
          return true;
        }
      }
      const createLocal = window.confirm("Voulez-vous copier la base Cloud vers un nouveau fichier local ?");
      if (!createLocal) {
        setStorageInfo("Aucun fichier local li\xE9. La s\xE9lection sera redemand\xE9e uniquement lors d\u2019une sauvegarde.", false);
        return false;
      }
      const cloud = await fetchDatabaseFromCloudUrl(false);
      if (!cloud) return false;
      const copied = await askLocalDatabaseLocationFromCloud(cloud.parsed);
      applyDatabaseObject(cloud.parsed);
      setStorageMode("local");
      setStorageInfo(copied ? "Base Cloud copi\xE9e en local." : "Base Cloud charg\xE9e en mode local navigateur.", false);
      hideStartupModal();
      await initializeData(true);
      setFileDirty(false);
      return true;
    }
    async function loadLocalDatabaseForSwitch() {
      try {
        localStorage.removeItem(LOCAL_FILE_MISSING_ACK_KEY);
      } catch {
      }
      return loadLocalDatabaseOrAsk();
    }
    async function loadExistingLocalDatabaseForEdit() {
      let handle = dbFileHandle || await loadDbFileHandle();
      if (handle && !await ensureFileHandlePermission(handle, "readwrite")) handle = null;
      if (!handle && window.showOpenFilePicker) {
        handle = await pickDatabaseFileHandle();
      }
      if (!handle) return false;
      dbFileHandle = handle;
      await saveDbFileHandle(dbFileHandle);
      const parsed = await readDatabaseFromHandle(dbFileHandle);
      applyDatabaseObject(parsed);
      currentDbName = dbFileHandle.name || "";
      setCurrentFileLabel(currentDbName || "Base locale li\xE9e");
      setStorageMode("local");
      try {
        localStorage.removeItem(LOCAL_FILE_MISSING_ACK_KEY);
      } catch {
      }
      setStorageInfo("Base locale charg\xE9e.", false);
      hideStartupModal();
      await initializeData(true);
      setFileDirty(false);
      return true;
    }
    async function switchStorageMode() {
      const toggle = document.getElementById("cloudLocalSwitchToggle");
      const nextMode = storageMode === "cloud" ? "local" : "cloud";
      const previousMode = storageMode;
      if (toggle) toggle.checked = nextMode === "cloud";
      try {
        if (nextMode === "cloud") {
          hideStartupModal();
          dbFileHandle = null;
          const loaded2 = await loadDatabaseFromCloudFile();
          if (!loaded2) setStorageMode(previousMode);
          return;
        }
        setStorageMode("local");
        const loaded = await loadLocalDatabaseForSwitch();
        if (!loaded) {
          setStorageMode("local");
          setStorageInfo("Mode Local s\xE9lectionn\xE9. Choisissez un fichier local avec Sauvegarder ou Nouvelle technique.", false);
        }
      } catch (error) {
        console.error(error);
        setStorageInfo(nextMode === "cloud" ? "Chargement Cloud impossible." : "Chargement local impossible.", true);
        setStorageMode(previousMode);
      }
    }
    async function readDatabaseFromHandle(handle) {
      const file = await handle.getFile();
      const parsed = safeJsonParse(await file.text(), null);
      if (!parsed) throw new Error("invalid_json");
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
      if (!parsed) throw new Error("invalid_json");
      const check = validateDatabaseObject(parsed);
      if (!check.valid) {
        setStorageInfo(`Base JSON invalide : ${check.errors.join(" ")}`, true);
        return;
      }
      applyDatabaseObject(parsed);
      currentDbName = file.name || "";
      setCurrentFileLabel(currentDbName || "Base charg\xE9e (fichier)");
      setStorageInfo("Base JSON charg\xE9e depuis le fichier s\xE9lectionn\xE9.", false);
      updateDatabasePreview();
      hideStartupModal();
      await initializeData(true);
    }
    async function loadDatabaseFromUrl() {
      try {
        const cloud = await fetchDatabaseFromCloudUrl(true);
        if (!cloud) return;
        applyDatabaseObject(cloud.parsed);
        dbFileHandle = null;
        currentDbName = cloud.url;
        setCurrentFileLabel(cloud.url);
        setStorageMode("cloud");
        setStorageInfo("Base JSON charg\xE9e depuis l'URL.", false);
        updateDatabasePreview();
        hideStartupModal();
        await initializeData(true);
        setFileDirty(false);
      } catch (error) {
        console.error(error);
        setStorageInfo("Chargement depuis URL impossible.", true);
      }
    }
    async function loadDatabaseFromCloudFile() {
      try {
        const cloud = await fetchDatabaseFromCloudUrl(false);
        if (!cloud) return false;
        applyDatabaseObject(cloud.parsed);
        dbFileHandle = null;
        currentDbName = cloud.url;
        setCurrentFileLabel(cloud.url);
        setStorageMode("cloud");
        setStorageInfo("Base JSON Cloud charg\xE9e depuis le r\xE9pertoire de l\u2019application.", false);
        updateDatabasePreview();
        hideStartupModal();
        await initializeData(true);
        setFileDirty(false);
        return true;
      } catch (error) {
        console.error(error);
        setStorageInfo(`Fichier Cloud ${DEFAULT_DB_FILENAME} introuvable dans le r\xE9pertoire de l\u2019application.`, true);
        return false;
      }
    }
    async function tryLoadDatabaseFromUrlOnStartup() {
      const candidates = [getDefaultCloudUrl()];
      for (const url of candidates) {
        try {
          const response = await fetch(url, { cache: "no-store" });
          if (!response.ok) continue;
          const text = await response.text();
          const parsed = safeJsonParse(text, null);
          if (!parsed) continue;
          applyDatabaseObject(parsed);
          dbFileHandle = null;
          currentDbName = url;
          setCurrentFileLabel(url);
          setStorageMode("cloud");
          setStorageInfo("Base JSON charg\xE9e automatiquement.", false);
          updateDatabasePreview();
          hideStartupModal();
          await initializeData(true);
          setFileDirty(false);
          return true;
        } catch {
        }
      }
      return false;
    }
    function deepSortObject(value) {
      if (Array.isArray(value)) return value.map(deepSortObject);
      if (!value || typeof value !== "object") return value;
      const out = {};
      Object.keys(value).sort().forEach((key) => {
        out[key] = deepSortObject(value[key]);
      });
      return out;
    }
    function stableStringify(value) {
      return JSON.stringify(deepSortObject(value));
    }
    function ensureActionSet(partId) {
      if (!actionSets[partId]) {
        actionSets[partId] = Array.isArray(defaultActionSets[partId]) ? [...defaultActionSets[partId]] : ["Neutre"];
      }
      if (!actionSets[partId].includes("Neutre")) actionSets[partId].unshift("Neutre");
    }
    async function addActionAndPropagate(partId, actionRaw) {
      const part = partId;
      const newAction = (actionRaw || "").trim();
      if (!part || !newAction) return { added: false, value: "" };
      if (newAction.toLowerCase() === "neutre") {
        window.alert("Le mot Neutre est r\xE9serv\xE9.");
        return { added: false, value: "" };
      }
      ensureActionSet(part);
      const exists = (actionSets[part] || []).some((item) => (item || "").toLowerCase() === newAction.toLowerCase());
      if (!exists) {
        actionSets[part].push(newAction);
        await persistCustomActionSets();
      }
      Array.from(stepsBody.querySelectorAll(`select[data-part="${part}"]`)).forEach((select) => {
        const hasOption = Array.from(select.options).some((o) => (o.value || "").toLowerCase() === newAction.toLowerCase());
        if (!hasOption) {
          const opt = document.createElement("option");
          opt.value = newAction;
          opt.textContent = newAction;
          select.appendChild(opt);
        }
      });
      const actionPartSelect2 = $("actionPartSelect");
      const existingActionSelect = $("existingActionSelect");
      if (actionPartSelect2 && existingActionSelect && actionPartSelect2.value === part) {
        const has = Array.from(existingActionSelect.options).some((o) => (o.value || "").toLowerCase() === newAction.toLowerCase());
        if (!has) {
          const opt = document.createElement("option");
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
      incoming.forEach((action) => {
        if (!result.includes(action)) result.push(action);
      });
      if (!result.includes("Neutre")) result.unshift("Neutre");
      if (result[0] !== "Neutre") {
        result.splice(result.indexOf("Neutre"), 1);
        result.unshift("Neutre");
      }
      return result;
    }
    function mergeDatabaseObject(incomingDb) {
      const safe = incomingDb && typeof incomingDb === "object" ? incomingDb : {};
      const incomingMembers = Array.isArray(safe.members) ? safe.members.filter((m) => m && m.id) : [];
      const incomingActionSets = safe.actionSets && typeof safe.actionSets === "object" ? safe.actionSets : {};
      const incomingTechniques = safe.techniques && typeof safe.techniques === "object" ? safe.techniques : {};
      incomingMembers.forEach((m) => {
        const existing = members.find((x) => x.id === m.id);
        if (!existing) members.push({ id: m.id, label: m.label || m.id });
        else if ((!existing.label || existing.label === existing.id) && m.label) existing.label = m.label;
        ensureActionSet(m.id);
        actionSets[m.id] = mergeUniqueActions(actionSets[m.id], incomingActionSets[m.id]);
      });
      Object.keys(incomingActionSets).forEach((partId) => {
        if (!partId) return;
        if (!members.some((m) => m.id === partId)) members.push({ id: partId, label: partId });
        ensureActionSet(partId);
        actionSets[partId] = mergeUniqueActions(actionSets[partId], incomingActionSets[partId]);
      });
      Object.keys(incomingTechniques).forEach((name) => {
        const technique = incomingTechniques[name];
        if (!technique || typeof technique !== "object") return;
        if (Array.isArray(technique.members)) {
          technique.members.forEach((m) => {
            if (!m || !m.id) return;
            if (!members.some((existing2) => existing2.id === m.id)) members.push({ id: m.id, label: m.label || m.id });
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
          while (techniquesByName[candidate]) {
            i += 1;
            candidate = `${name} (import ${i})`;
          }
        }
        techniquesByName[candidate] = technique;
      });
    }
    async function mergeDatabaseFromFileInput(file) {
      const text = await file.text();
      const parsed = safeJsonParse(text, null);
      if (!parsed) throw new Error("invalid_json");
      const diff = computeMergeDiff(parsed);
      pendingMerge = {
        sourceLabel: file.name || "Import JSON",
        incomingDb: parsed,
        diff,
        selection: initMergeSelection(diff)
      };
      showPage("mergePage");
      setStorageInfo("Import effectu\xE9. V\xE9rifiez les diff\xE9rences avant fusion.", false);
    }
    async function mergeDatabase() {
      try {
        if (window.showOpenFilePicker) {
          const [handle] = await window.showOpenFilePicker({
            multiple: false,
            types: [{ description: "JSON", accept: { "application/json": [".json"] } }]
          });
          if (!handle) return;
          const parsed = await readDatabaseFromHandle(handle);
          const diff = computeMergeDiff(parsed);
          pendingMerge = {
            sourceLabel: handle.name || "Import JSON",
            incomingDb: parsed,
            diff,
            selection: initMergeSelection(diff)
          };
          showPage("mergePage");
          setStorageInfo("Import effectu\xE9. V\xE9rifiez les diff\xE9rences avant fusion.", false);
          return;
        }
        const input = $("mergeDatabaseFile");
        if (input) input.click();
      } catch (error) {
        console.error(error);
        setStorageInfo("Fusion annul\xE9e ou impossible.", true);
      }
    }
    function showStartupModal() {
      const modal = document.getElementById("startupModal");
      if (!modal) return;
      modal.classList.add("show");
      modal.setAttribute("aria-hidden", "false");
    }
    function hideStartupModal() {
      const modal = document.getElementById("startupModal");
      if (!modal) return;
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    }
    async function pickDatabaseFileHandle() {
      if (!window.showOpenFilePicker) return null;
      const [handle] = await window.showOpenFilePicker({
        multiple: false,
        types: [{ description: "JSON", accept: { "application/json": [".json"] } }]
      });
      return handle || null;
    }
    async function pickSaveDatabaseFileHandle(suggestedName) {
      if (!window.showSaveFilePicker) return null;
      const handle = await window.showSaveFilePicker({
        suggestedName: suggestedName || DEFAULT_DB_FILENAME,
        types: [{ description: "JSON", accept: { "application/json": [".json"] } }]
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
          currentDbName = dbFileHandle.name || "";
          setCurrentFileLabel(currentDbName || "Base charg\xE9e");
          setStorageMode("local");
          setStorageInfo("Base JSON ouverte.", false);
          updateDatabasePreview();
          hideStartupModal();
          await initializeData(true);
          return;
        }
        const input = document.getElementById("openDatabaseFile");
        if (input) input.click();
      } catch (error) {
        console.error(error);
        setStorageInfo("Ouverture de la base annul\xE9e ou impossible.", true);
      }
    }
    async function saveDatabase() {
      try {
        if (storageMode === "cloud" && !dbFileHandle) {
          setStorageInfo("Passez en mode Local avant de sauvegarder pour \xE9viter d\u2019\xE9craser une base locale avec la base Cloud.", true);
          return;
        }
        syncCurrentTechniqueIntoDatabase(false);
        const hasLocalHandle = await ensureLocalDatabaseHandleForSave();
        if (!hasLocalHandle) {
          await saveDatabaseAs(true);
          return;
        }
        if (dbFileHandle) {
          await writeDatabaseToHandle(dbFileHandle);
          persistDatabaseLocalFallback();
          setStorageMode("local");
          setCurrentFileLabel(currentDbName || dbFileHandle.name || "Base sauvegard\xE9e");
          setStorageInfo("Base sauvegard\xE9e.", false);
          updateDatabasePreview();
          setFileDirty(false);
          return;
        }
        await saveDatabaseAs(true);
      } catch (error) {
        console.error(error);
        setStorageInfo("Sauvegarde impossible.", true);
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
          setStorageMode("local");
          setCurrentFileLabel(currentDbName || "Base sauvegard\xE9e");
          setStorageInfo("Base sauvegard\xE9e sous.", false);
          updateDatabasePreview();
          setFileDirty(false);
          return;
        }
        const payload = JSON.stringify(buildDatabaseObject(), null, 2);
        const blob = new Blob([payload], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const filename = window.prompt("Nom du fichier base JSON :", currentDbName || DEFAULT_DB_FILENAME);
        if (!filename) return;
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        persistDatabaseLocalFallback();
        currentDbName = filename;
        setCurrentFileLabel(currentDbName);
        setStorageInfo("Base export\xE9e (t\xE9l\xE9chargement).", false);
        updateDatabasePreview();
        setFileDirty(false);
      } catch (error) {
        console.error(error);
        setStorageInfo("Sauvegarde sous impossible.", true);
      }
    }
    function syncCurrentTechniqueIntoDatabase(promptForName) {
      const titleEl = $("title");
      const initialEl = $("initialState");
      const finalEl = $("finalState");
      const attentionEl = $("attentionPoints");
      if (!stepsBody || !titleEl || !initialEl || !finalEl || !attentionEl) return;
      const hasAnyContent = !!titleEl.value.trim() || !!initialEl.value.trim() || !!finalEl.value.trim() || !!attentionEl.value.trim() || !!stepsBody.querySelectorAll("tr").length;
      if (!hasAnyContent) return;
      const select = $("techniqueName");
      const selectedName = select ? select.value.trim() : "";
      let name = selectedName;
      if (!name) {
        const proposed = titleEl.value.trim() || "nouvelle-technique";
        if (promptForName) {
          const next = window.prompt("Nom de la technique \xE0 inclure dans la base :", proposed);
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
      const normalized = theme === "dark" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", normalized);
      const themeSelect2 = $("themeSelect");
      if (themeSelect2) themeSelect2.value = normalized;
      try {
        localStorage.setItem(THEME_STORAGE_KEY, normalized);
      } catch {
      }
    }
    function loadTheme() {
      const stored = (() => {
        try {
          return localStorage.getItem(THEME_STORAGE_KEY);
        } catch {
          return null;
        }
      })();
      applyTheme(stored || "light");
    }
    async function readStoredTechniques() {
      return techniquesByName;
    }
    async function writeStoredTechniques(data) {
      techniquesByName = data && typeof data === "object" ? data : {};
      persistDatabaseLocalFallback();
      if (dbFileHandle) {
        try {
          await writeDatabaseToHandle(dbFileHandle);
        } catch (error) {
          console.error(error);
        }
      }
      await refreshTechniqueList();
      updateDatabasePreview();
    }
    function fillSelect(select, options, selectedValue) {
      select.innerHTML = "";
      options.forEach((label) => {
        const option = document.createElement("option");
        option.value = label;
        option.textContent = label;
        if (label === selectedValue) option.selected = true;
        select.appendChild(option);
      });
      select.title = select.value;
    }
    function updateMemberLabelEverywhere(memberId, newLabel) {
      if (!memberId) return;
      Object.keys(techniquesByName || {}).forEach((name) => {
        const tech = techniquesByName[name];
        if (!tech || typeof tech !== "object") return;
        if (!Array.isArray(tech.members)) return;
        tech.members.forEach((m) => {
          if (!m || m.id !== memberId) return;
          m.label = newLabel;
        });
      });
    }
    function replaceActionInAllTechniques(partId, oldAction, newAction) {
      if (!partId || !oldAction || !newAction) return;
      Object.keys(techniquesByName || {}).forEach((name) => {
        const tech = techniquesByName[name];
        if (!tech || typeof tech !== "object") return;
        if (!Array.isArray(tech.steps)) return;
        tech.steps.forEach((step) => {
          if (!step || typeof step !== "object") return;
          if (step[partId] === oldAction) step[partId] = newAction;
        });
      });
    }
    function renderTableHeader() {
      mainTableHeaderRow.innerHTML = "<th>Step</th>" + orderedParts().map((id) => `<th>${escapeHtml(memberLabelById(id))}</th>`).join("") + "<th>Commentaire \xE9tape</th><th>Actions</th>";
    }
    function updateSingleCellState(cell, select, textarea) {
      const active = (select.value || "Neutre") !== "Neutre";
      const hasComment = !!textarea.value.trim();
      cell.classList.toggle("is-active", active);
      cell.classList.toggle("has-comment", hasComment);
    }
    function updateCellStates() {
      Array.from(stepsBody.querySelectorAll("tr")).forEach((row) => {
        orderedParts().forEach((part) => {
          const select = row.querySelector(`select[data-part="${part}"]`);
          const textarea = row.querySelector(`textarea[data-comment="${part}"]`);
          if (select && textarea) updateSingleCellState(select.closest(".case-cell"), select, textarea);
        });
      });
    }
    function getRowsData() {
      return Array.from(stepsBody.querySelectorAll("tr")).map((row) => {
        const item = { comments: {} };
        orderedParts().forEach((part) => {
          const select = row.querySelector(`select[data-part="${part}"]`);
          const textarea = row.querySelector(`textarea[data-comment="${part}"]`);
          item[part] = select ? select.value : "Neutre";
          item.comments[part] = textarea ? textarea.value.trim() : "";
        });
        item.commentaire = row.querySelector('input[data-part="commentaire"]').value.trim();
        return item;
      });
    }
    function createRowElement(stepData) {
      const data = stepData || { comments: createEmptyComments() };
      const tr = document.createElement("tr");
      tr.innerHTML = '<td class="step-number"></td>' + orderedParts().map((part) => `<td class="case-cell"><div class="cell-editor"><select data-part="${part}"></select><input class="inline-action-input" type="text" data-action-input="${part}" placeholder="Action (saisie)" /><textarea class="inline-comment" data-comment="${part}" placeholder="Commentaire libre"></textarea></div></td>`).join("") + `<td class="input-cell"><input type="text" data-part="commentaire" placeholder="Commentaire global de l'\xE9tape" /></td><td class="actions-cell"><div class="row-actions"><button class="compact-btn secondary move-up" type="button">Monter</button><button class="compact-btn secondary move-down" type="button">Descendre</button><button class="compact-btn danger delete-row" type="button">Supprimer</button></div></td>`;
      orderedParts().forEach((part) => {
        const select = tr.querySelector(`select[data-part="${part}"]`);
        const manualInput = tr.querySelector(`input[data-action-input="${part}"]`);
        const textarea = tr.querySelector(`textarea[data-comment="${part}"]`);
        const cell = select.closest(".case-cell");
        fillSelect(select, actionSets[part] || ["Neutre"], data[part] || "Neutre");
        textarea.value = data.comments && data.comments[part] ? data.comments[part] : "";
        select.addEventListener("change", () => {
          select.title = select.value;
          updateSingleCellState(cell, select, textarea);
          refreshVisuals();
          markFileDirty();
        });
        textarea.addEventListener("input", () => {
          updateSingleCellState(cell, select, textarea);
          refreshVisuals();
          markFileDirty();
        });
        textarea.addEventListener("focus", () => {
          cell.classList.add("comment-visible");
        });
        textarea.addEventListener("blur", () => {
          if (!textarea.value.trim()) cell.classList.remove("comment-visible");
        });
        cell.addEventListener("contextmenu", (event) => {
          event.preventDefault();
          cell.classList.toggle("comment-visible");
          if (cell.classList.contains("comment-visible")) textarea.focus();
        });
        if (manualInput) {
          const commit = async () => {
            const raw = manualInput.value;
            if (!raw || !raw.trim()) return;
            const res = await addActionAndPropagate(part, raw);
            if (res && res.value) {
              select.value = res.value;
              select.title = select.value;
              manualInput.value = "";
              updateSingleCellState(cell, select, textarea);
              refreshVisuals();
            }
          };
          manualInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              commit();
            }
          });
          manualInput.addEventListener("blur", () => {
            commit();
          });
        }
        updateSingleCellState(cell, select, textarea);
      });
      const stepComment = tr.querySelector('input[data-part="commentaire"]');
      stepComment.value = data.commentaire || "";
      stepComment.addEventListener("input", () => {
        refreshVisuals();
        markFileDirty();
      });
      tr.querySelector(".delete-row").addEventListener("click", () => {
        tr.remove();
        if (!stepsBody.children.length) addStep();
        updateStepNumbers();
        markFileDirty();
      });
      tr.querySelector(".move-up").addEventListener("click", () => {
        const prev = tr.previousElementSibling;
        if (prev) {
          stepsBody.insertBefore(tr, prev);
          updateStepNumbers();
          markFileDirty();
        }
      });
      tr.querySelector(".move-down").addEventListener("click", () => {
        const next = tr.nextElementSibling;
        if (next) {
          stepsBody.insertBefore(next, tr);
          updateStepNumbers();
          markFileDirty();
        }
      });
      return tr;
    }
    function addStep(stepData, markDirty = true) {
      stepsBody.appendChild(createRowElement(stepData));
      updateStepNumbers();
      if (markDirty) markFileDirty();
    }
    function renderGanttView() {
      const rows = getRowsData();
      const displayedParts = orderedParts().filter((part) => rows.some((row) => (row[part] || "Neutre") !== "Neutre"));
      const count = Math.max(rows.length, 1);
      ganttGrid.style.setProperty("--steps-count", count);
      if (!displayedParts.length) {
        ganttGrid.innerHTML = '<div style="padding:16px;color:#6b7280;">Aucune action non neutre \xE0 afficher.</div>';
        return;
      }
      let html = '<div class="gantt-header"><div class="gantt-label">Membre / Step</div>';
      for (let i = 0; i < count; i += 1) html += `<div>Step ${i + 1}</div>`;
      html += "</div>";
      displayedParts.forEach((part) => {
        html += `<div class="gantt-row"><div class="gantt-label">${escapeHtml(memberLabelById(part))}</div>`;
        rows.forEach((row) => {
          const action = row[part] || "Neutre";
          const comment = row.comments && row.comments[part] ? row.comments[part] : "";
          html += action === "Neutre" ? '<div class="gantt-cell"></div>' : `<div class="gantt-cell"><div class="gantt-item"><strong>${escapeHtml(action)}</strong>${comment ? `<div>${escapeHtml(comment)}</div>` : ""}</div></div>`;
        });
        html += "</div>";
      });
      ganttGrid.innerHTML = html;
    }
    function renderMobileGanttView() {
      const rows = getRowsData();
      if (!rows.length) {
        mobileGanttWrap.innerHTML = '<div style="color:#6b7280;">Aucune \xE9tape.</div>';
        return;
      }
      let html = '<div class="mobile-gantt-column">';
      rows.forEach((row, index) => {
        const activeParts = orderedParts().filter((part) => (row[part] || "Neutre") !== "Neutre");
        html += `<div class="mobile-gantt-step"><div class="mobile-gantt-step-title">Step ${index + 1}</div>`;
        if (activeParts.length) {
          activeParts.forEach((part) => {
            const comment = row.comments && row.comments[part] ? row.comments[part] : "";
            html += `<div class="mobile-gantt-item"><strong>${escapeHtml(memberLabelById(part))}</strong> : ${escapeHtml(row[part])}${comment ? `<div>${escapeHtml(comment)}</div>` : ""}</div>`;
          });
        } else {
          html += '<div style="color:#6b7280;">Aucune action non neutre</div>';
        }
        html += "</div>";
      });
      mobileGanttWrap.innerHTML = html + "</div>";
    }
    function renderMobileView() {
      const rows = getRowsData();
      if (!rows.length) {
        mobileStepsWrap.innerHTML = '<div style="color:#6b7280;">Aucune \xE9tape.</div>';
        return;
      }
      const selectedIndex = Number(mobileStepsWrap.dataset.selectedIndex || 0);
      const safeSelectedIndex = Math.min(Math.max(selectedIndex, 0), rows.length - 1);
      mobileStepsWrap.dataset.selectedIndex = String(safeSelectedIndex);
      let html = "";
      rows.forEach((row, index) => {
        const isSelected = index === safeSelectedIndex;
        const activeParts = orderedParts().filter((part) => (row[part] || "Neutre") !== "Neutre");
        html += `<div class="mobile-step-card ${isSelected ? "selected" : "condensed"}" data-step-index="${index}">`;
        html += `<div class="mobile-step-header"><div class="mobile-step-title">Step ${index + 1}</div>${!isSelected ? `<button class="compact-btn secondary" type="button" data-mobile-open="${index}">Ouvrir</button>` : ""}</div>`;
        if (isSelected) {
          html += '<div class="mobile-grid">';
          orderedParts().forEach((part) => {
            const action = row[part] || "Neutre";
            const comment = row.comments && row.comments[part] ? row.comments[part] : "";
            const classes = ["mobile-part"];
            if (action !== "Neutre") classes.push("is-active");
            if (comment) classes.push("has-comment");
            html += `<div class="${classes.join(" ")}" data-mobile-part="${part}" data-step-index="${index}"><div class="mobile-part-label">${escapeHtml(memberLabelById(part))}</div><select data-mobile-select="${part}">`;
            (actionSets[part] || ["Neutre"]).forEach((opt) => {
              html += `<option value="${escapeHtml(opt)}"${opt === action ? " selected" : ""}>${escapeHtml(opt)}</option>`;
            });
            html += `</select><input class="mobile-action-input" type="text" data-mobile-action-input="${part}" placeholder="Action (saisie)" /><textarea data-mobile-comment="${part}" placeholder="Commentaire libre">${escapeHtml(comment)}</textarea></div>`;
          });
          html += `</div><div class="mobile-step-comment"><input type="text" data-mobile-step-comment value="${escapeHtml(row.commentaire || "")}" placeholder="Commentaire global de l'\xE9tape" /></div>`;
          html += `<div class="mobile-step-actions"><button class="compact-btn secondary" type="button" data-mobile-up="${index}">Monter</button><button class="compact-btn secondary" type="button" data-mobile-down="${index}">Descendre</button><button class="compact-btn danger" type="button" data-mobile-delete="${index}">Supprimer</button></div>`;
        } else {
          html += '<div class="mobile-condensed-list">';
          if (activeParts.length) activeParts.forEach((part) => {
            html += `<div class="mobile-condensed-item"><strong>${escapeHtml(memberLabelById(part))}</strong> : ${escapeHtml(row[part])}</div>`;
          });
          else html += '<div class="mobile-condensed-item">Aucune action non neutre</div>';
          html += "</div>";
        }
        html += "</div>";
      });
      mobileStepsWrap.innerHTML = html;
      bindMobileEvents();
    }
    function bindMobileEvents() {
      Array.from(mobileStepsWrap.querySelectorAll("[data-mobile-open]")).forEach((btn) => btn.addEventListener("click", () => {
        mobileStepsWrap.dataset.selectedIndex = btn.getAttribute("data-mobile-open");
        renderMobileView();
      }));
      Array.from(mobileStepsWrap.querySelectorAll("[data-mobile-part]")).forEach((partEl) => partEl.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        partEl.classList.toggle("comment-visible");
        const textarea = partEl.querySelector("textarea");
        if (partEl.classList.contains("comment-visible")) textarea.focus();
      }));
      Array.from(mobileStepsWrap.querySelectorAll("[data-mobile-select]")).forEach((selectEl) => selectEl.addEventListener("change", () => {
        const stepIndex = Number(selectEl.closest(".mobile-step-card").dataset.stepIndex);
        const part = selectEl.getAttribute("data-mobile-select");
        const row = stepsBody.querySelectorAll("tr")[stepIndex];
        const sourceSelect = row.querySelector(`select[data-part="${part}"]`);
        sourceSelect.value = selectEl.value;
        sourceSelect.dispatchEvent(new Event("change"));
      }));
      Array.from(mobileStepsWrap.querySelectorAll("[data-mobile-action-input]")).forEach((inputEl) => {
        const commit = async () => {
          const raw = inputEl.value;
          if (!raw || !raw.trim()) return;
          const stepIndex = Number(inputEl.closest(".mobile-step-card").dataset.stepIndex);
          const part = inputEl.getAttribute("data-mobile-action-input");
          const res = await addActionAndPropagate(part, raw);
          if (res && res.value) {
            const row = stepsBody.querySelectorAll("tr")[stepIndex];
            const sourceSelect = row.querySelector(`select[data-part="${part}"]`);
            sourceSelect.value = res.value;
            sourceSelect.dispatchEvent(new Event("change"));
          }
        };
        inputEl.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            commit();
          }
        });
        inputEl.addEventListener("blur", () => {
          commit();
        });
      });
      Array.from(mobileStepsWrap.querySelectorAll("[data-mobile-comment]")).forEach((textareaEl) => {
        const partEl = textareaEl.closest(".mobile-part");
        textareaEl.addEventListener("focus", () => {
          if (partEl) partEl.classList.add("comment-visible");
        });
        textareaEl.addEventListener("blur", () => {
          if (partEl && !textareaEl.value.trim()) partEl.classList.remove("comment-visible");
        });
        textareaEl.addEventListener("input", () => {
          const stepIndex = Number(textareaEl.closest(".mobile-step-card").dataset.stepIndex);
          const part = textareaEl.getAttribute("data-mobile-comment");
          const row = stepsBody.querySelectorAll("tr")[stepIndex];
          const sourceTextarea = row.querySelector(`textarea[data-comment="${part}"]`);
          sourceTextarea.value = textareaEl.value;
          sourceTextarea.dispatchEvent(new Event("input"));
        });
      });
      Array.from(mobileStepsWrap.querySelectorAll("[data-mobile-step-comment]")).forEach((inputEl) => inputEl.addEventListener("input", () => {
        const stepIndex = Number(inputEl.closest(".mobile-step-card").dataset.stepIndex);
        const row = stepsBody.querySelectorAll("tr")[stepIndex];
        const sourceInput = row.querySelector('input[data-part="commentaire"]');
        sourceInput.value = inputEl.value;
        sourceInput.dispatchEvent(new Event("input"));
      }));
      Array.from(mobileStepsWrap.querySelectorAll("[data-mobile-up]")).forEach((btn) => btn.addEventListener("click", () => {
        const stepIndex = Number(btn.getAttribute("data-mobile-up"));
        const row = stepsBody.querySelectorAll("tr")[stepIndex];
        const previous = row && row.previousElementSibling;
        if (previous) {
          stepsBody.insertBefore(row, previous);
          updateStepNumbers();
        }
      }));
      Array.from(mobileStepsWrap.querySelectorAll("[data-mobile-down]")).forEach((btn) => btn.addEventListener("click", () => {
        const stepIndex = Number(btn.getAttribute("data-mobile-down"));
        const row = stepsBody.querySelectorAll("tr")[stepIndex];
        const next = row && row.nextElementSibling;
        if (next) {
          stepsBody.insertBefore(next, row);
          updateStepNumbers();
        }
      }));
      Array.from(mobileStepsWrap.querySelectorAll("[data-mobile-delete]")).forEach((btn) => btn.addEventListener("click", () => {
        const stepIndex = Number(btn.getAttribute("data-mobile-delete"));
        const row = stepsBody.querySelectorAll("tr")[stepIndex];
        if (row) {
          row.remove();
          if (!stepsBody.children.length) addStep();
          updateStepNumbers();
        }
      }));
    }
    function isEditingStepInput() {
      const active = document.activeElement;
      if (!active) return false;
      return !!active.closest(".case-cell, .mobile-part, .mobile-step-comment");
    }
    function refreshVisuals() {
      updateCellStates();
      renderGanttView();
      if (!isEditingStepInput()) {
        renderMobileView();
        renderMobileGanttView();
      }
    }
    function updateStepNumbers() {
      Array.from(stepsBody.querySelectorAll("tr")).forEach((row, index) => {
        row.querySelector(".step-number").textContent = index + 1;
      });
      refreshVisuals();
    }
    function renderMemberLibrary() {
      if (!memberListCard || !memberListBody) return;
      const collapsed = sessionStorage.getItem("memberListCollapsed") === "1";
      memberListCard.classList.toggle("collapsed", collapsed);
      if (memberListIndicator) memberListIndicator.textContent = collapsed ? "Afficher" : "Replier";
      memberListBody.innerHTML = members.map((m) => `<div class="member-item"><span>${escapeHtml(m.label)}</span><button class="compact-btn secondary" type="button" data-member-edit="${m.id}">Modifier</button><button class="compact-btn danger" type="button" data-member-delete="${m.id}">Supprimer</button></div>`).join("");
      Array.from(memberListBody.querySelectorAll("[data-member-edit]")).forEach((btn) => btn.addEventListener("click", () => renameMember(btn.getAttribute("data-member-edit"))));
      Array.from(memberListBody.querySelectorAll("[data-member-delete]")).forEach((btn) => btn.addEventListener("click", () => deleteMember(btn.getAttribute("data-member-delete"))));
    }
    function populateMemberSelects() {
      const memberSelect2 = $("memberSelect");
      const actionPartSelect2 = $("actionPartSelect");
      if (!memberSelect2 || !actionPartSelect2) return;
      memberSelect2.innerHTML = "";
      actionPartSelect2.innerHTML = "";
      members.forEach((m) => {
        const o1 = document.createElement("option");
        o1.value = m.id;
        o1.textContent = m.label;
        memberSelect2.appendChild(o1);
        const o2 = document.createElement("option");
        o2.value = m.id;
        o2.textContent = m.label;
        actionPartSelect2.appendChild(o2);
      });
      refreshExistingActions();
    }
    async function addMember() {
      const newMemberInput = $("newMemberInput");
      if (!newMemberInput) return;
      const name = newMemberInput.value.trim();
      if (!name) return setMembersInfo("Indiquez un nom de membre.", true);
      const idBase = slugify(name) || "membre";
      let id = idBase;
      let i = 2;
      while (members.some((m) => m.id === id)) {
        id = `${idBase}_${i}`;
        i += 1;
      }
      if (members.some((m) => m.label.toLowerCase() === name.toLowerCase())) return setMembersInfo("Ce membre existe d\xE9j\xE0.", true);
      members.push({ id, label: name });
      actionSets[id] = ["Neutre"];
      await persistMembers();
      await persistCustomActionSets();
      newMemberInput.value = "";
      rebuildAllSelects();
      setMembersInfo(`Membre ajout\xE9 : ${name}`, false);
    }
    async function renameMember(memberId) {
      const targetId = memberId || $("memberSelect").value;
      const member = members.find((m) => m.id === targetId);
      if (!member) return setMembersInfo("Membre introuvable.", true);
      const next = window.prompt("Nouveau nom du membre :", member.label);
      if (!next || !next.trim()) return;
      const newLabel = next.trim();
      if (members.some((m) => m.id !== targetId && m.label.toLowerCase() === newLabel.toLowerCase())) return setMembersInfo("Un membre avec ce nom existe d\xE9j\xE0.", true);
      member.label = newLabel;
      updateMemberLabelEverywhere(targetId, newLabel);
      await persistMembers();
      rebuildAllSelects();
      $("memberSelect").value = targetId;
      $("actionPartSelect").value = targetId;
      setMembersInfo(`Membre renomm\xE9 : ${newLabel}`, false);
    }
    async function deleteMember(memberId) {
      const targetId = memberId || $("memberSelect").value;
      const member = members.find((m) => m.id === targetId);
      if (!member) return setMembersInfo("Membre introuvable.", true);
      if (members.length <= 1) return setMembersInfo("Impossible de supprimer le dernier membre.", true);
      if (!window.confirm(`Supprimer le membre \xAB ${member.label} \xBB ?`)) return;
      members = members.filter((m) => m.id !== targetId);
      delete actionSets[targetId];
      await persistMembers();
      await persistCustomActionSets();
      rebuildAllSelects();
      setMembersInfo(`Membre supprim\xE9 : ${member.label}`, false);
    }
    function refreshExistingActions() {
      const part = $("actionPartSelect").value || orderedParts()[0];
      const select = $("existingActionSelect");
      if (!select) return;
      select.innerHTML = "";
      (actionSets[part] || ["Neutre"]).forEach((action) => {
        const option = document.createElement("option");
        option.value = action;
        option.textContent = action;
        select.appendChild(option);
      });
      renderActionLibrary();
    }
    function renderActionLibrary() {
      if (!actionListBody) return;
      const collapsedState = safeJsonParse(sessionStorage.getItem("actionLibraryCollapsed") || "", {});
      let html = "";
      orderedParts().forEach((part) => {
        const collapsed = !!collapsedState[part];
        html += `<div class="action-list-card${collapsed ? " collapsed" : ""}"><div class="action-list-header" data-toggle-card="${part}"><span>${escapeHtml(memberLabelById(part))}</span><span class="collapse-indicator">${collapsed ? "Afficher" : "Replier"}</span></div><div class="action-list-body">`;
        (actionSets[part] || ["Neutre"]).forEach((action) => {
          html += `<div class="action-item"><span>${escapeHtml(action)}</span><button class="compact-btn secondary" type="button" data-edit-action="${part}||${action.replace(/\|\|/g, "")}">Modifier</button><button class="compact-btn danger" type="button" data-delete-action="${part}||${action.replace(/\|\|/g, "")}">Supprimer</button></div>`;
        });
        html += "</div></div>";
      });
      actionListBody.innerHTML = html;
      Array.from(actionListBody.querySelectorAll("[data-toggle-card]")).forEach((header) => header.addEventListener("click", () => {
        const part = header.getAttribute("data-toggle-card");
        const state = safeJsonParse(sessionStorage.getItem("actionLibraryCollapsed") || "", {});
        state[part] = !state[part];
        sessionStorage.setItem("actionLibraryCollapsed", JSON.stringify(state));
        renderActionLibrary();
      }));
      Array.from(actionListBody.querySelectorAll("[data-edit-action]")).forEach((btn) => btn.addEventListener("click", (event) => {
        event.stopPropagation();
        const parts = btn.getAttribute("data-edit-action").split("||");
        renameAction(parts[0], parts.slice(1).join("||"));
      }));
      Array.from(actionListBody.querySelectorAll("[data-delete-action]")).forEach((btn) => btn.addEventListener("click", (event) => {
        event.stopPropagation();
        const parts = btn.getAttribute("data-delete-action").split("||");
        deleteAction(parts[0], parts.slice(1).join("||"));
      }));
    }
    async function addCustomAction() {
      const actionPartSelect2 = $("actionPartSelect");
      const newActionInput2 = $("newActionInput");
      if (!actionPartSelect2 || !newActionInput2) return;
      const part = actionPartSelect2.value;
      const newAction = newActionInput2.value.trim();
      if (!newAction) return setActionsInfo("Indiquez une action \xE0 ajouter.", true);
      if (newAction.toLowerCase() === "neutre") return setActionsInfo("Le mot Neutre est r\xE9serv\xE9.", true);
      if ((actionSets[part] || []).some((item) => item.toLowerCase() === newAction.toLowerCase())) return setActionsInfo("Cette action existe d\xE9j\xE0 pour ce membre.", true);
      actionSets[part].push(newAction);
      await persistCustomActionSets();
      rebuildAllSelects();
      newActionInput2.value = "";
      setActionsInfo(`Nouvelle action ajout\xE9e : ${newAction}`, false);
    }
    async function renameAction(partArg, actionArg) {
      const part = partArg || $("actionPartSelect").value;
      const action = actionArg || $("existingActionSelect").value;
      if (!action || action === "Neutre") return setActionsInfo("Action non modifiable.", true);
      const next = window.prompt("Nouveau nom de l'action :", action);
      if (!next || !next.trim()) return;
      const newName = next.trim();
      if (newName.toLowerCase() === "neutre") return setActionsInfo("Le mot Neutre est r\xE9serv\xE9.", true);
      if ((actionSets[part] || []).some((item) => item.toLowerCase() === newName.toLowerCase() && item !== action)) return setActionsInfo("Une action avec ce nom existe d\xE9j\xE0.", true);
      actionSets[part] = actionSets[part].map((item) => item === action ? newName : item);
      Array.from(stepsBody.querySelectorAll("tr")).forEach((row) => {
        const select = row.querySelector(`select[data-part="${part}"]`);
        if (select && select.value === action) select.value = newName;
      });
      replaceActionInAllTechniques(part, action, newName);
      await persistCustomActionSets();
      rebuildAllSelects();
      $("actionPartSelect").value = part;
      setActionsInfo(`Action renomm\xE9e : ${action} \u2192 ${newName}`, false);
    }
    async function deleteAction(partArg, actionArg) {
      const part = partArg || $("actionPartSelect").value;
      const action = actionArg || $("existingActionSelect").value;
      if (!action || action === "Neutre") return setActionsInfo("Action non supprimable.", true);
      if (!window.confirm(`Supprimer l'action \xAB ${action} \xBB ?`)) return;
      actionSets[part] = actionSets[part].filter((item) => item !== action);
      Array.from(stepsBody.querySelectorAll("tr")).forEach((row) => {
        const select = row.querySelector(`select[data-part="${part}"]`);
        if (select && select.value === action) select.value = "Neutre";
      });
      replaceActionInAllTechniques(part, action, "Neutre");
      await persistCustomActionSets();
      rebuildAllSelects();
      updateStepNumbers();
      setActionsInfo(`Action supprim\xE9e : ${action}`, false);
    }
    async function resetActionLibrary() {
      if (!window.confirm("R\xE9initialiser toute la biblioth\xE8que d\u2019actions ?")) return;
      actionSets = {};
      members.forEach((m) => {
        actionSets[m.id] = Array.isArray(defaultActionSets[m.id]) ? [...defaultActionSets[m.id]] : ["Neutre"];
      });
      await persistCustomActionSets();
      rebuildAllSelects();
      setActionsInfo("Biblioth\xE8que r\xE9initialis\xE9e.", false);
    }
    function exportActionsJson() {
      const payload = { version: 1, exportedAt: (/* @__PURE__ */ new Date()).toISOString(), members, actionSets };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "bibliotheque-actions-self-defense.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setActionsInfo("Biblioth\xE8que export\xE9e en JSON.", false);
    }
    async function importActionsJsonFromFile(file) {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const parsed = JSON.parse(reader.result);
          if (Array.isArray(parsed.members)) members = parsed.members.map((m) => ({ id: m.id, label: m.label }));
          const incoming = parsed.actionSets || parsed;
          actionSets = {};
          members.forEach((m) => {
            actionSets[m.id] = [];
            const list = Array.isArray(incoming[m.id]) ? incoming[m.id] : Array.isArray(defaultActionSets[m.id]) ? [...defaultActionSets[m.id]] : ["Neutre"];
            list.forEach((action) => {
              const normalized = String(action || "").trim();
              if (normalized && !actionSets[m.id].includes(normalized)) actionSets[m.id].push(normalized);
            });
            if (!actionSets[m.id].includes("Neutre")) actionSets[m.id].unshift("Neutre");
          });
          persistDatabaseLocalFallback();
          if (dbFileHandle) {
            try {
              await writeDatabaseToHandle(dbFileHandle);
            } catch (error) {
              console.error(error);
            }
          }
          rebuildAllSelects();
          setActionsInfo("Biblioth\xE8que import\xE9e.", false);
          setMembersInfo("Membres import\xE9s.", false);
        } catch (error) {
          console.error(error);
          setActionsInfo("Fichier JSON des actions invalide.", true);
        }
      };
      reader.readAsText(file, "utf-8");
    }
    function buildTechniqueObject() {
      return {
        version: TECHNIQUE_SCHEMA_VERSION,
        members,
        title: $("title").value.trim(),
        belt: (document.getElementById("beltSelect") ? document.getElementById("beltSelect").value : "") || "",
        initialState: $("initialState").value.trim(),
        finalState: $("finalState").value.trim(),
        attentionPoints: $("attentionPoints").value.trim(),
        steps: getRowsData(),
        exportedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
    function applyTechniqueData(data) {
      const safe = data || {};
      if (Array.isArray(safe.members) && safe.members.length) {
        safe.members.forEach((m) => {
          if (!m || !m.id) return;
          if (!members.some((existing) => existing.id === m.id)) members.push({ id: m.id, label: m.label || m.id });
          if (!actionSets[m.id]) actionSets[m.id] = Array.isArray(defaultActionSets[m.id]) ? [...defaultActionSets[m.id]] : ["Neutre"];
        });
        renderTableHeader();
        populateMemberSelects();
      }
      $("title").value = safe.title || "";
      const beltSelect2 = document.getElementById("beltSelect");
      if (beltSelect2) beltSelect2.value = safe.belt || "";
      $("initialState").value = safe.initialState || "";
      $("finalState").value = safe.finalState || "";
      $("attentionPoints").value = safe.attentionPoints || "";
      stepsBody.innerHTML = "";
      if (Array.isArray(safe.steps) && safe.steps.length) safe.steps.forEach((step) => {
        if (!step.comments) step.comments = createEmptyComments();
        addStep(step, false);
      });
      else addStep(void 0, false);
      setFileDirty(false);
    }
    function buildPrintSheet() {
      const data = buildTechniqueObject();
      const head = orderedParts().map((part) => `<th>${escapeHtml(memberLabelById(part))}</th>`).join("");
      const rows = data.steps.map((row, index) => {
        const cells = orderedParts().map((part) => {
          const action = escapeHtml(row[part] || "");
          const note = row.comments && row.comments[part] ? `<div><em>${escapeHtml(row.comments[part])}</em></div>` : "";
          return `<td><strong>${action}</strong>${note}</td>`;
        }).join("");
        return `<tr><td>${index + 1}</td>${cells}<td>${escapeHtml(row.commentaire || "")}</td></tr>`;
      }).join("");
      printSheet.innerHTML = `<div class="print-block"><h1>${escapeHtml(data.title || "Technique sans titre")}</h1></div><div class="print-block"><h2>Description g\xE9n\xE9rale</h2><p><span class="print-label">\xC9tat initial :</span> ${escapeHtml(data.initialState || "Non renseign\xE9")}</p><p><span class="print-label">\xC9tat final :</span> ${escapeHtml(data.finalState || "Non renseign\xE9")}</p><p><span class="print-label">Points d'attention :</span> ${escapeHtml(data.attentionPoints || "Non renseign\xE9")}</p></div><div class="print-block"><h2>D\xE9tail des \xE9tapes</h2><table class="print-steps"><thead><tr><th>Step</th>${head}<th>Commentaire \xE9tape</th></tr></thead><tbody>${rows || '<tr><td colspan="14">Aucune \xE9tape renseign\xE9e</td></tr>'}</tbody></table></div>`;
    }
    async function refreshTechniqueList(selectedValue) {
      const select = $("techniqueName");
      const all = await readStoredTechniques();
      const names = Object.keys(all).sort();
      const current = selectedValue !== void 0 ? selectedValue : select.value;
      const filtered = beltFilterValue ? names.filter((n) => all[n] && String(all[n].belt || "") === beltFilterValue) : names;
      select.innerHTML = '<option value="">-- s\xE9lectionner une sauvegarde --</option>';
      filtered.forEach((name) => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        if (name === current) option.selected = true;
        select.appendChild(option);
      });
    }
    function getTechniqueName() {
      return $("techniqueName").value.trim();
    }
    function askTechniqueSaveName() {
      const proposed = getTechniqueName() || $("title").value.trim() || "nouvelle-technique";
      const name = window.prompt("Nom de la sauvegarde :", proposed);
      return name ? name.trim() : "";
    }
    async function saveTechnique() {
      const name = askTechniqueSaveName();
      if (!name) return setStorageInfo("Sauvegarde annul\xE9e ou nom vide.", true);
      const all = await readStoredTechniques();
      all[name] = buildTechniqueObject();
      await writeStoredTechniques(all);
      await refreshTechniqueList(name);
      setStorageInfo(`Technique sauvegard\xE9e (navigateur) : ${name}`, false);
    }
    async function loadTechnique() {
      const name = getTechniqueName();
      const all = await readStoredTechniques();
      if (!name || !all[name]) return setStorageInfo("Technique introuvable.", true);
      applyTechniqueData(all[name]);
      setStorageInfo(`Technique recharg\xE9e : ${name}`, false);
    }
    async function listTechniques() {
      const names = Object.keys(await readStoredTechniques()).sort();
      await refreshTechniqueList(getTechniqueName());
      setStorageInfo(names.length ? `Liste actualis\xE9e : ${names.join(" | ")}` : "Aucune technique sauvegard\xE9e.", false);
    }
    function exportJson() {
      const data = buildTechniqueObject();
      const base = (getTechniqueName() || data.title || "technique-self-defense").toLowerCase().replace(/[^a-z0-9àâçéèêëîïôûùüÿñæœ_-]+/gi, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${base || "technique"}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setStorageInfo("Export JSON effectu\xE9.", false);
    }
    function importJsonFromFile(file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          applyTechniqueData(JSON.parse(reader.result));
          setStorageInfo("Import JSON r\xE9ussi.", false);
        } catch (error) {
          console.error(error);
          setStorageInfo("Le fichier JSON est invalide.", true);
        }
      };
      reader.readAsText(file, "utf-8");
    }
    function clearAll() {
      if (!window.confirm("Supprimer toutes les \xE9tapes du tableau ?")) return;
      stepsBody.innerHTML = "";
      addStep();
      setStorageInfo("Tableau vid\xE9.", false);
    }
    function duplicateLastStep() {
      const rows = getRowsData();
      addStep(rows.length ? JSON.parse(JSON.stringify(rows[rows.length - 1])) : void 0);
      setStorageInfo("Derni\xE8re \xE9tape dupliqu\xE9e.", false);
    }
    function loadDemo() {
      applyTechniqueData({ title: "D\xE9fense sur saisie poignet + contre", initialState: "L'adversaire saisit le poignet droit. Distance courte. Garde rel\xE2ch\xE9e mais posture stable.", finalState: "Le poignet est d\xE9gag\xE9, l'angle est repris et l'adversaire est contr\xF4l\xE9 \xE0 distance de s\xE9curit\xE9.", attentionPoints: "Ne pas tirer en force. Tourner dans l'axe faible de la saisie. Garder le menton rentr\xE9 et reprendre la distance apr\xE8s le contre.", steps: [{ tete: "Regarder l'adversaire", menton: "Rentr\xE9", coude_droit: "Coll\xE9 au corps", coude_gauche: "Lev\xE9 garde haute", main_droite: "Saisie poignet adverse", main_gauche: "Garde visage", hanche_droite: "Rotation externe", hanche_gauche: "Abaissement centre de gravit\xE9", genou_droit: "Fl\xE9chi", genou_gauche: "Ancr\xE9", pied_droit: "Pivot sur place", pied_gauche: "Ancr\xE9 au sol", commentaire: "Cr\xE9er de la structure avant le d\xE9gagement.", comments: { tete: "Vision p\xE9riph\xE9rique active", menton: "Prot\xE9g\xE9", coude_droit: "Compact", coude_gauche: "Garde haute", main_droite: "Serrer sans crispation", main_gauche: "Couvre", hanche_droite: "Pr\xE9parer rotation", hanche_gauche: "Base stable", genou_droit: "Souple", genou_gauche: "Porteur", pied_droit: "Pivot court", pied_gauche: "Ancrage" } }] });
      setStorageInfo("Exemple charg\xE9.", false);
    }
    function applyResponsiveMode() {
      const isMobile = window.innerWidth <= 700;
      if (isMobile) {
        if (tableWrap) tableWrap.classList.remove("active");
        if (ganttWrap) ganttWrap.classList.remove("active");
        if (mobileStepsWrap && mobileGanttWrap && !mobileStepsWrap.classList.contains("active") && !mobileGanttWrap.classList.contains("active")) mobileStepsWrap.classList.add("active");
        syncMobileViewSwitch();
      } else {
        if (mobileStepsWrap) mobileStepsWrap.classList.remove("active");
        if (mobileGanttWrap) mobileGanttWrap.classList.remove("active");
        if (tableWrap && ganttWrap && !tableWrap.classList.contains("active") && !ganttWrap.classList.contains("active")) tableWrap.classList.add("active");
        syncMobileViewSwitch();
      }
    }
    function showPage(pageId) {
      Array.from(document.querySelectorAll(".page")).forEach((page2) => page2.classList.remove("active"));
      const page = document.getElementById(pageId);
      if (page) page.classList.add("active");
      Array.from(document.querySelectorAll(".nav-btn")).forEach((btn) => btn.classList.toggle("active", btn.getAttribute("data-page") === pageId));
      if (pageId === "actionsPage") refreshExistingActions();
      if (pageId === "membersPage") renderMemberLibrary();
      if (pageId === "mergePage") renderMergePage();
    }
    function getMergeEls() {
      return {
        status: document.getElementById("mergeStatus"),
        warnings: document.getElementById("mergeWarnings"),
        members: document.getElementById("mergeMembersDiff"),
        actions: document.getElementById("mergeActionsDiff"),
        techniques: document.getElementById("mergeTechniquesDiff"),
        applyBtn: document.getElementById("applyMergeBtn"),
        cancelBtn: document.getElementById("cancelMergeBtn"),
        forceDeps: document.getElementById("mergeForceDeps")
      };
    }
    function computeTechniqueFingerprint(tech) {
      const safe = tech && typeof tech === "object" ? tech : {};
      return stableStringify({
        title: safe.title || "",
        initialState: safe.initialState || "",
        finalState: safe.finalState || "",
        attentionPoints: safe.attentionPoints || "",
        members: Array.isArray(safe.members) ? safe.members.map((m) => ({ id: m && m.id ? m.id : "", label: m && m.label ? m.label : "" })) : [],
        steps: Array.isArray(safe.steps) ? safe.steps : []
      });
    }
    function suggestTechniqueImportName(baseName) {
      let candidate = `${baseName} (import)`;
      if (!techniquesByName[candidate]) return candidate;
      let i = 2;
      candidate = `${baseName} (import ${i})`;
      while (techniquesByName[candidate]) {
        i += 1;
        candidate = `${baseName} (import ${i})`;
      }
      return candidate;
    }
    function computeMergeDiff(incomingDb) {
      const safe = incomingDb && typeof incomingDb === "object" ? incomingDb : {};
      const incomingMembers = Array.isArray(safe.members) ? safe.members.filter((m) => m && m.id) : [];
      const incomingActionSets = safe.actionSets && typeof safe.actionSets === "object" ? safe.actionSets : {};
      const incomingTechniques = safe.techniques && typeof safe.techniques === "object" ? safe.techniques : {};
      const memberAdds = [];
      const memberLabelUpdates = [];
      incomingMembers.forEach((m) => {
        const existing = members.find((x) => x.id === m.id);
        if (!existing) memberAdds.push({ id: m.id, label: m.label || m.id });
        else if ((m.label || "") !== (existing.label || "")) memberLabelUpdates.push({ id: m.id, from: existing.label || "", to: m.label || m.id });
      });
      const actionAdds = [];
      Object.keys(incomingActionSets).forEach((partId) => {
        const incoming = Array.isArray(incomingActionSets[partId]) ? incomingActionSets[partId] : [];
        const current = Array.isArray(actionSets[partId]) ? actionSets[partId] : Array.isArray(defaultActionSets[partId]) ? [...defaultActionSets[partId]] : ["Neutre"];
        incoming.forEach((action) => {
          if (!action) return;
          if (!current.includes(action)) actionAdds.push({ partId, action });
        });
      });
      const techniqueAdds = [];
      const techniqueConflicts = [];
      const techniqueSame = [];
      Object.keys(incomingTechniques).forEach((name) => {
        const incomingTech = incomingTechniques[name];
        if (!incomingTech || typeof incomingTech !== "object") return;
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
      const memberById = new Map(diff.incomingMembers.map((m) => [m.id, m]));
      const membersSelected = {};
      diff.memberAdds.forEach((m) => {
        membersSelected[m.id] = true;
      });
      diff.memberLabelUpdates.forEach((m) => {
        membersSelected[m.id] = true;
      });
      const actionsSelected = {};
      diff.actionAdds.forEach((item) => {
        actionsSelected[`${item.partId}||${item.action}`] = true;
      });
      const techniquesSelected = {};
      diff.techniqueAdds.forEach((t) => {
        techniquesSelected[t.name] = true;
      });
      diff.techniqueConflicts.forEach((t) => {
        techniquesSelected[t.name] = true;
      });
      return { memberById, membersSelected, actionsSelected, techniquesSelected, forceDeps: false };
    }
    function computeMergeWarnings(diff, selection) {
      const selectedMemberIds = /* @__PURE__ */ new Set();
      Object.keys(selection.membersSelected).forEach((id) => {
        if (selection.membersSelected[id]) selectedMemberIds.add(id);
      });
      members.forEach((m) => selectedMemberIds.add(m.id));
      const selectedActionKeys = /* @__PURE__ */ new Set();
      Object.keys(selection.actionsSelected).forEach((k) => {
        if (selection.actionsSelected[k]) selectedActionKeys.add(k);
      });
      const warnings = [];
      const selectedTechniques = Object.keys(selection.techniquesSelected).filter((name) => selection.techniquesSelected[name]);
      selectedTechniques.forEach((name) => {
        const tech = diff.incomingTechniques[name];
        if (!tech || typeof tech !== "object") return;
        const missingMembers = [];
        if (Array.isArray(tech.members)) {
          tech.members.forEach((m) => {
            if (!m || !m.id) return;
            if (!selectedMemberIds.has(m.id)) missingMembers.push(m.id);
          });
        }
        const missingActions = [];
        if (Array.isArray(tech.steps)) {
          tech.steps.forEach((step) => {
            if (!step || typeof step !== "object") return;
            Object.keys(step).forEach((partId) => {
              if (partId === "comments" || partId === "commentaire") return;
              const val = step[partId];
              if (!val || val === "Neutre") return;
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
      container.innerHTML = `<div class="diff-list">${itemsHtml || ""}</div>`;
    }
    function renderMergePage() {
      const els = getMergeEls();
      if (!els.status || !els.members || !els.actions || !els.techniques || !els.warnings) return;
      if (!pendingMerge) {
        els.status.textContent = translate("merge_hint");
        renderMergeList(els.members, "");
        renderMergeList(els.actions, "");
        renderMergeList(els.techniques, "");
        els.warnings.innerHTML = "";
        return;
      }
      const diff = pendingMerge.diff;
      const selection = pendingMerge.selection;
      els.status.textContent = pendingMerge.sourceLabel || "";
      if (els.forceDeps) els.forceDeps.checked = !!selection.forceDeps;
      const memberRows = [];
      diff.memberAdds.forEach((m) => {
        const checked = selection.membersSelected[m.id] ? "checked" : "";
        memberRows.push(`<div class="diff-item"><input type="checkbox" data-merge-member="${escapeHtml(m.id)}" ${checked} /><div><div class="diff-title">+ ${escapeHtml(m.label)}</div><div class="diff-meta">id: ${escapeHtml(m.id)}</div></div></div>`);
      });
      diff.memberLabelUpdates.forEach((m) => {
        const checked = selection.membersSelected[m.id] ? "checked" : "";
        memberRows.push(`<div class="diff-item"><input type="checkbox" data-merge-member="${escapeHtml(m.id)}" ${checked} /><div><div class="diff-title">~ ${escapeHtml(m.id)}</div><div class="diff-meta">${escapeHtml(m.from)} \u2192 ${escapeHtml(m.to)}</div></div></div>`);
      });
      if (!memberRows.length) memberRows.push(`<div class="hint">${escapeHtml("Aucun changement membre.")}</div>`);
      renderMergeList(els.members, memberRows.join(""));
      const actionRows = [];
      diff.actionAdds.forEach((item) => {
        const key = `${item.partId}||${item.action}`;
        const checked = selection.actionsSelected[key] ? "checked" : "";
        actionRows.push(`<div class="diff-item"><input type="checkbox" data-merge-action="${escapeHtml(key)}" ${checked} /><div><div class="diff-title">+ ${escapeHtml(item.action)}</div><div class="diff-meta">${escapeHtml(memberLabelById(item.partId))} (${escapeHtml(item.partId)})</div></div></div>`);
      });
      if (!actionRows.length) actionRows.push(`<div class="hint">${escapeHtml("Aucun ajout d'action.")}</div>`);
      renderMergeList(els.actions, actionRows.join(""));
      const techRows = [];
      diff.techniqueAdds.forEach((t) => {
        const checked = selection.techniquesSelected[t.name] ? "checked" : "";
        techRows.push(`<div class="diff-item"><input type="checkbox" data-merge-technique="${escapeHtml(t.name)}" ${checked} /><div><div class="diff-title">+ ${escapeHtml(t.name)}</div><div class="diff-meta"></div></div></div>`);
      });
      diff.techniqueConflicts.forEach((t) => {
        const checked = selection.techniquesSelected[t.name] ? "checked" : "";
        techRows.push(`<div class="diff-item"><input type="checkbox" data-merge-technique="${escapeHtml(t.name)}" ${checked} /><div><div class="diff-title">! ${escapeHtml(t.name)}</div><div class="diff-meta">conflit \u2192 ${escapeHtml(t.targetName)}</div></div></div>`);
      });
      if (!techRows.length) techRows.push(`<div class="hint">${escapeHtml("Aucune technique \xE0 ajouter.")}</div>`);
      renderMergeList(els.techniques, techRows.join(""));
      const warnings = computeMergeWarnings(diff, selection);
      if (!warnings.length) {
        els.warnings.innerHTML = '<div class="hint">OK.</div>';
      } else {
        els.warnings.innerHTML = `<div class="warnings-list">${warnings.map((w) => {
          const membersText = w.missingMembers && w.missingMembers.length ? `Membres manquants: ${w.missingMembers.map(escapeHtml).join(", ")}` : "";
          const actionsText = w.missingActions && w.missingActions.length ? `Actions manquantes: ${w.missingActions.map(escapeHtml).join(", ")}` : "";
          const parts = [membersText, actionsText].filter(Boolean).join(" | ");
          return `<div class="warning-item"><strong>${escapeHtml(w.technique)}</strong><div>${parts}</div></div>`;
        }).join("")}</div>`;
      }
      Array.from(document.querySelectorAll("[data-merge-member]")).forEach((cb) => cb.addEventListener("change", () => {
        const id = cb.getAttribute("data-merge-member");
        selection.membersSelected[id] = cb.checked;
        renderMergePage();
      }));
      Array.from(document.querySelectorAll("[data-merge-action]")).forEach((cb) => cb.addEventListener("change", () => {
        const key = cb.getAttribute("data-merge-action");
        selection.actionsSelected[key] = cb.checked;
        renderMergePage();
      }));
      Array.from(document.querySelectorAll("[data-merge-technique]")).forEach((cb) => cb.addEventListener("change", () => {
        const key = cb.getAttribute("data-merge-technique");
        selection.techniquesSelected[key] = cb.checked;
        renderMergePage();
      }));
      if (els.forceDeps) els.forceDeps.addEventListener("change", () => {
        selection.forceDeps = !!els.forceDeps.checked;
        renderMergePage();
      });
    }
    function cancelPendingMerge() {
      pendingMerge = null;
      renderMergePage();
      showPage("techniquesPage");
      setStorageInfo("Fusion annul\xE9e.", false);
    }
    function ensureMemberExists(memberObj) {
      if (!memberObj || !memberObj.id) return;
      if (!members.some((m) => m.id === memberObj.id)) members.push({ id: memberObj.id, label: memberObj.label || memberObj.id });
      if (!actionSets[memberObj.id]) actionSets[memberObj.id] = Array.isArray(defaultActionSets[memberObj.id]) ? [...defaultActionSets[memberObj.id]] : ["Neutre"];
      if (!actionSets[memberObj.id].includes("Neutre")) actionSets[memberObj.id].unshift("Neutre");
    }
    function ensureActionExists(partId, action) {
      if (!partId || !action || action === "Neutre") return;
      if (!actionSets[partId]) actionSets[partId] = Array.isArray(defaultActionSets[partId]) ? [...defaultActionSets[partId]] : ["Neutre"];
      if (!actionSets[partId].includes(action)) actionSets[partId].push(action);
      if (!actionSets[partId].includes("Neutre")) actionSets[partId].unshift("Neutre");
      if (actionSets[partId][0] !== "Neutre") {
        actionSets[partId] = actionSets[partId].filter((x) => x !== "Neutre");
        actionSets[partId].unshift("Neutre");
      }
    }
    async function applyPendingMerge() {
      const els = getMergeEls();
      if (!pendingMerge) return;
      const diff = pendingMerge.diff;
      const selection = pendingMerge.selection;
      const selectedMemberIds = Object.keys(selection.membersSelected).filter((id) => selection.membersSelected[id]);
      selectedMemberIds.forEach((id) => {
        const incoming = diff.incomingMembers.find((m) => m && m.id === id);
        if (!incoming) return;
        const existing = members.find((m) => m.id === id);
        if (!existing) members.push({ id, label: incoming.label || id });
        else existing.label = incoming.label || id;
        if (!actionSets[id]) actionSets[id] = Array.isArray(defaultActionSets[id]) ? [...defaultActionSets[id]] : ["Neutre"];
        actionSets[id] = mergeUniqueActions(actionSets[id], diff.incomingActionSets[id]);
      });
      Object.keys(selection.actionsSelected).forEach((key) => {
        if (!selection.actionsSelected[key]) return;
        const [partId, action] = key.split("||");
        ensureMemberExists({ id: partId, label: memberLabelById(partId) });
        ensureActionExists(partId, action);
      });
      const selectedTechniques = Object.keys(selection.techniquesSelected).filter((name) => selection.techniquesSelected[name]);
      selectedTechniques.forEach((name) => {
        const tech = diff.incomingTechniques[name];
        if (!tech || typeof tech !== "object") return;
        if (selection.forceDeps) {
          if (Array.isArray(tech.members)) tech.members.forEach(ensureMemberExists);
          if (Array.isArray(tech.steps)) {
            tech.steps.forEach((step) => {
              if (!step || typeof step !== "object") return;
              Object.keys(step).forEach((key) => {
                if (key === "comments" || key === "commentaire") return;
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
      if (els.status) els.status.textContent = "";
      setStorageInfo("Fusion effectu\xE9e. Pensez \xE0 sauvegarder la base JSON.", false);
      showPage("techniquesPage");
    }
    async function initializeData(rebuildTechniqueList = false) {
      const localDb = readDatabaseLocalFallback();
      if (localDb) applyDatabaseObject(localDb);
      renderBeltsList();
      renderBeltSelects();
      renderTableHeader();
      populateMemberSelects();
      renderMemberLibrary();
      if (!stepsBody.children.length) addStep();
      else rebuildAllSelects();
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
      stepsBody.innerHTML = "";
      if (snapshot.length) snapshot.forEach((step) => addStep(step));
      else addStep();
    }
    function bindCollapsibleCard(cardId, storageKey) {
      const card = document.getElementById(cardId);
      if (!card) return;
      const header = card.querySelector(".collapsible-header");
      if (!header) return;
      const indicator = header.querySelector(".collapse-indicator");
      const applyState = (collapsed2) => {
        card.classList.toggle("collapsed", collapsed2);
        if (indicator) indicator.textContent = collapsed2 ? "Afficher" : "Replier";
      };
      const storedState = sessionStorage.getItem(storageKey);
      const collapsed = storedState === null ? true : storedState === "1";
      applyState(collapsed);
      header.addEventListener("click", () => {
        const isCollapsed = card.classList.contains("collapsed");
        sessionStorage.setItem(storageKey, isCollapsed ? "0" : "1");
        applyState(!isCollapsed);
      });
    }
    Array.from(document.querySelectorAll(".nav-btn")).forEach((btn) => btn.addEventListener("click", () => {
      const pageId = btn.getAttribute("data-page");
      if (pageId) showPage(pageId);
    }));
    const openDatabaseBtn = $("openDatabaseBtn");
    if (openDatabaseBtn) openDatabaseBtn.addEventListener("click", openDatabase);
    const loadDatabaseUrlBtn = $("loadDatabaseUrlBtn");
    if (loadDatabaseUrlBtn) loadDatabaseUrlBtn.addEventListener("click", loadDatabaseFromUrl);
    const mergeDatabaseBtn = $("mergeDatabaseBtn");
    if (mergeDatabaseBtn) mergeDatabaseBtn.addEventListener("click", mergeDatabase);
    const applyMergeBtn = document.getElementById("applyMergeBtn");
    if (applyMergeBtn) applyMergeBtn.addEventListener("click", applyPendingMerge);
    const cancelMergeBtn = document.getElementById("cancelMergeBtn");
    if (cancelMergeBtn) cancelMergeBtn.addEventListener("click", cancelPendingMerge);
    const openDatabaseFile = document.getElementById("openDatabaseFile");
    if (openDatabaseFile) openDatabaseFile.addEventListener("change", async (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      try {
        await openDatabaseFromFileInput(file);
      } catch (error) {
        console.error(error);
        setStorageInfo("Le fichier JSON est invalide.", true);
      }
      event.target.value = "";
    });
    const mergeDatabaseFile = document.getElementById("mergeDatabaseFile");
    if (mergeDatabaseFile) mergeDatabaseFile.addEventListener("change", async (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      try {
        await mergeDatabaseFromFileInput(file);
      } catch (error) {
        console.error(error);
        setStorageInfo("Le fichier JSON est invalide.", true);
      }
      event.target.value = "";
    });
    const startupOpenDbBtn = document.getElementById("startupOpenDbBtn");
    if (startupOpenDbBtn) startupOpenDbBtn.addEventListener("click", openDatabase);
    const startupContinueLocalBtn = document.getElementById("startupContinueLocalBtn");
    if (startupContinueLocalBtn) startupContinueLocalBtn.addEventListener("click", () => {
      hideStartupModal();
      setStorageInfo("Mode local navigateur. Vous pourrez ouvrir un fichier JSON plus tard.", false);
    });
    const newTechniqueBtn = $("newTechniqueBtn");
    if (newTechniqueBtn) newTechniqueBtn.addEventListener("click", async () => {
      if (storageMode !== "local" || !dbFileHandle) {
        const loaded = await loadExistingLocalDatabaseForEdit();
        if (!loaded) {
          setStorageInfo("Cr\xE9ation annul\xE9e : aucun fichier local s\xE9lectionn\xE9.", true);
          return;
        }
      }
      const techniqueSelect2 = $("techniqueName");
      if (techniqueSelect2) {
        techniqueSelect2.value = "";
        techniqueSelect2.title = "";
      }
      applyTechniqueData({});
      showEditView();
      openGeneralInfoAndFocusTitle();
      setStorageInfo("Nouvelle technique.", false);
    });
    const deleteTechniqueBtn = $("deleteTechniqueBtn");
    if (deleteTechniqueBtn) deleteTechniqueBtn.addEventListener("click", async () => {
      const name = getTechniqueName();
      if (!name) return setStorageInfo("S\xE9lectionnez une technique \xE0 supprimer.", true);
      if (!window.confirm(`Supprimer la technique \xAB ${name} \xBB ?`)) return;
      const all = await readStoredTechniques();
      delete all[name];
      await writeStoredTechniques(all);
      await refreshTechniqueList("");
      applyTechniqueData({});
      setStorageInfo(`Technique supprim\xE9e : ${name}`, false);
    });
    const saveTechniqueBtn = $("saveTechniqueBtn");
    if (saveTechniqueBtn) saveTechniqueBtn.addEventListener("click", saveTechnique);
    const saveDatabaseBtn = $("saveDatabaseBtn");
    if (saveDatabaseBtn) saveDatabaseBtn.addEventListener("click", saveDatabase);
    const saveAsDatabaseBtn = $("saveAsDatabaseBtn");
    if (saveAsDatabaseBtn) saveAsDatabaseBtn.addEventListener("click", saveDatabaseAs);
    const techniqueSelect = $("techniqueName");
    if (techniqueSelect) techniqueSelect.addEventListener("change", loadTechnique);
    const titleInput = $("title");
    if (titleInput) titleInput.addEventListener("input", markFileDirty);
    const initialStateInput = $("initialState");
    if (initialStateInput) initialStateInput.addEventListener("input", markFileDirty);
    const finalStateInput = $("finalState");
    if (finalStateInput) finalStateInput.addEventListener("input", markFileDirty);
    const attentionPointsInput = $("attentionPoints");
    if (attentionPointsInput) attentionPointsInput.addEventListener("input", markFileDirty);
    const addStepBtn = $("addStepBtn");
    if (addStepBtn) addStepBtn.addEventListener("click", () => addStep());
    const tableViewBtn = $("tableViewBtn");
    if (tableViewBtn && tableWrap && ganttWrap) tableViewBtn.addEventListener("click", showDesktopEditView);
    const ganttViewBtn = $("ganttViewBtn");
    if (ganttViewBtn && tableWrap && ganttWrap) ganttViewBtn.addEventListener("click", showDesktopReadView);
    const mobileViewSwitchToggle = $("mobileViewSwitchToggle");
    if (mobileViewSwitchToggle && mobileStepsWrap && mobileGanttWrap) mobileViewSwitchToggle.addEventListener("change", switchMobileView);
    const memberSelect = $("memberSelect");
    if (memberSelect) memberSelect.addEventListener("change", () => {
      const id = memberSelect.value;
      const actionPartSelect2 = $("actionPartSelect");
      if (actionPartSelect2) actionPartSelect2.value = id;
      refreshExistingActions();
    });
    const addMemberBtn = $("addMemberBtn");
    if (addMemberBtn) addMemberBtn.addEventListener("click", addMember);
    const renameMemberBtn = $("renameMemberBtn");
    if (renameMemberBtn) renameMemberBtn.addEventListener("click", () => renameMember());
    const deleteMemberBtn = $("deleteMemberBtn");
    if (deleteMemberBtn) deleteMemberBtn.addEventListener("click", () => deleteMember());
    const actionPartSelect = $("actionPartSelect");
    if (actionPartSelect) actionPartSelect.addEventListener("change", refreshExistingActions);
    const addActionBtn = $("addActionBtn");
    if (addActionBtn) addActionBtn.addEventListener("click", addCustomAction);
    const newActionInput = $("newActionInput");
    if (newActionInput) newActionInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addCustomAction();
      }
    });
    const renameActionBtn = $("renameActionBtn");
    if (renameActionBtn) renameActionBtn.addEventListener("click", () => renameAction());
    const deleteActionBtn = $("deleteActionBtn");
    if (deleteActionBtn) deleteActionBtn.addEventListener("click", () => deleteAction());
    const exportConfigBtn = $("exportConfigBtn");
    if (exportConfigBtn) exportConfigBtn.addEventListener("click", exportActionsJson);
    const importConfigBtn = $("importConfigBtn");
    if (importConfigBtn && importActionsFile) importConfigBtn.addEventListener("click", () => importActionsFile.click());
    if (importActionsFile) importActionsFile.addEventListener("change", (event) => {
      const file = event.target.files && event.target.files[0];
      if (file) importActionsJsonFromFile(file);
      event.target.value = "";
    });
    bindCollapsibleCard("memberListCard", "memberListCollapsed");
    bindCollapsibleCard("generalInfoCard", "generalInfoCollapsed");
    window.addEventListener("resize", applyResponsiveMode);
    const themeSelect = $("themeSelect");
    if (themeSelect) themeSelect.addEventListener("change", () => applyTheme(themeSelect.value));
    const languageSelect = document.getElementById("languageSelect");
    if (languageSelect) languageSelect.addEventListener("change", () => applyLanguage(languageSelect.value));
    const hoverCommentsToggle = document.getElementById("hoverCommentsToggle");
    if (hoverCommentsToggle) hoverCommentsToggle.addEventListener("change", () => applyHoverComments(hoverCommentsToggle.checked));
    const manualActionsToggle = document.getElementById("manualActionsToggle");
    if (manualActionsToggle) manualActionsToggle.addEventListener("change", () => applyManualActions(manualActionsToggle.checked));
    const expertModeToggle = document.getElementById("expertModeToggle");
    if (expertModeToggle) expertModeToggle.addEventListener("change", () => applyExpertMode(expertModeToggle.checked));
    const cloudLocalSwitch = document.getElementById("cloudLocalSwitch");
    if (cloudLocalSwitch) cloudLocalSwitch.addEventListener("click", switchStorageMode);
    const addBeltBtn = document.getElementById("addBeltBtn");
    if (addBeltBtn) addBeltBtn.addEventListener("click", async () => {
      const input = document.getElementById("newBeltInput");
      const raw = input ? input.value : "";
      const label = String(raw || "").trim();
      if (!label) return;
      const next = normalizeBeltsList([...belts || [], label]);
      applyBelts(next);
      if (input) input.value = "";
      persistDatabaseLocalFallback();
      if (dbFileHandle) {
        try {
          await writeDatabaseToHandle(dbFileHandle);
        } catch (error) {
          console.error(error);
        }
      }
      markFileDirty();
    });
    const beltSelect = document.getElementById("beltSelect");
    if (beltSelect) beltSelect.addEventListener("change", () => {
      markFileDirty();
    });
    const beltFilterSelect = document.getElementById("beltFilterSelect");
    if (beltFilterSelect) beltFilterSelect.addEventListener("change", async () => {
      beltFilterValue = beltFilterSelect.value || "";
      await refreshTechniqueList(getTechniqueName());
    });
    const restoreBackupBtn = document.getElementById("restoreBackupBtn");
    if (restoreBackupBtn) restoreBackupBtn.addEventListener("click", async () => {
      if (!window.confirm("Restaurer la derni\xE8re sauvegarde automatique ? Les donn\xE9es non sauvegard\xE9es seront remplac\xE9es.")) return;
      await restoreLatestBackup();
    });
    let activeFieldRecognizer = null;
    let activeMicButton = null;
    let commandRecognizer = null;
    let voiceStepIndex = 0;
    function setVoiceTranscript(text) {
      const el = document.getElementById("voiceTranscript");
      if (el) el.textContent = text || "";
    }
    function setVoiceFeedback(text) {
      const el = document.getElementById("voiceFeedback");
      if (el) el.textContent = text || "";
    }
    function updateVoiceStepLabel() {
      const el = document.getElementById("voiceStepLabel");
      if (el) el.textContent = `${translate("voice_step")} ${voiceStepIndex + 1}`;
    }
    function getVoiceRow() {
      let rows = stepsBody.querySelectorAll("tr");
      if (!rows.length) {
        addStep();
        rows = stepsBody.querySelectorAll("tr");
      }
      if (!Number.isFinite(voiceStepIndex) || voiceStepIndex < 0 || voiceStepIndex >= rows.length) {
        voiceStepIndex = rows.length - 1;
      }
      return rows[voiceStepIndex];
    }
    function setRowAction(row, part, value) {
      if (!row) return;
      const select = row.querySelector(`select[data-part="${part}"]`);
      if (!select) return;
      if (!Array.from(select.options).some((o) => o.value === value)) {
        const opt = document.createElement("option");
        opt.value = value;
        opt.textContent = value;
        select.appendChild(opt);
      }
      select.value = value;
      select.dispatchEvent(new Event("change"));
    }
    function matchMemberFromUtterance(norm) {
      let best = null;
      const consider = (m) => {
        const label = normalize(m.label);
        if (!label) return;
        if (norm.startsWith(label) || norm.includes(label)) {
          if (!best || label.length > normalize(best.label).length) best = m;
        }
      };
      members.forEach(consider);
      return best;
    }
    function applyVoiceCommand(transcript) {
      const norm = normalize(transcript);
      if (!norm) return;
      if (/(nouvelle etape|etape suivante|new step|next step|neue stufe|nachste etappe)/.test(norm)) {
        addStep();
        voiceStepIndex = stepsBody.querySelectorAll("tr").length - 1;
        refreshVisuals();
        updateVoiceStepLabel();
        setVoiceFeedback(`${translate("voice_new_step")} ${voiceStepIndex + 1}`);
        return;
      }
      if (/(etape precedente|previous step|vorherige etappe)/.test(norm)) {
        if (voiceStepIndex > 0) voiceStepIndex -= 1;
        updateVoiceStepLabel();
        setVoiceFeedback(updateVoiceStepLabelText());
        return;
      }
      const member = matchMemberFromUtterance(norm);
      if (!member) {
        setVoiceFeedback(translate("voice_no_member"));
        return;
      }
      const memberLabel = normalize(member.label);
      const remainder = norm.startsWith(memberLabel) ? norm.slice(memberLabel.length).trim() : norm.replace(memberLabel, "").trim();
      const candidates = actionSets[member.id] || ["Neutre"];
      const match = bestMatch(remainder || norm, candidates);
      if (!match) {
        setVoiceFeedback(`${member.label} : ${translate("voice_no_action")}`);
        return;
      }
      setRowAction(getVoiceRow(), member.id, match.value);
      setVoiceFeedback(`${translate("voice_step")} ${voiceStepIndex + 1} \u2014 ${member.label} : ${match.value}`);
    }
    function updateVoiceStepLabelText() {
      return `${translate("voice_step")} ${voiceStepIndex + 1}`;
    }
    function startCommandMode() {
      if (!isRecognitionSupported()) return;
      const rows = stepsBody.querySelectorAll("tr");
      voiceStepIndex = Math.max(0, rows.length - 1);
      const panel = document.getElementById("voicePanel");
      const btn = document.getElementById("voiceCommandBtn");
      if (panel) panel.hidden = false;
      if (btn) btn.classList.add("listening");
      setVoiceTranscript("");
      setVoiceFeedback("");
      updateVoiceStepLabel();
      commandRecognizer = createRecognizer({
        lang: speechLangFor(currentLanguage),
        continuous: true,
        interimResults: true,
        onResult: ({ transcript, isFinal }) => {
          setVoiceTranscript(transcript);
          if (isFinal) {
            applyVoiceCommand(transcript);
            setVoiceTranscript("");
          }
        },
        onError: (err) => {
          if (err === "not-allowed" || err === "service-not-allowed") {
            setVoiceFeedback(translate("voice_denied"));
            stopCommandMode();
          }
        }
      });
      commandRecognizer.start();
    }
    function stopCommandMode() {
      if (commandRecognizer) commandRecognizer.stop();
      commandRecognizer = null;
      const panel = document.getElementById("voicePanel");
      const btn = document.getElementById("voiceCommandBtn");
      if (panel) panel.hidden = true;
      if (btn) btn.classList.remove("listening");
    }
    function toggleFieldDictation(targetId, btn) {
      if (activeFieldRecognizer) {
        activeFieldRecognizer.stop();
        return;
      }
      const el = document.getElementById(targetId);
      if (!el) return;
      activeMicButton = btn;
      btn.classList.add("listening");
      activeFieldRecognizer = createRecognizer({
        lang: speechLangFor(currentLanguage),
        continuous: false,
        interimResults: false,
        onResult: ({ transcript, isFinal }) => {
          if (!isFinal) return;
          const sep = el.value && !/\s$/.test(el.value) ? " " : "";
          el.value = (el.value + sep + transcript).trim();
          el.dispatchEvent(new Event("input"));
        },
        onError: () => {
        },
        onEnd: () => {
          if (activeMicButton) activeMicButton.classList.remove("listening");
          activeMicButton = null;
          activeFieldRecognizer = null;
        }
      });
      activeFieldRecognizer.start();
    }
    function readTechniqueAloud() {
      const fragments = [];
      const titleEl = document.getElementById("titleInput");
      const title = titleEl ? titleEl.value.trim() : "";
      if (title) fragments.push(`${translate("title")} : ${title}`);
      const rows = Array.from(stepsBody.querySelectorAll("tr"));
      rows.forEach((row, idx) => {
        const parts = [];
        members.forEach((m) => {
          const select = row.querySelector(`select[data-part="${m.id}"]`);
          const value = select ? select.value : "Neutre";
          if (value && normalize(value) !== "neutre") parts.push(`${m.label}, ${value}`);
        });
        const stepComment = row.querySelector('input[data-part="commentaire"]');
        if (stepComment && stepComment.value.trim()) parts.push(stepComment.value.trim());
        if (parts.length) fragments.push(`${translate("voice_step")} ${idx + 1}. ${parts.join(". ")}`);
      });
      if (!fragments.length) {
        setStorageInfo(translate("voice_nothing"), true);
        return;
      }
      speak(fragments.join(". "), currentLanguage);
    }
    function setupVoiceFeatures() {
      const recSupported = isRecognitionSupported();
      const synthSupported = isSynthesisSupported();
      Array.from(document.querySelectorAll(".mic-btn")).forEach((btn) => {
        if (!recSupported) {
          btn.hidden = true;
          return;
        }
        btn.addEventListener("click", () => toggleFieldDictation(btn.getAttribute("data-dictate"), btn));
      });
      const commandBtn = document.getElementById("voiceCommandBtn");
      if (commandBtn && recSupported) {
        commandBtn.hidden = false;
        commandBtn.addEventListener("click", () => {
          if (commandRecognizer) stopCommandMode();
          else startCommandMode();
        });
      }
      const stopBtn = document.getElementById("voiceStopBtn");
      if (stopBtn) stopBtn.addEventListener("click", stopCommandMode);
      const readBtn = document.getElementById("readAloudBtn");
      if (readBtn && synthSupported) {
        readBtn.hidden = false;
        readBtn.addEventListener("click", () => {
          if (window.speechSynthesis && window.speechSynthesis.speaking) cancelSpeech();
          else readTechniqueAloud();
        });
      }
    }
    setupVoiceFeatures();
    (async function init() {
      loadTheme();
      loadLanguage();
      loadHoverComments();
      loadManualActions();
      loadExpertMode();
      loadStorageMode();
      await recoverSnapshotIfLocalEmpty();
      let wasAutoLoaded = false;
      if (storageMode === "cloud") {
        const loaded = await tryLoadDatabaseFromUrlOnStartup();
        if (loaded) wasAutoLoaded = true;
      } else {
        try {
          const loaded = await loadLocalDatabaseOrAsk();
          if (loaded) wasAutoLoaded = true;
        } catch (error) {
          console.error(error);
          dbFileHandle = null;
        }
      }
      if (!wasAutoLoaded) await initializeData(true);
      showPage("techniquesPage");
      showReadView();
      if (dbFileHandle) {
        setStorageInfo("Application pr\xEAte. Base JSON fichier li\xE9e.", false);
      } else if (!wasAutoLoaded) {
        setStorageInfo("Application pr\xEAte. Aucun fichier JSON li\xE9, utilisation des donn\xE9es du navigateur.", false);
      }
      if (!dbFileHandle && !wasAutoLoaded && storageMode !== "local") showStartupModal();
      setActionsInfo("Biblioth\xE8que d\u2019actions pr\xEAte.", false);
      setMembersInfo("Gestion des membres pr\xEAte.", false);
    })();
  })();
})();
