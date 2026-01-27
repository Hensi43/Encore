export const eventsData = [
    {
        title: "Darpan",
        slug: "darpan",
        category: "Photography",
        price: 150,
        image: "/images/event/1.jpg",
        description: "Enthusiastic Shutterbugs, it's your turn to grasp your camera and make your eyes act like a shutter and your mind like a lens. Capture what it actually feels like, not what it looks like.",
        venue: "Online / Campus",
        time: "All Day",
        rules: [
            "Theme: Open",
            "This is an individual competition.",
            "Any camera may be used (DSLR, Mobile, etc.).",
            "Each participant can submit up to 5 pictures.",
            "Photos must be submitted as a PDF with a title & brief description (max 30 words).",
            "Only basic editing (cropping, brightness, hue, contrast) is allowed.",
            "Entries must have a 16:9 ratio.",
            "Details: Mention your email ID and WhatsApp number.",
            "Failure to follow rules will lead to disqualification."
        ]
    },
    {
        title: "Reel Making",
        slug: "reel-making",
        category: "Videography",
        price: 200,
        image: "/images/event/2.jpg",
        description: "Create engaging reels that tell a story in seconds.",
        venue: "Online / Campus",
        time: "All Day",
        rules: ["Time limit: 60 seconds", "Original content only"]
    },
    {
        title: "Natraj",
        slug: "solo-dance",
        category: "Solo Dance",
        price: 200,
        image: "/images/event/23.jpg",
        description: "Solo dance performance.",
        venue: "Arena / Secondary Stage / Auditorium",
        time: "TBA",
        rules: []
    },
    {
        title: "Rhythm Rebels",
        slug: "duo-dance",
        category: "Duo Dance",
        price: 300, // 150 per person * 2
        image: "/images/event/6.jpg", // Placeholder (using Dance Battle)
        description: "Duo dance competition.",
        venue: "Arena / Secondary Stage / Auditorium",
        time: "TBA",
        rules: [],
        isTeam: true,
        minSize: 2,
        maxSize: 2
    },
    {
        title: "Raqs",
        slug: "group-dance",
        category: "Group Dance",
        price: 600, // 120 per person * 5 (min size)
        image: "/images/event/28.jpg",
        description: "Group dance competition.",
        venue: "Main Stage",
        time: "TBA",
        rules: [],
        isTeam: true,
        minSize: 5,
        maxSize: 15
    },
    {
        title: "Relay Rangoli",
        slug: "relay-rangoli",
        category: "Relay Rangoli",
        price: 200, // 50 per person * 4
        image: "/images/event/18.jpg",
        description: "Team rangoli competition.",
        venue: "Auditorium",
        time: "Day-1, 10 AM",
        rules: [],
        isTeam: true,
        minSize: 4,
        maxSize: 4
    },
    {
        title: "Pratibimb", // Live Sketching
        slug: "live-sketching",
        category: "Live Sketching",
        price: 100, // 100 per person
        image: "/images/event/16.jpg",
        description: "Sketch live subjects.",
        venue: "Arena / Garden",
        time: "Day-1, 10 AM",
        rules: []
    },
    {
        title: "Brush the Theme",
        slug: "brush-the-theme",
        category: "Art",
        price: 100, // 100 per person
        image: "/images/event/11.jpg", // Reusing graffiti img or need new
        description: "Painting competition based on a theme.",
        venue: "Arena / Garden / LT",
        time: "Day-2, 10 AM",
        rules: []
    },
    {
        title: "Mukhauta", // Face Painting
        slug: "face-painting",
        category: "Face Painting",
        price: 100, // 100 per person
        image: "/images/event/12.jpg",
        description: "Face painting competition.",
        venue: "Arena / Garden",
        time: "Day-2, 2 PM",
        rules: []
    },
    {
        title: "Sargam",
        slug: "solo-singing",
        category: "Solo Singing",
        price: 150,
        image: "/images/event/9.jpg",
        description: "Melodious solo performances.",
        venue: "Secondary Stage / Arena",
        time: "TBA",
        rules: []
    },
    {
        title: "Raftaar",
        slug: "rap-battle",
        category: "Rap Battle",
        price: 150,
        image: "/images/event/20.jpg",
        description: "Rap battle.",
        venue: "Secondary Stage / Arena",
        time: "TBA",
        rules: []
    },
    {
        title: "Swarsangam",
        slug: "band-war",
        category: "Band War",
        price: 600, // 200 per person * 3 (min)
        image: "/images/event/10.jpg",
        description: "Battle of the bands.",
        venue: "Main Stage",
        time: "TBA",
        rules: [],
        isTeam: true,
        minSize: 3,
        maxSize: 8
    },
    {
        title: "Bawaal", // Nukkad
        slug: "nukkad",
        category: "Nukkad",
        price: 0,
        image: "/images/event/19.jpg",
        description: "Street play competition.",
        venue: "Arena",
        time: "TBA",
        rules: [],
        isTeam: true,
        minSize: 8,
        maxSize: 20
    },
    {
        title: "Ekanki", // Monoact
        slug: "monoact",
        category: "Monoact",
        price: 0, // Blank in itinerary
        image: "/images/event/13.jpg",
        description: "Solo theatrical performance.",
        venue: "Secondary Stage / Arena",
        time: "TBA",
        rules: []
    },
    {
        title: "Skit",
        slug: "skit",
        category: "Skit",
        price: 0, // Blank
        image: "/images/event/19.jpg", // Placeholder (using Nukkad)
        description: "Group skit performance.",
        venue: "Main Stage / Auditorium / Secondary Stage",
        time: "TBA",
        rules: [],
        isTeam: true,
        minSize: 3,
        maxSize: 8
    },
    {
        title: "Mime",
        slug: "mime",
        category: "Mime",
        price: 0, // Blank
        image: "/images/event/21.jpg", // Placeholder (using Mimicry)
        description: "Silent acting.",
        venue: "Secondary Stage / Auditorium",
        time: "TBA",
        rules: [],
        isTeam: true, // Group/Solo. Can be both. Let's allow team.
        minSize: 1,
        maxSize: 6
    },
    {
        title: "Kirdaar", // Mimicry
        slug: "mimicry",
        category: "Mimicry",
        price: 0, // Blank
        image: "/images/event/21.jpg",
        description: "Imitate and entertain.",
        venue: "Secondary Stage / Arena / Auditorium",
        time: "TBA",
        rules: []
    },
    {
        title: "Marketing Mania",
        slug: "marketing-mania",
        category: "Business",
        price: 120, // 40 per person * 3. Itinerary says 40 per person.
        image: "/images/event/4.jpg",
        description: "Sell your ideas to the sharks.",
        venue: "Kalam Hall / Main Stage / Auditorium / LT-11",
        time: "TBA",
        rules: [],
        isTeam: true,
        minSize: 3, // Group
        maxSize: 5
    },
    {
        title: "Tehkikat",
        slug: "case-study",
        category: "Case Study",
        price: 100, // 50 per person * 2
        image: "/images/event/15.jpg",
        description: "Solve real world problems.",
        venue: "College Campus",
        time: "TBA",
        rules: [],
        isTeam: true,
        minSize: 2,
        maxSize: 4
    },
    {
        title: "Startup Auction",
        slug: "startup-auction",
        category: "Auction",
        price: 150, // 50 per person * 3
        image: "/images/event/25.jpg",
        description: "IPL style auction for Startups.",
        venue: "Auditorium / Main Stage",
        time: "TBA",
        rules: [],
        isTeam: true,
        minSize: 3,
        maxSize: 5
    },
    {
        title: "Startup Conclave",
        slug: "startup-conclave",
        category: "Business",
        price: 0, // Entry free if registered in other E-cell event. We can handle logic or just set 0.
        image: "/images/event/4.jpg", // Placeholder (using Marketing)
        description: "Networking and insights from industry leaders.",
        venue: "Auditorium",
        time: "TBA",
        rules: ["Entry free for participants registered in any other E-Cell event."]
    },
    {
        title: "Treasure Hunt",
        slug: "treasure-hunt",
        category: "Fun",
        price: 300,
        image: "/images/event/3.jpg",
        description: "Hunt for clues across the campus.",
        venue: "Campus",
        time: "TBA",
        rules: [],
        isTeam: true,
        minSize: 3,
        maxSize: 5
    },
    {
        title: "Tasveeron ki dastan",
        slug: "picture-story",
        category: "Picture Story",
        price: 100,
        image: "/images/event/5.jpg",
        description: "Weave a story through a series of pictures.",
        venue: "Campus",
        time: "TBA",
        rules: []
    },
    {
        title: "One to One Battle",
        slug: "dance-battle",
        category: "Dance",
        price: 250,
        image: "/images/event/6.jpg",
        description: "Face off in an epic dance battle.",
        venue: "Main Stage",
        time: "TBA",
        rules: []
    },
    {
        title: "Roobaroo",
        slug: "debate",
        category: "Debate",
        price: 150,
        image: "/images/event/7.jpg",
        description: "Voice your opinion.",
        venue: "LT / Hall",
        time: "TBA",
        rules: []
    },
    {
        title: "Rangmanch",
        slug: "open-stage",
        category: "Open Stage",
        price: 200,
        image: "/images/event/8.jpg",
        description: "The stage is yours.",
        venue: "Main Stage",
        time: "TBA",
        rules: []
    },
    {
        title: "Graffiti Extravanza",
        slug: "graffiti",
        category: "Art",
        price: 150,
        image: "/images/event/11.jpg",
        description: "Paint the walls with your imagination.",
        venue: "Wall Area",
        time: "TBA",
        rules: []
    },
    {
        title: "T-Shirt Painting",
        slug: "tshirt-painting",
        category: "Art",
        price: 200,
        image: "/images/event/14.jpg",
        description: "Design your own tee.",
        venue: "Garden",
        time: "TBA",
        rules: []
    },
    {
        title: "Mr/Miss Encore",
        slug: "pageant",
        category: "Pageant",
        price: 300,
        image: "/images/event/17.jpg",
        description: "The hunt for the face of Encore.",
        venue: "Main Stage",
        time: "TBA",
        rules: []
    },
    {
        title: "Safarnama",
        slug: "short-film",
        category: "Short Film",
        price: 300,
        image: "/images/event/24.jpg",
        description: "Short film making.",
        venue: "Online",
        time: "TBA",
        rules: [],
        isTeam: true,
        minSize: 2,
        maxSize: 10
    },
    {
        title: "Model United Nations",
        slug: "mun",
        category: "MUN",
        price: 500,
        image: "/images/event/26.jpg",
        description: "Mock UN session.",
        venue: "Conference Hall",
        time: "TBA",
        rules: [],
        isTeam: true,
        minSize: 1,
        maxSize: 2
    },
    {
        title: "Afsane",
        slug: "twist-a-tale",
        category: "Twist a Tale",
        price: 150,
        image: "/images/event/27.jpg",
        description: "Story writing with a twist.",
        venue: "Classroom",
        time: "TBA",
        rules: []
    },
    {
        title: "Jumla",
        slug: "jam",
        category: "JAM",
        price: 150,
        image: "/images/event/29.jpg",
        description: "Just a Minute.",
        venue: "Classroom",
        time: "TBA",
        rules: []
    }
];
