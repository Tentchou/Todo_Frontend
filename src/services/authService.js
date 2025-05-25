import api from "../utils/api";

// Utilitaire pour extraire les messages d’erreur Laravel
const extractErrorMessage = (error) => {
  if (error.response) {
    const { status, data } = error.response;

    if (status === 422 && data.errors) {
      // Laravel: erreur de validation
      console.error("Validation error:", data.errors);
      return Object.values(data.errors).flat().join(' ');
    }

    if (data.message) return data.message;
    return `Erreur ${status}`;
  } else if (error.request) {
    return "Aucune réponse du serveur.";
  } else {
    return "Erreur de requête : " + error.message;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error("Login failed:", message);
    throw new Error(message);
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error("Registration failed:", message);
    throw new Error(message);
  }
};

export const logout = async () => {
  try {
    const response = await api.post('/logout');
    return response.data;
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error("Logout failed:", message);
    throw new Error(message);
  }
};

export const getUser = async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error("Failed to load user:", message);
    throw new Error(message);
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/forgot-password', { email });
    return response.data;
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error("Forgot password failed:", message);
    throw new Error(message);
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await api.post('/reset-password', data);
    return response.data;
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error("Reset password failed:", message);
    throw new Error(message);
  }
};
