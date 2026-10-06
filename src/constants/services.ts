import { ServicePackage } from '../types';

export const SERVICES: ServicePackage[] = [
  {
    id: 'residential-reset',
    name: 'The Signature Residential Reset',
    badge: 'Recurring Maintenance',
    description: 'Bespoke weekly or bi-weekly luxury upkeep. Travertine polish, HEPA filtration, and French lavender finish.',
    startingPrice: 185,
    duration: '3.0 - 4.5 hrs',
    idealFor: 'Weekly or bi-weekly upkeep',
    features: [
      'Microfiber HEPA vacuuming with edge extraction',
      'pH-neutral botanical travertine & hardwood hand-polish',
      'Kitchen exterior cabinetry & quartz sealing wash',
      'Signature French lavender & eucalyptus room infusion'
    ]
  },
  {
    id: 'deep-clean',
    name: 'The Surgical Deep Clean',
    badge: 'Quarterly & Seasonal',
    description: 'Forensic top-to-bottom reset. 220°F pure steam grout sanitization and detailed interior appliance degreasing.',
    startingPrice: 340,
    duration: '5.0 - 7.5 hrs',
    idealFor: 'First-time clients & seasonal resets',
    features: [
      '220°F Chemical-free pure steam tile & grout sanitization',
      'Interior oven, range hood, and degreasing extraction',
      'Baseboards, crown moulding, and architectural door trim',
      'HVAC intake vent cleaning & allergen neutralization'
    ]
  },
  {
    id: 'move-in-out',
    name: 'Turnkey Move-In / Move-Out',
    badge: 'Real Estate & Transition',
    description: 'Total blank-slate interior disinfection. Inside all drawers, pantry cabinetry, appliances, and shower glass.',
    startingPrice: 420,
    duration: '6.0 - 9.0 hrs',
    idealFor: 'Home buyers & luxury transitions',
    features: [
      'Inside all empty closets, drawers, and pantry cabinetry',
      'Full interior refrigerator, freezer, and oven restoration',
      'Zero-residue shower glass decalcification and sealing',
      'Move-in ready botanical welcome scent diffusion'
    ]
  },
  {
    id: 'post-reno',
    name: 'Post-Renovation Fine Dust Extraction',
    badge: 'Architectural & Contractor',
    description: 'Multi-stage electrostatic and HEPA filtration targeting airborne drywall silica and settled construction particulate.',
    startingPrice: 490,
    duration: '6.5 - 10.0 hrs',
    idealFor: 'Post-construction & remodels',
    features: [
      'Multi-stage commercial HEPA filtration vacuum passes',
      'Electrostatic micro-fiber dry wipe before wet cleaning',
      'Adhesive, paint overspray, and silicone sticker removal',
      'Optical inspection walk-through'
    ]
  }
];
