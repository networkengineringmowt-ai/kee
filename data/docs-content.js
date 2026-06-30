window.DOCS_CONTENT = {
  "its kje - COMPLETE ITS SPECIFICATION.docx": [
    {
      "title": "General",
      "content": [
        "TECHNICAL SPECIFICATION",
        "Kampala-Entebbe Expressway Intelligent Transportation System",
        "Complete procurement, implementation, integration, operations and maintenance specification for KEE ITS, ATMS, ETC interfaces, control centre, field devices, communications, cybersecurity, testing and handover.",
        "This specification defines a turnkey ITS solution. The Contractor shall design, supply, install, test, commission, integrate, operate, maintain, document, train and hand over a complete, interoperable, secure and auditable system. Any omission in this document that is necessary for a complete and operational KEE ITS shall be deemed included in the Contractor's scope."
      ]
    },
    {
      "title": "Contents",
      "content": [
        "1. Purpose, Scope and Source Basis",
        "2. System Objectives and Performance Requirements",
        "3. KEE Corridor Deployment Basis",
        "4. System Architecture",
        "5. General Technical Requirements",
        "6. Toll and ETC Interface Specification",
        "7. Advanced Traffic Management System Specification",
        "8. Communications and Network Specification",
        "9. Data Centre, Cloud Infrastructure and Disaster Recovery",
        "10. Cybersecurity, Audit and Data Protection",
        "11. Power, Civil, Cabinets, Poles and Gantries",
        "12. Control Centre and Operations",
        "13. Maintenance, Spares and Service Levels",
        "14. Testing, Commissioning, Acceptance and Handover",
        "15. Requirements Traceability Matrix",
        "Appendices: Interface control, data registers, drawings, training and deliverables",
        "Note: page numbers shall be updated by Word if a formal automatic table of contents is inserted during final contract compilation."
      ]
    },
    {
      "title": "1. Purpose, Scope and Source Basis",
      "content": [
        "This document specifies the complete Intelligent Transportation System for the Kampala-Entebbe Expressway. It is written as a procurement and implementation specification, not as a concept note. It defines what shall be delivered, how it shall perform, how it shall be integrated into tolling and expressway operations, and how the Ministry shall accept and maintain the system."
      ]
    },
    {
      "title": "1.1 Contract Scope",
      "content": [
        "Design, supply, installation, testing, commissioning, configuration, system integration, operations support, maintenance, documentation, training, spares and handover of the KEE ITS.",
        "Integration of ITS with the existing and proposed ETC, hybrid tolling, plaza management, lane equipment, bank/payment, enforcement, motor vehicle registration, MoWT application, traffic control room and disaster response workflows.",
        "Deployment of field equipment on mainline, ramps, toll plazas, vulnerable merge/diverge points, incident-prone sections, airport approach, and locations confirmed through detailed survey.",
        "Delivery of all software licenses, databases, server infrastructure, virtualisation/HCI, network equipment, power backup, cybersecurity controls, control room equipment and management tools needed for a fully operational system.",
        "Provision of temporary works, foundations, poles, gantries, cabinets, cabling, optical fibre, earthing, lightning protection, solar systems, UPS, batteries and all related accessories."
      ]
    },
    {
      "title": "1.2 Source Documents",
      "content": []
    },
    {
      "title": "1.3 Definitions",
      "content": [
        "Source basis: Operations Manual definitions for CCTV, ETC, ITS, VDS, VMS, TCC/TCR and TMS; technical specification definitions for ETC/ITS components."
      ]
    },
    {
      "title": "2. System Objectives and Performance Requirements",
      "content": [
        "The KEE ITS shall be a 24x7 revenue-critical and safety-critical platform. The system shall increase safety, reduce response time, protect toll revenue, provide reliable traveller information, support enforcement, and create an auditable operational record for MoWT."
      ]
    },
    {
      "title": "2.1 Core Outcomes",
      "content": []
    },
    {
      "title": "2.2 Minimum Performance Benchmarks",
      "content": [
        "Source basis: Derived from Tech Specs_TMS&ITS_4Apr26.docx: lane/plaza availability, AVC/ANPR accuracy, ATMS field equipment specifications, environmental requirements and backup requirements."
      ]
    },
    {
      "title": "3. KEE Corridor Deployment Basis",
      "content": [
        "Final coordinates, chainage, equipment quantities and mounting details shall be confirmed by detailed survey. The deployment below is the minimum functional basis for the KEE ITS and shall be refined through the Contractor's site survey, safety analysis, traffic study, power/fibre survey and approved detailed design."
      ]
    },
    {
      "title": "3.1 Functional Location Classes",
      "content": []
    },
    {
      "title": "3.2 Minimum KEE Installation Register",
      "content": [
        "The register is not a quantity cap. The Contractor shall add any device, cabinet, power system, network element, gantry, software license, interface or accessory required to meet the functional and performance requirements."
      ]
    },
    {
      "title": "4. System Architecture",
      "content": [
        "The ITS architecture shall be layered so field devices continue to capture local events, roadside units buffer critical data, the control centre receives live status and evidence, and the data centre/DR layer preserves operational continuity."
      ]
    },
    {
      "title": "4.1 Logical Architecture",
      "content": []
    },
    {
      "title": "4.2 Interface Principles",
      "content": [
        "All integrations shall be defined in Interface Control Documents covering endpoint, protocol, authentication, message structure, event triggers, acknowledgement, retry, audit and error handling.",
        "APIs shall be versioned, documented and testable; REST APIs shall use TLS 1.2 or higher, strong authentication and structured JSON unless an approved protocol requires otherwise.",
        "Field device protocols shall support SNMP where applicable for alarms and NMS integration; VMS and VASD shall support NTCIP or approved equivalent control protocols.",
        "All event records shall be time-synchronised using an approved NTP hierarchy and shall include source device, location, event type, confidence score, operator action and evidence reference.",
        "The system shall keep operating in degraded mode during WAN failure using local buffering, local operator controls and automatic transaction/event replay after restoration."
      ]
    },
    {
      "title": "5. General Technical Requirements",
      "content": []
    },
    {
      "title": "5.1 Standards",
      "content": [
        "Ugandan technical standards and quality certifications shall apply wherever available.",
        "Where Ugandan standards are absent, relevant international standards shall be used, including IEC, IEEE, ISO, ITU-T, JIS, BS, AASHTO, ASTM, ANSI and accepted industry standards from major industrialized countries.",
        "If the Contractor proposes an alternate standard, the Contractor shall submit a full technical comparison and obtain MoWT approval before procurement or installation.",
        "All electrical, civil, communication, safety and environmental works shall satisfy applicable Ugandan laws, utility requirements, occupational health and safety requirements and environmental obligations."
      ]
    },
    {
      "title": "5.2 Environmental and Mechanical Requirements",
      "content": []
    },
    {
      "title": "5.3 Electrical, Earthing and Lightning",
      "content": []
    },
    {
      "title": "5.4 Software and Licensing",
      "content": []
    },
    {
      "title": "6. Toll and ETC Interface Specification",
      "content": [
        "The KEE ITS shall integrate with the Electronic Toll Collection and hybrid tolling environment. Tolling is treated as part of the overall ITS because lane status, transaction evidence, ANPR, AVC, RFID, queue monitoring and incident response are operationally linked."
      ]
    },
    {
      "title": "6.1 Plaza Building and Critical Equipment",
      "content": []
    },
    {
      "title": "6.2 Lane Equipment",
      "content": []
    },
    {
      "title": "6.3 Lane Application Functional Requirements",
      "content": [
        "The lane application shall be web-architecture based where practical and usable from approved browsers/devices without individual thick-client dependency unless technically justified.",
        "Transactions shall be transferred from lane to plaza/central server in real time and securely stored in a database.",
        "The application shall integrate all lane peripherals including boom barrier, traffic light, UFD, lane cameras, OHLS, AVC, RFID, ANPR, LSDU and monitoring tools.",
        "Each operator shall log in using personal credentials supplemented by biometric authentication to ensure accountability.",
        "Every transaction shall be uniquely identifiable, sequentially numbered, time-stamped and traceable from lane device input to plaza server record, bank interface, media evidence and audit trail.",
        "All status messages shall be uniquely linked to the toll transaction in progress and shall be sequentially numbered.",
        "The system shall maintain validation workflows for exempt transactions, violations, abnormal transactions, anomalies and manual corrections.",
        "The reporting module shall export all major reports and allow MoWT-approved amendments or new reports without additional cost for one year after SAT."
      ]
    },
    {
      "title": "6.4 ANPR/AVC/RFID Reconciliation",
      "content": []
    },
    {
      "title": "7. Advanced Traffic Management System Specification",
      "content": [
        "ATMS shall provide mainline monitoring, incident detection, traffic counting, speed warning, traveller information and control-centre workflows. It shall consist at minimum of TMCS, AVIDS, ANPR, ATCC, VASD, VMS, OFC communications and the ATMS control centre."
      ]
    },
    {
      "title": "7.1 Traffic Monitor Camera System",
      "content": []
    },
    {
      "title": "7.2 Automatic Video Incident Detection System",
      "content": []
    },
    {
      "title": "7.3 Incident and Enforcement Event Types",
      "content": []
    },
    {
      "title": "7.4 Automatic Traffic Counting and Classification",
      "content": [
        "ANPR cameras monitoring each lane shall be used for automatic traffic counting and classification wherever specified.",
        "Each vehicle passing under an ATCC/AVIDS gantry shall be recorded with vehicle type, plate number, date/time, direction, lane and source device.",
        "Indicative classifications shall include two-wheelers, three-wheelers, cars/jeeps/vans, light motor vehicles, trucks/buses, multi-axle vehicles and any additional MoWT-declared classes.",
        "Vehicle-wise data shall be stored in a relational database at the command centre and shall be exportable for planning, enforcement, audit and performance reporting."
      ]
    },
    {
      "title": "7.5 Vehicle Actuated Speed Display",
      "content": []
    },
    {
      "title": "7.6 Variable Message Signs",
      "content": []
    },
    {
      "title": "7.7 Road Weather, Flood and Visibility Monitoring",
      "content": []
    },
    {
      "title": "8. Communications and Network Specification",
      "content": [
        "The communication system shall connect field devices, plazas, control centre, primary data centre, DR site and authorised external systems. It shall be designed for high availability, cybersecurity, observability, segmentation and maintainability."
      ]
    },
    {
      "title": "8.1 Optical Fibre Cable",
      "content": []
    },
    {
      "title": "8.2 WAN Routers, Core Switches and Field Switches",
      "content": []
    },
    {
      "title": "8.3 Segmentation and Addressing",
      "content": [
        "Separate VLANs/security zones shall be provided for toll lanes, plaza servers, ATMS field devices, CCTV video, control-room workstations, management, backup, external DMZ, DR replication and guest/administration networks.",
        "No field device shall be directly accessible from the public internet.",
        "All remote maintenance shall use MFA, VPN, jump host/session recording and approval workflow.",
        "IP addressing, DNS, NTP, VLANs, firewall rules and routing shall be documented in a Network Design Report and as-built register."
      ]
    },
    {
      "title": "9. Data Centre, Cloud Infrastructure and Disaster Recovery",
      "content": [
        "The tolling and ITS systems are revenue-critical and safety-critical. The compute platform shall therefore be resilient, secure, scalable and manageable across primary and DR sites."
      ]
    },
    {
      "title": "9.1 Hyper-Converged Infrastructure",
      "content": []
    },
    {
      "title": "9.2 Backup, Retention and Disaster Recovery",
      "content": []
    },
    {
      "title": "10. Cybersecurity, Audit and Data Protection",
      "content": [
        "The system processes revenue, vehicle identity, enforcement data, video and operational command functions. Cybersecurity shall be designed in from field devices to applications, databases, networks, operators and external interfaces."
      ]
    },
    {
      "title": "10.1 Security Control Baseline",
      "content": []
    },
    {
      "title": "10.2 Data Governance",
      "content": [
        "Vehicle identity, video evidence, transaction records and enforcement data shall be used only for approved operational, audit, enforcement and safety purposes.",
        "Data exports to MoWT, auditors or law enforcement shall require case-by-case approval and be logged.",
        "Retention periods shall be approved by MoWT and shall distinguish operational data, transaction data, security logs, video, evidence packages and backups.",
        "The Contractor shall provide data dictionaries, API schemas, database entity diagrams and report catalogues."
      ]
    },
    {
      "title": "11. Power, Civil, Cabinets, Poles and Gantries",
      "content": []
    },
    {
      "title": "11.1 Mounting and Foundations",
      "content": []
    },
    {
      "title": "11.2 Roadside Units and Cabinets",
      "content": [
        "Each RSU shall contain only approved industrial electronics arranged for safe maintenance and clear cable separation.",
        "RSU shall include LIU, industrial switch, power distribution, MCB/PJB, UPS/solar charger, batteries, surge protection, grounding bar, internal LED light and labelled terminals.",
        "Door-open and tamper alarms shall be integrated into control-centre alarm monitoring.",
        "Cabinet layout drawings shall identify all devices, terminals, cable IDs, power circuits, fuses and network ports."
      ]
    },
    {
      "title": "11.3 Power Backup Requirements by Component",
      "content": []
    },
    {
      "title": "12. Control Centre and Operations",
      "content": [
        "The ITS shall support a 24-hour traffic control room with clear roles, shift handover, operator accountability, incident workflows, VMS message governance, dispatch coordination and post-incident reporting."
      ]
    },
    {
      "title": "12.1 Control Room Functions",
      "content": []
    },
    {
      "title": "12.2 Incident Workflow",
      "content": [
        "Detection: event detected by AVIDS/TMCS/RWIS/ATCC/VASD/operator/patrol/call.",
        "Triage: ATMS creates event with location, device, confidence, video/image and event type.",
        "Verification: operator reviews live and recorded video; confirms, rejects or escalates.",
        "Classification: event classified by type, severity, lane impact, hazard and response priority.",
        "Warning: approved VMS/app/flashing-light messages are issued according to message library and operator authority.",
        "Dispatch: patrol, ambulance, police, maintenance or recovery resources are assigned and tracked.",
        "Clearance: operator records lane reopening, debris removal, rescue/recovery and traffic normalisation.",
        "Closure: evidence package, timeline, operator actions, messages, dispatch records and lessons learned are archived."
      ]
    },
    {
      "title": "12.3 VMS Message Governance",
      "content": []
    },
    {
      "title": "13. Maintenance, Spares and Service Levels",
      "content": []
    },
    {
      "title": "13.1 Contractor Maintenance Scope",
      "content": [
        "Preventive maintenance of all field devices, control centre systems, servers, network, cybersecurity tools, power systems, cabinets, signs, poles, gantries and software.",
        "Corrective maintenance with response and restoration times tied to component criticality.",
        "Firmware/software patching, database maintenance, backup validation, calibration, cleaning, alignment, enclosure inspection, thermal inspection and battery health testing.",
        "Maintenance of asset register, serial numbers, warranty status, spare parts, consumables and configuration baselines.",
        "Quarterly review of recurring faults and root-cause corrective action."
      ]
    },
    {
      "title": "13.2 Service Level Classification",
      "content": []
    },
    {
      "title": "13.3 Spares and Consumables",
      "content": []
    },
    {
      "title": "13.4 Calibration and Preventive Maintenance",
      "content": []
    },
    {
      "title": "14. Testing, Commissioning, Acceptance and Handover",
      "content": []
    },
    {
      "title": "14.1 Test Stages",
      "content": []
    },
    {
      "title": "14.2 Acceptance Criteria",
      "content": [
        "No critical open defects shall remain at SAT completion unless MoWT approves a written workaround and closure date.",
        "All critical interfaces shall be proven end-to-end with timestamped logs and reconciled sample records.",
        "All as-built drawings, IP plans, database schemas, API documents, user manuals, admin manuals, maintenance manuals and training materials shall be submitted before final acceptance.",
        "Backup and restore shall be demonstrated using real or representative transaction/event data.",
        "Failover/failback shall be demonstrated for key server, storage and network elements or simulated where full failover is not safe during live traffic.",
        "Cybersecurity hardening, account review, vulnerability closure and SIEM onboarding shall be complete.",
        "MoWT staff shall complete product training before system implementation and receive annual accredited training where specified."
      ]
    },
    {
      "title": "14.3 Training",
      "content": []
    },
    {
      "title": "15. Requirements Traceability Matrix",
      "content": []
    },
    {
      "title": "Appendix A - Required Contractor Deliverables",
      "content": []
    },
    {
      "title": "Appendix B - Interface Register",
      "content": []
    }
  ],
  "Expressway Operations Manual_PMC.docx": [
    {
      "title": "General",
      "content": [
        "MINISTRY OF WORKS AND TRANSPORT",
        "EXPRESSWAY OPERATIONS MANUAL",
        "(DRAFT FINAL)",
        "Project for Establishment of Integrated Manuals and Main Facility Management System of Expressways in Uganda",
        "November 2024",
        "LIST OF TABLES",
        "Table 1-1: Definition of Terms\t6",
        "Table 1-2: Responsibilities of Operations Organization\t16",
        "Table 2-1: Traffic Accident Classification\t25",
        "Table 2-2: VMS Information Display\t62",
        "Table 2-3: Display Message in Case of a Traffic Accident\t64",
        "Table 2-4: Display Text during Work\t65",
        "Table 2-5: Display Text in Case of Rain\t65",
        "Table 2-6: Display Text in Case of Fog\t66",
        "Table 3-7: Disaster Classifications on  Expressway in Uganda\t79",
        "Table 3-8: Duties of  Disaster Response Headquarters\t85",
        "Table 3-9: Operational Criteria for Disaster Countermeasure Headquarter\t87",
        "Table 3-10: National Crisis Alert Level Classification and Description\t89",
        "Table 3-11: Management of Tunnel Disaster Prevention Facilities\t106",
        "Table 3-12: Tunnel Emergency Training and Drill Implementation Plan\t109",
        "Table 3-13: Damage Grating due to tunnel fire\t109",
        "Table 3-14: Operation of Emergency Investigation Team for Tunnel\t111",
        "Table 3-15: Operation Plan for The Emergency Investigation Team for Bridge\t112",
        "Table 3-16: Initial Response Flow (Within 10 Minutes to 2 Hours) for Fire\t115",
        "Table 3-17: Types of Terrorist Incidents on Expressways\t125",
        "Table 3-18: Facilities Designated for Priority Terrorism Management\t125",
        "Table 3-19: Education and Drill for Collapse/Explosion\t126",
        "Table 3-20: Actions by crisis alert level\t127",
        "Table 3-21: Concept for restoration based on the damage scale of the bridge\t133",
        "Table 3-22: Emergency Restoration and Traffic Handling\t134",
        "Table 3-23: Traffic Restriction Criteria by Disaster Type\t136",
        "Table 3 24: Traffic control criteria based on damage scale\t137",
        "Table 3-25: Authority and Duties for Traffic Restriction\t139",
        "Table 3-26: Traffic Handling Measures in Case of Accidents\t140",
        "Table 3-27: Guidelines for the Actions of the Media and Public Relations Team\t145",
        "Table 3-28: Expressways Control Due to Natural Disasters\t146",
        "Table 3-29: Facilities or Human Damage Caused by Social Disasters\t147",
        "Table 3-30: Public Relations Office Duties in Case of Disaster\t148",
        "Table 3-31: Operate dedicated teams for rescue activities in case of disasters.\t150",
        "Table 3-32: Operational Standards by Phase\t151",
        "Table 3-33: Customer Service Behavior Standards.\t157",
        "Table 3-34: Items of Major Equipment Inspection\t159",
        "LIST OF FIGURES",
        "Figure 1-1: Bacic Organization Structure for Station (Proposed)\t14",
        "Figure 2-1: Organization Chart of Traffic Control Room\t21",
        "Figure 2-1: Special Traffic Situation Handling Procedure Flowchart\t27",
        "Figure 2-2: Traffic Patrol Officer\t35",
        "Figure 2-3: Violation of Measures Preventing Cargo from Falling\t60",
        "Figure 2-4: Concep of Traffic Information Provision\t67",
        "Figure 2-5: Items for External Traffic Information Provision\t68",
        "Figure 3-1: Concept of Disaster\t76",
        "Figure 3-2: Classification of Disasters\t77",
        "Figure 3-3: Core Disaster on Expressway in Uganda\t78",
        "Figure 3-4: Concept of  Expressway Disaster Management\t80",
        "Figure 3-5: Organization of Disaster Countermeasure Headquarter\t84",
        "Figure 3-6: Situation of heavy rain  disaster\t91",
        "Figure 3-7: Flow Chart of Initial Response for Heavy Rain(squall)\t95",
        "Figure 3-8: Safety Facilities in Fog-Prone Area\t98",
        "Figure 3-9: Flow Chart of Initial Response for Fog\t103",
        "Figure 3-10: Flow chart of Initial Response for Fire\t114",
        "Figure 3-11: Flow chart of Initial Response for Traffic Issue\t122",
        "Figure 3-12: Flow Chart of Initial Response for Explosions and Terrorism\t130",
        "Figure 3-13: Detailed Composition of MoWT’s Damage Investigation Team\t132",
        "Figure 3-14: Procedure for Traffic Restriction\t135",
        "Figure 3-15: Flowchart of Relief Supplies Distribution\t149",
        "LIST OF ABBREVIATIONS"
      ]
    },
    {
      "title": "General Operation",
      "content": [
        "Introduction",
        "Objectives",
        "This expressway operations manual contains guidelines and procedures for the efficient operation of expressways. This manual provides the necessary information for expressway operating agencies to safely operate and maintain expressways in optimal condition. The main purposes include ensuring expressway safety, optimizing traffic flow, and responding to emergencies.",
        "Importance of the Expressway Operations Manual.",
        "The importance and purposes of the expressway operation manual are as follows:",
        "Ensuring Safe Operation: The expressway operations manual is an essential tool for the safe management of expressways. It provides appropriate operational procedures and safety regulations to prevent traffic accidents and ensure the safety of drivers and users.",
        "Maintaining Efficient Traffic Flow: The manual provides guidelines for optimizing traffic flow, reducing congestion, and promoting efficient operations, thereby shortening drivers' travel time and easing the burden on the traffic system.",
        "Responding to Emergencies: The expressway operations manual includes procedures for responding to accidents and emergencies, helping to facilitate prompt and effective responses. This minimizes the damage from accidents and helps manage emergency situations.",
        "Services for expressway users: Various convenience and safety services such as toll plaza, service areas, traffic information, emergency towing, and vehicle breakdown assistance are provided to expressway users.",
        "Scope of Application",
        "The scope of application for the expressway operations manual includes the operation of an expressway section with spanning a total length of 70～100 km, four-lane dual carriageway with maximum Number of  five toll plazas and  two service areas and related ancillary facilities based on a scale manageable by a single station.",
        "1.1.3 Definition of Terms",
        "The expressway operations management manual covers various aspects, from routine operational procedures to traffic management and disaster management for emergency situations, and mainly includes the following content:.",
        "Table 1-1: Definition of Terms",
        "General Operations, Organization and Duties",
        "For the efficient operation of an expressway, it is essential to establish a systematic and efficient management organization, clearly defining the roles and responsibilities of each department to maximize work effectiveness.",
        "1.2.1 Operation Systems",
        "The expressway operation system is a comprehensive system that includes systematic components and procedures to ensure the efficient and safe operation of expressways. Beyond merely controlling traffic flow, it integrates various functions such as real-time information collection and analysis, incident response, facility control, and information dissemination to enhance user convenience and safety, as well as to enable the efficient management of expressway assets.",
        "Main Purposes",
        "Congestion Mitigation: Minimize delays and traffic jams to reduce time loss.",
        "Safety Enhancement: Prevent accidents and ensure prompt response when incidents occur.",
        "Mobility Improvement: Improve accessibility and travel efficiency through multimodal integration.",
        "Emergency Response Support: Enable rapid action and evacuation during natural disasters, accidents, or terrorist events.",
        "Components",
        "ITS (Intelligent Transportation Systems): Real-time data collection and dissemination through CCTV, VMS, sensors, etc.",
        "Ramp and Lane Control: Ramp metering and dynamic lane management.",
        "Traffic Incident Management System: Detection and coordinated response to accidents.",
        "Traffic Control room: Monitors traffic flow and supports centralized decision-making.",
        "Information Delivery System: Provides drivers with route guidance, congestion updates, and incident alerts.",
        "In conclusion, the expressway operation system is a core infrastructure framework that goes beyond mere vehicle flow control to maximize operational efficiency at both regional and national levels.",
        "1.2.2 Operations Organization Structure"
      ]
    },
    {
      "title": "1.2.2.1 Overview",
      "content": [
        "The organization for expressway operation is an essential component to ensure the safe and efficient management of expressways. Each station is structured with a systematic and hierarchical organization, which allows for clear role allocation and swift decision-making, enabling effective response in emergencies and enhancing the professionalism and efficiency of operational tasks.",
        "Expected operational Targets ;",
        "Systematic organizational management enables quick response in emergencies.",
        "Placement of specialized personnel for each task enhances operational quality.",
        "Continuous performance management and feedback systems contribute to improved operational efficiency."
      ]
    },
    {
      "title": "1.2.2.2 Organizational Hierarchy",
      "content": [
        "The station operation organization is composed of the following four hierarchical levels:",
        "Figure -1: Bacic Organization Structure for Station (Proposed)",
        "Level 1 (Station Manager): Responsible for overseeing the station and  making key decisions.",
        "Level 2 (Team Leader): Manages each specialized operational team and is responsible for planning  and coordination.",
        "Level 3 (Supervisor): Oversees specific tasks and is in charge of planning and executing operations, and reporting.",
        "Level 4 (Officer): Performs assigned tasks"
      ]
    },
    {
      "title": "1.2.2.3 Role and Personnel of Station Operation Team Structure",
      "content": [
        "A station for operation and maintenance is composed of the following function-based teams, each with defined roles and personnel:",
        "(1) Customer Support Team",
        "-Roles: General administration, contract management, customer service, Operation and management of service areas and toll plaza, etc.",
        "-Personnel: Operation Manager , Administration staff, Contract Supervisor, Customer Service staff , Business Manager , Service area and toll plaza staff (3–5),etc.",
        "(2) Road Maintenance Team",
        "-Roles: Pavement, roadside facilities, and safety infrastructure management",
        "-Personnel: Road Manager , Structure Manager , including staff and assistants for landscaping, electricity, and facilities",
        "(3) Traffic Safety Team",
        "-Roles: Monitoring traffic conditions, incident response, and TMC operation",
        "-Personnel: Traffic Manager , Traffic center operators , Patrol teams",
        "Additionally, the standard staffing levels are based on general positions, and staffing can be allocated differently depending on the characteristics of each branch office."
      ]
    },
    {
      "title": "1.2.2.4 Special Notes",
      "content": [
        "Personnel allocation for each station may vary depending on local traffic volume, road length, and operation methods.",
        "For efficient operation, specialized technical staff such as IT managers and mechanical/electrical technicians may be additionally assigned.",
        "1.2.3 Responsibilities of  Operations Organization",
        "To ensure safe and efficient expressway operations, the organizational structure consists of clearly defined departments, each tasked with specific responsibilities. The following outlines the key duties assigned to each department based on the standard operations organization chart.",
        "Table1-2: Responsibilities of Operations Organization",
        "Traffic Management",
        "Expressway traffic management is systematically carried out to ensure the safety of road users and the smooth flow of vehicles. Its main objectives are to alleviate congestion and maintain average travel speeds to maximize road capacity, as well as to prevent traffic accidents and respond swiftly to minimize human and material damage. In addition, in the event of emergencies such as natural disasters or accidents, the system aims to strengthen road safety and resilience through rapid and accurate response mechanisms. To achieve this, Intelligent Transport Systems (ITS) are implemented and operated to provide real-time traffic information, detect incidents, and analyze traffic volume. Furthermore, the maintenance and management of traffic control facilities such as signals, signs, and variable message signs help reduce confusion among road users and promote orderly driving. This traffic management system is based on continuous monitoring by the operating agency in coordination with the police and emergency response organizations.",
        "2.1 Traffic Control Room",
        "2.1.1 Introduction"
      ]
    },
    {
      "title": "2.1.1.1 Overview",
      "content": [
        "This section defines the standards and procedures for the efficient operation of the Uganda expressway traffic control room and provides guidelines for the systematic execution of traffic-related tasks. It covers key elements such as the components and terminology of the traffic management system, standard operating procedures (SOPs), shift work and information handover methods, emergency response procedures for incidents and disasters, and the detailed roles and responsibilities of personnel including the situation manager, situation handling group, and route management group. These guidelines aim to ensure stable 24-hour operation of the traffic control room and establish a system for prompt and consistent response to emergency situations."
      ]
    },
    {
      "title": "2.1.1.2 Applicable Terminology",
      "content": [
        "\"Expressway Traffic Management System (hereinafter referred to as the \"System\")\" refers to a system installed to swiftly and accurately collect and broadcast traffic information related to expressways and includes facilities such as vehicle detectors, CCTVs, VMS, and the respective system software.",
        "Vehicle Detector \"VDS\" : facilities such as loop-type vehicle detectors and video-type vehicle detectors installed on the paved surface or roadside for traffic information collection.",
        "Variable Message Sign \"VMS\" : Electronic display boards installed on expressways,toll booths, entrance ramps, etc., to provide real-time information to expressway users.",
        "Closed-Circuit TV \"CCTV\"  : Cameras installed on expressways to detect traffic situations through video and devices for screen broadcasting and playback.",
        "Traffic Situation Board refers to equipment in the traffic center situation room that displays and monitors information such as CCTV, electronic maps, etc., to understand traffic situations.",
        "\"Operator\" refers to shift workers in the 24-hour-operating traffic center situation room who manage and operate expressway situations & systems. Operators are divided into the traffic situation responsible personnel (hereinafter referred to as the responsible person), the situation group, and the route management group.",
        "\"Incident\" or \"Traffic Incident\" refers to abnormal traffic situations occurring on expressways, such as accidents, breakdowns, falling objects, maintenance work, weather changes, protests, and others. Among them, high-importance incidents are managed separately as special traffic situations.",
        "2.1.2 General Operation",
        "General Expressway operation refers to routine management and operational activities carried out to maintain the smooth and safe functioning of the expressway."
      ]
    },
    {
      "title": "2.1.2.1 Standard Operating Procedures (SOPs)",
      "content": [
        "Keep equipment organized and maintain the cleanliness of the workplace.",
        "Items not directly related to the traffic control work should be avoided, if possible, to ensure smooth operations.",
        "limit the use of mobile phones unless it is necessary.",
        "Visits by guests during working hours are prohibited unless there is an emergency and an alternative operator is available.",
        "The operator shall keep a daily work log of all special situations and administrative tasks handled during his/her shift, and hand it over to the next operator.",
        "The Operators must wear designated work uniforms during their shifts."
      ]
    },
    {
      "title": "2.1.2.2 Attendance and Shift Management",
      "content": [
        "Attendance Management",
        "(1)  Attendance",
        "Operators should arrive before the start of their working hours to receive sufficient handover information from the previous operator to ensure the continuity of operations.",
        "(2)  Leave",
        "In the case of leave, redistributed work should be prioritized, except in unavoidable circumstances, to ensure smooth shift work.",
        "Applications for leave, training, business trips, etc., Should be submitted with a prior approval request to the supervisor, to minimize changes in the shift schedule. If prior approval cannot be obtained due to unavoidable reasons, it should be reported as quickly as possible.",
        "Early Departure, etc.",
        "If a traffic control room operator is unable to work due to illness or legitimate reasons, they should report it to their line manager as soon as possible.",
        "If the situation manager cannot perform their duties due to unavoidable reasons, a designated employee appointed by a superior will act on their behalf.",
        "The situation manager should, by the end of each month, determine the next month's working days and hours for each operator in advance. They should also create and manage a duty roster to ensure that the distribution of substitute and special duties is balanced among employees for equal work shifts.",
        "Shift Management",
        "Operators should clearly brief the incoming shift operator on the following matters during shift changes, and the incoming operator should clearly understand these to prevent work gaps during shift changes:",
        "Traffic flow situations (ongoing or recently completed incidents)",
        "Scheduled matters necessary for traffic flow management (maintenance work, specific events, etc.)",
        "Instructions (especially those related to VMS messages)",
        "Other information needed during handover (VMS, CCTV malfunctions, complaints, etc.)",
        "In the event of a special traffic situation, support work until it is sufficiently manageable by the succeeding shift."
      ]
    },
    {
      "title": "2.1.2.3 Organization and Duties of Traffic Control Room",
      "content": [
        "The Traffic Control Room is a central hub where operators monitor and control traffic systems using real-time data, screens, and software.",
        "Figure 2-1: Organization Chart of Traffic Control Room",
        "Traffic Control room operators are categorized into situation commder, situation  management groups, and route management groups, each with specific duties as follows.",
        "(1) Duties of the Situation Commander",
        "Reporting Traffic Communication Emergency Situations: Report significant situations to the responsible department or through the chain of command during normal hours; during non-working hours, report to superiors or center directors via phone or SMS.",
        "Dissemination of Information: Ensure timely communication with higher-level and related agencies, and in urgent cases, initiate actions first and report afterward.",
        "Overall Situation Management: Continuously assess and manage the extent of damage and traffic status from the moment of notification, and direct timely and accurate interim and final reports.",
        "Traffic Detour Instructions: Coordinate with maintenance agencies to manage detour guidance and verify proper VMS display and inter-agency cooperation.",
        "Personnel Oversight: Supervise staff in the Situation and Route Groups to ensure effective traffic monitoring, incident reporting, public information, and complaint handling.",
        "(2) Duties of the Situation management Group",
        "Reporting: Upon occurrence of an emergency, report first to the Situation Commander, then submit initial, interim, and final reports to upper agencies based on instructions.",
        "Information Dissemination: Identify incident type and grade, report to the Situation Commander, and disseminate accordingly; take autonomous action in urgent cases or in the commander’s absence.",
        "Report Preparation: Maintain records of incidents and submit reports post-resolution; collaborate with the disaster response team if activated.",
        "Traffic Detour and VMS Display: Consult with maintenance agencies and follow instructions for detour and VMS message management, ensuring effective communication with related institutions.",
        "Others: Instruct team members on VMS display, message content, toll booth/service area announcements, and check task implementation regularly; escalate unclear situations to superiors.",
        "(3) Duties of the Route management Group",
        "CCTV Monitoring and Operation: Display relevant incident-area footage and surrounding congestion points on the traffic control screen and report observations.",
        "On-Site Information Collection: Gather incident-related information from branches and regional HQs, and work jointly with the Situation Group to minimize task gaps.",
        "VMS Message Operation: Input and update traffic messages in the VMS system; follow commander’s instructions regarding message content and scope; revert to standard messages once the situation ends."
      ]
    },
    {
      "title": "2.1.2.4 Information Acquisition and Dissemination",
      "content": [
        "The traffic situation room must operate a system that can constantly acquire information related to traffic flow, such as CCTV, VDS, customer reports, and maintenance agencies.",
        "Situation managers and situation handling groups must promptly report urgent information received regarding traffic flow and accident occurrences, following the principles of urgency, to the reporting system. They should then disseminate this information to relevant agencies via SMS and phone, following the instructions of the superior.",
        "Situation managers, when required to disseminate information to customers using the received information, should instruct the route management group to provide information quickly to customers through VMS, ensuring no inconvenience to customers."
      ]
    },
    {
      "title": "2.1.2.5 Data Management and Storage",
      "content": [
        "(1) Data produced within the Traffic Control room must be stored appropriately, and generally  the storage period for each is as follows:",
        "Work Diary: 1 year",
        "Incident Handling Log ; 1 year",
        "Daily Traffic Flow Situation; 1 year",
        "Expressway Situations: 1 year",
        "Other Documents: Store according to the importance of data, such as large-scale accidents, and exercise judgment internally.",
        "(2) The responsible  person reports the results to superiors after creating each record to ensure the efficient establishment of the information management system."
      ]
    },
    {
      "title": "2.1.2.6 Daily Situation Reports, etc.",
      "content": [
        "(1) Situation reports are categorized as follows, and each report is prepared at the specified time:",
        "Work Journal: Daily at 08:00(generally)",
        "Daily Traffic Flow Situation: Daily at 08:00(generally)",
        "Expressway Situations: Daily at 08:00(generally)",
        "(2) In the event of unusual incidents such as special traffic flow situations, they must be reported immediately to the superior without delay via phone call or SMS in accordance with the special traffic flow situation guidelines. After the situation ends, accident-related information should be organized and reported."
      ]
    },
    {
      "title": "2.1.2.7 System Management",
      "content": [
        "The situation and route management groups must regularly check the operation status of the systems within the traffic situation room for smooth task performance. In case of abnormalities, report to the responsible person, who will promptly notify the system personnel for necessary measures, if required, report the matter to superiors."
      ]
    },
    {
      "title": "2.1.2.8 Guidelines for Special Work",
      "content": [
        "In the event of disasters, adverse weather, or other extended special traffic management situations requiring special duty, operators shall actively cooperate by providing traffic-related data to ensure the smooth performance of tasks by special duty personnel.",
        "2.1.3 Traffic Special Situation handling"
      ]
    },
    {
      "title": "2.1.3.1 Situation Classification",
      "content": [
        "Abnormal traffic situations caused by various factors such as traffic accidents, disasters, maintenance work, weather anomalies, and protests are classified as \"emergency situations\" as they deviate from normal expressway traffic conditions. Among these, the situations requiring special management are categorized as \"special traffic situations\" as follows:",
        "Traffic accidents",
        "Situations where congestion occurs or is expected due to illegal occupation of roads by interest groups, slow driving, law-abiding driving, or roadside rallies",
        "Situations where adverse weather conditions such as heavy rain, typhoons, or fog pose a risk to traffic flow or cause continuous disruption",
        "Situations where maintenance work results in congestion and obstructs traffic",
        "Cases involving complete frontal traffic blockage",
        "Congestion not caused by traffic volume and not falling under the above categories",
        "The Accident grade and type related to \"traffic accidents\" are as follows:",
        "Table 2-1: Traffic Accident Classification",
        "※ Complete blockage includes blocking of roadside shoulders."
      ]
    },
    {
      "title": "2.1.3.2 Situation Report",
      "content": [
        "When a traffic situation occurs, the responsible person must promptly assess the situation and report to superiors without delay via oral communication, phone call, SMS, or other means.",
        "Upon the occurrence of a situation, the situation handling group and route management group may request appropriate actions from the relevant maintenance agency, and the maintenance agency must regularly report the situation to headquarters via phone call or hotline until it is resolved.",
        "For the prompt handling and dissemination of incidents, if accurate assessment takes time, it is permissible to report based on estimated conditions. If the number of casualties or accident grade is unclear, the situation may be managed at a higher grade level."
      ]
    },
    {
      "title": "2.1.3.3 Procedure for Handling Emergency Situations",
      "content": [
        "The procedure for handling emergency situations is based on the \"Special Traffic Situation Handling Procedure Flowchart.\" If a disaster response organization is established, the traffic situation is handed over to the disaster response organization, and cooperation is provided for the organization's traffic situation assessment and internal/external reporting.",
        "Figure 2-1: Special Traffic Situation Handling Procedure Flowchart",
        "Among special traffic situations, the type and severity of the incident are promptly assessed upon receiving the report. The situation is reported to internal and external higher authorities in stages as initial, intermediate (if necessary), and final reports.",
        "The detailed procedures for disaster situations follow the \"Expressway Disaster Management Section."
      ]
    },
    {
      "title": "2.1.3.4 Responsibilities of Situation Manager",
      "content": [
        "(1) Reporting of Special Traffic Situations",
        "During regular working hours, if an important situation arises the responsible person must report according to the relevant department and command structure.",
        "If it is deemed an important situation outside regular working hours, the responsible person files the initial report to superiors or the center director and then receives instructions for reporting to internal/external higher authorities via phone call or SMS.",
        "In the event of a disaster response in the comprehensive disaster situation room, the responsible person hands over the disaster occurrence and response situation to the response organization, collaborates, and ensures that the relevant information is continuously managed.",
        "(2) Dissemination of Information to External Higher Authorities and Relevant Agencies",
        "During special traffic situations, the dissemination of information should be discussed with the relevant department and reported to external higher authorities if it is a significant traffic accident or a disaster situation.",
        "In urgent situations where, immediate measures are deemed necessary or if it is considered impractical to receive instructions through the command system, the responsible person can initiate the dissemination of information to external higher authorities and report the details.",
        "In the event of a special traffic situation, instruct broadcasting stations, expressway patrol units (control rooms), and relevant agencies to disseminate information and actively cooperate with traffic information guidance and swift situation handling. Similarly, report when the situation is resolved.",
        "Respond to major traffic accidents (grade 1 accidents, etc.) and disaster incidents.",
        "(3) Situation Reporting and Command for Dissemination",
        "In the event of a traffic accident (grades 1 and 2) or a disaster/emergency situation, the responsible person, from the moment of situation notification, must quickly assess the extent of damage and traffic conditions, continuously monitor and manage the situation, determine the timing of intermediate reports based on the traffic situation and accident handl\ting process, and provide instructions to ensure prompt and accurate reporting.",
        "Ensure timely reporting of daily traffic situation reports  and reports on traffic accident situations.",
        "(4) Judgment and Instructions for Traffic Diversion",
        "If vehicle diversion is required due to a reported situation, the responsible person collaborates with the relevant maintenance agency to confirm and manage smooth traffic diversion.",
        "The responsible person ensures the smooth operation of tasks related to VMS display management of diversion messages, cooperation with relevant agencies, etc.",
        "(5) Management of Team Members' Tasks",
        "The responsible person conducts ongoing guidance and checks for the personnel of the situation handling group, route handling group, and other relevant working groups, ensuring smooth information provision and traffic situation management."
      ]
    },
    {
      "title": "Duties of the Situation Handling Group Manager",
      "content": [
        "(1) Reporting of Special Traffic Situations",
        "When a special traffic situation occurs, the situation handling group reports the initial report to the responsible person, receives instructions, and reports to higher authorities, categorizing reports into initial, intermediate (if necessary), and final for important situations.",
        "(2) Dissemination of Information to External Higher Authorities and Relevant Agencies",
        "When a special traffic situation occurs, the situation handling group promptly assesses the reported situation, reports to the responsible person, and disseminates information to internal/external higher authorities based on the grade of the incident for each type.",
        "In urgent situations or when it is deemed impractical to receive instructions through the command system, the situation handling group can initiate information dissemination to external higher authorities before reporting the details.",
        "In the event of a special traffic situation, the situation handling group quickly identifies relevant agencies and reports to the responsible person or higher authorities, disseminating information immediately. Similarly, report when the situation is resolved.",
        "Respond to major traffic accidents (grade 1 accidents, etc.) and disaster incidents.",
        "(3) Preparation and Management of Reports on Reported Situations",
        "The situation handling group ensures that reports on reported situations are recorded and reported through the reporting system after the situation is resolved.",
        "In the event of a disaster response, cooperation is provided, and the relevant information is continuously managed.",
        "(4) Confirmation of Traffic Diversion and VMS Display Instructions",
        "If vehicle diversion is necessary, the situation handling group reports to the responsible person or higher authorities and follows their instructions.",
        "The situation handling group ensures the smooth operation of tasks related to VMS display management of diversion messages & cooperates with relevant agencies, etc.",
        "(5) Team Members' Tasks",
        "The situation handling group ensures that the following tasks are assigned to and performed by the respective team members.",
        "Confirmation of VMS at toll booths and rest areas",
        "Adequacy of VMS message content and display range",
        "Proper implementation of role division among members in the traffic control room",
        "Adequacy of other tasks related to the team members' handling of reported situations, etc."
      ]
    },
    {
      "title": "2.1.3.6 Duties of Situation Handling Group Members",
      "content": [
        "Situation handling group members support the group leader during regular times and take on their role in their absence to efficiently perform situation management tasks. In the event of a special traffic situation, they follow the commands of the responsible person or the situation handling group leader, preparing and managing the following:",
        "(1) Confirmation of CCTV for Reported Situations and Situation Assessment",
        "When a significant event is deemed to occur, the situation handling group confirms and manages the CCTV at the specified locations on the traffic situation display, before and after the reported situation, to assess the situation occurrence point, congestion, and diversion situation.",
        "During situation notification, the situation handling group continuously checks the CCTV for the accident scale, traffic situation, etc., and reports to the responsible person and the situation handling group leader.",
        "(2) Preparation of Reports on Reported Cases",
        "In the event of a traffic accident (grades 1 and 2) or a disaster/emergency situation, situation reports are prepared and submitted to the responsible person and the situation handling group leader.",
        "The situation handling team members convey reported situations to other team members.",
        "(3) Management of Reported Cases",
        "In the event of a special traffic situation, the team members of the route handling group must continually assess and report the situation to the situation manager and team leader from the time of situation notification until its resolution. They should focus on the following aspects:",
        "Location of the reported situation",
        "Details of the reported situation (related vehicles, etc.)",
        "Traffic conditions (blocked lanes, diversion sections, isolated vehicle turnaround, lane flow, etc.)",
        "Presence of casualties and road damage, scale of the incident",
        "Spillage of cargo, occurrence of fire, presence of hazardous materials",
        "Other details related to the handling of the reported situation",
        "Preparation, reporting, and dissemination of the reported situation report (1P)"
      ]
    },
    {
      "title": "2.1.3.7 Duties of the Route Handling Group",
      "content": [
        "During a traffic situation, members of the route handling group must follow the instructions of the situation manager or team leader and perform the following roles:",
        "(1) Confirmation and Operation of Expressway CCTV",
        "Confirm the location of the traffic situation and select the relevant CCTV footage to display on the traffic situation board. Continuously display footage from surrounding points to assess congestion at the reported location and report confirmed details to the situation manager or the situation handling group.",
        "Arrange and display CCTV footage of the incident location and surrounding areas on the traffic situation board to ensure proper video linkage.",
        "(2) Confirmation and Compilation of On-Site Investigation Details",
        "Collect and manage information and notifications related to the traffic situation from the reported site.",
        "Cooperate with the situation handling group to minimize task gaps and prevent operational issues.",
        "(3) Display of VMS Messages",
        "Use the \"VMS Input Program\" to enter text information into the system and display it on the VMS during a traffic situation.",
        "Update message content as the situation changes by modifying the displayed information.",
        "Follow the instructions of the situation manager or the situation handling group leader regarding the content and range of VMS messages.",
        "Once the special traffic situation is fully resolved and traffic returns to normal, switch to the routine display message.",
        "2.2 Route Safety Patrols",
        "2.2.1 Introduction"
      ]
    },
    {
      "title": "2.2.1.1 Overview",
      "content": [
        "Route Safety Patrols are field-based units responsible for monitoring real-time traffic conditions on expressways and responding promptly to emergencies such as accidents, congestion, and fallen objects to ensure safe and efficient operations.\nThey conduct regular patrols along designated routes to detect early signs of irregularities or obstacles and prevent traffic congestion.",
        "In the event of an accident, they are the first to arrive on the scene and implement initial safety measures to prevent secondary accidents and secure the site."
      ]
    },
    {
      "title": "2.2.1.2 Objective",
      "content": [
        "This section defines the safety patrol work system, methods, and procedures, aiming to ensure consistent and appropriate responses by safety patrol personnel in expressway safety patrol operations. It seeks to enhance customer service and ensure traffic safety on expressways."
      ]
    },
    {
      "title": "Safety Patrol Officer",
      "content": [
        "(1) Definition - An employee appointed by the expressway management agency as a safety patrol officer to ensure expressway traffic safety and handle traffic accidents",
        "(2) Compliance Requirements;",
        "Wear the prescribed uniform and safety gear neatly.",
        "Carry the Road Management ID and perform safety patrol duties.",
        "Report all or any physical conditions that may hinder the execution of your work.",
        "Driving under the influence of alcohol is strictly prohibited.",
        "Before operation, perform a routine inspection of the safety patrol vehicle and check for any abnormalities in the warning devices, communication equipment, and safety equipment inside the vehicle.",
        "The safety patrol vehicle may not be used for purposes other than safety patrol duties or other tasks directed by the supervising authority.",
        "When operating the safety patrol vehicle, seat belts must be worn at all times, and the vehicle must be operated in compliance with the relevant provisions.",
        "Route patrols must maintain a safe speed (80–90 km/h) and reduce speed in accordance with relevant laws during adverse weather conditions.",
        "Break times shall be taken at the designated times set by the supervising authority and conducted in a manner that does not interfere with work duties.",
        "Standby shall be conducted at a location designated by the supervising authority, with the safety devices attached to the safety patrol vehicle activated and in a state of readiness for emergency dispatch.",
        "During safety patrol operations, any incidents that occur must be frequently reported to the Traffic control room.",
        "(3) Safety Rules",
        "During duty, personal safety equipment (safety vest, safety clothing, safety helmet, whistle, etc.) must be worn at all times.",
        "All tasks must adhere to the principle of ensuring safety first, followed by task execution.",
        "In the event of an emergency dispatch, the safety devices attached to the safety patrol vehicle, such as warning lights, sirens, and LED display boards, must be activated to qualify for the legal exceptions applicable to emergency vehicles. Special attention must also be given to safe driving.",
        "When approaching the site, activate the emergency lights on the safety patrol vehicle, drive slowly, and monitor the rear traffic condition. The safety patrol officer positioned in the approach direction (driver's side for right-side approach, passenger's side for left-side approach) should guide rear vehicles to slow down.",
        "For rear safety management after an incident, deploy the foldable safety guide panels, and have two safety patrol officers manage the situation simultaneously. While one officer guides rear traffic to slow down and drive safely, the other officer installs safety equipment starting from the furthest point of the incident. Removal is done in reverse order of installation using the same method. Use a whistle to facilitate smooth communication and task execution between safety patrol officers during safety management.",
        "The traffic safety patrol officer must be familiar with the signaling methods as shown in Figure below and perform duties at a point between the incident site and the safety patrol vehicle where safety can be ensured. While monitoring rear traffic, a signal flag should be used during the day, and a signal baton should be used at night or during adverse weather conditions. However, the position may be adjusted if rear visibility is limited.",
        "Standby on the shoulder is fundamentally prohibited. However, to prevent rear-end collisions at the tail end of traffic congestion, the safety patrol vehicle may temporarily stop on the shoulder at a designated interval from the end of the congestion, with safety devices such as sirens activated.",
        "Comply with other safety rules established by the supervising authority.",
        "Figure 2-2: Traffic Patrol Officer"
      ]
    },
    {
      "title": "2.2.1.4 Scope of Work",
      "content": [
        "Road safety patrol duties are categorized into route patrols, customer response and support, traffic accident handling, guidance and reporting of vehicles violating regulations, imposition of charges on responsible parties, and other tasks directed by the supervising authority, all aimed at improving expressway traffic safety.",
        "(1) Route patrols",
        "Road safety patrol vehicles patrol the designated routes to handle traffic hazards, disseminate road and traffic conditions, and inspect the condition of facilities and structures.",
        "(2) Customer response and support",
        "Provide maximum assistance to expressway users' within their limits that do not interfere with road patrol duties, and perform tasks to respond courteously to expressway users who experience inconvenience or harm while using the expressway.",
        "(3) Traffic accident handling",
        "Perform tasks related to safe accident management, prompt situation reporting, and ensuring smooth traffic flow at accident locations on the expressway. Additionally, collect basic data for future accident investigation and analysis.",
        "(4) Guidance and reporting of vehicles violating regulations",
        "Perform guidance and reporting tasks for vehicles that violate traffic or automobile-related regulations while driving on the expressway.",
        "(5) Imposition of charges on responsible parties",
        "In the event of damage to expressway facilities caused by a traffic accident, identify the details of the damage, notify the responsible party of the applicable charges and affected facilities, and report to the Traffic control room. Additionally, regularly inspect and manage the progress of the damaged facility's restoration.",
        "2.2.2 Safety Patrol Operation and work system"
      ]
    },
    {
      "title": "Safety Patrol Operation",
      "content": [
        "(1) Road Patrol Section",
        "To ensure smooth road safety patrol operations on the expressway, the route is divided into 1 to 3 sections based on route length and traffic volume. Additionally, the station manager must designate and operate at least one standby location for safety patrol vehicles in safe zones adjacent to the main expressway, based on traffic accident analysis for each section.",
        "(2) Assignment of Duties",
        "Road safety patrol officers are organized into four teams of two members per section, working in three shifts (first shift, middle shift, last shift).",
        "Team members are allocated in a balanced manner, considering their work experience, but the station manager may adjust and manage the allocation as needed.",
        "The station manager may appoint one member of the safety patrol team as the team leader to ensure efficient team operations."
      ]
    },
    {
      "title": "2.2.2.2 Safety Patrol work system",
      "content": [
        "(1) Working Hours",
        "The working hours for each team are usually set at 8 hours, including a 1-hour break, i.e. First Shift: 06:00–15:00, Middle Shift: 14:00–23:00, Last Shift: 22:00–07:00).",
        "Break times shall be designated in advance, considering the conditions of each branch, but to enhance on-site responsiveness, breaks shall be flexible. In the event of an emergency, break times may be adjusted and reassigned.",
        "Each shift must patrol the designated section at least 3 times during the first shift, 3 times during the middle shift, and 4 times during the last shift. Additionally, patrol routes should be assigned and managed to ensure that each facility and entry/exit point is patrolled at least once per shift.",
        "Working (break) hours, patrol frequency, and routes may be adjusted and managed by the station manager within the scope of relevant laws and operational standards, considering the total patrol distance and local conditions.",
        "The station manager may require the previous shift to work overtime within the scope of relevant laws and operational standards in the event of simultaneous emergencies during shift changes to ensure a prompt response.",
        "(2) Shift Change",
        "Handover during shift changes between teams shall, in principle, be conducted at a location designated by the station  manager, such as the Traffic control room. However, in the event of accident handling, disasters, or other unavoidable situations, shift changes may be conducted on-site under the station  manager's instructions.",
        "Shift changes shall be conducted in the presence of the Traffic Safety Team Leader. In the absence of the Team Leader, they shall be conducted in the presence of the Traffic control room staff.",
        "The supervisor overseeing the shift change shall check the readiness of the road safety patrol officers for duty (e.g., sobriety) and provide safety training or communicate work-related information.",
        "During the shift change, the incoming officer shall review the key issues from the previous shift and take over any items carried by the outgoing officer.",
        "Shift changes must be conducted sequentially by section to minimize work gaps on-site, and detailed operational plans should be implemented in accordance with on-site conditions.",
        "During their shift, workers must report patrol log that they have completed through the reporting chain at the end of their shift. The station manager may adjust and manage the detailed reporting methods.",
        "(3) Leave and Substitute Work",
        "For leave of less than one-week, prior approval, including the designation of a substitute worker, must be obtained at least three days in advance. If prior approval cannot be obtained due to unavoidable circumstances, a separate emergency report must be submitted.",
        "For long-term leave of more than one-week, prior approval must be obtained at least seven days in advance to allow for the arrangement of a substitute worker.",
        "Substitute work can be carried out only after obtaining prior approval within the standard working hours, and extended working hours in a single day must not exceed 12 hours.",
        "A time and attendance ledger must be prepared and managed for leave (including personal absences) and substitute work."
      ]
    },
    {
      "title": "Safety Patrol Training",
      "content": [
        "(1) Safety and Job Training",
        "Under the responsibility of the station manager, safety and job training must be conducted in accordance with relevant laws through group training, on-site training, or online remote training. The details must be recorded and maintained in a separate training log, and the signatures of the training participants must be obtained.",
        "Traffic safety education for emergency vehicle drivers, as required by relevant laws, must be conducted regularly.",
        "(2) Safety Training conducted as Needed",
        "During shift changes, training on major accident reporting, safety management guidelines for various situations, and other traffic safety matters should be conducted. Due to the nature of shift work, the training can be divided and carried out accordingly.",
        "Safety training conducted on an ad-hoc basis shall be carried out by the Traffic Safety Team Leader at least once a month, and the training records shall be managed in a training log.",
        "(3) Other Training",
        "The Traffic Safety Team Leader must conduct training on personal information protection, related to tasks such as handling charges for responsible parties and preparing patrol logs. The training records shall be managed in a training log.",
        "2.2.3 Route Patrol"
      ]
    },
    {
      "title": "2.2.3.1 Handling Traffic Hazards",
      "content": [
        "(1) Road Surface Debris Removal",
        "Upon receiving a situation report, confirm the exact location, activate the warning lights (including the siren) and LED display board, report the current location to the Traffic Management Center, and proceed promptly. (Check the VMS message display during transit.)",
        "Proceed slowly in the leftmost lane starting from the adjacent section of the reported location. Upon discovering debris, stop on the shoulder and verify the type of debris.",
        "In the case of lightweight or small debris, the passenger-side safety patrol officer guides rear vehicles to change lanes, while the driver-side safety patrol officer ensures rear traffic control and removes the debris once safety is secured. However, if shoulder access is difficult due to multiple lanes, rear vehicles should be guided to slow down, and the patrol vehicle should stop in the lane behind the debris for removal.",
        "In the case of heavy or large amounts of debris, guide rear vehicles to slow down, stop the safety patrol vehicle in the lane behind the debris, ensure safety management, and promptly request equipment and manpower support from the Traffic Management Center.",
        "Removed debris should, in principle, be loaded onto the safety patrol vehicle and disposed of at a designated location. If this is not possible, request debris removal from the Traffic Management Center to handle it outside the road.",
        "Animal carcasses resulting from roadkill on the expressway should be moved off the road. A removal request should be made to the Traffic Management Center.",
        "(2) Pedestrians (including two-wheelers)",
        "Upon receiving a situation report, confirm the exact location, activate the warning lights (siren) and LED display board, report the current location to the Traffic Management Center, and proceed promptly. (Check the VMS message display during transit.)",
        "Upon spotting pedestrians (including two-wheeler riders), reduce the siren volume and approach them. The passenger-side safety patrol officer should explain the prohibition of expressway access to the pedestrian (including the two-wheeler rider).",
        "Depending on the situation, take measures to move the pedestrian or two-wheeler off the expressway, such as by allowing them to board the safety patrol vehicle. If necessary, hand them over to the nearest police station. For abandoned two-wheelers, arrange emergency towing services or use equipment owned by the supervising authority to relocate them.",
        "If they refuse to comply with the relocation measures, request cooperation from the local police station to handle the situation jointly.",
        "(3) Vehicles Failing to Adhere to Safe Driving",
        "If a vehicle hindering traffic safety, such as one driving drowsily or at low speed, is spotted, activate the warning lights and siren while approaching in the adjacent lane.",
        "Use the in-vehicle microphone to encourage safe driving, and, depending on the situation, stop the vehicle in a safe zone to take necessary measures.",
        "If the vehicle fails to comply with safe driving despite active guidance, request cooperation from the local police station to handle the situation jointly.",
        "In the case of a wrong-way vehicle, tasks should be carried out in mutual cooperation with the local police station.",
        "(4) Faulty Vehicles",
        "Upon receiving a situation report, confirm the exact location, activate the warning lights (siren) and LED display board, report the current location to the control room, and proceed promptly. (Check the VMS message display during transit.)",
        "Upon spotting the faulty vehicle, activate the vehicle's hazard lights and approach slowly. The safety patrol officer positioned in the approach direction should use hand signals to guide rear vehicles to slow down.",
        "If the faulty vehicle can be moved manually, control rear traffic in the left lane using the safety patrol vehicle and move the faulty vehicle to the shoulder. After ensuring rear safety management, guide the driver and passengers of the faulty vehicle to a safe location, such as off the road, and make efforts to promptly relocate the faulty vehicle to a safe zone by requesting emergency towing services or other necessary measures.",
        "(5) Shoulder-Stopped Vehicle",
        "In the event a vehicle stops on the mainline shoulder, activate the warning lights (siren) and LED display board, and approach from the rear.",
        "To promptly handle the stopped vehicle, the passenger-side patrol officer guides rear vehicles to slow down, while the driver-side patrol officer approaches the passenger side of the stopped vehicle and explains the dangers of stopping on the mainline shoulder which is subject to penalties for illegal stopping or parking.",
        "If the driver of the vehicle is unable to drive (due to intoxication, health issues, etc.), request cooperation from relevant agencies such as the local police station or the rescue team to discuss and handle the driver and the vehicle.",
        "If the vehicle requires customer assistance or is faulty, perform the task in accordance with the regulations for customer response and support.",
        "If the vehicle is abandoned due to the absence of the driver (e.g., missing, hospitalized, or detained), ensure rear safety management and arrange for emergency towing to a safe zone in consultation with the local police responsible for traffic management.",
        "(6) Animal",
        "Upon receiving a report of animal presence, confirm the exact location, activate the warning lights (siren) and LED display board, report the current location to the Traffic control room, and proceed promptly. (Check the VMS message display during transit.)",
        "Upon spotting an animal, activate the hazard lights and approach while using hand signals from inside the vehicle to guide rear traffic to slow down.",
        "The principle is to guide the animal off the road, but actively cooperate with relevant agencies (such as UWA) for capture and handling when necessary."
      ]
    },
    {
      "title": "Dissemination of Road and Traffic Conditions",
      "content": [
        "(1) Pavement Damage",
        "During route patrol operations, regularly inspect the road surface, and if pavement damage is identified, immediately report it to the Traffic control room.",
        "If the pavement damage is severe and poses a risk of accidents, ensure rear safety management and promptly request repair personnel from the Traffic control room.",
        "If there are vehicles damaged due to potholes or similar issues, handle the case in accordance with the standards for facility-related accident complaints, and report it to the Traffic control room to ensure it is transferred to the relevant personnel. (If necessary, secure photos of the damaged road surface and the damaged vehicle parts.)",
        "(2) Road Facility Damage",
        "During route patrol operations, regularly inspect the condition of road facilities, and if any facility damage is identified, immediately report it to the Traffic control room.",
        "If facility damage poses a risk of accidents, ensure rear safety management and promptly request repair personnel from the Traffic control room.",
        "If there are vehicles damaged due to the broken facility, handle the case in accordance with the standards for facility-related accident complaints, and report it to the Traffic control room to ensure it is transferred to the relevant personnel. (If necessary, secure photos of the damaged facility and the damaged parts of the vehicle that caused the accident.)",
        "In the case of facility damage that does not pose a problem for vehicle operation, take minimal safety measures (such as setting up cones) and resume patrol duties. Prepare an incident report and submit it to the relevant personnel.",
        "(3) Safety Management of the Worksite",
        "The first shift worker shall collect and review the daily work plan from the Traffic control room before starting duty and hand it over to the next shift worker during the shift change.",
        "During route patrol operations, verify whether all work on the expressway has a work plan and has been reported to the Traffic control room. In the case of unplanned or unreported work, immediately report it to the Traffic control room and take necessary actions, including halting the work.",
        "For work with approved work plans and completed reporting, check whether rear safety management is being conducted in compliance with the \"Expressway Worksite Traffic Management guidelines (Maintenance Manual),\" and report the findings to the Traffic Control Room.",
        "(4) Traffic Congestion",
        "In case of traffic congestion caused by increased traffic volume or blocking work, use warning lights (siren), LED display boards, and foldable safety guide panels at a safe location near the tail end of the congestion to guide mainline drivers to drive cautiously and provide enhanced information about traffic congestion ahead. Report the congestion status to the Traffic control room.",
        "If the actual traffic congestion differs from the traffic information displayed on the Variable Message Sign (VMS), report it to the Traffic control room  for correction.",
        "In the event of sudden traffic congestion, promptly proceed to the location, identify the cause, and report it to the Traffic control room.",
        "(5) Other Facilities",
        "During route patrol operations, check the operational status of traffic management facilities (e.g., VMS, LCS), streetlights, and other safety facilities, and report any abnormalities to the Traffic control room.",
        "(6) Natural Disaster",
        "During route patrol ope`rations, if adverse weather conditions (e.g., heavy rain,  fog, etc.) occur, assess the situation accordingly and report the details to the Traffic control room.",
        "Heavy Rainfall: Rainfall intensity, road drainage conditions, and the condition of vulnerable areas (e.g., erosion, flooding).",
        "Fog: Fog density (visibility) and operational status of fog-related facilities.",
        "In the event of natural disasters (e.g., storms, earthquakes, fog) caused by adverse weather conditions, respond in accordance with the relevant manuals."
      ]
    },
    {
      "title": "Inspection of Facility and Structural Conditions",
      "content": [
        "(1) Inspection of Facility Conditions",
        "Bus stops, Rest Areas",
        "The safety conditions of expressway bus stops and rest areas must be inspected at least once per shift, and the results should be recorded in the inspection ledger. Any abnormalities must be reported to the Traffic control room.",
        "Checklist items include;",
        "Cleanliness of the surrounding area and the maintenance condition of facilities (including restrooms).",
        "Guidance and Reporting of Illegal Parking and Stopping",
        "Guidance for Solicitation and Sales Activities by Unauthorized Vendors",
        "Guidance for Solicitation by Nearby Restaurants and Unauthorized Pedestrians on the Expressway",
        "If illegal parking or stopping poses a risk of traffic accidents, immediately explain the danger to the driver and have them relocate the vehicle. However, if an emergency situation at another location necessitates immediate departure, take minimal safety measures (e.g., placing cones) before promptly moving to the next location.",
        "For long-term parked vehicles, conduct an on-site inspection and report the findings to the Traffic control room to ensure appropriate actions can be taken.",
        "If poor facility conditions are deemed likely to cause inconvenience to customers, immediately report the issue to the Traffic control room to ensure necessary actions can be taken.",
        "Service Area, Toll Plaza",
        "The safety conditions of expressway service areas and toll plazas must be inspected at least once per shift, and the results should be recorded in the inspection ledger. Any abnormalities must be reported to the Traffic control room.",
        "Checklist items include;",
        "Inspection for Abnormalities in Facilities and Structures",
        "Safety Conditions of Users and Parked or Stopped Vehicles",
        "Guidance and Reporting of Illegally Parked or Stopped General Vehicles",
        "Condition of the Pavement in the Plaza Area",
        "Operational Status of Traffic Safety Promotional Materials ( Banners, etc.)",
        "If illegal parking or stopping poses a risk of traffic accidents, immediately explain the danger to the driver and instruct them to relocate the vehicle. However, if an emergency at another location necessitates immediate departure, implement minimal safety measures (e.g., placing cones) before promptly moving to the next location.",
        "If poor facility conditions are deemed likely to cause inconvenience to customers, immediately report the issue to the Traffic control room to ensure necessary actions can be taken.",
        "(2) Inspection of Structural Conditions",
        "The safety conditions of expressway structures (e.g., tunnels, bridges) must be inspected at least once per shift, and the results should be recorded in the inspection ledger. Any abnormalities must be reported to the Traffic control room. Inspections should primarily be conducted visually from within the safety patrol vehicle. However, if an abnormality is suspected, exit the vehicle and perform a detailed inspection after ensuring rear safety.",
        "Inspection for Abnormalities in Bridges, Tunnels, and Other Structures",
        "Inspection for Abnormalities in Traffic and Communication Facilities",
        "Disaster Situations Such as Fires in Facilities",
        "The condition of facilities near the emergency turnaround at tunnel entry and exit points, as well as the operation status of the barriers, must be checked.",
        "The maintenance status of inspection paths and emergency escape routes on bridges (e.g., locking devices) must be checked.",
        "If the condition of the structure is poor and deemed likely to cause inconvenience to customers, immediately report it to the Traffic control room to ensure necessary actions can be taken.",
        "2.2.4 Customer Response and Support"
      ]
    },
    {
      "title": "Customer Service Attitude and Methods",
      "content": [
        "(1) Attitude in Customer Service",
        "Maintain dignity when dealing with customers and respond with kindness, proper posture, and sincerity.",
        "Express deep regret to the customer for any damage or inconvenience experienced while using the expressway and inquire about their well-being.",
        "Listen attentively to the customer's requests or statements and avoid interrupting them.",
        "Provide maximum support for the customer's requests within the scope of possible duties.",
        "When necessary, express sympathy for the customer's statements, but refrain from rebutting their claims or mentioning any faults in their actions.",
        "Avoid raising your voice, using profanity, or engaging in behavior that could escalate additional complaints by aligning with the customer's agitated attitude.",
        "(2) Customer Service Methods",
        "If a customer and vehicle are on the expressway, perform rear safety management then relocate the customer to a safe location off the road before aiding.",
        "If an emergency situation at another location necessitates immediate relocation during customer service, kindly explain the situation to the customer, maintain rear safety management, hand over the task to the Traffic control room, and then proceed to the new location.",
        "Record the customer response and support performance in the \"Patrol Log\" and report it to the Traffic control room.",
        "When implementing emergency towing services for disabled vehicles or similar cases, complete the Emergency Towing Service Confirmation Form and submit it to the Traffic control room."
      ]
    },
    {
      "title": "Guidelines for Situational Responses",
      "content": [
        "(1) Customer Support",
        "When a customer support request is received, verify the vehicle type, registration number, and the details of the request.",
        "If the customer support request falls within the scope of services (e.g., battery charging, coolant replenishment, towing assistance, contacting service providers), provide prompt support.",
        "For unreasonable requests beyond the scope of support, kindly explain the safety patrol officer's responsibilities and carry out the tasks.",
        "(2) Complaints Due to Accidents Caused by Falling Objects (Preceding Vehicle/Debris)",
        "In the event of an accident caused by falling objects (debris), identify the damaged vehicle and the reported falling object (debris). If necessary for accident handling, complete the \"Traffic Accident Investigation Form\" and submit it to the Traffic Management Center.",
        "For accidents caused by falling objects from a third-party vehicle, explain that compensation should, in principle, be sought from the vehicle responsible for the accident. If evidence, such as dashcam footage of the falling object, is available, guide the affected party to report the incident as a traffic accident to the local police station for processing.",
        "In the case of accidents caused by falling objects or debris from an unidentified source, if the complainant demands compensation directly from the expressway maintenance and management agency, kindly explain that such incidents are unavoidable despite our organization's efforts to prevent damage. Provide a clear understanding that compensation is not possible, referencing relevant laws to support the explanation.",
        "(3) Accident Complaints Related to Facilities",
        "In the event of an accident caused by facilities or pavement under the maintenance of the expressway management agency, identify the damaged vehicle and the responsible facility. If necessary for accident handling, complete the \"Traffic Accident Investigation Form\" and submit it to the Traffic Management Center.",
        "If a maintenance defect in the agency's facility is identified, report it to the Traffic Management Center and ensure it is handed over to the relevant personnel. When handing it over, the \"Traffic Accident Investigation Form\" and related photos must be submitted.",
        "The compensation process for damaged vehicles shall follow the Uganda regulations and Standards.",
        "2.2.5 Traffic Accident Handling"
      ]
    },
    {
      "title": "2.2.5.1 Basic Principles",
      "content": [
        "Accident handling must consider the conditions of the accident site, implementing appropriate traffic control to ensure smooth traffic flow for continuing vehicles and securing safety at the accident scene.",
        "Guide the parties involved in the accident and related personnel from relevant agencies into the safety management zone to prevent secondary accidents during the handling of the incident.",
        "For prompt and efficient accident handling, maintain close cooperation with relevant agencies such as the local police station, 999 rescue team, recovery companies, and local authorities.",
        "Accident handling time must be minimized through prompt and accurate accident reporting and situation dissemination via wired and wireless communication.",
        "For all accidents, accurate accident investigation and related photos must be obtained in accordance with the \"Traffic Accident Investigation Form.\"",
        "If an incident is discovered in another branch's jurisdiction or if a dispatch order is received from another branch's Traffic Management Center, promptly proceed to the site to perform rear safety management and accident handling tasks. Once the safety patrol team from the responsible branch arrives, hand over the tasks and return to the designated patrol section.",
        "For vehicles causing disruptions to traffic safety and flow, guide them to move to the shoulder or a safe area. If they do not comply, coordinate with the local police station to take legal action."
      ]
    },
    {
      "title": "Handling of Traffic Accidents",
      "content": [
        "(1) Safety Management",
        "To ensure the safe driving of rear/continuing vehicles, install various signs and cones behind the accident site, and deploy safety patrol vehicles and traffic control safety patrol officers. However, in cases where enhanced safety is required, such as areas with poor visibility or long-term mainline closures (over 1 hour), deploy a safety guide vehicle (sign car).",
        "The length of the guide lane should be determined appropriately, considering the type of accident, traffic conditions, road conditions, and other factors to ensure effective control.",
        "The installation of various signs and cones should be conducted simultaneously by at least two safety patrol officers. While one officer guides rear vehicles to slow down and drive safely, the other installs safety equipment starting from the furthest point from the incident site. Removal should follow the same method, in reverse order of installation.",
        "If the patrol team cannot handle the accident alone, it may be managed jointly with an adjacent patrol team.",
        "Detailed safety management guidelines for various situations on the expressway follow the safety management guidelines based on accident locations, as outlined below.",
        "The \"safety patrol vehicle\" should be parked at an appropriate distance (at least 60 meters) behind the accident site, considering traffic and road conditions. Activate safety devices (warning lights, sirens, LED display boards, foldable safety guide panels, etc.) to ensure safety.",
        "The \"traffic control safety patrol officer,\" wearing personal safety equipment (safety vest, safety clothing, safety helmet, whistle), uses a signal baton (or signal flag) to guide rear/continuing vehicles to slow down and drive safely between the accident site and the safety patrol vehicle.",
        "The \"safety triangle\" should be placed in a location where approaching drivers can clearly see it during incidents such as vehicle breakdowns. If necessary, install additional \"arrow signs\" or place additional \"safety triangles\" at regular intervals further to the rear.",
        "The \"cones\" should be placed at appropriate intervals (20–40 meters) starting 100 meters behind the accident site (or 150 meters if controlling two or more lanes). The furthest point should be set up in a diagonal pattern to guide rear vehicles smoothly into lane changes.",
        "The \"LED warning lights\" should be mounted on top of the cones at night or during adverse weather conditions to enhance guidance for rear vehicles to change lanes.",
        "The \"safety guide vehicle\" is used as a replacement for existing safety signs (e.g., safety triangles, arrow signs) when enhanced safety management is required. Cones should be placed in a straight line from the safety guide vehicle's location to the accident site, and cones behind the safety guide vehicle should be arranged diagonally to guide rear vehicles smoothly into lane changes.",
        "(2) Accident Report",
        "After conducting rear safety management for the accident site, promptly report the road closure status, a brief description of the accident (involved vehicles, accident type, and status of injuries) to the Traffic Management Center via wired and wireless communication, and secure related photographs.",
        "In the event of a major traffic accident requiring prolonged road closure, promptly request equipment and manpower support, rear traffic control, and detours for isolated vehicles.",
        "During accident handling, report the accident details and interim progress (e.g., rescue and recovery status, estimated time for road clearance) to the Traffic Management Center as needed, following the \"Traffic Accident Investigation Form,\" and simultaneously secure related photographs.",
        "Upon completing the accident handling, compile the results and submit a final report.",
        "(3) Accident Handling and Investigation",
        "Coordinate with relevant agencies such as the local traffic police station and the rescue team to support accident handling, and continuously request these agencies to sequentially reopen blocked lanes to resume traffic flow.",
        "During rescue and recovery operations, verify that an adequate number and size of towing vehicles are on standby to minimize processing time, and clear debris caused by the accident.",
        "After completing accident handling, clear the debris from the accident site and check the road surface condition for issues such as slipperiness. If no abnormalities are found, resume traffic flow.",
        "To ensure accurate collection of basic traffic accident data, work closely with relevant agencies such as the local traffic police station to complete the Traffic Accident Investigation Form and submit it to the Traffic Management Center.",
        "To impose and collect charges for damaged facilities caused by an accident, identify and document the details of the damaged road facilities based on the Damage Report Form. Notify the party responsible for the accident and submit the report to the Traffic Management Center."
      ]
    },
    {
      "title": "Guidelines for Handling Major Traffic Accidents by Type",
      "content": [
        "(1) Fuel Transport Vehicle Accident",
        "Key Checkpoints",
        "Common: Review whether the recovery equipment and accident handling equipment and personnel are adequately deployed. If essential equipment is insufficient, additional deployment may significantly increase handling time.",
        "Fuel absorption operations require a large-scale workforce, equipment, and absorbent materials.",
        "In the event of an emergency, request for support from nearby agencies, large-scale initial response measures are required.",
        "Request the dispatch of waste oil collection vehicles in the event of large-scale spills.",
        "Sand Requirement: For a two-lane road with a 10-meter spill, 2㎥ of dry sand is needed.",
        "In the event that the vehicle is un-towable due to fire, a transport vehicle is required. Request advance arrangements for cargo trucks, truck tractors, and trailers as needed for the situation.",
        "Investigate the amount of fuel spilled on the road and the remaining fuel in the vehicle. Promptly install containment booms to prevent the spread of fuel spills.",
        "Step-by-Step Handling Procedures",
        "Initial Stage (Within 30 Minutes After the Accident)",
        "The safety patrol vehicle arrives at the accident site, assesses the situation, and submits an initial report that includes; no. & type of involved vehicles, accident type, injury status, road closure status etc.",
        "Identify the type and quantity of spilled fuel (remaining amount) and report the estimated handling time.",
        "Request necessary equipment and personnel for handling, and implement initial measures to prevent fuel spread.",
        "Handling phase.",
        "Deployment of a recovery team at the site for oil spill containment, waste oil disposal, and progress reporting.",
        "Conduct detour of rear vehicles and stranded vehicles through traffic control (if necessary).",
        "Try to secure traffic flow on one lane first (encouraging simultaneous operations to shorten processing time: rescue + recovery + debris removal, etc.).",
        "Follow-up actions.",
        "Towing of the accident vehicle, clearing the accident scene, and handling of debris (thorough inspection of slippery conditions on the oil spill lane before reopening all lanes).",
        "Investigation of traffic accident-damaged facilities and notification of the details to the responsible party.",
        "Final accident report, including confirmation of casualties (with verification from the relevant traffic police station if necessary).",
        "(2) Accident Involving a Hazardous Material Transport Vehicle",
        "Key Checkpoints",
        "Common: Review whether rescue and recovery equipment, accident handling equipment, and personnel have been adequately deployed. If essential equipment is insufficient, additional deployment may be required to significantly increase handling time.",
        "Promptly contact the relevant Regional Environmental Office or Chemical Disaster Joint Response Center.",
        "Identify the type of hazardous material before taking action (prohibit access until the chemical is identified). Due to the potential for gas leaks, fire, explosions, or environmental pollution following a traffic accident involving chemical hazardous materials, high-pressure gases, or radioactive substances, approach cautiously while gathering more information.",
        "Discuss response measures, such as neutralizers and spill recovery, with the driver or the cargo owner.",
        "Maintain a constant supply of dry sand (at least 20㎥) to prepare for potential spill expansion incidents.",
        "Since the accident handling is expected to take a long time, consider initiating accident management and recovery efforts at the headquarter level from the early stages of the incident.",
        "Consider establishing and operating a regional disaster response (for incidents lasting more than 4 hours in one direction).",
        "Step-by-Step Handling Procedures",
        "Initial Stage (Within 30 Minutes After the Accident)",
        "The safety patrol vehicle arrives, assesses the situation, and submits an initial report (Involved vehicles, accident type, injury status, and road closure status, etc.)",
        "Identify the type and quantity of chemicals spilled (including remaining amounts) and report the estimated handling time.",
        "Request recovery (replacement) vehicles and personnel after identifying the hazardous materials.",
        "Implement safety measures such as evacuating nearby users and conduct initial response actions to prevent the spread.",
        "Handling phase",
        "When hazardous material access is possible, deploy the branch recovery team to the site, handle the disposal of hazardous chemicals, and provide interim reports during the handling process.",
        "conduct detours for rear and stranded vehicles through traffic control (if necessary).",
        "make efforts to secure traffic flow in one lane first (To reduce processing time, coordinate simultaneous operations: rescue, recovery, and debris removal)",
        "Follow-up actions.",
        "Towing of the accident vehicle, clearing the accident site, and removing debris (Thoroughly check the slippery condition of the chemical spill before reopening the lane)",
        "Investigate the damaged facilities from the traffic accident and notify the responsible party.",
        "File final accident report, including confirmation of casualties (with verification from the relevant traffic police station if necessary).",
        "(3) Mass casualty accident (10 or more casualties).",
        "Key Checkpoints",
        "Common: Review whether rescue and recovery equipment, accident handling equipment, and personnel have been adequately deployed.",
        "If essential equipment is insufficient, additional deployment may be required to significantly increase handling time.",
        "Quick identification of the number of casualties.",
        "Request the dispatch of a rescue vehicle in case of entrapment in the casualty vehicle.",
        "Request an air ambulance in case of a critically injured patient (report to the Traffic Management Center). Pre-arrange potential helicopter landing and takeoff points (including consideration of the mainline if feasible).",
        "Prepare to relocate other vehicles immediately after the rescue of casualties is completed. Discuss towing methods after heavy recovery equipment arrives at the site.",
        "Step-by-Step Handling Procedures",
        "Initial Stage (Within 30 Minutes After the Accident)",
        "The safety patrol vehicle arrives at the accident site, assesses the situation, and submits an initial report (involved vehicles, accident type, injury status, and road closure status).",
        "Request an air ambulance based on the severity of injuries (critical trauma patients).",
        "Request necessary equipment and personnel for handling and report the estimated processing time.",
        "Handling phase",
        "Deploy the branch recovery team to the site, identify the status of casualties and the hospitals to which they are being transported, and provide interim reports on the handling process.",
        "Conduct detours for rear and stranded vehicles through traffic control (if necessary).",
        "Make efforts to secure traffic flow on one lane first, coordinating simultaneous operations such as rescue, recovery, and debris removal to reduce processing time.",
        "Follow-up actions.",
        "Tow the accident vehicles, clear the accident site, and remove debris. Before reopening all lanes, thoroughly inspect the road surface for slipperiness, damage, or other issues.",
        "Investigate the damaged facilities from the traffic accident and notify the responsible party.",
        "Submit a final accident report, including confirmation of casualties (with verification from the relevant traffic police station if necessary).",
        "(4) Multi-vehicle Collision (10 or More Vehicles)",
        "Key Checkpoints",
        "Common: Review whether rescue and recovery equipment, accident handling equipment, and personnel are adequately deployed (processing time may significantly increase if essential equipment is insufficient, requiring additional deployment).",
        "Quickly identify the number of casualties and the types of involved vehicles.",
        "Request the dispatch of multiple recovery vehicles (small and large recovery vehicles, etc.).",
        "If multiple large vehicles are involved, review the need for additional requests based on the recovery method (e.g., for overturns or rollovers, pre-discuss the recovery method and required recovery vehicles).",
        "Check for fuel or oil spills and prepare absorbents if necessary.",
        "Prepare to relocate other vehicles immediately after casualty rescue is complete (during the rescue, discuss the recovery order and towing method, and review temporary relocation points for the involved vehicles).",
        "Step-by-Step Handling Procedures",
        "Initial Stage (Within 30 Minutes After the Accident)",
        "The safety patrol vehicle arrives at the scene, the situation is assessed and an initial report submitted that includes; involved vehicles, accident type, injury status, road closure status, fuel spill, etc.",
        "For incidents involving multiple large vehicles, request several large recovery vehicles and report the estimated handling time.",
        "Request necessary equipment and personnel for handling, and implement initial response measures in the event of a fuel spill.",
        "Handling phase",
        "Deploy the branch recovery team  (to prevent fuel spill spread), discuss the recovery order and towing methods, and provide interim reports during the handling process.",
        "Conduct detours for rear and stranded vehicles through traffic control (if necessary).",
        "Make efforts to secure traffic flow on one lane first, coordinating simultaneous operations such as rescue, recovery, and debris removal to reduce handling time.",
        "Follow-up actions.",
        "Tow the accident vehicles, clear the accident site, and remove debris. Before reopening all lanes, thoroughly inspect the road surface for slipperiness, damage, or other issues.",
        "Investigate the damaged facilities from the traffic accident and notify the responsible party with the details.",
        "Submit a final accident report, including confirmation of casualties (with verification from the relevant traffic police station if necessary).",
        "(5) Mass Cargo Dispersal Accident",
        "Key Checkpoints",
        "Common: Review whether rescue and recovery equipment, accident handling equipment, and personnel are adequately deployed (processing time may significantly increase if essential equipment is insufficient, requiring additional deployment).",
        "\"Identify the type and quantity of dispersed cargo and respond accordingly:",
        "-Cargo types: gravel, steel plates, rebar, containers, coils, agricultural products, etc.",
        "-Cargo handling methods: use available equipment or manual labor for removal.\"",
        "Dispatch replacement vehicles as needed based on the extent of damage to the accident vehicle .",
        "Coordinate the dispatch of replacement vehicles to the site with the driver of the accident vehicle.. If the dispersed cargo is non-recyclable and requires disposal, dispatch separate transport vehicles for removal.",
        "If transport vehicles take a long time to arrive at the site, consider utilizing vehicles owned by the management agency for support.",
        "Determine whether follow-up road surface cleaning is necessary after handling the cargo.",
        "Step-by-Step Handling Procedures",
        "Initial Stage (Within 30 Minutes After the Accident)",
        "The safety patrol vehicle arrives at the accident site, assesses the situation, and submits an initial report (involved vehicles, accident type, injury status, road closure status, fuel spill, etc.).",
        "Identify the type and quantity of cargo dispersed (including the remaining amount in the vehicle) and report the estimated handling time.",
        "Request necessary equipment and personnel for handling (including replacement and transport vehicles).",
        "Handling phase",
        "Deploy the branch recovery team to the site (to handle dispersed cargo), discuss handling methods, and provide interim reports during the process.",
        "Conduct detours for rear and stranded vehicles through traffic control (if necessary).",
        "Make efforts to secure traffic flow on one lane first, coordinating simultaneous operations such as rescue, recovery, and debris removal to reduce handling time.",
        "Follow-up actions.",
        "Tow the accident vehicles, clear the accident site, and remove debris. Before reopening all lanes, thoroughly inspect the road surface for slipperiness, damage, or other issues.",
        "Investigate the damaged facilities from the traffic accident and notify the responsible party with the details.",
        "Submit a final accident report, including confirmation of casualties (with verification from the relevant traffic police station if necessary).",
        "(6) Heavy Cargo Dispersal Accident in a Tunnel",
        "Key Checkpoints",
        "Common: Review whether rescue and recovery equipment, accident handling equipment, and personnel are adequately deployed (processing time may significantly increase if essential equipment is insufficient, requiring additional deployment).",
        "Heavy cargo dispersal accidents in tunnels make crane operations difficult (dispatch large forklifts).",
        "Dispatch replacement vehicles as required based on the extent of damage to the accident vehicle.",
        "Coordinate the dispatch of replacement vehicles to the site.",
        "If replacement vehicles take a long time to arrive, consider utilizing vehicles owned by the management agency for support.",
        "Recovery operations for large vehicles in tunnels are challenging.",
        "As accident handling is expected to take a long time, consider initiating accident management and recovery efforts at the headquarters level from the early stages of the incident.",
        "Step-by-Step Handling Procedures",
        "Initial Stage (Within 30 Minutes After the Accident)",
        "The safety patrol vehicle arrives at the accident site, assesses the situation, and submits an initial report (involved vehicles, accident type, injury status, road closure status, fuel spill, etc.).",
        "Identify the type and quantity of cargo dispersed (including the remaining amount in the vehicle) and report the estimated handling time.",
        "Request necessary equipment and personnel for handling (including replacement and transport vehicles).",
        "Handling phase",
        "Deploy the branch recovery team to the site (to handle dispersed cargo), discuss handling methods, and provide interim reports during the process.",
        "Conduct detours for rear and stranded vehicles through traffic control (if necessary).",
        "Make efforts to secure traffic flow on one lane first, coordinating simultaneous operations such as rescue, recovery, and debris removal to reduce handling time.",
        "Follow-up actions.",
        "Tow the accident vehicles, clear the accident site, and remove debris. Before reopening all lanes, thoroughly inspect the road surface for slipperiness, damage, or other issues.",
        "Investigate the damaged facilities from the traffic accident and notify the responsible party with the details.",
        "Submit a final accident report, including confirmation of casualties (with verification from the relevant traffic police station if necessary).",
        "2.2.6 Guidance and Reporting of Law-Breaking Vehicles"
      ]
    },
    {
      "title": "2.2.6.1 Standards for Handling Violations by Type",
      "content": [
        "Violation of measures preventing cargo from falling.",
        "For vehicles on the expressway with cargo at risk of falling or actively causing cargo to fall, guide them to implement cargo fall prevention measures and take legal action if necessary.",
        "For vehicles that pose a risk of causing an accident if they continue driving, immediately guide them to a safe area and instruct them to stop for corrective measures.",
        "If corrective measures are not possible, use the safety patrol vehicle to manage the rear of the vehicle and divert it to a national road.",
        "Figure 2-3: Violation of Measures Preventing Cargo from Falling",
        "Violation of expressway shoulder driving regulations.",
        "For vehicles driving on the shoulder of the expressway, except for emergency or maintenance vehicles, guide them back to the main lane and take legal action if necessary.",
        "Violation of Prohibition and Restriction of Passage",
        "For vehicles such as construction machinery and motorcycles that are prohibited from using the expressway, guide them to comply with the expressway access restrictions and take legal action if necessary.",
        "2.3 VMS Operation",
        "Various traffic management facilities are installed on expressways based on the importance of the route and economic and environmental conditions, among which the VMS (Variable Message Sign) is an essential facility for ensuring user safety and convenience, thus requiring special management.",
        "2.3.1 Purpose",
        "This section establishes detailed operational guidelines for the operation of VMS, including \"Situation-specific, Location-specific Message Display Criteria and Priority,\" to provide information aimed at enhancing the safety of expressway users and alleviating traffic congestion through traffic flow dispersion.",
        "Operation Guidelines",
        "(1) Information Provision",
        "The information displayed on VMS prioritizes providing information for traffic flow and safety. During smooth traffic flow, information on expected travel time is displayed and in cases of congestion, information on the congested section and causes is displayed. The information display ranges are as follows.",
        "Table2-2: VMS Information Display",
        "(2) Message Display",
        "Message display follows the principle of displaying two lines and two simultaneous displays during smooth traffic flow. However, if deemed necessary, it is possible to display up to three lines and three simultaneous displays. Still, this should be used selectively in congested sections with low driving speeds due to a significant decrease in readability/legibility.",
        "In the event of urgent traffic situations due to traffic accidents, work, or an expected increase in congestion length, display one VMS within a certain distance from the occurrence of the situation until its resolution.",
        "Traffic-related promotional messages are displayed only when flow is smooth, and the content is based on the instructions of the situation manager.",
        "Message display for different traffic situations is as follows.",
        "<Smooth Traffic Flow>",
        "< In the case of general congestion>",
        "<In the case of incidents>",
        "Table 2-3: Display Message in Case of a Traffic Accident",
        "Table 2-4: Display Text during Work",
        "Table 2-5: Display Text in Case of Rain",
        "Table 2-6: Display Text in Case of Fog",
        "※ When an incident (accident, breakdown, operation, weather) or congestion occurs: Display information on the incident or congestion section in 2 messages.",
        "2.4 Operation for providing services related to traffic information",
        "2.4.1 Objective",
        "It is operated to integrate traffic information from expressways, national roads, and local governments, stably provide it to the internet, broadcasters, and traffic information providers, and offer diverse content to enhance expressway usage efficiency and alleviate traffic congestion.",
        "2.4.2 Traffic Information Provision System",
        "(1) Concept of Traffic Information Provision",
        "(2) The system must be configured to provide traffic information reliably, and various content required by customers must be produced to deliver traffic information.",
        "2.4.3 Traffic Information Linkage",
        "(1) In addition to managing its own expressway traffic information, traffic conditions on other expressways, national roads, and local roads must be linked and shared to display real-time traffic on the website and contribute to traffic dispersion and customer satisfaction through three-dimensional and comprehensive traffic information.",
        "(2) Information linked with other roads must include expressway traffic flow, traffic control, unexpected incidents, VMS messages, and CCTV data.",
        "2.4.4 Traffic Information Provision",
        "(1) External services are provided through the development and operation of an internet webpage and mobile app, and thorough maintenance must be ensured to provide uninterrupted 24-hour service.",
        "(2) The provided content must include the following items, and traffic forecasting capabilities must be enhanced by utilizing both real-time generated data and accumulated historical data for estimated arrival times, expected travel times, congestion forecasts by time period, and traffic-related map generation.",
        "(3) During peak vacation seasons with high traffic information demand, a dedicated homepage for fast and accurate traffic information must be separately provided to promote traffic dispersion and help alleviate congestion.",
        "(4) The provided information utilizes expressway guide maps (leaflets), press releases, traffic-related broadcasts, internet webpages, and mobile apps, promoting effective pre-distribution of traffic through diversified communication channels.",
        "2.5 Traffic Flow Management",
        "2.5.1 General",
        "This aims to guide and enforce passage restrictions on expressways to ensure smooth traffic flow management.",
        "2.5.2 scope of application",
        "Traffic flow management on expressways shall be guided by these standards unless otherwise specifically provided by relevant laws or other regulations.",
        "2.5.3 Terminology",
        "\"Traffic flow management\" refers to a series of tasks undertaken to address traffic congestion, accidents, maintenance works, disasters, and other factors that hinder smooth traffic fl006Fw on expressways, as well as tasks related to speed limitations aimed at maintaining smooth traffic flow and enhancing user convenience.",
        "\"Special traffic management\" refers to a series of tasks implemented to address traffic congestion caused by the concentration of vehicles on expressways during specific periods, aiming to enhance user convenience.",
        "\"Maintenance\" refers to the preservation, repair, reinforcement, and improvement of roads and road accessories to maintain the function of completed roads and ensure smooth vehicle traffic.",
        "\"Expressway passage restriction\" refers to limitations imposed on traffic due to various activities that hinder smooth traffic flow, including passage restrictions on main lanes (including shoulders) caused by maintenance works (including expansion projects), complete closures of main lanes (including shoulders) and ramps (including traffic diversions), restrictions due to traffic accidents or disasters such as wind and flood damage, and restrictions caused by illegal protests on expressways.",
        "\"The general department\" refers to the headquarters department responsible for overseeing traffic and safety management tasks in accordance with organizational regulations.",
        "\"The Responsible department\" refers to the department (such as headquarters) responsible for managing traffic and safety tasks as designated by organizational regulations.",
        "\"The implementing department\" refers to the branch offices or other departments directly responsible for carrying out traffic and safety management tasks.",
        "\"The maintenance department\" refers to the department responsible for road maintenance tasks as specified by organizational regulations.",
        "\"The traffic blocking team\" refers to a team operated at interchanges and junctions to promptly restrict mainline traffic in anticipation of vehicle isolation or congestion on expressways due to disasters.",
        "\"Emergency work\" refers to works such as natural disaster recovery projects, including flood damage restoration, or repairs that must be carried out immediately to prevent accidents.",
        "2.5.4 Duties of the responsible department.",
        "Matters related to the establishment and implementation of plans for traffic flow management.",
        "Matters related to record keeping and reporting of all tasks concerning traffic flow management.",
        "Preparation and preservation of data related to speed limits on the relevant section.",
        "Other matters related to traffic flow management.",
        "2.5.5 Duties of the implementing department",
        "Matters related to the removal and improvement of obstacles to traffic flow.",
        "Preparation and preservation of data related to speed limits.",
        "Matters related to the establishment and implementation of traffic flow measures in work zones.",
        "Other matters related to traffic flow management.",
        "2.5.6 Emergency passage restriction.",
        "In the event of an emergency requiring immediate restriction or prohibition of vehicle traffic for any of the following reasons, emergency traffic control shall be enforced in accordance with applicable laws and regulations, followed by notification and reporting to the relevant agencies as required:",
        "When the 10-minute average wind speed on a bridge exceeds 25 m/s (or 20 m/s on the upper deck of a multi-level bridge)",
        "When a natural disaster, multi-vehicle collision, hazardous material spill, or similar major incident causes traffic paralysis or a significant increase in traffic risk at a specific location.\n\nWhen restricting traffic, control and detour information shall be announced using road VMS, patrol car VMS, etc.",
        "The head of the implementing department shall prepare necessary data (such as photographs) for imposing post-penalty fines on vehicles that violate the control.",
        "2.5.7 Reporting of passage restriction plans.",
        "When traffic restrictions are necessary due to road maintenance or improvement works (including expansion), the head of the implementing department shall consult with relevant agencies as prescribed by law and report in accordance with procedures.\nIf the traffic restriction is expected to affect nearby stations, the head of the implementing department shall notify them of the traffic restriction plan.",
        "2.5.8 Criteria for passage restrictions.",
        "When restricting traffic on the expressway mainline, the level of service (LOS) during peak hours based on the reduced number of lanes shall be calculated in accordance with the standards, and traffic restriction is prohibited if the LOS exceeds E; however, if the period exceeding LOS E is shorter than the required restriction period, traffic restriction may be implemented during hours that minimize LOS deterioration.",
        "If traffic restriction must continue for more than 24 hours in a section where the peak hour level of service exceeds E, it shall be implemented after reviewing the traffic impact.",
        "Notwithstanding the above, if urgent repair work is required due to traffic flow or safety issues, traffic restriction may be implemented regardless of the level of service.",
        "2.6 Traffic Restrictions",
        "2.6.1 General",
        "In case of an emergency, the implementing department shall immediately enforce traffic control, report the results, and request traffic control in cooperation with relevant agencies.\nIf additional emergency control is required during the ongoing emergency control, the implementing department shall take immediate action and report accordingly.\nTraffic restriction standards are determined by disaster type, and actions are taken based on human casualties and the expected duration of the situation for disasters such as storms,major accidents, demonstrations, and terrorism.",
        "Traffic restriction and detour measures based on human casualties and expected restriction duration shall follow the specified standards.",
        "In a ‘Severe’ disaster phase, a traffic control team shall be organized to carry out traffic control and site clearance support activities.",
        "2.6.2 Traffic restrictions due to maintenance works and expansion works.",
        "Traffic restriction plans shall be promoted to expressway users through website registration, VMS display, and the use of broadcasting personnel and traffic control room.\nFull road closure works must include a construction plan, consultation documents, sequence diagram, safety plan, promotion plan, and traffic impact assessment, with real-time reporting of the situation to the higher department during construction.",
        "2.6.3 Passage restrictions due to accidents or disasters.",
        "Traffic accidents shall be handled according to relevant regulations and standards, and disaster countermeasures shall follow detailed disaster response plans and guidelines.",
        "Traffic restriction details shall be reported promptly and accurately in real time to higher departments.",
        "Information shall be actively provided using VMS and the traffic control room, with appropriate messages adjusted for slowdowns or congestion, and shared with other agencies if impacts are expected.",
        "VMS shall be operated so that users can easily recognize the information, with advance guidance provided before junctions.",
        "Traffic restrictions shall be announced to users through broadcasting and other means.",
        "In the case of emergency traffic restrictions, signs including route name, section and period, restricted vehicles, reason, and other necessary details shall be installed in the restriction area and other required locations.",
        "2.6.4 Passage restrictions due to protests on expressways.",
        "(1) Step-by-step actions.",
        "In the event of a protest on or near the expressway that is deemed likely to disrupt expressway traffic flow, the situation is handled on a step by step basis as follows.",
        "Caution Stage: Detection of signs of a protest (including slow-driving protests).",
        "Identify signs of protests through relevant agencies.",
        "The traffic center should track and manage the movement of slow-driving protests and provide information using VMS and other means.",
        "Monitor the protest situation and police movements.",
        "Alert Stage: Occurrence of a protest.",
        "In the event of a protest, provide information to expressway users using VMS and other means.",
        "Perform the following:",
        "Report the occurrence of the protest",
        "Prepare and manage a protest situation log",
        "Identify and analyze the impact of slowdowns or congestion on the expressway,",
        "Review, discuss, and assess the necessity of traffic restrictions.",
        "Critical Stage: Occupation of the expressway.",
        "Report the occurrence and progress of the protest to relevant agencies, prepare a protest situation log, and request cooperation for information broadcasting.\nMonitor the protest situation in real time and report it to the higher department.",
        "(2) Emergency duty system during expressway protests.",
        "Emergency duty related to expressway protests shall be from 08:00 on the day to 08:00 the following day, and the emergency duty system shall be organized and operated separately.",
        "(3) Reporting system during expressway protests.",
        "Protest-related matters occurring on the expressway must be properly reported in accordance with the reporting system.",
        "Disaster Management",
        "3.1 General",
        "3.1.1 Overview",
        "This manual aims to establish systematic and prompt responses by specifying the duties, roles, and measures of managing agencies in case of disaster situations on expressways or situations of concern, in order to minimize damages.",
        "3.1.2 Scope of Application",
        "Applicable to the activities of departments within managing agencies related to disaster tasks such as natural disasters and social disasters.",
        "Applicable to situations involving or potentially causing large-scale damages due to the occurrence of natural disasters and social disasters.",
        "3.1.3 Definition of Terms",
        "Figure 3-1: Concept of Disaster",
        "Disaster refers to an event that causes or may cause harm to the lives, bodies, and property of the people and to the nation, and it is classified into natural disasters and social disasters(a large-scale natural or social event)",
        "Incident : A broad concept referring to any abnormal situation that disrupts normal traffic flow. Examples include vehicle breakdowns, debris on the road, maintenance work, adverse weather, protests, or the presence of animals.",
        "Accident is usually an individual or localized incident caused by a specific factor.",
        "3.1.4 Classification of Disasters",
        "The classification of disasters is as follows.",
        "(1) Natural Disasters:",
        "heavy rainfall, strong winds, storms, lightning strikes, droughts, heatwaves, earthquakes, and similar natural phenomena resulting in disasters.",
        "(2) Social Disasters:",
        "-Fires, collapses, explosions, traffic accidents, chemical accidents, environmental pollution accidents, and other similar accidents causing damage.",
        "-Damages caused by the paralysis of national infrastructure systems such as energy, communication, transportation, finance, healthcare, and water supply, as well as damages caused by the spread of infectious diseases or livestock epidemics.",
        "Figure 3-2: Classification of Disasters",
        "3.1.5 Disaster Types on Expressways in Uganda",
        "Core Disaster on expressways in Uganda are categorized into natural and social disasters, each further classified into major, intermediate, and specific types.",
        "Figure 3-3: Core Disaster on Expressway in Uganda",
        "(1)Natural Disasters",
        "-Heavy Rain(Squall): Affect roads and structures, causing slope collapses, tunnel and bridge failures, and road washouts.",
        "-Fog: Leads to reduced visibility on roads, resulting in traffic restrictions and potential accidents.",
        "(2)Social Disasters",
        "-Fire: Depending on the location, include wildfires (slopes), tunnel fires, bridge deck fires, and fires in buildings such as offices, service areas, and gas stations, as well as vehicle fires on roads.",
        "-Traffic Issue: Occur on roads and in tunnels, involving buses or large vehicles, and may lead to secondary damage such as oil or hazardous chemical spills.",
        "-Collapse : Include vehicle explosions, collapses or explosions of bridges and tunnels, and explosions in service areas or buildings, potentially including explosions by terror causing major disruption to expressway operations.",
        "These five disaster items are the most critical elements that the Uganda Expressway Disaster Management Manual must focus on.",
        "The types of disasters that may occur at expressway maintenance sites are as follows.",
        "Table 3-7: Disaster Classifications on  Expressway in Uganda",
        "3.1.6 Concept of Disaster Management",
        "Expressway Disaster Management is a systematic set of activities aimed at preventing disasters, preparing for potential crises, responding effectively when they occur, and recovering quickly to prevent recurrence.",
        "The key concepts are as follows:",
        "Common: Functions that must be continuously carried out throughout all stages—prevention, preparedness, response, and recovery—such as identifying risks, monitoring and alerts, and establishing cooperation systems.",
        "Prevention: Activities to suppress or eliminate the occurrence of disasters in advance, focusing on removing risk factors and resolving potential issues.",
        "Preparedness: Strengthening response capabilities through planning, preparation, education, and training in anticipation of possible crisis situations.",
        "Response: Immediate actions taken to minimize damage and prevent secondary crises during disaster occurrences, including emergency measures and communication.",
        "Recovery: Restoring damage caused by disasters to pre-crisis conditions and implementing improvements to prevent similar future events.",
        "The concept of expressway disaster management is as shown in the Figure below.",
        "Figure 3-4: Concept of  Expressway Disaster Management",
        "3.2 Organization and System of Disaster Management",
        "3.2.1 Basic Direction",
        "Objective",
        "To prevent natural and social disasters in advance and to protect the function of expressways and the lives and property of the public through prompt and effective responses when accidents occur.",
        "Basic Principles",
        "Establishment of a disaster response system",
        "Preparation of response guidelines by accident type",
        "Rapid identification and dissemination of damage status during incidents",
        "Mobilization of Personnel and Equipment for disaster countermeasures",
        "Efficient operation of traffic control and detour route",
        "Prompt implementation of recovery work in case of accidents",
        "Establishment of Business and Promotion Measures.",
        "Establishment of Cooperation System with External Organizations.",
        "3.2.2 Organization of Disaster Management"
      ]
    },
    {
      "title": "3.2.2.1 Disaster Management System.",
      "content": [
        "In the event of a disaster on expressways, an organized and effective response system is established under the leadership of the Ministry of Works and Transport (MoWT).",
        "This system consists of central control, on-site response, inter-agency cooperation, information dissemination, and unified command.",
        "The MoWT serves as the central authority responsible for overseeing disaster management and coordinating related agencies when necessary.",
        "On-site response is handled by various MoWT-affiliated expressway management departments, where dedicated disaster response units are in place.",
        "Each facility manager (e.g., for tunnels, bridges, and slopes) is responsible for promptly identifying the initial situation and reporting to higher authorities.",
        "During disaster response, cooperation with related agencies—including the police, fire departments, meteorological services, and local governments—is essential.",
        "These agencies carry out critical tasks such as rescue operations, traffic control, and weather information support, based on a pre-established coordination system.",
        "Once a disaster occurs, a step-by-step reporting system ensures that all relevant organizations are promptly informed, enabling real-time communication and coordinated actions.",
        "Depending on the scale and nature of the disaster, a central or regional unified command center may be established to lead an integrated response effort.",
        "Through this expressway disaster management system, the goal is to enable prompt and efficient disaster response while maintaining the functionality of expressways and protecting the lives and property of the public."
      ]
    },
    {
      "title": "Disaster Countermeasure Headquarter(DCHQ)",
      "content": [
        "In order to ensure efficient and systematic response in the event of a disaster, the organization, duties, and operational standards of the Disaster Countermeasures Headquarters must be established.",
        "(1) Structure of the Disaster Countermeasure",
        "(2)Organization of the Integrated  Disaster Countermeasure Headquarter(IDCHQ)",
        "This tiered structure enables close and rapid disaster response from the central to the regional and local levels.",
        "Figure 3-5: Organization of Disaster Countermeasure Headquarter",
        "☞ For more detailed disaster response headquarters organization by disaster level and the designation of disaster management departments by disaster type for expressway disaster management, the MoWT shall develop and operate its own standards suitable to on-site conditions, taking into account budget and policy considerations.",
        "(2) Duties of the Disaster Response Headquarters",
        "Since it is necessary to clearly distinguish the duties of each team in the event of a disaster to ensure a prompt response and prevent confusion, the exact responsibilities of each team are assigned as shown in the table below.",
        "Table 3-8: Duties of  Disaster Response Headquarters",
        "(3) Standards for Operation of Disaster Countermeasure Organization",
        "A disaster accident on expressways that causes severe human and property damage with widespread impact, requiring a government-level, all-out, and comprehensive response.",
        "Standards for establishing and operating a disaster response headquarter based on the anticipated disaster scale.",
        "The operational criteria for the Expressway Disaster Response Headquarters are shown in the table below.",
        "Table 3-9: Operational Criteria for Disaster Countermeasure Headquarter",
        "☞ The above table presents the general Operational Criteria for the Disaster Countermeasure Headquarters in developed countries, and a separate plan should be established and implemented according to the organization and local conditions of the MoWT.",
        "3.2.3 Crisis Alert System / Emergency Duty",
        "The crisis alert system is a framework that sets alert levels and maintains a response system for potential crises, while emergency duty is a system where personnel are immediately mobilized to respond swiftly during a disaster.",
        "Emergency duty levels for expressway disaster management based on crisis alert levels shall be developed and operated by the MoWT through its own standards, considering the disaster management framework and tailored to on-site conditions for specific events such as heavy rain(squall), fog, traffic issues, collapse, and explosions, in accordance with budget and policy considerations.",
        "(1) Crisis Alert System",
        "The classification of the crisis alert system is shown in the table below.",
        "Table 3-10: National Crisis Alert Level Classification and Description",
        "(2) Emergency Duty According to Crisis Alert Levels",
        "Emergency duty levels for expressway disaster management based on crisis alert levels shall be developed and operated by the MoWT through its own standards, considering the disaster management framework and tailored to on-site conditions for specific events such as  heavy rain(squall), traffic issue, fire, fog, collapse in accordance with budget and policy considerations.",
        "3.3 Disaster Management Activities by Type",
        "3.3.1 Heavy Rain(squall)",
        "Figure 3-6: Situation of heavy rain  disaster",
        "Disaster management activities for expressways are classified into the prevention phase, preparedness phase, and response phase."
      ]
    },
    {
      "title": "3.3.1.1 Prevention Phase",
      "content": [
        "(1) Disaster-Prone Facility Management Plan",
        "Conduct pre-inspection and repair of vulnerable facilities such as drainage structures and slopes in preparation for the rainy season.",
        "Complete necessary reinforcement works before the rainy season or implement emergency measures (vinyl covering, sandbags, etc.).",
        "Establish plans for deploying manpower and equipment to disaster-prone areas and securing detour routes in case of traffic control.",
        "Promote restoration of damaged areas outside expressway boundaries in cooperation with relevant agencies (e.g., local governments).",
        "(2) Inspection and Management of Vulnerable Facilities",
        "Inspection targets include major structures such as bridges, retaining walls, stone walls, tunnels, and slopes.",
        "Complete repairs before the rainy season when risks are found, or apply emergency measures if full repairs are difficult.",
        "Focus on the condition of structures, drainage systems, road pavement, and detour route availability.",
        "(3) Pre-Securing of Disaster Response Materials",
        "Stockpile key materials such as gabions, tarpaulins, sandbags, sand, and PC protective barriers.",
        "Identify available equipment in advance and secure rental contracts for rapid deployment if needed.",
        "(4) Review and Reinforcement of Drainage Capacity",
        "Establish drainage improvement plans in response to increased rainfall intensity.",
        "Prepare preventive measures for landslide-prone areas, flood-prone sections, and low-clearance bridges.",
        "(5) Prevention of Soil Debris Damage",
        "Remove vegetation in valleys near expressways before the rainy season and install temporary protective structures.",
        "Install temporary signs and develop traffic control plans for debris flow risk areas.",
        "(6) Education and Training",
        "Target: All employees and site workers.",
        "Conduct job training and drills (at least twice a year), and provide internal training based on disaster-type-specific manuals.",
        "Conduct joint drills with related agencies such as local governments, police, and fire departments.",
        "(7) Emergency Contact and Support System Maintenance",
        "Operate an emergency staff mobilization system and establish a weather information collection system.",
        "Build cooperation systems for emergency recovery and medical support with fire departments, military units, etc.",
        "Establish promotion and evacuation support systems and designate evacuation sites."
      ]
    },
    {
      "title": "3.3.1.2 Preparedness Phase",
      "content": [
        "(1) Weather Monitoring and Disaster Sign Detection",
        "Continuously monitor weather conditions using forecasts from agencies such as Uganda National Meteorological Authority (UNMA)",
        "Focused monitoring of satellite images and rainfall prediction during  heavy rain",
        "Operate a 24-hour hotline with related agencies",
        "(2) Disaster Information Collection and Dissemination",
        "Frequently report weather overview, rainfall, response status, and damage situation",
        "Disseminate information to relevant institutions",
        "Establish a department-level warning communication system",
        "(3) Set up of Integrated Disaster Operations Center",
        "Organize situation room staff by response level and switch to 24-hour emergency operation",
        "Implement shift work until the situation is resolved",
        "Add additional personnel through emergency meetings if needed",
        "(4) Traffic Control Contingency Planning",
        "Analyze vulnerable areas such as cut/fill slopes and potential debris flow zones in advance",
        "Determine control points considering rainfall and traffic volume",
        "Form traffic control teams and prepare control equipment",
        "Establish measures for stranded vehicles and operation of rest facilities",
        "Prepare media responses and advance promotional materials",
        "(5) Cooperation System with Relevant Agencies and Restoration Contractors",
        "Maintain emergency contact systems with local governments and agencies",
        "Coordinate equipment and manpower support with restoration contractors",
        "Share damage information in real time and cooperate for prompt emergency restoration",
        "(6) Pre-Inspection and Emergency Measures for Risk Areas",
        "Strengthen monitoring in flood- or collapse-prone areas",
        "Designate and manage high-risk zones",
        "Conduct pre-emptive actions on vulnerable facilities and enforce area control if necessary",
        "(7) Maintain a preparedness posture in advance to respond to potential damage.",
        "Review standby locations and operation plans for restoration equipment",
        "Coordinate support plans with related agencies for manpower and equipment",
        "Verify emergency medical institutions and relief agencies",
        "Train tollgate staff for detour guidance",
        "Deploy field video teams and utilize video transmission systems"
      ]
    },
    {
      "title": "3.3.1.3 Response Phase",
      "content": [
        "☞ SO : Station Office, RHQ : Regional HQ",
        "Figure 3-7: Flow Chart of Initial Response for Heavy Rain(squall)",
        "The Initial Response is as follows.",
        "Within 10 Minutes",
        "Upon the occurrence of a disaster, the station control room immediately identifies the cause of the traffic blockage and dispatches safety patrols to the site depending on the cause (e.g., traffic accident, soil debris, etc.).",
        "The situation is analyzed using monitoring tools such as CCTV and VMS, and the accident status is registered in the system for information sharing.",
        "Relevant agencies (fire brigade, police, expressway patrol, etc.) are notified immediately.",
        "The station manager convenes staff if necessary and reports to the regional headquarters.",
        "In case of a tunnel fire, disaster prevention facilities are remotely activated immediately.",
        "Within 30 Minutes",
        "The station estimates the time required for traffic recovery:",
        "-Less than 2 hours: Handle internally, conclude, and report.",
        "-More than 2 hours: Immediately report to the regional headquarters",
        "If the incident is large-scale or likely to be reported by the media, report to the regional HQ, MoWT HQ  regardless of time.",
        "Determine whether traffic control or detour is necessary.",
        "The regional headquarters monitors the situation and dispatches a disaster investigation team to the site if necessary.",
        "The MoWT HQ  analyzes the situation based on the disaster type and scale, evaluates communication recovery time and control methods, and prepares for the establishment of the Central Disaster Response Headquarter(MoWT HQ) and media briefings.",
        "Within 1 Hour",
        "The station manager arrives at the site to remove traffic obstructions such as accident vehicles or debris, implement traffic control, and coordinate evacuation and firefighting support.",
        "The regional headquarters assumes command from the station and initiates cause analysis, damage assessment, and recovery planning via the disaster investigation team.",
        "The MoWT HQ formally establishes the Central Disaster Response Headquarter, conducts media briefings if necessary, and provides wide-area traffic control and technical support.",
        "The Traffic control room disseminates real-time traffic updates via VMS and broadcasting.",
        "The Ministry of Works and Transport (MoWT) establishes the Central Accident Management Headquarter and leads the first official briefing.",
        "Within 2 Hours",
        "The staton initiates emergency restoration work, supports victims, and formulates a plan for distributing relief supplies.",
        "The regional headquarters elaborates recovery plans and, if needed, elevates the regional disaster response level.",
        "MoWT reviews the feasibility of the recovery plan and holds a second media briefing.",
        "The Traffic control room continues to provide traffic analysis and detour information.",
        "MoWT oversees the overall restoration process.",
        "3.3.2 Fog",
        "Disaster management activities for expressways are classified into the prevention phase, preparedness phase, and response phase."
      ]
    },
    {
      "title": "3.3.2.1 Prevention Phase",
      "content": [
        "(1) Improvement and Expansion of Safety Facilities in Fog-Prone Areas",
        "Figure 3-8: Safety Facilities in Fog-Prone Area",
        "To provide fog-related information and secure visibility distance, the following safety facilities are to be installed or improved:",
        "Fog warning signs",
        "Fog lights",
        "Fog barriers (fog-blocking walls)",
        "Low-height street lights",
        "Delineator lights",
        "Enhanced delineation signs",
        "CCTV",
        "Fog visibility signs",
        "Variable Message Signs (VMS)",
        "Fog forecast signs",
        "Except for fog lights and fog warning signs, other facilities should be reviewed for installation based on site conditions.",
        "(2) Public Awareness and Regulation Enhancement",
        "In the event of fog, the following public information measures will be reinforced to promote safe driving:",
        "Broadcasting safety driving information via traffic radio",
        "Providing fog-related information through navigation systems",
        "(3) Strengthening of Road Operation and Management",
        "Reinforcement and maintenance of safety facilities in fog-prone sections will be implemented.",
        "Regular and ad-hoc inspections will be conducted to ensure proper operation of the facilities.",
        "(4) Public Promotion and Regulation Enhancement",
        "Provide safe driving broadcasts via traffic broadcasts and provide fog information through navigation to ensure safe driving during fog.",
        "(5) Strengthening Road Operation Management",
        "Reinforce and maintain safety facilities in fog-prone areas.",
        "Ensure proper functioning through frequent inspections."
      ]
    },
    {
      "title": "3.3.2.2 Preparation Phase",
      "content": [
        "(1) Sign Monitoring Activities (Weather Observation and Forecast Monitoring)",
        "Continuously monitor weather conditions and forecasts based on data provided by Uganda National Meteorological Authority (UNMA) and other relevant sources.",
        "(2) Fog Information Collection and Dissemination",
        "Collection of Fog Information",
        "Continuously monitor fog occurrences using forecast data from the meteorological authorities.",
        "During safety patrols, check and record fog-affected sections, occurrence time, and visibility in real time.",
        "Reporting and Dissemination of Fog Information",
        "Report fog-affected sections and visibility conditions to the control center.",
        "Quickly disseminate warning and alert information to relevant departments.",
        "(3) Set up of the Integrated Disaster Operations Center",
        "Organize standby teams in accordance with the established staffing criteria.",
        "Mobilize emergency personnel based on fog conditions and operate response teams by level.",
        "Additional staffing may be assigned based on emergency meetings.",
        "Maintain 24-hour shift operation until the fog situation ends.",
        "(4) Conduct of Fog Disaster Response Drills",
        "Frequency: At least twice a year",
        "Details: Conduct tabletop or field exercises simulating real situations to improve response capability.",
        "(5) Review of Traffic Control and Restriction Plans",
        "Analyze traffic volumes in fog-prone areas to prepare active traffic restriction and response measures.",
        "Set up restricted or blocked sections in high-risk areas.",
        "Develop operation plans for traffic control teams and strengthen patrol staffing (e.g., two shifts per section).",
        "Check availability of traffic control equipment and personnel.",
        "Review rescue and relief preparedness for stranded users, and establish operational measures for service areas.",
        "Prepare plans for site video recording and media response.",
        "(6) User Communication and Media Response",
        "Monitor news coverage and establish countermeasures for negative reports.",
        "Prepare press releases on the corporation’s activities and traffic status in advance.",
        "Ensure readiness for recording field footage and responding to media interviews when necessary.",
        "(7) Cooperation System with Related Agencies",
        "Pre-identify the response status of related agencies such as expressway patrols and fire stations.",
        "Provide ongoing fog information to related agencies to facilitate timely and appropriate responses.",
        "(8) Preemptive Readiness for Possible Damage",
        "Check rescue and relief readiness: verify emergency medical and relief institutions at junctions and interchanges.",
        "Establish toll exemption measures and operation management plans for service and fuel stations.",
        "Instruct tollgate staff to guide detours and assist in ramp closures.",
        "The head of the situation room determines whether to establish a disaster response headquarters based on ongoing situation assessments."
      ]
    },
    {
      "title": "3.3.2.3 Response Phase",
      "content": [
        "Figure 3-9: Flow Chart of Initial Response for Fog",
        "The Initial Response is as follows.",
        "(1) Initial Response – Within 10 Minutes",
        "Station level",
        "Identify the cause of traffic disruption (using CCTV, patrol vehicles, etc.)",
        "Enter accident information and report to relevant agencies",
        "Activate disaster prevention systems remotely (in case of tunnel fire)",
        "Take action to remove traffic obstacles",
        "Regional Headquarter level",
        "Receive disaster reports and monitor the situation",
        "Respond to public inquiries and identify on-site support needs",
        "Report via text/phone and mobilize staff",
        "MoWT HQ level",
        "Monitor disaster status and field response",
        "Assess support requirements and prepare to establish the central response headquarters",
        "(2) Initial Response – Within 30 Minutes",
        "Station level",
        "Estimate traffic recovery time",
        "Decide on traffic control and request to establish a local response Team",
        "Regional Headquarter level",
        "Estimate traffic recovery time",
        "Determine the scope of traffic control and dispatch a disaster investigation team",
        "MoWT HQ level",
        "Review control methods and field measures",
        "Review of the establishment of a central response body and direct resource deployment",
        "Prepare for media briefing",
        "(3) Initial Response – Within 1 Hour",
        "Station level",
        "Arrive on-site and remove traffic obstacles",
        "Guide evacuation and support fire department in case of tunnel fire",
        "Review need for additional support",
        "Regional Headquarter level",
        "Transfer command authority (from station to regional HQ)",
        "Investigate cause and establish recovery measures",
        "Reassess control methods and lead field operations",
        "MoWT HQ level",
        "Establish central response organization",
        "Provide technical advice and formulate wide-area control plans",
        "Conduct media briefing",
        "(4) Initial Response – Within 2 Hours",
        "Station level",
        "Conduct emergency recovery and rescue operations",
        "Assist with casualty management",
        "Review plan for relief supply distribution",
        "Regional Headquarter level",
        "Establish recovery plans and adjust response level",
        "Lead on-site recovery efforts",
        "MoWT HQ level",
        "Review recovery measures",
        "Internal and external media briefings (e.g., traffic broadcasts, if necessary).",
        "3.3.3 Fires",
        "Disaster management activities for expressways are classified with three phases into the prevention phase, preparedness phase, and response phase."
      ]
    },
    {
      "title": "3.3.3.1 Prevention Phase for Fire",
      "content": [
        "(1) Tunnel Fire",
        "(a) Fire Protection System Management Standards",
        "Relevant laws, fire safety regulations, facility-specific manuals, and management guidelines",
        "(b) Key Responsibilities and Operational Measures",
        "Maintain normal function of fire protection systems at all times",
        "Establish emergency response systems and conduct drills",
        "Report to reporting procedures in the event of a fire",
        "(c) Types and Frequency of Inspections",
        "Table 3-11: Management of Tunnel Disaster Prevention Facilities",
        "(d) System Improvements and Training",
        "Develop emergency drill plans, operate public campaigns and experience programs",
        "Implement certification program for tunnel managers",
        "Promote accident prevention campaigns",
        "(e) Facility Improvements",
        "Expand installation of CCTV, VMS, emergency broadcasting, etc.",
        "Upgrade fire protection systems, indicator lights, entry-blocking facilities",
        "Install automatic fire detection systems and deploy mobile smoke exhaust fans",
        "(2) Bridge Fire",
        "(a) Management and Elimination of Illegal Use",
        "Install barriers like guard fences in areas prone to illegal occupation",
        "Apply occupancy permit standards and clear unauthorized structures",
        "Conduct regular inspections at least twice a year",
        "(b) Illegal Use Elimination Task Force (TF)",
        "Investigate and remove illegal use cases",
        "Establish prevention measures and space utilization plans",
        "Review legal processes and inspect/remove fire hazards such as fuel or heaters",
        "(3) Wildfire",
        "(a) Preemptive Elimination of Fire Hazards",
        "Prohibit fire handling and conduct safety education at worksites",
        "Improve management around rest areas and slopes",
        "Remove flammable materials and install firebreaks",
        "(b) Public Awareness Campaigns",
        "Promote fire prevention during designated wildfire alert periods",
        "Use VMS, banners, and other media for public guidance",
        "Prevent careless behavior such as littering cigarette butts",
        "(c) Patrol and Inspection During High-Risk Seasons",
        "Equip patrol vehicles with fire extinguishers",
        "Establish rapid communication with fire services",
        "(4) Building Fire",
        "(a) Fire Facility Inspection and Maintenance",
        "Conduct self-inspections according to relevant laws",
        "Immediately correct and report any deficiencies",
        "Use licensed contractors and keep maintenance records",
        "(b) Fire Patrol",
        "Establish patrol zones and routes",
        "Increase patrol staff during holidays and nighttime",
        "Promptly act on irregularities and maintain patrol logs",
        "(c) Strengthening Preventive Measures for Fire-Prone Facilities",
        "Conduct regular safety inspections",
        "Provide fire extinguishers and automatic shut-off systems for gas leaks",
        "Establish cooperation with relevant agencies for emergency response"
      ]
    },
    {
      "title": "3.3.3.2 Preparedness Phase for Fire",
      "content": [
        "(1) Tunnel Fire",
        "(a) Training and Education Plan",
        "Table 3-12: Tunnel Emergency Training and Drill Implementation Plan",
        "(b) Fire Equipment Training",
        "Fire extinguisher: Pull pin → Aim hose → Squeeze handle",
        "Indoor hydrant: Unroll hose → Connect nozzle → Open valve and spray",
        "Others: Operation and recovery of fire shutters, Halon fire system instructions",
        "(c) Emergency Investigation by Damage Grade",
        "Table 3-13: Damage Grating due to tunnel fire",
        "(e) Emergency Team Operation by Fire Scale",
        "Table 3-14: Operation of Emergency Investigation Team for Tunnel",
        "※ In the case of Level 3 (Large-scale), during “Damage Assessment and Reporting,” determine the necessity of involving external experts and conduct an emergency inspection jointly with internal experts.",
        "(2) Bridge Fire",
        "(a) Fire Spread Prevention Measures",
        "Establish coordination with nearby fire departments",
        "Designate fire access routes, resolve restricted areas",
        "Secure emergency highway access for fire vehicles",
        "Prepare traffic control plans to prevent secondary accidents",
        "(b) Emergency Team Operation Criteria",
        "Table 3-15: Operation Plan for The Emergency Investigation Team for Bridge",
        "(c) Key Points During Emergency Investigation",
        "If deformation is visible → Close lanes and request diagnosis",
        "For prestressed girders → Check for cracks → Escalate level if needed",
        "Inspect :  joints, bearings, and expansion devices",
        "(3) Wildfire",
        "(a) Coordination of command system and responsibilities among related agencies",
        "Collaboration with local governments, etc.",
        "Shared alert/reporting systems including 999 emergency calls",
        "Strengthen cooperation with military, police, and fire departments",
        "(b) Fire Response System Enhancement",
        "Utilize CCTV for unmanned fire monitoring",
        "Secure and inspect wildfire suppression equipment in advance",
        "(c) Joint Training",
        "Conduct joint fire suppression and traffic control drills with local agencies",
        "(4) Building Fire",
        "(a) Fire Equipment Training",
        "Use of fire extinguishers and indoor hydrants",
        "Fire shutter operation and reset",
        "Halon system activation process and evacuation alerts",
        "(b) Fire Evacuation Guidelines",
        "Follow broadcast announcements, use stairs",
        "Stay calm and orderly, maintain low posture",
        "Avoid smoke inhalation, pre-identify escape routes"
      ]
    },
    {
      "title": "3.3.3.3 Response Phase for Fire",
      "content": [
        "Figure 3-10: Flow chart of Initial Response for Fire",
        "The initial response to fire is as shown in the table below.",
        "Table 3-16: Initial Response Flow (Within 10 Minutes to 2 Hours) for Fire",
        "The response procedures for tunnels, bridges, buildings, and wildfires, which are the facilities most affected on the expressway, are as follows.",
        "(1) Response Procedure for Tunnel Fire",
        "a) Incident Occurrence & Initial Response",
        "Monitor via CCTV, detectors, etc.",
        "Confirm fire, activate fire protection system, dispatch personnel",
        "Attempt initial suppression, notify emergency channels",
        "b) Traffic Control & Evacuation",
        "Fully close tunnel, initiate detours via IC",
        "Guide evacuation through emergency exits, prevent fire spread",
        "c) Fire Suppression & Rescue",
        "Firefighting and medical teams arrive and expand response",
        "Complete suppression, report status, and prepare media response",
        "d) Recovery & Reporting",
        "Tow damaged vehicles, clean tunnel, conduct emergency inspection",
        "Resume traffic after provisional restoration, submit final report",
        "(2) Response Procedure for Bridge Fire",
        "a) Incident Reception & Dissemination",
        "Received via CCTV, patrols, or users",
        "Report following the 5W1H format through internal chain",
        "Request response from related agencies (119, police, military)",
        "b) Initial Actions",
        "Provide first aid, initiate basic fire control",
        "Close mainline, detour isolated vehicles",
        "Use VMS, radio to inform drivers",
        "c). Fire Suppression & Temporary Recovery",
        "Complete firefighting, initiate emergency repairs",
        "Mobilize materials/equipment, request support if needed",
        "d)Final Reporting & Traffic Resumption",
        "Organize and report incident details",
        "Inform media/public of reopening",
        "Conduct detailed inspection and full restoration later",
        "(3) Response Procedure for Building Fire",
        "a) Incident Reception & Dissemination",
        "Witness → Branch → Regional HQ → HQ report",
        "Contact 119, police, and restoration vendors",
        "Announce incident via VMS and public address systems",
        "b) Emergency Rescue & Response",
        "First aid, hospital transfer, identify victims",
        "Suppress initial fire, eliminate hazards",
        "Restrict access, set up emergency medical area",
        "c). Response & Recovery System",
        "Activate task teams (procurement, mobilization, safety, PR, etc.)",
        "Secure materials, gather staff, manage traffic control",
        "Hold press briefing, inform community, assess damage",
        "(4) Response Procedure for Wildfire Fire",
        "a) Situation Receipt & Confirmation",
        "Notify agencies immediately upon report",
        "Dispatch internal equipment and submit report",
        "b) Field Response",
        "Secure fire suppression tools and communication lines",
        "Maintain traffic flow and assist with evacuation",
        "For small-scale fires: respond directly; large-scale: follow HQ lead",
        "c) Follow-up Actions & Cleanup",
        "Operate watch teams, keep water trucks on standby",
        "Record and report damage status",
        "3.3.4 Traffic Issue(Traffic accident, environmental pollution, protest)",
        "This document classifies traffic-related disasters such as traffic accidents, environmental pollution, and protests into prevention, preparedness, and response phases for systematic expressway disaster management."
      ]
    },
    {
      "title": "3.3.4.1 Prevention Phase for Traffic Issue",
      "content": [
        "(1) Traffic Accidents",
        "a) Enhancing Traffic Safety Awareness",
        "Conduct campaigns in collaboration with traffic-related civic organizations",
        "Strengthening public awareness through the corporation's website, blogs, and media outlets",
        "Promote traffic safety education for users through traffic centers and outreach programs",
        "Encourage public participation through UCC contests and collecting public opinions on traffic safety",
        "b) Creating a Safer Road Environment",
        "Conduct road safety inspections and improvements at high-accident locations",
        "Upgrade safety facilities such as impact absorbers, median barriers, and guardrails",
        "Develop mechanized equipment to improve traffic accident response efficiency",
        "Operate systems to control overloaded and improperly loaded vehicles",
        "Strengthen crackdowns on illegal roadside parking and unauthorized vendors",
        "Eliminate risk factors through road alignment improvements and structure reconstruction",
        "c) Strengthening Safety Management Activities",
        "Establish networks and accident investigation systems with related organizations",
        "Promote research and development of traffic safety technologies",
        "Conduct regular safety training and ensure proper use of safety gear",
        "Secure safety management equipment such as sign trucks, mobile message boards, and variable lane indicators",
        "Implement field safety measures based on traffic work zone safety guidelines",
        "(2) Road Occupation Protests",
        "a) Establishing a Response System",
        "Operate traffic information systems and conduct real-time monitoring",
        "Prepare traffic control and detour plans in case of protests",
        "Install control facilities and detour guidance signs at toll gates and main roads",
        "Secure median barrier openings and emergency connections to detour roads",
        "Maintain cooperation with relevant agencies such as the National Police Agency",
        "Promote public awareness of the illegality and adverse impact of road occupation protests through media",
        "b) Establishing a Disaster Information Management System",
        "Operate highway disaster management systems and internet traffic broadcasting stations",
        "Expand information collection and delivery facilities such as CCTV, VMS, and ITS",
        "Receive disaster reports through the traffic center situation room",
        "Strengthen facility inspections and emergency contact systems",
        "Deploy tow trucks (large and standard) at key locations",
        "c) Creating an Anti-Illegal Protest Environment",
        "Install banners, signboards, posters, warning notices, etc.",
        "Distribute leaflets to raise awareness of the illegality and risks of road occupation protests"
      ]
    },
    {
      "title": "3.3.4.2 Preparation Phase for Traffic Issue",
      "content": [
        "(1) Traffic Accidents",
        "a) Operation of the Traffic Situation Room",
        "Implementation of traffic situation room duty by agency",
        "Organize and operate staff for the headquarters (branch) traffic situation room.",
        "Receive traffic information, transmit it to relevant agencies, and provide information to users.",
        "b) Cooperation with Related Agencies",
        "Related agencies: ** Expressway Patrol, Fire Department, 119 Emergency Services, Major Hospitals, Rescue Companies, Towing Companies, Waste Disposal Companies, Local Governments, Adjacent Road Management Agencies, Military Units, Meteorological Offices, Media, etc.",
        "Cooperation content: ** Maintain close cooperation for the efficient handling of incidents and provision of traffic information.",
        "Develop cooperation plans with relevant agencies, including local governments (network building).",
        "Organize emergency contact networks with relevant agencies and emergency rescue agencies.",
        "c) Expressway Safety Patrol",
        "Organize and operate safety patrol teams",
        "Assign staff and operate expressway safety patrols according to agency standards.",
        "Inspect road conditions, safety facilities, and various signage conditions.",
        "Educate and report unauthorized pedestrians.",
        "Prevent livestock grazing along expressways.",
        "Remove traffic obstacles such as road debris and request support if necessary.",
        "Perform customer support tasks as defined by standards.",
        "Equip patrol vehicles with required items and use them for safety management in emergencies.",
        "d) Training for Safety Patrol Teams",
        "Conduct quarterly job training for efficient traffic accident handling and dispersal of protesters",
        "Safety management and accident handling at accident sites.",
        "Car maintenance, customer service, etc.",
        "Conduct collective training to enhance the capabilities of safety patrol teams.",
        "(2) Road Occupation Protests",
        "a) Strengthen cooperation systems with relevant agencies and internally",
        "Confirm cooperation systems with the local police station and expressway patrol.",
        "Check emergency contact and reporting systems for urgent protests.",
        "b) Designate emergency transport routes",
        "Designate detour routes and establish vehicle guidance plans in case of main road occupation."
      ]
    },
    {
      "title": "3.3.4.3 Response Phase for Traffic Issue",
      "content": [
        "Figure 3-11: Flow chart of Initial Response for Traffic Issue",
        "(1) Accident Detection",
        "Accidents are detected through safety patrol teams, expressway users, expressway patrol, emergency responders (999), towing companies, media, and CCTV.",
        "(2) Accident Reporting and Situation Dissemination",
        "The first witness reports the accident to the local branch office, which then reports to the regional headquarters and subsequently to the head office.",
        "The call center disseminates the information to relevant agencies and activates the emergency contact network.",
        "Traffic information display systems (e.g., VMS) are used to notify and guide the public about the accident.",
        "(3) Emergency Response and First Aid",
        "Emergency medical aid and evacuation are provided for injured persons in isolated areas, with notifications sent to medical institutions and guardians.",
        "The accident site is controlled, detours are guided, and emergency measures such as opening median crossovers are implemented if necessary.",
        "Emergency recovery personnel and equipment are deployed, and decontamination is carried out in case of environmental pollution.",
        "(4) Accident Handling and Recovery",
        "The Central Disaster Response Headquarters is organized, with each team responsible for specific recovery tasks.",
        "Situation Team: Summarizes and reports accident details, sends CBS alerts, and collects weather information.",
        "Recovery Team: Rescues casualties, develops recovery plans, and controls site access.",
        "Safety Team: Manages traffic control, detours, equipment support, and secondary accident prevention.",
        "Public Relations Team: Handles media responses, distributes press releases, secures video footage, and conducts external communication.",
        "Team: Secures recovery materials and processes requests.",
        "Mobilization Team: Gathers personnel, conducts relief efforts, and requests support from relevant agencies.",
        "Support Team: Provides budget support, sales measures, and toll exemption procedures.",
        "Coordination Team: Handles vehicle tracking, towing support, and cooperation with related organizations.",
        "Investigation Team: Investigates causes and assesses the scale of damage.",
        "3.3.5 Collapse/Explosion (Terrorism)",
        "For Collapse or Explosion, Disaster management activities for expressways are classified into the prevention phase, preparedness phase, and response phase."
      ]
    },
    {
      "title": "3.3.5.1 Prevention Phase for Coll\tapse/Explosion",
      "content": [
        "(1) Selection, inspection, and management of facilities designated as key targets for terrorism.",
        "Table 3-17: Types of Terrorist Incidents on Expressways",
        "Table 3-18: Facilities Designated for Priority Terrorism Management",
        "(2) Emergency Communication & Support System",
        "Establish emergency assembly and information relay system for staff",
        "Build cooperative support system with related agencies",
        "-Rescue and emergency recovery: Fire stations, police, military units",
        "- Relief and medical support: Red Cross, medical associations",
        "Support public communication and evacuation",
        "-Disseminate situation updates and guide evacuation",
        "-provide evacuation shelters and logistics",
        "(3) Education and Drills",
        "a) Roles and Responsibilities",
        "Table 3-19: Education and Drill for Collapse/Explosion",
        "b) Job training",
        "Education for rest area staff on identifying explosives and reporting protocols",
        "Response guidelines for suspicious behavior or objects",
        "c) Drills",
        "Joint or internal simulation drills with fire, military, police",
        "Enhance rapid response readiness for terrorism"
      ]
    },
    {
      "title": "3.3.5.2 Preparation Phase for Collapse/Explosion",
      "content": [
        "Table 3-20: Actions by crisis alert level"
      ]
    },
    {
      "title": "3.3.5.3 Response Phase for Collapse/Explosion",
      "content": [
        "Figure 3-12: Flow Chart of Initial Response for Explosions and Terrorism",
        "The initial response actions in the response phase for explosions and terrorism are as follows.",
        "(1) Initial response procedures",
        "a) Within 10 Minutes",
        "Local Office & HQ: Dispatch patrol and emergency vehicles",
        "HQ: Initial disaster assessment and notification (VMS, SMS), Situation reception and reporting",
        "b) Within 30 Minutes",
        "Arrival of rescue teams, initial recovery actions",
        "Evaluate IC control and dispatch equipment",
        "Consider setup of Regional and Central Disaster HQ",
        "c) Within 60 Minutes",
        "Establish on-site disaster HQ and detour enforcement",
        "Begin recovery work, conduct media briefing",
        "d) Within 120 Minutes",
        "Continue emergency recovery and rescue",
        "Conduct site investigations and response planning",
        "(2) Role-specific Initial Response (Per Timeframe)",
        "a) Local Office",
        "Situation analysis, report input, CCTV monitoring",
        "Activate tunnel fire systems if applicable",
        "Notify HQ and agencies, assess obstruction clearance",
        "b) Regional HQ",
        "Monitor incident and citizen inquiries",
        "Transmit VMS alerts and dispatch response team",
        "c) HQ",
        "Receive and track field status",
        "Assemble Central Disaster HQ and media preparation",
        "(3) Emergency damage inspection and restoration of structures",
        "1) Head Office Damage Inspection Team Detailed Composition",
        "Figure 3-13: Detailed Composition of MoWT’s Damage Investigation Team",
        "2) Key inspection items",
        "Identification of collapse damage and anticipated affected areas",
        "Inspection of sections usable, usable after repair, or requiring demolition",
        "Verification of damage at expansion joint areas (including non-shrink mortar), and contact status between abutment and girder (or slab) ends",
        "Inspection of bearing devices and bearing mortar for damage\n※ Focused inspection on fixed and unidirectional movable bearings",
        "3) Actions to be taken",
        "Determine usability of adjacent lanes based on inspection results, then establish traffic control range to prevent further collapse and review emergency measures and restoration plan.",
        "(4) Emergency restoration of structures",
        "Mission",
        "Review of temporary road and detour bridge installation plans",
        "Procurement of materials and selection of contractors",
        "Coordination with related agencies",
        "Review of permanent bridge restoration plan (method selection, restoration budget planning, etc.)",
        "Classification of restoration phases",
        "Phase 1: Function maintenance (emergency restoration and emergency measures)",
        "Implement detour measures if full closure is necessary",
        "※ Current status of expressway detours, median openings, and emergency connections",
        "Phase 2: Function recovery (permanent restoration)",
        "Restoration concept according to the extent of bridge damage",
        "Table 3-21: Concept for restoration based on the damage scale of the bridge",
        "Emergency restoration",
        "1)Actions based on the extent of damage",
        "Table 3-22: Emergency Restoration and Traffic Handling",
        "2) Emergency Restoration Task Assignment (Emergency Measures)",
        "Emergency Restoration Task Assignment (Emergency Measures)\n(Head Office) Overall management of emergency restoration tasks\n(Headquarters) Support and supervision of emergency restoration tasks\n(Station) Execution of emergency restoration tasks (e.g., installation of detour bridges and temporary bypass roads)",
        "3.4 Post-Disaster Response Activities",
        "3.4.1 Overview",
        "“Prohibition and restriction of traffic” refers to temporarily banning traffic or altering traffic regulations such as driving speed or lane usage when vehicle operation becomes dangerous or impossible due to road damage, road construction, traffic accidents, extreme weather (heavy rain, dense fog), or other natural disasters, until safe conditions are restored.",
        "`",
        "3.4.2 Traffic Restrictions and Detours"
      ]
    },
    {
      "title": "Procedure for Traffic Restriction",
      "content": [
        "When a traffic restriction situation occurs, consultation, restriction, and reporting are carried out in normal cases, while immediate restriction and reporting are conducted in emergencies. The detailed procedure is shown in the figure below.",
        "Figure 3-14: Procedure for Traffic Restriction"
      ]
    },
    {
      "title": "3.4.2.2 Criteria for Traffic Restriction",
      "content": [
        "The classification of traffic restriction criteria for post-disaster response activities by disaster type and damage scale is shown in the table below.",
        "Table 3-23: Traffic Restriction Criteria by Disaster Type",
        "Table 3 24: Traffic control criteria based on damage scale",
        "* Scale of damage: A – Severe, B – Cautionary, C - Minor"
      ]
    },
    {
      "title": "3.4.2.3 Authority and Duties for Traffic Restriction",
      "content": [
        "The authority and responsibilities for traffic restriction in post-disaster response activities are shown in the table below.",
        "Table 3-25: Authority and Duties for Traffic Restriction",
        "Initial judgment and implementation of traffic restriction is the responsibility of the regional HQ director, however, upon review, the headquarters may instruct changes in the traffic restriction if necessary."
      ]
    },
    {
      "title": "3.4.2.4 Traffic Handling Measures in Case of Accidents",
      "content": [
        "The traffic handling measures in the event of an accident for post-disaster response activities are shown in the table below.",
        "Table 3-26: Traffic Handling Measures in Case of Accidents",
        "Measures for Toll Plaza and Service Area"
      ]
    },
    {
      "title": "Entry and Exit Control (Toll Plaza)",
      "content": [
        "1)Accident and Situation Reporting",
        "Waiting of -toll plaza managers and operators",
        "2) Securing and Managing \"Guidance Signs and Block Obstacles\"",
        "Preparation and storage of traffic situation guide \"entry signs\" and education of toll booth situations",
        "Securing IC entry and exit control entry signs and control barricades",
        "Consultation and support  and emergency use plan for staff vehicles",
        "3) Implementation of IC Entry and Exit Control",
        "Implementation of entry and exit control according to the judgment of the traffic control department",
        "Confirmation of entry and exit control details and scope and reporting of results",
        "Regular situation assessment for flexible entry and exit control and reporting.",
        "4) Issuance of Expressway Exit Confirmation Ticket"
      ]
    },
    {
      "title": "3.4.3.2 Service Areas Support (Rest Stops, Gas Stations)",
      "content": [
        "1) Accident and Situation Reporting",
        "Service area and gas station managers should be on standby at all times.",
        "2) Rescue and Relief (Emergency) Supplies Preparation (Rest Stop Cooperation)",
        "Additional emergency preparedness items secured beyond regular stock at Service areas.",
        "Ensure mobile food items such as portable water, bread, etc., are available in addition to cooked food.",
        "3) Vehicle Fuel Rescue and Relief Preparation (Gas Station Cooperation)",
        "Ensure availability of small tanker lorries for long-term designated areas and isolated vehicles.",
        "Secure mobile PET fuel tanks and butane gas cylinders for isolated vehicles on routes.",
        "4) Emergency Access Door Opening Measures at Service area Backdoors",
        "Caution for safety accidents when bypassing measures.",
        "Collecting transit rights and transferring to nearby when bypassing vehicles leave.",
        "* The original backdoor of the Service areas is a facility for commuting employees and delivering goods.",
        "3.4.4 Public Relations Strategy"
      ]
    },
    {
      "title": "3.4.4.1 General",
      "content": [
        "Objectives of public relations during a disaster.",
        "1) Highlighting MoWT's disaster response efforts",
        "Emphasizing the systematic and proactive disaster response activities of MoWT",
        "Efforts to provide factual coverage in case of damage caused by disasters.",
        "Maintaining public trust in the convenience and safety of expressways represented by \"fast, convenient, safe routes.\"",
        "2) Appeal for Active Cooperation from Customers",
        "Delivery of driver behavior guidelines and appeal for cooperation in case of disaster.",
        "Request for checking traffic information and news from media before using expressways.",
        "Crisis Communication Principles",
        "1) Overview of Media Response",
        "Provide useful and accurate information to the media about confirmed facts to build media trust.",
        "Do not speculate or base on personal opinions in response to media questions.",
        "Information reported in the media should be spread to employees as soon as possible.",
        "2) Spokesperson Rules",
        "Only announce facts confirmed or approved by the disaster situation room director.",
        "Deliver messages in a comfortable and cautious manner.",
        "If difficult to answer, respond \"don't know\" and explain the reason for not knowing.",
        "Even if it is not known, if the question concerns basic media coverage, confirm the facts and notify before the deadline.",
        "Clearly explain that efforts are being made to confirm the facts before the deadline if the facts are not confirmed by the deadline.",
        "3) Interview Response Using P.R.E.P. Technique",
        "Point (Point): Clearly and simply state the core message MoWT wants to convey.",
        "Reason (Reason): Provide reasons why MOWT claims so.",
        "Example (Example): Provide visible examples that can prove MOWT’s claim.",
        "Point (Point): Re-emphasize MOWT's relevant core messages.",
        "Operation of the Media and Public Relations Team for Disaster Response.",
        "1) Operation Standards",
        "Operation of the Media and Public Relations Team by Severity and Response Phase.",
        "Activities:",
        "External promotion, reporting-related matters.",
        "Writing and distributing press releases.",
        "Responding to media coverage.",
        "Writing situation journals.",
        "Reviewing and modifying broadcast materials.",
        "Suggesting opinions related to disaster broadcasting.",
        "2)Guidelines for the Actions of the Media and Public Relations Team.",
        "Table 3-27: Guidelines for the Actions of the Media and Public Relations Team"
      ]
    },
    {
      "title": "3.4.4.2 Details Methods and Content of Public Relations.",
      "content": [
        "Table 3-28: Expressways Control Due to Natural Disasters",
        "Table 3-29: Facilities or Human Damage Caused by Social Disasters",
        "Table 3-30: Public Relations Office Duties in Case of Disaster",
        "3.4.5 Relief and Rescue Measures"
      ]
    },
    {
      "title": "3.4.5.1 General",
      "content": [
        "The objective is to establish an emergency coordination and transportation system for the supply of relief goods and equipment during emergencies , in order to minimize damage to expressway users in the event of various disasters and emergencies on the expressway.",
        "Figure 3-15: Flowchart of Relief Supplies Distribution"
      ]
    },
    {
      "title": "3.4.5.2 Rescue Methods and Response",
      "content": [
        "The classification and response methods for post-disaster activities on expressways are as follows.",
        "Table 3-31: Operate dedicated teams for rescue activities in case of disasters."
      ]
    },
    {
      "title": "3.4.5.3 Guidelines for Action during Rescue and Relief Operations",
      "content": [
        "Table 3-32: Operational Standards by Phase",
        "3.4.6 Recovery"
      ]
    },
    {
      "title": "3.4.6.1 Basic Elements of Recovery Plan",
      "content": [
        "Disaster recovery is based on the spirit of frequent disaster prevention, with self-recovery as a principle, involving voluntary participation of local residents and cooperation among civilians, officials, and the military.",
        "Efforts are made to develop fundamental measures to prevent recurring damage in disaster-prone areas.",
        "Efficient budget execution within the permissible range of the recovery budget for improvements and restoration of structures, including major facilities and newly developed or improved structures prone to repeated damage."
      ]
    },
    {
      "title": "3.4.6.2 Types of Recovery",
      "content": [
        "(1) Emergency Restoration",
        "Restoration and facility installation to prevent further damage and recover functionality of disaster-prone facilities that have been damaged or are at risk due to a disaster.",
        "(2) Permanent Restoration",
        "Original Restoration : Restoring damaged facilities to a state similar to their original condition after a disaster.",
        "Improved Restoration : Significantly enhancing the functions of damaged facilities to prevent recurrence of damage when restoring them after a disaster."
      ]
    },
    {
      "title": "3.4.6.3 Post-Disaster Measures",
      "content": [
        "Post-disaster actions by each team of the Disaster Response Headquarters are as follows.",
        "(1) Situation Team",
        "Comprehensive summary and reporting of the situation, including disaster occurrence and progress results.",
        "Establishment of compensation plans for victims.",
        "Administrative support for accident recovery operations.",
        "Dissemination of situation resolution through traffic information guidance facilities.",
        "(2) Public Relations Team",
        "Preparation of domestic and foreign press releases.",
        "Conducting nationwide public relations activities.",
        "Preparation and distribution of disaster status, victim response, and other press releases and distribution to the media.",
        "Active use of media to prevent fluctuations in customers' movements.",
        "(3) Recovery Team",
        "Planning and implementing restoration plans for medium and large divisions and bypass road restoration.",
        "Establishment and implementation of damage recovery measures(Analysis of damage situation, establishment of port recovery plans, etc.)",
        "(4) Mobilization Team",
        "General management of disaster site relief activities",
        "(5) Communication Team",
        "Establishment of cooperative system between relevant agencies, equipment, materials, personnel, etc.",
        "(6) Accident Investigation Team (as needed)",
        "Composition",
        "Operation Timing: When a Level 2–3 accident occurs or when deemed necessary",
        "Members: Formed through separate consultation",
        "Key Duties",
        "Investigate human and property damage",
        "Conduct joint investigations and cooperate with external agencies",
        "Analyze causes of the accident and establish preventive measures",
        "Diagnose structural damage and assess the stability of facilities",
        "Analyze liability and assess compensation feasibility",
        "Review compensation plans for losses",
        "Evaluate and improve crisis response actions and cooperation systems",
        "Prepare measures to secure personnel and equipment",
        "Support team",
        "Establishment of accident compensation (compensation) plan.",
        "Station.",
        "On-site Cleanup: Removal of emergency medical stations, transport routes, access control lines, detour roads, and pre-installed guide signs.",
        "SECTION 4.  Auxiliary Management",
        "4.1 Customer Care",
        "4.1.1 Customer Service Attitude",
        "(1) Definition of Customers",
        "All colleagues at MoWT and all customers visiting or contacting MoWT (All civil petitioners encountered directly or indirectly)",
        "(2) Definition of Customer Satisfaction",
        "A state where expressway users receive the best service and feel happy and delighted when interacting with MoWT Expressway staff",
        "(3) Work Handling Attitude",
        "Strong service mindset",
        "Extensive job knowledge",
        "Kind and courteous attitude",
        "Prompt and fair work processing",
        "Transparent guidance on work standards and procedures",
        "(4) Three Key Efforts for Customer Satisfaction",
        "Effort to understand customers' situations and mindsets",
        "Effort to enhance job-related knowledge",
        "Effort to provide prompt and accurate service",
        "4.1.2 Basic Principles of Customer Service",
        "(1) Think from the Customer's Perspective",
        "Empathize with customers' situations and use appropriate language and treatment",
        "First stabilize customers' emotions",
        "Offer tea or inquire about accompanying family members for consideration",
        "Use empathetic phrases like “I understand your discomfort”",
        "(2) Do Not Explain Laws or Regulations First",
        "Prioritize empathy over logic when customers are emotional",
        "Listen attentively first, then explain operational constraints to seek customer understanding",
        "(3) Do Not Reveal Personal Emotions",
        "Recognize customer frustration as directed toward the system, not personal, and avoid emotional responses",
        "(4) Do Not Attempt to Change Customers' Values",
        "Avoid criticizing customer behavior or trying to persuade them to adopt different values",
        "4.1.3 Standard Customer Service Manual",
        "Table 3-33: Customer Service Behavior Standards.",
        "4.2 Service Areas",
        "4.2.1 Overview",
        "Service areas installed along the expressway shall be regularly inspected and maintained to ensure vehicle convenience and safety while maintaining the original functions of the facilities. Gradual improvements and upgrades shall be carried out for aging infrastructure.",
        "Maintaining the normal operational status of service area facilities",
        "Providing a safe and comfortable environment for users",
        "Conducting preventive inspections, systematic management, and timely repairs",
        "Minimizing maintenance costs through optimized management",
        "4.2.2 Facility Operation",
        "(1) Electrical Facilities",
        "Purpose",
        "Systematic and regular maintenance of power, communication, and disaster prevention facilities at service areas along expressways in Uganda to ensure smooth operation and prevent accidents.",
        "Maintenance Objectives",
        "Predicting and preventing power facility failures",
        "Conducting effective inspections and establishing repair plans",
        "Identifying causes of failures and ensuring safety",
        "Regular inspections and oil level checks for emergency generators; maintaining regular operation status",
        "Ensuring proper functioning of communication facilities and inspecting emergency communication systems",
        "(2) Building Facilities",
        "Purpose",
        "Ensuring the safety, durability, and functionality of building facilities at service areas through preventive management, timely repairs, and structural improvements to consistently guarantee user safety and convenience.",
        "Maintenance Objectives",
        "Routine Maintenance: Preventing minor damage, maintaining facility conditions, and conducting immediate small-scale repairs",
        "Emergency Measures: Temporary repairs and securing emergency evacuation routes in response to serious safety threats",
        "Repair and Reinforcement Measures: Conducting regular and planned repairs to enhance facility durability and functionality",
        "Replacement Measures: Partial or complete reconstruction and modernization of aging facilities",
        "(3) Mechanical Facilities",
        "Early detection of abnormalities in mechanical equipment at administration offices, toll gates, and service facilities through standardized inspections, thereby maintaining original functions, extending equipment lifespan, and reducing operational costs.",
        "The items of major equipment inspection are as shown in the table below.",
        "Table 3-34: Items of Major Equipment Inspection",
        "(4) Landscaping Facilities",
        "Efficiently planned management ensuring trees and landscape facilities are maintained in optimal condition, achieving intended aesthetic and functional purposes, and providing users with a pleasant environment.",
        "Management Direction",
        "Protection of trees and facilities, regular cleanliness and maintenance",
        "Establishment of management standards and securing sufficient human and material resources",
        "Introduction of scientific management systems and professional training",
        "Efficient resource management and establishment of disaster prevention measures and real-time response systems",
        "Planting Management",
        "Establishing and implementing seasonal and growth stage-specific plans to ensure healthy early rooting and growth of trees",
        "Lawn Care and Mowing",
        "Weekly regular mowing to prevent weed growth",
        "Maintain grass height generally at 5–6 cm",
        "Shorter by 1 cm during vigorous growth seasons (rainy periods), longer by 1 cm during dry seasons",
        "Regular fertilization and pest management for lawns",
        "Facility Management",
        "Facility management plans considering environmental conditions",
        "Identification and preservative management of wood decay causes",
        "Regular inspections and maintenance based on metal corrosion and concrete weathering characteristics",
        "Implementation of maintenance history management systems and detailed record-keeping for each facility",
        "REFERENCES",
        "1. Expressway Disaster Management Manual(KEC, 2021)",
        "2. Traffic Situation Room Manual(KEC, 2022,)",
        "3. Expressway traffic flow management operation standards(KEC, 2013,)",
        "4. Traffic Safety Management Operational Standards(KEC, 2022)",
        "5. Safety Patrol Operations Manual (KEC, 2022)",
        "6. Customer Service Standard Manual.( KEC, 2011)",
        "7. AASHTO Highway Safety Manual, 1st Edition (AASHTO, 2014)",
        "8. Highway Code (MoWT, 2009)",
        "9. Network Management Manual (NH, 2009)",
        "10. Regulation for Safety Patrol in Expressway (KEC,2019)",
        "11. Regulation for Traffic flow management in Expressway (KEC,2019)",
        "12. Road Project Implementation Manual (MoWT, 2010)",
        "13. Safety at Street Works & Road Works (NH, 2013)",
        "14. Routine Road Maintenance Manual (SANRAL,2009)",
        "15. Traffic Management for Sub-Saharan African Cities (SSATP, 2021)",
        "16. Traffic Management Manual of the Project in Expressway (KEC, 2019)",
        "17. Transportation Operations Manual, 1st Edition (AASHTO, 2023)",
        "18. Road Maintenance Manual (MoWT, 2010)",
        "19. Freeway Management Operation Handbook (FHWA, 2017)",
        "20. Maintenance Manual for Roadways and Bridges (AASHTO, 2007)",
        "21. Network Management Manual (NH, 2009)"
      ]
    }
  ],
  "Tech Specs_TMS&ITS_4Apr26.docx": [
    {
      "title": "General",
      "content": [
        "TECHNICAL SPECIFICATIONS",
        "OF",
        "ETC & ITS SYSTEMS"
      ]
    },
    {
      "title": "Document Approval",
      "content": []
    },
    {
      "title": "List of Acronyms",
      "content": [
        "The following abbreviations shall refer to the words presented hereunder throughout Particular Technical Specifications:",
        "ALB\t\tAutomatic Lane Exit Barrier",
        "ASB\t\tAmber Siren Beacon",
        "TMS\t\tToll Management System",
        "AVC \t\tAutomatic Vehicle Classifier",
        "CCTV \t\tClosed Circuit Television",
        "CLSD\t\tCanopy Lane Status Display",
        "ECC\t\tError Correcting Code",
        "ETC \t\tElectronic Toll Collection",
        "FAT\t\tFactory Acceptance Test",
        "FSW \t\tEmergency Footswitch",
        "GBIC\t\tGigabit Interface Converter",
        "HES\t\tHybrid ETC System",
        "ISU\t\tIntercom Slave Unit",
        "LC\t\tLane Computer-Industrial grade",
        "LSDU\t\tLane Status Display Unit",
        "MAC\t\tMaterial Acceptance Certificate",
        "MBC\t\tManual Booth Controller",
        "MCBF\t\tMean Cycle Between Failures",
        "MCU\t\tMaster Communication Unit",
        "MLB \t\tManual Lane Entry Barrier",
        "MoWT\t\tMinistry of Works & Transport",
        "MTBF\t\tMean Time Between Failures",
        "MTTR\t\tMean Time to Repair",
        "NVR\t\tNetwork Video Recorder",
        "PMS \t\tPlaza Management System",
        "PDB \t\tPower Distribution Board",
        "POE\t\tPower Over Ethernet",
        "POS \t\tPoint of Sales",
        "RAID\t\tRedundant Array of Inexpensive Disks",
        "RFID\t\tRadio Frequency Identification",
        "RPR\t\tReceipt Printer",
        "Staff Id\t\tStaff Identification",
        "FCD\t\tFee Collector Display",
        "FCK\t\tFee Collector Keyboard",
        "FCT \t\tFee Collector Terminal",
        "TS\t\tTechnical Specifications",
        "UPS\t\tUninterrupted Power Supply",
        "VAMS\t\tVideo Analytics & Management Software",
        "QMS\t\tQueue Length Measurement System",
        "DNR\t\tDepartment of National Roads"
      ]
    },
    {
      "title": "Electronic Toll Collection (ETC) Systems",
      "content": [
        "General",
        "This document provides the minimum technical specification of Hybrid ETC System to be implemented on the project by the empanelled  system integrators. The scope of work will include Design, Supply, Installation, Testing, Commissioning, Configuration, System Integration, Operations and Maintenance of RFID based ETC System to be implemented on the KEE. The project shall be a complete turnkey solution with provision of skilled resources at all locations for operations."
      ]
    },
    {
      "title": "1.1.1\tPlaza Building",
      "content": [
        "The uptime availability of all Critical equipment of the Plaza Building shall be 99% per lane per month.  The permissible downtime for all critical Equipment shall be 7 hours per critical plaza equipment per month.",
        "The downtime shall be calculated at a cumulative level when any of the critical plaza equipment as mentioned below is non-operational for that specific lane:",
        "ETC Server Infrastructure including software",
        "Network Video Recorder",
        "Master Intercom",
        "24 Port Network Switch",
        "Plaza UPS",
        "All Lanes communication down with the ETC server",
        "For all other equipment of the plaza building, the uptime availability shall be 98% per lane per month."
      ]
    },
    {
      "title": "1.1.2\tLane equipment",
      "content": [
        "The uptime availability of all Critical equipment of the ETC system shall be 99% per lane per month. The permissible downtime for all critical Equipment shall be 7 hours per lane per month.",
        "The downtime for a toll lane shall be calculated at a cumulative level when any of the critical equipment as mentioned below is non-operational for that specific lane:",
        "RFID Reader",
        "Toll Lane Controller System",
        "Automatic Vehicles Classification Controller and Sensor",
        "Automatic Barrier Gate",
        "Automatic Number Plate Recognition camera",
        "Lane Camera",
        "Lane Application",
        "For all other lane equipment, the uptime availability shall be 98% per lane per month."
      ]
    },
    {
      "title": "1.1.3\tAVC Accuracy",
      "content": []
    },
    {
      "title": "The Contractor shall ensure to provide a minimum 98% AVC accuracy for each lane",
      "content": []
    },
    {
      "title": "1.1.4\tManpower",
      "content": []
    },
    {
      "title": "The Contractor shall ensure the availability of manpower at the toll plazas 24*7.",
      "content": []
    },
    {
      "title": "1.1.5\tDouble deduction/Overcharging in RFID Tag",
      "content": []
    },
    {
      "title": "The Contractor shall ensure for efficient functionality of RFID readers in lanes; a single RFID Tag should not have two successful transactions within time difference (as specified by MoWT). There should not be any case of double/multiple deductions of RFID Tag account owing to multiple processing of transactions through RFID reader/ ETC application.",
      "content": []
    },
    {
      "title": "1.1.6\tEHS (Environment, Health, and Safety) Compliance Requirement & Penalties",
      "content": [
        "The System Integrator for TMS should adhere to the highest standards of quality and safety at all project sites, with zero tolerance for non-compliance. All site activities must fully comply with the established Safety Procedures and Guidelines."
      ]
    },
    {
      "title": "1.1.7\tStandards",
      "content": []
    },
    {
      "title": "In the absence of any standards in Uganda, relevant clauses of international standards including but not limited to International Electro technical Commission (IEC).",
      "content": []
    },
    {
      "title": "Document reference is made to the Japanese Industrial Standards (JIS), British Standards (BS), American Association of State Highway Transportation Officials (AASHTO) standards, American Society for Testing and Materials (ASTM) standards, and American National Standards Institute (ANSI) standards, and the like, it shall be understood that equivalent internationally acknowledged standards will be accepted.",
      "content": []
    },
    {
      "title": "Wherever Ugandan Technical specifications and Quality Certificates exist, the same shall be acceptable and the Applicant shall not be required to submit the foreign Quality Certifications and Accreditations. The Applicant shall only be required to submit the technical comparison Electrical and Electronic Engineers (IEEE), International Organization for Standardization (ISO), International Telecommunication Union Telecommunication Standardization Sector (ITU-T) shall be applied.",
      "content": []
    },
    {
      "title": "In the absence of any standards in Uganda and the international standards mentioned above, industry standards generally accepted and approved in one of the major industrialized countries such as Great Britain, Japan, U.S.A, and Germany shall be applied.",
      "content": []
    },
    {
      "title": "If System Integrator offers materials, equipment, design calculations or tests which conform to the standards other than those specified standards, full details of the differences between the proposed standard and the specified standards shall be submitted when required by the Client.",
      "content": []
    },
    {
      "title": "1.1.8\tPower Supply",
      "content": [
        "The input power supply of any equipment shall not be connected to any electric components except arresters without connecting first through fuses, power switches and circuit breakers.",
        "All equipment shall be provided with a clearly visible label indicating the input power supply type (AC or DC) and voltage. All equipment shall operate with the power supply of 230V plus or minus 10%, and 50 hertz plus or minus 3 %. All field equipment shall operate normally under instantaneous power supply interruption of 20 millisecond or shorter.",
        "The power supply voltage available in the field will be 230V AC. Unless specified otherwise or with the approval of the Client, all field equipment shall be designed to operate directly on 230 V AC. The System Integrator shall be responsible for arranging the terminal devices necessary to receive the power supply.",
        "System enclosures shall include a power distribution subsystem for supplying power to each component within the enclosure and related / inter- connected equipment. The circuit breakers shall be properly sized according to the expected loads of the concerned equipment and to meet relevant electrical code requirements.",
        "All electrical equipment and cabling shall be provided in accordance with relevant Ugandan standards."
      ]
    },
    {
      "title": "1.1.9\tEnvironmental Conditions of Components",
      "content": []
    },
    {
      "title": "All equipment shall be designed to operate properly under the environmental conditions normally encountered at the site of the equipment and shall conform to the minimum requirements specified herein.",
      "content": []
    },
    {
      "title": "1.1.10\tEnvironmental Conditions",
      "content": [
        "Unless specified otherwise, indoor equipment shall be designed to operate in the temperature range of 0 to 35 degree Celsius, and the relative humidity range of 5 to 85 percent, whereas outdoor equipment shall operate in the ambient temperature and relative humidity ranges of -10 to +55 degrees Celsius and 40 to 95 percent non-condensing humidity, respectively. Adequate protection from moisture condensation, fungus, rust, insects, rodents, and dust shall be provided.",
        "All equipment shall be adequately treated to prevent rust and corrosion due to high humidity or moisture condensation. All galvanized steel surface shall have a minimum plated zinc amount of 350 g/m2. Any signs of rust or corrosion occurring within the guarantee period shall be deemed a defect and the System Integrator shall be responsible for correcting, at his own expense."
      ]
    },
    {
      "title": "1.1.11\tCabling and Wiring",
      "content": []
    },
    {
      "title": "All cables and wires shall be of good quality, conforming to normally accepted industry standards, and shall be of the proper type and have sufficient ratings for the particular application.",
      "content": [
        "All exposed ends of unconnected cables and wires shall be coated with watertight sealing compound or sealing tape to avoid damage to conductors. All communication cables used shall have a clearly marked label securely fixed near each end in accordance with the cable network diagram.",
        "All cables and wires shall be adequately protected from the edges of equipment housing or other surrounding objects. All of the cables and wires shall be neatly arranged and securely placed in such a way that all terminals are relieved of the weight of the cables. Terminals shall be coded, identified and labeled according to wiring diagrams. Live metal shall be recessed or protected to avoid accidental contact."
      ]
    },
    {
      "title": "1.1.12\tGrounding",
      "content": [
        "All exposed metal not forming part of the electrical circuitry, including equipment enclosures, cable supports, structure and pole shall be grounded to the earth."
      ]
    },
    {
      "title": "1.1.13\tProtection against Lightning",
      "content": [
        "All outdoor equipment shall incorporate gap arresters or other suitable device approved by the Client to prevent lightning damages which may enter through input AC lines, communication cables, signal cables, detector feeder cables or other metallic elements exposed to the open air. The System integrator shall take all preventive measures to save the components from surge and lightening"
      ]
    },
    {
      "title": "1.1.14\tCabinets",
      "content": [
        "All equipment cabinets for outdoor uses shall be of rainproof and rustproof construction with smooth exterior and adequate protection against moisture condensation and shall be made of high-quality steel or stainless-steel plates of adequate thickness. Steel plate cabinets shall be treated with sand blast before painting or equivalent rustproof measures.",
        "All outdoor equipment cabinets shall be equipped with a build-in lock and door open alarm integrated with the Control Centres. All cabinets for the same type of equipment shall have an identical lock."
      ]
    },
    {
      "title": "1.1.15\tSpares, Consumables and Maintenance Equipment",
      "content": []
    },
    {
      "title": "The Contractor shall furnish the spare parts, consumables and maintenance equipment to meet the requirement at site during the entire period of the Contract.",
      "content": []
    },
    {
      "title": "1.1.16\tData Retention (Backup & Restore)",
      "content": [
        "Data Retention:",
        "Data for each plaza shall be retained for the entire Agreement period in the Toll Plaza Server. The backup devices and media as per current industry practice shall also be provided.",
        "The Contractor shall ensure adequate security measures for safeguarding of Toll Transaction data, by providing, off-site Disaster recovery or Data Storage mechanism.",
        "The Contractor shall also be responsible to extract and providing data /information based on the requirement of MoWT, Auditors, Law Enforcement Agencies of Govt. of Uganda based on specific approvals on a case-to-case basis.",
        "However, it will be limited to the data captured in ETC and Toll Management Systems as per standard operations and the data being retained as per the retention schedule.",
        "Data Back-up & Restore:",
        "Contractor shall also demonstrate the backup & restore procedure successfully. The Contractor shall prepare and implement a proper Data Backup & Restore policy with MoWT approval, to ensure data safety and avoid data loss, in case of any untoward incidents.",
        "Such policy shall ensure Back-up & Restore of Toll Transaction data at least once in a week.",
        "Contractor shall ensure to maintain the Data backup till Contract Expiry and ensure to submit the data backup with MoWT and the concerned plaza after the expiry of Contract Agreement.",
        "Data shall be backed up onto a removable medium on a regular basis start from plaza live date to end of Contract period."
      ]
    },
    {
      "title": "1.1.17\tMounting Arrangements",
      "content": []
    },
    {
      "title": "All mounting arrangements for equipment shall comply with the requirements of that equipment as detailed in this specification.",
      "content": []
    },
    {
      "title": "The foundation and the foundation bolts for Ground mounted enclosures, poles etc. shall be fabricated using a suitable (site specific grade of steel) material.  The assembly shall be galvanized to a minimum coating thickness of 100 microns for poles, plates etc and up to 55 microns for the bolts and other accessories.",
      "content": []
    },
    {
      "title": "Galvanized Nuts, locknuts, locking pins washers etc. shall be supplied as a part of the foundation.",
      "content": []
    },
    {
      "title": "Fixing templates with a placement accuracy of at least +/- 1mm shall be provided to allow for the correct orientation and installation of the steel foundation on to the concrete base.",
      "content": []
    },
    {
      "title": "The strength of the foundation assembly shall be suitable to hold the Enclosure/Pole while withstanding weather conditions of the site for a period of at least 25 years.",
      "content": []
    },
    {
      "title": "1.2\tFunctional Requirements",
      "content": []
    },
    {
      "title": "1.2.1\tLicense",
      "content": [
        "The Contractor shall supply, fully licensed software for the following non-proprietary software,",
        "Microsoft Windows or Linux for lane /AVC systems and CAL as recommended by the Contractor.",
        "Microsoft Windows Server Enterprise (latest version) or Linux for server as recommended by the Contractor",
        "Microsoft Windows (Latest Version) for all Workstations/Desktop.",
        "Licensed version of Database management software as recommended by the Contractor (Servers). No open source/community version of database management system shall be allowed to use in the server system.",
        "Anti-Virus Software for lanes, servers and workstations as recommended by the Contractor (Latest Version)",
        "Anti-Spyware Software as recommended by the Contractor (Latest Version)",
        "MS Office Professional (Latest Version) for all the workstations",
        "Network Monitoring System (NMS) with COTS perpetual license",
        "Helpdesk and Stock Management tool with COTS perpetual license.",
        "Any other Non-Proprietary Software that is required to ensure a system that is fully functional and performs in accordance with the specification and user requirements.",
        "The Contractor shall ensure that all proprietary software is provided with no annual fee."
      ]
    },
    {
      "title": "1.2.2\tLane Application Module:   Contractor shall provide the Lane application module developed on the latest technology and standards. The lane application shall have the following minimum functionality:",
      "content": [
        "The Software includes all standard feature of toll collection system. It shall be integrated with all lane components for the automation. All Transactions are securely transferred to central server to add in the database. It shall have the Electronic Toll Collection feature using RFID reader and ANPR system. The barriers and user fare displays are instantly sent the trigger upon the validation. The software shall have feature to update the status to central system for the active monitoring",
        "Realtime transaction transfer from Lane to server.",
        "Integration with all Lane peripherals including boom barrier, traffic light, UFD, Lane cameras, OHLS etc.",
        "Integration with AVC modules to get the real time data.",
        "Integration with LSDU and all other monitoring tools.",
        "Allows toll booth operators to log in to their respective lanes using personal credentials, supplemented by biometric authentication, to ensure accountability for transactions conducted at each lane.",
        "1.2.3\tAutomatic Vehicle Classification (AVC): The System shall comply with the following:",
        "Each and every transaction shall be uniquely identifiable and traceable unit, stored by the Toll System.  The transaction record shall contain all data relating to the passage of every single vehicle through the Lane.",
        "The Toll System shall ensure that the data supplied to AVC Independent Data Base can be traced back and reconciled to the transaction data.",
        "The AVC system shall consist of individual AVC’s installed in each lane as indicated and the Independent Data Base (IDB) that will collect, store, compress data and also be able to transmit data to the client.",
        "Each transaction recorded by the system shall be time-stamped and uniquely and sequentially numbered.",
        "All status messages shall be uniquely linked to the Toll transaction in progress.  Each status message shall be uniquely and sequentially numbered.",
        "1.2.4\tPlaza Server Application:",
        "DATA CENTRE INFRASTRUCTURE",
        "HYPER-CONVERGED INFRASTRUCTURE (HCI)",
        "The solution shall be based on a scale-out Hyper-Converged Infrastructure (HCI) architecture designed for 24×7 revenue-critical ITS workloads. The design must eliminate single points of failure and support horizontal scaling. The HCI architecture shall support a unified platform for virtual machines and containers, providing software-defined compute, storage, networking, and management services. The solution shall provide self-healing, automated load balancing, and elastic scalability without service interruption",
        "VIRTUALIZATION PLATFORM",
        "NETWORK EQUIPMENT (WAN ROUTERS & SWITCHES)",
        "WAN ROUTER",
        "NETWORK CORE SWITCH",
        "FIRE SUPPRESSION",
        "CLEAN POWER (INVERTER and BATTERIES)",
        "COOLING SYSTEMS",
        "SECURITY INFRASTRUCTURE SOLUTIONS",
        "ENTERPRISE PERIMETER SECURITY SOLUTION",
        "ENTERPRISE WEB APPLICATION AND API PROTECTION SOLUTION",
        "SECURITY INFORMATION EVENTS MANAGEMENT (SIEM)",
        "DATABASE ACTIVITY MONITORING SOLUTION",
        "Web-based Architecture:  Software shall be built upon a web architecture that can run upon on any standard browser.",
        "Accessibility: Usable from any device with a web browser and internet connection, offering flexibility and convenience.",
        "Easy Integration: The application should provide easy integration with relevant hardware and solutions to be used.",
        "Realtime data transfer:  the real-time data transfer with Lane and other system server for the toll operation.",
        "Scalability: scalable to accommodate a growing user base without requiring individual installations.",
        "Multi-Station Remote Monitoring & Operation:  The software shall have and unique system which allows multiple plazas operational monitoring from a single control point.",
        "Dashboard: The dashboard of all important data to be viewed from the HQ and remote location.",
        "Reporting Module: The customizable reporting module in plaza server to export all reports. The SI shall provide all major reports. The system integrator shall add a new report or amend existing reports without any additional cost to the client up to the period of one year from the SAT.",
        "Bank Transaction:  The plaza application shall be capable to transfer the data on Realtime basis form the plaza server to the acquirer bank. The system integrator shall design the dedicated APIs on server to communicate with bank and transfer the data on real time basis.",
        "Validation Module:  The plaza server shall have the validation module to validate the Exempted transaction, violations, abnormal transactions and any other anomalies in transactions.",
        "1.2.5\tANPR Solution:  Automatic Number-Plate Recognition, shall be used to capture license plate information from passing vehicles. It shall read the number plate of approaching vehicles and enter in the system automatically.",
        "The Counting accuracy of ANPR system shall be more than 99.5%.",
        "Recognition accuracy shall be minimum 90%.",
        "The ANPR should work in all weather conditions and Day & night.",
        "System shall have capabilities to transfer the data instantly to lane application.",
        "Lane application shall have functionality to use the ANPR data to fetch the RFID Tag details from acquirer bank and make a valid transaction even in case the reader fails to read any RFID affixed on vehicle.",
        "In case of any cash or exempt transaction, ANPR data should be automatically inserted in the number plate field to make such transactions. The operator shall not be required to enter the number plate data manually in any type of transactions; however, lane application should ask confirmation from operator in case ANPR confidence score is down. Such confirmation shall appear along with vehicle photo and operator should be able to edit the number if ANPR data is incorrect.",
        "1.2.5\tHQ Monitoring Tool: The system integrator shall provide the headquarter monitoring tool which should have remote monitoring on single dashboard using the web interface or windows-based application. It shall be possible to monitor multiple plazas on a single console; it should containing the following parameters:",
        "Transaction count along with daily/monthly/hourly graphs",
        "Revenue representation",
        "Lane wise transactions count",
        "Plaza wise revenue/traffic count",
        "Traffic heatmap",
        "Daily/weekly/monthly revenue",
        "Dedicated filter for plaza, lane and time duration on the dashboard",
        "The dashboard should be loaded in faster speed, and it should not take more than 30 seconds in refreshing all the data on display. The system shall be easy to use and interface shall be clatter free."
      ]
    },
    {
      "title": "1.2.6\tNetworking",
      "content": [
        "The network must be designed highly redundant to avoid any failure in connectivity. There shall be two Separate OFC cable laid from Switch-1 & Switch-2 to Server Rack switch. Both cables shall be laid through separate path and conduits. The managed switch should be configured in order choose the alternative network route, in case, any of the network route is down.",
        "Between Plaza buildings and lanes, the Contractor shall supply and install all equipment, cables, connectors, terminals, ducts, and other miscellaneous materials necessary to establish a properly functioning local area network connecting these two systems."
      ]
    },
    {
      "title": "1.2.7\tPower Supply and Backup",
      "content": [
        "The Contractor shall supply and install UPS to fulfill the backup requirement. All PMS and all lane equipment shall be provided power through these UPS to make sure that the power is continuously available to all System / Equipment for duration specified continuously during the interruption of raw power or failure of DG power. The UPS shall only be used during the change-over duration or breakdown of DG only. UPS shall not be used during the power supply failure as backup and in case of any power supply failure, the DG system shall be made operation by the Toll collection agency within 1 minute of main power failure. The contractor shall lay all the power cables from junction/distribution box of the plaza building. The duct/conduit of Power and connectivity cables should not be the same. All the UPS and battery bank shall be supplied with required stand/enclosure to install in the lanes or plaza."
      ]
    },
    {
      "title": "1.3\tSpecifications for Lane Equipment",
      "content": [
        "Toll Lane Controller (TLC)",
        "The Lane Controller shall be provided in each lane to control and monitor all the sub systems and peripheral equipment and communication of the lane for toll fee collection process and vehicle passage. All the peripheral equipment shall be controlled using a PLC/Logic card. The customised electronic enclosure of stainless-steel / MS shall be provided to house the Lane computer, AVC controller, peripheral coordination circuitry, redundant power supply, 8-port managed lane network switch, PLC and power protection blocks. It will acquire the lane data and transmits to the PMS in real time.",
        "The TLC shall be connected to the plaza, via fibre optic cable and cable shall be required to transmit all transactions, incidents as well as other control information to the PMS in real time. The LSDU shall be able to monitor each activity that takes place in each lane in real time.",
        "The TLC shall be able to track and store in an accurate and fully auditable manner all lane and AVC transactions in a manner as to ensure the system and data integrity is not compromised in any way. The Contractor shall provide a comprehensive test methodology for this activity.",
        "Each Lane Controller electrical component should be built on a single rack with its own electrical protections and automatic fuses. Each lane cabinet / enclosure shall have individual independent power sources, one from the UPS and another directly from the Plaza power source. All the cabinet power inputs in the Plaza are connected to an electrical switch to shut down the power of all Plaza lanes for emergency purposes.",
        "System Configuration",
        "The TLC located at the booth shall consist of at least the following:",
        "Industrial grade fan less controller for Lane",
        "Industrial grade fan less controller for AVC",
        "PLC/Logic Card/Automation Unit",
        "Redundant power supplies,",
        "Power distribution panel with surge and lightning protection circuit",
        "Terminal blocks",
        "Relays",
        "Thermostat",
        "Surge Protection Devices (SPDs)",
        "IP 55 Electronic enclosure with high security locking mechanism",
        "Electronic Enclosure",
        "The Electronic Enclosure shall be of modular construction stainless steel/ MS cabinet and shall not exceed the dimensions that shall fit under the TC work top / table. This will securely house all the components of LC.",
        "Lane Computer",
        "The Lane computer shall be main component of TLC used to install the Lane application software along with ANPR recognition software. Lane computer shall be connected in network to integrate with all lane peripherals and send the data to plaza system.",
        "Lane computer shall maintain Logs of all transactions, including vehicle identification, toll amount, payment method, and timestamp. The system shall integrate with a central system to transmit transaction data and receive real-time status on tag status and other relevant information. The lane controller shall Manage Lane status (open/closed) and display relevant information on lane signage.",
        "Lane Computer shall be mounted inside the Electronic Enclosure. It shall acquire all the data from the lane peripherals and transmits them to the PMS in real time.",
        "The technical specifications mentioned hereunder are minimum guidelines. The Contractor shall not deviate materially from the specifications specified.",
        "Technical Specification of Lane Computer:",
        "4.\tAVC Computer",
        "The AVC computer shall be used to install the AVC application software",
        "AVC Controller shall be mounted inside the Electronic Enclosure. It shall acquire all the data from the lane peripherals and transmits them to the PMS in real time.",
        "AVC computer shall be used to install AVC application which shall be integrated with all AVC peripherals. System shall have active integration lane application to assign the class of all passing vehicles.",
        "The technical specifications mentioned hereunder are minimum guidelines. The Contractor shall not deviate materially from the specifications specified.",
        "Fee Collector Display (FCD)",
        "The Fee Collector Display (FCD) shall be located on the Fee Collector’s workstation and shall be screwed or bolted through the counter top. It shall be the system’s interface to the Fee Collector, to display the status of transactions and status of the lane peripherals.",
        "The technical specifications mentioned hereunder are minimum guidelines. The Contractor shall not deviate materially from the specifications specified.",
        "Fee Collector Keyboard",
        "The keyboard on the Fee Collector terminal for Registration of toll operations shall be a programmable Industrial Grade keyboard.",
        "Programmable Keyboard Features and Specification shall be as follows:",
        "True spill-resistant design",
        "Optional blank key, double key for alternative key group layout",
        "70 programming keys + 6 position control key",
        "Key top size: 18 mm x 22 mm for single key",
        "Interface: PS/2 or USB",
        "Dimension: Suitable for operation in the booth and placement on the work top / table",
        "Receipt Printer (RPR)",
        "The thermal receipt printer (RPR) shall be used to print receipts in the lanes. The printer shall be provided with the automatic advance function of the paper after printing so that the space for the first line of printing is aligned under the print head thus reducing the time taken to produce a receipt.",
        "Technical specifications for the RPR shall be as follows:",
        "Cash-drawer",
        "Smart Cash Drawer shall be installed in each lane which shall be integrated with Lane system. The cash drawer only shall be opened when cash transaction is required to be made in the lane. Cash Drawer should be opened only after generating the receipt for cash transaction.  Cash drawer should be closed manually when cash transaction process is complete. The status of cash drawer should be synced with Lane system/LSDU/NMS.",
        "The following minimum specification shall be applicable for cash drawers:",
        "•\tSmart electronically operated cash drawer tray,",
        "•\tMetal cash drawer with robust mechanism",
        "•\t1,000,000 operation durability",
        "•\tCompatible with all brand thermal printer",
        "Traffic Light",
        "The Traffic Light (TL) shall be located in the toll lanes in a position where it is readily visible to users of the toll road, usually on the side of the lane beyond the toll booth. The traffic light shall consist of two traffic light heads mounted on a suitable pole. The traffic lights at toll plazas shall indicate to drivers whether to stop or proceed. A red signal is used to indicate that the user should stop whilst the green signal is used to indicate that the user should proceed after completing the transaction.",
        "The following minimum specifications shall be met:",
        "Size\t\t\t: 200 mm dia with",
        "Display (Stop)\t\t: Red LED",
        "Display (Start)\t\t: Green LED",
        "Visibility Range\t: 20 m (under normal visibility conditions)",
        "Enclosure\t\t: MS Housing with sun visor",
        "Mounting\t\t: On Pole",
        "User Fare Display:",
        "The user fare display (UFD) in a toll management system acts as a communication channel between the toll plaza and the user. The UFD shall display the following information (based on the respective transactions) to the road user:",
        "Default Greeting Message",
        "Vehicle Classification details",
        "Fare details",
        "Transaction Method: Cash/Tag/Exempt/Violation etc.",
        "Vehicle Number",
        "Tag status",
        "The following minimum specifications shall be met for UFD:",
        "Size\t\t\t: 750 X 450 mm",
        "Character per Line\t: At least 16 per line",
        "Luminous Intensity\t: >2000 mcd",
        "Display\t\t\t: Red LED",
        "Visibility Range      \t: 10 m",
        "Enclosure              \t : MS",
        "MTBF                     \t: 50,000 hours",
        "MTTR                     \t: less than 30 minutes",
        "Overhead Lane Status Sign (OHLS)",
        "The Over Head Lane Sign (OHLS) is located above the centre of the lane at the lane entrance. The purpose of the OHLS is to indicate to the User whether the lane is open for the processing of vehicle or closed. A red cross is used to signal that the lane is closed, whilst a green arrow is used to indicate that the lane is open to traffic. Signs must be sufficiently bright and directed to indicate to a motorist, approaching the Fee Plaza, at a distance of 300 m on a bright cloud free day that the lane is available for use. The OHLS status shall also be visible up to a peripheral view of 45 degrees from the travel axis. At any situation, both RED and GREEN part shall not glow simultaneously. Under failure conditions, only Red Cross shall be displayed until rectification. Dimming facility should be available in the OHLS unit for adjusting to the light present during 24 hours.",
        "The following minimum specifications shall be met:",
        "1.3.9\tLane Camera",
        "The camera installed at a convenient location on the canopy or on a pole shall be used to capture images and video clips of the vehicles in the following incidents:",
        "If there is a class discrepancy between the classes detected by the AVC and that entered by the Fee Collector.",
        "Exempt users.",
        "All transaction of vehicle with special events.",
        "Offending vehicles.",
        "When the panic alarm footswitch is activated by the Fee Collector.",
        "Vehicles with contactless smart card or ETC payments.",
        "All other transactions",
        "A camera of 2MP at 25 FPS shall be provided. The IP camera shall be bullet type with inbuild IR of 50 meters with illumination at 0.1 lux for colour image and black& white at 0 lux with IR. The lens shall be of 2.7-12 mm motorised varifocal with true WDR, 3D DNR, BLC, AGC and dual streaming. The Camera shall have inbuild SD card slot and shall be provided with at least 128 GB class 10 SD card. The shutter speed of the camera shall be 1/3 second to 1/100000 seconds for capturing the motion detection even during low light condition and provide proper image. The housing shall be IP 67 rated with IK10 protection against vandalism. The camera shall support one alarm I/O port and audio I/O.",
        "The face detection function shall be activated as soon as the motion detection is triggered.",
        "The camera shall also detect any object addition, object removal, and lane crossing.",
        "Whenever any event is triggered, the camera shall record the event on SD card.",
        "ONVIF Supports.",
        "Compression: H.265 & MJPEG",
        "Video Bit rate 32 kbps ~ 8 Mbps",
        "Digital Noise Reduction 3D DNR",
        "1.3.10\tANPR Camera",
        "ANPR Camera should have the following minimum specifications:",
        "A camera of 5MP at 25 FPS & 2MP at 50 FPS shall be provided. The IP camera shall be POE powered bullet type with inbuild IR of 100 meters with illumination at 0.01 lux for colour image and black & white at 0 lux with IR.",
        "The lens shall be of 5-50 mm motorized varifocal with true WDR (120 dB), 3D DNR, BLC, HLC, Defog, AGC and Triple simultaneous streaming.",
        "The Camera shall have inbuild SD card slot and shall be provided with at least 128 GB class 10 SD card. The shutter speed of the camera shall be 1/3 second to 1/100000 seconds for capturing the motion detection even during low light condition and provide proper image. The housing shall be IP 67 & NEMA-4X rated with IK10 protection against vandalism. The camera shall support one alarm I/O port and audio I/O.",
        "ONVIF (S, G & T) Supports. Compression: H.265 & MJPEG. Video Bit rate 128 kbps ~ 8 Mbps.",
        "Protocol support: TCP/IP, UDP, HTTP, HTTPS, SNMP, 802.1X, FTP, IPv4, IPv6, RTSP, SMTP, UPnP.",
        "The Camera shall have applicable CE, UL 62368-1, IEC 62368-1 certifications.",
        "Automatic Lane Barrier (ALB)",
        "The function of the Automatic lane exit barrier is to control the passage of vehicles through the lane.",
        "The operation of barrier is linked to the LC. It allows the vehicle to pass through after a successful transaction has happened at the lane.",
        "The system consists of a fixed housing and a movable arm with a high impact breakaway device or provision. The housing shall contain the motor and control units along with the integrated metal detectors for vehicle detection purpose.",
        "The housing shall be installed on the right side of the traffic direction, after the booth on a concrete base.",
        "The boom arms shall be fitted with a swing-away flange to prevent damages to the barrier / vehicle in case of a forced drive-through.",
        "Boom contact shall be available which gives continuous alert to the PMS when the boom is missing or swung away.",
        "Safety sensor shall be added so that Automatic Lane Barrier does not fall on a vehicle in case of tailgating.",
        "The automatic lane barrier shall meet the following technical specifications:",
        "Intercom Slave Unit (ISU) inside the booth",
        "This specification lays down the general, functional and technical requirements of intercom slave communication unit to be used as a sub-system in the HTS System at the Plaza.",
        "ISU shall be IP based and used for communication between the Fee Collector at the lane and the auditor/ supervisor at the Plaza building.",
        "ISU shall have the following functions:",
        "Voice communication device installed in the booths shall provide hands free two-way verbal communication between the supervision staff in the control room and the Fee Collectors. The Fee Collector shall be able to attract the attention of the auditor in the control room by pressing a single button on the intercom slave unit in the booth. Multi-button voice communication device will not be accepted in the booths.",
        "The equipment shall also have the facility to allow the supervision staff to monitor communication in the booth between the Fee Collector and the user or between any booth without alerting the Fee Collector.",
        "The voice communication system shall operate independently of the LC system.",
        "Voice communication shall also be implemented in various rooms of the plaza building and at building access points.",
        "Two-way communications shall be possible as soon as the auditor responds by selecting the appropriate lane button on the Master Communication unit",
        "One-way communication shall be possible from the Control Room intercom to all lanes simultaneously (broadcast)",
        "Panic Alarm System",
        "This specification lays down the general, functional and technical requirements of panic alarm system to be used as a sub-system in the ETC System at the Plaza.",
        "The Emergency Footswitch is located in each booth under the Fee Collector’s desk. The footswitch is provided for use in case of emergency or accident. Pressing the footswitch causes an alarm to be given to the auditor via the LSDU & Siren. The siren is fitted on the top of the booth. The siren also is triggered by the incidents like violation and the Convoy as mentioned in the design specification documents earlier. The revolving light installed on the lane separately on the top of Traffic Light camera. The Revolving light shall be triggered in case of violation or panic alarm foot switch is pressed.",
        "Footswitch",
        "Siren",
        "The Siren shall be supplied with all mounting accessories and installed in the booth :",
        "Revolving Light with Buzzer",
        "Revolving light shall be installed on pole in the lane:",
        "Manual Booth Controller (MBC)",
        "In case of malfunctioning of Lane Controller, the manual booth controller is used to control the lane traffic manually. It is normally in a locked mode and can be unlocked using key switch, when required. To operate the lane in a manual mode, MBC should be unlocked.",
        "Following equipment are controlled by the MBC:",
        "Canopy Lane Status Display",
        "Automatic Lane Barrier",
        "Amber Siren Alarm",
        "Spare Button",
        "It shall be custom designed by the Contractor and the design shall be submitted in the technical evaluation of the bid.",
        "Fog Light along with Flasher",
        "A fog light shall be provided at the nose of island to be used to prevent vehicles from hitting the island under adverse weather conditions. The Fog light shall be supplied along with timer to switch on/off.",
        "The Fog (flashing) light shall meet the following requirements:",
        "Automatic Vehicle Classification System (AVC) including Controller, sensors, loop and detector",
        "Accuracy Level: The system shall be Laser Profiler based and 100% auditable, accuracy of vehicle counting should be 100% and classification shall not be less than 98%.",
        "Obtain output of the audit report at least the following:",
        "Transaction sequence number",
        "Date & time of the transaction",
        "Lane ID",
        "Shift ID",
        "TLC class",
        "AVC class",
        "MOP",
        "Incident type and details associated with the transaction, if any",
        "Description and Functions",
        "The automatic vehicle classification equipment shall be installed in the lane after pay-axis.",
        "The purpose of the AVC is to sense the presence of a vehicle (differentiate it from non-vehicular crossing), to measure and interpret certain physical characteristics of the vehicle as it passes through the AVC.",
        "The AVC shall be able to generate profile image which shall be used for auditing purpose.",
        "The AVC shall be able to distinguish between classes as per the applicable notifications of MoWT",
        "This class information shall be stored locally at AVC level and communicated to the TLC. Simultaneously a still image of the vehicle shall be captured by the lane camera System  as the vehicle triggers the AVC sensors. The TLC shall then check whether this AVC class matches the vehicle class read from the tag.  If there is a discrepancy between the two classifications, the license plate image and the camera image shall be saved and stored with all transaction and incident information watermarked on them. The images and discrepancy information shall be communicated to the Local ETC server for further action and processing by the toll supervision staff.",
        "AVC Enclosure",
        "The AVC and all related peripheral controllers should be enclosed in an IP65 compliant cabinet.",
        "ETC RFID Reader",
        "The lanes equipment shall have one ETC RFID reader. The ETC reader/antenna shall be mounted on the canopy at least 5.5 meters above the finished road level. The Contractor shall provide brackets, fixtures and other accessories necessary for the installation of the reader/antenna.",
        "The specifications of the ETC reader and antenna shall be as follows:",
        "It shall be able to read the Tag as defined by UNRA / MoWT.",
        "The RFID reader installed in each lane shall be either reader with integrated antenna type or a multi-port reader type with external antennas.",
        "The reader shall be capable of reading the RFID tags and memory banks at a minimum speed of 80 Kmph.",
        "The reader shall have memory persistent data storage for minimum 400,000 transactions locally inside the reader.",
        "The reader shall have communication using Ethernet/Serial Communications (EIA standards RS 232 C / RS 485) and having protocol EPC Gen 2, ISO 18000 6C.",
        "Operating Temperature -40°C to +70°C",
        "Humidity 100% Condensing",
        "Storage minimum 8 GB flash memory",
        "Visual Diagnostics It shall have LED indicators for sense, transmit fault and power. These LED indicators should be clearly visible to the operator on ground.",
        "The Reader and Antennas shall have IP Rating of IP65 or better.",
        "Antenna reading zone shall be optimum for single lane Operation and coverage of the antenna shall not exceed a diameter of 3.6m, with no more than 0.1% cross reading across and along the lanes. Antenna shall be linear or circularly polarized meeting the read zone specifications outlined above.",
        "The Reader shall have automatic antenna detection functionality and shall be provided with a reporting and monitoring tool at the control room level for real-time monitoring of the RFID reader and shall also be able to detect the antenna failure.",
        "The system shall perform during day  and  night  as  well  as  in  adverse  weather conditions.",
        "Booth CCTV System",
        "The Contractor shall provide a booth CCTV system as specified in BOQ. The CCTV system shall be for Security Surveillance. All cameras shall be equipped with a) micro memory card (minimum 128 GB Storage) to record the footage for at least 24 hours in event the camera is offline or does not have any connectivity with the Video server.  Camera shall have Audio/ voice recording function, and day & night vision function.",
        "A camera of 2MP at 25 FPS shall be provided. The IP camera shall be POE powered dome type with inbuilt IR of 30 meters with illumination at 0.01 lux for colour image and black& white at 0 lux with IR. The lens shall be of 2.8 mm fixed focal. The shutter speed of the camera shall be 1/3 second to 1/100000 seconds for capturing the motion detection even during low light condition and provide proper image. The housing shall be IP 67 rated with IK10 protection against vandalism. The camera shall Built-in Mic for voice recording.",
        "The camera shall also detect any motion, intrusion, line crossing and tampering.",
        "Whenever any event is triggered, the camera shall record the event on SD card.",
        "ONVIF (S, G & T) Supports.",
        "Compression: H.265.",
        "Video Bit rate 128 kbps ~ 6 Mbps",
        "Minimum Protocol support: TCP/IP, UDP, HTTP, FTP, IPv4, RTSP, UPnP.",
        "2 KVA UPS",
        "UPS along with battery bank shall be supplied in each lane along with closed or covered enclosure/stand.",
        "The technical specifications for 2 KVA UPS are as follows. The Contractor shall ensure that the battery bank supplied shall be sufficient to provide minimum 4 hours of backup.",
        "PoE 8-Port Industrial grade rugged Switch with 2 Fibre Port",
        "This device shall have the capability to provide adequate continuous power to each PoE equipment to meet the required performance, quality and reliability requirements. The 8 port switch shall be used on all lanes and inside the plaza building as per the system requirements:",
        "The switch shall be manageable 8 port industrial grade switch.",
        "Switch shall have minimum 8 nos. 10/100Base-T (with minimum 6 PoE ports with power budget of 60W) ports and additional 2 numbers of SFP uplink ports loaded with MMF Modules.",
        "Shall have be IP30 rated and shall work on up to 60°C temp in a sealed enclosure and should be DIN Rail mountable.",
        "Switch shall be IEC 60068-2-6, IEC 60068-2-27, IEC 60068-2-47, IEC 60068-2-64, IEC 61000-4-5 and NEMA TS-2 compliant.",
        "1.3.23\tWi-Fi Router",
        "Outdoor High speed Wi-Fi router shall be installed in lane to make wifi coverage in all the lanes with following minimum specification:",
        "Complies with 802.11 ac standards",
        "Speed up to 1200Mbps (5GHz 867Mbps and 2.4GHz 300Mbps).",
        "2 x Ethernet Port",
        "Equipped with one gigabit 1000Mpbs WAN port and one 100Mpbs LAN port,",
        "Waterproof Design for Outdoor Applications, IP65 rated waterproof & heat resistant",
        "Maximum Temperature up to 70 Degree",
        "1.3.24\tBiometric Device",
        "The System Integrator shall provide the Biometric Device in each lane to login and logout from the lane. The lane application shall have an active integration with the Biometric device. The Lane application shall have functionality to login automatically with biometric validation even without entering user/password. The Lane also shall have the option to switch on the dual validation (Username/Password and Biometric) as required by the client.",
        "The biometric devices shall have following specifications:"
      ]
    },
    {
      "title": "1.4\tTechnical Specifications for Plaza Components",
      "content": [
        "1.4.1\tCentral Servers",
        "The ETC application server configuration shall consist of two servers with cluster configuration, one primary server and one stand-by server. Each of the two servers in the cluster shall meet or exceed the minimum requirements stated hereunder.",
        "The TMC server and workstation computer hardware shall be standard models manufactured by organizations of international repute. Custom built or non-standard assembled equipment will not be acceptable.",
        "The specifications in this section are provided as reference. The servers to be provided by the System Integrator shall materially comply with these specifications and shall be subject to the approval by the client.",
        "Each server shall have minimum latest generation Intel Xeon 16-Core processor 3.2 Ghz CPU, 64Bit , 19.25 MB Cache, 105W.",
        "The server shall have 128 GB RAM memory using 32GB Module and shall be scalable, using DDR4 2666MHz DIMM (RDIMM) memory modules.",
        "Server shall have minimum 12 bays to support the SSD for the storage upgradation.",
        "The storage shall be enough to store the image and transaction data for a period of 5 years, in case the storage is required to be extended, the same shall be done by system integrator with any additional cost implication to the client.",
        "SSD: hot swap disks of latest available speed; capacity shall be based on data retention of all data for a period of 5 years but not less than 10 x 1.8TB or latest available",
        "One optical drive DVD-RW shall be provided in each server.",
        "Server should have RAID controller with 4GB Lithium-ion battery backed write cache (onboard or in a PCI Express slot). The System Integrator shall configure the RAID-05 storage as per the requirement.",
        "Server should support 3x10Gb port network adaptor supporting advanced features and 10Gb 1-port with loaded dual SFP+.",
        "Server shall have Dual 16GB single port PCIe Fibre Channel Host Bus Adapter with Optical Module and Minimum 6 PCIe Gen 3.0 x4 Slots",
        "The power supply shall be Redundant 1500W Platinum hot plug and redundant hot-plug system fans.",
        "The display controller should support VGA,HDMI and DPI.",
        "The server should be provided along with the out-of-band remote management and maintenance capability. Remote management should be possible by using API and Web based GUI.",
        "The server should be supplied with Microsoft Windows Server OS latest version. It should support all industry software for Servers.",
        "The Server should include Trusted Platform Module.",
        "MTTR should be less than 8 Hours for a server",
        "MTBF 1,00,000 Hrs is required for a server.",
        "1.4.2\tWorkstations at Plaza",
        "Contractor shall provide the workstations as listed in the BoQ. The workstations shall be the same model and shall have the same configurations.",
        "All workstations shall comply with the specifications mentioned hereunder:",
        "1.4.3\t84 Inch LED for CCTV Viewing:",
        "Two (2) CCTV display screens shall be provided at each plaza to be installed in control room. The system integrator shall provide all the mounting accessories or stand as required. All the input cables, display cables, power cables shall be provided by the system integrator along with the displays. The display shall have following specifications:",
        "1.4.4\tCurrency Counting Machine:",
        "Currency Counting shall be supplied for cashier room with below specifications:",
        "1.4.5\tLaser A4 Printer",
        "The Black Laser Jet A4 printer shall be a high-speed laser printer. A floor stand that accommodates printer paper shall be provided together with the printer. The printer is connected to the workstations.",
        "1.4.6\tIntercom Master Communication Unit (IP based)",
        "The master communication unit MCU is a master communication system to control communication between the booths at the lanes and the supervisor at the Fee Plaza building. The unit will be located in the control room and controlled by auditor/supervisor.",
        "Specifications",
        "1.4.7\tPTZ Camera",
        "Two (2) PTZ cameras per direction shall be installed before and after the plaza. System integrator shall provide the complete setup of PTZ including pole, network switch, ofc connectivity and associated civil work. The PTZ camera shall be configured to record in the NVR and integrated with Joystick installed in the control room.",
        "A PTZ camera of 4MP at 25 FPS and 2MP at 50 FPS shall be provided. The IP camera PTZ type with inbuild IR of 300 meters with illumination at 0.01 lux for colour image and black& white at 0 lux with IR. The lens shall be of 5-200 mm 40X Optical zoom with true WDR (120 dB), 3D DNR, BLC, HLC, Defog, AGC and Triple simultaneous streaming. The Camera shall have inbuild SD card slot and shall be provided with at least 128 GB class 10 SD card. The shutter speed of the camera shall be 1/3 second to 1/100000 seconds for capturing the motion detection even during low light condition and provide proper image. The housing shall be IP 67 & NEMA-4X rated with IK10 protection against vandalism. The camera shall support one alarm I/O port and audio I/O. The Camera shall have applicable CE, UL 62368-1, IEC 62368-1 certifications.",
        "Whenever any event is triggered, the camera shall record the event on SD card and should have the option to send the snapshot on any FTP Server & on any e-Mail.",
        "ONVIF (S, G & T) Supports.",
        "Compression H.265 & MJPEG",
        "Video Bit rate 128 kbps ~ 8 Mbps",
        "Protocol support: TCP/IP, UDP, HTTP, HTTPS, SNMP, 802.1X, FTP, IPv4, IPv6, RTSP, SMTP, UPnP.",
        "Rotating angle: 360 degrees endless with pre-set pan and tilt speed of minimum 200 degrees per second faster.",
        "The following control functions shall be provided to the system to cover wider area and longer distance:",
        "1) Pan (right – left)",
        "2) Tilt (up – down)",
        "3) Zoom (wide – telescope)",
        "4) Focus (near – far)",
        "5) Wiper (on – off)",
        "1.4.8\tPlaza Building CCTV Camera (Bullet Type)",
        "The Plaza Building Security CCTV cameras shall be intended for monitoring of the operation in booth and building security areas such as the plaza compound, reception, security garage, plaza manager room, staff room, Control Room, Change of Shift Room and Cash Counting Room, vault room, Lobby, Hallway, staircase, Electrical room, DG area, maintenance room, parking area, etc. Different types of cameras shall be used for better and effective monitoring of complete plaza campus",
        "A camera of 2MP at 25 FPS shall be provided. The IP camera shall be POE powered bullet type with inbuild IR of 30 meters with illumination at 0.01 lux for colour image and black& white at 0 lux with IR. The lens shall be of 2.7-13.5 mm motorized varifocal with true WDR (120 dB), 3D DNR, BLC, HLC, Defog, AGC and Triple simultaneous streaming.",
        "The Camera shall have inbuild SD card slot and shall be provided with at least 128 GB class 10 SD card.",
        "The shutter speed of the camera shall be 1/3 second to 1/100000 seconds for capturing the motion detection even during low light condition and provide proper image. The housing shall be IP 67 rated with IK10 protection against vandalism. The Camera shall have applicable CE, UL 62368-1, IEC 62368-1 and BIS certifications.",
        "The camera shall support one alarm I/O port and audio I/O with Built-in Mic for voice recording.",
        "The camera shall also detect any motion, intrusion, line crossing and tampering.",
        "Whenever any event is triggered, the camera shall record the event on SD card.",
        "ONVIF (S, G & T) Supports.",
        "Compression: H.265.",
        "Video Bit rate 128 kbps ~ 6 Mbps",
        "Minimum Protocol support: TCP/IP, UDP, HTTP, FTP, IPv4, RTSP, UPnP.",
        "1.4.9\tUSB Joystick for PTZ",
        "USB Joystick shall be installed in the Plaza control room to operate all PTZ cameras using single Joystick. The Joystick shall comply with the following specifications:",
        "1.4.10\tNetwork Patch Panel",
        "Network Patch panel shall be installed in the Rack to manage all the network ports in server room.",
        "1.4.11\tServer Rack",
        "The maximum dimension of the rack should be 600W X 42U X 1000D (mm)",
        "1.4.12\tKVM Switch",
        "The KVM Switch shall be installed in the server racks to manage all server, controller or any other system installed in server rack. The KVS should comply the following minimum requirements:",
        "1.4.13\tInternet Router",
        "The Internet router shall Supports GPON and EPON Optical Networks;",
        "FXS port to connect Landline Phones for VoIP calls;",
        "2 LAN Ports 10/100/1000 for fast Ethernet",
        "Control Method: Application",
        "Compliant with IEEE802.11b/g/n/ac",
        "2×10/100/1000Mbps auto adaptive Ethernet interface,",
        "OFC connection for incoming internet",
        "1.4.14\t24 Port Managed Network Switch (L3)",
        "This device shall have the capability to provide adequate continuous power to each PoE equipment to meet the required performance, quality and reliability requirements.",
        "Switch shall be Layer-3, manageable with 24 nos. 10/100/1000 Base-T ports and additional 4 numbers of SFP uplink ports loaded with MMF Modules with dedicated stacking ports.",
        "Shall have be IP30 rated and shall work on up to 60°C temp in a sealed enclosure and should be DIN Rail mountable.",
        "Shall have throughput of upto 214 Mbps and routing/ switching capacity of 288 Gbps.",
        "Switch shall be IEC 60068-2-6, IEC 60068-2-27, IEC 60068-2-47, IEC 60068-2-64, IEC 61000-4-5 and NEMA TS-2 compliant.",
        "Switch should support port security, DHCP snooping, Dynamic ARP inspection, IP",
        "Source guard, BPDU Guard, spanning tree root guard.",
        "Switch should be IPv6 Certified/IPv6 logo ready, and Switch / Switch’s Operating",
        "System should be tested and certified or in process of certification for EAL 2/NDPP",
        "or above under Common Criteria Certification.",
        "Switch should have 1:1 redundant internal power supply. Power supply modules,",
        "fan modules and transceivers modules should be hot swappable.",
        "Should support IEEE Standards of Ethernet: IEEE 802.1D, 802.1s, 802.1w, 802.1x,",
        "802.3ad, 802.3x, 802.1p, 802.1Q, 802.3, 802.3u, 802.3ab, 802.3z, 802.3az.",
        "Switch shall have minimum 24 nos. 10/100/1000 Base-T ports and additional 4 nos.",
        "SFP uplink ports loaded with MMF modules with dedicated stacking ports",
        "Switch shall have wire rate performance and 128 Gbps of dedicated stacking bandwidth.",
        "1.4.15\tNetwork Video Recorder",
        "The NVR shall be installed in the control room or server room of plaza. All the cameras installed in the plaza, lane and booth shall be configured to record on the NVR. System integrator shall provide the NVR along all accessories including all USB and Display cables. The display of NVR shall be installed on the control room.",
        "The NVR shall be supplied for plaza camera recording with following specifications:",
        "1.4.16\tFirewall",
        "Firewall Minimum specifications shall be as mentioned hereunder:",
        "1.4.17\t2 TB HDD for Backup",
        "The two hard disks for each plaza shall be provided with following specifications:",
        "2 TB Hard Disk Drive",
        "Compatible With: Laptops | Desktops",
        "Form Factor: HDD",
        "Automatic Backup",
        "Password Protection",
        "1.4.18\tNetwork Monitoring System (NMS)",
        "The Network Monitoring System shall be, commercially off the shelf (COTS) to monitor all the network devices installed on the plaza.",
        "NMS shall be integrated with devices using the SNMP protocols to collect the health parameters of devices.",
        "NMS shall collect the following minimum health parameters from the mentioned network devices:",
        "NMS shall be provided with a web based user interface. The NMS shall be configured on a public IP and domain name for remote monitoring. The NMS user interface shall have the following minimum features:",
        "Dashboard to display devices status and health information of all plaza devices. The dashboard shall have configurable widgets. The elements of dashboard shall be moveable, resizable. The date, time and devices-based filter shall be available on the dashboard.",
        "Device Management: The NMS user interface shall be provided with the feature to add/remove/modify the devices. It shall automatically discover the network devices based on the pre-configuration.",
        "Network Map: It shall be possible to design the map on fixed background image or GIS based map in the background. The device shall be presented on map along with status indication in different colours.",
        "Fault Management: The devices shall have screen to manage the faults and down time on the single screen. The fault report should be able to export.",
        "SLA report: The NMS shall have option to define the SLA for components and SLA reports shall be available to view on the screen.",
        "Alert: The system shall generate the sound, visual and email alerts of fault occurrence and closure.",
        "Downtime report: The device shall calculate the downtime report automatically based on the device connectivity status. The report shall be available to access on user interface.",
        "1.4.19\tHelpdesk and Inventory Management System",
        "The Helpdesk and Inventory system shall be supplied on third party COTS model to maintain the fault log and inventory report of toll plaza.",
        "The system shall be web-based application and should run on the public IP and domain name. The application should have secure access provided to designated staff only.",
        "The system shall allow to raise the ticket and assign to the dedicated staff.",
        "There shall be dashboard for ticketing showing clearly the pending tickets, closed ticker, parked tickets etc.",
        "The list of all faults should be able to export on the web console user interface.",
        "Stock Management shall keep the record of all devices along with serial number and relevant details.",
        "There should be dedicated dashboard view for all stocks of the toll plaza. It shall be possible to update the status of device as “Working”, “Faulty”, “Sent for Repairing” etc.",
        "The system should keep a track of all items which are functional or faulty.",
        "It shall be possible to keep the track of item stock movement from one location to another.",
        "System should generate the reports of inventory as per the requirements.",
        "1.4.20\t10 KVA UPS",
        "The technical specifications for 10 KVA online UPS are as follows. The Contractor shall ensure that the battery bank supplied shall be sufficient to provide minimum 4 hours of backup.",
        "1.4.21\tPA System for Toll Plaza",
        "The PA system shall be supplied with two speakers installed on the lane. The PA system controller shall be installed in the control room. The speaker shall have a built-in 100V transformer with easily selectable power taps/impedance by changing the position of the rotary switch at the rear. The speaker of PA system shall meet IP 66 and should be for outdoor use. The PA system speaker should meet the standard Meets EN 60529. The Controller of System shall be capable to cater the load of minimum 2 speaker at a time and it shall be possible to announce either in one speaker or both speaker at same time as per the requirement. It shall be possible to play pre-recorded message and play the USB stored content using PA system.",
        "1.4.22\tInternet Connections",
        "Two Redundant Connections from different ISPs,",
        "Redundant configuration in firewall",
        "Primary Connection: 30 MBPS Leased Line",
        "Secondary Connection: 10 MBPS Leased Line",
        "The connection should be configured in order to switch automatically when either connection is down.",
        "Static Public IP: 05 Nos from each ISP",
        "The setup, repairing and recurring cost including all charges (i.e service rental etc) of ISP for entire contract period shall be under the scope of System Integrator.",
        "1.4.23\tServo Stabilizer",
        "The Servo stabilizer at plaza building shall be supplied with following specifications:",
        "1.4.24\tAccess Control System",
        "The Access control system shall be installed in each plaza along with controller. The access control system shall have smart card based door lock/unlock units. The system integrator shall access card controller of plaza, access management software, door locking system (minimum 6 per plaza), inside unlock button, smart card reader and all relevant accessories & cables. The access control system shall meet the following requirements:",
        "1.4.25\tLane Status Display Unit (LSDU)",
        "The LSDU system shall provide a graphic display to the toll lane status and allow individual and global control of toll lane peripherals and toll collector functions. LSDU shall function independently even when the TMS server is unavailable.",
        "LSDU has no menu. LSDU functions are accessed through clicking on desired area for ease of operation.",
        "In the event of TMS server failure, the LSDU shall keep a copy of all records received from lanes, locally and as soon as the server goes online, it shall transfer these records to TMS.",
        "In Addition to above, LSDU shall also have the status of Tag related required file synchronization status with Acquirer bank.",
        "Intelligent Transport System (ITS)"
      ]
    },
    {
      "title": "2.1\tAdvanced Traffic Management System (ATMS)",
      "content": [
        "The ATMS to be implemented on this expressway comprises of following components:",
        "Traffic Management Camera System (TMCS)",
        "(ii) \tAutomatic Video Incident Detection System (AVIDS)",
        "(iii)\tVehicle Actuated Speed Display (VASD)",
        "(iv)\tVariable Message Sign (VMS)",
        "(v)\tAutomatic Traffic Counter & Classifier (ATCC)",
        "(vi)\tNetwork / Communication Infrastructure",
        "(vii)\tATMS Control Centre"
      ]
    },
    {
      "title": "Hardware Design Requirements:",
      "content": [
        "The ATMS includes the Hardware comprises of roadside devices and ATMS control center equipment. All the roadside devices shall include the installation of Poles, gantries, enclosure for the setup. The below mentioned section includes the hardware design requirements:",
        "Mechanical & Housing Requirements Non-Ground Mounted Equipment:",
        "ATMS equipment not contained in a ground mounted equipment enclosure will have specific housing requirements depending on location, weather conditions and vibration from road vehicles.",
        "The housing shall be structurally rigid. Mounting accessories such as nuts, bolts,   studs,  locks, washers etc. shall  be of corrosion resistant stainless /mild steel, IP65 or better. The whole assembly shall withstand vehicular fumes without degradation for its entire service life.",
        "Housing shall secure the housed equipment, from tampering and theft. Meansshallbeprovidedtoraiseanalarminthecontrolroomincaseoftampering.",
        "2.1.1.2\tGround mounted enclosures and mounting arrangements",
        "The ground mounted enclosure shall house telecommunications equipment, power and other related equipment necessary for the operation of ATMS equipment.",
        "The ground mounted enclosure shall be weather resistant and conform to ingress rating of IP65, as a minimum.",
        "The enclosure shall include a secure locking mechanism to make it tamper-proof. Further there shall be a provision to generate automatically an electronic signal on any attempted tampering that can be used to generate an audio-visual alarm at the control centre.",
        "Each enclosure door shall be equipped with an adjustable doorstop to hold the door open.",
        "All Internal connectors, components and wire terminations installed in the enclosure shall be labeled in accordance with the design drawings",
        "The ground mounted enclosure shall include an LED lighting fixture, minimum rating 5 watts, complete with lens or shield and high-efficiency LED lamp driver.",
        "Ground mounted enclosures shall be mounted on a concrete foundation of the concrete. A cabinet riser shall be included when the cabinet is located below grade to protect against water incursion.",
        "The foundation and the foundation bolts for Ground mounted enclosures, tilt and fixed poles etc. shall be fabricated using a suitable (site specific grade of steel) material. The assembly shall be galvanized to a minimum coating thickness of 100 microns.",
        "Galvanized Nuts, locknuts, locking pins washers etc. shall be supplied as a part of the foundation.",
        "Fixing templates with a placement accuracy of at least +/- 1mm shall be provided to allow for the correct orientation and installation of the steel foundation on to the concrete base.",
        "Poles",
        "The poles shall be designed to offer a stable platform for the imaging equipment to operate. Each pole and its associated hardware shall be fabricated using material appropriate for its installation site.",
        "Nominal mounting height shall be 12 meters. However, some situations may warrant different heights.",
        "Tilt/ Cantilever Pole /Inverted-L types Gantry for Compact VMS",
        "Poles shall incorporate a mid-hinge tilt arrangement with a suitable counter weight to ensure a balanced tilt. The structural design shall conform to relevant standards and   shall be certified by a statutory authority for structural integrity and maximum allowable vibration (typically caused by wind forces and other external stimuli) to ensure a stable image at full optical zoom of the camera mounted on it.",
        "The design shall be tapering gradually over the whole length with the minimum cross section at the top.",
        "An access door at the bottom of the pole shall be provided at a typical height of 0.5 meters from the base for the termination panel. The typical door dimensions shall be 125mm wide by 500 mm high or suitable size as required.",
        "The assembly shall be of stainless steel/ galvanized /Enamel Painted/ powder-coated to an appropriate minimum coating thickness.",
        "Deflection due to wind shall not exceed 0.1 degrees at a wind speed of at least 28m/s with the equipment mounted on the pole.",
        "Suitably sized powder coated terminal box and terminal block assembly shall be provided and be treated as a part of the fixed pole.",
        "An inverted L-type gantry, or cantilever gantry, comprises a single vertical support and a horizontal beam, creating an 'L' configuration. These gantries are to be used for Compact VMS systems (L-type). The cantilever gantry shall comply with the necessary safety and structural strength criteria for VMS installation. A walkway with a minimum width of 600mm along with guard-rails is required to facilitate maintenance of the installed components.",
        "Fixed Pole",
        "Fixed poles shall  be used to mount the:",
        "TMCS/PTZ Cameras",
        "Flashing Lights for AVIDS.",
        "Fixed pole cross section shall either be circular with a typical  outer diameter of 150   mm or square cross section.",
        "The joint(s) shall be seam welded.",
        "The fully fabricated pole column shall be of stainless steel/ galvanized /Enamel Painted/ powder-coated to an appropriate minimum coating thickness.",
        "The thickness of PTZ pole shall be minimum 4 MM and conforming the wind and vibration resistance as mentioned in the functional requirements.",
        "The poles shall incorporate suitably designed holes on the sides to allow for electrical cables to enter or exit the pole undamaged.",
        "The bottom portion of the pole shall be treated for corrosion resistance in accordance to the installation site.",
        "The structural steel and design shall conform to relevant standards and shall be certified by a statutory authority for structural integrity and maximum allowable vibration (typically caused by Wind forces and other external stimuli) to ensure a stable image at full optical zoom of the camera mounted on it.",
        "Deflection due to wind shall not exceed 0.1 degrees at a wind speed of atleast 28 m/s with the equipment mounted on the pole.",
        "Gantry for AVIDS: Inverted ‘U’ Type along with walkway",
        "The gantry shall consist of two vertical support and a single horizontal beam connecting them, forming an \"inverted U\" shape.",
        "The design shall provide stability and suitability for the AVIDS equipment.",
        "The Inverted-U type gantry shall for each side of road and used for the AVIDS installation.",
        "The Gantry shall have the enough strength to hold the AVIDS Overview cameras, ANPR Cameras, Solar Panels, enclosure and any other required accessories of components to be installed on the gantry. The Gantry must have inner path to pass the required cables.",
        "The VIDES gantry shall have the overhead walkway (along with guard rails) of minimum width of 800 MM.",
        "The structural design shall conform to relevant standards and shall be certified by a statutory authority for structural integrity and maximum allowable vibration.",
        "The Gantry shall be of stainless steel/ galvanized /Enamel Painted/ powder-coated to an appropriate minimum coating thickness.",
        "Gantry for VASD: Inverted ‘U’ Type  or ‘M’ type",
        "The gantry shall consist of two vertical support and a single horizontal beam connecting them, forming an \"inverted U\" shape. The Gantry shall have round or square columns for the structure.",
        "The design shall provide stability and suitability for the VASD display and radar equipment.",
        "The Inverted-U type gantry shall for each side of road and used for the VASD installation. In case of two gantries are at the same location, contractor may merge both gantries as “M” type gantry.",
        "The Gantry shall have the enough strength to hold the displays, Solar Panels, enclosure and any other required accessories of components to be installed on the gantry. The Gantry must have inner path to pass the required cables.",
        "The structural design shall conform to relevant standards and shall be certified by a statutory authority for structural integrity and maximum allowable vibration.",
        "The Gantry shall be of stainless steel/galvanized /Enamel Painted/powder-coated to an appropriate minimum coating thickness.",
        "Gantry for M-type VMS: Inverted ‘U’ Type  or ‘M’ type along with walkway",
        "The gantry will consist of two vertical supports and a single horizontal beam connecting them, forming an \"inverted U\" shape. If Variable Message Signs (VMS) are required to be installed on both sides of the road at the same location, an 'M' type structure may be used.",
        "The design shall provide stability and suitability for the M-type VMS considering the strength and stability. The Gantry strength should support the installation of VMS, Solar Panels, enclosure and any other required accessories of components to be installed on the gantry. The Gantry must have inner path to pass the required cables.",
        "The VIDES gantry shall have the overhead walkway (along with guard rails) of minimum width of 800 MM.",
        "The structural design shall conform to relevant standards and shall be certified by a statutory authority for structural integrity and maximum allowable vibration.",
        "The Gantry shall be of stainless steel/galvanized /Enamel Painted/powder-coated to an appropriate minimum coating thickness."
      ]
    },
    {
      "title": "FUNCTIONAL REQUIREMENTS OF ATMS",
      "content": []
    },
    {
      "title": "3.1\tTraffic Monitor Camera System (TMCS)",
      "content": [
        "Traffic Monitoring Control System (TMCS) cameras shall enhance traffic management and road safety. These PTZ cameras capture real-time video footage at 360-degree rotatable view and zoomed up to 500 Meter, enabling the remote monitoring of traffic flow and incident/ accident detection.",
        "While primary usage will be manual surveillance, TMCS cameras shall have basic intelligence for “Accident Detection” and “Stalled Vehicles Detection”."
      ]
    },
    {
      "title": "Automatic Video Incident Detection Systems (AVIDS)",
      "content": [
        "The primary objective of these systems is to not only detect accidents and incidents that may lead to accidents but also issue warnings to incoming traffic. The scope of the system includes the following major functionalities:"
      ]
    },
    {
      "title": "Detection of accidents/incidents:",
      "content": [
        "The system should be capable of detecting accidents and incidents that have the potential to cause accidents.",
        "Incidents/Accidents so detected shall have the following uses:",
        "It should capture evidence discouraging such unsafe behavior.",
        "Immediate relay of information to associated Variable Message Signs (VMS) Flashing Lights, and the MoWT app to warn incoming drivers.",
        "Pop-up video feeds at the command centre and therefore allow quick dispatch of emergency response vehicles for resolution"
      ]
    },
    {
      "title": "3.2.2\tAutomatic Traffic Counting & Classification: The system should have the ability to automatically count and classify traffic, providing valuable data for traffic management purposes.",
      "content": [
        "Overview camera(s) to cover all lanes in each direction.",
        "The AVIDS system shall include Gantry mounted ANPR Camera(s) and Overview Camera sufficient in numbers to cover all the lanes including shoulder portion on each side of Highway. While choosing the location of a AVIDS, it should be made to coincide with highway locations such as vulnerable merger points of Service road with the main carriageway, blind corners / turns on the main carriageway, road junctions, over-speeding and incident prone areas. The setup should be on main-carriageway and looking towards incoming traffic and accident prone areas."
      ]
    },
    {
      "title": "Functional Requirements of AVIDS:",
      "content": []
    },
    {
      "title": "Type of Incidents:",
      "content": [
        "The AVIDS (combination of ANPR and Overview) cameras will work in tandem to cover the incidents and enforcements listed below:"
      ]
    },
    {
      "title": "Vehicle Actuated Speed Display",
      "content": [
        "This specification lays down the general, functional and technical requirement of the radar-based Vehicle Actuated Speed Display to be used as a sub-system of ATMS implementation. The VASD system shall include gantry mounted Radar and Speed Display system to warn the road users. These speed displays shall be installed to warn road users of over speeding and thereby acting as a deterrent. VASD in itself will not include any enforcement mechanisms other than showing users their speed and whether it is beyond limit or within limit."
      ]
    },
    {
      "title": "Variable Message Sign (VMS)",
      "content": [
        "The Variable Message Signs (VMS) shall be installed at the designated locations. The VMS shall be used for providing advance travelers information and highway condition to the users and shall be controlled by the ATMS Control Centre.",
        "VMS is one of the important and effective electronic tools to manage traffic in response to road incidents, special events, travel warning, congested situation, travel time, accidents, road work, lane restrictions, and construction or maintenance activities on the highway.",
        "There are two typesof VMS:",
        "Type 1 – Fixed VMS:",
        "Full VMS may be mounted on Inverted U or M shapedgantry structures",
        "Compact VMS: Compact VMS may be mounted on L-shaped gantry / cantilever structure.",
        "Type 2 – Portable VMS or trolley VMS"
      ]
    },
    {
      "title": "3.5\tOptical Fiber Cable (OFC) based Digital Communication System",
      "content": [
        "The System Integrator shall be responsible for setup of the Digital Communication System throughout the road stretch, underpass, service roads, entry/exit ramps and all other facilities of Road stretch wherever ATMS surveillance, incident detection or any other ATMS functionality is required to be deployed."
      ]
    },
    {
      "title": "4\tTECHNICAL SPECIFICATION OF ATMS",
      "content": []
    },
    {
      "title": "4.1\tTechnical Specifications of TMCS",
      "content": []
    },
    {
      "title": "4.2\tTechnical Specifications of AVIDS",
      "content": []
    },
    {
      "title": "4.3\tTechnical Specification of VASD",
      "content": []
    },
    {
      "title": "4.4\tTechnical Specifications of VMS",
      "content": []
    },
    {
      "title": "4.5\tTechnical Specification for OFC based digital Communication System",
      "content": []
    },
    {
      "title": "4.6\tTechnical Specification of Control Room Equipment",
      "content": [
        "*** END OF DOCUMENT ***"
      ]
    }
  ],
  "KEE_TRAFFIC DATA.docx": [
    {
      "title": "General",
      "content": [
        "KEE TRAFFIC DATA",
        "The table shows the total number of vehicles that used the expressway for each of the four vehicle classes namely.",
        "Class 1\tMotorcycles",
        "Class 2\tLight Vehicles",
        "Class 3\tMedium Goods Vehicles (2 or 3 axles)",
        "Class 4A\tLarge Goods Vehicles and Buses (4 or 5 axles)",
        "Class 4B\tLarge Goods Vehicles (6 or more axles)",
        "NC (Not Classified) refers to vehicles that were recorded as violations in the system",
        "The data presented is from project inception to Apr-26",
        "AVERAGE DAILY TRAFFIC",
        "The average daily traffic for each month from January 2022 to April 2026 is shown below. The average daily traffic realised in the month of April 2026 was 26,154 vehicles per day with a 5.60% increase as compared to the month of March 2026.",
        "Table 2: ADT from Jan 22 to April-26"
      ]
    },
    {
      "title": "Traffic Data - Table_1",
      "content": [
        "<table class='traffic-table' style='width:100%; border-collapse:collapse; margin-top:1rem; font-size:0.9rem; color:#e2e8f0;'><thead><tr style='background:rgba(255,255,255,0.1); border-bottom:1px solid rgba(255,255,255,0.2);'><th style='padding:8px; text-align:left;'>Month</th><th style='padding:8px; text-align:left;'>NC</th><th style='padding:8px; text-align:left;'>1</th><th style='padding:8px; text-align:left;'>2</th><th style='padding:8px; text-align:left;'>3</th><th style='padding:8px; text-align:left;'>4A</th><th style='padding:8px; text-align:left;'>4B</th><th style='padding:8px; text-align:left;'>TOTAL</th><th style='padding:8px; text-align:left;'>Percentage Difference</th></tr></thead><tbody><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Jan-22</td><td style='padding:8px;'>41</td><td style='padding:8px;'>31</td><td style='padding:8px;'>19,145</td><td style='padding:8px;'>819</td><td style='padding:8px;'>50</td><td style='padding:8px;'>24</td><td style='padding:8px;'>20,110</td><td style='padding:8px;'>Percentage Difference</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Feb-22</td><td style='padding:8px;'>58</td><td style='padding:8px;'>25</td><td style='padding:8px;'>19,473</td><td style='padding:8px;'>851</td><td style='padding:8px;'>75</td><td style='padding:8px;'>28</td><td style='padding:8px;'>20,509</td><td style='padding:8px;'>+2%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Mar-22</td><td style='padding:8px;'>89</td><td style='padding:8px;'>26</td><td style='padding:8px;'>21,135</td><td style='padding:8px;'>978</td><td style='padding:8px;'>80</td><td style='padding:8px;'>27</td><td style='padding:8px;'>22,335</td><td style='padding:8px;'>+8%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Apr-22</td><td style='padding:8px;'>17</td><td style='padding:8px;'>25</td><td style='padding:8px;'>20,456</td><td style='padding:8px;'>905</td><td style='padding:8px;'>83</td><td style='padding:8px;'>28</td><td style='padding:8px;'>21,514</td><td style='padding:8px;'>-4%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>May-22</td><td style='padding:8px;'>5</td><td style='padding:8px;'>29</td><td style='padding:8px;'>21,266</td><td style='padding:8px;'>934</td><td style='padding:8px;'>79</td><td style='padding:8px;'>33</td><td style='padding:8px;'>22,346</td><td style='padding:8px;'>+4%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Jun-22</td><td style='padding:8px;'>10</td><td style='padding:8px;'>27</td><td style='padding:8px;'>19,943</td><td style='padding:8px;'>1,008</td><td style='padding:8px;'>82</td><td style='padding:8px;'>34</td><td style='padding:8px;'>21,103</td><td style='padding:8px;'>-6%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Jul-22</td><td style='padding:8px;'>77</td><td style='padding:8px;'>27</td><td style='padding:8px;'>20,549</td><td style='padding:8px;'>1,100</td><td style='padding:8px;'>85</td><td style='padding:8px;'>41</td><td style='padding:8px;'>21,879</td><td style='padding:8px;'>+4%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Aug-22</td><td style='padding:8px;'>10</td><td style='padding:8px;'>27</td><td style='padding:8px;'>20,209</td><td style='padding:8px;'>862</td><td style='padding:8px;'>98</td><td style='padding:8px;'>47</td><td style='padding:8px;'>21,252</td><td style='padding:8px;'>-3%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Sep-22</td><td style='padding:8px;'>12</td><td style='padding:8px;'>20</td><td style='padding:8px;'>19,149</td><td style='padding:8px;'>774</td><td style='padding:8px;'>65</td><td style='padding:8px;'>38</td><td style='padding:8px;'>20,059</td><td style='padding:8px;'>-6%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Oct-22</td><td style='padding:8px;'>8</td><td style='padding:8px;'>26</td><td style='padding:8px;'>20,343</td><td style='padding:8px;'>1097</td><td style='padding:8px;'>89</td><td style='padding:8px;'>44</td><td style='padding:8px;'>21,607</td><td style='padding:8px;'>+7%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Nov-22</td><td style='padding:8px;'>8</td><td style='padding:8px;'>19</td><td style='padding:8px;'>18,751</td><td style='padding:8px;'>818</td><td style='padding:8px;'>109</td><td style='padding:8px;'>35</td><td style='padding:8px;'>19,740</td><td style='padding:8px;'>-9%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Dec-22</td><td style='padding:8px;'>11</td><td style='padding:8px;'>23</td><td style='padding:8px;'>21,172</td><td style='padding:8px;'>879</td><td style='padding:8px;'>111</td><td style='padding:8px;'>32</td><td style='padding:8px;'>22,229</td><td style='padding:8px;'>+11%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Jan-23</td><td style='padding:8px;'>9</td><td style='padding:8px;'>33</td><td style='padding:8px;'>21,941</td><td style='padding:8px;'>827</td><td style='padding:8px;'>3,034</td><td style='padding:8px;'>98</td><td style='padding:8px;'>22,937</td><td style='padding:8px;'>+3%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Feb-23</td><td style='padding:8px;'>7</td><td style='padding:8px;'>25</td><td style='padding:8px;'>22,518</td><td style='padding:8px;'>897</td><td style='padding:8px;'>100</td><td style='padding:8px;'>33</td><td style='padding:8px;'>23,580</td><td style='padding:8px;'>+3%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Mar-23</td><td style='padding:8px;'>25</td><td style='padding:8px;'>19</td><td style='padding:8px;'>21,637</td><td style='padding:8px;'>972</td><td style='padding:8px;'>117</td><td style='padding:8px;'>35</td><td style='padding:8px;'>22,805</td><td style='padding:8px;'>-3%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Apr-23</td><td style='padding:8px;'>8</td><td style='padding:8px;'>19</td><td style='padding:8px;'>21,114</td><td style='padding:8px;'>913</td><td style='padding:8px;'>119</td><td style='padding:8px;'>33</td><td style='padding:8px;'>22,307</td><td style='padding:8px;'>-2%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>May-23</td><td style='padding:8px;'>6</td><td style='padding:8px;'>26</td><td style='padding:8px;'>22,431</td><td style='padding:8px;'>951</td><td style='padding:8px;'>139</td><td style='padding:8px;'>39</td><td style='padding:8px;'>23,593</td><td style='padding:8px;'>+5%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>June-23</td><td style='padding:8px;'>5</td><td style='padding:8px;'>22</td><td style='padding:8px;'>21,949</td><td style='padding:8px;'>1,014</td><td style='padding:8px;'>133</td><td style='padding:8px;'>42</td><td style='padding:8px;'>23,164</td><td style='padding:8px;'>-2%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>July-23</td><td style='padding:8px;'>7</td><td style='padding:8px;'>22</td><td style='padding:8px;'>23,616</td><td style='padding:8px;'>1,309</td><td style='padding:8px;'>141</td><td style='padding:8px;'>53</td><td style='padding:8px;'>25,144</td><td style='padding:8px;'>+8%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Aug-23</td><td style='padding:8px;'>5</td><td style='padding:8px;'>20</td><td style='padding:8px;'>23,683</td><td style='padding:8px;'>1,171</td><td style='padding:8px;'>150</td><td style='padding:8px;'>54</td><td style='padding:8px;'>25,084</td><td style='padding:8px;'>-0.24%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Sept-23</td><td style='padding:8px;'>6</td><td style='padding:8px;'>23</td><td style='padding:8px;'>23,686</td><td style='padding:8px;'>1,019</td><td style='padding:8px;'>132</td><td style='padding:8px;'>47</td><td style='padding:8px;'>24,194</td><td style='padding:8px;'>-4%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Oct-23</td><td style='padding:8px;'>4</td><td style='padding:8px;'>26</td><td style='padding:8px;'>22,463</td><td style='padding:8px;'>1,090</td><td style='padding:8px;'>158</td><td style='padding:8px;'>41</td><td style='padding:8px;'>23,782</td><td style='padding:8px;'>-2%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Nov-23</td><td style='padding:8px;'>9</td><td style='padding:8px;'>22</td><td style='padding:8px;'>23,663</td><td style='padding:8px;'>1,115</td><td style='padding:8px;'>139</td><td style='padding:8px;'>57</td><td style='padding:8px;'>25,005</td><td style='padding:8px;'>+4.89%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Dec-23</td><td style='padding:8px;'>8</td><td style='padding:8px;'>30</td><td style='padding:8px;'>25,013</td><td style='padding:8px;'>1,179</td><td style='padding:8px;'>146</td><td style='padding:8px;'>58</td><td style='padding:8px;'>26,435</td><td style='padding:8px;'>+5.41%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Jan-24</td><td style='padding:8px;'>7</td><td style='padding:8px;'>85</td><td style='padding:8px;'>22,347</td><td style='padding:8px;'>933</td><td style='padding:8px;'>126</td><td style='padding:8px;'>42</td><td style='padding:8px;'>23,540</td><td style='padding:8px;'>-12.30%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Feb-24</td><td style='padding:8px;'>10</td><td style='padding:8px;'>29</td><td style='padding:8px;'>23,644</td><td style='padding:8px;'>1,066</td><td style='padding:8px;'>159</td><td style='padding:8px;'>46</td><td style='padding:8px;'>24,954</td><td style='padding:8px;'>+5.67</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Mar-24</td><td style='padding:8px;'>5</td><td style='padding:8px;'>34</td><td style='padding:8px;'>23,108</td><td style='padding:8px;'>1,112</td><td style='padding:8px;'>166</td><td style='padding:8px;'>44</td><td style='padding:8px;'>24,468</td><td style='padding:8px;'>-1.99%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Apr-24</td><td style='padding:8px;'>14</td><td style='padding:8px;'>29</td><td style='padding:8px;'>21,746</td><td style='padding:8px;'>1,012</td><td style='padding:8px;'>163</td><td style='padding:8px;'>45</td><td style='padding:8px;'>23,010</td><td style='padding:8px;'>-6.34%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>May-24</td><td style='padding:8px;'>7</td><td style='padding:8px;'>31</td><td style='padding:8px;'>23,254</td><td style='padding:8px;'>1,040</td><td style='padding:8px;'>178</td><td style='padding:8px;'>49</td><td style='padding:8px;'>24,559</td><td style='padding:8px;'>+6.31%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>June-24</td><td style='padding:8px;'>6</td><td style='padding:8px;'>33</td><td style='padding:8px;'>23,289</td><td style='padding:8px;'>1,153</td><td style='padding:8px;'>186</td><td style='padding:8px;'>46</td><td style='padding:8px;'>24,713</td><td style='padding:8px;'>+0.62%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>July-24</td><td style='padding:8px;'>6</td><td style='padding:8px;'>32</td><td style='padding:8px;'>24,039</td><td style='padding:8px;'>1,395</td><td style='padding:8px;'>199</td><td style='padding:8px;'>47</td><td style='padding:8px;'>25,718</td><td style='padding:8px;'>+3.91%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Aug-24</td><td style='padding:8px;'>8</td><td style='padding:8px;'>37</td><td style='padding:8px;'>25,219</td><td style='padding:8px;'>1,282</td><td style='padding:8px;'>215</td><td style='padding:8px;'>50</td><td style='padding:8px;'>26,811</td><td style='padding:8px;'>+4.08%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Sep 24</td><td style='padding:8px;'>5</td><td style='padding:8px;'>33</td><td style='padding:8px;'>24,889</td><td style='padding:8px;'>1,127</td><td style='padding:8px;'>192</td><td style='padding:8px;'>42</td><td style='padding:8px;'>26,288</td><td style='padding:8px;'>-1.99%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Oct 24</td><td style='padding:8px;'>6</td><td style='padding:8px;'>39</td><td style='padding:8px;'>24,119</td><td style='padding:8px;'>1,183</td><td style='padding:8px;'>193</td><td style='padding:8px;'>48</td><td style='padding:8px;'>25,556</td><td style='padding:8px;'>-2.86%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Nov-24</td><td style='padding:8px;'>7</td><td style='padding:8px;'>34</td><td style='padding:8px;'>24,399</td><td style='padding:8px;'>1,141</td><td style='padding:8px;'>188</td><td style='padding:8px;'>46</td><td style='padding:8px;'>25,814</td><td style='padding:8px;'>+1.00%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Dec-24</td><td style='padding:8px;'>23</td><td style='padding:8px;'>43</td><td style='padding:8px;'>26,987</td><td style='padding:8px;'>1,199</td><td style='padding:8px;'>189</td><td style='padding:8px;'>45</td><td style='padding:8px;'>28,486</td><td style='padding:8px;'>+9.38%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Jan-25</td><td style='padding:8px;'>9</td><td style='padding:8px;'>57</td><td style='padding:8px;'>25,503</td><td style='padding:8px;'>1,140</td><td style='padding:8px;'>209</td><td style='padding:8px;'>47</td><td style='padding:8px;'>26,964</td><td style='padding:8px;'>-5.84%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Feb-25</td><td style='padding:8px;'>10</td><td style='padding:8px;'>47</td><td style='padding:8px;'>23,987</td><td style='padding:8px;'>1,109</td><td style='padding:8px;'>218</td><td style='padding:8px;'>50</td><td style='padding:8px;'>25,421</td><td style='padding:8px;'>-6.07%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Mar-25</td><td style='padding:8px;'>10</td><td style='padding:8px;'>41</td><td style='padding:8px;'>23,393</td><td style='padding:8px;'>1,129</td><td style='padding:8px;'>203</td><td style='padding:8px;'>45</td><td style='padding:8px;'>24,847</td><td style='padding:8px;'>-2.31%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>April-25</td><td style='padding:8px;'>6</td><td style='padding:8px;'>37</td><td style='padding:8px;'>23,544</td><td style='padding:8px;'>1,095</td><td style='padding:8px;'>203</td><td style='padding:8px;'>44</td><td style='padding:8px;'>24,929</td><td style='padding:8px;'>+0.33%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>May-25</td><td style='padding:8px;'>6</td><td style='padding:8px;'>35</td><td style='padding:8px;'>24,356</td><td style='padding:8px;'>1,100</td><td style='padding:8px;'>216</td><td style='padding:8px;'>47</td><td style='padding:8px;'>25,760</td><td style='padding:8px;'>+3.23%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>June-25</td><td style='padding:8px;'>7</td><td style='padding:8px;'>35</td><td style='padding:8px;'>23,315</td><td style='padding:8px;'>1,147</td><td style='padding:8px;'>226</td><td style='padding:8px;'>52</td><td style='padding:8px;'>24,781</td><td style='padding:8px;'>-3.95%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>July-25</td><td style='padding:8px;'>6</td><td style='padding:8px;'>36</td><td style='padding:8px;'>25,609</td><td style='padding:8px;'>1,413</td><td style='padding:8px;'>273</td><td style='padding:8px;'>60</td><td style='padding:8px;'>27,400</td><td style='padding:8px;'>+9.56%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>August-25</td><td style='padding:8px;'>6</td><td style='padding:8px;'>42</td><td style='padding:8px;'>27,010</td><td style='padding:8px;'>1,265</td><td style='padding:8px;'>242</td><td style='padding:8px;'>67</td><td style='padding:8px;'>28,633</td><td style='padding:8px;'>+4.31%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Sept-25</td><td style='padding:8px;'>11</td><td style='padding:8px;'>38</td><td style='padding:8px;'>26,219</td><td style='padding:8px;'>1,174</td><td style='padding:8px;'>233</td><td style='padding:8px;'>63</td><td style='padding:8px;'>27,738</td><td style='padding:8px;'>-3.23%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Oct-25</td><td style='padding:8px;'>5</td><td style='padding:8px;'>37</td><td style='padding:8px;'>25,854</td><td style='padding:8px;'>1,179</td><td style='padding:8px;'>240</td><td style='padding:8px;'>63</td><td style='padding:8px;'>27,378</td><td style='padding:8px;'>-1.31%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Nov-25</td><td style='padding:8px;'>6</td><td style='padding:8px;'>40</td><td style='padding:8px;'>26,354</td><td style='padding:8px;'>1,184</td><td style='padding:8px;'>223</td><td style='padding:8px;'>62</td><td style='padding:8px;'>27,869</td><td style='padding:8px;'>+1.76%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Dec-25</td><td style='padding:8px;'>10</td><td style='padding:8px;'>49</td><td style='padding:8px;'>28,238</td><td style='padding:8px;'>1,255</td><td style='padding:8px;'>208</td><td style='padding:8px;'>70</td><td style='padding:8px;'>29,831</td><td style='padding:8px;'>+6.58%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Jan-26</td><td style='padding:8px;'>7</td><td style='padding:8px;'>44</td><td style='padding:8px;'>22851</td><td style='padding:8px;'>10162</td><td style='padding:8px;'>210</td><td style='padding:8px;'>59</td><td style='padding:8px;'>24188</td><td style='padding:8px;'>-23.33%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Feb-26</td><td style='padding:8px;'>7</td><td style='padding:8px;'>46</td><td style='padding:8px;'>25,920</td><td style='padding:8px;'>1,119</td><td style='padding:8px;'>237</td><td style='padding:8px;'>65</td><td style='padding:8px;'>27,393</td><td style='padding:8px;'>+11.70%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Mar-26</td><td style='padding:8px;'>3</td><td style='padding:8px;'>45</td><td style='padding:8px;'>23,239</td><td style='padding:8px;'>1,114</td><td style='padding:8px;'>229</td><td style='padding:8px;'>60</td><td style='padding:8px;'>24,690</td><td style='padding:8px;'>-10.95%</td></tr><tr style='border-bottom:1px solid rgba(255,255,255,0.05);'><td style='padding:8px;'>Apr-26</td><td style='padding:8px;'>4</td><td style='padding:8px;'>48</td><td style='padding:8px;'>24,667</td><td style='padding:8px;'>1,150</td><td style='padding:8px;'>227</td><td style='padding:8px;'>59</td><td style='padding:8px;'>26,154</td><td style='padding:8px;'>+5.60%</td></tr></tbody></table>"
      ]
    }
  ]
};
