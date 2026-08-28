// Real Estate Projects Database for DAMAC - Chelsea Residences Tower C

export const DEVELOPERS_DATA = [
  {
    id: "damac",
    name: "DAMAC Properties",
    logo: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=150&auto=format&fit=crop&q=80",
    description: "Premier luxury real estate developer in Dubai known for iconic branded residences.",
    projectsCount: 1,
    projects: [
      {
        id: "chelsea-residences",
        name: "Chelsea Residences",
        tower: "Tower C",
        developer: "DAMAC Properties",
        partner: "Chelsea Football Club",
        locationName: "Dubai Maritime City (Madinat Dubai Al Melaheyah)",
        completionDate: "30 June 2030",
        dldIncluded: false, // DLD fee is paid in addition to deposit
        dldPercentage: 4,
        whatsappContact: "+971504497663",
        tagline: "World's First Chelsea FC Branded Luxury Waterfront Residences",
        coordinates: {
          lat: 25.2676,
          lng: 55.2708,
          mapZoom: 14
        },
        keyDistances: [
          { place: "J1 Beach", time: "14 mins", icon: "Umbrella" },
          { place: "Al Ghubaiba Metro Station", time: "18 mins", icon: "Train" },
          { place: "Dubai International Airport (DXB)", time: "20 mins", icon: "Plane" },
          { place: "City Walk & Downtown Dubai", time: "15 mins", icon: "Building2" },
          { place: "Burj Khalifa / Dubai Mall", time: "15 mins", icon: "Landmark" },
          { place: "DIFC Financial Centre", time: "12 mins", icon: "Briefcase" }
        ],
        priceTrendHistory: [
          { year: "2023", primaryPsf: 2047, secondaryPsf: 1637 },
          { year: "2024", primaryPsf: 2439, secondaryPsf: 2165 },
          { year: "2025", primaryPsf: 3004, secondaryPsf: 2378 },
          { year: "H1 2026", primaryPsf: 3123, secondaryPsf: 2474 }
        ],
        appreciationStat: "+53% Capital Gain over 4 Years",
        masterplanHighlights: [
          "Launched by Dubai Government across 2.27 Mn Sqm",
          "Around 12 km of prime waterfront promenade",
          "100% Freehold ownership for international buyers",
          "10-15 minutes from key economic and financial hubs"
        ],
        amenities: [
          "Infinity Beach Pool & Coral Reef Lounge",
          "Chelsea Blue Beach Club & Sunset Bar",
          "The Stamford Summit - Rooftop Football Pitch",
          "Halotherapy Salt Chamber & Cryotherapy Spa",
          "The Captains Table - Fine Dining with Football Legends",
          "Starlight Wellness Center & Kneipp Parkour Therapy"
        ],
        units: [
          {
            type: "1-BR",
            title: "Luxury 1 Bedroom Residence",
            minAreaSqft: 771,
            maxAreaSqft: 1009,
            minPriceAED: 2548000,
            maxPriceAED: 3254000,
            avgPsfAED: 3317,
            totalInventory: 357,
            featuredUnit: "CHLC/2/201",
            sampleArea: 921,
            samplePrice: 2963000,
            floorplanImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
            rooms: [
              { name: "Living Room & Terrace", desc: "Spacious sea-view salon with panoramic floor-to-ceiling glass.", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80" },
              { name: "Master Suite", desc: "Master bedroom featuring built-in Italian wardrobes & en-suite.", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1000&auto=format&fit=crop&q=80" },
              { name: "Designer Kitchen", desc: "Fitted kitchen with refrigerator, hood, RO system & porcelain finish.", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1000&auto=format&fit=crop&q=80" }
            ]
          },
          {
            type: "2-BR",
            title: "Exclusive 2 Bedroom Waterfront Apartment",
            minAreaSqft: 1158,
            maxAreaSqft: 1158,
            minPriceAED: 3683000,
            maxPriceAED: 3683000,
            avgPsfAED: 3180,
            totalInventory: 1,
            featuredUnit: "CHLC/1/106",
            sampleArea: 1158,
            samplePrice: 3683000,
            floorplanImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
            rooms: [
              { name: "Executive Living Room", desc: "Double-balcony layout overlooking Dubai Maritime Marina.", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&auto=format&fit=crop&q=80" },
              { name: "Primary Master Bedroom", desc: "Spacious master suite with walk-in wardrobe & rain shower.", image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1000&auto=format&fit=crop&q=80" },
              { name: "Guest Bedroom", desc: "Second bedroom with private balcony access & en-suite.", image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1000&auto=format&fit=crop&q=80" }
            ]
          },
          {
            type: "3-BR",
            title: "Penthouse Level 3 Bedroom Royal Suite",
            minAreaSqft: 2855,
            maxAreaSqft: 2855,
            minPriceAED: 7604000,
            maxPriceAED: 7604000,
            avgPsfAED: 2663,
            totalInventory: 1,
            featuredUnit: "CHLC/22/2201",
            sampleArea: 2855,
            samplePrice: 7604000,
            floorplanImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
            rooms: [
              { name: "Grand Salon & Dining", desc: "Expansive 1,000+ sqft living zone with private plunge pool balcony.", image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1000&auto=format&fit=crop&q=80" },
              { name: "Royal Master Suite", desc: "Corner master bedroom with 270-degree ocean & Downtown skyline views.", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000&auto=format&fit=crop&q=80" },
              { name: "Chef's Kitchen", desc: "Full island kitchen with integrated Miele appliances & staff quarters.", image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1000&auto=format&fit=crop&q=80" }
            ]
          }
        ],
        paymentPlan: [
          { milestone: "Deposit / Immediate", percent: 5 },
          { milestone: "Within 1 month of booking", percent: 10 },
          { milestone: "Within 3 months of booking", percent: 5 },
          { milestone: "Months 4 to 11 (Monthly)", percent: 2, detail: "0.25% x 8 months" },
          { milestone: "Within 12 months of booking", percent: 6 },
          { milestone: "Months 13 to 17 (Monthly)", percent: 1.25, detail: "0.25% x 5 months" },
          { milestone: "Within 18 months of booking", percent: 5 },
          { milestone: "Months 19 to 23 (Monthly)", percent: 1.25, detail: "0.25% x 5 months" },
          { milestone: "Within 24 months of booking", percent: 5 },
          { milestone: "Months 25 to 29 (Monthly)", percent: 1.25, detail: "0.25% x 5 months" },
          { milestone: "Within 30 months of booking", percent: 5 },
          { milestone: "Months 31 to 35 (Monthly)", percent: 1.25, detail: "0.25% x 5 months" },
          { milestone: "Within 36 months of booking", percent: 5 },
          { milestone: "Months 37 to 41 (Monthly)", percent: 1.25, detail: "0.25% x 5 months" },
          { milestone: "On Completion (30 June 2030)", percent: 40 }
        ]
      }
    ]
  }
];

export const EXCHANGE_RATES = {
  AED: { symbol: "AED ", rate: 1, label: "Emirati Dirham (AED)" },
  USD: { symbol: "$", rate: 0.2723, label: "US Dollar ($)" },
  EUR: { symbol: "€", rate: 0.2490, label: "Euro (€)" },
  GBP: { symbol: "£", rate: 0.2150, label: "British Pound (£)" }
};
