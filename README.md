# Powertec Isolation Control

AP office key, lock and safety document control, in the Powertec Training style:
stacked powertec logo over a full-screen dark photo, rounded menu button, faint grid
background, orange letterspaced labels, Montserrat type and Powertec orange.
This is Version 6: the footer of every page ends "Version 6", so you can check the live site is up to date.
All 27 files sit in one folder. There are no sub-folders.

## Important: use its own repository

This site has its own `index.html` and `styles.css`. Uploading it into the repository of
the main Powertec Utilities site would overwrite that site's files. Create a new repository
for it, for example `isolation-control`.

## Upload to GitHub (works on a phone)

1. Unzip `powertec-isolation-control.zip` in the Files app.
2. In Safari, open the new repository on github.com.
3. Tap **Add file → Upload files → choose your files**.
4. Open the unzipped folder, tap **Select**, select all 27 files, tap **Open**.
5. Tap **Commit changes**.
6. Go to **Settings → Pages → Deploy from a branch → main → / (root) → Save**.

The site appears at `https://<your-username>.github.io/<repository-name>/` within a few minutes.
File names must stay exactly as they are, lower case. GitHub Pages treats `Logo.png` and `logo.png` as different files.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Front page |
| `keys.html` | Key tracker |
| `info.html` | Information tracker (lockout boxes) |
| `ptw.html` | Permit to work tracker |
| `sft.html` | Sanction for test tracker |
| `loa.html` | Limitation of access tracker |
| `cp.html` | CP register: name, company, contact details, authorisation |
| `new.html` | New safety document: PTW, SFT or LOA, every field a dropdown |
| `record.html` | Record page opened from any tracker line |
| `procedure.html` | System procedure: seven stages, step by step, plus routines |
| `lv-schematic.html` | Schematics and layouts: all five drawings with live lock numbers; in-use numbers are struck through and open their document |

## Shared files

| File | What it is |
| --- | --- |
| `styles.css` | Colours, fonts, layout, photos and phase-in |
| `app.js` | Menu, trackers, record pages, procedure and example data |
| `logo-stack.png` | Stacked powertec logo, transparent background |
| `mark.png` | Swoosh mark, used for the browser tab icon |
| `favicon.png` | Browser tab icon |
| `hero.jpg` | Front page photo (your substation photo) |
| `banner-keys.jpg` | Photo: key and information trackers |
| `banner-permits.jpg` | Photo: PTW, SFT and record pages |
| `banner-substation.jpg` | Photo: LOA tracker and CP register |
| `banner-network.jpg` | Photo: procedure and schematic |
| `sld-tier4.jpg` | Tier IV single line diagram (clean; lock circles are drawn over it by the site) |
| `sld-hyperscale.jpg` | Hyperscale 2N single line diagram (clean; lock circles are drawn over it by the site) |
| `dwg-layout.jpg` | Data centre layout: 10 kV substations, generators, UPS, cooling, server hall |
| `dwg-campus.jpg` | AC powered data centre: utility substation, generators, electrical room, cooling plant |
| `dwg-room.jpg` | Data centre electrical room: switchgear, ATS, UPS, STS, batteries, RPPs, PDUs, cooling |

## New safety documents

Tap **+ New safety document** on the front page, in the menu, or on the PTW, SFT and LOA trackers.
Every field is a dropdown. Only locks on their hooks, free lockout boxes and active CPs can be chosen.
On a live document, the Competent person card shows the CP's phone and email; **Open CP details** goes to their page.

New documents and cancellations are saved in that phone's or computer's browser only.
Other devices do not see them. A shared register for the whole team needs a small online
database behind the site.

The dropdown lists (work types, tests, locations, reasons, boundaries, durations) are under
`OPTIONS` in `app.js`.

## Choosing points of isolation from the drawing

On a new PTW or SFT, section 2 is **Points of isolation**:

1. Choose **HV**, **LV** or **HV and LV**. Each one opens its own list of plant.
2. Choose an item of plant. The matching drawing opens full screen, centred on that plant, with its lock numbers pulsing orange.
3. Tap each lock number you need. It fills in and is added to the document. Tap again to remove it.
4. Tap **Done** to go back to the form. Open another plant to add more.

Numbers already on a live or pending document are grey and struck through, and cannot be chosen.
Tapping one shows which document holds it, with a link to it. On the Schematics page, tapping a
struck-through number opens that document; tapping a free number opens the lock's record.

Lock numbers run across all five drawings, so no two locks share a number:

| Drawing | HV | LV |
| --- | --- | --- |
| Tier IV single line diagram | H-001 to H-025 | L-001 to L-055 |
| Hyperscale single line diagram | H-026 to H-057 | L-056 to L-081 |
| Data centre layout | H-058 to H-061 | L-082 to L-104 |
| AC powered data centre | H-062 to H-064 | L-105 to L-124 |
| Data centre electrical room | H-065 | L-125 to L-138 |
 The positions, plant names and descriptions are in
`LOCKS` in `app.js`.

## Lockout boxes and box locks

Every lockout box has its own box lock with the same number: box LB-06 is locked with lock LB-06,
opened with key LB-06. When a document is issued the AP locks the box with its box lock and keeps
the key; the working party fit their personal locks. The Information tracker shows each box lock as
fitted or in its bay, and who holds the key.

## Changing the records

All records live at the top of `app.js` under `DATA`. They are example data.
Edit, add or remove rows there; every tracker, record page and front page count updates automatically.
