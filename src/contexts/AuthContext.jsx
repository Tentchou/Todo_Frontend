import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Common/Alert';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ message: null, type: null });

  const navigate = useNavigate();

  const loadUser = useCallback(async () => {
    setLoading(true);
    setAlert({ message: null, type: null });
    try {
      const userData = await authService.getUser();
      setUser(userData.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to load user:", error);
      setUser(null);
      setIsAuthenticated(false);
      // Ne pas afficher d'alerte ici, car c'est une vérification silencieuse au chargement.
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (credentials) => {
    setLoading(true);
    setAlert({ message: null, type: null });
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      setIsAuthenticated(true);
      setAlert({ message: 'Login successful!', type: 'success' });
      navigate('/dashboard');
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      setIsAuthenticated(false);
      setUser(null);
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      setAlert({ message: errorMessage, type: 'danger' });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setAlert({ message: null, type: null });
    try {
      const response = await authService.register(userData);
      setUser(response.user);
      setIsAuthenticated(true);
      setAlert({ message: 'Registration successful!', type: 'success' });
      navigate('/dashboard');
      return response;
    } catch (error) {
      console.error("Registration failed:", error);
      setIsAuthenticated(false);
      setUser(null);
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      setAlert({ message: errorMessage, type: 'danger' });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setAlert({ message: null, type: null });
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      setAlert({ message: 'Logged out successfully!', type: 'success' });
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
      setAlert({ message: 'Logout failed. Please try again.', type: 'danger' });
      // Force client-side logout even if API fails
      setUser(null);
      setIsAuthenticated(false);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    setAlert({ message: null, type: null });
    try {
      const response = await authService.forgotPassword(email);
      setAlert({ message: response.message, type: 'success' });
      return response;
    } catch (error) {
      console.error("Forgot password failed:", error);
      const errorMessage = error.response?.data?.message || 'Failed to send reset link. Please try again.';
      setAlert({ message: errorMessage, type: 'danger' });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (data) => {
    setLoading(true);
    setAlert({ message: null, type: null });
    try {
      const response = await authService.resetPassword(data);
      setAlert({ message: response.message, type: 'success' });
      navigate('/login');
      return response;
    } catch (error) {
      console.error("Reset password failed:", error);
      const errorMessage = error.response?.data?.message || 'Failed to reset password. Please try again.';
      setAlert({ message: errorMessage, type: 'danger' });
      throw error;
    } finally {
      setLoading(false);
    }
  };


  const clearAlert = () => setAlert({ message: null, type: null });

  const contextValue = {
    user,
    isAuthenticated,
    loading,
    Alert,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    loadUser,
    clearAlert
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {alert.message && <Alert message={alert.message} type={alert.type} onClose={clearAlert} />}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};