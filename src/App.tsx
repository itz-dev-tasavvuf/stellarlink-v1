import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// Components
import Layout from './components/layout/Layout';
import RequireAuth from './components/auth/RequireAuth';

// Pages
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import ProfilePage from './pages/ProfilePage';
import DiscoverPage from './pages/DiscoverPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import EventsPage from './pages/EventsPage';
import GroupsPage from './pages/GroupsPage';
import ArticlesPage from './pages/resources/ArticlesPage';
import SpaceNewsPage from './pages/resources/SpaceNewsPage';
import CareersPage from './pages/resources/CareersPage';
import LearningPage from './pages/resources/LearningPage';
import HelpPage from './pages/support/HelpPage';
import ContactPage from './pages/support/ContactPage';
import PrivacyPage from './pages/support/PrivacyPage';
import TermsPage from './pages/support/TermsPage';

// Context
import { AuthProvider } from './context/AuthContext';
import { UserDataProvider } from './context/UserDataContext';

function App() {
 return (
 <AuthProvider>
 <UserDataProvider>{/* Wrap Routes with UserDataProvider */}
 <Routes>
 <Route path="/" element={<Layout />}> {/* Use Layout as a parent route */}
 <Route index element={<HomePage />} /> {/* Render HomePage at the index of Layout */}
 <Route
 path="/discover"
 element={<RequireAuth><DiscoverPage /></RequireAuth>}
          />
 {/* Modified ProfilePage route to accept a userId parameter */}
 <Route path="/profile/:userId" element={<ProfilePage />} />
 <Route path="/map" element={<MapPage />} />
 {/* Add other nested routes here */}
 <Route path="/events" element={<EventsPage />} />
 <Route path="/groups" element={<GroupsPage />} />
 <Route path="/resources/articles" element={<ArticlesPage />} />
 <Route path="/resources/news" element={<SpaceNewsPage />} />
 <Route path="/resources/careers" element={<CareersPage />} />
 <Route path="/resources/learning" element={<LearningPage />} />
 <Route path="/support/help" element={<HelpPage />} />
 <Route path="/support/contact" element={<ContactPage />} />
 <Route path="/support/privacy" element={<PrivacyPage />} />
 <Route path="/support/terms" element={<TermsPage />} />
 </Route>
 <Route path="/login" element={<LoginPage />} />
 <Route path="/register" element={<RegisterPage />} />
 <Route path="*" element={<NotFoundPage />} /> {/* Catch-all for unmatched routes */}
 </Routes>
 </UserDataProvider>
 </AuthProvider>
  );
}

export default App;