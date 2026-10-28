# Powertec Isolation Control · Version 7

AP office key, lock and safety document control in the Powertec Training style.
The footer of every page ends "Version 7", so you can check the live site is up to date.
All files sit in one folder. There are no sub-folders.

## Upload to GitHub (works on a phone)

1. Unzip the zip in the Files app.
2. In Safari, open the site's own repository on github.com (not the main Powertec Utilities one).
3. Delete the old files first, especially `references-*.jpg`, `sld-tier4.jpg` and `sld-hyperscale.jpg`, which are no longer used.
4. Tap **Add file → Upload files → choose your files**, select every file, tap **Open**, then **Commit changes**.
5. **Settings → Pages → Deploy from a branch → main → / (root) → Save**.

## Lock colours

| Lock | Colour | Numbers |
| --- | --- | --- |
| HV safety locks, every isolation point and earth switch | Blue | H-001 to H-238 |
| LV safety locks | Yellow | L-001 to L-138 |
| Lockout box locks, same number as the box | Red | LB01 to LB50 |
| CP personal locks | Green | CP01 to CP50 |

## HV network (blue locks)

Two drawings, built from the installed gear:

- **HV ring main** (`hv-ring.svg`): UMS01 and UMS02, 10 VCBs each (2 MCB incomers, 5 FCBs to the colo rings, plus
  the rest), and the five colo rings. Each colo has 4 cells, each cell a UPM with MCS1, MCS2 and a VCB to its own
  XFM01. Colo 1 has an extra Admin UPM.
- **HV XFM02 network** (`hv-xfm02.svg`): UMS03 (supply from UMS02, 5 FCBs to UMS11 to UMS14), and UMS11 to UMS14, each
  with 5 FCBs to the XFM02 in its cell of every colo. The second feeder from UMS02 loops in and out of UMS11, UMS12
  and UMS13 and ends at UMS14.

Every circuit breaker and switch has an isolation lock and an earth switch lock (the bus section has no earth switch).
H-001 to H-112 are the seven UMS boards; H-113 to H-238 are the 21 UPMs, in colo and cell order.

## Key tracker menus

On the key tracker, the Equipment menu breaks down into:
- **HV · main substations (UMS)** → substation → switch
- **HV · UPMs by colo and cell** → colo → cell → MCS1, MCS2 or VCB
- **LV** → drawing → plant

## Safety documents

- Permits are split into **HV PTW** (`hvptw.html`, blue HV locks only) and **LV PTW** (`lvptw.html`, yellow LV locks only).
  SFTs can be HV, LV or both. `ptw.html` lets you choose between the two permit registers.
- Points of isolation are picked by tapping lock numbers on the drawing.
- The issuing AP comes from the AP register; only HV-authorised APs can issue an HV PTW.
- The CP and working party come from CP1 to CP50. A CP whose green lock is already on a box cannot be chosen.
- **Cancelling:** an AP from the AP register ticks each check. The keys then return to their hooks, the
  lockout box and its red lock are freed, and every green CP lock is released.
- The home page shows live documents past their expiry, with a register on `expired.html`.

## People

- **AP register** (`ap.html`): name, role, authorised for, voltage levels, company, phone, email, ID06,
  authorised by, authorisation date, expiry, status, notes. The four rows are placeholders until the site AP list
  is loaded; edit `AP_LIST` in `app.js`.
- **CP register** (`cp.html`): CP1 to CP50, green locks CP01 to CP50. Contact details are blank until added in
  `CP_LIST` in `app.js`.

## Data

New documents and cancellations are saved in that phone's or computer's browser only. A shared register for the
whole AP office needs an online database behind the site. Example records are for testing and must be replaced
with verified site records before operational use.
