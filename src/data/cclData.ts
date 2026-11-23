import { StateTeam, TrialVenue, Testimonial, BallType, PlayerSpeciality } from '../types';

export const INDIAN_STATES = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi NCR',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu & Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Puducherry',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
];

/**
 * Official 15 States where Champion Cricket League conducts State Trials
 * and the recommended practical trial hubs for each state.
 */
export const CCL_TRIAL_HUBS_BY_STATE: Record<string, string[]> = {
  'Gujarat': ['Ahmedabad/Vadodara', 'Surat', 'Rajkot'],
  'Delhi NCR': ['Noida/Ghaziabad', 'Gurugram'],
  'Rajasthan': ['Jodhpur', 'Jaipur', 'Kota' , 'Udaipur'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Bareilly', 'Meerut/Ghaziabad'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur'],
  'Haryana': ['Rohtak', 'Hisar', 'Karnal/Panipat'],
  'Punjab': ['Chandigarh/Mohali', 'Ludhiana', 'Jalandhar', 'Amritsar'],
  'Jammu & Kashmir': ['Jammu', 'Srinagar'],
  'Himachal Pradesh': ['Shimla', 'Mandi', 'Dharamshala'],
  'Uttarakhand': ['Dehradun/Haridwar', 'Haldwani'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad'],
  'Maharashtra': ['Mumbai', 'Nagpur'],
  'Chhattisgarh': ['Raipur/Durg', 'Bilaspur'],
  'Odisha': ['Bhubaneswar/Cuttack', 'Rourkela'],
  'Bihar': ['Patna', 'Gaya', 'Muzaffarpur']
};

export const CCL_TRIAL_STATES = Object.keys(CCL_TRIAL_HUBS_BY_STATE);

export const getCitiesForState = (stateName: string): string[] => {
  if (!stateName) return CCL_TRIAL_HUBS_BY_STATE['Delhi NCR'];
  if (CCL_TRIAL_HUBS_BY_STATE[stateName]) {
    return CCL_TRIAL_HUBS_BY_STATE[stateName];
  }
  if (stateName.toLowerCase() === 'delhi') {
    return CCL_TRIAL_HUBS_BY_STATE['Delhi NCR'];
  }
  const match = Object.keys(CCL_TRIAL_HUBS_BY_STATE).find(
    (k) => k.toLowerCase() === stateName.toLowerCase()
  );
  return match ? CCL_TRIAL_HUBS_BY_STATE[match] : CCL_TRIAL_HUBS_BY_STATE['Delhi NCR'];
};

export const FEE_STRUCTURE = {
  Leather: {
    'Batsman': 1199,
    'Bowler': 1199,
    'All Rounder': 1499,
    'Wicketkeeper': 1499
  },
  Tennis: {
    'Batsman': 799,
    'Bowler': 799,
    'All Rounder': 1199,
    'Wicketkeeper': 1199
  }
};

/**
 * Calculates exact trial registration fee according to official schedule:
 * Leather Ball:
 *   Batsman: ₹1199
 *   Bowler: ₹1199
 *   All Rounder: ₹1499
 *   Wicketkeeper: ₹1499
 *
 * Tennis Ball:
 *   Batsman: ₹799
 *   Bowler: ₹799
 *   All Rounder: ₹1199
 *   Wicketkeeper: ₹1199
 */
export const calculateRegistrationFee = (
  ballType: BallType = 'Leather',
  speciality: PlayerSpeciality | string = 'Batsman'
): number => {
  const normBall: BallType = ballType === 'Tennis' ? 'Tennis' : 'Leather';
  const table = FEE_STRUCTURE[normBall];
  if (speciality === 'Bowler') return table.Bowler;
  if (speciality === 'All Rounder') return table['All Rounder'];
  if (speciality === 'Wicketkeeper') return table.Wicketkeeper;
  return table.Batsman;
};

export const STATE_TEAMS: StateTeam[] = [
  {
    id: 'uttarakhand',
    name: 'Uttarakhand Strikers',
    state: 'Uttarakhand',
    logo: 'https://res.cloudinary.com/wo0qous9/image/upload/f_auto,q_auto/v1794586740/WhatsApp_Image_2026-11-13_at_12.24.10.jpg',
    primaryColor: '#059669',
    homeGround: 'Abhimanyu Cricket Academy, Dehradun',
    headCoach: 'Subhash Rawat',
    starPlayer: 'Ayush Bisht',
    championships: 'Season 1 Winner'
  },
  {
    id: 'delhi',
    name: 'Delhi Dominators',
    state: 'Delhi NCR',
    logo: 'https://res.cloudinary.com/wo0qous9/image/upload/f_auto,q_auto/v1794586749/WhatsApp_Image_2026-11-13_at_12.24.11_3.jpg',
    primaryColor: '#1E3A8A',
    homeGround: 'Dwarka Sports Complex / Major Dhyan Chand Ground',
    headCoach: 'Coach Rajesh Sharma (BCCI Level 2)',
    starPlayer: 'Aarav Malhotra',
    championships: 'Finalist 2024'
  },
  {
    id: 'jharkhand',
    name: 'Jharkhand Knights',
    state: 'Jharkhand',
    logo: 'https://res.cloudinary.com/wo0qous9/image/upload/f_auto,q_auto/v1794586764/WhatsApp_Image_2026-11-13_at_12.24.12.jpg',
    primaryColor: '#B45309',
    homeGround: 'Jharkhand',
    headCoach: 'Nilesh Patel (Ex-Ranji Player)',
    starPlayer: 'Devang Vaghela',
    championships: 'Champions 2023'
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra Warriors',
    state: 'Maharshtra',
    logo: 'https://res.cloudinary.com/wo0qous9/image/upload/f_auto,q_auto/v1794586744/WhatsApp_Image_2026-11-13_at_12.24.11_1.jpg',
    primaryColor: '#B45309',
    homeGround: 'Maharashtra',
    headCoach: 'Nilesh Patel (Ex-Ranji Player)',
    starPlayer: 'Devang Vaghela',
    championships: 'Champions 2023'
  },
  {
    id: 'mp',
    name: 'MP Tigers',
    state: 'Madhya Pradesh',
    logo: 'https://res.cloudinary.com/wo0qous9/image/upload/f_auto,q_auto/v1794586761/WhatsApp_Image_2026-11-13_at_12.24.12_2.jpg',
    primaryColor: '#C2410C',
    homeGround: 'Holkar Practice Arena, Indore',
    headCoach: 'Mahesh Bundela',
    starPlayer: 'Shivam Chouhan'
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan Elite',
    state: 'Rajasthan',
    logo: 'https://res.cloudinary.com/wo0qous9/image/upload/f_auto,q_auto/v1794586746/WhatsApp_Image_2026-11-13_at_12.24.11_2.jpg',
    primaryColor: '#BE185D',
    homeGround: 'Barkatullah Khan Academy, Jaipur',
    headCoach: 'Dharmendra Rathore',
    starPlayer: 'Vikramaditya Shekhawat'
  },
  {
    id: 'punjab',
    name: 'Punjab Kings',
    state: 'Punjab',
    logo: 'https://res.cloudinary.com/wo0qous9/image/upload/f_auto,q_auto/v1794586753/WhatsApp_Image_2026-11-13_at_12.24.11.jpg',
    primaryColor: '#DC2626',
    homeGround: 'PCA Mohali Training Ground',
    headCoach: 'Harpreet Singh Bhullar',
    starPlayer: 'Manjot Sandhu',
    championships: 'Champions 2024'
  },
  {
    id: 'up',
    name: 'UP Lions',
    state: 'Uttar Pradesh',
    logo: 'https://res.cloudinary.com/wo0qous9/image/upload/f_auto,q_auto/v1794586757/WhatsApp_Image_2026-11-13_at_12.24.12_1.jpg',
    primaryColor: '#7C3AED',
    homeGround: 'Green Park Practice Facility, Kanpur / Noida Stadium',
    headCoach: 'Vijay Prakash Tiwari',
    starPlayer: 'Mohammad Zaid'
  }
];

export const TRIAL_VENUES: TrialVenue[] = [
  {
    id: 'venue-delhi',
    state: 'Delhi NCR',
    city: 'Noida/Ghaziabad',
    venueName: 'Stumps & Stories Cricket Ground',
    address: 'Petrol/Cng pump, Near Chhawla, Somesh Vihar, Chhawla, Delhi, 110071',
    upcomingDate: 'November 29, 2026',
    reportingTime: '',
    status: 'Open',
    leatherSlotsAvailable: 0,
    tennisSlotsAvailable: 0,
    chiefSelector: ''
  },
  {
    id: 'venue-uttarakhand',
    state: 'Uttarakhand',
    city: 'Dehradun/Haridwar',
    venueName: 'Fusion Maveric Cricket Academy',
    address: 'Late Shri Puran Chand Tyagi Cricket Stadium, Tashipur (Tanshipur), Roorkee, Haridwar, Uttarakhand 247656',
    upcomingDate: 'December 13, 2026',
    reportingTime: '',
    status: 'Open',
    leatherSlotsAvailable: 0,
    tennisSlotsAvailable: 0,
    chiefSelector: ''
  },
  {
    id: 'venue-bihar',
    state: 'Bihar',
    city: 'Patna',
    venueName: 'Cricket Academy Of Raja Eleven',
    address: 'Near Licchhavi Public School Flyover, Beside NH-22, Dighi Kala East, Hajipur, Vaishali, Bihar 844102',
    upcomingDate: 'December 20, 2026',
    reportingTime: '',
    status: 'Open',
    leatherSlotsAvailable: 0,
    tennisSlotsAvailable: 0,
    chiefSelector: ''
  },
  {
    id: 'venue-jharkhand',
    state: 'Jharkhand',
    city: 'Ranchi',
    venueName: 'Rockman Cricket Academy',
    address: 'Near, Sakha Ground, CRPF Campus, Sec II, Ranchi, Jharkhand 834004',
    upcomingDate: 'December 18, 2026',
    reportingTime: '',
    status: 'Open',
    leatherSlotsAvailable: 0,
    tennisSlotsAvailable: 0,
    chiefSelector: ''
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Rahul Sharma',
    role: 'Fast Bowler',
    state: 'Uttar Pradesh',
    rating: 5,
    comment: 'Champion Cricket League has completely transformed my cricket journey! The exposure and match conditions pushed me to clock 132 km/h under pressure. After performing in the state league, I was scouted for district trials!',
    achievement: 'Selected for State High Performance Camp (22 Wickets in League)',
    avatarInitial: 'R'
  },
  {
    id: 't2',
    name: 'Priya Patel (Parent of Aryan)',
    role: 'Parent of U16 All-Rounder',
    state: 'Gujarat',
    rating: 5,
    comment: 'As parents, safety, food, and verified coaching were our top concerns. CCL and Khel Bharat provided fantastic lodging, nutritious meals, live Cricheroes telecasts, and authentic BCCI coaches.',
    achievement: 'Son won Player of the Tournament (340 Runs, 14 Wickets)',
    avatarInitial: 'P'
  },
  {
    id: 't3',
    name: 'Mohit Verma',
    role: 'Top-Order Batsman',
    state: 'Delhi NCR',
    rating: 5,
    comment: 'The transparent points scoring system (1 run = 1 pt, 100 points qualification) removes all politics from selections. If you perform on the pitch, you move to the National Camp. Transparent and professional.',
    achievement: 'Qualified with 148 Selection Points in 2 matches',
    avatarInitial: 'M'
  },
  {
    id: 't4',
    name: 'Coach S. K. Tiwari',
    role: 'BCCI Level-2 Coach',
    state: 'Haryana',
    rating: 5,
    comment: 'We look at technical temperament, hand-eye coordination, balance at crease, and mental resilience. CCL provides boys with genuine turf pitches, proper white & red balls, colored kits, and video analysis.',
    achievement: 'Mentored 35+ players into Ranji & Under-19 academies',
    avatarInitial: 'S'
  }
];

export const GALLERY_ITEMS = [
  { id: 'g1', title: 'Delhi NCR Trial Net Sessions', image: '/assets/images/t14.jpg', category: 'Trials' },
  { id: 'g2', title: 'Gujarat State Selection Matches', image: '/assets/images/t13.jpg', category: 'State League' },
  { id: 'g3', title: 'High Performance Fitness Drills', image: '/assets/images/t15.jpg', category: 'Camp' },
  { id: 'g4', title: 'BCCI Certified Coach Feedback', image: '/assets/images/t16.jpg', category: 'Coaching' },
  { id: 'g5', title: 'National Semi-Final Action', image: '/assets/images/t17.jpg', category: 'Matches' },
  { id: 'g6', title: 'Trophy & Award Presentation', image: '/assets/images/t18.jpg', category: 'Awards' },
  { id: 'g7', title: 'Spin Bowling Assessment', image: '/assets/images/t19.jpg', category: 'Trials' },
  { id: 'g8', title: 'Wicketkeeping Stumping Drills', image: '/assets/images/t20.jpg', category: 'Trials' },
  { id: 'g9', title: 'Live Match Videography & Analysis', image: '/assets/images/t21.jpg', category: 'Matches' },
  { id: 'g10', title: 'Team Huddle Before Semi-Final', image: '/assets/images/t22.jpg', category: 'State League' },
  { id: 'g11', title: 'On-Ground Medical & Physio Check', image: '/assets/images/t23.jpg', category: 'PhysicCare' },
  { id: 'g12', title: 'Junior U16 Talent Screening', image: '/assets/images/trail1.jpg', category: 'Trials' }
];

// Demo: 41 sample images for Uttarakhand State Trials.
// Replace these strings with your 41 real Cloudinary URLs whenever ready.
const SAMPLE_TRIAL_POOL = [
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586576/WhatsApp_Image_2026-11-13_at_13.42.06.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586570/WhatsApp_Image_2026-11-13_at_13.42.05.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586564/WhatsApp_Image_2026-11-13_at_13.42.05_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586558/WhatsApp_Image_2026-11-13_at_13.42.04.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586552/WhatsApp_Image_2026-11-13_at_13.42.04_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586546/WhatsApp_Image_2026-11-13_at_13.42.03.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586541/WhatsApp_Image_2026-11-13_at_13.42.03_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586535/WhatsApp_Image_2026-11-13_at_13.42.02.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586528/WhatsApp_Image_2026-11-13_at_13.42.02_3.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586522/WhatsApp_Image_2026-11-13_at_13.42.02_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586507/WhatsApp_Image_2026-11-13_at_13.42.02_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586501/WhatsApp_Image_2026-11-13_at_13.42.01.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586495/WhatsApp_Image_2026-11-13_at_13.42.01_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586488/WhatsApp_Image_2026-11-13_at_13.42.01_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586484/WhatsApp_Image_2026-11-13_at_13.42.00.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586478/WhatsApp_Image_2026-11-13_at_13.42.00_3.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586473/WhatsApp_Image_2026-11-13_at_13.42.00_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586467/WhatsApp_Image_2026-11-13_at_13.42.00_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586462/WhatsApp_Image_2026-11-13_at_13.41.59.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586457/WhatsApp_Image_2026-11-13_at_13.41.59_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586452/WhatsApp_Image_2026-11-13_at_13.41.59_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586447/WhatsApp_Image_2026-11-13_at_13.41.58.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586443/WhatsApp_Image_2026-11-13_at_13.41.58_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586438/WhatsApp_Image_2026-11-13_at_13.41.58_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586434/WhatsApp_Image_2026-11-13_at_13.41.57.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586429/WhatsApp_Image_2026-11-13_at_13.41.57_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586425/WhatsApp_Image_2026-11-13_at_13.41.57_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586421/WhatsApp_Image_2026-11-13_at_13.41.56.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586416/WhatsApp_Image_2026-11-13_at_13.41.56_3.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586412/WhatsApp_Image_2026-11-13_at_13.41.56_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586408/WhatsApp_Image_2026-11-13_at_13.41.56_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586405/WhatsApp_Image_2026-11-13_at_13.41.55.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586401/WhatsApp_Image_2026-11-13_at_13.41.55_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586397/WhatsApp_Image_2026-11-13_at_13.41.55_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586393/WhatsApp_Image_2026-11-13_at_13.41.54.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586390/WhatsApp_Image_2026-11-13_at_13.41.54_3.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586387/WhatsApp_Image_2026-11-13_at_13.41.54_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586383/WhatsApp_Image_2026-11-13_at_13.41.54_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586380/WhatsApp_Image_2026-11-13_at_13.41.53.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586377/WhatsApp_Image_2026-11-13_at_13.41.53_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586376/WhatsApp_Image_2026-11-13_at_13.41.53_1.jpg'
];

export const UTTARAKHAND_TRIAL_IMAGES: string[] = Array.from(
  { length: 41 },
  (_, index) => SAMPLE_TRIAL_POOL[index % SAMPLE_TRIAL_POOL.length]
);

// Replace these sample images with your real Madhya Pradesh State Trials Cloudinary URLs
export const MADHYA_PRADESH_TRIAL_IMAGES: string[] = [
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586232/WhatsApp_Image_2026-11-13_at_13.43.04.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586221/WhatsApp_Image_2026-11-13_at_13.43.03.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586218/WhatsApp_Image_2026-11-13_at_13.43.03_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586208/WhatsApp_Image_2026-11-13_at_13.43.03_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586205/WhatsApp_Image_2026-11-13_at_13.43.02.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586195/WhatsApp_Image_2026-11-13_at_13.43.02_3.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586193/WhatsApp_Image_2026-11-13_at_13.43.02_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586185/WhatsApp_Image_2026-11-13_at_13.43.02_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586182/WhatsApp_Image_2026-11-13_at_13.43.01.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586177/WhatsApp_Image_2026-11-13_at_13.43.01_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586172/WhatsApp_Image_2026-11-13_at_13.43.00.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586166/WhatsApp_Image_2026-11-13_at_13.43.00_3.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586163/WhatsApp_Image_2026-11-13_at_13.43.00_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586157/WhatsApp_Image_2026-11-13_at_13.43.00_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586153/WhatsApp_Image_2026-11-13_at_13.42.59.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586147/WhatsApp_Image_2026-11-13_at_13.42.59_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586143/WhatsApp_Image_2026-11-13_at_13.42.59_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586139/WhatsApp_Image_2026-11-13_at_13.42.58.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586133/WhatsApp_Image_2026-11-13_at_13.42.58_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586131/WhatsApp_Image_2026-11-13_at_13.42.57.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586126/WhatsApp_Image_2026-11-13_at_13.42.57_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586122/WhatsApp_Image_2026-11-13_at_13.42.57_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586118/WhatsApp_Image_2026-11-13_at_13.42.56.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586114/WhatsApp_Image_2026-11-13_at_13.42.56_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586111/WhatsApp_Image_2026-11-13_at_13.42.55.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586108/WhatsApp_Image_2026-11-13_at_13.42.55_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586104/WhatsApp_Image_2026-11-13_at_13.42.55_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586101/WhatsApp_Image_2026-11-13_at_13.42.54.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586098/WhatsApp_Image_2026-11-13_at_13.42.54_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586095/WhatsApp_Image_2026-11-13_at_13.42.54_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586091/WhatsApp_Image_2026-11-13_at_13.42.53.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586089/WhatsApp_Image_2026-11-13_at_13.42.53_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586086/WhatsApp_Image_2026-11-13_at_13.42.53_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586083/WhatsApp_Image_2026-11-13_at_13.42.51.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794586077/WhatsApp_Image_2026-11-13_at_13.42.51_1.jpg'
];

// Replace these sample images with your real Delhi State Trials Cloudinary URLs
export const DELHI_TRIAL_IMAGES: string[] = [
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653719/WhatsApp_Image_2026-11-13_at_13.42.23_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653718/WhatsApp_Image_2026-11-13_at_13.42.23_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653717/WhatsApp_Image_2026-11-13_at_13.42.22.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653716/WhatsApp_Image_2026-11-13_at_13.42.22_3.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653715/WhatsApp_Image_2026-11-13_at_13.42.22_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653714/WhatsApp_Image_2026-11-13_at_13.42.22_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653713/WhatsApp_Image_2026-11-13_at_13.42.20.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653712/WhatsApp_Image_2026-11-13_at_13.42.20_3.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653711/WhatsApp_Image_2026-11-13_at_13.42.20_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653710/WhatsApp_Image_2026-11-13_at_13.42.20_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653709/WhatsApp_Image_2026-11-13_at_13.42.19.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653708/WhatsApp_Image_2026-11-13_at_13.42.19_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653707/WhatsApp_Image_2026-11-13_at_13.42.19_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653706/WhatsApp_Image_2026-11-13_at_13.42.18.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653705/WhatsApp_Image_2026-11-13_at_13.42.18_3.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653705/WhatsApp_Image_2026-11-13_at_13.42.18_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653704/WhatsApp_Image_2026-11-13_at_13.42.18_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653703/WhatsApp_Image_2026-11-13_at_13.42.17.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653702/WhatsApp_Image_2026-11-13_at_13.42.17_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653701/WhatsApp_Image_2026-11-13_at_13.42.17_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653700/WhatsApp_Image_2026-11-13_at_13.42.16.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653699/WhatsApp_Image_2026-11-13_at_13.42.16_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653698/WhatsApp_Image_2026-11-13_at_13.42.16_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653697/WhatsApp_Image_2026-11-13_at_13.42.15.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653696/WhatsApp_Image_2026-11-13_at_13.42.15_3.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653695/WhatsApp_Image_2026-11-13_at_13.42.15_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653694/WhatsApp_Image_2026-11-13_at_13.42.15_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653693/WhatsApp_Image_2026-11-13_at_13.42.14.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653693/WhatsApp_Image_2026-11-13_at_13.42.14_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653692/WhatsApp_Image_2026-11-13_at_13.42.14_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653691/WhatsApp_Image_2026-11-13_at_13.42.13.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653690/WhatsApp_Image_2026-11-13_at_13.42.13_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653689/WhatsApp_Image_2026-11-13_at_13.42.13_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653686/WhatsApp_Image_2026-11-13_at_13.42.12.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653685/WhatsApp_Image_2026-11-13_at_13.42.12_3.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653653/WhatsApp_Image_2026-11-13_at_13.42.12_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653648/WhatsApp_Image_2026-11-13_at_13.42.11.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653647/WhatsApp_Image_2026-11-13_at_13.42.12_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653647/WhatsApp_Image_2026-11-13_at_13.42.11_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653646/WhatsApp_Image_2026-11-13_at_13.42.10.jpg'
];

// Replace these sample images with your real Rajasthan State Trials Cloudinary URLs
export const RAJASTHAN_TRIAL_IMAGES: string[] = [
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653872/WhatsApp_Image_2026-11-13_at_13.42.37.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653871/WhatsApp_Image_2026-11-13_at_13.42.37_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653864/WhatsApp_Image_2026-11-13_at_13.42.36.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653863/WhatsApp_Image_2026-11-13_at_13.42.36_3.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653857/WhatsApp_Image_2026-11-13_at_13.42.36_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653856/WhatsApp_Image_2026-11-13_at_13.42.36_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653849/WhatsApp_Image_2026-11-13_at_13.42.35.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653848/WhatsApp_Image_2026-11-13_at_13.42.35_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653842/WhatsApp_Image_2026-11-13_at_13.42.35_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653841/WhatsApp_Image_2026-11-13_at_13.42.34.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653834/WhatsApp_Image_2026-11-13_at_13.42.34_3.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653833/WhatsApp_Image_2026-11-13_at_13.42.34_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653826/WhatsApp_Image_2026-11-13_at_13.42.34_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653826/WhatsApp_Image_2026-11-13_at_13.42.33.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653819/WhatsApp_Image_2026-11-13_at_13.42.33_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653818/WhatsApp_Image_2026-11-13_at_13.42.33_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653811/WhatsApp_Image_2026-11-13_at_13.42.32.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653810/WhatsApp_Image_2026-11-13_at_13.42.32_3.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653803/WhatsApp_Image_2026-11-13_at_13.42.32_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653802/WhatsApp_Image_2026-11-13_at_13.42.32_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653801/WhatsApp_Image_2026-11-13_at_13.42.31.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653796/WhatsApp_Image_2026-11-13_at_13.42.31_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653795/WhatsApp_Image_2026-11-13_at_13.42.31_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653790/WhatsApp_Image_2026-11-13_at_13.42.30.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653789/WhatsApp_Image_2026-11-13_at_13.42.30_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653788/WhatsApp_Image_2026-11-13_at_13.42.30_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653783/WhatsApp_Image_2026-11-13_at_13.42.29.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653782/WhatsApp_Image_2026-11-13_at_13.42.29_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653778/WhatsApp_Image_2026-11-13_at_13.42.29_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653777/WhatsApp_Image_2026-11-13_at_13.42.28.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653774/WhatsApp_Image_2026-11-13_at_13.42.28_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653772/WhatsApp_Image_2026-11-13_at_13.42.28_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653769/WhatsApp_Image_2026-11-13_at_13.42.27.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653767/WhatsApp_Image_2026-11-13_at_13.42.27_3.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653766/WhatsApp_Image_2026-11-13_at_13.42.27_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653763/WhatsApp_Image_2026-11-13_at_13.42.27_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653762/WhatsApp_Image_2026-11-13_at_13.42.26.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653760/WhatsApp_Image_2026-11-13_at_13.42.26_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653759/WhatsApp_Image_2026-11-13_at_13.42.25.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653757/WhatsApp_Image_2026-11-13_at_13.42.25_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653756/WhatsApp_Image_2026-11-13_at_13.42.25_1.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653754/WhatsApp_Image_2026-11-13_at_13.42.24.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653753/WhatsApp_Image_2026-11-13_at_13.42.24_3.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653752/WhatsApp_Image_2026-11-13_at_13.42.24_2.jpg',
  'https://res.cloudinary.com/wo0qous9/image/upload/v1794653751/WhatsApp_Image_2026-11-13_at_13.42.24_1.jpg'
];

export const SPONSORS = [
  { id: 's1', name: 'Partner 1', image: '/assets/images/sponser1.jpg' },
  { id: 's2', name: 'Partner 2', image: '/assets/images/sponser2.jpg' },
  { id: 's3', name: 'Partner 3', image: '/assets/images/sponser3.jpg' },
  { id: 's4', name: 'Partner 4', image: '/assets/images/sponser4.jpg' },
  { id: 's5', name: 'Partner 5', image: '/assets/images/sponser5.jpg' },
  { id: 's6', name: 'Partner 6', image: '/assets/images/sponser6.jpg' }
];
