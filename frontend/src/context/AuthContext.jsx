import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

// Simple auth context without external dependencies
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock functions for compatibility
  const register = async () => {
    setError('Use the sign up form in the app');
    throw new Error('Use the sign up form in the app');
  };

  const login = async () => {
    setError('Use the sign in form in the app');
    throw new Error('Use the sign in form in the app');
  };

  const logout = async () => {
    try {
      setLoading(true);
      localStorage.removeItem('mock-auth');
      localStorage.removeItem('mock-user');
      window.location.reload(); // Simple way to reset app state
      return { success: true };
    } catch (error) {
      setError(error.message || 'Logout failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      // Mock profile update - just store in localStorage
      const currentUser = JSON.parse(localStorage.getItem('mock-user') || '{}');
      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem('mock-user', JSON.stringify(updatedUser));
      return { success: true, data: updatedUser };
    } catch (error) {
      setError(error.message || 'Profile update failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get current user from localStorage
  const getCurrentUser = () => {
    const savedUser = localStorage.getItem('mock-user');
    return savedUser ? JSON.parse(savedUser) : null;
  };

  const isAuthenticated = localStorage.getItem('mock-auth') === 'true';

  return (
    <AuthContext.Provider
      value={{
        user: getCurrentUser(),
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);