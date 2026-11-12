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
  'Rajasthan': ['Jodhpur', 'Jaipur', 'Kota'],
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
    id: 'delhi',
    name: 'Delhi Challengers',
    state: 'Delhi NCR',
    logo: '/assets/images/t14.jpg',
    primaryColor: '#1E3A8A',
    homeGround: 'Dwarka Sports Complex / Major Dhyan Chand Ground',
    headCoach: 'Coach Rajesh Sharma (BCCI Level 2)',
    starPlayer: 'Aarav Malhotra',
    championships: 'Finalist 2024'
  },
  {
    id: 'gujarat',
    name: 'Gujarat Titans CCL',
    state: 'Gujarat',
    logo: '/assets/images/t13.jpg',
    primaryColor: '#B45309',
    homeGround: 'Motera Ground, Ahmedabad',
    headCoach: 'Nilesh Patel (Ex-Ranji Player)',
    starPlayer: 'Devang Vaghela',
    championships: 'Champions 2023'
  },
  {
    id: 'haryana',
    name: 'Haryana Warriors',
    state: 'Haryana',
    logo: '/assets/images/t15.jpg',
    primaryColor: '#047857',
    homeGround: 'Tau Devi Lal Cricket Stadium, Gurugram',
    headCoach: 'Kuldeep Singh',
    starPlayer: 'Sumit Hooda',
    championships: 'Semi-Finalist 2024'
  },
  {
    id: 'himachal',
    name: 'Himachal Strikers',
    state: 'Himachal Pradesh',
    logo: '/assets/images/t16.jpg',
    primaryColor: '#0369A1',
    homeGround: 'HPCA Practice Oval, Dharamshala',
    headCoach: 'Anil Thakur',
    starPlayer: 'Rohit Jamwal'
  },
  {
    id: 'jk',
    name: 'Jammu & Kashmir Royals',
    state: 'Jammu & Kashmir',
    logo: '/assets/images/t17.jpg',
    primaryColor: '#4338CA',
    homeGround: 'Bakshi Stadium Complex, Srinagar',
    headCoach: 'Tariq Mir',
    starPlayer: 'Irfan Sheikh'
  },
  {
    id: 'mp',
    name: 'Madhya Pradesh Panthers',
    state: 'Madhya Pradesh',
    logo: '/assets/images/t18.jpg',
    primaryColor: '#C2410C',
    homeGround: 'Holkar Practice Arena, Indore',
    headCoach: 'Mahesh Bundela',
    starPlayer: 'Shivam Chouhan'
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan Roarers',
    state: 'Rajasthan',
    logo: '/assets/images/t19.jpg',
    primaryColor: '#BE185D',
    homeGround: 'Barkatullah Khan Academy, Jaipur',
    headCoach: 'Dharmendra Rathore',
    starPlayer: 'Vikramaditya Shekhawat'
  },
  {
    id: 'punjab',
    name: 'Punjab Kings CCL',
    state: 'Punjab',
    logo: '/assets/images/t20.jpg',
    primaryColor: '#DC2626',
    homeGround: 'PCA Mohali Training Ground',
    headCoach: 'Harpreet Singh Bhullar',
    starPlayer: 'Manjot Sandhu',
    championships: 'Champions 2024'
  },
  {
    id: 'uttarakhand',
    name: 'Uttarakhand Eagles',
    state: 'Uttarakhand',
    logo: '/assets/images/t21.jpg',
    primaryColor: '#059669',
    homeGround: 'Abhimanyu Cricket Academy, Dehradun',
    headCoach: 'Subhash Rawat',
    starPlayer: 'Ayush Bisht'
  },
  {
    id: 'up',
    name: 'Uttar Pradesh Nawabs',
    state: 'Uttar Pradesh',
    logo: '/assets/images/t22.jpg',
    primaryColor: '#7C3AED',
    homeGround: 'Green Park Practice Facility, Kanpur / Noida Stadium',
    headCoach: 'Vijay Prakash Tiwari',
    starPlayer: 'Mohammad Zaid'
  }
];

export const TRIAL_VENUES: TrialVenue[] = [
  {
    id: 'venue-delhi',
    state: 'Delhi',
    city: 'New Delhi (Dwarka / Noida)',
    venueName: 'DDA Sports Complex & CCL Ground',
    address: 'Building no. 13 Suraj vihar 1st floor beside Triumph Dwarka (New Delhi -110078)',
    upcomingDate: 'September 20, 2026',
    reportingTime: '08:00 AM IST',
    status: 'Filling Fast',
    leatherSlotsAvailable: 24,
    tennisSlotsAvailable: 35,
    chiefSelector: 'Coach R. K. Sharma (BCCI Panel)'
  },
  {
    id: 'venue-gujarat',
    state: 'Gujarat',
    city: 'Ahmedabad',
    venueName: 'Sardar Patel Cricket Grounds',
    address: 'Navrangpura Sports Enclave, Ahmedabad, Gujarat',
    upcomingDate: 'September 24, 2026',
    reportingTime: '08:30 AM IST',
    status: 'Open',
    leatherSlotsAvailable: 42,
    tennisSlotsAvailable: 50,
    chiefSelector: 'Nilesh Vora (Ex-Ranji Trophy Selector)'
  },
  {
    id: 'venue-haryana',
    state: 'Haryana',
    city: 'Gurugram / Rohtak',
    venueName: 'Tau Devi Lal Sports Complex',
    address: 'Sector 38, Near Subhash Chowk, Gurugram - 122001',
    upcomingDate: 'September 27, 2026',
    reportingTime: '08:00 AM IST',
    status: 'Filling Fast',
    leatherSlotsAvailable: 18,
    tennisSlotsAvailable: 22,
    chiefSelector: 'Devinder Hooda'
  },
  {
    id: 'venue-punjab',
    state: 'Punjab',
    city: 'Chandigarh / Mohali',
    venueName: 'Sector 16 Cricket Stadium Oval',
    address: 'Jan Marg, Sector 16, Chandigarh - 160015',
    upcomingDate: 'October 02, 2026',
    reportingTime: '09:00 AM IST',
    status: 'Open',
    leatherSlotsAvailable: 55,
    tennisSlotsAvailable: 40,
    chiefSelector: 'Gurpreet Singh Brar'
  },
  {
    id: 'venue-rajasthan',
    state: 'Rajasthan',
    city: 'Jaipur',
    venueName: 'Khel Gaon Cricket Complex',
    address: 'Mansarovar Metro Link Road, Jaipur, Rajasthan - 302020',
    upcomingDate: 'October 06, 2026',
    reportingTime: '08:30 AM IST',
    status: 'Open',
    leatherSlotsAvailable: 38,
    tennisSlotsAvailable: 45,
    chiefSelector: 'Surendra Rathore'
  },
  {
    id: 'venue-up',
    state: 'Uttar Pradesh',
    city: 'Noida / Lucknow',
    venueName: 'Noida Cricket Stadium, Sector 21A',
    address: 'Stadium Road, Block E, Sector 21A, Noida, Uttar Pradesh 201301',
    upcomingDate: 'October 10, 2026',
    reportingTime: '08:00 AM IST',
    status: 'Filling Fast',
    leatherSlotsAvailable: 15,
    tennisSlotsAvailable: 28,
    chiefSelector: 'Arun Kumar Mishra'
  },
  {
    id: 'venue-mp',
    state: 'Madhya Pradesh',
    city: 'Indore / Bhopal',
    venueName: 'Yeshwant Club Sports Turf',
    address: 'Race Course Road, New Palasia, Indore - 452001',
    upcomingDate: 'October 14, 2026',
    reportingTime: '08:30 AM IST',
    status: 'Open',
    leatherSlotsAvailable: 48,
    tennisSlotsAvailable: 60,
    chiefSelector: 'Pramod Yadav'
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

export const SPONSORS = [
  { id: 's1', name: 'Partner 1', image: '/assets/images/sponser1.jpg' },
  { id: 's2', name: 'Partner 2', image: '/assets/images/sponser2.jpg' },
  { id: 's3', name: 'Partner 3', image: '/assets/images/sponser3.jpg' },
  { id: 's4', name: 'Partner 4', image: '/assets/images/sponser4.jpg' },
  { id: 's5', name: 'Partner 5', image: '/assets/images/sponser5.jpg' },
  { id: 's6', name: 'Partner 6', image: '/assets/images/sponser6.jpg' }
];
