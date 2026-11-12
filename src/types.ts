export type BallType = 'Leather' | 'Tennis';

export type PlayerSpeciality = 'Bowler' | 'Batsman' | 'Wicketkeeper' | 'All Rounder';

export type AgeCategory = 'U16' | 'Open' | 'Junior' | 'Senior';

export interface RegistrationFormData {
  name: string;
  age: number | '';
  phone: string;
  email: string;
  speciality: PlayerSpeciality | '';
  ballType: BallType;
  state: string;
  city: string;
  referralCode?: string;
  agreedToTerms: boolean;
}

export interface RegistrationRecord extends RegistrationFormData {
  id: string;
  registrationNumber: string;
  feeAmount: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentId?: string;
  orderId?: string;
  createdAt: string;
  trialLocation?: string;
  reportingTime?: string;
}

export interface StateTeam {
  id: string;
  name: string;
  state: string;
  logo: string;
  primaryColor: string;
  homeGround: string;
  headCoach: string;
  starPlayer: string;
  championships?: string;
}

export interface TrialVenue {
  id: string;
  state: string;
  city: string;
  venueName: string;
  address: string;
  upcomingDate: string;
  reportingTime: string;
  status: 'Open' | 'Filling Fast' | 'Closed';
  leatherSlotsAvailable: number;
  tennisSlotsAvailable: number;
  chiefSelector: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  state: string;
  rating: number;
  comment: string;
  achievement: string;
  avatarInitial: string;
}

export interface SelectionScoreInput {
  runs: number;
  wickets: number;
  catches: number;
  stumpings: number;
  runOuts: number;
}

export type ActiveView = 
  | 'home'
  | 'about'
  | 'selection-process'
  | 'trials'
  | 'state-league'
  | 'teams'
  | 'gallery'
  | 'videos'
  | 'reviews'
  | 'contact'
  | 'physiccare'
  | 'mandatory-docs'
  | 'registration-policy'
  | 'privacy-policy'
  | 'refund-policy'
  | 'terms-conditions'
  | 'architecture-guide';
