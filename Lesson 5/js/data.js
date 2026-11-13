/**
 * COSMIC UNIVERSE - Core Scientific Space Database
 * Curated authentic NASA, ESA, Hubble, and JWST factual records.
 */

window.COSMIC_DATA = {
  // Gallery of high-resolution space discoveries
  gallery: [
    {
      id: "gal-1",
      title: "James Webb Deep Field (SMACS 0723)",
      category: "galaxies",
      categoryName: "Galaxies",
      image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1400&q=85",
      telescope: "James Webb Space Telescope (JWST)",
      distance: "4.6 Billion Light Years (Cluster) / 13.1B Ly (Background galaxies)",
      constellation: "Volans",
      description: "The deepest and sharpest infrared image of the distant universe to date. Gravitational lensing by foreground galaxy cluster SMACS 0723 magnifies and distorts galaxies from over 13 billion years ago, just hundreds of millions of years after the Big Bang.",
      funFact: "This slice of the vast universe covers a patch of sky approximately the size of a grain of sand held at arm's length by someone on the ground.",
      keyStats: {
        "Instrument": "NIRCam (Near-Infrared Camera)",
        "Exposure Time": "12.5 Hours",
        "Wavelength": "Infrared (0.6 - 5.0 μm)"
      }
    },
    {
      id: "gal-2",
      title: "Pillars of Creation (Eagle Nebula M16)",
      category: "nebulae",
      categoryName: "Nebulae",
      image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1400&q=85",
      telescope: "Hubble & JWST Composite",
      distance: "6,500 Light Years",
      constellation: "Serpens",
      description: "Towering columns of interstellar gas and dust where newborn stars emerge from dense pockets called evaporating gaseous globules (EGGs). Ultraviolet radiation from scorching young stars carves out these colossal fingers of matter.",
      funFact: "The tallest pillar on the left is roughly 4 to 5 light-years tall—about 40 trillion kilometers (25 trillion miles) from base to tip!",
      keyStats: {
        "Pillar Height": "4-5 Light Years",
        "Object Type": "Star-Forming Emission Nebula",
        "Discovered By": "Jean-Philippe de Cheseaux (1745)"
      }
    },
    {
      id: "gal-3",
      title: "Andromeda Galaxy (Messier 31)",
      category: "galaxies",
      categoryName: "Galaxies",
      image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1400&q=85",
      telescope: "Subaru & Mayall 4m Telescopes",
      distance: "2.537 Million Light Years",
      constellation: "Andromeda",
      description: "Our nearest major galactic neighbor, Andromeda is a grand barred spiral galaxy containing approximately one trillion stars. It is speeding towards our Milky Way at 110 km/s (68 miles/second).",
      funFact: "In about 4.5 billion years, Andromeda and our Milky Way will collide and merge into a giant elliptical galaxy nicknamed 'Milkomeda'.",
      keyStats: {
        "Diameter": "220,000 Light Years",
        "Star Count": "~1 Trillion Stars",
        "Central Black Hole": "100 Million Solar Masses"
      }
    },
    {
      id: "gal-4",
      title: "Carina Nebula (Cosmic Cliffs)",
      category: "nebulae",
      categoryName: "Nebulae",
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1400&q=85",
      telescope: "JWST NIRCam & MIRI",
      distance: "7,600 Light Years",
      constellation: "Carina",
      description: "This majestic landscape of 'mountains' and 'valleys' speckled with glittering stars is actually the edge of a nearby, young, star-forming region named NGC 3324 in the Carina Nebula. JWST revealed previously invisible areas of star birth.",
      funFact: "The intense ultraviolet radiation and stellar winds from massive, hot, young stars in the center of the bubble carve out the cliff-like structure.",
      keyStats: {
        "Peak Height": "~7 Light Years High",
        "Temperature": "Thousands of Kelvin",
        "Key Feature": "Protostellar Jets"
      }
    },
    {
      id: "gal-5",
      title: "Milky Way Galactic Core",
      category: "galaxies",
      categoryName: "Galaxies",
      image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1400&q=85",
      telescope: "Very Large Telescope (ESO) & Chandra",
      distance: "26,670 Light Years",
      constellation: "Sagittarius",
      description: "The heart of our home galaxy, packed with millions of dense stars, superheated gas, and magnetic filaments swirling around Sagittarius A*, the supermassive black hole with a mass of 4.15 million suns.",
      funFact: "Stars near the galactic center orbit at speeds exceeding 5,000 kilometers per second due to the immense gravitational pull of Sagittarius A*.",
      keyStats: {
        "Core Mass": "~4.15 Million M☉",
        "Orbital Period": "230 Million Years (Sun)",
        "Structure": "Barred Spiral Core"
      }
    },
    {
      id: "gal-6",
      title: "Great Orion Nebula (Messier 42)",
      category: "nebulae",
      categoryName: "Nebulae",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85",
      telescope: "Hubble Space Telescope",
      distance: "1,344 Light Years",
      constellation: "Orion",
      description: "One of the brightest nebulae visible to the naked eye, located just south of Orion's Belt. It is the closest region of massive star formation to Earth, acting as a cosmic nursery for over 700 young stars at various stages of formation.",
      funFact: "Protoplanetary disks (proplyds)—embryonic planetary systems circling newly formed stars—were first discovered and imaged inside this nebula.",
      keyStats: {
        "Diameter": "24 Light Years",
        "Apparent Magnitude": "4.0 (Visible to naked eye)",
        "Central Cluster": "Trapezium Cluster"
      }
    },
    {
      id: "gal-7",
      title: "The Ring Nebula (Messier 57)",
      category: "nebulae",
      categoryName: "Nebulae",
      image: "https://images.unsplash.com/photo-1538370965046-79c0d6907d47?auto=format&fit=crop&w=1400&q=85",
      telescope: "JWST MIRI & NIRCam",
      distance: "2,570 Light Years",
      constellation: "Lyra",
      description: "A planetary nebula created when a dying Sun-like star expelled its outer layers of gas into space. At its center lies a scorching white dwarf, the dense remnant of the progenitor star's core.",
      funFact: "Our Sun will experience a similar fate in about 5 billion years, shedding its atmosphere to produce a glowing planetary nebula.",
      keyStats: {
        "Central Star Temp": "125,000 Kelvin",
        "Expansion Rate": "20 to 30 km/s",
        "Chemical Composition": "Hydrogen, Helium, Nitrogen, Oxygen"
      }
    },
    {
      id: "gal-8",
      title: "Crab Nebula Supernova Remnant (M1)",
      category: "nebulae",
      categoryName: "Nebulae",
      image: "https://images.unsplash.com/photo-1447433589675-4aaa569f3e05?auto=format&fit=crop&w=1400&q=85",
      telescope: "Hubble, Chandra & Spitzer",
      distance: "6,500 Light Years",
      constellation: "Taurus",
      description: "The debris field of a titanic supernova explosion recorded by Chinese, Japanese, and Arab astronomers in 1054 AD. At its core spins the Crab Pulsar, a neutron star rotating 30 times every single second.",
      funFact: "The explosion in 1054 AD was so bright it was visible during broad daylight for 23 straight days and at night for nearly two years!",
      keyStats: {
        "Pulsar Spin": "30.2 times per second",
        "Expansion Velocity": "1,500 km/s",
        "Radius": "5.5 Light Years"
      }
    },
    {
      id: "gal-9",
      title: "Whirlpool Galaxy (Messier 51a)",
      category: "galaxies",
      categoryName: "Galaxies",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=85",
      telescope: "Hubble Space Telescope",
      distance: "23 Million Light Years",
      constellation: "Canes Venatici",
      description: "The quintessential spiral galaxy, displaying classic grand-design spiral arms laced with star-forming pink nurseries and dark dust lanes. It is in the midst of a gravitational dance with companion dwarf galaxy NGC 5195.",
      funFact: "The interaction with its smaller neighbor compresses hydrogen gas in the spiral arms, igniting waves of rapid starburst formation.",
      keyStats: {
        "Diameter": "76,000 Light Years",
        "Mass": "~160 Billion M☉",
        "Type": "Grand-design Spiral (SA(s)bc pec)"
      }
    },
    {
      id: "gal-10",
      title: "Hubble Space Telescope in Orbit",
      category: "telescopes",
      categoryName: "Space Observatories",
      image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1400&q=85",
      telescope: "Space Shuttle Discovery Mission",
      distance: "535 km (Low Earth Orbit)",
      constellation: "Orbiting Earth",
      description: "Launched in 1990, the Hubble Space Telescope has made more than 1.5 million observations, fundamentally altering humanity's understanding of the cosmos, determining the age of the universe, and discovering dark energy.",
      funFact: "Hubble travels at approximately 27,000 km/h (17,000 mph) and has completed over 180,000 orbits around planet Earth.",
      keyStats: {
        "Primary Mirror": "2.4 meters (7.9 ft)",
        "Launch Year": "April 24, 1990",
        "Orbital Speed": "7.59 km/s"
      }
    },
    {
      id: "gal-11",
      title: "Pleiades Star Cluster (Seven Sisters)",
      category: "stars",
      categoryName: "Stars & Clusters",
      image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1400&q=85",
      telescope: "Astrophotography Composite",
      distance: "444 Light Years",
      constellation: "Taurus",
      description: "An open star cluster dominated by luminous hot blue stars born within the last 100 million years. They are enveloped by a brilliant blue reflection nebula caused by passing through a dusty cloud.",
      funFact: "Mentioned in Homer's Odyssey and the Bible, the Pleiades cluster is used by cultures worldwide to mark seasons, agriculture, and calendars.",
      keyStats: {
        "Cluster Age": "~100 Million Years",
        "Members": "Over 1,000 stars",
        "Luminosity": "Luminous B-type stars"
      }
    },
    {
      id: "gal-12",
      title: "The Ringed Jewel: Saturn",
      category: "stars",
      categoryName: "Planetary Wonders",
      image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&w=1400&q=85",
      telescope: "Cassini Orbiter (NASA/ESA)",
      distance: "1.4 Billion km from Sun",
      constellation: "Solar System",
      description: "The sixth planet from the Sun and the second largest in the Solar System. Its magnificent ring system consists of billions of particles of water ice and rocky debris, ranging from microscopic dust to mountain-sized chunks.",
      funFact: "Saturn has the lowest density of any planet in our Solar System—at 0.687 g/cm³, Saturn would actually float if you could find a bathtub large enough!",
      keyStats: {
        "Moons": "146 confirmed moons",
        "Ring Thickness": "Only ~10 meters in places!",
        "Rotation Period": "10.7 Hours"
      }
    }
  ],

  // Black Hole educational data & interactive modules
  blackHole: {
    overview: {
      title: "What is a Black Hole?",
      summary: "A black hole is a region of spacetime where gravity is so intense that nothing—no particles, no matter, not even electromagnetic radiation such as light—has sufficient velocity to escape from inside it.",
      formation: "Most stellar-mass black holes form when massive stars (at least 20 times the mass of our Sun) exhaust their nuclear fuel at the end of their lives. Gravity crushes the stellar core inward in an instant, triggering a catastrophic supernova collapse that compresses mass into an infinitesimally small volume known as a singularity.",
      supermassive: "Supermassive black holes contain millions or billions of solar masses and reside at the centers of nearly every massive galaxy. How they grew so massive so early in cosmic history remains one of modern astrophysics' deepest mysteries."
    },
    anatomy: [
      {
        part: "Singularity",
        desc: "The theoretical center of a black hole where matter is crushed into infinite density and zero volume, where general relativity meets quantum mechanics and current laws of physics break down."
      },
      {
        part: "Event Horizon",
        desc: "The invisible boundary of no return. The radius of this sphere is called the Schwarzschild radius. Once anything crosses this threshold, the escape velocity exceeds the speed of light."
      },
      {
        part: "Accretion Disk",
        desc: "A swirling disk of gas, plasma, and debris pulled toward the black hole. Friction and magnetic fields heat this matter to millions of degrees, causing it to blaze brightly in X-rays."
      },
      {
        part: "Photon Sphere",
        desc: "A spherical region outside the event horizon where gravity is so strong that photons (light particles) are forced to travel in circular orbits around the black hole."
      },
      {
        part: "Relativistic Jets",
        desc: "Beams of matter and radiation ejected at 99.9% the speed of light along the rotational axes, powered by twisted magnetic fields and frame-dragging in the ergosphere."
      }
    ],
    mysteries: [
      {
        id: "bm-1",
        title: "The Black Hole Information Paradox",
        status: "theoretical",
        statusLabel: "Theoretical Dilemma / Paradox",
        color: "#f59e0b",
        description: "According to Stephen Hawking's discovery, black holes slowly evaporate by emitting thermal radiation (Hawking Radiation). However, quantum mechanics dictates that information can never be destroyed. If a black hole evaporates completely, does the quantum information of everything that fell in vanish forever?",
        scientificConsensus: "Physicists currently debate holography, black hole complementarity, and quantum hair as potential solutions, but an undisputed quantum theory of gravity is still needed."
      },
      {
        id: "bm-2",
        title: "Wormholes (Einstein-Rosen Bridges)",
        status: "hypothetical",
        statusLabel: "Hypothetical Solution to Relativity",
        color: "#ec4899",
        description: "Solutions to Einstein's field equations show that spacetime could theoretically curve back on itself, creating a topological shortcut or tunnel connecting two distant points in space and time.",
        scientificConsensus: "While mathematically valid under general relativity, maintaining an open, traversable wormhole requires 'exotic matter' with negative mass/energy density, which has never been observed in macroscopic nature."
      },
      {
        id: "bm-3",
        title: "Spaghettification & Gravitational Time Dilation",
        status: "fact",
        statusLabel: "Confirmed Scientific Fact",
        color: "#10b981",
        description: "As an object falls toward a stellar black hole, the extreme difference in gravitational pull between its head and feet stretches it into a long, thin noodle shape—a process formally named 'spaghettification'. Meanwhile, to an outside observer, time for the infalling traveler slows to a complete standstill near the event horizon.",
        scientificConsensus: "Direct consequence of Einstein's General Relativity, verified through gravitational redshift experiments and stellar orbit observations around Sagittarius A*."
      },
      {
        id: "bm-4",
        title: "Dark Matter & Dark Energy",
        status: "fact",
        statusLabel: "Confirmed Phenomenon / Unknown Substance",
        color: "#6366f1",
        description: "Ordinary matter (atoms, stars, planets, you and me) makes up only ~5% of the total mass-energy of the universe. Dark Matter constitutes ~27% (inferred from galactic rotation curves and gravitational lensing), and Dark Energy makes up ~68% (driving the accelerated cosmic expansion).",
        scientificConsensus: "Extensively verified through cosmological data (Planck satellite, WMAP, Type Ia supernovae), though the fundamental particles or nature of dark matter and dark energy remain undiscovered."
      },
      {
        id: "bm-5",
        title: "The Great Attractor",
        status: "fact",
        statusLabel: "Observed Gravitational Anomaly",
        color: "#06b6d4",
        description: "Hundreds of millions of light years away, our Milky Way and thousands of other galaxies are being pulled at 600 kilometers per second toward a hidden gravitational concentration in the direction of the Centaurus constellation, hidden behind the galactic plane.",
        scientificConsensus: "Astrophysical surveys reveal this is the central gravitational hub of the Laniakea Supercluster, containing the Norma Cluster and surrounding supercluster masses."
      }
    ]
  },

  // Star Finder database
  constellations: [
    {
      id: "c-orion",
      name: "Orion",
      title: "The Hunter",
      season: "Winter (Northern) / Summer (Southern)",
      mythology: "Named after the legendary giant huntsman in Greek mythology who placed himself among the stars after battling the scorpion Scorpius.",
      description: "One of the most recognizable constellations in the night sky, featuring the famous 'Orion's Belt' of three aligned bright stars.",
      stars: [
        { name: "Betelgeuse", designation: "Alpha Orionis", type: "Red Supergiant (M1-2)", dist: "642.5 ly", mag: "0.50 (Variable)", color: "#ff7b54", x: 28, y: 32, note: "Nearing the end of its life; expected to explode in a brilliant supernova within the next 100,000 years." },
        { name: "Rigel", designation: "Beta Orionis", type: "Blue-White Supergiant (B8)", dist: "860 ly", mag: "0.13", color: "#85c1e9", x: 68, y: 75, note: "Luminous supergiant shining with 120,000 times the brightness of our Sun." },
        { name: "Bellatrix", designation: "Gamma Orionis", type: "Blue Giant (B2)", dist: "250 ly", mag: "1.64", color: "#aed6f1", x: 65, y: 34, note: "Known as the Amazon Star, one of Orion's shoulders." },
        { name: "Saiph", designation: "Kappa Orionis", type: "Blue Supergiant (B0.5)", dist: "650 ly", mag: "2.07", color: "#aed6f1", x: 32, y: 76, note: "Forms the right knee/foot of the hunter." },
        { name: "Alnitak", designation: "Zeta Orionis", type: "Triple Star System", dist: "1,260 ly", mag: "1.77", color: "#d6eaf8", x: 42, y: 54, note: "Easternmost star in Orion's belt, near the Flame and Horsehead Nebulae." },
        { name: "Alnilam", designation: "Epsilon Orionis", type: "Blue Supergiant", dist: "2,000 ly", mag: "1.69", color: "#d6eaf8", x: 48, y: 53, note: "The central star of the Belt, 537,000 times more luminous than our Sun." },
        { name: "Mintaka", designation: "Delta Orionis", type: "Multiple Star System", dist: "1,200 ly", mag: "2.23", color: "#d6eaf8", x: 54, y: 52, note: "Westernmost star of Orion's Belt, almost precisely on the celestial equator." }
      ],
      lines: [
        [0, 4], [4, 5], [5, 6], [6, 1], [4, 3], [2, 6], [0, 2], [1, 3]
      ]
    },
    {
      id: "c-ursa",
      name: "Ursa Major",
      title: "The Great Bear & The Big Dipper",
      season: "Year-Round (Circumpolar in Northern Hemisphere)",
      mythology: "Associated with Callisto, a nymph transformed into a bear by Hera in Greek mythology.",
      description: "Contains the world-famous 'Big Dipper' asterism, whose pointer stars lead stargazers directly to Polaris, the North Star.",
      stars: [
        { name: "Dubhe", designation: "Alpha Ursae Majoris", type: "Orange Giant (K0)", dist: "123 ly", mag: "1.79", color: "#f39c12", x: 30, y: 35, note: "The upper pointer star; draw a line straight past Dubhe to locate the North Star Polaris." },
        { name: "Merak", designation: "Beta Ursae Majoris", type: "Subgiant (A1)", dist: "79.7 ly", mag: "2.37", color: "#d4e6f1", x: 30, y: 60, note: "The lower pointer star of the dipper's bowl." },
        { name: "Phecda", designation: "Gamma Ursae Majoris", type: "Main Sequence (A0)", dist: "83.2 ly", mag: "2.44", color: "#ebf5fb", x: 50, y: 62, note: "Forms the bottom inside corner of the bowl." },
        { name: "Megrez", designation: "Delta Ursae Majoris", type: "Main Sequence (A3)", dist: "80.5 ly", mag: "3.31", color: "#ebf5fb", x: 50, y: 40, note: "The dimmest star of the Dipper, connecting the bowl to the handle." },
        { name: "Alioth", designation: "Epsilon Ursae Majoris", type: "Peculiar Star (A1)", dist: "82.6 ly", mag: "1.77", color: "#ebf5fb", x: 65, y: 35, note: "The brightest star in Ursa Major, featuring strong magnetic field variations." },
        { name: "Mizar & Alcor", designation: "Zeta Ursae Majoris", type: "Multiple Star System", dist: "83 ly", mag: "2.23", color: "#aed6f1", x: 78, y: 45, note: "A famous optical double used for centuries as an ancient eyesight test." },
        { name: "Alkaid", designation: "Eta Ursae Majoris", type: "Young Blue Star (B3)", dist: "103.9 ly", mag: "1.86", color: "#85c1e9", x: 90, y: 60, note: "The tip of the handle, moving in an opposite direction through space from the other stars." }
      ],
      lines: [
        [0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]
      ]
    },
    {
      id: "c-cassiopeia",
      name: "Cassiopeia",
      title: "The Queen's Crown (W Shape)",
      season: "Autumn / Circumpolar",
      mythology: "Named after the vain queen Cassiopeia in Greek mythology who boasted that she was more beautiful than the sea nymphs.",
      description: "Instantly recognizable by its distinctive 'W' or 'M' shape composed of five bright stars across the northern Milky Way.",
      stars: [
        { name: "Schedar", designation: "Alpha Cassiopeiae", type: "Orange Giant (K0)", dist: "228 ly", mag: "2.24", color: "#f39c12", x: 30, y: 45, note: "The bottom point of the right half of the 'W'." },
        { name: "Caph", designation: "Beta Cassiopeiae", type: "Subgiant (F2)", dist: "54.7 ly", mag: "2.28", color: "#fef9e7", x: 15, y: 30, note: "A pulsating variable star and the westernmost point." },
        { name: "Gamma Cassiopeiae", designation: "Navi", type: "Eruptive Blue Variable", dist: "550 ly", mag: "2.15", color: "#85c1e9", x: 45, y: 25, note: "The central peak of the 'W', spinning so fast it bulges noticeably at its equator." },
        { name: "Ruchbah", designation: "Delta Cassiopeiae", type: "Eclipsing Binary (A5)", dist: "99.4 ly", mag: "2.68", color: "#ebf5fb", x: 65, y: 50, note: "Knee of the queen, pairs with another star every 759 days." },
        { name: "Segin", designation: "Epsilon Cassiopeiae", type: "Blue Giant (B3)", dist: "460 ly", mag: "3.37", color: "#85c1e9", x: 80, y: 32, note: "The easternmost star marking the final tip of the W." }
      ],
      lines: [
        [1, 0], [0, 2], [2, 3], [3, 4]
      ]
    },
    {
      id: "c-cygnus",
      name: "Cygnus",
      title: "The Swan & Northern Cross",
      season: "Summer & Autumn",
      mythology: "Represents the celestial swan flying south along the spine of the Milky Way galaxy.",
      description: "Crucial navigational constellation containing Deneb, one vertex of the celebrated Summer Triangle, and Cygnus X-1, the first confirmed black hole candidate.",
      stars: [
        { name: "Deneb", designation: "Alpha Cygni", type: "White Supergiant (A2)", dist: "2,615 ly", mag: "1.25", color: "#ebf5fb", x: 50, y: 15, note: "One of the most distant naked-eye stars, radiating 200,000 times more light than our Sun." },
        { name: "Albireo", designation: "Beta Cygni", type: "Double Star (K3 / B9)", dist: "430 ly", mag: "3.05", color: "#f39c12", x: 50, y: 85, note: "Renowned as the most gorgeous contrasting double star: golden-amber and sapphire blue." },
        { name: "Sadr", designation: "Gamma Cygni", type: "Supergiant (F8)", dist: "1,800 ly", mag: "2.23", color: "#fef9e7", x: 50, y: 48, note: "Marks the chest of the swan and the intersection of the Northern Cross." },
        { name: "Gienah", designation: "Epsilon Cygni", type: "Orange Giant (K0)", dist: "73 ly", mag: "2.48", color: "#f39c12", x: 25, y: 55, note: "The eastern wingtip of the celestial swan." },
        { name: "Delta Cygni", designation: "Delta Cygni", type: "Triple System (B9)", dist: "165 ly", mag: "2.87", color: "#aed6f1", x: 75, y: 45, note: "The western wingtip; in 11,250 AD it will temporarily become Earth's North Star due to precession." }
      ],
      lines: [
        [0, 2], [2, 1], [3, 2], [2, 4]
      ]
    }
  ],

  // Mars Colony components & parameters
  mars: {
    targetDays: 100,
    buildings: [
      {
        id: "habitat",
        name: "Bio-Hab Habitat",
        category: "life",
        cost: { metal: 60, energy: 15 },
        produces: { populationCapacity: 4 },
        consumes: { oxygen: 2, water: 2, energy: 3 },
        icon: "🏠",
        description: "Pressurized living dome equipped with radiation shielding for 4 colonists."
      },
      {
        id: "greenhouse",
        name: "Aeroponic Greenhouse",
        category: "food",
        cost: { metal: 45, energy: 20 },
        produces: { food: 6, oxygen: 3 },
        consumes: { water: 3, energy: 4 },
        icon: "🌱",
        description: "Produces fresh nutritious crops and supplemental oxygen through LED aeroponics."
      },
      {
        id: "ice_extractor",
        name: "Subsurface Ice Extractor",
        category: "water",
        cost: { metal: 50, energy: 25 },
        produces: { water: 8 },
        consumes: { energy: 5 },
        icon: "💧",
        description: "Melts and purifies Martian subsurface permafrost into potable clean water."
      },
      {
        id: "moxie",
        name: "MOXIE Oxygen Generator",
        category: "air",
        cost: { metal: 55, energy: 30 },
        produces: { oxygen: 9 },
        consumes: { energy: 6 },
        icon: "💨",
        description: "Splits atmospheric Martian carbon dioxide (CO2) into breathable pure oxygen (O2)."
      },
      {
        id: "solar_array",
        name: "High-Efficiency Solar Array",
        category: "energy",
        cost: { metal: 35, energy: 0 },
        produces: { energy: 16 },
        consumes: {},
        icon: "☀️",
        description: "Generates clean photovoltaic energy during daylight Sols. Efficiency drops during dust storms."
      },
      {
        id: "nuclear_rtg",
        name: "Nuclear Fission Micro-Reactor",
        category: "energy",
        cost: { metal: 120, energy: 0 },
        produces: { energy: 40 },
        consumes: { water: 1 },
        icon: "⚛️",
        description: "Provides steady, storm-proof baseline power regardless of day or night conditions."
      },
      {
        id: "science_lab",
        name: "Astrobiology Lab",
        category: "science",
        cost: { metal: 80, energy: 20 },
        produces: { research: 5 },
        consumes: { oxygen: 1, energy: 5 },
        icon: "🔬",
        description: "Conducts vital geological and biosignature analysis to unlock colony upgrades."
      },
      {
        id: "rover_station",
        name: "Autonomous Rover Bay",
        category: "mining",
        cost: { metal: 70, energy: 15 },
        produces: { metal: 10 },
        consumes: { energy: 4 },
        icon: "🚜",
        description: "Deploys autonomous mining rovers to gather raw Martian iron and regolith minerals."
      }
    ],
    events: [
      {
        title: "Severe Martian Dust Storm",
        description: "A colossal dust storm envelopes Elysium Planitia, blocking sunlight and reducing solar output by 70%!",
        effect: "solar_drop",
        duration: 3,
        severity: "warning"
      },
      {
        title: "Subsurface Ice Aquifer Discovered",
        description: "Rover telemetry strikes a pristine underground glacier! Water reserves increase significantly.",
        effect: "water_boost",
        amount: 50,
        severity: "success"
      },
      {
        title: "Micrometeorite Puncture",
        description: "A high-velocity micrometeorite damaged a habitat seal! Emergency repairs require 25 Metal.",
        effect: "metal_loss",
        amount: 25,
        severity: "danger"
      },
      {
        title: "Earth Resupply Shuttle Arrives",
        description: "An automated SpaceX Starship freighter touches down on Pad 1 loaded with surplus metals and tech!",
        effect: "resupply",
        amount: 60,
        severity: "success"
      },
      {
        title: "Solar Flare Warning",
        description: "A coronal mass ejection from the Sun bathes Mars in radiation. Colonists must shelter in bio-habs.",
        effect: "solar_flare",
        duration: 2,
        severity: "warning"
      }
    ]
  },

  // Rocket Builder modules
  rocket: {
    capsules: [
      { id: "orion", name: "Orion Exploration Capsule", mass: 10.4, crew: 4, drag: 0.12, cost: 250, desc: "Deep space crew module with advanced heat shield and long-duration avionics." },
      { id: "starship", name: "Starship Heavy Cabin", mass: 25.0, crew: 12, drag: 0.18, cost: 420, desc: "Massive stainless steel payload cabin designed for interplanetary voyages." },
      { id: "probe", name: "Voyager Deep Probe", mass: 1.8, crew: 0, drag: 0.06, cost: 120, desc: "Ultra-lightweight robotic scientific probe equipped with high-gain dish antenna." }
    ],
    tanks: [
      { id: "light_tank", name: "Orbital Hydrolox Tank", massDry: 4, fuelMass: 25, capacity: "25 Tons", color: "#38bdf8", desc: "Liquid Hydrogen & Liquid Oxygen for highest efficiency in vacuum." },
      { id: "medium_tank", name: "Interplanetary Methalox Tank", massDry: 8, fuelMass: 60, capacity: "60 Tons", color: "#a855f7", desc: "Liquid Methane & LOX; reusable, clean-burning, and synthesizable on Mars." },
      { id: "heavy_tank", name: "Heavy Keralox Super Tank", massDry: 16, fuelMass: 120, capacity: "120 Tons", color: "#f97316", desc: "Refined Kerosene (RP-1) & LOX delivering dense raw propellant for first-stage liftoff." }
    ],
    engines: [
      { id: "raptor", name: "Raptor 3 Full-Flow Staged", thrust: 2800, isp: 363, mass: 1.6, fuelType: "Methalox", desc: "State-of-the-art full-flow staged combustion engine with extraordinary chamber pressure." },
      { id: "merlin", name: "Merlin 1D Turbo Rocket", thrust: 1900, isp: 311, mass: 1.1, fuelType: "Keralox", desc: "Workhorse rocket engine known for supreme reliability and sea-level thrust density." },
      { id: "rs25", name: "RS-25 Space Shuttle Main", thrust: 2279, isp: 452, mass: 3.5, fuelType: "Hydrolox", desc: "Legendary cryogenic rocket engine with the highest specific impulse (ISP) of any liquid chemical engine." },
      { id: "ion", name: "Hall-Effect Plasma Ion Thruster", thrust: 120, isp: 3200, mass: 0.5, fuelType: "Xenon", desc: "Ultra-high ISP electric propulsion for prolonged deep space cruising beyond Earth orbit." }
    ],
    boosters: [
      { id: "none", name: "No Additional Boosters", thrust: 0, mass: 0, fuel: 0, desc: "Single core architecture for light payloads." },
      { id: "solid", name: "Dual Solid Rocket Boosters (SRBs)", thrust: 3200, mass: 18, fuel: 80, desc: "High-thrust ammonium perchlorate solid motors for explosive initial launch acceleration." },
      { id: "liquid", name: "Twin Liquid Reusable Flyback Boosters", thrust: 3800, mass: 22, fuel: 110, desc: "Throttleable side boosters equipped with grid fins for autonomous recovery landing." }
    ],
    colors: [
      { id: "apollo", name: "Apollo Pearl White", hex: "#f8fafc", accent: "#38bdf8" },
      { id: "obsidian", name: "Obsidian Carbon Fiber", hex: "#1e293b", accent: "#a855f7" },
      { id: "martian", name: "Martian Crimson", hex: "#b91c1c", accent: "#fb923c" },
      { id: "gold", name: "Cosmic Mylar Gold", hex: "#eab308", accent: "#fef08a" },
      { id: "cyber", name: "Cyberpunk Neon Cyan", hex: "#06b6d4", accent: "#3b82f6" }
    ]
  },

  // Space Quiz database with multiple difficulties & comprehensive explanations
  quiz: [
    {
      id: "q-1",
      difficulty: "easy",
      category: "Galaxies",
      question: "What is the name of our home galaxy?",
      options: ["Andromeda", "The Milky Way", "Whirlpool", "Sombrero"],
      answer: 1,
      explanation: "Our solar system resides inside the Milky Way galaxy, a barred spiral galaxy containing an estimated 100 to 400 billion stars."
    },
    {
      id: "q-2",
      difficulty: "easy",
      category: "Black Holes",
      question: "What is the boundary around a black hole beyond which nothing can escape called?",
      options: ["Photon Sphere", "The Event Horizon", "Accretion Rim", "The Singularity"],
      answer: 1,
      explanation: "The Event Horizon is the point of no return. Within this threshold, the escape velocity exceeds the speed of light in vacuum (300,000 km/s)."
    },
    {
      id: "q-3",
      difficulty: "easy",
      category: "Mars",
      question: "Why does Mars appear reddish-orange in the night sky?",
      options: ["Active volcanoes everywhere", "Iron oxide (rust) covering its surface", "Reflecting red light from Jupiter", "A dense copper atmosphere"],
      answer: 1,
      explanation: "Mars is coated in fine regolith rich in iron oxide—the same compound known as rust on Earth—which scatters red wavelengths into space."
    },
    {
      id: "q-4",
      difficulty: "easy",
      category: "Rockets",
      question: "What famous countdown number sequence precedes a rocket liftoff?",
      options: ["3... 2... 1... Liftoff!", "10... 9... 8... down to Liftoff!", "5... 4... 3... Go!", "Zero to One Hundred"],
      answer: 1,
      explanation: "The iconic 10-second countdown gives launch engineers, computers, and telemetry systems the final checkpoints before main engine ignition."
    },
    {
      id: "q-5",
      difficulty: "medium",
      category: "Stars",
      question: "What is the brightest star in Earth's night sky?",
      options: ["Polaris (North Star)", "Betelgeuse", "Sirius (The Dog Star)", "Vega"],
      answer: 2,
      explanation: "Sirius (Alpha Canis Majoris) shines with an apparent magnitude of -1.46, making it nearly twice as bright as Canopus, the next brightest star."
    },
    {
      id: "q-6",
      difficulty: "medium",
      category: "Black Holes",
      question: "What is the name of the supermassive black hole situated at the center of the Milky Way?",
      options: ["Cygnus X-1", "M87*", "Sagittarius A*", "Gargantua"],
      answer: 2,
      explanation: "Sagittarius A* (pronounced Sagittarius A-star) is our galaxy's central supermassive black hole, with a mass of roughly 4.15 million solar masses."
    },
    {
      id: "q-7",
      difficulty: "medium",
      category: "Galaxies",
      question: "Which major telescope launched on Christmas Day in 2021 to observe the earliest galaxies in infrared light?",
      options: ["Hubble Space Telescope", "James Webb Space Telescope", "Spitzer Space Telescope", "Nancy Grace Roman"],
      answer: 1,
      explanation: "The James Webb Space Telescope (JWST) launched on December 25, 2021, on an Ariane 5 rocket and orbits the Sun at the Sun-Earth L2 Lagrange point."
    },
    {
      id: "q-8",
      difficulty: "medium",
      category: "Mars",
      question: "How long is a single day on Mars (known as a 'Sol')?",
      options: ["Exactly 24 hours", "24 hours and 39 minutes", "36 hours", "12 hours and 15 minutes"],
      answer: 1,
      explanation: "A Martian solar day (Sol) lasts 24 hours, 39 minutes, and 35 seconds—just slightly longer than an Earth day!"
    },
    {
      id: "q-9",
      difficulty: "hard",
      category: "Black Holes",
      question: "What theoretical radiation did Stephen Hawking propose causes black holes to slowly lose mass and eventually evaporate?",
      options: ["Cherenkov Radiation", "Hawking Radiation", "Synchrotron Radiation", "Cosmic Microwave Background"],
      answer: 1,
      explanation: "Hawking Radiation is quantum thermal radiation emitted just outside a black hole's event horizon due to quantum fluctuations in the vacuum."
    },
    {
      id: "q-10",
      difficulty: "hard",
      category: "Rockets",
      question: "In rocket science, what does 'Specific Impulse' (ISP) measure?",
      options: ["Total rocket weight", "Efficiency of propellant consumption (seconds)", "Maximum payload diameter", "Launch site atmospheric drag"],
      answer: 1,
      explanation: "Specific Impulse (ISP) measures thrust delivered per unit of propellant flow rate over time, effectively measuring fuel fuel efficiency in seconds."
    },
    {
      id: "q-11",
      difficulty: "hard",
      category: "Stars",
      question: "What element marks the end of thermonuclear fusion in the core of a massive star, triggering a core-collapse supernova?",
      options: ["Carbon", "Oxygen", "Silicon", "Iron"],
      answer: 3,
      explanation: "Fusing Iron-56 absorbs energy rather than releasing it (endothermic). Once an iron core forms, the star loses radiation pressure and collapses instantly."
    },
    {
      id: "q-12",
      difficulty: "hard",
      category: "Galaxies",
      question: "Approximately what percentage of the mass-energy content of the universe is composed of Dark Energy?",
      options: ["About 5%", "About 27%", "About 68%", "About 99%"],
      answer: 2,
      explanation: "According to the standard Lambda-CDM cosmological model, Dark Energy accounts for ~68.3%, Dark Matter ~26.8%, and ordinary atomic matter only ~4.9%."
    }
  ],

  // 30 Authentic Space Facts of the Day
  factsOfTheDay: [
    "One day on Venus is longer than one Venusian year! Venus rotates so slowly that it takes 243 Earth days to rotate once, but only 225 Earth days to orbit the Sun.",
    "Neutron stars are so dense that a single teaspoon of neutron star material would weigh approximately 6 billion tons on Earth.",
    "Sound cannot travel in the near-vacuum of space because there are not enough gas particles to propagate sound waves.",
    "The footprint left by Neil Armstrong and the Apollo astronauts on the Moon could remain intact for at least 100 million years due to the lack of wind or water erosion.",
    "Jupiter's Great Red Spot is a titanic anticyclonic storm that has been raging for at least 350 years—and it's large enough to swallow Earth whole!",
    "Light from the Sun takes approximately 8 minutes and 20 seconds to travel 150 million kilometers (93 million miles) across space to reach Earth.",
    "There are more trees on planet Earth (about 3 trillion) than there are stars in the Milky Way galaxy (about 100 to 400 billion).",
    "Olympus Mons on Mars is the tallest known volcano in our Solar System, standing nearly 22 km (13.6 miles) high—nearly three times the height of Mount Everest!",
    "Saturn's moon Titan is the only celestial body in the Solar System besides Earth known to have stable rivers, lakes, and seas on its surface (composed of liquid methane and ethane).",
    "If two pieces of the exact same type of metal touch in the vacuum of space, they will fuse together permanently in a process known as 'cold welding'.",
    "The International Space Station (ISS) orbits Earth at 27,600 km/h (17,150 mph), meaning astronauts on board experience 16 sunrises and sunsets every single day.",
    "Voyager 1, launched in 1977, is the farthest human-made object from Earth, currently sailing through interstellar space over 24 billion kilometers away.",
    "A full NASA extravehicular activity (EVA) spacesuit costs approximately $12 million to $22 million and acts as a personalized miniature spacecraft.",
    "The sun accounts for about 99.86% of all the mass in the entire Solar System, with Jupiter and Saturn making up most of the remaining 0.14%.",
    "In 2019, the Event Horizon Telescope (EHT) captured the first ever direct image of a black hole's shadow in the center of the giant galaxy Messier 87 (M87*).",
    "On Mars, sunsets appear blue! Fine Martian atmospheric dust particles scatter red light away and allow blue light to penetrate through the thin atmosphere.",
    "The Hubble Space Telescope has traveled more than 4 billion miles along a circular low Earth orbit since its deployment in 1990.",
    "The core temperature of our Sun is estimated to be 15 million degrees Celsius (27 million degrees Fahrenheit), where nuclear fusion fuses 600 million tons of hydrogen each second.",
    "A year on Mercury is just 88 Earth days, but Mercury rotates on its axis so slowly that one solar day (from sunrise to sunrise) lasts 176 Earth days!",
    "Space is not completely empty; interstellar space contains on average just a few hydrogen atoms per cubic meter."
  ]
};

