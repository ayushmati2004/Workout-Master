import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import Hero from './components/Hero'
import Generator from './components/Generator'
import Workout from './components/Workout'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import WorkoutHistory from './components/WorkoutHistory'
import { useWorkout } from './context/WorkoutContext'

// Simple mock authentication system
const useAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState(() => {
    return localStorage.getItem('mock-auth') === 'true';
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('mock-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoaded, setIsLoaded] = useState(true);

  const signIn = (email, password) => {
    // Mock sign in
    const mockUser = {
      id: '1',
      firstName: 'Demo',
      lastName: 'User',
      email: email || 'demo@example.com'
    };
    setUser(mockUser);
    setIsSignedIn(true);
    localStorage.setItem('mock-auth', 'true');
    localStorage.setItem('mock-user', JSON.stringify(mockUser));
    return Promise.resolve();
  };

  const signUp = (email, password, firstName, lastName) => {
    // Mock sign up
    const mockUser = {
      id: '1',
      firstName: firstName || 'Demo',
      lastName: lastName || 'User',
      email: email || 'demo@example.com'
    };
    setUser(mockUser);
    setIsSignedIn(true);
    localStorage.setItem('mock-auth', 'true');
    localStorage.setItem('mock-user', JSON.stringify(mockUser));
    return Promise.resolve();
  };

  const signOut = () => {
    setUser(null);
    setIsSignedIn(false);
    localStorage.removeItem('mock-auth');
    localStorage.removeItem('mock-user');
    return Promise.resolve();
  };

  return { isSignedIn, user, isLoaded, signIn, signUp, signOut };
};

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useAuth();
  
  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please sign in to access this feature.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-workout-red text-white px-6 py-3 rounded-lg hover:bg-workout-darkred transition-colors"
          >
            Go to Home & Sign In
          </button>
        </div>
      </div>
    );
  }
  
  return children;
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showAuth, setShowAuth] = useState(null)
  const { currentWorkout, completeWorkout: workoutComplete } = useWorkout()
  const { isSignedIn, user, signIn, signUp, signOut } = useAuth()
  const navigate = useNavigate()

  // Auto-close auth modal when user signs in
  useEffect(() => {
    if (isSignedIn && showAuth) {
      setShowAuth(null)
    }
  }, [isSignedIn, showAuth])

  // Check system preference for dark mode
  useEffect(() => {
    const savedThemePreference = localStorage.getItem('themePreference');
    
    if (savedThemePreference) {
      setIsDarkMode(JSON.parse(savedThemePreference));
    } else {
      // Default to dark mode
      setIsDarkMode(true);
    }
  }, []);

  // Save theme preference when it changes
  useEffect(() => {
    localStorage.setItem('themePreference', JSON.stringify(isDarkMode));
    
    // Apply the appropriate theme class to the document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClass = isDarkMode 
    ? 'bg-workout-dark text-white' 
    : 'bg-workout-white text-workout-black';

  // Simple Auth Modal
  const SimpleAuthModal = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (showAuth === 'signin') {
          await signIn(email, password);
        } else {
          await signUp(email, password, firstName, lastName);
        }
      } catch (error) {
        console.error('Auth error:', error);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="w-full max-w-md m-4 relative">
          <button 
            onClick={() => setShowAuth(null)}
            className="absolute top-2 right-2 z-10 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white rounded-full bg-white dark:bg-gray-800 p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className={`rounded-2xl shadow-xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6">
              <h2 className={`text-2xl font-bold text-center mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {showAuth === 'signin' ? 'Welcome Back!' : 'Join Workout Master'}
              </h2>
              <p className={`text-center mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {showAuth === 'signin' 
                  ? 'Sign in to access your workouts' 
                  : 'Create an account to begin your fitness journey'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {showAuth === 'signup' && (
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-red-500`}
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-red-500`}
                    />
                  </div>
                )}
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-red-500`}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-red-500`}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  {showAuth === 'signin' ? 'Sign In' : 'Sign Up'}
                </button>
              </form>

              <div className="mt-6 text-center">
                {showAuth === 'signin' ? (
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Don't have an account?{' '}
                    <button 
                      onClick={() => setShowAuth('signup')}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      Sign up
                    </button>
                  </p>
                ) : (
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Already have an account?{' '}
                    <button 
                      onClick={() => setShowAuth('signin')}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      Sign in
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col ${themeClass} transition-colors duration-500 text-sm sm:text-base`}>
      <Navbar 
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        setShowAuth={setShowAuth}
        isAuthenticated={isSignedIn}
      />
      
      <div className="flex-grow relative overflow-hidden">
        <Routes>
          <Route path="/" element={<Hero isDarkMode={isDarkMode} />} />
          <Route path="/sign-in" element={<div>Redirecting to sign in...</div>} />
          <Route path="/sign-up" element={<div>Redirecting to sign up...</div>} />
          <Route path="/sso-callback" element={<div>Processing...</div>} />
          <Route path="/generate" element={
            <ProtectedRoute>
              <Generator isDarkMode={isDarkMode} />
            </ProtectedRoute>
          } />
          <Route path="/workout" element={
            <ProtectedRoute>
              {currentWorkout ? (
                <Workout 
                  completeWorkout={workoutComplete}
                  isDarkMode={isDarkMode} 
                />
              ) : (
                <Navigate to="/generate" replace />
              )}
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile isDarkMode={isDarkMode} />
            </ProtectedRoute>
          } />
          <Route path="/history" element={
            <ProtectedRoute>
              <WorkoutHistory isDarkMode={isDarkMode} />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      
      {/* Simple Auth Modal */}
      {showAuth && <SimpleAuthModal />}
    </div>
  )
}

export default App
