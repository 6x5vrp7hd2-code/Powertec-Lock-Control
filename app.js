/* Powertec Isolation & Document Control — shared script, Version 7.
   Every page loads this file. It draws the header, menu and footer, then builds the page
   named in <body data-page="...">. Records are initial example records for testing and must be
   replaced with verified site records before operational use.

   Lock colours: HV safety locks BLUE (H-nnn) · LV safety locks YELLOW (L-nnn)
                 Lockout box locks RED (LB01 to LB50, same number as the box)
                 CP personal locks GREEN (CP01 to CP50) */

/* ---------- Drawings ---------- */
const DRAWINGS = {
  hvring:{title:'HV ring main · UMS01, UMS02 and colo UPMs',kind:'HV network',sys:'HV',img:'hv-ring.svg',w:2560,h:2080,r:0.0098,view:2400},
  hvxfm:{title:'HV XFM02 network · UMS03 and UMS11 to UMS14',kind:'HV network',sys:'HV',img:'hv-xfm02.svg',w:2600,h:1500,r:0.0092,view:2500},
  lvt4:{title:'LV distribution · Tier IV data hall',kind:'LV single line diagram',sys:'LV',img:'sld-lv-tier4.jpg',w:1368,h:478,r:0.0138,view:1750},
  lvhyper:{title:'LV distribution · 2N UPS and STS',kind:'LV single line diagram',sys:'LV',img:'sld-lv-hyper.jpg',w:965,h:775,r:0.0196,view:1250},
  layout:{title:'Data centre layout',kind:'LV site layout',sys:'LV',img:'dwg-layout.jpg',w:1075,h:879,r:0.0175,view:1300},
  campus:{title:'AC powered data centre',kind:'LV site layout',sys:'LV',img:'dwg-campus.jpg',w:1290,h:784,r:0.0165,view:1400},
  room:{title:'Data centre electrical room',kind:'LV room layout',sys:'LV',img:'dwg-room.jpg',w:2210,h:1230,r:0.0125,view:1800}
};

/* ---------- Dedicated safety locks ----------
   Columns: lock id, number in the circle, drawing, system, item of plant, point of isolation, x, y, detail.
   HV detail: g (UMS or UPM), ums, sw (panel or switch), swname, colo, cell, upm, kind (Isolation or Earth switch). */
const LOCKS = [["H-001", 1, "hvring", "HV", "UMS01", "VCB01 MCB1 incomer · circuit breaker isolation", 230, 143, {"g": "UMS", "ums": "UMS01", "sw": "VCB01", "swname": "MCB1 incomer", "kind": "Isolation"}], ["H-002", 2, "hvring", "HV", "UMS01", "VCB01 MCB1 incomer · earth switch", 324, 198, {"g": "UMS", "ums": "UMS01", "sw": "VCB01", "swname": "MCB1 incomer", "kind": "Earth switch"}], ["H-003", 3, "hvring", "HV", "UMS01", "VCB02 MCB2 incomer · circuit breaker isolation", 230, 273, {"g": "UMS", "ums": "UMS01", "sw": "VCB02", "swname": "MCB2 incomer", "kind": "Isolation"}], ["H-004", 4, "hvring", "HV", "UMS01", "VCB02 MCB2 incomer · earth switch", 324, 328, {"g": "UMS", "ums": "UMS01", "sw": "VCB02", "swname": "MCB2 incomer", "kind": "Earth switch"}], ["H-005", 5, "hvring", "HV", "UMS01", "VCB03 FCB Colo 1 ring, side A · circuit breaker isolation", 230, 443, {"g": "UMS", "ums": "UMS01", "sw": "VCB03", "swname": "FCB Colo 1 ring, side A", "kind": "Isolation"}], ["H-006", 6, "hvring", "HV", "UMS01", "VCB03 FCB Colo 1 ring, side A · earth switch", 324, 498, {"g": "UMS", "ums": "UMS01", "sw": "VCB03", "swname": "FCB Colo 1 ring, side A", "kind": "Earth switch"}], ["H-007", 7, "hvring", "HV", "UMS01", "VCB04 FCB Colo 2 ring, side A · circuit breaker isolation", 230, 713, {"g": "UMS", "ums": "UMS01", "sw": "VCB04", "swname": "FCB Colo 2 ring, side A", "kind": "Isolation"}], ["H-008", 8, "hvring", "HV", "UMS01", "VCB04 FCB Colo 2 ring, side A · earth switch", 324, 768, {"g": "UMS", "ums": "UMS01", "sw": "VCB04", "swname": "FCB Colo 2 ring, side A", "kind": "Earth switch"}], ["H-009", 9, "hvring", "HV", "UMS01", "VCB05 FCB Colo 3 ring, side A · circuit breaker isolation", 230, 983, {"g": "UMS", "ums": "UMS01", "sw": "VCB05", "swname": "FCB Colo 3 ring, side A", "kind": "Isolation"}], ["H-010", 10, "hvring", "HV", "UMS01", "VCB05 FCB Colo 3 ring, side A · earth switch", 324, 1038, {"g": "UMS", "ums": "UMS01", "sw": "VCB05", "swname": "FCB Colo 3 ring, side A", "kind": "Earth switch"}], ["H-011", 11, "hvring", "HV", "UMS01", "VCB06 FCB Colo 4 ring, side A · circuit breaker isolation", 230, 1253, {"g": "UMS", "ums": "UMS01", "sw": "VCB06", "swname": "FCB Colo 4 ring, side A", "kind": "Isolation"}], ["H-012", 12, "hvring", "HV", "UMS01", "VCB06 FCB Colo 4 ring, side A · earth switch", 324, 1308, {"g": "UMS", "ums": "UMS01", "sw": "VCB06", "swname": "FCB Colo 4 ring, side A", "kind": "Earth switch"}], ["H-013", 13, "hvring", "HV", "UMS01", "VCB07 FCB Colo 5 ring, side A · circuit breaker isolation", 230, 1523, {"g": "UMS", "ums": "UMS01", "sw": "VCB07", "swname": "FCB Colo 5 ring, side A", "kind": "Isolation"}], ["H-014", 14, "hvring", "HV", "UMS01", "VCB07 FCB Colo 5 ring, side A · earth switch", 324, 1578, {"g": "UMS", "ums": "UMS01", "sw": "VCB07", "swname": "FCB Colo 5 ring, side A", "kind": "Earth switch"}], ["H-015", 15, "hvring", "HV", "UMS01", "VCB08 Bus section · circuit breaker isolation", 230, 1713, {"g": "UMS", "ums": "UMS01", "sw": "VCB08", "swname": "Bus section", "kind": "Isolation"}], ["H-016", 16, "hvring", "HV", "UMS01", "VCB09 Spare · circuit breaker isolation", 230, 1833, {"g": "UMS", "ums": "UMS01", "sw": "VCB09", "swname": "Spare", "kind": "Isolation"}], ["H-017", 17, "hvring", "HV", "UMS01", "VCB09 Spare · earth switch", 324, 1888, {"g": "UMS", "ums": "UMS01", "sw": "VCB09", "swname": "Spare", "kind": "Earth switch"}], ["H-018", 18, "hvring", "HV", "UMS01", "VCB10 Spare · circuit breaker isolation", 230, 1953, {"g": "UMS", "ums": "UMS01", "sw": "VCB10", "swname": "Spare", "kind": "Isolation"}], ["H-019", 19, "hvring", "HV", "UMS01", "VCB10 Spare · earth switch", 324, 2008, {"g": "UMS", "ums": "UMS01", "sw": "VCB10", "swname": "Spare", "kind": "Earth switch"}], ["H-020", 20, "hvring", "HV", "UMS02", "VCB01 MCB1 incomer · circuit breaker isolation", 2170, 143, {"g": "UMS", "ums": "UMS02", "sw": "VCB01", "swname": "MCB1 incomer", "kind": "Isolation"}], ["H-021", 21, "hvring", "HV", "UMS02", "VCB01 MCB1 incomer · earth switch", 2076, 198, {"g": "UMS", "ums": "UMS02", "sw": "VCB01", "swname": "MCB1 incomer", "kind": "Earth switch"}], ["H-022", 22, "hvring", "HV", "UMS02", "VCB02 MCB2 incomer · circuit breaker isolation", 2170, 273, {"g": "UMS", "ums": "UMS02", "sw": "VCB02", "swname": "MCB2 incomer", "kind": "Isolation"}], ["H-023", 23, "hvring", "HV", "UMS02", "VCB02 MCB2 incomer · earth switch", 2076, 328, {"g": "UMS", "ums": "UMS02", "sw": "VCB02", "swname": "MCB2 incomer", "kind": "Earth switch"}], ["H-024", 24, "hvring", "HV", "UMS02", "VCB03 FCB Colo 1 ring, side B · circuit breaker isolation", 2170, 443, {"g": "UMS", "ums": "UMS02", "sw": "VCB03", "swname": "FCB Colo 1 ring, side B", "kind": "Isolation"}], ["H-025", 25, "hvring", "HV", "UMS02", "VCB03 FCB Colo 1 ring, side B · earth switch", 2076, 498, {"g": "UMS", "ums": "UMS02", "sw": "VCB03", "swname": "FCB Colo 1 ring, side B", "kind": "Earth switch"}], ["H-026", 26, "hvring", "HV", "UMS02", "VCB04 FCB Colo 2 ring, side B · circuit breaker isolation", 2170, 713, {"g": "UMS", "ums": "UMS02", "sw": "VCB04", "swname": "FCB Colo 2 ring, side B", "kind": "Isolation"}], ["H-027", 27, "hvring", "HV", "UMS02", "VCB04 FCB Colo 2 ring, side B · earth switch", 2076, 768, {"g": "UMS", "ums": "UMS02", "sw": "VCB04", "swname": "FCB Colo 2 ring, side B", "kind": "Earth switch"}], ["H-028", 28, "hvring", "HV", "UMS02", "VCB05 FCB Colo 3 ring, side B · circuit breaker isolation", 2170, 983, {"g": "UMS", "ums": "UMS02", "sw": "VCB05", "swname": "FCB Colo 3 ring, side B", "kind": "Isolation"}], ["H-029", 29, "hvring", "HV", "UMS02", "VCB05 FCB Colo 3 ring, side B · earth switch", 2076, 1038, {"g": "UMS", "ums": "UMS02", "sw": "VCB05", "swname": "FCB Colo 3 ring, side B", "kind": "Earth switch"}], ["H-030", 30, "hvring", "HV", "UMS02", "VCB06 FCB Colo 4 ring, side B · circuit breaker isolation", 2170, 1253, {"g": "UMS", "ums": "UMS02", "sw": "VCB06", "swname": "FCB Colo 4 ring, side B", "kind": "Isolation"}], ["H-031", 31, "hvring", "HV", "UMS02", "VCB06 FCB Colo 4 ring, side B · earth switch", 2076, 1308, {"g": "UMS", "ums": "UMS02", "sw": "VCB06", "swname": "FCB Colo 4 ring, side B", "kind": "Earth switch"}], ["H-032", 32, "hvring", "HV", "UMS02", "VCB07 FCB Colo 5 ring, side B · circuit breaker isolation", 2170, 1523, {"g": "UMS", "ums": "UMS02", "sw": "VCB07", "swname": "FCB Colo 5 ring, side B", "kind": "Isolation"}], ["H-033", 33, "hvring", "HV", "UMS02", "VCB07 FCB Colo 5 ring, side B · earth switch", 2076, 1578, {"g": "UMS", "ums": "UMS02", "sw": "VCB07", "swname": "FCB Colo 5 ring, side B", "kind": "Earth switch"}], ["H-034", 34, "hvring", "HV", "UMS02", "VCB08 FCB to UMS03 · circuit breaker isolation", 2170, 1713, {"g": "UMS", "ums": "UMS02", "sw": "VCB08", "swname": "FCB to UMS03", "kind": "Isolation"}], ["H-035", 35, "hvring", "HV", "UMS02", "VCB08 FCB to UMS03 · earth switch", 2076, 1768, {"g": "UMS", "ums": "UMS02", "sw": "VCB08", "swname": "FCB to UMS03", "kind": "Earth switch"}], ["H-036", 36, "hvring", "HV", "UMS02", "VCB09 FCB loop feeder to UMS11-14 · circuit breaker isolation", 2170, 1833, {"g": "UMS", "ums": "UMS02", "sw": "VCB09", "swname": "FCB loop feeder to UMS11-14", "kind": "Isolation"}], ["H-037", 37, "hvring", "HV", "UMS02", "VCB09 FCB loop feeder to UMS11-14 · earth switch", 2076, 1888, {"g": "UMS", "ums": "UMS02", "sw": "VCB09", "swname": "FCB loop feeder to UMS11-14", "kind": "Earth switch"}], ["H-038", 38, "hvring", "HV", "UMS02", "VCB10 Bus section · circuit breaker isolation", 2170, 1953, {"g": "UMS", "ums": "UMS02", "sw": "VCB10", "swname": "Bus section", "kind": "Isolation"}], ["H-039", 39, "hvxfm", "HV", "UMS03", "VCB01 Incomer from UMS02 · circuit breaker isolation", 974, 275, {"g": "UMS", "ums": "UMS03", "sw": "VCB01", "swname": "Incomer from UMS02", "kind": "Isolation"}], ["H-040", 40, "hvxfm", "HV", "UMS03", "VCB01 Incomer from UMS02 · earth switch", 1050, 261, {"g": "UMS", "ums": "UMS03", "sw": "VCB01", "swname": "Incomer from UMS02", "kind": "Earth switch"}], ["H-041", 41, "hvxfm", "HV", "UMS03", "VCB02 FCB to UMS11 · circuit breaker isolation", 1084, 385, {"g": "UMS", "ums": "UMS03", "sw": "VCB02", "swname": "FCB to UMS11", "kind": "Isolation"}], ["H-042", 42, "hvxfm", "HV", "UMS03", "VCB02 FCB to UMS11 · earth switch", 1160, 425, {"g": "UMS", "ums": "UMS03", "sw": "VCB02", "swname": "FCB to UMS11", "kind": "Earth switch"}], ["H-043", 43, "hvxfm", "HV", "UMS03", "VCB03 FCB to UMS12 · circuit breaker isolation", 1194, 385, {"g": "UMS", "ums": "UMS03", "sw": "VCB03", "swname": "FCB to UMS12", "kind": "Isolation"}], ["H-044", 44, "hvxfm", "HV", "UMS03", "VCB03 FCB to UMS12 · earth switch", 1270, 425, {"g": "UMS", "ums": "UMS03", "sw": "VCB03", "swname": "FCB to UMS12", "kind": "Earth switch"}], ["H-045", 45, "hvxfm", "HV", "UMS03", "VCB04 FCB to UMS13 · circuit breaker isolation", 1304, 385, {"g": "UMS", "ums": "UMS03", "sw": "VCB04", "swname": "FCB to UMS13", "kind": "Isolation"}], ["H-046", 46, "hvxfm", "HV", "UMS03", "VCB04 FCB to UMS13 · earth switch", 1380, 425, {"g": "UMS", "ums": "UMS03", "sw": "VCB04", "swname": "FCB to UMS13", "kind": "Earth switch"}], ["H-047", 47, "hvxfm", "HV", "UMS03", "VCB05 FCB to UMS14 · circuit breaker isolation", 1414, 385, {"g": "UMS", "ums": "UMS03", "sw": "VCB05", "swname": "FCB to UMS14", "kind": "Isolation"}], ["H-048", 48, "hvxfm", "HV", "UMS03", "VCB05 FCB to UMS14 · earth switch", 1490, 425, {"g": "UMS", "ums": "UMS03", "sw": "VCB05", "swname": "FCB to UMS14", "kind": "Earth switch"}], ["H-049", 49, "hvxfm", "HV", "UMS03", "VCB06 FCB spare · circuit breaker isolation", 1524, 385, {"g": "UMS", "ums": "UMS03", "sw": "VCB06", "swname": "FCB spare", "kind": "Isolation"}], ["H-050", 50, "hvxfm", "HV", "UMS03", "VCB06 FCB spare · earth switch", 1600, 425, {"g": "UMS", "ums": "UMS03", "sw": "VCB06", "swname": "FCB spare", "kind": "Earth switch"}], ["H-051", 51, "hvxfm", "HV", "UMS11", "VCB01 Incomer from UMS03 · circuit breaker isolation", 128, 780, {"g": "UMS", "ums": "UMS11", "sw": "VCB01", "swname": "Incomer from UMS03", "kind": "Isolation"}], ["H-052", 52, "hvxfm", "HV", "UMS11", "VCB01 Incomer from UMS03 · earth switch", 190, 822, {"g": "UMS", "ums": "UMS11", "sw": "VCB01", "swname": "Incomer from UMS03", "kind": "Earth switch"}], ["H-053", 53, "hvxfm", "HV", "UMS11", "VCB02 Loop in · circuit breaker isolation", 196, 780, {"g": "UMS", "ums": "UMS11", "sw": "VCB02", "swname": "Loop in", "kind": "Isolation"}], ["H-054", 54, "hvxfm", "HV", "UMS11", "VCB02 Loop in · earth switch", 258, 822, {"g": "UMS", "ums": "UMS11", "sw": "VCB02", "swname": "Loop in", "kind": "Earth switch"}], ["H-055", 55, "hvxfm", "HV", "UMS11", "VCB03 Loop out to UMS12 · circuit breaker isolation", 264, 780, {"g": "UMS", "ums": "UMS11", "sw": "VCB03", "swname": "Loop out to UMS12", "kind": "Isolation"}], ["H-056", 56, "hvxfm", "HV", "UMS11", "VCB03 Loop out to UMS12 · earth switch", 326, 822, {"g": "UMS", "ums": "UMS11", "sw": "VCB03", "swname": "Loop out to UMS12", "kind": "Earth switch"}], ["H-057", 57, "hvxfm", "HV", "UMS11", "VCB04 FCB Colo 1 cell 1 XFM02 · circuit breaker isolation", 332, 940, {"g": "UMS", "ums": "UMS11", "sw": "VCB04", "swname": "FCB Colo 1 cell 1 XFM02", "kind": "Isolation"}], ["H-058", 58, "hvxfm", "HV", "UMS11", "VCB04 FCB Colo 1 cell 1 XFM02 · earth switch", 376, 1012, {"g": "UMS", "ums": "UMS11", "sw": "VCB04", "swname": "FCB Colo 1 cell 1 XFM02", "kind": "Earth switch"}], ["H-059", 59, "hvxfm", "HV", "UMS11", "VCB05 FCB Colo 2 cell 1 XFM02 · circuit breaker isolation", 400, 940, {"g": "UMS", "ums": "UMS11", "sw": "VCB05", "swname": "FCB Colo 2 cell 1 XFM02", "kind": "Isolation"}], ["H-060", 60, "hvxfm", "HV", "UMS11", "VCB05 FCB Colo 2 cell 1 XFM02 · earth switch", 444, 1012, {"g": "UMS", "ums": "UMS11", "sw": "VCB05", "swname": "FCB Colo 2 cell 1 XFM02", "kind": "Earth switch"}], ["H-061", 61, "hvxfm", "HV", "UMS11", "VCB06 FCB Colo 3 cell 1 XFM02 · circuit breaker isolation", 468, 940, {"g": "UMS", "ums": "UMS11", "sw": "VCB06", "swname": "FCB Colo 3 cell 1 XFM02", "kind": "Isolation"}], ["H-062", 62, "hvxfm", "HV", "UMS11", "VCB06 FCB Colo 3 cell 1 XFM02 · earth switch", 512, 1012, {"g": "UMS", "ums": "UMS11", "sw": "VCB06", "swname": "FCB Colo 3 cell 1 XFM02", "kind": "Earth switch"}], ["H-063", 63, "hvxfm", "HV", "UMS11", "VCB07 FCB Colo 4 cell 1 XFM02 · circuit breaker isolation", 536, 940, {"g": "UMS", "ums": "UMS11", "sw": "VCB07", "swname": "FCB Colo 4 cell 1 XFM02", "kind": "Isolation"}], ["H-064", 64, "hvxfm", "HV", "UMS11", "VCB07 FCB Colo 4 cell 1 XFM02 · earth switch", 580, 1012, {"g": "UMS", "ums": "UMS11", "sw": "VCB07", "swname": "FCB Colo 4 cell 1 XFM02", "kind": "Earth switch"}], ["H-065", 65, "hvxfm", "HV", "UMS11", "VCB08 FCB Colo 5 cell 1 XFM02 · circuit breaker isolation", 604, 940, {"g": "UMS", "ums": "UMS11", "sw": "VCB08", "swname": "FCB Colo 5 cell 1 XFM02", "kind": "Isolation"}], ["H-066", 66, "hvxfm", "HV", "UMS11", "VCB08 FCB Colo 5 cell 1 XFM02 · earth switch", 648, 1012, {"g": "UMS", "ums": "UMS11", "sw": "VCB08", "swname": "FCB Colo 5 cell 1 XFM02", "kind": "Earth switch"}], ["H-067", 67, "hvxfm", "HV", "UMS12", "VCB01 Incomer from UMS03 · circuit breaker isolation", 748, 780, {"g": "UMS", "ums": "UMS12", "sw": "VCB01", "swname": "Incomer from UMS03", "kind": "Isolation"}], ["H-068", 68, "hvxfm", "HV", "UMS12", "VCB01 Incomer from UMS03 · earth switch", 810, 822, {"g": "UMS", "ums": "UMS12", "sw": "VCB01", "swname": "Incomer from UMS03", "kind": "Earth switch"}], ["H-069", 69, "hvxfm", "HV", "UMS12", "VCB02 Loop in · circuit breaker isolation", 816, 780, {"g": "UMS", "ums": "UMS12", "sw": "VCB02", "swname": "Loop in", "kind": "Isolation"}], ["H-070", 70, "hvxfm", "HV", "UMS12", "VCB02 Loop in · earth switch", 878, 822, {"g": "UMS", "ums": "UMS12", "sw": "VCB02", "swname": "Loop in", "kind": "Earth switch"}], ["H-071", 71, "hvxfm", "HV", "UMS12", "VCB03 Loop out to UMS13 · circuit breaker isolation", 884, 780, {"g": "UMS", "ums": "UMS12", "sw": "VCB03", "swname": "Loop out to UMS13", "kind": "Isolation"}], ["H-072", 72, "hvxfm", "HV", "UMS12", "VCB03 Loop out to UMS13 · earth switch", 946, 822, {"g": "UMS", "ums": "UMS12", "sw": "VCB03", "swname": "Loop out to UMS13", "kind": "Earth switch"}], ["H-073", 73, "hvxfm", "HV", "UMS12", "VCB04 FCB Colo 1 cell 2 XFM02 · circuit breaker isolation", 952, 940, {"g": "UMS", "ums": "UMS12", "sw": "VCB04", "swname": "FCB Colo 1 cell 2 XFM02", "kind": "Isolation"}], ["H-074", 74, "hvxfm", "HV", "UMS12", "VCB04 FCB Colo 1 cell 2 XFM02 · earth switch", 996, 1012, {"g": "UMS", "ums": "UMS12", "sw": "VCB04", "swname": "FCB Colo 1 cell 2 XFM02", "kind": "Earth switch"}], ["H-075", 75, "hvxfm", "HV", "UMS12", "VCB05 FCB Colo 2 cell 2 XFM02 · circuit breaker isolation", 1020, 940, {"g": "UMS", "ums": "UMS12", "sw": "VCB05", "swname": "FCB Colo 2 cell 2 XFM02", "kind": "Isolation"}], ["H-076", 76, "hvxfm", "HV", "UMS12", "VCB05 FCB Colo 2 cell 2 XFM02 · earth switch", 1064, 1012, {"g": "UMS", "ums": "UMS12", "sw": "VCB05", "swname": "FCB Colo 2 cell 2 XFM02", "kind": "Earth switch"}], ["H-077", 77, "hvxfm", "HV", "UMS12", "VCB06 FCB Colo 3 cell 2 XFM02 · circuit breaker isolation", 1088, 940, {"g": "UMS", "ums": "UMS12", "sw": "VCB06", "swname": "FCB Colo 3 cell 2 XFM02", "kind": "Isolation"}], ["H-078", 78, "hvxfm", "HV", "UMS12", "VCB06 FCB Colo 3 cell 2 XFM02 · earth switch", 1132, 1012, {"g": "UMS", "ums": "UMS12", "sw": "VCB06", "swname": "FCB Colo 3 cell 2 XFM02", "kind": "Earth switch"}], ["H-079", 79, "hvxfm", "HV", "UMS12", "VCB07 FCB Colo 4 cell 2 XFM02 · circuit breaker isolation", 1156, 940, {"g": "UMS", "ums": "UMS12", "sw": "VCB07", "swname": "FCB Colo 4 cell 2 XFM02", "kind": "Isolation"}], ["H-080", 80, "hvxfm", "HV", "UMS12", "VCB07 FCB Colo 4 cell 2 XFM02 · earth switch", 1200, 1012, {"g": "UMS", "ums": "UMS12", "sw": "VCB07", "swname": "FCB Colo 4 cell 2 XFM02", "kind": "Earth switch"}], ["H-081", 81, "hvxfm", "HV", "UMS12", "VCB08 FCB Colo 5 cell 2 XFM02 · circuit breaker isolation", 1224, 940, {"g": "UMS", "ums": "UMS12", "sw": "VCB08", "swname": "FCB Colo 5 cell 2 XFM02", "kind": "Isolation"}], ["H-082", 82, "hvxfm", "HV", "UMS12", "VCB08 FCB Colo 5 cell 2 XFM02 · earth switch", 1268, 1012, {"g": "UMS", "ums": "UMS12", "sw": "VCB08", "swname": "FCB Colo 5 cell 2 XFM02", "kind": "Earth switch"}], ["H-083", 83, "hvxfm", "HV", "UMS13", "VCB01 Incomer from UMS03 · circuit breaker isolation", 1368, 780, {"g": "UMS", "ums": "UMS13", "sw": "VCB01", "swname": "Incomer from UMS03", "kind": "Isolation"}], ["H-084", 84, "hvxfm", "HV", "UMS13", "VCB01 Incomer from UMS03 · earth switch", 1430, 822, {"g": "UMS", "ums": "UMS13", "sw": "VCB01", "swname": "Incomer from UMS03", "kind": "Earth switch"}], ["H-085", 85, "hvxfm", "HV", "UMS13", "VCB02 Loop in · circuit breaker isolation", 1436, 780, {"g": "UMS", "ums": "UMS13", "sw": "VCB02", "swname": "Loop in", "kind": "Isolation"}], ["H-086", 86, "hvxfm", "HV", "UMS13", "VCB02 Loop in · earth switch", 1498, 822, {"g": "UMS", "ums": "UMS13", "sw": "VCB02", "swname": "Loop in", "kind": "Earth switch"}], ["H-087", 87, "hvxfm", "HV", "UMS13", "VCB03 Loop out to UMS14 · circuit breaker isolation", 1504, 780, {"g": "UMS", "ums": "UMS13", "sw": "VCB03", "swname": "Loop out to UMS14", "kind": "Isolation"}], ["H-088", 88, "hvxfm", "HV", "UMS13", "VCB03 Loop out to UMS14 · earth switch", 1566, 822, {"g": "UMS", "ums": "UMS13", "sw": "VCB03", "swname": "Loop out to UMS14", "kind": "Earth switch"}], ["H-089", 89, "hvxfm", "HV", "UMS13", "VCB04 FCB Colo 1 cell 3 XFM02 · circuit breaker isolation", 1572, 940, {"g": "UMS", "ums": "UMS13", "sw": "VCB04", "swname": "FCB Colo 1 cell 3 XFM02", "kind": "Isolation"}], ["H-090", 90, "hvxfm", "HV", "UMS13", "VCB04 FCB Colo 1 cell 3 XFM02 · earth switch", 1616, 1012, {"g": "UMS", "ums": "UMS13", "sw": "VCB04", "swname": "FCB Colo 1 cell 3 XFM02", "kind": "Earth switch"}], ["H-091", 91, "hvxfm", "HV", "UMS13", "VCB05 FCB Colo 2 cell 3 XFM02 · circuit breaker isolation", 1640, 940, {"g": "UMS", "ums": "UMS13", "sw": "VCB05", "swname": "FCB Colo 2 cell 3 XFM02", "kind": "Isolation"}], ["H-092", 92, "hvxfm", "HV", "UMS13", "VCB05 FCB Colo 2 cell 3 XFM02 · earth switch", 1684, 1012, {"g": "UMS", "ums": "UMS13", "sw": "VCB05", "swname": "FCB Colo 2 cell 3 XFM02", "kind": "Earth switch"}], ["H-093", 93, "hvxfm", "HV", "UMS13", "VCB06 FCB Colo 3 cell 3 XFM02 · circuit breaker isolation", 1708, 940, {"g": "UMS", "ums": "UMS13", "sw": "VCB06", "swname": "FCB Colo 3 cell 3 XFM02", "kind": "Isolation"}], ["H-094", 94, "hvxfm", "HV", "UMS13", "VCB06 FCB Colo 3 cell 3 XFM02 · earth switch", 1752, 1012, {"g": "UMS", "ums": "UMS13", "sw": "VCB06", "swname": "FCB Colo 3 cell 3 XFM02", "kind": "Earth switch"}], ["H-095", 95, "hvxfm", "HV", "UMS13", "VCB07 FCB Colo 4 cell 3 XFM02 · circuit breaker isolation", 1776, 940, {"g": "UMS", "ums": "UMS13", "sw": "VCB07", "swname": "FCB Colo 4 cell 3 XFM02", "kind": "Isolation"}], ["H-096", 96, "hvxfm", "HV", "UMS13", "VCB07 FCB Colo 4 cell 3 XFM02 · earth switch", 1820, 1012, {"g": "UMS", "ums": "UMS13", "sw": "VCB07", "swname": "FCB Colo 4 cell 3 XFM02", "kind": "Earth switch"}], ["H-097", 97, "hvxfm", "HV", "UMS13", "VCB08 FCB Colo 5 cell 3 XFM02 · circuit breaker isolation", 1844, 940, {"g": "UMS", "ums": "UMS13", "sw": "VCB08", "swname": "FCB Colo 5 cell 3 XFM02", "kind": "Isolation"}], ["H-098", 98, "hvxfm", "HV", "UMS13", "VCB08 FCB Colo 5 cell 3 XFM02 · earth switch", 1888, 1012, {"g": "UMS", "ums": "UMS13", "sw": "VCB08", "swname": "FCB Colo 5 cell 3 XFM02", "kind": "Earth switch"}], ["H-099", 99, "hvxfm", "HV", "UMS14", "VCB01 Incomer from UMS03 · circuit breaker isolation", 1988, 780, {"g": "UMS", "ums": "UMS14", "sw": "VCB01", "swname": "Incomer from UMS03", "kind": "Isolation"}], ["H-100", 100, "hvxfm", "HV", "UMS14", "VCB01 Incomer from UMS03 · earth switch", 2050, 822, {"g": "UMS", "ums": "UMS14", "sw": "VCB01", "swname": "Incomer from UMS03", "kind": "Earth switch"}], ["H-101", 101, "hvxfm", "HV", "UMS14", "VCB02 Loop in · circuit breaker isolation", 2056, 780, {"g": "UMS", "ums": "UMS14", "sw": "VCB02", "swname": "Loop in", "kind": "Isolation"}], ["H-102", 102, "hvxfm", "HV", "UMS14", "VCB02 Loop in · earth switch", 2118, 822, {"g": "UMS", "ums": "UMS14", "sw": "VCB02", "swname": "Loop in", "kind": "Earth switch"}], ["H-103", 103, "hvxfm", "HV", "UMS14", "VCB03 FCB Colo 1 cell 4 XFM02 · circuit breaker isolation", 2124, 940, {"g": "UMS", "ums": "UMS14", "sw": "VCB03", "swname": "FCB Colo 1 cell 4 XFM02", "kind": "Isolation"}], ["H-104", 104, "hvxfm", "HV", "UMS14", "VCB03 FCB Colo 1 cell 4 XFM02 · earth switch", 2168, 1012, {"g": "UMS", "ums": "UMS14", "sw": "VCB03", "swname": "FCB Colo 1 cell 4 XFM02", "kind": "Earth switch"}], ["H-105", 105, "hvxfm", "HV", "UMS14", "VCB04 FCB Colo 2 cell 4 XFM02 · circuit breaker isolation", 2192, 940, {"g": "UMS", "ums": "UMS14", "sw": "VCB04", "swname": "FCB Colo 2 cell 4 XFM02", "kind": "Isolation"}], ["H-106", 106, "hvxfm", "HV", "UMS14", "VCB04 FCB Colo 2 cell 4 XFM02 · earth switch", 2236, 1012, {"g": "UMS", "ums": "UMS14", "sw": "VCB04", "swname": "FCB Colo 2 cell 4 XFM02", "kind": "Earth switch"}], ["H-107", 107, "hvxfm", "HV", "UMS14", "VCB05 FCB Colo 3 cell 4 XFM02 · circuit breaker isolation", 2260, 940, {"g": "UMS", "ums": "UMS14", "sw": "VCB05", "swname": "FCB Colo 3 cell 4 XFM02", "kind": "Isolation"}], ["H-108", 108, "hvxfm", "HV", "UMS14", "VCB05 FCB Colo 3 cell 4 XFM02 · earth switch", 2304, 1012, {"g": "UMS", "ums": "UMS14", "sw": "VCB05", "swname": "FCB Colo 3 cell 4 XFM02", "kind": "Earth switch"}], ["H-109", 109, "hvxfm", "HV", "UMS14", "VCB06 FCB Colo 4 cell 4 XFM02 · circuit breaker isolation", 2328, 940, {"g": "UMS", "ums": "UMS14", "sw": "VCB06", "swname": "FCB Colo 4 cell 4 XFM02", "kind": "Isolation"}], ["H-110", 110, "hvxfm", "HV", "UMS14", "VCB06 FCB Colo 4 cell 4 XFM02 · earth switch", 2372, 1012, {"g": "UMS", "ums": "UMS14", "sw": "VCB06", "swname": "FCB Colo 4 cell 4 XFM02", "kind": "Earth switch"}], ["H-111", 111, "hvxfm", "HV", "UMS14", "VCB07 FCB Colo 5 cell 4 XFM02 · circuit breaker isolation", 2396, 940, {"g": "UMS", "ums": "UMS14", "sw": "VCB07", "swname": "FCB Colo 5 cell 4 XFM02", "kind": "Isolation"}], ["H-112", 112, "hvxfm", "HV", "UMS14", "VCB07 FCB Colo 5 cell 4 XFM02 · earth switch", 2440, 1012, {"g": "UMS", "ums": "UMS14", "sw": "VCB07", "swname": "FCB Colo 5 cell 4 XFM02", "kind": "Earth switch"}], ["H-113", 113, "hvring", "HV", "Colo 1 · Cell 1 UPM", "MCS1 vacuum ring switch · isolation", 533, 442, {"g": "UPM", "colo": 1, "cell": "Cell 1", "upm": "C1-1", "sw": "MCS1", "kind": "Isolation"}], ["H-114", 114, "hvring", "HV", "Colo 1 · Cell 1 UPM", "MCS1 vacuum ring switch · earth switch", 558, 522, {"g": "UPM", "colo": 1, "cell": "Cell 1", "upm": "C1-1", "sw": "MCS1", "kind": "Earth switch"}], ["H-115", 115, "hvring", "HV", "Colo 1 · Cell 1 UPM", "MCS2 vacuum ring switch · isolation", 699, 442, {"g": "UPM", "colo": 1, "cell": "Cell 1", "upm": "C1-1", "sw": "MCS2", "kind": "Isolation"}], ["H-116", 116, "hvring", "HV", "Colo 1 · Cell 1 UPM", "MCS2 vacuum ring switch · earth switch", 724, 522, {"g": "UPM", "colo": 1, "cell": "Cell 1", "upm": "C1-1", "sw": "MCS2", "kind": "Earth switch"}], ["H-117", 117, "hvring", "HV", "Colo 1 · Cell 1 UPM", "VCB to own XFM01 · circuit breaker isolation", 586, 545, {"g": "UPM", "colo": 1, "cell": "Cell 1", "upm": "C1-1", "sw": "VCB", "kind": "Isolation"}], ["H-118", 118, "hvring", "HV", "Colo 1 · Cell 1 UPM", "VCB to own XFM01 · earth switch", 696, 566, {"g": "UPM", "colo": 1, "cell": "Cell 1", "upm": "C1-1", "sw": "VCB", "kind": "Earth switch"}], ["H-119", 119, "hvring", "HV", "Colo 1 · Cell 2 UPM", "MCS1 vacuum ring switch · isolation", 825, 442, {"g": "UPM", "colo": 1, "cell": "Cell 2", "upm": "C1-2", "sw": "MCS1", "kind": "Isolation"}], ["H-120", 120, "hvring", "HV", "Colo 1 · Cell 2 UPM", "MCS1 vacuum ring switch · earth switch", 850, 522, {"g": "UPM", "colo": 1, "cell": "Cell 2", "upm": "C1-2", "sw": "MCS1", "kind": "Earth switch"}], ["H-121", 121, "hvring", "HV", "Colo 1 · Cell 2 UPM", "MCS2 vacuum ring switch · isolation", 991, 442, {"g": "UPM", "colo": 1, "cell": "Cell 2", "upm": "C1-2", "sw": "MCS2", "kind": "Isolation"}], ["H-122", 122, "hvring", "HV", "Colo 1 · Cell 2 UPM", "MCS2 vacuum ring switch · earth switch", 1016, 522, {"g": "UPM", "colo": 1, "cell": "Cell 2", "upm": "C1-2", "sw": "MCS2", "kind": "Earth switch"}], ["H-123", 123, "hvring", "HV", "Colo 1 · Cell 2 UPM", "VCB to own XFM01 · circuit breaker isolation", 878, 545, {"g": "UPM", "colo": 1, "cell": "Cell 2", "upm": "C1-2", "sw": "VCB", "kind": "Isolation"}], ["H-124", 124, "hvring", "HV", "Colo 1 · Cell 2 UPM", "VCB to own XFM01 · earth switch", 988, 566, {"g": "UPM", "colo": 1, "cell": "Cell 2", "upm": "C1-2", "sw": "VCB", "kind": "Earth switch"}], ["H-125", 125, "hvring", "HV", "Colo 1 · Cell 3 UPM", "MCS1 vacuum ring switch · isolation", 1117, 442, {"g": "UPM", "colo": 1, "cell": "Cell 3", "upm": "C1-3", "sw": "MCS1", "kind": "Isolation"}], ["H-126", 126, "hvring", "HV", "Colo 1 · Cell 3 UPM", "MCS1 vacuum ring switch · earth switch", 1142, 522, {"g": "UPM", "colo": 1, "cell": "Cell 3", "upm": "C1-3", "sw": "MCS1", "kind": "Earth switch"}], ["H-127", 127, "hvring", "HV", "Colo 1 · Cell 3 UPM", "MCS2 vacuum ring switch · isolation", 1283, 442, {"g": "UPM", "colo": 1, "cell": "Cell 3", "upm": "C1-3", "sw": "MCS2", "kind": "Isolation"}], ["H-128", 128, "hvring", "HV", "Colo 1 · Cell 3 UPM", "MCS2 vacuum ring switch · earth switch", 1308, 522, {"g": "UPM", "colo": 1, "cell": "Cell 3", "upm": "C1-3", "sw": "MCS2", "kind": "Earth switch"}], ["H-129", 129, "hvring", "HV", "Colo 1 · Cell 3 UPM", "VCB to own XFM01 · circuit breaker isolation", 1170, 545, {"g": "UPM", "colo": 1, "cell": "Cell 3", "upm": "C1-3", "sw": "VCB", "kind": "Isolation"}], ["H-130", 130, "hvring", "HV", "Colo 1 · Cell 3 UPM", "VCB to own XFM01 · earth switch", 1280, 566, {"g": "UPM", "colo": 1, "cell": "Cell 3", "upm": "C1-3", "sw": "VCB", "kind": "Earth switch"}], ["H-131", 131, "hvring", "HV", "Colo 1 · Cell 4 UPM", "MCS1 vacuum ring switch · isolation", 1409, 442, {"g": "UPM", "colo": 1, "cell": "Cell 4", "upm": "C1-4", "sw": "MCS1", "kind": "Isolation"}], ["H-132", 132, "hvring", "HV", "Colo 1 · Cell 4 UPM", "MCS1 vacuum ring switch · earth switch", 1434, 522, {"g": "UPM", "colo": 1, "cell": "Cell 4", "upm": "C1-4", "sw": "MCS1", "kind": "Earth switch"}], ["H-133", 133, "hvring", "HV", "Colo 1 · Cell 4 UPM", "MCS2 vacuum ring switch · isolation", 1575, 442, {"g": "UPM", "colo": 1, "cell": "Cell 4", "upm": "C1-4", "sw": "MCS2", "kind": "Isolation"}], ["H-134", 134, "hvring", "HV", "Colo 1 · Cell 4 UPM", "MCS2 vacuum ring switch · earth switch", 1600, 522, {"g": "UPM", "colo": 1, "cell": "Cell 4", "upm": "C1-4", "sw": "MCS2", "kind": "Earth switch"}], ["H-135", 135, "hvring", "HV", "Colo 1 · Cell 4 UPM", "VCB to own XFM01 · circuit breaker isolation", 1462, 545, {"g": "UPM", "colo": 1, "cell": "Cell 4", "upm": "C1-4", "sw": "VCB", "kind": "Isolation"}], ["H-136", 136, "hvring", "HV", "Colo 1 · Cell 4 UPM", "VCB to own XFM01 · earth switch", 1572, 566, {"g": "UPM", "colo": 1, "cell": "Cell 4", "upm": "C1-4", "sw": "VCB", "kind": "Earth switch"}], ["H-137", 137, "hvring", "HV", "Colo 1 · Admin UPM", "MCS1 vacuum ring switch · isolation", 1701, 442, {"g": "UPM", "colo": 1, "cell": "Admin", "upm": "C1-ADM", "sw": "MCS1", "kind": "Isolation"}], ["H-138", 138, "hvring", "HV", "Colo 1 · Admin UPM", "MCS1 vacuum ring switch · earth switch", 1726, 522, {"g": "UPM", "colo": 1, "cell": "Admin", "upm": "C1-ADM", "sw": "MCS1", "kind": "Earth switch"}], ["H-139", 139, "hvring", "HV", "Colo 1 · Admin UPM", "MCS2 vacuum ring switch · isolation", 1867, 442, {"g": "UPM", "colo": 1, "cell": "Admin", "upm": "C1-ADM", "sw": "MCS2", "kind": "Isolation"}], ["H-140", 140, "hvring", "HV", "Colo 1 · Admin UPM", "MCS2 vacuum ring switch · earth switch", 1892, 522, {"g": "UPM", "colo": 1, "cell": "Admin", "upm": "C1-ADM", "sw": "MCS2", "kind": "Earth switch"}], ["H-141", 141, "hvring", "HV", "Colo 1 · Admin UPM", "VCB to own XFM01 · circuit breaker isolation", 1754, 545, {"g": "UPM", "colo": 1, "cell": "Admin", "upm": "C1-ADM", "sw": "VCB", "kind": "Isolation"}], ["H-142", 142, "hvring", "HV", "Colo 1 · Admin UPM", "VCB to own XFM01 · earth switch", 1864, 566, {"g": "UPM", "colo": 1, "cell": "Admin", "upm": "C1-ADM", "sw": "VCB", "kind": "Earth switch"}], ["H-143", 143, "hvring", "HV", "Colo 2 · Cell 1 UPM", "MCS1 vacuum ring switch · isolation", 679, 712, {"g": "UPM", "colo": 2, "cell": "Cell 1", "upm": "C2-1", "sw": "MCS1", "kind": "Isolation"}], ["H-144", 144, "hvring", "HV", "Colo 2 · Cell 1 UPM", "MCS1 vacuum ring switch · earth switch", 704, 792, {"g": "UPM", "colo": 2, "cell": "Cell 1", "upm": "C2-1", "sw": "MCS1", "kind": "Earth switch"}], ["H-145", 145, "hvring", "HV", "Colo 2 · Cell 1 UPM", "MCS2 vacuum ring switch · isolation", 845, 712, {"g": "UPM", "colo": 2, "cell": "Cell 1", "upm": "C2-1", "sw": "MCS2", "kind": "Isolation"}], ["H-146", 146, "hvring", "HV", "Colo 2 · Cell 1 UPM", "MCS2 vacuum ring switch · earth switch", 870, 792, {"g": "UPM", "colo": 2, "cell": "Cell 1", "upm": "C2-1", "sw": "MCS2", "kind": "Earth switch"}], ["H-147", 147, "hvring", "HV", "Colo 2 · Cell 1 UPM", "VCB to own XFM01 · circuit breaker isolation", 732, 815, {"g": "UPM", "colo": 2, "cell": "Cell 1", "upm": "C2-1", "sw": "VCB", "kind": "Isolation"}], ["H-148", 148, "hvring", "HV", "Colo 2 · Cell 1 UPM", "VCB to own XFM01 · earth switch", 842, 836, {"g": "UPM", "colo": 2, "cell": "Cell 1", "upm": "C2-1", "sw": "VCB", "kind": "Earth switch"}], ["H-149", 149, "hvring", "HV", "Colo 2 · Cell 2 UPM", "MCS1 vacuum ring switch · isolation", 971, 712, {"g": "UPM", "colo": 2, "cell": "Cell 2", "upm": "C2-2", "sw": "MCS1", "kind": "Isolation"}], ["H-150", 150, "hvring", "HV", "Colo 2 · Cell 2 UPM", "MCS1 vacuum ring switch · earth switch", 996, 792, {"g": "UPM", "colo": 2, "cell": "Cell 2", "upm": "C2-2", "sw": "MCS1", "kind": "Earth switch"}], ["H-151", 151, "hvring", "HV", "Colo 2 · Cell 2 UPM", "MCS2 vacuum ring switch · isolation", 1137, 712, {"g": "UPM", "colo": 2, "cell": "Cell 2", "upm": "C2-2", "sw": "MCS2", "kind": "Isolation"}], ["H-152", 152, "hvring", "HV", "Colo 2 · Cell 2 UPM", "MCS2 vacuum ring switch · earth switch", 1162, 792, {"g": "UPM", "colo": 2, "cell": "Cell 2", "upm": "C2-2", "sw": "MCS2", "kind": "Earth switch"}], ["H-153", 153, "hvring", "HV", "Colo 2 · Cell 2 UPM", "VCB to own XFM01 · circuit breaker isolation", 1024, 815, {"g": "UPM", "colo": 2, "cell": "Cell 2", "upm": "C2-2", "sw": "VCB", "kind": "Isolation"}], ["H-154", 154, "hvring", "HV", "Colo 2 · Cell 2 UPM", "VCB to own XFM01 · earth switch", 1134, 836, {"g": "UPM", "colo": 2, "cell": "Cell 2", "upm": "C2-2", "sw": "VCB", "kind": "Earth switch"}], ["H-155", 155, "hvring", "HV", "Colo 2 · Cell 3 UPM", "MCS1 vacuum ring switch · isolation", 1263, 712, {"g": "UPM", "colo": 2, "cell": "Cell 3", "upm": "C2-3", "sw": "MCS1", "kind": "Isolation"}], ["H-156", 156, "hvring", "HV", "Colo 2 · Cell 3 UPM", "MCS1 vacuum ring switch · earth switch", 1288, 792, {"g": "UPM", "colo": 2, "cell": "Cell 3", "upm": "C2-3", "sw": "MCS1", "kind": "Earth switch"}], ["H-157", 157, "hvring", "HV", "Colo 2 · Cell 3 UPM", "MCS2 vacuum ring switch · isolation", 1429, 712, {"g": "UPM", "colo": 2, "cell": "Cell 3", "upm": "C2-3", "sw": "MCS2", "kind": "Isolation"}], ["H-158", 158, "hvring", "HV", "Colo 2 · Cell 3 UPM", "MCS2 vacuum ring switch · earth switch", 1454, 792, {"g": "UPM", "colo": 2, "cell": "Cell 3", "upm": "C2-3", "sw": "MCS2", "kind": "Earth switch"}], ["H-159", 159, "hvring", "HV", "Colo 2 · Cell 3 UPM", "VCB to own XFM01 · circuit breaker isolation", 1316, 815, {"g": "UPM", "colo": 2, "cell": "Cell 3", "upm": "C2-3", "sw": "VCB", "kind": "Isolation"}], ["H-160", 160, "hvring", "HV", "Colo 2 · Cell 3 UPM", "VCB to own XFM01 · earth switch", 1426, 836, {"g": "UPM", "colo": 2, "cell": "Cell 3", "upm": "C2-3", "sw": "VCB", "kind": "Earth switch"}], ["H-161", 161, "hvring", "HV", "Colo 2 · Cell 4 UPM", "MCS1 vacuum ring switch · isolation", 1555, 712, {"g": "UPM", "colo": 2, "cell": "Cell 4", "upm": "C2-4", "sw": "MCS1", "kind": "Isolation"}], ["H-162", 162, "hvring", "HV", "Colo 2 · Cell 4 UPM", "MCS1 vacuum ring switch · earth switch", 1580, 792, {"g": "UPM", "colo": 2, "cell": "Cell 4", "upm": "C2-4", "sw": "MCS1", "kind": "Earth switch"}], ["H-163", 163, "hvring", "HV", "Colo 2 · Cell 4 UPM", "MCS2 vacuum ring switch · isolation", 1721, 712, {"g": "UPM", "colo": 2, "cell": "Cell 4", "upm": "C2-4", "sw": "MCS2", "kind": "Isolation"}], ["H-164", 164, "hvring", "HV", "Colo 2 · Cell 4 UPM", "MCS2 vacuum ring switch · earth switch", 1746, 792, {"g": "UPM", "colo": 2, "cell": "Cell 4", "upm": "C2-4", "sw": "MCS2", "kind": "Earth switch"}], ["H-165", 165, "hvring", "HV", "Colo 2 · Cell 4 UPM", "VCB to own XFM01 · circuit breaker isolation", 1608, 815, {"g": "UPM", "colo": 2, "cell": "Cell 4", "upm": "C2-4", "sw": "VCB", "kind": "Isolation"}], ["H-166", 166, "hvring", "HV", "Colo 2 · Cell 4 UPM", "VCB to own XFM01 · earth switch", 1718, 836, {"g": "UPM", "colo": 2, "cell": "Cell 4", "upm": "C2-4", "sw": "VCB", "kind": "Earth switch"}], ["H-167", 167, "hvring", "HV", "Colo 3 · Cell 1 UPM", "MCS1 vacuum ring switch · isolation", 679, 982, {"g": "UPM", "colo": 3, "cell": "Cell 1", "upm": "C3-1", "sw": "MCS1", "kind": "Isolation"}], ["H-168", 168, "hvring", "HV", "Colo 3 · Cell 1 UPM", "MCS1 vacuum ring switch · earth switch", 704, 1062, {"g": "UPM", "colo": 3, "cell": "Cell 1", "upm": "C3-1", "sw": "MCS1", "kind": "Earth switch"}], ["H-169", 169, "hvring", "HV", "Colo 3 · Cell 1 UPM", "MCS2 vacuum ring switch · isolation", 845, 982, {"g": "UPM", "colo": 3, "cell": "Cell 1", "upm": "C3-1", "sw": "MCS2", "kind": "Isolation"}], ["H-170", 170, "hvring", "HV", "Colo 3 · Cell 1 UPM", "MCS2 vacuum ring switch · earth switch", 870, 1062, {"g": "UPM", "colo": 3, "cell": "Cell 1", "upm": "C3-1", "sw": "MCS2", "kind": "Earth switch"}], ["H-171", 171, "hvring", "HV", "Colo 3 · Cell 1 UPM", "VCB to own XFM01 · circuit breaker isolation", 732, 1085, {"g": "UPM", "colo": 3, "cell": "Cell 1", "upm": "C3-1", "sw": "VCB", "kind": "Isolation"}], ["H-172", 172, "hvring", "HV", "Colo 3 · Cell 1 UPM", "VCB to own XFM01 · earth switch", 842, 1106, {"g": "UPM", "colo": 3, "cell": "Cell 1", "upm": "C3-1", "sw": "VCB", "kind": "Earth switch"}], ["H-173", 173, "hvring", "HV", "Colo 3 · Cell 2 UPM", "MCS1 vacuum ring switch · isolation", 971, 982, {"g": "UPM", "colo": 3, "cell": "Cell 2", "upm": "C3-2", "sw": "MCS1", "kind": "Isolation"}], ["H-174", 174, "hvring", "HV", "Colo 3 · Cell 2 UPM", "MCS1 vacuum ring switch · earth switch", 996, 1062, {"g": "UPM", "colo": 3, "cell": "Cell 2", "upm": "C3-2", "sw": "MCS1", "kind": "Earth switch"}], ["H-175", 175, "hvring", "HV", "Colo 3 · Cell 2 UPM", "MCS2 vacuum ring switch · isolation", 1137, 982, {"g": "UPM", "colo": 3, "cell": "Cell 2", "upm": "C3-2", "sw": "MCS2", "kind": "Isolation"}], ["H-176", 176, "hvring", "HV", "Colo 3 · Cell 2 UPM", "MCS2 vacuum ring switch · earth switch", 1162, 1062, {"g": "UPM", "colo": 3, "cell": "Cell 2", "upm": "C3-2", "sw": "MCS2", "kind": "Earth switch"}], ["H-177", 177, "hvring", "HV", "Colo 3 · Cell 2 UPM", "VCB to own XFM01 · circuit breaker isolation", 1024, 1085, {"g": "UPM", "colo": 3, "cell": "Cell 2", "upm": "C3-2", "sw": "VCB", "kind": "Isolation"}], ["H-178", 178, "hvring", "HV", "Colo 3 · Cell 2 UPM", "VCB to own XFM01 · earth switch", 1134, 1106, {"g": "UPM", "colo": 3, "cell": "Cell 2", "upm": "C3-2", "sw": "VCB", "kind": "Earth switch"}], ["H-179", 179, "hvring", "HV", "Colo 3 · Cell 3 UPM", "MCS1 vacuum ring switch · isolation", 1263, 982, {"g": "UPM", "colo": 3, "cell": "Cell 3", "upm": "C3-3", "sw": "MCS1", "kind": "Isolation"}], ["H-180", 180, "hvring", "HV", "Colo 3 · Cell 3 UPM", "MCS1 vacuum ring switch · earth switch", 1288, 1062, {"g": "UPM", "colo": 3, "cell": "Cell 3", "upm": "C3-3", "sw": "MCS1", "kind": "Earth switch"}], ["H-181", 181, "hvring", "HV", "Colo 3 · Cell 3 UPM", "MCS2 vacuum ring switch · isolation", 1429, 982, {"g": "UPM", "colo": 3, "cell": "Cell 3", "upm": "C3-3", "sw": "MCS2", "kind": "Isolation"}], ["H-182", 182, "hvring", "HV", "Colo 3 · Cell 3 UPM", "MCS2 vacuum ring switch · earth switch", 1454, 1062, {"g": "UPM", "colo": 3, "cell": "Cell 3", "upm": "C3-3", "sw": "MCS2", "kind": "Earth switch"}], ["H-183", 183, "hvring", "HV", "Colo 3 · Cell 3 UPM", "VCB to own XFM01 · circuit breaker isolation", 1316, 1085, {"g": "UPM", "colo": 3, "cell": "Cell 3", "upm": "C3-3", "sw": "VCB", "kind": "Isolation"}], ["H-184", 184, "hvring", "HV", "Colo 3 · Cell 3 UPM", "VCB to own XFM01 · earth switch", 1426, 1106, {"g": "UPM", "colo": 3, "cell": "Cell 3", "upm": "C3-3", "sw": "VCB", "kind": "Earth switch"}], ["H-185", 185, "hvring", "HV", "Colo 3 · Cell 4 UPM", "MCS1 vacuum ring switch · isolation", 1555, 982, {"g": "UPM", "colo": 3, "cell": "Cell 4", "upm": "C3-4", "sw": "MCS1", "kind": "Isolation"}], ["H-186", 186, "hvring", "HV", "Colo 3 · Cell 4 UPM", "MCS1 vacuum ring switch · earth switch", 1580, 1062, {"g": "UPM", "colo": 3, "cell": "Cell 4", "upm": "C3-4", "sw": "MCS1", "kind": "Earth switch"}], ["H-187", 187, "hvring", "HV", "Colo 3 · Cell 4 UPM", "MCS2 vacuum ring switch · isolation", 1721, 982, {"g": "UPM", "colo": 3, "cell": "Cell 4", "upm": "C3-4", "sw": "MCS2", "kind": "Isolation"}], ["H-188", 188, "hvring", "HV", "Colo 3 · Cell 4 UPM", "MCS2 vacuum ring switch · earth switch", 1746, 1062, {"g": "UPM", "colo": 3, "cell": "Cell 4", "upm": "C3-4", "sw": "MCS2", "kind": "Earth switch"}], ["H-189", 189, "hvring", "HV", "Colo 3 · Cell 4 UPM", "VCB to own XFM01 · circuit breaker isolation", 1608, 1085, {"g": "UPM", "colo": 3, "cell": "Cell 4", "upm": "C3-4", "sw": "VCB", "kind": "Isolation"}], ["H-190", 190, "hvring", "HV", "Colo 3 · Cell 4 UPM", "VCB to own XFM01 · earth switch", 1718, 1106, {"g": "UPM", "colo": 3, "cell": "Cell 4", "upm": "C3-4", "sw": "VCB", "kind": "Earth switch"}], ["H-191", 191, "hvring", "HV", "Colo 4 · Cell 1 UPM", "MCS1 vacuum ring switch · isolation", 679, 1252, {"g": "UPM", "colo": 4, "cell": "Cell 1", "upm": "C4-1", "sw": "MCS1", "kind": "Isolation"}], ["H-192", 192, "hvring", "HV", "Colo 4 · Cell 1 UPM", "MCS1 vacuum ring switch · earth switch", 704, 1332, {"g": "UPM", "colo": 4, "cell": "Cell 1", "upm": "C4-1", "sw": "MCS1", "kind": "Earth switch"}], ["H-193", 193, "hvring", "HV", "Colo 4 · Cell 1 UPM", "MCS2 vacuum ring switch · isolation", 845, 1252, {"g": "UPM", "colo": 4, "cell": "Cell 1", "upm": "C4-1", "sw": "MCS2", "kind": "Isolation"}], ["H-194", 194, "hvring", "HV", "Colo 4 · Cell 1 UPM", "MCS2 vacuum ring switch · earth switch", 870, 1332, {"g": "UPM", "colo": 4, "cell": "Cell 1", "upm": "C4-1", "sw": "MCS2", "kind": "Earth switch"}], ["H-195", 195, "hvring", "HV", "Colo 4 · Cell 1 UPM", "VCB to own XFM01 · circuit breaker isolation", 732, 1355, {"g": "UPM", "colo": 4, "cell": "Cell 1", "upm": "C4-1", "sw": "VCB", "kind": "Isolation"}], ["H-196", 196, "hvring", "HV", "Colo 4 · Cell 1 UPM", "VCB to own XFM01 · earth switch", 842, 1376, {"g": "UPM", "colo": 4, "cell": "Cell 1", "upm": "C4-1", "sw": "VCB", "kind": "Earth switch"}], ["H-197", 197, "hvring", "HV", "Colo 4 · Cell 2 UPM", "MCS1 vacuum ring switch · isolation", 971, 1252, {"g": "UPM", "colo": 4, "cell": "Cell 2", "upm": "C4-2", "sw": "MCS1", "kind": "Isolation"}], ["H-198", 198, "hvring", "HV", "Colo 4 · Cell 2 UPM", "MCS1 vacuum ring switch · earth switch", 996, 1332, {"g": "UPM", "colo": 4, "cell": "Cell 2", "upm": "C4-2", "sw": "MCS1", "kind": "Earth switch"}], ["H-199", 199, "hvring", "HV", "Colo 4 · Cell 2 UPM", "MCS2 vacuum ring switch · isolation", 1137, 1252, {"g": "UPM", "colo": 4, "cell": "Cell 2", "upm": "C4-2", "sw": "MCS2", "kind": "Isolation"}], ["H-200", 200, "hvring", "HV", "Colo 4 · Cell 2 UPM", "MCS2 vacuum ring switch · earth switch", 1162, 1332, {"g": "UPM", "colo": 4, "cell": "Cell 2", "upm": "C4-2", "sw": "MCS2", "kind": "Earth switch"}], ["H-201", 201, "hvring", "HV", "Colo 4 · Cell 2 UPM", "VCB to own XFM01 · circuit breaker isolation", 1024, 1355, {"g": "UPM", "colo": 4, "cell": "Cell 2", "upm": "C4-2", "sw": "VCB", "kind": "Isolation"}], ["H-202", 202, "hvring", "HV", "Colo 4 · Cell 2 UPM", "VCB to own XFM01 · earth switch", 1134, 1376, {"g": "UPM", "colo": 4, "cell": "Cell 2", "upm": "C4-2", "sw": "VCB", "kind": "Earth switch"}], ["H-203", 203, "hvring", "HV", "Colo 4 · Cell 3 UPM", "MCS1 vacuum ring switch · isolation", 1263, 1252, {"g": "UPM", "colo": 4, "cell": "Cell 3", "upm": "C4-3", "sw": "MCS1", "kind": "Isolation"}], ["H-204", 204, "hvring", "HV", "Colo 4 · Cell 3 UPM", "MCS1 vacuum ring switch · earth switch", 1288, 1332, {"g": "UPM", "colo": 4, "cell": "Cell 3", "upm": "C4-3", "sw": "MCS1", "kind": "Earth switch"}], ["H-205", 205, "hvring", "HV", "Colo 4 · Cell 3 UPM", "MCS2 vacuum ring switch · isolation", 1429, 1252, {"g": "UPM", "colo": 4, "cell": "Cell 3", "upm": "C4-3", "sw": "MCS2", "kind": "Isolation"}], ["H-206", 206, "hvring", "HV", "Colo 4 · Cell 3 UPM", "MCS2 vacuum ring switch · earth switch", 1454, 1332, {"g": "UPM", "colo": 4, "cell": "Cell 3", "upm": "C4-3", "sw": "MCS2", "kind": "Earth switch"}], ["H-207", 207, "hvring", "HV", "Colo 4 · Cell 3 UPM", "VCB to own XFM01 · circuit breaker isolation", 1316, 1355, {"g": "UPM", "colo": 4, "cell": "Cell 3", "upm": "C4-3", "sw": "VCB", "kind": "Isolation"}], ["H-208", 208, "hvring", "HV", "Colo 4 · Cell 3 UPM", "VCB to own XFM01 · earth switch", 1426, 1376, {"g": "UPM", "colo": 4, "cell": "Cell 3", "upm": "C4-3", "sw": "VCB", "kind": "Earth switch"}], ["H-209", 209, "hvring", "HV", "Colo 4 · Cell 4 UPM", "MCS1 vacuum ring switch · isolation", 1555, 1252, {"g": "UPM", "colo": 4, "cell": "Cell 4", "upm": "C4-4", "sw": "MCS1", "kind": "Isolation"}], ["H-210", 210, "hvring", "HV", "Colo 4 · Cell 4 UPM", "MCS1 vacuum ring switch · earth switch", 1580, 1332, {"g": "UPM", "colo": 4, "cell": "Cell 4", "upm": "C4-4", "sw": "MCS1", "kind": "Earth switch"}], ["H-211", 211, "hvring", "HV", "Colo 4 · Cell 4 UPM", "MCS2 vacuum ring switch · isolation", 1721, 1252, {"g": "UPM", "colo": 4, "cell": "Cell 4", "upm": "C4-4", "sw": "MCS2", "kind": "Isolation"}], ["H-212", 212, "hvring", "HV", "Colo 4 · Cell 4 UPM", "MCS2 vacuum ring switch · earth switch", 1746, 1332, {"g": "UPM", "colo": 4, "cell": "Cell 4", "upm": "C4-4", "sw": "MCS2", "kind": "Earth switch"}], ["H-213", 213, "hvring", "HV", "Colo 4 · Cell 4 UPM", "VCB to own XFM01 · circuit breaker isolation", 1608, 1355, {"g": "UPM", "colo": 4, "cell": "Cell 4", "upm": "C4-4", "sw": "VCB", "kind": "Isolation"}], ["H-214", 214, "hvring", "HV", "Colo 4 · Cell 4 UPM", "VCB to own XFM01 · earth switch", 1718, 1376, {"g": "UPM", "colo": 4, "cell": "Cell 4", "upm": "C4-4", "sw": "VCB", "kind": "Earth switch"}], ["H-215", 215, "hvring", "HV", "Colo 5 · Cell 1 UPM", "MCS1 vacuum ring switch · isolation", 679, 1522, {"g": "UPM", "colo": 5, "cell": "Cell 1", "upm": "C5-1", "sw": "MCS1", "kind": "Isolation"}], ["H-216", 216, "hvring", "HV", "Colo 5 · Cell 1 UPM", "MCS1 vacuum ring switch · earth switch", 704, 1602, {"g": "UPM", "colo": 5, "cell": "Cell 1", "upm": "C5-1", "sw": "MCS1", "kind": "Earth switch"}], ["H-217", 217, "hvring", "HV", "Colo 5 · Cell 1 UPM", "MCS2 vacuum ring switch · isolation", 845, 1522, {"g": "UPM", "colo": 5, "cell": "Cell 1", "upm": "C5-1", "sw": "MCS2", "kind": "Isolation"}], ["H-218", 218, "hvring", "HV", "Colo 5 · Cell 1 UPM", "MCS2 vacuum ring switch · earth switch", 870, 1602, {"g": "UPM", "colo": 5, "cell": "Cell 1", "upm": "C5-1", "sw": "MCS2", "kind": "Earth switch"}], ["H-219", 219, "hvring", "HV", "Colo 5 · Cell 1 UPM", "VCB to own XFM01 · circuit breaker isolation", 732, 1625, {"g": "UPM", "colo": 5, "cell": "Cell 1", "upm": "C5-1", "sw": "VCB", "kind": "Isolation"}], ["H-220", 220, "hvring", "HV", "Colo 5 · Cell 1 UPM", "VCB to own XFM01 · earth switch", 842, 1646, {"g": "UPM", "colo": 5, "cell": "Cell 1", "upm": "C5-1", "sw": "VCB", "kind": "Earth switch"}], ["H-221", 221, "hvring", "HV", "Colo 5 · Cell 2 UPM", "MCS1 vacuum ring switch · isolation", 971, 1522, {"g": "UPM", "colo": 5, "cell": "Cell 2", "upm": "C5-2", "sw": "MCS1", "kind": "Isolation"}], ["H-222", 222, "hvring", "HV", "Colo 5 · Cell 2 UPM", "MCS1 vacuum ring switch · earth switch", 996, 1602, {"g": "UPM", "colo": 5, "cell": "Cell 2", "upm": "C5-2", "sw": "MCS1", "kind": "Earth switch"}], ["H-223", 223, "hvring", "HV", "Colo 5 · Cell 2 UPM", "MCS2 vacuum ring switch · isolation", 1137, 1522, {"g": "UPM", "colo": 5, "cell": "Cell 2", "upm": "C5-2", "sw": "MCS2", "kind": "Isolation"}], ["H-224", 224, "hvring", "HV", "Colo 5 · Cell 2 UPM", "MCS2 vacuum ring switch · earth switch", 1162, 1602, {"g": "UPM", "colo": 5, "cell": "Cell 2", "upm": "C5-2", "sw": "MCS2", "kind": "Earth switch"}], ["H-225", 225, "hvring", "HV", "Colo 5 · Cell 2 UPM", "VCB to own XFM01 · circuit breaker isolation", 1024, 1625, {"g": "UPM", "colo": 5, "cell": "Cell 2", "upm": "C5-2", "sw": "VCB", "kind": "Isolation"}], ["H-226", 226, "hvring", "HV", "Colo 5 · Cell 2 UPM", "VCB to own XFM01 · earth switch", 1134, 1646, {"g": "UPM", "colo": 5, "cell": "Cell 2", "upm": "C5-2", "sw": "VCB", "kind": "Earth switch"}], ["H-227", 227, "hvring", "HV", "Colo 5 · Cell 3 UPM", "MCS1 vacuum ring switch · isolation", 1263, 1522, {"g": "UPM", "colo": 5, "cell": "Cell 3", "upm": "C5-3", "sw": "MCS1", "kind": "Isolation"}], ["H-228", 228, "hvring", "HV", "Colo 5 · Cell 3 UPM", "MCS1 vacuum ring switch · earth switch", 1288, 1602, {"g": "UPM", "colo": 5, "cell": "Cell 3", "upm": "C5-3", "sw": "MCS1", "kind": "Earth switch"}], ["H-229", 229, "hvring", "HV", "Colo 5 · Cell 3 UPM", "MCS2 vacuum ring switch · isolation", 1429, 1522, {"g": "UPM", "colo": 5, "cell": "Cell 3", "upm": "C5-3", "sw": "MCS2", "kind": "Isolation"}], ["H-230", 230, "hvring", "HV", "Colo 5 · Cell 3 UPM", "MCS2 vacuum ring switch · earth switch", 1454, 1602, {"g": "UPM", "colo": 5, "cell": "Cell 3", "upm": "C5-3", "sw": "MCS2", "kind": "Earth switch"}], ["H-231", 231, "hvring", "HV", "Colo 5 · Cell 3 UPM", "VCB to own XFM01 · circuit breaker isolation", 1316, 1625, {"g": "UPM", "colo": 5, "cell": "Cell 3", "upm": "C5-3", "sw": "VCB", "kind": "Isolation"}], ["H-232", 232, "hvring", "HV", "Colo 5 · Cell 3 UPM", "VCB to own XFM01 · earth switch", 1426, 1646, {"g": "UPM", "colo": 5, "cell": "Cell 3", "upm": "C5-3", "sw": "VCB", "kind": "Earth switch"}], ["H-233", 233, "hvring", "HV", "Colo 5 · Cell 4 UPM", "MCS1 vacuum ring switch · isolation", 1555, 1522, {"g": "UPM", "colo": 5, "cell": "Cell 4", "upm": "C5-4", "sw": "MCS1", "kind": "Isolation"}], ["H-234", 234, "hvring", "HV", "Colo 5 · Cell 4 UPM", "MCS1 vacuum ring switch · earth switch", 1580, 1602, {"g": "UPM", "colo": 5, "cell": "Cell 4", "upm": "C5-4", "sw": "MCS1", "kind": "Earth switch"}], ["H-235", 235, "hvring", "HV", "Colo 5 · Cell 4 UPM", "MCS2 vacuum ring switch · isolation", 1721, 1522, {"g": "UPM", "colo": 5, "cell": "Cell 4", "upm": "C5-4", "sw": "MCS2", "kind": "Isolation"}], ["H-236", 236, "hvring", "HV", "Colo 5 · Cell 4 UPM", "MCS2 vacuum ring switch · earth switch", 1746, 1602, {"g": "UPM", "colo": 5, "cell": "Cell 4", "upm": "C5-4", "sw": "MCS2", "kind": "Earth switch"}], ["H-237", 237, "hvring", "HV", "Colo 5 · Cell 4 UPM", "VCB to own XFM01 · circuit breaker isolation", 1608, 1625, {"g": "UPM", "colo": 5, "cell": "Cell 4", "upm": "C5-4", "sw": "VCB", "kind": "Isolation"}], ["H-238", 238, "hvring", "HV", "Colo 5 · Cell 4 UPM", "VCB to own XFM01 · earth switch", 1718, 1646, {"g": "UPM", "colo": 5, "cell": "Cell 4", "upm": "C5-4", "sw": "VCB", "kind": "Earth switch"}], ["L-001", 1, "lvt4", "LV", "ATS bank A", "ATS-A1", 368, 24, {"g": "LV", "dw": "lvt4"}], ["L-002", 2, "lvt4", "LV", "ATS bank A", "ATS-A2", 430, 24, {"g": "LV", "dw": "lvt4"}], ["L-003", 3, "lvt4", "LV", "ATS bank A", "ATS-A3", 494, 24, {"g": "LV", "dw": "lvt4"}], ["L-004", 4, "lvt4", "LV", "ATS bank A", "ATS-A4", 558, 24, {"g": "LV", "dw": "lvt4"}], ["L-005", 5, "lvt4", "LV", "ATS bank A", "ATS-A5", 620, 24, {"g": "LV", "dw": "lvt4"}], ["L-006", 6, "lvt4", "LV", "ATS bank B", "ATS-B1", 838, 24, {"g": "LV", "dw": "lvt4"}], ["L-007", 7, "lvt4", "LV", "ATS bank B", "ATS-B2", 901, 24, {"g": "LV", "dw": "lvt4"}], ["L-008", 8, "lvt4", "LV", "ATS bank B", "ATS-B3", 965, 24, {"g": "LV", "dw": "lvt4"}], ["L-009", 9, "lvt4", "LV", "ATS bank B", "ATS-B4", 1029, 24, {"g": "LV", "dw": "lvt4"}], ["L-010", 10, "lvt4", "LV", "ATS bank B", "ATS-B5", 1087, 24, {"g": "LV", "dw": "lvt4"}], ["L-011", 11, "lvt4", "LV", "LV Main Distribution A", "Incomer 1", 456, 98, {"g": "LV", "dw": "lvt4"}], ["L-012", 12, "lvt4", "LV", "LV Main Distribution A", "Incomer 2", 510, 98, {"g": "LV", "dw": "lvt4"}], ["L-013", 13, "lvt4", "LV", "LV Main Distribution B", "Incomer 1", 918, 98, {"g": "LV", "dw": "lvt4"}], ["L-014", 14, "lvt4", "LV", "LV Main Distribution B", "Incomer 2", 971, 98, {"g": "LV", "dw": "lvt4"}], ["L-015", 15, "lvt4", "LV", "LV tie breaker", "Tie isolator, A side", 667, 178, {"g": "LV", "dw": "lvt4"}], ["L-016", 16, "lvt4", "LV", "LV tie breaker", "Tie breaker", 704, 182, {"g": "LV", "dw": "lvt4"}], ["L-017", 17, "lvt4", "LV", "LV tie breaker", "Tie isolator, B side", 758, 178, {"g": "LV", "dw": "lvt4"}], ["L-018", 18, "lvt4", "LV", "LV Main Distribution A", "Outgoing to RPP A1", 362, 204, {"g": "LV", "dw": "lvt4"}], ["L-019", 19, "lvt4", "LV", "LV Main Distribution A", "Outgoing to RPP A2", 457, 204, {"g": "LV", "dw": "lvt4"}], ["L-020", 20, "lvt4", "LV", "LV Main Distribution A", "Outgoing to RPP A3", 547, 204, {"g": "LV", "dw": "lvt4"}], ["L-021", 21, "lvt4", "LV", "LV Main Distribution A", "Outgoing to RPP A4", 631, 204, {"g": "LV", "dw": "lvt4"}], ["L-022", 22, "lvt4", "LV", "LV Main Distribution B", "Outgoing to RPP B1", 828, 204, {"g": "LV", "dw": "lvt4"}], ["L-023", 23, "lvt4", "LV", "LV Main Distribution B", "Outgoing to RPP B2", 931, 204, {"g": "LV", "dw": "lvt4"}], ["L-024", 24, "lvt4", "LV", "LV Main Distribution B", "Outgoing to RPP B3", 1006, 204, {"g": "LV", "dw": "lvt4"}], ["L-025", 25, "lvt4", "LV", "LV Main Distribution B", "Outgoing to RPP B4", 1069, 204, {"g": "LV", "dw": "lvt4"}], ["L-026", 26, "lvt4", "LV", "RPPs, A side", "RPP A1 way 1", 325, 288, {"g": "LV", "dw": "lvt4"}], ["L-027", 27, "lvt4", "LV", "RPPs, A side", "RPP A1 way 2", 352, 288, {"g": "LV", "dw": "lvt4"}], ["L-028", 28, "lvt4", "LV", "RPPs, A side", "RPP A1 way 3", 382, 288, {"g": "LV", "dw": "lvt4"}], ["L-029", 29, "lvt4", "LV", "RPPs, A side", "RPP A2 way 1", 429, 288, {"g": "LV", "dw": "lvt4"}], ["L-030", 30, "lvt4", "LV", "RPPs, A side", "RPP A2 way 2", 457, 288, {"g": "LV", "dw": "lvt4"}], ["L-031", 31, "lvt4", "LV", "RPPs, A side", "RPP A2 way 3", 486, 288, {"g": "LV", "dw": "lvt4"}], ["L-032", 32, "lvt4", "LV", "RPPs, A side", "RPP A3 way 1", 527, 288, {"g": "LV", "dw": "lvt4"}], ["L-033", 33, "lvt4", "LV", "RPPs, A side", "RPP A3 way 2", 556, 288, {"g": "LV", "dw": "lvt4"}], ["L-034", 34, "lvt4", "LV", "RPPs, A side", "RPP A4 way 1", 613, 288, {"g": "LV", "dw": "lvt4"}], ["L-035", 35, "lvt4", "LV", "RPPs, A side", "RPP A4 way 2", 639, 288, {"g": "LV", "dw": "lvt4"}], ["L-036", 36, "lvt4", "LV", "RPPs, A side", "RPP A4 way 3", 669, 288, {"g": "LV", "dw": "lvt4"}], ["L-037", 37, "lvt4", "LV", "RPPs, B side", "RPP B1 way 1", 795, 288, {"g": "LV", "dw": "lvt4"}], ["L-038", 38, "lvt4", "LV", "RPPs, B side", "RPP B1 way 2", 824, 288, {"g": "LV", "dw": "lvt4"}], ["L-039", 39, "lvt4", "LV", "RPPs, B side", "RPP B1 way 3", 853, 288, {"g": "LV", "dw": "lvt4"}], ["L-040", 40, "lvt4", "LV", "RPPs, B side", "RPP B2 way 1", 906, 288, {"g": "LV", "dw": "lvt4"}], ["L-041", 41, "lvt4", "LV", "RPPs, B side", "RPP B2 way 2", 933, 288, {"g": "LV", "dw": "lvt4"}], ["L-042", 42, "lvt4", "LV", "RPPs, B side", "RPP B2 way 3", 962, 288, {"g": "LV", "dw": "lvt4"}], ["L-043", 43, "lvt4", "LV", "RPPs, B side", "RPP B3 way 1", 993, 288, {"g": "LV", "dw": "lvt4"}], ["L-044", 44, "lvt4", "LV", "RPPs, B side", "RPP B3 way 2", 1019, 288, {"g": "LV", "dw": "lvt4"}], ["L-045", 45, "lvt4", "LV", "RPPs, B side", "RPP B4 way 1", 1063, 288, {"g": "LV", "dw": "lvt4"}], ["L-046", 46, "lvt4", "LV", "RPPs, B side", "RPP B4 way 2", 1092, 288, {"g": "LV", "dw": "lvt4"}], ["L-047", 47, "lvt4", "LV", "RPPs, B side", "RPP B4 way 3", 1121, 288, {"g": "LV", "dw": "lvt4"}], ["L-048", 48, "lvt4", "LV", "Row PDUs, A side", "Row PDU A1 feed to IT load", 346, 371, {"g": "LV", "dw": "lvt4"}], ["L-049", 49, "lvt4", "LV", "Row PDUs, A side", "Row PDU A2 feed to IT load", 440, 371, {"g": "LV", "dw": "lvt4"}], ["L-050", 50, "lvt4", "LV", "Row PDUs, A side", "Row PDU A3 feed to IT load", 528, 371, {"g": "LV", "dw": "lvt4"}], ["L-051", 51, "lvt4", "LV", "Row PDUs, A side", "Row PDU A4 feed to IT load", 639, 371, {"g": "LV", "dw": "lvt4"}], ["L-052", 52, "lvt4", "LV", "Row PDUs, B side", "Row PDU B1 feed to IT load", 822, 371, {"g": "LV", "dw": "lvt4"}], ["L-053", 53, "lvt4", "LV", "Row PDUs, B side", "Row PDU B2 feed to IT load", 906, 371, {"g": "LV", "dw": "lvt4"}], ["L-054", 54, "lvt4", "LV", "Row PDUs, B side", "Row PDU B3 feed to IT load", 979, 371, {"g": "LV", "dw": "lvt4"}], ["L-055", 55, "lvt4", "LV", "Row PDUs, B side", "Row PDU B4 feed to IT load", 1084, 371, {"g": "LV", "dw": "lvt4"}], ["L-056", 56, "lvhyper", "LV", "400 V LV SWBD A", "Incomer 1", 287, 45, {"g": "LV", "dw": "lvhyper"}], ["L-057", 57, "lvhyper", "LV", "400 V LV SWBD A", "Incomer 2", 345, 45, {"g": "LV", "dw": "lvhyper"}], ["L-058", 58, "lvhyper", "LV", "400 V LV SWBD B", "Incomer 1", 652, 45, {"g": "LV", "dw": "lvhyper"}], ["L-059", 59, "lvhyper", "LV", "400 V LV SWBD B", "Incomer 2", 710, 45, {"g": "LV", "dw": "lvhyper"}], ["L-060", 60, "lvhyper", "LV", "400 V LV SWBD B", "Incomer 3", 917, 45, {"g": "LV", "dw": "lvhyper"}], ["L-061", 61, "lvhyper", "LV", "400 V bus tie", "Bus tie isolator, A side", 419, 62, {"g": "LV", "dw": "lvhyper"}], ["L-062", 62, "lvhyper", "LV", "400 V bus tie", "Bus tie circuit breaker", 541, 104, {"g": "LV", "dw": "lvhyper"}], ["L-063", 63, "lvhyper", "LV", "400 V bus tie", "Bus tie isolator, B side", 596, 62, {"g": "LV", "dw": "lvhyper"}], ["L-064", 64, "lvhyper", "LV", "400 V LV SWBD A", "Outgoing CB 1, UPS A feed", 95, 110, {"g": "LV", "dw": "lvhyper"}], ["L-065", 65, "lvhyper", "LV", "400 V LV SWBD A", "Outgoing CB 2, UPS A feed", 147, 110, {"g": "LV", "dw": "lvhyper"}], ["L-066", 66, "lvhyper", "LV", "400 V LV SWBD A", "Outgoing CB 3, UPS A feed", 205, 110, {"g": "LV", "dw": "lvhyper"}], ["L-067", 67, "lvhyper", "LV", "400 V LV SWBD A", "Outgoing CB 4, UPS A feed", 262, 110, {"g": "LV", "dw": "lvhyper"}], ["L-068", 68, "lvhyper", "LV", "400 V LV SWBD A", "Outgoing CB 5, UPS A feed", 319, 110, {"g": "LV", "dw": "lvhyper"}], ["L-069", 69, "lvhyper", "LV", "400 V LV SWBD A", "Outgoing CB 6, UPS A feed", 378, 110, {"g": "LV", "dw": "lvhyper"}], ["L-070", 70, "lvhyper", "LV", "400 V LV SWBD B", "Outgoing CB 1, UPS B feed", 617, 110, {"g": "LV", "dw": "lvhyper"}], ["L-071", 71, "lvhyper", "LV", "400 V LV SWBD B", "Outgoing CB 2, UPS B feed", 681, 110, {"g": "LV", "dw": "lvhyper"}], ["L-072", 72, "lvhyper", "LV", "400 V LV SWBD B", "Outgoing CB 3, UPS B feed", 742, 110, {"g": "LV", "dw": "lvhyper"}], ["L-073", 73, "lvhyper", "LV", "400 V LV SWBD B", "Outgoing CB 4, UPS B feed", 802, 110, {"g": "LV", "dw": "lvhyper"}], ["L-074", 74, "lvhyper", "LV", "400 V LV SWBD B", "Outgoing CB 5, UPS B feed", 860, 110, {"g": "LV", "dw": "lvhyper"}], ["L-075", 75, "lvhyper", "LV", "400 V LV SWBD B", "Outgoing CB 6, UPS B feed", 919, 110, {"g": "LV", "dw": "lvhyper"}], ["L-076", 76, "lvhyper", "LV", "UPS maintenance bypass", "Maintenance bypass isolator, A side", 481, 220, {"g": "LV", "dw": "lvhyper"}], ["L-077", 77, "lvhyper", "LV", "UPS maintenance bypass", "Maintenance bypass isolator, B side", 558, 220, {"g": "LV", "dw": "lvhyper"}], ["L-078", 78, "lvhyper", "LV", "Static transfer switches", "STS A", 131, 393, {"g": "LV", "dw": "lvhyper"}], ["L-079", 79, "lvhyper", "LV", "Static transfer switches", "STS A to B automatic bypass, A side", 418, 412, {"g": "LV", "dw": "lvhyper"}], ["L-080", 80, "lvhyper", "LV", "Static transfer switches", "STS A to B automatic bypass, B side", 614, 412, {"g": "LV", "dw": "lvhyper"}], ["L-081", 81, "lvhyper", "LV", "Static transfer switches", "STS B", 850, 393, {"g": "LV", "dw": "lvhyper"}], ["L-082", 82, "layout", "LV", "Main power distribution A (ATS)", "Utility incomer", 458, 240, {"g": "LV", "dw": "layout"}], ["L-083", 83, "layout", "LV", "Main power distribution A (ATS)", "Generator incomer / ATS", 490, 240, {"g": "LV", "dw": "layout"}], ["L-084", 84, "layout", "LV", "Main power distribution B (ATS)", "Utility incomer", 600, 240, {"g": "LV", "dw": "layout"}], ["L-085", 85, "layout", "LV", "Main power distribution B (ATS)", "Generator incomer / ATS", 632, 240, {"g": "LV", "dw": "layout"}], ["L-086", 86, "layout", "LV", "Diesel generators", "Generator A output breaker", 322, 238, {"g": "LV", "dw": "layout"}], ["L-087", 87, "layout", "LV", "Diesel generators", "Central generator output breaker", 565, 182, {"g": "LV", "dw": "layout"}], ["L-088", 88, "layout", "LV", "Diesel generators", "Generator B output breaker", 762, 238, {"g": "LV", "dw": "layout"}], ["L-089", 89, "layout", "LV", "UPS, A and B", "UPS A input isolator", 505, 300, {"g": "LV", "dw": "layout"}], ["L-090", 90, "layout", "LV", "UPS, A and B", "UPS B input isolator", 583, 300, {"g": "LV", "dw": "layout"}], ["L-091", 91, "layout", "LV", "UPS batteries, A and B", "Battery A DC isolator", 492, 352, {"g": "LV", "dw": "layout"}], ["L-092", 92, "layout", "LV", "UPS batteries, A and B", "Battery B DC isolator", 592, 352, {"g": "LV", "dw": "layout"}], ["L-093", 93, "layout", "LV", "Chillers and drycoolers", "Chiller A isolator", 304, 300, {"g": "LV", "dw": "layout"}], ["L-094", 94, "layout", "LV", "Chillers and drycoolers", "Chiller B isolator", 782, 300, {"g": "LV", "dw": "layout"}], ["L-095", 95, "layout", "LV", "Chillers and drycoolers", "Drycooler A isolator", 283, 362, {"g": "LV", "dw": "layout"}], ["L-096", 96, "layout", "LV", "Chillers and drycoolers", "Drycooler B isolator", 804, 362, {"g": "LV", "dw": "layout"}], ["L-097", 97, "layout", "LV", "Climate control units", "CCU A1 isolator", 405, 490, {"g": "LV", "dw": "layout"}], ["L-098", 98, "layout", "LV", "Climate control units", "CCU A2 isolator", 393, 565, {"g": "LV", "dw": "layout"}], ["L-099", 99, "layout", "LV", "Climate control units", "CCU A3 isolator", 378, 650, {"g": "LV", "dw": "layout"}], ["L-100", 100, "layout", "LV", "Climate control units", "CCU B1 isolator", 683, 490, {"g": "LV", "dw": "layout"}], ["L-101", 101, "layout", "LV", "Climate control units", "CCU B2 isolator", 692, 565, {"g": "LV", "dw": "layout"}], ["L-102", 102, "layout", "LV", "Climate control units", "CCU B3 isolator", 708, 650, {"g": "LV", "dw": "layout"}], ["L-103", 103, "layout", "LV", "Server hall feeds", "Server hall feed A", 518, 440, {"g": "LV", "dw": "layout"}], ["L-104", 104, "layout", "LV", "Server hall feeds", "Server hall feed B", 566, 440, {"g": "LV", "dw": "layout"}], ["L-105", 105, "campus", "LV", "Utility connection", "Utility connection panel 1", 345, 318, {"g": "LV", "dw": "campus"}], ["L-106", 106, "campus", "LV", "Utility connection", "Utility connection panel 2", 383, 333, {"g": "LV", "dw": "campus"}], ["L-107", 107, "campus", "LV", "Backup diesel generators (N+1)", "Generator 1 output breaker", 160, 402, {"g": "LV", "dw": "campus"}], ["L-108", 108, "campus", "LV", "Backup diesel generators (N+1)", "Generator 2 output breaker", 212, 428, {"g": "LV", "dw": "campus"}], ["L-109", 109, "campus", "LV", "Backup diesel generators (N+1)", "Generator 3 output breaker", 282, 458, {"g": "LV", "dw": "campus"}], ["L-110", 110, "campus", "LV", "Backup diesel generators (N+1)", "Generator 4 output breaker", 350, 490, {"g": "LV", "dw": "campus"}], ["L-111", 111, "campus", "LV", "Backup diesel generators (N+1)", "Generator 5 output breaker", 470, 520, {"g": "LV", "dw": "campus"}], ["L-112", 112, "campus", "LV", "Generator ATS", "ATS", 430, 442, {"g": "LV", "dw": "campus"}], ["L-113", 113, "campus", "LV", "Electrical room switchgear", "LV switchboard 1", 455, 318, {"g": "LV", "dw": "campus"}], ["L-114", 114, "campus", "LV", "Electrical room switchgear", "LV switchboard 2", 535, 268, {"g": "LV", "dw": "campus"}], ["L-115", 115, "campus", "LV", "Electrical room switchgear", "LV switchboard 3", 600, 232, {"g": "LV", "dw": "campus"}], ["L-116", 116, "campus", "LV", "Electrical room switchgear", "LV switchboard 4", 660, 210, {"g": "LV", "dw": "campus"}], ["L-117", 117, "campus", "LV", "Megawatt UPS systems", "UPS 1 input isolator", 590, 330, {"g": "LV", "dw": "campus"}], ["L-118", 118, "campus", "LV", "Megawatt UPS systems", "UPS 2 input isolator", 712, 262, {"g": "LV", "dw": "campus"}], ["L-119", 119, "campus", "LV", "Megawatt UPS systems", "UPS battery DC isolator", 520, 360, {"g": "LV", "dw": "campus"}], ["L-120", 120, "campus", "LV", "Server hall PDUs", "PDU 1", 690, 400, {"g": "LV", "dw": "campus"}], ["L-121", 121, "campus", "LV", "Server hall PDUs", "PDU 2", 760, 340, {"g": "LV", "dw": "campus"}], ["L-122", 122, "campus", "LV", "Cooling plant", "Chiller isolator", 800, 150, {"g": "LV", "dw": "campus"}], ["L-123", 123, "campus", "LV", "Cooling plant", "Cooling tower isolator", 1050, 150, {"g": "LV", "dw": "campus"}], ["L-124", 124, "campus", "LV", "Cooling plant", "Chilled water pump panel", 790, 212, {"g": "LV", "dw": "campus"}], ["L-125", 125, "room", "LV", "Incoming utility power and main switchgear", "Main switchgear outgoing CB", 700, 625, {"g": "LV", "dw": "room"}], ["L-126", 126, "room", "LV", "ATS and generator connection", "ATS", 438, 605, {"g": "LV", "dw": "room"}], ["L-127", 127, "room", "LV", "ATS and generator connection", "Generator connection panel", 560, 650, {"g": "LV", "dw": "room"}], ["L-128", 128, "room", "LV", "UPS system cabinets", "Wall isolator", 732, 450, {"g": "LV", "dw": "room"}], ["L-129", 129, "room", "LV", "UPS system cabinets", "UPS input isolator", 820, 455, {"g": "LV", "dw": "room"}], ["L-130", 130, "room", "LV", "UPS system cabinets", "UPS output isolator", 1010, 435, {"g": "LV", "dw": "room"}], ["L-131", 131, "room", "LV", "Static transfer switch", "STS", 1100, 400, {"g": "LV", "dw": "room"}], ["L-132", 132, "room", "LV", "Battery bank", "Battery DC isolator", 840, 840, {"g": "LV", "dw": "room"}], ["L-133", 133, "room", "LV", "Remote power panels", "RPP 1", 1325, 420, {"g": "LV", "dw": "room"}], ["L-134", 134, "room", "LV", "Remote power panels", "RPP 2", 1422, 445, {"g": "LV", "dw": "room"}], ["L-135", 135, "room", "LV", "Power distribution units", "PDU 1", 1582, 520, {"g": "LV", "dw": "room"}], ["L-136", 136, "room", "LV", "Power distribution units", "PDU 2", 1692, 570, {"g": "LV", "dw": "room"}], ["L-137", 137, "room", "LV", "Dedicated cooling", "Cooling unit 1 isolator", 1265, 960, {"g": "LV", "dw": "room"}], ["L-138", 138, "room", "LV", "Dedicated cooling", "Cooling unit 2 isolator", 1480, 850, {"g": "LV", "dw": "room"}]];


/* ---------- People ----------
   AP register: the real site AP list replaces these placeholder rows. Every field shown on the
   AP pages and in the issuing AP menu comes from here. */
const AP_LIST = [
  {id:'AP01',name:'AP01 (placeholder)',role:'SAP',auth:'HV and LV',voltage:'HV to 22 kV · LV',company:'To be confirmed',phone:'',email:'',id06:'',authBy:'Site Authorising Engineer',authDate:'',expiry:'',status:'Active',notes:'Replace with the site AP list'},
  {id:'AP02',name:'AP02 (placeholder)',role:'AP',auth:'HV and LV',voltage:'HV to 22 kV · LV',company:'To be confirmed',phone:'',email:'',id06:'',authBy:'AP01',authDate:'',expiry:'',status:'Active',notes:'Replace with the site AP list'},
  {id:'AP03',name:'AP03 (placeholder)',role:'AP',auth:'LV',voltage:'LV',company:'To be confirmed',phone:'',email:'',id06:'',authBy:'AP01',authDate:'',expiry:'',status:'Active',notes:'Replace with the site AP list'},
  {id:'AP04',name:'AP04 (placeholder)',role:'AP',auth:'LV',voltage:'LV',company:'To be confirmed',phone:'',email:'',id06:'',authBy:'AP01',authDate:'',expiry:'',status:'Active',notes:'Replace with the site AP list'}
];
/* CP register: CP1 to CP50, each issued a GREEN personal lock CP01 to CP50 */
const CP_LIST = Array.from({length:50}, (_, i) => {
  const n = i + 1, id = `CP${String(n).padStart(2,'0')}`;
  return {id, name:`CP${n}`, company:'To be confirmed', phone:'', email:'', id06:'', scope:'To be confirmed', trained:'', authBy:'', expiry:'', status:'Active'};
});

/* ---------- Safety documents (initial example records) ----------
   Lockout box status, key status and personal lock positions are all worked out from these
   documents, so issuing and cancelling always keep every register in step. */
const DOCS = {
  hvptw: [
    {id:'HVPTW-2026-0002',status:'Pending issue',sys:'HV',work:'XFM02 maintenance, Colo 3 Cell 1',loc:'Colo 3 · Cell 1',ap:'AP02',cp:'',plocks:[],keys:['H-061','H-062'],box:'',loa:'',issued:'',expiry:''},
    {id:'HVPTW-2026-0001',status:'Live',sys:'HV',work:'XFM01 maintenance, Colo 2 Cell 3',loc:'Colo 2 · Cell 3',ap:'AP01',cp:'CP07',plocks:['CP07','CP08'],keys:['H-159','H-160'],box:'LB01',loa:'',issued:'2026-10-27 07:30',expiry:'2026-10-28 18:00'},
    {id:'HVPTW-2026-0000',status:'Cancelled',sys:'HV',work:'Cable termination inspection, Colo 3 ring side A',loc:'UMS01',ap:'AP02',cp:'CP04',plocks:['CP04'],keys:['H-009','H-010'],box:'LB04',loa:'',issued:'2026-10-24 07:30',expiry:'2026-10-24 17:00',cancelledBy:'AP02',cancelledAt:'2026-10-24 16:45'}
  ],
  lvptw: [
    {id:'LVPTW-2026-0002',status:'Live',sys:'LV',work:'UPS module replacement',loc:'Data centre electrical room',ap:'AP04',cp:'CP20',plocks:['CP20'],keys:['L-129','L-130','L-132'],box:'LB05',loa:'',issued:'2026-10-27 13:05',expiry:'2026-10-28 18:00'},
    {id:'LVPTW-2026-0001',status:'Live',sys:'LV',work:'Replace protection relay, LV Main Distribution B incomers',loc:'LV switchroom B',ap:'AP03',cp:'CP12',plocks:['CP12','CP13'],keys:['L-013','L-014','L-017'],box:'LB02',loa:'LOA-2026-0045',issued:'2026-10-27 07:10',expiry:'2026-10-28 18:00'}
  ],
  sft: [
    {id:'SFT-2026-0001',status:'Live',sys:'LV',work:'Insulation resistance test, cable RPP B2 to Row PDU B2',test:'Insulation resistance, 1000 V DC',loc:'Data hall 2',ap:'AP03',cp:'CP21',plocks:['CP21'],keys:['L-041','L-053'],box:'LB03',issued:'2026-10-27 09:20',expiry:'2026-10-28 16:00'}
  ],
  loa: [
    {id:'LOA-2026-0046',status:'Live',area:'Battery room B',reason:'Visual inspection, no contact',ap:'AP04',holder:'CP31',bounds:'Inspection walkway only; panel and rack doors stay shut',issued:'2026-10-27 10:00',expiry:'2026-10-27 14:00',ptw:''},
    {id:'LOA-2026-0045',status:'Live',area:'LV switchroom B, bays 1 to 4',reason:'Live equipment next to the work area',ap:'AP03',holder:'CP30',bounds:'Barrier and signage at the boundary; no entry beyond',issued:'2026-10-27 07:15',expiry:'2026-10-28 18:00',ptw:'LVPTW-2026-0001'}
  ]
};
const LOGS = {
  'HVPTW-2026-0001':[['07:05','Switching programme checked against the HV ring main drawing by AP01'],['07:12','Keys H-159, H-160 drawn; tags hung on hooks C1-159, C1-160'],['07:24','UPM C2-3 VCB opened and racked out, earth switch closed, locks applied'],['07:30','Keys placed in LB01, box locked with red box lock LB01, key held by AP01, HV PTW issued to CP7'],['07:32','Green personal locks CP07, CP08 applied to LB01']],
  'HVPTW-2026-0002':[['10:30','Keys H-061, H-062 drawn by AP02; status With AP'],['10:32','HV switching in progress']],
  'HVPTW-2026-0000':[['24 Oct 07:30','HV PTW issued, keys in LB04'],['24 Oct 16:45','Cancelled by AP02. Personal locks removed, keys returned to hooks, LB04 returned to bay']],
  'LVPTW-2026-0001':[['07:02','Switching programme checked against the LV drawing by AP03'],['07:05','Keys L-013, L-014, L-017 drawn; tags hung on hooks'],['07:10','Keys placed in LB02, box locked with red box lock LB02, key held by AP03, LV PTW issued to CP12'],['07:14','Green personal locks CP12, CP13 applied to LB02']],
  'LVPTW-2026-0002':[['12:55','Keys L-129, L-130, L-132 drawn by AP04'],['13:05','Keys placed in LB05, box locked with red box lock LB05, LV PTW issued to CP20'],['13:07','Green personal lock CP20 applied to LB05']],
  'SFT-2026-0001':[['09:10','Keys L-041, L-053 drawn by AP03'],['09:20','Keys in LB03, box locked with red box lock LB03, SFT issued to CP21'],['09:22','Green personal lock CP21 applied to LB03']],
  'LOA-2026-0045':[['07:15','Barrier placed at the boundary; LOA issued to CP30 by AP03']],
  'LOA-2026-0046':[['10:00','LOA issued to CP31 by AP04']]
};
const OUT_OF_SERVICE = {'L-047':'Hasp damaged, replacement ordered'};
const LB_OUT_OF_SERVICE = {'LB50':'Hinge damaged, withdrawn'};

/* ---------- Registers built from the records ---------- */
const DATA = {keys:[], info:[], hvptw:DOCS.hvptw, lvptw:DOCS.lvptw, sft:DOCS.sft, loa:DOCS.loa, cp:CP_LIST, ap:AP_LIST};
DATA.keys = LOCKS.map(([id,n,dw,sys,plant,label,x,y,meta]) => ({id,n,dw,sys,board:plant,point:label,x,y,meta:meta||{},
  hook:`${sys==='HV'?'C1':'C2'}-${String(n).padStart(3,'0')}`, status:'In cabinet', doc:'', box:'', sld:DRAWINGS[dw].title, cond:OUT_OF_SERVICE[id] || 'Good'}));
DATA.info = Array.from({length:50}, (_, i) => { const id = `LB${String(i+1).padStart(2,'0')}`; return {id, boxLock:id, bay:`C3-${String(i+1).padStart(2,'0')}`, status:'In cabinet', doc:'', keys:[], plocks:[], ap:'', issued:''}; });
const PLANTS = (() => { const m = new Map(); DATA.keys.forEach(k => { const key = `${k.dw}|${k.board}`; if(!m.has(key)) m.set(key,{key,dw:k.dw,sys:k.sys,name:k.board,ids:[],g:k.meta.g,colo:k.meta.colo}); m.get(key).ids.push(k.id); }); return [...m.values()]; })();
const DOC_SETS = ['hvptw','lvptw','sft','loa'];
const ISO_SETS = ['hvptw','lvptw','sft'];
const docSet = id => id.startsWith('HVPTW') ? 'hvptw' : id.startsWith('LVPTW') ? 'lvptw' : id.startsWith('SFT') ? 'sft' : 'loa';
const DOC_NAME = {hvptw:'HV PTW', lvptw:'LV PTW', sft:'SFT', loa:'LOA'};

/* Key, box and personal lock status always follow the documents.
   Live → keys in the lockout box, box locked, CP locks on the box. Pending issue → keys with the AP.
   Cancelled → keys back on their hooks, box back in its bay, CP locks free. */
function syncRegisters(){
  DATA.keys.forEach(k => { k.status = OUT_OF_SERVICE[k.id] ? 'Out of service' : 'In cabinet'; k.doc = ''; k.box = ''; });
  DATA.info.forEach(b => { b.status = LB_OUT_OF_SERVICE[b.id] ? 'Out of service' : 'In cabinet'; b.doc = ''; b.keys = []; b.plocks = []; b.ap = ''; b.issued = ''; });
  ISO_SETS.forEach(set => DATA[set].forEach(d => {
    if(d.status !== 'Live' && d.status !== 'Pending issue') return;
    (d.keys || []).forEach(id => { const k = DATA.keys.find(x => x.id === id); if(!k || k.status === 'Out of service') return; k.doc = d.id; k.box = d.box || ''; k.status = d.status === 'Live' ? 'In lockout box' : 'With AP'; });
    if(d.status === 'Live' && d.box){ const b = DATA.info.find(x => x.id === d.box); if(b){ b.status = 'In use'; b.doc = d.id; b.keys = [...(d.keys||[])]; b.plocks = [...(d.plocks||[])]; b.ap = d.ap; b.issued = d.issued; } }
  }));
}
/* Where is a green CP lock right now? One physical lock can only be on one box. */
const cpLockBoxes = id => DATA.info.filter(b => b.status === 'In use' && b.plocks.includes(id));


/* ---------- Saved activity (this device) ----------
   New documents and cancellations are stored as events and replayed over the records. */
const STORE = 'pt-events-v7';
function loadEvents(){ try { return JSON.parse(localStorage.getItem(STORE) || '[]'); } catch(_) { return []; } }
function saveEvents(ev){ try { localStorage.setItem(STORE, JSON.stringify(ev)); return true; } catch(_) { return false; } }
function addEvent(e){ const ev = loadEvents(); ev.push(e); return saveEvents(ev); }
function stamp(d = new Date()){ const p = n => String(n).padStart(2,'0'); return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`; }
const hhmm = s => String(s).slice(11);
function applyEvent(e){
  if(e.op === 'create'){
    const d = e.doc, set = docSet(d.id);
    if(DATA[set].some(x => x.id === d.id)) return;
    d.local = true; DATA[set].unshift(d);
    if(set === 'loa' && d.ptw){ const p = find(d.ptw); if(p) p.r.loa = d.id; }
    LOGS[d.id] = (LOGS[d.id] || []).concat(e.log || []);
  }
  if(e.op === 'cancel'){
    const hit = find(e.id); if(!hit || hit.r.status === 'Cancelled') return;
    const d = hit.r; d.status = 'Cancelled'; d.cancelledBy = e.by; d.cancelledAt = e.at;
    const ap = apById(e.by);
    LOGS[d.id] = (LOGS[d.id] || []).concat(e.lines ? e.lines.map(t => [hhmm(e.at), t]) : [[hhmm(e.at), `${d.id} cancelled by ${ap ? ap.name : e.by}`]]);
  }
}

/* ---------- Pages ---------- */
const ROOT = document.body.dataset.root || '';
const U = path => ROOT + path;
const PAGES = {
  keys:{file:'keys.html',title:'Key tracker',code:'H · L',blurb:'Every dedicated safety lock: blue HV locks and yellow LV locks, their numbered hooks, and where each key is now.',
    cols:[['id','Lock no.'],['sys','System'],['board','Plant'],['point','Point of isolation'],['status','Status'],['where','Key location']]},
  info:{file:'info.html',title:'Information tracker',code:'LB',blurb:'Lockout boxes LB01 to LB50, each locked with its own red box lock of the same number, and the keys and green CP locks on it.',
    cols:[['id','Box and red lock'],['status','Status'],['doc','Safety document'],['keysN','Keys inside'],['plocksN','Green CP locks'],['issued','Issued']]},
  hvptw:{file:'hvptw.html',title:'HV permit to work tracker',code:'HV PTW',blurb:'High voltage permits to work, with their blue HV locks and lockout boxes.',
    cols:[['id','HV PTW no.'],['status','Status'],['work','Work'],['loc','Location'],['cp','Competent person'],['box','Box']]},
  lvptw:{file:'lvptw.html',title:'LV permit to work tracker',code:'LV PTW',blurb:'Low voltage permits to work, with their yellow LV locks and lockout boxes.',
    cols:[['id','LV PTW no.'],['status','Status'],['work','Work'],['loc','Location'],['cp','Competent person'],['box','Box']]},
  sft:{file:'sft.html',title:'Sanction for test tracker',code:'SFT',blurb:'Sanctions for test, the test being carried out, and the isolation that secures it.',
    cols:[['id','Sanction no.'],['status','Status'],['sys','System'],['work','Work'],['cp','Competent person'],['box','Box']]},
  loa:{file:'loa.html',title:'Limitation of access tracker',code:'LOA',blurb:'Areas with restricted access, who holds the limitation, and its boundaries.',
    cols:[['id','LOA no.'],['status','Status'],['area','Area'],['holder','Holder'],['expiry','Expires']]},
  cp:{file:'cp.html',title:'CP register',code:'CP',blurb:'Competent persons CP1 to CP50, each issued a green personal lock CP01 to CP50.',
    cols:[['id','Green lock'],['name','Name'],['company','Company'],['phone','Phone'],['onbox','Lock on box'],['status','Status']]},
  ap:{file:'ap.html',title:'AP register',code:'AP',blurb:'Authorised and senior authorised persons who issue and cancel safety documents.',
    cols:[['id','AP no.'],['name','Name'],['role','Role'],['auth','Authorised for'],['company','Company'],['phone','Phone'],['status','Status']]}
};
const NAV = [['index.html','Home','HOME','home'],['registers.html','Control centre','REG','registers'],['expired.html','Expired documents','ALERT','expired'],['new.html','New safety document','NEW','new'],
  ['keys.html','Key tracker','H · L','keys'],['info.html','Information tracker','LB','info'],['hvptw.html','HV permit to work','HV PTW','hvptw'],['lvptw.html','LV permit to work','LV PTW','lvptw'],
  ['sft.html','Sanction for test','SFT','sft'],['loa.html','Limitation of access','LOA','loa'],['ap.html','AP register','AP','ap'],['cp.html','CP register','CP','cp'],
  ['lv-schematic.html','Drawings','DWG','schematic'],['procedure.html','System procedure','STEPS','procedure']];

/* ---------- Icons ---------- */
const I = {
  burger:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 5l14 14M19 5L5 19"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
  chev:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 9l7 7 7-7"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
  plan:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="M12 4v16M4 12h8M16 8h0M16 16h0"/></svg>',
  key:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="20" cy="24" r="10"/><circle cx="20" cy="24" r="3"/><path d="M28 30l22 22M42 44l5-5M47 49l5-5"/></svg>',
  box:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="10" y="24" width="44" height="30"/><path d="M20 24v-6a12 12 0 0124 0v6"/><path d="M32 34v8"/><circle cx="32" cy="34" r="3"/></svg>',
  ptw:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M16 8h24l10 10v38H16z"/><path d="M40 8v10h10M23 30h20M23 38h20M23 46h12"/></svg>',
  sft:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="12" y="12" width="40" height="40" rx="4"/><path d="M20 40a14 14 0 0124 0"/><path d="M32 40l7-9"/><circle cx="32" cy="40" r="2"/></svg>',
  loa:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M8 52h48M14 52V22M50 52V22M14 26h36M14 36h36"/><path d="M20 26l6 10M30 26l6 10M40 26l6 10"/></svg>',
  sld:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M32 6v10"/><circle cx="32" cy="22" r="6"/><circle cx="32" cy="30" r="6"/><path d="M32 36v8M10 44h44M16 44v10M32 44v10M48 44v10"/></svg>',
  shield:'<svg viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M28 6l18 6v14c0 12-8 20-18 24-10-4-18-12-18-24V12z"/><path d="M20 28l6 6 10-12"/></svg>',
  tag:'<svg viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M8 8h20l20 20-20 20L8 28z"/><circle cx="18" cy="18" r="3"/></svg>',
  lock:'<svg viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="12" y="24" width="32" height="24"/><path d="M18 24v-6a10 10 0 0120 0v6M28 32v8"/></svg>',
  people:'<svg viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="20" cy="20" r="7"/><circle cx="38" cy="22" r="5"/><path d="M8 46c0-8 6-13 12-13s12 5 12 13M32 46c0-6 3-10 8-10s8 4 8 10"/></svg>'
};
const ICON_FOR = {keys:I.key, info:I.box, ptw:I.ptw, sft:I.sft, loa:I.loa, cp:I.people.replace('viewBox="0 0 56 56"','viewBox="0 0 56 56" width="64" height="64"')};


/* ---------- Helpers ---------- */
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const SETS = ['keys','info','hvptw','lvptw','sft','loa','cp','ap'];
function find(id){ id = String(id||'').toUpperCase(); for(const s of SETS){ const r = DATA[s].find(x => x.id.toUpperCase() === id); if(r) return {set:s, r}; } return null; }
const apById = id => DATA.ap.find(a => a.id === id);
const cpById = id => DATA.cp.find(c => c.id === id);
const recUrl = id => U(`record.html?id=${encodeURIComponent(id)}`);
function lockKind(id){ id = String(id||''); return /^H-\d/.test(id) ? 'hv' : /^L-\d/.test(id) ? 'lv' : /^LB\d/.test(id) ? 'lb' : /^CP\d/.test(id) ? 'cp' : ''; }
const pill = id => `<span class="lockpill ${lockKind(id)}">${esc(id)}</span>`;
const link = id => !id ? '' : find(id) ? `<a href="${recUrl(id)}" class="${lockKind(id) ? 'lockpill ' + lockKind(id) : 'mono'}">${esc(id)}</a>` : `<span class="mono">${esc(id)}</span>`;
const linkList = ids => ids && ids.length ? `<div class="links">${ids.map(link).join('')}</div>` : '<p>None</p>';
const apName = id => { const a = apById(id); return a ? `${a.name} · ${a.role}` : (id || ''); };
const apLink = id => { const a = apById(id); return a ? `<a class="plink" href="${recUrl(a.id)}">${esc(a.name)}</a> · ${esc(a.role)}` : esc(id || '—'); };
const cpLink = id => { const c = cpById(id); return c ? `<a class="plink" href="${recUrl(c.id)}">${esc(c.name)}</a> ${pill(c.id)}` : esc(id || 'Not yet issued'); };
function chipClass(s){
  if(['In cabinet','Active'].includes(s)) return 's-good';
  if(['Expired','Out of service'].includes(s)) return 's-crit';
  if(['Suspended','With AP','Pending issue'].includes(s)) return 's-warn';
  if(['Live','In use','In lockout box','On a box'].includes(s)) return 's-hot';
  return 's-idle';
}
const chip = s => `<span class="chip ${chipClass(s)}">${esc(s)}</span>`;
const sys = s => String(s || '').split(/\s*&\s*/).filter(Boolean).map(x => `<span class="sys ${x.toLowerCase()}">${x}</span>`).join(' ');
const fields = list => `<dl class="fields">${list.map(([k,v,w]) => `<div class="field${w?' wide':''}"><dt>${k}</dt><dd>${v || '—'}</dd></div>`).join('')}</dl>`;
const mono = v => v ? `<span class="mono">${esc(v)}</span>` : '';
const opts = (list, ph) => `<option value="">${ph}</option>` + list.map(o => Array.isArray(o) ? `<option value="${esc(o[1])}"${o[2] ? ' disabled' : ''}>${esc(o[0])}</option>` : `<option value="${esc(o)}">${esc(o)}</option>`).join('');
function logPanel(id){
  const L = id && LOGS[id];
  return `<div class="panel"><h3>Activity log</h3>${L ? `<ol class="log">${L.map(([t,m]) => `<li><time>${esc(t)}</time><span>${esc(m)}</span></li>`).join('')}</ol>` : '<p>No movements recorded.</p>'}</div>`;
}
const allDocs = () => DOC_SETS.flatMap(s => DATA[s]);
const recipientId = d => d.cp || d.holder || '';

/* ---------- Header, menu, footer ---------- */
function shell(page, heroHtml, mainHtml){
  const nav = NAV.map(([href,label,code,key]) => `<a href="${U(href)}"${key===page?' aria-current="page"':''}>${label}<small>${code}</small></a>`).join('');
  document.body.innerHTML = `
  <header class="site-head"><div class="wrap">
    <a href="${U('index.html')}" aria-label="Powertec Isolation & Document Control home"><span class="brand"><img class="brand-logo" src="logo-stack.png" alt="Powertec"><span class="brand-name">ISOLATION &amp; DOCUMENT CONTROL</span></span></a>
    <button class="menu-btn" id="openMenu" aria-label="Open menu" aria-expanded="false" aria-controls="menu">${I.burger}</button>
  </div></header>
  <div class="menu" id="menu" hidden role="dialog" aria-label="Menu">
    <div class="top"><span class="brand"><img class="brand-logo" src="logo-stack.png" alt="Powertec"><span class="brand-name">ISOLATION &amp; DOCUMENT CONTROL</span></span><button class="menu-btn" id="closeMenu" aria-label="Close menu">${I.close}</button></div>
    <nav>${nav}<a href="${U('security.html')}">Cybersecurity &amp; information assurance<small>SECURITY</small></a></nav>
    <p class="note">Powertec Isolation & Document Control · AP office key, lock and safety document control</p>
  </div>
  ${heroHtml}
  <main>${page === 'home' ? '' : '<div class="wrap universal-back"><button type="button" class="back-nav" id="pageBack" aria-label="Go back to the previous page">← Back</button></div>'}${mainHtml}</main>
  <footer class="site-foot"><div class="wrap">
    <a class="foot-brand" href="${U('index.html')}"><img src="mark.png" alt=""><span><b>powertec</b><small>isolation &amp; document control</small></span></a>
    <div class="foot-links">
      <div class="foot-col"><h3>Registers</h3><a href="${U('keys.html')}">Key tracker</a><a href="${U('info.html')}">Lockout boxes</a><a href="${U('ap.html')}">AP register</a><a href="${U('cp.html')}">CP register</a></div>
      <div class="foot-col"><h3>Safety documents</h3><a href="${U('hvptw.html')}">HV permit to work</a><a href="${U('lvptw.html')}">LV permit to work</a><a href="${U('sft.html')}">Sanction for test</a><a href="${U('loa.html')}">Limitation of access</a></div>
      <div class="foot-col"><h3>Resources</h3><a href="${U('lv-schematic.html')}">Drawings</a><a href="${U('expired.html')}">Expired documents</a><a href="${U('procedure.html')}">Procedure</a><a href="${U('security.html')}">Cybersecurity &amp; information assurance</a></div>
    </div>
    <p class="foot-legal">© ${new Date().getFullYear()} Powertec Utilities Ltd. Registered in England &amp; Wales, company no. 08117942. Version 7 · Records require site verification before operational use.</p>
  </div></footer>`;
  const back = document.getElementById('pageBack');
  if(back) back.addEventListener('click', () => {
    let sameSite = false;
    try { sameSite = Boolean(document.referrer && new URL(document.referrer).origin === location.origin); } catch(_){}
    if(sameSite && history.length > 1) history.back(); else location.href = U('index.html');
  });
  const menu = document.getElementById('menu'), open = document.getElementById('openMenu');
  const close = () => { menu.hidden = true; open.setAttribute('aria-expanded','false'); document.body.style.overflow=''; open.focus(); };
  open.addEventListener('click', () => { menu.hidden = false; open.setAttribute('aria-expanded','true'); document.body.style.overflow='hidden'; document.getElementById('closeMenu').focus(); });
  document.getElementById('closeMenu').addEventListener('click', close);
  document.addEventListener('keydown', e => { if(e.key==='Escape' && !menu.hidden) close(); });
}
const pageHero = (crumbs, eyebrow, title, lead, extra='') => `
  <section class="hero"><span class="orb" aria-hidden="true"></span><div class="wrap">
    <nav class="crumbs">${crumbs}</nav>
    <div class="kicker orange">${eyebrow}</div>
    <h1>${title}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
    ${extra}
  </div></section>`;
const crumbs = (...p) => [`<a href="${U('index.html')}">Home</a>`, ...p].join('<span>/</span>');

/* ---------- Expired documents ----------
   A Live document past its recorded expiry stays Live until it is formally cancelled. */
function expiryMillis(v){ const m = String(v||'').match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})$/); return m ? new Date(+m[1],+m[2]-1,+m[3],+m[4],+m[5]).getTime() : NaN; }
const expiredDocs = (now = Date.now()) => allDocs().filter(d => d.status === 'Live' && expiryMillis(d.expiry) <= now).sort((a,b) => expiryMillis(a.expiry) - expiryMillis(b.expiry));
function expiryAlert(){
  const n = expiredDocs().length;
  return `<a class="expiry-alert${n ? ' has-expired' : ''}" href="${U('expired.html')}" id="expiryAlert" aria-live="polite">
    <span class="expiry-alert-title">Expired documents</span><span class="expiry-alert-count" id="expiryAlertCount">${n}</span>
    <span class="expiry-alert-sub" id="expiryAlertSub">${n ? 'Action required: contact the document recipient' : 'No overdue live documents'}</span><span class="expiry-alert-arrow">View register →</span></a>`;
}
function refreshExpiryAlert(){
  const el = document.getElementById('expiryAlert'); if(!el) return;
  const n = expiredDocs().length; el.classList.toggle('has-expired', n > 0);
  document.getElementById('expiryAlertCount').textContent = n;
  document.getElementById('expiryAlertSub').textContent = n ? 'Action required: contact the document recipient' : 'No overdue live documents';
}
function expiredPage(){
  const hero = pageHero(crumbs('<span>Expired documents</span>'), 'Safety document monitoring', 'Expired documents', 'Live HV PTW, LV PTW, SFT and LOA records past their recorded expiry date and time. Contact the recipient and follow the site safety rules.');
  const main = `<section class="block"><div class="wrap">
    <div class="expiry-notice"><strong>Overdue does not mean cancelled.</strong> A document stays live until an AP formally cancels it. Expiry does not release an isolation or allow any lock to be removed.</div>
    <div class="expiry-register-head"><h2>Overdue live documents <span id="expiryTableCount"></span></h2><span id="expiryLastChecked"></span></div>
    <div class="tablebox expiry-table-wrap"><table class="expiry-table"><thead><tr><th>Document</th><th>Issued</th><th>Expired</th><th>Recipient</th><th>Recipient phone</th></tr></thead><tbody id="expiredRows"></tbody></table></div>
    <p class="expiry-help">Select a document to open it. Select a phone number to call the recipient on a supported device.</p>
  </div></section>`;
  shell('expired', hero, main); drawExpired(); setInterval(drawExpired, 15000);
}
function drawExpired(){
  const tb = document.getElementById('expiredRows'); if(!tb) return;
  const rows = expiredDocs();
  document.getElementById('expiryTableCount').textContent = `(${rows.length})`;
  document.getElementById('expiryLastChecked').textContent = `Checked ${new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}`;
  tb.innerHTML = rows.length ? rows.map(d => { const c = cpById(recipientId(d)); const tel = c && c.phone;
    return `<tr><td data-label="Document"><a class="mono" href="${recUrl(d.id)}">${esc(d.id)} ↗</a></td><td data-label="Issued" class="mono">${esc(d.issued)}</td><td data-label="Expired" class="mono expiry-date">${esc(d.expiry)}</td><td data-label="Recipient">${c ? `<a class="plink" href="${recUrl(c.id)}">${esc(c.name)}</a>` : '—'}</td><td data-label="Recipient phone">${tel ? `<a href="tel:${esc(tel.replace(/[^+\d]/g,''))}">${esc(tel)}</a>` : '<span class="missing-contact">Not recorded: add it to the CP register</span>'}</td></tr>`; }).join('')
    : '<tr><td colspan="5" class="expiry-empty">No expired live documents.</td></tr>';
}

/* ---------- Home ---------- */
function home(){
  const live = s => DATA[s].filter(d => d.status === 'Live').length;
  const hero = `
  <section class="hero home"><div class="wrap">
    <div class="home-brand-intro" aria-label="Powertec Utilities, Critical Infrastructure and Training">
      <img src="logo-stack.png" alt="Powertec" class="home-brand-logo">
      <div class="home-brand-services">UTILITIES <span>|</span> CRITICAL INFRASTRUCTURE <span>|</span> TRAINING</div>
    </div>
    <div class="home-system-title">
      <div class="kicker">SYSTEM &amp; PROCESS PLATFORM</div>
      <h1 class="mega">Isolation &amp;<br>Document Control</h1>
      <p class="lead">Isolation equipment registers, key custody and controlled safety-document workflows.</p>
    </div>
    <div class="home-expiry-position">${expiryAlert()}</div>
  </div></section>`;
  const main = `
  <section class="block dashboard-block"><div class="wrap">
    <div class="dashboard-heading"><div><div class="eyebrow">Operational overview</div><h2>Site dashboard</h2><p>Document status and key custody at a glance.</p></div><a class="btn primary small" href="${U('new.html')}">+ New document</a></div>
    <div class="dashboard-metrics" aria-label="Site status">
      <a href="${U('hvptw.html')}"><b>${live('hvptw')}</b><span>Live HV PTWs</span></a>
      <a href="${U('lvptw.html')}"><b>${live('lvptw')}</b><span>Live LV PTWs</span></a>
      <a href="${U('sft.html')}"><b>${live('sft')}</b><span>Live SFTs</span></a>
      <a href="${U('loa.html')}"><b>${live('loa')}</b><span>Live LOAs</span></a>
      <a href="${U('keys.html')}"><b>${DATA.keys.filter(k => k.status === 'In lockout box').length}</b><span>Keys in boxes</span></a>
      <a href="${U('info.html')}"><b>${DATA.info.filter(b => b.status === 'In use').length} / 50</b><span>Lockout boxes in use</span></a>
    </div>
    <div class="lockkey">
      <span><i class="lockpill hv">H-001</i>HV safety locks · blue · ${DATA.keys.filter(k=>k.sys==='HV').length}</span>
      <span><i class="lockpill lv">L-001</i>LV safety locks · yellow · ${DATA.keys.filter(k=>k.sys==='LV').length}</span>
      <span><i class="lockpill lb">LB01</i>Lockout box locks · red · 50</span>
      <span><i class="lockpill cp">CP01</i>CP personal locks · green · 50</span>
    </div>
    <a class="control-centre-launch" href="${U('registers.html')}"><span class="control-centre-launch-icon" aria-hidden="true">▦</span>
      <span class="control-centre-launch-copy"><span class="eyebrow">REGISTERS</span><strong>Control centre</strong><span class="control-centre-launch-desc">All registers, people, drawings and procedures</span></span><span class="control-centre-launch-arrow" aria-hidden="true">→</span></a>
  </div></section>`;
  shell('home', hero, main);
  setInterval(refreshExpiryAlert, 15000);
  document.addEventListener('visibilitychange', () => { if(!document.hidden) refreshExpiryAlert(); });
}
function registersPage(){
  const hero = pageHero(crumbs('<span>Control centre</span>'), 'Registers', 'Control centre', 'Every register, safety document and resource in one place.');
  const t = (h,a,b) => `<a href="${U(h)}"><strong>${a}</strong><span>${b}</span><i>→</i></a>`;
  const main = `<section class="block registers-page"><div class="wrap">
    <div class="registers-intro"><div><div class="eyebrow">SYSTEM NAVIGATION</div><h2>Registers &amp; resources</h2><p>Select a register to view its entries and records.</p></div></div>
    <div class="dashboard-links registers-grid">
      ${t('keys.html','Key tracker','Blue HV and yellow LV safety locks')}${t('info.html','Lockout boxes','LB01 to LB50 and red box locks')}
      ${t('hvptw.html','HV permit to work','HV PTW register')}${t('lvptw.html','LV permit to work','LV PTW register')}
      ${t('sft.html','Sanction for test','SFT register')}${t('loa.html','Limitation of access','LOA register')}
      ${t('ap.html','AP register','Issuing and cancelling APs')}${t('cp.html','CP register','CP1 to CP50 and green locks')}
      ${t('expired.html','Expired documents','Live documents past expiry')}${t('lv-schematic.html','Drawings','HV network and LV drawings')}
      ${t('new.html','New safety document','HV PTW, LV PTW, SFT or LOA')}${t('procedure.html','System procedure','Step by step')}
    </div>
    <a class="registers-return" href="${U('index.html')}">← Back to dashboard</a></div></section>`;
  shell('registers', hero, main);
}
function ptwChooser(){
  const hero = pageHero(crumbs('<span>Permits to work</span>'), 'Permits to work', 'Permits to work', 'Permits are split into HV PTW and LV PTW. Choose a register.');
  const main = `<section class="block"><div class="wrap"><div class="cards">
    <a class="card" href="${U('hvptw.html')}"><div class="ico">${I.ptw}</div><div><h3>HV permit to work</h3><p>${PAGES.hvptw.blurb}</p><div class="n">${DATA.hvptw.length} records</div><span class="more">Open HV PTW ${I.arrow}</span></div></a>
    <a class="card" href="${U('lvptw.html')}"><div class="ico">${I.ptw}</div><div><h3>LV permit to work</h3><p>${PAGES.lvptw.blurb}</p><div class="n">${DATA.lvptw.length} records</div><span class="more">Open LV PTW ${I.arrow}</span></div></a>
  </div></div></section>`;
  shell('ptw', hero, main);
}


/* ---------- Trackers ---------- */
function cell(r, key, set){
  switch(key){
    case 'id': return link(r.id);
    case 'status': return chip(r.status);
    case 'sys': return sys(r.sys);
    case 'where': return r.status==='In cabinet' ? `Hook <span class="mono">${esc(r.hook)}</span>` : r.box ? `${link(r.box)} · <span class="mono">${esc(r.doc)}</span>` : r.status==='With AP' ? `With AP · <span class="mono">${esc(r.doc)}</span>` : 'Withdrawn';
    case 'keysN': return r.keys.length ? r.keys.map(pill).join(' ') : '—';
    case 'plocksN': return r.plocks.length ? r.plocks.map(pill).join(' ') : '—';
    case 'cp': return r.cp ? cpLink(r.cp) : 'Not yet issued';
    case 'holder': return cpLink(r.holder);
    case 'box': return r.box ? pill(r.box) : '—';
    case 'onbox': { const b = cpLockBoxes(r.id); return b.length ? b.map(x => pill(x.id)).join(' ') : 'Free'; }
    case 'phone': return r.phone ? mono(r.phone) : '<span class="missing-contact">Not recorded</span>';
    case 'doc': case 'issued': case 'expiry': return r[key] ? mono(r[key]) : '—';
    default: return esc(r[key]) || '—';
  }
}
/* Key tracker menu: UMS → switch, or UPM → colo → cell → switch, or LV → drawing → plant */
function keyCascade(){
  return `<div class="cascade" id="cascade">
    <label class="f"><span>Equipment</span><select id="c1">${opts([['HV · main substations (UMS)','UMS'],['HV · UPMs by colo and cell','UPM'],['LV · drawings and plant','LV']],'All safety locks')}</select></label>
    <label class="f" hidden><span id="c2l">Level 2</span><select id="c2"></select></label>
    <label class="f" hidden><span id="c3l">Level 3</span><select id="c3"></select></label>
    <label class="f" hidden><span id="c4l">Level 4</span><select id="c4"></select></label>
  </div>`;
}
function wireCascade(onChange){
  const $ = id => document.getElementById(id), sel = ['c1','c2','c3','c4'].map($);
  const uniq = a => [...new Set(a)];
  const show = (i, label, list, ph) => { const s = sel[i]; s.parentElement.hidden = !list; if(list){ $(`c${i+1}l`).textContent = label; s.innerHTML = opts(list, ph); } };
  const hv = DATA.keys.filter(k => k.sys === 'HV');
  function refresh(level){
    const [a,b,c] = sel.map(s => s.value);
    if(level <= 1){
      if(a === 'UMS') show(1,'Substation', uniq(hv.filter(k => k.meta.g==='UMS').map(k => k.meta.ums)), 'All UMS substations');
      else if(a === 'UPM') show(1,'Colo', uniq(hv.filter(k => k.meta.g==='UPM').map(k => k.meta.colo)).map(n => [`Colo ${n}`, String(n)]), 'All colos');
      else if(a === 'LV') show(1,'Drawing', Object.keys(DRAWINGS).filter(d => DRAWINGS[d].sys==='LV').map(d => [DRAWINGS[d].title, d]), 'All LV drawings');
      else show(1,'',null); show(2,'',null); show(3,'',null);
    }
    if(level === 2){
      if(a === 'UMS') show(2,'Switch', b ? uniq(hv.filter(k => k.meta.ums===b).map(k => `${k.meta.sw}|${k.meta.swname}`)).map(v => [v.replace('|',' · '), v.split('|')[0]]) : null, 'All switches');
      else if(a === 'UPM') show(2,'Cell', b ? uniq(hv.filter(k => k.meta.g==='UPM' && String(k.meta.colo)===b).map(k => k.meta.cell)) : null, 'All cells');
      else if(a === 'LV') show(2,'Plant', b ? uniq(DATA.keys.filter(k => k.dw===b).map(k => k.board)) : null, 'All plant');
      show(3,'',null);
    }
    if(level === 3){
      if(a === 'UPM') show(3,'Switch', c ? [['MCS1 · vacuum ring switch','MCS1'],['MCS2 · vacuum ring switch','MCS2'],['VCB · supply to XFM01','VCB']] : null, 'All switches'); else show(3,'',null);
    }
    onChange();
  }
  sel.forEach((s,i) => s.addEventListener('change', () => refresh(i+1)));
  return k => {
    const [a,b,c,d] = sel.map(s => s.value);
    if(!a) return true;
    if(a === 'UMS') return k.meta.g==='UMS' && (!b || k.meta.ums===b) && (!c || k.meta.sw===c);
    if(a === 'UPM') return k.meta.g==='UPM' && (!b || String(k.meta.colo)===b) && (!c || k.meta.cell===c) && (!d || k.meta.sw===d);
    return k.sys==='LV' && (!b || k.dw===b) && (!c || k.board===c);
  };
}
function tracker(key){
  const p = PAGES[key], rows = DATA[key];
  const statuses = ['All', ...new Set(rows.map(r => r.status))];
  const newType = {hvptw:'HVPTW', lvptw:'LVPTW', sft:'SFT', loa:'LOA'}[key];
  const hero = pageHero(crumbs(`<span>${p.title}</span>`), `Tracker · ${p.code}`, p.title, p.blurb, newType ? `<div class="cta" style="margin-top:22px"><a class="btn primary" href="${U('new.html')}?type=${newType}">+ New ${DOC_NAME[key]}</a></div>` : '');
  const main = `<section class="block"><div class="wrap">
    ${key === 'keys' ? keyCascade() : ''}
    <div class="toolbar">
      <label class="search">${I.search}<input id="q" type="search" placeholder="Search number, plant, name…" aria-label="Search ${p.title}"></label>
      <div class="filters" role="group" aria-label="Filter by status">${statuses.map((s,i)=>`<button type="button" data-f="${esc(s)}" aria-pressed="${i===0}">${esc(s)}</button>`).join('')}</div>
    </div>
    <div class="count" id="count"></div>
    <div class="tablebox"><table>
      <thead><tr>${p.cols.map(c=>`<th scope="col">${c[1]}</th>`).join('')}<th scope="col"><span style="position:absolute;left:-9999px">Open record</span></th></tr></thead>
      <tbody id="rows"></tbody>
    </table></div>
  </div></section>`;
  shell(key, hero, main);
  let q = '', f = 'All', cascadeFilter = () => true;
  const tbody = document.getElementById('rows'), count = document.getElementById('count');
  function draw(){
    const ql = q.toLowerCase();
    const shown = rows.filter(r => (f==='All' || r.status===f) && cascadeFilter(r) && (!ql || JSON.stringify(r).toLowerCase().includes(ql)));
    count.textContent = `${shown.length} of ${rows.length} records`;
    const page = shown.slice(0, 400);
    tbody.innerHTML = page.length ? page.map(r => `<tr data-id="${esc(r.id)}" tabindex="0">${p.cols.map(c=>`<td data-label="${c[1]}">${cell(r,c[0],key)}</td>`).join('')}<td class="go"><span>Open →</span></td></tr>`).join('')
      : `<tr><td class="empty" colspan="${p.cols.length+1}">No records match. Clear the search or choose another option.</td></tr>`;
  }
  if(key === 'keys') cascadeFilter = wireCascade(draw);
  tbody.addEventListener('click', e => { const tr = e.target.closest('tr[data-id]'); if(tr && !e.target.closest('a')) location.href = recUrl(tr.dataset.id); });
  tbody.addEventListener('keydown', e => { const tr = e.target.closest('tr[data-id]'); if(tr && (e.key==='Enter' || e.key===' ')){ e.preventDefault(); location.href = recUrl(tr.dataset.id); } });
  document.getElementById('q').addEventListener('input', e => { q = e.target.value; draw(); });
  document.querySelectorAll('.filters button').forEach(b => b.addEventListener('click', () => {
    f = b.dataset.f; document.querySelectorAll('.filters button').forEach(x => x.setAttribute('aria-pressed', String(x===b))); draw();
  }));
  draw();
}

/* ---------- Contact cards ---------- */
function personCard(c, kind, withButton = true){
  const tel = String(c.phone||'').replace(/[^+\d]/g,'');
  const line = (label, val, href) => val ? `<a href="${href}"><span>${label}</span><b class="mono">${esc(val)}</b></a>` : `<a aria-disabled="true"><span>${label}</span><b class="missing-contact">Not recorded</b></a>`;
  return `<div class="cpc-head"><div><div class="cpc-role">${kind === 'cp' ? 'CP' : esc(c.role)} · ${kind === 'cp' ? pill(c.id) : `<span class="mono">${esc(c.id)}</span>`}</div><b>${esc(c.name)}</b><span>${esc(c.company)}</span></div>${chip(c.status)}</div>
    <div class="cpc-lines">${line('Phone', c.phone, `tel:${tel}`)}${line('Email', c.email, `mailto:${esc(c.email)}`)}</div>
    ${withButton ? `<a class="btn primary small" href="${recUrl(c.id)}">Open ${kind === 'cp' ? 'CP' : 'AP'} details ${I.arrow}</a>` : ''}`;
}
const cpPanel = (id, label) => { const c = cpById(id); return c ? `<div class="panel cppanel"><h3>${label}</h3>${personCard(c,'cp')}</div>` : ''; };

/* ---------- Cancellation ----------
   An AP from the AP register confirms each check. Recording the cancellation returns the keys to
   their hooks, frees the lockout box and its red box lock, and frees every green CP lock. */
function cancelPanel(r, set){
  if(r.status !== 'Live' && r.status !== 'Pending issue') return '';
  const aps = DATA.ap.filter(a => a.status === 'Active' && (set !== 'hvptw' || /HV/.test(a.auth)));
  const checks = set === 'loa'
    ? ['The LOA holder has signed for cancellation','Barriers and signage removed and the area made normal']
    : r.status === 'Pending issue'
      ? ['The document was never issued to a CP','Every isolation key drawn for it is back on its numbered hook']
      : [`Every green CP lock removed from ${r.box} by its holder (${(r.plocks||[]).join(', ') || 'none'})`, `Red box lock ${r.box} unlocked and all isolation keys counted (${(r.keys||[]).length})`, `Every isolation key back on its numbered hook and ${r.box} back in its bay`];
  return `<div class="panel"><h3>Cancel this document</h3><p>Cancellation is recorded by an AP once the safety rules for cancellation are satisfied.</p>
    <button type="button" class="btn ghost small" id="cancelStart" style="margin-top:14px">Cancel document</button>
    <div id="cancelConfirm" hidden style="margin-top:14px">
      <label class="f"><span>AP cancelling the document *</span><select id="cancellingAp">${opts(aps.map(a => [`${a.name} · ${a.role} · ${a.id}`, a.id]), 'Select the AP')}</select></label>
      <ul class="checks cancel-checks">${checks.map((t,i) => `<li><label><input type="checkbox" class="cchk" id="cchk${i}"><span>${esc(t)}</span></label></li>`).join('')}</ul>
      <p class="errors" id="cancelError" hidden></p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:10px"><button type="button" class="btn primary small" id="cancelYes">Record cancellation</button><button type="button" class="btn ghost small" id="cancelNo">Go back</button></div>
    </div></div>`;
}
function wireCancel(r){
  const start = document.getElementById('cancelStart'); if(!start) return;
  const conf = document.getElementById('cancelConfirm'), err = document.getElementById('cancelError');
  start.addEventListener('click', () => { conf.hidden = false; start.hidden = true; });
  document.getElementById('cancelNo').addEventListener('click', () => { conf.hidden = true; start.hidden = false; err.hidden = true; });
  document.getElementById('cancelYes').addEventListener('click', () => {
    const apId = document.getElementById('cancellingAp').value, ap = apById(apId);
    const boxes = [...document.querySelectorAll('.cchk')], ok = boxes.every(b => b.checked);
    if(!ap || !ok){ err.textContent = !ap ? 'Select the AP cancelling the document.' : 'Tick every check before recording the cancellation.'; err.hidden = false; return; }
    const at = stamp();
    const lines = r.box && r.status === 'Live'
      ? [`Green CP locks ${(r.plocks||[]).join(', ') || 'none'} removed from ${r.box}`, `Red box lock ${r.box} unlocked by ${ap.name}; keys ${(r.keys||[]).join(', ')} counted and returned to their hooks`, `${r.id} cancelled by ${ap.name} (${ap.role}). ${r.box} returned to its bay`]
      : [`${r.id} cancelled by ${ap.name} (${ap.role})`];
    if(addEvent({op:'cancel', id:r.id, at, by:ap.id, lines})) location.href = recUrl(r.id) + '&cancelled=1';
    else { err.textContent = 'This browser is blocking storage, so the cancellation could not be saved. Open the site in a normal window.'; err.hidden = false; }
  });
}

/* ---------- Record pages ---------- */
function record(){
  const qs = new URLSearchParams(location.search), id = qs.get('id'), hit = find(id);
  if(!hit){ shell('', pageHero(crumbs(), 'Record', 'Record not found', `No record matches “${esc(id || '')}”. Open a tracker and select a line.`), ''); return; }
  const {set, r} = hit, p = PAGES[set];
  let body = '', side = '', title = '';
  if(set === 'keys'){
    const m = r.meta || {};
    const where = m.g === 'UMS' ? `${m.ums} › ${m.sw} ${m.swname} › ${m.kind}` : m.g === 'UPM' ? `Colo ${m.colo} › ${m.cell} › UPM ${m.upm} › ${m.sw} › ${m.kind}` : `${r.sld} › ${r.board}`;
    title = `${r.board} · ${r.point}`;
    body = fields([['Lock no.',pill(r.id)],['System',sys(r.sys)],['Lock colour',r.sys==='HV'?'Blue':'Yellow'],['Cabinet hook',mono(r.hook)],['Equipment',esc(where),1],['Point of isolation',esc(r.point),1],['Drawing',`<a class="plink" href="${U('lv-schematic.html')}?lock=${esc(r.id)}">${esc(r.sld)} · view on drawing →</a>`,1],['Condition',esc(r.cond)]]);
    const tag = r.doc ? `<div class="hooktag"><b>KEY-OUT TAG · HOOK ${esc(r.hook)}</b><div><span>Lock / key</span>${pill(r.id)}</div><div><span>Status</span><span>${esc(r.status.toUpperCase())}</span></div><div><span>Lockout box</span>${r.box ? pill(r.box) : '—'}</div><div><span>Document</span><span class="mono">${esc(r.doc)}</span></div></div>`
      : r.status === 'Out of service' ? '<p>Lock withdrawn from service; see condition.</p>' : `<p>Key is on hook <span class="mono">${esc(r.hook)}</span>.</p>`;
    side = `<div class="panel"><h3>Hook ${esc(r.hook)}</h3>${tag}</div><div class="panel"><h3>Linked records</h3>${linkList([r.doc, r.box].filter(Boolean))}</div>${r.doc ? logPanel(r.doc) : ''}`;
  }
  if(set === 'info'){
    title = r.doc ? `Serving ${r.doc}` : 'Lockout box';
    body = fields([['Lockout box',pill(r.id)],['Red box lock and key',`${pill(r.id)} · ${r.status==='In use' ? 'fitted to the box' : r.status==='Out of service' ? 'withdrawn with the box' : 'stored with the box in its bay'}`],['Cabinet 3 bay',mono(r.bay)],['Safety document',link(r.doc)],['Issued',mono(r.issued)],['Box lock key held by',r.status==='In use' ? apLink(r.ap) : `Cabinet 3, bay ${esc(r.bay)}`],['Isolation keys inside',r.keys.length ? linkList(r.keys) : '',1],['Green CP locks on the box',r.plocks.length ? linkList(r.plocks) : '',1]]);
    side = `<div class="panel"><h3>Red box lock ${esc(r.id)}</h3><div class="boxtag"><b class="lockpill lb">${esc(r.id)}</b><span>Box, red box lock and its key all carry the same number.</span></div></div>
      <div class="panel"><h3>Box can be opened when</h3><p>${r.plocks.length ? `All ${r.plocks.length} green CP locks have been removed by their holders, then the AP unlocks red box lock ${esc(r.id)}.` : r.status === 'Out of service' ? esc(LB_OUT_OF_SERVICE[r.id]) : 'Box is empty and free to use.'}</p></div>${r.doc ? logPanel(r.doc) : ''}`;
  }
  if(ISO_SETS.includes(set)){
    title = r.work;
    body = fields([[`${DOC_NAME[set]} no.`,mono(r.id)],['System',sys(r.sys)],['Work',esc(r.work),1],...(set==='sft'?[['Test',esc(r.test),1]]:[]),['Location',esc(r.loc),1],['Issued by',apLink(r.ap)],['Competent person',r.cp ? cpLink(r.cp) : 'Not yet issued'],['Issued',mono(r.issued)],['Expires',mono(r.expiry)],
      ['Points of isolation',linkList(r.keys),1],['Lockout box and red lock',r.box ? link(r.box) : ''],['Limitation of access',link(r.loa)],['Green CP locks',r.plocks && r.plocks.length ? linkList(r.plocks) : '',1],
      ...(r.cancelledBy ? [['Cancelled by',apLink(r.cancelledBy)],['Cancelled at',mono(r.cancelledAt)]] : []),...(r.notes ? [['Notes',esc(r.notes),1]] : [])]);
    side = cpPanel(r.cp,'Competent person') + cancelPanel(r, set) + logPanel(r.id);
  }
  if(set === 'loa'){
    title = r.area;
    body = fields([['LOA no.',mono(r.id)],['Linked permit',link(r.ptw)],['Area',esc(r.area),1],['Reason',esc(r.reason),1],['Boundaries',esc(r.bounds),1],['Issued by',apLink(r.ap)],['Holder',cpLink(r.holder)],['Issued',mono(r.issued)],['Expires',mono(r.expiry)],
      ...(r.cancelledBy ? [['Cancelled by',apLink(r.cancelledBy)],['Cancelled at',mono(r.cancelledAt)]] : []),...(r.notes ? [['Notes',esc(r.notes),1]] : [])]);
    side = cpPanel(r.holder,'LOA holder') + cancelPanel(r, set) + logPanel(r.id);
  }
  if(set === 'cp'){
    title = r.name;
    const docs = allDocs().filter(d => recipientId(d) === r.id || (d.plocks||[]).includes(r.id));
    const live = docs.filter(d => d.status === 'Live'), boxes = cpLockBoxes(r.id);
    body = fields([['Name',esc(r.name)],['Green personal lock',pill(r.id)],['Company',esc(r.company)],['Phone',r.phone ? mono(r.phone) : '<span class="missing-contact">Not recorded</span>'],['Email',r.email ? mono(r.email) : '<span class="missing-contact">Not recorded</span>'],['ID06 card',mono(r.id06)],['Authorised for',esc(r.scope),1],['CP training completed',mono(r.trained)],['Authorised by',esc(r.authBy)],['Authorised until',mono(r.expiry)],['Status',chip(r.status)]]);
    side = `<div class="panel cppanel"><h3>Contact</h3>${personCard(r,'cp',false)}</div>
      <div class="panel"><h3>Green lock ${esc(r.id)} now</h3>${boxes.length > 1 ? `<p class="errors"><b>Record conflict:</b> one lock recorded on ${boxes.map(b => link(b.id)).join(', ')}. Check physically.</p>` : boxes.length ? `<p>On lockout box ${link(boxes[0].id)} for ${link(boxes[0].doc)}.</p>` : '<p>Free: with the CP, not on any box.</p>'}</div>
      <div class="panel"><h3>Live documents</h3>${live.length ? linkList(live.map(d => d.id)) : '<p>None</p>'}</div>
      <div class="panel"><h3>Document history</h3>${docs.length ? linkList(docs.map(d => d.id)) : '<p>None recorded</p>'}</div>`;
  }
  if(set === 'ap'){
    title = r.name;
    const docs = allDocs().filter(d => d.ap === r.id || d.cancelledBy === r.id);
    body = fields([['AP no.',mono(r.id)],['Name',esc(r.name)],['Role',esc(r.role)],['Authorised for',esc(r.auth)],['Voltage levels',esc(r.voltage),1],['Company',esc(r.company)],['Phone',r.phone ? mono(r.phone) : '<span class="missing-contact">Not recorded</span>'],['Email',r.email ? mono(r.email) : '<span class="missing-contact">Not recorded</span>'],['ID06 card',mono(r.id06)],['Authorised by',esc(r.authBy)],['Authorisation date',mono(r.authDate)],['Authorised until',mono(r.expiry)],['Status',chip(r.status)],['Notes',esc(r.notes),1]]);
    side = `<div class="panel cppanel"><h3>Contact</h3>${personCard(r,'ap',false)}</div><div class="panel"><h3>Documents issued or cancelled</h3>${docs.length ? linkList(docs.map(d => d.id)) : '<p>None recorded</p>'}</div>`;
  }
  document.title = `${r.id} · Powertec Isolation & Document Control`;
  const hero = `<section class="hero"><span class="orb" aria-hidden="true"></span><div class="wrap">
    <nav class="crumbs"><a href="${U('index.html')}">Home</a><span>/</span><a href="${U(p.file)}">${p.title}</a><span>/</span><span>${esc(r.id)}</span></nav>
    <div class="rec-head"><div><div class="rec-id">${esc(r.id)}${r.local ? ' · issued on this device' : ''}</div><h1 style="font-size:clamp(28px,4.4vw,46px)">${esc(title)}</h1></div>${r.status ? chip(r.status) : ''}</div>
    ${qs.get('created') ? `<p class="saved">${esc(r.id)} issued and saved on this device. Its keys, red box lock and green CP locks are now shown against it.</p>` : ''}
    ${qs.get('cancelled') ? `<p class="saved">${esc(r.id)} cancelled. Its keys are back on their hooks, ${esc(r.box || 'no box')} is free and every green CP lock is released.</p>` : ''}
  </div></section>`;
  const main = `<section class="block"><div class="wrap"><div class="rec-grid"><div>${body}</div><aside class="side">${side}</aside></div>
    <a class="back" href="${U(p.file)}">← Back to ${p.title}</a></div></section>`;
  shell(set, hero, main);
  wireCancel(r);
}


/* ---------- Drawings with live lock circles ---------- */
function drawingHTML(dw, o = {}){
  const D = DRAWINGS[dw];
  const circles = DATA.keys.filter(k => k.dw === dw).map(k => {
    const used = !!k.doc, oos = k.status === 'Out of service';
    const cls = ['lk', k.sys === 'HV' ? 'hv' : 'lv', used ? 'used' : '', oos ? 'oos' : '', o.picked && o.picked.has(k.id) ? 'picked' : '', o.focus && `${k.dw}|${k.board}` === o.focus ? 'focus' : '', o.sys && !o.sys.includes(k.sys) ? 'off' : '', o.highlight === k.id ? 'hl' : ''].join(' ');
    const t = `${k.id} · ${k.board} · ${k.point}${used ? ` · in use on ${k.doc}` : oos ? ' · out of service' : ''}`;
    return `<button type="button" class="${cls}" data-lock="${k.id}" style="left:${(k.x / D.w * 100).toFixed(3)}%;top:${(k.y / D.h * 100).toFixed(3)}%" title="${esc(t)}" aria-label="${esc(t)}">${k.n}</button>`;
  }).join('');
  return `<div class="dwgscroll"><div class="dwgbox" data-dw="${dw}" style="--dw:${D.view}px;--r:${D.r};aspect-ratio:${D.w}/${D.h}"><img src="${D.img}" alt="${esc(D.title)}" draggable="false">${circles}</div></div>`;
}
function scrollToLocks(sc, box, ids){
  const pts = DATA.keys.filter(k => ids.includes(k.id)); if(!pts.length) return;
  const D = DRAWINGS[pts[0].dw];
  const cx = pts.reduce((a,k) => a + k.x, 0) / pts.length / D.w * box.offsetWidth;
  const cy = pts.reduce((a,k) => a + k.y, 0) / pts.length / D.h * box.offsetHeight;
  sc.scrollLeft = Math.max(0, cx - sc.clientWidth / 2);
  const top = box.getBoundingClientRect().top - sc.getBoundingClientRect().top + sc.scrollTop;
  sc.scrollTop = Math.max(0, top + cy - sc.clientHeight / 2);
}
function schematic(){
  const hl = (new URLSearchParams(location.search).get('lock') || '').toUpperCase(), hk = DATA.keys.find(k => k.id === hl);
  const hero = pageHero(crumbs('<span>Drawings</span>'), 'Drawings · Live lock status', 'Drawings', 'Blue circles are HV safety locks on every isolation point and earth switch. Yellow circles are LV safety locks. Numbers in use on a live or pending document are greyed out and struck through: tap one to open its document, or tap a free number to see the lock.');
  const fig = dw => { const D = DRAWINGS[dw], ks = DATA.keys.filter(k => k.dw === dw), u = ks.filter(k => k.doc).length;
    return `<figure class="dwg" id="dwg-${dw}"><figcaption><div><span class="kicker orange" style="margin:0 0 6px;display:block">${D.kind}</span><h3>${D.title}</h3><p>${ks.length} ${D.sys} locks · ${u} in use</p></div><div class="dwg-count"><span class="lockpill ${D.sys.toLowerCase()}">${ks[0].id} to ${ks[ks.length-1].id}</span></div></figcaption>${drawingHTML(dw, {highlight:hl})}<p class="dwg-hint">Drag or scroll the drawing to move around it.</p></figure>`; };
  const main = `<section class="block"><div class="wrap">
    <div class="plegend static"><span><i class="lk hv mini">1</i>HV lock, free (blue)</span><span><i class="lk lv mini">1</i>LV lock, free (yellow)</span><span><i class="lk hv mini used">1</i>In use: tap to open the document</span><span><i class="lk lv mini oos">1</i>Out of service</span></div>
    <p class="hint" style="margin:10px 0 18px">${DATA.keys.filter(k => k.doc).length} of ${DATA.keys.length} locks are in use.${hk ? ` Showing <b>${hk.id}</b>, ${esc(hk.board)} · ${esc(hk.point)}.` : ''}</p>
    <div class="dwg-jump">${Object.keys(DRAWINGS).map(d => `<a href="#dwg-${d}">${DRAWINGS[d].title}</a>`).join('')}</div>
    <div class="dwgs">${Object.keys(DRAWINGS).map(fig).join('')}</div>
  </div></section>`;
  shell('schematic', hero, main);
  document.querySelectorAll('.dwgbox').forEach(box => box.addEventListener('click', e => { const b = e.target.closest('.lk'); if(!b) return; const k = DATA.keys.find(x => x.id === b.dataset.lock); location.href = recUrl(k.doc || k.id); }));
  if(hk) requestAnimationFrame(() => { const box = document.querySelector(`.dwgbox[data-dw="${hk.dw}"]`); box.closest('.dwg').scrollIntoView({block:'start'}); scrollToLocks(box.parentElement, box, [hk.id]); });
}
function references(){ location.replace(U('lv-schematic.html')); }

/* ---------- System procedure ---------- */
const STAGES = [
  {k:'plan',name:'Plan the isolation',who:'AP',steps:['Choose HV PTW or LV PTW. HV work uses blue HV locks only; LV work uses yellow LV locks only.','Mark the points of isolation and earthing on the drawing. Every HV isolation point and earth switch has its own blue lock number.','Open the Key tracker, pick the UMS or the colo, cell and UPM, and check every lock shows IN CABINET.','Check the CP is on the CP register and their green lock is free.'],site:'No change yet. The switching programme is ready.',stop:'Any lock not IN CABINET, or a CP whose green lock is already on another box: stop and resolve.'},
  {k:'draw',name:'Draw the keys and a lockout box',who:'AP',steps:['Take each key from its numbered hook (C1 for HV, C2 for LV).','Hang a key-out tag on each empty hook: lock no., document no., your name, time.','Take a free lockout box (LB01 to LB50) with its red box lock of the same number.'],site:'Key tracker: each key → With AP.',stop:'Every empty hook carries a tag before you leave the AP office.'},
  {k:'isolate',name:'Isolate, earth and lock',who:'AP',steps:['Carry out the switching programme in order.','Open and rack out or lock off each switch, then fit its blue (HV) or yellow (LV) lock.','Prove dead and close the earth switches; fit each earth switch lock.','Post caution and danger notices.'],site:'No change. Keys stay in the AP\'s hand.',stop:'A lock number that does not match the switch label or drawing: stop.'},
  {k:'secure',name:'Secure the keys',who:'AP',steps:['Place every isolation key in the lockout box and count them.','Lock the box with its own red box lock (box LB07, lock LB07, key LB07). Keep the red box lock key.'],site:'Key tracker: keys → In lockout box. Information tracker: box → In use.',stop:'Key count must match the switching programme exactly.'},
  {k:'issue',name:'Issue the document',who:'AP and CP',steps:['Raise the HV PTW, LV PTW or SFT with + New safety document, picking the locks on the drawing.','Brief the CP at the point of work and issue the document.','The CP and each member of the working party fit their own green CP lock to the box.'],site:'Tracker: document → Live. CP register: green lock shown on the box.',stop:'Nobody works without their own green lock on the box.'},
  {k:'work',name:'During the work',who:'CP and working party',steps:['The CP keeps the working party within the limits of the document.','A person joining fits their green lock; a person leaving removes their own.','Nobody removes another person\'s lock, for any reason.'],site:'Information tracker: green locks on the box.',stop:'The box cannot be opened while any green lock is on it.'},
  {k:'cancel',name:'Cancel and restore',who:'CP then AP',steps:['The CP signs for cancellation and every green CP lock is removed.','The AP unlocks the red box lock and counts the keys.','Remove earths and locks and restore the system.','Return every key to its hook and the box to its bay, then record the cancellation on the document, ticking each check.'],site:'Keys → In cabinet, box → free, green CP locks → free, document → Cancelled.',stop:'Tag, hook and tracker must agree before the AP leaves the office.'}
];
function procedure(){
  let n = 0;
  const hero = pageHero(crumbs('<span>System procedure</span>'), 'System procedure · Step by step', 'How the system works', 'Every HV PTW, LV PTW and SFT follows the same seven stages.');
  const bar = `<div class="phasebar" style="grid-template-columns:repeat(${STAGES.length},minmax(118px,1fr))">${STAGES.map((s,i) => `<a href="#stage-${s.k}"><b>${i+1}</b><span>${s.name}</span><small>${s.who}</small></a>`).join('')}</div>`;
  const cards = STAGES.map((s,i) => `<article class="phase" id="stage-${s.k}"><div class="pnum">${i+1}</div><div class="pbody"><div class="pmeta"><span>Stage ${i+1} of ${STAGES.length}</span><span>Done by: ${s.who}</span></div><h3>${s.name}</h3>
    <div class="pcols"><div><h4>Steps</h4><ol class="steps-list">${s.steps.map(t => `<li><span class="sn">${++n}</span><span>${esc(t)}</span></li>`).join('')}</ol></div><div><h4>On this site</h4><p class="site-note">${esc(s.site)}</p></div></div><p class="gate"><b>Stop check</b>${esc(s.stop)}</p></div></article>`).join('');
  const main = `<section class="block"><div class="wrap">
    <div class="lockkey" style="margin-bottom:28px"><span><i class="lockpill hv">H-001</i>HV safety lock · blue</span><span><i class="lockpill lv">L-001</i>LV safety lock · yellow</span><span><i class="lockpill lb">LB01</i>Lockout box lock · red</span><span><i class="lockpill cp">CP01</i>CP personal lock · green</span></div>
    <div class="barbox">${bar}</div><div class="phases">${cards}</div></div></section>`;
  shell('procedure', hero, main);
}

/* ---------- New safety document ---------- */
const OPTIONS = {
  hvWork:['XFM01 maintenance','XFM02 maintenance','Cable termination','Vacuum ring switch maintenance','VCB maintenance','Protection relay replacement','UMS panel maintenance','Earth switch maintenance','Cable fault location'],
  lvWork:['Replace protection relay','Busbar joint inspection and re-torque','Thermographic remedial work','Circuit breaker maintenance','Install additional outgoing way','UPS module replacement','Battery string replacement','Switchgear cleaning and inspection'],
  sftWork:['Insulation resistance test, cable','VLF withstand test, HV cable','Primary injection test','Secondary injection test, protection relay','Continuity test, cable','Contact resistance test, circuit breaker','Load bank test, UPS'],
  sftTest:['Insulation resistance, 500 V DC','Insulation resistance, 1000 V DC','Insulation resistance, 5 kV DC','VLF withstand','Primary current injection','Secondary current injection','Continuity','Contact resistance (ductor)','Load bank'],
  hvLoc:['UMS01','UMS02','UMS03','UMS11','UMS12','UMS13','UMS14',...[1,2,3,4,5].flatMap(c => [1,2,3,4].map(n => `Colo ${c} · Cell ${n}`)),'Colo 1 · Admin'],
  lvLoc:['Data centre electrical room','LV switchroom A','LV switchroom B','UPS room A','UPS room B','Battery room A','Battery room B','Data hall 1','Data hall 2','Mechanical plant room'],
  loaReason:['Live equipment next to the work area','Visual inspection, no contact','Survey, non-electrical','Fire detection works','Cleaning, no contact','Escorted visit'],
  loaBounds:['Barrier and signage at the boundary; no entry beyond','Inspection walkway only; panel and rack doors stay shut','Escorted access only, AP present'],
  duration:[['End of shift (18:00)','eos'],['4 hours',4],['8 hours',8],['12 hours',12],['24 hours',24],['48 hours',48]]
};
function nextId(prefix){
  const yr = new Date().getFullYear(), set = DATA[docSet(prefix)];
  const max = set.map(d => +String(d.id).split('-')[2] || 0).reduce((a,b) => Math.max(a,b), 0);
  return `${prefix}-${yr}-${String(max + 1).padStart(4,'0')}`;
}
function expiryFrom(v){ const d = new Date(); if(v === 'eos'){ d.setHours(18,0,0,0); if(d < new Date()) d.setDate(d.getDate()+1); } else d.setHours(d.getHours() + Number(v)); return stamp(d); }
const TYPES = [['HV permit to work (HV PTW)','HVPTW'],['LV permit to work (LV PTW)','LVPTW'],['Sanction for test (SFT)','SFT'],['Limitation of access (LOA)','LOA']];
function newDoc(){
  const qType = (new URLSearchParams(location.search).get('type') || '').toUpperCase();
  const hero = pageHero(crumbs('<span>New safety document</span>'), 'Issue · HV PTW · LV PTW · SFT · LOA', 'New safety document', 'Choose each item from its list. Only free locks, free lockout boxes and CPs whose green lock is free can be chosen.');
  const main = `<section class="block"><div class="wrap">
    <form class="docform" id="docform" novalidate>
      <div class="fgroup"><h3>1 · Document</h3><div class="fgrid">
        <label class="f"><span>Document type *</span><select id="f-type">${opts(TYPES,'Choose a document type')}</select></label>
        <label class="f" data-for="HVPTW LVPTW SFT"><span>Work *</span><select id="f-work"></select></label>
        <label class="f" data-for="SFT"><span>Test *</span><select id="f-test">${opts(OPTIONS.sftTest,'Choose the test')}</select></label>
        <label class="f" data-for="HVPTW LVPTW SFT"><span>Location *</span><select id="f-loc"></select></label>
        <label class="f" data-for="LOA"><span>Area *</span><select id="f-area">${opts([...OPTIONS.lvLoc, ...OPTIONS.hvLoc],'Choose the area')}</select></label>
        <label class="f" data-for="LOA"><span>Reason *</span><select id="f-reason">${opts(OPTIONS.loaReason,'Choose the reason')}</select></label>
        <label class="f" data-for="LOA"><span>Boundaries *</span><select id="f-bounds">${opts(OPTIONS.loaBounds,'Choose the boundaries')}</select></label>
        <label class="f" data-for="LOA"><span>Linked permit</span><select id="f-ptw"></select></label>
      </div></div>
      <div class="fgroup" data-for="HVPTW LVPTW SFT"><h3>2 · Points of isolation</h3><div class="fgrid">
        <label class="f wide" data-for="SFT"><span>System * <small>A sanction for test can be HV, LV or both.</small></span><select id="f-sys">${opts([['HV','HV'],['LV','LV'],['HV and LV','HV,LV']],'Choose HV, LV or both')}</select></label>
        <div class="f" id="wrap-hv" hidden><span><i class="dot hv"></i>HV plant * <small>UMS substation or colo UPM. Opens the HV drawing.</small></span>
          <div class="addrow"><select id="f-plant-hv"></select><button type="button" class="btn ghost small" data-open="hv">Drawing</button></div></div>
        <div class="f" id="wrap-lv" hidden><span><i class="dot lv"></i>LV plant * <small>Opens the LV drawing.</small></span>
          <div class="addrow"><select id="f-plant-lv"></select><button type="button" class="btn ghost small" data-open="lv">Drawing</button></div></div>
        <div class="f wide"><span>Lock numbers selected <small>Tap lock numbers on the drawing. They are added here as the points of isolation.</small></span>
          <ul class="picked" id="pickedLocks"></ul><p class="none-yet" id="noLocks">No points of isolation selected yet.</p></div>
        <label class="f"><span>Lockout box * <small>Each box is locked with its own red lock of the same number.</small></span><select id="f-box"></select></label>
      </div></div>
      <div class="fgroup"><h3><span data-num>3</span> · People</h3><div class="fgrid">
        <label class="f"><span>Issuing AP *</span><select id="f-ap"></select></label>
        <label class="f"><span><b data-cp-label>Competent person *</b></span><select id="f-cp"></select></label>
        <div class="f wide" data-for="HVPTW LVPTW SFT"><span>Working party <small>Each CP fits their own green lock to the box.</small></span>
          <div class="addrow"><select id="f-wp"></select><button type="button" class="btn ghost small" id="addWp">Add person</button></div><ul class="picked" id="pickedWp"></ul></div>
        <div class="cpcard wide" id="cpPreview" hidden></div>
      </div></div>
      <div class="fgroup"><h3><span data-num2>4</span> · Time</h3><div class="fgrid">
        <label class="f"><span>Valid for *</span><select id="f-dur">${opts(OPTIONS.duration,'Choose how long')}</select></label>
        <label class="f wide"><span>Notes <small>Optional</small></span><textarea id="f-notes" rows="3" maxlength="500"></textarea></label>
      </div></div>
      <div class="errors" id="errors" role="alert" hidden></div>
      <div class="formfoot"><button type="submit" class="btn primary">Issue document ${I.arrow}</button><a class="btn ghost" href="${U('index.html')}">Cancel</a></div>
      <p class="hint">Documents issued here are saved on this phone or computer only.</p>
    </form></div></section>`;
  shell('new', hero, main);
  const $ = id => document.getElementById(id);
  const locks = [], wp = [];
  const picker = document.createElement('div'); picker.className = 'picker'; picker.id = 'picker'; picker.hidden = true; picker.setAttribute('aria-label','Choose lock numbers on the drawing'); picker.setAttribute('role','dialog'); picker.setAttribute('aria-modal','true'); document.body.appendChild(picker);
  const type = () => $('f-type').value;
  const sysList = () => type() === 'HVPTW' ? ['HV'] : type() === 'LVPTW' ? ['LV'] : ($('f-sys').value || '').split(',').filter(Boolean);
  const cpFree = id => cpLockBoxes(id).length === 0;
  function plantOptions(s){
    const list = PLANTS.filter(p => p.sys === s);
    const groups = s === 'HV'
      ? [['Main substations (UMS)', list.filter(p => p.g === 'UMS')], ...[1,2,3,4,5].map(c => [`Colo ${c} UPMs`, list.filter(p => p.g === 'UPM' && p.colo === c)])]
      : Object.keys(DRAWINGS).filter(d => DRAWINGS[d].sys === 'LV').map(d => [DRAWINGS[d].title, list.filter(p => p.dw === d)]);
    return `<option value="">Choose ${s} plant</option>` + groups.map(([g, ps]) => `<optgroup label="${esc(g)}">${ps.map(p => { const free = p.ids.filter(id => find(id).r.status === 'In cabinet').length; return `<option value="${esc(p.key)}">${esc(p.name)} · ${free} of ${p.ids.length} free</option>`; }).join('')}</optgroup>`).join('');
  }
  function fillPeople(){
    const t = type();
    $('f-ap').innerHTML = opts(DATA.ap.filter(a => a.status === 'Active').map(a => [`${a.name} · ${a.role} · ${a.auth}`, a.id, t === 'HVPTW' && !/HV/.test(a.auth)]), 'Choose the issuing AP');
    const cur = $('f-cp').value;
    $('f-cp').innerHTML = opts(DATA.cp.map(c => [`${c.name} · green lock ${c.id}${cpFree(c.id) ? '' : ` · lock on ${cpLockBoxes(c.id)[0].id}`}`, c.id, c.status !== 'Active' || (t !== 'LOA' && !cpFree(c.id))]), 'Choose the CP');
    if(cur) $('f-cp').value = cur;
  }
  function show(){
    const t = type();
    document.querySelectorAll('[data-for]').forEach(el => { el.hidden = !t || !el.dataset.for.split(' ').includes(t); });
    $('f-work').innerHTML = opts(t === 'HVPTW' ? OPTIONS.hvWork : t === 'LVPTW' ? OPTIONS.lvWork : OPTIONS.sftWork, 'Choose the work');
    $('f-loc').innerHTML = opts(t === 'HVPTW' ? OPTIONS.hvLoc : t === 'LVPTW' ? OPTIONS.lvLoc : [...OPTIONS.hvLoc, ...OPTIONS.lvLoc], 'Choose the location');
    document.querySelector('[data-cp-label]').textContent = t === 'LOA' ? 'LOA holder (CP) *' : 'Competent person *';
    document.querySelector('[data-num]').textContent = t === 'LOA' ? '2' : '3'; document.querySelector('[data-num2]').textContent = t === 'LOA' ? '3' : '4';
    showSys(); fillPeople();
  }
  function showSys(){
    const sl = sysList(); $('wrap-hv').hidden = !sl.includes('HV'); $('wrap-lv').hidden = !sl.includes('LV');
    for(let i = locks.length - 1; i >= 0; i--) if(!sl.includes(find(locks[i]).r.sys)) locks.splice(i,1);
    fillLocks();
  }
  function fillLocks(){
    $('pickedLocks').innerHTML = locks.map(id => { const k = find(id).r; return `<li>${pill(id)}<span class="pl">${esc(k.board)} · ${esc(k.point)} <em>${esc(DRAWINGS[k.dw].title)}</em></span><button type="button" data-rm-lock="${id}" aria-label="Remove ${id}">×</button></li>`; }).join('');
    $('noLocks').hidden = locks.length > 0;
  }
  function fillWp(){
    const cp = $('f-cp').value;
    $('f-wp').innerHTML = opts(DATA.cp.filter(c => c.status === 'Active' && c.id !== cp && !wp.includes(c.id) && cpFree(c.id)).map(c => [`${c.name} · green lock ${c.id}`, c.id]), 'Choose a CP');
    $('pickedWp').innerHTML = wp.map(id => `<li>${pill(id)}<span class="pl">${esc(cpById(id).name)}</span><button type="button" data-rm-wp="${id}" aria-label="Remove ${id}">×</button></li>`).join('');
  }
  let toastTimer;
  function toast(html){ const t = picker.querySelector('.ptoast'); t.innerHTML = html; t.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, 6000); }
  function openPicker(key){
    const p = PLANTS.find(x => x.key === key); if(!p) return;
    const D = DRAWINGS[p.dw];
    picker.innerHTML = `<div class="phead"><div class="ptitle"><span class="kicker orange">${p.sys} · ${esc(D.title)}</span><b>${esc(p.name)}</b><small>Tap a lock number to add it; tap again to remove. Grey, struck-through numbers are in use.</small></div><button type="button" class="btn primary small" id="pickDone">Done · <span id="pickCount"></span></button></div>
      <div class="pbody" id="pickBody">${drawingHTML(p.dw, {picked:new Set(locks), focus:p.key, sys:sysList()})}</div>
      <div class="plegend"><span><i class="lk ${p.sys.toLowerCase()} mini">1</i>Free</span><span><i class="lk ${p.sys.toLowerCase()} mini picked">1</i>Selected</span><span><i class="lk ${p.sys.toLowerCase()} mini used">1</i>In use</span><span><i class="lk ${p.sys.toLowerCase()} mini focus">1</i>${esc(p.name)}</span></div><div class="ptoast" hidden></div>`;
    picker.hidden = false; document.body.style.overflow = 'hidden';
    const count = () => { picker.querySelector('#pickCount').textContent = `${locks.length} selected`; }; count();
    const body = picker.querySelector('#pickBody');
    requestAnimationFrame(() => scrollToLocks(body, body.querySelector('.dwgbox'), p.ids));
    body.addEventListener('click', e => {
      const b = e.target.closest('.lk'); if(!b) return;
      const k = find(b.dataset.lock).r;
      if(k.status === 'Out of service'){ toast(`<b>${k.id}</b> is out of service: ${esc(k.cond)}.`); return; }
      if(k.doc){ toast(`<b>${k.id}</b> is in use on <a href="${recUrl(k.doc)}">${esc(k.doc)}</a> (${esc(find(k.doc).r.status)}).`); return; }
      if(!sysList().includes(k.sys)){ toast(`<b>${k.id}</b> is an ${k.sys} lock and cannot go on this document.`); return; }
      const i = locks.indexOf(k.id);
      if(i > -1){ locks.splice(i,1); b.classList.remove('picked'); } else { locks.push(k.id); b.classList.add('picked'); toast(`<b>${k.id}</b> added · ${esc(k.board)} · ${esc(k.point)}`); }
      count(); fillLocks();
    });
    picker.querySelector('#pickDone').addEventListener('click', closePicker);
  }
  function closePicker(){ picker.hidden = true; document.body.style.overflow = ''; fillLocks(); }
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && !picker.hidden) closePicker(); });
  $('f-plant-hv').innerHTML = plantOptions('HV'); $('f-plant-lv').innerHTML = plantOptions('LV');
  $('f-box').innerHTML = opts(DATA.info.filter(b => b.status === 'In cabinet').map(b => [`${b.id} · red box lock ${b.id} · bay ${b.bay}`, b.id]), 'Choose a free lockout box');
  $('f-ptw').innerHTML = opts([...DATA.hvptw, ...DATA.lvptw].filter(p => p.status === 'Live').map(p => [`${p.id} · ${p.work}`, p.id]), 'None');
  $('f-type').addEventListener('change', show); $('f-sys').addEventListener('change', showSys);
  ['hv','lv'].forEach(t => {
    $(`f-plant-${t}`).addEventListener('change', e => { if(e.target.value) openPicker(e.target.value); });
    document.querySelector(`[data-open="${t}"]`).addEventListener('click', () => { const v = $(`f-plant-${t}`).value; if(v) openPicker(v); else $(`f-plant-${t}`).focus(); });
  });
  $('pickedLocks').addEventListener('click', e => { const b = e.target.closest('[data-rm-lock]'); if(b){ locks.splice(locks.indexOf(b.dataset.rmLock),1); fillLocks(); } });
  $('f-cp').addEventListener('change', () => { const i = wp.indexOf($('f-cp').value); if(i > -1) wp.splice(i,1); fillWp(); const c = cpById($('f-cp').value); $('cpPreview').hidden = !c; if(c) $('cpPreview').innerHTML = personCard(c,'cp',false); });
  $('addWp').addEventListener('click', () => { const v = $('f-wp').value; if(v){ wp.push(v); fillWp(); } });
  $('pickedWp').addEventListener('click', e => { const b = e.target.closest('[data-rm-wp]'); if(b){ wp.splice(wp.indexOf(b.dataset.rmWp),1); fillWp(); } });
  if(TYPES.some(t => t[1] === qType)) $('f-type').value = qType;
  show(); fillWp();
  $('docform').addEventListener('submit', e => {
    e.preventDefault();
    const t = type(), err = [], need = (id, msg) => { if(!$(id).value) err.push(msg); };
    need('f-type','Choose a document type.');
    if(t && t !== 'LOA'){
      need('f-work','Choose the work.'); if(t === 'SFT'){ need('f-test','Choose the test.'); need('f-sys','Choose HV, LV or both.'); }
      need('f-loc','Choose the location.');
      if(!locks.length) err.push('Select at least one lock number on the drawing as a point of isolation.');
      need('f-box','Choose a lockout box.');
    }
    if(t === 'LOA'){ need('f-area','Choose the area.'); need('f-reason','Choose the reason.'); need('f-bounds','Choose the boundaries.'); }
    need('f-ap','Choose the issuing AP.'); need('f-cp', t === 'LOA' ? 'Choose the LOA holder.' : 'Choose the competent person.'); need('f-dur','Choose how long the document is valid for.');
    const plocks = t === 'LOA' ? [] : [$('f-cp').value, ...wp].filter(Boolean);
    plocks.forEach(id => { if(!cpFree(id)) err.push(`Green lock ${id} is already on ${cpLockBoxes(id)[0].id}.`); });
    const box = $('errors');
    if(err.length){ box.innerHTML = `<b>Before issuing:</b><ul>${err.map(x => `<li>${x}</li>`).join('')}</ul>`; box.hidden = false; box.scrollIntoView({behavior:'smooth', block:'center'}); return; }
    box.hidden = true;
    const ap = apById($('f-ap').value), cp = cpById($('f-cp').value), now = stamp(), id = nextId(t), notes = $('f-notes').value.trim();
    const base = {id, status:'Live', ap:ap.id, issued:now, expiry:expiryFrom($('f-dur').value), notes};
    let doc, log;
    if(t === 'LOA'){
      doc = {...base, area:$('f-area').value, reason:$('f-reason').value, bounds:$('f-bounds').value, holder:cp.id, ptw:$('f-ptw').value};
      log = [[hhmm(now), `LOA issued by ${ap.name} to ${cp.name}. Boundaries set.`]];
    } else {
      doc = {...base, sys:sysList().join(' & '), work:$('f-work').value, ...(t === 'SFT' ? {test:$('f-test').value} : {}), loc:$('f-loc').value, cp:cp.id, keys:[...locks], box:$('f-box').value, loa:'', plocks};
      log = [[hhmm(now), `Keys ${locks.join(', ')} drawn by ${ap.name}; tags hung on hooks`],[hhmm(now), `Keys placed in ${doc.box}, box locked with red box lock ${doc.box}, key held by ${ap.name}. ${DOC_NAME[docSet(id)]} issued to ${cp.name}`],[hhmm(now), `Green CP locks ${plocks.join(', ')} applied to ${doc.box}`]];
    }
    if(!addEvent({op:'create', doc, log})){ box.innerHTML = '<b>Could not save.</b> This browser is blocking storage, for example in a private window.'; box.hidden = false; return; }
    location.href = recUrl(id) + '&created=1';
  });
}


function securityPage(){
  const hero = pageHero(crumbs('<span>Cybersecurity &amp; information assurance</span>'), 'Security design specification', 'Cybersecurity &amp; Information Assurance', 'Security architecture, information protection, risk treatment and incident response for the Isolation &amp; Document Control and Training platforms.');
  const main = `<section class="block security-overview"><div class="wrap">
    <div class="eyebrow">DESIGN SPECIFICATION · CLIENT TECHNICAL REVIEW</div>
    <h2>Information assurance programme</h2>
    <p class="lead">The security programme specifies the proposed controls for client information, access management, multi-organisation segregation, operational integrity and incident response.</p>
    <div class="security-grid">
      <article><span>01</span><h3>Scope &amp; threat basis</h3><p>Data classification, ownership, confidentiality and safety-system boundaries.</p></article>
      <article><span>02</span><h3>Security architecture</h3><p>Identity, access controls, tenant separation, document integrity and training interfaces.</p></article>
      <article><span>03</span><h3>Security technology</h3><p>Proposed hosting, infrastructure protection, monitoring and development controls.</p></article>
      <article><span>04</span><h3>Risk &amp; assurance</h3><p>Threat assessments, verification requirements and client acceptance evidence.</p></article>
      <article><span>05</span><h3>Incident response &amp; recovery</h3><p>Detection, containment, escalation, continuity and recovery scenarios.</p></article>
      <article><span>06</span><h3>Governance &amp; delivery</h3><p>Contractual obligations, supplier controls and deployment acceptance gates.</p></article>
    </div>
    <div class="security-document"><div><div class="eyebrow">REFERENCE DOCUMENT</div><h3>Cybersecurity and Information Assurance Programme</h3><p>Security design specification · Version 3.0 · October 2026 · 44 pages</p><p class="security-caution">Design specification only. Proposed security controls are not a claim of implementation, certification or operational approval. This demonstration must not contain restricted client information.</p></div><a class="btn primary" href="CYBER1-PTU.pdf" target="_blank" rel="noopener">View security specification ↗</a></div>
  </div></section>`;
  shell('security',hero,main);
}

/* ---------- Start ---------- */
loadEvents().forEach(applyEvent);
syncRegisters();
const page = document.body.dataset.page;
if(page === 'home') home();
else if(page === 'registers') registersPage();
else if(page === 'security') securityPage();
else if(page === 'expired') expiredPage();
else if(page === 'ptw') ptwChooser();
else if(PAGES[page]) tracker(page);
else if(page === 'record') record();
else if(page === 'schematic') schematic();
else if(page === 'references') references();
else if(page === 'procedure') procedure();
else if(page === 'new') newDoc();
