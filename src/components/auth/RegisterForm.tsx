import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import zxcvbn from 'zxcvbn';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [interests, setInterests] = useState(''); // Assuming comma-separated string for now
  const [dreams, setDreams] = useState('');
  const [achievements, setAchievements] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState('');
  const [isStrongPassword, setIsStrongPassword] = useState(false);

  useEffect(() => {
    const result = zxcvbn(password);
    setPasswordStrength(result.score);

    if (password.length > 0) {
      // Provide more specific feedback based on the score
      if (result.score === 0) {
        setPasswordFeedback('Very weak: Try a longer password with mixed characters.');
      } else if (result.score === 1) {
        setPasswordFeedback('Weak: Add more variety with uppercase, lowercase, numbers, and symbols.');
      } else if (result.score === 2) {
        setPasswordFeedback('Fair: A bit more complexity would improve security.');
      } else if (result.score === 3) {
        setPasswordFeedback('Good: Almost there! Just a little more to be safe.');
      } else {
        setPasswordFeedback('Strong: Excellent password!');
      }
    } else {
      setPasswordFeedback('');
    }

    setIsStrongPassword(result.score >= 3);
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      // For demo purposes, we'll simulate registration
      await register(
        username,
        fullName,
        email,
        password,
        location,
        interests,
        dreams,
        achievements
      );
      navigate('/map');
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
      console.error(err); // Log the error to console
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="card p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Join StellarLink</h1>
          <p className="text-space-400 mt-2">Create your account to connect with space enthusiasts</p>
        </div>

        {error && (
          <div className="bg-nebula-900/30 border border-nebula-700/50 rounded-lg p-3 mb-4 flex items-start gap-3">
            <AlertCircle className="text-nebula-500" size={18} />
            <p className="text-sm text-nebula-300">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-space-300 mb-1">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space-500" size={18} />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="input pl-10"
                  placeholder="johndoe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-space-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space-500" size={18} />
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="input pl-10"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-space-300 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space-500" size={18} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input pl-10"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-space-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space-500" size={18} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input pl-10"
                  placeholder="********"
                />
              </div>
              {passwordFeedback && (
                <p className={`text-sm mt-1 ${passwordStrength < 3 ? 'text-red-500' : 'text-green-500'}`}>
                  {passwordFeedback}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-space-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space-500" size={18} />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="input pl-10"
                  placeholder="********"
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-space-300 mb-1">
                Location
              </label>
              <div className="relative">
                {/* You might want a different icon for location */}
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space-500" size={18} />
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="input pl-10"
                  placeholder="Your location (e.g., New York, NY)"
                />
              </div>
            </div>

            <div>
              <label htmlFor="interests" className="block text-sm font-medium text-space-300 mb-1">
                Interests (comma-separated)
              </label>
              <div className="relative">
                {/* You might want a different icon for interests */}
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space-500" size={18} />
                <input
                  id="interests"
                  type="text"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  className="input pl-10"
                  placeholder="e.g., Astrophysics, Mars, Telescopes"
                />
              </div>
            </div>

            <div>
              <label htmlFor="dreams" className="block text-sm font-medium text-space-300 mb-1">
                Dreams
              </label>
              <textarea
                id="dreams"
                value={dreams}
                onChange={(e) => setDreams(e.target.value)}
                className="input"
                placeholder="Share your space-related dreams..."
                rows={3}
              ></textarea>
            </div>

            <div>
              <label htmlFor="achievements" className="block text-sm font-medium text-space-300 mb-1">
                Achievements
              </label>
              <textarea
                id="achievements"
                value={achievements}
                onChange={(e) => setAchievements(e.target.value)}
                className="input"
                placeholder="Share your space-related achievements..."
                rows={3}
              ></textarea>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-space-700 bg-space-800 text-stellar-600 focus:ring-stellar-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-space-300">
                I agree to the{' '}
                <a href="#" className="text-stellar-400 hover:text-stellar-300 transition-colors">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-stellar-400 hover:text-stellar-300 transition-colors">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || !isStrongPassword}
              className="btn btn-primary w-full"
            >
              {isLoading ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-space-400">
          <span>Already have an account?</span>{' '}
          <Link to="/login" className="text-stellar-400 hover:text-stellar-300 transition-colors">
            Sign in
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default RegisterForm;