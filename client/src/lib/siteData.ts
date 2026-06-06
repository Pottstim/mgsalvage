// ─────────────────────────────────────────────────────────────────────────────
// COMPANY DATA — TODO: Replace all placeholder values with real business data
// ─────────────────────────────────────────────────────────────────────────────
export const COMPANY = {
  name: "MG Salvage",
  // ⚠️ CRITICAL: (919) 555-0123 is a FICTIONAL placeholder.
  // 555 numbers do not connect to real lines. Replace with your actual
  // business phone number BEFORE deploying or customers cannot reach you.
  // Update phoneRaw to match (digits only, no formatting).
  phone: "(919) 555-0123",
  phoneRaw: "9195550123",
  // TODO: Replace with your real business email
  email: "info@mgsalvage.com",
  address: "Sanford, NC",
  fullAddress: "Sanford, NC 27330",
  hours: "Mon–Sat: 8AM–6PM",
  tagline: "Fast Cash for Junk Cars. Free Towing. Same-Day Pickup.",
  description: "MG Salvage is a professional salvage and vehicle acquisition company headquartered in Sanford, NC. We buy junk, damaged, and unwanted vehicles from consumers and businesses across central North Carolina.",
  founded: "2020",
  vehiclesPurchased: "2,500+",
  serviceRadius: "50-mile",
  // TODO: Replace with your actual Google Business Profile review link
  googleBusinessUrl: "https://g.page/r/mgsalvage/review",
};

export const SERVICE_AREAS = [
  {
    slug: "sanford",
    name: "Sanford",
    state: "NC",
    county: "Lee County",
    description: "Headquartered in Sanford, MG Salvage is your local junk car buyer. We serve every corner of Lee County. From downtown Sanford near the historic Temple Theatre to neighborhoods off US-1 and NC-87. Same-day pickup, free towing, and cash on the spot.",
    highlights: ["Same-day pickup available", "Local headquarters in Lee County", "Serving all Sanford neighborhoods"],
  },
  {
    slug: "fayetteville",
    name: "Fayetteville",
    state: "NC",
    county: "Cumberland County",
    description: "MG Salvage provides fast junk car removal throughout Fayetteville and Cumberland County. From Hope Mills and Spring Lake to downtown near Market House and the Cross Creek area. Free towing, cash on the spot, and military-family friendly service.",
    highlights: ["Free towing across Cumberland County", "Cash paid on pickup", "Serving Fort Liberty families"],
  },
  {
    slug: "pittsboro",
    name: "Pittsboro",
    state: "NC",
    county: "Chatham County",
    description: "Serving Pittsboro and Chatham County. From the historic courthouse circle to the growing Chatham Park corridor and communities near Jordan Lake. MG Salvage makes selling your junk car simple: free estimate, scheduled pickup, cash same day.",
    highlights: ["Chatham County coverage", "Near Hwy 64 & 15-501 corridors", "Jordan Lake area pickups"],
  },
  {
    slug: "carthage",
    name: "Carthage",
    state: "NC",
    county: "Moore County",
    description: "MG Salvage serves Carthage and Moore County with reliable junk car removal. From downtown Carthage near the historic courthouse to areas around Pinehurst, Aberdeen, and Southern Pines. We buy vehicles in any condition with free towing.",
    highlights: ["Moore County service area", "All vehicle conditions accepted", "Free estimates and pickup"],
  },
  {
    slug: "lillington",
    name: "Lillington",
    state: "NC",
    county: "Harnett County",
    description: "Serving Lillington and Harnett County. From the Cape Fear River area to neighborhoods along US-401 and NC-210. MG Salvage offers fair cash offers, free towing, and professional service for selling your junk car quickly and easily.",
    highlights: ["Harnett County coverage", "Fair market offers", "Professional and reliable"],
  },
  {
    slug: "apex",
    name: "Apex",
    state: "NC",
    county: "Wake County",
    description: "MG Salvage provides fast junk car removal throughout Apex, named the #3 best small city in America. We cover neighborhoods from historic downtown and Salem Village to the Veridea corridor and communities near NC-540. Free towing, cash on pickup.",
    highlights: ["Wake County: 'Peak of Good Living'", "Serving Apex's fastest-growing neighborhoods", "Cash paid same day, free towing"],
  },
  {
    slug: "holly-springs",
    name: "Holly Springs",
    state: "NC",
    county: "Wake County",
    description: "Selling a junk car in Holly Springs is easy with MG Salvage. From the US-1 biotech corridor near FUJIFILM Diosynth to neighborhoods around Ting Park and Harris Lake, we offer free towing, instant cash offers, and next-day pickup across Wake County's fastest-growing town.",
    highlights: ["Wake County biotech corridor coverage", "Fast pickup near US-1 and NC-55", "No hidden fees, cash on the spot"],
  },
  {
    slug: "dunn",
    name: "Dunn",
    state: "NC",
    county: "Harnett County",
    description: "MG Salvage serves Dunn and the I-95 corridor area of Harnett County. From the historic depot district and Gen. William C. Lee House area to neighborhoods near Averasboro, we buy wrecked, non-running, and unwanted vehicles with free towing and same-day cash.",
    highlights: ["Harnett County I-95 corridor", "Wrecked and non-running accepted", "Free towing, same-day cash"],
  },
  {
    slug: "raeford",
    name: "Raeford",
    state: "NC",
    county: "Hoke County",
    description: "Need to sell a junk car in Raeford? MG Salvage covers Hoke County. From downtown near the historic courthouse to areas along US-401 and communities near Fort Liberty. Free estimates, professional vehicle removal, and cash paid on pickup.",
    highlights: ["Hoke County coverage", "Near Fort Liberty area", "Professional service, free towing"],
  },
  {
    slug: "fuquay-varina",
    name: "Fuquay-Varina",
    state: "NC",
    county: "Wake County",
    description: "MG Salvage makes selling your junk car in Fuquay-Varina simple. Covering both historic downtowns: Fuquay District and Varina Station plus all of southern Wake County's fastest-growing ZIP code. Fair cash offers and free flexible pickup.",
    highlights: ["Southern Wake County top-20 ZIP nationally", "Flexible scheduling around your day", "Fair cash offers, free towing"],
  },
  {
    slug: "burlington",
    name: "Burlington",
    state: "NC",
    county: "Alamance County",
    description: "Serving Burlington and Alamance County. From the I-85/I-40 corridor and Alamance Battleground area to neighborhoods near Elon and Cedarock Park. MG Salvage buys junk and damaged vehicles with free towing and cash paid on the spot.",
    highlights: ["Alamance County I-85/I-40 corridor", "Cash on the spot, any condition", "Free towing anywhere in Burlington"],
  },
  {
    slug: "asheboro",
    name: "Asheboro",
    state: "NC",
    county: "Randolph County",
    description: "MG Salvage provides junk car removal throughout Asheboro and Randolph County. From the NC Zoo area and historic downtown to communities along US-64 and near the Deep River. All makes and models accepted regardless of condition, free towing.",
    highlights: ["Randolph County near NC Zoo", "All makes and models accepted", "Free towing, US-64 corridor"],
  },
];

export const FAQS = [
  {
    question: "What types of vehicles do you buy?",
    answer: "We buy all types of vehicles regardless of condition: junk cars, damaged vehicles, non-running cars, trucks, SUVs, vans, and even commercial vehicles. Whether your car runs, doesn't start, or has been in an accident, we'll make you an offer.",
  },
  {
    question: "Do I need a title to sell my junk car in North Carolina?",
    answer: "In North Carolina, having a title is the most straightforward way to sell your vehicle. However, if you've lost your title, we can often still purchase the car if you have a valid photo ID and proof of registration. Contact us with your specific details, and we'll help you navigate the process.",
  },
  {
    question: "How quickly can you pick up my vehicle?",
    answer: "In most cases, we can schedule same-day or next-day pickup. Our team operates Monday through Saturday, and we work around your schedule to make the process as convenient as possible.",
  },
  {
    question: "Is towing really free?",
    answer: "Yes, towing is always free. We never charge for vehicle pickup or towing. The price we quote is the price you receive, with no hidden fees or deductions.",
  },
  {
    question: "How do I get an estimate for my junk car?",
    answer: "Simply fill out our online estimate form or call us directly. Provide basic details about your vehicle: year, make, model, and condition. We we'll give you a fair cash offer, usually within minutes.",
  },
  {
    question: "What paperwork do I need?",
    answer: "You'll need a valid photo ID and your vehicle title (if available). We handle all the necessary paperwork for the transfer, including the bill of sale and any DMV documentation required in North Carolina.",
  },
  {
    question: "Do you buy vehicles from businesses?",
    answer: "Absolutely. We work with mechanic shops, auto body centers, used car dealers, and fleet operators to remove unwanted vehicles from their lots. We offer scheduled pickups and can handle multiple vehicles at once.",
  },
  {
    question: "What happens to the car after you buy it?",
    answer: "Depending on the condition, the vehicle is either salvaged for parts, recycled for scrap metal, or repaired if it's still viable. We follow all environmental regulations for the proper disposal of fluids and hazardous materials.",
  },
  {
    question: "Do you buy cars that have been in accidents?",
    answer: "Yes, we buy wrecked and accident-damaged vehicles. Even if the car is a total loss, it still has value in parts and scrap metal. We'll provide a fair offer based on its current condition.",
  },
  {
    question: "What areas do you serve?",
    answer: "We serve a 50-mile radius from our headquarters in Sanford, NC, covering Fayetteville, Pittsboro, Carthage, Lillington, Apex, Holly Springs, Dunn, Raeford, Fuquay-Varina, Burlington, Asheboro, and surrounding communities throughout central North Carolina.",
  },
  {
    question: "How is the scrap value of my car determined?",
    answer: "Scrap value is based on the current scrap metal market rate, the vehicle's weight, and any salvageable parts. Heavier vehicles like trucks and SUVs generally yield higher offers. We give you a fair offer based on real-time market data, not guesswork.",
  },
  {
    question: "Can you pick up a car that doesn't have wheels or is missing parts?",
    answer: "Absolutely. We buy vehicles in any condition, including those missing tires, wheels, engines, or other major components. As long as the vehicle has a VIN and you can provide proof of ownership, we can make you an offer.",
  },
  {
    question: "What if my car is on private property or hard to access?",
    answer: "Not a problem. Our tow operators are experienced with tricky pickups: backyards, tight driveways, garages, and off-road situations. Just let us know what we're working with when you request your estimate.",
  },
  {
    question: "Do you offer same-day payment?",
    answer: "Yes. When our driver arrives to pick up your vehicle, you'll be paid cash on the spot. There's no waiting for a check in the mail or bank transfer delays.",
  },
  {
    question: "Is MG Salvage licensed and insured?",
    answer: "Yes, MG Salvage is a fully licensed and insured vehicle acquisition company operating in compliance with North Carolina DMV regulations. We handle all title transfers and legal documentation properly.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Marcus T.",
    location: "Sanford, NC",
    type: "Consumer",
    rating: 5,
    quote: "Called MG Salvage about my old Honda that hadn't run in two years. They gave me a fair price over the phone, showed up the next morning, and paid me cash on the spot. Couldn't have been easier.",
  },
  {
    name: "Sarah K.",
    location: "Fayetteville, NC",
    type: "Consumer",
    rating: 5,
    quote: "I was worried about not having the title, but MG Salvage walked me through the whole process. They were professional, on time, and the towing was completely free. Highly recommend.",
  },
  {
    name: "Dave's Auto Repair",
    location: "Pittsboro, NC",
    type: "Mechanic Shop",
    rating: 5,
    quote: "We use MG Salvage to clear abandoned vehicles from our lot. They're reliable, show up when they say they will, and the process is straightforward. Great partner for our shop.",
  },
  {
    name: "Carolina Collision Center",
    location: "Carthage, NC",
    type: "Body Shop",
    rating: 5,
    quote: "MG Salvage handles all our totaled vehicle removals. Their team is professional and they make the paperwork painless. We've been working with them for over a year now.",
  },
  {
    name: "James R.",
    location: "Lillington, NC",
    type: "Consumer",
    rating: 5,
    quote: "Needed same-day pickup for a wrecked truck in my driveway. MG Salvage came through; they were there within hours and paid me a fair price. Real professionals.",
  },
  {
    name: "Tri-County Motors",
    location: "Sanford, NC",
    type: "Dealer",
    rating: 5,
    quote: "As a used car dealer, we regularly need vehicles cleared from our lot. MG Salvage offers consistent service and fair pricing. They understand the business side of things.",
  },
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Request Your Estimate",
    description: "Fill out our quick online form or give us a call. Tell us about your vehicle: year, make, model, and condition.",
  },
  {
    step: 2,
    title: "Get a Cash Offer",
    description: "We'll review your vehicle details and provide a fair, no-obligation cash offer, usually within minutes.",
  },
  {
    step: 3,
    title: "Schedule Free Pickup",
    description: "Accept the offer and we'll schedule a pickup at your convenience. Same-day and next-day options available.",
  },
  {
    step: 4,
    title: "Get Paid on the Spot",
    description: "Our team arrives, handles the paperwork, loads the vehicle, and pays you cash right there on the spot.",
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Sell Your Junk Car", href: "/sell-your-junk-car" },
  { label: "Junk Car Removal", href: "/junk-car-removal" },
  { label: "Business Vehicle Removal", href: "/business-vehicle-removal" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "FAQ", href: "/faq" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];
