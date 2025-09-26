
export interface Activity {
  time: string;
  description: string;
  location: string;
  details?: string;
}

export interface ItineraryDay {
  day: number;
  theme: string;
  activities: Activity[];
}

export interface Itinerary {
  city: string;
  country: string;
  days: ItineraryDay[];
}
