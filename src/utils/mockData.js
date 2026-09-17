// Comprehensive Mock Dataset for Commercial Animation Video Template Platform

export const CATEGORIES_DATA = [
  {
    id: 'cat_wedding',
    name: 'Wedding',
    icon: 'Heart',
    description: 'Cinematic royal invitations, save the dates, and receptions',
    subcategories: [
      { id: 'sub_wed_invitation', name: 'Wedding Invitation' },
      { id: 'sub_wed_engagement', name: 'Engagement Ceremony' },
      { id: 'sub_wed_reception', name: 'Reception & Gala' },
      { id: 'sub_wed_savethedate', name: 'Save The Date' },
      { id: 'sub_wed_sangeet', name: 'Sangeet & Haldi' },
    ]
  },
  {
    id: 'cat_birthday',
    name: 'Birthday',
    icon: 'Cake',
    description: 'Vibrant celebratory animations for all milestone ages',
    subcategories: [
      { id: 'sub_bday_kids', name: 'Kids Birthday' },
      { id: 'sub_bday_adult', name: 'Adult Birthday' },
      { id: 'sub_bday_milestone', name: 'Milestone (18th, 50th)' },
      { id: 'sub_bday_theme', name: 'Themed Parties' }
    ]
  },
  {
    id: 'cat_business',
    name: 'Business',
    icon: 'Briefcase',
    description: 'High-impact enterprise explainers, pitch decks, and promos',
    subcategories: [
      { id: 'sub_biz_promo', name: 'Company Profile Promo' },
      { id: 'sub_biz_explainer', name: 'Product Explainer' },
      { id: 'sub_biz_event', name: 'Conference & Summit' }
    ]
  },
  {
    id: 'cat_restaurant',
    name: 'Restaurant',
    icon: 'Utensils',
    description: 'Delectable food teasers, digital menus, and chef showcases',
    subcategories: [
      { id: 'sub_rest_menu', name: 'Digital Video Menu' },
      { id: 'sub_rest_opening', name: 'Grand Opening' },
      { id: 'sub_rest_offers', name: 'Seasonal Food Offers' }
    ]
  },
  {
    id: 'cat_realestate',
    name: 'Real Estate',
    icon: 'Building2',
    description: 'Luxury architectural fly-throughs, property listings, and sales',
    subcategories: [
      { id: 'sub_re_property', name: 'Luxury Villa Showcase' },
      { id: 'sub_re_agent', name: 'Agent Branding' },
      { id: 'sub_re_openhouse', name: 'Open House Invitation' }
    ]
  },
  {
    id: 'cat_corporate',
    name: 'Corporate',
    icon: 'Building',
    description: 'Formal keynote titles, annual summaries, and award ceremonies',
    subcategories: [
      { id: 'sub_corp_awards', name: 'Annual Awards Night' },
      { id: 'sub_corp_report', name: 'Fiscal Year Highlights' },
      { id: 'sub_corp_culture', name: 'Team & Culture' }
    ]
  },
  {
    id: 'cat_youtube',
    name: 'YouTube Intro',
    icon: 'PlaySquare',
    description: 'Dynamic cinematic channel openers and bumper sequences',
    subcategories: [
      { id: 'sub_yt_gaming', name: 'Gaming & Cyberpunk' },
      { id: 'sub_yt_tech', name: 'Tech & Minimalist' },
      { id: 'sub_yt_vlog', name: 'Lifestyle Vlog' }
    ]
  },
  {
    id: 'cat_logoreveal',
    name: 'Logo Reveal',
    icon: 'Sparkles',
    description: 'Gold particle bursts, 3D chrome extrusion, and hologram reveals',
    subcategories: [
      { id: 'sub_logo_gold', name: 'Gold Particle Elegance' },
      { id: 'sub_logo_neon', name: 'Neon Hologram' },
      { id: 'sub_logo_minimal', name: 'Minimalist Clean' }
    ]
  },
  {
    id: 'cat_festival',
    name: 'Festival',
    icon: 'PartyPopper',
    description: 'Celebratory holiday wishes for Diwali, Christmas, New Year & Eid',
    subcategories: [
      { id: 'sub_fest_diwali', name: 'Diwali & Lights' },
      { id: 'sub_fest_newyear', name: 'New Year Countdown' },
      { id: 'sub_fest_holiday', name: 'Season Greetings' }
    ]
  },
  {
    id: 'cat_invitation',
    name: 'Invitation',
    icon: 'MailOpen',
    description: 'VIP gala passes, baby showers, and anniversary commemorations',
    subcategories: [
      { id: 'sub_inv_babyshower', name: 'Baby Shower' },
      { id: 'sub_inv_anniversary', name: 'Silver & Gold Jubilee' },
      { id: 'sub_inv_vipgala', name: 'Private VIP Gala' }
    ]
  },
  {
    id: 'cat_education',
    name: 'Education',
    icon: 'GraduationCap',
    description: 'Course launches, graduation montages, and academy promos',
    subcategories: [
      { id: 'sub_edu_course', name: 'Online Masterclass Promo' },
      { id: 'sub_edu_grad', name: 'Graduation Tribute' }
    ]
  },
  {
    id: 'cat_medical',
    name: 'Medical',
    icon: 'Stethoscope',
    description: 'Healthcare clinics, wellness summits, and doctor profiles',
    subcategories: [
      { id: 'sub_med_clinic', name: 'Hospital & Clinic Tour' },
      { id: 'sub_med_health', name: 'Wellness Awareness' }
    ]
  },
  {
    id: 'cat_socialmedia',
    name: 'Social Media',
    icon: 'Share2',
    description: 'High-conversion Instagram Reels, TikTok hooks, and Stories',
    subcategories: [
      { id: 'sub_sm_reels', name: 'Viral Story & Reel 9:16' },
      { id: 'sub_sm_quotes', name: 'Kinetic Quotes' }
    ]
  },
  {
    id: 'cat_marketing',
    name: 'Marketing',
    icon: 'TrendingUp',
    description: 'Flash sale countdowns, product launches, and brand awareness',
    subcategories: [
      { id: 'sub_mkt_flashsale', name: 'Flash Sale Teaser' },
      { id: 'sub_mkt_product', name: 'New Release Reveal' }
    ]
  },
  {
    id: 'cat_custom',
    name: 'Custom Categories',
    icon: 'Layers',
    description: 'Bespoke animation frameworks designed for specialized events',
    subcategories: [
      { id: 'sub_cust_bespoke', name: 'Bespoke Hologram Edition' },
      { id: 'sub_cust_art', name: 'Art Exhibition' }
    ]
  }
];

export const HOMEPAGE_BANNERS = [
  {
    id: 'banner_01',
    title: 'The Royal Sovereign Collection',
    tagline: 'Grand Cinematic Wedding & Royal Invitation Animations',
    ctaText: 'Explore Wedding Suite',
    link: '/templates?category=cat_wedding',
    badge: 'Featured Season Exclusive',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    bgGradient: 'from-amber-950/60 via-obsidian to-black'
  },
  {
    id: 'banner_02',
    title: 'Cyberpunk & Gold 3D Logo Reveals',
    tagline: 'Transform your brand mark into a studio-grade CGI sequence in seconds',
    ctaText: 'View Logo Reveals',
    link: '/templates?category=cat_logoreveal',
    badge: 'Trending Enterprise',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    bgGradient: 'from-blue-950/60 via-obsidian to-black'
  },
  {
    id: 'banner_03',
    title: 'Kinetic Restaurant Video Menus',
    tagline: 'Entice diners with high-framerate dynamic food animations',
    ctaText: 'Discover Food Menus',
    link: '/templates?category=cat_restaurant',
    badge: 'High Conversion',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    bgGradient: 'from-rose-950/60 via-obsidian to-black'
  }
];

export const TEMPLATES_DATA = [
  {
    id: 'tpl_wed_001',
    title: 'Royal Heritage Sovereign Invitation',
    category: 'cat_wedding',
    categoryName: 'Wedding',
    subcategory: 'sub_wed_invitation',
    subcategoryName: 'Wedding Invitation',
    price: 499,
    isPremium: true,
    currency: '₹',
    duration: '0:25',
    resolution: '1080x1920 (FHD)',
    orientation: '9:16',
    views: 18450,
    downloads: 3240,
    rating: 4.9,
    keywords: ['wedding', 'invitation', 'royal', 'gold', 'heritage', 'luxury', 'indian wedding'],
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: 'An opulent royal palace themed animated wedding invitation featuring velvet gold dust transitions, 3D floating filigree, and authentic cinematic orchestration.',
    features: [
      'Full HD 1080x1920 Mobile-Optimized Output',
      'Original Royal Sitar & Orchestra Audio Track',
      'Dynamic Couple Photo Slot with Zoom/Pan Alignment',
      'Customizable Event Timings, Venue & Names'
    ],
    editableFields: [
      {
        id: 'couple_photo',
        type: 'image',
        label: 'Couple Portrait Photo',
        description: 'High-resolution photo of the couple. Centered in royal gold frame.',
        required: true,
        editable: true,
        defaultAsset: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop',
        recommendedWidth: 1080,
        recommendedHeight: 1350,
        aspectRatio: '4:5'
      },
      {
        id: 'bride_groom_names',
        type: 'text',
        label: 'Couple Names',
        description: 'Enter names to appear on the central royal crest.',
        required: true,
        editable: true,
        defaultValue: 'Aarav & Meera',
        maxChars: 40,
        allowFontSelection: true,
        allowColorSelection: false
      },
      {
        id: 'event_date',
        type: 'date',
        label: 'Auspicious Date',
        description: 'Formatted date of the wedding celebration.',
        required: true,
        editable: true,
        defaultValue: '2026-11-24'
      },
      {
        id: 'venue_location',
        type: 'text',
        label: 'Palace Venue / City',
        description: 'Location of the ceremonial wedding banquet.',
        required: false,
        editable: true,
        defaultValue: 'Umaid Bhawan Palace, Jodhpur',
        maxChars: 60,
        allowFontSelection: false,
        allowColorSelection: false
      }
    ]
  },
  {
    id: 'tpl_bday_001',
    title: 'Golden Confetti Birthday Extravaganza',
    category: 'cat_birthday',
    categoryName: 'Birthday',
    subcategory: 'sub_bday_milestone',
    subcategoryName: 'Milestone (18th, 50th)',
    price: 0,
    isPremium: false,
    currency: '₹',
    duration: '0:15',
    resolution: '1080x1920 (FHD)',
    orientation: '9:16',
    views: 42100,
    downloads: 12890,
    rating: 4.8,
    keywords: ['birthday', 'party', 'confetti', 'free', 'milestone', 'celebration'],
    thumbnail: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description: 'Vibrant celebratory explosion of 3D gold balloons, glowing sparkles, and bouncy typography. Perfect for Instagram Stories and WhatsApp statuses.',
    features: [
      'Zero Cost — 100% Free Template',
      '3D Floating Mylar Balloon Numbers',
      'Party Photo Frame with Interactive Crop/Zoom',
      'Upbeat Celebration Brass Music'
    ],
    editableFields: [
      {
        id: 'birthday_photo',
        type: 'image',
        label: 'Celebrant Portrait Photo',
        description: 'Portrait of the birthday star.',
        required: true,
        editable: true,
        defaultAsset: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
        recommendedWidth: 800,
        recommendedHeight: 800,
        aspectRatio: '1:1'
      },
      {
        id: 'celebrant_name',
        type: 'text',
        label: 'Birthday Star Name',
        description: 'First name or nickname.',
        required: true,
        editable: true,
        defaultValue: 'Siddharth',
        maxChars: 25,
        allowFontSelection: true,
        allowColorSelection: true
      },
      {
        id: 'turning_age',
        type: 'text',
        label: 'Turning Age (e.g. 25th)',
        description: 'Milestone number.',
        required: true,
        editable: true,
        defaultValue: '25th',
        maxChars: 10,
        allowFontSelection: false,
        allowColorSelection: false
      }
    ]
  },
  {
    id: 'tpl_logo_001',
    title: 'Molten Gold Liquid Metal Logo Reveal',
    category: 'cat_logoreveal',
    categoryName: 'Logo Reveal',
    subcategory: 'sub_logo_gold',
    subcategoryName: 'Gold Particle Elegance',
    price: 799,
    isPremium: true,
    currency: '₹',
    duration: '0:10',
    resolution: '3840x2160 (4K UHD)',
    orientation: '16:9',
    views: 29800,
    downloads: 5120,
    rating: 5.0,
    keywords: ['logo', 'reveal', 'intro', 'gold', '4k', 'metal', 'luxury', 'corporate'],
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    description: 'Hollywood cinema-grade logo bumper featuring photorealistic liquid gold pouring onto obsidian stone, coalescing into your brand insignia.',
    features: [
      'Ultra HD 4K 60 FPS Export',
      'Dynamic Alpha Transparency Support',
      'Sub-Bass Impact Sound Design included',
      'Commercial License for YouTube & Television'
    ],
    editableFields: [
      {
        id: 'brand_logo',
        type: 'image',
        label: 'Brand Logo (PNG with transparent background)',
        description: 'Upload your vector/PNG logo to be extruded in liquid gold.',
        required: true,
        editable: true,
        defaultAsset: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?q=80&w=800&auto=format&fit=crop',
        recommendedWidth: 1024,
        recommendedHeight: 1024,
        aspectRatio: '1:1'
      },
      {
        id: 'brand_tagline',
        type: 'text',
        label: 'Company Tagline',
        description: 'Appears below logo with glowing metallic foil sheen.',
        required: false,
        editable: true,
        defaultValue: 'Elegance in Every Frame',
        maxChars: 50,
        allowFontSelection: true,
        allowColorSelection: false
      }
    ]
  },
  {
    id: 'tpl_rest_001',
    title: 'Artisan Gourmet Sizzle Menu Promo',
    category: 'cat_restaurant',
    categoryName: 'Restaurant',
    subcategory: 'sub_rest_menu',
    subcategoryName: 'Digital Video Menu',
    price: 399,
    isPremium: true,
    currency: '₹',
    duration: '0:20',
    resolution: '1080x1080 (Square Post)',
    orientation: '1:1',
    views: 14200,
    downloads: 2180,
    rating: 4.7,
    keywords: ['restaurant', 'food', 'menu', 'chef', 'cafe', 'bar', 'specials'],
    thumbnail: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    description: 'Dynamic kinetic food showcase with fast-paced cuts, steam effects, dish hero shots, and pricing stickers for culinary venues.',
    features: [
      'Optimized for Instagram Reels & Digital Signage',
      'Two Hero Dish Photo Slots with Fine Positioning',
      'Configurable Special Price Callouts'
    ],
    editableFields: [
      {
        id: 'signature_dish_img',
        type: 'image',
        label: 'Signature Dish Photo',
        description: 'Crisp, appetizing shot of your top delicacy.',
        required: true,
        editable: true,
        defaultAsset: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
        recommendedWidth: 1080,
        recommendedHeight: 1080,
        aspectRatio: '1:1'
      },
      {
        id: 'restaurant_name',
        type: 'text',
        label: 'Restaurant / Bistro Name',
        description: 'Brand identity header.',
        required: true,
        editable: true,
        defaultValue: 'Osteria Del Sole',
        maxChars: 30,
        allowFontSelection: true,
        allowColorSelection: false
      },
      {
        id: 'special_offer_text',
        type: 'text',
        label: 'Weekend Special Callout',
        description: 'Headline teaser (e.g. 20% Off Chef Tasting Menu).',
        required: true,
        editable: true,
        defaultValue: 'Chef Tasting Menu • This Weekend Only',
        maxChars: 50,
        allowFontSelection: false,
        allowColorSelection: true
      }
    ]
  },
  {
    id: 'tpl_re_001',
    title: 'Architectural Panorama Luxury Estate',
    category: 'cat_realestate',
    categoryName: 'Real Estate',
    subcategory: 'sub_re_property',
    subcategoryName: 'Luxury Villa Showcase',
    price: 699,
    isPremium: true,
    currency: '₹',
    duration: '0:30',
    resolution: '1920x1080 (Landscape)',
    orientation: '16:9',
    views: 19100,
    downloads: 3840,
    rating: 4.9,
    keywords: ['real estate', 'property', 'villa', 'architecture', 'luxury home', 'agent'],
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    description: 'Smooth cinematic camera glide through upscale modern property with sleek feature lower thirds, floor plan highlights, and broker contact info.',
    features: [
      'High-Definition 16:9 Landscape YouTube Presentation',
      'Three Feature Specs Badges (SqFt, Beds, Baths)',
      'Agent Portrait & Direct Phone / WhatsApp Callout'
    ],
    editableFields: [
      {
        id: 'villa_exterior',
        type: 'image',
        label: 'Property Exterior Photo',
        description: 'Main listing hero image.',
        required: true,
        editable: true,
        defaultAsset: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop',
        recommendedWidth: 1920,
        recommendedHeight: 1080,
        aspectRatio: '16:9'
      },
      {
        id: 'property_title',
        type: 'text',
        label: 'Property Name / Address',
        description: 'Listing headline.',
        required: true,
        editable: true,
        defaultValue: 'The Glass Pavilion • Beverly Hills, CA',
        maxChars: 45,
        allowFontSelection: true,
        allowColorSelection: false
      },
      {
        id: 'asking_price',
        type: 'text',
        label: 'Listing Price',
        description: 'Sale or lease valuation.',
        required: true,
        editable: true,
        defaultValue: '$4,850,000 / ₹40.5 Cr',
        maxChars: 25,
        allowFontSelection: false,
        allowColorSelection: true
      },
      {
        id: 'agent_contact',
        type: 'text',
        label: 'Agent Name & Phone',
        description: 'Direct inquiry contact.',
        required: true,
        editable: true,
        defaultValue: 'Prestige Realty • +91 98765 43210',
        maxChars: 40,
        allowFontSelection: false,
        allowColorSelection: false
      }
    ]
  },
  {
    id: 'tpl_corp_001',
    title: 'Monolith Executive Annual Summit',
    category: 'cat_corporate',
    categoryName: 'Corporate',
    subcategory: 'sub_corp_awards',
    subcategoryName: 'Annual Awards Night',
    price: 0,
    isPremium: false,
    currency: '₹',
    duration: '0:18',
    resolution: '1920x1080 (Landscape)',
    orientation: '16:9',
    views: 31200,
    downloads: 9400,
    rating: 4.6,
    keywords: ['corporate', 'business', 'awards', 'keynote', 'free', 'conference'],
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    description: 'Sleek executive motion graphics with frosted crystal polygons, dark chrome typography, and corporate award winner showcase.',
    features: [
      '100% Free Corporate Starter Template',
      'Corporate Keynote Opener with Dynamic Sponsor Slots',
      'Sophisticated Deep Blue & Silver Accents'
    ],
    editableFields: [
      {
        id: 'corp_logo',
        type: 'image',
        label: 'Company Logo',
        description: 'Enterprise logo placed in center crystal shield.',
        required: true,
        editable: true,
        defaultAsset: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=800&auto=format&fit=crop',
        recommendedWidth: 600,
        recommendedHeight: 600,
        aspectRatio: '1:1'
      },
      {
        id: 'event_title',
        type: 'text',
        label: 'Summit / Awards Title',
        description: 'Headline for conference.',
        required: true,
        editable: true,
        defaultValue: 'Apex Global Leadership Summit 2026',
        maxChars: 50,
        allowFontSelection: true,
        allowColorSelection: false
      },
      {
        id: 'conference_dates',
        type: 'text',
        label: 'Date & City',
        description: 'Schedule banner.',
        required: true,
        editable: true,
        defaultValue: 'October 14-16 • Singapore Grand Hyatt',
        maxChars: 45,
        allowFontSelection: false,
        allowColorSelection: false
      }
    ]
  },
  {
    id: 'tpl_fest_001',
    title: 'Luminescence Diwali Festival of Lights',
    category: 'cat_festival',
    categoryName: 'Festival',
    subcategory: 'sub_fest_diwali',
    subcategoryName: 'Diwali & Lights',
    price: 299,
    isPremium: true,
    currency: '₹',
    duration: '0:18',
    resolution: '1080x1920 (FHD)',
    orientation: '9:16',
    views: 38900,
    downloads: 8750,
    rating: 4.9,
    keywords: ['festival', 'diwali', 'deepavali', 'lights', 'greetings', 'wishes', 'fireworks'],
    thumbnail: 'https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: 'Radiant animated earthen diyas floating over lotus mandala patterns with cascading golden sparklers and personalized family greetings.',
    features: [
      'Glow-Enhanced Traditional Diya Fire Simulation',
      'Personal Family Photo or Brand Logo Placement',
      'Sanskrit Shloka / Blessing Audio Integration'
    ],
    editableFields: [
      {
        id: 'family_photo',
        type: 'image',
        label: 'Family or Brand Photo',
        description: 'Photo placed inside glowing diya garland.',
        required: false,
        editable: true,
        defaultAsset: 'https://images.unsplash.com/photo-1609137144820-221227092892?q=80&w=800&auto=format&fit=crop',
        recommendedWidth: 800,
        recommendedHeight: 800,
        aspectRatio: '1:1'
      },
      {
        id: 'greeting_sender',
        type: 'text',
        label: 'Wishes From (Family / Company)',
        description: 'Sign-off text.',
        required: true,
        editable: true,
        defaultValue: 'Warm Wishes From Sharma & Associates',
        maxChars: 45,
        allowFontSelection: true,
        allowColorSelection: true
      }
    ]
  },
  {
    id: 'tpl_inv_001',
    title: 'Celestia Starlight Baby Shower',
    category: 'cat_invitation',
    categoryName: 'Invitation',
    subcategory: 'sub_inv_babyshower',
    subcategoryName: 'Baby Shower',
    price: 299,
    isPremium: true,
    currency: '₹',
    duration: '0:20',
    resolution: '1080x1920 (FHD)',
    orientation: '9:16',
    views: 16700,
    downloads: 3410,
    rating: 4.8,
    keywords: ['baby shower', 'invitation', 'baby', 'parents', 'clouds', 'cute', 'stars'],
    thumbnail: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description: 'Dreamy soft pastel clouds with glittering gold starlight, floating hot air balloons, and gentle lullaby chime music.',
    features: [
      'Gentle Pastel Palette with Gold Stardust Accent',
      'Mom-to-Be or Ultrasound Keepsake Frame',
      'RSVP & Registry Details Card'
    ],
    editableFields: [
      {
        id: 'mom_photo',
        type: 'image',
        label: 'Mom-to-Be Photo',
        description: 'Portrait for the cloud crescent moon frame.',
        required: true,
        editable: true,
        defaultAsset: 'https://images.unsplash.com/photo-1544126592-807daa2b567b?q=80&w=800&auto=format&fit=crop',
        recommendedWidth: 800,
        recommendedHeight: 800,
        aspectRatio: '1:1'
      },
      {
        id: 'baby_announcement',
        type: 'text',
        label: 'Announcement Title',
        description: 'Headline.',
        required: true,
        editable: true,
        defaultValue: 'A Little Star is on the Way!',
        maxChars: 40,
        allowFontSelection: true,
        allowColorSelection: false
      },
      {
        id: 'party_details',
        type: 'text',
        label: 'Date & Brunch Location',
        description: 'Gathering address.',
        required: true,
        editable: true,
        defaultValue: 'Sunday, Oct 18 at 11:30 AM • The Glasshouse Cafe',
        maxChars: 60,
        allowFontSelection: false,
        allowColorSelection: false
      }
    ]
  },
  {
    id: 'tpl_yt_001',
    title: 'Cyberpunk Neon Matrix Gaming Intro',
    category: 'cat_youtube',
    categoryName: 'YouTube Intro',
    subcategory: 'sub_yt_gaming',
    subcategoryName: 'Gaming & Cyberpunk',
    price: 0,
    isPremium: false,
    currency: '₹',
    duration: '0:08',
    resolution: '1920x1080 (Landscape)',
    orientation: '16:9',
    views: 52300,
    downloads: 14800,
    rating: 4.9,
    keywords: ['youtube', 'intro', 'gaming', 'cyberpunk', 'neon', 'glitch', 'free'],
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: 'Electrifying futuristic synthwave laser tunnel with glitch distortion audio, gamer tag reveal, and social media handle popups.',
    features: [
      '100% Free Streamer Intro Template',
      'Audio-Reactive Bass Drop Shockwaves',
      'Editable Gamer Tag & Subtitle Handle'
    ],
    editableFields: [
      {
        id: 'gamer_tag',
        type: 'text',
        label: 'Gamer Tag / Channel Name',
        description: 'Primary neon glowing channel title.',
        required: true,
        editable: true,
        defaultValue: 'CYBERVORTEX',
        maxChars: 20
      }
    ]
  },
  {
    id: 'tpl_biz_001',
    title: 'Minimalist SaaS Product Platform Teaser',
    category: 'cat_business',
    categoryName: 'Business',
    subcategory: 'sub_biz_explainer',
    subcategoryName: 'Product Explainer',
    price: 499,
    isPremium: true,
    currency: '₹',
    duration: '0:25',
    resolution: '3840x2160 (4K UHD)',
    orientation: '16:9',
    views: 24100,
    downloads: 4120,
    rating: 4.9,
    keywords: ['business', 'saas', 'tech', 'software', 'app', 'startup', 'explainer'],
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    description: 'Clean modern Silicon Valley style motion explainer with 3D floating dashboard panels, fluid cursor gestures, and metric callouts.',
    features: [
      'Ultra HD 4K Crisp Modern Render',
      'Interactive Dashboard Mockup Slot',
      'Key Metric Growth Stat Animations'
    ],
    editableFields: [
      {
        id: 'product_name',
        type: 'text',
        label: 'Platform Name',
        description: 'Your product or company moniker.',
        required: true,
        editable: true,
        defaultValue: 'AuraCloud AI',
        maxChars: 25
      }
    ]
  },
  {
    id: 'tpl_wed_002',
    title: 'Marigold Blossom Haldi & Sangeet Reel',
    category: 'cat_wedding',
    categoryName: 'Wedding',
    subcategory: 'sub_wed_invitation',
    subcategoryName: 'Wedding Invitation',
    price: 299,
    isPremium: true,
    currency: '₹',
    duration: '0:20',
    resolution: '1080x1920 (FHD)',
    orientation: '9:16',
    views: 31800,
    downloads: 6240,
    rating: 4.9,
    keywords: ['wedding', 'haldi', 'sangeet', 'mehendi', 'marigold', 'indian wedding', 'invitation'],
    thumbnail: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description: 'Bright sunlit yellow marigold floral garlands floating in slow motion with traditional dhol rhythms and cheerful family event cards.',
    features: [
      '9:16 Vertical Story Optimized for WhatsApp & Instagram',
      'Traditional Dhol Beats & Festive Audio',
      'Bride & Groom Ceremony Slot'
    ],
    editableFields: [
      {
        id: 'ceremony_names',
        type: 'text',
        label: 'Couple Names',
        description: 'Bride and groom ceremony names.',
        required: true,
        editable: true,
        defaultValue: 'Rohan & Ananya',
        maxChars: 35
      }
    ]
  },
  {
    id: 'tpl_bday_002',
    title: 'Neon Glow Synthwave Arcade Party Invite',
    category: 'cat_birthday',
    categoryName: 'Birthday',
    subcategory: 'sub_bday_milestone',
    subcategoryName: 'Milestone (18th, 50th)',
    price: 199,
    isPremium: true,
    currency: '₹',
    duration: '0:15',
    resolution: '1080x1080 (Square Post)',
    orientation: '1:1',
    views: 19400,
    downloads: 3890,
    rating: 4.8,
    keywords: ['birthday', 'arcade', 'neon', 'party', 'square', 'instagram post'],
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    description: 'Square 1:1 Instagram post animated with glowing magenta and cyan neon wires, retro joystick graphics, and pulsing club beats.',
    features: [
      '1:1 Square Feed Post Ready for Socials',
      'Vibrant Retro 80s Club Lighting',
      'Party Location & Time Cards'
    ],
    editableFields: [
      {
        id: 'birthday_hero',
        type: 'text',
        label: 'Celebrant Name',
        description: 'Name on the neon billboard.',
        required: true,
        editable: true,
        defaultValue: 'Kabir Turns 21',
        maxChars: 25
      }
    ]
  },
  {
    id: 'tpl_fest_002',
    title: 'Crescent Moon & Mosque Eid Mubarak Greeting',
    category: 'cat_festival',
    categoryName: 'Festival',
    subcategory: 'sub_fest_holiday',
    subcategoryName: 'Season Greetings',
    price: 0,
    isPremium: false,
    currency: '₹',
    duration: '0:16',
    resolution: '1080x1920 (FHD)',
    orientation: '9:16',
    views: 45200,
    downloads: 11200,
    rating: 5.0,
    keywords: ['festival', 'eid', 'mubarak', 'ramadan', 'crescent', 'moon', 'free'],
    thumbnail: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    description: 'Silvery moonlight illuminating an ornate golden filigree crescent with gently swaying brass lanterns and peaceful serene ambient strings.',
    features: [
      '100% Free Festival Greeting Card',
      'Atmospheric Starry Night Sky & 3D Crescent',
      'Personalized Warm Blessings Text'
    ],
    editableFields: [
      {
        id: 'eid_sender',
        type: 'text',
        label: 'Greeting From',
        description: 'Sender name or family greeting.',
        required: true,
        editable: true,
        defaultValue: 'The Qureshi Family',
        maxChars: 30
      }
    ]
  },
  {
    id: 'tpl_logo_002',
    title: 'Electric Violet Nebula Smoke Logo Reveal',
    category: 'cat_logoreveal',
    categoryName: 'Logo Reveal',
    subcategory: 'sub_logo_neon',
    subcategoryName: 'Neon Hologram',
    price: 599,
    isPremium: true,
    currency: '₹',
    duration: '0:12',
    resolution: '3840x2160 (4K UHD)',
    orientation: '16:9',
    views: 28300,
    downloads: 4920,
    rating: 4.9,
    keywords: ['logo', 'reveal', 'nebula', 'smoke', 'electric', 'violet', '4k'],
    thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    description: 'Deep ultraviolet volumetric smoke vortex spiraling into a high-energy particle spark that etches your company emblem into existence.',
    features: [
      'Cinema 4K Resolution 60fps Master',
      'Rich Stereo Impact & Whoosh Audio',
      'Instant Alpha Background Transparency'
    ],
    editableFields: [
      {
        id: 'logo_title',
        type: 'text',
        label: 'Company Name',
        description: 'Brand title appearing on final resolve.',
        required: true,
        editable: true,
        defaultValue: 'NEBULA STUDIOS',
        maxChars: 25
      }
    ]
  },
  {
    id: 'tpl_rest_002',
    title: 'Velvet Espresso & Artisan Bakery Launch',
    category: 'cat_restaurant',
    categoryName: 'Restaurant',
    subcategory: 'sub_rest_opening',
    subcategoryName: 'Grand Opening',
    price: 249,
    isPremium: true,
    currency: '₹',
    duration: '0:18',
    resolution: '1080x1920 (FHD)',
    orientation: '9:16',
    views: 18900,
    downloads: 2980,
    rating: 4.8,
    keywords: ['cafe', 'coffee', 'bakery', 'restaurant', 'espresso', 'opening', 'reel'],
    thumbnail: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: 'Moody slow-motion pour of rich espresso crema, warm flaky croissants, and sleek aesthetic typography for specialty roasters.',
    features: [
      'Sensory Macro Video Shots with Acoustic Jazz Track',
      'Instagram Story / Reel Standard 9:16',
      'Grand Opening Date & Location Badge'
    ],
    editableFields: [
      {
        id: 'cafe_name',
        type: 'text',
        label: 'Cafe / Roastery Name',
        description: 'Brand name on coffee cup sleeve.',
        required: true,
        editable: true,
        defaultValue: 'Roast & Revel Cafe',
        maxChars: 30
      }
    ]
  },
  {
    id: 'tpl_inv_002',
    title: 'Golden Sunset Griha Pravesh Housewarming',
    category: 'cat_invitation',
    categoryName: 'Invitation',
    subcategory: 'sub_inv_anniversary',
    subcategoryName: 'Private VIP Gala',
    price: 299,
    isPremium: true,
    currency: '₹',
    duration: '0:20',
    resolution: '1080x1080 (Square Post)',
    orientation: '1:1',
    views: 22100,
    downloads: 3940,
    rating: 4.9,
    keywords: ['housewarming', 'griha pravesh', 'invitation', 'new home', 'puja', 'square'],
    thumbnail: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description: 'Auspicious Kalash and Diya animation with soft golden home lighting, Sanskrit blessings, and clear address details for new home puja.',
    features: [
      'Balanced 1:1 Square Post for WhatsApp & Instagram',
      'Sacred Vedic Flute Audio Background',
      'Host Family Names, Time & Google Maps QR Area'
    ],
    editableFields: [
      {
        id: 'home_owners',
        type: 'text',
        label: 'Family Hosts',
        description: 'Names welcoming guests to new home.',
        required: true,
        editable: true,
        defaultValue: 'Sunil & Priya Verma',
        maxChars: 40
      }
    ]
  },
  {
    id: 'tpl_biz_002',
    title: 'Elevate Fitness & Athletic Studio Promo',
    category: 'cat_business',
    categoryName: 'Business',
    subcategory: 'sub_biz_promo',
    subcategoryName: 'Company Profile Promo',
    price: 349,
    isPremium: true,
    currency: '₹',
    duration: '0:15',
    resolution: '1080x1080 (Square Post)',
    orientation: '1:1',
    views: 26800,
    downloads: 4720,
    rating: 4.9,
    keywords: ['fitness', 'gym', 'workout', 'promo', 'square', 'instagram post', 'business'],
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    description: 'High-energy kinetic gym promo featuring fast-paced workout cuts, neon typography, and membership promotional callouts.',
    features: [
      'Square 1:1 High-Conversion Post Format',
      'Punchy Trap Bass Music Track Included',
      'Offer Callout & Gym Location Banner'
    ],
    editableFields: [
      {
        id: 'gym_name',
        type: 'text',
        label: 'Studio / Gym Name',
        description: 'Brand title.',
        required: true,
        editable: true,
        defaultValue: 'Titan Crossfit Club',
        maxChars: 30
      }
    ]
  }
];

export const MOCK_USER = {
  id: 'usr_patron_001',
  name: 'Alexander Wright',
  email: 'patron@meridian.io',
  phone: '+91 98765 43210',
  role: 'patron',
  createdAt: '2025-08-15'
};

export const INITIAL_USER_PURCHASES = [
  {
    id: 'pur_109284',
    templateId: 'tpl_wed_001',
    templateTitle: 'Royal Heritage Sovereign Invitation',
    categoryName: 'Wedding',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
    amount: 499,
    currency: '₹',
    purchaseDate: '2026-09-02',
    transactionId: 'TXN_MERIDIAN_8849201',
    paymentMethod: 'UPI • Google Pay',
    paymentStatus: 'COMPLETED',
    accessStatus: 'ACTIVE',
    invoiceUrl: '#'
  },
  {
    id: 'pur_109312',
    templateId: 'tpl_logo_001',
    templateTitle: 'Molten Gold Liquid Metal Logo Reveal',
    categoryName: 'Logo Reveal',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    amount: 799,
    currency: '₹',
    purchaseDate: '2026-09-10',
    transactionId: 'TXN_MERIDIAN_9921048',
    paymentMethod: 'HDFC Credit Card (•••• 8219)',
    paymentStatus: 'COMPLETED',
    accessStatus: 'ACTIVE',
    invoiceUrl: '#'
  }
];

export const INITIAL_USER_VIDEOS = [
  {
    id: 'vid_gen_001',
    templateId: 'tpl_wed_001',
    templateName: 'Royal Heritage Sovereign Invitation',
    category: 'Wedding',
    status: 'COMPLETED',
    isWatermarked: false,
    createdAt: '2026-09-12 14:32',
    duration: '0:25',
    resolution: '1080x1920 (FHD)',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    changes: {
      bride_groom_names: 'Kabir & Ananya',
      event_date: '2026-12-18',
      venue_location: 'The Oberoi Rajvilas, Jaipur'
    }
  },
  {
    id: 'vid_gen_002',
    templateId: 'tpl_bday_001',
    templateName: 'Golden Confetti Birthday Extravaganza',
    category: 'Birthday',
    status: 'COMPLETED',
    isWatermarked: false,
    createdAt: '2026-09-14 18:05',
    duration: '0:15',
    resolution: '1080x1920 (FHD)',
    thumbnail: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    changes: {
      celebrant_name: 'Zoya',
      turning_age: '18th'
    }
  }
];

export const FAQ_ITEMS = [
  {
    q: 'How does template purchasing work? Is there a subscription?',
    a: 'We operate on a strictly per-template purchase model. There are no monthly or yearly subscriptions. You pay only for the individual templates you wish to use, and free templates are available at zero cost.'
  },
  {
    q: 'Can I test my video before paying?',
    a: 'Yes! You can customize any template and generate a Watermarked Test Preview for free to inspect your photos, text, and positioning before completing checkout.'
  },
  {
    q: 'Can I change the animation timing or effects?',
    a: 'To guarantee cinema-grade visual fidelity and flawless audio synchronization, the core animations, camera sweeps, and motion effects are locked to the master template. You personalize content only (photos, logos, texts, dates).'
  },
  {
    q: 'What resolution are the downloaded videos?',
    a: 'Templates are exported in studio-grade Full HD (1080x1920 vertical or 1920x1080 landscape) or 4K Ultra HD at 60 frames per second with H.264 video encoding.'
  },
  {
    q: 'Where do I find my purchased templates and rendered videos?',
    a: 'All past purchases are permanently accessible in "My Purchases", and all generated video files can be previewed or re-downloaded at any time from "My Videos".'
  }
];
