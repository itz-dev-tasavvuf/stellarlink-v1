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
  _id?: string;
  id: string;
  name: string;
  email?: string;
  profileImage?: string; // Keep optional as it was
  title?: string; // Make optional
  bio?: string; // Make optional
  location?: Location; // Make optional
  interests?: string[]; // Make optional
  dreams?: Dream[]; // Make optional
  achievements?: Achievement[]; // Make optional
  joinedDate?: string; // Make optional
  website?: string;
}