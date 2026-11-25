# Protocole de sécurité – Le Havre (application tablette)

Page installable (PWA) hébergée sur GitHub Pages. Elle s'ouvre sans connexion Google et sans réseau ;
les protocoles signés sont envoyés à Apps Script (Drive, registre, e-mails) dès que le wifi est là.

## Mise en ligne
1. GitHub (compte LMNO-prevention) → New repository → nom `protocole-lehavre` → Public → Create repository.
2. « uploading an existing file » → glisser TOUT le contenu de ce dossier (index.html, config.js, manifest.webmanifest, sw.js, plan.jpg, README.md et le dossier icons) → Commit changes.
3. Ouvrir `config.js` (crayon) → remplacer le texte entre guillemets par l'adresse Apps Script (…/exec) → Commit changes.
4. Settings → Pages → Deploy from a branch → main → / (root) → Save. Adresse : https://lmno-prevention.github.io/protocole-lehavre/

## Côté Apps Script
- Remplacer `Code.gs` par la nouvelle version (elle contient `doPost`).
- Déployer → Gérer les déploiements → crayon → Nouvelle version, avec « Exécuter en tant que : Moi » et « Qui a accès : Tout le monde ».
- L'adresse à mettre dans `config.js` est celle de ce déploiement, sous la forme `https://script.google.com/macros/s/XXXX/exec` (sans `/a/macros/leroymerlin.fr`).

## Sur la tablette
Ouvrir l'adresse GitHub Pages dans Chrome, saisir la clé d'accès (une seule fois), puis menu ⋮ → Installer l'application.
(iPad : Safari → Partager → Sur l'écran d'accueil, puis saisir la clé dans l'icône.)

## Mise à jour
Remplacer les fichiers modifiés sur GitHub (Add file → Upload files). La tablette récupère la nouvelle version dès qu'elle a du réseau.
