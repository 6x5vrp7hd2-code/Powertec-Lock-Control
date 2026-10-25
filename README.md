# Powertec | Electrical Safety Asset Control — prototype website

Open `index.html` in a modern browser or serve the directory from a static web server. A local server is recommended: `python3 -m http.server 8000` and open `http://localhost:8000`.

## Pages
- Home dashboard and responsive menu
- Key trackers: lock inventory, key custody, lockout boxes, CP personal locks
- Information tracker: apparatus/point master, exceptions, changes
- Permit to work tracker
- Sanction for test tracker
- Limitation of access tracker
- Every list row opens a unique record detail page with editing and cross-reference links
- Data administration: export/import JSON, reset

## Data
The 52 P-001–P-052 markers are **provisional references only** derived from a photograph, not verified switching points or allocated lock numbers. No real locks, documents or key custody events have been invented. The diagram image is a photograph-based concept and must not be used operationally.

## Safety and deployment restrictions
This is an **administrative demonstration**, not an operational safety system. It does not issue, authorise, transfer, cancel, or validate PTW/SFT/LOA, switching, isolation, or release of keys. It does not replace approved site electrical safety rules, lockout safeguards, document custody, or a controlled SLD. The site uses browser `localStorage` only, so data is device/browser specific, not shared, not secure against tampering, and may be lost. Never use it as a live system of record. Before production: secure backend, authentication, roles, transaction locking, tamper-evident audit trail, backups, controlled document integration, formal safety review, security testing and deployment governance.

## Branding
Colours #f26a00, #1c1e20, #f4f4f1 and Arial reflect the previously provided Powertec website CSS. The geometric Powertec wordmark in the header is a **text-only approximation**, not the verified official logo. Replace it with licensed official artwork when supplied.
