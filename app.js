/* Powertec Isolation Control — shared script.
   Every page loads this file. It draws the header, menu and footer,
   then builds the page named in <body data-page="...">.
   All records below are EXAMPLE DATA. Replace them with your own site records. */

/* ---------- Example data ---------- */
const AP = {J:'J. Andersson (AP)', E:'E. Berg (SAP)', R:'R. Holm (AP)'};
const DATA = {
  keys: [],  /* built from LOCKS below: one key per dedicated lock on the drawings */
  info: [
    {id:'LB-05',status:'In use',doc:'PTW-2026-0414',keys:['H-048','H-049','H-055'],aplock:'P-002 · E. Berg',plocks:['P-042'],issued:'2026-10-27 06:50',bay:'C3-05'},
    {id:'LB-06',status:'In use',doc:'PTW-2026-0412',keys:['L-013','L-014','L-017'],aplock:'P-004 · J. Andersson',plocks:['P-031','P-037'],issued:'2026-10-27 07:10',bay:'C3-06'},
    {id:'LB-07',status:'In use',doc:'PTW-2026-0415',keys:['L-019'],aplock:'P-009 · R. Holm',plocks:['P-018','P-026'],issued:'2026-10-27 07:45',bay:'C3-07'},
    {id:'LB-08',status:'In use',doc:'SFT-2026-0088',keys:['L-041','L-053'],aplock:'P-004 · J. Andersson',plocks:['P-052'],issued:'2026-10-27 09:20',bay:'C3-08'},
    {id:'LB-03',status:'In cabinet',doc:'',keys:[],aplock:'',plocks:[],issued:'',bay:'C3-03'},
    {id:'LB-09',status:'In use',doc:'PTW-2026-0418',keys:['L-129','L-130','L-132'],aplock:'P-009 · R. Holm',plocks:['P-026'],issued:'2026-10-27 13:05',bay:'C3-09'},
    {id:'LB-11',status:'In cabinet',doc:'',keys:[],aplock:'',plocks:[],issued:'',bay:'C3-11'},
    {id:'LB-10',status:'Out of service',doc:'',keys:[],aplock:'',plocks:[],issued:'',bay:'C3-10'}
  ],
  ptw: [
    {id:'PTW-2026-0418',status:'Live',sys:'LV',work:'UPS module replacement',loc:'Data centre electrical room',ap:AP.R,cp:'O. Dahl · P-026',keys:['L-129','L-130','L-132'],box:'LB-09',loa:'',issued:'2026-10-27 13:05',expiry:'2026-10-28 18:00'},
    {id:'PTW-2026-0416',status:'Pending issue',sys:'HV',work:'Cable termination, TR-2 HV feeder',loc:'HV substation B',ap:AP.E,cp:'Not yet issued',keys:['H-010'],box:'',loa:'',issued:'',expiry:''},
    {id:'PTW-2026-0415',status:'Live',sys:'LV',work:'Busbar joint inspection and re-torque, RPP A2',loc:'Data hall 1',ap:AP.R,cp:'S. Nyberg · P-018',keys:['L-019'],box:'LB-07',loa:'',issued:'2026-10-27 07:45',expiry:'2026-10-27 18:00'},
    {id:'PTW-2026-0414',status:'Live',sys:'HV',work:'Transformer maintenance, T4 22/11 kV',loc:'HV substation B',ap:AP.E,cp:'J. Wikström · P-042',keys:['H-048','H-049','H-055'],box:'LB-05',loa:'',issued:'2026-10-27 06:50',expiry:'2026-10-28 18:00'},
    {id:'PTW-2026-0412',status:'Live',sys:'LV',work:'Replace protection relay, LV Main Distribution B incomers',loc:'LV switchroom B',ap:AP.J,cp:'K. Lindqvist · P-031',keys:['L-013','L-014','L-017'],box:'LB-06',loa:'LOA-2026-0045',issued:'2026-10-27 07:10',expiry:'2026-10-28 18:00'},
    {id:'PTW-2026-0409',status:'Cancelled',sys:'LV',work:'Install additional outgoing way, RPP B2',loc:'Data hall 2',ap:AP.J,cp:'K. Lindqvist · P-031',keys:['L-040'],box:'LB-03',loa:'',issued:'2026-10-24 07:30',expiry:'2026-10-24 17:00'}
  ],
  sft: [
    {id:'SFT-2026-0088',status:'Live',sys:'LV',work:'Insulation resistance test, cable RPP B2 to Row PDU B2',test:'Insulation resistance, 1000 V DC',loc:'Data hall 2',ap:AP.J,cp:'M. Ek · P-052',keys:['L-041','L-053'],box:'LB-08',issued:'2026-10-27 09:20',expiry:'2026-10-27 16:00'},
    {id:'SFT-2026-0086',status:'Cancelled',sys:'LV',work:'Primary injection test, ATS-A1',test:'Primary current injection',loc:'LV switchroom A',ap:AP.E,cp:'T. Sjöberg · P-044',keys:['L-001'],box:'LB-09',issued:'2026-10-21 08:00',expiry:'2026-10-21 15:00'}
  ],
  cp: [
    {id:'P-002',name:'Erik Berg',company:'Powertec Utilities Ltd',role:'SAP',scope:'LV and HV to 22 kV, site lead SAP',phone:'+46 70 000 10 02',email:'e.berg@example.com',id06:'ID06-0000-1002',trained:'2024-09-02',authBy:'Site Authorising Engineer',expiry:'2027-09-01',status:'Active',emergency:'Karin Berg · +46 70 000 20 02'},
    {id:'P-004',name:'Johan Andersson',company:'Powertec Utilities Ltd',role:'AP',scope:'LV and HV to 22 kV',phone:'+46 70 000 10 04',email:'j.andersson@example.com',id06:'ID06-0000-1004',trained:'2025-03-12',authBy:'E. Berg (SAP)',expiry:'2027-03-11',status:'Active',emergency:'Anna Andersson · +46 70 000 20 04'},
    {id:'P-009',name:'Rasmus Holm',company:'Kraftservice AB',role:'AP',scope:'LV',phone:'+46 70 000 10 09',email:'r.holm@example.com',id06:'ID06-0000-1009',trained:'2025-06-02',authBy:'E. Berg (SAP)',expiry:'2027-06-01',status:'Active',emergency:'Lena Holm · +46 70 000 20 09'},
    {id:'P-018',name:'Sara Nyberg',company:'Nordel Electrical AB',role:'CP',scope:'LV mechanical and electrical',phone:'+46 70 000 10 18',email:'s.nyberg@example.com',id06:'ID06-0000-1018',trained:'2026-01-20',authBy:'J. Andersson (AP)',expiry:'2027-01-19',status:'Active',emergency:'Per Nyberg · +46 70 000 20 18'},
    {id:'P-026',name:'Oskar Dahl',company:'Nordel Electrical AB',role:'CP',scope:'LV',phone:'+46 70 000 10 26',email:'o.dahl@example.com',id06:'ID06-0000-1026',trained:'2026-02-04',authBy:'J. Andersson (AP)',expiry:'2027-02-03',status:'Active',emergency:'Maja Dahl · +46 70 000 20 26'},
    {id:'P-031',name:'Karin Lindqvist',company:'Nordel Electrical AB',role:'CP',scope:'LV, UPS and critical distribution',phone:'+46 70 000 10 31',email:'k.lindqvist@example.com',id06:'ID06-0000-1031',trained:'2025-11-10',authBy:'J. Andersson (AP)',expiry:'2026-11-09',status:'Active',emergency:'Erik Lindqvist · +46 70 000 20 31'},
    {id:'P-037',name:'Liam Byrne',company:'Hall Mechanical Ltd',role:'CP',scope:'LV',phone:'+44 7700 900 037',email:'l.byrne@example.com',id06:'ID06-0000-1037',trained:'2026-04-15',authBy:'R. Holm (AP)',expiry:'2027-04-14',status:'Active',emergency:'Niamh Byrne · +44 7700 900 137'},
    {id:'P-042',name:'Jonas Wikström',company:'Nordel Electrical AB',role:'CP',scope:'HV to 22 kV and LV',phone:'+46 70 000 10 42',email:'j.wikstrom@example.com',id06:'ID06-0000-1042',trained:'2026-05-06',authBy:'J. Andersson (AP)',expiry:'2027-05-05',status:'Active',emergency:'Ida Wikström · +46 70 000 20 42'},
    {id:'P-044',name:'Tove Sjöberg',company:'Voltwise Testing AB',role:'CP',scope:'LV testing and commissioning',phone:'+46 70 000 10 44',email:'t.sjoberg@example.com',id06:'ID06-0000-1044',trained:'2025-09-01',authBy:'E. Berg (SAP)',expiry:'2026-08-31',status:'Expired',emergency:'Mats Sjöberg · +46 70 000 20 44'},
    {id:'P-052',name:'Mikael Ek',company:'Voltwise Testing AB',role:'CP',scope:'LV testing and commissioning',phone:'+46 70 000 10 52',email:'m.ek@example.com',id06:'ID06-0000-1052',trained:'2026-03-18',authBy:'E. Berg (SAP)',expiry:'2027-03-17',status:'Active',emergency:'Sofia Ek · +46 70 000 20 52'},
    {id:'P-061',name:'Alva Lund',company:'Kraftservice AB',role:'CP',scope:'Battery and BESS rooms, inspection only',phone:'+46 70 000 10 61',email:'a.lund@example.com',id06:'ID06-0000-1061',trained:'2026-06-22',authBy:'R. Holm (AP)',expiry:'2027-06-21',status:'Active',emergency:'Hugo Lund · +46 70 000 20 61'},
    {id:'P-070',name:'Filip Strand',company:'Brandskydd Norr AB',role:'CP',scope:'Battery rooms, non-electrical work',phone:'+46 70 000 10 70',email:'f.strand@example.com',id06:'ID06-0000-1070',trained:'2026-07-01',authBy:'E. Berg (SAP)',expiry:'2027-06-30',status:'Suspended',emergency:'Elin Strand · +46 70 000 20 70'}
  ],
  loa: [
    {id:'LOA-2026-0046',status:'Live',area:'Battery room B',reason:'Visual inspection of BESS-B racks, no contact',ap:AP.R,holder:'A. Lund · P-061',bounds:'Inspection walkway only; rack doors stay shut',issued:'2026-10-27 10:00',expiry:'2026-10-27 14:00',ptw:''},
    {id:'LOA-2026-0045',status:'Live',area:'LV switchroom B, bays 1 to 4',reason:'Live LV equipment next to the PTW-2026-0412 work area',ap:AP.J,holder:'K. Lindqvist · P-031',bounds:'Barrier and signage at bay 4; no entry beyond bay 4',issued:'2026-10-27 07:15',expiry:'2026-10-28 18:00',ptw:'PTW-2026-0412'},
    {id:'LOA-2026-0041',status:'Cancelled',area:'Battery room A',reason:'Fire detection survey',ap:AP.E,holder:'F. Strand · P-070',bounds:'Ceiling void access from walkway only',issued:'2026-10-20 09:00',expiry:'2026-10-20 13:00',ptw:''}
  ]
};
const LOGS = {
  'PTW-2026-0418':[['12:50','Switching programme checked against the electrical room layout by R. Holm'],['12:55','Keys L-129, L-130, L-132 drawn; tags hung on hooks C2-129, C2-130, C2-132'],['13:02','UPS isolated on input, output and battery DC, proved dead, locks applied'],['13:05','Keys placed in LB-09, box locked with box lock LB-09, key held by R. Holm, PTW issued to O. Dahl'],['13:07','Personal lock P-026 applied to LB-09']],
  'PTW-2026-0414':[['06:30','Switching programme for T4 checked against the hyperscale SLD by E. Berg'],['06:38','Keys H-048, H-049, H-055 drawn; tags hung on hooks C1-048, C1-049, C1-055'],['06:46','T4 isolated on 22 kV and 11 kV, proved dead, earthed, locks applied'],['06:50','Keys in LB-05, box lock LB-05 fitted, key held by E. Berg, PTW issued to J. Wikström'],['06:52','Personal lock P-042 applied to LB-05']],
  'PTW-2026-0412':[['07:02','Switching programme checked against the Tier IV SLD by J. Andersson'],['07:05','Keys L-013, L-014, L-017 drawn; tags hung on hooks C2-013, C2-014, C2-017'],['07:08','Locks applied; numbers checked against switch labels'],['07:10','Keys placed in LB-06, box lock LB-06 fitted, key held by J. Andersson, PTW issued'],['07:14','Personal locks P-031, P-037 applied to LB-06']],
  'PTW-2026-0415':[['07:30','Key L-019 drawn by R. Holm'],['07:40','RPP A2 isolated, proved dead, lock applied'],['07:45','Key in LB-07, PTW issued to S. Nyberg'],['07:48','Personal locks P-018, P-026 applied to LB-07']],
  'PTW-2026-0416':[['10:30','Key H-010 drawn by E. Berg; status With AP'],['10:32','HV switching in progress']],
  'PTW-2026-0409':[['24 Oct 07:30','PTW issued, key L-040 in LB-03'],['24 Oct 16:40','All personal locks removed, PTW cancelled'],['24 Oct 16:52','L-040 returned to hook, LB-03 returned to bay']],
  'SFT-2026-0088':[['09:10','Keys L-041, L-053 drawn by J. Andersson'],['09:20','Keys in LB-08, SFT issued to M. Ek'],['09:22','Personal lock P-052 applied to LB-08']],
  'SFT-2026-0086':[['21 Oct 08:00','SFT issued to T. Sjöberg'],['21 Oct 14:20','Test complete, SFT cancelled, key L-001 returned']],
  'LOA-2026-0045':[['07:15','Barrier placed at bay 4; LOA issued to K. Lindqvist']],
  'LOA-2026-0046':[['10:00','LOA issued to A. Lund']]
};

/* ---------- Drawings and dedicated locks ----------
   Every lock sits at an x,y point on its drawing (pixels on the drawing image).
   Columns: lock id, number shown in the circle, drawing, system, item of plant, point of isolation, x, y */
const DRAWINGS = {
  tier4:{title:'Tier IV data centre',kind:'Single line diagram',img:'sld-tier4.jpg',w:1799,h:1222,r:0.0105,view:1750},
  hyper:{title:'Hyperscale 2N architecture',kind:'Single line diagram',img:'sld-hyperscale.jpg',w:1260,h:1920,r:0.0150,view:1250},
  layout:{title:'Data centre layout',kind:'Site layout',img:'dwg-layout.jpg',w:1075,h:879,r:0.0175,view:1300},
  campus:{title:'AC powered data centre',kind:'Site layout',img:'dwg-campus.jpg',w:1290,h:784,r:0.0165,view:1400},
  room:{title:'Data centre electrical room',kind:'Room layout',img:'dwg-room.jpg',w:2210,h:1230,r:0.0125,view:1800}
};
const LOCKS = [["H-001", 1, "tier4", "HV", "132 kV incomers", "Utility B line disconnector", 1106, 130], ["H-002", 2, "tier4", "HV", "132 kV incomers", "Utility A cable disconnector", 413, 193], ["H-003", 3, "tier4", "HV", "132 kV incomers", "Utility B cable disconnector", 1106, 201], ["H-004", 4, "tier4", "HV", "132 kV incomers", "Incomer A disconnector", 373, 282], ["H-005", 5, "tier4", "HV", "132 kV incomers", "Incomer B disconnector", 1147, 282], ["H-006", 6, "tier4", "HV", "132 kV incomers", "Incomer A circuit breaker", 373, 326], ["H-007", 7, "tier4", "HV", "132 kV incomers", "Incomer B circuit breaker", 1147, 326], ["H-008", 8, "tier4", "HV", "132 kV busbar and transformer feeders", "132 kV bus coupler", 756, 347], ["H-009", 9, "tier4", "HV", "132 kV busbar and transformer feeders", "TR-1 feeder disconnector", 453, 380], ["H-010", 10, "tier4", "HV", "132 kV busbar and transformer feeders", "TR-2 feeder disconnector", 601, 380], ["H-011", 11, "tier4", "HV", "132 kV busbar and transformer feeders", "TR-3 feeder disconnector", 897, 380], ["H-012", 12, "tier4", "HV", "132 kV busbar and transformer feeders", "TR-4 feeder disconnector", 1043, 380], ["H-013", 13, "tier4", "HV", "11 kV section tie", "Section tie isolator, A side", 672, 585], ["H-014", 14, "tier4", "HV", "11 kV section tie", "Section tie circuit breaker", 715, 588], ["H-015", 15, "tier4", "HV", "11 kV section tie", "Section tie isolator, B side", 763, 585], ["H-016", 16, "tier4", "HV", "11 kV Switchboard A", "Outgoing way 1 to ATS-A1", 354, 614], ["H-017", 17, "tier4", "HV", "11 kV Switchboard A", "Outgoing way 2 to ATS-A2", 416, 614], ["H-018", 18, "tier4", "HV", "11 kV Switchboard A", "Outgoing way 3 to ATS-A3", 480, 614], ["H-019", 19, "tier4", "HV", "11 kV Switchboard A", "Outgoing way 4 to ATS-A4", 544, 614], ["H-020", 20, "tier4", "HV", "11 kV Switchboard A", "Outgoing way 5 to ATS-A5", 606, 614], ["H-021", 21, "tier4", "HV", "11 kV Switchboard B", "Outgoing way 1 to ATS-B1", 824, 614], ["H-022", 22, "tier4", "HV", "11 kV Switchboard B", "Outgoing way 2 to ATS-B2", 887, 614], ["H-023", 23, "tier4", "HV", "11 kV Switchboard B", "Outgoing way 3 to ATS-B3", 951, 614], ["H-024", 24, "tier4", "HV", "11 kV Switchboard B", "Outgoing way 4 to ATS-B4", 1015, 614], ["H-025", 25, "tier4", "HV", "11 kV Switchboard B", "Outgoing way 5 to ATS-B5", 1073, 614], ["L-001", 1, "tier4", "LV", "ATS bank A", "ATS-A1", 368, 664], ["L-002", 2, "tier4", "LV", "ATS bank A", "ATS-A2", 430, 664], ["L-003", 3, "tier4", "LV", "ATS bank A", "ATS-A3", 494, 664], ["L-004", 4, "tier4", "LV", "ATS bank A", "ATS-A4", 558, 664], ["L-005", 5, "tier4", "LV", "ATS bank A", "ATS-A5", 620, 664], ["L-006", 6, "tier4", "LV", "ATS bank B", "ATS-B1", 838, 664], ["L-007", 7, "tier4", "LV", "ATS bank B", "ATS-B2", 901, 664], ["L-008", 8, "tier4", "LV", "ATS bank B", "ATS-B3", 965, 664], ["L-009", 9, "tier4", "LV", "ATS bank B", "ATS-B4", 1029, 664], ["L-010", 10, "tier4", "LV", "ATS bank B", "ATS-B5", 1087, 664], ["L-011", 11, "tier4", "LV", "LV Main Distribution A", "Incomer 1", 456, 738], ["L-012", 12, "tier4", "LV", "LV Main Distribution A", "Incomer 2", 510, 738], ["L-013", 13, "tier4", "LV", "LV Main Distribution B", "Incomer 1", 918, 738], ["L-014", 14, "tier4", "LV", "LV Main Distribution B", "Incomer 2", 971, 738], ["L-015", 15, "tier4", "LV", "LV tie breaker", "Tie isolator, A side", 667, 818], ["L-016", 16, "tier4", "LV", "LV tie breaker", "Tie breaker", 704, 822], ["L-017", 17, "tier4", "LV", "LV tie breaker", "Tie isolator, B side", 758, 818], ["L-018", 18, "tier4", "LV", "LV Main Distribution A", "Outgoing to RPP A1", 362, 844], ["L-019", 19, "tier4", "LV", "LV Main Distribution A", "Outgoing to RPP A2", 457, 844], ["L-020", 20, "tier4", "LV", "LV Main Distribution A", "Outgoing to RPP A3", 547, 844], ["L-021", 21, "tier4", "LV", "LV Main Distribution A", "Outgoing to RPP A4", 631, 844], ["L-022", 22, "tier4", "LV", "LV Main Distribution B", "Outgoing to RPP B1", 828, 844], ["L-023", 23, "tier4", "LV", "LV Main Distribution B", "Outgoing to RPP B2", 931, 844], ["L-024", 24, "tier4", "LV", "LV Main Distribution B", "Outgoing to RPP B3", 1006, 844], ["L-025", 25, "tier4", "LV", "LV Main Distribution B", "Outgoing to RPP B4", 1069, 844], ["L-026", 26, "tier4", "LV", "RPPs, A side", "RPP A1 way 1", 325, 928], ["L-027", 27, "tier4", "LV", "RPPs, A side", "RPP A1 way 2", 352, 928], ["L-028", 28, "tier4", "LV", "RPPs, A side", "RPP A1 way 3", 382, 928], ["L-029", 29, "tier4", "LV", "RPPs, A side", "RPP A2 way 1", 429, 928], ["L-030", 30, "tier4", "LV", "RPPs, A side", "RPP A2 way 2", 457, 928], ["L-031", 31, "tier4", "LV", "RPPs, A side", "RPP A2 way 3", 486, 928], ["L-032", 32, "tier4", "LV", "RPPs, A side", "RPP A3 way 1", 527, 928], ["L-033", 33, "tier4", "LV", "RPPs, A side", "RPP A3 way 2", 556, 928], ["L-034", 34, "tier4", "LV", "RPPs, A side", "RPP A4 way 1", 613, 928], ["L-035", 35, "tier4", "LV", "RPPs, A side", "RPP A4 way 2", 639, 928], ["L-036", 36, "tier4", "LV", "RPPs, A side", "RPP A4 way 3", 669, 928], ["L-037", 37, "tier4", "LV", "RPPs, B side", "RPP B1 way 1", 795, 928], ["L-038", 38, "tier4", "LV", "RPPs, B side", "RPP B1 way 2", 824, 928], ["L-039", 39, "tier4", "LV", "RPPs, B side", "RPP B1 way 3", 853, 928], ["L-040", 40, "tier4", "LV", "RPPs, B side", "RPP B2 way 1", 906, 928], ["L-041", 41, "tier4", "LV", "RPPs, B side", "RPP B2 way 2", 933, 928], ["L-042", 42, "tier4", "LV", "RPPs, B side", "RPP B2 way 3", 962, 928], ["L-043", 43, "tier4", "LV", "RPPs, B side", "RPP B3 way 1", 993, 928], ["L-044", 44, "tier4", "LV", "RPPs, B side", "RPP B3 way 2", 1019, 928], ["L-045", 45, "tier4", "LV", "RPPs, B side", "RPP B4 way 1", 1063, 928], ["L-046", 46, "tier4", "LV", "RPPs, B side", "RPP B4 way 2", 1092, 928], ["L-047", 47, "tier4", "LV", "RPPs, B side", "RPP B4 way 3", 1121, 928], ["L-048", 48, "tier4", "LV", "Row PDUs, A side", "Row PDU A1 feed to IT load", 346, 1011], ["L-049", 49, "tier4", "LV", "Row PDUs, A side", "Row PDU A2 feed to IT load", 440, 1011], ["L-050", 50, "tier4", "LV", "Row PDUs, A side", "Row PDU A3 feed to IT load", 528, 1011], ["L-051", 51, "tier4", "LV", "Row PDUs, A side", "Row PDU A4 feed to IT load", 639, 1011], ["L-052", 52, "tier4", "LV", "Row PDUs, B side", "Row PDU B1 feed to IT load", 822, 1011], ["L-053", 53, "tier4", "LV", "Row PDUs, B side", "Row PDU B2 feed to IT load", 906, 1011], ["L-054", 54, "tier4", "LV", "Row PDUs, B side", "Row PDU B3 feed to IT load", 979, 1011], ["L-055", 55, "tier4", "LV", "Row PDUs, B side", "Row PDU B4 feed to IT load", 1084, 1011], ["H-026", 26, "hyper", "HV", "400 kV GIS, source A", "Circuit breaker, T1 feeder", 227, 170], ["H-027", 27, "hyper", "HV", "400 kV GIS, source A", "Disconnector, T1 feeder", 227, 214], ["H-028", 28, "hyper", "HV", "400 kV GIS, source A", "Circuit breaker, coupler side", 351, 170], ["H-029", 29, "hyper", "HV", "400 kV GIS, source A", "Disconnector, coupler side", 351, 214], ["H-030", 30, "hyper", "HV", "400 kV GIS, source A", "Earth switch, coupler side", 351, 251], ["H-031", 31, "hyper", "HV", "400 kV bus coupler", "Coupler disconnector, A side", 431, 216], ["H-032", 32, "hyper", "HV", "400 kV bus coupler", "Bus coupler circuit breaker", 537, 251], ["H-033", 33, "hyper", "HV", "400 kV bus coupler", "Coupler disconnector, B side", 614, 216], ["H-034", 34, "hyper", "HV", "400 kV GIS, source B", "Earth switch, coupler side", 690, 251], ["H-035", 35, "hyper", "HV", "400 kV GIS, source B", "Disconnector, coupler side", 690, 214], ["H-036", 36, "hyper", "HV", "400 kV GIS, source B", "Circuit breaker, coupler side", 690, 170], ["H-037", 37, "hyper", "HV", "400 kV GIS, source B", "Disconnector, T2 feeder", 812, 214], ["H-038", 38, "hyper", "HV", "400 kV GIS, source B", "Circuit breaker, T2 feeder", 812, 170], ["H-039", 39, "hyper", "HV", "22 kV MV incomers", "MV incomer A circuit breaker", 244, 439], ["H-040", 40, "hyper", "HV", "22 kV MV incomers", "MV incomer B circuit breaker", 798, 439], ["H-041", 41, "hyper", "HV", "22 kV capacitor banks", "Capacitor bank A switch", 190, 492], ["H-042", 42, "hyper", "HV", "22 kV ring bus coupler", "Ring coupler disconnector, A side", 449, 446], ["H-043", 43, "hyper", "HV", "22 kV ring bus coupler", "Ring bus coupler circuit breaker", 492, 479], ["H-044", 44, "hyper", "HV", "22 kV ring bus coupler", "Ring coupler disconnector, B side", 599, 446], ["H-045", 45, "hyper", "HV", "22 kV capacitor banks", "Capacitor bank B switch", 850, 492], ["H-046", 46, "hyper", "HV", "22 kV transformer feeders, T3 to T6", "T3 feeder circuit breaker", 303, 485], ["H-047", 47, "hyper", "HV", "22 kV transformer feeders, T3 to T6", "T3 feeder disconnector", 303, 521], ["H-048", 48, "hyper", "HV", "22 kV transformer feeders, T3 to T6", "T4 feeder circuit breaker", 430, 485], ["H-049", 49, "hyper", "HV", "22 kV transformer feeders, T3 to T6", "T4 feeder disconnector", 430, 521], ["H-050", 50, "hyper", "HV", "22 kV transformer feeders, T3 to T6", "T5 feeder circuit breaker", 651, 485], ["H-051", 51, "hyper", "HV", "22 kV transformer feeders, T3 to T6", "T5 feeder disconnector", 651, 521], ["H-052", 52, "hyper", "HV", "22 kV transformer feeders, T3 to T6", "T6 feeder circuit breaker", 770, 485], ["H-053", 53, "hyper", "HV", "22 kV transformer feeders, T3 to T6", "T6 feeder disconnector", 770, 521], ["H-054", 54, "hyper", "HV", "11 kV genset incomers", "T3 genset incomer", 306, 736], ["H-055", 55, "hyper", "HV", "11 kV genset incomers", "T4 genset incomer", 433, 736], ["H-056", 56, "hyper", "HV", "11 kV genset incomers", "T5 genset incomer", 650, 736], ["H-057", 57, "hyper", "HV", "11 kV genset incomers", "T6 genset incomer", 770, 736], ["L-056", 56, "hyper", "LV", "400 V LV SWBD A", "Incomer 1", 287, 960], ["L-057", 57, "hyper", "LV", "400 V LV SWBD A", "Incomer 2", 345, 960], ["L-058", 58, "hyper", "LV", "400 V LV SWBD B", "Incomer 1", 652, 960], ["L-059", 59, "hyper", "LV", "400 V LV SWBD B", "Incomer 2", 710, 960], ["L-060", 60, "hyper", "LV", "400 V LV SWBD B", "Incomer 3", 917, 960], ["L-061", 61, "hyper", "LV", "400 V bus tie", "Bus tie isolator, A side", 419, 977], ["L-062", 62, "hyper", "LV", "400 V bus tie", "Bus tie circuit breaker", 541, 1019], ["L-063", 63, "hyper", "LV", "400 V bus tie", "Bus tie isolator, B side", 596, 977], ["L-064", 64, "hyper", "LV", "400 V LV SWBD A", "Outgoing CB 1, UPS A feed", 95, 1025], ["L-065", 65, "hyper", "LV", "400 V LV SWBD A", "Outgoing CB 2, UPS A feed", 147, 1025], ["L-066", 66, "hyper", "LV", "400 V LV SWBD A", "Outgoing CB 3, UPS A feed", 205, 1025], ["L-067", 67, "hyper", "LV", "400 V LV SWBD A", "Outgoing CB 4, UPS A feed", 262, 1025], ["L-068", 68, "hyper", "LV", "400 V LV SWBD A", "Outgoing CB 5, UPS A feed", 319, 1025], ["L-069", 69, "hyper", "LV", "400 V LV SWBD A", "Outgoing CB 6, UPS A feed", 378, 1025], ["L-070", 70, "hyper", "LV", "400 V LV SWBD B", "Outgoing CB 1, UPS B feed", 617, 1025], ["L-071", 71, "hyper", "LV", "400 V LV SWBD B", "Outgoing CB 2, UPS B feed", 681, 1025], ["L-072", 72, "hyper", "LV", "400 V LV SWBD B", "Outgoing CB 3, UPS B feed", 742, 1025], ["L-073", 73, "hyper", "LV", "400 V LV SWBD B", "Outgoing CB 4, UPS B feed", 802, 1025], ["L-074", 74, "hyper", "LV", "400 V LV SWBD B", "Outgoing CB 5, UPS B feed", 860, 1025], ["L-075", 75, "hyper", "LV", "400 V LV SWBD B", "Outgoing CB 6, UPS B feed", 919, 1025], ["L-076", 76, "hyper", "LV", "UPS maintenance bypass", "Maintenance bypass isolator, A side", 481, 1135], ["L-077", 77, "hyper", "LV", "UPS maintenance bypass", "Maintenance bypass isolator, B side", 558, 1135], ["L-078", 78, "hyper", "LV", "Static transfer switches", "STS A", 131, 1308], ["L-079", 79, "hyper", "LV", "Static transfer switches", "STS A to B automatic bypass, A side", 418, 1327], ["L-080", 80, "hyper", "LV", "Static transfer switches", "STS A to B automatic bypass, B side", 614, 1327], ["L-081", 81, "hyper", "LV", "Static transfer switches", "STS B", 850, 1308], ["H-058", 58, "layout", "HV", "10 kV substations", "Substation A incoming switch", 448, 178], ["H-059", 59, "layout", "HV", "10 kV substations", "Substation A transformer HV switch", 476, 178], ["H-060", 60, "layout", "HV", "10 kV substations", "Substation B incoming switch", 606, 178], ["H-061", 61, "layout", "HV", "10 kV substations", "Substation B transformer HV switch", 634, 178], ["L-082", 82, "layout", "LV", "Main power distribution A (ATS)", "Utility incomer", 458, 240], ["L-083", 83, "layout", "LV", "Main power distribution A (ATS)", "Generator incomer / ATS", 490, 240], ["L-084", 84, "layout", "LV", "Main power distribution B (ATS)", "Utility incomer", 600, 240], ["L-085", 85, "layout", "LV", "Main power distribution B (ATS)", "Generator incomer / ATS", 632, 240], ["L-086", 86, "layout", "LV", "Diesel generators", "Generator A output breaker", 322, 238], ["L-087", 87, "layout", "LV", "Diesel generators", "Central generator output breaker", 565, 182], ["L-088", 88, "layout", "LV", "Diesel generators", "Generator B output breaker", 762, 238], ["L-089", 89, "layout", "LV", "UPS, A and B", "UPS A input isolator", 505, 300], ["L-090", 90, "layout", "LV", "UPS, A and B", "UPS B input isolator", 583, 300], ["L-091", 91, "layout", "LV", "UPS batteries, A and B", "Battery A DC isolator", 492, 352], ["L-092", 92, "layout", "LV", "UPS batteries, A and B", "Battery B DC isolator", 592, 352], ["L-093", 93, "layout", "LV", "Chillers and drycoolers", "Chiller A isolator", 304, 300], ["L-094", 94, "layout", "LV", "Chillers and drycoolers", "Chiller B isolator", 782, 300], ["L-095", 95, "layout", "LV", "Chillers and drycoolers", "Drycooler A isolator", 283, 362], ["L-096", 96, "layout", "LV", "Chillers and drycoolers", "Drycooler B isolator", 804, 362], ["L-097", 97, "layout", "LV", "Climate control units", "CCU A1 isolator", 405, 490], ["L-098", 98, "layout", "LV", "Climate control units", "CCU A2 isolator", 393, 565], ["L-099", 99, "layout", "LV", "Climate control units", "CCU A3 isolator", 378, 650], ["L-100", 100, "layout", "LV", "Climate control units", "CCU B1 isolator", 683, 490], ["L-101", 101, "layout", "LV", "Climate control units", "CCU B2 isolator", 692, 565], ["L-102", 102, "layout", "LV", "Climate control units", "CCU B3 isolator", 708, 650], ["L-103", 103, "layout", "LV", "Server hall feeds", "Server hall feed A", 518, 440], ["L-104", 104, "layout", "LV", "Server hall feeds", "Server hall feed B", 566, 440], ["H-062", 62, "campus", "HV", "Utility-scale substation", "Grid incomer circuit breaker", 262, 200], ["H-063", 63, "campus", "HV", "Utility-scale substation", "Transformer HV disconnector", 200, 212], ["H-064", 64, "campus", "HV", "Utility-scale substation", "Transformer HV circuit breaker", 305, 198], ["L-105", 105, "campus", "LV", "Utility connection", "Utility connection panel 1", 345, 318], ["L-106", 106, "campus", "LV", "Utility connection", "Utility connection panel 2", 383, 333], ["L-107", 107, "campus", "LV", "Backup diesel generators (N+1)", "Generator 1 output breaker", 160, 402], ["L-108", 108, "campus", "LV", "Backup diesel generators (N+1)", "Generator 2 output breaker", 212, 428], ["L-109", 109, "campus", "LV", "Backup diesel generators (N+1)", "Generator 3 output breaker", 282, 458], ["L-110", 110, "campus", "LV", "Backup diesel generators (N+1)", "Generator 4 output breaker", 350, 490], ["L-111", 111, "campus", "LV", "Backup diesel generators (N+1)", "Generator 5 output breaker", 470, 520], ["L-112", 112, "campus", "LV", "Generator ATS", "ATS", 430, 442], ["L-113", 113, "campus", "LV", "Electrical room switchgear", "LV switchboard 1", 455, 318], ["L-114", 114, "campus", "LV", "Electrical room switchgear", "LV switchboard 2", 535, 268], ["L-115", 115, "campus", "LV", "Electrical room switchgear", "LV switchboard 3", 600, 232], ["L-116", 116, "campus", "LV", "Electrical room switchgear", "LV switchboard 4", 660, 210], ["L-117", 117, "campus", "LV", "Megawatt UPS systems", "UPS 1 input isolator", 590, 330], ["L-118", 118, "campus", "LV", "Megawatt UPS systems", "UPS 2 input isolator", 712, 262], ["L-119", 119, "campus", "LV", "Megawatt UPS systems", "UPS battery DC isolator", 520, 360], ["L-120", 120, "campus", "LV", "Server hall PDUs", "PDU 1", 690, 400], ["L-121", 121, "campus", "LV", "Server hall PDUs", "PDU 2", 760, 340], ["L-122", 122, "campus", "LV", "Cooling plant", "Chiller isolator", 800, 150], ["L-123", 123, "campus", "LV", "Cooling plant", "Cooling tower isolator", 1050, 150], ["L-124", 124, "campus", "LV", "Cooling plant", "Chilled water pump panel", 790, 212], ["H-065", 65, "room", "HV", "Incoming utility power and main switchgear", "Incoming utility switch", 642, 540], ["L-125", 125, "room", "LV", "Incoming utility power and main switchgear", "Main switchgear outgoing CB", 700, 625], ["L-126", 126, "room", "LV", "ATS and generator connection", "ATS", 438, 605], ["L-127", 127, "room", "LV", "ATS and generator connection", "Generator connection panel", 560, 650], ["L-128", 128, "room", "LV", "UPS system cabinets", "Wall isolator", 732, 450], ["L-129", 129, "room", "LV", "UPS system cabinets", "UPS input isolator", 820, 455], ["L-130", 130, "room", "LV", "UPS system cabinets", "UPS output isolator", 1010, 435], ["L-131", 131, "room", "LV", "Static transfer switch", "STS", 1100, 400], ["L-132", 132, "room", "LV", "Battery bank", "Battery DC isolator", 840, 840], ["L-133", 133, "room", "LV", "Remote power panels", "RPP 1", 1325, 420], ["L-134", 134, "room", "LV", "Remote power panels", "RPP 2", 1422, 445], ["L-135", 135, "room", "LV", "Power distribution units", "PDU 1", 1582, 520], ["L-136", 136, "room", "LV", "Power distribution units", "PDU 2", 1692, 570], ["L-137", 137, "room", "LV", "Dedicated cooling", "Cooling unit 1 isolator", 1265, 960], ["L-138", 138, "room", "LV", "Dedicated cooling", "Cooling unit 2 isolator", 1480, 850]];
const OUT_OF_SERVICE = {'L-047':'Hasp damaged, replacement ordered'};
DATA.keys = LOCKS.map(([id,n,dw,sys,plant,label,x,y]) => ({id,n,dw,sys,board:plant,point:label,x,y,hook:`${sys==='HV'?'C1':'C2'}-${String(n).padStart(3,'0')}`,status:OUT_OF_SERVICE[id]?'Out of service':'In cabinet',doc:'',box:'',sld:DRAWINGS[dw].title,fitted:'2026-09-15',cond:OUT_OF_SERVICE[id]||'Good'}));
const PLANTS = (() => { const m = new Map(); DATA.keys.forEach(k => { const key = `${k.dw}|${k.board}`; if(!m.has(key)) m.set(key,{key,dw:k.dw,sys:k.sys,name:k.board,ids:[]}); m.get(key).ids.push(k.id); }); return [...m.values()]; })();
/* Key status always follows the safety documents: Live → in lockout box, Pending issue → with AP */
function syncKeys(){
  DATA.keys.forEach(k => { if(k.status !== 'Out of service'){ k.status = 'In cabinet'; k.doc = ''; k.box = ''; } });
  [...DATA.ptw, ...DATA.sft].forEach(d => {
    if(d.status !== 'Live' && d.status !== 'Pending issue') return;
    (d.keys || []).forEach(id => { const k = DATA.keys.find(x => x.id === id); if(!k || k.status === 'Out of service') return; k.doc = d.id; k.box = d.box || ''; k.status = d.status === 'Live' ? 'In lockout box' : 'With AP'; });
  });
}
/* One drawing with a tappable circle on every lock.
   opts.picked: Set of lock ids chosen in the form · opts.focus: plant key to highlight · opts.sys: only this system tappable */
function drawingHTML(dw, opts = {}){
  const D = DRAWINGS[dw];
  const circles = DATA.keys.filter(k => k.dw === dw).map(k => {
    const inUse = k.doc && k.status !== 'In cabinet', oos = k.status === 'Out of service';
    const picked = opts.picked && opts.picked.has(k.id);
    const focus = opts.focus && `${k.dw}|${k.board}` === opts.focus;
    const off = opts.sys && !opts.sys.includes(k.sys);
    const cls = ['lk', k.sys === 'HV' ? 'hv' : 'lv', inUse ? 'used' : '', oos ? 'oos' : '', picked ? 'picked' : '', focus ? 'focus' : '', off ? 'off' : '', opts.highlight === k.id ? 'hl' : ''].join(' ');
    const title = `${k.id} · ${k.board} · ${k.point}${inUse ? ` · in use on ${k.doc}` : oos ? ' · out of service' : ''}`;
    return `<button type="button" class="${cls}" data-lock="${k.id}" style="left:${(k.x / D.w * 100).toFixed(3)}%;top:${(k.y / D.h * 100).toFixed(3)}%" title="${esc(title)}" aria-label="${esc(title)}">${k.n}</button>`;
  }).join('');
  return `<div class="dwgscroll"><div class="dwgbox" data-dw="${dw}" style="--dw:${D.view}px;--r:${D.r};aspect-ratio:${D.w}/${D.h}"><img src="${D.img}" alt="${esc(D.title)} single line diagram" draggable="false">${circles}</div></div>`;
}
function scrollToLocks(scroller, box, ids){
  const pts = DATA.keys.filter(k => ids.includes(k.id)); if(!pts.length) return;
  const D = DRAWINGS[pts[0].dw];
  const cx = pts.reduce((a,k) => a + k.x, 0) / pts.length / D.w * box.offsetWidth;
  const cy = pts.reduce((a,k) => a + k.y, 0) / pts.length / D.h * box.offsetHeight;
  scroller.scrollLeft = Math.max(0, cx - scroller.clientWidth / 2);
  const top = box.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop;
  scroller.scrollTop = Math.max(0, top + cy - scroller.clientHeight / 2);
}

/* ---------- Page definitions ---------- */
/* ROOT is set on each page's <body data-root="...">: '' at the top level, '../' inside a folder. */
const ROOT = document.body.dataset.root || '';
const LOGO = 'logo.png', MARK = 'mark.png';
const PAGES = {
  keys:{file:'keys.html',title:'Key tracker',code:'H · L',blurb:'Every dedicated HV and LV safety lock, its numbered hook, and where its key is right now.',
    cols:[['id','Lock no.'],['sys','System'],['board','Plant'],['point','Point of isolation'],['status','Status'],['where','Key location']]},
  info:{file:'info.html',title:'Information tracker',code:'LB',blurb:'Each lockout box and its own box lock (same number), the safety document it serves, and the keys and personal locks on it.',
    cols:[['id','Box no.'],['status','Status'],['boxlock','Box lock'],['doc','Safety document'],['keysN','Keys inside'],['plocksN','Personal locks'],['issued','Issued']]},
  ptw:{file:'ptw.html',title:'Permit to work tracker',code:'PTW',blurb:'Live, pending and cancelled permits, with their isolations and lockout boxes.',
    cols:[['id','Permit no.'],['status','Status'],['work','Work'],['loc','Location'],['cp','Competent person'],['box','Box']]},
  sft:{file:'sft.html',title:'Sanction for test tracker',code:'SFT',blurb:'Sanctions for test, the test being carried out, and the isolation that secures it.',
    cols:[['id','Sanction no.'],['status','Status'],['work','Work'],['test','Test'],['cp','Competent person'],['box','Box']]},
  loa:{file:'loa.html',title:'Limitation of access tracker',code:'LOA',blurb:'Areas with restricted access, who holds the limitation, and its boundaries.',
    cols:[['id','LOA no.'],['status','Status'],['area','Area'],['reason','Reason'],['holder','Holder'],['expiry','Expires']]},
  cp:{file:'cp.html',title:'CP register',code:'P',blurb:'Every competent person on site, their personal lock, company, contact details and authorisation.',
    cols:[['id','Lock no.'],['name','Name'],['company','Company'],['role','Role'],['phone','Phone'],['status','Status'],['expiry','Authorised until']]}
};
const NAV = [['index.html','Home','HOME','home'],['keys.html','Key tracker','H · L','keys'],['info.html','Information tracker','LB','info'],['ptw.html','Permit to work tracker','PTW','ptw'],['sft.html','Sanction for test tracker','SFT','sft'],['loa.html','Limitation of access tracker','LOA','loa'],['cp.html','CP register','P','cp'],['new.html','New safety document','NEW','new'],['lv-schematic.html','Schematics','SLD','schematic'],['procedure.html','System procedure','STEPS','procedure']];
const U = path => ROOT + path;

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
const SETS = Object.keys(DATA);
function find(id){ id = String(id||'').toUpperCase(); for(const s of SETS){ const r = DATA[s].find(x => x.id.toUpperCase() === id); if(r) return {set:s, r}; } return null; }
const recUrl = id => U(`record.html?id=${encodeURIComponent(id)}`);
const link = id => !id ? '' : find(id) ? `<a href="${recUrl(id)}">${esc(id)}</a>` : `<span>${esc(id)}</span>`;
const person = s => { const m = String(s||'').match(/P-\d{3}/); return m && find(m[0]) ? esc(s).replace(m[0], `<a href="${recUrl(m[0])}" class="plink">${m[0]}</a>`) : esc(s); };
const linkList = ids => ids && ids.length ? `<div class="links">${ids.map(link).join('')}</div>` : '<p>None</p>';
function chipClass(s){
  if(s==='In cabinet' || s==='Active') return 's-good';
  if(s==='Expired') return 's-crit';
  if(s==='Suspended') return 's-warn';
  if(s==='Cancelled') return 's-idle';
  if(['Live','In use','In lockout box'].includes(s)) return 's-hot';
  if(['With AP','Pending issue'].includes(s)) return 's-warn';
  if(s==='Out of service') return 's-crit';
  return 's-idle';
}
const chip = s => `<span class="chip ${chipClass(s)}">${esc(s)}</span>`;
const sys = s => String(s || '').split(/\s*&\s*/).filter(Boolean).map(x => `<span class="sys ${x.toLowerCase()}">${x}</span>`).join(' ');

/* ---------- Header, menu, footer ---------- */
function shell(page, heroHtml, mainHtml){
  const nav = NAV.map(([href,label,code,key]) => `<a href="${U(href)}"${key===page?' aria-current="page"':''}>${label}<small>${code}</small></a>`).join('');
  document.body.innerHTML = `
  <header class="site-head"><div class="wrap">
    <a href="${U('index.html')}" aria-label="Powertec Isolation Control home"><span class="brand"><img class="brand-logo" src="logo-stack.png" alt="Powertec"><span class="brand-name">ISOLATION CONTROL</span></span></a>
    <button class="menu-btn" id="openMenu" aria-label="Open menu" aria-expanded="false" aria-controls="menu">${I.burger}</button>
  </div></header>
  <div class="menu" id="menu" hidden role="dialog" aria-label="Menu">
    <div class="top"><span class="brand"><img class="brand-logo" src="logo-stack.png" alt="Powertec"><span class="brand-name">ISOLATION CONTROL</span></span><button class="menu-btn" id="closeMenu" aria-label="Close menu">${I.close}</button></div>
    <nav>${nav}</nav>
    <p class="note">Powertec Isolation Control · AP office key, lock and safety document control</p>
  </div>
  ${heroHtml}
  <main>${mainHtml}</main>
  <footer class="site-foot"><div class="wrap">
    <a class="foot-brand" href="${U('index.html')}"><img src="${MARK}" alt=""><span><b>powertec</b><small>isolation control</small></span></a>
    <nav class="foot-nav">${NAV.map(([href,label,code]) => `<a href="${U(href)}">${code==='HOME'?'Home':code}</a>`).join('')}</nav>
    <p class="foot-legal">© ${new Date().getFullYear()} Powertec Utilities Ltd. Registered in England &amp; Wales, company no. 08117942. Records shown are example data. Version 6.</p>
  </div></footer>`;
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

/* ---------- Home ---------- */
function home(){
  const n = (set, st) => DATA[set].filter(r => r.status===st).length;
  const card = key => { const p = PAGES[key]; return `<a class="card" href="${U(p.file)}"><div class="ico">${ICON_FOR[key]}</div><div><h3>${p.title}</h3><p>${p.blurb}</p><div class="n">${DATA[key].length} records · ${p.code}</div><span class="more">Open tracker ${I.arrow}</span></div></a>`; };
  const hero = `
  <section class="hero home"><div class="wrap">
    <div class="kicker">AP OFFICE KEY &amp; SAFETY DOCUMENT CONTROL</div>
    <h1 class="mega">One lock on every switch. Every key accounted for.</h1>
    <p class="sub">A structured lock and key system for data centre AP offices: a dedicated numbered lock on every point of isolation, and a register that shows where every key is.</p>
    <p class="lead">When a key leaves its hook, a tag takes its place. Every permit, sanction and limitation of access shows exactly which locks, which lockout box and which competent person it relies on.</p>
    <div class="textlinks">
      <a href="${U('keys.html')}">Open key tracker <span>→</span></a>
      <a href="${U('new.html')}">New safety document <span>→</span></a>
    </div>
  </div></section>`;
  const main = `
  <section class="block"><div class="wrap">
    <div class="block-head"><div class="eyebrow">Site status now</div><h2>Live on site.</h2></div>
    <div class="stats" style="margin-top:0;margin-bottom:12px" aria-label="Site status now">
      <div><b class="hot">${n('ptw','Live')}</b><span>Live permits</span></div>
      <div><b class="hot">${n('keys','In lockout box')}</b><span>Keys in lockout boxes</span></div>
      <div><b>${n('keys','With AP')}</b><span>Keys with an AP</span></div>
      <div><b>${n('sft','Live')}</b><span>Live sanctions for test</span></div>
      <div><b>${n('loa','Live')}</b><span>Live limitations of access</span></div>
      <div><b>${n('keys','Out of service')}</b><span>Locks out of service</span></div>
    </div>
    <span class="example" style="margin:0 0 56px">Showing example data</span>
    <div class="block-head"><div class="eyebrow">Trackers</div><h2>Every key, permit and sanction in one place.</h2><p class="lead">Select a tracker, then select any line to open its full record.</p></div>
    <div class="cards">
      ${card('keys')}${card('info')}${card('ptw')}${card('sft')}${card('loa')}${card('cp')}
      <a class="card" href="${U('lv-schematic.html')}"><div class="ico">${I.sld}</div><div><h3>Schematics</h3><p>Two single line diagrams with a numbered lock circle beside every switch, CB and isolator: red HV, blue LV.</p><div class="n">Reference drawing · SLD</div><span class="more">View schematic ${I.arrow}</span></div></a>
      <a class="card" href="${U('procedure.html')}"><div class="ico">${I.plan.replace('viewBox="0 0 24 24"','viewBox="0 0 24 24" style="width:64px;height:64px"').replace('stroke-width="2"','stroke-width="1.2"')}</div><div><h3>System procedure</h3><p>Step by step: plan, draw keys, isolate, secure, issue, work, cancel. Plus handover, audits and lost keys.</p><div class="n">7 stages · STEPS</div><span class="more">View procedure ${I.arrow}</span></div></a>
    </div>
  </div></section>
  <section class="block alt"><div class="wrap">
    <div class="block-head"><div class="eyebrow">How it works</div><h2>Our system is built on four fundamentals.</h2></div>
    <div class="trio">
      <div>${I.lock}<b>Dedicated locks</b><p>One numbered lock per switch, shown in a circle on the SLD.</p></div>
      <div>${I.tag}<b>Key-out tags</b><p>An empty hook always carries a tag: permit, box, AP and time.</p></div>
      <div>${I.people}<b>Personal locks</b><p>Each CP gets their own numbered lock at CP training.</p></div>
      <div>${I.shield}<b>One register</b><p>Locks, boxes, people and documents tied together in one record.</p></div>
    </div>
  </div></section>`;
  shell('home', hero, main);
}

/* ---------- Tracker pages ---------- */
function cell(r, key){
  switch(key){
    case 'id': return `<a href="${recUrl(r.id)}" class="mono">${esc(r.id)}</a>`;
    case 'status': return chip(r.status);
    case 'sys': return sys(r.sys);
    case 'where': return r.status==='In cabinet' ? `Hook <span class="mono">${esc(r.hook)}</span>` : r.box ? `<span class="mono">${esc(r.box)} · ${esc(r.doc)}</span>` : r.status==='With AP' ? `With AP · <span class="mono">${esc(r.doc)}</span>` : 'Withdrawn';
    case 'keysN': return r.keys.length ? `<span class="mono">${r.keys.join(', ')}</span>` : '—';
    case 'boxlock': return r.status === 'In use' ? `<span class="mono">${esc(r.id)}</span> · fitted` : r.status === 'Out of service' ? `<span class="mono">${esc(r.id)}</span> · withdrawn` : `<span class="mono">${esc(r.id)}</span> · in bay`;
    case 'plocksN': return r.plocks.length ? `<span class="mono">${r.plocks.join(', ')}</span>` : '—';
    case 'doc': case 'box': case 'issued': case 'expiry': return r[key] ? `<span class="mono">${esc(r[key])}</span>` : '—';
    default: return esc(r[key]) || '—';
  }
}
function tracker(key){
  const p = PAGES[key], rows = DATA[key];
  const statuses = ['All', ...new Set(rows.map(r => r.status))];
  const hero = pageHero(`<a href="${U('index.html')}">Home</a><span>/</span><span>${p.title}</span>`, `Tracker · ${p.code}`, p.title, p.blurb, `${['ptw','sft','loa'].includes(key) ? `<div class="cta" style="margin-top:22px"><a class="btn primary" href="${U('new.html')}?type=${key.toUpperCase()}">+ New ${key.toUpperCase()}</a></div>` : ''}<span class="example">Showing example data</span>`);
  const main = `<section class="block"><div class="wrap">
    <div class="toolbar">
      <label class="search">${I.search}<input id="q" type="search" placeholder="Search number, board, name…" aria-label="Search ${p.title}"></label>
      <div class="filters" role="group" aria-label="Filter by status">${statuses.map((s,i)=>`<button type="button" data-f="${esc(s)}" aria-pressed="${i===0}">${esc(s)}</button>`).join('')}</div>
    </div>
    <div class="count" id="count"></div>
    <div class="tablebox"><table>
      <thead><tr>${p.cols.map(c=>`<th scope="col">${c[1]}</th>`).join('')}<th scope="col"><span style="position:absolute;left:-9999px">Open record</span></th></tr></thead>
      <tbody id="rows"></tbody>
    </table></div>
  </div></section>`;
  shell(key, hero, main);
  let q = '', f = 'All';
  const tbody = document.getElementById('rows'), count = document.getElementById('count');
  function draw(){
    const ql = q.toLowerCase();
    const shown = rows.filter(r => (f==='All' || r.status===f) && (!ql || JSON.stringify(r).toLowerCase().includes(ql)));
    count.textContent = `${shown.length} of ${rows.length} records`;
    tbody.innerHTML = shown.length ? shown.map(r => `<tr data-id="${esc(r.id)}" tabindex="0">${p.cols.map(c=>`<td data-label="${c[1]}">${cell(r,c[0])}</td>`).join('')}<td class="go"><span>Open →</span></td></tr>`).join('')
      : `<tr><td class="empty" colspan="${p.cols.length+1}">No records match. Clear the search or choose another status.</td></tr>`;
  }
  tbody.addEventListener('click', e => { const tr = e.target.closest('tr[data-id]'); if(tr && !e.target.closest('a')) location.href = recUrl(tr.dataset.id); });
  tbody.addEventListener('keydown', e => { const tr = e.target.closest('tr[data-id]'); if(tr && (e.key==='Enter' || e.key===' ')){ e.preventDefault(); location.href = recUrl(tr.dataset.id); } });
  document.getElementById('q').addEventListener('input', e => { q = e.target.value; draw(); });
  document.querySelectorAll('.filters button').forEach(b => b.addEventListener('click', () => {
    f = b.dataset.f; document.querySelectorAll('.filters button').forEach(x => x.setAttribute('aria-pressed', String(x===b))); draw();
  }));
  draw();
}

/* ---------- Record (detail) page ---------- */
const fields = list => `<dl class="fields">${list.map(([k,v,w]) => `<div class="field${w?' wide':''}"><dt>${k}</dt><dd>${v || '—'}</dd></div>`).join('')}</dl>`;
const mono = v => v ? `<span class="mono">${esc(v)}</span>` : '';
function logPanel(id){
  const L = id && LOGS[id];
  return `<div class="panel"><h3>Activity log</h3>${L ? `<ol class="log">${L.map(([t,m]) => `<li><time>${esc(t)}</time><span>${esc(m)}</span></li>`).join('')}</ol>` : '<p>No movements recorded.</p>'}</div>`;
}
function record(){
  const id = new URLSearchParams(location.search).get('id');
  const hit = find(id);
  if(!hit){
    shell('', pageHero(`<a href="${U('index.html')}">Home</a>`, 'Record', 'Record not found', `No record matches “${esc(id || '')}”. Open a tracker and select a line.`, `<div class="cta"><a class="btn primary" href="${U('keys.html')}">Open key tracker ${I.arrow}</a></div>`), '');
    return;
  }
  const {set, r} = hit, p = PAGES[set];
  let body = '', side = '';
  if(set==='keys'){
    body = fields([['Lock no.',mono(r.id)],['System',sys(r.sys)],['Board',esc(r.board)],['Cabinet hook',mono(r.hook)],['Point of isolation',esc(r.point),1],['Drawing',`<a class="plink" href="${U('lv-schematic.html')}?lock=${esc(r.id)}">${esc(r.sld)} · view on drawing →</a>`],['Lock fitted',mono(r.fitted)],['Condition',esc(r.cond),1]]);
    const tag = (r.status==='In lockout box' || r.status==='With AP') ? `<div class="hooktag"><b>KEY-OUT TAG · HOOK ${esc(r.hook)}</b><div><span>Lock / key</span><span class="mono">${esc(r.id)}</span></div><div><span>Status</span><span>${esc(r.status.toUpperCase())}</span></div><div><span>Lockout box</span><span class="mono">${esc(r.box || '—')}</span></div><div><span>Document</span><span class="mono">${esc(r.doc)}</span></div></div>`
      : r.status==='Out of service' ? '<p>Hook empty. Lock withdrawn from service; see condition.</p>' : `<p>Key is on hook <span class="mono">${esc(r.hook)}</span>.</p>`;
    side = `<div class="panel"><h3>Hook ${esc(r.hook)}</h3>${tag}</div><div class="panel"><h3>Linked records</h3>${linkList([r.doc, r.box].filter(Boolean))}</div>${r.doc ? logPanel(r.doc) : ''}`;
  }
  if(set==='info'){
    body = fields([['Box no.',mono(r.id)],['Cabinet 3 bay',mono(r.bay)],['Safety document',link(r.doc)],['Issued',mono(r.issued)],['Box lock',`<span class="mono">${esc(r.id)}</span> lock, key <span class="mono">${esc(r.id)}</span> · ${r.status === 'In use' ? 'fitted to the box' : r.status === 'Out of service' ? 'withdrawn with the box' : 'stored with the box in its bay'}`,1],['Box lock key held by',r.status === 'In use' ? person(r.aplock) : `Stored in Cabinet 3, bay <span class="mono">${esc(r.bay)}</span>`,1],['Isolation keys inside',r.keys.length?linkList(r.keys):'',1],['Personal locks applied',r.plocks.length?linkList(r.plocks):'',1]]);
    side = `<div class="panel"><h3>Box can be opened when</h3><p>${r.plocks.length ? `All ${r.plocks.length} personal locks have been removed by their holders, then the AP unlocks box lock ${esc(r.id)}.` : 'Box is empty and not in use.'}</p></div><div class="panel"><h3>Box lock ${esc(r.id)}</h3><div class="boxtag"><b>${esc(r.id)}</b><span>Box, box lock and its key all carry the same number, so the right key always goes with the right box.</span></div></div>${r.doc ? logPanel(r.doc) : ''}`;
  }
  if(set==='ptw' || set==='sft'){
    body = fields([[set==='ptw'?'Permit no.':'Sanction no.',mono(r.id)],['System',sys(r.sys)],['Work',esc(r.work),1],...(set==='sft'?[['Test',esc(r.test),1]]:[]),['Location',esc(r.loc),1],['Issued by',esc(r.ap)],['Competent person',person(r.cp)],['Issued',mono(r.issued)],['Expires',mono(r.expiry)],['Isolation locks',linkList(r.keys),1],['Lockout box',link(r.box)],['Limitation of access',link(r.loa)],...(r.notes?[['Notes',esc(r.notes),1]]:[])]);
    side = cpPanel(r.cp,'Competent person') + cancelPanel(r) + logPanel(r.id);
  }
  if(set==='loa'){
    body = fields([['LOA no.',mono(r.id)],['Linked permit',link(r.ptw)],['Area',esc(r.area),1],['Reason',esc(r.reason),1],['Boundaries',esc(r.bounds),1],['Issued by',esc(r.ap)],['Holder',person(r.holder)],['Issued',mono(r.issued)],['Expires',mono(r.expiry)],...(r.notes?[['Notes',esc(r.notes),1]]:[])]);
    side = cpPanel(r.holder,'LOA holder') + cancelPanel(r) + logPanel(r.id);
  }
  if(set==='cp'){
    const docs = [...DATA.ptw.map(d=>[d,d.cp]), ...DATA.sft.map(d=>[d,d.cp]), ...DATA.loa.map(d=>[d,d.holder])].filter(([d,c]) => String(c).includes(r.id)).map(([d]) => d);
    const boxes = DATA.info.filter(b => b.plocks.includes(r.id) || String(b.aplock).includes(r.id));
    const live = docs.filter(d => d.status==='Live');
    body = fields([['Personal lock no.',mono(r.id)],['Role',esc(r.role)],['Name',esc(r.name)],['Company',esc(r.company)],['Phone',`<span class="mono">${esc(r.phone)}</span>`],['Email',`<span class="mono">${esc(r.email)}</span>`],['ID06 card',mono(r.id06)],['Emergency contact',esc(r.emergency)],['Authorised for',esc(r.scope),1],['CP training completed',mono(r.trained)],['Authorised by',esc(r.authBy)],['Authorised until',mono(r.expiry)],['Status',chip(r.status)]]);
    side = `<div class="panel cppanel"><h3>Contact</h3>${cpCard(r, false)}</div><div class="panel"><h3>Lock on site now</h3>${boxes.length ? `<p>Personal lock is on ${boxes.map(b=>link(b.id)).join(', ')}.</p>` : '<p>Not on any lockout box.</p>'}</div>
      <div class="panel"><h3>Live documents</h3>${live.length ? linkList(live.map(d=>d.id)) : '<p>None</p>'}</div>
      <div class="panel"><h3>Document history</h3>${docs.length ? linkList(docs.map(d=>d.id)) : '<p>None recorded</p>'}</div>
      ${r.status!=='Active' ? `<div class="panel" style="border-color:var(--crit)"><h3 style="color:var(--crit)">Not to receive documents</h3><p>Authorisation is ${r.status.toLowerCase()}. Do not issue a PTW, SFT or LOA to this person.</p></div>` : ''}`;
  }
  const titles = {cp:r.name, keys:r.point, info:r.doc ? `Serving ${r.doc}` : 'Lockout box', ptw:r.work, sft:r.work, loa:r.area};
  document.title = `${r.id} · Powertec Isolation Control`;
  const hero = `<section class="hero"><span class="orb" aria-hidden="true"></span><div class="wrap">
    <nav class="crumbs"><a href="${U('index.html')}">Home</a><span>/</span><a href="${U(p.file)}">${p.title}</a><span>/</span><span>${esc(r.id)}</span></nav>
    <div class="rec-head"><div><div class="rec-id">${esc(r.id)}</div><h1 style="font-size:clamp(28px,4.4vw,46px)">${esc(titles[set])}</h1><span class="example">${r.local ? 'Issued on this device' : 'Example record'}</span></div>${chip(r.status)}</div>
    ${new URLSearchParams(location.search).get('created') ? `<p class="saved">${esc(r.id)} issued and saved on this device. The keys and lockout box are now shown against it in the trackers.</p>` : ''}
  </div></section>`;
  const main = `<section class="block"><div class="wrap">
    <div class="rec-grid"><div>${body}</div><aside class="side">${side}</aside></div>
    <a class="back" href="${U(p.file)}">← Back to ${p.title}</a>
  </div></section>`;
  shell(set, hero, main);
  wireRecord(r);
}

/* ---------- LV schematic ---------- */
function schematic(){
  const q = new URLSearchParams(location.search), hl = (q.get('lock') || '').toUpperCase();
  const hlKey = DATA.keys.find(k => k.id === hl);
  const used = DATA.keys.filter(k => k.doc).length;
  const hero = pageHero(`<a href="${U('index.html')}">Home</a><span>/</span><span>Schematics</span>`, 'Drawings · Live lock status', 'Schematics and layouts', 'Every switch, circuit breaker and isolator on the single line diagrams and site layouts has its dedicated lock number: red for HV, blue for LV. Numbers in use on a live or pending safety document are greyed out and struck through. Tap one to open its document; tap a free number to see the lock.');
  const fig = dw => { const D = DRAWINGS[dw], ks = DATA.keys.filter(k => k.dw === dw); const h = ks.filter(k => k.sys === 'HV').length, l = ks.length - h, u = ks.filter(k => k.doc).length;
    return `<figure class="dwg"><figcaption><div><span class="kicker orange" style="margin:0 0 6px;display:block">${D.kind}</span><h3>${D.title}</h3><p>${h} HV and ${l} LV locks · ${u} in use</p></div><div class="dwg-count"><span class="pill hv">H-${String(ks.find(k=>k.sys==='HV').n).padStart(3,'0')} to H-${String([...ks].reverse().find(k=>k.sys==='HV').n).padStart(3,'0')}</span><span class="pill lv">L-${String(ks.find(k=>k.sys==='LV').n).padStart(3,'0')} to L-${String([...ks].reverse().find(k=>k.sys==='LV').n).padStart(3,'0')}</span></div></figcaption>${drawingHTML(dw, {highlight:hl})}<p class="dwg-hint">Drag or scroll the drawing to move around it.</p></figure>`; };
  const main = `<section class="block"><div class="wrap">
    <div class="plegend static"><span><i class="lk hv mini">1</i>HV lock, free</span><span><i class="lk lv mini">1</i>LV lock, free</span><span><i class="lk hv mini used">1</i>In use: tap to open the document</span><span><i class="lk lv mini oos">1</i>Out of service</span></div>
    <p class="hint" style="margin:10px 0 24px">${used} of ${DATA.keys.length} locks are in use right now.${hlKey ? ` Showing <b>${hlKey.id}</b>, ${esc(hlKey.board)} · ${esc(hlKey.point)}.` : ''}</p>
    <div class="dwgs">${Object.keys(DRAWINGS).map(fig).join('')}</div>
  </div></section>`;
  shell('schematic', hero, main);
  document.querySelectorAll('.dwgbox').forEach(box => box.addEventListener('click', e => {
    const b = e.target.closest('.lk'); if(!b) return;
    const k = DATA.keys.find(x => x.id === b.dataset.lock);
    location.href = recUrl(k.doc || k.id);
  }));
  if(hlKey) requestAnimationFrame(() => {
    const box = document.querySelector(`.dwgbox[data-dw="${hlKey.dw}"]`), sc = box.parentElement;
    box.closest('.dwg').scrollIntoView({block:'start'}); scrollToLocks(sc, box, [hlKey.id]);
  });
}

/* ---------- System procedure (step-by-step plan of the system) ---------- */
const STAGES = [
  {k:'plan',name:'Plan the isolation',who:'AP',icon:'ptw',
   steps:['Mark the points of isolation and earthing on a copy of the SLD. Read the circled lock number beside each switch.','Write the switching programme, listing every point with its lock number, for example LV-MSB-B ACB Q1 · L-121.','Open the Key tracker and check every listed lock shows IN CABINET.','Open the CP register and check the CP who will receive the document is Active and authorised for this system.'],
   site:'No change yet. The switching programme is ready.',
   stop:'Any lock not IN CABINET, or a CP not Active: stop and resolve before going on.'},
  {k:'draw',name:'Draw the keys and a lockout box',who:'AP',icon:'key',
   steps:['Take each key from its numbered hook in Cabinet 1 (HV) or Cabinet 2 (LV).','Hang a key-out tag on each empty hook: lock no., status WITH AP, document no., your name, time.','Take a free lockout box from Cabinet 3 and tag its empty bay the same way.'],
   site:'Key tracker: each key → With AP. Information tracker: box → In use, against the document number.',
   stop:'Every empty hook and bay carries a tag before you leave the AP office.'},
  {k:'isolate',name:'Isolate, lock and earth',who:'AP',icon:'lock',
   steps:['Carry out the switching programme in order.','At each point, fit its dedicated lock. Check the number on the lock matches the switch label and the SLD.','Prove dead and apply earths as the safety rules require. Lock earth switches with their own dedicated locks.','Post caution and danger notices.'],
   site:'No change. Keys stay in the AP\'s hand.',
   stop:'A lock number that does not match the label or SLD: stop. Do not fit a different lock.'},
  {k:'secure',name:'Secure the keys',who:'AP',icon:'box',
   steps:['Place every isolation key in the lockout box. Count them against the switching programme.','Close the box and lock it with its own box lock. The box, its lock and the lock key all carry the same number (for example box LB-06, lock LB-06, key LB-06). Keep the box lock key.','Update each hook tag from WITH AP to IN LOCKOUT BOX, LB-nn.'],
   site:'Key tracker: each key → In lockout box, LB-nn. Information tracker: box lock fitted, key held by the issuing AP.',
   stop:'Key count must match the switching programme exactly.'},
  {k:'issue',name:'Issue the safety document',who:'AP and CP',icon:'ptw',
   steps:['Raise the PTW or SFT with + New safety document. Under Points of isolation choose HV, LV or both, pick the plant, then tap each lock number on the drawing.','At the point of work, show the CP the isolation, earths and notices, and brief the work.','Issue the document. The CP signs receipt.','The CP and every member of the working party fit their own personal lock to the lockout box. Record each P-number on the document.'],
   site:'PTW or SFT tracker: document → Live. Information tracker: personal locks recorded. CP register: document shown against the CP.',
   stop:'Nobody works without their own lock on the box.'},
  {k:'work',name:'During the work',who:'CP and working party',icon:'people',
   steps:['The CP keeps the working party within the limits of the document.','A person joining fits their own lock and is added to the document. A person leaving removes their own lock and is signed off.','Nobody removes another person\'s lock, for any reason.','Where live equipment is close by, the AP issues a Limitation of Access with clear boundaries.'],
   site:'Information tracker: personal locks added or removed. LOA tracker: LOA → Live if issued.',
   stop:'The box cannot be opened while any personal lock is on it.'},
  {k:'cancel',name:'Cancel and restore',who:'CP then AP',icon:'shield',
   steps:['The CP confirms the work is complete, the working party is withdrawn, and signs the document for cancellation.','Each person removes their own personal lock.','The AP unlocks the box lock (same number as the box), opens the box and counts the keys against the document.','Remove earths and locks, and restore the system as per the switching programme.','Return each key to its own numbered hook and remove the key-out tag. Return the box to its bay.'],
   site:'Key tracker: each key → In cabinet. Information tracker: box → In cabinet. PTW/SFT/LOA tracker: → Cancelled.',
   stop:'Tag, hook and tracker must agree before the AP leaves the office.'}
];
const ROUTINES = [
  {name:'Shift handover',who:'Outgoing and incoming AP',steps:['Check together: empty hooks against tags, against the Key tracker, against live documents.','Resolve any difference before the outgoing AP leaves.','Both APs sign the handover entry.']},
  {name:'Daily check',who:'AP on duty · 5 minutes',steps:['Every empty hook has a tag.','Every tag matches the Key tracker and a live document.','Every lockout box out of Cabinet 3 is tied to a live document.']},
  {name:'Weekly walk-down',who:'AP',steps:['Pick 10% of fitted locks on site.','Check lock number against switch label against SLD.','Record the result; correct any error the same day.']},
  {name:'Monthly reconciliation',who:'Lead SAP',steps:['Reconcile every tracker and the CP register.','Check CP authorisations due to expire in the next 30 days.','Review incidents and near misses.']},
  {name:'Lost key or unknown lock',who:'AP and lead SAP',steps:['Stop. Treat the isolation as uncertain; do not issue or cancel against it.','Tell the lead SAP and record an incident.','Under SAP control re-prove the isolation, then remove the lock by an approved method.','Fit a new lock with a new number; update the label, the SLD and the Key tracker. Retire the old number.']},
  {name:'New CP joins site',who:'Lead SAP',steps:['Confirm CP training is complete and the authorisation is signed.','Issue the next free personal lock and engrave the P-number.','Add the person to the CP register with their contact details.']}
];
function procedure(){
  let n = 0;
  const hero = pageHero(`<a href="${U('index.html')}">Home</a><span>/</span><span>System procedure</span>`, 'System procedure · Step by step', 'How the system works', 'Every safety document follows the same seven stages, from planning the isolation to returning the last key to its hook. Each stage says who does it, what changes in the trackers, and when to stop.');
  const bar = `<div class="phasebar" style="grid-template-columns:repeat(${STAGES.length},minmax(118px,1fr))">${STAGES.map((s,i) => `<a href="#stage-${s.k}"><b>${i+1}</b><span>${s.name}</span><small>${s.who}</small></a>`).join('')}</div>`;
  const cards = STAGES.map((s,i) => `
    <article class="phase" id="stage-${s.k}">
      <div class="pnum">${i+1}</div>
      <div class="pbody">
        <div class="pmeta"><span>Stage ${i+1} of ${STAGES.length}</span><span>Done by: ${s.who}</span></div>
        <h3>${s.name}</h3>
        <div class="pcols">
          <div><h4>Steps</h4><ol class="steps-list">${s.steps.map(t => `<li><span class="sn">${++n}</span><span>${esc(t)}</span></li>`).join('')}</ol></div>
          <div><h4>On this site</h4><p class="site-note">${esc(s.site)}</p></div>
        </div>
        <p class="gate"><b>Stop check</b>${esc(s.stop)}</p>
      </div>
    </article>`).join('');
  const routines = ROUTINES.map(r => `<div class="panel"><h3>${r.name}</h3><div class="pmeta" style="margin-bottom:12px"><span>${r.who}</span></div><ol class="mini">${r.steps.map(t=>`<li>${esc(t)}</li>`).join('')}</ol></div>`).join('');
  const statuses = [['In cabinet','Key on its own hook. Free to use.'],['With AP','Drawn for a document, being taken out to the switch. Never left overnight.'],['In lockout box','Inside a box under a live document. Box locked by AP and working party.'],['Out of service','Lock damaged or under replacement. Hook carries a tag.']];
  const main = `
  <section class="block"><div class="wrap">
    <div class="block-head"><div class="eyebrow">Stages</div><h2>One document, seven stages.</h2><p class="lead">The same stages apply to a Permit to Work and a Sanction for Test. Tap a stage to jump to it.</p></div>
    <div class="barbox">${bar}</div>
    <div class="phases">${cards}</div>
  </div></section>
  <section class="block alt"><div class="wrap">
    <div class="block-head"><div class="eyebrow">Routines</div><h2>Keeping the system right.</h2></div>
    <div class="routines">${routines}</div>
  </div></section>
  <section class="block"><div class="wrap">
    <div class="block-head"><div class="eyebrow">Quick reference</div><h2>What each key status means.</h2></div>
    <div class="tablebox plain"><table><thead><tr><th scope="col">Status</th><th scope="col">Meaning</th></tr></thead><tbody>${statuses.map(([s,m]) => `<tr><td data-label="Status">${chip(s)}</td><td data-label="Meaning">${m}</td></tr>`).join('')}</tbody></table></div>
  </div></section>`;
  shell('procedure', hero, main);
}

/* ---------- New safety documents (saved on this device) ----------
   Every new PTW, SFT or LOA, and every cancellation, is stored as an event in this browser's
   storage and replayed over the example data each time a page opens. */
const STORE = 'pt-events-v1';
function loadEvents(){ try { return JSON.parse(localStorage.getItem(STORE) || '[]'); } catch(_) { return []; } }
function saveEvents(ev){ try { localStorage.setItem(STORE, JSON.stringify(ev)); return true; } catch(_) { return false; } }
function addEvent(e){ const ev = loadEvents(); ev.push(e); return saveEvents(ev); }
function stamp(d = new Date()){ const p = n => String(n).padStart(2,'0'); return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`; }
const hhmm = s => String(s).slice(11);
const docSet = id => id.startsWith('PTW') ? 'ptw' : id.startsWith('SFT') ? 'sft' : 'loa';
function applyEvent(e){
  if(e.op === 'create'){
    const d = e.doc, set = docSet(d.id);
    if(DATA[set].some(x => x.id === d.id)) return;
    d.local = true; DATA[set].unshift(d);
    (d.keys || []).forEach(k => { const r = DATA.keys.find(x => x.id === k); if(r){ r.status = 'In lockout box'; r.doc = d.id; r.box = d.box; } });
    if(d.box){ const b = DATA.info.find(x => x.id === d.box); if(b){ b.status = 'In use'; b.doc = d.id; b.keys = [...(d.keys || [])]; b.aplock = d.apLock || ''; b.plocks = [...(d.plocks || [])]; b.issued = d.issued; } }
    if(set === 'loa' && d.ptw){ const p = DATA.ptw.find(x => x.id === d.ptw); if(p) p.loa = d.id; }
    LOGS[d.id] = (LOGS[d.id] || []).concat(e.log || []);
  }
  if(e.op === 'cancel'){
    const hit = find(e.id); if(!hit || hit.r.status === 'Cancelled') return;
    const d = hit.r; d.status = 'Cancelled';
    (d.keys || []).forEach(k => { const r = DATA.keys.find(x => x.id === k); if(r && r.doc === d.id){ r.status = 'In cabinet'; r.doc = ''; r.box = ''; } });
    if(d.box){ const b = DATA.info.find(x => x.id === d.box); if(b && b.doc === d.id){ b.status = 'In cabinet'; b.doc = ''; b.keys = []; b.aplock = ''; b.plocks = []; b.issued = ''; } }
    LOGS[d.id] = (LOGS[d.id] || []).concat([[hhmm(e.at), `${d.id} cancelled by ${e.by}. ${d.keys && d.keys.length ? 'Keys returned to their hooks' : 'Boundaries removed'}${d.box ? `, ${d.box} returned to its bay` : ''}.`]]);
  }
}

/* Dropdown lists. Edit these to suit the site. */
const OPTIONS = {
  ptwWork:['Replace protection relay','Busbar joint inspection and re-torque','Thermographic remedial work','Circuit breaker maintenance','Cable termination','Install additional outgoing way','UPS module replacement','Battery string replacement','Transformer maintenance','Switchgear cleaning and inspection'],
  sftWork:['Insulation resistance test, cable','Primary injection test, ACB','Secondary injection test, protection relay','Continuity test, cable','Contact resistance test, circuit breaker','VLF withstand test, HV cable','Load bank test, UPS'],
  sftTest:['Insulation resistance, 500 V DC','Insulation resistance, 1000 V DC','Primary current injection','Secondary current injection','Continuity','Contact resistance (ductor)','VLF withstand','Load bank'],
  locations:['Data centre electrical room','HV substation A','HV substation B','LV switchroom A','LV switchroom B','UPS room A','UPS room B','Battery room A','Battery room B','Mechanical plant room A','Mechanical plant room B','Data hall 1','Data hall 2'],
  loaReason:['Live equipment next to the work area','Visual inspection, no contact','Survey, non-electrical','Fire detection works','Cleaning, no contact','Escorted visit'],
  loaBounds:['Barrier and signage at the boundary; no entry beyond','Inspection walkway only; panel and rack doors stay shut','Ceiling void access from walkway only','Escorted access only, AP present'],
  duration:[['End of shift (18:00)','eos'],['4 hours',4],['8 hours',8],['12 hours',12],['24 hours',24],['48 hours',48]]
};
const opts = (list, ph) => `<option value="">${ph}</option>` + list.map(o => Array.isArray(o) ? `<option value="${esc(o[1])}">${esc(o[0])}</option>` : `<option value="${esc(o)}">${esc(o)}</option>`).join('');
const cpLabel = c => `${c.name} · ${c.company} · ${c.id}`;
function nextId(prefix){
  const yr = new Date().getFullYear(), set = DATA[docSet(prefix)];
  const max = set.map(d => +String(d.id).split('-')[2] || 0).reduce((a,b) => Math.max(a,b), 0);
  return `${prefix}-${yr}-${String(max + 1).padStart(4,'0')}`;
}
function expiryFrom(v){
  const d = new Date();
  if(v === 'eos'){ d.setHours(18,0,0,0); if(d < new Date()) d.setDate(d.getDate()+1); }
  else d.setHours(d.getHours() + Number(v));
  return stamp(d);
}

function newDoc(){
  const qType = (new URLSearchParams(location.search).get('type') || '').toUpperCase();
  const people = DATA.cp;
  const aps = people.filter(c => ['AP','SAP'].includes(c.role) && c.status === 'Active');
  const cpOptions = people.filter(c => c.role === 'CP').map(c => `<option value="${c.id}"${c.status !== 'Active' ? ' disabled' : ''}>${esc(cpLabel(c))}${c.status !== 'Active' ? ` (${c.status.toLowerCase()})` : ''}</option>`).join('');
  const hero = pageHero(`<a href="${U('index.html')}">Home</a><span>/</span><span>New safety document</span>`, 'Issue · PTW · SFT · LOA', 'New safety document', 'Choose each item from its list. Only locks on their hooks, free lockout boxes and active CPs can be chosen.');
  const main = `<section class="block"><div class="wrap">
    <form class="docform" id="docform" novalidate>
      <div class="fgroup"><h3>1 · Document</h3><div class="fgrid">
        <label class="f"><span>Document type *</span><select id="f-type" required>${opts([['Permit to Work (PTW)','PTW'],['Sanction for Test (SFT)','SFT'],['Limitation of Access (LOA)','LOA']],'Choose a document type')}</select></label>
        <label class="f" data-for="PTW"><span>Work *</span><select id="f-work-ptw">${opts(OPTIONS.ptwWork,'Choose the work')}</select></label>
        <label class="f" data-for="SFT"><span>Work *</span><select id="f-work-sft">${opts(OPTIONS.sftWork,'Choose the work')}</select></label>
        <label class="f" data-for="SFT"><span>Test *</span><select id="f-test">${opts(OPTIONS.sftTest,'Choose the test')}</select></label>
        <label class="f" data-for="PTW SFT"><span>Location *</span><select id="f-loc">${opts(OPTIONS.locations,'Choose the location')}</select></label>
        <label class="f" data-for="LOA"><span>Area *</span><select id="f-area">${opts(OPTIONS.locations,'Choose the area')}</select></label>
        <label class="f" data-for="LOA"><span>Reason *</span><select id="f-reason">${opts(OPTIONS.loaReason,'Choose the reason')}</select></label>
        <label class="f" data-for="LOA"><span>Boundaries *</span><select id="f-bounds">${opts(OPTIONS.loaBounds,'Choose the boundaries')}</select></label>
        <label class="f" data-for="LOA"><span>Linked permit</span><select id="f-ptw"></select></label>
      </div></div>
      <div class="fgroup" data-for="PTW SFT"><h3>2 · Points of isolation</h3><div class="fgrid">
        <label class="f wide"><span>System * <small>Choose HV, LV or both. Each opens its own list of plant.</small></span><select id="f-sys">${opts([['HV','HV'],['LV','LV'],['HV and LV','HV,LV']],'Choose HV, LV or both')}</select></label>
        <div class="f" id="wrap-hv" hidden><span><i class="dot hv"></i>HV plant * <small>Choose an item of plant to open its drawing.</small></span>
          <div class="addrow"><select id="f-plant-hv"></select><button type="button" class="btn ghost small" data-open="hv">Drawing</button></div></div>
        <div class="f" id="wrap-lv" hidden><span><i class="dot lv"></i>LV plant * <small>Choose an item of plant to open its drawing.</small></span>
          <div class="addrow"><select id="f-plant-lv"></select><button type="button" class="btn ghost small" data-open="lv">Drawing</button></div></div>
        <div class="f wide"><span>Lock numbers selected <small>Tap the lock numbers on the drawing. They are added here as the points of isolation.</small></span>
          <ul class="picked" id="pickedLocks"></ul><p class="none-yet" id="noLocks">No points of isolation selected yet.</p></div>
        <label class="f"><span>Lockout box * <small>The box and its own box lock share the same number.</small></span><select id="f-box"></select></label>
      </div></div>
      <div class="fgroup"><h3><span data-num></span> · People</h3><div class="fgrid">
        <label class="f"><span>Issuing AP *</span><select id="f-ap">${opts(aps.map(a => [`${a.name} (${a.role}) · ${a.id}`, a.id]),'Choose the issuing AP')}</select></label>
        <label class="f"><span><b data-cp-label>Competent person *</b></span><select id="f-cp"><option value="">Choose the CP</option>${cpOptions}</select></label>
        <div class="f wide" data-for="PTW SFT"><span>Working party <small>Each person's personal lock goes on the box.</small></span>
          <div class="addrow"><select id="f-wp"></select><button type="button" class="btn ghost small" id="addWp">Add person</button></div>
          <ul class="picked" id="pickedWp"></ul></div>
        <div class="cpcard wide" id="cpPreview" hidden></div>
      </div></div>
      <div class="fgroup"><h3><span data-num2></span> · Time</h3><div class="fgrid">
        <label class="f"><span>Valid for *</span><select id="f-dur">${opts(OPTIONS.duration,'Choose how long')}</select></label>
        <label class="f wide"><span>Notes <small>Optional</small></span><textarea id="f-notes" rows="3" maxlength="500"></textarea></label>
      </div></div>
      <div class="errors" id="errors" role="alert" hidden></div>
      <div class="formfoot">
        <button type="submit" class="btn primary">Issue document ${I.arrow}</button>
        <a class="btn ghost" href="${U('index.html')}">Cancel</a>
      </div>
      <p class="hint">Documents you issue here are saved on this phone or computer only. Other devices will not see them.</p>
    </form>
  </div></section>`;
  shell('new', hero, main);

  const $ = id => document.getElementById(id);
  const locks = [], wp = [];
  const picker = document.createElement('div');
  picker.className = 'picker'; picker.id = 'picker'; picker.hidden = true;
  picker.setAttribute('role','dialog'); picker.setAttribute('aria-modal','true'); picker.setAttribute('aria-label','Choose lock numbers on the drawing');
  document.body.appendChild(picker);
  const sysList = () => ($('f-sys').value || '').split(',').filter(Boolean);
  const type = () => $('f-type').value;
  function show(){
    const t = type();
    document.querySelectorAll('[data-for]').forEach(el => { el.hidden = !t || !el.dataset.for.split(' ').includes(t); });
    document.querySelector('[data-cp-label]').textContent = t === 'LOA' ? 'LOA holder (CP) *' : 'Competent person *';
    document.querySelector('[data-num]').textContent = t === 'LOA' ? '2' : '3';
    document.querySelector('[data-num2]').textContent = t === 'LOA' ? '3' : '4';
  }
  function plantOptions(sysName){
    const groups = Object.keys(DRAWINGS).map(dw => {
      const list = PLANTS.filter(p => p.dw === dw && p.sys === sysName);
      if(!list.length) return '';
      return `<optgroup label="${esc(DRAWINGS[dw].title)}">${list.map(p => { const free = p.ids.filter(id => DATA.keys.find(k => k.id === id).status === 'In cabinet').length; return `<option value="${esc(p.key)}">${esc(p.name)} · ${free} of ${p.ids.length} free</option>`; }).join('')}</optgroup>`;
    }).join('');
    return `<option value="">Choose ${sysName} plant</option>${groups}`;
  }
  function showSys(){
    const sl = sysList();
    $('wrap-hv').hidden = !sl.includes('HV'); $('wrap-lv').hidden = !sl.includes('LV');
    for(let i = locks.length - 1; i >= 0; i--){ const k = DATA.keys.find(x => x.id === locks[i]); if(!sl.includes(k.sys)) locks.splice(i,1); }
    fillLocks();
  }
  function fillLocks(){
    $('pickedLocks').innerHTML = locks.map(id => { const k = DATA.keys.find(x => x.id === id); return `<li><i class="dot ${k.sys.toLowerCase()}"></i><span class="mono">${id}</span><span class="pl">${esc(k.board)} · ${esc(k.point)} <em>${esc(DRAWINGS[k.dw].title)}</em></span><button type="button" data-rm-lock="${id}" aria-label="Remove ${id}">×</button></li>`; }).join('');
    $('noLocks').hidden = locks.length > 0;
  }
  let toastTimer;
  function toast(html){ const t = picker.querySelector('.ptoast'); t.innerHTML = html; t.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, 6000); }
  function openPicker(plantKey){
    const p = PLANTS.find(x => x.key === plantKey); if(!p) return;
    const D = DRAWINGS[p.dw];
    picker.innerHTML = `<div class="phead"><div class="ptitle"><span class="kicker orange">${esc(p.sys)} · ${esc(D.title)}</span><b>${esc(p.name)}</b><small>Tap a lock number to add it. Tap again to remove. Grey, struck-through numbers are already in use.</small></div><button type="button" class="btn primary small" id="pickDone">Done · <span id="pickCount"></span></button></div>
      <div class="pbody" id="pickBody">${drawingHTML(p.dw, {picked:new Set(locks), focus:p.key, sys:sysList()})}</div>
      <div class="plegend"><span><i class="lk hv mini">1</i>Free</span><span><i class="lk hv mini picked">1</i>Selected</span><span><i class="lk hv mini used">1</i>In use</span><span><i class="lk hv mini focus">1</i>${esc(p.name)}</span></div>
      <div class="ptoast" hidden></div>`;
    picker.hidden = false; document.body.style.overflow = 'hidden';
    const count = () => { picker.querySelector('#pickCount').textContent = `${locks.length} selected`; };
    count();
    const body = picker.querySelector('#pickBody');
    requestAnimationFrame(() => scrollToLocks(body, body.querySelector('.dwgbox'), p.ids));
    body.addEventListener('click', e => {
      const b = e.target.closest('.lk'); if(!b) return;
      const k = DATA.keys.find(x => x.id === b.dataset.lock);
      if(k.status === 'Out of service'){ toast(`<b>${k.id}</b> is out of service: ${esc(k.cond)}.`); return; }
      if(k.doc){ toast(`<b>${k.id}</b> is in use on <a href="${recUrl(k.doc)}">${esc(k.doc)}</a> (${esc(find(k.doc).r.status)}). Open the document to see who holds it.`); return; }
      if(!sysList().includes(k.sys)){ toast(`<b>${k.id}</b> is ${k.sys}. Change the system to ${k.sys === 'HV' ? 'HV' : 'LV'} or HV and LV to select it.`); return; }
      const i = locks.indexOf(k.id);
      if(i > -1){ locks.splice(i,1); b.classList.remove('picked'); } else { locks.push(k.id); b.classList.add('picked'); toast(`<b>${k.id}</b> added · ${esc(k.board)} · ${esc(k.point)}`); }
      count(); fillLocks();
    });
    picker.querySelector('#pickDone').addEventListener('click', closePicker);
    picker.querySelector('#pickDone').focus();
  }
  function closePicker(){ picker.hidden = true; document.body.style.overflow = ''; fillLocks(); document.getElementById('pickedLocks').scrollIntoView({block:'center'}); }
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && !picker.hidden) closePicker(); });
  function fillBoxes(){ $('f-box').innerHTML = opts(DATA.info.filter(b => b.status === 'In cabinet').map(b => [`${b.id} · box lock ${b.id} · bay ${b.bay}`, b.id]), 'Choose a free lockout box'); }
  function fillPtw(){ $('f-ptw').innerHTML = opts(DATA.ptw.filter(p => p.status === 'Live').map(p => [`${p.id} · ${p.work}`, p.id]), 'None'); }
  function fillWp(){
    const cp = $('f-cp').value;
    const avail = people.filter(c => c.status === 'Active' && c.role === 'CP' && c.id !== cp && !wp.includes(c.id));
    $('f-wp').innerHTML = opts(avail.map(c => [cpLabel(c), c.id]), 'Choose a person');
    $('pickedWp').innerHTML = wp.map(id => { const c = find(id).r; return `<li><span class="mono">${id}</span> ${esc(c.name)} · ${esc(c.company)}<button type="button" data-rm-wp="${id}" aria-label="Remove ${id}">×</button></li>`; }).join('');
  }
  function cpPreview(){
    const id = $('f-cp').value, box = $('cpPreview');
    if(!id){ box.hidden = true; return; }
    box.innerHTML = cpCard(find(id).r, false); box.hidden = false;
  }
  $('f-type').addEventListener('change', show);
  $('f-plant-hv').innerHTML = plantOptions('HV'); $('f-plant-lv').innerHTML = plantOptions('LV');
  $('f-sys').addEventListener('change', showSys);
  ['hv','lv'].forEach(t => {
    $(`f-plant-${t}`).addEventListener('change', e => { if(e.target.value) openPicker(e.target.value); });
    document.querySelector(`[data-open="${t}"]`).addEventListener('click', () => { const v = $(`f-plant-${t}`).value; if(v) openPicker(v); else $(`f-plant-${t}`).focus(); });
  });
  $('pickedLocks').addEventListener('click', e => { const b = e.target.closest('[data-rm-lock]'); if(b){ locks.splice(locks.indexOf(b.dataset.rmLock),1); fillLocks(); } });
  $('f-cp').addEventListener('change', () => { const i = wp.indexOf($('f-cp').value); if(i > -1) wp.splice(i,1); fillWp(); cpPreview(); });
  $('addWp').addEventListener('click', () => { const v = $('f-wp').value; if(v){ wp.push(v); fillWp(); } });
  $('pickedWp').addEventListener('click', e => { const b = e.target.closest('[data-rm-wp]'); if(b){ wp.splice(wp.indexOf(b.dataset.rmWp),1); fillWp(); } });
  if(['PTW','SFT','LOA'].includes(qType)) $('f-type').value = qType;
  show(); fillLocks(); fillBoxes(); fillPtw(); fillWp();

  $('docform').addEventListener('submit', e => {
    e.preventDefault();
    const t = type(), err = [];
    const need = (id, msg) => { if(!$(id).value) err.push(msg); };
    need('f-type','Choose a document type.');
    if(t === 'PTW' || t === 'SFT'){
      need('f-sys','Choose HV, LV or both for the points of isolation.');
      need(t === 'PTW' ? 'f-work-ptw' : 'f-work-sft','Choose the work.');
      if(t === 'SFT') need('f-test','Choose the test.');
      need('f-loc','Choose the location.');
      if(!locks.length) err.push('Select at least one lock number on the drawing as a point of isolation.');
      need('f-box','Choose a lockout box.');
    }
    if(t === 'LOA'){ need('f-area','Choose the area.'); need('f-reason','Choose the reason.'); need('f-bounds','Choose the boundaries.'); }
    need('f-ap','Choose the issuing AP.');
    need('f-cp', t === 'LOA' ? 'Choose the LOA holder.' : 'Choose the competent person.');
    need('f-dur','Choose how long the document is valid for.');
    const box = $('errors');
    if(err.length){ box.innerHTML = `<b>Before issuing:</b><ul>${err.map(x => `<li>${x}</li>`).join('')}</ul>`; box.hidden = false; box.scrollIntoView({behavior:'smooth', block:'center'}); return; }
    box.hidden = true;
    const ap = find($('f-ap').value).r, cp = find($('f-cp').value).r;
    const now = stamp(), id = nextId(t), notes = $('f-notes').value.trim();
    const base = {id, status:'Live', ap:`${ap.name.split(' ')[0][0]}. ${ap.name.split(' ').slice(1).join(' ')} (${ap.role})`, issued:now, expiry:expiryFrom($('f-dur').value), notes};
    let doc, log;
    if(t === 'LOA'){
      doc = {...base, area:$('f-area').value, reason:$('f-reason').value, bounds:$('f-bounds').value, holder:`${cp.name} · ${cp.id}`, ptw:$('f-ptw').value};
      log = [[hhmm(now), `LOA issued by ${ap.name} to ${cp.name} (${cp.id}). Boundaries set.`]];
    } else {
      const plocks = [cp.id, ...wp];
      doc = {...base, sys:sysList().join(' & '), work:$(t === 'PTW' ? 'f-work-ptw' : 'f-work-sft').value, ...(t === 'SFT' ? {test:$('f-test').value} : {}), loc:$('f-loc').value, cp:`${cp.name} · ${cp.id}`, keys:[...locks], box:$('f-box').value, loa:'', apLock:`${ap.id} · ${ap.name}`, plocks};
      log = [[hhmm(now), `Keys ${locks.join(', ')} drawn by ${ap.name}; tags hung on hooks`],[hhmm(now), `Keys placed in ${doc.box}, box locked with box lock ${doc.box}, key held by ${ap.name}, ${t} issued to ${cp.name}`],[hhmm(now), `Personal locks ${plocks.join(', ')} applied to ${doc.box}`]];
    }
    if(!addEvent({op:'create', doc, log})){ box.innerHTML = '<b>Could not save.</b> This browser is blocking storage, for example in a private window. Open the site in a normal window and try again.'; box.hidden = false; return; }
    location.href = recUrl(id) + '&created=1';
  });
}

/* CP contact card, used on documents and in the form preview */
function cpCard(c, withButton = true){
  const tel = String(c.phone).replace(/[^+\d]/g,'');
  return `<div class="cpc-head"><div><div class="cpc-role">${esc(c.role)} · <span class="mono">${esc(c.id)}</span></div><b>${esc(c.name)}</b><span>${esc(c.company)}</span></div>${chip(c.status)}</div>
    <div class="cpc-lines"><a href="tel:${tel}"><span>Phone</span><b class="mono">${esc(c.phone)}</b></a><a href="mailto:${esc(c.email)}"><span>Email</span><b class="mono">${esc(c.email)}</b></a></div>
    ${withButton ? `<a class="btn primary small" href="${recUrl(c.id)}">Open CP details ${I.arrow}</a>` : ''}`;
}
function cpPanel(str, label){
  const m = String(str || '').match(/P-\d{3}/), hit = m && find(m[0]);
  if(!hit) return '';
  return `<div class="panel cppanel"><h3>${label}</h3>${cpCard(hit.r)}</div>`;
}
function cancelPanel(r){
  if(r.status !== 'Live') return '';
  return `<div class="panel"><h3>Cancel this document</h3><p>Use when the CP has signed for cancellation and every personal lock is off the box.</p>
    <button type="button" class="btn ghost small" id="cancelStart" style="margin-top:14px">Cancel document</button>
    <div id="cancelConfirm" hidden style="margin-top:14px"><p><b>Confirm:</b> all personal locks removed and keys counted?</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:10px"><button type="button" class="btn primary small" id="cancelYes">Yes, cancel ${esc(r.id)}</button><button type="button" class="btn ghost small" id="cancelNo">Go back</button></div></div></div>`;
}
function wireRecord(r){
  const start = document.getElementById('cancelStart'); if(!start) return;
  const conf = document.getElementById('cancelConfirm');
  start.addEventListener('click', () => { conf.hidden = false; start.hidden = true; });
  document.getElementById('cancelNo').addEventListener('click', () => { conf.hidden = true; start.hidden = false; });
  document.getElementById('cancelYes').addEventListener('click', () => {
    const by = String(r.ap || 'AP');
    if(addEvent({op:'cancel', id:r.id, at:stamp(), by})) location.reload();
  });
}

/* ---------- Start ---------- */
loadEvents().forEach(applyEvent);
syncKeys();
const page = document.body.dataset.page;
if(page==='home') home();
else if(PAGES[page]) tracker(page);
else if(page==='record') record();
else if(page==='schematic') schematic();
else if(page==='procedure') procedure();
else if(page==='new') newDoc();
