window.RSS_BUDGET = {
    "currencyRate": 3700,
    "scope": "KNBP, KEE and Entebbe Airport Dual - RSS technology to monitor traffic and share information",
    "deployment": "Single deployment (no phasing)",
    "fibreNote": "Corridor fibre backbone already laid - only field-site drops are priced.",
    "sourceWorkbook": "BOQ entailing tendered rates for TTRS .xlsx",
    "wimSites": [
        {
            "id": "WIM-KEE-001",
            "site": "SWIM - Busega Main Toll Plaza (existing)",
            "corridor": "KEE",
            "chainageKm": 2.4,
            "lat": 0.296095,
            "lon": 32.512472,
            "configuration": "EXISTING static WIM - enhance & integrate; NEW site ANPR",
            "purpose": "Plaza static weighing integrated with the RSS database."
        },
        {
            "id": "WIM-KEE-002",
            "site": "SWIM - Kajjansi Toll Plaza (existing)",
            "corridor": "KEE",
            "chainageKm": 12.07,
            "lat": 0.21423,
            "lon": 32.534386,
            "configuration": "EXISTING static WIM - enhance & integrate; NEW site ANPR",
            "purpose": "Co-located with the TCC; certified enforcement weighing with automated notification."
        },
        {
            "id": "WIM-KEE-003",
            "site": "SWIM - Mpala Toll Plaza (existing)",
            "corridor": "KEE",
            "chainageKm": 24.65,
            "lat": 0.106288,
            "lon": 32.512365,
            "configuration": "EXISTING static WIM - enhance & integrate; NEW site ANPR",
            "purpose": "Airport-side plaza weighing integrated with the RSS database."
        },
        {
            "id": "WIM-KEE-004",
            "site": "HS-WIM 1 - Busega Entry (KEE main, new)",
            "corridor": "KEE",
            "chainageKm": 0.5,
            "lat": 0.312406,
            "lon": 32.515809,
            "configuration": "NEW high-speed RSS WIM freight screen; NEW site ANPR",
            "purpose": "Busega-entry freight preselection ahead of the existing plaza and interchange area."
        },
        {
            "id": "WIM-KEE-005",
            "site": "HS-WIM 2 - Mpala Entry (KEE main, new)",
            "corridor": "KEE",
            "chainageKm": 24.0,
            "lat": 0.111388,
            "lon": 32.513242,
            "configuration": "NEW high-speed RSS WIM freight screen; NEW site ANPR",
            "purpose": "Airport-side freight preselection before the Mpala toll-plaza and junction area."
        }
    ],
    "categories": [
        {
            "category": "PTZ / TMCS traffic monitoring with AI-ML analytics",
            "items": [
                {
                    "item": "TMCS PTZ camera, 4MP, 35x optical zoom, IR 500 m night vision",
                    "qty": 17.316,
                    "unit": "Nos.",
                    "rate_ugx": 2563952,
                    "amount_ugx": 44397392.831999995,
                    "rate_usd": 692.96,
                    "amount_usd": 11999.29536,
                    "assumption": "Tecidel tendered PTZ rate USD 693 (TTRS workbook) at 3,700 UGX/USD"
                },
                {
                    "item": "Road Side Unit for TMCS, hybrid solar UPS, 6-hr backup, industrial fibre switch",
                    "qty": 17.316,
                    "unit": "Nos.",
                    "rate_ugx": 9805000,
                    "amount_ugx": 169783380.0,
                    "rate_usd": 2650.0,
                    "amount_usd": 45887.399999999994,
                    "assumption": "Tecidel tendered rate (TTRS workbook), PTZ DS-2DE7A232IW at 3,700 UGX/USD"
                },
                {
                    "item": "12 m galvanized iron (GI) pole with accessories",
                    "qty": 14.018,
                    "unit": "Nos.",
                    "rate_ugx": 22386998,
                    "amount_ugx": 313820937.964,
                    "rate_usd": 6050.54,
                    "amount_usd": 84816.46972000001,
                    "assumption": "Tecidel tendered 12 m pole rate (TTRS workbook)"
                },
                {
                    "item": "Camera mounting on existing structures (5 shared sites)",
                    "qty": 3.298,
                    "unit": "Set",
                    "rate_ugx": 4500000,
                    "amount_ugx": 14841000.0,
                    "rate_usd": 1216.22,
                    "amount_usd": 4011.0935600000003,
                    "assumption": "Tecidel tendered rate (TTRS workbook), PTZ DS-2DE7A232IW at 3,700 UGX/USD"
                },
                {
                    "item": "Civil works: M25 foundation, chamber, backfilling, per site",
                    "qty": 17.316,
                    "unit": "Set",
                    "rate_ugx": 3145000,
                    "amount_ugx": 54458820.0,
                    "rate_usd": 850.0,
                    "amount_usd": 14718.599999999999,
                    "assumption": "Tecidel tendered rate (TTRS workbook), PTZ DS-2DE7A232IW at 3,700 UGX/USD"
                },
                {
                    "item": "AI/ML processing units + video-analytics licences (incident & accident detection, all TMCS)",
                    "qty": 0.825,
                    "unit": "LS",
                    "rate_ugx": 450000000,
                    "amount_ugx": 371250000.0,
                    "rate_usd": 121621.62,
                    "amount_usd": 100337.83649999999,
                    "assumption": "Sized for 26 camera streams; measured traffic 24,059 ADT (KEE traffic data) drives event volumes"
                },
                {
                    "item": "Installation, testing & commissioning - TMCS",
                    "qty": 0.825,
                    "unit": "LS",
                    "rate_ugx": 160000000,
                    "amount_ugx": 132000000.0,
                    "rate_usd": 43243.24,
                    "amount_usd": 35675.672999999995,
                    "assumption": "Tecidel tendered rate (TTRS workbook), PTZ DS-2DE7A232IW at 3,700 UGX/USD"
                }
            ],
            "subtotal_ugx": 1100551530.796
        },
        {
            "category": "Variable Message Signs (10 fixed overhead, full carriageway)",
            "items": [
                {
                    "item": "Fixed overhead VMS sign face, full carriageway coverage",
                    "qty": 9.07,
                    "unit": "Nos.",
                    "rate_ugx": 53650000,
                    "amount_ugx": 486605500.0,
                    "rate_usd": 14500.0,
                    "amount_usd": 131515.0,
                    "assumption": "Engineer's estimate benchmarked to TTRS tendered rates"
                },
                {
                    "item": "Certified overhead VMS gantry spanning carriageway with walkway and 5.5 m clearance",
                    "qty": 9.07,
                    "unit": "Nos.",
                    "rate_ugx": 46250000,
                    "amount_ugx": 419487500.0,
                    "rate_usd": 12500.0,
                    "amount_usd": 113375.0,
                    "assumption": "Engineer's estimate benchmarked to TTRS tendered rates"
                },
                {
                    "item": "Road Side Unit for VMS, hybrid solar UPS backup",
                    "qty": 9.07,
                    "unit": "Nos.",
                    "rate_ugx": 9805000,
                    "amount_ugx": 88931350.0,
                    "rate_usd": 2650.0,
                    "amount_usd": 24035.5,
                    "assumption": "Engineer's estimate benchmarked to TTRS tendered rates"
                },
                {
                    "item": "Civil works, overhead VMS gantry foundations and protection",
                    "qty": 9.07,
                    "unit": "Set",
                    "rate_ugx": 5550000,
                    "amount_ugx": 50338500.0,
                    "rate_usd": 1500.0,
                    "amount_usd": 13605.0,
                    "assumption": "Engineer's estimate benchmarked to TTRS tendered rates"
                },
                {
                    "item": "Installation, testing & commissioning - VMS",
                    "qty": 0.825,
                    "unit": "LS",
                    "rate_ugx": 80000000,
                    "amount_ugx": 66000000.0,
                    "rate_usd": 21621.62,
                    "amount_usd": 17837.836499999998,
                    "assumption": "Engineer's estimate benchmarked to TTRS tendered rates"
                }
            ],
            "subtotal_ugx": 1111362850.0
        },
        {
            "category": "WIM: 5 RSS sites with ANPR integration",
            "items": [
                {
                    "item": "Enhancement of existing static WIM (SWIM): controller/indicator upgrade, recalibration, per plaza",
                    "qty": 3,
                    "unit": "Nos.",
                    "rate_ugx": 68000000,
                    "amount_ugx": 204000000,
                    "rate_usd": 18378.38,
                    "amount_usd": 55135.14,
                    "assumption": "OEM controller upgrade + recalibration quote basis per plaza"
                },
                {
                    "item": "New high-speed RSS WIM freight screen package: pavement sensors/controller/cabinet, per new KEE entry site",
                    "qty": 2,
                    "unit": "Nos.",
                    "rate_ugx": 95000000,
                    "amount_ugx": 190000000,
                    "rate_usd": 25675.68,
                    "amount_usd": 51351.36,
                    "assumption": "Mikros/Intercomp tendered WIM rates (TTRS workbook); enhancement scoped from OEM upgrade quotes"
                },
                {
                    "item": "RSS integration of WIM sites: data interface to central database, event streaming, per site",
                    "qty": 5,
                    "unit": "Nos.",
                    "rate_ugx": 32000000,
                    "amount_ugx": 160000000,
                    "rate_usd": 8648.65,
                    "amount_usd": 43243.25,
                    "assumption": "Mikros/Intercomp tendered WIM rates (TTRS workbook); enhancement scoped from OEM upgrade quotes"
                },
                {
                    "item": "NEW ANPR camera, WIM-integrated with weigh-event trigger sync, per site",
                    "qty": 5,
                    "unit": "Nos.",
                    "rate_ugx": 58181760,
                    "amount_ugx": 290908800,
                    "rate_usd": 15724.8,
                    "amount_usd": 78624.0,
                    "assumption": "Mikros WIM-ANPR tendered rate (TTRS workbook); ~1,533 heavy vehicles/day screened (measured)"
                },
                {
                    "item": "UNBS verification / recalibration support for WIM sites",
                    "qty": 1,
                    "unit": "LS",
                    "rate_ugx": 65000000,
                    "amount_ugx": 65000000,
                    "rate_usd": 17567.57,
                    "amount_usd": 17567.57,
                    "assumption": "Mikros/Intercomp tendered WIM rates (TTRS workbook); enhancement scoped from OEM upgrade quotes"
                },
                {
                    "item": "Installation, testing & commissioning - WIM",
                    "qty": 1,
                    "unit": "LS",
                    "rate_ugx": 115000000,
                    "amount_ugx": 115000000,
                    "rate_usd": 31081.08,
                    "amount_usd": 31081.08,
                    "assumption": "Mikros/Intercomp tendered WIM rates (TTRS workbook); enhancement scoped from OEM upgrade quotes"
                }
            ],
            "subtotal_ugx": 1024908800
        },
        {
            "category": "Weather intelligence - AI/ML & geospatial analytics (NO hardware)",
            "items": [
                {
                    "item": "AI weather model: ingestion of existing reliable weather sources, corridor-localised forecasts",
                    "qty": 0.825,
                    "unit": "LS",
                    "rate_ugx": 65000000,
                    "amount_ugx": 53625000.0,
                    "rate_usd": 17567.57,
                    "amount_usd": 14493.245249999998,
                    "assumption": "Software engineering estimate benchmarked to the RSS specification Annex A"
                },
                {
                    "item": "ML video analytics: weather-related incident detection from PTZ feeds (fog, flooding, visibility)",
                    "qty": 0.825,
                    "unit": "LS",
                    "rate_ugx": 95000000,
                    "amount_ugx": 78375000.0,
                    "rate_usd": 25675.68,
                    "amount_usd": 21182.435999999998,
                    "assumption": "Model licensing + training norm; validated against PTZ streams"
                },
                {
                    "item": "Geospatial weather-risk analytics layer + automated VMS advisories",
                    "qty": 0.825,
                    "unit": "LS",
                    "rate_ugx": 55000000,
                    "amount_ugx": 45375000.0,
                    "rate_usd": 14864.86,
                    "amount_usd": 12263.5095,
                    "assumption": "Software engineering estimate benchmarked to the RSS specification Annex A"
                }
            ],
            "subtotal_ugx": 177375000.0
        },
        {
            "category": "Traffic Control Centre - Kajjansi Toll Plaza",
            "items": [
                {
                    "item": "Central processing server, hot-standby pair",
                    "qty": 2,
                    "unit": "Nos.",
                    "rate_ugx": 135089035,
                    "amount_ugx": 270178070,
                    "rate_usd": 36510.55,
                    "amount_usd": 73021.1,
                    "assumption": "COTS list prices (Dell/Planet/APC references in TTRS workbook) + integration norm"
                },
                {
                    "item": "Database licensed edition",
                    "qty": 2,
                    "unit": "Nos.",
                    "rate_ugx": 27750000,
                    "amount_ugx": 55500000,
                    "rate_usd": 7500.0,
                    "amount_usd": 15000.0,
                    "assumption": "COTS list prices (Dell/Planet/APC references in TTRS workbook) + integration norm"
                },
                {
                    "item": "Video wall with controller and accessories",
                    "qty": 1,
                    "unit": "Set",
                    "rate_ugx": 165000000,
                    "amount_ugx": 165000000,
                    "rate_usd": 44594.59,
                    "amount_usd": 44594.59,
                    "assumption": "COTS list prices (Dell/Planet/APC references in TTRS workbook) + integration norm"
                },
                {
                    "item": "Video recording & incident backup server, 180-day storage",
                    "qty": 1,
                    "unit": "Nos.",
                    "rate_ugx": 103600000,
                    "amount_ugx": 103600000,
                    "rate_usd": 28000.0,
                    "amount_usd": 28000.0,
                    "assumption": "COTS list prices (Dell/Planet/APC references in TTRS workbook) + integration norm"
                },
                {
                    "item": "Video Analytics & Management Software (VAMS)",
                    "qty": 1,
                    "unit": "Set",
                    "rate_ugx": 55500000,
                    "amount_ugx": 55500000,
                    "rate_usd": 15000.0,
                    "amount_usd": 15000.0,
                    "assumption": "COTS list prices (Dell/Planet/APC references in TTRS workbook) + integration norm"
                },
                {
                    "item": "Network Management System (NMS), COTS",
                    "qty": 1,
                    "unit": "Nos.",
                    "rate_ugx": 81400000,
                    "amount_ugx": 81400000,
                    "rate_usd": 22000.0,
                    "amount_usd": 22000.0,
                    "assumption": "COTS list prices (Dell/Planet/APC references in TTRS workbook) + integration norm"
                },
                {
                    "item": "Operator workstation, multi-screen",
                    "qty": 3,
                    "unit": "Nos.",
                    "rate_ugx": 11543186,
                    "amount_ugx": 34629558,
                    "rate_usd": 3119.78,
                    "amount_usd": 9359.34,
                    "assumption": "COTS list prices (Dell/Planet/APC references in TTRS workbook) + integration norm"
                },
                {
                    "item": "Fibre optic network switch, 24 SFP",
                    "qty": 2,
                    "unit": "Nos.",
                    "rate_ugx": 31450000,
                    "amount_ugx": 62900000,
                    "rate_usd": 8500.0,
                    "amount_usd": 17000.0,
                    "assumption": "COTS list prices (Dell/Planet/APC references in TTRS workbook) + integration norm"
                },
                {
                    "item": "Layer-3 manageable switch, 24 GbE",
                    "qty": 1,
                    "unit": "Nos.",
                    "rate_ugx": 15540000,
                    "amount_ugx": 15540000,
                    "rate_usd": 4200.0,
                    "amount_usd": 4200.0,
                    "assumption": "COTS list prices (Dell/Planet/APC references in TTRS workbook) + integration norm"
                },
                {
                    "item": "UPS 10 kVA hot-standby, lithium-ion",
                    "qty": 1,
                    "unit": "Nos.",
                    "rate_ugx": 30340000,
                    "amount_ugx": 30340000,
                    "rate_usd": 8200.0,
                    "amount_usd": 8200.0,
                    "assumption": "COTS list prices (Dell/Planet/APC references in TTRS workbook) + integration norm"
                },
                {
                    "item": "Firewall with IDS/IPS licences",
                    "qty": 1,
                    "unit": "Nos.",
                    "rate_ugx": 31450000,
                    "amount_ugx": 31450000,
                    "rate_usd": 8500.0,
                    "amount_usd": 8500.0,
                    "assumption": "COTS list prices (Dell/Planet/APC references in TTRS workbook) + integration norm"
                },
                {
                    "item": "Server racks (42U x2) and structured cabling",
                    "qty": 1,
                    "unit": "LS",
                    "rate_ugx": 110260000,
                    "amount_ugx": 110260000,
                    "rate_usd": 29800.0,
                    "amount_usd": 29800.0,
                    "assumption": "COTS list prices (Dell/Planet/APC references in TTRS workbook) + integration norm"
                },
                {
                    "item": "Installation, testing & commissioning - TCC",
                    "qty": 1,
                    "unit": "LS",
                    "rate_ugx": 100000000,
                    "amount_ugx": 100000000,
                    "rate_usd": 27027.03,
                    "amount_usd": 27027.03,
                    "assumption": "COTS list prices (Dell/Planet/APC references in TTRS workbook) + integration norm"
                }
            ],
            "subtotal_ugx": 1116297628
        },
        {
            "category": "Central database, automated analytics & dissemination",
            "items": [
                {
                    "item": "Centralised RSS software: database, automated analytics, stakeholder notification engine",
                    "qty": 0.825,
                    "unit": "LS",
                    "rate_ugx": 400000000,
                    "amount_ugx": 330000000.0,
                    "rate_usd": 108108.11,
                    "amount_usd": 89189.19075,
                    "assumption": "Platform development norm; handles 26,154 peak ADT event load (Apr-26 measured)"
                },
                {
                    "item": "Geospatial database (PostgreSQL/PostGIS) licensing and setup",
                    "qty": 0.825,
                    "unit": "Set",
                    "rate_ugx": 55500000,
                    "amount_ugx": 45787500.0,
                    "rate_usd": 15000.0,
                    "amount_usd": 12375.0,
                    "assumption": "Software development norm benchmarked to RSS specification Annex A platform lines"
                },
                {
                    "item": "Role-based dashboards, reporting and public information module",
                    "qty": 0.825,
                    "unit": "Set",
                    "rate_ugx": 140000000,
                    "amount_ugx": 115500000.0,
                    "rate_usd": 37837.84,
                    "amount_usd": 31216.217999999997,
                    "assumption": "Software development norm benchmarked to RSS specification Annex A platform lines"
                }
            ],
            "subtotal_ugx": 491287500.0
        },
        {
            "category": "Site backhaul drops (existing fibre backbone - backbone NOT priced)",
            "items": [
                {
                    "item": "Field-site fibre drop: splice, media converter, LIU, testing",
                    "qty": 14.842,
                    "unit": "Nos.",
                    "rate_ugx": 6710000,
                    "amount_ugx": 99589820.0,
                    "rate_usd": 1813.51,
                    "amount_usd": 26916.115420000002,
                    "assumption": "Market splice/termination rate per site; corridor OFC already laid (not priced)"
                }
            ],
            "subtotal_ugx": 99589820.0
        },
        {
            "category": "Training, documentation, spares and warranty",
            "items": [
                {
                    "item": "Operator and maintenance training programme",
                    "qty": 0.825,
                    "unit": "LS",
                    "rate_ugx": 55000000,
                    "amount_ugx": 44664044.0,
                    "rate_usd": 14864.86,
                    "amount_usd": 12263.5095,
                    "assumption": "RSS specification Annex A allowances; spares at ~3% of field CAPEX"
                },
                {
                    "item": "System documentation set (design, O&M, as-built)",
                    "qty": 0.825,
                    "unit": "Set",
                    "rate_ugx": 45000000,
                    "amount_ugx": 37125000.0,
                    "rate_usd": 12162.16,
                    "amount_usd": 10033.782,
                    "assumption": "RSS specification Annex A allowances; spares at ~3% of field CAPEX"
                },
                {
                    "item": "Strategic spares and consumables holding (2 years)",
                    "qty": 0.825,
                    "unit": "LS",
                    "rate_ugx": 110000000,
                    "amount_ugx": 90750000.0,
                    "rate_usd": 29729.73,
                    "amount_usd": 24527.02725,
                    "assumption": "~3% of field equipment CAPEX, 2-year holding"
                },
                {
                    "item": "Extended warranty, year 2, all field equipment",
                    "qty": 0.825,
                    "unit": "LS",
                    "rate_ugx": 120000000,
                    "amount_ugx": 99000000.0,
                    "rate_usd": 32432.43,
                    "amount_usd": 26756.75475,
                    "assumption": "OEM year-2 extension norm across field equipment"
                }
            ],
            "subtotal_ugx": 271539044.0
        }
    ],
    "subtotalUgx": 5392912172.796,
    "subtotalUsd": 1711373.79,
    "beforeVatUgx": 5932203389.796,
    "beforeVatUsd": 1882511.17,
    "targetBasis": "Total before VAT is the control figure (assumption basis)",
    "contingencyRate": 0.1,
    "contingencyUgx": 539291217,
    "vatRate": 0.18,
    "vatUgx": 1067796610,
    "grandTotalUgx": 7000000000,
    "grandTotalUsd": 2221363
};
