export interface Location {
  lat: number;
  lng: number;
  city: string;
  country: string;
}

export interface Dream {
  title: string;
  description: string;
  date?: string;
}

export interface Achievement {
  title: string;
  description: string;
  date: string;
  isVerified: boolean;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  profileImage?: string;
  title: string;
  bio: string;
  location: Location;
  interests: string[];
  dreams: Dream[];
  achievements: Achievement[];
  joinedDate: string;
  website?: string;
}