export const aiResponses: Record<string, { content: string; source: string; sourceType: string }> = {
  "today's laboratory summary": {
    content: `📊 **Laboratory Summary - July 5, 2026**

**Safety & Security:**
• PPE Compliance: 84% overall (↑4% vs yesterday)
• Active PPE Violations: 14 incidents
• Restricted Area Breaches: 3 (1 critical)
• Fire/Smoke Events: 0 active

**Chemical Management:**
• Total Chemicals: 128 registered
• Active Stock: 114 chemicals in use
• Low Stock Alerts: 10 items (reorder recommended)
• Expiring Soon: 9 chemicals within 30 days
• Compliance Rate: 94.5% (3 violations active)

**Gas Cylinder Status:**
• Total Cylinders: 482 registered
• Active: 318 | Available: 124
• Low Pressure: 19 | Critical Alerts: 4
• Leak Events: 2 active (under investigation)

**Sample Tracking:**
• Active Samples: 847 tracked
• Pending Analysis: 142 samples
• Completed Today: 68 samples
• Average SLA: 94.2% on-time

**Key Actions Required:**
⚠ Replace Oxygen cylinder CY-101 (16 bar - critical)
⚠ Investigate leak alert in Lab B (CY-089)
⚠ Review PPE violations in Lab A (5 incidents today)
⚠ Reorder: Ethanol (8L remaining), IPA (18L), Nitric Acid (0.2L)

All systems operational. No critical safety incidents reported.`,
    source: 'Laboratory Management System',
    sourceType: 'Real-time Dashboard'
  },
  "how should sulfuric acid be stored": {
    content: `🧪 **Sulfuric Acid 98% - Storage Guidelines**

**Storage Class:** Corrosive Acid (Class 8)

### Storage Requirements

| Requirement | Specification |
|------------|---------------|
| **Location** | Dedicated corrosive acid storage cabinet (CAB-C-02) |
| **Cabinet Material** | Acid-resistant with secondary containment |
| **Temperature** | 15-25°C, away from heat sources |
| **Ventilation** | Adequate ventilation required, preferably in fume hood area |
| **Segregation** | Keep separate from bases, organic materials, and oxidizers |
| **Container** | Original or acid-resistant secondary container |
| **Sealing** | Tightly sealed when not in use |

### Incompatible Materials

⚠️ **Never store with:**
- Strong bases (NaOH, KOH)
- Organic solvents (acetone, ethanol)
- Oxidizing agents
- Water (exothermic reaction - always add acid to water, never reverse)

### Required PPE for Handling

| Equipment | Specification |
|-----------|---------------|
| Face Protection | Face shield (mandatory) |
| Hand Protection | Acid-resistant gloves (nitrile or neoprene) |
| Body Protection | Chemical-resistant apron + Lab coat |
| Eye Protection | Safety goggles |

### Emergency Procedures

| Emergency | Response |
|-----------|----------|
| **Spill** | Neutralize with sodium bicarbonate, contain and clean |
| **Skin Contact** | Flush with water for 15+ minutes, seek medical attention |
| **Eye Contact** | Flush with water for 15+ minutes, seek immediate medical attention |
| **Inhalation** | Move to fresh air, seek medical attention |

### Current Stock Information

| Parameter | Value |
|-----------|-------|
| Location | CAB-C-02 |
| Quantity | 20 L |
| Batch Number | SA-2026-0124 |
| Supplier | Sigma-Aldrich |
| Expiry Date | 2027-02-28 |
| Last Scanned | 2026-06-29 10:35 |
| Storage Status | ✅ COMPLIANT |

### Safety Measures Checklist

- ✅ Store in original container or acid-resistant secondary container
- ✅ Ensure containers are tightly sealed when not in use
- ✅ Label clearly with hazard warnings
- ✅ Keep spill kit and neutralizing agent nearby
- ✅ Secondary containment tray mandatory
- ✅ Regular inspection schedule maintained`,
    source: 'MSDS Database & Storage Guidelines',
    sourceType: 'Safety Document'
  },
  "show all chemicals expiring in the next 30 days": {
    content: `⏰ **Chemicals Expiring in Next 30 Days**

### Critical (< 7 days)

| Chemical ID | Name | Expiry | Days Left | Location | Quantity | Status |
|------------|------|--------|-----------|----------|----------|---------|
| CHM-013 | Hydrogen Peroxide 30% | 2025-07-15 | 10 days | CAB-A-03 | 12 L | VIOLATION |

**Action:** Immediate disposal or recertification required

---

### High Priority (7-30 days)

| Chemical ID | Name | Expiry | Days Left | Location | Quantity | Action |
|------------|------|--------|-----------|----------|----------|---------|
| CHM-006 | Methanol | 2025-12-05 | 23 days | CAB-A-04 | 28 L | Use or reorder |
| CHM-004 | Cyclohexane | 2025-09-30 | 18 days | CAB-A-15 | 20 L | Priority usage |
| CHM-001 | Benzene | 2025-08-12 | 8 days | CAB-A-12 | 25 L | Schedule for use |
| CHM-018 | Diethyl Ether | 2025-08-19 | 15 days | CAB-A-14 | 10 L | Use before expiry |
| CHM-016 | Chloroform | 2025-10-28 | 26 days | CAB-A-13 | 18 L | Warning |

---

### Medium Priority (30-60 days)

| Chemical ID | Name | Expiry | Days Left | Location | Quantity |
|------------|------|--------|-----------|----------|----------|
| CHM-007 | Ethanol 99.5% | 2026-04-18 | 42 days | CAB-A-01 | 50 L |
| CHM-002 | Toluene | 2026-03-15 | 38 days | CAB-A-08 | 40 L |
| CHM-010 | Nitric Acid 70% | 2026-06-20 | 53 days | CAB-C-05 | 15 L |

---

### Summary

| Metric | Value |
|--------|-------|
| Total expiring (30 days) | 9 chemicals |
| Critical attention | 1 (expired - immediate action) |
| High priority | 5 chemicals |
| Total volume affected | 161 L |
| Current expiry rate | 7.0% |
| Target rate | < 5% |

### Recommended Actions

1. **Immediate:** Dispose or recertify CHM-013 (H2O2)
2. **This Week:** Prioritize usage of Benzene and Diethyl Ether in ongoing projects
3. **Next Week:** Schedule reorder for Methanol and Cyclohexane
4. **Review:** Inventory consumption patterns to reduce waste

💡 **AI Suggestion:** Adjust ordering quantities based on actual usage patterns. Current expiry rate of 7.0% exceeds target of 5%. Consider implementing FIFO (First-In-First-Out) inventory management.`,
    source: 'Chemical Inventory System',
    sourceType: 'Expiry Tracker'
  },
  "safety data sheet for benzene": {
    content: `🧪 **Safety Data Sheet (SDS) - Benzene**

### Product Identification

| Field | Information |
|-------|-------------|
| **Chemical Name** | Benzene |
| **CAS Number** | 71-43-2 |
| **Molecular Formula** | C₆H₆ |
| **Molecular Weight** | 78.11 g/mol |
| **Synonyms** | Benzol, Cyclohexatriene, Phenyl hydride |
| **Product Code** | CHM-001 |
| **Supplier** | Sigma-Aldrich Corporation |
| **Emergency Phone** | +966-11-234-5678 (24/7) |

---

### Hazard Classification

⚠️ **GHS Classification:**
- **Flammability:** Category 2 (Highly Flammable Liquid)
- **Carcinogenicity:** Category 1A (Known Human Carcinogen)
- **Acute Toxicity (Inhalation):** Category 4
- **Acute Toxicity (Dermal):** Category 4
- **Germ Cell Mutagenicity:** Category 1B
- **Reproductive Toxicity:** Category 2
- **STOT Single Exposure:** Category 3 (Narcotic effects)
- **Aspiration Hazard:** Category 1

### Signal Word
🔴 **DANGER**

### Hazard Statements
- H225: Highly flammable liquid and vapor
- H304: May be fatal if swallowed and enters airways
- H315: Causes skin irritation
- H319: Causes serious eye irritation
- H340: May cause genetic defects
- H350: May cause cancer
- H361: Suspected of damaging fertility or the unborn child
- H372: Causes damage to organs through prolonged or repeated exposure

---

### First Aid Measures

| Exposure Route | First Aid Procedure |
|----------------|---------------------|
| **Inhalation** | Move to fresh air immediately. If not breathing, give artificial respiration. If breathing is difficult, give oxygen. Seek immediate medical attention. |
| **Skin Contact** | Remove contaminated clothing immediately. Wash skin with soap and large amounts of water for at least 15 minutes. Seek medical attention if irritation develops. |
| **Eye Contact** | Rinse immediately with plenty of water for at least 15 minutes, lifting eyelids occasionally. Seek immediate medical attention. |
| **Ingestion** | DO NOT induce vomiting. Never give anything by mouth to an unconscious person. Rinse mouth with water. Seek immediate medical attention. |

⚠️ **Note to Physicians:** Treat symptomatically. Due to aspiration hazard, gastric lavage should be avoided. Consider oxygen therapy if respiratory distress occurs.

---

### Fire-Fighting Measures

| Parameter | Information |
|-----------|-------------|
| **Flash Point** | -11°C (12°F) - Closed Cup |
| **Autoignition Temperature** | 498°C (928°F) |
| **Flammable Limits** | LEL: 1.2% | UEL: 7.8% (in air) |
| **Suitable Extinguishing Media** | CO₂, dry chemical powder, alcohol-resistant foam |
| **Unsuitable Media** | Water jet (may spread fire) |
| **Special Hazards** | Vapors may form explosive mixtures with air. Vapors heavier than air, may travel to ignition source. |
| **Protective Equipment** | Self-contained breathing apparatus (SCBA) and full protective gear |

---

### Handling & Storage

### Safe Handling Practices
✅ Use only in well-ventilated areas (fume hood mandatory)
✅ Keep away from heat, sparks, open flames, and hot surfaces
✅ Ground and bond containers and receiving equipment
✅ Use explosion-proof electrical equipment
✅ Avoid breathing vapors, mist, or spray
✅ Avoid contact with skin and eyes
✅ Wear appropriate personal protective equipment
✅ Wash hands thoroughly after handling
✅ Do not eat, drink, or smoke when using this product

### Storage Requirements

| Requirement | Specification |
|-------------|---------------|
| **Storage Class** | Flammable liquid, carcinogenic (Class 3, Cat 1A) |
| **Temperature** | 15-25°C in cool, dry place |
| **Ventilation** | Adequate mechanical ventilation required |
| **Container** | Store in original container. Keep tightly closed. |
| **Segregation** | Keep away from oxidizing agents, acids, bases |
| **Special Requirements** | Store in flammable liquid storage cabinet. Secondary containment mandatory. |
| **Current Location** | CAB-A-12 (Flammable Cabinet) |

---

### Exposure Controls / Personal Protection

### Occupational Exposure Limits

| Authority | TWA | STEL | Ceiling |
|-----------|-----|------|---------|
| **OSHA PEL** | 1 ppm (3.2 mg/m³) | 5 ppm | - |
| **ACGIH TLV** | 0.5 ppm | 2.5 ppm | - |
| **NIOSH REL** | 0.1 ppm | 1 ppm | - |
| **Saudi GSSEMAOH** | 0.5 ppm (1.6 mg/m³) | 2.5 ppm | - |

### Required Personal Protective Equipment (PPE)

| Equipment | Specification |
|-----------|---------------|
| **Respiratory Protection** | Use NIOSH-approved organic vapor respirator with full facepiece in high vapor concentrations. SCBA for emergency situations. |
| **Hand Protection** | Nitrile gloves (breakthrough time >480 min). Change immediately if contaminated. |
| **Eye Protection** | Chemical safety goggles + face shield |
| **Skin Protection** | Chemical-resistant lab coat, apron. Long sleeves mandatory. |
| **Foot Protection** | Closed-toe, chemical-resistant safety shoes |

---

### Physical & Chemical Properties

| Property | Value |
|----------|-------|
| **Appearance** | Clear, colorless liquid |
| **Odor** | Sweet, aromatic |
| **Odor Threshold** | 1.5-4.7 ppm |
| **pH** | Not applicable |
| **Melting Point** | 5.5°C (41.9°F) |
| **Boiling Point** | 80.1°C (176.2°F) |
| **Vapor Pressure** | 95 mmHg @ 25°C |
| **Vapor Density** | 2.77 (Air = 1) |
| **Relative Density** | 0.879 @ 20°C |
| **Solubility** | Slightly soluble in water (1.8 g/L @ 25°C) |
| **Partition Coefficient** | log Kow: 2.13 |
| **Evaporation Rate** | 2.8 (n-Butyl acetate = 1) |

---

### Stability & Reactivity

| Parameter | Information |
|-----------|-------------|
| **Chemical Stability** | Stable under normal conditions |
| **Possibility of Hazardous Reactions** | May polymerize with peroxides or strong oxidizers |
| **Conditions to Avoid** | Heat, sparks, flames, static discharge, shock, friction |
| **Incompatible Materials** | Strong oxidizing agents, halogens, nitric acid, sulfuric acid, peroxides |
| **Hazardous Decomposition** | Carbon monoxide, carbon dioxide, toxic fumes |

---

### Toxicological Information

| Effect | Information |
|--------|-------------|
| **Acute Toxicity** | LD50 Oral (Rat): 930 mg/kg | LC50 Inhalation (Rat): 13700 ppm/4h |
| **Carcinogenicity** | **IARC Group 1** (Carcinogenic to humans). Causes leukemia. |
| **Reproductive Toxicity** | May damage fertility. May harm the unborn child. |
| **Mutagenicity** | Causes genetic defects in humans. |
| **Target Organs** | Blood, bone marrow, central nervous system, liver |
| **Chronic Effects** | Prolonged exposure may cause anemia, leukemia, immune system damage |

---

### Disposal Considerations

⚠️ **Hazardous Waste Code:** D018 (EPA), HP3, HP7 (EU)

**Disposal Method:**
- Must be disposed of as hazardous waste through licensed contractor
- Incineration at approved facility with afterburner and scrubber
- DO NOT discharge into drains, water courses, or environment
- Consult local environmental regulations

**Current Stock Disposal Protocol:** Contact EHS Department (Ext. 4567) for hazardous waste pickup

---

### Regulatory Information

**Saudi Arabian Regulations:**
- Listed under Saudi GSSEMAOH Schedule of Chemical Substances
- Requires special handling permit for quantities >25L
- Subject to Royal Commission Environmental Regulations

**International Regulations:**
- EU CLP: Classification as Flam. Liq. 2, Carc. 1A, Muta. 1B
- US EPA: Listed as Hazardous Air Pollutant (Clean Air Act)
- OSHA: Regulated carcinogen (29 CFR 1910.1028)

---

### Current Stock Information

| Parameter | Value |
|-----------|-------|
| **Location** | CAB-A-12 (Flammable Cabinet) |
| **Quantity** | 25 L |
| **Batch Number** | BZ-2025-0891 |
| **Expiry Date** | 2025-08-12 (⚠️ 8 days remaining) |
| **Last Accessed** | 2026-07-02 14:20 |
| **Authorized Users** | Dr. Ahmed Al-Rashid, Dr. Sarah Thompson |
| **Status** | ⚠️ EXPIRING SOON - Schedule for priority usage |

---

### Emergency Response

**Spill Cleanup:**
1. Evacuate area immediately
2. Eliminate all ignition sources
3. Ventilate area
4. Wear appropriate PPE including SCBA
5. Contain spill with absorbent material (vermiculite, sand)
6. Collect in sealed containers for disposal
7. Never use water to clean up

**Emergency Contacts:**
- EHS Emergency: Ext. 9999
- Poison Control: +966-11-234-5678
- Fire Department: Internal 911

---

📋 **SDS Version:** 6.2 | **Revision Date:** 2026-01-15 | **Print Date:** 2026-07-05`,
    source: 'MSDS Database - Sigma-Aldrich',
    sourceType: 'Safety Data Sheet'
  }
};
