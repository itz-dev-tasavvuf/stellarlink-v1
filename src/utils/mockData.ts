import { User, Location, Dream, Achievement } from '../types/user';

// Interests
const interests = [
  'Astronomy', 'Astrophysics', 'Rocketry', 'Space Medicine', 
  'Planetary Science', 'Satellite Technology', 'Space Policy',
  'Astrobiology', 'Space Engineering', 'Exoplanets', 'Mars Exploration',
  'Lunar Science', 'Space Robotics', 'Deep Space Communication',
  'Space Manufacturing', 'Space Tourism', 'Earth Observation'
];

// Job titles
const titles = [
  'Aerospace Engineer', 'Astrophysicist', 'Space Medicine Researcher',
  'Rocket Propulsion Specialist', 'Planetary Geologist', 'Astrobiologist',
  'Satellite Communications Expert', 'Space Policy Analyst', 'Astronaut Candidate',
  'Space Mission Planner', 'Space Habitat Designer', 'Astronomy Professor',
  'Space Robotics Engineer', 'Lunar Geology Student', 'Space Startup Founder'
];

// Countries
const countries = [
  'USA', 'Canada', 'UK', 'Germany', 'France', 'Japan', 'Australia',
  'India', 'Brazil', 'South Africa', 'Russia', 'China', 'Italy',
  'Spain', 'Netherlands', 'Sweden', 'Singapore', 'South Korea'
];

// Cities by country
const citiesByCountry: Record<string, string[]> = {
  'USA': ['Houston', 'Cape Canaveral', 'Pasadena', 'Seattle', 'Boston', 'San Francisco'],
  'Canada': ['Toronto', 'Montreal', 'Vancouver', 'Ottawa'],
  'UK': ['London', 'Cambridge', 'Edinburgh', 'Manchester'],
  'Germany': ['Berlin', 'Munich', 'Hamburg', 'Cologne'],
  'France': ['Paris', 'Toulouse', 'Lyon', 'Marseille'],
  'Japan': ['Tokyo', 'Kyoto', 'Osaka', 'Tsukuba'],
  'Australia': ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
  'India': ['Bangalore', 'Mumbai', 'New Delhi', 'Hyderabad'],
  'Brazil': ['Sao Paulo', 'Rio de Janeiro', 'Brasilia'],
  'South Africa': ['Cape Town', 'Johannesburg', 'Pretoria'],
  'Russia': ['Moscow', 'St. Petersburg', 'Kazan'],
  'China': ['Beijing', 'Shanghai', 'Shenzhen', 'Hong Kong'],
  'Italy': ['Rome', 'Milan', 'Turin', 'Naples'],
  'Spain': ['Madrid', 'Barcelona', 'Valencia', 'Seville'],
  'Netherlands': ['Amsterdam', 'Rotterdam', 'Utrecht', 'The Hague'],
  'Sweden': ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala'],
  'Singapore': ['Singapore'],
  'South Korea': ['Seoul', 'Busan', 'Daejeon', 'Incheon']
};

// Dreams
const dreamTemplates = [
  {
    title: 'Become an astronaut',
    description: 'My ultimate goal is to join a space agency and go to space, contributing to humanity\'s exploration of the cosmos.'
  },
  {
    title: 'Work on Mars rover technology',
    description: 'I want to develop rovers and exploration vehicles for Mars and other planetary bodies.'
  },
  {
    title: 'Establish a lunar research facility',
    description: 'I hope to contribute to the establishment of a permanent human presence on the Moon for scientific research.'
  },
  {
    title: 'Design spacecraft propulsion systems',
    description: 'My dream is to revolutionize how we travel through space with more efficient propulsion technologies.'
  },
  {
    title: 'Discover an exoplanet capable of supporting life',
    description: 'I aim to be part of a team that identifies potentially habitable worlds beyond our solar system.'
  },
  {
    title: 'Create space agriculture solutions',
    description: 'I want to develop systems for growing food in space to support long-duration missions and space settlements.'
  },
  {
    title: 'Lead a space mission',
    description: 'My ambition is to lead a significant space mission, whether orbital, lunar, or interplanetary.'
  },
  {
    title: 'Develop artificial gravity solutions',
    description: 'I want to create practical artificial gravity systems for long-duration spaceflight to protect astronaut health.'
  }
];

// Achievements
const achievementTemplates = [
  {
    title: 'Published research paper on exoplanet atmospheres',
    description: 'My work on analyzing exoplanet atmospheric compositions was published in a peer-reviewed journal.',
    isVerified: true
  },
  {
    title: 'Interned at NASA JPL',
    description: 'Completed a summer internship working on Mars rover operations and data analysis.',
    isVerified: true
  },
  {
    title: 'Won university rocketry competition',
    description: 'Led a team that designed, built, and launched a high-altitude rocket that reached 10,000 feet.',
    isVerified: true
  },
  {
    title: 'Completed advanced astronaut training program',
    description: 'Graduated from an intensive training program simulating aspects of astronaut preparation.',
    isVerified: false
  },
  {
    title: 'Presented at International Astronautical Congress',
    description: 'Presented my research on space habitat design at this prestigious conference.',
    isVerified: true
  },
  {
    title: 'Developed algorithm for satellite collision prediction',
    description: 'Created an improved algorithm for predicting potential satellite collisions in low Earth orbit.',
    isVerified: false
  },
  {
    title: 'Founded university space society',
    description: 'Established and led a student organization dedicated to space science and engineering projects.',
    isVerified: true
  },
  {
    title: 'Participated in Mars analog mission',
    description: 'Spent two weeks at a Mars Desert Research Station simulating life on Mars.',
    isVerified: true
  }
];

// Helper functions
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const getRandomLocation = (): Location => {
  const country = getRandomItem(countries);
  const city = getRandomItem(citiesByCountry[country] || ['Unknown City']);
  
  // Generate random coordinates (roughly valid for the general region)
  const lat = (Math.random() * 140 - 70) + (Math.random() * 10 - 5);
  const lng = (Math.random() * 340 - 170) + (Math.random() * 10 - 5);
  
  return {
    lat,
    lng,
    city,
    country
  };
};

const getRandomDreams = (): Dream[] => {
  const count = Math.floor(Math.random() * 3) + 1; // 1-3 dreams
  return getRandomItems(dreamTemplates, count);
};

const getRandomAchievements = (): Achievement[] => {
  const count = Math.floor(Math.random() * 4); // 0-3 achievements
  const achievements = getRandomItems(achievementTemplates, count).map(a => ({
    ...a,
    date: `${2020 + Math.floor(Math.random() * 5)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}`
  }));
  return achievements;
};

const generateBio = (userInterests: string[], userTitle: string): string => {
  const intros = [
    'Passionate about space exploration and',
    'Dedicated researcher focusing on',
    'Enthusiast with a particular interest in',
    'Professional working in the field of',
    'Student specializing in'
  ];
  
  const outros = [
    'Looking to connect with like-minded individuals for collaboration.',
    'Seeking opportunities to contribute to groundbreaking space missions.',
    'Interested in mentoring the next generation of space explorers.',
    'Always excited to discuss the latest developments in space technology.',
    'Open to networking and knowledge sharing with the space community.'
  ];
  
  return `${getRandomItem(intros)} ${userInterests.slice(0, 2).join(' and ')}. ${userTitle} with ${Math.floor(Math.random() * 15) + 1} years of experience. ${getRandomItem(outros)}`;
};

// Generate mock users
export const generateMockUsers = (count: number): User[] => {
  const users: User[] = [];
  
  for (let i = 0; i < count; i++) {
    const userInterests = getRandomItems(interests, Math.floor(Math.random() * 5) + 2); // 2-6 interests
    const userTitle = getRandomItem(titles);
    const userLocation = getRandomLocation();
    
    const user: User = {
      id: `user-${i + 1}`,
      name: getRandomItem([
        'Emma Johnson', 'Alex Lee', 'Sophia Rodriguez', 'Kai Patel', 
        'Olivia Chang', 'Mohammed Ali', 'Ava Nguyen', 'Noah Kim',
        'Isabella Garcia', 'Liam Chen', 'Mia Wilson', 'Jackson Singh',
        'Zoe Brown', 'Ethan Davis', 'Amelia Martinez', 'Lucas Taylor'
      ]),
      email: `user${i + 1}@example.com`,
      profileImage: i % 5 === 0 ? undefined : `https://images.pexels.com/photos/${2000000 + i * 1000}/pexels-photo-${2000000 + i * 1000}.jpeg`,
      title: userTitle,
      bio: generateBio(userInterests, userTitle),
      location: userLocation,
      interests: userInterests,
      dreams: getRandomDreams(),
      achievements: getRandomAchievements(),
      joinedDate: `${2020 + Math.floor(Math.random() * 4)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      website: i % 3 === 0 ? `https://example.com/user${i + 1}` : undefined
    };
    
    users.push(user);
  }
  
  return users;
};